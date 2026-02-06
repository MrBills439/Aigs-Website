import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/password';

const schema = z.object({
  token: z.string().min(10),
  password: z.string().min(8)
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = schema.parse(body);

    const record = await prisma.passwordResetToken.findUnique({
      where: { token: parsed.token }
    });

    if (!record || record.usedAt || record.expiresAt < new Date()) {
      return NextResponse.json({ error: 'Token is invalid or expired.' }, { status: 400 });
    }

    const passwordHash = await hashPassword(parsed.password);

    await prisma.$transaction([
      prisma.user.update({
        where: { id: record.userId },
        data: { passwordHash }
      }),
      prisma.passwordResetToken.update({
        where: { id: record.id },
        data: { usedAt: new Date() }
      })
    ]);

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Unable to reset password.' }, { status: 400 });
  }
}
