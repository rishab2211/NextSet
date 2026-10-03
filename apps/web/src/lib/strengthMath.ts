import type { WorkoutSet, WeightUnit } from '@kinetic/shared';

export interface OneRepMaxBreakdown {
  estimated1RM: number;
  formula: string;
  percentages: {
    percentage: number;
    weight: number;
    reps: number;
    focus: 'Max Strength' | 'Strength & Power' | 'Heavy Hypertrophy' | 'Moderate Hypertrophy' | 'Endurance & Pump';
  }[];
}

export interface PRCheckResult {
  isPR: boolean;
  isWeightPR: boolean;
  is1RMPR: boolean;
  previousBestWeight: number;
  previousBest1RM: number;
  current1RM: number;
}

/**
 * Calculates estimated One Rep Max (1RM) using blended Epley & Brzycki formulas
 */
export function calculate1RM(weight: number, reps: number): number {
  if (weight <= 0 || reps <= 0) return 0;
  if (reps === 1) return weight;

  // Epley: weight * (1 + reps / 30)
  const epley = weight * (1 + reps / 30);

  // Brzycki: weight * (36 / (37 - reps)) for reps < 37
  const brzycki = reps < 37 ? weight * (36 / (37 - reps)) : epley;

  // Weighted average favoring Epley for higher reps, Brzycki for lower reps
  const estimated = reps <= 6 ? brzycki * 0.6 + epley * 0.4 : epley * 0.7 + brzycki * 0.3;

  return Math.round(estimated * 10) / 10;
}

/**
 * Generates strength percentage curves and rep targets based on estimated 1RM
 */
export function getStrengthCurves(weight: number, reps: number): OneRepMaxBreakdown {
  const e1RM = calculate1RM(weight, reps);

  const zones: { pct: number; reps: number; focus: OneRepMaxBreakdown['percentages'][0]['focus'] }[] = [
    { pct: 100, reps: 1, focus: 'Max Strength' },
    { pct: 95, reps: 2, focus: 'Max Strength' },
    { pct: 90, reps: 3, focus: 'Strength & Power' },
    { pct: 85, reps: 5, focus: 'Heavy Hypertrophy' },
    { pct: 80, reps: 8, focus: 'Moderate Hypertrophy' },
    { pct: 75, reps: 10, focus: 'Moderate Hypertrophy' },
    { pct: 70, reps: 12, focus: 'Endurance & Pump' },
    { pct: 65, reps: 15, focus: 'Endurance & Pump' },
  ];

  const percentages = zones.map((z) => ({
    percentage: z.pct,
    weight: Math.round((e1RM * (z.pct / 100)) * 2) / 2, // Round to nearest 0.5
    reps: z.reps,
    focus: z.focus,
  }));

  return {
    estimated1RM: e1RM,
    formula: 'Hybrid Epley / Brzycki',
    percentages,
  };
}

/**
 * Checks if a given completed set qualifies as a Personal Record (PR) against historical sets
 */
export function checkPersonalRecord(
  currentSet: { weight_value: number; reps: number; completed: boolean },
  historicalSets: WorkoutSet[]
): PRCheckResult {
  if (!currentSet.completed || currentSet.weight_value <= 0 || currentSet.reps <= 0) {
    return {
      isPR: false,
      isWeightPR: false,
      is1RMPR: false,
      previousBestWeight: 0,
      previousBest1RM: 0,
      current1RM: 0,
    };
  }

  const current1RM = calculate1RM(currentSet.weight_value, currentSet.reps);

  let bestWeight = 0;
  let best1RM = 0;

  for (const hSet of historicalSets) {
    if (!hSet.completed || hSet.deleted) continue;
    if (hSet.weight_value > bestWeight) {
      bestWeight = hSet.weight_value;
    }
    const h1RM = calculate1RM(hSet.weight_value, hSet.reps);
    if (h1RM > best1RM) {
      best1RM = h1RM;
    }
  }

  // If there are no historical sets, the first completed set is not a "breaking" PR
  if (historicalSets.length === 0) {
    return {
      isPR: false,
      isWeightPR: false,
      is1RMPR: false,
      previousBestWeight: bestWeight,
      previousBest1RM: best1RM,
      current1RM,
    };
  }

  const isWeightPR = currentSet.weight_value > bestWeight;
  const is1RMPR = current1RM > best1RM;

  return {
    isPR: isWeightPR || is1RMPR,
    isWeightPR,
    is1RMPR,
    previousBestWeight: bestWeight,
    previousBest1RM: best1RM,
    current1RM,
  };
}
