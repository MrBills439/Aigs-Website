import './globals.css';
import type { Metadata } from 'next';
import { Playfair_Display, Manrope } from 'next/font/google';
import RouteChrome from '@/components/RouteChrome';

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' });

export const metadata: Metadata = {
  title: 'ADIS WiGS AND Beauty',
  description: 'Premium wigs and beauty essentials crafted for confidence and elegance.',
  icons:{
    icon:['/favicon.ico?v=4'],
    apple:['/apple-touch-icon.png?v=4'],
    shortcut:['/apple-touch-icon.pmg']
  },
  metadataBase: new URL('https://www.adiswigsandbeauty.com'),
  openGraph: {
    title: 'ADIS WiGS AND Beauty',
    description: 'Premium wigs and beauty essentials crafted for confidence and elegance.',
    url: 'https://www.adiswigsandbeauty.com',
    siteName: 'ADIS WiGS AND Beauty',
    images: [{ url: '/opengraph-image.svg', width: 1200, height: 630, alt: 'ADIS WiGS AND Beauty' }],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ADIS WiGS AND Beauty',
    description: 'Premium wigs and beauty essentials crafted for confidence and elegance.'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${manrope.variable}`}>
      <body className="font-sans">
        <div className="flex min-h-screen flex-col bg-sand">
          <RouteChrome>{children}</RouteChrome>
        </div>
      </body>
    </html>
  );
}
