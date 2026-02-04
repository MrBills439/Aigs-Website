'use client';

import Link from 'next/link';
import BrandLogo from '@/components/BrandLogo';
import { useCartStore } from '@/lib/cart';

export default function SiteHeader() {
  const itemsCount = useCartStore((state) => state.items.reduce((sum, item) => sum + item.qty, 0));

  return (
    <header className="sticky top-0 z-40 border-b border-rose/30 bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6">
        <BrandLogo />
        <nav className="hidden items-center gap-6 text-sm uppercase tracking-[0.2em] text-deep/70 md:flex">
          <Link href="/shop" className="hover:text-deep">Shop</Link>
          <Link href="/reviews" className="hover:text-deep">Reviews</Link>
          <Link href="/about" className="hover:text-deep">About</Link>
          <Link href="/contact" className="hover:text-deep">Contact</Link>
          <Link href="/policies/shipping" className="hover:text-deep">Policies</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/shop" className="text-sm font-semibold text-deep">Browse</Link>
          <Link
            href="/cart"
            className="relative rounded-full border border-deep/20 px-4 py-2 text-sm"
          >
            Cart
            {itemsCount > 0 && (
              <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-deep px-1 text-xs text-white">
                {itemsCount}
              </span>
            )}
          </Link>
        </div>
      </div>
      <nav className="flex items-center gap-4 overflow-x-auto border-t border-rose/20 px-4 py-3 text-xs uppercase tracking-[0.2em] text-deep/60 md:hidden">
        <Link href="/shop" className="shrink-0">Shop</Link>
        <Link href="/reviews" className="shrink-0">Reviews</Link>
        <Link href="/about" className="shrink-0">About</Link>
        <Link href="/contact" className="shrink-0">Contact</Link>
        <Link href="/policies/shipping" className="shrink-0">Policies</Link>
      </nav>
    </header>
  );
}
