import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/lib/products';
import MediaGallery from '@/components/MediaGallery';
import AddToCartButton from '@/components/AddToCartButton';
import { formatMoney } from '@/lib/format';

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) {
    return notFound();
  }

  const mediaUrl = product.media?.[0]?.url ?? null;
  const videoMedia = product.media.find((item) => item.type === 'VIDEO');

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 md:grid-cols-[1.1fr,0.9fr] md:px-6 md:py-16">
      <MediaGallery media={product.media} title={product.title} />
      <div className="space-y-6">
        <div>
          <span className="badge">{product.wigType}</span>
          <h1 className="mt-4 font-serif text-4xl">{product.title}</h1>
          <p className="mt-3 text-sm text-deep/70">{product.description}</p>
          <p className="mt-6 text-2xl font-semibold text-deep">
            {formatMoney(product.price, product.currency)}
          </p>
        </div>
        <div className="card p-6">
          <h2 className="text-sm uppercase tracking-[0.2em] text-deep/60">Specifications</h2>
          <div className="mt-4 grid gap-3 text-sm text-deep/70">
            <div className="flex justify-between"><span>Texture</span><span>{product.texture}</span></div>
            <div className="flex justify-between"><span>Length</span><span>{product.lengthInches.join(', ')}"</span></div>
            <div className="flex justify-between"><span>Density</span><span>{product.density}</span></div>
            <div className="flex justify-between"><span>Lace Type</span><span>{product.laceType}</span></div>
            <div className="flex justify-between"><span>Cap Size</span><span>{product.capSize}</span></div>
            <div className="flex justify-between"><span>Color</span><span>{product.color}</span></div>
            <div className="flex justify-between"><span>SKU</span><span>{product.sku}</span></div>
          </div>
        </div>
        <div className="rounded-3xl border border-rose/30 bg-white/80 p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm uppercase tracking-[0.2em] text-deep/60">Stock</p>
            <p className="text-sm text-deep/70">{product.stockQty > 0 ? `${product.stockQty} available` : 'Out of stock'}</p>
          </div>
          {videoMedia && (
            <div className="mt-4 rounded-2xl border border-rose/30 bg-sand/70 p-3">
              <p className="text-[10px] uppercase tracking-[0.2em] text-deep/60">Wig video preview</p>
              <video
                src={videoMedia.url}
                controls
                className="mt-2 h-40 w-full rounded-xl object-cover"
                preload="metadata"
              />
            </div>
          )}
          <div className="mt-6">
            <AddToCartButton
              productId={product.id}
              title={product.title}
              price={product.price}
              currency={product.currency}
              stockQty={product.stockQty}
              mediaUrl={mediaUrl}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
