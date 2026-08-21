import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

/**
 * ==============================================================================
 * 🧠 Database Connection Initializer (Supabase + PostgreSQL)
 * ==============================================================================
 *
 * ZERO-CRASH ARCHITECTURE:
 * Reads DATABASE_URL or NEXT_PUBLIC_SUPABASE_URL. If connection string is missing
 * or placeholder, `db` safely exposes null and queries route to the local session engine.
 */

const connectionString =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "";

const isConfigured =
  connectionString &&
  !connectionString.includes("your_") &&
  connectionString.startsWith("postgres");

// Global connection cache for Next.js hot-reloading
const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined;
};

export const client = isConfigured
  ? globalForDb.conn ?? postgres(connectionString, { prepare: false })
  : null;

if (process.env.NODE_ENV !== "production" && client) {
  globalForDb.conn = client;
}

export const db = client ? drizzle(client, { schema }) : null;
export { schema };
