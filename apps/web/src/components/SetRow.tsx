'use client';

import React from 'react';
import type { WorkoutSet, SetType } from '@kinetic/shared';
import type { NumpadMode } from './Numpad';
import { Check, Copy } from 'lucide-react';
import styles from './SetRow.module.css';

interface SetRowProps {
  set: WorkoutSet;
  previousSet?: WorkoutSet;
  onUpdate: (setId: string, changes: Partial<WorkoutSet>) => void;
  onCompleteToggle: (set: WorkoutSet) => void;
  onOpenNumpad: (
    mode: NumpadMode,
    initialValue: number,
    unit: string,
    callback: (val: number) => void,
    prevValue?: number
  ) => void;
  onOpenPlateCalculator?: (
    initialWeight: number,
    unit: any,
    callback: (val: number) => void
  ) => void;
  isPR?: boolean;
}

export const SetRow: React.FC<SetRowProps> = ({
  set,
  previousSet,
  onUpdate,
  onCompleteToggle,
  onOpenNumpad,
  onOpenPlateCalculator,
  isPR = false,
}) => {
  const cycleSetType = () => {
    const sequence: SetType[] = ['working', 'warmup', 'drop', 'myorep'];
    const nextIdx = (sequence.indexOf(set.set_type) + 1) % sequence.length;
    onUpdate(set.id, { set_type: sequence[nextIdx] });
  };

  const getSetTypeBadge = () => {
    switch (set.set_type) {
      case 'warmup':
        return 'W';
      case 'drop':
        return 'D';
      case 'myorep':
        return 'M';
      default:
        return set.set_number.toString();
    }
  };

  const formatPrev = () => {
    if (!previousSet) return '—';
    return `${previousSet.weight_value}${previousSet.weight_unit} × ${previousSet.reps}`;
  };

  const handleCopyPrevious = () => {
    if (!previousSet) return;
    onUpdate(set.id, {
      weight_value: previousSet.weight_value,
      weight_unit: previousSet.weight_unit,
      reps: previousSet.reps,
    });
  };

  const handleAdjustWeight = (delta: number) => {
    const base = set.weight_value > 0 ? set.weight_value : (previousSet ? previousSet.weight_value : 0);
    const next = Math.max(0, Number((base + delta).toFixed(2)));
    onUpdate(set.id, { weight_value: next });
  };

  return (
    <div className={`${styles.row} ${set.completed ? styles.rowCompleted : ''}`}>
      {/* Set Number / Type Toggle Button */}
      <button
        type="button"
        className={`${styles.setIndicator} ${
          set.set_type === 'warmup' ? styles.setTypeWarmup : set.set_type === 'drop' ? styles.setTypeDrop : ''
        }`}
        onClick={cycleSetType}
        title="Tap to cycle set type (Working / Warmup / Drop / Myorep)"
      >
        {isPR && <span className={styles.prBadge}>PR</span>}
        {getSetTypeBadge()}
      </button>

      {/* Previous Performance Ghost Cell with 1-Tap Copy */}
      <div
        className={`${styles.prevPerf} ${previousSet && set.weight_value <= 0 ? styles.prevPerfActionable : ''}`}
        onClick={previousSet ? handleCopyPrevious : undefined}
        title={previousSet ? 'Tap to copy previous workout performance' : undefined}
      >
        <span>{formatPrev()}</span>
        {previousSet && set.weight_value <= 0 && (
          <span className={styles.copyBadge}>
            <Copy size={10} />
          </span>
        )}
      </div>

      {/* Weight Pill (Intercepted by Numpad, with quick-steppers) */}
      <div className={styles.weightCellGroup}>
        <div
          className={`${styles.valuePill} ${set.weight_value <= 0 ? styles.valuePillEmpty : ''}`}
          onClick={() => {
            onOpenNumpad(
              'weight',
              set.weight_value,
              set.weight_unit,
              (val) => {
                onUpdate(set.id, { weight_value: val });
              },
              previousSet?.weight_value
            );
          }}
          title="Tap to edit weight"
        >
          <span>{set.weight_value > 0 ? set.weight_value : '—'}</span>
          <span className={styles.unitText}>{set.weight_unit}</span>
        </div>
      </div>

      {/* Reps Pill (Intercepted by Numpad) */}
      <div
        className={`${styles.valuePill} ${set.reps <= 0 ? styles.valuePillEmpty : ''}`}
        onClick={() => {
          onOpenNumpad(
            'reps',
            set.reps,
            'reps',
            (val) => {
              onUpdate(set.id, { reps: Math.round(val) });
            },
            previousSet?.reps
          );
        }}
        title="Tap to edit reps"
      >
        <span>{set.reps > 0 ? set.reps : '—'}</span>
      </div>

      {/* Completion Button */}
      <button
        type="button"
        className={`${styles.checkBtn} ${set.completed ? styles.checkBtnCompleted : ''}`}
        onClick={() => onCompleteToggle(set)}
        aria-label={set.completed ? 'Mark set incomplete' : 'Mark set complete'}
      >
        <Check size={20} strokeWidth={set.completed ? 3 : 2} />
      </button>
    </div>
  );
};
