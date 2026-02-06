'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';

export const dynamic = 'force-dynamic';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <div className="mx-auto flex min-h-[80vh] w-full max-w-md flex-col justify-center px-6">
      <div className="card p-8">
        <h1 className="font-serif text-3xl">Admin login</h1>
        <p className="mt-2 text-sm text-deep/70">Sign in to manage ADIS WiGS AND Beauty.</p>
        <form
          className="mt-6 space-y-4"
          onSubmit={async (event) => {
            event.preventDefault();
            setLoading(true);
            await signIn('credentials', {
              email,
              password,
              callbackUrl: '/admin'
            });
            setLoading(false);
          }}
        >
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-2xl border border-rose/40 bg-white px-4 py-2 text-sm"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full rounded-2xl border border-rose/40 bg-white px-4 py-2 pr-12 text-sm"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs uppercase tracking-[0.2em] text-deep/60"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-deep px-6 py-3 text-xs uppercase tracking-[0.2em] text-white"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
          <a href="/admin/forgot-password" className="block text-center text-xs uppercase tracking-[0.2em] text-deep/60">
            Forgot password?
          </a>
        </form>
      </div>
    </div>
  );
}
