import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { checkoutSchema } from '@/lib/validators';
import { sendOrderEmails } from '@/lib/email';
import { z } from 'zod';












const cartItemSchema = z.object({
  productId: z.string(),
  qty: z.number().min(1)
});

const orderSchema = checkoutSchema.and(
  z.object({
    items: z.array(cartItemSchema).min(1),
    currency: z.string().default('GHS')
  })
);

const shippingFees: Record<string, number> = {
  STANDARD: 1000,
  EXPRESS: 2500,
  COLLECTION: 0
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = orderSchema.parse(body);

    const items = parsed.items;
    const products = await prisma.product.findMany({
      where: { id: { in: items.map((item) => item.productId) }, isActive: true },
      include: { media: { orderBy: { sortOrder: 'asc' } } }
    });

    if (products.length !== items.length) {
      return NextResponse.json({ error: 'One or more products are unavailable.' }, { status: 400 });
    }

    const orderItems = items.map((item) => {
      const product = products.find((entry) => entry.id === item.productId);
      if (!product) {
        throw new Error('Product not found');
      }
      if (product.stockQty < item.qty) {
        throw new Error(`Insufficient stock for ${product.title}`);
      }
      return {
        product,
        qty: item.qty,
        priceSnapshot: product.price,
        titleSnapshot: product.title,
        mediaSnapshotUrl: product.media[0]?.url ?? null
      };
    });

    const subtotal = orderItems.reduce((sum, item) => sum + item.priceSnapshot * item.qty, 0);
    const shippingFee = shippingFees[parsed.deliveryMethod] ?? 0;
    const total = subtotal + shippingFee;

    const order = await prisma.$transaction(async (tx) => {
      for (const item of orderItems) {
        const updated = await tx.product.updateMany({
          where: { id: item.product.id, stockQty: { gte: item.qty } },
          data: { stockQty: { decrement: item.qty } }
        });
        if (updated.count === 0) {
          throw new Error(`Insufficient stock for ${item.titleSnapshot}`);
        }
      }

      return tx.order.create({
        data: {
          customerName: parsed.customerName,
          customerEmail: parsed.customerEmail,
          phone: parsed.phone,
          shippingAddressLine1: parsed.shippingAddressLine1,
          shippingAddressLine2: parsed.shippingAddressLine2,
          city: parsed.city,
          postcode: parsed.postcode,
          country: parsed.country,
          deliveryMethod: parsed.deliveryMethod,
          paymentMethod: parsed.paymentMethod,
          notes: parsed.notes,
          subtotal,
          shippingFee,
          total,
          currency: parsed.currency,
          items: {
            create: orderItems.map((item) => ({
              productId: item.product.id,
              titleSnapshot: item.titleSnapshot,
              priceSnapshot: item.priceSnapshot,
              qty: item.qty,
              mediaSnapshotUrl: item.mediaSnapshotUrl
            }))
          }
        },
        include: { items: true }
      });
    });

    if (!order.emailSentAt) {
      const ownerEmail = process.env.OWNER_EMAIL;
      if (ownerEmail) {
        await sendOrderEmails({ order, items: order.items, ownerEmail });
        await prisma.order.update({
          where: { id: order.id },
          data: { emailSentAt: new Date() }
        });
      }
    }

    return NextResponse.json({ orderId: order.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Unable to create order.' }, { status: 400 });
  }
}
