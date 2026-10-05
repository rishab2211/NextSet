'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { EXERCISES } from '../data/exercises';
import type { ExerciseGuide, MuscleGroup } from '@nextset/shared';
import { MuscleMap, getMuscleDisplayName } from './MuscleMap';
import { ExerciseModal } from './ExerciseModal';
import {
  Search,
  X,
  ChevronRight,
  Play,
} from 'lucide-react';
import {
  DumbbellHorizontalIcon,
  PullLifterIcon,
  OpenBookIcon,
} from './HomeIcons';
import styles from './ExerciseExplorer.module.css';

interface ExerciseExplorerProps {
  onSelectExerciseToStart?: (exercise: ExerciseGuide) => void;
}

// Major muscle groups for quick single-tap filtering
const MUSCLE_QUICK_FILTERS: { label: string; value: MuscleGroup | null }[] = [
  { label: 'All', value: null },
  { label: 'Chest', value: 'chest' },
  { label: 'Back', value: 'lats' },
  { label: 'Shoulders', value: 'shoulders' },
  { label: 'Quads', value: 'quadriceps' },
  { label: 'Hamstrings', value: 'hamstrings' },
  { label: 'Glutes', value: 'glutes' },
  { label: 'Biceps', value: 'biceps' },
  { label: 'Triceps', value: 'triceps' },
  { label: 'Core', value: 'abs' },
  { label: 'Calves', value: 'calves' },
];

export const ExerciseExplorer: React.FC<ExerciseExplorerProps> = ({
  onSelectExerciseToStart,
}) => {
  const [search, setSearch] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleGroup | null>(null);
  const [activeModalExercise, setActiveModalExercise] = useState<ExerciseGuide | null>(null);

  const categories = ['all', 'barbell', 'dumbbell', 'cable', 'machine', 'bodyweight'];

  // Stable callback for MuscleMap selection to prevent unneeded re-renders on search input
  const handleSelectMuscle = useCallback((muscle: MuscleGroup | null) => {
    if (!muscle) {
      setSelectedMuscle(null);
    } else {
      setSelectedMuscle((prev) => (prev === muscle ? null : muscle));
    }
  }, []);

  const handleClearMuscle = useCallback(() => {
    setSelectedMuscle(null);
  }, []);

  const handleResetAllFilters = useCallback(() => {
    setSearch('');
    setSelectedCategory('all');
    setSelectedMuscle(null);
  }, []);

  // Filtered exercises with comprehensive muscle group association
  const filteredExercises = useMemo(() => {
    return EXERCISES.filter((ex) => {
      const q = search.trim().toLowerCase();
      const matchesSearch =
        q.length === 0 ||
        ex.name.toLowerCase().includes(q) ||
        ex.equipment.toLowerCase().includes(q) ||
        ex.category.toLowerCase().includes(q) ||
        ex.primaryMuscles.some((m) => m.toLowerCase().includes(q)) ||
        ex.secondaryMuscles.some((m) => m.toLowerCase().includes(q));

      const matchesCategory =
        selectedCategory === 'all' || ex.category === selectedCategory;

      let matchesMuscle = true;
      if (selectedMuscle) {
        matchesMuscle =
          ex.primaryMuscles.includes(selectedMuscle) ||
          ex.secondaryMuscles.includes(selectedMuscle) ||
          ((selectedMuscle === 'lats' || selectedMuscle === 'upper_back') &&
            (ex.primaryMuscles.includes('lats') ||
              ex.primaryMuscles.includes('upper_back') ||
              ex.secondaryMuscles.includes('lats') ||
              ex.secondaryMuscles.includes('upper_back'))) ||
          (selectedMuscle === 'quadriceps' && ex.primaryMuscles.includes('quadriceps'));
      }

      return matchesSearch && matchesCategory && matchesMuscle;
    });
  }, [search, selectedCategory, selectedMuscle]);

  const getEquipmentIcon = (category: string) => {
    switch (category) {
      case 'barbell':
        return (
          <div className={styles.cardIconWrap} style={{ background: 'var(--accent-primary, #8b5cf6)' }}>
            <DumbbellHorizontalIcon size={16} color="var(--text-accent-contrast, #ffffff)" strokeWidth={1.9} />
          </div>
        );
      case 'dumbbell':
        return (
          <div className={styles.cardIconWrap} style={{ background: '#f59e0b' }}>
            <DumbbellHorizontalIcon size={16} color="#ffffff" strokeWidth={1.9} />
          </div>
        );
      case 'bodyweight':
        return (
          <div className={styles.cardIconWrap} style={{ background: '#10b981' }}>
            <PullLifterIcon size={15} color="#ffffff" />
          </div>
        );
      default:
        return (
          <div className={styles.cardIconWrap} style={{ background: '#3b82f6' }}>
            <OpenBookIcon size={15} color="#ffffff" strokeWidth={2} />
          </div>
        );
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.titleArea}>
          <h1 className={styles.title}>Exercises</h1>
          <p className={styles.subtitle}>
            Tap a muscle on the anatomy or pick an exercise below.
          </p>
        </div>
        <span className={styles.countBadge}>
          {filteredExercises.length} {filteredExercises.length === 1 ? 'exercise' : 'exercises'}
        </span>
      </header>

      {/* Interactive Anatomy Body Map (Directly Visible, As Requested) */}
      <section className={styles.anatomySection} aria-label="Interactive Muscle Anatomy">
        <MuscleMap
          selectedMuscle={selectedMuscle}
          onSelectMuscle={handleSelectMuscle}
          onClearMuscle={handleClearMuscle}
          interactive={true}
        />
      </section>

      {/* Search Bar */}
      <div className={styles.searchBar}>
        <Search size={16} color="#94a3b8" />
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search bench press, squat, curl..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search.length > 0 && (
          <button
            type="button"
            className={styles.clearSearchBtn}
            onClick={() => setSearch('')}
            aria-label="Clear search"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {/* Quick Muscle Pills Row */}
      <div className={styles.musclePillsRow}>
        {MUSCLE_QUICK_FILTERS.map((item) => (
          <button
            key={item.label}
            type="button"
            className={`${styles.musclePill} ${
              selectedMuscle === item.value ? styles.musclePillActive : ''
            }`}
            onClick={() => handleSelectMuscle(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Category Filter Chips */}
      <div className={styles.categoryScroll}>
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`${styles.categoryBtn} ${
              selectedCategory === cat ? styles.categoryBtnActive : ''
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Active Filter Summary Bar if filtered */}
      {(selectedMuscle || selectedCategory !== 'all' || search.length > 0) && (
        <div className={styles.activeFilterNotice}>
          <div className={styles.activeFilterNoticeText}>
            <span>
              Showing {filteredExercises.length}{' '}
              {filteredExercises.length === 1 ? 'exercise' : 'exercises'}
            </span>
            {selectedMuscle && (
              <span className={styles.activeFilterNoticeMuscle}>
                {' '}targeting <strong>{getMuscleDisplayName(selectedMuscle)}</strong>
              </span>
            )}
          </div>
          <button
            type="button"
            className={styles.resetFiltersBtn}
            onClick={handleResetAllFilters}
          >
            Clear all
          </button>
        </div>
      )}

      {/* Exercise Cards */}
      <div className={styles.grid}>
        {filteredExercises.length === 0 ? (
          <div className={styles.emptyState}>
            <span>No exercises match your search or muscle selection.</span>
            <button
              type="button"
              className="btn-secondary"
              style={{ fontSize: 12, padding: '6px 14px', borderRadius: 8 }}
              onClick={handleResetAllFilters}
            >
              Reset filters
            </button>
          </div>
        ) : (
          filteredExercises.map((exercise) => (
            <div
              key={exercise.id}
              className={styles.card}
              onClick={() => setActiveModalExercise(exercise)}
            >
              <div className={styles.cardTop}>
                <div className={styles.cardTitleArea}>
                  {getEquipmentIcon(exercise.category)}
                  <div className={styles.cardTexts}>
                    <h2 className={styles.cardTitle}>{exercise.name}</h2>
                    <span className={styles.cardMeta}>{exercise.equipment}</span>
                  </div>
                </div>
                <span className={styles.categoryTag}>{exercise.category}</span>
              </div>

              <div className={styles.cardFooter}>
                <div className={styles.targetTags}>
                  {exercise.primaryMuscles.map((m) => (
                    <span
                      key={m}
                      className={`${styles.targetTag} ${selectedMuscle === m ? styles.targetTagActive : ''}`}
                    >
                      {m.replace('_', ' ')}
                    </span>
                  ))}
                  <span className={styles.repRangeBadge}>
                    {exercise.recommendedRepRange.min}-{exercise.recommendedRepRange.max} reps
                  </span>
                </div>

                <div className={styles.cardActions} onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    className={styles.viewCuesBtn}
                    onClick={() => setActiveModalExercise(exercise)}
                  >
                    <span>Cues</span>
                    <ChevronRight size={13} />
                  </button>
                  {onSelectExerciseToStart && (
                    <button
                      type="button"
                      className={styles.startExerciseBtn}
                      onClick={() => onSelectExerciseToStart(exercise)}
                      title="Start workout with this exercise"
                    >
                      <Play size={11} fill="currentColor" />
                      <span>Start</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Form Detail Modal */}
      <ExerciseModal
        exercise={activeModalExercise}
        onClose={() => setActiveModalExercise(null)}
        onAddToWorkout={onSelectExerciseToStart}
      />
    </div>
  );
};
