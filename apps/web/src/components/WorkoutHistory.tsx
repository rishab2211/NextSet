'use client';

import React from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../lib/db';
import { Calendar, Dumbbell, Award } from 'lucide-react';
import styles from './WorkoutHistory.module.css';

export const WorkoutHistory: React.FC = () => {
  const completedSessions = useLiveQuery(
    () =>
      db.workoutSessions
        .where('status')
        .equals('completed')
        .filter((s) => !s.deleted)
        .reverse()
        .sortBy('started_at'),
    []
  ) || [];

  const sets = useLiveQuery(
    () => db.workoutSets.filter((s) => !s.deleted && s.completed).toArray(),
    []
  ) || [];

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return isoString;
    }
  };

  const getDurationMinutes = (start: string, end?: string) => {
    if (!end) return '—';
    const s = new Date(start).getTime();
    const e = new Date(end).getTime();
    const mins = Math.max(1, Math.round((e - s) / 60000));
    return `${mins} min`;
  };

  const getSessionStats = (sessionId: string) => {
    const sessionSets = sets.filter((s) => s.session_id === sessionId);
    const totalVolume = sessionSets.reduce((sum, s) => sum + s.weight_value * s.reps, 0);
    return {
      setCount: sessionSets.length,
      volumeKg: Math.round(totalVolume),
    };
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Workout Log & History</h1>

      {completedSessions.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: 'var(--text-muted)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <Award size={48} color="var(--border-strong)" />
          <h3>No Completed Workouts Yet</h3>
          <p style={{ fontSize: 'var(--font-sm)' }}>
            Start an active workout session from the main screen to log your lifts and track progressive overload.
          </p>
        </div>
      ) : (
        <div className={styles.historyList}>
          {completedSessions.map((session) => {
            const stats = getSessionStats(session.id);
            return (
              <div key={session.id} className={styles.card}>
                <div className={styles.cardHeader}>
                  <div className={styles.workoutTitle}>{session.title}</div>
                  <div className={styles.dateBadge}>{formatDate(session.started_at)}</div>
                </div>

                <div className={styles.statsGrid}>
                  <div className={styles.statItem}>
                    <div className={styles.statLabel}>Duration</div>
                    <div className={styles.statValue}>
                      {getDurationMinutes(session.started_at, session.ended_at)}
                    </div>
                  </div>

                  <div className={styles.statItem}>
                    <div className={styles.statLabel}>Completed Sets</div>
                    <div className={styles.statValue}>{stats.setCount}</div>
                  </div>

                  <div className={styles.statItem}>
                    <div className={styles.statLabel}>Total Volume</div>
                    <div className={styles.statValue}>{stats.volumeKg.toLocaleString()} kg</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
