import { prisma } from '@/lib/prisma';
import { formatMoney } from '@/lib/format';
import OrderStatusForm from '@/components/admin/OrderStatusForm';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminOrderDetailPage({ params }: { params: { id: string } }) {
  const order = await prisma.order.findUnique({
    where: { id: params.id },
    include: { items: true }
  });

  if (!order) {
    return <p className="text-sm">Order not found.</p>;
  }

  return (
    <div className="space-y-8">
      <div className="card p-6">
        <h1 className="font-serif text-3xl">Order #{order.id}</h1>
        <p className="mt-2 text-sm text-deep/70">{order.customerName} · {order.customerEmail}</p>
        <div className="mt-6 grid gap-3 text-sm text-deep/70">
          <div className="flex justify-between"><span>Phone</span><span>{order.phone}</span></div>
          <div className="flex justify-between"><span>Delivery</span><span>{order.deliveryMethod}</span></div>
          <div className="flex justify-between"><span>Payment</span><span>{order.paymentMethod}</span></div>
          <div className="flex justify-between"><span>Address</span><span>{order.shippingAddressLine1 || 'Collection'} {order.city || ''}</span></div>
        </div>
      </div>
      <div className="card p-6">
        <h2 className="font-serif text-2xl">Items</h2>
        <div className="mt-4 space-y-3 text-sm">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between">
              <span>{item.titleSnapshot} × {item.qty}</span>
              <span>{formatMoney(item.priceSnapshot * item.qty, order.currency)}</span>
            </div>
          ))}
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>{formatMoney(order.subtotal, order.currency)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>{formatMoney(order.shippingFee, order.currency)}</span>
          </div>
          <div className="flex justify-between text-base font-semibold">
            <span>Total</span>
            <span>{formatMoney(order.total, order.currency)}</span>
          </div>
        </div>
      </div>
      <OrderStatusForm
        orderId={order.id}
        initialFulfillmentStatus={order.fulfillmentStatus}
        initialPaymentStatus={order.paymentStatus}
        initialAdminNotes={order.adminNotes}
      />
    </div>
  );
}
