const testimonials = [
  {
    name: 'Amina O.',
    quote: 'The lace melt is flawless. ADIS WiGS AND Beauty matched my tone perfectly.'
  },
  {
    name: 'Nicole A.',
    quote: 'Loved the concierge service. They helped me choose the right density for my event.'
  },
  {
    name: 'Sade T.',
    quote: 'Luxury packaging, beautiful texture, and the wig was ready to wear out of the box.'
  }
];

export default function Testimonials() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6">
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div>
          <span className="badge">Testimonials</span>
          <h2 className="section-title mt-4">Clients love our artistry</h2>
        </div>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {testimonials.map((item) => (
          <div key={item.name} className="card p-6">
            <p className="text-sm text-deep/70">“{item.quote}”</p>
            <p className="mt-4 text-xs uppercase tracking-[0.3em] text-deep/60">{item.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
