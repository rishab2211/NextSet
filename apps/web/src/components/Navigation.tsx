'use client';

import React from 'react';
import { Dumbbell, BookOpen, History } from 'lucide-react';
import styles from './Navigation.module.css';

export type NavTab = 'workout' | 'exercises' | 'history';

interface NavigationProps {
  currentTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentTab,
  onTabChange,
}) => {
  return (
    <nav className={styles.navBar}>
      <button
        type="button"
        className={`${styles.navItem} ${currentTab === 'workout' ? styles.navItemActive : ''}`}
        onClick={() => onTabChange('workout')}
      >
        <Dumbbell size={22} />
        <span>Workout</span>
      </button>

      <button
        type="button"
        className={`${styles.navItem} ${currentTab === 'exercises' ? styles.navItemActive : ''}`}
        onClick={() => onTabChange('exercises')}
      >
        <BookOpen size={22} />
        <span>Anatomy & Form</span>
      </button>

      <button
        type="button"
        className={`${styles.navItem} ${currentTab === 'history' ? styles.navItemActive : ''}`}
        onClick={() => onTabChange('history')}
      >
        <History size={22} />
        <span>History</span>
      </button>
    </nav>
  );
};
