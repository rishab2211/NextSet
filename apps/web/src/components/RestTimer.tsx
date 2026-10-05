'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { RestClockIcon } from './HomeIcons';
import { soundFx } from '../lib/audio';
import { getWorkoutPreferences } from '../lib/themeStore';
import styles from './RestTimer.module.css';

interface RestTimerProps {
  targetTimestamp: number | null;
  totalDuration: number;
  onFinish: () => void;
  onAdjust: (deltaSeconds: number) => void;
}

export const RestTimer: React.FC<RestTimerProps> = ({
  targetTimestamp,
  totalDuration,
  onFinish,
  onAdjust,
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState<number>(0);
  const playedWarningSeconds = useRef<Set<number>>(new Set());

  useEffect(() => {
    if (!targetTimestamp) {
      setSecondsRemaining(0);
      playedWarningSeconds.current.clear();
      return;
    }

    const update = () => {
      const remainingMs = targetTimestamp - Date.now();
      const remSec = Math.max(0, Math.ceil(remainingMs / 1000));
      setSecondsRemaining(remSec);

      const prefs = getWorkoutPreferences();

      // Warning ticks at T-3, T-2, T-1
      if ([3, 2, 1].includes(remSec) && !playedWarningSeconds.current.has(remSec)) {
        playedWarningSeconds.current.add(remSec);
        if (prefs.timerSound) {
          soundFx.playTick();
        }
        if (prefs.hapticFeedback && typeof navigator !== 'undefined' && 'vibrate' in navigator) {
          navigator.vibrate(50);
        }
      }

      // Finish at T-0
      if (remainingMs <= 0) {
        if (prefs.timerSound) {
          soundFx.playChime();
        }
        if (prefs.hapticFeedback && typeof navigator !== 'undefined' && 'vibrate' in navigator) {
          navigator.vibrate([150, 80, 150]);
        }
        onFinish();
      }
    };

    update();
    const interval = setInterval(update, 500);

    return () => clearInterval(interval);
  }, [targetTimestamp, onFinish]);

  if (!targetTimestamp || secondsRemaining <= 0) return null;

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  const progressPercent = totalDuration > 0
    ? Math.max(0, Math.min(100, (secondsRemaining / totalDuration) * 100))
    : 0;

  return (
    <div className={styles.dock}>
      <div className={styles.topRow}>
        <div className={styles.titleArea}>
          <RestClockIcon size={16} strokeWidth={2.4} color="var(--accent-primary, #a78bfa)" />
          <div className={styles.timerLabel}>Resting</div>
        </div>

        <div className={styles.countdownDisplay}>{formattedTime}</div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.adjustBtn}
            onClick={() => onAdjust(30)}
          >
            +30s
          </button>
          <button
            type="button"
            className={styles.adjustBtn}
            onClick={() => onAdjust(-15)}
          >
            -15s
          </button>
          <button
            type="button"
            className={styles.skipBtn}
            onClick={onFinish}
            aria-label="Skip timer"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
};
