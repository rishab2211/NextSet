import type { AuthUser, AuthTokenResponse, MagicLinkRequest, VerifyOtpRequest } from '@kinetic/shared';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8787';

const STORAGE_KEY_TOKEN = 'kinetic_auth_jwt';
const STORAGE_KEY_USER = 'kinetic_auth_user';
const STORAGE_KEY_ANON_ID = 'kinetic_device_anon_id';

/**
 * Returns or initializes a unique anonymous device UUID partition
 */
export function getOrCreateAnonymousUserId(): string {
  if (typeof window === 'undefined') return 'anon_server_render';

  let anonId = localStorage.getItem(STORAGE_KEY_ANON_ID);
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
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(STORAGE_KEY_TOKEN);
}

export function getCurrentUser(): AuthUser | null {
  if (typeof window === 'undefined') return null;
  const userStr = localStorage.getItem(STORAGE_KEY_USER);
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
}

export function saveAuthSession(token: string, user: AuthUser): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_TOKEN, token);
  localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
  window.dispatchEvent(new Event('kinetic_auth_change'));
}

export function clearAuthSession(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY_TOKEN);
  localStorage.removeItem(STORAGE_KEY_USER);
  window.dispatchEvent(new Event('kinetic_auth_change'));
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
    return { success: false, error: err.message || 'Network error reaching auth server' };
  }
}

/**
 * Verifies 6-digit OTP code and receives signed JWT
 */
export async function verifyOtpCode(email: string, code: string): Promise<{ success: boolean; user?: AuthUser; error?: string }> {
  try {
    const anonId = getOrCreateAnonymousUserId();
    const payload: VerifyOtpRequest = {
      email,
      code,
      anonymous_user_id: anonId,
    };

    const res = await fetch(`${API_BASE}/api/auth/otp/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data: AuthTokenResponse = await res.json();
    if (!res.ok) {
      return { success: false, error: (data as any).error || 'Invalid verification code' };
    }

    saveAuthSession(data.token, data.user);
    return { success: true, user: data.user };
  } catch (err: any) {
    return { success: false, error: err.message || 'Verification failed' };
  }
}
