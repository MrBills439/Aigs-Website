import { getReviewMedia } from '@/lib/reviews';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ReviewsPage() {
  const media = await getReviewMedia();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <span className="badge">Client Reviews</span>
      <h1 className="mt-4 font-serif text-4xl">Real results from our clients</h1>
      <p className="mt-3 max-w-2xl text-sm text-deep/70">
        Explore real customer photos and videos shared after receiving their ADIS WiGS AND Beauty orders.
      </p>

      {media.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-rose/30 bg-white/70 p-10 text-center text-sm text-deep/70">
          No reviews uploaded yet. Add photo/video reviews from the admin dashboard.
        </div>
      ) : (
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {media.map((item) => (
            <article key={item.id} className="overflow-hidden rounded-3xl border border-rose/30 bg-white">
              <div className="relative h-72 w-full bg-rose/10">
                {item.type === 'VIDEO' ? (
                  <video src={item.url} controls className="h-full w-full object-cover" preload="metadata" />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.url} alt={item.alt || item.title} className="h-full w-full object-cover" />
                )}
              </div>
              <div className="p-4">
                <p className="font-semibold text-deep">{item.title}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-deep/60">{item.type}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
