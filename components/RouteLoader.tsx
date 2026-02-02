'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function RouteLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timeout);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-sand/90">
      <div className="flex flex-col items-center gap-4">
        <div className="runner" aria-hidden="true">
          <div className="runner-dot" />
          <div className="runner-dot" />
          <div className="runner-dot" />
        </div>
        <p className="text-xs uppercase tracking-[0.3em] text-deep/60">Loading</p>
      </div>
    </div>
  );
}
