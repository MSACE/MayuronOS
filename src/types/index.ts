/**
 * ============================================
 * AdaptiveOS — Core Type Definitions
 * ============================================
 *
 * INDUSTRY PRACTICE: Define ALL your types in one place (or a /types folder).
 * This makes your codebase predictable — anyone can look here to understand
 * the shape of data flowing through the app.
 *
 * RULE: Never use `any`. If you don't know the type yet, use `unknown`
 * and narrow it down. This catches bugs BEFORE they reach users.
 */

// ─── User & Auth ───────────────────────────────────────

export interface User {
  id: string;
  email: string;
  displayName: string | null;
  avatarUrl: string | null;
  createdAt: Date;
}

// ─── Learning ──────────────────────────────────────────

export interface LearningSession {
  id: string;
  userId: string;
  topic: string;
  difficulty: DifficultyLevel;
  mood: MoodState;
  startedAt: Date;
  completedAt: Date | null;
  score: number | null;
}

export type DifficultyLevel = "beginner" | "intermediate" | "advanced";

export interface LearningProgress {
  userId: string;
  topicId: string;
  mastery: number; // 0-100
  sessionsCompleted: number;
  lastStudiedAt: Date;
  streak: number;
}

// ─── Mood & Behavior ───────────────────────────────────

/**
 * The detected mood state of the user, based on behavioral signals.
 * NOT webcam-based — this uses click patterns, pauses, and error rates.
 */
export type MoodState =
  | "focused"     // steady pace, few errors
  | "confident"   // fast answers, high accuracy
  | "confused"    // long pauses, re-reading
  | "frustrated"  // rapid clicks, backtracking, errors
  | "neutral";    // default state

export interface BehaviorSignals {
  clickSpeed: number;       // avg ms between clicks
  pauseDuration: number;    // avg pause on questions (ms)
  errorRate: number;        // wrong answers / total answers
  backtrackCount: number;   // how many times user went back
  timeOnPage: number;       // seconds on current page
  scrollDepth: number;      // 0-100% of page scrolled
}

// ─── AI & Generative UI ────────────────────────────────

export type AIModel = "gemini" | "groq" | "openrouter";

export interface AIMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  createdAt: Date;
}

/**
 * The types of UI components that AI can generate on the fly.
 * Each maps to a real React component in /components/generative/.
 */
export type GenerativeComponentType =
  | "quiz"           // interactive quiz with options
  | "flashcard"      // flip card for memorization
  | "code-editor"    // live code playground
  | "diagram"        // visual concept diagram
  | "progress-chart" // learning progress visualization
  | "explanation"    // rich text explanation
  | "challenge";     // coding challenge

export interface GenerativeComponentProps {
  type: GenerativeComponentType;
  data: Record<string, unknown>;
}

// ─── Knowledge Graph ───────────────────────────────────

export interface KnowledgeNode {
  id: string;
  label: string;
  category: string;
  mastery: number; // 0-100
  connections: string[]; // IDs of connected nodes
  position?: { x: number; y: number; z: number };
}

export interface KnowledgeEdge {
  source: string;
  target: string;
  strength: number; // 0-1, how strongly related
}

// ─── Theme ─────────────────────────────────────────────

export interface AdaptiveTheme {
  mood: MoodState;
  primaryColor: string;
  backgroundColor: string;
  accentColor: string;
  fontSize: "small" | "medium" | "large";
  animationSpeed: "slow" | "normal" | "fast";
}

// ─── 100/100 Master Upgrades ───────────────────────────

/** 1. VoiceLink — Real-Time Conversational Audio */
export interface VoiceSessionState {
  isActive: boolean;
  isSpeaking: boolean;
  isListening: boolean;
  audioLatencyMs: number;
  transcription: string;
}

/** 2. Self-Healing Generative UI Guardrails & Evals */
export interface SelfHealingTrace {
  id: string;
  originalPayload: Record<string, unknown>;
  validationError: string | null;
  repairedPayload: Record<string, unknown> | null;
  repairLatencyMs: number;
  status: "valid" | "auto_repaired" | "fallback_rendered";
}

/** 3. WebXR Spatial Knowledge Computing */
export interface SpatialGraphConfig {
  enableVR: boolean;
  enableAR: boolean;
  handTracking: boolean;
  spatialAudio: boolean;
  nodeScale: number;
}

/** 4. Local-First & Offline Sync */
export interface OfflineSyncState {
  isOnline: boolean;
  pendingSyncCount: number;
  lastSyncedAt: Date | null;
  syncStatus: "idle" | "syncing" | "error";
}

/** 5. Verifiable Proof of Mastery (Skill Receipt) */
export interface ProofOfMasteryReceipt {
  receiptId: string;
  userId: string;
  userName: string;
  topicId: string;
  topicTitle: string;
  masteryScore: number; // 0-100
  timeSpentSeconds: number;
  challengesCompleted: number;
  accuracyRate: number;
  issuedAt: Date;
  cryptographicSignature: string; // SHA-256 hash / signature
  verificationUrl: string;
}
