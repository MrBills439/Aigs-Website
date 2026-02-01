import ShopFilters from '@/components/ShopFilters';
import ProductCard from '@/components/ProductCard';
import { getShopProducts } from '@/lib/products';

export default async function ShopPage({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const products = await getShopProducts({
    query: typeof searchParams.q === 'string' ? searchParams.q : undefined,
    texture: typeof searchParams.texture === 'string' ? searchParams.texture : undefined,
    length: typeof searchParams.length === 'string' ? searchParams.length : undefined,
    laceType: typeof searchParams.laceType === 'string' ? searchParams.laceType : undefined,
    capSize: typeof searchParams.capSize === 'string' ? searchParams.capSize : undefined,
    inStock: searchParams.inStock === '1',
    sort: typeof searchParams.sort === 'string' ? searchParams.sort : undefined
  });

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 md:grid-cols-[280px,1fr] md:px-6 md:py-16">
      <ShopFilters />
      <div>
        <div className="flex items-center justify-between">
          <h1 className="section-title">Shop the collection</h1>
          <span className="text-sm text-deep/60">{products.length} results</span>
        </div>
        {products.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-rose/30 bg-white/70 p-10 text-center text-sm text-deep/70">
            No products match these filters yet.
          </div>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
