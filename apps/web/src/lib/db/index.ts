import Dexie, { type Table } from 'dexie';
import type { WorkoutSession, WorkoutSet } from '@nextset/shared';

export interface SyncQueueItem {
  id?: number;
  entity_type: 'session' | 'set';
  entity_id: string;
  action: 'insert' | 'update' | 'delete';
  timestamp: string;
}

export interface UserSetting {
  key: string;
  value: any;
}

export class NextSetDatabase extends Dexie {
  workoutSessions!: Table<WorkoutSession, string>;
  workoutSets!: Table<WorkoutSet, string>;
  syncQueue!: Table<SyncQueueItem, number>;
  userSettings!: Table<UserSetting, string>;

  constructor() {
    super('NextSetAppDB');

    // Schema version 1
    this.version(1).stores({
      workoutSessions: 'id, user_id, status, started_at, updated_at, deleted',
      workoutSets: 'id, session_id, exercise_id, set_number, completed, updated_at, deleted',
      syncQueue: '++id, entity_type, entity_id, action, timestamp',
      userSettings: 'key',
    });
  }
}

export const db = new NextSetDatabase();
export { NextSetDatabase as KineticDatabase };

// Seamless 1-time migration from legacy database name if present
if (typeof window !== 'undefined') {
  const hasMigrated = localStorage.getItem('nextset_db_migrated');
  if (!hasMigrated) {
    Dexie.exists('KineticAppDB').then(async (exists) => {
      if (exists) {
        try {
          const oldDb = new Dexie('KineticAppDB');
          oldDb.version(1).stores({
            workoutSessions: 'id, user_id, status, started_at, updated_at, deleted',
            workoutSets: 'id, session_id, exercise_id, set_number, completed, updated_at, deleted',
            syncQueue: '++id, entity_type, entity_id, action, timestamp',
            userSettings: 'key',
          });
          const sessions = await oldDb.table('workoutSessions').toArray();
          const sets = await oldDb.table('workoutSets').toArray();
          if (sessions.length > 0) {
            await db.workoutSessions.bulkPut(sessions);
          }
          if (sets.length > 0) {
            await db.workoutSets.bulkPut(sets);
          }
          localStorage.setItem('nextset_db_migrated', 'true');
        } catch (e) {
          console.warn('DB migration notice:', e);
        }
      } else {
        localStorage.setItem('nextset_db_migrated', 'true');
      }
    });
  }
}
