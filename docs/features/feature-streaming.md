# Feature Deep Dive: AI Streaming

> How tokens flow from AI → Server → Browser in real-time

---

## The Journey of a Token

```
Step 1: User types "What is recursion?"
        ↓
Step 2: Browser sends POST request to /api/chat
        ↓
Step 3: Your API route calls Google Gemini API
        ↓
Step 4: Gemini starts generating tokens one by one:
        "Recursion" → "is" → "when" → "a" → "function" → ...
        ↓
Step 5: Each token is sent IMMEDIATELY to your API route
        (Gemini doesn't wait to finish the full response)
        ↓
Step 6: Your API route forwards each token to the browser
        using Server-Sent Events (SSE)
        ↓
Step 7: Browser receives each token and appends it to the UI
        ↓
Step 8: User sees text appear word by word ✨
```

---

## Server-Sent Events (SSE) — The Technology

**What is SSE?**  
A way for the server to push data to the browser over a single HTTP connection.

```
Normal HTTP:     Request → Wait → Full Response (one shot)
SSE:             Request → Chunk1 → Chunk2 → Chunk3 → ... → Done

The connection stays OPEN while the server pushes data.
```

**Why not WebSockets?**  
- SSE is simpler (one-direction: server → client)
- Works with standard HTTP (no special setup)
- Perfect for AI streaming (we only need server → client)
- WebSockets are overkill for this use case

---

## The Code Flow

```typescript
// 1. BACKEND: Stream from AI
import { streamText } from 'ai';
import { google } from '@ai-sdk/google';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: google('gemini-2.5-flash'),
    messages,
  });

  // toDataStreamResponse() converts the AI stream to SSE format
  return result.toDataStreamResponse();
}

// 2. FRONTEND: Consume the stream
import { useChat } from '@ai-sdk/react';

function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  // useChat automatically:
  // - Opens SSE connection to /api/chat
  // - Parses each incoming chunk
  // - Updates messages[] state
  // - Triggers React re-render for each new token
}
```

---

## Why Streaming Matters

| Metric | Without Streaming | With Streaming |
|--------|------------------|----------------|
| Time to first token | 3-5 seconds | 200-500ms |
| Perceived speed | Slow | Instant |
| User experience | Waiting... waiting... wall of text | Smooth, natural reading pace |
| UX pattern | Like email | Like texting |

**Psychological effect**: Users perceive streaming apps as 2-3x faster, even when total generation time is the same.

---

## Key Terms Glossary

| Term | Definition |
|------|-----------|
| **Token** | Smallest unit of text AI works with (~4 chars) |
| **Chunk** | A piece of the streaming response (1+ tokens) |
| **SSE** | Server-Sent Events — server pushes data to browser |
| **Data Stream** | Vercel AI SDK's protocol for streaming AI data |
| **Backpressure** | When the client can't consume data as fast as it arrives |
