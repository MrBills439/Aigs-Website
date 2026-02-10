'use client';

import { useState } from 'react';

type Props = {
  orderId: string;
  fulfillmentStatus: string;
};

export default function OrderActions({ orderId, fulfillmentStatus }: Props) {
  const [loading, setLoading] = useState(false);

  async function updateStatus(nextStatus: string) {
    setLoading(true);
    // Quick status transitions from the orders list for day-to-day fulfillment workflow.
    await fetch(`/api/admin/orders/${orderId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fulfillmentStatus: nextStatus })
    });
    setLoading(false);
    window.location.reload();
  }

  return (
    <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-deep/60">
      {fulfillmentStatus === 'NEW' && (
        <button
          type="button"
          onClick={() => updateStatus('PROCESSING')}
          disabled={loading}
          className="rounded-full border border-deep/20 px-3 py-1"
        >
          Accept
        </button>
      )}
      {fulfillmentStatus === 'PROCESSING' && (
        <button
          type="button"
          onClick={() => updateStatus('SHIPPED')}
          disabled={loading}
          className="rounded-full border border-deep/20 px-3 py-1"
        >
          Mark shipped
        </button>
      )}
    </div>
  );
}
