import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth-helpers';
import { z } from 'zod';
import { hashPassword } from '@/lib/password';

const updateSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  password: z.string().min(8).optional()
});

type Params = { id: string };

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<Params> }
) {
  try {
    await requireAdmin();
    const body = await request.json();
    const parsed = updateSchema.parse(body);
    const { id } = await context.params;

    const data: Record<string, unknown> = {};
    if (parsed.name) data.name = parsed.name;
    if (parsed.email) data.email = parsed.email;
    if (parsed.password) data.passwordHash = await hashPassword(parsed.password);

    const user = await prisma.user.update({
      where: { id },
      data,
      select: { id: true, name: true, email: true, role: true, createdAt: true }
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Unable to update user.' }, { status: 400 });
  }
}

export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<Params> }
) {
  try {
    await requireAdmin();
    const { id } = await context.params;
    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ status: 'deleted' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Unable to delete user.' }, { status: 400 });
  }
}
