'use client';

import React from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../lib/db';
import { getExerciseById } from '../data/exercises';
import { Calendar, Dumbbell, Award, Clock } from 'lucide-react';
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

  const getSessionDetails = (sessionId: string) => {
    const sessionSets = sets.filter((s) => s.session_id === sessionId);
    const exerciseIds = Array.from(new Set(sessionSets.map((s) => s.exercise_id)));
    const exerciseSummaries = exerciseIds.map((exId) => {
      const ex = getExerciseById(exId);
      const exSets = sessionSets.filter((s) => s.exercise_id === exId);
      const topWeight = Math.max(...exSets.map((s) => s.weight_value), 0);
      const unit = exSets[0]?.weight_unit || 'kg';
      return {
        name: ex ? ex.name : exId,
        setCount: exSets.length,
        topWeight: topWeight > 0 ? `${topWeight}${unit}` : null,
      };
    });

    return {
      setCount: sessionSets.length,
      exercises: exerciseSummaries,
    };
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>History</h1>

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
          <h3 style={{ color: 'var(--text-primary)', fontSize: 'var(--font-lg)' }}>No workouts yet</h3>
          <p style={{ fontSize: 'var(--font-sm)', color: 'var(--text-muted)' }}>
            Workouts you finish will show up here.
          </p>
        </div>
      ) : (
        <div className={styles.historyList}>
          {completedSessions.map((session) => {
            const details = getSessionDetails(session.id);
            return (
              <div key={session.id} className={styles.card}>
                <div className={styles.cardHeader}>
                  <div>
                    <div className={styles.workoutTitle}>{session.title}</div>
                    <div className={styles.dateBadge}>{formatDate(session.started_at)}</div>
                  </div>
                  <div className={styles.durationPill}>
                    <Clock size={12} />
                    <span>{getDurationMinutes(session.started_at, session.ended_at)}</span>
                  </div>
                </div>

                {/* Exercises performed breakdown */}
                {details.exercises.length > 0 && (
                  <div className={styles.exerciseTagsList}>
                    {details.exercises.map((item, idx) => (
                      <div key={idx} className={styles.exerciseItemRow}>
                        <span className={styles.exerciseNameText}>{item.name}</span>
                        <span className={styles.exerciseMetaText}>
                          {item.setCount} sets {item.topWeight ? `· Top: ${item.topWeight}` : ''}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
