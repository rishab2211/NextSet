'use client';

import React, { useState } from 'react';
import type { MuscleGroup } from '@kinetic/shared';
import styles from './MuscleMap.module.css';

interface MuscleMapProps {
  primaryMuscles?: MuscleGroup[];
  secondaryMuscles?: MuscleGroup[];
  selectedMuscle?: MuscleGroup | null;
  onSelectMuscle?: (muscle: MuscleGroup) => void;
  interactive?: boolean;
}

export const MuscleMap: React.FC<MuscleMapProps> = ({
  primaryMuscles = [],
  secondaryMuscles = [],
  selectedMuscle = null,
  onSelectMuscle,
  interactive = true,
}) => {
  const [view, setView] = useState<'front' | 'back'>('front');

  const isPrimary = (group: MuscleGroup) => primaryMuscles.includes(group);
  const isSecondary = (group: MuscleGroup) => secondaryMuscles.includes(group);
  const isSelected = (group: MuscleGroup) => selectedMuscle === group;

  const getMuscleClass = (group: MuscleGroup) => {
    const classes = [styles.musclePart];
    if (isPrimary(group)) classes.push(styles.primaryActive);
    else if (isSecondary(group)) classes.push(styles.secondaryActive);
    if (isSelected(group)) classes.push(styles.musclePartSelected);
    return classes.join(' ');
  };

  const handleMuscleClick = (group: MuscleGroup) => {
    if (interactive && onSelectMuscle) {
      onSelectMuscle(group);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.viewSelector}>
        <button
          type="button"
          className={`${styles.viewBtn} ${view === 'front' ? styles.viewBtnActive : ''}`}
          onClick={() => setView('front')}
        >
          Anterior (Front)
        </button>
        <button
          type="button"
          className={`${styles.viewBtn} ${view === 'back' ? styles.viewBtnActive : ''}`}
          onClick={() => setView('back')}
        >
          Posterior (Back)
        </button>
      </div>

      <div className={styles.svgWrapper}>
        {view === 'front' ? (
          <svg
            viewBox="0 0 200 320"
            className={styles.anatomySvg}
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Head & Neck Base */}
            <circle cx="100" cy="24" r="14" className={styles.baseBody} />
            <path d="M92 37 L108 37 L112 50 L88 50 Z" className={styles.baseBody} />

            {/* Left & Right Shoulders (Deltoids - Front) */}
            <path
              d="M72 52 C65 55 58 64 56 75 C62 76 70 70 74 62 Z"
              className={getMuscleClass('shoulders')}
              onClick={() => handleMuscleClick('shoulders')}
            >
              <title>Anterior Deltoid (Left)</title>
            </path>
            <path
              d="M128 52 C135 55 142 64 144 75 C138 76 130 70 126 62 Z"
              className={getMuscleClass('shoulders')}
              onClick={() => handleMuscleClick('shoulders')}
            >
              <title>Anterior Deltoid (Right)</title>
            </path>

            {/* Pectoralis Major (Chest) */}
            <path
              d="M76 54 C85 54 98 56 99 74 C86 78 74 74 72 64 Z"
              className={getMuscleClass('chest')}
              onClick={() => handleMuscleClick('chest')}
            >
              <title>Chest (Pectoralis Major Left)</title>
            </path>
            <path
              d="M124 54 C115 54 102 56 101 74 C114 78 126 74 128 64 Z"
              className={getMuscleClass('chest')}
              onClick={() => handleMuscleClick('chest')}
            >
              <title>Chest (Pectoralis Major Right)</title>
            </path>

            {/* Biceps */}
            <path
              d="M55 76 C52 86 50 100 54 108 C58 106 63 94 62 82 Z"
              className={getMuscleClass('biceps')}
              onClick={() => handleMuscleClick('biceps')}
            >
              <title>Biceps (Left)</title>
            </path>
            <path
              d="M145 76 C148 86 150 100 146 108 C142 106 137 94 138 82 Z"
              className={getMuscleClass('biceps')}
              onClick={() => handleMuscleClick('biceps')}
            >
              <title>Biceps (Right)</title>
            </path>

            {/* Forearms */}
            <path
              d="M52 110 C46 122 43 140 45 152 C48 152 54 135 56 120 Z"
              className={getMuscleClass('forearms')}
              onClick={() => handleMuscleClick('forearms')}
            >
              <title>Forearm (Left)</title>
            </path>
            <path
              d="M148 110 C154 122 157 140 155 152 C152 152 146 135 144 120 Z"
              className={getMuscleClass('forearms')}
              onClick={() => handleMuscleClick('forearms')}
            >
              <title>Forearm (Right)</title>
            </path>

            {/* Hands */}
            <circle cx="43" cy="160" r="6" className={styles.baseBody} />
            <circle cx="157" cy="160" r="6" className={styles.baseBody} />

            {/* Abdominals (Rectus Abdominis) */}
            <path
              d="M86 78 C98 78 100 78 114 78 C112 120 108 126 100 134 C92 126 88 120 86 78 Z"
              className={getMuscleClass('abs')}
              onClick={() => handleMuscleClick('abs')}
            >
              <title>Abdominals (Core)</title>
            </path>

            {/* Quadriceps */}
            <path
              d="M74 138 C80 135 96 135 98 150 C96 182 88 208 84 216 C76 200 70 168 74 138 Z"
              className={getMuscleClass('quadriceps')}
              onClick={() => handleMuscleClick('quadriceps')}
            >
              <title>Quadriceps (Left)</title>
            </path>
            <path
              d="M126 138 C120 135 104 135 102 150 C104 182 112 208 116 216 C124 200 130 168 126 138 Z"
              className={getMuscleClass('quadriceps')}
              onClick={() => handleMuscleClick('quadriceps')}
            >
              <title>Quadriceps (Right)</title>
            </path>

            {/* Knees */}
            <circle cx="82" cy="222" r="5" className={styles.baseBody} />
            <circle cx="118" cy="222" r="5" className={styles.baseBody} />

            {/* Calves (Anterior / Tibialis) */}
            <path
              d="M80 230 C86 240 86 265 82 284 C76 270 74 250 80 230 Z"
              className={getMuscleClass('calves')}
              onClick={() => handleMuscleClick('calves')}
            >
              <title>Calves (Left)</title>
            </path>
            <path
              d="M120 230 C114 240 114 265 118 284 C124 270 126 250 120 230 Z"
              className={getMuscleClass('calves')}
              onClick={() => handleMuscleClick('calves')}
            >
              <title>Calves (Right)</title>
            </path>

            {/* Feet */}
            <path d="M78 288 L85 288 L90 298 L75 298 Z" className={styles.baseBody} />
            <path d="M122 288 L115 288 L110 298 L125 298 Z" className={styles.baseBody} />
          </svg>
        ) : (
          <svg
            viewBox="0 0 200 320"
            className={styles.anatomySvg}
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Back Head & Neck */}
            <circle cx="100" cy="24" r="14" className={styles.baseBody} />

            {/* Traps */}
            <path
              d="M90 38 L110 38 L124 54 L100 70 L76 54 Z"
              className={getMuscleClass('traps')}
              onClick={() => handleMuscleClick('traps')}
            >
              <title>Trapezius</title>
            </path>

            {/* Upper Back / Rhomboids */}
            <path
              d="M80 56 L120 56 L116 80 L84 80 Z"
              className={getMuscleClass('upper_back')}
              onClick={() => handleMuscleClick('upper_back')}
            >
              <title>Upper Back (Rhomboids & Teres)</title>
            </path>

            {/* Latissimus Dorsi (Lats) */}
            <path
              d="M74 72 C68 84 66 104 84 114 C82 96 82 82 82 74 Z"
              className={getMuscleClass('lats')}
              onClick={() => handleMuscleClick('lats')}
            >
              <title>Lats (Left)</title>
            </path>
            <path
              d="M126 72 C132 84 134 104 116 114 C118 96 118 82 118 74 Z"
              className={getMuscleClass('lats')}
              onClick={() => handleMuscleClick('lats')}
            >
              <title>Lats (Right)</title>
            </path>

            {/* Triceps */}
            <path
              d="M58 66 C53 78 52 94 56 106 C60 102 65 88 64 74 Z"
              className={getMuscleClass('triceps')}
              onClick={() => handleMuscleClick('triceps')}
            >
              <title>Triceps (Left)</title>
            </path>
            <path
              d="M142 66 C147 78 148 94 144 106 C140 102 135 88 136 74 Z"
              className={getMuscleClass('triceps')}
              onClick={() => handleMuscleClick('triceps')}
            >
              <title>Triceps (Right)</title>
            </path>

            {/* Lower Back (Erectors) */}
            <path
              d="M88 84 L112 84 L110 120 L90 120 Z"
              className={getMuscleClass('lower_back')}
              onClick={() => handleMuscleClick('lower_back')}
            >
              <title>Lower Back (Spinal Erectors)</title>
            </path>

            {/* Glutes */}
            <path
              d="M72 122 C82 120 98 120 99 144 C88 148 74 146 72 134 Z"
              className={getMuscleClass('glutes')}
              onClick={() => handleMuscleClick('glutes')}
            >
              <title>Gluteus Maximus (Left)</title>
            </path>
            <path
              d="M128 122 C118 120 102 120 101 144 C112 148 126 146 128 134 Z"
              className={getMuscleClass('glutes')}
              onClick={() => handleMuscleClick('glutes')}
            >
              <title>Gluteus Maximus (Right)</title>
            </path>

            {/* Hamstrings */}
            <path
              d="M74 146 C80 148 96 148 96 174 C94 196 86 214 82 216 C76 198 72 174 74 146 Z"
              className={getMuscleClass('hamstrings')}
              onClick={() => handleMuscleClick('hamstrings')}
            >
              <title>Hamstrings (Left)</title>
            </path>
            <path
              d="M126 146 C120 148 104 148 104 174 C106 196 114 214 118 216 C124 198 128 174 126 146 Z"
              className={getMuscleClass('hamstrings')}
              onClick={() => handleMuscleClick('hamstrings')}
            >
              <title>Hamstrings (Right)</title>
            </path>

            {/* Calves (Gastrocnemius & Soleus) */}
            <path
              d="M78 230 C88 238 88 266 82 284 C74 270 72 250 78 230 Z"
              className={getMuscleClass('calves')}
              onClick={() => handleMuscleClick('calves')}
            >
              <title>Calves (Left)</title>
            </path>
            <path
              d="M122 230 C112 238 112 266 118 284 C126 270 128 250 122 230 Z"
              className={getMuscleClass('calves')}
              onClick={() => handleMuscleClick('calves')}
            >
              <title>Calves (Right)</title>
            </path>

            {/* Feet */}
            <path d="M78 288 L85 288 L85 298 L75 298 Z" className={styles.baseBody} />
            <path d="M122 288 L115 288 L115 298 L125 298 Z" className={styles.baseBody} />
          </svg>
        )}
      </div>

      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <span className={styles.dotPrimary} />
          <span>Primary Target</span>
        </div>
        <div className={styles.legendItem}>
          <span className={styles.dotSecondary} />
          <span>Secondary / Stabilizer</span>
        </div>
      </div>

      {selectedMuscle && (
        <div className={styles.selectedBadge}>
          <span className="badge badge-cyan">Filtered: {selectedMuscle.replace('_', ' ')}</span>
        </div>
      )}
    </div>
  );
};
