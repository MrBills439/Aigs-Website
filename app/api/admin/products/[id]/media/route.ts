import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth-helpers';
import { z } from 'zod';

const createSchema = z.object({
  type: z.enum(['IMAGE', 'VIDEO']),
  url: z.string().url(),
  alt: z.string().optional(),
  sortOrder: z.number().optional()
});

const reorderSchema = z.object({
  updates: z.array(
    z.object({
      id: z.string(),
      sortOrder: z.number()
    })
  )
});

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    await requireAdmin();
    const body = await request.json();
    const parsed = createSchema.parse(body);

    const media = await prisma.productMedia.create({
      data: {
        productId: params.id,
        type: parsed.type,
        url: parsed.url,
        alt: parsed.alt,
        sortOrder: parsed.sortOrder ?? 0
      }
    });

    return NextResponse.json(media);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Unable to add media.' }, { status: 400 });
  }
}

export async function PATCH(request: Request) {
  try {
    await requireAdmin();
    const body = await request.json();
    const parsed = reorderSchema.parse(body);

    await prisma.$transaction(
      parsed.updates.map((update) =>
        prisma.productMedia.update({
          where: { id: update.id },
          data: { sortOrder: update.sortOrder }
        })
      )
    );

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Unable to reorder media.' }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    await requireAdmin();
    const { searchParams } = new URL(request.url);
    const mediaId = searchParams.get('mediaId');
    if (!mediaId) {
      return NextResponse.json({ error: 'mediaId is required' }, { status: 400 });
    }
    await prisma.productMedia.delete({ where: { id: mediaId } });
    return NextResponse.json({ status: 'deleted' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Unable to delete media.' }, { status: 400 });
  }
}
