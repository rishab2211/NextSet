import { db } from '../db';
import type { SyncPayload, SyncResult, WorkoutSession, WorkoutSet } from '@kinetic/shared';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8787';

class SyncCoordinator {
  private isSyncing = false;

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => {
        console.log('[SyncCoordinator] Device came online, triggering sync recovery.');
        this.sync();
      });
    }
  }

  /**
   * Dispatches pending local mutations in Dexie to the Cloudflare D1 Worker
   */
  public async sync(): Promise<SyncResult | null> {
    if (this.isSyncing) return null;
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      console.log('[SyncCoordinator] Device is offline. Sync postponed.');
      return null;
    }

    try {
      this.isSyncing = true;

      // 1. Check if queue has pending items
      const queueCount = await db.syncQueue.count();
      if (queueCount === 0) {
        return null;
      }

      // 2. Fetch all dirty sessions and sets
      const queueItems = await db.syncQueue.toArray();
      const sessionIds = new Set(
        queueItems.filter((q) => q.entity_type === 'session').map((q) => q.entity_id)
      );
      const setIds = new Set(
        queueItems.filter((q) => q.entity_type === 'set').map((q) => q.entity_id)
      );

      const sessions: WorkoutSession[] = await db.workoutSessions
        .where('id')
        .anyOf(Array.from(sessionIds))
        .toArray();

      const sets: WorkoutSet[] = await db.workoutSets
        .where('id')
        .anyOf(Array.from(setIds))
        .toArray();

      const payload: SyncPayload = {
        client_id: 'kinetic_pwa_client',
        sessions,
        sets,
        last_sync_timestamp: new Date().toISOString(),
      };

      // 3. Dispatch to Cloudflare Worker
      const response = await fetch(`${API_BASE}/api/sync`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Sync request failed with status: ${response.status}`);
      }

      const result: SyncResult = await response.json();

      if (result.success) {
        // Clear processed items from syncQueue
        const processedIds = queueItems.map((q) => q.id!).filter(Boolean);
        await db.syncQueue.bulkDelete(processedIds);
        console.log(
          `[SyncCoordinator] Sync succeeded. Applied ${result.applied_sessions} sessions, ${result.applied_sets} sets.`
        );
      }

      return result;
    } catch (err) {
      console.warn('[SyncCoordinator] Sync failed, will retry on next connection.', err);
      return null;
    } finally {
      this.isSyncing = false;
    }
  }
}

export const syncCoordinator = new SyncCoordinator();
