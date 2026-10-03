import type { WeightUnit } from '@nextset/shared';

export interface PlateSpec {
  weight: number;
  color: string;
  labelColor: string;
  heightRatio: number; // For visual plate diameter rendering (0.4 to 1.0)
  widthPx: number; // Plate thickness
}

export const METRIC_PLATES: PlateSpec[] = [
  { weight: 25, color: '#ef4444', labelColor: '#ffffff', heightRatio: 1.0, widthPx: 20 },
  { weight: 20, color: '#3b82f6', labelColor: '#ffffff', heightRatio: 1.0, widthPx: 18 },
  { weight: 15, color: '#eab308', labelColor: '#000000', heightRatio: 0.9, widthPx: 16 },
  { weight: 10, color: '#10b981', labelColor: '#ffffff', heightRatio: 0.8, widthPx: 14 },
  { weight: 5, color: '#f8fafc', labelColor: '#000000', heightRatio: 0.65, widthPx: 12 },
  { weight: 2.5, color: '#334155', labelColor: '#ffffff', heightRatio: 0.52, widthPx: 10 },
  { weight: 1.25, color: '#94a3b8', labelColor: '#000000', heightRatio: 0.42, widthPx: 8 },
];

export const IMPERIAL_PLATES: PlateSpec[] = [
  { weight: 45, color: '#3b82f6', labelColor: '#ffffff', heightRatio: 1.0, widthPx: 20 },
  { weight: 35, color: '#eab308', labelColor: '#000000', heightRatio: 0.92, widthPx: 18 },
  { weight: 25, color: '#10b981', labelColor: '#ffffff', heightRatio: 0.82, widthPx: 16 },
  { weight: 10, color: '#f8fafc', labelColor: '#000000', heightRatio: 0.68, widthPx: 14 },
  { weight: 5, color: '#334155', labelColor: '#ffffff', heightRatio: 0.52, widthPx: 11 },
  { weight: 2.5, color: '#94a3b8', labelColor: '#000000', heightRatio: 0.42, widthPx: 8 },
];

export interface LoadedPlate {
  spec: PlateSpec;
  count: number;
}

export interface PlateCalculationResult {
  targetWeight: number;
  barWeight: number;
  weightPerSide: number;
  platesPerSide: LoadedPlate[];
  totalLoadedWeight: number;
  unmatchedWeight: number;
}

/**
 * Calculates optimal plate combinations per side for a barbell
 */
export function calculatePlates(
  targetWeight: number,
  barWeight: number = 20,
  unit: WeightUnit = 'kg'
): PlateCalculationResult {
  const availablePlates = unit === 'kg' ? METRIC_PLATES : IMPERIAL_PLATES;

  if (targetWeight <= barWeight) {
    return {
      targetWeight,
      barWeight,
      weightPerSide: 0,
      platesPerSide: [],
      totalLoadedWeight: barWeight,
      unmatchedWeight: 0,
    };
  }

  const weightPerSideNeeded = (targetWeight - barWeight) / 2;
  let remaining = weightPerSideNeeded;
  const platesPerSide: LoadedPlate[] = [];

  for (const plate of availablePlates) {
    if (remaining >= plate.weight - 0.001) {
      const count = Math.floor((remaining + 0.0001) / plate.weight);
      if (count > 0) {
        platesPerSide.push({ spec: plate, count });
        remaining -= count * plate.weight;
      }
    }
  }

  const loadedPerSide = platesPerSide.reduce(
    (sum, item) => sum + item.spec.weight * item.count,
    0
  );

  const totalLoadedWeight = barWeight + loadedPerSide * 2;
  const unmatched = Number(Math.abs(targetWeight - totalLoadedWeight).toFixed(2));

  return {
    targetWeight,
    barWeight,
    weightPerSide: loadedPerSide,
    platesPerSide,
    totalLoadedWeight,
    unmatchedWeight: unmatched,
  };
}
