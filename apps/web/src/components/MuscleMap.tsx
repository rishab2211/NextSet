'use client';

import React, { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import type { MuscleGroup } from '@nextset/shared';
import type { IExerciseData, Muscle } from 'react-body-highlighter';
import { X } from 'lucide-react';
import { getAccentColor, getSurfaceTheme, ACCENT_PRESETS } from '../lib/themeStore';
import styles from './MuscleMap.module.css';

// Client-only dynamic import to ensure seamless SVG hydration in Next.js static export
const Model = dynamic(() => import('react-body-highlighter'), {
  ssr: false,
  loading: () => (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingSpinner} />
      <span>Loading anatomical model...</span>
    </div>
  ),
});

interface MuscleMapProps {
  primaryMuscles?: MuscleGroup[];
  secondaryMuscles?: MuscleGroup[];
  selectedMuscle?: MuscleGroup | null;
  onSelectMuscle?: (muscle: MuscleGroup) => void;
  onClearMuscle?: () => void;
  interactive?: boolean;
}

// Maps Kinetic/NextSet Domain MuscleGroup into react-body-highlighter detailed anatomical identifiers
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
  if (m === 'upper-back') return 'lats';
  if (m === 'trapezius' || m === 'neck') return 'traps';
  if (m === 'lower-back') return 'lower_back';
  if (m === 'quadriceps' || m === 'adductor' || m === 'abductors') return 'quadriceps';
  if (m === 'hamstring') return 'hamstrings';
  if (m === 'gluteal') return 'glutes';
  if (m === 'calves' || m.includes('soleus')) return 'calves';
  return null;
}

export const getMuscleDisplayName = (group: MuscleGroup): string => {
  switch (group) {
    case 'upper_back':
      return 'Upper Back';
    case 'lower_back':
      return 'Lower Back';
    case 'lats':
      return 'Back / Lats';
    case 'quadriceps':
      return 'Quadriceps (Quads)';
    case 'hamstrings':
      return 'Hamstrings';
    case 'glutes':
      return 'Glutes';
    case 'shoulders':
      return 'Shoulders';
    case 'biceps':
      return 'Biceps';
    case 'triceps':
      return 'Triceps';
    case 'forearms':
      return 'Forearms';
    case 'calves':
      return 'Calves';
    case 'abs':
      return 'Core / Abs';
    case 'traps':
      return 'Traps';
    case 'chest':
      return 'Chest';
    default:
      return group;
  }
};

const MuscleMapComponent: React.FC<MuscleMapProps> = ({
  primaryMuscles = [],
  secondaryMuscles = [],
  selectedMuscle = null,
  onSelectMuscle,
  onClearMuscle,
  interactive = true,
}) => {
  const [view, setView] = useState<'anterior' | 'posterior'>('anterior');
  const [accentHex, setAccentHex] = useState<string>('#a78bfa');
  const [bodyColor, setBodyColor] = useState<string>('#192033');

  // Sync with active theme surface & accent color
  useEffect(() => {
    const updateColors = () => {
      const acc = getAccentColor();
      const preset = ACCENT_PRESETS.find((p) => p.id === acc);
      if (preset) setAccentHex(preset.hex);

      const surface = getSurfaceTheme();
      if (surface === 'pastel-cream') {
        setBodyColor('#cbd5e1');
      } else {
        setBodyColor('#192033');
      }
    };

    updateColors();
    window.addEventListener('nextset_theme_change', updateColors);
    window.addEventListener('kinetic_theme_change', updateColors);
    return () => {
      window.removeEventListener('nextset_theme_change', updateColors);
      window.removeEventListener('kinetic_theme_change', updateColors);
    };
  }, []);

  // Auto-switch view when selected muscle is primarily anterior or posterior
  useEffect(() => {
    if (!selectedMuscle) return;
    const posteriorList: MuscleGroup[] = ['lats', 'upper_back', 'lower_back', 'hamstrings', 'glutes', 'traps', 'triceps'];
    if (posteriorList.includes(selectedMuscle)) {
      setView('posterior');
    } else if (['chest', 'abs', 'biceps', 'quadriceps'].includes(selectedMuscle)) {
      setView('anterior');
    }
  }, [selectedMuscle]);

  // Build structured data array with frequencies:
  // Frequency 1 -> Secondary/Stabilizer (#10b981 Emerald)
  // Frequency 2 -> Primary Target / Selected Filter (Active Accent Hex)
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
      {/* Top Header / View Selector */}
      <div className={styles.topRow}>
        <div className={styles.labelArea}>
          <span className={styles.mapTitle}>Muscle Anatomy</span>
          <span className={styles.mapHint}>
            {interactive ? 'Tap any muscle to isolate exercises' : 'Targeted muscles'}
          </span>
        </div>

        <div className={styles.viewSelector}>
          <button
            type="button"
            className={`${styles.viewBtn} ${view === 'anterior' ? styles.viewBtnActive : ''}`}
            onClick={() => setView('anterior')}
          >
            Front
          </button>
          <button
            type="button"
            className={`${styles.viewBtn} ${view === 'posterior' ? styles.viewBtnActive : ''}`}
            onClick={() => setView('posterior')}
          >
            Back
          </button>
        </div>
      </div>

      {/* Model Canvas */}
      <div className={styles.modelWrapper}>
        <Model
          type={view}
          data={exerciseData}
          bodyColor={bodyColor}
          highlightedColors={['#10b981', accentHex]} // [0 = secondary emerald, 1 = active accent]
          onClick={handleMuscleClick}
          style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center' }}
          svgStyle={{ width: '100%', height: '100%', maxHeight: '250px' }}
        />
      </div>

      {/* Interactive Filter State / Legend */}
      {interactive ? (
        <div className={styles.filterStatusRow}>
          {selectedMuscle ? (
            <div className={styles.activeMuscleBadge}>
              <span className={styles.activeDot} />
              <span className={styles.activeName}>
                Targeting: {getMuscleDisplayName(selectedMuscle)}
              </span>
              <button
                type="button"
                className={styles.clearBtn}
                onClick={() => {
                  if (onClearMuscle) onClearMuscle();
                  else if (onSelectMuscle) onSelectMuscle(selectedMuscle);
                }}
                title="Reset muscle filter"
                aria-label="Reset muscle filter"
              >
                <X size={13} />
              </button>
            </div>
          ) : (
            <div className={styles.instructionText}>
              <span>Tap a muscle above to filter the exercise list</span>
            </div>
          )}
        </div>
      ) : (
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
      )}
    </div>
  );
};

export const MuscleMap = React.memo(MuscleMapComponent);
