import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth-helpers';
import { z } from 'zod';

const updateSchema = z.object({
  fulfillmentStatus: z
    .enum(['NEW', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'])
    .optional(),
  paymentStatus: z.enum(['UNPAID', 'PAID']).optional(),
  adminNotes: z.string().optional(),
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

    const order = await prisma.order.update({
      where: { id },
      data: parsed,
    });

    return NextResponse.json({ id: order.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Unable to update order.' }, { status: 400 });
  }
}
