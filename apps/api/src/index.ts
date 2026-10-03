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
  SignUpRequest,
  SignInRequest,
  UpdateProfileRequest,
  ChangePasswordRequest,
  UserStats,
  AuthTokenResponse,
  AuthUser,
} from '@nextset/shared';
import { signJwt, verifyJwt, generateOtp, hashPassword, verifyPassword, generateSalt } from './auth';

type Bindings = {
  DB: D1Database;
  ENVIRONMENT: string;
  JWT_SECRET?: string;
};

const app = new Hono<{ Bindings: Bindings }>();

const DEFAULT_SECRET = 'nextset_dev_super_secret_jwt_hmac_key_2026';

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
    app: 'nextset-api',
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
 * POST /api/auth/signup
 * Create account with Email, Password, Name, and initial Preferences
 */
app.post('/api/auth/signup', async (c) => {
  try {
    const body = await c.req.json<SignUpRequest>();
    const { email, password, name, unit_preference = 'kg', barbell_weight = 20, anonymous_user_id } = body;
    const db = c.env.DB;
    const secret = c.env.JWT_SECRET || DEFAULT_SECRET;

    if (!email || !email.includes('@')) {
      return c.json({ error: 'Valid email address required' }, 400);
    }
    if (!password || password.length < 6) {
      return c.json({ error: 'Password must be at least 6 characters' }, 400);
    }

    const lowerEmail = email.toLowerCase().trim();
    const now = new Date().toISOString();
    const salt = generateSalt();
    const passwordHash = await hashPassword(password, salt);

    if (db) {
      // Check existing user
      const existing = await db.prepare(`SELECT * FROM users WHERE email = ?`).bind(lowerEmail).first<any>();
      if (existing && existing.password_hash) {
        return c.json({ error: 'An account with this email already exists. Please sign in.' }, 409);
      }

      let userId = existing ? existing.id : 'usr_' + crypto.randomUUID().substring(0, 18);

      if (existing) {
        // Upgrade existing passwordless/OTP user with password & name
        await db.prepare(`
          UPDATE users SET
            password_hash = ?,
            password_salt = ?,
            name = COALESCE(?, name),
            unit_preference = ?,
            barbell_weight = ?,
            updated_at = ?
          WHERE id = ?
        `).bind(passwordHash, salt, name || null, unit_preference, barbell_weight, now, userId).run();
      } else {
        await db.prepare(`
          INSERT INTO users (id, email, password_hash, password_salt, name, unit_preference, barbell_weight, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(userId, lowerEmail, passwordHash, salt, name || null, unit_preference, barbell_weight, now, now).run();
      }

      // Reassign any anonymous device workouts if provided
      if (anonymous_user_id && anonymous_user_id !== userId) {
        await db.prepare(`
          UPDATE workout_sessions SET user_id = ?, updated_at = ?
          WHERE user_id = ?
        `).bind(userId, now, anonymous_user_id).run();
      }

      const user: AuthUser = {
        id: userId,
        email: lowerEmail,
        name: name || undefined,
        unit_preference,
        barbell_weight,
        is_anonymous: false,
        created_at: existing ? existing.created_at : now,
      };

      const token = await signJwt({
        sub: user.id,
        email: user.email,
        name: user.name,
        exp: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
      }, secret);

      return c.json({ token, user } as AuthTokenResponse);
    } else {
      // Mock / fallback
      const mockUserId = 'usr_' + Math.random().toString(36).substring(2, 10);
      const user: AuthUser = {
        id: mockUserId,
        email: lowerEmail,
        name: name || undefined,
        unit_preference,
        barbell_weight,
        is_anonymous: false,
        created_at: now,
      };
      const token = await signJwt({
        sub: mockUserId,
        email: lowerEmail,
        name,
        exp: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
      }, secret);
      return c.json({ token, user } as AuthTokenResponse);
    }
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});

/**
 * POST /api/auth/login
 * Sign in with email and password
 */
app.post('/api/auth/login', async (c) => {
  try {
    const body = await c.req.json<SignInRequest>();
    const { email, password, anonymous_user_id } = body;
    const db = c.env.DB;
    const secret = c.env.JWT_SECRET || DEFAULT_SECRET;

    if (!email || !password) {
      return c.json({ error: 'Email and password are required' }, 400);
    }

    const lowerEmail = email.toLowerCase().trim();
    const now = new Date().toISOString();

    if (db) {
      const userRecord = await db.prepare(`SELECT * FROM users WHERE email = ?`).bind(lowerEmail).first<any>();
      if (!userRecord) {
        return c.json({ error: 'Invalid email or password' }, 401);
      }

      if (!userRecord.password_hash || !userRecord.password_salt) {
        return c.json({
          error: 'This account was created via Magic Link / OTP. Please use OTP to sign in or reset your password.',
        }, 400);
      }

      const isValid = await verifyPassword(password, userRecord.password_hash, userRecord.password_salt);
      if (!isValid) {
        return c.json({ error: 'Invalid email or password' }, 401);
      }

      // Link anonymous workouts if requested
      if (anonymous_user_id && anonymous_user_id !== userRecord.id) {
        await db.prepare(`
          UPDATE workout_sessions SET user_id = ?, updated_at = ?
          WHERE user_id = ?
        `).bind(userRecord.id, now, anonymous_user_id).run();
      }

      const user: AuthUser = {
        id: userRecord.id,
        email: userRecord.email,
        name: userRecord.name || undefined,
        unit_preference: userRecord.unit_preference || 'kg',
        barbell_weight: userRecord.barbell_weight || 20,
        is_anonymous: false,
        created_at: userRecord.created_at,
      };

      const token = await signJwt({
        sub: user.id,
        email: user.email,
        name: user.name,
        exp: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
      }, secret);

      return c.json({ token, user } as AuthTokenResponse);
    } else {
      // Mock / fallback
      const mockUserId = 'usr_' + Math.random().toString(36).substring(2, 10);
      const user: AuthUser = {
        id: mockUserId,
        email: lowerEmail,
        name: 'Lifter',
        unit_preference: 'kg',
        barbell_weight: 20,
        is_anonymous: false,
        created_at: now,
      };
      const token = await signJwt({
        sub: mockUserId,
        email: lowerEmail,
        exp: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
      }, secret);
      return c.json({ token, user } as AuthTokenResponse);
    }
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});

/**
 * PUT /api/auth/profile
 * Update user display name, unit preference, barbell weight
 */
app.put('/api/auth/profile', async (c) => {
  try {
    const { userId, isAuth } = await resolveUserId(c);
    if (!isAuth) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const body = await c.req.json<UpdateProfileRequest>();
    const { name, unit_preference, barbell_weight } = body;
    const db = c.env.DB;
    const now = new Date().toISOString();

    if (db) {
      await db.prepare(`
        UPDATE users SET
          name = COALESCE(?, name),
          unit_preference = COALESCE(?, unit_preference),
          barbell_weight = COALESCE(?, barbell_weight),
          updated_at = ?
        WHERE id = ?
      `).bind(name ?? null, unit_preference ?? null, barbell_weight ?? null, now, userId).run();

      const updated = await db.prepare(`SELECT * FROM users WHERE id = ?`).bind(userId).first<any>();
      const user: AuthUser = {
        id: updated.id,
        email: updated.email,
        name: updated.name || undefined,
        unit_preference: updated.unit_preference || 'kg',
        barbell_weight: updated.barbell_weight || 20,
        is_anonymous: false,
        created_at: updated.created_at,
      };
      return c.json({ success: true, user });
    } else {
      return c.json({
        success: true,
        user: {
          id: userId,
          email: 'user@example.com',
          name,
          unit_preference: unit_preference || 'kg',
          barbell_weight: barbell_weight || 20,
          is_anonymous: false,
          created_at: now,
        },
      });
    }
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});

/**
 * POST /api/auth/change-password
 * Securely update password with current password verification
 */
app.post('/api/auth/change-password', async (c) => {
  try {
    const { userId, isAuth } = await resolveUserId(c);
    if (!isAuth) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const body = await c.req.json<ChangePasswordRequest>();
    const { current_password, new_password } = body;
    const db = c.env.DB;

    if (!new_password || new_password.length < 6) {
      return c.json({ error: 'New password must be at least 6 characters' }, 400);
    }

    if (db) {
      const user = await db.prepare(`SELECT * FROM users WHERE id = ?`).bind(userId).first<any>();
      if (!user) {
        return c.json({ error: 'User not found' }, 404);
      }

      if (user.password_hash && user.password_salt) {
        const isValid = await verifyPassword(current_password, user.password_hash, user.password_salt);
        if (!isValid) {
          return c.json({ error: 'Current password is incorrect' }, 400);
        }
      }

      const newSalt = generateSalt();
      const newHash = await hashPassword(new_password, newSalt);
      const now = new Date().toISOString();

      await db.prepare(`
        UPDATE users SET
          password_hash = ?,
          password_salt = ?,
          updated_at = ?
        WHERE id = ?
      `).bind(newHash, newSalt, now, userId).run();

      return c.json({ success: true, message: 'Password changed successfully' });
    } else {
      return c.json({ success: true, message: 'Password changed successfully' });
    }
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});

/**
 * GET /api/auth/stats
 * Aggregate cloud workout statistics for user profile
 */
app.get('/api/auth/stats', async (c) => {
  try {
    const { userId, isAuth } = await resolveUserId(c);
    const db = c.env.DB;

    if (db) {
      const sessionCount = await db.prepare(`
        SELECT COUNT(*) as count FROM workout_sessions WHERE user_id = ? AND deleted = 0
      `).bind(userId).first<{ count: number }>();

      const setCount = await db.prepare(`
        SELECT COUNT(*) as count, SUM(reps) as total_reps, SUM(weight_value * reps) as total_volume
        FROM workout_sets s
        JOIN workout_sessions w ON s.session_id = w.id
        WHERE w.user_id = ? AND s.deleted = 0 AND s.completed = 1
      `).bind(userId).first<{ count: number; total_reps: number; total_volume: number }>();

      const lastWorkout = await db.prepare(`
        SELECT started_at FROM workout_sessions
        WHERE user_id = ? AND deleted = 0
        ORDER BY started_at DESC LIMIT 1
      `).bind(userId).first<{ started_at: string }>();

      const stats: UserStats = {
        total_workouts: sessionCount?.count || 0,
        total_sets: setCount?.count || 0,
        total_reps: setCount?.total_reps || 0,
        total_volume_kg: Math.round(setCount?.total_volume || 0),
        pr_count: 0,
        last_workout_date: lastWorkout?.started_at,
      };

      return c.json(stats);
    } else {
      const stats: UserStats = {
        total_workouts: 0,
        total_sets: 0,
        total_reps: 0,
        total_volume_kg: 0,
        pr_count: 0,
      };
      return c.json(stats);
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
  const db = c.env.DB;

  if (isAuth && db) {
    const user = await db.prepare(`SELECT id, email, name, unit_preference, barbell_weight, created_at FROM users WHERE id = ?`).bind(userId).first<any>();
    if (user) {
      return c.json({
        user_id: userId,
        authenticated: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name || undefined,
          unit_preference: user.unit_preference || 'kg',
          barbell_weight: user.barbell_weight || 20,
          is_anonymous: false,
          created_at: user.created_at,
        },
      });
    }
  }

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
      const effectiveUserId = session.user_id && session.user_id !== 'user_kinetic_local' && session.user_id !== 'user_nextset_local'
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
