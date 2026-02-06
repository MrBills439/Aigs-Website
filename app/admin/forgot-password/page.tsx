'use client';

import { useState } from 'react';

export const dynamic = 'force-dynamic';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  async function submit() {
    setStatus('sending');
    const response = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    setStatus(response.ok ? 'sent' : 'idle');
  }

  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-md flex-col justify-center px-6">
      <div className="card p-8">
        <h1 className="font-serif text-3xl">Reset password</h1>
        <p className="mt-2 text-sm text-deep/70">
          Enter your admin email and we’ll send a reset link.
        </p>
        <div className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-2xl border border-rose/40 bg-white px-4 py-2 text-sm"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <button
            type="button"
            onClick={submit}
            className="w-full rounded-full bg-deep px-6 py-3 text-xs uppercase tracking-[0.2em] text-white"
            disabled={status === 'sending'}
          >
            {status === 'sent' ? 'Email sent' : status === 'sending' ? 'Sending...' : 'Send reset link'}
          </button>
        </div>
      </div>
    </div>
  );
}
