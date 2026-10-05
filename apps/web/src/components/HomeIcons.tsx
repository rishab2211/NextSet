import React from 'react';

/**
 * Pixel-perfect icons extracted and calibrated directly from the NextSet design mockup.
 */

// 1. Horizontal Dumbbell / Barbell (Logo, Step 1, Log Workout, Bottom Nav)
export const DumbbellHorizontalIcon: React.FC<{
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
}> = ({ size = 20, color = 'currentColor', strokeWidth = 1.9, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Left outer collar */}
    <rect x="1.8" y="8" width="2.4" height="8" rx="1.2" />
    {/* Left inner weight plate */}
    <rect x="5.4" y="4.5" width="2.8" height="15" rx="1.4" />
    {/* Center barbell handle */}
    <line x1="8.2" y1="12" x2="15.8" y2="12" strokeWidth={strokeWidth + 0.2} />
    {/* Right inner weight plate */}
    <rect x="15.8" y="4.5" width="2.8" height="15" rx="1.4" />
    {/* Right outer collar */}
    <rect x="19.8" y="8" width="2.4" height="8" rx="1.2" />
  </svg>
);

// 2. Three Ascending Rounded Capsule Bars (Step 2: Track Progress)
export const BarChartAscendingIcon: React.FC<{
  size?: number;
  color?: string;
  className?: string;
}> = ({ size = 20, color = '#ffffff', className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    aria-hidden="true"
  >
    {/* Left shortest bar */}
    <rect x="3.5" y="14" width="4" height="7" rx="2" fill={color} />
    {/* Middle medium bar */}
    <rect x="10" y="8.5" width="4" height="12.5" rx="2" fill={color} />
    {/* Right tallest bar */}
    <rect x="16.5" y="3" width="4" height="18" rx="2" fill={color} />
  </svg>
);

// 3. Rest & Recover Clock (Step 3: Rest & Recover)
export const RestClockIcon: React.FC<{
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
}> = ({ size = 20, color = 'currentColor', strokeWidth = 2.2, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" />
    <polyline points="12 6.5 12 12 15.8 15.8" />
  </svg>
);

// 4. Flexed Bicep Arm (Step 4: Build Your Goals)
export const BicepArmIcon: React.FC<{
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
}> = ({ size = 20, color = 'currentColor', strokeWidth = 1.9, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Forearm curving up to clenched fist */}
    <path d="M 4.5 19 C 4.5 14 6 8.5 9 6 C 10.5 4.5 13.2 4 14.8 5.2 C 16.2 6.5 16 8.5 14.6 9.6 C 13.4 10.4 11.8 10 11.2 8.8 C 10.8 7.8 11.5 7 12.4 7" />
    {/* Bicep peak down to elbow */}
    <path d="M 14.8 5.8 C 17.8 7.5 20 10.8 20 14 C 20 17 18 19 14.5 19.5" />
    {/* Bottom forearm to elbow connection */}
    <path d="M 4.5 19 C 7.5 20.2 11.5 20.2 14.5 19.5" />
    {/* Inner muscle crease */}
    <path d="M 9.5 12 C 11.8 14.2 14.5 14.5 17 13" />
  </svg>
);

// 5. Open Book with Arched Rounded Pages (Browse Exercises)
export const OpenBookIcon: React.FC<{
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
}> = ({ size = 20, color = 'currentColor', strokeWidth = 2.2, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Left page */}
    <path d="M 12 6.5 C 9.5 4.8 5.5 4.8 3.5 6.2 C 3.2 6.4 3 6.8 3 7.2 L 3 18 C 5.2 16.5 9.5 16.5 12 18 Z" />
    {/* Right page */}
    <path d="M 12 6.5 C 14.5 4.8 18.5 4.8 20.5 6.2 C 20.8 6.4 21 6.8 21 7.2 L 21 18 C 18.8 16.5 14.5 16.5 12 18 Z" />
  </svg>
);

// 6. Upright Mobile Device (Add to Home Screen)
export const SmartphonePwaIcon: React.FC<{
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
}> = ({ size = 20, color = 'currentColor', strokeWidth = 2, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect x="5.5" y="2.5" width="13" height="19" rx="3" />
    <line x1="11" y1="18" x2="13" y2="18" />
  </svg>
);

// 7. Sun with 8 Rounded Pill Rays (Quick Start: Push Day)
export const PushSunIcon: React.FC<{
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
}> = ({ size = 20, color = 'currentColor', strokeWidth = 2.2, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    className={className}
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="4.5" />
    <line x1="12" y1="2.5" x2="12" y2="4.5" strokeWidth={strokeWidth + 0.3} />
    <line x1="12" y1="19.5" x2="12" y2="21.5" strokeWidth={strokeWidth + 0.3} />
    <line x1="2.5" y1="12" x2="4.5" y2="12" strokeWidth={strokeWidth + 0.3} />
    <line x1="19.5" y1="12" x2="21.5" y2="12" strokeWidth={strokeWidth + 0.3} />
    <line x1="5.3" y1="5.3" x2="6.7" y2="6.7" strokeWidth={strokeWidth + 0.3} />
    <line x1="17.3" y1="17.3" x2="18.7" y2="18.7" strokeWidth={strokeWidth + 0.3} />
    <line x1="5.3" y1="18.7" x2="6.7" y2="17.3" strokeWidth={strokeWidth + 0.3} />
    <line x1="17.3" y1="6.7" x2="18.7" y2="5.3" strokeWidth={strokeWidth + 0.3} />
  </svg>
);

// 8. Overhead Pull-Up / Lat Pulldown Lifter (Quick Start: Pull Day)
export const PullLifterIcon: React.FC<{
  size?: number;
  color?: string;
  className?: string;
}> = ({ size = 20, color = '#ffffff', className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    className={className}
    aria-hidden="true"
  >
    <circle cx="12" cy="4.2" r="2.1" />
    <path d="M 4 8 C 4 7.4 4.5 7 5.1 7 L 7.5 7 C 8.2 7 8.8 7.4 9 8.1 L 9.8 10.8 C 10.2 11.2 10.8 11.5 11.3 11.5 L 12.7 11.5 C 13.2 11.5 13.8 11.2 14.2 10.8 L 15 8.1 C 15.2 7.4 15.8 7 16.5 7 L 18.9 7 C 19.5 7 20 7.4 20 8 C 20 8.6 19.5 9 18.9 9 L 17.2 9 L 16.2 12.2 C 15.8 13.4 14.6 14.2 13.3 14.2 L 13.3 16.5 L 14 21 C 14 21.6 13.5 22 12.9 22 C 12.4 22 12 21.6 11.9 21.1 L 11.2 17.2 L 10.8 21.1 C 10.7 21.6 10.3 22 9.8 22 C 9.2 22 8.7 21.6 8.7 21 L 9.4 16.5 L 9.4 14.2 C 8.1 14.2 7 13.4 6.5 12.2 L 5.5 9 L 5.1 9 C 4.5 9 4 8.6 4 8 Z" />
  </svg>
);

// 9. Stylized Flexed Muscular Leg / Quadricep & Calf Ribbon (Quick Start: Leg Day)
export const LegMuscleIcon: React.FC<{
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
}> = ({ size = 20, color = 'currentColor', strokeWidth = 1.9, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Continuous flexed leg outline with two muscle lobes */}
    <path d="M 11.5 4 C 8.8 6.5 7 10.5 7 14.5 C 7 18 8.2 20 10.5 20 C 13.2 20 16 19 16.5 16.2 C 17 13.8 15 12.8 14 12.2 C 15.8 11.5 16.8 9.5 16.2 7 C 15.5 4.8 13.5 4 11.5 4 Z" />
    {/* Inner muscle contour */}
    <path d="M 10 11.5 C 11.2 13 11.5 14.8 10.8 16.8" />
  </svg>
);
