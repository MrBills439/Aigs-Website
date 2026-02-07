'use client';

import { useState } from 'react';

type Props = {
  productId: string;
  isActive: boolean;
};

export default function ProductStatusToggle({ productId, isActive }: Props) {
  const [active, setActive] = useState(isActive);
  const [saving, setSaving] = useState(false);

  async function toggle() {
    const next = !active;
    setSaving(true);
    const response = await fetch(`/api/admin/products/${productId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isActive: next })
    });
    if (response.ok) {
      setActive(next);
    } else {
      alert('Unable to update status');
    }
    setSaving(false);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={saving}
      className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.2em] ${
        active ? 'border-emerald-300 text-emerald-700' : 'border-rose/40 text-deep/50'
      }`}
    >
      {active ? 'Active' : 'Hidden'}
    </button>
  );
}
