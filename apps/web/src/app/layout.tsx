import type { Metadata, Viewport } from 'next';
import { ServiceWorkerRegister } from '../components/ServiceWorkerRegister';
import '../styles/tokens.css';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Kinetic — High Performance Strength & Hypertrophy PWA',
  description: 'Mobile-first, offline-first gym tracking designed for high-stress gym environments with real-time anatomy cues and instant numeric logging.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Kinetic',
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0f1013',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body>
        <main className="app-viewport">
          <ServiceWorkerRegister />
          {children}
        </main>
      </body>
    </html>
  );
}
