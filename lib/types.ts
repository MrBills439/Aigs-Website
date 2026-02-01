import type { Product, ProductMedia } from '@prisma/client';

export type ProductWithMedia = Product & { media: ProductMedia[] };
