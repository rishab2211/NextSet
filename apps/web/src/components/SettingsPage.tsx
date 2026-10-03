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
  Palette,
  Scale,
  Timer,
  Shield,
  Download,
  Check,
  Smartphone,
  RefreshCw,
  Sliders,
  Volume2,
  Sparkles,
  Zap,
} from 'lucide-react';
import styles from './SettingsPage.module.css';

export const SettingsPage: React.FC = () => {
  const [surface, setSurface] = useState<SurfaceTheme>('midnight');
  const [accent, setAccent] = useState<AccentColor>('crimson');
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
      setSyncStatusMsg('Cloud sync complete!');
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
    } catch (e) {
      alert('Failed to export workout data');
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.topBar}>
        <div className={styles.pageTitle}>
          <Sliders size={22} color="var(--accent-primary)" />
          <span>Settings</span>
        </div>
      </div>

      {/* ===================== SECTION 1: APPEARANCE & THEMES ===================== */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <Palette size={18} color="var(--accent-primary)" />
          <span>Appearance & Themes</span>
        </div>
        <p className={styles.sectionDesc}>
          Customize your gym surface theme and athletic accent color.
        </p>

        {/* Background Surface Mode */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
            Surface Background
          </span>
          <div className={styles.segmentedControl}>
            <button
              type="button"
              className={`${styles.segmentBtn} ${surface === 'midnight' ? styles.segmentBtnActive : ''}`}
              onClick={() => handleSelectSurface('midnight')}
            >
              Midnight Charcoal
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
            Athletic Accent Color
          </span>
          <div className={styles.swatchesGrid}>
            {ACCENT_PRESETS.map((preset) => {
              const isSelected = accent === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  className={`${styles.swatchBtn} ${isSelected ? styles.swatchBtnActive : ''}`}
                  onClick={() => handleSelectAccent(preset.id)}
                >
                  <div className={styles.swatchCircle} style={{ backgroundColor: preset.hex }}>
                    {isSelected && <Check size={14} strokeWidth={3} />}
                  </div>
                  <span className={styles.swatchName}>{preset.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Preview */}
        <div className={styles.previewBox}>
          <div className={styles.previewText}>Active Theme Preview</div>
          <div className={styles.previewBadge}>
            <Sparkles size={12} style={{ display: 'inline', marginRight: 4 }} />
            <span>{surface.toUpperCase()} · {accent.toUpperCase()}</span>
          </div>
        </div>
      </div>

      {/* ===================== SECTION 2: UNITS & EQUIPMENT ===================== */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <Scale size={18} color="var(--accent-primary)" />
          <span>Units & Equipment</span>
        </div>
        <p className={styles.sectionDesc}>
          Set your preferred weight standards for workouts and barbell calculations.
        </p>

        {/* Weight Unit Switcher */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
            Primary Weight Unit
          </span>
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
            Standard Barbell Weight
          </span>
          <div className={styles.segmentedControl}>
            <button
              type="button"
              className={`${styles.segmentBtn} ${barbellWt === 20 ? styles.segmentBtnActive : ''}`}
              onClick={() => handleSelectBarbell(20)}
            >
              20 kg (44 lbs Standard)
            </button>
            <button
              type="button"
              className={`${styles.segmentBtn} ${barbellWt === 15 ? styles.segmentBtnActive : ''}`}
              onClick={() => handleSelectBarbell(15)}
            >
              15 kg (33 lbs Women's)
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
      </div>

      {/* ===================== SECTION 3: WORKOUT & REST TIMER ===================== */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <Timer size={18} color="var(--accent-primary)" />
          <span>Workout Experience & Rest Timer</span>
        </div>
        <p className={styles.sectionDesc}>
          Ergonomic rest countdowns and audio feedback during intense sets.
        </p>

        {/* Default Duration Selector */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
            Default Rest Interval
          </span>
          <div className={styles.segmentedControl}>
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
            <span className={styles.settingLabel}>Audio Chime on Finish</span>
            <span className={styles.settingSub}>Plays an audible tone when your rest timer expires</span>
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
            <span className={styles.settingLabel}>Auto-Start Rest Timer</span>
            <span className={styles.settingSub}>Automatically starts countdown when you complete a set</span>
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
            <span className={styles.settingSub}>Vibrates device upon completed sets (supported phones)</span>
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
      </div>

      {/* ===================== SECTION 4: ACCOUNT & CLOUD SYNC ===================== */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <Shield size={18} color="var(--accent-primary)" />
          <span>Account & Cloud Sync</span>
        </div>

        <div className={styles.accountCard}>
          <div>
            <div className={styles.accountName}>
              {currentUser ? currentUser.name || 'NextSet Lifter' : 'Anonymous Device Partition'}
            </div>
            <div className={styles.accountEmail}>
              {currentUser ? currentUser.email : deviceId}
            </div>
          </div>
          <button
            type="button"
            className="btn-primary"
            style={{ height: '36px', padding: '0 14px', fontSize: 'var(--font-xs)' }}
            onClick={() => setIsAuthModalOpen(true)}
          >
            {currentUser ? 'Manage Account' : 'Sign In / Up'}
          </button>
        </div>

        {syncStatusMsg && (
          <div style={{ fontSize: 'var(--font-xs)', color: 'var(--success)' }}>
            {syncStatusMsg}
          </div>
        )}

        <button
          type="button"
          className="btn-secondary"
          style={{ width: '100%', height: '42px', marginTop: 4 }}
          onClick={handleManualSync}
          disabled={isSyncing}
        >
          <RefreshCw size={15} className={isSyncing ? 'spin' : ''} />
          <span>{isSyncing ? 'Syncing...' : 'Sync Cloud Backup Now'}</span>
        </button>
      </div>

      {/* ===================== SECTION 5: DATA BACKUP & EXPORT ===================== */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <Download size={18} color="var(--accent-primary)" />
          <span>Data Backup & Ownership</span>
        </div>
        <p className={styles.sectionDesc}>
          Export your entire workout history as a JSON file. Your data is stored locally in IndexedDB and belongs 100% to you.
        </p>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-xs)', color: 'var(--text-muted)' }}>
          <span>Logged Sessions: <strong>{exportStats.sessions}</strong></span>
          <span>Total Sets: <strong>{exportStats.sets}</strong></span>
        </div>

        <button
          type="button"
          className={styles.exportBtn}
          onClick={handleExportData}
        >
          <Download size={16} />
          <span>Export Workout History (JSON)</span>
        </button>
      </div>

      {/* App Info Footer */}
      <div style={{ textAlign: 'center', fontSize: '11px', color: 'var(--text-disabled)', marginTop: 'var(--space-2)' }}>
        NextSet Gym PWA · Version 1.0.0 · Offline Ready
      </div>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
};
