import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendOrderEmails } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const { orderId } = await request.json();
    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true }
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    if (order.emailSentAt) {
      return NextResponse.json({ status: 'already_sent' });
    }

    const ownerEmail = process.env.OWNER_EMAIL;
    if (!ownerEmail) {
      return NextResponse.json({ error: 'OWNER_EMAIL is not configured' }, { status: 500 });
    }

    await sendOrderEmails({ order, items: order.items, ownerEmail });
    await prisma.order.update({
      where: { id: order.id },
      data: { emailSentAt: new Date() }
    });

    return NextResponse.json({ status: 'sent' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Unable to send email.' }, { status: 500 });
  }
}
