# Feature Deep Dive: Generative UI

> How AI decides which React component to render and streams it live

---

## The Core Idea

```
Traditional App:  Developer writes UI → user sees fixed interface
Generative UI:    AI chooses UI at runtime → user sees personalized interface

Developer defines WHAT components exist.
AI decides WHEN and HOW to use them.
```

---

## How It Works (Step by Step)

```
1. You define "tools" — functions the AI can call
   Each tool maps to a React component

2. User sends a message: "Quiz me on closures"

3. AI reads the message + tool descriptions

4. AI decides: "I should use the 'generateQuiz' tool"
   (not the 'flashcard' or 'diagram' tool)

5. AI generates the PARAMETERS for the tool:
   { question: "What does a closure capture?",
     options: ["Variables", "Functions", "Scope chain", "All of the above"],
     correctAnswer: 3 }

6. Your code receives these parameters

7. Your code renders: <QuizWidget question={...} options={...} />

8. The component streams to the browser
```

---

## The streamUI Function

```typescript
const result = await streamUI({
  model: google('gemini-2.5-flash'),
  messages: conversationHistory,

  // Default: when AI responds with plain text
  text: ({ content, done }) => {
    return <div className="prose">{content}</div>;
  },

  // Tools: when AI decides to render a component
  tools: {
    generateQuiz: {
      description: "Generate an interactive quiz to test understanding",
      parameters: z.object({
        question: z.string().describe("The quiz question"),
        options: z.array(z.string()).describe("4 answer choices"),
        correctAnswer: z.number().describe("Index of correct answer (0-3)"),
      }),
      generate: async function* ({ question, options, correctAnswer }) {
        // Show loading state first
        yield <div>Generating quiz...</div>;
        // Then render the actual component
        yield <QuizWidget
          question={question}
          options={options}
          correctAnswer={correctAnswer}
        />;
      },
    },

    showFlashcard: {
      description: "Show a flashcard for memorization",
      parameters: z.object({
        front: z.string().describe("The question side"),
        back: z.string().describe("The answer side"),
      }),
      generate: async function* ({ front, back }) {
        yield <Flashcard front={front} back={back} />;
      },
    },
  },
});
```

---

## Component Registry Pattern

```typescript
// Instead of hardcoding, use a registry:
const COMPONENTS = {
  quiz:           QuizWidget,
  flashcard:      Flashcard,
  'code-editor':  CodeEditor,
  diagram:        Diagram,
  chart:          ProgressChart,
} as const;

// Why?
// 1. Easy to add new components (just add to the map)
// 2. Easy to test (mock the registry)
// 3. AI just returns a "type" string — we look up the component
// 4. Clean separation between AI logic and UI rendering
```

---

## When Does AI Choose a Tool vs Text?

The AI reads the tool `description` to decide:

| User Says | AI Decides | Why |
|-----------|-----------|-----|
| "What is a closure?" | Text response | Explanation = text is fine |
| "Quiz me on closures" | `generateQuiz` tool | User explicitly asked for quiz |
| "I keep forgetting the difference..." | `showFlashcard` tool | Memorization need detected |
| "Show me how closures work visually" | `diagram` tool | Visual request |
| "How am I doing?" | `chart` tool | Progress request |

**Pro tip**: The better your tool descriptions, the better the AI routes.

---

## Key Takeaways

1. **You define the components** — AI can't invent components that don't exist
2. **AI picks which component to use** — based on context and descriptions
3. **AI generates the data** — question text, options, diagram labels
4. **Your code renders it** — React component with AI-generated props
5. **It streams** — user sees the component building in real-time
