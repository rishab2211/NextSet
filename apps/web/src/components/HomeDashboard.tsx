'use client';

import React, { useState, useEffect } from 'react';
import type { WorkoutSession, AuthUser } from '@nextset/shared';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../lib/db';
import { AuthModal } from './AuthModal';
import { SyncStatusButton } from './SyncStatusButton';
import { getCurrentUser } from '../lib/auth/authStore';
import {
  Play,
  ArrowRight,
  Flame,
  User,
  ChevronDown,
  Trash2,
  RotateCcw,
} from 'lucide-react';
import {
  DumbbellHorizontalIcon,
  PushSunIcon,
  PullLifterIcon,
  LegMuscleIcon,
} from './HomeIcons';
import styles from './HomeDashboard.module.css';

interface HomeDashboardProps {
  activeSession: WorkoutSession | null;
  onResumeWorkout: () => void;
  onDiscardWorkout?: (sessionId: string) => Promise<void> | void;
  onStartNewWorkout: (title?: string, initialExercises?: string[]) => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  activeSession,
  onResumeWorkout,
  onDiscardWorkout,
  onStartNewWorkout,
}) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [isDiscardConfirmOpen, setIsDiscardConfirmOpen] = useState<boolean>(false);
  const [isDiscarding, setIsDiscarding] = useState<boolean>(false);

  // Real, authentic user statistics from Dexie DB
  const userStats = useLiveQuery(async () => {
    const completed = await db.workoutSessions
      .where('status')
      .equals('completed')
      .filter((s) => !s.deleted)
      .toArray();

    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thisWeekCount = completed.filter(
      (s) => new Date(s.ended_at || s.started_at) >= oneWeekAgo
    ).length;

    return {
      total: completed.length,
      thisWeek: thisWeekCount,
    };
  }, []);

  // Most recent completed workout for authentic 1-tap repeat
  const recentWorkout = useLiveQuery(async () => {
    const completed = await db.workoutSessions
      .where('status')
      .equals('completed')
      .filter((s) => !s.deleted)
      .reverse()
      .sortBy('started_at');

    if (!completed || completed.length === 0) return null;
    const lastSession = completed[0];

    const sessionSets = await db.workoutSets
      .where('session_id')
      .equals(lastSession.id)
      .filter((s) => !s.deleted && s.completed)
      .toArray();

    const exerciseIds = Array.from(new Set(sessionSets.map((s) => s.exercise_id)));

    let durationMins = 0;
    if (lastSession.started_at && lastSession.ended_at) {
      const diff = new Date(lastSession.ended_at).getTime() - new Date(lastSession.started_at).getTime();
      durationMins = Math.max(1, Math.round(diff / 60000));
    }

    const d = new Date(lastSession.ended_at || lastSession.started_at);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
    let timeAgo = 'Today';
    if (diffDays === 1) timeAgo = 'Yesterday';
    else if (diffDays > 1 && diffDays < 7) timeAgo = `${diffDays} days ago`;
    else if (diffDays >= 7) timeAgo = d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });

    return {
      id: lastSession.id,
      title: lastSession.title || 'Gym Workout',
      timeAgo,
      exerciseIds,
      exerciseCount: exerciseIds.length,
      setCount: sessionSets.length,
      durationMins,
    };
  }, []);

  useEffect(() => {
    setCurrentUser(getCurrentUser());

    const handleAuthChange = () => setCurrentUser(getCurrentUser());

    window.addEventListener('nextset_auth_change', handleAuthChange);
    window.addEventListener('kinetic_auth_change', handleAuthChange);

    return () => {
      window.removeEventListener('nextset_auth_change', handleAuthChange);
      window.removeEventListener('kinetic_auth_change', handleAuthChange);
    };
  }, []);

  const routines = [
    {
      title: 'Push Day',
      target: 'Chest · Shoulders · Triceps',
      description: 'Bench Press · Incline DB Press · Cable Fly · Overhead Press',
      exerciseIds: ['ex-bb-bench-press', 'ex-incline-db-press', 'ex-cable-chest-flye', 'ex-overhead-press'],
      icon: <PushSunIcon size={18} color="#ffffff" strokeWidth={2.2} />,
      iconBg: '#f59e0b',
    },
    {
      title: 'Pull Day',
      target: 'Back · Biceps',
      description: 'Pull-Up · Lat Pulldown · Barbell Row · DB Curl',
      exerciseIds: ['ex-pull-up', 'ex-lat-pulldown', 'ex-bb-row', 'ex-incline-db-curl'],
      icon: <PullLifterIcon size={18} color="#ffffff" />,
      iconBg: '#10b981',
    },
    {
      title: 'Leg Day',
      target: 'Quads · Hamstrings · Calves',
      description: 'Squat · Leg Press · Romanian Deadlift · Calf Raise',
      exerciseIds: ['ex-barbell-squat', 'ex-leg-press', 'ex-romanian-deadlift', 'ex-standing-calf-raise'],
      icon: <LegMuscleIcon size={18} color="#ffffff" strokeWidth={1.9} />,
      iconBg: 'var(--accent-primary, #8b5cf6)',
    },
  ];

  return (
    <div className={styles.container}>
      {/* Top Bar matching HomePage */}
      <header className={styles.topBar}>
        <div className={styles.logoArea}>
          <div className={styles.logoIcon}>
            <DumbbellHorizontalIcon size={18} color="#ffffff" strokeWidth={2.2} />
          </div>
          <span className={styles.logoText}>
            <span className={styles.logoNext}>Next</span>
            <span className={styles.logoSet}>Set</span>
          </span>
        </div>

        <div className={styles.statusArea}>
          <button
            type="button"
            className={styles.authBadgeBtn}
            onClick={() => setIsAuthModalOpen(true)}
            title="Account"
          >
            <User size={13} color="#cbd5e1" />
            <span className={styles.userNameText}>
              {currentUser ? (currentUser.name || currentUser.email.split('@')[0]) : 'Sign in'}
            </span>
            <ChevronDown size={12} color="#94a3b8" />
          </button>

          <SyncStatusButton onOpenAuth={() => setIsAuthModalOpen(true)} />
        </div>
      </header>

      {/* Active Workout Banner */}
      {activeSession && (
        <section className={styles.activeBanner} aria-label="Active workout in progress">
          <div className={styles.bannerTop}>
            <div className={styles.bannerTitle}>
              <Flame size={17} color="var(--accent-primary, #a78bfa)" />
              <span>{activeSession.title}</span>
            </div>
            <span className="badge badge-success">In progress</span>
          </div>

          <div className={styles.bannerActions}>
            <button
              type="button"
              className={styles.bannerResumeBtn}
              onClick={onResumeWorkout}
            >
              <Play size={15} fill="currentColor" />
              <span>Resume workout</span>
            </button>
            {onDiscardWorkout && (
              <button
                type="button"
                className={styles.bannerDiscardBtn}
                onClick={() => setIsDiscardConfirmOpen(true)}
                title="Discard workout"
                aria-label="Discard workout"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        </section>
      )}

      {/* Primary CTA: Start Empty Workout */}
      {!activeSession && (
        <button
          type="button"
          className={styles.startWorkoutCtaBtn}
          onClick={() => onStartNewWorkout('Gym Workout')}
        >
          <div className={styles.startWorkoutCtaCenter}>
            <Play size={16} fill="currentColor" />
            <span>Start empty workout</span>
          </div>
          <ArrowRight size={16} strokeWidth={2.4} />
        </button>
      )}

      {/* Grounded Authentic Stats Strip */}
      <section className={styles.statsCard} aria-label="Workout stats">
        <div className={styles.statItem}>
          <span className={styles.statNum}>{userStats?.total ?? 0}</span>
          <span className={styles.statLabel}>Total Workouts</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNum}>{userStats?.thisWeek ?? 0}</span>
          <span className={styles.statLabel}>This Week</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNum}>{routines.length}</span>
          <span className={styles.statLabel}>Routines</span>
        </div>
      </section>

      {/* Recent Workout Quick Repeat */}
      {!activeSession && recentWorkout && (
        <section className={styles.recentWorkoutCard} aria-label="Most recent workout">
          <div className={styles.recentWorkoutLeft}>
            <div className={styles.recentWorkoutIcon}>
              <RotateCcw size={16} color="var(--accent-primary, #c084fc)" />
            </div>
            <div className={styles.recentWorkoutTexts}>
              <div className={styles.recentWorkoutTitleRow}>
                <span className={styles.recentWorkoutTitle}>{recentWorkout.title}</span>
                <span className={styles.recentWorkoutDot}>·</span>
                <span className={styles.recentWorkoutTime}>{recentWorkout.timeAgo}</span>
              </div>
              <div className={styles.recentWorkoutMeta}>
                {recentWorkout.exerciseCount} {recentWorkout.exerciseCount === 1 ? 'exercise' : 'exercises'} · {recentWorkout.setCount} sets{recentWorkout.durationMins > 0 ? ` · ${recentWorkout.durationMins}m` : ''}
              </div>
            </div>
          </div>

          <button
            type="button"
            className={styles.repeatWorkoutBtn}
            onClick={() => onStartNewWorkout(recentWorkout.title, recentWorkout.exerciseIds)}
            title="Repeat this workout"
          >
            <Play size={11} fill="currentColor" />
            <span>Repeat</span>
          </button>
        </section>
      )}

      {/* Workout Routines Section */}
      <section className={styles.routinesSection} aria-label="Routines list">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Workout routines</h2>
          <p className={styles.sectionSubtitle}>Select a routine to begin your workout.</p>
        </div>

        <div className={styles.routinesList}>
          {routines.map((routine, idx) => (
            <div
              key={idx}
              className={styles.routineCard}
              onClick={() => onStartNewWorkout(routine.title, routine.exerciseIds)}
            >
              <div className={styles.routineCardHeader}>
                <div className={styles.routineLeft}>
                  <div className={styles.routineIconWrap} style={{ background: routine.iconBg }}>
                    {routine.icon}
                  </div>
                  <div className={styles.routineTitleArea}>
                    <div className={styles.routineName}>{routine.title}</div>
                    <div className={styles.routineTargetBadge}>{routine.target}</div>
                  </div>
                </div>
                <ArrowRight size={16} color="#94a3b8" strokeWidth={1.8} />
              </div>

              <div className={styles.routineExercisesText}>{routine.description}</div>

              <div className={styles.startRoutineRow}>
                <span className={styles.startRoutineBtn}>
                  <Play size={12} fill="currentColor" />
                  <span>Start routine</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Discard Confirmation Dialog */}
      {isDiscardConfirmOpen && activeSession && (
        <div
          className={styles.confirmOverlay}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsDiscardConfirmOpen(false);
            }
          }}
        >
          <div className={styles.confirmCard} onClick={(e) => e.stopPropagation()}>
            <div className={styles.confirmTitle}>Delete this workout?</div>
            <div className={styles.confirmDesc}>
              All logged sets will be deleted.
            </div>
            <div className={styles.confirmActions}>
              <button
                type="button"
                className={styles.confirmKeepBtn}
                onClick={() => setIsDiscardConfirmOpen(false)}
                disabled={isDiscarding}
              >
                Keep Workout
              </button>
              <button
                type="button"
                className={styles.confirmDiscardBtn}
                onClick={async () => {
                  if (isDiscarding || !onDiscardWorkout) return;
                  try {
                    setIsDiscarding(true);
                    await onDiscardWorkout(activeSession.id);
                    setIsDiscardConfirmOpen(false);
                  } catch (err) {
                    console.error('Failed to discard workout:', err);
                    setIsDiscardConfirmOpen(false);
                  } finally {
                    setIsDiscarding(false);
                  }
                }}
                disabled={isDiscarding}
              >
                {isDiscarding ? 'Discarding...' : 'Discard'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Account Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
};
