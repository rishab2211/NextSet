'use client';

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import type { MuscleGroup } from '@kinetic/shared';
import type { IExerciseData, IMuscleStats, Muscle } from 'react-body-highlighter';
import styles from './MuscleMap.module.css';

// Client-only dynamic import to ensure seamless SVG hydration in Next.js static export
const Model = dynamic(() => import('react-body-highlighter'), {
  ssr: false,
  loading: () => (
    <div style={{ height: '340px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: 'var(--font-xs)' }}>
      Loading anatomical map...
    </div>
  ),
});

interface MuscleMapProps {
  primaryMuscles?: MuscleGroup[];
  secondaryMuscles?: MuscleGroup[];
  selectedMuscle?: MuscleGroup | null;
  onSelectMuscle?: (muscle: MuscleGroup) => void;
  interactive?: boolean;
}

// Maps Kinetic Domain MuscleGroup into react-body-highlighter detailed anatomical identifiers
function mapGroupToLibraryMuscles(group: MuscleGroup): Muscle[] {
  switch (group) {
    case 'chest':
      return ['chest' as Muscle];
    case 'shoulders':
      return ['front-deltoids' as Muscle, 'back-deltoids' as Muscle];
    case 'biceps':
      return ['biceps' as Muscle];
    case 'triceps':
      return ['triceps' as Muscle];
    case 'forearms':
      return ['forearm' as Muscle];
    case 'abs':
      return ['abs' as Muscle, 'obliques' as Muscle];
    case 'upper_back':
      return ['upper-back' as Muscle, 'trapezius' as Muscle];
    case 'lats':
      return ['upper-back' as Muscle];
    case 'lower_back':
      return ['lower-back' as Muscle];
    case 'traps':
      return ['trapezius' as Muscle];
    case 'quadriceps':
      return ['quadriceps' as Muscle, 'adductor' as Muscle, 'abductors' as Muscle];
    case 'hamstrings':
      return ['hamstring' as Muscle];
    case 'glutes':
      return ['gluteal' as Muscle];
    case 'calves':
      return ['calves' as Muscle, 'left-soleus' as Muscle, 'right-soleus' as Muscle];
    default:
      return [];
  }
}

// Reverse mapping when a user clicks on an anatomical polygon
function mapLibraryMuscleToGroup(muscle: string): MuscleGroup | null {
  const m = muscle.toLowerCase();
  if (m === 'chest') return 'chest';
  if (m.includes('deltoid')) return 'shoulders';
  if (m === 'biceps') return 'biceps';
  if (m === 'triceps') return 'triceps';
  if (m === 'forearm') return 'forearms';
  if (m === 'abs' || m === 'obliques') return 'abs';
  if (m === 'upper-back') return 'upper_back';
  if (m === 'trapezius') return 'traps';
  if (m === 'lower-back') return 'lower_back';
  if (m === 'quadriceps' || m === 'adductor' || m === 'abductors') return 'quadriceps';
  if (m === 'hamstring') return 'hamstrings';
  if (m === 'gluteal') return 'glutes';
  if (m === 'calves' || m.includes('soleus')) return 'calves';
  return null;
}

export const MuscleMap: React.FC<MuscleMapProps> = ({
  primaryMuscles = [],
  secondaryMuscles = [],
  selectedMuscle = null,
  onSelectMuscle,
  interactive = true,
}) => {
  const [view, setView] = useState<'anterior' | 'posterior'>('anterior');

  // Build structured data array with frequencies:
  // Frequency 1 -> Secondary/Stabilizer (#ccff00 Volt)
  // Frequency 2 -> Primary Target (#00f0ff Neon Cyan)
  const exerciseData: IExerciseData[] = useMemo(() => {
    const list: IExerciseData[] = [];

    // If an individual muscle is selected via filter, highlight it as primary
    if (selectedMuscle) {
      const muscles = mapGroupToLibraryMuscles(selectedMuscle);
      list.push({
        name: 'Selected Filter',
        muscles,
        frequency: 2,
      });
      return list;
    }

    // Secondary / Stabilizer muscles (Frequency 1)
    for (const sec of secondaryMuscles) {
      const muscles = mapGroupToLibraryMuscles(sec);
      if (muscles.length > 0) {
        list.push({
          name: 'Secondary Activation',
          muscles,
          frequency: 1,
        });
      }
    }

    // Primary muscles (Frequency 2)
    for (const prim of primaryMuscles) {
      const muscles = mapGroupToLibraryMuscles(prim);
      if (muscles.length > 0) {
        list.push({
          name: 'Primary Target',
          muscles,
          frequency: 2,
        });
      }
    }

    return list;
  }, [primaryMuscles, secondaryMuscles, selectedMuscle]);

  const handleMuscleClick = (stats: any) => {
    if (!interactive || !onSelectMuscle) return;
    const clickedMuscle = stats?.muscle;
    if (clickedMuscle) {
      const domainGroup = mapLibraryMuscleToGroup(clickedMuscle);
      if (domainGroup) {
        onSelectMuscle(domainGroup);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.viewSelector}>
        <button
          type="button"
          className={`${styles.viewBtn} ${view === 'anterior' ? styles.viewBtnActive : ''}`}
          onClick={() => setView('anterior')}
        >
          Anterior (Front)
        </button>
        <button
          type="button"
          className={`${styles.viewBtn} ${view === 'posterior' ? styles.viewBtnActive : ''}`}
          onClick={() => setView('posterior')}
        >
          Posterior (Back)
        </button>
      </div>

      <div className={styles.modelWrapper}>
        <Model
          type={view}
          data={exerciseData}
          bodyColor="#1a2230"
          highlightedColors={['#ccff00', '#00f0ff']} // [index 0 = freq 1 (volt), index 1 = freq 2 (cyan)]
          onClick={handleMuscleClick}
          style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center' }}
          svgStyle={{ width: '100%', height: '100%', maxHeight: '340px' }}
        />
      </div>

      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <span className={styles.dotPrimary} />
          <span>Primary Target (Cyan)</span>
        </div>
        <div className={styles.legendItem}>
          <span className={styles.dotSecondary} />
          <span>Secondary / Stabilizer (Volt)</span>
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
