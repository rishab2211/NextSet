'use client';

import React, { useState, useEffect } from 'react';
import {
  getCurrentUser,
  getOrCreateAnonymousUserId,
  sendOtpCode,
  verifyOtpCode,
  clearAuthSession,
} from '../lib/auth/authStore';
import { syncCoordinator } from '../lib/sync/syncCoordinator';
import type { AuthUser } from '@kinetic/shared';
import {
  X,
  Shield,
  Smartphone,
  Mail,
  KeyRound,
  CheckCircle2,
  RefreshCw,
  LogOut,
  Sparkles,
} from 'lucide-react';
import styles from './AuthModal.module.css';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [deviceId, setDeviceId] = useState<string>('');
  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [previewCode, setPreviewCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    setDeviceId(getOrCreateAnonymousUserId());
    setCurrentUser(getCurrentUser());
    setErrorMsg(null);
    setSuccessMsg(null);

    const handleAuthChange = () => {
      setCurrentUser(getCurrentUser());
    };

    window.addEventListener('kinetic_auth_change', handleAuthChange);
    return () => {
      window.removeEventListener('kinetic_auth_change', handleAuthChange);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    const res = await sendOtpCode(email.trim());
    setLoading(false);

    if (res.success) {
      setStep('otp');
      setSuccessMsg(`A 6-digit code has been sent to ${email.trim()}`);
      if (res.preview_code) {
        setPreviewCode(res.preview_code);
      }
    } else {
      setErrorMsg(res.error || 'Failed to send OTP code.');
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode || otpCode.length < 6) {
      setErrorMsg('Please enter the complete 6-digit code.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    const res = await verifyOtpCode(email.trim(), otpCode.trim());
    setLoading(false);

    if (res.success && res.user) {
      setCurrentUser(res.user);
      setSuccessMsg('Successfully authenticated! Your device data is now linked to your cloud account.');
      setStep('email');
      setOtpCode('');
      setPreviewCode(null);

      // Trigger automatic sync & pull
      setSyncing(true);
      try {
        await syncCoordinator.sync();
        await syncCoordinator.pull();
      } finally {
        setSyncing(false);
      }
    } else {
      setErrorMsg(res.error || 'Invalid or expired code.');
    }
  };

  const handleManualSync = async () => {
    setSyncing(true);
    setErrorMsg(null);
    setSuccessMsg(null);
    try {
      await syncCoordinator.sync();
      await syncCoordinator.pull();
      setSuccessMsg('Cloud sync & pull complete!');
    } catch {
      setErrorMsg('Sync failed. Please check network connection.');
    } finally {
      setSyncing(false);
    }
  };

  const handleLogout = () => {
    clearAuthSession();
    setCurrentUser(null);
    setSuccessMsg('Logged out. Reverted to anonymous device partition.');
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <Shield size={18} color="var(--accent-cyan)" />
            <span>Account & Cloud Sync</span>
          </div>
          <button type="button" className={styles.closeBtn} onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className={styles.content}>
          {/* Unique Device Partition Information */}
          <div className={styles.partitionCard}>
            <div className={styles.partitionHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Smartphone size={14} color="var(--accent-volt)" />
                <span className={styles.partitionLabel}>Device Partition</span>
              </div>
              <span className={styles.deviceIdBadge}>{deviceId || 'Generating...'}</span>
            </div>
            <p className={styles.partitionText}>
              Kinetic uses isolated device partitioning. Every workout you log is saved locally in IndexedDB and keyed to your device so you never lose data, even completely offline.
            </p>
          </div>

          {errorMsg && <div className={styles.errorMessage}>{errorMsg}</div>}
          {successMsg && <div className={styles.successMessage}>{successMsg}</div>}

          {/* Authenticated State */}
          {currentUser ? (
            <div className={styles.profileBox}>
              <div className={styles.profileRow}>
                <span className={styles.profileLabel}>Account</span>
                <span className={`${styles.profileValue} ${styles.profileEmail}`}>
                  {currentUser.email}
                </span>
              </div>
              <div className={styles.profileRow}>
                <span className={styles.profileLabel}>Cloud Status</span>
                <span className="badge badge-cyan" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  <CheckCircle2 size={12} />
                  <span>Workers JWT Active</span>
                </span>
              </div>
              <div className={styles.profileRow}>
                <span className={styles.profileLabel}>User ID</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-secondary)' }}>
                  {currentUser.id}
                </span>
              </div>

              <div className={styles.buttonRow} style={{ marginTop: 'var(--space-2)' }}>
                <button
                  type="button"
                  className="btn-cyan"
                  style={{ flex: 1, height: '42px' }}
                  onClick={handleManualSync}
                  disabled={syncing}
                >
                  <RefreshCw size={15} className={syncing ? 'spin' : ''} />
                  <span>{syncing ? 'Syncing...' : 'Sync Cloud Now'}</span>
                </button>
                <button
                  type="button"
                  className="btn-secondary"
                  style={{ height: '42px', padding: '0 16px' }}
                  onClick={handleLogout}
                >
                  <LogOut size={15} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          ) : (
            /* Unauthenticated / Magic OTP Sign-In State */
            <div>
              {step === 'email' ? (
                <form onSubmit={handleSendCode} className={styles.formGroup}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <Sparkles size={14} color="var(--accent-cyan)" />
                    <span className={styles.inputLabel}>Upgrade to Multi-Device Cloud Sync</span>
                  </div>
                  <p style={{ fontSize: 'var(--font-xs)', color: 'var(--text-muted)', marginBottom: 8 }}>
                    Sign in with Magic Link / OTP to sync workouts seamlessly across multiple phones, laptops, and tablets.
                  </p>

                  <label className={styles.inputLabel}>Email Address</label>
                  <input
                    type="email"
                    className={styles.inputField}
                    placeholder="lifter@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoFocus
                  />

                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ height: '46px', marginTop: 'var(--space-2)' }}
                    disabled={loading}
                  >
                    <Mail size={16} />
                    <span>{loading ? 'Sending Code...' : 'Send Magic OTP Code'}</span>
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyCode} className={styles.formGroup}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span className={styles.inputLabel}>Enter 6-Digit Code</span>
                    <button
                      type="button"
                      style={{ background: 'none', border: 'none', color: 'var(--accent-cyan)', fontSize: '11px', cursor: 'pointer' }}
                      onClick={() => {
                        setStep('email');
                        setOtpCode('');
                      }}
                    >
                      Change Email
                    </button>
                  </div>

                  <input
                    type="text"
                    maxLength={6}
                    className={`${styles.inputField} ${styles.otpInput}`}
                    placeholder="123456"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                    required
                    autoFocus
                  />

                  {previewCode && (
                    <div
                      className={styles.devPreviewChip}
                      onClick={() => setOtpCode(previewCode)}
                      title="Click to auto-fill"
                    >
                      <span>Dev Mode Code: <strong>{previewCode}</strong></span>
                      <span style={{ textDecoration: 'underline', fontSize: '10px' }}>Tap to Autofill</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn-volt"
                    style={{ height: '46px', marginTop: 'var(--space-2)' }}
                    disabled={loading || otpCode.length < 6}
                  >
                    <KeyRound size={16} />
                    <span>{loading ? 'Verifying...' : 'Verify & Claim Cloud Sync'}</span>
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
