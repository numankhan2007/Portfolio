// === MOTION LIBRARY ===
// Spider-Verse cinematic motion presets

// --- Timing Constants ---
export const TIMING = {
  micro: 0.2,       // hover, tap, focus
  standard: 0.4,    // section reveal
  cinematic: 0.8,   // dramatic reveals
  stagger: 0.06,    // per-item stagger
  exit: 0.65,       // exit ratio
} as const;

// --- Easing Presets ---
export const EASE = {
  enter: [0.0, 0.0, 0.2, 1.0] as const,
  exit: [0.4, 0.0, 1.0, 1.0] as const,
  dramatic: [0.16, 1, 0.3, 1] as const,
  spring: { type: "spring" as const, damping: 20, stiffness: 300 },
  springBounce: { type: "spring" as const, damping: 15, stiffness: 200 },
} as const;

// --- Shared Variants ---

/** Cinematic fade-up for sections */
export const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: TIMING.cinematic,
      ease: EASE.dramatic,
    },
  },
};

/** Staggered container */
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: TIMING.stagger,
      delayChildren: 0.15,
    },
  },
};

/** Staggered child */
export const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: EASE.dramatic,
    },
  },
};

/** Slide-in from left */
export const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: TIMING.cinematic,
      ease: EASE.dramatic,
    },
  },
};

/** Slide-in from right */
export const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: TIMING.cinematic,
      ease: EASE.dramatic,
    },
  },
};

/** Scale-in for cards */
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: EASE.dramatic,
    },
  },
};

/** Interactive card hover/tap */
export const interactiveCard = {
  rest: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: { duration: TIMING.micro, ease: EASE.enter },
  },
  tap: {
    scale: 0.98,
    transition: { duration: TIMING.micro * TIMING.exit, ease: EASE.exit },
  },
};

/** Button hover/tap */
export const buttonVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { duration: TIMING.micro, ease: EASE.enter },
  },
  tap: {
    scale: 0.95,
    transition: { duration: TIMING.micro * TIMING.exit, ease: EASE.exit },
  },
};

/** Glow pulse */
export const glowPulse = {
  animate: {
    opacity: [0.3, 0.7, 0.3],
    scale: [1, 1.05, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

/** Reduced motion fallback */
export function getReducedMotionVariants() {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };
}
