import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { generateResetToken } from '@/lib/password';
import { sendPasswordResetEmail } from '@/lib/email';

const schema = z.object({
  email: z.string().email()
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = schema.parse(body);

    const user = await prisma.user.findUnique({ where: { email: parsed.email } });
    if (!user) {
      return NextResponse.json({ status: 'ok' });
    }

    await prisma.passwordResetToken.deleteMany({ where: { userId: user.id } });

    const token = generateResetToken();
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    await prisma.passwordResetToken.create({
      data: {
        token,
        userId: user.id,
        expiresAt
      }
    });

    const baseUrl = process.env.NEXTAUTH_URL || request.headers.get('origin');
    if (!baseUrl) {
      throw new Error('Missing base URL');
    }

    const resetUrl = `${baseUrl}/admin/reset-password?token=${token}`;
    await sendPasswordResetEmail({ to: user.email, resetUrl });

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Unable to process request.' }, { status: 400 });
  }
}
