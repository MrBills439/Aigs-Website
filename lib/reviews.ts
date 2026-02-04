import { prisma } from '@/lib/prisma';

export async function getReviewMedia() {
  return prisma.reviewMedia.findMany({
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }]
  });
}
