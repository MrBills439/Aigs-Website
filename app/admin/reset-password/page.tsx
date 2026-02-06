'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export const dynamic = 'force-dynamic';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'saving' | 'done'>('idle');

  async function submit() {
    if (!token) {
      alert('Missing token.');
      return;
    }
    setStatus('saving');
    const response = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password })
    });
    setStatus(response.ok ? 'done' : 'idle');
  }

  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-md flex-col justify-center px-6">
      <div className="card p-8">
        <h1 className="font-serif text-3xl">Set a new password</h1>
        <p className="mt-2 text-sm text-deep/70">
          Enter your new admin password below.
        </p>
        <div className="mt-6 space-y-4">
          <input
            type="password"
            placeholder="New password"
            className="w-full rounded-2xl border border-rose/40 bg-white px-4 py-2 text-sm"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button
            type="button"
            onClick={submit}
            className="w-full rounded-full bg-deep px-6 py-3 text-xs uppercase tracking-[0.2em] text-white"
            disabled={status === 'saving'}
          >
            {status === 'done' ? 'Password updated' : status === 'saving' ? 'Saving...' : 'Update password'}
          </button>
        </div>
      </div>
    </div>
  );
}
