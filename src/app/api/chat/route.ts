import { streamText } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
import { AI_CONFIG } from "@/lib/utils/constants";

/**
 * ==============================================================================
 * 🧠 Session 2-3: Generative UI & AI Tool Calling Pipeline
 * ==============================================================================
 */

export const maxDuration = 30;

// ─── Zod Tool Schemas ─────────────────────────────────────────

const quizSchema = z.object({
  title: z.string().describe("Title of the quiz"),
  topic: z.string().describe("Topic of the quiz"),
  questions: z.array(
    z.object({
      question: z.string(),
      options: z.array(z.string()),
      correctIndex: z.number().describe("0-indexed correct answer"),
      explanation: z.string(),
    })
  ),
});

const flashcardSchema = z.object({
  deckTitle: z.string(),
  cards: z.array(
    z.object({
      front: z.string(),
      back: z.string(),
      hint: z.string().optional(),
      tag: z.string().optional(),
    })
  ),
});

const codeSandboxSchema = z.object({
  title: z.string(),
  language: z.string().default("javascript"),
  initialCode: z.string(),
  explanation: z.string().optional(),
});

const diagramSchema = z.object({
  title: z.string(),
  nodes: z.array(
    z.object({
      id: z.string(),
      label: z.string(),
      sublabel: z.string().optional(),
      details: z.string(),
    })
  ),
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    const isPlaceholder = !apiKey || apiKey === "your_gemini_key_here" || apiKey.trim() === "";

    const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || "";

    // ─── If no API key is provided, provide interactive demo streams ───
    if (isPlaceholder) {
      let demoResponse = "";
      let componentPayload: any = null;

      if (lastMessage.includes("quiz") || lastMessage.includes("test")) {
        demoResponse = "Here is a live **Interactive Knowledge Check** generated for you:";
        componentPayload = {
          componentType: "quiz",
          props: {
            title: "JavaScript Event Loop Challenge",
            topic: "Asynchronous Execution Order",
            questions: [
              {
                question: "In what order do microtasks (Promises) and macrotasks (setTimeout) execute in the Event Loop?",
                options: [
                  "Macrotasks execute first, then Microtasks",
                  "Microtasks execute first immediately after synchronous call stack clears",
                  "They execute simultaneously in Web Workers",
                  "Execution order is completely randomized by the OS"
                ],
                correctIndex: 1,
                explanation: "The event loop drains the entire microtask queue (Promise callbacks, queueMicrotask) before picking the next macrotask (setTimeout/setInterval) from the task queue."
              },
              {
                question: "What does Promise.resolve().then() schedule?",
                options: [
                  "A Macrotask",
                  "A Microtask",
                  "A Synchronous Block",
                  "A Web Worker thread"
                ],
                correctIndex: 1,
                explanation: "Promise callbacks registered with .then() or .catch() are scheduled as Microtasks."
              }
            ]
          }
        };
      } else if (lastMessage.includes("flashcard") || lastMessage.includes("card")) {
        demoResponse = "Here is an interactive **Spaced Repetition Flashcard Deck**:";
        componentPayload = {
          componentType: "flashcard",
          props: {
            deckTitle: "Core Full-Stack Concepts",
            cards: [
              {
                front: "What is the primary benefit of React Server Components (RSC)?",
                back: "RSC execute exclusively on the server and send zero JavaScript bundle to the browser, reducing initial load time.",
                hint: "Think about client-side bundle size and data fetching.",
                tag: "React 19"
              },
              {
                front: "Why use pgvector inside PostgreSQL instead of a separate vector database?",
                back: "pgvector keeps high-dimensional embeddings and relational tables in one ACID-compliant database, eliminating network sync latency.",
                hint: "Think about transactions and data consistency.",
                tag: "Databases"
              }
            ]
          }
        };
      } else if (lastMessage.includes("code") || lastMessage.includes("sandbox") || lastMessage.includes("playground")) {
        demoResponse = "Here is a **Live Code Playground** where you can write and execute code:";
        componentPayload = {
          componentType: "code-sandbox",
          props: {
            title: "JavaScript Closures in Action",
            language: "javascript",
            initialCode: `function createCounter() {
  let count = 0;
  return function() {
    count++;
    console.log("Current count:", count);
  };
}

const counter = createCounter();
counter(); // 1
counter(); // 2
counter(); // 3`,
            explanation: "The inner function retains lexical access to the 'count' variable even after createCounter() has returned."
          }
        };
      } else if (lastMessage.includes("diagram") || lastMessage.includes("architecture")) {
        demoResponse = "Here is an interactive **Visual Concept Architecture Flowchart**:";
        componentPayload = {
          componentType: "diagram",
          props: {
            title: "MayuronOS Generative UI Streaming Pipeline",
            nodes: [
              { id: "n1", label: "User Prompt", sublabel: "Client", details: "User requests a concept explanation or interactive test." },
              { id: "n2", label: "Model Router", sublabel: "Serverless", details: "Routes intent between Gemini 2.5 Flash and Groq LPU." },
              { id: "n3", label: "Zod Tool Schema", sublabel: "Validation", details: "Enforces type safety and parses component parameters." },
              { id: "n4", label: "streamUI Render", sublabel: "SSE Stream", details: "Component Registry renders live interactive widget in the message stream." }
            ]
          }
        };
      } else {
        demoResponse = `Welcome to **MayuronOS Learning Studio**! 🦚

I can generate live interactive learning interfaces. Try asking me:
* **"Quiz me on JavaScript async/await"** ➔ Generates an interactive Quiz
* **"Create flashcards for React Server Components"** ➔ Generates 3D Flip Cards
* **"Give me a code sandbox for Closures"** ➔ Generates a live executable Code Editor
* **"Show me the system diagram for Generative UI"** ➔ Generates a visual Architecture Diagram

*(To connect live Gemini 2.5 Flash, paste your free key in \`.env.local\`)*`;
      }

      // Stream text + component payload marker
      const encoder = new TextEncoder();
      const customStream = new ReadableStream({
        async start(controller) {
          const words = demoResponse.split(" ");
          for (const word of words) {
            controller.enqueue(encoder.encode(`${word} `));
            await new Promise((r) => setTimeout(r, 20));
          }

          if (componentPayload) {
            controller.enqueue(
              encoder.encode(`\n\n__GEN_UI_PAYLOAD__${JSON.stringify(componentPayload)}__END_PAYLOAD__`)
            );
          }
          controller.close();
        },
      });

      return new Response(customStream, {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }

    // ─── Production Live Stream via Google Gemini ──────────────────────
    const result = streamText({
      model: google("gemini-2.5-flash"),
      system: `${AI_CONFIG.systemPrompt}
      
When the user wants to practice, test their knowledge, write code, or visualize a concept, you can generate structured widgets in your output using the standard format:
__GEN_UI_PAYLOAD__{"componentType":"quiz"|"flashcard"|"code-sandbox"|"diagram", "props":{...}}__END_PAYLOAD__`,
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
