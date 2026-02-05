import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import Testimonials from '@/components/Testimonials';
import Newsletter from '@/components/Newsletter';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function HomePage() {
  return (
    <div>
      <Hero />
      <section className="mx-auto w-full max-w-6xl px-4 pb-10 md:px-6">
        <div className="card grid gap-6 p-8 md:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-deep/60">Collection</p>
            <h3 className="mt-4 font-serif text-2xl">Luxe Lace Fronts</h3>
            <p className="mt-3 text-sm text-deep/70">
              Seamless hairlines with breathable lace for all-day confidence.
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-deep/60">Collection</p>
            <h3 className="mt-4 font-serif text-2xl">HD Closure Wigs</h3>
            <p className="mt-3 text-sm text-deep/70">
              Ultra-natural closures tailored for beginner friendly installs.
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-deep/60">Collection</p>
            <h3 className="mt-4 font-serif text-2xl">Custom Color</h3>
            <p className="mt-3 text-sm text-deep/70">
              Dimension, balayage, and bespoke tone matching on request.
            </p>
          </div>
        </div>
      </section>
      <FeaturedProducts />
      <Testimonials />
      <section className="mx-auto w-full max-w-6xl px-4 pb-16 md:px-6">
        <div className="card grid gap-8 p-8 md:grid-cols-[1.2fr,1fr]">
          <div>
            <span className="badge">Instagram</span>
            <h2 className="section-title mt-4">@adiswigsandbeauty</h2>
            <p className="mt-3 text-sm text-deep/70">
              Follow our latest installs, transformations, and behind-the-scenes styling moments.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="flex h-28 items-center justify-center rounded-2xl border border-rose/40 bg-white text-xs uppercase tracking-[0.3em] text-deep/60"
              >
                Placeholder
              </div>
            ))}
          </div>
        </div>
      </section>
      <Newsletter />
    </div>
  );
}
