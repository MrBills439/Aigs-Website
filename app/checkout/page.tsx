'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { checkoutSchema } from '@/lib/validators';
import type { z } from 'zod';
import { useCartStore } from '@/lib/cart';
import { formatMoney } from '@/lib/format';
import { useRouter } from 'next/navigation';
import PayNow from '@/components/paypay';

const deliveryFees: Record<string, number> = {
  STANDARD: 1000,
  EXPRESS: 2500,
  COLLECTION: 0
};

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clear } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  const form = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      deliveryMethod: 'STANDARD',
      paymentMethod: 'BANK_TRANSFER'
    }
  });

  const deliveryMethod = form.watch('deliveryMethod');
  const shippingFee = deliveryFees[deliveryMethod];

  async function onSubmit(values: CheckoutForm) {
    if (items.length === 0) {
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          items,
          currency: 'GHS'
        })
      });
      if (!response.ok) {
        throw new Error('Failed to place order');
      }
      const data = (await response.json()) as { orderId: string };
      clear();
      router.push(`/checkout/success?orderId=${data.orderId}`);
    } catch (error) {
      console.error(error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-12 md:px-6 md:py-16">
      <h1 className="section-title">Checkout</h1>
      <div className="mt-8 grid gap-10 md:grid-cols-[1.2fr,0.8fr]">
        <form onSubmit={form.handleSubmit(onSubmit)} className="card space-y-6 p-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-deep/60">Customer details</p>
            <div className="mt-4 grid gap-4">
              <input
                placeholder="Full name"
                className="rounded-2xl border border-rose/40 bg-white px-4 py-2 text-sm"
                {...form.register('customerName')}
              />
              <input
                placeholder="Email address"
                type="email"
                className="rounded-2xl border border-rose/40 bg-white px-4 py-2 text-sm"
                {...form.register('customerEmail')}
              />
              <input
                placeholder="Phone number"
                className="rounded-2xl border border-rose/40 bg-white px-4 py-2 text-sm"
                {...form.register('phone')}
              />
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-deep/60">Delivery</p>
            <select
              className="mt-3 w-full rounded-2xl border border-rose/40 bg-white px-4 py-2 text-sm"
              {...form.register('deliveryMethod')}
            >
              <option value="STANDARD">Standard delivery</option>
              <option value="EXPRESS">Express delivery</option>
              <option value="COLLECTION">Collection / pickup</option>
            </select>
          </div>
          {deliveryMethod !== 'COLLECTION' && (
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-deep/60">Shipping address</p>
              <div className="mt-4 grid gap-4">
                <input
                  placeholder="Address line 1"
                  className="rounded-2xl border border-rose/40 bg-white px-4 py-2 text-sm"
                  {...form.register('shippingAddressLine1')}
                />
                <input
                  placeholder="Address line 2"
                  className="rounded-2xl border border-rose/40 bg-white px-4 py-2 text-sm"
                  {...form.register('shippingAddressLine2')}
                />
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    placeholder="City"
                    className="rounded-2xl border border-rose/40 bg-white px-4 py-2 text-sm"
                    {...form.register('city')}
                  />
                  <input
                    placeholder="Postcode"
                    className="rounded-2xl border border-rose/40 bg-white px-4 py-2 text-sm"
                    {...form.register('postcode')}
                  />
                </div>
                <input
                  placeholder="Country"
                  className="rounded-2xl border border-rose/40 bg-white px-4 py-2 text-sm"
                  {...form.register('country')}
                />
              </div>
            </div>
          )}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-deep/60">Payment method</p>
            <select
              className="mt-3 w-full rounded-2xl border border-rose/40 bg-white px-4 py-2 text-sm"
              {...form.register('paymentMethod')}
            >
              <option value="BANK_TRANSFER">Bank transfer</option>
              <option value="CASH_ON_COLLECTION">Cash on collection</option>
              <option value="PAYMENT_LINK">Payment link</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-deep/60">Order notes</p>
            <textarea
              placeholder="Need it before Friday"
              className="mt-3 min-h-[120px] w-full rounded-2xl border border-rose/40 bg-white px-4 py-2 text-sm"
              {...form.register('notes')}
            />
          </div>


          {/* place order button */}
            <PayNow 
              email={form.getValues('customerEmail')} 
              amount={subtotal + shippingFee}
            />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-deep px-6 py-3 text-sm uppercase tracking-[0.2em] text-white disabled:cursor-not-allowed disabled:bg-deep/40"
          >
            {isSubmitting ? 'Placing order...' : 'Place order'}
          </button>
        </form>
        <div className="card space-y-4 p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-deep/60">Order summary</p>
          {items.length === 0 ? (
            <p className="text-sm text-deep/70">Your cart is empty.</p>
          ) : (
            <div className="space-y-3 text-sm text-deep/70">
              {items.map((item) => (
                <div key={item.productId} className="flex justify-between">
                  <span>{item.title} × {item.qty}</span>
                  <span>{formatMoney(item.price * item.qty, item.currency)}</span>
                </div>
              ))}
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatMoney(subtotal, 'GHS')}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{formatMoney(shippingFee, 'GHS')}</span>
              </div>
              <div className="flex justify-between text-base font-semibold text-deep">
                <span>Total</span>
                <span>{formatMoney(subtotal + shippingFee, 'GHS')}</span>
              </div>
              <p className="text-xs text-deep/60">
                Payment is manual. We will contact you after checkout to arrange payment.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
