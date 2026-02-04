import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { productSchema } from '@/lib/validators';
import { requireAdmin } from '@/lib/auth-helpers';

type Params = { id: string };

export async function PUT(
  request: NextRequest,
  context: { params: Promise<Params> }
) {
  try {
    await requireAdmin();
    const body = await request.json();
    const parsed = productSchema.parse(body);
    const { id } = await context.params;

    const product = await prisma.product.update({
      where: { id },
      data: {
        ...parsed
      }
    });

    return NextResponse.json({ id: product.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Unable to update product.' }, { status: 400 });
  }
}
