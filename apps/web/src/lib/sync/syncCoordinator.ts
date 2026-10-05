import { db } from '../db';
import { getAuthToken, getOrCreateAnonymousUserId, getEffectiveUserId } from '../auth/authStore';
import type { SyncPayload, SyncResult, SyncPullResponse, WorkoutSession, WorkoutSet } from '@nextset/shared';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8787';

class SyncCoordinator {
  private isSyncing = false;
  private isPulling = false;
  private authDebounceTimer: any = null;

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => {
        console.log('[SyncCoordinator] Device came online, triggering sync recovery.');
        this.sync();
      });

      const handleAuthChange = () => {
        if (this.authDebounceTimer) clearTimeout(this.authDebounceTimer);
        this.authDebounceTimer = setTimeout(() => {
          console.log('[SyncCoordinator] Auth state changed, triggering full sync & pull.');
          this.sync().then(() => this.pull());
        }, 200);
      };

      window.addEventListener('nextset_auth_change', handleAuthChange);
      window.addEventListener('kinetic_auth_change', handleAuthChange);
    }
  }

  private getAuthHeaders(): HeadersInit {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'X-Client-Id': getOrCreateAnonymousUserId(),
    };
    const token = getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
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
        client_id: getEffectiveUserId(),
        sessions,
        sets,
        last_sync_timestamp: new Date().toISOString(),
      };

      // 3. Dispatch to Cloudflare Worker with timeout guard
      const response = await fetch(`${API_BASE}/api/sync`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(8000),
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
      console.warn('[SyncCoordinator] Sync failed or timed out, will retry on next connection.', err);
      return null;
    } finally {
      this.isSyncing = false;
    }
  }

  /**
   * Pulls remote workouts from Cloudflare D1 for the authenticated user
   */
  public async pull(since: string = '1970-01-01T00:00:00.000Z'): Promise<boolean> {
    if (this.isPulling) return false;
    if (typeof navigator !== 'undefined' && !navigator.onLine) return false;

    try {
      this.isPulling = true;
      const response = await fetch(`${API_BASE}/api/sync?since=${encodeURIComponent(since)}`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
        signal: AbortSignal.timeout(8000),
      });

      if (!response.ok) return false;

      const data: SyncPullResponse = await response.json();
      const { sessions = [], sets = [] } = data;

      if (sessions.length > 0 || sets.length > 0) {
        await db.transaction('rw', db.workoutSessions, db.workoutSets, async () => {
          if (sessions.length > 0) {
            await db.workoutSessions.bulkPut(sessions);
          }
          if (sets.length > 0) {
            await db.workoutSets.bulkPut(sets);
          }
        });
        console.log(`[SyncCoordinator] Pulled ${sessions.length} sessions, ${sets.length} sets from D1 cloud.`);
      }

      return true;
    } catch (err) {
      console.warn('[SyncCoordinator] Pull failed or timed out', err);
      return false;
    } finally {
      this.isPulling = false;
    }
  }
}

export const syncCoordinator = new SyncCoordinator();
