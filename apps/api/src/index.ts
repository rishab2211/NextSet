import { Hono } from 'hono';
import { cors } from 'hono/cors';
import type {
  SyncPayload,
  SyncResult,
  SyncPullResponse,
  WorkoutSession,
  WorkoutSet,
  MagicLinkRequest,
  VerifyOtpRequest,
  AuthTokenResponse,
  AuthUser,
} from '@kinetic/shared';
import { signJwt, verifyJwt, generateOtp } from './auth';

type Bindings = {
  DB: D1Database;
  ENVIRONMENT: string;
  JWT_SECRET?: string;
};

const app = new Hono<{ Bindings: Bindings }>();

const DEFAULT_SECRET = 'kinetic_dev_super_secret_jwt_hmac_key_2026';

// Enable CORS for PWA client domain
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'X-Client-Id'],
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
 * Helper to extract User ID from JWT or fallback to anonymous partition
 */
async function resolveUserId(c: any): Promise<{ userId: string; isAuth: boolean }> {
  const authHeader = c.req.header('Authorization');
  const secret = c.env.JWT_SECRET || DEFAULT_SECRET;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    const claims = await verifyJwt(token, secret);
    if (claims && claims.sub) {
      return { userId: claims.sub, isAuth: true };
    }
  }

  // Fallback to anonymous client header or default
  const clientHeader = c.req.header('X-Client-Id') || 'anon_default_device';
  return { userId: clientHeader, isAuth: false };
}

/**
 * POST /api/auth/otp/send
 * Sends 6-digit verification code to email
 */
app.post('/api/auth/otp/send', async (c) => {
  try {
    const body = await c.req.json<MagicLinkRequest>();
    const { email, anonymous_user_id } = body;
    const db = c.env.DB;

    if (!email || !email.includes('@')) {
      return c.json({ error: 'Valid email address required' }, 400);
    }

    const code = generateOtp();
    const now = new Date().toISOString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // 10 minutes

    if (db) {
      await db.prepare(`
        INSERT INTO magic_codes (email, code, anonymous_user_id, expires_at, created_at)
        VALUES (?, ?, ?, ?, ?)
        ON CONFLICT(email) DO UPDATE SET
          code = excluded.code,
          anonymous_user_id = excluded.anonymous_user_id,
          expires_at = excluded.expires_at,
          created_at = excluded.created_at
      `).bind(email.toLowerCase(), code, anonymous_user_id || null, expiresAt, now).run();
    }

    console.log(`[AUTH] Generated Magic OTP for ${email}: ${code}`);

    return c.json({
      success: true,
      message: `Verification code generated for ${email}`,
      // In development/test mode, expose preview_code for instantaneous testing
      preview_code: code,
    });
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});

/**
 * POST /api/auth/otp/verify
 * Verifies code, creates or fetches user, links anonymous workouts, issues JWT
 */
app.post('/api/auth/otp/verify', async (c) => {
  try {
    const body = await c.req.json<VerifyOtpRequest>();
    const { email, code, anonymous_user_id } = body;
    const db = c.env.DB;
    const secret = c.env.JWT_SECRET || DEFAULT_SECRET;

    if (!email || !code) {
      return c.json({ error: 'Email and verification code required' }, 400);
    }

    const now = new Date().toISOString();
    const lowerEmail = email.toLowerCase();

    if (db) {
      const codeRecord = await db.prepare(`
        SELECT * FROM magic_codes
        WHERE email = ? AND code = ? AND expires_at > ?
      `).bind(lowerEmail, code.trim(), now).first<{ email: string; anonymous_user_id: string }>();

      if (!codeRecord) {
        return c.json({ error: 'Invalid or expired verification code' }, 400);
      }

      // 1. Get or create user
      let user = await db.prepare(`SELECT * FROM users WHERE email = ?`).bind(lowerEmail).first<AuthUser>();

      if (!user) {
        const userId = 'usr_' + crypto.randomUUID().substring(0, 18);
        await db.prepare(`
          INSERT INTO users (id, email, created_at, updated_at)
          VALUES (?, ?, ?, ?)
        `).bind(userId, lowerEmail, now, now).run();

        user = {
          id: userId,
          email: lowerEmail,
          is_anonymous: false,
          created_at: now,
        };
      }

      // 2. Associate anonymous workouts if provided
      const anonId = anonymous_user_id || codeRecord.anonymous_user_id;
      if (anonId && anonId !== user.id) {
        await db.prepare(`
          UPDATE workout_sessions SET user_id = ?, updated_at = ?
          WHERE user_id = ?
        `).bind(user.id, now, anonId).run();
      }

      // 3. Clear used code
      await db.prepare(`DELETE FROM magic_codes WHERE email = ?`).bind(lowerEmail).run();

      // 4. Issue JWT (expires in 30 days)
      const token = await signJwt({
        sub: user.id,
        email: user.email,
        exp: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
      }, secret);

      const response: AuthTokenResponse = {
        token,
        user,
      };

      return c.json(response);
    } else {
      // Mock response if DB binding not attached
      const mockUserId = 'usr_' + Math.random().toString(36).substring(2, 9);
      const token = await signJwt({
        sub: mockUserId,
        email: lowerEmail,
        exp: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
      }, secret);

      return c.json({
        token,
        user: { id: mockUserId, email: lowerEmail, is_anonymous: false, created_at: now },
      });
    }
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});

/**
 * GET /api/auth/me
 * Returns current authenticated profile
 */
app.get('/api/auth/me', async (c) => {
  const { userId, isAuth } = await resolveUserId(c);
  return c.json({
    user_id: userId,
    authenticated: isAuth,
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
    const { userId } = await resolveUserId(c);

    if (!db) {
      return c.json({ error: 'Database binding not configured' }, 500);
    }

    const statements: D1PreparedStatement[] = [];

    // 1. TOPOLOGICAL STEP 1: UPSERT Sessions first
    for (const session of sessions) {
      // Attribute session to the resolved user ID (authenticated or anonymous partition)
      const effectiveUserId = session.user_id && session.user_id !== 'user_kinetic_local'
        ? session.user_id
        : userId;

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
          effectiveUserId,
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
 * Pulls changes updated after ?since=<ISO timestamp> for the current user
 */
app.get('/api/sync', async (c) => {
  const since = c.req.query('since') || '1970-01-01T00:00:00.000Z';
  const { userId } = await resolveUserId(c);
  const targetUser = c.req.query('user_id') || userId;
  const db = c.env.DB;

  if (!db) {
    return c.json({ error: 'Database binding not configured' }, 500);
  }

  try {
    const sessionsResult = await db.prepare(`
      SELECT * FROM workout_sessions
      WHERE user_id = ? AND updated_at > ?
      ORDER BY updated_at ASC
    `).bind(targetUser, since).all<WorkoutSession>();

    const setsResult = await db.prepare(`
      SELECT s.* FROM workout_sets s
      JOIN workout_sessions ws ON s.session_id = ws.id
      WHERE ws.user_id = ? AND s.updated_at > ?
      ORDER BY s.updated_at ASC
    `).bind(targetUser, since).all<WorkoutSet>();

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
