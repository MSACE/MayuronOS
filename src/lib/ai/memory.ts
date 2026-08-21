import { google } from "@ai-sdk/google";
import { embed } from "ai";
import { db, schema } from "@/db";

/**
 * ==============================================================================
 * 🧠 Semantic Vector Long-Term Memory (RAG + text-embedding-004)
 * ==============================================================================
 *
 * HOW IT WORKS:
 * 1. Takes user input or learning takeaway and generates a 768-dim vector embedding.
 * 2. Compares cosine similarity against historical vector memories.
 * 3. Injects top relevant insights into the AI prompt so MayuronOS recalls
 *    past misconceptions and strengths across sessions.
 */

export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey || apiKey === "your_gemini_key_here" || apiKey.trim() === "") {
      // Mock 768-dim normalized pseudo-vector for local offline testing
      return new Array(768).fill(0).map((_, i) => Math.sin(i + text.length) * 0.05);
    }

    const { embedding } = await embed({
      model: google.textEmbeddingModel("text-embedding-004"),
      value: text,
    });

    return embedding;
  } catch (error) {
    console.error("[Embedding Generation Error]:", error);
    return new Array(768).fill(0).map((_, i) => Math.sin(i + text.length) * 0.05);
  }
}

export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length || vecA.length === 0) return 0;

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  const denominator = Math.sqrt(normA) * Math.sqrt(normB);
  return denominator === 0 ? 0 : dotProduct / denominator;
}

export async function storeMemory(sessionId: string, content: string, metadata: Record<string, any> = {}) {
  const embedding = await generateEmbedding(content);

  if (db) {
    try {
      await db.insert(schema.vectorMemories).values({
        sessionId: sessionId as any,
        content,
        embedding,
        metadata,
      });
    } catch (err) {
      console.warn("[DB Memory Insert Fallback]:", err);
    }
  }
}
