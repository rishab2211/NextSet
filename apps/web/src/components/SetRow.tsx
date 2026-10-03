'use client';

import React from 'react';
import type { WorkoutSet, SetType } from '@kinetic/shared';
import type { NumpadMode } from './Numpad';
import { Check } from 'lucide-react';
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
    callback: (val: number) => void
  ) => void;
}

export const SetRow: React.FC<SetRowProps> = ({
  set,
  previousSet,
  onUpdate,
  onCompleteToggle,
  onOpenNumpad,
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

  return (
    <div className={`${styles.row} ${set.completed ? styles.rowCompleted : ''}`}>
      {/* Set Number / Type Toggle Button */}
      <button
        type="button"
        className={`${styles.setIndicator} ${
          set.set_type === 'warmup' ? styles.setTypeWarmup : set.set_type === 'drop' ? styles.setTypeDrop : ''
        }`}
        onClick={cycleSetType}
        title="Tap to change set type (Working / Warmup / Drop / Myorep)"
      >
        {getSetTypeBadge()}
      </button>

      {/* Previous Performance Ghost Text */}
      <div className={styles.prevPerf}>
        {formatPrev()}
      </div>

      {/* Weight Pill (Intercepted by Numpad) */}
      <div
        className={`${styles.valuePill} ${set.weight_value <= 0 ? styles.valuePillEmpty : ''}`}
        onClick={() => {
          onOpenNumpad('weight', set.weight_value, set.weight_unit, (val) => {
            onUpdate(set.id, { weight_value: val });
          });
        }}
      >
        <span>{set.weight_value > 0 ? set.weight_value : '—'}</span>
        <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{set.weight_unit}</span>
      </div>

      {/* Reps Pill (Intercepted by Numpad) */}
      <div
        className={`${styles.valuePill} ${set.reps <= 0 ? styles.valuePillEmpty : ''}`}
        onClick={() => {
          onOpenNumpad('reps', set.reps, 'reps', (val) => {
            onUpdate(set.id, { reps: Math.round(val) });
          });
        }}
      >
        <span>{set.reps > 0 ? set.reps : '—'}</span>
      </div>

      {/* Large Completion Button */}
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
