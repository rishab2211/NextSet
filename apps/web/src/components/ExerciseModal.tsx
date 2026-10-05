'use client';

import React, { useState } from 'react';
import type { ExerciseGuide } from '@nextset/shared';
import { MuscleMap } from './MuscleMap';
import { X, AlertTriangle, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { DumbbellHorizontalIcon } from './HomeIcons';
import styles from './ExerciseModal.module.css';

interface ExerciseModalProps {
  exercise: ExerciseGuide | null;
  onClose: () => void;
  onAddToWorkout?: (exercise: ExerciseGuide) => void;
  inActiveWorkout?: boolean;
}

export const ExerciseModal: React.FC<ExerciseModalProps> = ({
  exercise,
  onClose,
  onAddToWorkout,
  inActiveWorkout = false,
}) => {
  const [showAnatomyMap, setShowAnatomyMap] = useState<boolean>(false);

  if (!exercise) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.titleArea}>
            <div className={styles.badges}>
              <span className="badge badge-amber">{exercise.category}</span>
              <span style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)' }}>
                {exercise.primaryMuscles.join(', ')}
              </span>
            </div>
            <h2 className={styles.title}>{exercise.name}</h2>
          </div>
          <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className={styles.content}>
          {/* Practical Workout Guidance */}
          <div className={styles.metricsGrid}>
            <div className={styles.metricCard}>
              <div className={styles.metricLabel}>Rep Range</div>
              <div className={styles.metricValue}>
                {exercise.recommendedRepRange.min} - {exercise.recommendedRepRange.max} reps
              </div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricLabel}>Equipment</div>
              <div className={styles.metricValue} style={{ textTransform: 'capitalize' }}>
                {exercise.equipment.split('&')[0].trim()}
              </div>
            </div>
          </div>

          {/* Setup Instructions */}
          <div className={styles.anatomySection}>
            <div className={styles.sectionHeading}>
              <DumbbellHorizontalIcon size={16} color="var(--accent-primary)" />
              <span>Setup</span>
            </div>
            <ol className={styles.stepList}>
              {exercise.setupSteps.map((step, idx) => (
                <li key={idx} className={styles.stepItem}>
                  <span className={styles.stepNumber}>{idx + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Execution & Tension Cues */}
          <div className={styles.anatomySection}>
            <div className={styles.sectionHeading}>
              <Check size={16} color="var(--success)" />
              <span>Form & technique</span>
            </div>
            <ol className={styles.stepList}>
              {exercise.executionSteps.map((step, idx) => (
                <li key={idx} className={styles.stepItem} style={{ borderLeftColor: 'var(--success)' }}>
                  <span className={styles.stepNumber} style={{ color: 'var(--success)' }}>{idx + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Common Mistakes */}
          <div className={styles.anatomySection}>
            <div className={styles.sectionHeading}>
              <AlertTriangle size={16} color="var(--danger)" />
              <span>Common mistakes</span>
            </div>
            <div className={styles.stepList}>
              {exercise.commonMistakes.map((item, idx) => (
                <div key={idx} className={styles.mistakeCard}>
                  <div className={styles.mistakeText}>
                    <AlertTriangle size={14} />
                    <span>{item.mistake}</span>
                  </div>
                  <div className={styles.correctionText}>
                    <strong>Fix:</strong> {item.correction}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progressive Disclosure: Collapsible Anatomy Map */}
          <div className={styles.accordionContainer}>
            <button
              type="button"
              className={styles.accordionToggle}
              onClick={() => setShowAnatomyMap(!showAnatomyMap)}
            >
              <span>Muscles worked</span>
              {showAnatomyMap ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {showAnatomyMap && (
              <div style={{ paddingTop: 12 }}>
                <MuscleMap
                  primaryMuscles={exercise.primaryMuscles}
                  secondaryMuscles={exercise.secondaryMuscles}
                  interactive={false}
                />
              </div>
            )}
          </div>
        </div>

        {onAddToWorkout && (
          <div className={styles.ctaFooter}>
            <button
              type="button"
              className="btn-primary"
              style={{ width: '100%' }}
              onClick={() => {
                onAddToWorkout(exercise);
                onClose();
              }}
            >
              <DumbbellHorizontalIcon size={18} strokeWidth={2.2} />
              {inActiveWorkout ? 'Add to workout' : 'Start with this exercise'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
