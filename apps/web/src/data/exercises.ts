import type { ExerciseGuide } from "@nextset/shared";

export const EXERCISES: ExerciseGuide[] = [
  {
    id: "ex-bb-bench-press",
    name: "Barbell Flat Bench Press",
    slug: "barbell-flat-bench-press",
    category: "barbell",
    primaryMuscles: ["chest"],
    secondaryMuscles: ["shoulders", "triceps"],
    equipment: "Olympic Barbell & Flat Bench",
    setupSteps: [
      "Lie on the bench with eyes directly under the racked bar and feet planted firmly on the floor.",
      "Grip the bar slightly wider than shoulder-width with wrists stacked over forearms and thumbs wrapped.",
      "Retract and depress your shoulder blades, creating a stable upper-back shelf against the bench.",
      "Unrack the bar and position it over the mid-to-upper chest with elbows straight.",
    ],
    executionSteps: [
      "Lower the bar for 2-3 seconds toward the lower half of your chest while keeping your forearms nearly vertical.",
      "Keep your elbows about 30-60 degrees from your torso rather than flaring them directly sideways.",
      "Touch the chest lightly without bouncing and pause briefly while maintaining upper-back tension.",
      "Press the bar upward and slightly back toward the rack until the elbows are fully extended.",
    ],
    commonMistakes: [
      {
        mistake: "Flaring the elbows to 90 degrees from the torso.",
        correction:
          "Bring the elbows slightly inward so the forearms remain stacked under the bar and shoulder stress is reduced.",
      },
      {
        mistake: "Bouncing the bar off the chest.",
        correction:
          "Use a controlled eccentric and a soft touch on the chest before driving the bar upward.",
      },
    ],
    fatigueIndex: 4,
    sfrTier: "A",
    recommendedRepRange: { min: 5, max: 8 },
    imageUrl: "/images/exercises/barbell-flat-bench-press.webp",
    svgFocusIds: ["chest", "delts_front", "triceps"],
  },
  {
    id: "ex-bb-incline-bench-press",
    name: "Incline Barbell Bench Press",
    slug: "incline-barbell-bench-press",
    category: "barbell",
    primaryMuscles: ["chest"],
    secondaryMuscles: ["shoulders", "triceps"],
    equipment: "Olympic Barbell & Adjustable Incline Bench",
    setupSteps: [
      "Set the bench to roughly 30 degrees and align your eyes just behind the bar.",
      "Plant both feet firmly with knees bent and grip the bar slightly wider than shoulder-width.",
      "Retract and depress the shoulder blades while keeping the upper back and glutes firmly supported.",
      "Unrack the bar and hold it over the upper chest with elbows extended.",
    ],
    executionSteps: [
      "Lower the bar in 2-3 seconds toward the upper chest while keeping the wrists stacked over the elbows.",
      "Allow the elbows to track 30-60 degrees from the torso instead of flaring straight out.",
      "Touch the upper chest with a controlled pause and keep the shoulder blades pinned to the bench.",
      "Press the bar upward and slightly backward until the arms are straight without shrugging.",
    ],
    commonMistakes: [
      {
        mistake:
          "Using too steep an incline and turning the movement into a shoulder press.",
        correction:
          "Keep the bench around 20-40 degrees to bias the upper chest without excessive front-delt loading.",
      },
      {
        mistake: "Letting the bar drift toward the stomach.",
        correction:
          "Control the bar toward the upper chest while maintaining vertical forearms throughout the bottom half.",
      },
    ],
    fatigueIndex: 4,
    sfrTier: "A",
    recommendedRepRange: { min: 6, max: 10 },
    imageUrl: "/images/exercises/incline-barbell-bench-press.webp",
    svgFocusIds: ["chest_upper", "delts_front", "triceps"],
  },
  {
    id: "ex-bb-decline-bench-press",
    name: "Decline Barbell Bench Press",
    slug: "decline-barbell-bench-press",
    category: "barbell",
    primaryMuscles: ["chest"],
    secondaryMuscles: ["triceps", "shoulders"],
    equipment: "Olympic Barbell & Decline Bench",
    setupSteps: [
      "Secure your feet under the decline bench supports and position your eyes just behind the bar.",
      "Grip the bar slightly wider than shoulder-width with a firm closed grip.",
      "Retract the shoulder blades and keep the upper back pressed firmly into the bench.",
      "Unrack the bar and position it above the lower chest with elbows straight.",
    ],
    executionSteps: [
      "Lower the bar under control toward the lower chest while keeping the elbows slightly tucked.",
      "Maintain a stable ribcage and avoid letting the shoulders roll forward at the bottom.",
      "Briefly touch the chest without bouncing or losing scapular retraction.",
      "Drive the bar upward until the elbows lock out while keeping the shoulder blades anchored.",
    ],
    commonMistakes: [
      {
        mistake:
          "Losing contact with the bench because of excessive spinal arching.",
        correction:
          "Keep the pelvis and upper back supported and use the decline angle rather than forcing a large arch.",
      },
      {
        mistake: "Lowering the bar too high toward the sternum.",
        correction:
          "Aim for the lower chest so the bar path remains efficient with the decline angle.",
      },
    ],
    fatigueIndex: 4,
    sfrTier: "A",
    recommendedRepRange: { min: 6, max: 10 },
    imageUrl: "/images/exercises/decline-barbell-bench-press.webp",
    svgFocusIds: ["chest_lower", "triceps", "delts_front"],
  },
  {
    id: "ex-db-flat-press",
    name: "Flat Dumbbell Press",
    slug: "flat-dumbbell-press",
    category: "dumbbell",
    primaryMuscles: ["chest"],
    secondaryMuscles: ["shoulders", "triceps"],
    equipment: "Pair of Dumbbells & Flat Bench",
    setupSteps: [
      "Sit on the bench with the dumbbells on your thighs and plant both feet firmly on the floor.",
      "Lie back while bringing the dumbbells to chest level with a neutral or slightly pronated grip.",
      "Retract and depress the shoulder blades and keep the ribcage controlled against the bench.",
      "Start with the dumbbells over the mid-chest and elbows slightly below the bench plane.",
    ],
    executionSteps: [
      "Lower each dumbbell for 2-3 seconds until the upper arms are slightly below torso level.",
      "Keep the elbows around 30-60 degrees from the torso and wrists stacked over the forearms.",
      "Pause briefly in the stretched position without letting the shoulders roll forward.",
      "Press the dumbbells upward and slightly inward until the elbows are extended.",
    ],
    commonMistakes: [
      {
        mistake: "Allowing the dumbbells to drift too far toward the head.",
        correction:
          "Lower them toward the lower-mid chest while maintaining controlled elbow alignment.",
      },
      {
        mistake: "Bouncing the weights together at the top.",
        correction:
          "Stop just short of contact and keep continuous chest tension through the lockout.",
      },
    ],
    fatigueIndex: 3,
    sfrTier: "S",
    recommendedRepRange: { min: 6, max: 12 },
    imageUrl: "/images/exercises/flat-dumbbell-press.webp",
    svgFocusIds: ["chest", "delts_front", "triceps"],
  },
  {
    id: "ex-db-incline-press",
    name: "Incline Dumbbell Press",
    slug: "incline-dumbbell-press",
    category: "dumbbell",
    primaryMuscles: ["chest"],
    secondaryMuscles: ["shoulders", "triceps"],
    equipment: "Pair of Dumbbells & Adjustable Incline Bench",
    setupSteps: [
      "Set the bench to about 20-40 degrees and plant both feet firmly on the floor.",
      "Start with the dumbbells on your thighs and bring them to shoulder level as you lie back.",
      "Pull the shoulder blades down and back while keeping the chest comfortably elevated.",
      "Position the dumbbells over the upper chest with elbows slightly tucked.",
    ],
    executionSteps: [
      "Lower the dumbbells slowly toward the upper chest while maintaining stacked wrists and elbows.",
      "Keep the elbows about 30-60 degrees from the torso and allow the dumbbells to travel naturally.",
      "Reach a controlled stretch without letting the front of the shoulder roll forward.",
      "Press upward and slightly inward until the arms are straight without shrugging.",
    ],
    commonMistakes: [
      {
        mistake: "Setting the bench close to 60-80 degrees.",
        correction:
          "Use a moderate incline so the upper chest remains the primary target instead of shifting most work to the delts.",
      },
      {
        mistake: "Dropping the dumbbells too quickly into the bottom position.",
        correction:
          "Use a deliberate eccentric and maintain shoulder-blade tension through the full range.",
      },
    ],
    fatigueIndex: 3,
    sfrTier: "S",
    recommendedRepRange: { min: 6, max: 12 },
    imageUrl: "/images/exercises/incline-dumbbell-press.webp",
    svgFocusIds: ["chest_upper", "delts_front", "triceps"],
  },
  {
    id: "ex-db-decline-press",
    name: "Decline Dumbbell Press",
    slug: "decline-dumbbell-press",
    category: "dumbbell",
    primaryMuscles: ["chest"],
    secondaryMuscles: ["triceps", "shoulders"],
    equipment: "Pair of Dumbbells & Decline Bench",
    setupSteps: [
      "Secure your legs under the decline bench supports and position a dumbbell in each hand.",
      "Lie back and bring the dumbbells to the lower chest with wrists stacked over elbows.",
      "Retract the shoulder blades and keep the upper back firmly supported.",
      "Start with the dumbbells over the lower chest and elbows slightly tucked.",
    ],
    executionSteps: [
      "Lower both dumbbells under control toward the lower chest while keeping the forearms close to vertical.",
      "Maintain a stable ribcage and avoid excessive shoulder extension at the bottom.",
      "Pause briefly in the stretched position without bouncing the weights.",
      "Press upward until the elbows are extended while keeping the dumbbells from colliding.",
    ],
    commonMistakes: [
      {
        mistake:
          "Allowing the dumbbells to drift too far behind the shoulders.",
        correction:
          "Control the bottom range so the upper arm does not force the shoulder into excessive extension.",
      },
      {
        mistake: "Using momentum from the legs or hips.",
        correction:
          "Keep the lower body quiet and let the chest and triceps control the entire press.",
      },
    ],
    fatigueIndex: 3,
    sfrTier: "A",
    recommendedRepRange: { min: 8, max: 12 },
    imageUrl: "/images/exercises/decline-dumbbell-press.webp",
    svgFocusIds: ["chest_lower", "triceps", "delts_front"],
  },
  {
    id: "ex-machine-chest-press",
    name: "Machine Chest Press",
    slug: "machine-chest-press",
    category: "machine",
    primaryMuscles: ["chest"],
    secondaryMuscles: ["triceps", "shoulders"],
    equipment: "Selectorized Chest Press Machine",
    setupSteps: [
      "Adjust the seat so the handles align roughly with the mid-chest and the eyes remain level with the machine pad line.",
      "Plant both feet firmly with hips and upper back fully supported against the pads.",
      "Grip the handles with wrists straight and set the shoulder blades gently back and down.",
      "Select a load that allows a full range without the handles forcing excessive shoulder stretch.",
    ],
    executionSteps: [
      "Lower the handles under control until the upper arms move slightly behind the torso.",
      "Keep elbows roughly 30-60 degrees from the body and wrists stacked over the forearms.",
      "Pause briefly in the stretched position without allowing the shoulders to roll forward.",
      "Press the handles forward until the elbows are nearly straight while keeping the chest engaged.",
    ],
    commonMistakes: [
      {
        mistake:
          "Setting the seat too low so the handles sit near the shoulders.",
        correction:
          "Raise the seat until the handles line up with the mid-chest for a more favorable pressing path.",
      },
      {
        mistake: "Letting the shoulders protract aggressively at the bottom.",
        correction:
          "Maintain controlled scapular positioning and stop slightly before the shoulder loses stability.",
      },
    ],
    fatigueIndex: 2,
    sfrTier: "S",
    recommendedRepRange: { min: 8, max: 15 },
    imageUrl: "/images/exercises/machine-chest-press.webp",
    svgFocusIds: ["chest", "triceps", "delts_front"],
  },
  {
    id: "ex-machine-incline-press",
    name: "Incline Machine Press",
    slug: "incline-machine-press",
    category: "machine",
    primaryMuscles: ["chest"],
    secondaryMuscles: ["shoulders", "triceps"],
    equipment: "Incline Chest Press Machine",
    setupSteps: [
      "Adjust the seat so the handles align with the upper chest and the back pad supports the entire torso.",
      "Place both feet firmly on the floor and keep the head and upper back against the pad.",
      "Set the handles so your wrists remain neutral with elbows slightly below the hands.",
      "Retract the shoulder blades lightly before taking the handles off the stops.",
    ],
    executionSteps: [
      "Lower the handles slowly toward the upper chest while keeping elbows slightly tucked.",
      "Allow the upper arms to travel into a controlled stretch without lifting the shoulders.",
      "Pause briefly at the deepest stable position.",
      "Press the handles upward and forward until the elbows are nearly extended.",
    ],
    commonMistakes: [
      {
        mistake:
          "Using an excessively high seat position that turns the movement into a front-delt press.",
        correction:
          "Lower or raise the seat until the handles align with the upper chest rather than the shoulders.",
      },
      {
        mistake:
          "Arching away from the back pad to complete the last repetitions.",
        correction:
          "Reduce the load and keep the ribs and pelvis connected to the machine throughout the set.",
      },
    ],
    fatigueIndex: 2,
    sfrTier: "S",
    recommendedRepRange: { min: 8, max: 15 },
    imageUrl: "/images/exercises/incline-machine-press.webp",
    svgFocusIds: ["chest_upper", "delts_front", "triceps"],
  },
  {
    id: "ex-db-flat-flye",
    name: "Flat Dumbbell Flye",
    slug: "flat-dumbbell-flye",
    category: "dumbbell",
    primaryMuscles: ["chest"],
    secondaryMuscles: ["shoulders"],
    equipment: "Pair of Dumbbells & Flat Bench",
    setupSteps: [
      "Lie flat with eyes below the dumbbells and feet planted firmly on the floor.",
      "Hold the dumbbells above the chest with a slight elbow bend and palms facing each other.",
      "Retract the shoulder blades gently and keep the ribcage stable against the bench.",
      "Position the arms over the mid-chest without fully locking the elbows.",
    ],
    executionSteps: [
      "Lower the dumbbells in a wide arc for 2-3 seconds while maintaining a fixed, slightly bent elbow.",
      "Stop when the chest is fully stretched but the shoulder remains controlled and pain-free.",
      "Pause briefly in the stretched position without letting the upper arm drop abruptly.",
      "Squeeze the chest to bring the dumbbells back together over the midline without bending the elbows more.",
    ],
    commonMistakes: [
      {
        mistake: "Turning the flye into a bent-arm dumbbell press.",
        correction:
          "Keep the elbow angle nearly fixed so shoulder horizontal adduction, not elbow extension, drives the return.",
      },
      {
        mistake: "Dropping the weights too deep behind the torso.",
        correction:
          "Use the deepest position you can control without anterior shoulder discomfort or loss of scapular stability.",
      },
    ],
    fatigueIndex: 2,
    sfrTier: "A",
    recommendedRepRange: { min: 10, max: 15 },
    imageUrl: "/images/exercises/flat-dumbbell-flye.webp",
    svgFocusIds: ["chest", "front_shoulder"],
  },
  {
    id: "ex-db-incline-flye",
    name: "Incline Dumbbell Flye",
    slug: "incline-dumbbell-flye",
    category: "dumbbell",
    primaryMuscles: ["chest"],
    secondaryMuscles: ["shoulders"],
    equipment: "Pair of Dumbbells & Incline Bench",
    setupSteps: [
      "Set the bench around 20-30 degrees and plant the feet firmly on the floor.",
      "Lie back holding the dumbbells above the upper chest with palms facing each other.",
      "Retract the shoulder blades and maintain a small, consistent bend in both elbows.",
      "Start with the dumbbells over the upper chest rather than directly over the face.",
    ],
    executionSteps: [
      "Open the arms slowly in a controlled arc while keeping the elbows softly bent.",
      "Lower until the upper chest is strongly stretched without allowing the shoulders to roll forward.",
      "Pause briefly at the end of the eccentric with the ribcage stable.",
      "Bring the arms back together by squeezing the upper chest while keeping the elbow angle consistent.",
    ],
    commonMistakes: [
      {
        mistake:
          "Using too much incline and feeling most of the load in the front delts.",
        correction:
          "Use a modest 20-30 degree incline and focus on bringing the upper arms together across the chest.",
      },
      {
        mistake: "Bending and straightening the elbows during the rep.",
        correction:
          "Set the elbow angle before starting and maintain it through both directions.",
      },
    ],
    fatigueIndex: 2,
    sfrTier: "A",
    recommendedRepRange: { min: 10, max: 15 },
    imageUrl: "/images/exercises/incline-dumbbell-flye.webp",
    svgFocusIds: ["chest_upper", "front_shoulder"],
  },
  {
    id: "ex-cable-high-to-low-flye",
    name: "Cable Chest Flye High-to-Low",
    slug: "cable-chest-flye-high-to-low",
    category: "cable",
    primaryMuscles: ["chest"],
    secondaryMuscles: ["shoulders"],
    equipment: "Dual Adjustable Pulley & Handles",
    setupSteps: [
      "Set both pulleys above shoulder height and attach single handles.",
      "Stand in a split stance between the columns with the chest tall and ribs stacked over the pelvis.",
      "Grip the handles with a soft elbow bend and keep the shoulder blades lightly set.",
      "Start with the hands out to the sides and slightly above shoulder level.",
    ],
    executionSteps: [
      "Sweep the handles downward and inward in a smooth arc while keeping a constant elbow angle.",
      "Bring the hands toward the lower sternum or upper abdomen without shrugging.",
      "Pause briefly when the hands approach the midline and actively squeeze the chest.",
      "Return slowly until the chest is stretched while keeping the cables under continuous tension.",
    ],
    commonMistakes: [
      {
        mistake:
          "Turning the exercise into a triceps press by extending the elbows.",
        correction:
          "Keep a fixed soft bend in the elbows and move the upper arms rather than straightening the forearms.",
      },
      {
        mistake: "Stepping too far forward and losing balance at end range.",
        correction:
          "Use a stable split stance and keep the torso centered between the cable columns.",
      },
    ],
    fatigueIndex: 1,
    sfrTier: "S",
    recommendedRepRange: { min: 10, max: 15 },
    imageUrl: "/images/exercises/cable-chest-flye-high-to-low.webp",
    svgFocusIds: ["chest_lower", "front_shoulder"],
  },
  {
    id: "ex-cable-low-to-high-flye",
    name: "Cable Chest Flye Low-to-High",
    slug: "cable-chest-flye-low-to-high",
    category: "cable",
    primaryMuscles: ["chest"],
    secondaryMuscles: ["shoulders"],
    equipment: "Dual Adjustable Pulley & Handles",
    setupSteps: [
      "Set both pulleys near ankle height and attach single handles.",
      "Take a staggered stance between the columns and keep the torso tall.",
      "Grip the handles with elbows softly bent and shoulder blades gently retracted.",
      "Start with the hands low and slightly behind the hips, maintaining cable tension.",
    ],
    executionSteps: [
      "Sweep the handles upward and inward toward the upper chest in a controlled arc.",
      "Keep the elbows softly bent and avoid turning the movement into a shoulder shrug.",
      "Pause when the hands meet around upper-chest height and squeeze the chest.",
      "Lower the handles slowly until the upper chest is stretched without losing posture.",
    ],
    commonMistakes: [
      {
        mistake: "Swinging the torso to create momentum.",
        correction:
          "Use a split stance, brace the trunk, and let the arms move independently of the torso.",
      },
      {
        mistake: "Finishing with the hands too high near the face.",
        correction:
          "Aim for upper-chest height so the movement remains a chest-focused horizontal-adduction pattern.",
      },
    ],
    fatigueIndex: 1,
    sfrTier: "S",
    recommendedRepRange: { min: 10, max: 15 },
    imageUrl: "/images/exercises/cable-chest-flye-low-to-high.webp",
    svgFocusIds: ["chest_upper", "front_shoulder"],
  },
  {
    id: "ex-machine-pec-deck-flye",
    name: "Pec Deck Machine Flye",
    slug: "pec-deck-machine-flye",
    category: "machine",
    primaryMuscles: ["chest"],
    secondaryMuscles: ["shoulders"],
    equipment: "Pec Deck Machine",
    setupSteps: [
      "Adjust the seat so the machine handles align with the middle of your chest.",
      "Plant both feet and sit fully against the back pad with the head in a neutral position.",
      "Set the arm angle so the elbows remain slightly below shoulder height.",
      "Grip the handles or place the forearms against the pads as designed by the machine.",
    ],
    executionSteps: [
      "Open the arms slowly until the chest reaches a comfortable controlled stretch.",
      "Keep the shoulders down and avoid letting the elbows drift behind the torso excessively.",
      "Pause briefly in the stretched position without relaxing the chest completely.",
      "Bring the handles together by squeezing the chest and stop just before the pads forcefully collide.",
    ],
    commonMistakes: [
      {
        mistake:
          "Setting the seat too low so the elbows sit above the shoulders.",
        correction:
          "Raise the seat until the upper arms track closer to chest height.",
      },
      {
        mistake: "Protracting the shoulders aggressively as the handles close.",
        correction:
          "Keep the ribcage stable and shoulder motion controlled rather than reaching the hands far beyond the midline.",
      },
    ],
    fatigueIndex: 1,
    sfrTier: "S",
    recommendedRepRange: { min: 10, max: 15 },
    imageUrl: "/images/exercises/pec-deck-machine-flye.webp",
    svgFocusIds: ["chest", "front_shoulder"],
  },
  {
    id: "ex-bw-push-up",
    name: "Push-Up",
    slug: "push-up",
    category: "bodyweight",
    primaryMuscles: ["chest"],
    secondaryMuscles: ["triceps", "shoulders", "abs"],
    equipment: "Bodyweight & Floor",
    setupSteps: [
      "Place the hands slightly wider than shoulder-width with fingers spread and elbows angled back.",
      "Extend the legs behind you with feet together or hip-width apart and form a straight line from head to heels.",
      "Brace the abs and squeeze the glutes so the pelvis stays neutral.",
      "Set the hands directly under or slightly outside the shoulders before starting.",
    ],
    executionSteps: [
      "Lower the chest toward the floor over 2-3 seconds while keeping the torso rigid.",
      "Track the elbows roughly 30-60 degrees from the torso and keep the head neutral.",
      "Descend until the chest approaches the floor without the hips sagging or piking.",
      "Push the floor away until the elbows are extended, finishing with the shoulder blades controlled.",
    ],
    commonMistakes: [
      {
        mistake: "Sagging the hips during the eccentric.",
        correction:
          "Brace the abs and glutes harder or elevate the hands to maintain a straight body line.",
      },
      {
        mistake: "Flaring the elbows directly sideways.",
        correction:
          "Rotate the elbows back slightly and maintain a 30-60 degree path from the torso.",
      },
    ],
    fatigueIndex: 2,
    sfrTier: "A",
    recommendedRepRange: { min: 8, max: 25 },
    imageUrl: "/images/exercises/push-up.webp",
    svgFocusIds: ["chest", "triceps", "front_shoulder", "abs"],
  },
  {
    id: "ex-bw-deficit-push-up",
    name: "Deficit Push-Up",
    slug: "deficit-push-up",
    category: "bodyweight",
    primaryMuscles: ["chest"],
    secondaryMuscles: ["triceps", "shoulders", "abs"],
    equipment: "Parallettes or Stable Handles & Floor",
    setupSteps: [
      "Place two stable handles or parallettes slightly wider than shoulder-width.",
      "Set your feet behind you and create a straight line from head to heels.",
      "Brace the abs and glutes while keeping the shoulders stacked over the hands at the top.",
      "Start with the chest elevated above the handles and wrists neutral.",
    ],
    executionSteps: [
      "Lower the chest between the handles under control, allowing the shoulders to move through a deeper range.",
      "Keep elbows around 30-60 degrees from the torso and maintain a rigid trunk.",
      "Descend until the chest is below hand level if your shoulders tolerate the range.",
      "Press the floor away and return to elbow extension without losing trunk alignment.",
    ],
    commonMistakes: [
      {
        mistake:
          "Dropping too deeply and forcing the shoulder into excessive extension.",
        correction:
          "Use only as much deficit as you can control while keeping the humeral head centered.",
      },
      {
        mistake: "Letting the lower back arch to gain range.",
        correction:
          "Tighten the abs and glutes and keep the ribs pulled down throughout the rep.",
      },
    ],
    fatigueIndex: 2,
    sfrTier: "A",
    recommendedRepRange: { min: 8, max: 20 },
    imageUrl: "/images/exercises/deficit-push-up.webp",
    svgFocusIds: ["chest", "triceps", "front_shoulder", "abs"],
  },
  {
    id: "ex-bw-weighted-push-up",
    name: "Weighted Push-Up",
    slug: "weighted-push-up",
    category: "bodyweight",
    primaryMuscles: ["chest"],
    secondaryMuscles: ["triceps", "shoulders", "abs"],
    equipment: "Weight Plate or Weighted Vest & Floor",
    setupSteps: [
      "Place a secure plate on the upper back or wear a fitted weighted vest that does not restrict breathing.",
      "Set the hands slightly wider than shoulder-width and extend the legs into a rigid plank.",
      "Brace the abs and squeeze the glutes so the load remains centered over the torso.",
      "Start with the shoulders stacked near the hands and the head in a neutral position.",
    ],
    executionSteps: [
      "Lower the chest slowly while keeping the weighted load stable on the torso.",
      "Track the elbows around 30-60 degrees from the body and avoid rotating the shoulders inward.",
      "Descend until the chest is close to the floor without the pelvis dropping.",
      "Drive the floor away until the elbows are extended while preserving a straight body line.",
    ],
    commonMistakes: [
      {
        mistake: "Placing the plate too low on the lumbar spine.",
        correction:
          "Center the load on the upper back so it increases resistance without forcing spinal extension.",
      },
      {
        mistake: "Using a load that causes the hips to sag.",
        correction:
          "Reduce resistance and keep the abdominal brace strong enough to maintain a rigid plank.",
      },
    ],
    fatigueIndex: 2,
    sfrTier: "A",
    recommendedRepRange: { min: 6, max: 15 },
    imageUrl: "/images/exercises/weighted-push-up.webp",
    svgFocusIds: ["chest", "triceps", "front_shoulder", "abs"],
  },
  {
    id: "ex-bw-chest-dip",
    name: "Chest Dips",
    slug: "chest-dips",
    category: "bodyweight",
    primaryMuscles: ["chest"],
    secondaryMuscles: ["triceps", "shoulders"],
    equipment: "Parallel Dip Bars",
    setupSteps: [
      "Set the parallel bars at a width that allows the elbows to track naturally without shoulder pinching.",
      "Grip the bars firmly and start with elbows extended, shoulders depressed, and feet off the floor.",
      "Lean the torso slightly forward while keeping the ribs controlled and hips beneath the shoulders.",
      "Brace the abs and begin from a stable support position.",
    ],
    executionSteps: [
      "Lower the body slowly by bending the elbows and allowing a modest forward torso lean.",
      "Keep the elbows roughly 30-60 degrees from the torso and shoulders lower than the ears.",
      "Descend until the upper arms reach about parallel to the floor or as low as your shoulders comfortably allow.",
      "Press through the palms to return to elbow extension without aggressively shrugging at the top.",
    ],
    commonMistakes: [
      {
        mistake: "Dropping into excessive shoulder extension at the bottom.",
        correction:
          "Use a controlled depth and stop before the shoulders lose centered control.",
      },
      {
        mistake:
          "Keeping the torso perfectly upright when trying to bias the chest.",
        correction:
          "Maintain a modest forward lean and allow the elbows to track slightly behind the torso.",
      },
    ],
    fatigueIndex: 3,
    sfrTier: "A",
    recommendedRepRange: { min: 6, max: 15 },
    imageUrl: "/images/exercises/chest-dips.webp",
    svgFocusIds: ["chest", "triceps", "front_shoulder"],
  },

  {
    id: "ex-bb-bent-over-row",
    name: "Barbell Bent-Over Row Overhand",
    slug: "barbell-bent-over-row-overhand",
    category: "barbell",
    primaryMuscles: ["upper_back", "lats"],
    secondaryMuscles: ["biceps", "traps", "lower_back"],
    equipment: "Olympic Barbell",
    setupSteps: [
      "Stand with feet about hip-width apart and grip the bar slightly wider than shoulder-width with an overhand grip.",
      "Hinge at the hips until the torso is roughly 30-45 degrees above horizontal with knees softly bent.",
      "Brace the trunk, keep the spine neutral, and pull the shoulder blades gently back and down.",
      "Start with the bar hanging below the shoulders and arms fully extended.",
    ],
    executionSteps: [
      "Pull the bar toward the lower chest or upper abdomen while keeping the torso angle stable.",
      "Drive the elbows back rather than curling the bar upward with the forearms.",
      "Pause briefly when the bar reaches the torso and squeeze the upper back.",
      "Lower the bar under control until the elbows are straight without losing the hip hinge.",
    ],
    commonMistakes: [
      {
        mistake: "Standing progressively taller during each rep.",
        correction:
          "Set the torso angle before the first rep and keep it fixed throughout the set.",
      },
      {
        mistake: "Shrugging the shoulders toward the ears.",
        correction:
          "Lead with the elbows and keep the shoulders depressed while the scapulae retract.",
      },
    ],
    fatigueIndex: 4,
    sfrTier: "B",
    recommendedRepRange: { min: 6, max: 10 },
    imageUrl: "/images/exercises/barbell-bent-over-row-overhand.webp",
    svgFocusIds: ["upper_back", "lats", "biceps", "traps"],
  },
  {
    id: "ex-bb-pendlay-row",
    name: "Barbell Pendlay Row",
    slug: "barbell-pendlay-row",
    category: "barbell",
    primaryMuscles: ["upper_back", "lats"],
    secondaryMuscles: ["biceps", "traps", "lower_back"],
    equipment: "Olympic Barbell",
    setupSteps: [
      "Stand with the bar over the mid-foot and use a slightly wider-than-shoulder-width overhand grip.",
      "Hinge until the torso is nearly parallel to the floor with the spine neutral and knees slightly bent.",
      "Brace hard and set the shoulder blades so the bar can start from the floor under control.",
      "Begin each rep with the plates resting on the floor and arms extended.",
    ],
    executionSteps: [
      "Explosively pull the bar from the floor toward the lower chest while keeping the torso fixed.",
      "Drive the elbows back and keep the bar path close to the body.",
      "Touch the lower chest or upper abdomen, pause momentarily, and squeeze the upper back.",
      "Lower the bar back to the floor under control and reset the torso before the next repetition.",
    ],
    commonMistakes: [
      {
        mistake: "Using leg drive to bounce the bar off the floor.",
        correction:
          "Keep the knees fixed after setup and generate the pull primarily through the upper back and lats.",
      },
      {
        mistake: "Rounding the lumbar spine to reach the bar.",
        correction:
          "Hinge from the hips and brace before every repetition so the spine remains neutral.",
      },
    ],
    fatigueIndex: 4,
    sfrTier: "B",
    recommendedRepRange: { min: 5, max: 8 },
    imageUrl: "/images/exercises/barbell-pendlay-row.webp",
    svgFocusIds: ["upper_back", "lats", "biceps", "traps"],
  },
  {
    id: "ex-bb-yates-row",
    name: "Yates Row Underhand",
    slug: "yates-row-underhand",
    category: "barbell",
    primaryMuscles: ["lats", "upper_back"],
    secondaryMuscles: ["biceps", "traps", "lower_back"],
    equipment: "Olympic Barbell",
    setupSteps: [
      "Stand hip-width apart and grip the bar just outside hip width with an underhand grip.",
      "Hinge to roughly 30-45 degrees above horizontal while keeping the knees softly bent.",
      "Brace the trunk and keep the bar hanging close to the thighs.",
      "Set the shoulders slightly down and back before initiating the row.",
    ],
    executionSteps: [
      "Pull the bar toward the lower abdomen while keeping the elbows close to the torso.",
      "Keep the wrists neutral and avoid curling the bar independently of the elbow drive.",
      "Pause briefly at the abdomen and squeeze the lats and upper back.",
      "Lower the bar under control until the arms are straight without losing the hinge.",
    ],
    commonMistakes: [
      {
        mistake: "Standing too upright and turning the movement into a shrug.",
        correction:
          "Maintain the hip hinge and pull toward the lower abdomen with the elbows close to the body.",
      },
      {
        mistake: "Hyperextending the lower back at lockout.",
        correction:
          "Brace the abdomen and keep the ribcage stacked over the pelvis rather than leaning backward.",
      },
    ],
    fatigueIndex: 4,
    sfrTier: "B",
    recommendedRepRange: { min: 6, max: 10 },
    imageUrl: "/images/exercises/yates-row-underhand.webp",
    svgFocusIds: ["lats", "upper_back", "biceps", "traps"],
  },
  {
    id: "ex-bb-conventional-deadlift",
    name: "Conventional Deadlift",
    slug: "conventional-deadlift",
    category: "barbell",
    primaryMuscles: ["hamstrings", "glutes", "lower_back"],
    secondaryMuscles: ["quadriceps", "traps", "forearms", "upper_back"],
    equipment: "Olympic Barbell & Plates",
    setupSteps: [
      "Stand with feet about hip-width apart and place the bar over the mid-foot, roughly 2-3 cm from the shins.",
      "Grip the bar just outside the legs, then bend the knees until the shins lightly contact the bar.",
      "Pull the lats down, brace the abdomen, and set a neutral spine with the chest tall.",
      "Start with the hips slightly above the knees and shoulders slightly ahead of the bar.",
    ],
    executionSteps: [
      "Push the floor away while keeping the bar close to the shins and the hips and shoulders rising together.",
      "Maintain a rigid trunk and keep the lats engaged so the bar does not drift forward.",
      "Stand tall by extending the hips and knees until the legs and torso are aligned.",
      "Lower the bar by pushing the hips back first, then bending the knees once the bar passes them.",
    ],
    commonMistakes: [
      {
        mistake: "Letting the bar drift away from the legs.",
        correction:
          "Engage the lats and keep the bar almost touching the shins and thighs throughout the pull.",
      },
      {
        mistake: "Locking out by leaning backward.",
        correction:
          "Finish with the hips under the torso and ribs stacked rather than arching the lower back.",
      },
    ],
    fatigueIndex: 5,
    sfrTier: "B",
    recommendedRepRange: { min: 3, max: 6 },
    imageUrl: "/images/exercises/conventional-deadlift.webp",
    svgFocusIds: ["hamstrings", "glutes", "lower_back", "traps", "forearms"],
  },
  {
    id: "ex-bb-sumo-deadlift",
    name: "Sumo Deadlift",
    slug: "sumo-deadlift",
    category: "barbell",
    primaryMuscles: ["glutes", "quadriceps", "hamstrings"],
    secondaryMuscles: ["lower_back", "traps", "forearms", "upper_back"],
    equipment: "Olympic Barbell & Plates",
    setupSteps: [
      "Take a wide stance with toes turned out roughly 30-45 degrees and the bar over the mid-foot.",
      "Grip the bar inside the legs and bend the knees until the shins approach the bar.",
      "Brace the trunk, push the knees out toward the toes, and keep the chest tall.",
      "Set the shoulders slightly behind the bar with the hips positioned between the knees and shoulders.",
    ],
    executionSteps: [
      "Push the floor apart with the feet while keeping the bar close to the body.",
      "Maintain outward knee pressure and a neutral spine as the hips and shoulders rise together.",
      "Extend the knees and hips until fully upright without leaning backward.",
      "Lower by pushing the hips back and allowing the knees to bend after the bar passes them.",
    ],
    commonMistakes: [
      {
        mistake: "Allowing the knees to cave inward during the pull.",
        correction:
          "Drive the knees outward toward the toes and keep the feet actively rooted.",
      },
      {
        mistake: "Starting with the bar too far from the body.",
        correction:
          "Center the bar over the mid-foot and bring the shins toward it before pulling.",
      },
    ],
    fatigueIndex: 5,
    sfrTier: "B",
    recommendedRepRange: { min: 3, max: 6 },
    imageUrl: "/images/exercises/sumo-deadlift.webp",
    svgFocusIds: ["glutes", "quadriceps", "hamstrings", "lower_back", "traps"],
  },
  {
    id: "ex-bb-rack-pull",
    name: "Barbell Rack Pull",
    slug: "barbell-rack-pull",
    category: "barbell",
    primaryMuscles: ["upper_back", "traps", "glutes"],
    secondaryMuscles: ["hamstrings", "lower_back", "forearms"],
    equipment: "Olympic Barbell, Plates & Power Rack",
    setupSteps: [
      "Set the safety pins so the bar sits around knee height or slightly below depending on the target range.",
      "Stand with feet hip-width apart and place the bar over the mid-foot.",
      "Grip the bar just outside the legs, brace hard, and pull the lats down.",
      "Set the hips slightly behind the bar with shoulders just in front of it.",
    ],
    executionSteps: [
      "Drive through the feet and extend the hips while keeping the bar close to the thighs.",
      "Keep the spine neutral and squeeze the shoulder blades without aggressively shrugging.",
      "Stand tall until the hips and knees are fully extended.",
      "Lower the bar by hinging at the hips and keeping it close until it contacts the pins.",
    ],
    commonMistakes: [
      {
        mistake: "Hyperextending the spine at lockout.",
        correction:
          "Finish by bringing the hips through and stopping when the body is vertically aligned.",
      },
      {
        mistake: "Starting with the bar against the rack posts or pins.",
        correction:
          "Allow the bar to settle naturally on the pins so each rep begins from a consistent position.",
      },
    ],
    fatigueIndex: 4,
    sfrTier: "C",
    recommendedRepRange: { min: 4, max: 8 },
    imageUrl: "/images/exercises/barbell-rack-pull.webp",
    svgFocusIds: ["upper_back", "traps", "glutes", "hamstrings", "lower_back"],
  },
  {
    id: "ex-machine-chest-supported-t-bar-row",
    name: "T-Bar Row Chest-Supported",
    slug: "t-bar-row-chest-supported",
    category: "machine",
    primaryMuscles: ["upper_back", "lats"],
    secondaryMuscles: ["biceps", "traps", "forearms"],
    equipment: "Chest-Supported T-Bar Row Machine",
    setupSteps: [
      "Adjust the chest pad so the sternum is supported while the shoulders remain free to move.",
      "Place both feet firmly on the platforms and grip the handles with the intended neutral or semi-pronated grip.",
      "Set the shoulders down and slightly back without pinning them rigidly into place.",
      "Start with the arms extended and the chest fully supported against the pad.",
    ],
    executionSteps: [
      "Pull the handles toward the lower chest or upper abdomen while keeping the chest pressed into the pad.",
      "Drive the elbows backward and slightly outward depending on the grip.",
      "Pause briefly at peak contraction and squeeze the upper back.",
      "Lower the weight slowly until the shoulders and elbows reach a controlled stretch.",
    ],
    commonMistakes: [
      {
        mistake: "Lifting the chest off the pad to move more weight.",
        correction:
          "Reduce the load and keep the sternum supported so the row remains upper-back driven.",
      },
      {
        mistake: "Shrugging excessively at the top.",
        correction:
          "Lead with the elbows and keep the shoulders depressed while retracting the scapulae.",
      },
    ],
    fatigueIndex: 2,
    sfrTier: "S",
    recommendedRepRange: { min: 8, max: 12 },
    imageUrl: "/images/exercises/t-bar-row-chest-supported.webp",
    svgFocusIds: ["upper_back", "lats", "biceps", "traps"],
  },
  {
    id: "ex-cable-seated-row-close-grip",
    name: "Seated Cable Row Close-Grip",
    slug: "seated-cable-row-close-grip",
    category: "cable",
    primaryMuscles: ["lats", "upper_back"],
    secondaryMuscles: ["biceps", "traps", "forearms"],
    equipment: "Low Cable Pulley & Close-Grip Handle",
    setupSteps: [
      "Sit with knees slightly bent and feet braced against the platform while holding the close-grip handle.",
      "Sit tall with a neutral spine and keep the torso stacked over the pelvis.",
      "Set the shoulders down and allow the arms to reach fully without rounding the lower back.",
      "Begin with the cable taut and the handle centered below the chest.",
    ],
    executionSteps: [
      "Pull the handle toward the lower ribs while keeping the elbows close to the torso.",
      "Drive the elbows behind the body and minimize torso swing.",
      "Pause briefly at the ribs and squeeze the lats and mid-back.",
      "Return the handle slowly until the arms are straight and the shoulder blades protract naturally.",
    ],
    commonMistakes: [
      {
        mistake: "Rocking backward on every repetition.",
        correction:
          "Keep the torso nearly fixed and use only a small natural movement of the shoulders.",
      },
      {
        mistake: "Stopping the stretch with the elbows still bent.",
        correction:
          "Allow the arms to straighten fully under control so the lats receive a complete lengthened phase.",
      },
    ],
    fatigueIndex: 2,
    sfrTier: "S",
    recommendedRepRange: { min: 8, max: 15 },
    imageUrl: "/images/exercises/seated-cable-row-close-grip.webp",
    svgFocusIds: ["lats", "upper_back", "biceps", "traps"],
  },
  {
    id: "ex-cable-seated-row-wide-grip",
    name: "Seated Cable Row Wide Grip",
    slug: "seated-cable-row-wide-grip",
    category: "cable",
    primaryMuscles: ["upper_back", "lats"],
    secondaryMuscles: ["shoulders", "biceps", "traps"],
    equipment: "Low Cable Pulley & Wide-Grip Bar",
    setupSteps: [
      "Attach a wide straight bar and sit with knees slightly bent and feet secured on the platform.",
      "Grip the bar wider than shoulder-width with wrists neutral and the torso upright.",
      "Set the shoulder blades gently down and back without overextending the spine.",
      "Start with the elbows straight and the cable taut.",
    ],
    executionSteps: [
      "Pull the bar toward the lower chest while driving the elbows outward and backward.",
      "Keep the torso stable and avoid excessive lumbar extension to finish the rep.",
      "Pause at the torso and squeeze the upper back before releasing the tension.",
      "Extend the elbows slowly and allow the shoulder blades to move forward under control.",
    ],
    commonMistakes: [
      {
        mistake: "Pulling the bar to the abdomen with a narrow elbow path.",
        correction:
          "Allow the elbows to travel wider so the upper back receives more of the workload.",
      },
      {
        mistake: "Shrugging the shoulders toward the ears.",
        correction:
          "Keep the shoulders depressed and think about moving the elbows rather than lifting the shoulders.",
      },
    ],
    fatigueIndex: 2,
    sfrTier: "A",
    recommendedRepRange: { min: 8, max: 15 },
    imageUrl: "/images/exercises/seated-cable-row-wide-grip.webp",
    svgFocusIds: ["upper_back", "lats", "rear_shoulder", "traps"],
  },
  {
    id: "ex-db-single-arm-row",
    name: "Single-Arm Dumbbell Row",
    slug: "single-arm-dumbbell-row",
    category: "dumbbell",
    primaryMuscles: ["lats", "upper_back"],
    secondaryMuscles: ["biceps", "traps", "forearms"],
    equipment: "Dumbbell & Flat Bench",
    setupSteps: [
      "Place one hand and the opposite knee on a bench with the supporting foot planted firmly on the floor.",
      "Hold the dumbbell in the free hand with a neutral wrist and let the shoulder hang naturally.",
      "Set the torso parallel to the floor and brace the abdomen.",
      "Start with the dumbbell below the shoulder and the arm fully extended.",
    ],
    executionSteps: [
      "Pull the dumbbell toward the hip while keeping the elbow close to the torso.",
      "Allow the shoulder blade to move naturally but avoid rotating the trunk to complete the rep.",
      "Pause briefly when the elbow passes the torso and squeeze the lat.",
      "Lower the dumbbell slowly until the arm is fully extended and the shoulder is comfortably stretched.",
    ],
    commonMistakes: [
      {
        mistake: "Rotating the torso to lift the dumbbell higher.",
        correction:
          "Keep the chest square to the floor and use a lighter load that the lat can control.",
      },
      {
        mistake: "Rowing toward the armpit with a flared elbow.",
        correction:
          "Aim toward the hip with the elbow close to the ribs for a stronger lat bias.",
      },
    ],
    fatigueIndex: 2,
    sfrTier: "S",
    recommendedRepRange: { min: 8, max: 12 },
    imageUrl: "/images/exercises/single-arm-dumbbell-row.webp",
    svgFocusIds: ["lats", "upper_back", "biceps"],
  },
  {
    id: "ex-bb-meadows-row",
    name: "Meadows Row",
    slug: "meadows-row",
    category: "barbell",
    primaryMuscles: ["lats", "upper_back"],
    secondaryMuscles: ["biceps", "forearms", "traps"],
    equipment: "Landmine Barbell Setup",
    setupSteps: [
      "Secure one end of the barbell in a landmine attachment and stand at the free end in a staggered stance.",
      "Grip the sleeve or a neutral attachment with the hand opposite your front foot.",
      "Hinge forward while keeping the spine neutral and brace the trunk.",
      "Allow the working arm to hang long with the shoulder slightly protracted.",
    ],
    executionSteps: [
      "Pull the bar toward your lower ribs or hip while keeping the elbow close to the torso.",
      "Rotate the shoulder blade naturally without twisting the ribcage toward the bar.",
      "Pause at the top and squeeze the lat and upper back.",
      "Lower the bar slowly until the working arm is long and the shoulder is comfortably stretched.",
    ],
    commonMistakes: [
      {
        mistake: "Twisting the torso to raise the bar higher.",
        correction:
          "Keep the pelvis and ribs facing the floor and shorten the range if trunk rotation begins.",
      },
      {
        mistake:
          "Starting too upright and turning the movement into a standing shrug.",
        correction:
          "Maintain a clear hip hinge so the upper arm can travel through a full rowing path.",
      },
    ],
    fatigueIndex: 3,
    sfrTier: "A",
    recommendedRepRange: { min: 8, max: 12 },
    imageUrl: "/images/exercises/meadows-row.webp",
    svgFocusIds: ["lats", "upper_back", "biceps", "traps"],
  },
  {
    id: "ex-db-chest-supported-row",
    name: "Chest-Supported Dumbbell Row",
    slug: "chest-supported-dumbbell-row",
    category: "dumbbell",
    primaryMuscles: ["upper_back", "lats"],
    secondaryMuscles: ["biceps", "traps", "forearms"],
    equipment: "Pair of Dumbbells & Incline Bench",
    setupSteps: [
      "Set the bench to roughly 30 degrees and lie face down with the chest fully supported.",
      "Place both feet firmly on the floor and let the dumbbells hang with palms facing each other.",
      "Set the shoulders away from the ears and keep the neck neutral.",
      "Start with both elbows straight and the dumbbells below the chest.",
    ],
    executionSteps: [
      "Pull both dumbbells upward by driving the elbows back while keeping the sternum on the bench.",
      "Keep the wrists stacked and choose an elbow path that matches the target area.",
      "Pause briefly at the top and squeeze the mid-back and lats.",
      "Lower the dumbbells slowly until the arms are straight and the shoulders are stretched.",
    ],
    commonMistakes: [
      {
        mistake: "Lifting the torso from the pad during the final reps.",
        correction:
          "Reduce the load and keep the chest supported to eliminate momentum.",
      },
      {
        mistake: "Shrugging instead of rowing.",
        correction:
          "Keep the shoulders depressed and initiate by moving the elbows backward.",
      },
    ],
    fatigueIndex: 2,
    sfrTier: "S",
    recommendedRepRange: { min: 8, max: 15 },
    imageUrl: "/images/exercises/chest-supported-dumbbell-row.webp",
    svgFocusIds: ["upper_back", "lats", "biceps", "traps"],
  },
  {
    id: "ex-bw-pull-up",
    name: "Pull-Up Overhand",
    slug: "pull-up-overhand",
    category: "bodyweight",
    primaryMuscles: ["lats"],
    secondaryMuscles: ["biceps", "upper_back", "forearms", "traps"],
    equipment: "Pull-Up Bar",
    setupSteps: [
      "Grip the bar slightly wider than shoulder-width with palms facing away.",
      "Hang with the elbows straight, feet off the floor, and shoulders controlled rather than completely shrugged.",
      "Brace the abs and keep the legs quiet without excessive swinging.",
      "Start from a stable dead hang or controlled active hang according to the intended range.",
    ],
    executionSteps: [
      "Pull the elbows down and back while keeping the ribcage controlled.",
      "Continue until the chin clears the bar or the upper chest approaches it without craning the neck.",
      "Pause briefly at the top while squeezing the lats.",
      "Lower under control until the elbows are straight and the shoulders reach a full but controlled stretch.",
    ],
    commonMistakes: [
      {
        mistake: "Kipping the hips to generate momentum.",
        correction:
          "Keep the legs still and reduce repetitions or use assistance to maintain strict movement.",
      },
      {
        mistake: "Pulling with the hands while shrugging the shoulders.",
        correction:
          "Think elbows to hips and keep the shoulders depressed throughout the concentric.",
      },
    ],
    fatigueIndex: 3,
    sfrTier: "A",
    recommendedRepRange: { min: 5, max: 12 },
    imageUrl: "/images/exercises/pull-up-overhand.webp",
    svgFocusIds: ["lats", "biceps", "upper_back", "forearms"],
  },
  {
    id: "ex-bw-chin-up",
    name: "Chin-Up Underhand",
    slug: "chin-up-underhand",
    category: "bodyweight",
    primaryMuscles: ["lats", "biceps"],
    secondaryMuscles: ["upper_back", "forearms", "traps"],
    equipment: "Pull-Up Bar",
    setupSteps: [
      "Grip the bar about shoulder-width with palms facing toward you.",
      "Hang with elbows straight and feet behind or below you without swinging.",
      "Brace the abs and gently depress the shoulders.",
      "Begin from a stable hang with the chin clear of excessive neck extension.",
    ],
    executionSteps: [
      "Drive the elbows toward the ribs while keeping the chest moving toward the bar.",
      "Continue until the chin clears the bar without jutting the head forward.",
      "Pause briefly at the top and squeeze the lats and biceps.",
      "Lower slowly to a controlled full stretch with elbows straight.",
    ],
    commonMistakes: [
      {
        mistake: "Swinging the legs to start the concentric.",
        correction:
          "Use assistance or fewer repetitions so the hips remain quiet and the pull stays strict.",
      },
      {
        mistake: "Stopping the eccentric halfway down.",
        correction:
          "Lower until the elbows are fully extended and the lats reach a controlled stretched position.",
      },
    ],
    fatigueIndex: 3,
    sfrTier: "A",
    recommendedRepRange: { min: 5, max: 12 },
    imageUrl: "/images/exercises/chin-up-underhand.webp",
    svgFocusIds: ["lats", "biceps", "upper_back", "forearms"],
  },
  {
    id: "ex-bw-neutral-grip-pull-up",
    name: "Neutral-Grip Pull-Up",
    slug: "neutral-grip-pull-up",
    category: "bodyweight",
    primaryMuscles: ["lats"],
    secondaryMuscles: ["biceps", "upper_back", "forearms"],
    equipment: "Neutral-Grip Pull-Up Bar",
    setupSteps: [
      "Grip parallel handles with palms facing each other at approximately shoulder width.",
      "Hang with elbows extended while keeping the shoulders controlled and neck neutral.",
      "Brace the abs and keep the legs still.",
      "Begin from a full but comfortable stretch in the lats.",
    ],
    executionSteps: [
      "Drive the elbows down toward the ribs while keeping the torso slightly leaned back.",
      "Pull until the chin approaches or clears the handle line without craning the neck.",
      "Pause briefly while squeezing the lats and upper back.",
      "Lower smoothly until the elbows are straight and the shoulders reach a controlled stretch.",
    ],
    commonMistakes: [
      {
        mistake: "Pulling with the arms while the shoulders shrug upward.",
        correction:
          "Initiate by depressing the shoulders and driving the elbows down.",
      },
      {
        mistake: "Swinging forward and backward between repetitions.",
        correction:
          "Pause in the bottom position and stabilize the trunk before starting each pull.",
      },
    ],
    fatigueIndex: 3,
    sfrTier: "A",
    recommendedRepRange: { min: 5, max: 12 },
    imageUrl: "/images/exercises/neutral-grip-pull-up.webp",
    svgFocusIds: ["lats", "biceps", "upper_back", "forearms"],
  },
  {
    id: "ex-cable-wide-lat-pulldown",
    name: "Lat Pulldown Wide-Grip",
    slug: "lat-pulldown-wide-grip",
    category: "cable",
    primaryMuscles: ["lats"],
    secondaryMuscles: ["biceps", "upper_back", "forearms"],
    equipment: "Lat Pulldown Machine & Wide Bar",
    setupSteps: [
      "Adjust the thigh pads so they firmly contact the upper thighs without blocking the hips.",
      "Grip the bar wider than shoulder-width with palms facing forward.",
      "Sit tall with the chest elevated slightly and the shoulders down away from the ears.",
      "Start with elbows straight and the cable taut above the head.",
    ],
    executionSteps: [
      "Pull the elbows down and slightly back toward the sides of the torso.",
      "Bring the bar toward the upper chest without swinging the torso backward excessively.",
      "Pause briefly near the chest while squeezing the lats.",
      "Return the bar slowly until the elbows are straight and the lats are lengthened.",
    ],
    commonMistakes: [
      {
        mistake: "Pulling the bar behind the neck.",
        correction:
          "Pull to the upper chest with the elbows traveling down in front of the torso.",
      },
      {
        mistake: "Using a dramatic backward lean to move the stack.",
        correction:
          "Keep the torso mostly upright and reduce the load enough to control the eccentric.",
      },
    ],
    fatigueIndex: 2,
    sfrTier: "S",
    recommendedRepRange: { min: 8, max: 15 },
    imageUrl: "/images/exercises/lat-pulldown-wide-grip.webp",
    svgFocusIds: ["lats", "biceps", "upper_back"],
  },
  {
    id: "ex-cable-neutral-lat-pulldown",
    name: "Neutral-Grip Lat Pulldown",
    slug: "neutral-grip-lat-pulldown",
    category: "cable",
    primaryMuscles: ["lats"],
    secondaryMuscles: ["biceps", "upper_back", "forearms"],
    equipment: "Lat Pulldown Machine & Neutral Handles",
    setupSteps: [
      "Adjust the thigh pads so the hips remain anchored during the pull.",
      "Take a neutral shoulder-width grip with palms facing each other.",
      "Sit tall with the sternum lifted slightly and the shoulders depressed.",
      "Begin with the elbows fully extended and the cable under tension.",
    ],
    executionSteps: [
      "Drive the elbows down toward the ribs while keeping the wrists neutral.",
      "Pull the handles toward the upper chest without excessive trunk swing.",
      "Pause briefly at the bottom and squeeze the lats.",
      "Raise the handles slowly until the elbows are straight and the shoulders are comfortably elevated.",
    ],
    commonMistakes: [
      {
        mistake: "Turning the movement into a row by leaning far backward.",
        correction:
          "Keep the torso nearly upright and allow the shoulders to move through a controlled overhead range.",
      },
      {
        mistake: "Stopping before full elbow extension.",
        correction:
          "Allow the arms to straighten under control so the lats receive a complete lengthened phase.",
      },
    ],
    fatigueIndex: 2,
    sfrTier: "S",
    recommendedRepRange: { min: 8, max: 15 },
    imageUrl: "/images/exercises/neutral-grip-lat-pulldown.webp",
    svgFocusIds: ["lats", "biceps", "upper_back"],
  },
  {
    id: "ex-cable-straight-arm-pulldown",
    name: "Straight-Arm Cable Pulldown",
    slug: "straight-arm-cable-pulldown",
    category: "cable",
    primaryMuscles: ["lats"],
    secondaryMuscles: ["triceps", "abs"],
    equipment: "High Cable Pulley & Straight Bar or Rope",
    setupSteps: [
      "Set the pulley high and take a shoulder-width overhand grip on the bar or a neutral rope grip.",
      "Step back far enough to keep the cable taut and hinge slightly at the hips.",
      "Brace the abs and keep the ribs stacked over the pelvis.",
      "Begin with the arms nearly straight overhead and the shoulders slightly elevated.",
    ],
    executionSteps: [
      "Sweep the bar or rope downward toward the thighs by extending the shoulders without bending the elbows significantly.",
      "Keep the torso nearly fixed and avoid turning the movement into a crunch.",
      "Pause at the thighs and squeeze the lats while keeping the arms long.",
      "Return the arms slowly overhead until the lats are fully lengthened.",
    ],
    commonMistakes: [
      {
        mistake: "Bending the elbows heavily during the pull.",
        correction:
          "Keep a soft but nearly fixed elbow bend and focus on shoulder extension.",
      },
      {
        mistake: "Rocking the torso back and forth.",
        correction:
          "Brace the trunk and use a load that allows the ribcage and pelvis to stay stable.",
      },
    ],
    fatigueIndex: 1,
    sfrTier: "S",
    recommendedRepRange: { min: 10, max: 15 },
    imageUrl: "/images/exercises/straight-arm-cable-pulldown.webp",
    svgFocusIds: ["lats", "triceps", "abs"],
  },
  {
    id: "ex-bb-shrug",
    name: "Barbell Shrug",
    slug: "barbell-shrug",
    category: "barbell",
    primaryMuscles: ["traps"],
    secondaryMuscles: ["forearms", "upper_back"],
    equipment: "Olympic Barbell",
    setupSteps: [
      "Stand with feet hip-width apart and grip the bar just outside the thighs.",
      "Brace the trunk and keep the arms fully straight with the bar resting against the thighs.",
      "Set the head and neck neutral and keep the shoulders relaxed before the first rep.",
      "Stand tall with the hips and knees fully extended.",
    ],
    executionSteps: [
      "Elevate the shoulders straight upward without bending the elbows.",
      "Keep the torso vertical and avoid rolling the shoulders in circles.",
      "Pause for a brief squeeze at the highest controlled position.",
      "Lower the shoulders slowly until the traps are fully lengthened without losing posture.",
    ],
    commonMistakes: [
      {
        mistake: "Rolling the shoulders backward in a circular motion.",
        correction:
          "Move the shoulders vertically upward and downward to keep the joint path cleaner.",
      },
      {
        mistake: "Using leg drive to bounce the bar.",
        correction:
          "Keep the knees and hips fixed and reduce the load so the traps perform the work.",
      },
    ],
    fatigueIndex: 2,
    sfrTier: "A",
    recommendedRepRange: { min: 8, max: 15 },
    imageUrl: "/images/exercises/barbell-shrug.webp",
    svgFocusIds: ["traps", "upper_back", "forearms"],
  },
  {
    id: "ex-db-shrug",
    name: "Dumbbell Shrug",
    slug: "dumbbell-shrug",
    category: "dumbbell",
    primaryMuscles: ["traps"],
    secondaryMuscles: ["forearms", "upper_back"],
    equipment: "Pair of Dumbbells",
    setupSteps: [
      "Stand with feet hip-width apart and hold a dumbbell at each side with palms facing inward.",
      "Keep the arms straight, chest tall, and head neutral.",
      "Brace the abdomen and set the hips and knees in a stable standing position.",
      "Allow the shoulders to settle naturally before beginning the first repetition.",
    ],
    executionSteps: [
      "Elevate both shoulders straight upward toward the ears without rotating the arms.",
      "Keep the elbows extended and torso vertical throughout the rep.",
      "Pause briefly at the top and contract the upper traps.",
      "Lower the dumbbells slowly until the shoulders return to a relaxed stretched position.",
    ],
    commonMistakes: [
      {
        mistake: "Swinging the dumbbells to gain momentum.",
        correction:
          "Use a slower tempo and slightly lighter load while keeping the torso stationary.",
      },
      {
        mistake: "Rotating the shoulders during the shrug.",
        correction:
          "Use a direct up-and-down path with the scapulae moving mainly in elevation and depression.",
      },
    ],
    fatigueIndex: 2,
    sfrTier: "A",
    recommendedRepRange: { min: 10, max: 15 },
    imageUrl: "/images/exercises/dumbbell-shrug.webp",
    svgFocusIds: ["traps", "upper_back", "forearms"],
  },
  {
    id: "ex-cable-face-pull",
    name: "Cable Face Pull",
    slug: "cable-face-pull",
    category: "cable",
    primaryMuscles: ["upper_back", "shoulders"],
    secondaryMuscles: ["traps", "biceps", "forearms"],
    equipment: "Cable Pulley & Rope Attachment",
    setupSteps: [
      "Set the cable around upper-chest to face height and attach a rope.",
      "Stand with feet hip-width apart and grip the rope ends with palms facing inward.",
      "Brace the trunk and keep the ribcage stacked over the pelvis.",
      "Begin with the arms extended and the shoulders down away from the ears.",
    ],
    executionSteps: [
      "Pull the rope toward the face while driving the elbows outward and slightly behind the body.",
      "Rotate the forearms so the hands finish beside the temples or ears.",
      "Pause briefly while squeezing the rear delts and upper back.",
      "Return the rope slowly until the elbows are straight without shrugging.",
    ],
    commonMistakes: [
      {
        mistake: "Pulling the rope to the chest like a row.",
        correction:
          "Aim toward the face and let the elbows travel outward to emphasize the rear shoulder and upper back.",
      },
      {
        mistake: "Shrugging the shoulders during the pull.",
        correction:
          "Depress the shoulders before initiating and keep the neck relaxed.",
      },
    ],
    fatigueIndex: 1,
    sfrTier: "S",
    recommendedRepRange: { min: 12, max: 20 },
    imageUrl: "/images/exercises/cable-face-pull.webp",
    svgFocusIds: ["rear_shoulder", "upper_back", "traps"],
  },

  {
    id: "ex-bb-standing-ohp",
    name: "Standing Overhead Barbell Press",
    slug: "standing-overhead-barbell-press",
    category: "barbell",
    primaryMuscles: ["shoulders"],
    secondaryMuscles: ["triceps", "upper_back", "abs"],
    equipment: "Olympic Barbell & Rack",
    setupSteps: [
      "Set the bar around upper-chest height and grip it just outside shoulder width.",
      "Stand with feet about hip-width apart, glutes lightly squeezed, and ribs stacked over the pelvis.",
      "Brace the abdomen and keep the wrists straight with the forearms near vertical.",
      "Unrack the bar to the front rack position with elbows slightly in front of the bar.",
    ],
    executionSteps: [
      "Press the bar upward while moving the head slightly back to clear the bar path.",
      "Keep the elbows under the wrists and avoid excessive backward lean of the torso.",
      "As the bar passes the forehead, bring the head forward so the bar finishes over the mid-foot.",
      "Lower the bar under control to the upper chest while keeping the trunk braced.",
    ],
    commonMistakes: [
      {
        mistake: "Overarching the lower back to finish the press.",
        correction:
          "Brace the abs and squeeze the glutes so the ribs stay stacked over the pelvis.",
      },
      {
        mistake: "Pressing the bar around the face instead of vertically.",
        correction:
          "Move the head back slightly during the first part of the press, then return it forward under the bar.",
      },
    ],
    fatigueIndex: 4,
    sfrTier: "A",
    recommendedRepRange: { min: 5, max: 10 },
    imageUrl: "/images/exercises/standing-overhead-barbell-press.webp",
    svgFocusIds: ["shoulders", "front_shoulder", "triceps", "abs"],
  },
  {
    id: "ex-bb-seated-ohp",
    name: "Seated Barbell Overhead Press",
    slug: "seated-barbell-overhead-press",
    category: "barbell",
    primaryMuscles: ["shoulders"],
    secondaryMuscles: ["triceps", "upper_back"],
    equipment: "Barbell & Upright Bench",
    setupSteps: [
      "Set the bench back to a near-vertical position with the bar just below chin or upper-chest height.",
      "Sit with feet firmly planted and grip the bar slightly wider than shoulder-width.",
      "Press the upper back into the bench while keeping the ribs controlled.",
      "Unrack the bar to the front rack with wrists stacked over the elbows.",
    ],
    executionSteps: [
      "Press the bar upward while keeping the elbows slightly in front of the wrists.",
      "Move the head back just enough for the bar to pass, then bring it forward under the bar.",
      "Lock out with the bar directly over the mid-foot and avoid shrugging excessively.",
      "Lower the bar slowly to upper-chest height while keeping the trunk supported.",
    ],
    commonMistakes: [
      {
        mistake: "Using excessive bench recline.",
        correction:
          "Keep the backrest near vertical so the movement remains a true overhead press rather than an incline press.",
      },
      {
        mistake: "Letting the lower back arch hard against the bench.",
        correction:
          "Keep the glutes and abs engaged and maintain contact between the upper back and pad.",
      },
    ],
    fatigueIndex: 3,
    sfrTier: "A",
    recommendedRepRange: { min: 6, max: 10 },
    imageUrl: "/images/exercises/seated-barbell-overhead-press.webp",
    svgFocusIds: ["shoulders", "front_shoulder", "triceps"],
  },
  {
    id: "ex-db-seated-shoulder-press",
    name: "Seated Dumbbell Shoulder Press",
    slug: "seated-dumbbell-shoulder-press",
    category: "dumbbell",
    primaryMuscles: ["shoulders"],
    secondaryMuscles: ["triceps", "upper_back"],
    equipment: "Pair of Dumbbells & Upright Bench",
    setupSteps: [
      "Set the bench to about 75-85 degrees and plant both feet firmly on the floor.",
      "Bring the dumbbells to shoulder height with palms facing slightly forward.",
      "Keep the upper back against the pad and brace the ribs down.",
      "Set the elbows slightly below the wrists before initiating the press.",
    ],
    executionSteps: [
      "Press both dumbbells upward while keeping the elbows under the wrists.",
      "Allow the dumbbells to travel slightly inward as they rise without forcing them together.",
      "Reach a controlled overhead lockout while keeping the head neutral.",
      "Lower the dumbbells slowly until the upper arms reach a comfortable shoulder stretch.",
    ],
    commonMistakes: [
      {
        mistake: "Using a large back arch to move the dumbbells.",
        correction:
          "Keep the ribcage stacked and reduce the load if you cannot press without lumbar extension.",
      },
      {
        mistake: "Dropping the elbows too far behind the torso at the bottom.",
        correction:
          "Stop at a shoulder-friendly depth where the forearms remain close to vertical.",
      },
    ],
    fatigueIndex: 3,
    sfrTier: "S",
    recommendedRepRange: { min: 6, max: 12 },
    imageUrl: "/images/exercises/seated-dumbbell-shoulder-press.webp",
    svgFocusIds: ["shoulders", "front_shoulder", "side_shoulder", "triceps"],
  },
  {
    id: "ex-db-arnold-press",
    name: "Arnold Press",
    slug: "arnold-press",
    category: "dumbbell",
    primaryMuscles: ["shoulders"],
    secondaryMuscles: ["triceps", "upper_back"],
    equipment: "Pair of Dumbbells & Upright Bench",
    setupSteps: [
      "Sit upright with feet planted and hold the dumbbells at shoulder height with palms facing the body.",
      "Keep the elbows below the wrists and brace the abdomen against lumbar extension.",
      "Set the bench near vertical and keep the upper back supported.",
      "Start with the dumbbells close together in front of the shoulders.",
    ],
    executionSteps: [
      "Press upward while rotating the palms forward as the elbows travel outward.",
      "Continue until the dumbbells are overhead with forearms stacked beneath the wrists.",
      "Pause briefly at lockout without shrugging or overextending the back.",
      "Reverse the rotation as you lower the dumbbells slowly to the starting position.",
    ],
    commonMistakes: [
      {
        mistake: "Rotating too quickly at the bottom.",
        correction:
          "Perform the forearm rotation smoothly so the shoulder remains centered throughout the transition.",
      },
      {
        mistake: "Using momentum from the torso.",
        correction:
          "Keep the upper back supported and reduce the load so the shoulders perform the rotation and press.",
      },
    ],
    fatigueIndex: 3,
    sfrTier: "A",
    recommendedRepRange: { min: 8, max: 12 },
    imageUrl: "/images/exercises/arnold-press.webp",
    svgFocusIds: ["shoulders", "front_shoulder", "side_shoulder", "triceps"],
  },
  {
    id: "ex-machine-shoulder-press",
    name: "Machine Shoulder Press",
    slug: "machine-shoulder-press",
    category: "machine",
    primaryMuscles: ["shoulders"],
    secondaryMuscles: ["triceps"],
    equipment: "Selectorized Shoulder Press Machine",
    setupSteps: [
      "Adjust the seat so the handles begin around ear to shoulder height.",
      "Plant both feet firmly and keep the head and upper back against the back pad.",
      "Grip the handles with wrists neutral and elbows slightly below the hands.",
      "Set the load so the starting position allows a comfortable shoulder stretch.",
    ],
    executionSteps: [
      "Press the handles upward while keeping the forearms aligned under the grips.",
      "Extend the elbows without aggressively shrugging the shoulders.",
      "Pause briefly near lockout while keeping the ribcage controlled against the pad.",
      "Lower the handles slowly to the deepest comfortable position.",
    ],
    commonMistakes: [
      {
        mistake:
          "Setting the seat too low so the handles begin behind the head.",
        correction:
          "Raise the seat until the handles start slightly in front of the shoulders.",
      },
      {
        mistake: "Using excessive momentum from the legs.",
        correction:
          "Keep the feet planted and the pelvis still while pressing only through the upper body.",
      },
    ],
    fatigueIndex: 2,
    sfrTier: "S",
    recommendedRepRange: { min: 8, max: 15 },
    imageUrl: "/images/exercises/machine-shoulder-press.webp",
    svgFocusIds: ["shoulders", "front_shoulder", "side_shoulder", "triceps"],
  },
  {
    id: "ex-machine-smith-overhead-press",
    name: "Smith Machine Overhead Press",
    slug: "smith-machine-overhead-press",
    category: "machine",
    primaryMuscles: ["shoulders"],
    secondaryMuscles: ["triceps", "upper_back"],
    equipment: "Smith Machine & Adjustable Bench",
    setupSteps: [
      "Set the bench or seat so the bar travels directly over the shoulders without striking the face.",
      "Grip the bar slightly wider than shoulder width with wrists stacked.",
      "Press the upper back into the pad and brace the abdomen.",
      "Unhook the bar and position it just above the upper chest.",
    ],
    executionSteps: [
      "Press the bar upward along the machine rails while keeping elbows under the wrists.",
      "Maintain a stable ribcage and avoid using excessive lumbar extension.",
      "Pause briefly at the top with the bar aligned over the shoulders.",
      "Lower the bar slowly to the upper chest without bouncing off the supports.",
    ],
    commonMistakes: [
      {
        mistake:
          "Setting the bench too far forward or backward relative to the rails.",
        correction:
          "Align the seat so the bar passes naturally over the shoulders rather than the forehead.",
      },
      {
        mistake: "Letting the lower back arch hard off the bench.",
        correction:
          "Brace the abs and keep the back supported while reducing load if necessary.",
      },
    ],
    fatigueIndex: 2,
    sfrTier: "A",
    recommendedRepRange: { min: 6, max: 12 },
    imageUrl: "/images/exercises/smith-machine-overhead-press.webp",
    svgFocusIds: ["shoulders", "front_shoulder", "side_shoulder", "triceps"],
  },
  {
    id: "ex-db-standing-lateral-raise",
    name: "Standing Dumbbell Lateral Raise",
    slug: "standing-dumbbell-lateral-raise",
    category: "dumbbell",
    primaryMuscles: ["shoulders"],
    secondaryMuscles: ["traps"],
    equipment: "Pair of Dumbbells",
    setupSteps: [
      "Stand with feet hip-width apart and hold the dumbbells at your sides with a neutral grip.",
      "Brace the trunk and keep the ribs stacked over the pelvis.",
      "Soften the elbows slightly and keep that angle consistent through the movement.",
      "Start with the shoulders relaxed and the dumbbells just outside the thighs.",
    ],
    executionSteps: [
      "Raise the arms out to the sides in the scapular plane with the elbows leading slightly.",
      "Lift until the upper arms approach shoulder height without shrugging.",
      "Pause briefly at the top while keeping the traps relaxed as much as possible.",
      "Lower the dumbbells slowly until the shoulders return to the starting position.",
    ],
    commonMistakes: [
      {
        mistake: "Swinging the dumbbells using the hips.",
        correction:
          "Stand still and reduce the load enough to control both directions.",
      },
      {
        mistake: "Turning the thumbs sharply downward.",
        correction:
          "Keep the hands neutral or slightly thumbs-up to maintain a comfortable shoulder position.",
      },
    ],
    fatigueIndex: 1,
    sfrTier: "S",
    recommendedRepRange: { min: 12, max: 20 },
    imageUrl: "/images/exercises/standing-dumbbell-lateral-raise.webp",
    svgFocusIds: ["side_shoulder", "traps"],
  },
  {
    id: "ex-db-seated-lateral-raise",
    name: "Seated Dumbbell Lateral Raise",
    slug: "seated-dumbbell-lateral-raise",
    category: "dumbbell",
    primaryMuscles: ["shoulders"],
    secondaryMuscles: ["traps"],
    equipment: "Pair of Dumbbells & Flat Bench",
    setupSteps: [
      "Sit upright near the edge of a bench with feet flat and dumbbells beside the thighs.",
      "Brace the trunk and keep the spine neutral without leaning backward.",
      "Maintain a small elbow bend and set the shoulder blades in a relaxed position.",
      "Start with the dumbbells hanging beside the knees.",
    ],
    executionSteps: [
      "Raise the arms outward with the elbows leading and the wrists relaxed.",
      "Stop around shoulder height or slightly below if that provides better control.",
      "Pause briefly while keeping the torso still and the neck relaxed.",
      "Lower the dumbbells slowly to the sides without letting them drop.",
    ],
    commonMistakes: [
      {
        mistake: "Leaning backward to shorten the range.",
        correction:
          "Keep the torso upright and use a lower load so the delts remain responsible for the motion.",
      },
      {
        mistake: "Shrugging aggressively near the top.",
        correction:
          "Lead with the elbows and keep the shoulders away from the ears.",
      },
    ],
    fatigueIndex: 1,
    sfrTier: "S",
    recommendedRepRange: { min: 12, max: 20 },
    imageUrl: "/images/exercises/seated-dumbbell-lateral-raise.webp",
    svgFocusIds: ["side_shoulder", "traps"],
  },
  {
    id: "ex-cable-behind-back-lateral-raise",
    name: "Cable Lateral Raise Behind-the-Back",
    slug: "cable-lateral-raise-behind-the-back",
    category: "cable",
    primaryMuscles: ["shoulders"],
    secondaryMuscles: ["traps"],
    equipment: "Low Cable Pulley & Single Handle",
    setupSteps: [
      "Set the pulley at the lowest position and stand beside the cable column.",
      "Reach the working hand behind the hips and grip the handle with a neutral wrist.",
      "Stand tall with feet stable, trunk braced, and shoulder relaxed before the first rep.",
      "Position the cable so it creates tension from the starting position.",
    ],
    executionSteps: [
      "Raise the working arm out to the side in a smooth arc with the elbow leading slightly.",
      "Keep the torso vertical and avoid rotating toward the cable.",
      "Pause near shoulder height while maintaining tension through the lateral delt.",
      "Lower the arm slowly behind the torso until the shoulder returns to a comfortable stretch.",
    ],
    commonMistakes: [
      {
        mistake: "Rotating the trunk toward the cable to shorten the lever.",
        correction:
          "Keep the hips and chest square and reduce the load if the cable pulls the torso around.",
      },
      {
        mistake: "Using a straight locked elbow.",
        correction:
          "Maintain a small elbow bend so the joint stays comfortable and the delt controls the movement.",
      },
    ],
    fatigueIndex: 1,
    sfrTier: "S",
    recommendedRepRange: { min: 12, max: 20 },
    imageUrl: "/images/exercises/cable-lateral-raise-behind-the-back.webp",
    svgFocusIds: ["side_shoulder", "traps"],
  },
  {
    id: "ex-cable-egyptian-lateral-raise",
    name: "Egyptian Cable Lateral Raise",
    slug: "egyptian-cable-lateral-raise",
    category: "cable",
    primaryMuscles: ["shoulders"],
    secondaryMuscles: ["traps"],
    equipment: "Low Cable Pulley & Single Handle",
    setupSteps: [
      "Set the cable at the lowest height and stand side-on to the pulley with the outside hand holding the handle.",
      "Take a stable stance with the inside foot closer to the column and bend slightly through the torso.",
      "Brace the trunk and keep the working arm softly bent.",
      "Start with the hand near the hip and the cable passing behind the body.",
    ],
    executionSteps: [
      "Raise the arm out and slightly forward while maintaining the small torso lean.",
      "Lift until the upper arm approaches shoulder height without turning the movement into a shrug.",
      "Pause briefly at peak shoulder abduction and keep the wrist neutral.",
      "Lower slowly into the stretched position while maintaining cable tension.",
    ],
    commonMistakes: [
      {
        mistake: "Using a large side bend to swing the arm upward.",
        correction:
          "Keep the torso angle fixed and use a lighter load so the delt controls the arc.",
      },
      {
        mistake: "Driving the hand higher than the elbow.",
        correction:
          "Let the elbow lead and keep the hand slightly below or level with it through the main range.",
      },
    ],
    fatigueIndex: 1,
    sfrTier: "S",
    recommendedRepRange: { min: 12, max: 20 },
    imageUrl: "/images/exercises/egyptian-cable-lateral-raise.webp",
    svgFocusIds: ["side_shoulder", "traps"],
  },
  {
    id: "ex-bb-upright-row",
    name: "Barbell Upright Row",
    slug: "barbell-upright-row",
    category: "barbell",
    primaryMuscles: ["shoulders"],
    secondaryMuscles: ["traps", "forearms"],
    equipment: "Olympic Barbell",
    setupSteps: [
      "Stand with feet hip-width apart and hold the bar with a grip slightly narrower than shoulder-width.",
      "Brace the trunk and keep the bar resting against the thighs.",
      "Set the elbows softly bent and maintain a neutral wrist.",
      "Begin with the shoulders relaxed and the torso upright.",
    ],
    executionSteps: [
      "Raise the elbows outward and upward while keeping the bar close to the body.",
      "Stop when the upper arms approach shoulder height rather than forcing a higher range.",
      "Pause briefly at the top with the traps and lateral delts engaged.",
      "Lower the bar slowly to the thighs while keeping the wrists and elbows controlled.",
    ],
    commonMistakes: [
      {
        mistake: "Pulling the bar far above shoulder height.",
        correction:
          "Stop around upper-arm parallel with the floor to avoid unnecessary shoulder compression.",
      },
      {
        mistake: "Using an extremely narrow grip.",
        correction:
          "Use a moderate grip width that allows the elbows to travel comfortably without wrist or shoulder strain.",
      },
    ],
    fatigueIndex: 2,
    sfrTier: "B",
    recommendedRepRange: { min: 8, max: 15 },
    imageUrl: "/images/exercises/barbell-upright-row.webp",
    svgFocusIds: ["side_shoulder", "traps", "forearms"],
  },
  {
    id: "ex-cable-upright-row",
    name: "Cable Upright Row",
    slug: "cable-upright-row",
    category: "cable",
    primaryMuscles: ["shoulders"],
    secondaryMuscles: ["traps", "forearms"],
    equipment: "Low Cable Pulley & Straight Bar",
    setupSteps: [
      "Set the cable at the lowest position and attach a straight or short bar.",
      "Stand tall with feet hip-width apart and grip the bar around shoulder width.",
      "Brace the trunk and keep the cable taut with the bar near the thighs.",
      "Relax the shoulders before starting the pull.",
    ],
    executionSteps: [
      "Lead with the elbows and pull the bar upward along the torso.",
      "Raise only until the upper arms are around shoulder height or your comfortable limit.",
      "Pause briefly while keeping the wrists neutral and shoulders controlled.",
      "Lower the bar slowly until the arms are straight without letting the stack crash.",
    ],
    commonMistakes: [
      {
        mistake:
          "Allowing the cable to pull the shoulders forward at the bottom.",
        correction:
          "Maintain an upright posture and a controlled bottom position before each repetition.",
      },
      {
        mistake: "Continuing higher once the elbows exceed shoulder height.",
        correction:
          "Stop earlier if that range causes pinching or excessive internal rotation.",
      },
    ],
    fatigueIndex: 1,
    sfrTier: "B",
    recommendedRepRange: { min: 10, max: 15 },
    imageUrl: "/images/exercises/cable-upright-row.webp",
    svgFocusIds: ["side_shoulder", "traps", "forearms"],
  },
  {
    id: "ex-db-rear-delt-flye",
    name: "Dumbbell Rear Delt Flye",
    slug: "dumbbell-rear-delt-flye",
    category: "dumbbell",
    primaryMuscles: ["shoulders"],
    secondaryMuscles: ["upper_back", "traps"],
    equipment: "Pair of Dumbbells & Incline Bench",
    setupSteps: [
      "Set an incline bench around 30-45 degrees and lie chest-down with feet grounded.",
      "Hold the dumbbells beneath the shoulders with palms facing each other.",
      "Brace the trunk and keep the neck neutral rather than lifting the head.",
      "Start with the elbows softly bent and shoulders relaxed.",
    ],
    executionSteps: [
      "Raise the dumbbells outward and slightly backward using the rear delts.",
      "Keep the elbows softly bent and the torso pressed into the bench.",
      "Pause briefly when the upper arms approach torso level.",
      "Lower the dumbbells slowly until the rear shoulders are fully lengthened.",
    ],
    commonMistakes: [
      {
        mistake:
          "Rowing the dumbbells by pulling the elbows far behind the torso.",
        correction:
          "Use a shorter rearward path and focus on moving the upper arms laterally.",
      },
      {
        mistake: "Shrugging during the raise.",
        correction:
          "Keep the neck relaxed and shoulders away from the ears while the elbows lead.",
      },
    ],
    fatigueIndex: 1,
    sfrTier: "S",
    recommendedRepRange: { min: 12, max: 20 },
    imageUrl: "/images/exercises/dumbbell-rear-delt-flye.webp",
    svgFocusIds: ["rear_shoulder", "upper_back", "traps"],
  },
  {
    id: "ex-machine-reverse-pec-deck",
    name: "Reverse Pec Deck Machine",
    slug: "reverse-pec-deck-machine",
    category: "machine",
    primaryMuscles: ["shoulders"],
    secondaryMuscles: ["upper_back", "traps"],
    equipment: "Reverse Pec Deck Machine",
    setupSteps: [
      "Adjust the seat so the handles align roughly with shoulder height.",
      "Sit facing the machine pad with the chest supported and feet firmly on the floor.",
      "Grip the handles with palms facing inward and keep a soft bend in the elbows.",
      "Set the shoulders down before moving the arms backward.",
    ],
    executionSteps: [
      "Sweep the arms outward and backward while keeping the elbows softly bent.",
      "Move through a range that brings the upper arms roughly in line with the torso.",
      "Pause briefly while squeezing the rear delts and upper back.",
      "Return the handles slowly until the rear shoulders are stretched under control.",
    ],
    commonMistakes: [
      {
        mistake: "Pulling the handles too far behind the body.",
        correction:
          "Stop when the upper arms reach the torso line instead of forcing excessive horizontal extension.",
      },
      {
        mistake: "Using a bent-arm row pattern.",
        correction:
          "Maintain a consistent elbow angle and focus on moving the upper arms apart.",
      },
    ],
    fatigueIndex: 1,
    sfrTier: "S",
    recommendedRepRange: { min: 12, max: 20 },
    imageUrl: "/images/exercises/reverse-pec-deck-machine.webp",
    svgFocusIds: ["rear_shoulder", "upper_back", "traps"],
  },
  {
    id: "ex-cable-rear-delt-flye",
    name: "Cable Rear Delt Flye",
    slug: "cable-rear-delt-flye",
    category: "cable",
    primaryMuscles: ["shoulders"],
    secondaryMuscles: ["upper_back", "traps"],
    equipment: "Dual Cable Pulley & Single Handles",
    setupSteps: [
      "Set both pulleys around shoulder height and cross the cables so each hand reaches the opposite handle.",
      "Stand centered with feet hip-width apart and a slight knee bend.",
      "Brace the trunk and keep the arms softly bent.",
      "Start with the hands crossed in front of the torso and shoulders relaxed.",
    ],
    executionSteps: [
      "Open the arms outward in a wide arc by moving the upper arms laterally and backward.",
      "Keep the torso stationary and the elbow bend nearly unchanged.",
      "Pause when the arms approach the torso line and squeeze the rear delts.",
      "Return slowly to the crossed position while maintaining cable tension.",
    ],
    commonMistakes: [
      {
        mistake: "Turning the movement into a cable row by bending the elbows.",
        correction:
          "Keep a stable elbow angle and think about spreading the arms apart.",
      },
      {
        mistake: "Using a large torso lean to create momentum.",
        correction:
          "Stand tall and use a load that allows the trunk to remain still.",
      },
    ],
    fatigueIndex: 1,
    sfrTier: "S",
    recommendedRepRange: { min: 12, max: 20 },
    imageUrl: "/images/exercises/cable-rear-delt-flye.webp",
    svgFocusIds: ["rear_shoulder", "upper_back", "traps"],
  },

  {
    id: "ex-bb-high-bar-squat",
    name: "Barbell Back Squat High-Bar",
    slug: "barbell-back-squat-high-bar",
    category: "barbell",
    primaryMuscles: ["quadriceps"],
    secondaryMuscles: ["glutes", "hamstrings", "lower_back", "abs"],
    equipment: "Olympic Barbell & Squat Rack",
    setupSteps: [
      "Set the bar on the upper traps and position the J-hooks so the unrack requires minimal tiptoeing.",
      "Use a stance around shoulder-width with toes turned out about 15-30 degrees.",
      "Brace the abdomen, squeeze the upper back, and keep the elbows angled down.",
      "Unrack the bar with two short steps and place the feet symmetrically before descending.",
    ],
    executionSteps: [
      "Break at the hips and knees together while keeping the chest tall and knees tracking over the toes.",
      "Descend under control until the thighs reach at least parallel if mobility allows.",
      "Pause briefly at the bottom without relaxing the trunk or collapsing the knees inward.",
      "Drive through the mid-foot and extend the knees and hips together to stand tall.",
    ],
    commonMistakes: [
      {
        mistake: "Allowing the knees to cave inward during the ascent.",
        correction:
          "Push the knees toward the second and third toes and keep the feet actively rooted.",
      },
      {
        mistake: "Losing the upper-back brace as depth increases.",
        correction:
          "Brace harder, reduce the load, and use a depth where the torso remains controlled.",
      },
    ],
    fatigueIndex: 5,
    sfrTier: "B",
    recommendedRepRange: { min: 4, max: 8 },
    imageUrl: "/images/exercises/barbell-back-squat-high-bar.webp",
    svgFocusIds: ["quadriceps", "glutes", "hamstrings", "abs", "lower_back"],
  },
  {
    id: "ex-bb-low-bar-squat",
    name: "Barbell Back Squat Low-Bar",
    slug: "barbell-back-squat-low-bar",
    category: "barbell",
    primaryMuscles: ["quadriceps", "glutes"],
    secondaryMuscles: ["hamstrings", "lower_back", "abs"],
    equipment: "Olympic Barbell & Squat Rack",
    setupSteps: [
      "Place the bar across the rear delts just below the spine of the scapulae and grip it firmly.",
      "Use a medium-to-wide stance with toes turned out according to hip anatomy.",
      "Brace the trunk and pull the elbows down to create upper-back tension.",
      "Unrack and step back into a stable stance with the bar centered over the mid-foot.",
    ],
    executionSteps: [
      "Sit the hips back while bending the knees and keep the bar balanced over the mid-foot.",
      "Maintain a controlled forward torso inclination and keep the knees tracking with the toes.",
      "Descend to a consistent depth that preserves a neutral spine and stable pelvis.",
      "Drive through the floor and extend the hips and knees together until standing tall.",
    ],
    commonMistakes: [
      {
        mistake: "Trying to stay as upright as in a high-bar squat.",
        correction:
          "Allow the torso to lean forward naturally so the bar stays balanced over the mid-foot.",
      },
      {
        mistake: "Letting the hips rise faster than the shoulders.",
        correction:
          "Push the floor away evenly and use a load that keeps the trunk angle stable.",
      },
    ],
    fatigueIndex: 5,
    sfrTier: "B",
    recommendedRepRange: { min: 4, max: 8 },
    imageUrl: "/images/exercises/barbell-back-squat-low-bar.webp",
    svgFocusIds: ["quadriceps", "glutes", "hamstrings", "lower_back", "abs"],
  },
  {
    id: "ex-bb-front-squat",
    name: "Barbell Front Squat",
    slug: "barbell-front-squat",
    category: "barbell",
    primaryMuscles: ["quadriceps"],
    secondaryMuscles: ["glutes", "upper_back", "abs"],
    equipment: "Olympic Barbell & Squat Rack",
    setupSteps: [
      "Rack the bar across the front delts with either a clean-style grip or crossed-arm position.",
      "Set the feet around shoulder-width with toes turned out slightly.",
      "Lift the chest, brace the abdomen, and keep the elbows high so the bar rests securely.",
      "Unrack and step back with the bar balanced over the mid-foot.",
    ],
    executionSteps: [
      "Bend the knees and hips together while keeping the elbows high and torso upright.",
      "Descend under control until the thighs reach at least parallel if mobility allows.",
      "Pause briefly without allowing the elbows or chest to drop.",
      "Drive upward through the mid-foot and extend the knees and hips until standing tall.",
    ],
    commonMistakes: [
      {
        mistake: "Dropping the elbows during the descent.",
        correction:
          "Think elbows toward the wall ahead of you and reduce load if the bar rolls forward.",
      },
      {
        mistake: "Allowing the heels to lift off the floor.",
        correction:
          "Use a stance and ankle position that permit the knees to travel forward while the whole foot stays grounded.",
      },
    ],
    fatigueIndex: 5,
    sfrTier: "A",
    recommendedRepRange: { min: 4, max: 8 },
    imageUrl: "/images/exercises/barbell-front-squat.webp",
    svgFocusIds: ["quadriceps", "glutes", "abs", "upper_back"],
  },
  {
    id: "ex-bb-zercher-squat",
    name: "Zercher Squat",
    slug: "zercher-squat",
    category: "barbell",
    primaryMuscles: ["quadriceps", "glutes"],
    secondaryMuscles: ["upper_back", "abs", "hamstrings"],
    equipment: "Olympic Barbell & Rack",
    setupSteps: [
      "Set the bar in the rack around lower-abdominal to hip height and cradle it in the elbows.",
      "Use a shoulder-width stance with toes turned out slightly.",
      "Brace the abdomen and keep the chest tall while pinning the bar into the elbows.",
      "Unrack carefully and take short steps to establish a balanced stance.",
    ],
    executionSteps: [
      "Descend by bending the knees and hips while keeping the torso relatively upright.",
      "Track the knees over the toes and keep the bar close to the body.",
      "Reach a controlled bottom position without letting the elbows flare excessively.",
      "Drive through the mid-foot and extend the hips and knees to return to standing.",
    ],
    commonMistakes: [
      {
        mistake: "Letting the bar roll away from the torso.",
        correction:
          "Clamp the bar between the forearms and torso and keep the elbows pointed down.",
      },
      {
        mistake: "Collapsing forward under the load.",
        correction:
          "Brace the trunk harder and reduce the load so the chest remains elevated.",
      },
    ],
    fatigueIndex: 4,
    sfrTier: "B",
    recommendedRepRange: { min: 5, max: 10 },
    imageUrl: "/images/exercises/zercher-squat.webp",
    svgFocusIds: ["quadriceps", "glutes", "abs", "upper_back"],
  },
  {
    id: "ex-machine-hack-squat",
    name: "Hack Squat Machine",
    slug: "hack-squat-machine",
    category: "machine",
    primaryMuscles: ["quadriceps"],
    secondaryMuscles: ["glutes", "hamstrings"],
    equipment: "45-Degree Hack Squat Machine",
    setupSteps: [
      "Position the shoulders under the pads and place the feet about shoulder-width on the platform.",
      "Turn the toes slightly outward and keep the entire foot in contact with the platform.",
      "Set the shoulder pads firmly against the body and unlock the machine safeties.",
      "Brace the abdomen and keep the pelvis and upper back supported against the pads.",
    ],
    executionSteps: [
      "Lower the sled by bending the knees and hips while tracking the knees over the toes.",
      "Descend until the thighs are at least parallel or as deep as your machine and mobility allow.",
      "Pause briefly without letting the pelvis roll off the back pad.",
      "Drive through the mid-foot to extend the knees and hips, stopping short of a hard lockout if preferred.",
    ],
    commonMistakes: [
      {
        mistake: "Allowing the heels to lift as the knees travel forward.",
        correction:
          "Keep the full foot planted and adjust stance depth or foot position for your ankle mobility.",
      },
      {
        mistake:
          "Letting the pelvis tuck and lower back flatten aggressively at depth.",
        correction:
          "Use a controlled depth where the pelvis stays supported and avoid chasing excessive range.",
      },
    ],
    fatigueIndex: 3,
    sfrTier: "S",
    recommendedRepRange: { min: 6, max: 12 },
    imageUrl: "/images/exercises/hack-squat-machine.webp",
    svgFocusIds: ["quadriceps", "glutes", "hamstrings"],
  },
  {
    id: "ex-machine-leg-press-45",
    name: "45-Degree Leg Press",
    slug: "45-degree-leg-press",
    category: "machine",
    primaryMuscles: ["quadriceps"],
    secondaryMuscles: ["glutes", "hamstrings"],
    equipment: "45-Degree Leg Press Sled",
    setupSteps: [
      "Sit with the lower back and head fully supported and place the feet shoulder-width apart on the platform.",
      "Set the foot position so the knees can travel over the toes without the heels lifting.",
      "Release the safeties and brace the abdomen before lowering the sled.",
      "Keep the feet evenly weighted from heel to forefoot throughout the range.",
    ],
    executionSteps: [
      "Lower the sled by bending the knees and hips until the thighs approach the torso.",
      "Keep the knees tracking over the toes and maintain contact between the pelvis and back pad.",
      "Pause briefly at the deepest controlled position without allowing the hips to tuck sharply.",
      "Drive through the full foot to extend the knees and hips while stopping short of a hard lockout.",
    ],
    commonMistakes: [
      {
        mistake: "Allowing the lower back or pelvis to round off the pad.",
        correction: "Reduce depth until the pelvis stays supported and stable.",
      },
      {
        mistake: "Locking the knees forcefully at the top.",
        correction:
          "Finish with the knees extended but controlled so the joints remain loaded smoothly.",
      },
    ],
    fatigueIndex: 3,
    sfrTier: "S",
    recommendedRepRange: { min: 8, max: 15 },
    imageUrl: "/images/exercises/45-degree-leg-press.webp",
    svgFocusIds: ["quadriceps", "glutes", "hamstrings"],
  },
  {
    id: "ex-machine-horizontal-leg-press",
    name: "Horizontal Leg Press",
    slug: "horizontal-leg-press",
    category: "machine",
    primaryMuscles: ["quadriceps"],
    secondaryMuscles: ["glutes", "hamstrings"],
    equipment: "Horizontal Leg Press Machine",
    setupSteps: [
      "Adjust the seat and backrest so the knees are comfortably bent at the bottom of the starting position.",
      "Place the feet about shoulder-width apart on the footplate with toes slightly turned out.",
      "Release the handles or lock mechanism and brace the abdomen.",
      "Keep the pelvis and lower back supported against the seat throughout the setup.",
    ],
    executionSteps: [
      "Lower the resistance by bending the knees while keeping the feet fully planted.",
      "Track the knees toward the second and third toes without allowing them to collapse inward.",
      "Pause briefly at the deepest stable position without lifting the hips.",
      "Press through the whole foot until the knees are nearly straight and controlled.",
    ],
    commonMistakes: [
      {
        mistake: "Rounding the pelvis at the bottom.",
        correction:
          "Reduce range or adjust the seat so the lumbar spine remains supported.",
      },
      {
        mistake: "Allowing the knees to move inward on the press.",
        correction:
          "Drive the knees outward in line with the toes and lower the load if necessary.",
      },
    ],
    fatigueIndex: 2,
    sfrTier: "S",
    recommendedRepRange: { min: 8, max: 15 },
    imageUrl: "/images/exercises/horizontal-leg-press.webp",
    svgFocusIds: ["quadriceps", "glutes", "hamstrings"],
  },
  {
    id: "ex-machine-pendulum-squat",
    name: "Pendulum Squat",
    slug: "pendulum-squat",
    category: "machine",
    primaryMuscles: ["quadriceps"],
    secondaryMuscles: ["glutes", "hamstrings"],
    equipment: "Pendulum Squat Machine",
    setupSteps: [
      "Place the upper back against the pad and shoulders under the shoulder supports.",
      "Set the feet around shoulder-width on the platform with toes slightly turned out.",
      "Brace the abdomen and adjust the foot position so the knees can track naturally.",
      "Unlock the machine and establish a stable, full-foot contact before descending.",
    ],
    executionSteps: [
      "Lower the pendulum by bending the knees and hips while allowing the knees to travel forward.",
      "Descend under control until you reach your deepest stable position.",
      "Pause briefly without letting the pelvis tuck off the back pad.",
      "Drive through the mid-foot to extend the knees and hips without forcefully locking out.",
    ],
    commonMistakes: [
      {
        mistake: "Using a stance so narrow that the knees collapse inward.",
        correction:
          "Widen the feet slightly and keep the knees tracking in line with the toes.",
      },
      {
        mistake:
          "Chasing depth after the pelvis starts to lose contact with the pad.",
        correction:
          "Stop at the deepest position where the pelvis remains stable and supported.",
      },
    ],
    fatigueIndex: 3,
    sfrTier: "S",
    recommendedRepRange: { min: 6, max: 12 },
    imageUrl: "/images/exercises/pendulum-squat.webp",
    svgFocusIds: ["quadriceps", "glutes", "hamstrings"],
  },
  {
    id: "ex-db-bulgarian-split-squat",
    name: "Bulgarian Split Squat",
    slug: "bulgarian-split-squat",
    category: "dumbbell",
    primaryMuscles: ["quadriceps", "glutes"],
    secondaryMuscles: ["hamstrings", "calves", "abs"],
    equipment: "Pair of Dumbbells & Bench",
    setupSteps: [
      "Place the rear foot on a bench with the laces or forefoot supported and the front foot far enough forward to allow a deep knee bend.",
      "Hold the dumbbells at your sides with shoulders relaxed and wrists neutral.",
      "Square the hips and torso toward the front while bracing the abdomen.",
      "Load the front foot heavily through the whole foot before descending.",
    ],
    executionSteps: [
      "Lower the rear knee toward the floor by bending the front knee and hip.",
      "Allow the front knee to travel over the toes while keeping the heel planted.",
      "Pause briefly near the bottom without collapsing the torso or hip.",
      "Drive through the front foot to extend the knee and hip until standing tall.",
    ],
    commonMistakes: [
      {
        mistake: "Placing the front foot too close to the bench.",
        correction:
          "Move the front foot farther forward so the heel stays grounded and the knee tracks comfortably.",
      },
      {
        mistake: "Pushing primarily through the rear leg.",
        correction:
          "Treat the rear leg as a kickstand and drive the movement through the front foot.",
      },
    ],
    fatigueIndex: 3,
    sfrTier: "A",
    recommendedRepRange: { min: 8, max: 12 },
    imageUrl: "/images/exercises/bulgarian-split-squat.webp",
    svgFocusIds: ["quadriceps", "glutes", "hamstrings", "calves"],
  },
  {
    id: "ex-db-walking-lunge",
    name: "Walking Lunge",
    slug: "walking-lunge",
    category: "dumbbell",
    primaryMuscles: ["quadriceps", "glutes"],
    secondaryMuscles: ["hamstrings", "calves", "abs"],
    equipment: "Pair of Dumbbells & Open Floor",
    setupSteps: [
      "Stand tall with a dumbbell in each hand and feet about hip-width apart.",
      "Brace the abdomen and keep the shoulders down with arms hanging naturally.",
      "Establish enough walking space for a full stride without obstacles.",
      "Start with the feet parallel and weight evenly distributed.",
    ],
    executionSteps: [
      "Step forward and lower the hips until the front thigh approaches parallel to the floor.",
      "Keep the front heel planted and track the knee over the toes while the rear knee moves toward the floor.",
      "Drive through the front foot and bring the rear leg forward into the next step.",
      "Maintain a steady upright torso and controlled stride length across repetitions.",
    ],
    commonMistakes: [
      {
        mistake:
          "Taking very short steps and forcing the front knee excessively forward.",
        correction:
          "Use a stride length that permits a stable front heel and balanced hip-knee relationship.",
      },
      {
        mistake: "Losing balance because the feet cross the midline.",
        correction:
          "Keep each foot on its own track rather than placing the front foot directly in front of the rear foot.",
      },
    ],
    fatigueIndex: 3,
    sfrTier: "A",
    recommendedRepRange: { min: 8, max: 14 },
    imageUrl: "/images/exercises/walking-lunge.webp",
    svgFocusIds: ["quadriceps", "glutes", "hamstrings", "calves", "abs"],
  },
  {
    id: "ex-db-reverse-lunge",
    name: "Reverse Lunge",
    slug: "reverse-lunge",
    category: "dumbbell",
    primaryMuscles: ["quadriceps", "glutes"],
    secondaryMuscles: ["hamstrings", "calves", "abs"],
    equipment: "Pair of Dumbbells or Barbell",
    setupSteps: [
      "Stand with feet hip-width apart while holding dumbbells at the sides or a barbell across the upper back.",
      "Brace the trunk and keep the shoulders aligned over the hips.",
      "Start with both feet parallel and the front foot planted firmly.",
      "Maintain enough space behind you for a full controlled step.",
    ],
    executionSteps: [
      "Step one leg backward and lower the rear knee toward the floor while keeping the front heel down.",
      "Allow the front knee to track naturally over the toes and keep the hips square.",
      "Pause briefly near the bottom without collapsing the torso.",
      "Drive through the front foot to return to standing and alternate sides.",
    ],
    commonMistakes: [
      {
        mistake: "Pushing off the rear toes to stand.",
        correction:
          "Use the rear leg only for balance and drive primarily through the front heel and mid-foot.",
      },
      {
        mistake: "Letting the front knee collapse inward.",
        correction:
          "Track the knee toward the second and third toes throughout the ascent and descent.",
      },
    ],
    fatigueIndex: 3,
    sfrTier: "A",
    recommendedRepRange: { min: 8, max: 12 },
    imageUrl: "/images/exercises/reverse-lunge.webp",
    svgFocusIds: ["quadriceps", "glutes", "hamstrings", "calves", "abs"],
  },
  {
    id: "ex-kb-goblet-squat",
    name: "Goblet Squat",
    slug: "goblet-squat",
    category: "kettlebell",
    primaryMuscles: ["quadriceps"],
    secondaryMuscles: ["glutes", "hamstrings", "abs", "upper_back"],
    equipment: "Kettlebell or Dumbbell",
    setupSteps: [
      "Hold the kettlebell or dumbbell vertically against the chest with both hands.",
      "Stand with feet around shoulder-width and toes turned out slightly.",
      "Brace the abdomen and keep the elbows pointing down beside the torso.",
      "Distribute bodyweight across the full foot before descending.",
    ],
    executionSteps: [
      "Bend the knees and hips together while keeping the weight close to the chest.",
      "Track the knees over the toes and maintain an upright torso without excessive rounding.",
      "Descend as deep as you can while keeping the heels planted and pelvis controlled.",
      "Drive through the mid-foot to stand tall while keeping the weight close to the sternum.",
    ],
    commonMistakes: [
      {
        mistake: "Letting the weight drift forward from the chest.",
        correction:
          "Keep the implement close to the sternum so the upper back and trunk remain stacked.",
      },
      {
        mistake: "Collapsing the knees inward near the bottom.",
        correction:
          "Push the knees outward in line with the toes while maintaining whole-foot pressure.",
      },
    ],
    fatigueIndex: 2,
    sfrTier: "A",
    recommendedRepRange: { min: 8, max: 15 },
    imageUrl: "/images/exercises/goblet-squat.webp",
    svgFocusIds: ["quadriceps", "glutes", "hamstrings", "abs"],
  },
  {
    id: "ex-bw-sissy-squat",
    name: "Sissy Squat",
    slug: "sissy-squat",
    category: "bodyweight",
    primaryMuscles: ["quadriceps"],
    secondaryMuscles: ["abs", "calves", "glutes"],
    equipment: "Bodyweight & Stable Support",
    setupSteps: [
      "Stand beside a stable support and lightly hold it with one hand for balance.",
      "Position the feet about hip-width apart and keep the heels elevated slightly if needed.",
      "Brace the abdomen and keep the torso upright before bending the knees.",
      "Set the knees and hips in a position that allows controlled forward knee travel.",
    ],
    executionSteps: [
      "Bend the knees and allow them to travel forward while leaning the torso backward as one unit.",
      "Keep the hips extended and maintain tension through the quadriceps as the body descends.",
      "Pause briefly at the deepest controlled position without losing balance.",
      "Drive through the balls of the feet and extend the knees to return upright.",
    ],
    commonMistakes: [
      {
        mistake: "Dropping into the bottom with no control.",
        correction:
          "Use a support and reduce the range until you can control the full eccentric.",
      },
      {
        mistake: "Bending at the hips and turning the movement into a squat.",
        correction:
          "Keep the hips relatively extended and move primarily by flexing and extending the knees.",
      },
    ],
    fatigueIndex: 2,
    sfrTier: "A",
    recommendedRepRange: { min: 10, max: 20 },
    imageUrl: "/images/exercises/sissy-squat.webp",
    svgFocusIds: ["quadriceps", "calves", "abs"],
  },
  {
    id: "ex-machine-leg-extension",
    name: "Leg Extension Machine",
    slug: "leg-extension-machine",
    category: "machine",
    primaryMuscles: ["quadriceps"],
    secondaryMuscles: [],
    equipment: "Leg Extension Machine",
    setupSteps: [
      "Adjust the seat so the knee joint lines up closely with the machine pivot.",
      "Set the ankle pad across the lower shin just above the instep.",
      "Keep the hips and lower back firmly against the seat and grip the side handles.",
      "Align both knees with the pivot before beginning the movement.",
    ],
    executionSteps: [
      "Extend the knees smoothly while keeping the thighs fixed against the seat.",
      "Raise the pad through a controlled arc without kicking or swinging the torso.",
      "Pause briefly near full knee extension and contract the quadriceps.",
      "Lower the weight slowly until the knees reach a comfortable flexed position.",
    ],
    commonMistakes: [
      {
        mistake:
          "Placing the ankle pad too low or too high relative to the shin.",
        correction:
          "Adjust the pad so the machine pivot and knee joint rotate around the same axis.",
      },
      {
        mistake: "Using momentum to slam into the top.",
        correction:
          "Lower the load and use a smooth 1-2 second extension with a controlled peak contraction.",
      },
    ],
    fatigueIndex: 1,
    sfrTier: "S",
    recommendedRepRange: { min: 10, max: 15 },
    imageUrl: "/images/exercises/leg-extension-machine.webp",
    svgFocusIds: ["quadriceps"],
  },

  {
    id: "ex-bb-romanian-deadlift",
    name: "Barbell Romanian Deadlift",
    slug: "barbell-romanian-deadlift",
    category: "barbell",
    primaryMuscles: ["hamstrings", "glutes"],
    secondaryMuscles: ["lower_back", "forearms"],
    equipment: "Olympic Barbell",
    setupSteps: [
      "Stand hip-width apart with the bar against the thighs and grip just outside the legs.",
      "Brace the abdomen, pull the shoulders down, and keep the knees softly bent.",
      "Set the feet firmly and establish a neutral spine before hinging.",
      "Begin with the bar close to the thighs and the hips stacked over the heels.",
    ],
    executionSteps: [
      "Push the hips backward while sliding the bar down the thighs with the knees only slightly flexing.",
      "Keep the bar close to the legs and maintain a long neutral spine.",
      "Lower until the hamstrings are strongly stretched without losing pelvic or spinal control.",
      "Drive the hips forward to stand tall without leaning backward at lockout.",
    ],
    commonMistakes: [
      {
        mistake:
          "Turning the movement into a squat by bending the knees excessively.",
        correction:
          "Keep a small knee bend and prioritize hip travel backward to load the hamstrings.",
      },
      {
        mistake: "Letting the bar drift away from the legs.",
        correction:
          "Engage the lats and keep the bar grazing the thighs and shins through the eccentric.",
      },
    ],
    fatigueIndex: 4,
    sfrTier: "A",
    recommendedRepRange: { min: 6, max: 10 },
    imageUrl: "/images/exercises/barbell-romanian-deadlift.webp",
    svgFocusIds: ["hamstrings", "glutes", "lower_back", "forearms"],
  },
  {
    id: "ex-db-romanian-deadlift",
    name: "Dumbbell Romanian Deadlift",
    slug: "dumbbell-romanian-deadlift",
    category: "dumbbell",
    primaryMuscles: ["hamstrings", "glutes"],
    secondaryMuscles: ["lower_back", "forearms"],
    equipment: "Pair of Dumbbells",
    setupSteps: [
      "Stand with feet hip-width apart and hold the dumbbells in front of the thighs.",
      "Brace the trunk and keep the knees softly bent rather than deeply flexed.",
      "Set the shoulders down and keep the dumbbells close to the body.",
      "Start tall with hips stacked over the heels and spine neutral.",
    ],
    executionSteps: [
      "Push the hips backward while lowering the dumbbells along the thighs.",
      "Maintain a nearly fixed knee angle and a neutral spine through the eccentric.",
      "Descend until the hamstrings are strongly stretched without the lower back rounding.",
      "Drive the hips forward to stand tall while keeping the dumbbells close.",
    ],
    commonMistakes: [
      {
        mistake: "Allowing the dumbbells to swing away from the thighs.",
        correction:
          "Keep the weights close and engage the lats so they track vertically.",
      },
      {
        mistake: "Bending the knees more and more as the dumbbells descend.",
        correction:
          "Keep the knee angle relatively constant and let the hips move backward to create the stretch.",
      },
    ],
    fatigueIndex: 3,
    sfrTier: "A",
    recommendedRepRange: { min: 8, max: 12 },
    imageUrl: "/images/exercises/dumbbell-romanian-deadlift.webp",
    svgFocusIds: ["hamstrings", "glutes", "lower_back", "forearms"],
  },
  {
    id: "ex-bb-stiff-leg-deadlift",
    name: "Stiff-Leg Deadlift",
    slug: "stiff-leg-deadlift",
    category: "barbell",
    primaryMuscles: ["hamstrings", "glutes"],
    secondaryMuscles: ["lower_back", "forearms"],
    equipment: "Olympic Barbell",
    setupSteps: [
      "Stand hip-width apart with the bar close to the thighs and hands just outside the legs.",
      "Keep the knees nearly straight but not locked and brace the abdomen.",
      "Retract the shoulders slightly and maintain a neutral spine.",
      "Begin from a tall standing position with the bar touching the upper thighs.",
    ],
    executionSteps: [
      "Push the hips backward while keeping the knees almost fixed and lower the bar toward the floor.",
      "Keep the bar close and maintain a neutral spine as the hamstrings lengthen.",
      "Stop when further depth would cause pelvic or spinal control to change.",
      "Drive the hips forward to return to standing without hyperextending the lower back.",
    ],
    commonMistakes: [
      {
        mistake:
          "Locking the knees hard and losing the ability to hinge smoothly.",
        correction:
          "Keep a small knee bend that remains nearly unchanged during the set.",
      },
      {
        mistake: "Chasing the floor instead of the hamstring stretch.",
        correction:
          "Stop at the deepest range you can control rather than forcing the plates to touch down.",
      },
    ],
    fatigueIndex: 4,
    sfrTier: "B",
    recommendedRepRange: { min: 6, max: 10 },
    imageUrl: "/images/exercises/stiff-leg-deadlift.webp",
    svgFocusIds: ["hamstrings", "glutes", "lower_back"],
  },
  {
    id: "ex-db-single-leg-rdl",
    name: "Single-Leg Dumbbell RDL",
    slug: "single-leg-dumbbell-rdl",
    category: "dumbbell",
    primaryMuscles: ["hamstrings", "glutes"],
    secondaryMuscles: ["abs", "lower_back", "calves"],
    equipment: "Single or Pair of Dumbbells",
    setupSteps: [
      "Stand on one leg with the working foot rooted through the heel, base of the big toe, and little toe.",
      "Hold the dumbbell in the opposite hand or both hands depending on balance needs.",
      "Brace the trunk and keep a soft bend in the standing knee.",
      "Set the hips square to the floor before initiating the hinge.",
    ],
    executionSteps: [
      "Push the working hip backward while the free leg extends behind you as a counterbalance.",
      "Keep the dumbbell close to the standing leg and maintain a long neutral spine.",
      "Descend until the standing hamstring is strongly stretched without rotating the pelvis.",
      "Drive the standing foot into the floor and extend the hip to return upright.",
    ],
    commonMistakes: [
      {
        mistake: "Opening the hips toward the floor or ceiling.",
        correction:
          "Keep both hip bones pointing downward and move as one unit through the hinge.",
      },
      {
        mistake: "Bending the standing knee deeply as you descend.",
        correction:
          "Keep a small consistent knee bend so the hamstrings remain the primary loaded tissue.",
      },
    ],
    fatigueIndex: 3,
    sfrTier: "A",
    recommendedRepRange: { min: 8, max: 12 },
    imageUrl: "/images/exercises/single-leg-dumbbell-rdl.webp",
    svgFocusIds: ["hamstrings", "glutes", "calves", "abs"],
  },
  {
    id: "ex-machine-seated-leg-curl",
    name: "Seated Leg Curl Machine",
    slug: "seated-leg-curl-machine",
    category: "machine",
    primaryMuscles: ["hamstrings"],
    secondaryMuscles: ["calves"],
    equipment: "Seated Leg Curl Machine",
    setupSteps: [
      "Adjust the seat and backrest so the knee joint lines up with the machine pivot.",
      "Set the lower-leg pad just above the ankles and secure the thigh restraint firmly.",
      "Keep the hips and lower back against the seat with the feet relaxed.",
      "Start with the knees extended to a comfortable range and the stack fully under tension.",
    ],
    executionSteps: [
      "Curl the lower legs downward and backward by flexing the knees without lifting the hips.",
      "Pull smoothly until the hamstrings are maximally shortened within the machine range.",
      "Pause briefly at peak contraction while keeping the pelvis pinned.",
      "Return the weight slowly until the knees are nearly straight and the hamstrings are fully lengthened.",
    ],
    commonMistakes: [
      {
        mistake: "Lifting the hips to gain leverage.",
        correction:
          "Use a lower load and keep the thigh restraint and pelvis firmly anchored.",
      },
      {
        mistake: "Allowing the stack to slam at the top of the eccentric.",
        correction:
          "Control the last portion of knee extension and maintain tension throughout.",
      },
    ],
    fatigueIndex: 1,
    sfrTier: "S",
    recommendedRepRange: { min: 10, max: 15 },
    imageUrl: "/images/exercises/seated-leg-curl-machine.webp",
    svgFocusIds: ["hamstrings", "calves"],
  },
  {
    id: "ex-machine-lying-leg-curl",
    name: "Lying Leg Curl Machine",
    slug: "lying-leg-curl-machine",
    category: "machine",
    primaryMuscles: ["hamstrings"],
    secondaryMuscles: ["calves"],
    equipment: "Lying Leg Curl Machine",
    setupSteps: [
      "Align the knees with the machine pivot and place the lower-leg pad just above the heels.",
      "Secure the hips and torso against the bench with the pelvis neutral.",
      "Hold the handles and keep the head aligned with the spine.",
      "Start with the knees nearly straight and the feet relaxed.",
    ],
    executionSteps: [
      "Curl the heels toward the glutes while keeping the hips pressed into the pad.",
      "Continue until the knees are strongly flexed and the hamstrings are fully shortened.",
      "Pause briefly without lifting the pelvis from the pad.",
      "Lower the pad slowly until the knees return to a controlled extended position.",
    ],
    commonMistakes: [
      {
        mistake: "Arching the lower back and lifting the pelvis.",
        correction:
          "Keep the hips heavy on the pad and reduce the load if the trunk starts moving.",
      },
      {
        mistake: "Pointing the toes aggressively to create extra motion.",
        correction:
          "Keep the ankle relaxed so the knee flexors, rather than the foot position, drive the movement.",
      },
    ],
    fatigueIndex: 1,
    sfrTier: "S",
    recommendedRepRange: { min: 10, max: 15 },
    imageUrl: "/images/exercises/lying-leg-curl-machine.webp",
    svgFocusIds: ["hamstrings", "calves"],
  },
  {
    id: "ex-machine-standing-single-leg-curl",
    name: "Standing Single-Leg Curl Machine",
    slug: "standing-single-leg-curl-machine",
    category: "machine",
    primaryMuscles: ["hamstrings"],
    secondaryMuscles: ["calves"],
    equipment: "Standing Single-Leg Curl Machine",
    setupSteps: [
      "Adjust the machine so the knee joint aligns with the pivot and the thigh pad supports the working leg.",
      "Place the ankle behind the lower pad just above the heel.",
      "Hold the support handles and brace the trunk while keeping the standing leg stable.",
      "Start with the working knee nearly straight and the hip neutral.",
    ],
    executionSteps: [
      "Curl the heel upward by flexing the working knee without rotating the pelvis.",
      "Bring the heel toward the glutes until the hamstring reaches peak contraction.",
      "Pause briefly at the top while keeping the thigh pressed into the pad.",
      "Lower the foot slowly until the knee is comfortably extended.",
    ],
    commonMistakes: [
      {
        mistake: "Rotating the pelvis or leaning the torso to move the weight.",
        correction:
          "Keep the hips square and use the support handles only for balance.",
      },
      {
        mistake: "Cutting the eccentric short.",
        correction:
          "Lower until the knee is nearly straight to use the full controlled hamstring range.",
      },
    ],
    fatigueIndex: 1,
    sfrTier: "S",
    recommendedRepRange: { min: 10, max: 15 },
    imageUrl: "/images/exercises/standing-single-leg-curl-machine.webp",
    svgFocusIds: ["hamstrings", "calves"],
  },
  {
    id: "ex-bb-hip-thrust",
    name: "Barbell Hip Thrust",
    slug: "barbell-hip-thrust",
    category: "barbell",
    primaryMuscles: ["glutes"],
    secondaryMuscles: ["hamstrings", "quadriceps", "abs"],
    equipment: "Olympic Barbell, Plates & Hip-Thrust Bench",
    setupSteps: [
      "Place the upper back against a bench edge around the lower scapulae and position a padded bar across the hips.",
      "Set the feet about hip-width apart with heels positioned so the shins can become near vertical at lockout.",
      "Brace the abdomen and slightly tuck the chin to keep the ribs controlled.",
      "Start with the hips lowered, bar centered across the pelvis, and feet firmly planted.",
    ],
    executionSteps: [
      "Drive through the feet and extend the hips upward while keeping the ribs down.",
      "Reach a top position with the torso and thighs roughly aligned and knees stable.",
      "Pause for one second at lockout while actively squeezing the glutes.",
      "Lower the hips slowly until the glutes are fully lengthened without losing foot pressure.",
    ],
    commonMistakes: [
      {
        mistake: "Hyperextending the lower back at the top.",
        correction:
          "Keep the ribs down and think about posteriorly rotating the pelvis rather than arching the spine.",
      },
      {
        mistake: "Placing the feet too far forward.",
        correction:
          "Move the feet closer so the shins are near vertical at lockout and the glutes can dominate.",
      },
    ],
    fatigueIndex: 3,
    sfrTier: "S",
    recommendedRepRange: { min: 6, max: 12 },
    imageUrl: "/images/exercises/barbell-hip-thrust.webp",
    svgFocusIds: ["glutes", "hamstrings", "quadriceps", "abs"],
  },
  {
    id: "ex-machine-hip-thrust",
    name: "Machine Hip Thrust",
    slug: "machine-hip-thrust",
    category: "machine",
    primaryMuscles: ["glutes"],
    secondaryMuscles: ["hamstrings", "quadriceps", "abs"],
    equipment: "Hip Thrust Machine",
    setupSteps: [
      "Adjust the back support and hip pad so the upper back is supported around the lower scapulae.",
      "Place the feet about hip-width apart with heels positioned for near-vertical shins at lockout.",
      "Secure the lap belt or pad and brace the abdomen before releasing the machine.",
      "Start with the hips low enough to achieve a clear glute stretch without pelvic instability.",
    ],
    executionSteps: [
      "Drive through the whole foot and extend the hips against the machine pad.",
      "Raise the pelvis until the torso and thighs form a nearly straight line.",
      "Pause briefly at full hip extension and squeeze the glutes.",
      "Lower the platform slowly until the hips reach a controlled stretched position.",
    ],
    commonMistakes: [
      {
        mistake: "Extending through the lumbar spine instead of the hips.",
        correction:
          "Keep the ribs down and finish by squeezing the glutes rather than leaning backward.",
      },
      {
        mistake: "Letting the knees collapse inward.",
        correction:
          "Keep the knees tracking with the feet through the entire range.",
      },
    ],
    fatigueIndex: 2,
    sfrTier: "S",
    recommendedRepRange: { min: 8, max: 15 },
    imageUrl: "/images/exercises/machine-hip-thrust.webp",
    svgFocusIds: ["glutes", "hamstrings", "quadriceps"],
  },
  {
    id: "ex-db-glute-bridge",
    name: "Dumbbell Glute Bridge",
    slug: "dumbbell-glute-bridge",
    category: "dumbbell",
    primaryMuscles: ["glutes"],
    secondaryMuscles: ["hamstrings", "quadriceps", "abs"],
    equipment: "Dumbbell & Floor Mat",
    setupSteps: [
      "Lie on your back with knees bent and feet flat about hip-width apart.",
      "Place a dumbbell securely across the pelvis and hold it with both hands.",
      "Pull the ribs down and brace the abdomen before lifting the hips.",
      "Set the heels so the shins can approach vertical at the top of the bridge.",
    ],
    executionSteps: [
      "Drive through the heels and lift the hips while keeping the ribs controlled.",
      "Raise until the knees, hips, and shoulders form a nearly straight line.",
      "Pause briefly at the top and contract the glutes hard without arching the lower back.",
      "Lower the pelvis slowly until the glutes are fully stretched.",
    ],
    commonMistakes: [
      {
        mistake: "Driving primarily through the toes.",
        correction:
          "Keep the heels grounded and think about pushing the floor away through the entire foot.",
      },
      {
        mistake: "Overarching the lower back at lockout.",
        correction:
          "Maintain a slight posterior pelvic tilt and stop when the hips are fully extended.",
      },
    ],
    fatigueIndex: 1,
    sfrTier: "S",
    recommendedRepRange: { min: 10, max: 20 },
    imageUrl: "/images/exercises/dumbbell-glute-bridge.webp",
    svgFocusIds: ["glutes", "hamstrings", "abs"],
  },
  {
    id: "ex-machine-45-hyperextension-glute",
    name: "45-Degree Hyperextension Glute-Focused",
    slug: "45-degree-hyperextension-glute-focused",
    category: "bodyweight",
    primaryMuscles: ["glutes", "hamstrings"],
    secondaryMuscles: ["lower_back"],
    equipment: "45-Degree Hyperextension Bench",
    setupSteps: [
      "Set the hip pad so the top edge sits just below the crease of the hips, allowing the pelvis to hinge freely.",
      "Place the feet firmly on the footplate and keep the knees softly bent.",
      "Cross the arms or hold a weight against the chest and brace the abdomen.",
      "Start with the torso in line with the legs rather than hyperextended.",
    ],
    executionSteps: [
      "Hinge forward from the hips while keeping the spine neutral and the chin tucked.",
      "Lower until the hamstrings and glutes are stretched without rounding the lower back.",
      "Drive the hips into the pad and squeeze the glutes to return to the start position.",
      "Stop at a neutral torso and avoid extending past the line of the legs.",
    ],
    commonMistakes: [
      {
        mistake: "Extending the spine hard at the top.",
        correction:
          "Finish with the torso aligned to the legs and think hips through rather than chest up.",
      },
      {
        mistake: "Rounding through the lower back during the descent.",
        correction:
          "Brace the trunk and hinge from the hips while keeping the spine neutral.",
      },
    ],
    fatigueIndex: 2,
    sfrTier: "S",
    recommendedRepRange: { min: 10, max: 15 },
    imageUrl: "/images/exercises/45-degree-hyperextension-glute-focused.webp",
    svgFocusIds: ["glutes", "hamstrings", "lower_back"],
  },
  {
    id: "ex-bb-good-morning",
    name: "Barbell Good Morning",
    slug: "barbell-good-morning",
    category: "barbell",
    primaryMuscles: ["hamstrings", "glutes"],
    secondaryMuscles: ["lower_back", "upper_back", "abs"],
    equipment: "Barbell & Squat Rack",
    setupSteps: [
      "Place the bar across the upper back similar to a low-bar squat position and grip it firmly.",
      "Stand with feet hip-width apart and knees softly bent.",
      "Brace the abdomen, pull the upper back tight, and keep the head neutral.",
      "Unrack and establish a stable stance with the bar balanced over the mid-foot.",
    ],
    executionSteps: [
      "Push the hips backward while keeping the knees only slightly flexed.",
      "Lower the torso until the hamstrings are strongly stretched without losing spinal neutrality.",
      "Pause briefly at the controlled bottom position while maintaining trunk tension.",
      "Drive the hips forward to return upright without extending the lower back beyond neutral.",
    ],
    commonMistakes: [
      {
        mistake: "Bending the knees excessively and turning it into a squat.",
        correction:
          "Keep a small knee bend and emphasize posterior hip travel.",
      },
      {
        mistake: "Losing spinal position as the torso approaches horizontal.",
        correction:
          "Use a shorter range or lighter load so the spine remains neutral throughout.",
      },
    ],
    fatigueIndex: 4,
    sfrTier: "B",
    recommendedRepRange: { min: 6, max: 10 },
    imageUrl: "/images/exercises/barbell-good-morning.webp",
    svgFocusIds: ["hamstrings", "glutes", "lower_back", "upper_back"],
  },
  {
    id: "ex-cable-pull-through",
    name: "Cable Pull-Through",
    slug: "cable-pull-through",
    category: "cable",
    primaryMuscles: ["glutes"],
    secondaryMuscles: ["hamstrings", "lower_back", "abs"],
    equipment: "Low Cable Pulley & Rope",
    setupSteps: [
      "Set the pulley at the lowest position and face away from the stack while holding the rope between the legs.",
      "Take a stance about hip-width apart and step forward until the cable is taut.",
      "Brace the abdomen and keep the knees softly bent.",
      "Start upright with the rope behind the hips and arms straight.",
    ],
    executionSteps: [
      "Push the hips backward and allow the torso to hinge forward while the rope passes between the legs.",
      "Keep the spine neutral and feel the stretch in the hamstrings and glutes.",
      "Drive the hips forward aggressively until the torso is upright and the glutes are contracted.",
      "Return under control by hinging backward rather than squatting down.",
    ],
    commonMistakes: [
      {
        mistake:
          "Turning the movement into a squat by bending the knees too much.",
        correction:
          "Keep the knee bend modest and emphasize the rearward hip hinge.",
      },
      {
        mistake: "Pulling the cable with the arms.",
        correction:
          "Keep the arms relaxed and straight so the hips, not the shoulders, create the movement.",
      },
    ],
    fatigueIndex: 2,
    sfrTier: "S",
    recommendedRepRange: { min: 10, max: 15 },
    imageUrl: "/images/exercises/cable-pull-through.webp",
    svgFocusIds: ["glutes", "hamstrings", "lower_back", "abs"],
  },
  {
    id: "ex-cable-glute-kickback",
    name: "Cable Glute Kickback",
    slug: "cable-glute-kickback",
    category: "cable",
    primaryMuscles: ["glutes"],
    secondaryMuscles: ["hamstrings"],
    equipment: "Low Cable Pulley & Ankle Strap",
    setupSteps: [
      "Attach an ankle strap to one ankle and set the pulley at the lowest position.",
      "Face the cable stack while holding a stable support and stand on the opposite leg.",
      "Brace the abdomen and keep the pelvis square to the floor.",
      "Begin with the working knee slightly bent and the cable taut.",
    ],
    executionSteps: [
      "Drive the working leg backward by extending the hip without rotating the pelvis.",
      "Keep the knee angle nearly fixed and move the thigh rather than swinging the foot.",
      "Pause briefly at the top when the glute is fully contracted without arching the back.",
      "Return the leg slowly until the hip reaches a controlled stretched position.",
    ],
    commonMistakes: [
      {
        mistake: "Arching the lower back to create more range.",
        correction:
          "Keep the ribs down and reduce the kicking range so the glute, not the spine, creates extension.",
      },
      {
        mistake: "Opening the pelvis toward the cable.",
        correction:
          "Keep both hip bones facing forward and use a lighter load to preserve alignment.",
      },
    ],
    fatigueIndex: 1,
    sfrTier: "S",
    recommendedRepRange: { min: 12, max: 20 },
    imageUrl: "/images/exercises/cable-glute-kickback.webp",
    svgFocusIds: ["glutes", "hamstrings"],
  },
  {
    id: "ex-machine-seated-hip-abduction",
    name: "Seated Hip Abduction Machine",
    slug: "seated-hip-abduction-machine",
    category: "machine",
    primaryMuscles: ["glutes"],
    secondaryMuscles: [],
    equipment: "Seated Hip Abduction Machine",
    setupSteps: [
      "Adjust the seat so the hip joints align closely with the machine pivot.",
      "Position the pads against the outer thighs with the knees comfortably bent.",
      "Sit tall with the back supported and feet placed on the footrests if provided.",
      "Brace the trunk and start with the pads at a controlled inward position.",
    ],
    executionSteps: [
      "Drive the knees outward by abducting the hips while keeping the pelvis against the seat.",
      "Move through a smooth range without using the torso to create momentum.",
      "Pause briefly at the widest comfortable position and squeeze the glutes.",
      "Return slowly until the hips are stretched without allowing the weight stack to crash.",
    ],
    commonMistakes: [
      {
        mistake: "Leaning the torso far forward to increase leverage.",
        correction:
          "Keep the pelvis stable and torso supported so the glutes perform the abduction.",
      },
      {
        mistake: "Using rapid partial repetitions.",
        correction:
          "Use a full controlled range with a brief pause at end range and a slower eccentric.",
      },
    ],
    fatigueIndex: 1,
    sfrTier: "S",
    recommendedRepRange: { min: 12, max: 20 },
    imageUrl: "/images/exercises/seated-hip-abduction-machine.webp",
    svgFocusIds: ["glutes"],
  },

  {
    id: "ex-bb-close-grip-bench-press",
    name: "Close-Grip Barbell Bench Press",
    slug: "close-grip-barbell-bench-press",
    category: "barbell",
    primaryMuscles: ["triceps"],
    secondaryMuscles: ["chest", "shoulders"],
    equipment: "Olympic Barbell & Flat Bench",
    setupSteps: [
      "Lie flat with eyes under the bar and feet planted firmly on the floor.",
      "Grip the bar around shoulder-width rather than extremely narrow to keep the wrists and shoulders comfortable.",
      "Retract and depress the shoulder blades and keep the upper back firmly against the bench.",
      "Unrack the bar and position it over the lower chest with elbows extended.",
    ],
    executionSteps: [
      "Lower the bar under control toward the lower chest while keeping the elbows tucked closer to the torso.",
      "Keep the wrists stacked and forearms near vertical throughout the bottom half.",
      "Touch the chest gently and pause briefly without bouncing.",
      "Press upward until the elbows are straight while keeping the upper arms from flaring excessively.",
    ],
    commonMistakes: [
      {
        mistake:
          "Using an extremely narrow grip that forces the wrists into excessive extension.",
        correction:
          "Use roughly shoulder-width or slightly narrower while maintaining a stacked wrist and forearm.",
      },
      {
        mistake: "Flaring the elbows during the press.",
        correction:
          "Keep the elbows closer to the torso so the triceps can contribute without excessive shoulder stress.",
      },
    ],
    fatigueIndex: 4,
    sfrTier: "A",
    recommendedRepRange: { min: 6, max: 10 },
    imageUrl: "/images/exercises/close-grip-barbell-bench-press.webp",
    svgFocusIds: ["triceps", "chest", "front_shoulder"],
  },
  {
    id: "ex-bb-jm-press",
    name: "JM Press",
    slug: "jm-press",
    category: "barbell",
    primaryMuscles: ["triceps"],
    secondaryMuscles: ["chest", "shoulders"],
    equipment: "Barbell & Flat Bench",
    setupSteps: [
      "Lie on a flat bench with eyes under the bar and feet planted firmly.",
      "Grip the bar around shoulder-width and unrack it over the upper chest.",
      "Retract the shoulder blades and keep the elbows angled forward rather than flaring wide.",
      "Start with the elbows nearly straight and the bar positioned above the upper chest.",
    ],
    executionSteps: [
      "Lower the bar toward the upper chest or chin by bending the elbows while keeping them pointed forward.",
      "Allow the bar to travel slightly toward the face as the forearms tilt backward, maintaining control.",
      "Pause briefly near the bottom without letting the elbows drift far sideways.",
      "Extend the elbows to press the bar back to the starting position while keeping the upper arms relatively fixed.",
    ],
    commonMistakes: [
      {
        mistake: "Letting the elbows flare wide like a bench press.",
        correction:
          "Keep the elbows pointed forward and focus on elbow extension rather than chest pressing.",
      },
      {
        mistake: "Lowering the bar too quickly toward the face.",
        correction:
          "Use a controlled eccentric and conservative range until the movement pattern is stable.",
      },
    ],
    fatigueIndex: 3,
    sfrTier: "B",
    recommendedRepRange: { min: 8, max: 12 },
    imageUrl: "/images/exercises/jm-press.webp",
    svgFocusIds: ["triceps", "chest", "front_shoulder"],
  },
  {
    id: "ex-machine-smith-close-grip-press",
    name: "Smith Machine Close-Grip Press",
    slug: "smith-machine-close-grip-press",
    category: "machine",
    primaryMuscles: ["triceps"],
    secondaryMuscles: ["chest", "shoulders"],
    equipment: "Smith Machine & Flat Bench",
    setupSteps: [
      "Center a flat bench under the Smith machine so the bar aligns over the lower chest.",
      "Grip the bar slightly inside shoulder width with wrists straight.",
      "Plant the feet, retract the shoulder blades, and keep the upper back fixed on the bench.",
      "Unhook the bar and hold it above the chest with elbows extended.",
    ],
    executionSteps: [
      "Lower the bar under control while keeping the elbows relatively close to the torso.",
      "Allow the forearms to remain nearly vertical and keep the wrists stacked.",
      "Pause gently near the lower chest without bouncing.",
      "Press the bar upward by extending the elbows until the arms are straight.",
    ],
    commonMistakes: [
      {
        mistake:
          "Moving the bench too far forward or backward under the rails.",
        correction:
          "Position the bench so the bar descends naturally toward the lower chest.",
      },
      {
        mistake: "Locking out aggressively with the elbows.",
        correction:
          "Finish with controlled elbow extension rather than snapping the joints into full extension.",
      },
    ],
    fatigueIndex: 2,
    sfrTier: "A",
    recommendedRepRange: { min: 8, max: 12 },
    imageUrl: "/images/exercises/smith-machine-close-grip-press.webp",
    svgFocusIds: ["triceps", "chest", "front_shoulder"],
  },
  {
    id: "ex-cable-rope-pushdown",
    name: "Triceps Rope Pushdown",
    slug: "triceps-rope-pushdown",
    category: "cable",
    primaryMuscles: ["triceps"],
    secondaryMuscles: ["forearms"],
    equipment: "High Cable Pulley & Rope Attachment",
    setupSteps: [
      "Set the pulley above head height and attach a rope.",
      "Stand about one step from the stack with feet hip-width apart and knees softly bent.",
      "Grip the rope ends with palms facing each other and keep the elbows close to the torso.",
      "Brace the abdomen and position the upper arms beside the ribs before starting.",
    ],
    executionSteps: [
      "Extend the elbows by pressing the rope downward while keeping the upper arms nearly stationary.",
      "At the bottom, separate the rope ends slightly and fully contract the triceps.",
      "Pause briefly with the elbows extended without leaning heavily into the cable.",
      "Return the rope slowly until the elbows reach roughly 90-110 degrees of flexion or your controlled stretch.",
    ],
    commonMistakes: [
      {
        mistake: "Allowing the elbows to drift forward and backward.",
        correction:
          "Pin the upper arms beside the torso and move primarily through elbow extension.",
      },
      {
        mistake: "Leaning dramatically over the rope to move heavier weight.",
        correction:
          "Stand tall with a slight forward torso angle and use a load that keeps the elbows stable.",
      },
    ],
    fatigueIndex: 1,
    sfrTier: "S",
    recommendedRepRange: { min: 10, max: 15 },
    imageUrl: "/images/exercises/triceps-rope-pushdown.webp",
    svgFocusIds: ["triceps", "forearms"],
  },
  {
    id: "ex-cable-straight-bar-pushdown",
    name: "Straight-Bar Cable Pushdown",
    slug: "straight-bar-cable-pushdown",
    category: "cable",
    primaryMuscles: ["triceps"],
    secondaryMuscles: ["forearms"],
    equipment: "High Cable Pulley & Straight Bar",
    setupSteps: [
      "Set the pulley above head height and attach a straight bar.",
      "Grip the bar slightly narrower than shoulder width with palms facing down.",
      "Stand with feet stable, torso slightly inclined forward, and elbows close to the ribs.",
      "Brace the abdomen and start with the bar around lower-chest height.",
    ],
    executionSteps: [
      "Press the bar downward by extending the elbows while keeping the upper arms fixed.",
      "Move to full controlled elbow extension without rolling the shoulders forward.",
      "Pause briefly at the bottom and squeeze the triceps.",
      "Raise the bar slowly until the elbows bend enough to create a clear stretch.",
    ],
    commonMistakes: [
      {
        mistake: "Using bodyweight to press the bar down.",
        correction:
          "Reduce the load and keep the trunk mostly fixed while the elbows perform the movement.",
      },
      {
        mistake: "Allowing the elbows to flare laterally.",
        correction:
          "Keep them close to the torso so the line of force remains focused on elbow extension.",
      },
    ],
    fatigueIndex: 1,
    sfrTier: "S",
    recommendedRepRange: { min: 10, max: 15 },
    imageUrl: "/images/exercises/straight-bar-cable-pushdown.webp",
    svgFocusIds: ["triceps", "forearms"],
  },
  {
    id: "ex-cable-v-bar-pushdown",
    name: "V-Bar Cable Pushdown",
    slug: "v-bar-cable-pushdown",
    category: "cable",
    primaryMuscles: ["triceps"],
    secondaryMuscles: ["forearms"],
    equipment: "High Cable Pulley & V-Bar",
    setupSteps: [
      "Attach a V-bar to the high pulley and stand directly in front of the stack.",
      "Grip the bar with palms facing inward and position the elbows close to the ribs.",
      "Set the feet hip-width apart and brace the trunk.",
      "Start with the bar around the lower chest and the shoulders relaxed.",
    ],
    executionSteps: [
      "Extend the elbows and drive the V-bar toward the thighs without changing the upper-arm position.",
      "Reach controlled elbow extension and squeeze the triceps at the bottom.",
      "Pause briefly before reversing the movement.",
      "Raise the bar slowly until the elbows are flexed enough to stretch the triceps.",
    ],
    commonMistakes: [
      {
        mistake: "Letting the shoulders roll forward at lockout.",
        correction:
          "Keep the chest stable and finish with elbow extension rather than shoulder flexion.",
      },
      {
        mistake: "Using a jerking motion from the torso.",
        correction:
          "Stabilize the hips and use a controlled eccentric so the cable tension stays on the triceps.",
      },
    ],
    fatigueIndex: 1,
    sfrTier: "S",
    recommendedRepRange: { min: 10, max: 15 },
    imageUrl: "/images/exercises/v-bar-cable-pushdown.webp",
    svgFocusIds: ["triceps", "forearms"],
  },
  {
    id: "ex-cable-overhead-triceps-extension",
    name: "Overhead Cable Triceps Extension",
    slug: "overhead-cable-triceps-extension",
    category: "cable",
    primaryMuscles: ["triceps"],
    secondaryMuscles: ["abs"],
    equipment: "Low Cable Pulley & Rope",
    setupSteps: [
      "Set the pulley low and attach a rope, then face away from the stack.",
      "Take a split stance and bring the rope behind the head with elbows bent.",
      "Keep the upper arms beside or slightly in front of the head and brace the abdomen.",
      "Start with the hands behind the crown of the head and elbows pointing forward.",
    ],
    executionSteps: [
      "Extend the elbows overhead while keeping the upper arms relatively fixed.",
      "Reach full controlled elbow extension without flaring the elbows outward.",
      "Pause briefly at lockout and squeeze the triceps.",
      "Lower the rope slowly behind the head until the triceps are strongly stretched.",
    ],
    commonMistakes: [
      {
        mistake: "Letting the elbows flare wide during extension.",
        correction:
          "Keep the upper arms closer to the head and reduce the load if the elbows cannot stay controlled.",
      },
      {
        mistake: "Arching the lower back to clear the rope.",
        correction:
          "Brace the abs and use a split stance so the pelvis stays neutral.",
      },
    ],
    fatigueIndex: 1,
    sfrTier: "S",
    recommendedRepRange: { min: 10, max: 15 },
    imageUrl: "/images/exercises/overhead-cable-triceps-extension.webp",
    svgFocusIds: ["triceps", "abs"],
  },
  {
    id: "ex-db-overhead-triceps-extension",
    name: "Dumbbell Overhead Triceps Extension",
    slug: "dumbbell-overhead-triceps-extension",
    category: "dumbbell",
    primaryMuscles: ["triceps"],
    secondaryMuscles: ["shoulders", "abs"],
    equipment: "Single Dumbbell & Bench",
    setupSteps: [
      "Sit or stand tall and hold one dumbbell by the upper end with both hands.",
      "Raise the dumbbell overhead with the elbows pointing mostly forward.",
      "Brace the abdomen and keep the ribs stacked over the pelvis.",
      "Start with the elbows bent and the dumbbell behind the head.",
    ],
    executionSteps: [
      "Extend the elbows and raise the dumbbell overhead while keeping the upper arms near the ears.",
      "Reach a controlled lockout without flaring the elbows.",
      "Pause briefly while squeezing the triceps.",
      "Lower the dumbbell slowly behind the head until a strong triceps stretch is reached.",
    ],
    commonMistakes: [
      {
        mistake: "Allowing the elbows to spread dramatically apart.",
        correction:
          "Keep the elbows pointing mostly forward and reduce load if control is lost.",
      },
      {
        mistake: "Extending the lower back to finish the rep.",
        correction:
          "Brace the abs and keep the ribcage down while pressing the dumbbell overhead.",
      },
    ],
    fatigueIndex: 1,
    sfrTier: "S",
    recommendedRepRange: { min: 8, max: 15 },
    imageUrl: "/images/exercises/dumbbell-overhead-triceps-extension.webp",
    svgFocusIds: ["triceps", "front_shoulder", "abs"],
  },
  {
    id: "ex-bb-skull-crusher",
    name: "Barbell Skull Crusher",
    slug: "barbell-skull-crusher",
    category: "barbell",
    primaryMuscles: ["triceps"],
    secondaryMuscles: ["shoulders"],
    equipment: "EZ-Bar & Flat Bench",
    setupSteps: [
      "Lie flat with eyes below the bar and feet planted firmly on the floor.",
      "Grip the EZ-bar around shoulder width and press it to a stable position over the upper chest.",
      "Retract the shoulder blades and keep the upper arms slightly angled backward.",
      "Start with the elbows extended and wrists neutral.",
    ],
    executionSteps: [
      "Bend the elbows slowly while keeping the upper arms relatively fixed.",
      "Lower the bar toward the forehead or just behind the head depending on shoulder comfort.",
      "Pause briefly in the stretched position without letting the elbows flare excessively.",
      "Extend the elbows to raise the bar back to the starting position.",
    ],
    commonMistakes: [
      {
        mistake:
          "Moving the upper arms toward the face during every repetition.",
        correction:
          "Keep the upper arms relatively stable and let the forearms create most of the movement.",
      },
      {
        mistake:
          "Using a straight bar grip that forces uncomfortable wrist extension.",
        correction:
          "Use an EZ-bar and a grip width that keeps the wrists neutral.",
      },
    ],
    fatigueIndex: 2,
    sfrTier: "A",
    recommendedRepRange: { min: 8, max: 12 },
    imageUrl: "/images/exercises/barbell-skull-crusher.webp",
    svgFocusIds: ["triceps", "front_shoulder"],
  },
  {
    id: "ex-db-skull-crusher",
    name: "Dumbbell Skull Crusher",
    slug: "dumbbell-skull-crusher",
    category: "dumbbell",
    primaryMuscles: ["triceps"],
    secondaryMuscles: ["shoulders"],
    equipment: "Pair of Dumbbells & Flat Bench",
    setupSteps: [
      "Lie flat with the dumbbells held above the upper chest using a neutral grip.",
      "Plant the feet and retract the shoulder blades against the bench.",
      "Angle the upper arms slightly backward and keep the wrists neutral.",
      "Start with the elbows extended and the dumbbells stable.",
    ],
    executionSteps: [
      "Bend the elbows and lower the dumbbells slowly toward the sides of the head.",
      "Keep the upper arms mostly fixed while the forearms rotate toward the bottom.",
      "Pause briefly in the stretched position without allowing the elbows to flare wide.",
      "Extend the elbows and bring the dumbbells back overhead under control.",
    ],
    commonMistakes: [
      {
        mistake: "Allowing the elbows to drift far outward.",
        correction:
          "Keep the upper arms closer to the torso and use a neutral grip that feels stable.",
      },
      {
        mistake: "Letting the dumbbells crash together overhead.",
        correction:
          "Stop just before contact and maintain independent control of each arm.",
      },
    ],
    fatigueIndex: 2,
    sfrTier: "A",
    recommendedRepRange: { min: 8, max: 15 },
    imageUrl: "/images/exercises/dumbbell-skull-crusher.webp",
    svgFocusIds: ["triceps", "front_shoulder"],
  },
  {
    id: "ex-bw-parallel-bar-triceps-dip",
    name: "Parallel Bar Triceps Dips",
    slug: "parallel-bar-triceps-dips",
    category: "bodyweight",
    primaryMuscles: ["triceps"],
    secondaryMuscles: ["chest", "shoulders"],
    equipment: "Parallel Dip Bars",
    setupSteps: [
      "Grip the bars around shoulder width with wrists neutral and arms extended.",
      "Keep the torso relatively upright and shoulders depressed rather than leaning heavily forward.",
      "Brace the abdomen and keep the legs quiet beneath the body.",
      "Start from a stable top support position with elbows fully extended.",
    ],
    executionSteps: [
      "Lower the body by bending the elbows while keeping them relatively close to the torso.",
      "Descend until the upper arms are around parallel to the floor or your comfortable depth.",
      "Pause briefly without allowing the shoulders to collapse forward.",
      "Press through the palms to extend the elbows and return to the top position.",
    ],
    commonMistakes: [
      {
        mistake:
          "Leaning far forward and shifting the movement toward the chest.",
        correction:
          "Keep the torso more upright and elbows closer to emphasize elbow extension.",
      },
      {
        mistake: "Dropping below a stable shoulder position.",
        correction:
          "Use a depth that preserves shoulder control and does not cause pain or anterior translation.",
      },
    ],
    fatigueIndex: 3,
    sfrTier: "A",
    recommendedRepRange: { min: 6, max: 15 },
    imageUrl: "/images/exercises/parallel-bar-triceps-dips.webp",
    svgFocusIds: ["triceps", "chest", "front_shoulder"],
  },
  {
    id: "ex-bw-bench-dip",
    name: "Bench Dips",
    slug: "bench-dips",
    category: "bodyweight",
    primaryMuscles: ["triceps"],
    secondaryMuscles: ["shoulders", "chest"],
    equipment: "Flat Bench",
    setupSteps: [
      "Sit on the bench edge and place the hands beside the hips with fingers pointing forward.",
      "Slide the hips just off the bench while keeping the feet firmly on the floor.",
      "Keep the shoulders down and the chest open rather than shrugging.",
      "Start with the elbows straight and the hips close to the bench.",
    ],
    executionSteps: [
      "Bend the elbows and lower the body vertically while keeping the hips close to the bench.",
      "Stop when the shoulders remain comfortable and the elbows reach a controlled flexion range.",
      "Pause briefly at the bottom without dropping deeper into shoulder extension.",
      "Press through the palms to extend the elbows and return to the top.",
    ],
    commonMistakes: [
      {
        mistake: "Dropping the hips far away from the bench.",
        correction:
          "Keep the torso close to the bench to reduce unnecessary shoulder extension.",
      },
      {
        mistake: "Descending extremely deep.",
        correction:
          "Use a moderate range where the shoulders remain stable and pain-free.",
      },
    ],
    fatigueIndex: 2,
    sfrTier: "B",
    recommendedRepRange: { min: 8, max: 20 },
    imageUrl: "/images/exercises/bench-dips.webp",
    svgFocusIds: ["triceps", "front_shoulder", "chest"],
  },

  {
    id: "ex-bb-standing-biceps-curl",
    name: "Standing Barbell Biceps Curl",
    slug: "standing-barbell-biceps-curl",
    category: "barbell",
    primaryMuscles: ["biceps"],
    secondaryMuscles: ["forearms"],
    equipment: "Barbell",
    setupSteps: [
      "Stand with feet hip-width apart and grip the bar around shoulder width with palms facing forward.",
      "Keep the elbows close to the torso and wrists straight.",
      "Brace the abdomen and keep the shoulders slightly back without flaring the ribs.",
      "Start with the bar resting near the thighs and elbows fully extended.",
    ],
    executionSteps: [
      "Curl the bar upward by flexing the elbows while keeping the upper arms nearly stationary.",
      "Raise until the forearms approach the biceps without rolling the shoulders forward.",
      "Pause briefly at the top and squeeze the biceps.",
      "Lower the bar slowly until the elbows are fully extended without letting the shoulders swing forward.",
    ],
    commonMistakes: [
      {
        mistake: "Leaning backward to create momentum.",
        correction:
          "Brace the trunk and use a load that can be lifted without lumbar extension.",
      },
      {
        mistake: "Moving the elbows forward throughout the curl.",
        correction:
          "Keep the upper arms close to the torso and let elbow flexion perform the majority of the movement.",
      },
    ],
    fatigueIndex: 2,
    sfrTier: "A",
    recommendedRepRange: { min: 8, max: 12 },
    imageUrl: "/images/exercises/standing-barbell-biceps-curl.webp",
    svgFocusIds: ["biceps", "forearms"],
  },
  {
    id: "ex-bb-standing-ez-curl",
    name: "Standing EZ-Bar Biceps Curl",
    slug: "standing-ez-bar-biceps-curl",
    category: "barbell",
    primaryMuscles: ["biceps"],
    secondaryMuscles: ["forearms"],
    equipment: "EZ-Curl Bar",
    setupSteps: [
      "Stand with feet hip-width apart and hold the EZ-bar using a comfortable semi-supinated grip.",
      "Keep the elbows close to the torso with wrists aligned to the angled bar.",
      "Brace the abdomen and keep the chest relaxed rather than leaning backward.",
      "Start with the bar near the thighs and elbows extended.",
    ],
    executionSteps: [
      "Curl the bar upward by flexing the elbows while keeping the upper arms nearly fixed.",
      "Continue until the forearms approach the biceps without driving the elbows forward.",
      "Pause briefly at peak contraction and squeeze the biceps.",
      "Lower the bar slowly until the elbows are straight and the biceps are fully lengthened.",
    ],
    commonMistakes: [
      {
        mistake: "Shrugging the shoulders to finish the curl.",
        correction:
          "Keep the shoulders down and let the elbow flexors perform the final portion.",
      },
      {
        mistake: "Dropping the bar quickly on the eccentric.",
        correction:
          "Use a 2-3 second lowering phase to maintain tension through the lengthened range.",
      },
    ],
    fatigueIndex: 1,
    sfrTier: "S",
    recommendedRepRange: { min: 8, max: 12 },
    imageUrl: "/images/exercises/standing-ez-bar-biceps-curl.webp",
    svgFocusIds: ["biceps", "forearms"],
  },
  {
    id: "ex-db-incline-biceps-curl",
    name: "Incline Dumbbell Biceps Curl",
    slug: "incline-dumbbell-biceps-curl",
    category: "dumbbell",
    primaryMuscles: ["biceps"],
    secondaryMuscles: ["forearms"],
    equipment: "Pair of Dumbbells & Incline Bench",
    setupSteps: [
      "Set the bench to roughly 45-60 degrees and sit back with feet firmly planted.",
      "Hold the dumbbells with palms forward or rotate them forward before starting.",
      "Let the arms hang slightly behind the torso while keeping the shoulder blades against the pad.",
      "Start with the elbows fully extended and wrists neutral.",
    ],
    executionSteps: [
      "Curl the dumbbells upward while keeping the upper arms behind or beside the torso.",
      "Supinate smoothly through the lift if using a semi-neutral starting position.",
      "Pause near the top without letting the elbows move forward dramatically.",
      "Lower the dumbbells slowly until the arms are fully extended and the biceps are stretched.",
    ],
    commonMistakes: [
      {
        mistake:
          "Using a bench angle that is too steep and eliminating the shoulder extension.",
        correction:
          "Use a moderate incline that allows the arms to hang behind the body comfortably.",
      },
      {
        mistake: "Rolling the shoulders forward at the bottom.",
        correction:
          "Keep the upper back supported and control the eccentric rather than relaxing into the shoulder joint.",
      },
    ],
    fatigueIndex: 1,
    sfrTier: "S",
    recommendedRepRange: { min: 8, max: 15 },
    imageUrl: "/images/exercises/incline-dumbbell-biceps-curl.webp",
    svgFocusIds: ["biceps", "forearms"],
  },
  {
    id: "ex-db-seated-alternating-curl",
    name: "Seated Dumbbell Curl Alternating",
    slug: "seated-dumbbell-curl-alternating",
    category: "dumbbell",
    primaryMuscles: ["biceps"],
    secondaryMuscles: ["forearms"],
    equipment: "Pair of Dumbbells & Flat Bench",
    setupSteps: [
      "Sit upright with feet planted firmly and one dumbbell in each hand.",
      "Let the arms hang beside the torso with palms facing inward.",
      "Brace the abdomen and keep the shoulders down and back.",
      "Start with both elbows fully extended and upper arms close to the body.",
    ],
    executionSteps: [
      "Curl one dumbbell upward while rotating the palm into a fully supinated position.",
      "Keep the opposite arm still and prevent the working elbow from drifting far forward.",
      "Pause briefly at the top and squeeze the biceps.",
      "Lower under control before repeating with the opposite arm.",
    ],
    commonMistakes: [
      {
        mistake: "Swinging the torso on each rep.",
        correction:
          "Keep the spine against a fixed vertical posture and lower the weight if momentum appears.",
      },
      {
        mistake: "Curling with a neutral wrist throughout.",
        correction:
          "Allow the palm to rotate toward supination during the concentric for stronger biceps contribution.",
      },
    ],
    fatigueIndex: 1,
    sfrTier: "S",
    recommendedRepRange: { min: 8, max: 15 },
    imageUrl: "/images/exercises/seated-dumbbell-curl-alternating.webp",
    svgFocusIds: ["biceps", "forearms"],
  },
  {
    id: "ex-db-hammer-curl",
    name: "Dumbbell Hammer Curl",
    slug: "dumbbell-hammer-curl",
    category: "dumbbell",
    primaryMuscles: ["biceps", "forearms"],
    secondaryMuscles: [],
    equipment: "Pair of Dumbbells",
    setupSteps: [
      "Stand with feet hip-width apart and hold the dumbbells at the sides with palms facing inward.",
      "Keep the elbows close to the torso and shoulders relaxed.",
      "Brace the abdomen and maintain a neutral wrist.",
      "Start with both elbows fully extended.",
    ],
    executionSteps: [
      "Curl the dumbbells upward with a neutral grip while keeping the upper arms nearly stationary.",
      "Lift until the forearms approach the upper arms without swinging the body.",
      "Pause briefly at the top and squeeze the biceps and brachialis.",
      "Lower the dumbbells slowly to full elbow extension.",
    ],
    commonMistakes: [
      {
        mistake: "Turning the curl into a front raise.",
        correction:
          "Keep the elbows near the ribs and move primarily through elbow flexion.",
      },
      {
        mistake: "Allowing the wrists to bend backward.",
        correction:
          "Keep the knuckles stacked over the forearms through the full rep.",
      },
    ],
    fatigueIndex: 1,
    sfrTier: "S",
    recommendedRepRange: { min: 8, max: 15 },
    imageUrl: "/images/exercises/dumbbell-hammer-curl.webp",
    svgFocusIds: ["biceps", "forearms"],
  },
  {
    id: "ex-cable-rope-hammer-curl",
    name: "Cable Rope Hammer Curl",
    slug: "cable-rope-hammer-curl",
    category: "cable",
    primaryMuscles: ["biceps", "forearms"],
    secondaryMuscles: [],
    equipment: "Low Cable Pulley & Rope Attachment",
    setupSteps: [
      "Attach a rope to the low pulley and stand upright with feet hip-width apart.",
      "Grip the rope ends with palms facing each other and elbows beside the torso.",
      "Brace the abdomen and keep the shoulders relaxed.",
      "Start with the rope slightly taut and the elbows fully extended.",
    ],
    executionSteps: [
      "Curl the rope upward with a neutral grip while keeping the upper arms stable.",
      "Separate the rope ends slightly near the top without rotating the wrists.",
      "Pause briefly and squeeze the biceps and forearms.",
      "Lower the rope slowly until the elbows are fully extended.",
    ],
    commonMistakes: [
      {
        mistake: "Leaning backward to create leverage.",
        correction:
          "Keep the torso vertical and use a lower cable setting or lighter load if necessary.",
      },
      {
        mistake: "Pulling the rope outward before flexing the elbows.",
        correction:
          "Keep the wrists neutral and drive the movement through elbow flexion first.",
      },
    ],
    fatigueIndex: 1,
    sfrTier: "S",
    recommendedRepRange: { min: 10, max: 15 },
    imageUrl: "/images/exercises/cable-rope-hammer-curl.webp",
    svgFocusIds: ["biceps", "forearms"],
  },
  {
    id: "ex-bb-preacher-curl-ez",
    name: "Preacher Curl EZ-Bar",
    slug: "preacher-curl-ez-bar",
    category: "barbell",
    primaryMuscles: ["biceps"],
    secondaryMuscles: ["forearms"],
    equipment: "EZ-Bar & Preacher Bench",
    setupSteps: [
      "Adjust the preacher pad so the upper arms rest fully on the angled surface.",
      "Sit with the chest against the pad and grip the EZ-bar with a comfortable underhand grip.",
      "Align the elbows with the lower edge of the pad and keep the wrists neutral.",
      "Start with the elbows slightly bent rather than completely locked out.",
    ],
    executionSteps: [
      "Curl the bar upward while keeping the upper arms planted on the pad.",
      "Move through the full elbow flexion range without lifting the shoulders from the pad.",
      "Pause briefly near the top and squeeze the biceps.",
      "Lower the bar slowly until the elbows are almost fully extended and the biceps are stretched.",
    ],
    commonMistakes: [
      {
        mistake: "Snapping the elbows straight at the bottom.",
        correction:
          "Stop just short of full lockout to keep the joint loaded smoothly.",
      },
      {
        mistake: "Lifting the shoulders off the pad to start the curl.",
        correction:
          "Keep the upper arms planted and lower the weight enough to maintain contact.",
      },
    ],
    fatigueIndex: 1,
    sfrTier: "S",
    recommendedRepRange: { min: 8, max: 12 },
    imageUrl: "/images/exercises/preacher-curl-ez-bar.webp",
    svgFocusIds: ["biceps", "forearms"],
  },
  {
    id: "ex-machine-preacher-curl",
    name: "Machine Preacher Curl",
    slug: "machine-preacher-curl",
    category: "machine",
    primaryMuscles: ["biceps"],
    secondaryMuscles: ["forearms"],
    equipment: "Preacher Curl Machine",
    setupSteps: [
      "Adjust the seat so the upper arms rest evenly on the preacher pad and the elbows line up with the machine pivot.",
      "Grip the handles with wrists neutral or according to the machine design.",
      "Keep the chest against the pad and the shoulders relaxed.",
      "Start with the elbows slightly bent and the stack under controlled tension.",
    ],
    executionSteps: [
      "Curl the handles upward by flexing the elbows while keeping the upper arms planted.",
      "Reach the strongest contraction without lifting the shoulders from the pad.",
      "Pause briefly at peak elbow flexion.",
      "Lower the resistance slowly until the biceps are fully lengthened.",
    ],
    commonMistakes: [
      {
        mistake: "Using the torso to lift off the pad.",
        correction:
          "Adjust the seat and lower the load so the upper arms remain supported throughout.",
      },
      {
        mistake: "Cutting the eccentric short.",
        correction:
          "Allow the elbows to open fully under control so the biceps experience a meaningful stretch.",
      },
    ],
    fatigueIndex: 1,
    sfrTier: "S",
    recommendedRepRange: { min: 10, max: 15 },
    imageUrl: "/images/exercises/machine-preacher-curl.webp",
    svgFocusIds: ["biceps", "forearms"],
  },
  {
    id: "ex-cable-bayesian-curl",
    name: "Bayesian Cable Curl",
    slug: "bayesian-cable-curl",
    category: "cable",
    primaryMuscles: ["biceps"],
    secondaryMuscles: ["forearms"],
    equipment: "Low Cable Pulley & Single Handle",
    setupSteps: [
      "Set the pulley at the lowest position and stand facing away from the cable stack.",
      "Grip the handle in the working hand and step forward enough to place the arm behind the torso.",
      "Keep the shoulder slightly extended and the elbow close to the side.",
      "Brace the trunk and start with the elbow fully extended and palm facing forward.",
    ],
    executionSteps: [
      "Curl the handle upward by flexing the elbow while keeping the upper arm slightly behind the torso.",
      "Maintain a stable shoulder position and avoid letting the elbow drift forward.",
      "Pause briefly near peak contraction and squeeze the biceps.",
      "Lower the handle slowly into the behind-the-body stretched position.",
    ],
    commonMistakes: [
      {
        mistake:
          "Allowing the cable to pull the elbow forward during the curl.",
        correction:
          "Keep the upper arm behind the torso and use a lighter load to maintain the lengthened position.",
      },
      {
        mistake: "Rotating the torso toward the cable.",
        correction:
          "Keep the pelvis and ribcage square and let the arm move independently.",
      },
    ],
    fatigueIndex: 1,
    sfrTier: "S",
    recommendedRepRange: { min: 10, max: 15 },
    imageUrl: "/images/exercises/bayesian-cable-curl.webp",
    svgFocusIds: ["biceps", "forearms"],
  },
  {
    id: "ex-bb-reverse-grip-curl",
    name: "Barbell Reverse Grip Curl",
    slug: "barbell-reverse-grip-curl",
    category: "barbell",
    primaryMuscles: ["forearms", "biceps"],
    secondaryMuscles: [],
    equipment: "Barbell",
    setupSteps: [
      "Stand with feet hip-width apart and grip the bar slightly inside shoulder width with palms facing down.",
      "Keep the elbows close to the torso and wrists neutral.",
      "Brace the trunk and keep the shoulders relaxed.",
      "Start with the bar near the thighs and elbows fully extended.",
    ],
    executionSteps: [
      "Curl the bar upward while keeping the elbows near the ribs and wrists straight.",
      "Raise until the forearms approach the upper arms without using body swing.",
      "Pause briefly at the top and squeeze the brachioradialis and biceps.",
      "Lower the bar slowly to full elbow extension while maintaining the overhand grip.",
    ],
    commonMistakes: [
      {
        mistake: "Allowing the wrists to extend backward under load.",
        correction:
          "Keep the knuckles stacked over the forearms and reduce the load if grip breaks down.",
      },
      {
        mistake: "Using the hips to throw the bar upward.",
        correction:
          "Brace the abdomen and use strict elbow flexion through the entire range.",
      },
    ],
    fatigueIndex: 1,
    sfrTier: "A",
    recommendedRepRange: { min: 10, max: 15 },
    imageUrl: "/images/exercises/barbell-reverse-grip-curl.webp",
    svgFocusIds: ["forearms", "biceps"],
  },
  {
    id: "ex-db-wrist-curl",
    name: "Dumbbell Wrist Curl",
    slug: "dumbbell-wrist-curl",
    category: "dumbbell",
    primaryMuscles: ["forearms"],
    secondaryMuscles: [],
    equipment: "Pair of Dumbbells & Bench",
    setupSteps: [
      "Kneel or sit beside a bench and rest the forearms on it with palms facing upward.",
      "Hold a dumbbell in each hand and allow the wrists to extend slightly over the edge.",
      "Keep the forearms fully supported and elbows stationary.",
      "Start with the wrists extended and dumbbells hanging securely.",
    ],
    executionSteps: [
      "Curl the hands upward by flexing the wrists without lifting the forearms from the bench.",
      "Move through the available wrist range without rotating the forearms.",
      "Pause briefly at peak wrist flexion.",
      "Lower the dumbbells slowly into wrist extension for a controlled stretch.",
    ],
    commonMistakes: [
      {
        mistake: "Moving the forearms instead of the wrists.",
        correction:
          "Keep the elbows and forearms pinned to the support and use only wrist motion.",
      },
      {
        mistake: "Dropping the weight abruptly into extension.",
        correction:
          "Control the eccentric because the forearm flexors are heavily loaded in the lengthened position.",
      },
    ],
    fatigueIndex: 1,
    sfrTier: "S",
    recommendedRepRange: { min: 12, max: 20 },
    imageUrl: "/images/exercises/dumbbell-wrist-curl.webp",
    svgFocusIds: ["forearms"],
  },
  {
    id: "ex-kb-farmers-walk",
    name: "Farmer’s Walk",
    slug: "farmers-walk",
    category: "kettlebell",
    primaryMuscles: ["forearms", "traps"],
    secondaryMuscles: ["abs", "upper_back", "calves"],
    equipment: "Pair of Heavy Kettlebells or Dumbbells & Open Floor",
    setupSteps: [
      "Place the implements symmetrically at your sides and stand between them with feet hip-width apart.",
      "Brace the abdomen and set the shoulders down and back before lifting.",
      "Grip the handles firmly with wrists neutral.",
      "Stand tall with the loads hanging without touching the thighs.",
    ],
    executionSteps: [
      "Walk forward with short controlled steps while keeping the torso vertically stacked.",
      "Maintain level shoulders and keep the arms straight rather than shrugging the loads upward.",
      "Breathe behind the abdominal brace and keep the pelvis and ribs aligned as fatigue builds.",
      "Stop or change direction only after regaining control of posture and grip.",
    ],
    commonMistakes: [
      {
        mistake: "Leaning sideways because one side is weaker.",
        correction:
          "Reduce the load and keep both shoulders level while walking with symmetrical steps.",
      },
      {
        mistake: "Taking long unstable strides.",
        correction:
          "Use short deliberate steps so the trunk remains quiet and the grip stays secure.",
      },
    ],
    fatigueIndex: 3,
    sfrTier: "A",
    recommendedRepRange: { min: 20, max: 60 },
    imageUrl: "/images/exercises/farmers-walk.webp",
    svgFocusIds: ["forearms", "traps", "abs", "upper_back", "calves"],
  },

  {
    id: "ex-machine-standing-calf-raise",
    name: "Standing Machine Calf Raise",
    slug: "standing-machine-calf-raise",
    category: "machine",
    primaryMuscles: ["calves"],
    secondaryMuscles: [],
    equipment: "Standing Calf Raise Machine",
    setupSteps: [
      "Place the balls of both feet on the platform with the heels hanging freely.",
      "Set the shoulder pads so the load rests comfortably across the shoulders.",
      "Keep the feet about hip-width apart and toes pointing forward or slightly outward.",
      "Unlock the machine and start with the ankles in a controlled dorsiflexed position.",
    ],
    executionSteps: [
      "Drive through the balls of the feet to raise the heels as high as possible without bending the knees.",
      "Pause briefly at peak plantarflexion and squeeze the calves.",
      "Lower the heels slowly below platform level to create a controlled stretch.",
      "Maintain steady pressure through the big-toe and little-toe bases throughout the range.",
    ],
    commonMistakes: [
      {
        mistake: "Bouncing out of the bottom position.",
        correction:
          "Use a deliberate eccentric and pause at the stretch instead of relying on tendon rebound.",
      },
      {
        mistake: "Bending the knees to help the weight up.",
        correction:
          "Keep the knees nearly fixed so ankle plantarflexion drives the movement.",
      },
    ],
    fatigueIndex: 1,
    sfrTier: "S",
    recommendedRepRange: { min: 8, max: 15 },
    imageUrl: "/images/exercises/standing-machine-calf-raise.webp",
    svgFocusIds: ["calves"],
  },
  {
    id: "ex-machine-seated-calf-raise",
    name: "Seated Machine Calf Raise",
    slug: "seated-machine-calf-raise",
    category: "machine",
    primaryMuscles: ["calves"],
    secondaryMuscles: [],
    equipment: "Seated Calf Raise Machine",
    setupSteps: [
      "Sit with the balls of the feet on the platform and the heels hanging below the edge.",
      "Adjust the knee pad so it sits firmly on the lower thighs without excessive compression.",
      "Place the feet hip-width apart and align the toes naturally.",
      "Start with the heels lowered to a comfortable stretch while keeping the knees flexed.",
    ],
    executionSteps: [
      "Press through the balls of the feet to raise the heels as high as possible.",
      "Keep the knees bent in the machine position so ankle motion drives the movement.",
      "Pause briefly at peak contraction and squeeze the soleus and calf complex.",
      "Lower the heels slowly into a full controlled stretch.",
    ],
    commonMistakes: [
      {
        mistake: "Using bouncing reps from the bottom.",
        correction:
          "Pause briefly in the stretched position and use a controlled tempo.",
      },
      {
        mistake: "Allowing the feet to roll outward or inward.",
        correction:
          "Keep pressure balanced across the first and fifth metatarsal heads.",
      },
    ],
    fatigueIndex: 1,
    sfrTier: "S",
    recommendedRepRange: { min: 10, max: 20 },
    imageUrl: "/images/exercises/seated-machine-calf-raise.webp",
    svgFocusIds: ["calves"],
  },
  {
    id: "ex-machine-leg-press-calf-press",
    name: "Leg Press Calf Press",
    slug: "leg-press-calf-press",
    category: "machine",
    primaryMuscles: ["calves"],
    secondaryMuscles: [],
    equipment: "45-Degree Leg Press Sled",
    setupSteps: [
      "Sit securely in the leg press and place the balls of the feet on the lower edge of the platform.",
      "Keep the knees almost straight but never hyperextended.",
      "Brace the trunk and release the sled into a stable position.",
      "Start with the ankles in controlled dorsiflexion and the heels hanging lower than the platform.",
    ],
    executionSteps: [
      "Press through the balls of the feet to plantarflex the ankles and raise the sled.",
      "Keep the knees almost fixed while the calves move through the ankle range.",
      "Pause briefly at the top and contract the calves.",
      "Lower the heels slowly into a deep but controlled stretch.",
    ],
    commonMistakes: [
      {
        mistake: "Moving the exercise through the knees instead of the ankles.",
        correction:
          "Keep the knees stable and let plantarflexion and dorsiflexion produce the movement.",
      },
      {
        mistake: "Allowing the feet to slide off the platform.",
        correction:
          "Use a moderate range and maintain full-foot contact at the forefoot throughout.",
      },
    ],
    fatigueIndex: 2,
    sfrTier: "S",
    recommendedRepRange: { min: 10, max: 20 },
    imageUrl: "/images/exercises/leg-press-calf-press.webp",
    svgFocusIds: ["calves"],
  },
  {
    id: "ex-db-single-leg-calf-raise",
    name: "Single-Leg Dumbbell Calf Raise",
    slug: "single-leg-dumbbell-calf-raise",
    category: "dumbbell",
    primaryMuscles: ["calves"],
    secondaryMuscles: ["forearms"],
    equipment: "Dumbbell & Step or Calf Block",
    setupSteps: [
      "Stand on the forefoot of one leg on a step with the heel hanging below the edge.",
      "Hold a dumbbell on the same side as the working leg and use the other hand for balance.",
      "Keep the working knee softly unlocked and the pelvis level.",
      "Start with the heel lowered to a controlled stretch while maintaining full toe-base contact.",
    ],
    executionSteps: [
      "Drive through the ball of the foot to raise the heel as high as possible.",
      "Keep the knee position stable and avoid rotating the ankle outward.",
      "Pause briefly at the top and squeeze the calf.",
      "Lower the heel slowly below the step until a strong but controlled stretch is reached.",
    ],
    commonMistakes: [
      {
        mistake: "Using the free leg to bounce or assist.",
        correction:
          "Keep the free leg clear and use a light support hand for balance instead.",
      },
      {
        mistake: "Rolling the ankle outward at the top.",
        correction:
          "Maintain even pressure through the first and fifth metatarsal heads.",
      },
    ],
    fatigueIndex: 1,
    sfrTier: "A",
    recommendedRepRange: { min: 10, max: 20 },
    imageUrl: "/images/exercises/single-leg-dumbbell-calf-raise.webp",
    svgFocusIds: ["calves"],
  },
  {
    id: "ex-bw-hanging-leg-raise",
    name: "Hanging Leg Raise",
    slug: "hanging-leg-raise",
    category: "bodyweight",
    primaryMuscles: ["abs"],
    secondaryMuscles: ["forearms", "shoulders"],
    equipment: "Pull-Up Bar or Hanging Station",
    setupSteps: [
      "Grip the bar slightly wider than shoulder-width or use comfortable parallel handles.",
      "Hang with the elbows straight and shoulders controlled while keeping the ribcage stacked.",
      "Brace the abs and keep the pelvis slightly posteriorly tilted before lifting the legs.",
      "Start with the legs hanging straight and feet together.",
    ],
    executionSteps: [
      "Posteriorly tilt the pelvis and raise the legs by flexing the hips while keeping the ribcage controlled.",
      "Continue until the legs approach torso height without swinging.",
      "Pause briefly at the top while squeezing the abs.",
      "Lower the legs slowly to a full hanging position while minimizing momentum.",
    ],
    commonMistakes: [
      {
        mistake: "Swinging the legs to generate momentum.",
        correction:
          "Pause in the bottom and initiate each rep with a controlled pelvic tuck.",
      },
      {
        mistake: "Arching the lower back dramatically at the bottom.",
        correction:
          "Keep the ribs down and maintain abdominal tension as the legs descend.",
      },
    ],
    fatigueIndex: 2,
    sfrTier: "A",
    recommendedRepRange: { min: 8, max: 15 },
    imageUrl: "/images/exercises/hanging-leg-raise.webp",
    svgFocusIds: ["abs", "forearms", "shoulders"],
  },
  {
    id: "ex-bw-captains-chair-raise",
    name: "Captain’s Chair Knee/Leg Raise",
    slug: "captains-chair-knee-leg-raise",
    category: "bodyweight",
    primaryMuscles: ["abs"],
    secondaryMuscles: ["forearms"],
    equipment: "Captain’s Chair / Vertical Knee Raise Station",
    setupSteps: [
      "Place the forearms on the pads with elbows aligned below the shoulders and grip the handles.",
      "Press the upper back against the backrest and keep the shoulders depressed.",
      "Brace the abdomen and gently tuck the pelvis before lifting the legs.",
      "Start with the knees straight or bent depending on the intended difficulty.",
    ],
    executionSteps: [
      "Curl the pelvis upward while lifting the knees or straight legs toward the torso.",
      "Keep the lower back controlled against the backrest rather than arching away from it.",
      "Pause briefly at the top and squeeze the abs.",
      "Lower the legs slowly until they hang freely without swinging.",
    ],
    commonMistakes: [
      {
        mistake:
          "Raising the knees only by hip flexion without curling the pelvis.",
        correction:
          "Think about bringing the pubic bone toward the ribs so the abs drive the top half.",
      },
      {
        mistake: "Swinging the legs through the bottom.",
        correction:
          "Use a controlled eccentric and reset the trunk before initiating the next repetition.",
      },
    ],
    fatigueIndex: 1,
    sfrTier: "A",
    recommendedRepRange: { min: 10, max: 20 },
    imageUrl: "/images/exercises/captains-chair-knee-leg-raise.webp",
    svgFocusIds: ["abs", "forearms"],
  },
  {
    id: "ex-cable-kneeling-rope-crunch",
    name: "Cable Kneeling Rope Crunch",
    slug: "cable-kneeling-rope-crunch",
    category: "cable",
    primaryMuscles: ["abs"],
    secondaryMuscles: [],
    equipment: "High Cable Pulley & Rope",
    setupSteps: [
      "Attach a rope to the high pulley and kneel several steps away from the stack.",
      "Hold the rope ends beside the temples with elbows bent and pointing down.",
      "Sit the hips back slightly while keeping the pelvis stable and spine neutral.",
      "Brace the abdomen before starting with the torso tall and the cable taut.",
    ],
    executionSteps: [
      "Curl the ribcage toward the pelvis by flexing the spine rather than simply hinging at the hips.",
      "Keep the hips relatively stationary while the abs bring the sternum toward the pelvis.",
      "Pause briefly in peak spinal flexion and squeeze the abs.",
      "Extend the torso slowly until the abs are lengthened without hyperextending the back.",
    ],
    commonMistakes: [
      {
        mistake: "Pulling the rope down with the arms.",
        correction:
          "Keep the hands beside the head and initiate the motion through controlled trunk flexion.",
      },
      {
        mistake: "Hinging at the hips instead of curling the spine.",
        correction:
          "Keep the hips mostly fixed and think about bringing the sternum toward the pelvis.",
      },
    ],
    fatigueIndex: 1,
    sfrTier: "S",
    recommendedRepRange: { min: 10, max: 20 },
    imageUrl: "/images/exercises/cable-kneeling-rope-crunch.webp",
    svgFocusIds: ["abs"],
  },
  {
    id: "ex-bw-ab-wheel-rollout",
    name: "Ab Wheel Rollout",
    slug: "ab-wheel-rollout",
    category: "bodyweight",
    primaryMuscles: ["abs"],
    secondaryMuscles: ["shoulders", "lats", "triceps"],
    equipment: "Ab Wheel",
    setupSteps: [
      "Kneel on a mat with the ab wheel directly under the shoulders and grip the handles firmly.",
      "Brace the abs and slightly tuck the pelvis so the lower back is not arched.",
      "Set the shoulders down and away from the ears.",
      "Start with the wheel close to the knees and hips slightly flexed.",
    ],
    executionSteps: [
      "Roll the wheel forward slowly while extending the shoulders and maintaining a rigid ribcage-to-pelvis relationship.",
      "Allow the hips to move forward without letting the lumbar spine collapse into extension.",
      "Pause at the farthest controllable range while maintaining abdominal tension.",
      "Pull the wheel back by contracting the abs and bringing the ribs toward the pelvis.",
    ],
    commonMistakes: [
      {
        mistake: "Allowing the lower back to sag during the rollout.",
        correction:
          "Shorten the range and posteriorly tilt the pelvis so the abs remain the limiting factor.",
      },
      {
        mistake: "Pulling back mainly with the arms.",
        correction:
          "Keep the shoulders stable and initiate the return by flexing the trunk and bringing the pelvis underneath you.",
      },
    ],
    fatigueIndex: 2,
    sfrTier: "A",
    recommendedRepRange: { min: 6, max: 15 },
    imageUrl: "/images/exercises/ab-wheel-rollout.webp",
    svgFocusIds: ["abs", "shoulders", "lats", "triceps"],
  },
  {
    id: "ex-bw-decline-weighted-crunch",
    name: "Decline Weighted Crunch",
    slug: "decline-weighted-crunch",
    category: "bodyweight",
    primaryMuscles: ["abs"],
    secondaryMuscles: [],
    equipment: "Decline Bench & Weight Plate",
    setupSteps: [
      "Set the decline bench to a moderate angle and secure the feet under the pads.",
      "Hold a plate across the chest with both hands.",
      "Lie back with the pelvis neutral and ribs controlled.",
      "Start with the torso in contact with the bench and the neck neutral.",
    ],
    executionSteps: [
      "Curl the ribcage toward the pelvis by flexing the spine rather than sitting up from the hips.",
      "Keep the lower back and pelvis controlled while the upper trunk moves through the crunch.",
      "Pause briefly at peak flexion and squeeze the abs.",
      "Lower the torso slowly until the abs are stretched without dropping the shoulders abruptly.",
    ],
    commonMistakes: [
      {
        mistake: "Turning the crunch into a full sit-up.",
        correction:
          "Keep the pelvis anchored and stop once the ribcage has curled toward the pelvis.",
      },
      {
        mistake: "Pulling the head forward with the neck.",
        correction:
          "Keep the head aligned with the spine and imagine the sternum moving toward the pelvis.",
      },
    ],
    fatigueIndex: 1,
    sfrTier: "S",
    recommendedRepRange: { min: 10, max: 20 },
    imageUrl: "/images/exercises/decline-weighted-crunch.webp",
    svgFocusIds: ["abs"],
  },
  {
    id: "ex-cable-woodchopper",
    name: "Cable Woodchopper",
    slug: "cable-woodchopper",
    category: "cable",
    primaryMuscles: ["abs"],
    secondaryMuscles: ["shoulders", "forearms"],
    equipment: "Adjustable Cable Pulley & Handle",
    setupSteps: [
      "Set the pulley around shoulder height for the high-to-low version or around hip height for the low-to-high version.",
      "Stand in a staggered or athletic stance with the feet firmly planted.",
      "Grip the handle with both hands and brace the trunk before moving.",
      "Start with the arms extended enough to maintain cable tension while the torso remains stable.",
    ],
    executionSteps: [
      "Rotate the trunk and move the handle diagonally across the body while keeping the pelvis controlled.",
      "Let the ribcage rotate around the hips rather than simply swinging the arms.",
      "Pause briefly at the end of the diagonal path while maintaining abdominal tension.",
      "Return slowly to the starting position and resist the cable rather than being pulled back.",
    ],
    commonMistakes: [
      {
        mistake: "Moving only the arms while the torso stays still.",
        correction:
          "Initiate through controlled thoracic and trunk rotation while keeping the hips relatively stable.",
      },
      {
        mistake:
          "Allowing the knees and hips to rotate aggressively with the cable.",
        correction:
          "Keep the lower body grounded and use the trunk to produce the majority of the rotational movement.",
      },
    ],
    fatigueIndex: 2,
    sfrTier: "A",
    recommendedRepRange: { min: 10, max: 15 },
    imageUrl: "/images/exercises/cable-woodchopper.webp",
    svgFocusIds: ["abs", "obliques", "shoulders"],
  },
  {
    id: "ex-cable-pallof-press",
    name: "Pallof Press",
    slug: "pallof-press",
    category: "cable",
    primaryMuscles: ["abs"],
    secondaryMuscles: ["shoulders", "forearms"],
    equipment: "Cable Pulley & Single Handle",
    setupSteps: [
      "Set the cable around mid-chest height and stand side-on to the stack.",
      "Grip the handle with both hands at the sternum and take a stance slightly wider than hip width.",
      "Brace the abdomen and keep the hips and ribcage stacked.",
      "Start close enough to create cable tension that tries to rotate the torso toward the stack.",
    ],
    executionSteps: [
      "Press the handle straight away from the chest while resisting rotation toward the cable.",
      "Keep the shoulders and hips square and the arms aligned with the sternum.",
      "Pause briefly with the arms extended while maintaining maximal trunk stiffness.",
      "Bring the hands back to the chest slowly without allowing the cable to twist the torso.",
    ],
    commonMistakes: [
      {
        mistake: "Rotating toward the cable during the press.",
        correction:
          "Brace harder and widen the stance or reduce the load until the torso stays square.",
      },
      {
        mistake: "Leaning away from the cable.",
        correction:
          "Keep the body vertically stacked and let the abdominal brace, not the torso lean, resist the rotation.",
      },
    ],
    fatigueIndex: 1,
    sfrTier: "S",
    recommendedRepRange: { min: 10, max: 15 },
    imageUrl: "/images/exercises/pallof-press.webp",
    svgFocusIds: ["abs", "obliques", "shoulders"],
  },
  {
    id: "ex-bw-plank",
    name: "Plank",
    slug: "plank",
    category: "bodyweight",
    primaryMuscles: ["abs"],
    secondaryMuscles: ["shoulders", "glutes"],
    equipment: "Bodyweight & Floor Mat",
    setupSteps: [
      "Place the forearms on the floor with elbows directly under the shoulders.",
      "Extend the legs behind you and place the toes into the floor with the feet about hip-width apart.",
      "Brace the abdomen and squeeze the glutes to create a straight line from head to heels.",
      "Keep the head neutral with the eyes looking slightly ahead of the hands.",
    ],
    executionSteps: [
      "Push the forearms into the floor and actively spread the shoulder blades without shrugging.",
      "Maintain posterior pelvic control so the lower back does not arch.",
      "Breathe slowly while keeping the trunk rigid and the hips level.",
      "Hold the position until posture begins to change, then stop rather than compensating with the lower back.",
    ],
    commonMistakes: [
      {
        mistake: "Letting the hips sag toward the floor.",
        correction:
          "Squeeze the glutes, brace harder, and slightly tuck the pelvis.",
      },
      {
        mistake: "Piking the hips excessively upward.",
        correction:
          "Bring the shoulders, hips, and heels back into one line while maintaining abdominal tension.",
      },
    ],
    fatigueIndex: 1,
    sfrTier: "S",
    recommendedRepRange: { min: 20, max: 90 },
    imageUrl: "/images/exercises/plank.webp",
    svgFocusIds: ["abs", "shoulders", "glutes"],
  },
];

export function getExerciseById(id: string): ExerciseGuide | undefined {
  return EXERCISES.find((ex) => ex.id === id);
}

export function getExercisesByMuscle(muscle: string): ExerciseGuide[] {
  return EXERCISES.filter(
    (ex) =>
      ex.primaryMuscles.includes(muscle as any) ||
      ex.secondaryMuscles.includes(muscle as any),
  );
}
