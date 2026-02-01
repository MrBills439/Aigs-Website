'use client';

import { useState } from 'react';

export default function OrderStatusForm({
  orderId,
  initialFulfillmentStatus,
  initialPaymentStatus,
  initialAdminNotes
}: {
  orderId: string;
  initialFulfillmentStatus: string;
  initialPaymentStatus: string;
  initialAdminNotes?: string | null;
}) {
  const [fulfillmentStatus, setFulfillmentStatus] = useState(initialFulfillmentStatus);
  const [paymentStatus, setPaymentStatus] = useState(initialPaymentStatus);
  const [adminNotes, setAdminNotes] = useState(initialAdminNotes ?? '');
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    await fetch(`/api/admin/orders/${orderId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fulfillmentStatus, paymentStatus, adminNotes })
    });
    setSaving(false);
  }

  return (
    <div className="card space-y-4 p-6">
      <div>
        <label className="text-xs uppercase tracking-[0.2em] text-deep/60">Fulfillment status</label>
        <select
          value={fulfillmentStatus}
          onChange={(event) => setFulfillmentStatus(event.target.value)}
          className="mt-2 w-full rounded-2xl border border-rose/40 bg-white px-4 py-2 text-sm"
        >
          {['NEW', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'].map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-xs uppercase tracking-[0.2em] text-deep/60">Payment status</label>
        <select
          value={paymentStatus}
          onChange={(event) => setPaymentStatus(event.target.value)}
          className="mt-2 w-full rounded-2xl border border-rose/40 bg-white px-4 py-2 text-sm"
        >
          {['UNPAID', 'PAID'].map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-xs uppercase tracking-[0.2em] text-deep/60">Admin notes</label>
        <textarea
          value={adminNotes}
          onChange={(event) => setAdminNotes(event.target.value)}
          className="mt-2 min-h-[120px] w-full rounded-2xl border border-rose/40 bg-white px-4 py-2 text-sm"
        />
      </div>
      <button
        type="button"
        onClick={save}
        disabled={saving}
        className="rounded-full bg-deep px-6 py-3 text-xs uppercase tracking-[0.2em] text-white"
      >
        {saving ? 'Saving...' : 'Save changes'}
      </button>
    </div>
  );
}
