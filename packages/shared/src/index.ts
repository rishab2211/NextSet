/**
 * Core Domain Types for Kinetic Gym PWA
 * Shared across Client (SPA + Dexie) and Server (Cloudflare Worker + D1)
 */

export type WeightUnit = 'kg' | 'lbs';

export type MuscleGroup =
  | 'chest'
  | 'upper_back'
  | 'lats'
  | 'quadriceps'
  | 'hamstrings'
  | 'glutes'
  | 'shoulders'
  | 'biceps'
  | 'triceps'
  | 'forearms'
  | 'calves'
  | 'abs'
  | 'lower_back'
  | 'traps';

export type MuscleAnatomyView = 'front' | 'back';

export interface MuscleTarget {
  muscle: MuscleGroup;
  activation: 'primary' | 'secondary' | 'stabilizer';
}

export type ExerciseCategory =
  | 'barbell'
  | 'dumbbell'
  | 'machine'
  | 'cable'
  | 'bodyweight'
  | 'kettlebell';

export type SFRTier = 'S' | 'A' | 'B' | 'C'; // Stimulus-to-Fatigue Ratio

export interface ExerciseGuide {
  id: string;
  name: string;
  slug: string;
  category: ExerciseCategory;
  primaryMuscles: MuscleGroup[];
  secondaryMuscles: MuscleGroup[];
  equipment: string;
  setupSteps: string[];
  executionSteps: string[];
  commonMistakes: { mistake: string; correction: string }[];
  fatigueIndex: number; // 1-5 scale (5 = highest axial/CNS load)
  sfrTier: SFRTier;
  recommendedRepRange: { min: number; max: number };
  imageUrl: string;
  svgFocusIds: string[];
}

export type SetType = 'warmup' | 'working' | 'drop' | 'myorep';

export interface WorkoutSet {
  id: string; // UUID v4
  session_id: string; // Foreign Key to WorkoutSession.id
  exercise_id: string;
  set_number: number;
  set_type: SetType;
  weight_value: number; // Stored as explicit numeric value
  weight_unit: WeightUnit; // Explicit unit (avoids silent unit ambiguity)
  reps: number;
  rpe?: number; // Rate of Perceived Exertion (1-10)
  notes?: string;
  completed: boolean;
  completed_at?: string; // ISO 8601 UTC
  created_at: string; // ISO 8601 UTC
  updated_at: string; // ISO 8601 UTC
  deleted: boolean; // Soft-delete flag for sync idempotency
}

export type WorkoutSessionStatus = 'active' | 'completed' | 'abandoned';

export interface WorkoutSession {
  id: string; // UUID v4
  user_id: string;
  title: string;
  started_at: string; // ISO 8601 UTC
  ended_at?: string; // ISO 8601 UTC
  status: WorkoutSessionStatus;
  notes?: string;
  created_at: string; // ISO 8601 UTC
  updated_at: string; // ISO 8601 UTC
  deleted: boolean; // Soft-delete flag
}

export interface WorkoutTemplate {
  id: string;
  title: string;
  description?: string;
  exercise_ids: string[];
  created_at: string;
  updated_at: string;
}

export interface SyncPayload {
  client_id: string;
  sessions: WorkoutSession[];
  sets: WorkoutSet[];
  last_sync_timestamp: string; // ISO 8601 UTC
}

export interface SyncResult {
  success: boolean;
  applied_sessions: number;
  applied_sets: number;
  server_timestamp: string;
  message?: string;
}

export interface SyncPullResponse {
  sessions: WorkoutSession[];
  sets: WorkoutSet[];
  server_timestamp: string;
}

export interface RestTimerState {
  active: boolean;
  targetTimestamp: number | null; // Date.now() timestamp when timer finishes
  durationSeconds: number;
  exerciseName?: string;
}
