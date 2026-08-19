# Session 5: Multi-Agent Architecture & Model Router

> **Status**: ⏳ Upcoming  
> **Goal**: Build an orchestrator that coordinates multiple specialized AI agents  
> **Milestone**: M5 — Advanced AI architecture

---

## 🧠 Concepts You'll Learn

### 1. What is a Multi-Agent System?

**Single Agent**: One AI does everything (chat, quiz, evaluate, adapt).  
**Multi-Agent**: Multiple specialized AIs coordinate, each doing what they're best at.

```
                    ┌──────────────────┐
User message ────► │  ORCHESTRATOR     │ ← The "manager"
                    │  (decides who     │
                    │   handles what)   │
                    └──────┬───────────┘
                           │
              ┌────────────┼────────────┐
              ▼            ▼            ▼
        ┌──────────┐ ┌──────────┐ ┌──────────┐
        │ PLANNER  │ │ UI GEN   │ │ GHOST    │
        │ Agent    │ │ Agent    │ │ PEER     │
        │          │ │          │ │ Agent    │
        │ Decides  │ │ Creates  │ │ Simulates│
        │ learning │ │ React    │ │ study    │
        │ path     │ │ components│ │ partner  │
        └──────────┘ └──────────┘ └──────────┘
```

**Why?** Single agents get confused with complex tasks. Specialists are better.

---

### 2. Orchestrator Pattern

```typescript
async function orchestrate(userMessage: string, context: LearningContext) {
  // Step 1: Understand intent
  const intent = await classifyIntent(userMessage);
  // → "teach", "quiz", "explain", "chat", "review"

  // Step 2: Route to the right agent
  switch (intent) {
    case "teach":
      return await plannerAgent.plan(userMessage, context);
    case "quiz":
      return await uiGenAgent.generateQuiz(userMessage, context);
    case "chat":
      return await ghostPeerAgent.discuss(userMessage, context);
    case "review":
      return await evaluatorAgent.assess(context);
  }
}
```

---

### 3. Model Router — Picking the Right AI

Not every task needs the same AI model:

| Task Type | Best Model | Why |
|-----------|-----------|-----|
| Complex explanations | Gemini 2.5 Flash | Large context, high quality |
| Quick chat / ghost peer | Groq (Llama 3.3) | Ultra-fast responses |
| Quiz generation | Gemini 2.5 Flash | Needs structured output |
| Simple classification | Groq (Llama 3.3) | Speed > quality for routing |

```typescript
function routeToModel(taskType: string) {
  const routingTable = {
    'explain':    google('gemini-2.5-flash'),    // Quality matters
    'quiz':       google('gemini-2.5-flash'),    // Structured output
    'classify':   groq('llama-3.3-70b-versatile'), // Speed matters
    'chat':       groq('llama-3.3-70b-versatile'), // Real-time feel
    'evaluate':   google('gemini-2.5-flash'),    // Accuracy matters
  };
  return routingTable[taskType] ?? google('gemini-2.5-flash');
}
```

**Industry Note**: This is how companies like OpenAI Router, Martian, and Portkey work. Smart routing = better performance + lower cost.

---

### 4. Ghost Peer Agent — Your AI Study Partner

```typescript
const ghostPeerPrompt = `You are a fellow student, NOT a teacher. You:
- Are at roughly the same level as the human student
- Ask questions when confused (even if you know the answer)
- Make occasional mistakes to encourage the human to teach YOU
- Celebrate when the human explains something well
- Say things like "Wait, I don't get that part..." to prompt deeper thinking

The best way to learn is to teach. You exist to make the human teach you.`;
```

**Psychology behind it**: The "Protégé Effect" — students learn 20-30% better when they teach someone else. The ghost peer is that "someone else."

---

### 5. Agent Communication

```typescript
// Agents share context through a structured object:
interface AgentContext {
  userId: string;
  currentTopic: string;
  mood: MoodState;
  mastery: number;
  recentErrors: string[];
  sessionHistory: AIMessage[];
}

// The orchestrator passes relevant context to each agent.
// Agents don't talk to each other directly — the orchestrator mediates.
```

---

## 🏗️ What We'll Build

| File | What It Does |
|------|-------------|
| `src/lib/ai/orchestrator.ts` | Routes messages to the right agent |
| `src/lib/ai/model-router.ts` | Picks optimal AI model per task |
| `src/lib/ai/ghost-peer.ts` | Simulated study partner agent |
| `src/lib/ai/prompts.ts` | System prompts for each agent |

---

## ✅ Checklist — Do You Understand?

- [ ] Why use multiple agents instead of one?
- [ ] What does the orchestrator do?
- [ ] When would you route to Groq vs Gemini?
- [ ] What is the Protégé Effect and how does the ghost peer use it?
- [ ] How do agents share context without talking directly?
- [ ] What is intent classification and why is it the first step?
