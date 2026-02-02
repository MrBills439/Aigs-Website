import { prisma } from '@/lib/prisma';
import ReviewMediaManager from '@/components/admin/ReviewMediaManager';

export default async function AdminReviewsPage() {
  const media = await prisma.reviewMedia.findMany({ orderBy: { sortOrder: 'asc' } });

  return (
    <div className="space-y-6">
      <h1 className="font-serif text-3xl">Review media</h1>
      <p className="text-sm text-deep/70">
        Upload customer review videos and photos to reuse across the storefront and socials.
      </p>
      <ReviewMediaManager initialMedia={media} />
    </div>
  );
}
