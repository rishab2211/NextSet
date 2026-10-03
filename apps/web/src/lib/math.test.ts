import assert from 'node:assert';
import test from 'node:test';
import { calculatePlates } from './plateMath.ts';
import { calculate1RM, getStrengthCurves, checkPersonalRecord } from './strengthMath.ts';
import type { WorkoutSet } from '@kinetic/shared';

test('plateMath: calculatePlates handles metric 100kg with 20kg bar', () => {
  const result = calculatePlates(100, 20, 'kg');
  assert.strictEqual(result.targetWeight, 100);
  assert.strictEqual(result.barWeight, 20);
  assert.strictEqual(result.weightPerSide, 40);
  assert.strictEqual(result.totalLoadedWeight, 100);
  assert.strictEqual(result.unmatchedWeight, 0);

  // 40kg per side = 25kg (1) + 15kg (1)
  const plateWeights = result.platesPerSide.map((p) => p.spec.weight * p.count);
  const totalSide = plateWeights.reduce((a, b) => a + b, 0);
  assert.strictEqual(totalSide, 40);
});

test('plateMath: calculatePlates handles target less than or equal to bar weight', () => {
  const result = calculatePlates(15, 20, 'kg');
  assert.strictEqual(result.platesPerSide.length, 0);
  assert.strictEqual(result.totalLoadedWeight, 20);
});

test('plateMath: calculatePlates handles imperial 225lbs with 45lb bar', () => {
  const result = calculatePlates(225, 45, 'lbs');
  assert.strictEqual(result.weightPerSide, 90);
  assert.strictEqual(result.totalLoadedWeight, 225);
  // 90lbs per side = 45lb * 2
  const fortyFives = result.platesPerSide.find((p) => p.spec.weight === 45);
  assert.ok(fortyFives);
  assert.strictEqual(fortyFives.count, 2);
});

test('strengthMath: calculate1RM accuracy', () => {
  // 100kg x 1 rep: exactly 100kg
  assert.strictEqual(calculate1RM(100, 1), 100);

  // 100kg x 10 reps gives estimated 1RM > 100
  const oneRM = calculate1RM(100, 10);
  assert.ok(oneRM > 120 && oneRM < 140);

  // 0 reps or 0 weight: 0
  assert.strictEqual(calculate1RM(0, 10), 0);
  assert.strictEqual(calculate1RM(100, 0), 0);
});

test('strengthMath: getStrengthCurves returns standard zones', () => {
  const breakdown = getStrengthCurves(100, 1);
  assert.strictEqual(breakdown.estimated1RM, 100);
  assert.strictEqual(breakdown.percentages.length, 8);
  const z100 = breakdown.percentages.find((z) => z.percentage === 100);
  assert.ok(z100);
  assert.strictEqual(z100.weight, 100);
  assert.strictEqual(z100.reps, 1);
});

test('strengthMath: checkPersonalRecord identifies new PR', () => {
  const pastSets: WorkoutSet[] = [
    {
      id: 'set-1',
      session_id: 'sess-1',
      exercise_id: 'ex-bench',
      set_number: 1,
      set_type: 'working',
      weight_value: 80,
      weight_unit: 'kg',
      reps: 8,
      completed: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      deleted: false,
    },
  ];

  // Current set: 85kg x 8 (clearly higher 1RM than 80kg x 8)
  const currentSet: WorkoutSet = {
    id: 'set-2',
    session_id: 'sess-2',
    exercise_id: 'ex-bench',
    set_number: 1,
    set_type: 'working',
    weight_value: 85,
    weight_unit: 'kg',
    reps: 8,
    completed: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    deleted: false,
  };

  const res = checkPersonalRecord(currentSet, pastSets);
  assert.strictEqual(res.isPR, true);
  assert.strictEqual(res.is1RMPR, true);
});

test('themeStore: ACCENT_PRESETS contains valid hex codes and 6 presets', async () => {
  const { ACCENT_PRESETS } = await import('./themeStore.ts');
  assert.strictEqual(ACCENT_PRESETS.length, 6);
  for (const preset of ACCENT_PRESETS) {
    assert.match(preset.hex, /^#[0-9a-fA-F]{6}$/);
    assert.ok(preset.name.length > 0);
  }
  // Crimson is Iron Crimson default
  const crimson = ACCENT_PRESETS.find((p) => p.id === 'crimson');
  assert.ok(crimson);
  assert.strictEqual(crimson.hex, '#ef4444');
});
