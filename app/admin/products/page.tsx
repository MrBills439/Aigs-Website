import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-3xl">Products</h1>
        <Link href="/admin/products/new" className="rounded-full bg-deep px-6 py-3 text-xs uppercase tracking-[0.2em] text-white">
          Add product
        </Link>
      </div>
      <div className="card p-6">
        <div className="grid gap-4 text-sm text-deep/70">
          {products.map((product) => (
            <div key={product.id} className="flex flex-wrap items-center justify-between gap-3 border-b border-rose/30 pb-3">
              <div>
                <p className="font-semibold text-deep">{product.title}</p>
                <p className="text-xs uppercase tracking-[0.2em]">{product.sku}</p>
              </div>
              <div className="flex items-center gap-4">
                <span>{product.stockQty} in stock</span>
                <span>{product.isActive ? 'Active' : 'Hidden'}</span>
                <Link href={`/admin/products/${product.id}`} className="text-xs uppercase tracking-[0.2em] text-deep">
                  Edit
                </Link>
              </div>
            </div>
          ))}
          {products.length === 0 && (
            <p className="text-sm text-deep/60">No products yet. Create your first product.</p>
          )}
        </div>
      </div>
    </div>
  );
}
