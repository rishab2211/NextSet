'use client';

import React, { useState, useEffect } from 'react';
import {
  getCurrentUser,
  getOrCreateAnonymousUserId,
  signInWithPassword,
  signUpWithPassword,
  sendOtpCode,
  verifyOtpCode,
  updateUserProfile,
  changeUserPassword,
  clearAuthSession,
  fetchUserStats,
  getUnitPreference,
  setUnitPreference,
} from '../lib/auth/authStore';
import { syncCoordinator } from '../lib/sync/syncCoordinator';
import type { AuthUser, UserStats } from '@nextset/shared';
import {
  X,
  Shield,
  Smartphone,
  Mail,
  Lock,
  KeyRound,
  CheckCircle2,
  RefreshCw,
  LogOut,
  Sparkles,
  Eye,
  EyeOff,
  User,
  Dumbbell,
  Scale,
  Flame,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import styles from './AuthModal.module.css';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthTab = 'signin' | 'signup' | 'otp';

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [tab, setTab] = useState<AuthTab>('signin');
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [deviceId, setDeviceId] = useState<string>('');
  const [stats, setStats] = useState<UserStats | null>(null);

  // Sign In & Sign Up Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [unitPref, setUnitPref] = useState<'kg' | 'lbs'>('kg');
  const [barbellWeight, setBarbellWeight] = useState<number>(20);

  // OTP Form States
  const [otpCode, setOtpCode] = useState('');
  const [otpStep, setOtpStep] = useState<'email' | 'code'>('email');
  const [previewCode, setPreviewCode] = useState<string | null>(null);

  // Profile Edit & Security States
  const [profileName, setProfileName] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // Status & Feedback
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    setDeviceId(getOrCreateAnonymousUserId());
    const user = getCurrentUser();
    setCurrentUser(user);
    if (user) {
      setProfileName(user.name || '');
      setUnitPref(user.unit_preference || getUnitPreference());
      setBarbellWeight(user.barbell_weight || 20);
    } else {
      setUnitPref(getUnitPreference());
    }

    loadStats();
    setErrorMsg(null);
    setSuccessMsg(null);

    const handleAuthChange = () => {
      const updated = getCurrentUser();
      setCurrentUser(updated);
      if (updated) {
        setProfileName(updated.name || '');
        setUnitPref(updated.unit_preference || 'kg');
        setBarbellWeight(updated.barbell_weight || 20);
      }
      loadStats();
    };

    window.addEventListener('nextset_auth_change', handleAuthChange);
    window.addEventListener('kinetic_auth_change', handleAuthChange);
    return () => {
      window.removeEventListener('nextset_auth_change', handleAuthChange);
      window.removeEventListener('kinetic_auth_change', handleAuthChange);
    };
  }, [isOpen]);

  const loadStats = async () => {
    const s = await fetchUserStats();
    setStats(s);
  };

  if (!isOpen) return null;

  // Handle Sign In (Email + Password)
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    const res = await signInWithPassword(email.trim(), password);
    setLoading(false);

    if (res.success && res.user) {
      setCurrentUser(res.user);
      setPassword('');
      setSuccessMsg('Signed in successfully.');
      triggerSyncAndPull();
      setTimeout(() => {
        onClose();
      }, 600);
    } else {
      setErrorMsg(res.error || 'Failed to sign in.');
    }
  };

  // Handle Sign Up (Create Account)
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg('Please provide a valid email address.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    const res = await signUpWithPassword(
      email.trim(),
      password,
      name.trim(),
      unitPref,
      barbellWeight
    );
    setLoading(false);

    if (res.success && res.user) {
      setCurrentUser(res.user);
      setPassword('');
      setConfirmPassword('');
      setSuccessMsg('Account created successfully!');
      triggerSyncAndPull();
      setTimeout(() => {
        onClose();
      }, 600);
    } else {
      setErrorMsg(res.error || 'Failed to create account.');
    }
  };

  // Handle Magic Link OTP Send
  const handleSendOtp = async (e: React.FormEvent) => {
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
      setOtpStep('code');
      setSuccessMsg(`A 6-digit verification code was generated for ${email.trim()}`);
      if (res.preview_code) {
        setPreviewCode(res.preview_code);
      }
    } else {
      setErrorMsg(res.error || 'Failed to send verification code.');
    }
  };

  // Handle Magic Link OTP Verify
  const handleVerifyOtp = async (e: React.FormEvent) => {
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
      setSuccessMsg('Signed in successfully!');
      setOtpStep('email');
      setOtpCode('');
      setPreviewCode(null);
      triggerSyncAndPull();
      setTimeout(() => {
        onClose();
      }, 600);
    } else {
      setErrorMsg(res.error || 'Invalid or expired code.');
    }
  };

  // Trigger Cloud Sync and Pull with 6-second safety cap
  const triggerSyncAndPull = async () => {
    setSyncing(true);
    try {
      await Promise.race([
        Promise.all([syncCoordinator.sync(), syncCoordinator.pull()]),
        new Promise((resolve) => setTimeout(resolve, 6000)),
      ]);
      await loadStats();
    } catch (err) {
      console.warn('[AuthModal] Background sync error:', err);
    } finally {
      setSyncing(false);
    }
  };

  // Save Profile Preferences (Units, Barbell Weight, Name)
  const handleSavePreferences = async () => {
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    setUnitPreference(unitPref);
    const res = await updateUserProfile({
      name: profileName.trim(),
      unit_preference: unitPref,
      barbell_weight: barbellWeight,
    });
    setLoading(false);

    if (res.success) {
      setSuccessMsg('Preferences saved successfully.');
    } else {
      setErrorMsg(res.error || 'Failed to update profile.');
    }
  };

  // Handle Change Password
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      setErrorMsg('Please enter your current password.');
      return;
    }
    if (newPassword.length < 6) {
      setErrorMsg('New password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setErrorMsg('New passwords do not match.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    const res = await changeUserPassword(currentPassword, newPassword);
    setLoading(false);

    if (res.success) {
      setSuccessMsg('Password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      setIsChangingPassword(false);
    } else {
      setErrorMsg(res.error || 'Failed to change password.');
    }
  };

  const handleSignOut = () => {
    clearAuthSession();
    setCurrentUser(null);
    setSuccessMsg('Signed out.');
  };

  // Compute initials for avatar
  const getInitials = () => {
    if (currentUser?.name) {
      const parts = currentUser.name.trim().split(' ');
      if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
      return currentUser.name.substring(0, 2).toUpperCase();
    }
    if (currentUser?.email) {
      return currentUser.email.substring(0, 2).toUpperCase();
    }
    return 'K';
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <Shield size={18} color="var(--accent-cyan)" />
            <span>{currentUser ? 'Account' : 'Sign In'}</span>
          </div>
          <button type="button" className={styles.closeBtn} onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Tab Selector (When not logged in) */}
        {!currentUser && (
          <div className={styles.tabList}>
            <button
              type="button"
              className={`${styles.tabItem} ${tab === 'signin' ? styles.tabItemActive : ''}`}
              onClick={() => {
                setTab('signin');
                setErrorMsg(null);
              }}
            >
              <Lock size={14} />
              <span>Sign In</span>
            </button>
            <button
              type="button"
              className={`${styles.tabItem} ${tab === 'signup' ? styles.tabItemActive : ''}`}
              onClick={() => {
                setTab('signup');
                setErrorMsg(null);
              }}
            >
              <User size={14} />
              <span>Sign Up</span>
            </button>
            <button
              type="button"
              className={`${styles.tabItem} ${tab === 'otp' ? styles.tabItemActive : ''}`}
              onClick={() => {
                setTab('otp');
                setErrorMsg(null);
              }}
            >
              <Sparkles size={14} />
              <span>Email Code</span>
            </button>
          </div>
        )}

        <div className={styles.scrollContent}>
          {errorMsg && <div className={styles.errorMessage}>{errorMsg}</div>}
          {successMsg && <div className={styles.successMessage}>{successMsg}</div>}

          {/* ===================== AUTHENTICATED PROFILE VIEW ===================== */}
          {currentUser ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {/* Profile Header Card */}
              <div className={styles.profileHeader}>
                <div className={styles.avatarCircle}>{getInitials()}</div>
                <div className={styles.profileInfo}>
                  <div className={styles.profileName}>{currentUser.name || 'NextSet Lifter'}</div>
                  <div className={styles.profileEmail}>{currentUser.email}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                    <span className="badge badge-cyan" style={{ fontSize: '10px', padding: '2px 6px' }}>
                      <CheckCircle2 size={10} />
                      <span>Synced</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Cloud Workout Stats Card */}
              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <span className={styles.statNumber}>{stats?.total_workouts ?? 0}</span>
                  <span className={styles.statLabel}>Workouts</span>
                </div>
                <div className={styles.statCard}>
                  <span className={styles.statNumber}>{stats?.total_sets ?? 0}</span>
                  <span className={styles.statLabel}>Sets</span>
                </div>
                <div className={styles.statCard}>
                  <span className={styles.statNumber}>
                    {unitPref === 'lbs'
                      ? Math.round((stats?.total_volume_kg ?? 0) * 2.20462).toLocaleString() + ' lbs'
                      : (stats?.total_volume_kg ?? 0).toLocaleString() + ' kg'}
                  </span>
                  <span className={styles.statLabel}>Volume</span>
                </div>
                <div className={styles.statCard}>
                  <span className={styles.statNumber} style={{ color: 'var(--accent-volt)' }}>
                    {stats?.last_workout_date
                      ? new Date(stats.last_workout_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
                      : 'None'}
                  </span>
                  <span className={styles.statLabel}>Last workout</span>
                </div>
              </div>

              {/* Preferences: Units & Barbell Weight */}
              <div className={styles.formGroup}>
                <div className={styles.field}>
                  <label className={styles.inputLabel}>Name</label>
                  <input
                    type="text"
                    className={styles.inputField}
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    placeholder="Your name"
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.inputLabel}>Weight unit</label>
                  <div className={styles.segmentedControl}>
                    <button
                      type="button"
                      className={`${styles.segmentBtn} ${unitPref === 'kg' ? styles.segmentBtnActive : ''}`}
                      onClick={() => setUnitPref('kg')}
                    >
                      Kilograms (kg)
                    </button>
                    <button
                      type="button"
                      className={`${styles.segmentBtn} ${unitPref === 'lbs' ? styles.segmentBtnActive : ''}`}
                      onClick={() => setUnitPref('lbs')}
                    >
                      Pounds (lbs)
                    </button>
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={styles.inputLabel}>Barbell weight</label>
                  <div className={styles.segmentedControl}>
                    <button
                      type="button"
                      className={`${styles.segmentBtn} ${barbellWeight === 20 ? styles.segmentBtnActive : ''}`}
                      onClick={() => setBarbellWeight(20)}
                    >
                      20 kg (44 lbs Standard)
                    </button>
                    <button
                      type="button"
                      className={`${styles.segmentBtn} ${barbellWeight === 15 ? styles.segmentBtnActive : ''}`}
                      onClick={() => setBarbellWeight(15)}
                    >
                      15 kg (33 lbs Women's)
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn-secondary"
                  style={{ height: '42px', marginTop: 4 }}
                  onClick={handleSavePreferences}
                  disabled={loading}
                >
                  <span>{loading ? 'Saving...' : 'Save'}</span>
                </button>
              </div>

              {/* Collapsible Change Password Section */}
              <div>
                <button
                  type="button"
                  className={styles.collapsibleToggle}
                  onClick={() => setIsChangingPassword(!isChangingPassword)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Lock size={14} color="var(--accent-cyan)" />
                    <span>Change Password</span>
                  </div>
                  {isChangingPassword ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                {isChangingPassword && (
                  <form onSubmit={handleChangePassword} className={styles.collapsibleBody}>
                    <div className={styles.field}>
                      <label className={styles.inputLabel}>Current Password</label>
                      <input
                        type="password"
                        className={styles.inputField}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.inputLabel}>New Password</label>
                      <input
                        type="password"
                        className={styles.inputField}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Min 6 characters"
                        required
                      />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.inputLabel}>Confirm New Password</label>
                      <input
                        type="password"
                        className={styles.inputField}
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    <button type="submit" className="btn-volt" style={{ height: '42px' }} disabled={loading}>
                      <span>{loading ? 'Updating...' : 'Update Password'}</span>
                    </button>
                  </form>
                )}
              </div>

              {/* Sync and Sign Out Actions */}
              <div className={styles.buttonRow}>
                <button
                  type="button"
                  className="btn-cyan"
                  style={{ flex: 1, height: '44px' }}
                  onClick={triggerSyncAndPull}
                  disabled={syncing}
                >
                  <RefreshCw size={15} className={syncing ? 'spin' : ''} />
                  <span>{syncing ? 'Syncing...' : 'Sync now'}</span>
                </button>
                <button
                  type="button"
                  className="btn-secondary"
                  style={{ height: '44px', padding: '0 16px' }}
                  onClick={handleSignOut}
                >
                  <LogOut size={15} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          ) : (
            /* ===================== UNAUTHENTICATED TABS ===================== */
            <div>
              {/* TAB 1: SIGN IN (EMAIL + PASSWORD) */}
              {tab === 'signin' && (
                <form onSubmit={handleSignIn} className={styles.formGroup}>
                  <div className={styles.field}>
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
                  </div>

                  <div className={styles.field}>
                    <label className={styles.inputLabel}>Password</label>
                    <div className={styles.passwordWrapper}>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className={styles.inputField}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className={styles.eyeBtn}
                        onClick={() => setShowPassword(!showPassword)}
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ height: '48px', marginTop: 'var(--space-2)' }}
                    disabled={loading}
                  >
                    <Lock size={16} />
                    <span>{loading ? 'Signing in...' : 'Sign In'}</span>
                  </button>

                  <div style={{ textAlign: 'center', fontSize: 'var(--font-xs)', color: 'var(--text-muted)' }}>
                    Don't have an account yet?{' '}
                    <button
                      type="button"
                      style={{ background: 'none', border: 'none', color: 'var(--accent-cyan)', fontWeight: 700, cursor: 'pointer' }}
                      onClick={() => setTab('signup')}
                    >
                      Create Account
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 2: CREATE ACCOUNT (SIGN UP) */}
              {tab === 'signup' && (
                <form onSubmit={handleSignUp} className={styles.formGroup}>
                  <div className={styles.field}>
                    <label className={styles.inputLabel}>Name</label>
                    <input
                      type="text"
                      className={styles.inputField}
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.inputLabel}>Email Address</label>
                    <input
                      type="email"
                      className={styles.inputField}
                      placeholder="lifter@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.inputLabel}>Password (Min 6 chars)</label>
                    <div className={styles.passwordWrapper}>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className={styles.inputField}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className={styles.eyeBtn}
                        onClick={() => setShowPassword(!showPassword)}
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label className={styles.inputLabel}>Confirm Password</label>
                    <input
                      type="password"
                      className={styles.inputField}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.inputLabel}>Weight unit</label>
                    <div className={styles.segmentedControl}>
                      <button
                        type="button"
                        className={`${styles.segmentBtn} ${unitPref === 'kg' ? styles.segmentBtnActive : ''}`}
                        onClick={() => setUnitPref('kg')}
                      >
                        Kilograms (kg)
                      </button>
                      <button
                        type="button"
                        className={`${styles.segmentBtn} ${unitPref === 'lbs' ? styles.segmentBtnActive : ''}`}
                        onClick={() => setUnitPref('lbs')}
                      >
                        Pounds (lbs)
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn-volt"
                    style={{ height: '48px', marginTop: 'var(--space-2)' }}
                    disabled={loading}
                  >
                    <User size={16} />
                    <span>{loading ? 'Creating account...' : 'Create Account'}</span>
                  </button>

                  <div style={{ textAlign: 'center', fontSize: 'var(--font-xs)', color: 'var(--text-muted)' }}>
                    Already have an account?{' '}
                    <button
                      type="button"
                      style={{ background: 'none', border: 'none', color: 'var(--accent-cyan)', fontWeight: 700, cursor: 'pointer' }}
                      onClick={() => setTab('signin')}
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 3: MAGIC OTP (PASSWORDLESS) */}
              {tab === 'otp' && (
                <div>
                  {otpStep === 'email' ? (
                    <form onSubmit={handleSendOtp} className={styles.formGroup}>
                      <p style={{ fontSize: 'var(--font-xs)', color: 'var(--text-muted)', marginBottom: 4 }}>
                        We&apos;ll email you a 6-digit login code.
                      </p>

                      <div className={styles.field}>
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
                      </div>

                      <button
                        type="submit"
                        className="btn-primary"
                        style={{ height: '48px', marginTop: 'var(--space-2)' }}
                        disabled={loading}
                      >
                        <Mail size={16} />
                        <span>{loading ? 'Sending...' : 'Send Code'}</span>
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={handleVerifyOtp} className={styles.formGroup}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span className={styles.inputLabel}>Enter 6-digit code</span>
                        <button
                          type="button"
                          style={{ background: 'none', border: 'none', color: 'var(--accent-cyan)', fontSize: '11px', cursor: 'pointer' }}
                          onClick={() => {
                            setOtpStep('email');
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
                        style={{ height: '48px', marginTop: 'var(--space-2)' }}
                        disabled={loading || otpCode.length < 6}
                      >
                        <KeyRound size={16} />
                        <span>{loading ? 'Verifying...' : 'Verify & Sign In'}</span>
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Offline Ready Footnote */}
          <div className={styles.partitionCard} style={{ marginTop: 'var(--space-2)' }}>
            <div className={styles.partitionHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Smartphone size={14} color="var(--accent-primary, #a78bfa)" />
                <span className={styles.partitionLabel}>Offline Ready</span>
              </div>
              <span className={styles.deviceIdBadge}>Works without WiFi</span>
            </div>
            <p className={styles.partitionText}>
              Your workouts are always saved on this device. Sign in anytime to sync across devices and keep a secure backup.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
