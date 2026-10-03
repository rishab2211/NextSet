'use client';

import React, { useState, useEffect } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../lib/db';
import { startWorkoutSession, addWorkoutSet } from '../lib/db/workoutStore';
import { applyThemeToDOM } from '../lib/themeStore';
import { HomeDashboard } from '../components/HomeDashboard';
import { ActiveWorkout } from '../components/ActiveWorkout';
import { ExerciseExplorer } from '../components/ExerciseExplorer';
import { WorkoutHistory } from '../components/WorkoutHistory';
import { SettingsPage } from '../components/SettingsPage';
import { Navigation, type NavTab } from '../components/Navigation';
import { getExerciseById } from '../data/exercises';

export default function NextSetApp() {
  const [currentTab, setCurrentTab] = useState<NavTab>('workout');
  const [inActiveWorkoutView, setInActiveWorkoutView] = useState<boolean>(false);

  useEffect(() => {
    applyThemeToDOM();
  }, []);

  // Live Query for active workout session
  const activeSession = useLiveQuery(
    () =>
      db.workoutSessions
        .where('status')
        .equals('active')
        .filter((s) => !s.deleted)
        .first(),
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
          {currentTab === 'workout' && (
            <HomeDashboard
              activeSession={activeSession || null}
              onResumeWorkout={() => setInActiveWorkoutView(true)}
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
