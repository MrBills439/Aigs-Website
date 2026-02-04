'use client';

import { signOut } from 'next-auth/react';

export default function AdminSignOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: '/admin/login' })}
      className="rounded-full border border-deep/20 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-deep/70"
    >
      Sign out
    </button>
  );
}
