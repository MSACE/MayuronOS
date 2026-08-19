/**
 * ============================================
 * AdaptiveOS — App Constants
 * ============================================
 *
 * INDUSTRY PRACTICE: Never hardcode values in components.
 * Put them here so they're easy to find and change.
 *
 * BAD:  if (score > 80) { ... }          ← magic number, what is 80?
 * GOOD: if (score > MASTERY_THRESHOLD) { ... } ← self-documenting
 */

// ─── App Info ──────────────────────────────────────────

export const APP_NAME = "MayuronOS";
export const APP_TAGLINE = "Neural & Generative Learning Matrix";
export const APP_AUTHOR = "Mayur Saini";
export const APP_VERSION = "0.1.0";
export const APP_DESCRIPTION =
  "A Sanskrit-inspired, AI-powered cognitive operating system created and architected by Mayur Saini. It generates interactive UI in real-time based on how you learn and feel.";

// ─── AI Model Config ───────────────────────────────────

export const AI_MODELS = {
  /** Primary model — best quality, large context */
  primary: "gemini-2.5-flash" as const,
  /** Speed model — fastest responses, real-time chat */
  speed: "llama-3.3-70b-versatile" as const,
} as const;

export const AI_CONFIG = {
  /** Max tokens for AI responses */
  maxTokens: 2048,
  /** Temperature: 0 = deterministic, 1 = creative */
  temperature: 0.7,
  /** System prompt for the learning tutor */
  systemPrompt: `You are MayuronOS, an advanced neural AI learning companion rooted in deep understanding and adaptive pedagogy. Your role:
1. Illuminate complex concepts with crystal clarity and intuitive analogies.
2. Sense the learner's cognitive pace and emotional state, adapting your tone and complexity.
3. Call tools to generate interactive, visual UI components (quizzes, flashcards, interactive sandboxes, diagrams) on the fly.
4. Foster a growth mindset—be encouraging, insightful, and constructively candid.

You are not a passive chatbot; you are an active cognitive mentor.`,
} as const;

// ─── Learning Config ───────────────────────────────────

/** Score threshold to consider a topic "mastered" */
export const MASTERY_THRESHOLD = 80;

/** Number of correct answers in a row to level up difficulty */
export const LEVEL_UP_STREAK = 3;

/** Number of wrong answers to trigger mood check */
export const FRUSTRATION_THRESHOLD = 3;

// ─── Mood Detection Thresholds ─────────────────────────

export const MOOD_THRESHOLDS = {
  /** Clicks faster than this (ms) = might be frustrated */
  rapidClickSpeed: 200,
  /** Pauses longer than this (ms) = might be confused */
  longPauseDuration: 15000,
  /** Error rate above this = might be struggling */
  highErrorRate: 0.6,
  /** More backtrack than this = definitely confused */
  highBacktrackCount: 5,
} as const;

// ─── Theme Colors by Mood (Supercar Chromatic Spec) ────

export const MOOD_THEMES = {
  focused: {
    name: "Blu Cepheus (Lamborghini)",
    primaryColor: "#00C3FF",     // Electric Cyan (Lambo Blu Cepheus / Porsche Miami Blue)
    backgroundColor: "#030712",
    accentColor: "#0088FF",
  },
  confident: {
    name: "Verde Mantis (Lamborghini)",
    primaryColor: "#49F112",     // Hyper Lime Green (Lambo Verde Mantis / McLaren Kyalami)
    backgroundColor: "#030712",
    accentColor: "#38C90A",
  },
  confused: {
    name: "Giallo Modena (Ferrari)",
    primaryColor: "#FFE600",     // Solar Electric Yellow (Ferrari Giallo Modena / Lambo Inti)
    backgroundColor: "#030712",
    accentColor: "#FFB700",
  },
  frustrated: {
    name: "Viola Pasifae (Lamborghini)",
    primaryColor: "#A855F7",     // Royal Metallic Violet (Lambo Viola Pasifae / Porsche Ruby)
    backgroundColor: "#030712",
    accentColor: "#7C3AED",
  },
  neutral: {
    name: "Papaya Spark (McLaren)",
    primaryColor: "#FF7300",     // McLaren Papaya Spark Racing Orange
    backgroundColor: "#030712",
    accentColor: "#E65100",
  },
} as const;

// ─── 100/100 Master Constants ──────────────────────────

/** VoiceLink Configuration */
export const VOICE_CONFIG = {
  sampleRate: 24000,
  maxSilenceDurationMs: 1200,
  targetLatencyMs: 400,
  defaultVoice: "en-US-Neural2-F",
} as const;

/** Self-Healing Guardrails & Evals */
export const EVAL_CONFIG = {
  maxAutoRepairRetries: 2,
  schemaValidationTimeoutMs: 300,
  fallbackComponent: "explanation" as const,
  telemetrySampleRate: 1.0, // 100% of AI calls evaluated
} as const;

/** WebXR Spatial Knowledge Computing */
export const SPATIAL_CONFIG = {
  defaultFov: 75,
  nearPlane: 0.1,
  farPlane: 1000,
  orbitSpeed: 0.5,
  particleCount: 150,
  enableHaptics: true,
} as const;

/** Cryptographic Proof of Mastery */
export const PROOF_CONFIG = {
  issuerDomain: "https://mayuron.os",
  signatureAlgorithm: "SHA-256",
  minMasteryRequired: 85,
  minChallengesRequired: 3,
} as const;
