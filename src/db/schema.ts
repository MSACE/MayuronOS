import {
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
  jsonb,
  customType,
} from "drizzle-orm/pg-core";

/**
 * ==============================================================================
 * 🧠 Session 4: Type-Safe Drizzle ORM Schema & pgvector Memory
 * ==============================================================================
 *
 * HOW IT WORKS (Industry Standard):
 * 1. Relational schema models users, sessions, conversation turns, and mastery logs.
 * 2. Custom pgvector(768) type stores semantic embeddings from Google text-embedding-004.
 * 3. AI retrieves past context via cosine similarity search without an external vector DB.
 */

// Custom pgvector definition for Drizzle ORM
const vector = customType<{ data: number[]; driverData: string }>({
  dataType() {
    return "vector(768)";
  },
  toDriver(value: number[]): string {
    return `[${value.join(",")}]`;
  },
  fromDriver(value: string): number[] {
    return JSON.parse(value);
  },
});

// ─── 1. Users & Learner Profiles ──────────────────────────────
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").unique(),
  name: text("name").default("Mayur Saini"),
  preferredMoodTheme: text("preferred_mood_theme").default("verde-mantis"),
  masteryLevel: text("mastery_level").default("novice"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// ─── 2. Learning Sessions ─────────────────────────────────────
export const sessions = pgTable("sessions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  topic: text("topic").default("General Exploration").notNull(),
  status: text("status").default("active").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// ─── 3. Message Stream & Generative Payloads ──────────────────
export const messages = pgTable("messages", {
  id: text("id").primaryKey(),
  sessionId: uuid("session_id").references(() => sessions.id, { onDelete: "cascade" }),
  role: text("role").notNull(), // 'user' | 'assistant' | 'system'
  content: text("content").notNull(),
  generativePayload: jsonb("generative_payload"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// ─── 4. Mastery Records & Proof-of-Mastery Receipts ───────────
export const masteryRecords = pgTable("mastery_records", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
  topic: text("topic").notNull(),
  score: integer("score").notNull(),
  totalQuestions: integer("total_questions").notNull(),
  accuracy: integer("accuracy").notNull(),
  receiptHash: text("receipt_hash"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// ─── 5. pgvector Semantic Long-Term AI Memory ─────────────────
export const vectorMemories = pgTable("vector_memories", {
  id: uuid("id").defaultRandom().primaryKey(),
  sessionId: uuid("session_id").references(() => sessions.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  embedding: vector("embedding"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Session = typeof sessions.$inferSelect;
export type NewSession = typeof sessions.$inferInsert;
export type DBMessage = typeof messages.$inferSelect;
export type NewDBMessage = typeof messages.$inferInsert;
export type MasteryRecord = typeof masteryRecords.$inferSelect;
export type VectorMemory = typeof vectorMemories.$inferSelect;
