export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12 md:px-6 md:py-16">
      <span className="badge">Our Story</span>
      <h1 className="mt-4 font-serif text-4xl">About ADIS WiGS AND Beauty</h1>
      <p className="mt-6 text-sm text-deep/70">
        ADIS WiGS AND Beauty was founded to celebrate artistry, confidence, and effortless luxury.
        We curate premium-grade hair, bespoke color blends, and tailored styling guidance for every
        client. Our concierge approach means each order is handled personally, from product
        selection to payment and delivery coordination.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="card p-6">
          <h2 className="font-serif text-2xl">Premium materials</h2>
          <p className="mt-3 text-sm text-deep/70">
            We source only the highest quality virgin hair and lace materials to ensure a natural,
            long-lasting finish.
          </p>
        </div>
        <div className="card p-6">
          <h2 className="font-serif text-2xl">Concierge service</h2>
          <p className="mt-3 text-sm text-deep/70">
            Our team is available for fit consultations, styling guidance, and custom requests.
          </p>
        </div>
      </div>
    </div>
  );
}
