import type { Metadata, Viewport } from 'next';
import { ServiceWorkerRegister } from '../components/ServiceWorkerRegister';
import '../styles/tokens.css';
import '../styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://nextset-4u3.pages.dev'),
  title: 'NextSet - Always by your side at the rack.',
  description: 'Mobile-first, offline-first gym tracking designed for high-stress gym environments with real-time anatomy cues and instant numeric logging.',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
  },
  openGraph: {
    title: 'NextSet — High Performance Strength & Hypertrophy PWA',
    description: 'Mobile-first, offline-first gym tracking designed for high-stress gym environments with real-time anatomy cues and instant numeric logging.',
    url: '/',
    siteName: 'NextSet',
    images: [
      {
        url: '/icons/icon-512.png',
        width: 512,
        height: 512,
        alt: 'NextSet Icon',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'NextSet — High Performance Strength & Hypertrophy PWA',
    description: 'Mobile-first, offline-first gym tracking designed for high-stress gym environments.',
    images: ['/icons/icon-512.png'],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'NextSet',
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0d0f12',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body suppressHydrationWarning>
        <main className="app-viewport">
          <ServiceWorkerRegister />
          {children}
        </main>
      </body>
    </html>
  );
}
