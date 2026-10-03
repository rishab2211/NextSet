'use client';

import React from 'react';
import type { WeightUnit } from '@kinetic/shared';
import { getStrengthCurves } from '../lib/strengthMath';
import { Trophy, X, Zap } from 'lucide-react';
import styles from './StrengthCurveModal.module.css';

interface StrengthCurveModalProps {
  isOpen: boolean;
  exerciseName: string;
  topWeight: number;
  topReps: number;
  unit?: WeightUnit;
  onClose: () => void;
  onApplyWeight?: (weight: number) => void;
}

export const StrengthCurveModal: React.FC<StrengthCurveModalProps> = ({
  isOpen,
  exerciseName,
  topWeight,
  topReps,
  unit = 'kg',
  onClose,
  onApplyWeight,
}) => {
  if (!isOpen) return null;

  const validWeight = topWeight > 0 ? topWeight : 60;
  const validReps = topReps > 0 ? topReps : 8;

  const breakdown = getStrengthCurves(validWeight, validReps);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.titleArea}>
            <div className={styles.title}>
              <Trophy size={20} color="var(--accent-amber)" />
              <span>1RM & Strength Zones</span>
            </div>
            <div className={styles.subtitle}>{exerciseName}</div>
          </div>
          <button type="button" className={styles.closeBtn} onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Hero Estimated 1RM Banner */}
        <div className={styles.heroBanner}>
          <div className={styles.heroLabel}>Estimated One-Rep Max</div>
          <div className={styles.heroValue}>
            <span>{breakdown.estimated1RM}</span>
            <span className={styles.heroUnit}>{unit}</span>
          </div>
          <div className={styles.heroBasis}>
            Calculated from baseline of {validWeight} {unit} × {validReps} reps
          </div>
        </div>

        {/* Scientific Warmup Tip */}
        <div className={styles.warmupTip}>
          <strong>Hypertrophy Tip:</strong> Tap any row below to load that working weight directly into your current set. For strength sets (85%+), perform 2 progressive warmup ramps first.
        </div>

        {/* Percentage Breakdown Table */}
        <div className={styles.tableContainer}>
          <div className={styles.tableHeader}>
            <span>% 1RM</span>
            <span>Weight</span>
            <span>Target</span>
            <span>Adaptation Focus</span>
          </div>

          {breakdown.percentages.map((row) => (
            <div
              key={row.percentage}
              className={styles.tableRow}
              onClick={() => {
                if (onApplyWeight) {
                  onApplyWeight(row.weight);
                  onClose();
                }
              }}
              title="Tap to apply this weight to current set"
            >
              <span className={styles.pctBadge}>{row.percentage}%</span>
              <span className={styles.weightCell}>
                {row.weight} {unit}
              </span>
              <span className={styles.repsCell}>{row.reps} reps</span>
              <span className={styles.focusCell}>{row.focus}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
