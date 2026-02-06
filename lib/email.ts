import { Resend } from 'resend';
import type { Order, OrderItem } from '@prisma/client';
import { formatMoney } from '@/lib/format';

const resend = new Resend(process.env.RESEND_API_KEY || '');

export function ownerOrderEmail(order: Order, items: OrderItem[]) {
  const rows = items
    .map(
      (item) =>
        `<tr><td>${item.titleSnapshot}</td><td>${item.qty}</td><td>${formatMoney(item.priceSnapshot, order.currency ?? 'GHS')}</td></tr>`
    )
    .join('');

  return `
    <div style="font-family: Arial, sans-serif; color: #1a1512;">
      <h2>New order received (#${order.id})</h2>
      <p><strong>Customer:</strong> ${order.customerName} (${order.customerEmail})</p>
      <p><strong>Phone:</strong> ${order.phone}</p>
      <p><strong>Delivery:</strong> ${order.deliveryMethod}</p>
      <p><strong>Payment method:</strong> ${order.paymentMethod}</p>
      <p><strong>Address:</strong> ${order.shippingAddressLine1 || ''} ${order.shippingAddressLine2 || ''}, ${order.city || ''}, ${order.postcode || ''}, ${order.country || ''}</p>
      <p><strong>Notes:</strong> ${order.notes || 'None'}</p>
      <table style="width:100%; border-collapse: collapse; margin-top: 16px;">
        <thead>
          <tr><th align="left">Item</th><th align="left">Qty</th><th align="left">Price</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
      <p><strong>Subtotal:</strong> ${formatMoney(order.subtotal, order.currency ?? 'GHS')}</p>
      <p><strong>Shipping:</strong> ${formatMoney(order.shippingFee, order.currency ?? 'GHS')}</p>
      <p><strong>Total:</strong> ${formatMoney(order.total, order.currency ?? 'GHS')}</p>
    </div>
  `;
}

export function customerOrderEmail(order: Order, items: OrderItem[]) {
  const rows = items
    .map(
      (item) =>
        `<tr><td>${item.titleSnapshot}</td><td>${item.qty}</td><td>${formatMoney(item.priceSnapshot, order.currency ?? 'GHS')}</td></tr>`
    )
    .join('');

  return `
    <div style="font-family: Arial, sans-serif; color: #1a1512;">
      <h2>Thank you for your order (#${order.id})</h2>
      <p>We received your request and will contact you to arrange payment and delivery.</p>
      <table style="width:100%; border-collapse: collapse; margin-top: 16px;">
        <thead>
          <tr><th align="left">Item</th><th align="left">Qty</th><th align="left">Price</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
      <p><strong>Subtotal:</strong> ${formatMoney(order.subtotal, order.currency ?? 'GHS')}</p>
      <p><strong>Shipping:</strong> ${formatMoney(order.shippingFee, order.currency ?? 'GHS')}</p>
      <p><strong>Total:</strong> ${formatMoney(order.total, order.currency ?? 'GHS')}</p>
      <p><strong>Next steps:</strong> Payment is manual. Our team will reach out with payment instructions.</p>
    </div>
  `;
}

export async function sendOrderEmails(params: {
  order: Order;
  items: OrderItem[];
  ownerEmail: string;
}) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not configured');
  }

  const { order, items, ownerEmail } = params;

  await resend.emails.send({
    from: 'ADIS WiGS AND Beauty <orders@adiswigsandbeauty.com>',
    to: ownerEmail,
    subject: `New order #${order.id} received`,
    html: ownerOrderEmail(order, items)
  });

  await resend.emails.send({
    from: 'ADIS WiGS AND Beauty <orders@adiswigsandbeauty.com>',
    to: order.customerEmail,
    subject: `Your ADIS WiGS AND Beauty order #${order.id}`,
    html: customerOrderEmail(order, items)
  });
}

export async function sendPasswordResetEmail(params: {
  to: string;
  resetUrl: string;
}) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not configured');
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { to, resetUrl } = params;

  await resend.emails.send({
    from: 'ADIS WiGS AND Beauty <security@adiswigsandbeauty.com>',
    to,
    subject: 'Reset your ADIS WiGS AND Beauty admin password',
    html: `<p>We received a request to reset your admin password.</p>\n<p><a href=\"${resetUrl}\">Reset your password</a></p>\n<p>This link will expire in 1 hour.</p>`
  });
}
