import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { productSchema } from '@/lib/validators';
import { requireAdmin } from '@/lib/auth-helpers';

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const body = await request.json();
    const parsed = productSchema.parse(body);

    const product = await prisma.product.create({
      data: {
        ...parsed
      }
    });

    return NextResponse.json({ id: product.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Unable to create product.' }, { status: 400 });
  }
}
