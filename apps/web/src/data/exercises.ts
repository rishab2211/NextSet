import type { ExerciseGuide } from '@kinetic/shared';

export const EXERCISES: ExerciseGuide[] = [
  // --- CHEST ---
  {
    id: 'ex-bb-bench-press',
    name: 'Barbell Flat Bench Press',
    slug: 'barbell-bench-press',
    category: 'barbell',
    primaryMuscles: ['chest'],
    secondaryMuscles: ['shoulders', 'triceps'],
    equipment: 'Olympic Barbell & Flat Bench',
    setupSteps: [
      'Lie flat with eyes directly under the racked bar. Plant feet firmly on the floor.',
      'Grip the bar slightly wider than shoulder-width with a full overhand grip.',
      'Retract and depress your scapulae (pinch shoulder blades together into the bench) to stabilize shoulder joints.',
      'Unrack the bar and stabilize it directly over your upper chest with locked arms.'
    ],
    executionSteps: [
      'Lower the bar with controlled cadence (2-3s) toward your lower-sternum / nipple line.',
      'Tuck elbows at roughly a 45° to 60° angle relative to your torso — avoid flaring to 90°.',
      'Lightly touch the sternum without bouncing, pause for 0.5s to eliminate kinetic momentum.',
      'Drive aggressively upward and slightly backward toward your eyes while maintaining planted feet.'
    ],
    commonMistakes: [
      {
        mistake: 'Flaring elbows outward at 90 degrees.',
        correction: 'Tuck elbows to 45°-60° to protect the rotator cuff and maximize pectoral mechanical tension.'
      },
      {
        mistake: 'Bouncing the bar off the sternum.',
        correction: 'Control the descent and pause briefly. Bouncing causes sternal injury and reduces muscle recruitment.'
      },
      {
        mistake: 'Lifting glutes off the bench.',
        correction: 'Maintain 5 points of contact: head, upper back, glutes, left foot, right foot.'
      }
    ],
    fatigueIndex: 4,
    sfrTier: 'A',
    recommendedRepRange: { min: 5, max: 8 },
    imageUrl: '/images/exercises/bench-press.webp',
    svgFocusIds: ['chest', 'delts_front', 'triceps']
  },
  {
    id: 'ex-incline-db-press',
    name: 'Incline Dumbbell Press',
    slug: 'incline-dumbbell-press',
    category: 'dumbbell',
    primaryMuscles: ['chest'],
    secondaryMuscles: ['shoulders', 'triceps'],
    equipment: 'Incline Bench (30°) & Dumbbells',
    setupSteps: [
      'Set bench angle to 30 degrees (higher angles shift excessive load to anterior deltoids).',
      'Sit down with dumbbells resting vertically on your thighs near the knees.',
      'Kick the dumbbells up with your knees one at a time as you lean back onto the pad.',
      'Pinch shoulder blades back and drive your heels into the ground.'
    ],
    executionSteps: [
      'Lower dumbbells slowly until you feel a deep, comfortable stretch across the clavicular pectoralis.',
      'Keep forearms strictly vertical to the floor at the bottom of the movement.',
      'Press upward in a slight converging arc, stopping just short of banging the dumbbells together.',
      'Maintain continuous tension at the top without locking out elbows aggressively.'
    ],
    commonMistakes: [
      {
        mistake: 'Setting bench to 45° or higher.',
        correction: 'Use 15° to 30° to target the upper clavicular chest without anterior deltoid dominance.'
      },
      {
        mistake: 'Clanging dumbbells together at lockout.',
        correction: 'Stop 2-3 inches apart at the apex; banging releases tension from the chest fibers.'
      }
    ],
    fatigueIndex: 3,
    sfrTier: 'S',
    recommendedRepRange: { min: 8, max: 12 },
    imageUrl: '/images/exercises/incline-press.webp',
    svgFocusIds: ['chest', 'delts_front']
  },
  {
    id: 'ex-cable-chest-flye',
    name: 'Standing Cable Flye',
    slug: 'standing-cable-flye',
    category: 'cable',
    primaryMuscles: ['chest'],
    secondaryMuscles: ['shoulders'],
    equipment: 'Dual Cable Pulley Station',
    setupSteps: [
      'Set pulleys at chest height. Grasp single D-handles with an overhand or neutral grip.',
      'Step forward into a staggered stance for stability, leaning slightly forward at the hips.',
      'Retract scapulae and keep chest proud with a slight bend in your elbows.'
    ],
    executionSteps: [
      'Bring hands together in a wide hugging motion, flexing the pecs forcefully.',
      'Cross hands slightly at peak contraction for maximum transverse adduction.',
      'Control the return eccentric phase slowly (3 seconds) until a deep stretch is achieved.',
      'Keep the elbow bend angle static throughout the entire range of motion.'
    ],
    commonMistakes: [
      {
        mistake: 'Turning the flye into a pressing motion.',
        correction: 'Maintain a locked, soft elbow angle (15°-20°) and focus solely on hugging the chest inwards.'
      }
    ],
    fatigueIndex: 2,
    sfrTier: 'S',
    recommendedRepRange: { min: 10, max: 15 },
    imageUrl: '/images/exercises/cable-flye.webp',
    svgFocusIds: ['chest']
  },

  // --- BACK (LATS & UPPER BACK) ---
  {
    id: 'ex-pull-up',
    name: 'Pronated Pull-Up',
    slug: 'pull-up',
    category: 'bodyweight',
    primaryMuscles: ['lats'],
    secondaryMuscles: ['upper_back', 'biceps', 'forearms'],
    equipment: 'Pull-Up Bar',
    setupSteps: [
      'Hang from bar with hands slightly wider than shoulder width, palms facing away.',
      'Initiate from a dead hang with arms extended and scapulae elevated.',
      'Engage core and point toes slightly forward (hollow body posture).'
    ],
    executionSteps: [
      'Depress scapulae first ("pull shoulders away from ears") before bending the elbows.',
      'Drive elbows down and back toward your back pockets, leading with your upper chest.',
      'Pull until your chin clearly clears the bar or upper chest touches the bar.',
      'Lower under complete control back to a full dead hang stretch.'
    ],
    commonMistakes: [
      {
        mistake: 'Kicking legs or kipping for momentum.',
        correction: 'Cross ankles or keep legs straight in front; strict hypertrophy requires isolated lat contraction.'
      },
      {
        mistake: 'Partial reps skipping the bottom dead hang.',
        correction: 'Fully extend arms at the bottom to maximize eccentric stretch-mediated hypertrophy.'
      }
    ],
    fatigueIndex: 3,
    sfrTier: 'A',
    recommendedRepRange: { min: 6, max: 10 },
    imageUrl: '/images/exercises/pull-up.webp',
    svgFocusIds: ['lats', 'biceps', 'upper_back']
  },
  {
    id: 'ex-lat-pulldown',
    name: 'Cable Lat Pulldown',
    slug: 'lat-pulldown',
    category: 'cable',
    primaryMuscles: ['lats'],
    secondaryMuscles: ['upper_back', 'biceps'],
    equipment: 'Lat Pulldown Station',
    setupSteps: [
      'Adjust thigh pad firmly over your quadriceps so feet remain flat on the floor.',
      'Grip the bar just outside shoulder width with an overhand or thumbless hook grip.',
      'Sit upright with a slight 10°-15° lean back from the hips.'
    ],
    executionSteps: [
      'Pull elbows down toward your hips, bringing the bar to your clavicle/upper sternum.',
      'Squeeze lats hard at bottom contraction for a full 1-second isometric pause.',
      'Allow the bar to return smoothly, letting shoulders elevate fully at the top.'
    ],
    commonMistakes: [
      {
        mistake: 'Leaning back excessively into a low-row angle.',
        correction: 'Keep torso stable; excessive swinging shifts load away from the lats to the spinal erectors.'
      }
    ],
    fatigueIndex: 2,
    sfrTier: 'S',
    recommendedRepRange: { min: 8, max: 12 },
    imageUrl: '/images/exercises/lat-pulldown.webp',
    svgFocusIds: ['lats', 'biceps']
  },
  {
    id: 'ex-bb-row',
    name: 'Barbell Bent-Over Row',
    slug: 'barbell-bent-over-row',
    category: 'barbell',
    primaryMuscles: ['upper_back'],
    secondaryMuscles: ['lats', 'biceps', 'lower_back', 'hamstrings'],
    equipment: 'Olympic Barbell',
    setupSteps: [
      'Stand with feet hip-width apart, barbell over mid-foot.',
      'Hinge at hips until torso is roughly 45° to horizontal with a neutral spine.',
      'Grip bar slightly wider than knees with an overhand grip.'
    ],
    executionSteps: [
      'Pull the bar smoothly toward your navel/lower rib cage by driving elbows back.',
      'Retract shoulder blades fully at top and hold for a split second.',
      'Lower bar with control until arms are fully extended without rounding upper back.'
    ],
    commonMistakes: [
      {
        mistake: 'Using jerking hip extension to initiate the pull.',
        correction: 'Maintain a locked hip hinge; only elbows and scapulae should move.'
      }
    ],
    fatigueIndex: 4,
    sfrTier: 'B',
    recommendedRepRange: { min: 6, max: 10 },
    imageUrl: '/images/exercises/barbell-row.webp',
    svgFocusIds: ['upper_back', 'lats', 'lower_back']
  },
  {
    id: 'ex-chest-supported-row',
    name: 'Chest-Supported Incline Row',
    slug: 'chest-supported-row',
    category: 'dumbbell',
    primaryMuscles: ['upper_back'],
    secondaryMuscles: ['lats', 'biceps', 'traps'],
    equipment: 'Incline Bench (30°-45°) & Dumbbells',
    setupSteps: [
      'Lie face down on an incline bench with chest resting firmly against the top pad.',
      'Let dumbbells hang straight down with arms extended and palms facing each other.'
    ],
    executionSteps: [
      'Row the dumbbells up while flaring elbows to ~60° to recruit rhomboids and mid-traps.',
      'Squeeze shoulder blades tightly at the top.',
      'Lower slowly to a dead hang stretch without letting chest lift off the pad.'
    ],
    commonMistakes: [
      {
        mistake: 'Arching chest off the pad during the pull.',
        correction: 'Keep ribcage glued to the pad to eliminate lumbar involvement.'
      }
    ],
    fatigueIndex: 2,
    sfrTier: 'S',
    recommendedRepRange: { min: 8, max: 12 },
    imageUrl: '/images/exercises/chest-supported-row.webp',
    svgFocusIds: ['upper_back', 'traps']
  },

  // --- LEGS (QUADRICEPS, HAMSTRINGS, GLUTES, CALVES) ---
  {
    id: 'ex-barbell-squat',
    name: 'Barbell Back Squat',
    slug: 'barbell-back-squat',
    category: 'barbell',
    primaryMuscles: ['quadriceps'],
    secondaryMuscles: ['glutes', 'hamstrings', 'lower_back', 'abs'],
    equipment: 'Squat Rack & Olympic Barbell',
    setupSteps: [
      'Step under bar, resting it across upper traps (high bar) or rear delts (low bar).',
      'Unrack with feet shoulder-width apart, toes flared slightly out (15°-30°).',
      'Take a deep diaphragmatic breath into your abdomen and brace core 360 degrees.'
    ],
    executionSteps: [
      'Initiate descent by breaking simultaneously at hips and knees.',
      'Track knees in the same direction as toes; descend until hip crease is below knee caps (parallel).',
      'Drive out of the hole by pushing floor away through mid-foot and heel.',
      'Exhale past sticking point and lock out hips without hyperextending.'
    ],
    commonMistakes: [
      {
        mistake: 'Knee valgus (knees caving inward on ascent).',
        correction: 'Push knees outward over toes throughout entire ascent.'
      },
      {
        mistake: 'Shifting weight onto toes and lifting heels.',
        correction: 'Maintain balanced three-point foot pressure: big toe, pinky toe, and heel.'
      }
    ],
    fatigueIndex: 5,
    sfrTier: 'A',
    recommendedRepRange: { min: 5, max: 8 },
    imageUrl: '/images/exercises/squat.webp',
    svgFocusIds: ['quads', 'glutes', 'lower_back']
  },
  {
    id: 'ex-leg-press',
    name: '45° Leg Press',
    slug: 'leg-press',
    category: 'machine',
    primaryMuscles: ['quadriceps'],
    secondaryMuscles: ['glutes'],
    equipment: '45-Degree Leg Press Machine',
    setupSteps: [
      'Sit with lower back and pelvis pinned against the back pad.',
      'Place feet shoulder-width apart in middle of platform for balanced quad development.',
      'Disengage safety levers while holding handles firmly.'
    ],
    executionSteps: [
      'Lower platform under control until knees reach 90° or deeper without pelvic tilting.',
      'Do not allow lower back or tailbone to lift/round off the seat (butt wink).',
      'Press through full foot back up, stopping just before full knee hyperextension.'
    ],
    commonMistakes: [
      {
        mistake: 'Hyperextending and locking out knees aggressively.',
        correction: 'Maintain soft micro-bend at top to keep tension on quads and protect knee joint.'
      },
      {
        mistake: 'Letting pelvis round forward off the pad at bottom.',
        correction: 'Limit depth to where lumbar spine remains completely flat against seat.'
      }
    ],
    fatigueIndex: 3,
    sfrTier: 'S',
    recommendedRepRange: { min: 8, max: 12 },
    imageUrl: '/images/exercises/leg-press.webp',
    svgFocusIds: ['quads', 'glutes']
  },
  {
    id: 'ex-leg-extension',
    name: 'Seated Leg Extension',
    slug: 'seated-leg-extension',
    category: 'machine',
    primaryMuscles: ['quadriceps'],
    secondaryMuscles: [],
    equipment: 'Leg Extension Machine',
    setupSteps: [
      'Align knee joint directly with the machine pivot axis.',
      'Set shin pad just above the ankles on lower tibia.',
      'Pull handles upward to lock your hips firmly into the seat.'
    ],
    executionSteps: [
      'Extend legs smoothly until fully straight, squeezing quads hard at the top.',
      'Pause for 1 second at full extension for maximum rectus femoris recruitment.',
      'Lower weight stack slowly over 2-3 seconds until weights hover above the stack.'
    ],
    commonMistakes: [
      {
        mistake: 'Swinging torso and kicking weights up with momentum.',
        correction: 'Lock torso into seat and initiate with pure quadriceps knee extension.'
      }
    ],
    fatigueIndex: 2,
    sfrTier: 'S',
    recommendedRepRange: { min: 10, max: 15 },
    imageUrl: '/images/exercises/leg-extension.webp',
    svgFocusIds: ['quads']
  },
  {
    id: 'ex-romanian-deadlift',
    name: 'Romanian Deadlift (RDL)',
    slug: 'romanian-deadlift',
    category: 'barbell',
    primaryMuscles: ['hamstrings'],
    secondaryMuscles: ['glutes', 'lower_back', 'forearms'],
    equipment: 'Olympic Barbell or Dumbbells',
    setupSteps: [
      'Stand holding bar at hip level, feet hip-width apart with a slight soft knee bend.',
      'Roll shoulders back, engage lats, and pull ribs down to lock a rigid neutral spine.'
    ],
    executionSteps: [
      'Push hips back horizontally as if trying to touch the wall behind you with your glutes.',
      'Keep barbell skimming right against thighs and shins throughout descent.',
      'Descend until you feel an intense, maximal stretch in the hamstrings (typically mid-shin).',
      'Drive hips forward to return to standing, contracting glutes at the top.'
    ],
    commonMistakes: [
      {
        mistake: 'Rounding lumbar spine at bottom of movement.',
        correction: 'Stop descending the moment your hips stop moving backward; going lower rounds spine.'
      },
      {
        mistake: 'Squatting down and bending knees excessively.',
        correction: 'Knee angle remains static after initial slight bend; movement is 100% hip hinge.'
      }
    ],
    fatigueIndex: 4,
    sfrTier: 'S',
    recommendedRepRange: { min: 6, max: 10 },
    imageUrl: '/images/exercises/rdl.webp',
    svgFocusIds: ['hamstrings', 'glutes', 'lower_back']
  },
  {
    id: 'ex-seated-leg-curl',
    name: 'Seated Leg Curl',
    slug: 'seated-leg-curl',
    category: 'machine',
    primaryMuscles: ['hamstrings'],
    secondaryMuscles: ['calves'],
    equipment: 'Seated Leg Curl Machine',
    setupSteps: [
      'Align knee joints with pivot point of the machine.',
      'Fasten thigh clamp securely over knees to prevent thighs from lifting.',
      'Place lower back pad behind ankles/achilles tendon.'
    ],
    executionSteps: [
      'Curl heels back under your seat smoothly through the full active range.',
      'Hold contraction for 1 second, feeling peak hamstring tension.',
      'Return weight slowly over 3 seconds to a full knee extension stretch.'
    ],
    commonMistakes: [
      {
        mistake: 'Loose thigh clamp allowing hips to lift.',
        correction: 'Thigh clamp must be locked down tight to isolate hamstrings without hip compensation.'
      }
    ],
    fatigueIndex: 2,
    sfrTier: 'S',
    recommendedRepRange: { min: 10, max: 15 },
    imageUrl: '/images/exercises/leg-curl.webp',
    svgFocusIds: ['hamstrings']
  },
  {
    id: 'ex-standing-calf-raise',
    name: 'Standing Calf Raise',
    slug: 'standing-calf-raise',
    category: 'machine',
    primaryMuscles: ['calves'],
    secondaryMuscles: [],
    equipment: 'Standing Calf Machine or Smith Machine',
    setupSteps: [
      'Place balls of feet on edge of block, heels hanging off.',
      'Adjust shoulder pads comfortably with knees locked in a soft extension.'
    ],
    executionSteps: [
      'Lower heels as deep as possible into a profound 2-second calf stretch.',
      'Drive up onto big toes as high as possible into full plantarflexion.',
      'Hold the peak contraction for 1 full second before lowering slowly.'
    ],
    commonMistakes: [
      {
        mistake: 'Bouncing rapidly without pausing at stretch.',
        correction: 'The Achilles tendon absorbs elastic energy; a 2-second stretch pause forces muscular work.'
      }
    ],
    fatigueIndex: 1,
    sfrTier: 'A',
    recommendedRepRange: { min: 10, max: 15 },
    imageUrl: '/images/exercises/calf-raise.webp',
    svgFocusIds: ['calves']
  },

  // --- SHOULDERS & ARMS ---
  {
    id: 'ex-overhead-press',
    name: 'Overhead Barbell Press (OHP)',
    slug: 'overhead-barbell-press',
    category: 'barbell',
    primaryMuscles: ['shoulders'],
    secondaryMuscles: ['triceps', 'upper_back', 'abs'],
    equipment: 'Olympic Barbell',
    setupSteps: [
      'Rack bar at collarbone height. Grip bar just outside shoulder width.',
      'Elbows slightly forward of the bar in the front rack position.',
      'Squeeze glutes and brace abs to create a solid pillar with no lower back hyperextension.'
    ],
    executionSteps: [
      'Pull chin back slightly to clear facial path.',
      'Press bar vertically in a straight line upward.',
      'Once bar clears forehead, push head forward back into neutral alignment.',
      'Lock out overhead with bar centered directly over mid-foot.'
    ],
    commonMistakes: [
      {
        mistake: 'Excessive lumbar arching turning lift into an incline press.',
        correction: 'Squeeze glutes and quads tight to lock pelvic tilt.'
      }
    ],
    fatigueIndex: 4,
    sfrTier: 'B',
    recommendedRepRange: { min: 5, max: 8 },
    imageUrl: '/images/exercises/ohp.webp',
    svgFocusIds: ['delts_front', 'delts_side', 'triceps']
  },
  {
    id: 'ex-db-lateral-raise',
    name: 'Dumbbell Lateral Raise',
    slug: 'dumbbell-lateral-raise',
    category: 'dumbbell',
    primaryMuscles: ['shoulders'],
    secondaryMuscles: ['traps'],
    equipment: 'Dumbbells',
    setupSteps: [
      'Stand with feet shoulder-width apart, holding dumbbells at sides or slightly in front.',
      'Hinge forward 5°-10° at the hips with a slight soft bend in the elbows.'
    ],
    executionSteps: [
      'Raise dumbbells out in the scapular plane (roughly 30° forward of pure sideways).',
      'Lead with elbows, raising until hands are parallel to the floor at shoulder height.',
      'Pour water visual: pinky slightly higher than thumb at top.',
      'Lower slowly over 2-3 seconds to prevent momentum.'
    ],
    commonMistakes: [
      {
        mistake: 'Using leg drive and swinging body to hoist heavy weight.',
        correction: 'Drop weight by 30% and perform strict raises with zero body English.'
      }
    ],
    fatigueIndex: 1,
    sfrTier: 'S',
    recommendedRepRange: { min: 12, max: 20 },
    imageUrl: '/images/exercises/lateral-raise.webp',
    svgFocusIds: ['delts_side']
  },
  {
    id: 'ex-incline-db-curl',
    name: 'Incline Dumbbell Biceps Curl',
    slug: 'incline-dumbbell-curl',
    category: 'dumbbell',
    primaryMuscles: ['biceps'],
    secondaryMuscles: ['forearms'],
    equipment: 'Incline Bench (45°-60°) & Dumbbells',
    setupSteps: [
      'Set bench to 45°-60°. Sit back with head and shoulders flat against pad.',
      'Let dumbbells hang straight down behind torso to stretch the long head of the biceps.'
    ],
    executionSteps: [
      'Curl dumbbells upward while supinating wrists (turn palms to face ceiling).',
      'Keep elbows pinned in place behind torso; do not swing elbows forward.',
      'Squeeze biceps forcefully at peak contraction, then lower slowly into the deep stretch.'
    ],
    commonMistakes: [
      {
        mistake: 'Swinging elbows forward during curl.',
        correction: 'Elbows must stay anchored behind torso to isolate the long head stretch.'
      }
    ],
    fatigueIndex: 2,
    sfrTier: 'S',
    recommendedRepRange: { min: 8, max: 12 },
    imageUrl: '/images/exercises/incline-curl.webp',
    svgFocusIds: ['biceps']
  },
  {
    id: 'ex-cable-triceps-pushdown',
    name: 'Cable Triceps Pushdown',
    slug: 'cable-triceps-pushdown',
    category: 'cable',
    primaryMuscles: ['triceps'],
    secondaryMuscles: [],
    equipment: 'Cable Station & Straight or V-Bar',
    setupSteps: [
      'Attach bar to high pulley. Stand with slight forward torso lean.',
      'Pin upper arms to the sides of your ribcage; elbows stay stationary.'
    ],
    executionSteps: [
      'Push bar straight down until arms are fully locked out.',
      'Squeeze triceps intensely for 1 second at bottom.',
      'Allow bar to rise slowly until elbows reach roughly 90 degrees of flexion.'
    ],
    commonMistakes: [
      {
        mistake: 'Letting elbows flare or travel forward and backward.',
        correction: 'Anchor elbows to ribs like a hinge; isolate triceps without shoulder flexion.'
      }
    ],
    fatigueIndex: 1,
    sfrTier: 'S',
    recommendedRepRange: { min: 10, max: 15 },
    imageUrl: '/images/exercises/triceps-pushdown.webp',
    svgFocusIds: ['triceps']
  }
];

export function getExerciseById(id: string): ExerciseGuide | undefined {
  return EXERCISES.find(ex => ex.id === id);
}

export function getExercisesByMuscle(muscle: string): ExerciseGuide[] {
  return EXERCISES.filter(
    ex => ex.primaryMuscles.includes(muscle as any) || ex.secondaryMuscles.includes(muscle as any)
  );
}
