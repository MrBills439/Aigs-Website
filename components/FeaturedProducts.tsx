import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { getFeaturedProducts } from '@/lib/products';

export default async function FeaturedProducts() {
  const products = await getFeaturedProducts();

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <span className="badge">Featured</span>
          <h2 className="section-title mt-4">Editor-approved statement wigs</h2>
        </div>
        <Link href="/shop" className="text-sm uppercase tracking-[0.2em] text-deep/70">
          Shop All
        </Link>
      </div>
      {products.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-rose/30 bg-white/70 p-10 text-center text-sm text-deep/70">
          Featured products will appear here once added in the admin dashboard.
        </div>
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
