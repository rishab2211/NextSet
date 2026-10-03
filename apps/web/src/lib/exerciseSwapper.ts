import { EXERCISES, getExerciseById } from '../data/exercises';
import type { ExerciseGuide, ExerciseCategory } from '@kinetic/shared';

export interface ExerciseAlternative {
  exercise: ExerciseGuide;
  matchScore: number;
  reason: string;
  equipmentDiff: string;
}

/**
 * Generates ranked alternatives for an exercise when gym equipment is busy
 */
export function getSmartAlternatives(currentExerciseId: string): ExerciseAlternative[] {
  const current = getExerciseById(currentExerciseId);
  if (!current) return [];

  const alternatives: ExerciseAlternative[] = [];

  for (const candidate of EXERCISES) {
    if (candidate.id === current.id) continue;

    let score = 0;
    let reason = '';

    // 1. Primary Muscle Match (Highest Priority)
    const sharedPrimary = candidate.primaryMuscles.filter((m) =>
      current.primaryMuscles.includes(m)
    );

    if (sharedPrimary.length > 0) {
      score += 100 * sharedPrimary.length;
      reason = `Direct ${sharedPrimary.map(m => m.replace('_', ' ')).join(', ')} alternative`;
    } else {
      // Secondary muscle overlap
      const sharedSecondary = candidate.secondaryMuscles.filter((m) =>
        current.primaryMuscles.includes(m) || current.secondaryMuscles.includes(m)
      );
      if (sharedSecondary.length > 0) {
        score += 30 * sharedSecondary.length;
        reason = `Synergistic muscle group overlap`;
      } else {
        // No anatomical overlap
        continue;
      }
    }

    // 2. Equipment Diversity Bonus (Crucial when equipment is occupied)
    if (candidate.category !== current.category) {
      score += 25; // Bonus for different station (e.g. Dumbbell or Cable when Barbell is taken)
    }

    // 3. SFR Tier Quality Bonus
    if (candidate.sfrTier === 'S') score += 20;
    else if (candidate.sfrTier === 'A') score += 10;

    // Craft contextual reason
    let equipmentDiff = `${candidate.category.toUpperCase()} vs ${current.category.toUpperCase()}`;
    if (current.category === 'barbell' && candidate.category === 'dumbbell') {
      reason += ' — Independent limb loading without needing an Olympic rack';
    } else if (current.category === 'barbell' && candidate.category === 'machine') {
      reason += ' — Fixed biomechanical path with lower axial stabilization load';
    } else if (candidate.category === 'cable') {
      reason += ' — Continuous mechanical tension at peak stretch and contraction';
    } else if (candidate.category === 'bodyweight') {
      reason += ' — High relative strength stimulus requiring zero gym machines';
    }

    alternatives.push({
      exercise: candidate,
      matchScore: score,
      reason,
      equipmentDiff,
    });
  }

  // Sort descending by match score
  return alternatives.sort((a, b) => b.matchScore - a.matchScore);
}
