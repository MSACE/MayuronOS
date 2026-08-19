# Session 1: First AI Chat with Streaming

> **Status**: ⏳ Upcoming  
> **Goal**: Build a working AI chatbot on localhost that streams responses word-by-word  
> **Milestone**: M1 — Your first AI-powered feature

---

## 🧠 Concepts You'll Learn

### 1. How LLMs (Large Language Models) Work

**The Simple Explanation:**  
An LLM is a super-advanced autocomplete. You give it text (a "prompt"), and it predicts the next word, then the next, then the next — generating a full response.

**Key Terms:**
| Term | Meaning | Example |
|------|---------|---------|
| **Token** | A piece of a word (≈ 4 characters) | "Hello" = 1 token, "programming" = 3 tokens |
| **Prompt** | The input you send to the AI | "Explain recursion to a beginner" |
| **Context Window** | Max tokens the AI can see at once | Gemini: 1,000,000 tokens (!!) |
| **Temperature** | Randomness (0=exact, 1=creative) | 0.7 is our default (balanced) |
| **System Prompt** | Hidden instructions for AI behavior | "You are a friendly tutor..." |

**Why does this matter?**  
Understanding tokens → you understand cost (paid APIs charge per token). Understanding context windows → you know how much data you can feed the AI.

---

### 2. API Routes in Next.js

**What is an API route?**  
A function that runs on the SERVER when someone visits a URL. It's your backend — inside your frontend project.

```
Browser → POST /api/chat → Server runs your code → Returns response → Browser shows it
```

**The file:**
```typescript
// src/app/api/chat/route.ts

// This function runs on the SERVER, not in the browser.
// The browser never sees this code — it only sees the response.
export async function POST(request: Request) {
  const { messages } = await request.json(); // Get user's message
  // ... call AI API ...
  return response; // Send back to browser
}
```

**Industry Note**: This is how EVERY web app works. Frontend talks to Backend via API routes. Even Netflix, Twitter, Google — all use this pattern.

---

### 3. Vercel AI SDK — The Bridge Between AI and UI

**Without Vercel AI SDK** (manual, painful):
```typescript
// You'd have to manually:
// 1. Call the AI API
// 2. Parse the streaming response
// 3. Handle connection errors
// 4. Manage conversation state
// 5. Update the UI progressively
// That's ~200 lines of boilerplate code
```

**With Vercel AI SDK** (simple, clean):
```typescript
// Backend (API route) — 5 lines
import { streamText } from 'ai';
import { google } from '@ai-sdk/google';

export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = streamText({
    model: google('gemini-2.5-flash'),
    messages,
  });
  return result.toDataStreamResponse();
}
```

```typescript
// Frontend (React component) — 3 lines of AI logic
import { useChat } from '@ai-sdk/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  // That's it. useChat handles EVERYTHING:
  // - Sending messages to /api/chat
  // - Receiving streaming response
  // - Updating messages array in real-time
  // - Managing loading/error states
}
```

---

### 4. Streaming — Why Text Appears Word-by-Word

**Without streaming**: User waits 3-5 seconds → entire response appears at once. Feels slow.

**With streaming**: First word appears in 200ms → rest flow in progressively. Feels instant.

**How it works (simplified):**

```
User: "What is recursion?"

Without streaming:
[wait 3 seconds............] → "Recursion is when a function calls itself..."

With streaming (SSE — Server-Sent Events):
[200ms] → "Recursion"
[250ms] → "Recursion is"
[300ms] → "Recursion is when"
[350ms] → "Recursion is when a"
[400ms] → "Recursion is when a function"
...continues word by word
```

**The technology**: Server-Sent Events (SSE) — the server keeps the connection open and pushes data chunks to the browser as they arrive from the AI.

---

### 5. The useChat Hook — React State Magic

```typescript
const {
  messages,        // Array of all messages [{role: 'user', content: '...'}, ...]
  input,           // Current text in the input field
  handleInputChange, // Updates 'input' when user types
  handleSubmit,    // Sends message when user presses Enter/Submit
  isLoading,       // true while AI is responding
  error,           // Error object if something fails
  stop,            // Function to cancel AI response mid-stream
} = useChat({
  api: '/api/chat',  // Which API route to call
});
```

**This single hook replaces** what would otherwise be:
- `useState` for messages
- `useState` for input
- `fetch()` for API calls
- `EventSource` for streaming
- Error handling logic
- Loading state management

---

## 🏗️ What We'll Build

### Files Created in This Session

| File | Lines | What It Does |
|------|-------|-------------|
| `src/app/api/chat/route.ts` | ~30 | Backend: receives messages, calls Gemini, streams response |
| `src/app/learn/page.tsx` | ~80 | Frontend: the chat interface page |
| `src/components/ui/chat-bubble.tsx` | ~50 | UI: message bubble component |
| `src/components/ui/chat-input.tsx` | ~40 | UI: text input + send button |

### The Flow

```
User types "What is recursion?"
        ↓
Chat input captures text
        ↓
useChat sends POST to /api/chat
        ↓
API route sends to Google Gemini
        ↓
Gemini streams tokens back
        ↓
API route forwards stream to browser
        ↓
useChat updates messages[] in real-time
        ↓
Chat bubbles re-render with each new token
        ↓
User sees text appear word-by-word ✨
```

---

## 🔧 Key Code Patterns to Remember

### Pattern 1: The API Route Template
```typescript
// Every AI API route follows this pattern:
export async function POST(req: Request) {
  const body = await req.json();        // 1. Parse request
  const result = await aiFunction({     // 2. Call AI
    model: yourModel,
    ...body,
  });
  return result.toDataStreamResponse(); // 3. Stream back
}
```

### Pattern 2: The Chat Component Template
```typescript
// Every chat component follows this pattern:
export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();

  return (
    <div>
      {messages.map(m => <ChatBubble key={m.id} message={m} />)}
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={handleInputChange} />
        <button disabled={isLoading}>Send</button>
      </form>
    </div>
  );
}
```

---

## ❌ Common Mistakes & Fixes

| Mistake | Why It Happens | Fix |
|---------|---------------|-----|
| "API key not found" | .env.local not set up | Add key to `.env.local`, restart `npm run dev` |
| "Failed to fetch" | API route path wrong | Check: `/api/chat` matches file at `app/api/chat/route.ts` |
| Messages not streaming | Missing `toDataStreamResponse()` | Use `result.toDataStreamResponse()` not `result.json()` |
| UI not updating | Forgot `useChat` | Don't use regular `fetch` — use the `useChat` hook |

---

## ✅ Checklist — Do You Understand?

- [ ] What is a token and why does it matter?
- [ ] What does an API route do and where does it live in the file structure?
- [ ] What does `useChat()` give you and why is it better than manual `fetch()`?
- [ ] Why does streaming feel faster even though total response time is the same?
- [ ] What is a system prompt and why is it important?
- [ ] What happens if you commit your API key to GitHub?
