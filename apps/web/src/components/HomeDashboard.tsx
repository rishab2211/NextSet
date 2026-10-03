'use client';

import React, { useState, useEffect } from 'react';
import type { WorkoutSession, AuthUser } from '@nextset/shared';
import { AuthModal } from './AuthModal';
import { getCurrentUser } from '../lib/auth/authStore';
import {
  Play,
  Wifi,
  WifiOff,
  Dumbbell,
  ArrowRight,
  Flame,
  Shield,
} from 'lucide-react';
import styles from './HomeDashboard.module.css';

interface HomeDashboardProps {
  activeSession: WorkoutSession | null;
  onResumeWorkout: () => void;
  onStartNewWorkout: (title?: string, initialExercises?: string[]) => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  activeSession,
  onResumeWorkout,
  onStartNewWorkout,
}) => {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    setCurrentUser(getCurrentUser());

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    const handleAuthChange = () => setCurrentUser(getCurrentUser());

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('kinetic_auth_change', handleAuthChange);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('kinetic_auth_change', handleAuthChange);
    };
  }, []);

  const routines = [
    {
      title: 'Push (Chest, Shoulders & Triceps)',
      description: 'Barbell Bench Press, Incline DB Press, Cable Flye, Overhead Press',
      exerciseIds: ['ex-bb-bench-press', 'ex-incline-db-press', 'ex-cable-chest-flye', 'ex-overhead-press'],
    },
    {
      title: 'Pull (Back & Biceps)',
      description: 'Pull-Up, Lat Pulldown, Barbell Row, Incline DB Curl',
      exerciseIds: ['ex-pull-up', 'ex-lat-pulldown', 'ex-bb-row', 'ex-incline-db-curl'],
    },
    {
      title: 'Legs (Quads, Hamstrings & Calves)',
      description: 'Barbell Squat, Leg Press, Romanian Deadlift, Standing Calf Raise',
      exerciseIds: ['ex-barbell-squat', 'ex-leg-press', 'ex-romanian-deadlift', 'ex-standing-calf-raise'],
    },
  ];

  return (
    <div className={styles.container}>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <div className={styles.logoArea}>
          <div className={styles.logoIcon}>
            <Dumbbell size={18} color="var(--accent-primary)" />
          </div>
          <div className={styles.logoText}>NEXTSET</div>
        </div>

        <div className={styles.statusArea}>
          <button
            type="button"
            className={styles.authBadgeBtn}
            onClick={() => setIsAuthModalOpen(true)}
            title="Account & Cloud Sync Settings"
          >
            <Shield size={13} color="var(--accent-primary)" />
            <span>{currentUser ? (currentUser.name || currentUser.email.split('@')[0]) : 'Sign In / Sync'}</span>
          </button>

          <span
            className={`badge ${isOnline ? 'badge-success' : 'badge-amber'}`}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}
          >
            {isOnline ? <Wifi size={12} /> : <WifiOff size={12} />}
            <span>{isOnline ? 'Synced' : 'Offline'}</span>
          </span>
        </div>
      </div>

      {/* Active Session Resume Banner */}
      {activeSession && (
        <div className={styles.activeBanner}>
          <div className={styles.bannerTop}>
            <div className={styles.bannerTitle}>
              <Flame size={18} color="var(--accent-primary)" />
              <span>{activeSession.title} in Progress</span>
            </div>
            <span className="badge badge-success">Active Now</span>
          </div>

          <p style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)' }}>
            Your workout is safely saved in local storage. All logged sets will restore instantly.
          </p>

          <button
            type="button"
            className="btn-primary"
            style={{ width: '100%', height: '46px' }}
            onClick={onResumeWorkout}
          >
            <Play size={16} fill="currentColor" />
            <span>Resume Workout</span>
          </button>
        </div>
      )}

      {/* Quick Start CTA */}
      <div>
        <button
          type="button"
          className="btn-primary"
          style={{ width: '100%', height: '52px', fontSize: 'var(--font-base)' }}
          onClick={() => onStartNewWorkout('Gym Workout')}
        >
          <Play size={18} fill="currentColor" />
          <span>Start Empty Workout</span>
        </button>
      </div>

      {/* Routine Templates */}
      <div>
        <div className={styles.sectionTitle}>Recommended Workouts</div>
        <div className={styles.routinesGrid}>
          {routines.map((routine, idx) => (
            <div
              key={idx}
              className={styles.routineCard}
              onClick={() => onStartNewWorkout(routine.title, routine.exerciseIds)}
            >
              <div className={styles.routineInfo}>
                <div className={styles.routineName}>{routine.title}</div>
                <div className={styles.routineDesc}>{routine.description}</div>
              </div>
              <ArrowRight size={18} color="var(--text-muted)" />
            </div>
          ))}
        </div>
      </div>

      {/* Account & Partition Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
};
