'use client';

import React, { useState, useEffect } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import confetti from 'canvas-confetti';
import { db } from '../lib/db';
import {
  finishWorkoutSession,
  abandonWorkoutSession,
  addWorkoutSet,
  updateWorkoutSet,
  deleteWorkoutSet,
  getPreviousExerciseSets,
} from '../lib/db/workoutStore';
import { EXERCISES, getExerciseById } from '../data/exercises';
import type { WorkoutSession, WorkoutSet, ExerciseGuide, MuscleGroup } from '@kinetic/shared';
import { SetRow } from './SetRow';
import { Numpad, type NumpadMode } from './Numpad';
import { RestTimer } from './RestTimer';
import { ExerciseModal } from './ExerciseModal';
import {
  CheckCircle,
  Plus,
  BookOpen,
  Clock,
  Trash2,
  X,
  Search,
  Dumbbell,
} from 'lucide-react';
import styles from './ActiveWorkout.module.css';

interface ActiveWorkoutProps {
  session: WorkoutSession;
  onFinishWorkout: () => void;
}

export const ActiveWorkout: React.FC<ActiveWorkoutProps> = ({
  session,
  onFinishWorkout,
}) => {
  // 1. Live Query for current session's sets
  const sets = useLiveQuery(
    () =>
      db.workoutSets
        .where('session_id')
        .equals(session.id)
        .filter((s) => !s.deleted)
        .sortBy('set_number'),
    [session.id]
  ) || [];

  // 2. Elapsed workout duration timer
  const [elapsedSec, setElapsedSec] = useState<number>(0);
  useEffect(() => {
    const startMs = new Date(session.started_at).getTime();
    const tick = () => {
      setElapsedSec(Math.max(0, Math.floor((Date.now() - startMs) / 1000)));
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [session.started_at]);

  const formatElapsed = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins}:${s.toString().padStart(2, '0')}`;
  };

  // 3. Rest Timer State
  const [restTarget, setRestTarget] = useState<number | null>(null);
  const [restDuration, setRestDuration] = useState<number>(90);

  const startRestTimer = (seconds: number = 90) => {
    setRestDuration(seconds);
    setRestTarget(Date.now() + seconds * 1000);
  };

  const handleAdjustTimer = (deltaSec: number) => {
    if (!restTarget) return;
    setRestTarget((prev) => (prev ? Math.max(Date.now(), prev + deltaSec * 1000) : null));
    setRestDuration((prev) => Math.max(10, prev + deltaSec));
  };

  // 4. Custom Numpad Modal State
  const [numpadConfig, setNumpadConfig] = useState<{
    isOpen: boolean;
    mode: NumpadMode;
    initialValue: number;
    unit?: string;
    callback: (val: number) => void;
  }>({
    isOpen: false,
    mode: 'weight',
    initialValue: 0,
    callback: () => {},
  });

  const openNumpad = (
    mode: NumpadMode,
    initialValue: number,
    unit: string,
    callback: (val: number) => void
  ) => {
    setNumpadConfig({
      isOpen: true,
      mode,
      initialValue,
      unit,
      callback,
    });
  };

  // 5. Exercise Detail Modal State
  const [modalExercise, setModalExercise] = useState<ExerciseGuide | null>(null);

  // 6. Exercise Picker Drawer State
  const [isPickerOpen, setIsPickerOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedMuscleFilter, setSelectedMuscleFilter] = useState<string>('all');

  // Unique exercise IDs present in this workout
  const exerciseIdsInWorkout = Array.from(new Set(sets.map((s) => s.exercise_id)));

  // Group sets by exercise
  const setsByExercise = exerciseIdsInWorkout.reduce<Record<string, WorkoutSet[]>>(
    (acc, exId) => {
      acc[exId] = sets.filter((s) => s.exercise_id === exId);
      return acc;
    },
    {}
  );

  // Handlers
  const handleToggleComplete = async (set: WorkoutSet) => {
    const nextCompleted = !set.completed;
    await updateWorkoutSet(set.id, { completed: nextCompleted });

    if (nextCompleted) {
      // Trigger rest timer
      startRestTimer(90);
    }
  };

  const handleAddSetForExercise = async (exerciseId: string) => {
    const exerciseSets = setsByExercise[exerciseId] || [];
    const nextSetNumber = exerciseSets.length + 1;
    const lastSet = exerciseSets[exerciseSets.length - 1];

    await addWorkoutSet({
      sessionId: session.id,
      exerciseId,
      setNumber: nextSetNumber,
      weightValue: lastSet ? lastSet.weight_value : 0,
      weightUnit: lastSet ? lastSet.weight_unit : 'kg',
      reps: lastSet ? lastSet.reps : 10,
      setType: 'working',
    });
  };

  const handleSelectExerciseFromPicker = async (exercise: ExerciseGuide) => {
    setIsPickerOpen(false);
    // Add first set for this exercise
    await addWorkoutSet({
      sessionId: session.id,
      exerciseId: exercise.id,
      setNumber: 1,
      weightValue: 0,
      weightUnit: 'kg',
      reps: exercise.recommendedRepRange.min || 8,
      setType: 'working',
    });
  };

  const handleFinish = async () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00f0ff', '#ccff00', '#10b981', '#f59e0b'],
      });
    } catch (e) {
      // Confetti fallback
    }

    await finishWorkoutSession(session.id);
    onFinishWorkout();
  };

  const handleCancel = async () => {
    if (window.confirm('Are you sure you want to discard this workout?')) {
      await abandonWorkoutSession(session.id);
      onFinishWorkout();
    }
  };

  // Filtered exercises for picker
  const filteredExercises = EXERCISES.filter((ex) => {
    const matchesSearch =
      ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMuscle =
      selectedMuscleFilter === 'all' ||
      ex.primaryMuscles.includes(selectedMuscleFilter as any) ||
      ex.secondaryMuscles.includes(selectedMuscleFilter as any);
    return matchesSearch && matchesMuscle;
  });

  return (
    <div className={styles.container}>
      {/* Sticky Top Bar */}
      <div className={styles.topBar}>
        <div className={styles.workoutMeta}>
          <div className={styles.workoutTitle}>
            <Dumbbell size={20} color="var(--accent-cyan)" />
            <span>{session.title}</span>
          </div>
          <div className={styles.durationBadge}>
            <Clock size={13} />
            <span>{formatElapsed(elapsedSec)}</span>
          </div>
        </div>

        <div className={styles.topActions}>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={handleCancel}
            title="Discard Workout"
          >
            <Trash2 size={18} />
          </button>
          <button
            type="button"
            className={styles.finishBtn}
            onClick={handleFinish}
          >
            <CheckCircle size={16} />
            <span>Finish</span>
          </button>
        </div>
      </div>

      {/* Exercises List */}
      {exerciseIdsInWorkout.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '40px 20px',
            color: 'var(--text-secondary)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <Dumbbell size={48} color="var(--border-strong)" />
          <h3>Workout is Empty</h3>
          <p style={{ fontSize: 'var(--font-sm)', color: 'var(--text-muted)' }}>
            Add your first exercise below to begin logging sets with instant numeric inputs.
          </p>
        </div>
      ) : (
        exerciseIdsInWorkout.map((exId) => {
          const exercise = getExerciseById(exId);
          const exerciseSets = setsByExercise[exId] || [];

          return (
            <div key={exId} className={styles.exerciseCard}>
              <div className={styles.exerciseHeader}>
                <div className={styles.exerciseInfo}>
                  <div className={styles.exerciseName}>
                    {exercise ? exercise.name : exId}
                  </div>
                  <div className={styles.exerciseSub}>
                    {exercise?.equipment} · {exercise?.primaryMuscles.join(', ')}
                  </div>
                </div>

                {exercise && (
                  <button
                    type="button"
                    className={styles.guideBtn}
                    onClick={() => setModalExercise(exercise)}
                  >
                    <BookOpen size={13} />
                    <span>Form Guide</span>
                  </button>
                )}
              </div>

              {/* Table Column Headers */}
              <div className={styles.setTableHeader}>
                <span>SET</span>
                <span>PREV</span>
                <span>WEIGHT</span>
                <span>REPS</span>
                <span>DONE</span>
              </div>

              {/* Set Rows */}
              <div className={styles.setTableList}>
                {exerciseSets.map((st) => (
                  <SetRow
                    key={st.id}
                    set={st}
                    onUpdate={(id, updates) => updateWorkoutSet(id, updates)}
                    onCompleteToggle={handleToggleComplete}
                    onOpenNumpad={openNumpad}
                  />
                ))}
              </div>

              {/* Add Set Button */}
              <button
                type="button"
                className={styles.addSetBtn}
                onClick={() => handleAddSetForExercise(exId)}
              >
                <Plus size={16} />
                <span>Add Set</span>
              </button>
            </div>
          );
        })
      )}

      {/* Primary Action: Add Exercise */}
      <button
        type="button"
        className={styles.addExerciseBtn}
        onClick={() => setIsPickerOpen(true)}
      >
        <Plus size={20} />
        <span>Add Exercise</span>
      </button>

      {/* Exercise Picker Modal */}
      {isPickerOpen && (
        <div className={styles.pickerOverlay} onClick={() => setIsPickerOpen(false)}>
          <div className={styles.pickerDrawer} onClick={(e) => e.stopPropagation()}>
            <div className={styles.pickerHeader}>
              <div className={styles.pickerTop}>
                <h3>Select Exercise</h3>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={() => setIsPickerOpen(false)}
                >
                  <X size={20} />
                </button>
              </div>

              <input
                type="text"
                className={styles.searchInput}
                placeholder="Search exercise or muscle..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />

              <div className={styles.filterChips}>
                {[
                  'all',
                  'chest',
                  'lats',
                  'upper_back',
                  'quadriceps',
                  'hamstrings',
                  'shoulders',
                  'biceps',
                  'triceps',
                  'calves',
                ].map((muscle) => (
                  <button
                    key={muscle}
                    type="button"
                    className={`${styles.chip} ${
                      selectedMuscleFilter === muscle ? styles.chipActive : ''
                    }`}
                    onClick={() => setSelectedMuscleFilter(muscle)}
                  >
                    {muscle.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.pickerList}>
              {filteredExercises.map((ex) => (
                <div
                  key={ex.id}
                  className={styles.pickerItem}
                  onClick={() => handleSelectExerciseFromPicker(ex)}
                >
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 'var(--font-sm)' }}>
                      {ex.name}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      {ex.category} · {ex.primaryMuscles.join(', ')}
                    </div>
                  </div>
                  <span className="badge badge-cyan">SFR {ex.sfrTier}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Persistent Rest Timer */}
      <RestTimer
        targetTimestamp={restTarget}
        totalDuration={restDuration}
        onFinish={() => setRestTarget(null)}
        onAdjust={handleAdjustTimer}
      />

      {/* Custom Tactile Numpad */}
      <Numpad
        isOpen={numpadConfig.isOpen}
        mode={numpadConfig.mode}
        initialValue={numpadConfig.initialValue}
        unit={numpadConfig.unit}
        onConfirm={numpadConfig.callback}
        onClose={() => setNumpadConfig((prev) => ({ ...prev, isOpen: false }))}
      />

      {/* Scientific Form Guide Modal */}
      <ExerciseModal
        exercise={modalExercise}
        onClose={() => setModalExercise(null)}
      />
    </div>
  );
};
