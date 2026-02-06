import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth-helpers';
import { z } from 'zod';
import { hashPassword } from '@/lib/password';

const createSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8)
});

export async function GET() {
  try {
    await requireAdmin();
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: { id: true, name: true, email: true, role: true, createdAt: true }
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Unable to load users.' }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
    const body = await request.json();
    const parsed = createSchema.parse(body);

    const passwordHash = await hashPassword(parsed.password);

    const user = await prisma.user.create({
      data: {
        name: parsed.name,
        email: parsed.email,
        passwordHash,
        role: 'ADMIN'
      },
      select: { id: true, name: true, email: true, role: true, createdAt: true }
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Unable to create user.' }, { status: 400 });
  }
}
