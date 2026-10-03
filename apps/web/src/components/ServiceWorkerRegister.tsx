'use client';

import { useEffect } from 'react';
import { syncCoordinator } from '../lib/sync/syncCoordinator';

export const ServiceWorkerRegister: React.FC = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('[PWA] Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
          console.warn('[PWA] Service Worker registration failed:', error);
        });

      // Initial sync check
      syncCoordinator.sync();
    }
  }, []);

  return null;
};
