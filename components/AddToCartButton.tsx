'use client';

import { useState } from 'react';
import { useCartStore } from '@/lib/cart';

export default function AddToCartButton({
  productId,
  title,
  price,
  currency,
  stockQty,
  mediaUrl
}: {
  productId: string;
  title: string;
  price: number;
  currency: string;
  stockQty: number;
  mediaUrl?: string | null;
}) {
  const addItem = useCartStore((state) => state.addItem);
  const [qty, setQty] = useState(1);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setQty((prev) => Math.max(1, prev - 1))}
          className="h-10 w-10 rounded-full border border-rose/40"
        >
          -
        </button>
        <span className="min-w-8 text-center text-sm">{qty}</span>
        <button
          type="button"
          onClick={() => setQty((prev) => Math.min(prev + 1, stockQty))}
          className="h-10 w-10 rounded-full border border-rose/40"
        >
          +
        </button>
      </div>
      <button
        type="button"
        onClick={() =>
          addItem({
            productId,
            title,
            price,
            currency,
            qty,
            mediaUrl,
            stockQty
          })
        }
        disabled={stockQty === 0}
        className="w-full rounded-full bg-deep px-6 py-3 text-sm uppercase tracking-[0.2em] text-white disabled:cursor-not-allowed disabled:bg-deep/40"
      >
        {stockQty === 0 ? 'Out of stock' : 'Add to cart'}
      </button>
    </div>
  );
}
