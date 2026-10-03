import Dexie, { type Table } from 'dexie';
import type { WorkoutSession, WorkoutSet } from '@kinetic/shared';

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

export class KineticDatabase extends Dexie {
  workoutSessions!: Table<WorkoutSession, string>;
  workoutSets!: Table<WorkoutSet, string>;
  syncQueue!: Table<SyncQueueItem, number>;
  userSettings!: Table<UserSetting, string>;

  constructor() {
    super('KineticAppDB');

    // Schema version 1
    this.version(1).stores({
      workoutSessions: 'id, user_id, status, started_at, updated_at, deleted',
      workoutSets: 'id, session_id, exercise_id, set_number, completed, updated_at, deleted',
      syncQueue: '++id, entity_type, entity_id, action, timestamp',
      userSettings: 'key',
    });
  }
}

export const db = new KineticDatabase();
