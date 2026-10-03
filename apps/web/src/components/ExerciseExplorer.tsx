'use client';

import React, { useState } from 'react';
import { EXERCISES } from '../data/exercises';
import type { ExerciseGuide, MuscleGroup } from '@kinetic/shared';
import { MuscleMap } from './MuscleMap';
import { ExerciseModal } from './ExerciseModal';
import { Search, ChevronRight } from 'lucide-react';
import styles from './ExerciseExplorer.module.css';

interface ExerciseExplorerProps {
  onSelectExerciseToStart?: (exercise: ExerciseGuide) => void;
}

export const ExerciseExplorer: React.FC<ExerciseExplorerProps> = ({
  onSelectExerciseToStart,
}) => {
  const [search, setSearch] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleGroup | null>(null);
  const [activeModalExercise, setActiveModalExercise] = useState<ExerciseGuide | null>(null);

  const categories = ['all', 'barbell', 'dumbbell', 'cable', 'machine', 'bodyweight'];

  const filteredExercises = EXERCISES.filter((ex) => {
    const matchesSearch =
      ex.name.toLowerCase().includes(search.toLowerCase()) ||
      ex.equipment.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || ex.category === selectedCategory;
    const matchesMuscle =
      !selectedMuscle ||
      ex.primaryMuscles.includes(selectedMuscle) ||
      ex.secondaryMuscles.includes(selectedMuscle);
    return matchesSearch && matchesCategory && matchesMuscle;
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Exercise & Form Library</h1>
        <p className={styles.subtitle}>
          Form cues, setup instructions, and muscle targeting for all movements.
        </p>
      </div>

      {/* Interactive Muscle SVG Map */}
      <MuscleMap
        selectedMuscle={selectedMuscle}
        onSelectMuscle={(m) => {
          setSelectedMuscle((prev) => (prev === m ? null : m));
        }}
        interactive={true}
      />

      {/* Search Input */}
      <div className={styles.searchBar}>
        <Search size={18} color="var(--text-muted)" />
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search exercise, barbell, dumbbell..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Category Pills */}
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

      {/* Exercise Cards */}
      <div className={styles.grid}>
        {filteredExercises.map((exercise) => (
          <div
            key={exercise.id}
            className={styles.card}
            onClick={() => setActiveModalExercise(exercise)}
          >
            <div className={styles.cardTop}>
              <div>
                <h3 className={styles.cardTitle}>{exercise.name}</h3>
                <div className={styles.cardMeta}>{exercise.equipment}</div>
              </div>
              <span className="badge badge-amber">{exercise.category}</span>
            </div>

            <div className={styles.cardFooter}>
              <div className={styles.targetTags}>
                {exercise.primaryMuscles.map((m) => (
                  <span key={m} className={styles.targetTag}>
                    {m.replace('_', ' ')}
                  </span>
                ))}
              </div>
              <div className={styles.learnCuesBtn}>
                <span>View Cues</span>
                <ChevronRight size={14} />
              </div>
            </div>
          </div>
        ))}
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
