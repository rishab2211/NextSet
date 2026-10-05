"use client";

import React from "react";
import { Home, History, Settings } from "lucide-react";
import { DumbbellHorizontalIcon, OpenBookIcon } from "./HomeIcons";
import styles from "./Navigation.module.css";

export type NavTab = "home" | "workout" | "exercises" | "history" | "settings";

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
        className={`${styles.navItem} ${currentTab === "home" ? styles.navItemActive : ""}`}
        onClick={() => onTabChange("home")}
      >
        <Home size={18} />
        <span>Home</span>
      </button>

      <button
        type="button"
        className={`${styles.navItem} ${currentTab === "workout" ? styles.navItemActive : ""}`}
        onClick={() => onTabChange("workout")}
      >
        <DumbbellHorizontalIcon size={18} strokeWidth={2} />
        <span>Workout</span>
      </button>

      <button
        type="button"
        className={`${styles.navItem} ${currentTab === "exercises" ? styles.navItemActive : ""}`}
        onClick={() => onTabChange("exercises")}
      >
        <OpenBookIcon size={18} strokeWidth={2} />
        <span>Exercises</span>
      </button>

      <button
        type="button"
        className={`${styles.navItem} ${currentTab === "history" ? styles.navItemActive : ""}`}
        onClick={() => onTabChange("history")}
      >
        <History size={18} />
        <span>History</span>
      </button>

      <button
        type="button"
        className={`${styles.navItem} ${currentTab === "settings" ? styles.navItemActive : ""}`}
        onClick={() => onTabChange("settings")}
      >
        <Settings size={18} />
        <span>Settings</span>
      </button>
    </nav>
  );
};
