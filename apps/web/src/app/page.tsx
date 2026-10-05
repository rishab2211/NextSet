'use client';

import React, { useState, useEffect } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../lib/db';
import { startWorkoutSession, abandonWorkoutSession, addWorkoutSet } from '../lib/db/workoutStore';
import { applyThemeToDOM } from '../lib/themeStore';
import { HomePage } from '../components/HomePage';
import { HomeDashboard } from '../components/HomeDashboard';
import { ActiveWorkout } from '../components/ActiveWorkout';
import { ExerciseExplorer } from '../components/ExerciseExplorer';
import { WorkoutHistory } from '../components/WorkoutHistory';
import { SettingsPage } from '../components/SettingsPage';
import { Navigation, type NavTab } from '../components/Navigation';
import { getExerciseById } from '../data/exercises';
import { DumbbellHorizontalIcon } from '../components/HomeIcons';

export default function NextSetApp() {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [inActiveWorkoutView, setInActiveWorkoutView] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
    applyThemeToDOM();
  }, []);

  // Live Query for active workout session (always picks newest active non-deleted session)
  const activeSession = useLiveQuery(
    async () => {
      const active = await db.workoutSessions
        .where('status')
        .equals('active')
        .filter((s) => !s.deleted)
        .toArray();
      if (!active || active.length === 0) return null;
      active.sort((a, b) => new Date(b.started_at).getTime() - new Date(a.started_at).getTime());
      return active[0];
    },
    []
  );

  const handleStartWorkout = async (title: string = 'Gym Workout', initialExerciseIds: string[] = []) => {
    const session = await startWorkoutSession(title);

    // If starting with routine exercises, add initial sets
    for (const exId of initialExerciseIds) {
      const ex = getExerciseById(exId);
      await addWorkoutSet({
        sessionId: session.id,
        exerciseId: exId,
        setNumber: 1,
        weightValue: 0,
        weightUnit: 'kg',
        reps: ex ? ex.recommendedRepRange.min : 10,
        setType: 'working',
      });
    }

    setInActiveWorkoutView(true);
    setCurrentTab('workout');
  };

  const handleDiscardWorkout = async (sessionId: string) => {
    await abandonWorkoutSession(sessionId);
    setInActiveWorkoutView(false);
  };

  if (!isMounted) {
    return (
      <div
        style={{
          minHeight: '100dvh',
          background: 'var(--bg-primary, #0b0d18)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: 'var(--accent-primary, #8b5cf6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 20px var(--accent-primary-subtle, rgba(139, 92, 246, 0.4))',
          }}
        >
          <DumbbellHorizontalIcon size={24} color="var(--text-accent-contrast, #ffffff)" strokeWidth={2.4} />
        </div>
      </div>
    );
  }

  return (
    <>
      {/* If actively working out and in workout tab view */}
      {activeSession && inActiveWorkoutView && currentTab === 'workout' ? (
        <ActiveWorkout
          session={activeSession}
          onFinishWorkout={() => setInActiveWorkoutView(false)}
        />
      ) : (
        <>
          {currentTab === 'home' && (
            <HomePage
              activeSession={activeSession || null}
              onResumeWorkout={() => {
                setInActiveWorkoutView(true);
                setCurrentTab('workout');
              }}
              onDiscardWorkout={handleDiscardWorkout}
              onStartWorkout={handleStartWorkout}
              onNavigateToWorkout={() => setCurrentTab('workout')}
              onNavigateToAnatomy={() => setCurrentTab('exercises')}
            />
          )}

          {currentTab === 'workout' && (
            <HomeDashboard
              activeSession={activeSession || null}
              onResumeWorkout={() => setInActiveWorkoutView(true)}
              onDiscardWorkout={handleDiscardWorkout}
              onStartNewWorkout={handleStartWorkout}
            />
          )}

          {currentTab === 'exercises' && (
            <ExerciseExplorer
              onSelectExerciseToStart={(ex) => handleStartWorkout(`${ex.name} Session`, [ex.id])}
            />
          )}

          {currentTab === 'history' && <WorkoutHistory />}

          {currentTab === 'settings' && <SettingsPage />}

          {/* Bottom Navigation */}
          <Navigation currentTab={currentTab} onTabChange={setCurrentTab} />
        </>
      )}
    </>
  );
}
