import { prisma } from '@/lib/prisma';
import type { ProductWithMedia } from '@/lib/types';

export async function getFeaturedProducts(): Promise<ProductWithMedia[]> {
  return prisma.product.findMany({
    where: { isFeatured: true, isActive: true },
    include: { media: { orderBy: { sortOrder: 'asc' } } },
    take: 6
  });
}

export async function getProductBySlug(slug: string): Promise<ProductWithMedia | null> {
  return prisma.product.findFirst({
    where: { slug, isActive: true },
    include: { media: { orderBy: { sortOrder: 'asc' } } }
  });
}

export async function getShopProducts(params: {
  query?: string;
  texture?: string;
  length?: string;
  laceType?: string;
  capSize?: string;
  inStock?: boolean;
  sort?: string;
}): Promise<ProductWithMedia[]> {
  const { query, texture, length, laceType, capSize, inStock, sort } = params;

  // Build Prisma filters from query-string driven shop filters.
  const where = {
    isActive: true,
    ...(query
      ? {
          OR: [
            { title: { contains: query, mode: 'insensitive' as const } },
            { description: { contains: query, mode: 'insensitive' as const } },
            { wigType: { contains: query, mode: 'insensitive' as const } }
          ]
        }
      : {}),
    ...(texture ? { texture } : {}),
    ...(length ? { lengthInches: { has: length } } : {}),
    ...(laceType ? { laceType } : {}),
    ...(capSize ? { capSize } : {}),
    ...(inStock ? { stockQty: { gt: 0 } } : {})
  };

  const orderBy =
    sort === 'price-asc'
      ? { price: 'asc' as const }
      : sort === 'price-desc'
        ? { price: 'desc' as const }
        : { createdAt: 'desc' as const };

  return prisma.product.findMany({
    where,
    include: { media: { orderBy: { sortOrder: 'asc' } } },
    orderBy
  });
}
