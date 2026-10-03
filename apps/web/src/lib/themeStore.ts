export type SurfaceTheme = 'midnight' | 'oled' | 'slate';
export type AccentColor = 'crimson' | 'cobalt' | 'emerald' | 'amber' | 'monochrome' | 'violet';

export interface AccentColorPreset {
  id: AccentColor;
  name: string;
  hex: string;
  hoverHex: string;
  subtleHex: string;
}

export const ACCENT_PRESETS: AccentColorPreset[] = [
  {
    id: 'crimson',
    name: 'Iron Crimson',
    hex: '#ef4444',
    hoverHex: '#dc2626',
    subtleHex: 'rgba(239, 68, 68, 0.15)',
  },
  {
    id: 'cobalt',
    name: 'Cobalt Blue',
    hex: '#38bdf8',
    hoverHex: '#0284c7',
    subtleHex: 'rgba(56, 189, 248, 0.15)',
  },
  {
    id: 'emerald',
    name: 'Discipline Emerald',
    hex: '#10b981',
    hoverHex: '#059669',
    subtleHex: 'rgba(16, 185, 129, 0.15)',
  },
  {
    id: 'amber',
    name: 'Athletic Gold',
    hex: '#f59e0b',
    hoverHex: '#d97706',
    subtleHex: 'rgba(245, 158, 11, 0.15)',
  },
  {
    id: 'monochrome',
    name: 'Titanium White',
    hex: '#f4f5f8',
    hoverHex: '#e2e8f0',
    subtleHex: 'rgba(244, 245, 248, 0.15)',
  },
  {
    id: 'violet',
    name: 'Cyber Violet',
    hex: '#a855f7',
    hoverHex: '#9333ea',
    subtleHex: 'rgba(168, 85, 247, 0.15)',
  },
];

export interface WorkoutPreferences {
  defaultRestSeconds: number;
  timerSound: boolean;
  timerAutoStart: boolean;
  hapticFeedback: boolean;
}

const STORAGE_KEY_SURFACE = 'kinetic_theme_surface';
const STORAGE_KEY_ACCENT = 'kinetic_theme_accent';
const STORAGE_KEY_WORKOUT_PREFS = 'kinetic_workout_preferences';

export function getSurfaceTheme(): SurfaceTheme {
  if (typeof window === 'undefined') return 'midnight';
  const val = localStorage.getItem(STORAGE_KEY_SURFACE);
  if (val === 'oled' || val === 'slate' || val === 'midnight') return val;
  return 'midnight';
}

export function setSurfaceTheme(theme: SurfaceTheme): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_SURFACE, theme);
  applyThemeToDOM();
  window.dispatchEvent(new Event('kinetic_theme_change'));
}

export function getAccentColor(): AccentColor {
  if (typeof window === 'undefined') return 'crimson';
  const val = localStorage.getItem(STORAGE_KEY_ACCENT);
  if (ACCENT_PRESETS.some((p) => p.id === val)) return val as AccentColor;
  return 'crimson';
}

export function setAccentColor(accent: AccentColor): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_ACCENT, accent);
  applyThemeToDOM();
  window.dispatchEvent(new Event('kinetic_theme_change'));
}

export function getWorkoutPreferences(): WorkoutPreferences {
  if (typeof window === 'undefined') {
    return { defaultRestSeconds: 90, timerSound: true, timerAutoStart: true, hapticFeedback: true };
  }
  const raw = localStorage.getItem(STORAGE_KEY_WORKOUT_PREFS);
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
  if (surface === 'oled') {
    root.style.setProperty('--bg-primary', '#000000');
    root.style.setProperty('--bg-secondary', '#111111');
    root.style.setProperty('--bg-tertiary', '#1a1a1a');
    root.style.setProperty('--bg-elevated', '#242424');
    root.style.setProperty('--border-subtle', '#222222');
    root.style.setProperty('--border-medium', '#333333');
    root.style.setProperty('--border-strong', '#444444');
  } else if (surface === 'slate') {
    root.style.setProperty('--bg-primary', '#0b0f19');
    root.style.setProperty('--bg-secondary', '#111827');
    root.style.setProperty('--bg-tertiary', '#1f2937');
    root.style.setProperty('--bg-elevated', '#374151');
    root.style.setProperty('--border-subtle', '#1f2937');
    root.style.setProperty('--border-medium', '#374151');
    root.style.setProperty('--border-strong', '#4b5563');
  } else {
    // Midnight Charcoal (default)
    root.style.setProperty('--bg-primary', '#0d0f12');
    root.style.setProperty('--bg-secondary', '#16181f');
    root.style.setProperty('--bg-tertiary', '#1f222b');
    root.style.setProperty('--bg-elevated', '#282b36');
    root.style.setProperty('--border-subtle', '#252833');
    root.style.setProperty('--border-medium', '#373b4b');
    root.style.setProperty('--border-strong', '#4f546a');
  }

  // Accent color overrides
  root.style.setProperty('--accent-primary', preset.hex);
  root.style.setProperty('--accent-primary-hover', preset.hoverHex);
  root.style.setProperty('--accent-primary-subtle', preset.subtleHex);
  root.style.setProperty('--border-accent', preset.subtleHex);

  if (accent === 'monochrome') {
    root.style.setProperty('--text-accent-contrast', '#000000');
  } else {
    root.style.setProperty('--text-accent-contrast', '#ffffff');
  }
}
