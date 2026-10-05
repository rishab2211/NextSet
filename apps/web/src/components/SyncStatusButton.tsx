'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import {
  Wifi,
  WifiOff,
  RefreshCw,
  CloudUpload,
  Check,
  Database,
  X,
  ShieldCheck,
  LogIn,
} from 'lucide-react';
import { db } from '../lib/db';
import { syncCoordinator } from '../lib/sync/syncCoordinator';
import { getCurrentUser, type AuthUser } from '../lib/auth/authStore';
import styles from './SyncStatusButton.module.css';

interface SyncStatusButtonProps {
  onOpenAuth?: () => void;
  className?: string;
}

function formatRelativeTime(date: Date | null): string {
  if (!date) return 'Not yet synced';
  const now = Date.now();
  const diffSec = Math.floor((now - date.getTime()) / 1000);

  if (diffSec < 10) return 'Just now';
  if (diffSec < 60) return `${diffSec}s ago`;
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour}h ago`;
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export const SyncStatusButton: React.FC<SyncStatusButtonProps> = ({
  onOpenAuth,
  className = '',
}) => {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const [justSynced, setJustSynced] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [, setTimeTick] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<any>(null);

  // Real-time Dexie sync queue count
  const pendingCount = useLiveQuery(() => db.syncQueue.count(), []) ?? 0;

  useEffect(() => {
    if (typeof window === 'undefined') return;

    setIsOnline(navigator.onLine);
    setCurrentUser(getCurrentUser());
    setIsSyncing(syncCoordinator.getIsSyncing());
    setLastSyncTime(syncCoordinator.getLastSyncTime());

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    const handleAuthChange = () => setCurrentUser(getCurrentUser());

    // Subscribe to SyncCoordinator state changes
    const unsubscribeSync = syncCoordinator.subscribe((state) => {
      setIsSyncing(state.isSyncing);
      if (state.lastSyncTime) {
        setLastSyncTime(state.lastSyncTime);
      }
    });

    // Relative time updater tick every 15s
    const tickInterval = setInterval(() => {
      setTimeTick((t) => t + 1);
    }, 15000);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('nextset_auth_change', handleAuthChange);
    window.addEventListener('kinetic_auth_change', handleAuthChange);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('nextset_auth_change', handleAuthChange);
      window.removeEventListener('kinetic_auth_change', handleAuthChange);
      clearInterval(tickInterval);
      unsubscribeSync();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Close popover on Escape or outside click
  useEffect(() => {
    if (!isPopoverOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsPopoverOpen(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsPopoverOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPopoverOpen]);

  const handleManualSync = async () => {
    if (isSyncing || !isOnline) return;

    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(15);
      } catch (_) {}
    }

    try {
      await syncCoordinator.syncAndPull();
      setJustSynced(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setJustSynced(false);
      }, 2500);
    } catch (err) {
      console.warn('Manual sync failed:', err);
    }
  };

  const handlePillClick = () => {
    setIsPopoverOpen((prev) => !prev);
  };

  // Determine appearance and label
  let buttonStyle = styles.stateSynced;
  let icon = <Wifi size={11} strokeWidth={2.5} />;
  let label = 'Synced';

  if (justSynced) {
    buttonStyle = styles.stateJustSynced;
    icon = <Check size={11} strokeWidth={2.8} />;
    label = 'Synced!';
  } else if (isSyncing) {
    buttonStyle = styles.stateSyncing;
    icon = <RefreshCw size={11} strokeWidth={2.5} className={styles.spinIcon} />;
    label = 'Syncing...';
  } else if (!isOnline) {
    buttonStyle = styles.stateOffline;
    icon = <WifiOff size={11} strokeWidth={2.5} />;
    label = 'Offline';
  } else if (pendingCount > 0) {
    buttonStyle = styles.statePending;
    icon = <CloudUpload size={11} strokeWidth={2.5} />;
    label = `${pendingCount} pending`;
  }

  return (
    <div className={`${styles.container} ${className}`} ref={containerRef}>
      {/* Dynamic Interactive Button */}
      <button
        type="button"
        className={`${styles.syncButton} ${buttonStyle}`}
        onClick={handlePillClick}
        aria-haspopup="dialog"
        aria-expanded={isPopoverOpen}
        aria-label={`Sync Status: ${label}. Tap to inspect and sync.`}
        title="Tap to view sync status or trigger instant backup"
      >
        {icon}
        <span>{label}</span>
      </button>

      {/* Backdrop overlay for focus & easy dismissal */}
      {isPopoverOpen && (
        <div
          className={styles.backdrop}
          onClick={() => setIsPopoverOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Popover Drawer */}
      {isPopoverOpen && (
        <div className={styles.popover} role="dialog" aria-label="Sync & Storage Status">
          {/* Header */}
          <div className={styles.popoverHeader}>
            <div className={styles.popoverTitleGroup}>
              <Database size={14} color="var(--accent-primary, #a78bfa)" />
              <span>Cloud Sync & Storage</span>
            </div>
            <button
              type="button"
              className={styles.closeButton}
              onClick={() => setIsPopoverOpen(false)}
              aria-label="Close sync modal"
            >
              <X size={14} />
            </button>
          </div>

          {/* Dynamic Status Card */}
          <div className={styles.statusCard}>
            <div className={styles.statusCardHeader}>
              <span
                className={`${styles.statusBadge} ${
                  !isOnline
                    ? styles.stateOffline
                    : pendingCount > 0
                    ? styles.statePending
                    : styles.stateSynced
                }`}
              >
                {!isOnline ? (
                  <>
                    <WifiOff size={10} /> Offline Mode
                  </>
                ) : isSyncing ? (
                  <>
                    <RefreshCw size={10} className={styles.spinIcon} /> Syncing
                  </>
                ) : pendingCount > 0 ? (
                  <>
                    <CloudUpload size={10} /> {pendingCount} Pending
                  </>
                ) : (
                  <>
                    <Check size={10} /> Cloud Up to Date
                  </>
                )}
              </span>
            </div>

            <div className={styles.statusDesc}>
              {!isOnline
                ? 'All sets are safely saved on this device. Changes will auto-sync once connection returns.'
                : pendingCount > 0
                ? `${pendingCount} mutation(s) saved locally, ready to push to Cloudflare D1.`
                : 'Your workout data is backed up to Cloudflare D1 global edge database.'}
            </div>
          </div>

          {/* Details */}
          <div className={styles.detailsGrid}>
            <div className={styles.detailRow}>
              <span>Network</span>
              <span className={styles.detailValue}>
                {isOnline ? 'Online (Connected)' : 'Disconnected'}
              </span>
            </div>

            <div className={styles.detailRow}>
              <span>Local Queue</span>
              <span className={styles.detailValue}>
                {pendingCount === 0 ? '0 pending mutations' : `${pendingCount} pending`}
              </span>
            </div>

            <div className={styles.detailRow}>
              <span>Last Synced</span>
              <span className={styles.detailValue}>
                {formatRelativeTime(lastSyncTime)}
              </span>
            </div>

            <div className={styles.detailRow}>
              <span>Cloud Storage</span>
              <span className={styles.detailValue}>Cloudflare D1 (Global)</span>
            </div>
          </div>

          {/* Sync Trigger Action */}
          <button
            type="button"
            className={styles.syncNowButton}
            onClick={handleManualSync}
            disabled={isSyncing || !isOnline}
          >
            <RefreshCw
              size={13}
              strokeWidth={2.4}
              className={isSyncing ? styles.spinIcon : ''}
            />
            <span>
              {isSyncing
                ? 'Syncing in progress...'
                : !isOnline
                ? 'Offline - Cannot sync'
                : 'Sync Now'}
            </span>
          </button>

          {/* Guest prompt if not signed in */}
          {!currentUser && onOpenAuth && (
            <div className={styles.guestPrompt}>
              <div className={styles.guestPromptText}>
                You are currently in guest mode. Sign in to synchronize workouts across your phone and tablet.
              </div>
              <button
                type="button"
                className={styles.signInButton}
                onClick={() => {
                  setIsPopoverOpen(false);
                  onOpenAuth();
                }}
              >
                <LogIn size={12} />
                <span>Sign in or create account</span>
              </button>
            </div>
          )}

          {currentUser && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontSize: '11px',
                color: 'var(--text-muted, #94a3b8)',
                paddingTop: 4,
              }}
            >
              <ShieldCheck size={13} color="#10b981" />
              <span>
                Backed up as <strong style={{ color: '#cbd5e1' }}>{currentUser.email}</strong>
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
