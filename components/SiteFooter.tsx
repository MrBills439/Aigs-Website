import Link from 'next/link';
import BrandLogo from '@/components/BrandLogo';

export default function SiteFooter() {
  return (
    <footer className="border-t border-rose/30 bg-white/70">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-10 md:grid-cols-4">
        <div className="space-y-4 md:col-span-2">
          <BrandLogo />
          <p className="text-sm text-deep/70">
            ADIS WiGS AND Beauty delivers premium wigs and beauty essentials with concierge-style
            service. We will contact you to arrange payment after checkout.
          </p>
        </div>
        <div className="space-y-2 text-sm">
          <p className="font-semibold uppercase tracking-[0.2em]">Explore</p>
          <Link href="/shop" className="block text-deep/70 hover:text-deep">Shop</Link>
          <Link href="/reviews" className="block text-deep/70 hover:text-deep">Reviews</Link>
          <Link href="/about" className="block text-deep/70 hover:text-deep">About</Link>
          <Link href="/contact" className="block text-deep/70 hover:text-deep">Contact</Link>
        </div>
        <div className="space-y-2 text-sm">
          <p className="font-semibold uppercase tracking-[0.2em]">Policies</p>
          <Link href="/policies/shipping" className="block text-deep/70 hover:text-deep">Shipping</Link>
          <Link href="/policies/returns" className="block text-deep/70 hover:text-deep">Returns</Link>
          <Link href="/policies/privacy" className="block text-deep/70 hover:text-deep">Privacy</Link>
          <Link href="/policies/terms" className="block text-deep/70 hover:text-deep">Terms</Link>
        </div>
      </div>
      <div className="border-t border-rose/30 bg-white/50 py-4 text-center text-xs text-deep/60">
        © {new Date().getFullYear()} ADIS WiGS AND Beauty. All rights reserved.
      </div>
    </footer>
  );
}
