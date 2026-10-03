-- Kinetic Gym D1 Relational Schema
-- Supports idempotent Last-Write-Wins UPSERT synchronization

CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT,
    password_salt TEXT,
    name TEXT,
    unit_preference TEXT NOT NULL DEFAULT 'kg',
    barbell_weight REAL NOT NULL DEFAULT 20.0,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS magic_codes (
    email TEXT PRIMARY KEY,
    code TEXT NOT NULL,
    anonymous_user_id TEXT,
    expires_at TEXT NOT NULL,
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS workout_sessions (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    title TEXT NOT NULL,
    started_at TEXT NOT NULL,
    ended_at TEXT,
    status TEXT NOT NULL CHECK(status IN ('active', 'completed', 'abandoned')),
    notes TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    deleted INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS workout_sets (
    id TEXT PRIMARY KEY,
    session_id TEXT NOT NULL REFERENCES workout_sessions(id) ON DELETE CASCADE,
    exercise_id TEXT NOT NULL,
    set_number INTEGER NOT NULL,
    set_type TEXT NOT NULL CHECK(set_type IN ('warmup', 'working', 'drop', 'myorep')),
    weight_value REAL NOT NULL,
    weight_unit TEXT NOT NULL CHECK(weight_unit IN ('kg', 'lbs')),
    reps INTEGER NOT NULL,
    rpe REAL,
    notes TEXT,
    completed INTEGER NOT NULL DEFAULT 0,
    completed_at TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    deleted INTEGER NOT NULL DEFAULT 0
);

-- Sync & Query Optimization Indexes
CREATE INDEX IF NOT EXISTS idx_sessions_user_status ON workout_sessions(user_id, status);
CREATE INDEX IF NOT EXISTS idx_sessions_updated_at ON workout_sessions(updated_at);
CREATE INDEX IF NOT EXISTS idx_sets_session ON workout_sets(session_id);
CREATE INDEX IF NOT EXISTS idx_sets_exercise ON workout_sets(exercise_id);
CREATE INDEX IF NOT EXISTS idx_sets_updated_at ON workout_sets(updated_at);
