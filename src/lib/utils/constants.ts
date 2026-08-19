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

// ─── Theme Colors by Mood ──────────────────────────────

export const MOOD_THEMES = {
  focused: {
    primaryColor: "#3b82f6",     // blue — calm and productive
    backgroundColor: "#f8fafc",
    accentColor: "#2563eb",
  },
  confident: {
    primaryColor: "#10b981",     // green — positive and energetic
    backgroundColor: "#f0fdf4",
    accentColor: "#059669",
  },
  confused: {
    primaryColor: "#f59e0b",     // amber — warm and supportive
    backgroundColor: "#fffbeb",
    accentColor: "#d97706",
  },
  frustrated: {
    primaryColor: "#8b5cf6",     // purple — calming
    backgroundColor: "#faf5ff",
    accentColor: "#7c3aed",
  },
  neutral: {
    primaryColor: "#6366f1",     // indigo — balanced
    backgroundColor: "#ffffff",
    accentColor: "#4f46e5",
  },
} as const;
