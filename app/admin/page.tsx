import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function AdminOverviewPage() {
  const [orderCount, newOrders, lowStock] = await Promise.all([
    prisma.order.count(),
    prisma.order.count({ where: { fulfillmentStatus: 'NEW' } }),
    prisma.product.findMany({ where: { stockQty: { lte: 3 } }, orderBy: { stockQty: 'asc' }, take: 5 })
  ]);

  return (
    <div className="space-y-10">
      <div className="grid gap-6 md:grid-cols-3">
        <div className="card p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-deep/60">Total orders</p>
          <p className="mt-4 font-serif text-3xl">{orderCount}</p>
        </div>
        <div className="card p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-deep/60">New orders</p>
          <p className="mt-4 font-serif text-3xl">{newOrders}</p>
        </div>
        <div className="card p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-deep/60">Low stock</p>
          <p className="mt-4 font-serif text-3xl">{lowStock.length}</p>
        </div>
      </div>
      <div className="card p-6">
        <h2 className="font-serif text-2xl">Low stock alerts</h2>
        {lowStock.length === 0 ? (
          <p className="mt-4 text-sm text-deep/70">All products are sufficiently stocked.</p>
        ) : (
          <div className="mt-4 space-y-2 text-sm text-deep/70">
            {lowStock.map((product) => (
              <div key={product.id} className="flex justify-between">
                <span>{product.title}</span>
                <span>{product.stockQty} left</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
