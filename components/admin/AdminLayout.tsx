import Link from 'next/link';
import BrandLogo from '@/components/BrandLogo';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-sand">
      <div className="border-b border-rose/30 bg-white/80">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <BrandLogo />
          <nav className="flex items-center gap-4 text-xs uppercase tracking-[0.2em] text-deep/60">
            <Link href="/admin">Overview</Link>
            <Link href="/admin/products">Products</Link>
            <Link href="/admin/orders">Orders</Link>
            <Link href="/admin/reviews">Reviews</Link>
          </nav>
        </div>
      </div>
      <div className="mx-auto w-full max-w-6xl px-6 py-10">{children}</div>
    </div>
  );
}
