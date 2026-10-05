"use client";

import React, { useState, useEffect } from "react";
import type { WorkoutSession, AuthUser } from "@nextset/shared";
import { AuthModal } from "./AuthModal";
import { getCurrentUser } from "../lib/auth/authStore";
import {
  Play,
  Wifi,
  WifiOff,
  ArrowRight,
  User,
  ChevronDown,
  Flame,
  Trash2,
  X,
} from "lucide-react";
import {
  DumbbellHorizontalIcon,
  BarChartAscendingIcon,
  RestClockIcon,
  BicepArmIcon,
  OpenBookIcon,
  SmartphonePwaIcon,
  PushSunIcon,
  PullLifterIcon,
  LegMuscleIcon,
} from "./HomeIcons";
import styles from "./HomePage.module.css";

interface HomePageProps {
  activeSession: WorkoutSession | null;
  onResumeWorkout: () => void;
  onDiscardWorkout?: (sessionId: string) => Promise<void> | void;
  onStartWorkout: (title?: string, initialExercises?: string[]) => void;
  onNavigateToWorkout: () => void;
  onNavigateToAnatomy: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  activeSession,
  onResumeWorkout,
  onDiscardWorkout,
  onStartWorkout,
  onNavigateToWorkout,
  onNavigateToAnatomy,
}) => {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [, setIsAppInstalled] = useState<boolean>(false);
  const [selectedPlatform, setSelectedPlatform] = useState<"android" | "ios">(
    "android",
  );
  const [isInstallModalOpen, setIsInstallModalOpen] = useState<boolean>(false);
  const [isDiscardConfirmOpen, setIsDiscardConfirmOpen] =
    useState<boolean>(false);
  const [isDiscarding, setIsDiscarding] = useState<boolean>(false);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    setCurrentUser(getCurrentUser());

    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;
    setIsAppInstalled(isStandalone);

    const userAgent = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(userAgent)) {
      setSelectedPlatform("ios");
    } else {
      setSelectedPlatform("android");
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsAppInstalled(true);
      setInstallPrompt(null);
    };

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    const handleAuthChange = () => setCurrentUser(getCurrentUser());

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    window.addEventListener("kinetic_auth_change", handleAuthChange);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("kinetic_auth_change", handleAuthChange);
    };
  }, []);

  const handleInstallClick = async () => {
    if (installPrompt) {
      installPrompt.prompt();
      const choiceResult = await installPrompt.userChoice;
      if (choiceResult.outcome === "accepted") {
        setIsAppInstalled(true);
      }
      setInstallPrompt(null);
    } else {
      setIsInstallModalOpen(true);
    }
  };

  const routines = [
    {
      title: "Push Day",
      description: "Bench Press · Incline DB Press · Cable Fly",
      exerciseIds: [
        "ex-bb-bench-press",
        "ex-incline-db-press",
        "ex-cable-chest-flye",
      ],
      icon: <PushSunIcon size={15} color="#ffffff" strokeWidth={2.2} />,
      iconBg: "#f59e0b",
    },
    {
      title: "Pull Day",
      description: "Pull-Up · Lat Pulldown · Barbell Row",
      exerciseIds: ["ex-pull-up", "ex-lat-pulldown", "ex-bb-row"],
      icon: <PullLifterIcon size={15} color="#ffffff" />,
      iconBg: "#10b981",
    },
    {
      title: "Leg Day",
      description: "Squat · Leg Press · Romanian Deadlift",
      exerciseIds: ["ex-barbell-squat", "ex-leg-press", "ex-romanian-deadlift"],
      icon: <LegMuscleIcon size={15} color="#ffffff" strokeWidth={1.9} />,
      iconBg: "var(--accent-primary, #8b5cf6)",
    },
  ];

  return (
    <div className={styles.container}>
      {/* Background Hero Layer using /bg-home.jpg */}
      <div className={styles.heroBackgroundLayer} />
      <div className={styles.heroBackgroundOverlay} />

      {/* Top Header Bar */}
      <header className={styles.topBar}>
        <div className={styles.logoArea}>
          <div className={styles.logoIcon}>
            <DumbbellHorizontalIcon size={18} color="#ffffff" strokeWidth={2.2} />
          </div>
          <span className={styles.logoText}>
            <span className={styles.logoNext}>Next</span>
            <span className={styles.logoSet}>Set</span>
          </span>
        </div>

        <div className={styles.statusArea}>
          <button
            type="button"
            className={styles.authBadgeBtn}
            onClick={() => setIsAuthModalOpen(true)}
            title="Account"
          >
            <User size={13} color="#cbd5e1" />
            <span className={styles.userNameText}>
              {currentUser
                ? currentUser.name || currentUser.email.split("@")[0]
                : "Sign in"}
            </span>
            <ChevronDown size={12} color="#94a3b8" />
          </button>

          <span
            className={`${styles.syncBadge} ${isOnline ? styles.syncBadgeOnline : styles.syncBadgeOffline}`}
          >
            {isOnline ? (
              <Wifi size={11} strokeWidth={2.5} />
            ) : (
              <WifiOff size={11} strokeWidth={2.5} />
            )}
            <span>{isOnline ? "Synced" : "Offline"}</span>
          </span>
        </div>
      </header>

      {/* Active Workout Banner (if workout in progress) */}
      {activeSession && (
        <section
          className={styles.activeBanner}
          aria-label="Active workout in progress"
        >
          <div className={styles.bannerTop}>
            <div className={styles.bannerTitle}>
              <Flame size={17} color="var(--accent-primary, #a78bfa)" />
              <span>{activeSession.title}</span>
            </div>
            <span className="badge badge-success">In progress</span>
          </div>

          <div className={styles.bannerActions}>
            <button
              type="button"
              className={styles.bannerResumeBtn}
              onClick={onResumeWorkout}
            >
              <Play size={15} fill="currentColor" />
              <span>Resume</span>
            </button>
            {onDiscardWorkout && (
              <button
                type="button"
                className={styles.bannerDiscardBtn}
                onClick={() => setIsDiscardConfirmOpen(true)}
                title="Discard workout"
                aria-label="Discard workout"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        </section>
      )}

      {/* Hero Content */}
      <section className={styles.heroContent} aria-label="Welcome">
        <h1 className={styles.heroHeading}>
          Your gym{" "}
          <span className={styles.heroHeadingHighlight}>companion,</span>
        </h1>

        <div className={styles.heroCursive}>Always by your side at the rack.</div>
      </section>

      {/* Card 1: How it works */}
      <section className={styles.howItWorksCard} aria-label="How it works">
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>How it works</h2>
          <span className={styles.stepBadge}>Just 4 steps</span>
        </div>

        <div className={styles.stepsRow}>
          {/* Step 1 */}
          <div className={styles.stepCol}>
            <div
              className={styles.stepIconWrap}
              style={{ background: "var(--accent-primary, #8b5cf6)" }}
            >
              <DumbbellHorizontalIcon size={18} color="#ffffff" strokeWidth={2.2} />
            </div>
            <div className={styles.stepTitle}>1. Log your workout</div>
            <div className={styles.stepDesc}>
              Tap to add sets, reps and weight.
            </div>
          </div>

          <div className={styles.stepArrow} aria-hidden="true">
            <ArrowRight size={13} color="#64748b" />
          </div>

          {/* Step 2 */}
          <div className={styles.stepCol}>
            <div
              className={styles.stepIconWrap}
              style={{ background: "#10b981" }}
            >
              <BarChartAscendingIcon size={18} color="#ffffff" />
            </div>
            <div className={styles.stepTitle}>2. Track your progress</div>
            <div className={styles.stepDesc}>
              See your improvements over time.
            </div>
          </div>

          <div className={styles.stepArrow} aria-hidden="true">
            <ArrowRight size={13} color="#64748b" />
          </div>

          {/* Step 3 */}
          <div className={styles.stepCol}>
            <div
              className={styles.stepIconWrap}
              style={{ background: "#f59e0b" }}
            >
              <RestClockIcon size={18} color="#ffffff" strokeWidth={2.2} />
            </div>
            <div className={styles.stepTitle}>3. Rest &amp; recover</div>
            <div className={styles.stepDesc}>
              Keep track of your rest intervals.
            </div>
          </div>

          <div className={styles.stepArrow} aria-hidden="true">
            <ArrowRight size={13} color="#64748b" />
          </div>

          {/* Step 4 */}
          <div className={styles.stepCol}>
            <div
              className={styles.stepIconWrap}
              style={{ background: "#f43f5e" }}
            >
              <BicepArmIcon size={18} color="#ffffff" strokeWidth={1.9} />
            </div>
            <div className={styles.stepTitle}>4. Build your goals</div>
            <div className={styles.stepDesc}>
              Stay consistent and get stronger.
            </div>
          </div>
        </div>
      </section>

      {/* Primary CTA Button */}
      <button
        type="button"
        className={styles.startWorkoutCtaBtn}
        onClick={onNavigateToWorkout}
      >
        <div className={styles.startWorkoutCtaCenter}>
          <Play size={16} fill="currentColor" />
          <span>Start your workout</span>
        </div>
        <ArrowRight size={16} strokeWidth={2.4} />
      </button>

      {/* Card 2: Get started in seconds */}
      <section
        className={styles.getStartedCard}
        aria-label="Get started in seconds"
      >
        <div className={styles.getStartedHeader}>
          <h2 className={styles.getStartedTitle}>Get started in seconds</h2>
          <p className={styles.getStartedSubtitle}>
            Add a workout or browse exercises.
          </p>
        </div>

        <div className={styles.actionCardsGrid}>
          {/* Action Card 1: Log a workout */}
          <button
            type="button"
            className={`${styles.actionCard} ${styles.actionCardPurple}`}
            onClick={() => onStartWorkout("Gym Workout")}
          >
            <div
              className={styles.actionCardIconWrap}
              style={{ background: "var(--accent-primary, #8b5cf6)" }}
            >
              <DumbbellHorizontalIcon size={16} color="#ffffff" strokeWidth={2.2} />
            </div>
            <div className={styles.actionCardBody}>
              <div className={styles.actionCardTitle}>Log a workout</div>
              <div className={styles.actionCardDesc}>
                Track your sets, reps and weight.
              </div>
            </div>
            <div className={styles.actionCardArrow}>
              <ArrowRight size={14} color="var(--accent-primary, #a78bfa)" />
            </div>
          </button>

          {/* Action Card 2: Browse exercises */}
          <button
            type="button"
            className={`${styles.actionCard} ${styles.actionCardBlue}`}
            onClick={onNavigateToAnatomy}
          >
            <div
              className={styles.actionCardIconWrap}
              style={{ background: "#3b82f6" }}
            >
              <OpenBookIcon size={16} color="#ffffff" strokeWidth={2.2} />
            </div>
            <div className={styles.actionCardBody}>
              <div className={styles.actionCardTitle}>Browse exercises</div>
              <div className={styles.actionCardDesc}>
                Explore 100+ exercises.
              </div>
            </div>
            <div className={styles.actionCardArrow}>
              <ArrowRight size={14} color="#60a5fa" />
            </div>
          </button>
        </div>

        {/* Add to home screen banner */}
        <div className={styles.addToHomeScreenBanner}>
          <div className={styles.addToHomeLeft}>
            <div className={styles.addToHomeIconWrap}>
              <SmartphonePwaIcon size={16} color="var(--accent-primary, #c084fc)" strokeWidth={2} />
            </div>
            <div className={styles.addToHomeTexts}>
              <div className={styles.addToHomeTitle}>Add to home screen</div>
              <div className={styles.addToHomeDesc}>
                Get quick access like an app.
              </div>
            </div>
          </div>

          <button
            type="button"
            className={styles.installPillBtn}
            onClick={handleInstallClick}
          >
            Install
          </button>
        </div>
      </section>

      {/* Section 3: Quick start */}
      <section
        className={styles.quickStartSection}
        aria-label="Quick start templates"
      >
        <div className={styles.quickStartHeader}>
          <h2 className={styles.quickStartTitle}>Quick start</h2>
          <button
            type="button"
            className={styles.seeAllBtn}
            onClick={onNavigateToWorkout}
          >
            <span>See all</span>
            <ArrowRight size={12} />
          </button>
        </div>

        <div className={styles.routinesGrid}>
          {routines.map((routine, idx) => (
            <button
              key={idx}
              type="button"
              className={styles.routineCard}
              onClick={() => onStartWorkout(routine.title, routine.exerciseIds)}
            >
              <div className={styles.routineCardTop}>
                <div
                  className={styles.routineIconWrap}
                  style={{ background: routine.iconBg }}
                >
                  {routine.icon}
                </div>
                <ArrowRight size={13} color="#94a3b8" />
              </div>

              <div className={styles.routineCardBottom}>
                <div className={styles.routineName}>{routine.title}</div>
                <div className={styles.routineDesc}>{routine.description}</div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Discard Confirmation Dialog */}
      {isDiscardConfirmOpen && activeSession && (
        <div
          className={styles.confirmOverlay}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsDiscardConfirmOpen(false);
            }
          }}
        >
          <div
            className={styles.confirmCard}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.confirmTitle}>Delete this workout?</div>
            <div className={styles.confirmDesc}>
              All logged sets will be deleted.
            </div>
            <div className={styles.confirmActions}>
              <button
                type="button"
                className={styles.confirmKeepBtn}
                onClick={() => setIsDiscardConfirmOpen(false)}
                disabled={isDiscarding}
              >
                Keep Workout
              </button>
              <button
                type="button"
                className={styles.confirmDiscardBtn}
                onClick={async () => {
                  if (isDiscarding || !onDiscardWorkout) return;
                  try {
                    setIsDiscarding(true);
                    await onDiscardWorkout(activeSession.id);
                    setIsDiscardConfirmOpen(false);
                  } catch (err) {
                    console.error("Failed to discard workout:", err);
                    setIsDiscardConfirmOpen(false);
                  } finally {
                    setIsDiscarding(false);
                  }
                }}
                disabled={isDiscarding}
              >
                {isDiscarding ? "Discarding..." : "Discard"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Install Instructions Modal */}
      {isInstallModalOpen && (
        <div
          className={styles.confirmOverlay}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsInstallModalOpen(false);
            }
          }}
        >
          <div
            className={styles.guideModalCard}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.guideModalHeader}>
              <span className={styles.guideModalTitle}>Install NextSet</span>
              <button
                type="button"
                className={styles.guideModalCloseBtn}
                onClick={() => setIsInstallModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className={styles.platformTabs}>
              <button
                type="button"
                className={`${styles.platformTabBtn} ${selectedPlatform === "android" ? styles.platformTabBtnActive : ""}`}
                onClick={() => setSelectedPlatform("android")}
              >
                Android
              </button>
              <button
                type="button"
                className={`${styles.platformTabBtn} ${selectedPlatform === "ios" ? styles.platformTabBtnActive : ""}`}
                onClick={() => setSelectedPlatform("ios")}
              >
                iPhone
              </button>
            </div>

            {selectedPlatform === "android" ? (
              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                <div className={styles.modalStepRow}>
                  <div className={styles.modalStepNum}>1</div>
                  <div className={styles.modalStepTexts}>
                    <div className={styles.modalStepTitle}>
                      Tap ⋮ in your browser
                    </div>
                    <div className={styles.modalStepDesc}>
                      Top or bottom corner in Chrome or Brave.
                    </div>
                  </div>
                </div>
                <div className={styles.modalStepRow}>
                  <div className={styles.modalStepNum}>2</div>
                  <div className={styles.modalStepTexts}>
                    <div className={styles.modalStepTitle}>
                      Tap &quot;Install app&quot; or &quot;Add to Home
                      Screen&quot;
                    </div>
                    <div className={styles.modalStepDesc}>
                      Choose &quot;Install&quot; in the prompt.
                    </div>
                  </div>
                </div>
                <div className={styles.modalStepRow}>
                  <div className={styles.modalStepNum}>3</div>
                  <div className={styles.modalStepTexts}>
                    <div className={styles.modalStepTitle}>Done!</div>
                    <div className={styles.modalStepDesc}>
                      NextSet opens full screen without browser bars.
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                <div className={styles.modalStepRow}>
                  <div className={styles.modalStepNum}>1</div>
                  <div className={styles.modalStepTexts}>
                    <div className={styles.modalStepTitle}>
                      Tap the Share icon
                    </div>
                    <div className={styles.modalStepDesc}>
                      At the bottom toolbar of Safari.
                    </div>
                  </div>
                </div>
                <div className={styles.modalStepRow}>
                  <div className={styles.modalStepNum}>2</div>
                  <div className={styles.modalStepTexts}>
                    <div className={styles.modalStepTitle}>
                      Tap &quot;Add to Home Screen&quot;
                    </div>
                    <div className={styles.modalStepDesc}>
                      Scroll down the share options to find it.
                    </div>
                  </div>
                </div>
                <div className={styles.modalStepRow}>
                  <div className={styles.modalStepNum}>3</div>
                  <div className={styles.modalStepTexts}>
                    <div className={styles.modalStepTitle}>
                      Tap &quot;Add&quot; in the top right
                    </div>
                    <div className={styles.modalStepDesc}>
                      The NextSet app icon appears on your home screen.
                    </div>
                  </div>
                </div>
              </div>
            )}

            <button
              type="button"
              className={styles.bannerResumeBtn}
              style={{ marginTop: 6 }}
              onClick={() => setIsInstallModalOpen(false)}
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
};
