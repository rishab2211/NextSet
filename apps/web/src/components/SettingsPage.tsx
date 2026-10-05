'use client';

import React, { useState, useEffect } from 'react';
import {
  getSurfaceTheme,
  setSurfaceTheme,
  getAccentColor,
  setAccentColor,
  getWorkoutPreferences,
  saveWorkoutPreferences,
  ACCENT_PRESETS,
  type SurfaceTheme,
  type AccentColor,
  type WorkoutPreferences,
} from '../lib/themeStore';
import {
  getUnitPreference,
  setUnitPreference,
  getBarbellWeight,
  setBarbellWeight,
  getCurrentUser,
  getOrCreateAnonymousUserId,
} from '../lib/auth/authStore';
import { syncCoordinator } from '../lib/sync/syncCoordinator';
import { db } from '../lib/db';
import { AuthModal } from './AuthModal';
import type { AuthUser } from '@nextset/shared';
import {
  Sliders,
  Palette,
  Shield,
  Download,
  Check,
  RefreshCw,
  User,
  HardDrive,
} from 'lucide-react';
import {
  DumbbellHorizontalIcon,
  RestClockIcon,
} from './HomeIcons';
import styles from './SettingsPage.module.css';

export const SettingsPage: React.FC = () => {
  const [surface, setSurface] = useState<SurfaceTheme>('pastel-dark');
  const [accent, setAccent] = useState<AccentColor>('lavender');
  const [unitPref, setUnitPref] = useState<'kg' | 'lbs'>('kg');
  const [barbellWt, setBarbellWt] = useState<number>(20);
  const [workoutPrefs, setWorkoutPrefs] = useState<WorkoutPreferences>({
    defaultRestSeconds: 90,
    timerSound: true,
    timerAutoStart: true,
    hapticFeedback: true,
  });

  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [deviceId, setDeviceId] = useState<string>('');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncStatusMsg, setSyncStatusMsg] = useState<string | null>(null);
  const [exportStats, setExportStats] = useState<{ sessions: number; sets: number }>({ sessions: 0, sets: 0 });

  useEffect(() => {
    setSurface(getSurfaceTheme());
    setAccent(getAccentColor());
    setUnitPref(getUnitPreference());
    setBarbellWt(getBarbellWeight());
    setWorkoutPrefs(getWorkoutPreferences());
    setCurrentUser(getCurrentUser());
    setDeviceId(getOrCreateAnonymousUserId());

    loadDbStats();

    const handleAuthChange = () => {
      setCurrentUser(getCurrentUser());
      setUnitPref(getUnitPreference());
      setBarbellWt(getBarbellWeight());
      loadDbStats();
    };

    const handleThemeChange = () => {
      setSurface(getSurfaceTheme());
      setAccent(getAccentColor());
    };

    window.addEventListener('kinetic_auth_change', handleAuthChange);
    window.addEventListener('kinetic_theme_change', handleThemeChange);

    return () => {
      window.removeEventListener('kinetic_auth_change', handleAuthChange);
      window.removeEventListener('kinetic_theme_change', handleThemeChange);
    };
  }, []);

  const loadDbStats = async () => {
    try {
      const sessCount = await db.workoutSessions.filter((s) => !s.deleted).count();
      const setCount = await db.workoutSets.filter((s) => !s.deleted).count();
      setExportStats({ sessions: sessCount, sets: setCount });
    } catch {
      // Ignored
    }
  };

  const handleSelectSurface = (s: SurfaceTheme) => {
    setSurface(s);
    setSurfaceTheme(s);
  };

  const handleSelectAccent = (a: AccentColor) => {
    setAccent(a);
    setAccentColor(a);
  };

  const handleSelectUnit = (u: 'kg' | 'lbs') => {
    setUnitPref(u);
    setUnitPreference(u);
  };

  const handleSelectBarbell = (wt: number) => {
    setBarbellWt(wt);
    setBarbellWeight(wt);
  };

  const handleTogglePref = (key: keyof WorkoutPreferences) => {
    const updated = {
      ...workoutPrefs,
      [key]: !workoutPrefs[key],
    };
    setWorkoutPrefs(updated);
    saveWorkoutPreferences(updated);

    if (key === 'timerSound' && updated.timerSound) {
      playTestBeep();
    }
  };

  const handleSelectRestDuration = (sec: number) => {
    const updated = {
      ...workoutPrefs,
      defaultRestSeconds: sec,
    };
    setWorkoutPrefs(updated);
    saveWorkoutPreferences(updated);
  };

  const playTestBeep = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch {
      // AudioContext unavailable
    }
  };

  const handleManualSync = async () => {
    setIsSyncing(true);
    setSyncStatusMsg(null);
    try {
      await syncCoordinator.sync();
      await syncCoordinator.pull();
      setSyncStatusMsg('Cloud sync complete');
      await loadDbStats();
    } catch {
      setSyncStatusMsg('Sync failed. Please check network connection.');
    } finally {
      setIsSyncing(false);
    }
  };

  const handleExportData = async () => {
    try {
      const sessions = await db.workoutSessions.toArray();
      const sets = await db.workoutSets.toArray();

      const exportPayload = {
        app: 'NextSet',
        exportedAt: new Date().toISOString(),
        version: '1.0.0',
        deviceId: getOrCreateAnonymousUserId(),
        sessionsCount: sessions.length,
        setsCount: sets.length,
        data: {
          sessions,
          sets,
        },
      };

      const jsonStr = JSON.stringify(exportPayload, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const dateStr = new Date().toISOString().split('T')[0];
      link.href = url;
      link.download = `nextset-workout-backup-${dateStr}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch {
      alert('Failed to export workout data');
    }
  };

  const userInitial = currentUser?.name
    ? currentUser.name.charAt(0).toUpperCase()
    : currentUser?.email
    ? currentUser.email.charAt(0).toUpperCase()
    : 'U';

  return (
    <div className={styles.container}>
      {/* Top Header */}
      <header className={styles.topBar}>
        <div className={styles.headerLeft}>
          <div className={styles.logoBadge}>
            <Sliders size={16} color="#ffffff" strokeWidth={2.4} />
          </div>
          <div className={styles.titleArea}>
            <h1 className={styles.pageTitle}>Settings</h1>
            <span className={styles.pageSubtitle}>Gym preferences & local storage</span>
          </div>
        </div>

        {currentUser && (
          <div className={styles.userBadge}>
            <User size={12} color="var(--accent-primary, #a78bfa)" />
            <span>{currentUser.name || currentUser.email.split('@')[0]}</span>
          </div>
        )}
      </header>

      {/* ===================== SECTION 1: ACCOUNT & CLOUD SYNC ===================== */}
      <section className={styles.section} aria-label="Account and Sync">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionHeaderIcon}>
            <Shield size={15} />
          </div>
          <span>Account & Cloud Sync</span>
        </div>
        <p className={styles.sectionDesc}>
          Workouts are stored locally first in IndexedDB and synced automatically when signed in.
        </p>

        <div className={styles.accountCard}>
          <div className={styles.accountDetails}>
            <div className={styles.accountAvatar}>
              {userInitial}
            </div>
            <div className={styles.accountTexts}>
              <div className={styles.accountName}>
                {currentUser ? (currentUser.name || 'User Account') : 'Local Guest'}
              </div>
              <div className={styles.accountEmail}>
                {currentUser ? currentUser.email : `Device: ${deviceId.slice(0, 16)}...`}
              </div>
            </div>
          </div>

          <button
            type="button"
            className={styles.accountActionBtn}
            onClick={() => setIsAuthModalOpen(true)}
          >
            {currentUser ? 'Manage' : 'Sign in'}
          </button>
        </div>

        {syncStatusMsg && (
          <div className={styles.syncStatusMsg}>
            <Check size={13} strokeWidth={2.5} />
            <span>{syncStatusMsg}</span>
          </div>
        )}

        <button
          type="button"
          className={styles.syncBtn}
          onClick={handleManualSync}
          disabled={isSyncing}
        >
          <RefreshCw size={14} className={isSyncing ? styles.spin : ''} />
          <span>{isSyncing ? 'Syncing...' : 'Sync Now'}</span>
        </button>
      </section>

      {/* ===================== SECTION 2: UNITS & EQUIPMENT ===================== */}
      <section className={styles.section} aria-label="Units and Equipment">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionHeaderIcon}>
            <DumbbellHorizontalIcon size={15} strokeWidth={2.2} />
          </div>
          <span>Units & Equipment</span>
        </div>
        <p className={styles.sectionDesc}>
          Standard measures for plate math and volume calculation.
        </p>

        {/* Weight Unit Switcher */}
        <div className={styles.settingGroup}>
          <label className={styles.groupLabel}>Weight Unit</label>
          <div className={styles.segmentedControl}>
            <button
              type="button"
              className={`${styles.segmentBtn} ${unitPref === 'kg' ? styles.segmentBtnActive : ''}`}
              onClick={() => handleSelectUnit('kg')}
            >
              Kilograms (kg)
            </button>
            <button
              type="button"
              className={`${styles.segmentBtn} ${unitPref === 'lbs' ? styles.segmentBtnActive : ''}`}
              onClick={() => handleSelectUnit('lbs')}
            >
              Pounds (lbs)
            </button>
          </div>
        </div>

        {/* Olympic Barbell Weight */}
        <div className={styles.settingGroup}>
          <label className={styles.groupLabel}>Standard Barbell Weight</label>
          <div className={styles.segmentedControl3}>
            <button
              type="button"
              className={`${styles.segmentBtn} ${barbellWt === 20 ? styles.segmentBtnActive : ''}`}
              onClick={() => handleSelectBarbell(20)}
            >
              20 kg (Olympic)
            </button>
            <button
              type="button"
              className={`${styles.segmentBtn} ${barbellWt === 15 ? styles.segmentBtnActive : ''}`}
              onClick={() => handleSelectBarbell(15)}
            >
              15 kg (Women&apos;s)
            </button>
            <button
              type="button"
              className={`${styles.segmentBtn} ${barbellWt === 10 ? styles.segmentBtnActive : ''}`}
              onClick={() => handleSelectBarbell(10)}
            >
              10 kg (Technique)
            </button>
          </div>
        </div>
      </section>

      {/* ===================== SECTION 3: REST TIMER & HAPTICS ===================== */}
      <section className={styles.section} aria-label="Rest Timer">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionHeaderIcon}>
            <RestClockIcon size={15} strokeWidth={2.2} />
          </div>
          <span>Rest Timer & Haptics</span>
        </div>
        <p className={styles.sectionDesc}>
          Automated interval timer after each set completion.
        </p>

        {/* Default Duration Selector */}
        <div className={styles.settingGroup}>
          <label className={styles.groupLabel}>Default Interval</label>
          <div className={styles.segmentedControl4}>
            {[60, 90, 120, 180].map((sec) => (
              <button
                key={sec}
                type="button"
                className={`${styles.segmentBtn} ${workoutPrefs.defaultRestSeconds === sec ? styles.segmentBtnActive : ''}`}
                onClick={() => handleSelectRestDuration(sec)}
              >
                {sec}s
              </button>
            ))}
          </div>
        </div>

        {/* Toggles */}
        <div className={styles.settingRow}>
          <div className={styles.settingLabelGroup}>
            <span className={styles.settingLabel}>Timer Chime</span>
            <span className={styles.settingSub}>Audio alert when rest countdown finishes</span>
          </div>
          <button
            type="button"
            className={`${styles.toggleSwitch} ${workoutPrefs.timerSound ? styles.toggleSwitchActive : ''}`}
            onClick={() => handleTogglePref('timerSound')}
            aria-label="Toggle timer sound"
          >
            <div className={styles.toggleKnob} />
          </button>
        </div>

        <div className={styles.settingRow}>
          <div className={styles.settingLabelGroup}>
            <span className={styles.settingLabel}>Auto-Start Timer</span>
            <span className={styles.settingSub}>Starts rest countdown when a set is checked off</span>
          </div>
          <button
            type="button"
            className={`${styles.toggleSwitch} ${workoutPrefs.timerAutoStart ? styles.toggleSwitchActive : ''}`}
            onClick={() => handleTogglePref('timerAutoStart')}
            aria-label="Toggle auto-start rest timer"
          >
            <div className={styles.toggleKnob} />
          </button>
        </div>

        <div className={styles.settingRow}>
          <div className={styles.settingLabelGroup}>
            <span className={styles.settingLabel}>Haptic Feedback</span>
            <span className={styles.settingSub}>Vibration pulses on set completion and timer end</span>
          </div>
          <button
            type="button"
            className={`${styles.toggleSwitch} ${workoutPrefs.hapticFeedback ? styles.toggleSwitchActive : ''}`}
            onClick={() => handleTogglePref('hapticFeedback')}
            aria-label="Toggle haptic vibration"
          >
            <div className={styles.toggleKnob} />
          </button>
        </div>
      </section>

      {/* ===================== SECTION 4: APPEARANCE & THEMES ===================== */}
      <section className={styles.section} aria-label="Theme Appearance">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionHeaderIcon}>
            <Palette size={15} />
          </div>
          <span>Theme & Appearance</span>
        </div>
        <p className={styles.sectionDesc}>
          Calibrated low-glare dark surfaces for gym illumination.
        </p>

        {/* Background Surface Mode */}
        <div className={styles.settingGroup}>
          <label className={styles.groupLabel}>Surface Mode</label>
          <div className={styles.segmentedControl}>
            <button
              type="button"
              className={`${styles.segmentBtn} ${surface === 'pastel-dark' ? styles.segmentBtnActive : ''}`}
              onClick={() => handleSelectSurface('pastel-dark')}
            >
              Obsidian Dark
            </button>
            <button
              type="button"
              className={`${styles.segmentBtn} ${surface === 'midnight' ? styles.segmentBtnActive : ''}`}
              onClick={() => handleSelectSurface('midnight')}
            >
              Midnight Navy
            </button>
            <button
              type="button"
              className={`${styles.segmentBtn} ${surface === 'oled' ? styles.segmentBtnActive : ''}`}
              onClick={() => handleSelectSurface('oled')}
            >
              OLED Black
            </button>
            <button
              type="button"
              className={`${styles.segmentBtn} ${surface === 'slate' ? styles.segmentBtnActive : ''}`}
              onClick={() => handleSelectSurface('slate')}
            >
              Gunmetal Slate
            </button>
          </div>
        </div>

        {/* Accent Color Palette Swatches */}
        <div className={styles.settingGroup}>
          <label className={styles.groupLabel}>Accent Highlight</label>
          <div className={styles.swatchesGrid}>
            {ACCENT_PRESETS.map((preset) => {
              const isSelected = accent === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  className={`${styles.swatchBtn} ${isSelected ? styles.swatchBtnActive : ''}`}
                  style={
                    isSelected
                      ? {
                          borderColor: preset.hex,
                          backgroundColor: preset.subtleHex,
                          boxShadow: `0 0 14px ${preset.subtleHex}`,
                        }
                      : undefined
                  }
                  onClick={() => handleSelectAccent(preset.id)}
                >
                  <div className={styles.swatchCircle} style={{ backgroundColor: preset.hex }}>
                    {isSelected && (
                      <Check
                        size={12}
                        strokeWidth={3}
                        color={preset.contrastText || '#ffffff'}
                      />
                    )}
                  </div>
                  <span
                    className={styles.swatchName}
                    style={isSelected ? { color: preset.hex, fontWeight: 700 } : undefined}
                  >
                    {preset.name.replace('Pastel ', '')}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================== SECTION 5: DATA & STORAGE ===================== */}
      <section className={styles.section} aria-label="Data Storage">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionHeaderIcon}>
            <HardDrive size={15} />
          </div>
          <span>Offline Data & Backup</span>
        </div>
        <p className={styles.sectionDesc}>
          Export full training history as open JSON for backup or spreadsheet analysis.
        </p>

        <div className={styles.statsCard}>
          <div className={styles.statItem}>
            <span className={styles.statNum}>{exportStats.sessions}</span>
            <span className={styles.statLabel}>Saved Workouts</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statNum}>{exportStats.sets}</span>
            <span className={styles.statLabel}>Logged Sets</span>
          </div>
        </div>

        <button
          type="button"
          className={styles.exportBtn}
          onClick={handleExportData}
        >
          <Download size={15} />
          <span>Export Backup (JSON)</span>
        </button>
      </section>

      {/* App Info Footer */}
      <footer className={styles.footer}>
        <span>NextSet · v1.0.0 · Offline-First Progressive Web App</span>
      </footer>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
};
