import Link from 'next/link';
import Image from 'next/image';
import type { ProductWithMedia } from '@/lib/types';
import { formatMoney } from '@/lib/format';

export default function ProductCard({ product }: { product: ProductWithMedia }) {
  const media = product.media?.[0];

  return (
    <Link href={`/shop/${product.slug}`} className="group block">
      <div className="overflow-hidden rounded-3xl border border-rose/30 bg-white">
        <div className="relative h-64 w-full">
          {media ? (
            <Image
              src={media.url}
              alt={media.alt || product.title}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-rose/20 text-sm text-deep/60">
              No image
            </div>
          )}
        </div>
        <div className="space-y-2 p-5">
          <p className="text-xs uppercase tracking-[0.3em] text-deep/50">{product.wigType}</p>
          <h3 className="font-serif text-xl">{product.title}</h3>
          <p className="text-sm text-deep/70">{product.texture} · {product.laceType}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-deep">
              {formatMoney(product.price, product.currency)}
            </span>
            {!product.isActive && (
              <span className="rounded-full border border-rose/40 px-3 py-1 text-xs">Unavailable</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
