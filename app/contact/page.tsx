'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { contactSchema } from '@/lib/validators';

type ContactForm = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const form = useForm<ContactForm>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(values: ContactForm) {
    setStatus('sending');
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    });
    if (response.ok) {
      setStatus('sent');
      form.reset();
    } else {
      setStatus('idle');
      alert('Unable to send message. Please try again.');
    }
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12 md:px-6 md:py-16">
      <span className="badge">Contact</span>
      <h1 className="mt-4 font-serif text-4xl">Let’s talk beauty</h1>
      <p className="mt-3 text-sm text-deep/70">
        Share your styling goals or order questions. Our team will respond within 24-48 hours.
      </p>
      <form onSubmit={form.handleSubmit(onSubmit)} className="card mt-10 space-y-4 p-6">
        <input
          placeholder="Your name"
          className="rounded-2xl border border-rose/40 bg-white px-4 py-2 text-sm"
          {...form.register('name')}
        />
        <input
          placeholder="Email address"
          type="email"
          className="rounded-2xl border border-rose/40 bg-white px-4 py-2 text-sm"
          {...form.register('email')}
        />
        <textarea
          placeholder="How can we help?"
          className="min-h-[140px] rounded-2xl border border-rose/40 bg-white px-4 py-2 text-sm"
          {...form.register('message')}
        />
        <button
          type="submit"
          className="rounded-full bg-deep px-6 py-3 text-xs uppercase tracking-[0.2em] text-white"
          disabled={status === 'sending'}
        >
          {status === 'sent' ? 'Message sent' : status === 'sending' ? 'Sending...' : 'Send message'}
        </button>
      </form>
    </div>
  );
}
