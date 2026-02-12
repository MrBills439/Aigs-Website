import Link from 'next/link';

export default async function CheckoutSuccessPage({
  searchParams
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const { orderId } = await searchParams;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16 text-center md:px-6 md:py-20">
      <div className="card p-10">
        <span className="badge">Order placed</span>

        <h1 className="mt-4 font-serif text-3xl">
          Thank you for your order
        </h1>

        <p className="mt-3 text-sm text-deep/70">
          Your order number is <strong>#{orderId ?? 'Pending'}</strong>. 
          We will contact you shortly to arrange payment and delivery details.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/shop"
            className="rounded-full bg-deep px-6 py-3 text-xs uppercase tracking-[0.2em] text-white"
          >
            Continue shopping
          </Link>

          <Link
            href="/contact"
            className="rounded-full border border-deep/20 px-6 py-3 text-xs uppercase tracking-[0.2em)"
          >
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}
