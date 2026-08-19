import { streamText } from "ai";
import { google } from "@ai-sdk/google";
import { AI_CONFIG } from "@/lib/utils/constants";

/**
 * ==============================================================================
 * 🧠 Session 1: Real-Time AI Chat Stream Route
 * ==============================================================================
 *
 * HOW IT WORKS (Industry Standard):
 * 1. Client sends POST /api/chat with array of conversation messages [{role, content}].
 * 2. Server forwards conversation to Google Gemini 2.5 Flash with system prompt.
 * 3. Gemini generates tokens in real-time.
 * 4. streamText pipe tokens via HTTP Server-Sent Events (SSE) directly to browser.
 *
 * ZERO-CRASH GUARANTEE:
 * If the API key is not yet set in .env.local, we gracefully stream an onboarding
 * message explaining how to grab the free key from Google AI Studio.
 */

export const maxDuration = 30; // Max execution duration in seconds for serverless

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    const isPlaceholder = !apiKey || apiKey === "your_gemini_key_here" || apiKey.trim() === "";

    // ─── If no API key is provided, stream guided onboarding response ───
    if (isPlaceholder) {
      const demoResponse = `Welcome to **MayuronOS**! 🦚

I am your cognitive AI tutor. I notice your Google Gemini API key is not yet added in \`.env.local\`.

### 🔑 How to enable live AI in 60 seconds (100% Free):
1. Visit [aistudio.google.com](https://aistudio.google.com/)
2. Click **"Get API key"** → **"Create API Key"** (No credit card needed)
3. Open \`.env.local\` in your project root
4. Paste it: \`GOOGLE_GENERATIVE_AI_API_KEY=AIzaSy...\`
5. Restart your server (\`npm run dev\`)

Once connected, I will explain complex systems, generate interactive sandboxes, and adapt to your learning pace!`;

      // Return a simulated streaming text response
      const encoder = new TextEncoder();
      const customStream = new ReadableStream({
        async start(controller) {
          const words = demoResponse.split(" ");
          for (const word of words) {
            controller.enqueue(encoder.encode(`0:${JSON.stringify(word + " ")}\n`));
            await new Promise((r) => setTimeout(r, 25)); // 25ms delay per word to simulate real-time tokens
          }
          controller.close();
        },
      });

      return new Response(customStream, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "X-Vercel-AI-Data-Stream": "v1",
        },
      });
    }

    // ─── Production Live Stream via Google Gemini ──────────────────────
    const result = streamText({
      model: google("gemini-2.5-flash"),
      system: AI_CONFIG.systemPrompt,
      messages,
      temperature: AI_CONFIG.temperature,
    });

    return result.toTextStreamResponse();
  } catch (error: any) {
    console.error("[MayuronOS Chat API Error]:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "An unexpected error occurred in the AI pipeline.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
