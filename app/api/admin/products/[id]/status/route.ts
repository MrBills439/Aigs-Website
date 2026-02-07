import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth-helpers';
import { z } from 'zod';

const schema = z.object({ isActive: z.boolean() });

type Params = { id: string };

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<Params> }
) {
  try {
    await requireAdmin();
    const body = await request.json();
    const parsed = schema.parse(body);
    const { id } = await context.params;

    const product = await prisma.product.update({
      where: { id },
      data: { isActive: parsed.isActive },
      select: { id: true, isActive: true }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Unable to update status.' }, { status: 400 });
  }
}
