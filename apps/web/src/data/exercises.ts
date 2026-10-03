import type { ExerciseGuide } from '@nextset/shared';

export const EXERCISES: ExerciseGuide[] = [
  // ==========================================
  // --- CHEST (6) ---
  // ==========================================
  {
    id: 'ex-bb-bench-press',
    name: 'Barbell Flat Bench Press',
    slug: 'barbell-bench-press',
    category: 'barbell',
    primaryMuscles: ['chest'],
    secondaryMuscles: ['shoulders', 'triceps'],
    equipment: 'Olympic Barbell & Flat Bench',
    setupSteps: [
      'Lie flat with eyes directly under the racked bar. Plant your feet firmly flat on the floor.',
      'Grip the bar slightly wider than shoulder-width with your thumbs wrapped around.',
      'Pull your shoulder blades down and pinch them together into the bench for a stable base.',
      'Unrack the bar and hold it steady directly over your upper chest with straight arms.'
    ],
    executionSteps: [
      'Lower the bar with control (2-3 seconds) toward your mid/lower chest.',
      'Tuck your elbows at roughly a 45° angle to your body — avoid flaring them out wide.',
      'Touch your chest gently without bouncing, pause for half a second.',
      'Press upward powerfully, pushing the floor away with your feet until arms lock out.'
    ],
    commonMistakes: [
      {
        mistake: 'Flaring elbows outward at 90 degrees.',
        correction: 'Tuck elbows to roughly 45° to protect your shoulders and keep tension on your chest.'
      },
      {
        mistake: 'Bouncing the bar off your chest.',
        correction: 'Lower smoothly and pause briefly. Bouncing risks injury and removes tension from the muscle.'
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
      'Set bench angle to roughly 30 degrees (about 2 notches up).',
      'Sit down with dumbbells resting vertically on your thighs near your knees.',
      'Kick the dumbbells up with your knees one at a time as you lean back onto the pad.',
      'Pinch your shoulder blades together and plant your heels firmly into the floor.'
    ],
    executionSteps: [
      'Lower the dumbbells slowly until you feel a deep, comfortable stretch across your upper chest.',
      'Keep your forearms vertical beneath the weights throughout the descent.',
      'Press upward and slightly inward, stopping just before the dumbbells touch at the top.',
      'Squeeze your upper chest at the top of every rep.'
    ],
    commonMistakes: [
      {
        mistake: 'Bench angle too steep (45° or higher).',
        correction: 'Keep the incline at 30° so the work stays on your upper chest rather than your shoulders.'
      },
      {
        mistake: 'Crashing dumbbells together at the top.',
        correction: 'Keep tension on your pecs by stopping the weights 2 inches apart.'
      }
    ],
    fatigueIndex: 2,
    sfrTier: 'S',
    recommendedRepRange: { min: 8, max: 12 },
    imageUrl: '/images/exercises/incline-db-press.webp',
    svgFocusIds: ['chest', 'delts_front', 'triceps']
  },
  {
    id: 'ex-incline-bb-press',
    name: 'Incline Barbell Bench Press',
    slug: 'incline-barbell-press',
    category: 'barbell',
    primaryMuscles: ['chest'],
    secondaryMuscles: ['shoulders', 'triceps'],
    equipment: 'Incline Bench & Olympic Barbell',
    setupSteps: [
      'Set bench to 30° incline. Lie back with eyes directly under the bar.',
      'Grip the bar slightly wider than shoulder-width with hands evenly spaced.',
      'Pinch your shoulder blades tight into the bench pad.',
      'Unrack the bar and hold it straight over your collarbone.'
    ],
    executionSteps: [
      'Lower the bar in a controlled path toward your upper chest / collarbone.',
      'Keep your elbows tucked at roughly 45° to protect your shoulder joints.',
      'Touch your upper chest lightly, pause for a split second.',
      'Drive the bar straight back up to arm lockout.'
    ],
    commonMistakes: [
      {
        mistake: 'Lowering the bar too low toward the belly.',
        correction: 'Aim for your upper chest / collarbone to target the upper pecs directly.'
      },
      {
        mistake: 'Arching lower back excessively off the pad.',
        correction: 'Keep your lower back naturally supported by the bench to maintain the true incline angle.'
      }
    ],
    fatigueIndex: 3,
    sfrTier: 'A',
    recommendedRepRange: { min: 6, max: 10 },
    imageUrl: '/images/exercises/bench-press.webp',
    svgFocusIds: ['chest', 'delts_front', 'triceps']
  },
  {
    id: 'ex-flat-db-press',
    name: 'Flat Dumbbell Bench Press',
    slug: 'flat-dumbbell-press',
    category: 'dumbbell',
    primaryMuscles: ['chest'],
    secondaryMuscles: ['shoulders', 'triceps'],
    equipment: 'Flat Bench & Pair of Dumbbells',
    setupSteps: [
      'Sit on edge of flat bench with dumbbells resting on thighs.',
      'Kick dumbbells to chest with knees as you lie flat.',
      'Set feet wide and flat on the floor; pinch shoulder blades together.',
      'Hold dumbbells at chest height with palms facing forward or slightly angled.'
    ],
    executionSteps: [
      'Press dumbbells up until arms are fully extended over chest.',
      'Lower slowly over 2-3 seconds, allowing elbows to travel below bench level for a deep stretch.',
      'Keep wrists aligned directly above elbows.',
      'Press back up in a smooth arch, squeezing your chest at the top.'
    ],
    commonMistakes: [
      {
        mistake: 'Dropping elbows too deep into shoulder pain.',
        correction: 'Only lower until you feel a good chest stretch; do not force painful joint depth.'
      },
      {
        mistake: 'Bouncing weights at bottom.',
        correction: 'Pause for half a second at the deepest stretch to build strength from a dead stop.'
      }
    ],
    fatigueIndex: 2,
    sfrTier: 'S',
    recommendedRepRange: { min: 8, max: 12 },
    imageUrl: '/images/exercises/bench-press.webp',
    svgFocusIds: ['chest', 'delts_front', 'triceps']
  },
  {
    id: 'ex-cable-chest-flye',
    name: 'Standing Cable Chest Flye',
    slug: 'cable-chest-flye',
    category: 'cable',
    primaryMuscles: ['chest'],
    secondaryMuscles: ['shoulders'],
    equipment: 'Dual Cable Station & D-Handles',
    setupSteps: [
      'Set cable pulleys at chest height. Attach D-handles.',
      'Grasp handles and step forward into a staggered stance for balance.',
      'Lean your torso forward slightly from the hips with a flat back.',
      'Begin with arms spread wide, elbows slightly bent like hugging a barrel.'
    ],
    executionSteps: [
      'Bring your hands together in front of your chest in a sweeping circular motion.',
      'Focus on squeezing your chest muscles hard as your hands meet.',
      'Hold the contraction for 1 full second at the center.',
      'Return slowly to the starting position until you feel a full stretch across your chest.'
    ],
    commonMistakes: [
      {
        mistake: 'Pressing the weight forward like a bench press instead of flying.',
        correction: 'Lock a slight bend in your elbows and maintain that exact bend throughout the movement.'
      },
      {
        mistake: 'Using body momentum to swing the cables.',
        correction: 'Keep your torso stationary and let your chest do all the work.'
      }
    ],
    fatigueIndex: 1,
    sfrTier: 'S',
    recommendedRepRange: { min: 10, max: 15 },
    imageUrl: '/images/exercises/cable-flye.webp',
    svgFocusIds: ['chest', 'delts_front']
  },
  {
    id: 'ex-push-up',
    name: 'Standard Push-Up',
    slug: 'standard-push-up',
    category: 'bodyweight',
    primaryMuscles: ['chest'],
    secondaryMuscles: ['triceps', 'shoulders', 'abs'],
    equipment: 'Bodyweight & Floor Mat',
    setupSteps: [
      'Place hands on floor slightly wider than shoulder-width.',
      'Extend legs back, balancing on toes with feet hip-width apart.',
      'Lock your core and glutes so your body forms a straight line from head to heels.'
    ],
    executionSteps: [
      'Lower your body by bending elbows at roughly 45° until your chest hovers 1 inch off the floor.',
      'Keep your neck neutral looking down at the floor.',
      'Push the ground away forcefully until arms are fully straight.',
      'Maintain tight abs throughout the entire rep.'
    ],
    commonMistakes: [
      {
        mistake: 'Sagging hips and arched lower back.',
        correction: 'Squeeze your glutes and brace your abs like you are in a plank.'
      },
      {
        mistake: 'Flaring elbows straight out to the sides.',
        correction: 'Keep elbows tucked at 45° to protect shoulders.'
      }
    ],
    fatigueIndex: 1,
    sfrTier: 'A',
    recommendedRepRange: { min: 12, max: 25 },
    imageUrl: '/images/exercises/bench-press.webp',
    svgFocusIds: ['chest', 'triceps', 'abs']
  },

  // ==========================================
  // --- BACK & LATS (8) ---
  // ==========================================
  {
    id: 'ex-pull-up',
    name: 'Pull-Up',
    slug: 'pull-up',
    category: 'bodyweight',
    primaryMuscles: ['lats', 'upper_back'],
    secondaryMuscles: ['biceps', 'forearms'],
    equipment: 'Pull-Up Bar',
    setupSteps: [
      'Grip the bar slightly wider than shoulder-width with palms facing away from you.',
      'Hang with arms fully extended into a dead hang.',
      'Pull your shoulder blades down and back before starting the pull.'
    ],
    executionSteps: [
      'Drive your elbows down toward your hips and pull your chest up toward the bar.',
      'Continue pulling until your chin clearly clears the bar.',
      'Pause for a beat at the top, squeezing your back.',
      'Lower yourself with control over 2-3 seconds back to a full dead hang.'
    ],
    commonMistakes: [
      {
        mistake: 'Kicking legs or swinging body for momentum.',
        correction: 'Keep legs straight or crossed, squeeze your core, and pull with pure back strength.'
      },
      {
        mistake: 'Cutting reps short without full extension at the bottom.',
        correction: 'Go all the way down to a dead hang on every rep for full lat stretch.'
      }
    ],
    fatigueIndex: 3,
    sfrTier: 'A',
    recommendedRepRange: { min: 6, max: 10 },
    imageUrl: '/images/exercises/pull-up.webp',
    svgFocusIds: ['lats', 'upper_back', 'biceps']
  },
  {
    id: 'ex-lat-pulldown',
    name: 'Cable Lat Pulldown',
    slug: 'lat-pulldown',
    category: 'cable',
    primaryMuscles: ['lats'],
    secondaryMuscles: ['upper_back', 'biceps'],
    equipment: 'Lat Pulldown Machine & Wide Bar',
    setupSteps: [
      'Adjust thigh pad so your knees are firmly anchored under it.',
      'Grip the bar slightly wider than shoulder-width with palms forward.',
      'Sit down with straight arms, chest proud, and slight lean back (10-15°).'
    ],
    executionSteps: [
      'Pull the bar down smoothly by driving your elbows toward your back pockets.',
      'Touch the bar to your upper chest / collarbone.',
      'Squeeze your lats hard at the bottom for 1 second.',
      'Control the bar back up until your arms and lats are fully stretched.'
    ],
    commonMistakes: [
      {
        mistake: 'Leaning back 45 degrees and turning it into a row.',
        correction: 'Stay upright with only a slight natural lean; pull down, not back.'
      },
      {
        mistake: 'Pulling the bar behind the neck.',
        correction: 'Always pull to your front collarbone to protect your neck and rotator cuff.'
      }
    ],
    fatigueIndex: 2,
    sfrTier: 'S',
    recommendedRepRange: { min: 8, max: 12 },
    imageUrl: '/images/exercises/lat-pulldown.webp',
    svgFocusIds: ['lats', 'upper_back', 'biceps']
  },
  {
    id: 'ex-bb-row',
    name: 'Barbell Bent-Over Row',
    slug: 'barbell-bent-over-row',
    category: 'barbell',
    primaryMuscles: ['upper_back', 'lats'],
    secondaryMuscles: ['biceps', 'lower_back', 'forearms'],
    equipment: 'Olympic Barbell & Plates',
    setupSteps: [
      'Stand with feet hip-width apart, bar over mid-foot.',
      'Hinge at the hips until your torso is roughly 45° to the floor with a flat back.',
      'Grip the bar just outside your knees with an overhand grip.',
      'Brace your core tightly to protect your lower back.'
    ],
    executionSteps: [
      'Pull the bar toward your belly button, driving your elbows back past your torso.',
      'Pinch your shoulder blades hard together at the top.',
      'Lower the bar under control until arms are fully extended.',
      'Keep your torso angle steady throughout without bouncing your upper body.'
    ],
    commonMistakes: [
      {
        mistake: 'Standing too upright and shrugging the weight.',
        correction: 'Stay hinged forward at 45° so the resistance works across your back muscles.'
      },
      {
        mistake: 'Rounding your lower back under heavy load.',
        correction: 'Keep your chest up and core braced like in a deadlift.'
      }
    ],
    fatigueIndex: 4,
    sfrTier: 'B',
    recommendedRepRange: { min: 6, max: 10 },
    imageUrl: '/images/exercises/bb-row.webp',
    svgFocusIds: ['upper_back', 'lats', 'lower_back', 'biceps']
  },
  {
    id: 'ex-chest-supported-row',
    name: 'Chest-Supported Incline Row',
    slug: 'chest-supported-row',
    category: 'dumbbell',
    primaryMuscles: ['upper_back', 'traps'],
    secondaryMuscles: ['lats', 'biceps'],
    equipment: 'Incline Bench (30-45°) & Pair of Dumbbells',
    setupSteps: [
      'Set bench to roughly 30° to 45° incline.',
      'Straddle the bench with your chest resting securely against the pad.',
      'Let your arms hang straight down holding dumbbells with palms facing each other.'
    ],
    executionSteps: [
      'Row the dumbbells upward by driving your elbows toward the ceiling.',
      'Pinch your shoulder blades together aggressively at the top.',
      'Hold the peak squeeze for 1 second without lifting your chest off the pad.',
      'Lower the dumbbells slowly to a full stretch.'
    ],
    commonMistakes: [
      {
        mistake: 'Lifting your chest off the bench to use body momentum.',
        correction: 'Keep your chest glued to the pad so your upper back does 100% of the work.'
      },
      {
        mistake: 'Shrugging shoulders up toward ears.',
        correction: 'Pull shoulders down away from ears and drive elbows back.'
      }
    ],
    fatigueIndex: 1,
    sfrTier: 'S',
    recommendedRepRange: { min: 10, max: 15 },
    imageUrl: '/images/exercises/chest-supported-row.webp',
    svgFocusIds: ['upper_back', 'traps', 'lats', 'biceps']
  },
  {
    id: 'ex-seated-cable-row',
    name: 'Seated Cable Row',
    slug: 'seated-cable-row',
    category: 'cable',
    primaryMuscles: ['upper_back', 'lats'],
    secondaryMuscles: ['biceps', 'forearms'],
    equipment: 'Low Cable Row Station & V-Bar Handle',
    setupSteps: [
      'Sit on bench and place feet on footrests with knees slightly bent.',
      'Reach forward to grip the handle and sit back with an upright torso.',
      'Keep your chest high and lower back naturally arched.'
    ],
    executionSteps: [
      'Pull the handle toward your lower stomach, driving your elbows back.',
      'Squeeze your shoulder blades together at the peak of the row.',
      'Slowly extend your arms forward, letting your shoulder blades stretch open.',
      'Keep your torso upright with minimal forward-and-back rocking.'
    ],
    commonMistakes: [
      {
        mistake: 'Swinging your torso back and forth like a rowing boat.',
        correction: 'Lock your torso stationary at 90° and isolate the upper back.'
      },
      {
        mistake: 'Rounding your back at the forward stretch.',
        correction: 'Keep your chest lifted even as arms stretch forward.'
      }
    ],
    fatigueIndex: 2,
    sfrTier: 'S',
    recommendedRepRange: { min: 8, max: 12 },
    imageUrl: '/images/exercises/bb-row.webp',
    svgFocusIds: ['upper_back', 'lats', 'biceps']
  },
  {
    id: 'ex-neutral-lat-pulldown',
    name: 'Neutral-Grip Lat Pulldown',
    slug: 'neutral-grip-lat-pulldown',
    category: 'cable',
    primaryMuscles: ['lats'],
    secondaryMuscles: ['biceps', 'upper_back'],
    equipment: 'Lat Pulldown Station & V-Bar / Close-Grip Handle',
    setupSteps: [
      'Attach a V-bar handle to the high cable pulley.',
      'Anchor thighs firmly beneath the pads.',
      'Grip the handles with palms facing each other.',
      'Lean back slightly (10-15°) with chest lifted.'
    ],
    executionSteps: [
      'Pull the handle straight down to your upper chest.',
      'Keep elbows tracking close to your sides.',
      'Hold the bottom squeeze for 1 second, focusing on your side lats.',
      'Let the weight stretch your lats upward slowly.'
    ],
    commonMistakes: [
      {
        mistake: 'Letting elbows flare wide out.',
        correction: 'Keep elbows tucked in tight to maximize lat leverage.'
      },
      {
        mistake: 'Releasing the weight too fast on the way up.',
        correction: 'Control the upward stretch over 2 full seconds.'
      }
    ],
    fatigueIndex: 2,
    sfrTier: 'S',
    recommendedRepRange: { min: 8, max: 12 },
    imageUrl: '/images/exercises/lat-pulldown.webp',
    svgFocusIds: ['lats', 'biceps']
  },
  {
    id: 'ex-single-arm-db-row',
    name: 'Single-Arm Dumbbell Row',
    slug: 'single-arm-dumbbell-row',
    category: 'dumbbell',
    primaryMuscles: ['lats', 'upper_back'],
    secondaryMuscles: ['biceps', 'forearms'],
    equipment: 'Flat Bench & Single Dumbbell',
    setupSteps: [
      'Place one knee and same-side hand on a flat bench for support.',
      'Plant the other foot out wide on the floor for balance.',
      'Hold the dumbbell in your free hand with arm hanging straight down.',
      'Keep your back flat and parallel to the floor.'
    ],
    executionSteps: [
      'Pull the dumbbell up toward your hip, driving with your elbow.',
      'Do not rotate your torso — keep your shoulders level with the floor.',
      'Squeeze your lat hard at the top position.',
      'Lower the dumbbell slowly to a full hanging stretch.'
    ],
    commonMistakes: [
      {
        mistake: 'Twisting the torso to yank the weight up.',
        correction: 'Keep your shoulders square and pull only with your back and arm.'
      },
      {
        mistake: 'Pulling weight straight to your armpit instead of hip.',
        correction: 'Pull in an arc toward your hip to target the lats instead of biceps.'
      }
    ],
    fatigueIndex: 2,
    sfrTier: 'S',
    recommendedRepRange: { min: 8, max: 12 },
    imageUrl: '/images/exercises/bb-row.webp',
    svgFocusIds: ['lats', 'upper_back', 'biceps']
  },
  {
    id: 'ex-cable-face-pull',
    name: 'Cable Face Pull',
    slug: 'cable-face-pull',
    category: 'cable',
    primaryMuscles: ['upper_back', 'shoulders'],
    secondaryMuscles: ['traps'],
    equipment: 'Cable Station & Rope Attachment',
    setupSteps: [
      'Set cable pulley at upper chest / eye height.',
      'Attach a rope attachment and grip with thumbs facing backward.',
      'Step back so the weight is suspended; take a solid athletic stance.'
    ],
    executionSteps: [
      'Pull the center of the rope straight toward your nose / eyes.',
      'Flare your elbows wide and rotate your hands backward at the end of the pull.',
      'Squeeze the back of your shoulders and upper back for 1 second.',
      'Extend arms slowly back to start.'
    ],
    commonMistakes: [
      {
        mistake: 'Using too much weight and leaning backward.',
        correction: 'Use moderate weight with strict posture; focus on external rotation.'
      },
      {
        mistake: 'Dropping elbows low.',
        correction: 'Keep elbows high and wide, level with your ears at the peak.'
      }
    ],
    fatigueIndex: 1,
    sfrTier: 'S',
    recommendedRepRange: { min: 12, max: 15 },
    imageUrl: '/images/exercises/bb-row.webp',
    svgFocusIds: ['upper_back', 'shoulders', 'traps']
  },

  // ==========================================
  // --- SHOULDERS (5) ---
  // ==========================================
  {
    id: 'ex-overhead-press',
    name: 'Overhead Barbell Press (OHP)',
    slug: 'overhead-barbell-press',
    category: 'barbell',
    primaryMuscles: ['shoulders'],
    secondaryMuscles: ['triceps', 'upper_back', 'abs'],
    equipment: 'Olympic Barbell & Squat Rack',
    setupSteps: [
      'Set the bar at collarbone height. Grip just outside shoulder-width.',
      'Rest bar across your front shoulders with elbows pointing slightly forward.',
      'Step back, plant feet shoulder-width, squeeze your glutes and brace your abs.'
    ],
    executionSteps: [
      'Tilt your head back slightly and press the bar straight up in a vertical line.',
      'Once the bar clears your forehead, push your head forward to neutral.',
      'Lock out arms with the bar directly over the crown of your head.',
      'Lower the bar with control back down to your collarbone.'
    ],
    commonMistakes: [
      {
        mistake: 'Arching your lower back to turn it into an incline press.',
        correction: 'Squeeze glutes and abs hard throughout to keep your spine neutral.'
      },
      {
        mistake: 'Pressing the bar forward around your face.',
        correction: 'Move your head out of the way so the bar travels in a straight vertical path.'
      }
    ],
    fatigueIndex: 4,
    sfrTier: 'A',
    recommendedRepRange: { min: 5, max: 8 },
    imageUrl: '/images/exercises/overhead-press.webp',
    svgFocusIds: ['shoulders', 'triceps', 'upper_back']
  },
  {
    id: 'ex-seated-db-press',
    name: 'Seated Dumbbell Shoulder Press',
    slug: 'seated-db-shoulder-press',
    category: 'dumbbell',
    primaryMuscles: ['shoulders'],
    secondaryMuscles: ['triceps'],
    equipment: 'Upright Bench (75-80°) & Pair of Dumbbells',
    setupSteps: [
      'Set bench backrest almost upright (around 75-80°, not completely 90°).',
      'Sit back with dumbbells resting on thighs.',
      'Kick dumbbells to shoulder height one at a time.',
      'Hold weights with elbows slightly angled forward (not flared wide).'
    ],
    executionSteps: [
      'Press dumbbells upward until arms are extended overhead.',
      'Stop just short of banging weights together at the top.',
      'Lower under control until dumbbells touch ear level.',
      'Press smoothly back up without pausing.'
    ],
    commonMistakes: [
      {
        mistake: 'Setting bench at flat 90° causing shoulder pinching.',
        correction: 'Angle bench back 1 notch to 75-80° for natural shoulder travel.'
      },
      {
        mistake: 'Flaring elbows directly out to the sides.',
        correction: 'Bring elbows 30° forward into the scapular plane.'
      }
    ],
    fatigueIndex: 2,
    sfrTier: 'S',
    recommendedRepRange: { min: 8, max: 12 },
    imageUrl: '/images/exercises/overhead-press.webp',
    svgFocusIds: ['shoulders', 'triceps']
  },
  {
    id: 'ex-db-lateral-raise',
    name: 'Dumbbell Lateral Raise',
    slug: 'dumbbell-lateral-raise',
    category: 'dumbbell',
    primaryMuscles: ['shoulders'],
    secondaryMuscles: ['traps'],
    equipment: 'Pair of Light Dumbbells',
    setupSteps: [
      'Stand with feet hip-width apart holding light dumbbells at your sides.',
      'Lean your torso forward slightly (about 10°) to match side delt fibers.',
      'Maintain a slight, fixed bend in your elbows.'
    ],
    executionSteps: [
      'Raise the dumbbells out to the sides, leading with your elbows.',
      'Think of pouring water from a pitcher at the top — pinkies slightly higher than thumbs.',
      'Stop when arms reach parallel to the floor (shoulder height).',
      'Lower slowly over 2-3 seconds to prevent gravity from doing the work.'
    ],
    commonMistakes: [
      {
        mistake: 'Using heavy weights and swinging with hips and knees.',
        correction: 'Drop weight by 50% and raise smoothly with zero body swing.'
      },
      {
        mistake: 'Shrugging traps up toward ears.',
        correction: 'Keep shoulders pushed down; push dumbbells outward away from your body.'
      }
    ],
    fatigueIndex: 1,
    sfrTier: 'S',
    recommendedRepRange: { min: 12, max: 15 },
    imageUrl: '/images/exercises/db-lateral-raise.webp',
    svgFocusIds: ['shoulders']
  },
  {
    id: 'ex-cable-lateral-raise',
    name: 'Cable Lateral Raise',
    slug: 'cable-lateral-raise',
    category: 'cable',
    primaryMuscles: ['shoulders'],
    secondaryMuscles: ['traps'],
    equipment: 'Single Cable Pulley & Cuff or D-Handle',
    setupSteps: [
      'Set cable pulley at knee height or lowest setting.',
      'Stand sideways to cable station, holding handle with far hand across body.',
      'Hold onto the station pole with your free hand for stability.'
    ],
    executionSteps: [
      'Raise arm out to the side until parallel to the floor.',
      'Lead with your elbow and keep arm in line with your side.',
      'Hold for a half-second peak squeeze at shoulder height.',
      'Lower under steady cable tension across your body.'
    ],
    commonMistakes: [
      {
        mistake: 'Raising weight too high above shoulder level.',
        correction: 'Stop at shoulder height to keep tension on the side delt rather than the trap.'
      },
      {
        mistake: 'Jerking body away from the cable.',
        correction: 'Stay steady and let the cable resistance work smoothly.'
      }
    ],
    fatigueIndex: 1,
    sfrTier: 'S',
    recommendedRepRange: { min: 12, max: 15 },
    imageUrl: '/images/exercises/db-lateral-raise.webp',
    svgFocusIds: ['shoulders']
  },
  {
    id: 'ex-reverse-pec-deck',
    name: 'Reverse Pec Deck Flye',
    slug: 'reverse-pec-deck-flye',
    category: 'machine',
    primaryMuscles: ['shoulders', 'upper_back'],
    secondaryMuscles: ['traps'],
    equipment: 'Pec Deck / Rear Delt Machine',
    setupSteps: [
      'Adjust seat height so handles are level with your shoulders.',
      'Sit facing the machine pad with chest pressed firmly against it.',
      'Grip the horizontal or vertical handles with arms extended forward.'
    ],
    executionSteps: [
      'Drive your hands outward and backward in a wide arc.',
      'Focus on using the back of your shoulders to pull the weight.',
      'Squeeze your rear delts hard at the end of the motion.',
      'Return slowly to the starting position without letting the weight plates slam.'
    ],
    commonMistakes: [
      {
        mistake: 'Bending elbows excessively and turning it into a row.',
        correction: 'Keep arms nearly straight with only a slight soft elbow bend.'
      },
      {
        mistake: 'Shrugging shoulders into your neck.',
        correction: 'Depress shoulders down and pull wide.'
      }
    ],
    fatigueIndex: 1,
    sfrTier: 'S',
    recommendedRepRange: { min: 12, max: 15 },
    imageUrl: '/images/exercises/bb-row.webp',
    svgFocusIds: ['shoulders', 'upper_back']
  },

  // ==========================================
  // --- QUADS & GLUTES (7) ---
  // ==========================================
  {
    id: 'ex-barbell-squat',
    name: 'Barbell Back Squat',
    slug: 'barbell-back-squat',
    category: 'barbell',
    primaryMuscles: ['quadriceps', 'glutes'],
    secondaryMuscles: ['hamstrings', 'lower_back', 'abs', 'calves'],
    equipment: 'Olympic Barbell & Squat Rack',
    setupSteps: [
      'Step under the bar and rest it across your upper traps (high bar).',
      'Grip the bar firmly, pull elbows down to create a tight upper back shelf.',
      'Unrack, take 2 steps back, set feet slightly wider than shoulder-width with toes angled out 15-30°.',
      'Take a deep belly breath and brace your core tightly.'
    ],
    executionSteps: [
      'Initiate by pushing hips back and bending knees simultaneously.',
      'Keep your chest high and drive knees out in line with your toes.',
      'Descend until hip crease drops just below the top of your knees (parallel).',
      'Drive up through your whole foot, pushing the floor away to standing.'
    ],
    commonMistakes: [
      {
        mistake: 'Knees caving inward (valgus collapse) on the way up.',
        correction: 'Actively push your knees outward over your toes as you drive up.'
      },
      {
        mistake: 'Rising on your toes with heels lifting.',
        correction: 'Keep weight centered over your mid-foot and push through your heels and balls of feet equally.'
      }
    ],
    fatigueIndex: 5,
    sfrTier: 'A',
    recommendedRepRange: { min: 5, max: 8 },
    imageUrl: '/images/exercises/barbell-squat.webp',
    svgFocusIds: ['quadriceps', 'glutes', 'hamstrings', 'lower_back']
  },
  {
    id: 'ex-leg-press',
    name: '45° Leg Press',
    slug: '45-leg-press',
    category: 'machine',
    primaryMuscles: ['quadriceps'],
    secondaryMuscles: ['glutes', 'hamstrings'],
    equipment: '45-Degree Incline Leg Press Machine',
    setupSteps: [
      'Sit deep in the seat with your lower back and glutes pressed flat against the pad.',
      'Place feet shoulder-width on platform, middle or slightly lower to emphasize quads.',
      'Release safety handles while holding side handles to keep your hips glued down.'
    ],
    executionSteps: [
      'Lower the sled slowly until your knees bend to roughly 90 degrees.',
      'Do not allow your lower back or tailbone to lift off the seat.',
      'Drive the platform up smoothly through your whole foot.',
      'Stop just before your knees fully lock out to maintain muscle tension.'
    ],
    commonMistakes: [
      {
        mistake: 'Letting your lower back round off the seat at the bottom.',
        correction: 'Pull yourself into the seat using the side handles; stop descent before tailbone lifts.'
      },
      {
        mistake: 'Locking knees aggressively at the top.',
        correction: 'Keep a soft bend in your knees at the top to protect joints.'
      }
    ],
    fatigueIndex: 3,
    sfrTier: 'S',
    recommendedRepRange: { min: 8, max: 12 },
    imageUrl: '/images/exercises/leg-press.webp',
    svgFocusIds: ['quadriceps', 'glutes']
  },
  {
    id: 'ex-hack-squat',
    name: 'Machine Hack Squat',
    slug: 'machine-hack-squat',
    category: 'machine',
    primaryMuscles: ['quadriceps'],
    secondaryMuscles: ['glutes'],
    equipment: 'Hack Squat Machine',
    setupSteps: [
      'Step onto the platform with shoulders anchored under the shoulder pads.',
      'Press your entire back flat against the backrest.',
      'Place feet shoulder-width on the platform with toes slightly pointed out.',
      'Disengage the safety levers using side handles.'
    ],
    executionSteps: [
      'Lower down smoothly, pushing your knees forward over your toes.',
      'Descend until thighs are at least parallel to the foot platform.',
      'Drive through your mid-foot and heels to push the sled back up.',
      'Stop just shy of full knee lockout to preserve continuous quad tension.'
    ],
    commonMistakes: [
      {
        mistake: 'Heels peeling off the platform.',
        correction: 'Move feet slightly forward on the platform so your entire foot stays planted.'
      },
      {
        mistake: 'Bouncing at the bottom turnaround.',
        correction: 'Pause for a brief half-second at full depth before driving up.'
      }
    ],
    fatigueIndex: 3,
    sfrTier: 'S',
    recommendedRepRange: { min: 8, max: 12 },
    imageUrl: '/images/exercises/barbell-squat.webp',
    svgFocusIds: ['quadriceps', 'glutes']
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
      'Adjust back pad so your knees align directly with the machine pivot point.',
      'Set shin pad so it rests on lower shins just above your ankles.',
      'Sit back and grip the side handles tightly to anchor your hips into the seat.'
    ],
    executionSteps: [
      'Extend your legs upward in a smooth, powerful motion.',
      'Lock out your knees and squeeze your quadriceps hard at the top for 1 full second.',
      'Lower the weight with control over 2-3 seconds.',
      'Stop before the weight stack touches to keep constant tension.'
    ],
    commonMistakes: [
      {
        mistake: 'Kicking the weight up with jerky speed.',
        correction: 'Control the motion strictly; squeeze hard at the top and lower slowly.'
      },
      {
        mistake: 'Hips lifting off the seat.',
        correction: 'Pull up on the side handles to keep your pelvis glued down.'
      }
    ],
    fatigueIndex: 1,
    sfrTier: 'S',
    recommendedRepRange: { min: 10, max: 15 },
    imageUrl: '/images/exercises/leg-extension.webp',
    svgFocusIds: ['quadriceps']
  },
  {
    id: 'ex-bulgarian-split-squat',
    name: 'Bulgarian Split Squat',
    slug: 'bulgarian-split-squat',
    category: 'dumbbell',
    primaryMuscles: ['quadriceps', 'glutes'],
    secondaryMuscles: ['hamstrings', 'calves'],
    equipment: 'Flat Bench & Pair of Dumbbells',
    setupSteps: [
      'Stand about 2 feet in front of a flat bench holding dumbbells at sides.',
      'Reach one foot back and rest the top of your foot flat on the bench pad.',
      'Keep your chest tall and core braced.'
    ],
    executionSteps: [
      'Lower your hips straight down by bending your front knee.',
      'Descend until your back knee almost touches the floor.',
      'Keep your front knee tracking in line with your front foot.',
      'Drive through your front heel to return to the top position.'
    ],
    commonMistakes: [
      {
        mistake: 'Front foot placed too close to the bench.',
        correction: 'Step out far enough so your front knee stays roughly over your ankle.'
      },
      {
        mistake: 'Pushing too hard through the back foot.',
        correction: 'Use the back foot only for balance; 90% of the force should come from the front leg.'
      }
    ],
    fatigueIndex: 3,
    sfrTier: 'S',
    recommendedRepRange: { min: 8, max: 12 },
    imageUrl: '/images/exercises/barbell-squat.webp',
    svgFocusIds: ['quadriceps', 'glutes']
  },
  {
    id: 'ex-goblet-squat',
    name: 'Dumbbell Goblet Squat',
    slug: 'dumbbell-goblet-squat',
    category: 'dumbbell',
    primaryMuscles: ['quadriceps', 'glutes'],
    secondaryMuscles: ['abs', 'calves'],
    equipment: 'Single Dumbbell or Kettlebell',
    setupSteps: [
      'Stand with feet slightly wider than shoulder-width, toes angled out slightly.',
      'Hold a dumbbell vertically against your upper chest with both hands under the top plate.',
      'Keep elbows tucked in close to your ribs.'
    ],
    executionSteps: [
      'Squat down by pushing hips back and spreading your knees outward.',
      'Descend between your knees until your elbows touch your inner thighs.',
      'Keep your chest high and back flat.',
      'Drive through your feet to stand back up, squeezing glutes at the top.'
    ],
    commonMistakes: [
      {
        mistake: 'Letting the dumbbell pull your torso forward.',
        correction: 'Keep your chest proud and upper back braced tight.'
      },
      {
        mistake: 'Not hitting full depth.',
        correction: 'The goblet squat allows deep natural hip flexion; descend past parallel comfortably.'
      }
    ],
    fatigueIndex: 2,
    sfrTier: 'A',
    recommendedRepRange: { min: 10, max: 15 },
    imageUrl: '/images/exercises/barbell-squat.webp',
    svgFocusIds: ['quadriceps', 'glutes']
  },
  {
    id: 'ex-walking-lunge',
    name: 'Walking Dumbbell Lunge',
    slug: 'walking-dumbbell-lunge',
    category: 'dumbbell',
    primaryMuscles: ['quadriceps', 'glutes'],
    secondaryMuscles: ['hamstrings', 'calves'],
    equipment: 'Pair of Dumbbells & Open Floor Space',
    setupSteps: [
      'Stand tall holding dumbbells at your sides with arms straight.',
      'Look straight ahead with shoulders pulled back and core braced.'
    ],
    executionSteps: [
      'Take a comfortable forward step with one leg.',
      'Lower your hips until your back knee gently taps or hovers 1 inch off the floor.',
      'Drive through your front heel to step forward directly into the next lunge with the opposite leg.',
      'Maintain an upright torso and steady balance throughout.'
    ],
    commonMistakes: [
      {
        mistake: 'Steps too short, pushing front knee way past toes.',
        correction: 'Take generous strides so both front and back knees bend to roughly 90°.'
      },
      {
        mistake: 'Banging the back knee into the hard floor.',
        correction: 'Control the descent smoothly and tap gently.'
      }
    ],
    fatigueIndex: 3,
    sfrTier: 'A',
    recommendedRepRange: { min: 10, max: 16 },
    imageUrl: '/images/exercises/barbell-squat.webp',
    svgFocusIds: ['quadriceps', 'glutes']
  },

  // ==========================================
  // --- HAMSTRINGS & LOWER BACK (5) ---
  // ==========================================
  {
    id: 'ex-romanian-deadlift',
    name: 'Romanian Deadlift (Barbell RDL)',
    slug: 'romanian-deadlift',
    category: 'barbell',
    primaryMuscles: ['hamstrings', 'glutes'],
    secondaryMuscles: ['lower_back', 'forearms'],
    equipment: 'Olympic Barbell & Plates',
    setupSteps: [
      'Stand holding the barbell at hip height with an overhand grip, feet hip-width.',
      'Unlock your knees slightly — keep this soft knee angle locked throughout.',
      'Pull your shoulder blades back and brace your core tightly.'
    ],
    executionSteps: [
      'Push your hips straight back toward the wall behind you as if closing a car door.',
      'Keep the bar skimming close against your thighs and shins.',
      'Lower until you feel a deep, strong stretch in your hamstrings (usually mid-shin).',
      'Drive your hips forward and squeeze your glutes hard at the top.'
    ],
    commonMistakes: [
      {
        mistake: 'Squatting the weight down by bending knees too much.',
        correction: 'The RDL is a pure hip hinge; push hips backward, do not bend knees further.'
      },
      {
        mistake: 'Rounding the lower back to reach lower to the floor.',
        correction: 'Stop as soon as your hips stop moving backward; depth is determined by hamstring flexibility.'
      }
    ],
    fatigueIndex: 4,
    sfrTier: 'S',
    recommendedRepRange: { min: 6, max: 10 },
    imageUrl: '/images/exercises/romanian-deadlift.webp',
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
      'Adjust back pad so your knees align with the machine pivot axis.',
      'Lower the thigh clamp firmly onto your thighs to lock your body down.',
      'Place lower leg pad on lower calves, just above the Achilles tendon.'
    ],
    executionSteps: [
      'Curl your heels back toward your seat in a smooth, powerful sweep.',
      'Squeeze your hamstrings hard at full knee flexion for 1 second.',
      'Slowly release the weight forward over 3 seconds.',
      'Feel the deep stretch behind your knees at the top before starting the next rep.'
    ],
    commonMistakes: [
      {
        mistake: 'Loose thigh clamp allowing hips to lift.',
        correction: 'Lock the thigh pad down tightly so your pelvis cannot shift.'
      },
      {
        mistake: 'Letting the weight stack slam back up.',
        correction: 'Control the return motion to maximize muscle growth during the stretch.'
      }
    ],
    fatigueIndex: 1,
    sfrTier: 'S',
    recommendedRepRange: { min: 10, max: 15 },
    imageUrl: '/images/exercises/seated-leg-curl.webp',
    svgFocusIds: ['hamstrings']
  },
  {
    id: 'ex-lying-leg-curl',
    name: 'Lying Leg Curl',
    slug: 'lying-leg-curl',
    category: 'machine',
    primaryMuscles: ['hamstrings'],
    secondaryMuscles: ['calves'],
    equipment: 'Lying Leg Curl Machine',
    setupSteps: [
      'Lie face down on the bench with knees just off the edge of the pad.',
      'Set the lever pad so it rests on the back of your lower legs above ankles.',
      'Grip the side handles and press your hips firmly into the bench.'
    ],
    executionSteps: [
      'Curl your heels up toward your glutes as far as possible.',
      'Keep your hips pressed flat against the pad throughout.',
      'Pause and squeeze your hamstrings for 1 second at the top.',
      'Lower the weight with control back to a full stretch.'
    ],
    commonMistakes: [
      {
        mistake: 'Hips lifting off the bench to cheat the weight up.',
        correction: 'Keep your hips glued down to isolate the hamstrings cleanly.'
      },
      {
        mistake: 'Jerking with momentum.',
        correction: 'Use controlled speed with an intentional pause at peak contraction.'
      }
    ],
    fatigueIndex: 1,
    sfrTier: 'S',
    recommendedRepRange: { min: 10, max: 15 },
    imageUrl: '/images/exercises/seated-leg-curl.webp',
    svgFocusIds: ['hamstrings']
  },
  {
    id: 'ex-dumbbell-rdl',
    name: 'Dumbbell Romanian Deadlift',
    slug: 'dumbbell-romanian-deadlift',
    category: 'dumbbell',
    primaryMuscles: ['hamstrings', 'glutes'],
    secondaryMuscles: ['lower_back', 'forearms'],
    equipment: 'Pair of Heavy Dumbbells',
    setupSteps: [
      'Stand tall holding dumbbells in front of thighs with palms facing you.',
      'Keep feet hip-width apart and unlock knees slightly.',
      'Brace your core and keep shoulders back.'
    ],
    executionSteps: [
      'Push your hips back as you slide the dumbbells down the front of your legs.',
      'Keep the weights close to your shins throughout the descent.',
      'Stop when you feel a maximum stretch in your hamstrings.',
      'Drive hips forward to stand tall and squeeze glutes.'
    ],
    commonMistakes: [
      {
        mistake: 'Letting dumbbells drift away from legs.',
        correction: 'Keep weights in contact with thighs/shins to prevent strain on your lower back.'
      },
      {
        mistake: 'Looking straight up and straining your neck.',
        correction: 'Keep neck aligned with your spine looking 4 feet ahead on the floor.'
      }
    ],
    fatigueIndex: 3,
    sfrTier: 'S',
    recommendedRepRange: { min: 8, max: 12 },
    imageUrl: '/images/exercises/romanian-deadlift.webp',
    svgFocusIds: ['hamstrings', 'glutes', 'lower_back']
  },
  {
    id: 'ex-hyperextension',
    name: '45° Back Hyperextension',
    slug: '45-back-hyperextension',
    category: 'bodyweight',
    primaryMuscles: ['lower_back', 'glutes', 'hamstrings'],
    secondaryMuscles: [],
    equipment: '45-Degree Hyperextension Bench',
    setupSteps: [
      'Step onto the bench and lock heels under the back foot pads.',
      'Adjust hip pad so the top edge rests just below your hip crease.',
      'Cross arms over your chest or hold a light plate.'
    ],
    executionSteps: [
      'Hinge forward at the hips, lowering your torso toward the floor.',
      'Feel a full stretch in your hamstrings and lower back.',
      'Raise your torso back up until your body forms a straight line.',
      'Squeeze your glutes and lower back at the top; do not over-arch.'
    ],
    commonMistakes: [
      {
        mistake: 'Hyperextending and arching spine backward aggressively at the top.',
        correction: 'Stop when your body forms a straight line from head to heels.'
      },
      {
        mistake: 'Pad set too high restricting hip flexion.',
        correction: 'Set pad below hip crease so you can bend freely from the hips.'
      }
    ],
    fatigueIndex: 2,
    sfrTier: 'A',
    recommendedRepRange: { min: 10, max: 15 },
    imageUrl: '/images/exercises/romanian-deadlift.webp',
    svgFocusIds: ['lower_back', 'glutes', 'hamstrings']
  },

  // ==========================================
  // --- ARMS: TRICEPS (5) ---
  // ==========================================
  {
    id: 'ex-triceps-pushdown',
    name: 'Cable Triceps Pushdown',
    slug: 'cable-triceps-pushdown',
    category: 'cable',
    primaryMuscles: ['triceps'],
    secondaryMuscles: [],
    equipment: 'Cable Station & Straight or V-Bar',
    setupSteps: [
      'Set cable pulley to highest setting with a straight bar or V-bar.',
      'Grip the bar with an overhand grip, hands roughly 6 inches apart.',
      'Step back slightly, lean forward 10°, and pin elbows to your sides.'
    ],
    executionSteps: [
      'Push the bar straight down by extending your elbows until arms are locked out.',
      'Squeeze your triceps intensely at the bottom for 1 second.',
      'Allow the bar to rise slowly until elbows reach roughly 90 degrees.',
      'Keep your upper arms completely motionless throughout.'
    ],
    commonMistakes: [
      {
        mistake: 'Elbows drifting forward and backward during the rep.',
        correction: 'Keep elbows pinned to your ribs like a door hinge.'
      },
      {
        mistake: 'Using body weight to lean over the bar and push.',
        correction: 'Keep your torso stationary and push only by straightening your arms.'
      }
    ],
    fatigueIndex: 1,
    sfrTier: 'S',
    recommendedRepRange: { min: 10, max: 15 },
    imageUrl: '/images/exercises/triceps-pushdown.webp',
    svgFocusIds: ['triceps']
  },
  {
    id: 'ex-overhead-cable-extension',
    name: 'Overhead Cable Triceps Extension',
    slug: 'overhead-cable-triceps-extension',
    category: 'cable',
    primaryMuscles: ['triceps'],
    secondaryMuscles: [],
    equipment: 'Cable Station & Rope Attachment',
    setupSteps: [
      'Set pulley at head height or lowest setting with a rope attachment.',
      'Grip rope, turn around facing away from the station, and bring hands behind head.',
      'Take a staggered stance and lean forward slightly for stability.'
    ],
    executionSteps: [
      'Extend your elbows, pressing your hands forward and spreading the rope apart at lockout.',
      'Squeeze the long head of your triceps hard for 1 second.',
      'Bend elbows slowly to bring hands back behind your head for a deep stretch.',
      'Keep elbows pointing forward, not flared out wide.'
    ],
    commonMistakes: [
      {
        mistake: 'Letting elbows flare wide out to the sides.',
        correction: 'Keep elbows tucked in pointing forward toward where you are facing.'
      },
      {
        mistake: 'Arching lower back under the weight.',
        correction: 'Brace your abs tightly and lean forward into a stable lunge stance.'
      }
    ],
    fatigueIndex: 1,
    sfrTier: 'S',
    recommendedRepRange: { min: 10, max: 15 },
    imageUrl: '/images/exercises/triceps-pushdown.webp',
    svgFocusIds: ['triceps']
  },
  {
    id: 'ex-skull-crushers',
    name: 'Skull Crushers (EZ-Bar)',
    slug: 'ez-bar-skull-crushers',
    category: 'barbell',
    primaryMuscles: ['triceps'],
    secondaryMuscles: [],
    equipment: 'Flat Bench & EZ-Curl Bar',
    setupSteps: [
      'Lie flat on bench holding an EZ-bar over your chest with narrow overhand grip.',
      'Angle your upper arms back slightly (10-15°) toward your head rather than straight up.',
      'Lock your elbows into position.'
    ],
    executionSteps: [
      'Bend at elbows to lower the bar toward the top of your forehead / bench behind head.',
      'Keep your upper arms steady and motionless.',
      'Feel the deep stretch in your triceps at the bottom.',
      'Extend your elbows to press the bar back up to the angled starting position.'
    ],
    commonMistakes: [
      {
        mistake: 'Letting elbows flare outward during the press.',
        correction: 'Keep elbows tucked shoulder-width apart to protect elbow joints.'
      },
      {
        mistake: 'Dropping the bar straight to the face.',
        correction: 'Aim for the crown of your head or bench behind head for safety and better stretch.'
      }
    ],
    fatigueIndex: 2,
    sfrTier: 'A',
    recommendedRepRange: { min: 8, max: 12 },
    imageUrl: '/images/exercises/triceps-pushdown.webp',
    svgFocusIds: ['triceps']
  },
  {
    id: 'ex-close-grip-bench',
    name: 'Close-Grip Barbell Bench Press',
    slug: 'close-grip-bench-press',
    category: 'barbell',
    primaryMuscles: ['triceps', 'chest'],
    secondaryMuscles: ['shoulders'],
    equipment: 'Olympic Barbell & Flat Bench',
    setupSteps: [
      'Lie on flat bench under the bar.',
      'Grip the bar with hands shoulder-width apart (roughly 12-14 inches apart).',
      'Pinch shoulder blades into the bench and plant feet firmly.'
    ],
    executionSteps: [
      'Unrack the bar and hold it steady over upper chest.',
      'Lower bar to lower chest while keeping elbows tucked tightly to your ribs.',
      'Touch chest lightly without bouncing.',
      'Press up forcefully, driving through your triceps to full arm extension.'
    ],
    commonMistakes: [
      {
        mistake: 'Gripping the bar with hands only 4 inches apart.',
        correction: 'Grip at full shoulder-width; super-narrow grips strain wrists without helping triceps.'
      },
      {
        mistake: 'Flaring elbows outward.',
        correction: 'Keep elbows brushing your ribcage throughout the movement.'
      }
    ],
    fatigueIndex: 3,
    sfrTier: 'A',
    recommendedRepRange: { min: 6, max: 10 },
    imageUrl: '/images/exercises/bench-press.webp',
    svgFocusIds: ['triceps', 'chest', 'delts_front']
  },
  {
    id: 'ex-triceps-dips',
    name: 'Parallel Bar Triceps Dips',
    slug: 'parallel-bar-dips',
    category: 'bodyweight',
    primaryMuscles: ['triceps'],
    secondaryMuscles: ['chest', 'shoulders'],
    equipment: 'Dip Station / Parallel Bars',
    setupSteps: [
      'Mount the parallel bars with arms fully straight supporting bodyweight.',
      'Keep torso upright (vertical) to focus directly on triceps.',
      'Bend knees slightly and cross ankles.'
    ],
    executionSteps: [
      'Lower your body by bending elbows straight back.',
      'Descend until elbows reach a 90-degree bend.',
      'Keep elbows tucked close to your sides — do not flare.',
      'Push through your palms to return to full arm lockout.'
    ],
    commonMistakes: [
      {
        mistake: 'Leaning forward 45° shifting work to the chest.',
        correction: 'Stay upright to keep the work concentrated on your triceps.'
      },
      {
        mistake: 'Dropping into extreme depth causing shoulder strain.',
        correction: 'Stop at 90° elbow bend where upper arms are parallel to the floor.'
      }
    ],
    fatigueIndex: 3,
    sfrTier: 'A',
    recommendedRepRange: { min: 8, max: 12 },
    imageUrl: '/images/exercises/triceps-pushdown.webp',
    svgFocusIds: ['triceps', 'chest', 'delts_front']
  },

  // ==========================================
  // --- ARMS: BICEPS & FOREARMS (5) ---
  // ==========================================
  {
    id: 'ex-incline-db-curl',
    name: 'Incline Dumbbell Biceps Curl',
    slug: 'incline-dumbbell-curl',
    category: 'dumbbell',
    primaryMuscles: ['biceps'],
    secondaryMuscles: ['forearms'],
    equipment: 'Incline Bench (45-60°) & Pair of Dumbbells',
    setupSteps: [
      'Set bench to roughly 45° to 60° incline.',
      'Sit back with head and shoulders pressed flat against the pad.',
      'Let arms hang straight down toward the floor holding dumbbells with palms forward.'
    ],
    executionSteps: [
      'Curl the dumbbells up without swinging your upper arms forward.',
      'Rotate your pinkies outward at the top to maximize biceps contraction.',
      'Squeeze hard at the peak for 1 second.',
      'Lower the dumbbells slowly over 3 seconds back to a dead-hang stretch.'
    ],
    commonMistakes: [
      {
        mistake: 'Swinging elbows forward during the curl.',
        correction: 'Keep elbows pointing directly at the floor to maintain tension on the bicep stretch.'
      },
      {
        mistake: 'Lifting head and upper back off the bench.',
        correction: 'Stay glued to the bench pad throughout the entire set.'
      }
    ],
    fatigueIndex: 1,
    sfrTier: 'S',
    recommendedRepRange: { min: 8, max: 12 },
    imageUrl: '/images/exercises/incline-db-curl.webp',
    svgFocusIds: ['biceps', 'forearms']
  },
  {
    id: 'ex-standing-bb-curl',
    name: 'Standing Barbell Biceps Curl',
    slug: 'standing-barbell-curl',
    category: 'barbell',
    primaryMuscles: ['biceps'],
    secondaryMuscles: ['forearms'],
    equipment: 'Olympic or EZ Barbell',
    setupSteps: [
      'Stand tall with feet shoulder-width apart.',
      'Grip the bar shoulder-width with palms facing up.',
      'Keep elbows tucked close to your ribs, shoulders pulled back.'
    ],
    executionSteps: [
      'Curl the bar up in a smooth arc toward your upper chest.',
      'Keep your elbows pinned in place — do not drift them forward.',
      'Squeeze your biceps hard at the peak for 1 second.',
      'Lower the bar under control over 2-3 seconds back to full extension.'
    ],
    commonMistakes: [
      {
        mistake: 'Rocking your hips and lower back to swing the bar up.',
        correction: 'Stand solid like a statue; if you need to swing, reduce the weight.'
      },
      {
        mistake: 'Not lowering all the way to full arm extension.',
        correction: 'Extend arms fully at the bottom for full range of motion.'
      }
    ],
    fatigueIndex: 2,
    sfrTier: 'A',
    recommendedRepRange: { min: 8, max: 12 },
    imageUrl: '/images/exercises/incline-db-curl.webp',
    svgFocusIds: ['biceps', 'forearms']
  },
  {
    id: 'ex-db-hammer-curl',
    name: 'Dumbbell Hammer Curl',
    slug: 'dumbbell-hammer-curl',
    category: 'dumbbell',
    primaryMuscles: ['biceps', 'forearms'],
    secondaryMuscles: [],
    equipment: 'Pair of Dumbbells',
    setupSteps: [
      'Stand with feet hip-width apart holding dumbbells at sides.',
      'Palms face each other in a neutral grip (like holding a hammer).',
      'Keep elbows pinned to your sides with shoulders back.'
    ],
    executionSteps: [
      'Curl the dumbbells up while maintaining the neutral thumb-up palm position.',
      'Squeeze your biceps and forearm muscles at the top.',
      'Pause for a split second at peak height.',
      'Lower slowly over 2-3 seconds back to your sides.'
    ],
    commonMistakes: [
      {
        mistake: 'Swinging elbows forward to cheat.',
        correction: 'Keep upper arms fixed strictly at your sides.'
      },
      {
        mistake: 'Curling weights across your chest instead of straight ahead.',
        correction: 'Keep dumbbells tracking straight in line with your shoulders.'
      }
    ],
    fatigueIndex: 1,
    sfrTier: 'S',
    recommendedRepRange: { min: 10, max: 14 },
    imageUrl: '/images/exercises/incline-db-curl.webp',
    svgFocusIds: ['biceps', 'forearms']
  },
  {
    id: 'ex-preacher-curl',
    name: 'EZ-Bar Preacher Curl',
    slug: 'ez-bar-preacher-curl',
    category: 'barbell',
    primaryMuscles: ['biceps'],
    secondaryMuscles: ['forearms'],
    equipment: 'Preacher Bench & EZ-Curl Bar',
    setupSteps: [
      'Adjust seat height so your armpits rest comfortably on the top edge of the pad.',
      'Rest your triceps flat against the slanted pad.',
      'Grip the inner curves of the EZ-bar with an underhand grip.'
    ],
    executionSteps: [
      'Curl the bar upward toward your shoulders.',
      'Stop just before your forearms become completely vertical to keep tension on the biceps.',
      'Squeeze biceps hard for 1 second at the top.',
      'Lower the bar slowly until arms are almost fully straight (maintain a soft elbow bend at bottom).'
    ],
    commonMistakes: [
      {
        mistake: 'Hyperextending and violently slamming elbows straight at the bottom.',
        correction: 'Stop just short of total joint lockout to protect the biceps tendon.'
      },
      {
        mistake: 'Lifting body off the seat to yank the bar up.',
        correction: 'Keep chest and armpits firmly anchored against the pad.'
      }
    ],
    fatigueIndex: 1,
    sfrTier: 'S',
    recommendedRepRange: { min: 8, max: 12 },
    imageUrl: '/images/exercises/incline-db-curl.webp',
    svgFocusIds: ['biceps', 'forearms']
  },
  {
    id: 'ex-wrist-curl',
    name: 'Barbell Wrist Curl',
    slug: 'barbell-wrist-curl',
    category: 'barbell',
    primaryMuscles: ['forearms'],
    secondaryMuscles: [],
    equipment: 'Flat Bench & Light Barbell',
    setupSteps: [
      'Kneel next to a flat bench and rest your forearms across the pad.',
      'Let your wrists and hands hang off the edge of the bench holding a barbell palms-up.'
    ],
    executionSteps: [
      'Allow the bar to roll down your fingers into an extended stretch.',
      'Curl the bar back into your palms, then curl your wrists upward as high as possible.',
      'Squeeze your forearm flexors hard at the top for 1 second.',
      'Lower the bar slowly back to the finger stretch.'
    ],
    commonMistakes: [
      {
        mistake: 'Lifting forearms off the bench during the curl.',
        correction: 'Keep forearms glued to the bench pad so only the wrists move.'
      },
      {
        mistake: 'Using excessive weight causing wrist pain.',
        correction: 'Use lighter weight with high reps (15-20) for optimal forearm pump.'
      }
    ],
    fatigueIndex: 1,
    sfrTier: 'A',
    recommendedRepRange: { min: 15, max: 20 },
    imageUrl: '/images/exercises/incline-db-curl.webp',
    svgFocusIds: ['forearms']
  },

  // ==========================================
  // --- CALVES & CORE (4) ---
  // ==========================================
  {
    id: 'ex-standing-calf-raise',
    name: 'Standing Calf Raise',
    slug: 'standing-calf-raise',
    category: 'machine',
    primaryMuscles: ['calves'],
    secondaryMuscles: [],
    equipment: 'Standing Calf Raise Machine',
    setupSteps: [
      'Step onto the platform with the balls of your feet on the edge, heels hanging off.',
      'Position shoulder pads comfortably over your shoulders with knees straight.',
      'Disengage the safety lever and lower your heels into a deep, full stretch.'
    ],
    executionSteps: [
      'Pause for 2 full seconds in the deep stretched bottom position to eliminate Achilles bounce.',
      'Drive aggressively upward onto the balls of your big toes.',
      'Hold the peak contraction at the very top for 1 full second.',
      'Lower slowly over 3 seconds back to the full stretch.'
    ],
    commonMistakes: [
      {
        mistake: 'Bouncing up and down rapidly using the Achilles tendon reflex.',
        correction: 'Pause for 2 seconds at the bottom stretch; slow, strict reps build real calf tissue.'
      },
      {
        mistake: 'Bending the knees to assist the lift.',
        correction: 'Keep knees straight (soft lockout) to target the gastrocnemius calf muscle.'
      }
    ],
    fatigueIndex: 1,
    sfrTier: 'S',
    recommendedRepRange: { min: 10, max: 15 },
    imageUrl: '/images/exercises/standing-calf-raise.webp',
    svgFocusIds: ['calves']
  },
  {
    id: 'ex-seated-calf-raise',
    name: 'Seated Machine Calf Raise',
    slug: 'seated-calf-raise',
    category: 'machine',
    primaryMuscles: ['calves'],
    secondaryMuscles: [],
    equipment: 'Seated Calf Raise Machine',
    setupSteps: [
      'Sit on the bench and place balls of feet on lower platform.',
      'Slide your lower thighs under the padded lever arm.',
      'Release the safety catch and lower heels down into a full calf stretch.'
    ],
    executionSteps: [
      'Pause for 2 seconds in the deep bottom stretch position.',
      'Drive up through the balls of your feet to maximum height.',
      'Squeeze your soleus calf muscle hard at the top for 1 second.',
      'Lower under control back to the deep stretch.'
    ],
    commonMistakes: [
      {
        mistake: 'Bouncing at the bottom.',
        correction: 'Hold the stretch for 2 seconds on every single rep.'
      },
      {
        mistake: 'Pad resting on kneecaps.',
        correction: 'Rest the pad on lower thighs just above knees.'
      }
    ],
    fatigueIndex: 1,
    sfrTier: 'S',
    recommendedRepRange: { min: 12, max: 20 },
    imageUrl: '/images/exercises/standing-calf-raise.webp',
    svgFocusIds: ['calves']
  },
  {
    id: 'ex-hanging-leg-raise',
    name: 'Hanging Leg Raise',
    slug: 'hanging-leg-raise',
    category: 'bodyweight',
    primaryMuscles: ['abs'],
    secondaryMuscles: ['forearms'],
    equipment: 'Pull-Up Bar',
    setupSteps: [
      'Hang from a pull-up bar with an overhand grip, arms straight.',
      'Engage your shoulders slightly to avoid dead-hanging limp.',
      'Keep legs together.'
    ],
    executionSteps: [
      'Raise your legs up smoothly by rolling your pelvis up toward your chest.',
      'Raise legs until they are at least parallel to the floor (or higher toward bar).',
      'Pause for a split second at the top, contracting your abdominals.',
      'Lower legs slowly with control, preventing any swinging.'
    ],
    commonMistakes: [
      {
        mistake: 'Swinging legs back and forth using momentum.',
        correction: 'Do each rep from a dead stop; squeeze abs to initiate the roll.'
      },
      {
        mistake: 'Only bending at hips without curling pelvis.',
        correction: 'Curl your pelvis upward toward your ribs to actively contract the abs.'
      }
    ],
    fatigueIndex: 2,
    sfrTier: 'S',
    recommendedRepRange: { min: 10, max: 15 },
    imageUrl: '/images/exercises/pull-up.webp',
    svgFocusIds: ['abs']
  },
  {
    id: 'ex-cable-rope-crunch',
    name: 'Kneeling Cable Rope Crunch',
    slug: 'cable-rope-crunch',
    category: 'cable',
    primaryMuscles: ['abs'],
    secondaryMuscles: [],
    equipment: 'Cable Station & Rope Attachment',
    setupSteps: [
      'Attach a rope attachment to the high cable pulley.',
      'Kneel on a floor mat about 2 feet away from the station.',
      'Hold the rope ends alongside your ears/cheeks.',
      'Keep your hips high and fixed in place.'
    ],
    executionSteps: [
      'Crunch down by rounding your spine and pulling your ribcage toward your pelvis.',
      'Bring your elbows down toward your knees.',
      'Exhale completely and squeeze your abs hard for 1 full second at the bottom.',
      'Return slowly to the starting upright kneeling position without sitting on your heels.'
    ],
    commonMistakes: [
      {
        mistake: 'Sitting back onto your heels like a child pose.',
        correction: 'Keep hips locked high; bend only your spine to crunch your abs.'
      },
      {
        mistake: 'Pulling with arms instead of crunching with abs.',
        correction: 'Keep hands glued to your ears and let your torso curl do all the work.'
      }
    ],
    fatigueIndex: 1,
    sfrTier: 'S',
    recommendedRepRange: { min: 12, max: 18 },
    imageUrl: '/images/exercises/cable-flye.webp',
    svgFocusIds: ['abs']
  }
];

export function getExerciseById(id: string): ExerciseGuide | undefined {
  return EXERCISES.find((ex) => ex.id === id);
}

export function getExercisesByMuscle(muscle: string): ExerciseGuide[] {
  return EXERCISES.filter(
    (ex) => ex.primaryMuscles.includes(muscle as any) || ex.secondaryMuscles.includes(muscle as any)
  );
}
