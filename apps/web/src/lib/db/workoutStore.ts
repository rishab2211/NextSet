import { db } from './index';
import { getEffectiveUserId, getUnitPreference } from '../auth/authStore';
import type { WorkoutSession, WorkoutSet, SetType, WeightUnit } from '@nextset/shared';

// Safe UUID generation fallback for environments without crypto.randomUUID
function generateId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'id-' + Math.random().toString(36).substring(2, 9) + '-' + Date.now();
}

/**
 * Starts a new active workout session in Dexie.
 * Auto-resolves any existing active sessions so only one active session exists.
 */
export async function startWorkoutSession(title: string = 'Gym Workout'): Promise<WorkoutSession> {
  const now = new Date().toISOString();

  return await db.transaction('rw', db.workoutSessions, db.workoutSets, db.syncQueue, async () => {
    // 1. Resolve any existing active sessions so only 1 session is ever active
    const activeSessions = await db.workoutSessions
      .where('status')
      .equals('active')
      .toArray();

    for (const stale of activeSessions) {
      await db.workoutSessions.update(stale.id, {
        status: 'abandoned',
        ended_at: now,
        updated_at: now,
        deleted: true,
      });
      await db.syncQueue.add({
        entity_type: 'session',
        entity_id: stale.id,
        action: 'delete',
        timestamp: now,
      });

      const staleSets = await db.workoutSets
        .where('session_id')
        .equals(stale.id)
        .toArray();

      for (const s of staleSets) {
        await db.workoutSets.update(s.id, {
          deleted: true,
          updated_at: now,
        });
        await db.syncQueue.add({
          entity_type: 'set',
          entity_id: s.id,
          action: 'delete',
          timestamp: now,
        });
      }
    }

    // 2. Create new session with user partition
    const newSession: WorkoutSession = {
      id: generateId(),
      user_id: getEffectiveUserId(),
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
 * Abandon / discard active workout session.
 * Soft deletes the session and all associated workout sets,
 * and clears any other orphaned active sessions so no active ghost workouts linger.
 */
export async function abandonWorkoutSession(sessionId: string): Promise<void> {
  const now = new Date().toISOString();
  await db.transaction('rw', db.workoutSessions, db.workoutSets, db.syncQueue, async () => {
    // 1. Mark target session as abandoned and deleted
    await db.workoutSessions.update(sessionId, {
      status: 'abandoned',
      ended_at: now,
      updated_at: now,
      deleted: true,
    });
    await db.syncQueue.add({
      entity_type: 'session',
      entity_id: sessionId,
      action: 'delete',
      timestamp: now,
    });

    // 2. Mark all sets belonging to this session as deleted
    const sessionSets = await db.workoutSets
      .where('session_id')
      .equals(sessionId)
      .toArray();

    for (const set of sessionSets) {
      await db.workoutSets.update(set.id, {
        deleted: true,
        updated_at: now,
      });
      await db.syncQueue.add({
        entity_type: 'set',
        entity_id: set.id,
        action: 'delete',
        timestamp: now,
      });
    }

    // 3. Clean up any other orphaned active sessions in Dexie to prevent ghost active workouts
    const otherActiveSessions = await db.workoutSessions
      .where('status')
      .equals('active')
      .toArray();

    for (const other of otherActiveSessions) {
      if (other.id !== sessionId) {
        await db.workoutSessions.update(other.id, {
          status: 'abandoned',
          ended_at: now,
          updated_at: now,
          deleted: true,
        });
        await db.syncQueue.add({
          entity_type: 'session',
          entity_id: other.id,
          action: 'delete',
          timestamp: now,
        });

        const otherSets = await db.workoutSets
          .where('session_id')
          .equals(other.id)
          .toArray();

        for (const oSet of otherSets) {
          await db.workoutSets.update(oSet.id, {
            deleted: true,
            updated_at: now,
          });
          await db.syncQueue.add({
            entity_type: 'set',
            entity_id: oSet.id,
            action: 'delete',
            timestamp: now,
          });
        }
      }
    }
  });

  // 4. Asynchronously push to cloud if online
  if (typeof window !== 'undefined' && typeof navigator !== 'undefined' && navigator.onLine) {
    import('../sync/syncCoordinator')
      .then(({ syncCoordinator }) => {
        syncCoordinator.sync().catch((err) => {
          console.warn('[workoutStore] Sync on discard failed:', err);
        });
      })
      .catch(() => {});
  }
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
    weight_unit: params.weightUnit || getUnitPreference(),
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

/**
 * Swaps an exercise within an active session, re-pointing all sets to the new exercise
 */
export async function swapExerciseInSession(
  sessionId: string,
  oldExerciseId: string,
  newExerciseId: string
): Promise<void> {
  const now = new Date().toISOString();
  await db.transaction('rw', db.workoutSets, db.syncQueue, async () => {
    const sessionSets = await db.workoutSets
      .where('session_id')
      .equals(sessionId)
      .filter((s) => s.exercise_id === oldExerciseId && !s.deleted)
      .toArray();

    for (const set of sessionSets) {
      await db.workoutSets.update(set.id, {
        exercise_id: newExerciseId,
        updated_at: now,
      });
      await db.syncQueue.add({
        entity_type: 'set',
        entity_id: set.id,
        action: 'update',
        timestamp: now,
      });
    }
  });
}
