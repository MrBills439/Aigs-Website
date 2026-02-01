import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="gradient-mesh absolute inset-0" />
      <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 md:grid-cols-2 md:px-6 md:py-20">
        <div className="space-y-6">
          <span className="badge">Premium Wig Atelier</span>
          <h1 className="font-serif text-3xl leading-tight md:text-6xl">
            Elevate every look with couture wigs crafted for your signature beauty.
          </h1>
          <p className="text-base text-deep/70 md:text-lg">
            ADIS WiGS AND Beauty curates luxury textures, bespoke color blends, and concierge-level
            service. Choose your dream wig and we will arrange payment and delivery personally.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/shop"
              className="rounded-full bg-deep px-6 py-3 text-xs uppercase tracking-[0.2em] text-white md:text-sm"
            >
              Shop The Collection
            </Link>
            <Link
              href="/about"
              className="rounded-full border border-deep/20 px-6 py-3 text-xs uppercase tracking-[0.2em] md:text-sm"
            >
              Our Story
            </Link>
          </div>
        </div>
        <div className="card flex flex-col justify-between gap-6 p-6 md:p-8">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-deep/60">Signature Service</p>
            <h2 className="mt-3 font-serif text-2xl">White-glove fitting & styling guidance</h2>
            <p className="mt-4 text-sm text-deep/70">
              Every order includes styling notes, care guidance, and a direct line to our team for
              custom requests.
            </p>
          </div>
          <div className="grid gap-3 rounded-2xl border border-rose/40 bg-white p-4 text-sm">
            <p className="font-semibold">What to expect</p>
            <ul className="space-y-2 text-deep/70">
              <li>Manual payment confirmation after checkout</li>
              <li>Express dispatch available worldwide</li>
              <li>Secure packaging and luxury presentation</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
