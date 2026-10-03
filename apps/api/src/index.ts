import { Hono } from 'hono';
import { cors } from 'hono/cors';
import type { SyncPayload, SyncResult, SyncPullResponse, WorkoutSession, WorkoutSet } from '@kinetic/shared';

type Bindings = {
  DB: D1Database;
  ENVIRONMENT: string;
};

const app = new Hono<{ Bindings: Bindings }>();

// Enable CORS for PWA client domain
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

// Health check endpoint
app.get('/api/health', (c) => {
  return c.json({
    status: 'ok',
    app: 'kinetic-api',
    time: new Date().toISOString(),
    env: c.env.ENVIRONMENT || 'development',
  });
});

/**
 * POST /api/sync
 * Receives batched mutations from the client Dexie sync queue.
 * Executes topological batch UPSERT using SQLite ON CONFLICT DO UPDATE.
 */
app.post('/api/sync', async (c) => {
  try {
    const payload = await c.req.json<SyncPayload>();
    const { sessions = [], sets = [] } = payload;
    const db = c.env.DB;

    if (!db) {
      return c.json({ error: 'Database binding not configured' }, 500);
    }

    const statements: D1PreparedStatement[] = [];

    // 1. TOPOLOGICAL STEP 1: UPSERT Sessions first
    for (const session of sessions) {
      statements.push(
        db.prepare(`
          INSERT INTO workout_sessions (
            id, user_id, title, started_at, ended_at, status, notes, created_at, updated_at, deleted
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON CONFLICT(id) DO UPDATE SET
            title = excluded.title,
            ended_at = excluded.ended_at,
            status = excluded.status,
            notes = excluded.notes,
            updated_at = excluded.updated_at,
            deleted = excluded.deleted
          WHERE excluded.updated_at >= workout_sessions.updated_at
        `).bind(
          session.id,
          session.user_id,
          session.title,
          session.started_at,
          session.ended_at || null,
          session.status,
          session.notes || null,
          session.created_at,
          session.updated_at,
          session.deleted ? 1 : 0
        )
      );
    }

    // 2. TOPOLOGICAL STEP 2: UPSERT Sets after sessions
    for (const set of sets) {
      statements.push(
        db.prepare(`
          INSERT INTO workout_sets (
            id, session_id, exercise_id, set_number, set_type,
            weight_value, weight_unit, reps, rpe, notes,
            completed, completed_at, created_at, updated_at, deleted
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON CONFLICT(id) DO UPDATE SET
            set_number = excluded.set_number,
            set_type = excluded.set_type,
            weight_value = excluded.weight_value,
            weight_unit = excluded.weight_unit,
            reps = excluded.reps,
            rpe = excluded.rpe,
            notes = excluded.notes,
            completed = excluded.completed,
            completed_at = excluded.completed_at,
            updated_at = excluded.updated_at,
            deleted = excluded.deleted
          WHERE excluded.updated_at >= workout_sets.updated_at
        `).bind(
          set.id,
          set.session_id,
          set.exercise_id,
          set.set_number,
          set.set_type,
          set.weight_value,
          set.weight_unit,
          set.reps,
          set.rpe ?? null,
          set.notes ?? null,
          set.completed ? 1 : 0,
          set.completed_at || null,
          set.created_at,
          set.updated_at,
          set.deleted ? 1 : 0
        )
      );
    }

    // Execute atomic batch
    if (statements.length > 0) {
      // Chunk batches if over 100 statements (D1 batch limit safety)
      const CHUNK_SIZE = 100;
      for (let i = 0; i < statements.length; i += CHUNK_SIZE) {
        const chunk = statements.slice(i, i + CHUNK_SIZE);
        await db.batch(chunk);
      }
    }

    const response: SyncResult = {
      success: true,
      applied_sessions: sessions.length,
      applied_sets: sets.length,
      server_timestamp: new Date().toISOString(),
    };

    return c.json(response);
  } catch (error: any) {
    console.error('Sync batch error:', error);
    return c.json({
      success: false,
      error: error.message || 'Internal sync error',
      applied_sessions: 0,
      applied_sets: 0,
      server_timestamp: new Date().toISOString(),
    }, 500);
  }
});

/**
 * GET /api/sync
 * Pulls changes updated after ?since=<ISO timestamp>
 */
app.get('/api/sync', async (c) => {
  const since = c.req.query('since') || '1970-01-01T00:00:00.000Z';
  const userId = c.req.query('user_id') || 'default_user';
  const db = c.env.DB;

  if (!db) {
    return c.json({ error: 'Database binding not configured' }, 500);
  }

  try {
    const sessionsResult = await db.prepare(`
      SELECT * FROM workout_sessions
      WHERE user_id = ? AND updated_at > ?
      ORDER BY updated_at ASC
    `).bind(userId, since).all<WorkoutSession>();

    const setsResult = await db.prepare(`
      SELECT s.* FROM workout_sets s
      JOIN workout_sessions ws ON s.session_id = ws.id
      WHERE ws.user_id = ? AND s.updated_at > ?
      ORDER BY s.updated_at ASC
    `).bind(userId, since).all<WorkoutSet>();

    const response: SyncPullResponse = {
      sessions: (sessionsResult.results || []).map(s => ({
        ...s,
        deleted: Boolean(s.deleted),
      })),
      sets: (setsResult.results || []).map(st => ({
        ...st,
        completed: Boolean(st.completed),
        deleted: Boolean(st.deleted),
      })),
      server_timestamp: new Date().toISOString(),
    };

    return c.json(response);
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

export default app;
