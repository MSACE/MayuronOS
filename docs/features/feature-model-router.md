# Feature Deep Dive: Model Router

> How to pick the right AI model for each task — and why it matters

---

## The Problem

Using ONE model for everything is like using a sledgehammer for every task:

| Task | Needs | Overkill Model | Right Model |
|------|-------|----------------|-------------|
| "Is this about JavaScript?" | Speed | Gemini (3s) | Groq Llama (0.2s) |
| "Explain quantum computing" | Quality | Groq Llama (ok) | Gemini (great) |
| "Generate a quiz" | Structured output | Either works | Gemini (better JSON) |
| "Quick chat reply" | Speed + low cost | Gemini (3s) | Groq Llama (0.2s) |

---

## The Solution: Task-Based Routing

```typescript
import { google } from '@ai-sdk/google';
import { groq } from '@ai-sdk/groq';

type TaskType = 'classify' | 'explain' | 'quiz' | 'chat' | 'evaluate';

function getModelForTask(task: TaskType) {
  const routes = {
    classify:  groq('llama-3.3-70b-versatile'),   // Fast: yes/no decisions
    explain:   google('gemini-2.5-flash'),          // Quality: detailed answers
    quiz:      google('gemini-2.5-flash'),          // Structured: reliable JSON
    chat:      groq('llama-3.3-70b-versatile'),    // Speed: real-time feel
    evaluate:  google('gemini-2.5-flash'),          // Accuracy: scoring matters
  };
  return routes[task] ?? google('gemini-2.5-flash');
}
```

---

## Routing Decision Matrix

```
User sends message
        ↓
Step 1: CLASSIFY intent (using fast model)
  - "quiz me" → quiz
  - "explain X" → explain
  - "how am I doing?" → evaluate
  - anything else → chat
        ↓
Step 2: ROUTE to optimal model
  - quiz/explain/evaluate → Gemini (quality)
  - chat/classify → Groq (speed)
        ↓
Step 3: EXECUTE with chosen model
        ↓
Step 4: FALLBACK if model fails
  - Gemini down? → try Groq
  - Groq down? → try OpenRouter free models
```

---

## Why This Matters in the Industry

Companies spend millions on AI API costs. Smart routing:
- **Reduces cost** by 40-60% (cheap model for simple tasks)
- **Reduces latency** by 5-10x (fast model for real-time tasks)
- **Improves reliability** (fallback to another provider if one is down)

This is what companies like OpenRouter, Martian, and Portkey are building as products. You're building it as a feature.

---

## Fallback Strategy

```typescript
async function callWithFallback(task: TaskType, messages: Message[]) {
  const models = [
    getModelForTask(task),                        // Primary
    google('gemini-2.5-flash'),                   // Fallback 1
    groq('llama-3.3-70b-versatile'),             // Fallback 2
  ];

  for (const model of models) {
    try {
      return await streamText({ model, messages });
    } catch (error) {
      console.warn(`Model failed, trying next:`, error);
      continue; // Try next model
    }
  }
  throw new Error('All models failed');
}
```
