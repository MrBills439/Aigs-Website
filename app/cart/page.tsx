'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/lib/cart';
import { formatMoney } from '@/lib/format';

export default function CartPage() {
  const { items, updateQty, removeItem } = useCartStore();
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-12 md:px-6 md:py-16">
      <h1 className="section-title">Your cart</h1>
      {items.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-rose/30 bg-white/70 p-10 text-center text-sm text-deep/70">
          Your cart is empty. Explore the collection to add your favorites.
          <div className="mt-6">
            <Link href="/shop" className="rounded-full bg-deep px-6 py-3 text-xs uppercase tracking-[0.2em] text-white">
              Shop now
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-8 grid gap-6">
          {items.map((item) => (
            <div key={item.productId} className="card flex flex-col gap-6 p-6 md:flex-row">
              <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-2xl border border-rose/30">
                {item.mediaUrl ? (
                  <Image src={item.mediaUrl} alt={item.title} fill className="object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center bg-rose/20 text-xs text-deep/60">
                    No image
                  </div>
                )}
              </div>
              <div className="flex-1 space-y-3">
                <h2 className="font-serif text-xl">{item.title}</h2>
                <p className="text-sm text-deep/70">{formatMoney(item.price, item.currency)}</p>
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    type="number"
                    min={1}
                    max={item.stockQty}
                    value={item.qty}
                    onChange={(event) => updateQty(item.productId, Number(event.target.value))}
                    className="w-20 rounded-xl border border-rose/40 px-3 py-2 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => removeItem(item.productId)}
                    className="text-xs uppercase tracking-[0.2em] text-deep/60"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="text-sm font-semibold text-deep">
                {formatMoney(item.price * item.qty, item.currency)}
              </div>
            </div>
          ))}
          <div className="card flex flex-col items-end gap-4 p-6">
            <p className="text-sm text-deep/70">Subtotal</p>
            <p className="text-2xl font-semibold text-deep">{formatMoney(subtotal, 'USD')}</p>
            <Link href="/checkout" className="rounded-full bg-deep px-6 py-3 text-xs uppercase tracking-[0.2em] text-white">
              Proceed to checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
