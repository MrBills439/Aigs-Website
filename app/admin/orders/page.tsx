export const dynamic = 'force-dynamic';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';



export default async function AdminOrdersPage({
  searchParams
}: {
  searchParams: { status?: string };
}) {
  const statusFilter = searchParams.status;
  const orders = await prisma.order.findMany({
    where: statusFilter ? { fulfillmentStatus: statusFilter as any } : undefined,
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-3xl">Orders</h1>
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-deep/60">
          <Link href="/admin/orders?status=NEW">New</Link>
          <Link href="/admin/orders?status=PROCESSING">Processing</Link>
          <Link href="/admin/orders?status=SHIPPED">Shipped</Link>
        </div>
      </div>
      <div className="card p-6">
        {orders.length === 0 ? (
          <p className="text-sm text-deep/60">No orders found.</p>
        ) : (
          <div className="space-y-4 text-sm">
            {orders.map((order) => (
              <Link
                key={order.id}
                href={`/admin/orders/${order.id}`}
                className="flex flex-wrap items-center justify-between gap-4 border-b border-rose/30 pb-3"
              >
                <div>
                  <p className="font-semibold text-deep">#{order.id}</p>
                  <p className="text-xs text-deep/60">{order.customerName} · {order.customerEmail}</p>
                </div>
                <div className="flex items-center gap-4 text-xs uppercase tracking-[0.2em] text-deep/60">
                  <span>{order.fulfillmentStatus}</span>
                  <span>{order.paymentStatus}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
