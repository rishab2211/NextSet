'use client';

import React, { useState, useEffect } from 'react';
import type { WorkoutSession, ExerciseGuide, AuthUser } from '@kinetic/shared';
import { EXERCISES } from '../data/exercises';
import { ExerciseModal } from './ExerciseModal';
import { AuthModal } from './AuthModal';
import { getCurrentUser } from '../lib/auth/authStore';
import {
  Zap,
  Play,
  Wifi,
  WifiOff,
  Dumbbell,
  ArrowRight,
  Flame,
  CheckCircle2,
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
  const [selectedGuideExercise, setSelectedGuideExercise] = useState<ExerciseGuide | null>(null);
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
      title: 'Push A (Hypertrophy)',
      description: 'Barbell Flat Bench, Incline DB Press, Cable Flye, Overhead Press',
      exerciseIds: ['ex-bb-bench-press', 'ex-incline-db-press', 'ex-cable-chest-flye', 'ex-overhead-press'],
    },
    {
      title: 'Pull A (Back & Arms)',
      description: 'Pull-Up, Lat Pulldown, Barbell Row, Incline DB Curl',
      exerciseIds: ['ex-pull-up', 'ex-lat-pulldown', 'ex-bb-row', 'ex-incline-db-curl'],
    },
    {
      title: 'Legs & Calves Focus',
      description: 'Barbell Squat, 45° Leg Press, Romanian Deadlift, Calf Raise',
      exerciseIds: ['ex-barbell-squat', 'ex-leg-press', 'ex-romanian-deadlift', 'ex-standing-calf-raise'],
    },
  ];

  return (
    <div className={styles.container}>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <div className={styles.logoArea}>
          <div className={styles.logoIcon}>
            <Zap size={20} />
          </div>
          <div className={styles.logoText}>KINETIC</div>
        </div>

        <div className={styles.statusArea}>
          <button
            type="button"
            className={styles.authBadgeBtn}
            onClick={() => setIsAuthModalOpen(true)}
            title="Account & Cloud Sync Settings"
          >
            <Shield size={13} color={currentUser ? 'var(--accent-volt)' : 'var(--accent-cyan)'} />
            <span>{currentUser ? currentUser.email.split('@')[0] : 'Device Sync'}</span>
          </button>

          <span
            className={`badge ${isOnline ? 'badge-cyan' : 'badge-amber'}`}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}
          >
            {isOnline ? <Wifi size={12} /> : <WifiOff size={12} />}
            <span>{isOnline ? 'Cloud' : 'Offline'}</span>
          </span>
        </div>
      </div>

      {/* Active Session Resume Banner */}
      {activeSession && (
        <div className={styles.activeBanner}>
          <div className={styles.bannerTop}>
            <div className={styles.bannerTitle}>
              <Flame size={18} color="var(--accent-volt)" />
              <span>{activeSession.title} in Progress</span>
            </div>
            <span className="badge badge-volt">Active Now</span>
          </div>

          <p style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)' }}>
            Workout is actively tracking in IndexedDB. All sets and rest timers will restore instantly.
          </p>

          <button
            type="button"
            className="btn-volt"
            style={{ width: '100%', height: '44px' }}
            onClick={onResumeWorkout}
          >
            <Play size={16} />
            <span>Resume Workout</span>
          </button>
        </div>
      )}

      {/* Quick Start CTA */}
      <div>
        <button
          type="button"
          className="btn-primary"
          style={{ width: '100%', height: '52px' }}
          onClick={() => onStartNewWorkout('Empty Workout')}
        >
          <Play size={18} />
          <span>Quick Start Empty Workout</span>
        </button>
      </div>

      {/* Routine Templates */}
      <div>
        <div className={styles.sectionTitle}>High SFR Workout Routines</div>
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
              <ArrowRight size={18} color="var(--accent-cyan)" />
            </div>
          ))}
        </div>
      </div>

      {/* Scientific Form Guides Carousel */}
      <div>
        <div className={styles.sectionTitle}>Scientific Biomechanics Quick Guides</div>
        <div className={styles.featuredList}>
          {EXERCISES.slice(0, 5).map((ex) => (
            <div
              key={ex.id}
              className={styles.featuredCard}
              onClick={() => setSelectedGuideExercise(ex)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="badge badge-cyan">{ex.category}</span>
                <span style={{ fontSize: '11px', color: 'var(--accent-volt)', fontWeight: 700 }}>
                  Tier {ex.sfrTier}
                </span>
              </div>
              <div style={{ fontWeight: 700, fontSize: 'var(--font-sm)', color: 'var(--text-primary)' }}>
                {ex.name}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                {ex.primaryMuscles.join(', ')}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Exercise Modal */}
      <ExerciseModal
        exercise={selectedGuideExercise}
        onClose={() => setSelectedGuideExercise(null)}
        onAddToWorkout={(ex) => onStartNewWorkout(`${ex.name} Session`, [ex.id])}
      />

      {/* Account & Partition Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
};
