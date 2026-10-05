'use client';

import React from 'react';
import { getExerciseById } from '../data/exercises';
import { getSmartAlternatives } from '../lib/exerciseSwapper';
import type { ExerciseGuide } from '@nextset/shared';
import { ArrowLeftRight, X, BookOpen, Check } from 'lucide-react';
import styles from './ExerciseSwapModal.module.css';

interface ExerciseSwapModalProps {
  isOpen: boolean;
  currentExerciseId: string | null;
  onClose: () => void;
  onConfirmSwap: (newExercise: ExerciseGuide) => void;
  onViewGuide?: (exercise: ExerciseGuide) => void;
}

export const ExerciseSwapModal: React.FC<ExerciseSwapModalProps> = ({
  isOpen,
  currentExerciseId,
  onClose,
  onConfirmSwap,
  onViewGuide,
}) => {
  if (!isOpen || !currentExerciseId) return null;

  const currentExercise = getExerciseById(currentExerciseId);
  const alternatives = getSmartAlternatives(currentExerciseId);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.titleArea}>
            <div className={styles.title}>
              <ArrowLeftRight size={20} color="var(--accent-amber)" />
              <span>Swap exercise</span>
            </div>
            <div className={styles.currentBadge}>
              Replacing <span className={styles.currentName}>{currentExercise?.name || currentExerciseId}</span>
            </div>
          </div>
          <button type="button" className={styles.closeBtn} onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className={styles.infoBanner}>
          Logged sets will be kept.
        </div>

        <div className={styles.list}>
          {alternatives.map(({ exercise, reason, equipmentDiff }, idx) => (
            <div key={exercise.id} className={styles.card}>
              <div className={styles.cardTop}>
                <div>
                  <div className={styles.cardName}>{exercise.name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    {exercise.equipment}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <span className="badge badge-amber">{exercise.category}</span>
                  <span className="badge badge-muted">{exercise.equipment}</span>
                </div>
              </div>

              <div className={styles.cardReason}>
                {reason}
              </div>

              <div className={styles.cardFooter}>
                {onViewGuide && (
                  <button
                    type="button"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      fontSize: 'var(--font-xs)',
                      color: 'var(--text-muted)',
                    }}
                    onClick={() => onViewGuide(exercise)}
                  >
                    <BookOpen size={13} />
                    <span>View cues</span>
                  </button>
                )}

                <button
                  type="button"
                  className={styles.swapBtn}
                  onClick={() => {
                    onConfirmSwap(exercise);
                    onClose();
                  }}
                >
                  <Check size={14} />
                  <span>Switch</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
