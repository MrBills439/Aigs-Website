'use client';

import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6">
      <div className="card grid gap-8 p-8 md:grid-cols-[1.2fr,1fr]">
        <div>
          <span className="badge">Newsletter</span>
          <h2 className="section-title mt-4">Get first access to new drops</h2>
          <p className="mt-3 text-sm text-deep/70">
            Join the ADIS WiGS AND Beauty list for exclusive launches, styling tips, and concierge
            appointments.
          </p>
        </div>
        <form
          className="flex flex-col gap-3"
          onSubmit={(event) => {
            event.preventDefault();
            if (email.trim()) {
              setSubmitted(true);
            }
          }}
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="rounded-full border border-rose/40 bg-white px-4 py-3 text-sm"
          />
          <button
            type="submit"
            className="rounded-full bg-deep px-6 py-3 text-sm uppercase tracking-[0.2em] text-white"
          >
            {submitted ? 'You are on the list' : 'Join now'}
          </button>
        </form>
      </div>
    </section>
  );
}
