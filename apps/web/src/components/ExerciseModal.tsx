'use client';

import React from 'react';
import type { ExerciseGuide } from '@kinetic/shared';
import { MuscleMap } from './MuscleMap';
import { X, AlertTriangle, CheckCircle2, Dumbbell, Zap } from 'lucide-react';
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
  if (!exercise) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.titleArea}>
            <div className={styles.badges}>
              <span className="badge badge-cyan">{exercise.category}</span>
              <span className="badge badge-volt">SFR {exercise.sfrTier}-Tier</span>
            </div>
            <h2 className={styles.title}>{exercise.name}</h2>
          </div>
          <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className={styles.content}>
          {/* Quick Scientific Metrics */}
          <div className={styles.metricsGrid}>
            <div className={styles.metricCard}>
              <div className={styles.metricLabel}>Axial Fatigue</div>
              <div className={styles.metricValue}>{exercise.fatigueIndex} / 5</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricLabel}>Rep Range</div>
              <div className={styles.metricValue}>
                {exercise.recommendedRepRange.min} - {exercise.recommendedRepRange.max}
              </div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricLabel}>Equipment</div>
              <div className={styles.metricValue} style={{ fontSize: '11px', textTransform: 'capitalize' }}>
                {exercise.equipment.split(' ')[0]}
              </div>
            </div>
          </div>

          {/* Interactive Muscle Activation Map */}
          <div className={styles.anatomySection}>
            <div className={styles.sectionHeading}>
              <Zap size={16} color="var(--accent-cyan)" />
              Target Musculature & Activation
            </div>
            <MuscleMap
              primaryMuscles={exercise.primaryMuscles}
              secondaryMuscles={exercise.secondaryMuscles}
              interactive={false}
            />
          </div>

          {/* Setup Instructions */}
          <div className={styles.anatomySection}>
            <div className={styles.sectionHeading}>
              <Dumbbell size={16} color="var(--accent-cyan)" />
              Setup & Posture Checklist
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

          {/* Execution & Biomechanics */}
          <div className={styles.anatomySection}>
            <div className={styles.sectionHeading}>
              <CheckCircle2 size={16} color="var(--success)" />
              Execution & Tension Cues
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

          {/* Common Form Mistakes & Critical Fixes */}
          <div className={styles.anatomySection}>
            <div className={styles.sectionHeading}>
              <AlertTriangle size={16} color="var(--danger)" />
              Common Mistakes to Avoid
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
              <Dumbbell size={18} />
              {inActiveWorkout ? 'Add to Current Workout' : 'Start Workout with this Exercise'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
