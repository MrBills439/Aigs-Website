'use client';

import { usePathname } from 'next/navigation';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import RouteLoader from '@/components/RouteLoader';

export default function RouteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <>
      {!isAdmin && <SiteHeader />}
      <RouteLoader />
      <main>{children}</main>
      {!isAdmin && <SiteFooter />}
    </>
  );
}
