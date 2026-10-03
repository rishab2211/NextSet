import { db } from './index';
import type { WorkoutSession, WorkoutSet, SetType, WeightUnit } from '@kinetic/shared';

// Safe UUID generation fallback for environments without crypto.randomUUID
function generateId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'id-' + Math.random().toString(36).substring(2, 9) + '-' + Date.now();
}

const DEFAULT_USER_ID = 'user_kinetic_local';

/**
 * Starts a new active workout session in Dexie.
 * Auto-resolves any zombie workouts older than 12 hours.
 */
export async function startWorkoutSession(title: string = 'Gym Workout'): Promise<WorkoutSession> {
  const now = new Date().toISOString();

  return await db.transaction('rw', db.workoutSessions, db.syncQueue, async () => {
    // 1. Resolve stale active sessions (>12 hours old)
    const twelveHoursAgo = new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString();
    const staleSessions = await db.workoutSessions
      .where('status')
      .equals('active')
      .filter(s => s.started_at < twelveHoursAgo)
      .toArray();

    for (const stale of staleSessions) {
      await db.workoutSessions.update(stale.id, {
        status: 'abandoned',
        ended_at: now,
        updated_at: now,
      });
      await db.syncQueue.add({
        entity_type: 'session',
        entity_id: stale.id,
        action: 'update',
        timestamp: now,
      });
    }

    // 2. Create new session
    const newSession: WorkoutSession = {
      id: generateId(),
      user_id: DEFAULT_USER_ID,
      title,
      started_at: now,
      status: 'active',
      created_at: now,
      updated_at: now,
      deleted: false,
    };

    await db.workoutSessions.add(newSession);
    await db.syncQueue.add({
      entity_type: 'session',
      entity_id: newSession.id,
      action: 'insert',
      timestamp: now,
    });

    return newSession;
  });
}

/**
 * Mark a workout session as completed
 */
export async function finishWorkoutSession(sessionId: string): Promise<void> {
  const now = new Date().toISOString();
  await db.transaction('rw', db.workoutSessions, db.syncQueue, async () => {
    await db.workoutSessions.update(sessionId, {
      status: 'completed',
      ended_at: now,
      updated_at: now,
    });
    await db.syncQueue.add({
      entity_type: 'session',
      entity_id: sessionId,
      action: 'update',
      timestamp: now,
    });
  });
}

/**
 * Abandon / cancel active workout session
 */
export async function abandonWorkoutSession(sessionId: string): Promise<void> {
  const now = new Date().toISOString();
  await db.transaction('rw', db.workoutSessions, db.syncQueue, async () => {
    await db.workoutSessions.update(sessionId, {
      status: 'abandoned',
      ended_at: now,
      updated_at: now,
    });
    await db.syncQueue.add({
      entity_type: 'session',
      entity_id: sessionId,
      action: 'update',
      timestamp: now,
    });
  });
}

/**
 * Log or update a workout set
 */
export async function addWorkoutSet(params: {
  sessionId: string;
  exerciseId: string;
  setNumber: number;
  setType?: SetType;
  weightValue: number;
  weightUnit?: WeightUnit;
  reps: number;
  rpe?: number;
}): Promise<WorkoutSet> {
  const now = new Date().toISOString();
  const newSet: WorkoutSet = {
    id: generateId(),
    session_id: params.sessionId,
    exercise_id: params.exerciseId,
    set_number: params.setNumber,
    set_type: params.setType || 'working',
    weight_value: params.weightValue,
    weight_unit: params.weightUnit || 'kg',
    reps: params.reps,
    rpe: params.rpe,
    completed: true,
    completed_at: now,
    created_at: now,
    updated_at: now,
    deleted: false,
  };

  await db.transaction('rw', db.workoutSets, db.syncQueue, async () => {
    await db.workoutSets.add(newSet);
    await db.syncQueue.add({
      entity_type: 'set',
      entity_id: newSet.id,
      action: 'insert',
      timestamp: now,
    });
  });

  return newSet;
}

/**
 * Update an existing set (toggle complete, edit reps/weight)
 */
export async function updateWorkoutSet(
  setId: string,
  updates: Partial<WorkoutSet>
): Promise<void> {
  const now = new Date().toISOString();
  await db.transaction('rw', db.workoutSets, db.syncQueue, async () => {
    await db.workoutSets.update(setId, {
      ...updates,
      updated_at: now,
      ...(updates.completed ? { completed_at: now } : {}),
    });
    await db.syncQueue.add({
      entity_type: 'set',
      entity_id: setId,
      action: 'update',
      timestamp: now,
    });
  });
}

/**
 * Soft delete a set
 */
export async function deleteWorkoutSet(setId: string): Promise<void> {
  const now = new Date().toISOString();
  await db.transaction('rw', db.workoutSets, db.syncQueue, async () => {
    await db.workoutSets.update(setId, {
      deleted: true,
      updated_at: now,
    });
    await db.syncQueue.add({
      entity_type: 'set',
      entity_id: setId,
      action: 'delete',
      timestamp: now,
    });
  });
}

/**
 * Fetches previous session sets for an exercise to show past reference numbers
 */
export async function getPreviousExerciseSets(
  exerciseId: string,
  excludeSessionId?: string
): Promise<WorkoutSet[]> {
  const allSets = await db.workoutSets
    .where('exercise_id')
    .equals(exerciseId)
    .filter(s => !s.deleted && s.completed && s.session_id !== excludeSessionId)
    .reverse()
    .sortBy('created_at');

  if (allSets.length === 0) return [];
  const latestSessionId = allSets[0].session_id;
  return allSets.filter(s => s.session_id === latestSessionId).sort((a, b) => a.set_number - b.set_number);
}
