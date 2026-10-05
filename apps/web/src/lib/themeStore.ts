export type SurfaceTheme = 'pastel-dark' | 'pastel-cream' | 'midnight' | 'oled' | 'slate';
export type AccentColor =
  | 'lavender'
  | 'sage'
  | 'coral'
  | 'peach'
  | 'sky'
  | 'buttercup'
  | 'crimson'
  | 'cobalt'
  | 'emerald'
  | 'amber'
  | 'monochrome'
  | 'violet';

export interface AccentColorPreset {
  id: AccentColor;
  name: string;
  hex: string;
  hoverHex: string;
  subtleHex: string;
  contrastText?: string;
}

export const ACCENT_PRESETS: AccentColorPreset[] = [
  {
    id: 'lavender',
    name: 'Pastel Lavender',
    hex: '#a78bfa',
    hoverHex: '#9061f9',
    subtleHex: 'rgba(167, 139, 250, 0.18)',
    contrastText: '#0f172a',
  },
  {
    id: 'sage',
    name: 'Pastel Sage',
    hex: '#5eead4',
    hoverHex: '#2dd4bf',
    subtleHex: 'rgba(94, 234, 212, 0.18)',
    contrastText: '#0f172a',
  },
  {
    id: 'coral',
    name: 'Pastel Coral',
    hex: '#f87171',
    hoverHex: '#ef4444',
    subtleHex: 'rgba(248, 113, 113, 0.18)',
    contrastText: '#0f172a',
  },
  {
    id: 'peach',
    name: 'Pastel Peach',
    hex: '#fb923c',
    hoverHex: '#f97316',
    subtleHex: 'rgba(251, 146, 60, 0.18)',
    contrastText: '#0f172a',
  },
  {
    id: 'sky',
    name: 'Pastel Sky',
    hex: '#7dd3fc',
    hoverHex: '#38bdf8',
    subtleHex: 'rgba(125, 211, 252, 0.18)',
    contrastText: '#0f172a',
  },
  {
    id: 'buttercup',
    name: 'Pastel Buttercup',
    hex: '#fde047',
    hoverHex: '#facc15',
    subtleHex: 'rgba(253, 224, 71, 0.18)',
    contrastText: '#0f172a',
  },
  // Legacy / fallback presets
  {
    id: 'crimson',
    name: 'Iron Crimson',
    hex: '#ef4444',
    hoverHex: '#dc2626',
    subtleHex: 'rgba(239, 68, 68, 0.15)',
    contrastText: '#ffffff',
  },
  {
    id: 'cobalt',
    name: 'Cobalt Blue',
    hex: '#38bdf8',
    hoverHex: '#0284c7',
    subtleHex: 'rgba(56, 189, 248, 0.15)',
    contrastText: '#0f172a',
  },
  {
    id: 'emerald',
    name: 'Discipline Emerald',
    hex: '#10b981',
    hoverHex: '#059669',
    subtleHex: 'rgba(16, 185, 129, 0.15)',
    contrastText: '#ffffff',
  },
  {
    id: 'amber',
    name: 'Athletic Gold',
    hex: '#f59e0b',
    hoverHex: '#d97706',
    subtleHex: 'rgba(245, 158, 11, 0.15)',
    contrastText: '#0f172a',
  },
  {
    id: 'monochrome',
    name: 'Titanium White',
    hex: '#f4f5f8',
    hoverHex: '#e2e8f0',
    subtleHex: 'rgba(244, 245, 248, 0.15)',
    contrastText: '#0f172a',
  },
  {
    id: 'violet',
    name: 'Cyber Violet',
    hex: '#c084fc',
    hoverHex: '#a855f7',
    subtleHex: 'rgba(192, 132, 252, 0.15)',
    contrastText: '#0f172a',
  },
];

export interface WorkoutPreferences {
  defaultRestSeconds: number;
  timerSound: boolean;
  timerAutoStart: boolean;
  hapticFeedback: boolean;
}

const STORAGE_KEY_SURFACE = 'nextset_theme_surface';
const STORAGE_KEY_ACCENT = 'nextset_theme_accent';
const STORAGE_KEY_WORKOUT_PREFS = 'nextset_workout_preferences';

function getStoredPref(primaryKey: string, legacyKey?: string): string | null {
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

export function getSurfaceTheme(): SurfaceTheme {
  const val = getStoredPref(STORAGE_KEY_SURFACE, 'kinetic_theme_surface');
  if (val === 'pastel-dark' || val === 'pastel-cream' || val === 'oled' || val === 'slate' || val === 'midnight') return val;
  return 'pastel-dark'; // default to soft pastel dark theme
}

export function setSurfaceTheme(theme: SurfaceTheme): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_SURFACE, theme);
  applyThemeToDOM();
  window.dispatchEvent(new Event('nextset_theme_change'));
  window.dispatchEvent(new Event('kinetic_theme_change'));
}

export function getAccentColor(): AccentColor {
  const val = getStoredPref(STORAGE_KEY_ACCENT, 'kinetic_theme_accent');
  if (ACCENT_PRESETS.some((p) => p.id === val)) return val as AccentColor;
  return 'lavender'; // default to soothing pastel lavender
}

export function setAccentColor(accent: AccentColor): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_ACCENT, accent);
  applyThemeToDOM();
  window.dispatchEvent(new Event('nextset_theme_change'));
  window.dispatchEvent(new Event('kinetic_theme_change'));
}

export function getWorkoutPreferences(): WorkoutPreferences {
  if (typeof window === 'undefined') {
    return { defaultRestSeconds: 90, timerSound: true, timerAutoStart: true, hapticFeedback: true };
  }
  const raw = getStoredPref(STORAGE_KEY_WORKOUT_PREFS, 'kinetic_workout_preferences');
  if (!raw) {
    return { defaultRestSeconds: 90, timerSound: true, timerAutoStart: true, hapticFeedback: true };
  }
  try {
    return JSON.parse(raw);
  } catch {
    return { defaultRestSeconds: 90, timerSound: true, timerAutoStart: true, hapticFeedback: true };
  }
}

export function saveWorkoutPreferences(prefs: WorkoutPreferences): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_WORKOUT_PREFS, JSON.stringify(prefs));
  window.dispatchEvent(new Event('nextset_workout_prefs_change'));
  window.dispatchEvent(new Event('kinetic_workout_prefs_change'));
}

/**
 * Applies active theme and accent to documentElement CSS custom properties
 */
export function applyThemeToDOM(): void {
  if (typeof window === 'undefined') return;

  const root = document.documentElement;
  const surface = getSurfaceTheme();
  const accent = getAccentColor();
  const preset = ACCENT_PRESETS.find((p) => p.id === accent) || ACCENT_PRESETS[0];

  // Set data attributes for selector targeting
  root.setAttribute('data-theme', surface);
  root.setAttribute('data-accent', accent);

  // Surface overrides
  if (surface === 'pastel-cream') {
    // Soft warm pastel cream / light mode
    root.style.setProperty('--bg-primary', '#f5f3ef');
    root.style.setProperty('--bg-secondary', '#ffffff');
    root.style.setProperty('--bg-tertiary', '#ebe8e1');
    root.style.setProperty('--bg-elevated', '#dfdbd0');
    root.style.setProperty('--bg-surface-glass', 'rgba(255, 255, 255, 0.94)');
    root.style.setProperty('--border-subtle', 'rgba(100, 116, 139, 0.15)');
    root.style.setProperty('--border-medium', 'rgba(100, 116, 139, 0.28)');
    root.style.setProperty('--border-strong', 'rgba(100, 116, 139, 0.45)');
    root.style.setProperty('--text-primary', '#1e293b');
    root.style.setProperty('--text-secondary', '#475569');
    root.style.setProperty('--text-muted', '#64748b');
    root.style.setProperty('--text-disabled', '#94a3b8');
    root.style.setProperty('--text-inverse', '#ffffff');
  } else if (surface === 'oled') {
    root.style.setProperty('--bg-primary', '#000000');
    root.style.setProperty('--bg-secondary', '#111111');
    root.style.setProperty('--bg-tertiary', '#1a1a1a');
    root.style.setProperty('--bg-elevated', '#242424');
    root.style.setProperty('--bg-surface-glass', 'rgba(12, 12, 12, 0.94)');
    root.style.setProperty('--border-subtle', '#222222');
    root.style.setProperty('--border-medium', '#333333');
    root.style.setProperty('--border-strong', '#444444');
    root.style.setProperty('--text-primary', '#f8fafc');
    root.style.setProperty('--text-secondary', '#cbd5e1');
    root.style.setProperty('--text-muted', '#94a3b8');
    root.style.setProperty('--text-disabled', '#64748b');
    root.style.setProperty('--text-inverse', '#000000');
  } else if (surface === 'slate') {
    root.style.setProperty('--bg-primary', '#0b0f19');
    root.style.setProperty('--bg-secondary', '#111827');
    root.style.setProperty('--bg-tertiary', '#1f2937');
    root.style.setProperty('--bg-elevated', '#374151');
    root.style.setProperty('--bg-surface-glass', 'rgba(17, 24, 39, 0.9)');
    root.style.setProperty('--border-subtle', '#1f2937');
    root.style.setProperty('--border-medium', '#374151');
    root.style.setProperty('--border-strong', '#4b5563');
    root.style.setProperty('--text-primary', '#f8fafc');
    root.style.setProperty('--text-secondary', '#cbd5e1');
    root.style.setProperty('--text-muted', '#94a3b8');
    root.style.setProperty('--text-disabled', '#64748b');
    root.style.setProperty('--text-inverse', '#0b0f19');
  } else if (surface === 'midnight') {
    root.style.setProperty('--bg-primary', '#0d0f12');
    root.style.setProperty('--bg-secondary', '#16181f');
    root.style.setProperty('--bg-tertiary', '#1f222b');
    root.style.setProperty('--bg-elevated', '#282b36');
    root.style.setProperty('--bg-surface-glass', 'rgba(22, 24, 31, 0.92)');
    root.style.setProperty('--border-subtle', '#252833');
    root.style.setProperty('--border-medium', '#373b4b');
    root.style.setProperty('--border-strong', '#4f546a');
    root.style.setProperty('--text-primary', '#f8fafc');
    root.style.setProperty('--text-secondary', '#cbd5e1');
    root.style.setProperty('--text-muted', '#94a3b8');
    root.style.setProperty('--text-disabled', '#64748b');
    root.style.setProperty('--text-inverse', '#0d0f12');
  } else {
    // 'pastel-dark' (Default): Soft twilight slate pastel
    root.style.setProperty('--bg-primary', '#141722');
    root.style.setProperty('--bg-secondary', '#1d2130');
    root.style.setProperty('--bg-tertiary', '#262c3e');
    root.style.setProperty('--bg-elevated', '#31384e');
    root.style.setProperty('--bg-surface-glass', 'rgba(18, 21, 35, 0.88)');
    root.style.setProperty('--border-subtle', 'rgba(165, 180, 252, 0.12)');
    root.style.setProperty('--border-medium', 'rgba(165, 180, 252, 0.24)');
    root.style.setProperty('--border-strong', 'rgba(165, 180, 252, 0.4)');
    root.style.setProperty('--text-primary', '#f8fafc');
    root.style.setProperty('--text-secondary', '#cbd5e1');
    root.style.setProperty('--text-muted', '#94a3b8');
    root.style.setProperty('--text-disabled', '#64748b');
    root.style.setProperty('--text-inverse', '#0f172a');
  }

  // Accent color overrides
  root.style.setProperty('--accent-primary', preset.hex);
  root.style.setProperty('--accent-primary-hover', preset.hoverHex);
  root.style.setProperty('--accent-primary-subtle', preset.subtleHex);
  root.style.setProperty('--border-accent', preset.subtleHex);
  root.style.setProperty('--text-accent-contrast', preset.contrastText || '#0f172a');
  root.style.setProperty('--shadow-glow-accent', `0 4px 16px ${preset.subtleHex}`);
}
