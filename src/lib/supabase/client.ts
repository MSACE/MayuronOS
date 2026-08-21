import { createClient } from "@supabase/supabase-js";

/**
 * ==============================================================================
 * ⚡ Supabase Client (Auth + pgvector queries)
 * ==============================================================================
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const isSupabaseConfigured =
  supabaseUrl.startsWith("http") &&
  supabaseAnonKey.length > 10 &&
  !supabaseUrl.includes("your_supabase");

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
