import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-helpers";
import { z } from "zod";
import { deleteCloudinaryAsset } from "@/lib/cloudinary";

const createSchema = z.object({
  type: z.enum(["IMAGE", "VIDEO"]),
  url: z.string().url(),
  publicId: z.string().optional(),
  alt: z.string().optional(),
  sortOrder: z.number().optional(),
});

const reorderSchema = z.object({
  updates: z.array(
    z.object({
      id: z.string(),
      sortOrder: z.number(),
    })
  ),
});

type Params = { id: string };

export async function POST(
  request: NextRequest,
  context: { params: Promise<Params> }
) {
  await requireAdmin();

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    // This is the real reason you’re getting 400
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { id } = await context.params;

  try {
    // Media records store Cloudinary URL + publicId for later deletion.
    const media = await prisma.productMedia.create({
      data: {
        productId: id,
        type: parsed.data.type,
        url: parsed.data.url,
        publicId: parsed.data.publicId,
        alt: parsed.data.alt,
        sortOrder: parsed.data.sortOrder ?? 0,
      },
    });

    return NextResponse.json(media);
  } catch (err: any) {
    return NextResponse.json(
      { error: "Database insert failed", details: err?.message ?? String(err) },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  await requireAdmin();

  const body = await request.json();
  const parsed = reorderSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  await prisma.$transaction(
    parsed.data.updates.map((update) =>
      prisma.productMedia.update({
        where: { id: update.id },
        data: { sortOrder: update.sortOrder },
      })
    )
  );

  return NextResponse.json({ status: "ok" });
}

export async function DELETE(request: NextRequest) {
  await requireAdmin();

  const { searchParams } = new URL(request.url);
  const mediaId = searchParams.get("mediaId");

  if (!mediaId) {
    return NextResponse.json({ error: "mediaId is required" }, { status: 400 });
  }

  const media = await prisma.productMedia.delete({
    where: { id: mediaId },
    select: { id: true, publicId: true, type: true }
  });

  if (media.publicId) {
    // Keep cloud storage in sync when admin deletes media from DB.
    const resourceType = media.type === "VIDEO" ? "video" : "image";
    await deleteCloudinaryAsset({ publicId: media.publicId, resourceType });
  }

  return NextResponse.json({ status: "deleted" });
}
