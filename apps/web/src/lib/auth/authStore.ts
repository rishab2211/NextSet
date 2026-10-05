import type {
  AuthUser,
  AuthTokenResponse,
  MagicLinkRequest,
  VerifyOtpRequest,
  SignUpRequest,
  SignInRequest,
  UpdateProfileRequest,
  ChangePasswordRequest,
  UserStats,
} from '@nextset/shared';
import { db } from '../db';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8787';

const STORAGE_KEY_TOKEN = 'nextset_auth_jwt';
const STORAGE_KEY_USER = 'nextset_auth_user';
const STORAGE_KEY_ANON_ID = 'nextset_device_anon_id';
const STORAGE_KEY_LOCAL_VAULT = 'nextset_local_accounts_vault';
const STORAGE_KEY_UNIT_PREF = 'nextset_unit_preference';
const STORAGE_KEY_BAR_WEIGHT = 'nextset_barbell_weight';

function getStoredValue(primaryKey: string, legacyKey?: string): string | null {
  if (typeof window === 'undefined') return null;
  const val = localStorage.getItem(primaryKey);
  if (val) return val;
  if (legacyKey) {
    const legacyVal = localStorage.getItem(legacyKey);
    if (legacyVal) {
      localStorage.setItem(primaryKey, legacyVal);
      return legacyVal;
    }
  }
  return null;
}

/**
 * Returns or initializes a unique anonymous device UUID partition
 */
export function getOrCreateAnonymousUserId(): string {
  if (typeof window === 'undefined') return 'anon_server_render';

  let anonId = getStoredValue(STORAGE_KEY_ANON_ID, 'kinetic_device_anon_id');
  if (!anonId) {
    const randomSuffix = typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID().replace(/-/g, '').substring(0, 16)
      : Math.random().toString(36).substring(2, 14);
    anonId = `anon_${randomSuffix}`;
    localStorage.setItem(STORAGE_KEY_ANON_ID, anonId);
  }
  return anonId;
}

/**
 * Returns the effective user ID (authenticated user ID if logged in, else anonymous device partition)
 */
export function getEffectiveUserId(): string {
  const user = getCurrentUser();
  if (user && user.id) return user.id;
  return getOrCreateAnonymousUserId();
}

export function getAuthToken(): string | null {
  return getStoredValue(STORAGE_KEY_TOKEN, 'kinetic_auth_jwt');
}

export function getCurrentUser(): AuthUser | null {
  const userStr = getStoredValue(STORAGE_KEY_USER, 'kinetic_auth_user');
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
}

/**
 * Associates any local workouts created anonymously with the newly signed-in user
 */
export async function claimLocalWorkoutsForUser(userId: string): Promise<void> {
  if (typeof window === 'undefined') return;
  const now = new Date().toISOString();
  try {
    await db.transaction('rw', db.workoutSessions, db.syncQueue, async () => {
      const unlinked = await db.workoutSessions
        .filter((s) => s.user_id !== userId)
        .toArray();

      for (const session of unlinked) {
        await db.workoutSessions.update(session.id, {
          user_id: userId,
          updated_at: now,
        });
        await db.syncQueue.add({
          entity_type: 'session',
          entity_id: session.id,
          action: 'update',
          timestamp: now,
        });
      }
    });
  } catch (err) {
    console.warn('[AuthStore] Could not claim local workouts:', err);
  }
}

export function saveAuthSession(token: string, user: AuthUser): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_TOKEN, token);
  localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
  if (user.unit_preference) {
    localStorage.setItem(STORAGE_KEY_UNIT_PREF, user.unit_preference);
  }
  if (user.barbell_weight) {
    localStorage.setItem(STORAGE_KEY_BAR_WEIGHT, user.barbell_weight.toString());
  }
  if (user.id && !user.is_anonymous) {
    claimLocalWorkoutsForUser(user.id);
  }
  window.dispatchEvent(new Event('nextset_auth_change'));
  window.dispatchEvent(new Event('kinetic_auth_change'));
}

export function clearAuthSession(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY_TOKEN);
  localStorage.removeItem(STORAGE_KEY_USER);
  localStorage.removeItem('kinetic_auth_jwt');
  localStorage.removeItem('kinetic_auth_user');
  window.dispatchEvent(new Event('nextset_auth_change'));
  window.dispatchEvent(new Event('kinetic_auth_change'));
}

export function getUnitPreference(): 'kg' | 'lbs' {
  if (typeof window === 'undefined') return 'kg';
  const user = getCurrentUser();
  if (user && user.unit_preference) return user.unit_preference;
  const stored = getStoredValue(STORAGE_KEY_UNIT_PREF, 'kinetic_unit_preference');
  return stored === 'lbs' ? 'lbs' : 'kg';
}

export function setUnitPreference(unit: 'kg' | 'lbs'): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_UNIT_PREF, unit);
  const user = getCurrentUser();
  if (user) {
    user.unit_preference = unit;
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
  }
  window.dispatchEvent(new Event('nextset_units_change'));
  window.dispatchEvent(new Event('kinetic_units_change'));
}

export function getBarbellWeight(): number {
  if (typeof window === 'undefined') return 20;
  const user = getCurrentUser();
  if (user && user.barbell_weight) return user.barbell_weight;
  const stored = localStorage.getItem(STORAGE_KEY_BAR_WEIGHT);
  return stored ? parseFloat(stored) : 20;
}

export function setBarbellWeight(weight: number): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_BAR_WEIGHT, weight.toString());
  const user = getCurrentUser();
  if (user) {
    user.barbell_weight = weight;
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
  }
}

/**
 * Local Vault helpers for offline-first auth
 */
interface LocalVaultUser {
  id: string;
  email: string;
  passwordHash: string;
  name?: string;
  unit_preference: 'kg' | 'lbs';
  barbell_weight: number;
  created_at: string;
}

function getLocalVault(): Record<string, LocalVaultUser> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY_LOCAL_VAULT);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveLocalVault(vault: Record<string, LocalVaultUser>): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_LOCAL_VAULT, JSON.stringify(vault));
}

async function simpleHash(str: string): Promise<string> {
  const enc = new TextEncoder();
  const buffer = await crypto.subtle.digest('SHA-256', enc.encode(str));
  const bytes = new Uint8Array(buffer);
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Sign up with Email and Password
 */
export async function signUpWithPassword(
  email: string,
  password: string,
  name?: string,
  unit_preference: 'kg' | 'lbs' = 'kg',
  barbell_weight: number = 20
): Promise<{ success: boolean; user?: AuthUser; error?: string }> {
  const anonId = getOrCreateAnonymousUserId();
  const cleanEmail = email.trim().toLowerCase();

  // Try remote Cloudflare Worker API first
  try {
    const payload: SignUpRequest = {
      email: cleanEmail,
      password,
      name: name?.trim() || undefined,
      unit_preference,
      barbell_weight,
      anonymous_user_id: anonId,
    };

    const res = await fetch(`${API_BASE}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });

    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.error || 'Failed to sign up' };
    }

    saveAuthSession(data.token, data.user);
    return { success: true, user: data.user };
  } catch (netErr) {
    // Graceful offline fallback: store account locally
    console.info('[AuthStore] Remote API offline. Creating local account vault entry.');
    const vault = getLocalVault();
    if (vault[cleanEmail]) {
      return { success: false, error: 'An account with this email already exists locally. Please sign in.' };
    }

    const userId = 'usr_' + Math.random().toString(36).substring(2, 12);
    const now = new Date().toISOString();
    const hash = await simpleHash(password);

    const vaultEntry: LocalVaultUser = {
      id: userId,
      email: cleanEmail,
      passwordHash: hash,
      name: name?.trim() || undefined,
      unit_preference,
      barbell_weight,
      created_at: now,
    };

    vault[cleanEmail] = vaultEntry;
    saveLocalVault(vault);

    const user: AuthUser = {
      id: userId,
      email: cleanEmail,
      name: name?.trim() || undefined,
      unit_preference,
      barbell_weight,
      is_anonymous: false,
      created_at: now,
    };

    const token = `local_jwt_${btoa(JSON.stringify({ sub: userId, email: cleanEmail, exp: Date.now() + 30 * 86400000 }))}`;
    saveAuthSession(token, user);
    return { success: true, user };
  }
}

/**
 * Sign in with Email and Password
 */
export async function signInWithPassword(
  email: string,
  password: string
): Promise<{ success: boolean; user?: AuthUser; error?: string }> {
  const cleanEmail = email.trim().toLowerCase();
  const anonId = getOrCreateAnonymousUserId();

  try {
    const payload: SignInRequest = {
      email: cleanEmail,
      password,
      anonymous_user_id: anonId,
    };

    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });

    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.error || 'Invalid email or password' };
    }

    saveAuthSession(data.token, data.user);
    return { success: true, user: data.user };
  } catch (netErr) {
    // Offline local fallback
    console.info('[AuthStore] Remote API offline. Validating against local vault.');
    const vault = getLocalVault();
    const localUser = vault[cleanEmail];
    if (!localUser) {
      return { success: false, error: 'Account not found. Please check your email or create an account.' };
    }

    const hash = await simpleHash(password);
    if (hash !== localUser.passwordHash) {
      return { success: false, error: 'Incorrect password. Please try again.' };
    }

    const user: AuthUser = {
      id: localUser.id,
      email: localUser.email,
      name: localUser.name,
      unit_preference: localUser.unit_preference,
      barbell_weight: localUser.barbell_weight,
      is_anonymous: false,
      created_at: localUser.created_at,
    };

    const token = `local_jwt_${btoa(JSON.stringify({ sub: localUser.id, email: cleanEmail, exp: Date.now() + 30 * 86400000 }))}`;
    saveAuthSession(token, user);
    return { success: true, user };
  }
}

/**
 * Update user profile preferences (name, units, barbell weight)
 */
export async function updateUserProfile(
  updates: UpdateProfileRequest
): Promise<{ success: boolean; user?: AuthUser; error?: string }> {
  const current = getCurrentUser();
  if (!current) return { success: false, error: 'No user signed in' };

  const token = getAuthToken();
  const updatedUser: AuthUser = {
    ...current,
    name: updates.name !== undefined ? updates.name : current.name,
    unit_preference: updates.unit_preference || current.unit_preference || 'kg',
    barbell_weight: updates.barbell_weight !== undefined ? updates.barbell_weight : current.barbell_weight || 20,
  };

  saveAuthSession(token || 'local_session', updatedUser);

  // If online and connected to API, persist remote
  if (token && !token.startsWith('local_jwt_')) {
    try {
      await fetch(`${API_BASE}/api/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
        signal: AbortSignal.timeout(8000),
      });
    } catch {
      // Non-fatal if offline
    }
  }

  return { success: true, user: updatedUser };
}

/**
 * Change user password
 */
export async function changeUserPassword(
  currentPassword: string,
  newPassword: string
): Promise<{ success: boolean; error?: string }> {
  const user = getCurrentUser();
  const token = getAuthToken();
  if (!user) return { success: false, error: 'Not authenticated' };

  if (newPassword.length < 6) {
    return { success: false, error: 'New password must be at least 6 characters' };
  }

  try {
    if (token && !token.startsWith('local_jwt_')) {
      const res = await fetch(`${API_BASE}/api/auth/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ current_password: currentPassword, new_password: newPassword }),
        signal: AbortSignal.timeout(8000),
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Failed to change password' };
      }
      return { success: true };
    } else {
      // Local vault change
      const vault = getLocalVault();
      const local = vault[user.email];
      if (local) {
        const curHash = await simpleHash(currentPassword);
        if (curHash !== local.passwordHash) {
          return { success: false, error: 'Current password is incorrect' };
        }
        local.passwordHash = await simpleHash(newPassword);
        saveLocalVault(vault);
      }
      return { success: true };
    }
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to change password' };
  }
}

/**
 * Computes live user stats from local Dexie database
 */
export async function fetchUserStats(): Promise<UserStats> {
  const userId = getEffectiveUserId();

  try {
    const sessions = await db.workoutSessions
      .where('user_id')
      .equals(userId)
      .and((s) => !s.deleted && s.status === 'completed')
      .toArray();

    const sessionIds = new Set(sessions.map((s) => s.id));

    const sets = await db.workoutSets
      .filter((s) => sessionIds.has(s.session_id) && !s.deleted && s.completed)
      .toArray();

    let totalReps = 0;
    let totalVolume = 0;

    for (const set of sets) {
      totalReps += set.reps || 0;
      const weightKg = set.weight_unit === 'lbs' ? set.weight_value * 0.453592 : set.weight_value;
      totalVolume += weightKg * (set.reps || 0);
    }

    const lastWorkout = sessions.length > 0
      ? sessions.sort((a, b) => new Date(b.started_at).getTime() - new Date(a.started_at).getTime())[0].started_at
      : undefined;

    return {
      total_workouts: sessions.length,
      total_sets: sets.length,
      total_reps: totalReps,
      total_volume_kg: Math.round(totalVolume),
      pr_count: 0,
      last_workout_date: lastWorkout,
    };
  } catch (err) {
    return {
      total_workouts: 0,
      total_sets: 0,
      total_reps: 0,
      total_volume_kg: 0,
      pr_count: 0,
    };
  }
}

/**
 * Requests 6-digit Magic OTP code
 */
export async function sendOtpCode(email: string): Promise<{ success: boolean; preview_code?: string; message?: string; error?: string }> {
  try {
    const anonId = getOrCreateAnonymousUserId();
    const payload: MagicLinkRequest = {
      email,
      anonymous_user_id: anonId,
    };

    const res = await fetch(`${API_BASE}/api/auth/otp/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });

    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.error || 'Failed to send verification code' };
    }

    return {
      success: true,
      message: data.message,
      preview_code: data.preview_code,
    };
  } catch (err: any) {
    // Offline / dev fallback: generate an instant local code
    console.info('[AuthStore] API offline. Generating local test OTP code.');
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    sessionStorage.setItem('kinetic_pending_otp', JSON.stringify({ email, code }));
    return {
      success: true,
      message: `Verification code generated for ${email}`,
      preview_code: code,
    };
  }
}

/**
 * Verifies 6-digit OTP code and receives signed JWT
 */
export async function verifyOtpCode(email: string, code: string): Promise<{ success: boolean; user?: AuthUser; error?: string }> {
  const cleanEmail = email.trim().toLowerCase();
  const anonId = getOrCreateAnonymousUserId();

  try {
    const payload: VerifyOtpRequest = {
      email: cleanEmail,
      code,
      anonymous_user_id: anonId,
    };

    const res = await fetch(`${API_BASE}/api/auth/otp/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });

    const data: AuthTokenResponse = await res.json();
    if (!res.ok) {
      return { success: false, error: (data as any).error || 'Invalid verification code' };
    }

    saveAuthSession(data.token, data.user);
    return { success: true, user: data.user };
  } catch (err: any) {
    // Local fallback check
    const pendingRaw = sessionStorage.getItem('kinetic_pending_otp');
    if (pendingRaw) {
      try {
        const pending = JSON.parse(pendingRaw);
        if (pending.email.toLowerCase() === cleanEmail && pending.code === code.trim()) {
          sessionStorage.removeItem('kinetic_pending_otp');
          const userId = 'usr_' + Math.random().toString(36).substring(2, 12);
          const now = new Date().toISOString();
          const user: AuthUser = {
            id: userId,
            email: cleanEmail,
            unit_preference: 'kg',
            barbell_weight: 20,
            is_anonymous: false,
            created_at: now,
          };
          const token = `local_jwt_${btoa(JSON.stringify({ sub: userId, email: cleanEmail }))}`;
          saveAuthSession(token, user);
          return { success: true, user };
        }
      } catch {}
    }

    return { success: false, error: err.message || 'Verification failed' };
  }
}
