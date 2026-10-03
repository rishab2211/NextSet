'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../lib/db';
import {
  finishWorkoutSession,
  abandonWorkoutSession,
  addWorkoutSet,
  updateWorkoutSet,
  deleteWorkoutSet,
  swapExerciseInSession,
} from '../lib/db/workoutStore';
import { EXERCISES, getExerciseById } from '../data/exercises';
import type { WorkoutSession, WorkoutSet, ExerciseGuide } from '@kinetic/shared';
import { SetRow } from './SetRow';
import { Numpad, type NumpadMode } from './Numpad';
import { RestTimer } from './RestTimer';
import { ExerciseModal } from './ExerciseModal';
import { PlateCalculatorModal } from './PlateCalculatorModal';
import { StrengthCurveModal } from './StrengthCurveModal';
import { ExerciseSwapModal } from './ExerciseSwapModal';
import { checkPersonalRecord } from '../lib/strengthMath';
import { getWorkoutPreferences } from '../lib/themeStore';
import { getUnitPreference } from '../lib/auth/authStore';
import {
  Check,
  Plus,
  BookOpen,
  Clock,
  Trash2,
  X,
  Search,
  Dumbbell,
  Disc,
  Trophy,
  ArrowLeftRight,
  MoreVertical,
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

  // Historical completed sets for real-time PR detection and Ghost Logging
  const allHistoricalSets = useLiveQuery(
    () =>
      db.workoutSets
        .filter((s) => s.completed && !s.deleted && s.session_id !== session.id)
        .toArray(),
    [session.id]
  ) || [];

  // Map of exercise ID to previous completed session's sets
  const previousSessionSetsByExercise = useMemo(() => {
    const result: Record<string, WorkoutSet[]> = {};

    // Group by exercise
    const byExercise: Record<string, WorkoutSet[]> = {};
    for (const s of allHistoricalSets) {
      if (!byExercise[s.exercise_id]) byExercise[s.exercise_id] = [];
      byExercise[s.exercise_id].push(s);
    }

    for (const [exId, exSets] of Object.entries(byExercise)) {
      // Sort sets descending by completed/created time to find latest prior session
      const sorted = [...exSets].sort(
        (a, b) =>
          new Date(b.completed_at || b.created_at).getTime() -
          new Date(a.completed_at || a.created_at).getTime()
      );
      if (sorted.length > 0) {
        const latestSessionId = sorted[0].session_id;
        result[exId] = sorted
          .filter((s) => s.session_id === latestSessionId)
          .sort((a, b) => a.set_number - b.set_number);
      }
    }

    return result;
  }, [allHistoricalSets]);

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
  const [restDuration, setRestDuration] = useState<number>(() => getWorkoutPreferences().defaultRestSeconds);

  const startRestTimer = (seconds?: number) => {
    const dur = seconds ?? getWorkoutPreferences().defaultRestSeconds;
    setRestDuration(dur);
    setRestTarget(Date.now() + dur * 1000);
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
    prevValue?: number;
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
    callback: (val: number) => void,
    prevValue?: number
  ) => {
    setNumpadConfig({
      isOpen: true,
      mode,
      initialValue,
      prevValue,
      unit,
      callback,
    });
  };

  // 5. Plate Calculator State
  const [plateCalcConfig, setPlateCalcConfig] = useState<{
    isOpen: boolean;
    initialWeight: number;
    unit: any;
    callback: (val: number) => void;
  }>({
    isOpen: false,
    initialWeight: 20,
    unit: 'kg',
    callback: () => {},
  });

  const openPlateCalculator = (
    initialWeight: number,
    unit: any,
    callback: (val: number) => void
  ) => {
    setPlateCalcConfig({
      isOpen: true,
      initialWeight: initialWeight > 0 ? initialWeight : 20,
      unit: unit || 'kg',
      callback,
    });
  };

  // 6. Exercise Detail Modal State
  const [modalExercise, setModalExercise] = useState<ExerciseGuide | null>(null);

  // 7. 1RM & Strength Curves Modal State
  const [strengthModalConfig, setStrengthModalConfig] = useState<{
    isOpen: boolean;
    exerciseName: string;
    topWeight: number;
    topReps: number;
    unit: any;
    callback?: (weight: number) => void;
  }>({
    isOpen: false,
    exerciseName: '',
    topWeight: 60,
    topReps: 8,
    unit: 'kg',
  });

  // 8. Exercise Alternative Swapper Modal State
  const [swapModalExerciseId, setSwapModalExerciseId] = useState<string | null>(null);

  // 9. Exercise Picker Drawer State
  const [isPickerOpen, setIsPickerOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedMuscleFilter, setSelectedMuscleFilter] = useState<string>('all');

  // 10. Safe Discard Confirmation Dialog State
  const [isDiscardConfirmOpen, setIsDiscardConfirmOpen] = useState<boolean>(false);

  // 11. Active Exercise Overflow Dropdown Menu State
  const [activeMenuExerciseId, setActiveMenuExerciseId] = useState<string | null>(null);

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
      const prefs = getWorkoutPreferences();
      if (prefs.timerAutoStart) {
        startRestTimer(prefs.defaultRestSeconds);
      }
    }
  };

  const handleAddSetForExercise = async (exerciseId: string) => {
    const exerciseSets = setsByExercise[exerciseId] || [];
    const nextSetNumber = exerciseSets.length + 1;
    const lastSet = exerciseSets[exerciseSets.length - 1];

    const prevSets = previousSessionSetsByExercise[exerciseId] || [];
    const targetPrev = prevSets.find((p) => p.set_number === nextSetNumber) || prevSets[prevSets.length - 1];

    const initialWeight =
      lastSet && lastSet.weight_value > 0
        ? lastSet.weight_value
        : targetPrev && targetPrev.weight_value > 0
        ? targetPrev.weight_value
        : 0;

    const initialReps =
      lastSet && lastSet.reps > 0
        ? lastSet.reps
        : targetPrev && targetPrev.reps > 0
        ? targetPrev.reps
        : 10;

    const initialUnit = lastSet ? lastSet.weight_unit : targetPrev ? targetPrev.weight_unit : getUnitPreference();

    await addWorkoutSet({
      sessionId: session.id,
      exerciseId,
      setNumber: nextSetNumber,
      weightValue: initialWeight,
      weightUnit: initialUnit,
      reps: initialReps,
      setType: 'working',
    });
  };

  const handleSelectExerciseFromPicker = async (exercise: ExerciseGuide) => {
    setIsPickerOpen(false);

    // Prepopulate with previous performance if available
    const prevSets = previousSessionSetsByExercise[exercise.id] || [];
    const firstPrev = prevSets[0];

    await addWorkoutSet({
      sessionId: session.id,
      exerciseId: exercise.id,
      setNumber: 1,
      weightValue: firstPrev ? firstPrev.weight_value : 0,
      weightUnit: firstPrev ? firstPrev.weight_unit : getUnitPreference(),
      reps: firstPrev ? firstPrev.reps : exercise.recommendedRepRange.min || 8,
      setType: 'working',
    });
  };

  const handleRemoveExerciseFromWorkout = async (exerciseId: string) => {
    const exerciseSets = setsByExercise[exerciseId] || [];
    for (const s of exerciseSets) {
      await deleteWorkoutSet(s.id);
    }
    setActiveMenuExerciseId(null);
  };

  const handleFinish = async () => {
    await finishWorkoutSession(session.id);
    onFinishWorkout();
  };

  const handleConfirmDiscard = async () => {
    await abandonWorkoutSession(session.id);
    setIsDiscardConfirmOpen(false);
    onFinishWorkout();
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
            <Dumbbell size={20} color="var(--accent-primary)" />
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
            onClick={() => setIsDiscardConfirmOpen(true)}
            title="Discard Workout Session"
          >
            <Trash2 size={18} />
          </button>
          <button
            type="button"
            className={styles.finishBtn}
            onClick={handleFinish}
          >
            <Check size={16} strokeWidth={2.5} />
            <span>Finish</span>
          </button>
        </div>
      </div>

      {/* Exercises List */}
      {exerciseIdsInWorkout.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '50px 20px',
            color: 'var(--text-secondary)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <Dumbbell size={48} color="var(--border-strong)" />
          <h3 style={{ color: 'var(--text-primary)', fontSize: 'var(--font-lg)' }}>Workout is Empty</h3>
          <p style={{ fontSize: 'var(--font-sm)', color: 'var(--text-muted)' }}>
            Add your first exercise below to begin logging sets with instant numerical entries.
          </p>
        </div>
      ) : (
        exerciseIdsInWorkout.map((exId) => {
          const exercise = getExerciseById(exId);
          const exerciseSets = setsByExercise[exId] || [];
          const prevSets = previousSessionSetsByExercise[exId] || [];

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

                <div className={styles.headerActions}>
                  {exercise && (
                    <button
                      type="button"
                      className={styles.guideBtn}
                      onClick={() => setModalExercise(exercise)}
                      title="View setup cues and common mistakes"
                    >
                      <BookOpen size={13} />
                      <span>Cues</span>
                    </button>
                  )}

                  <button
                    type="button"
                    className={styles.menuBtn}
                    onClick={() =>
                      setActiveMenuExerciseId(activeMenuExerciseId === exId ? null : exId)
                    }
                    title="Exercise options"
                  >
                    <MoreVertical size={16} />
                  </button>

                  {/* Contextual Options Dropdown */}
                  {activeMenuExerciseId === exId && (
                    <div className={styles.exerciseMenuDropdown}>
                      <button
                        type="button"
                        className={styles.menuItem}
                        onClick={() => {
                          setSwapModalExerciseId(exId);
                          setActiveMenuExerciseId(null);
                        }}
                      >
                        <ArrowLeftRight size={14} color="var(--accent-primary)" />
                        <span>Swap (Equipment Busy)</span>
                      </button>

                      {exercise?.category === 'barbell' && (
                        <button
                          type="button"
                          className={styles.menuItem}
                          onClick={() => {
                            const firstSet = exerciseSets[0];
                            setActiveMenuExerciseId(null);
                            openPlateCalculator(
                              firstSet ? firstSet.weight_value : 20,
                              firstSet ? firstSet.weight_unit : 'kg',
                              (val) => {
                                if (firstSet) {
                                  updateWorkoutSet(firstSet.id, { weight_value: val });
                                }
                              }
                            );
                          }}
                        >
                          <Disc size={14} color="var(--accent-volt)" />
                          <span>Plate Calculator</span>
                        </button>
                      )}

                      <button
                        type="button"
                        className={styles.menuItem}
                        onClick={() => {
                          const topSet = [...exerciseSets].sort((a, b) => b.weight_value - a.weight_value)[0];
                          const firstSet = exerciseSets[0];
                          setActiveMenuExerciseId(null);
                          setStrengthModalConfig({
                            isOpen: true,
                            exerciseName: exercise ? exercise.name : exId,
                            topWeight: topSet ? topSet.weight_value : 60,
                            topReps: topSet ? topSet.reps : 8,
                            unit: topSet ? topSet.weight_unit : 'kg',
                            callback: (appliedWeight) => {
                              if (firstSet) {
                                updateWorkoutSet(firstSet.id, { weight_value: appliedWeight });
                              }
                            },
                          });
                        }}
                      >
                        <Trophy size={14} color="var(--accent-amber)" />
                        <span>1RM & Strength Zones</span>
                      </button>

                      <button
                        type="button"
                        className={`${styles.menuItem} ${styles.menuItemDanger}`}
                        onClick={() => handleRemoveExerciseFromWorkout(exId)}
                      >
                        <Trash2 size={14} />
                        <span>Remove Exercise</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Table Column Headers */}
              <div className={styles.setTableHeader}>
                <span>SET</span>
                <span>PREV</span>
                <span>WEIGHT</span>
                <span>REPS</span>
                <span>DONE</span>
              </div>

              {/* Set Rows with Ghost of Past Self passed explicitly */}
              <div className={styles.setTableList}>
                {exerciseSets.map((st, idx) => {
                  const exHistoricalSets = allHistoricalSets.filter(
                    (h) => h.exercise_id === st.exercise_id
                  );
                  const prResult = checkPersonalRecord(st, exHistoricalSets);

                  // Match previous set by set number or sequential index
                  const matchingPrev =
                    prevSets.find((p) => p.set_number === st.set_number) || prevSets[idx];

                  return (
                    <SetRow
                      key={st.id}
                      set={st}
                      previousSet={matchingPrev}
                      onUpdate={(id, updates) => updateWorkoutSet(id, updates)}
                      onCompleteToggle={handleToggleComplete}
                      onOpenNumpad={openNumpad}
                      onOpenPlateCalculator={openPlateCalculator}
                      isPR={prResult.isPR}
                    />
                  );
                })}
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
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Safe Discard Confirmation Dialog */}
      {isDiscardConfirmOpen && (
        <div className={styles.confirmOverlay} onClick={() => setIsDiscardConfirmOpen(false)}>
          <div className={styles.confirmCard} onClick={(e) => e.stopPropagation()}>
            <div className={styles.confirmTitle}>Discard Workout?</div>
            <div className={styles.confirmDesc}>
              Are you sure you want to discard this workout? All sets and progress logged during this session will be discarded.
            </div>
            <div className={styles.confirmActions}>
              <button
                type="button"
                className={styles.confirmKeepBtn}
                onClick={() => setIsDiscardConfirmOpen(false)}
              >
                Keep Workout
              </button>
              <button
                type="button"
                className={styles.confirmDiscardBtn}
                onClick={handleConfirmDiscard}
              >
                Discard
              </button>
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
        prevValue={numpadConfig.prevValue}
        unit={numpadConfig.unit}
        onConfirm={numpadConfig.callback}
        onClose={() => setNumpadConfig((prev) => ({ ...prev, isOpen: false }))}
        onOpenPlateCalculator={(val) => {
          openPlateCalculator(val, numpadConfig.unit || 'kg', numpadConfig.callback);
        }}
      />

      {/* Barbell Plate Calculator Modal */}
      <PlateCalculatorModal
        isOpen={plateCalcConfig.isOpen}
        initialWeight={plateCalcConfig.initialWeight}
        unit={plateCalcConfig.unit}
        onClose={() => setPlateCalcConfig((prev) => ({ ...prev, isOpen: false }))}
        onApplyWeight={plateCalcConfig.callback}
      />

      {/* Form Guide Modal */}
      <ExerciseModal
        exercise={modalExercise}
        onClose={() => setModalExercise(null)}
      />

      {/* 1RM & Percentage Strength Curves Modal */}
      <StrengthCurveModal
        isOpen={strengthModalConfig.isOpen}
        exerciseName={strengthModalConfig.exerciseName}
        topWeight={strengthModalConfig.topWeight}
        topReps={strengthModalConfig.topReps}
        unit={strengthModalConfig.unit}
        onClose={() => setStrengthModalConfig((prev) => ({ ...prev, isOpen: false }))}
        onApplyWeight={strengthModalConfig.callback}
      />

      {/* Equipment Busy Alternative Swapper Modal */}
      <ExerciseSwapModal
        isOpen={Boolean(swapModalExerciseId)}
        currentExerciseId={swapModalExerciseId}
        onClose={() => setSwapModalExerciseId(null)}
        onConfirmSwap={async (newExercise) => {
          if (!swapModalExerciseId) return;
          await swapExerciseInSession(session.id, swapModalExerciseId, newExercise.id);
          setSwapModalExerciseId(null);
        }}
        onViewGuide={(ex) => setModalExercise(ex)}
      />
    </div>
  );
};
