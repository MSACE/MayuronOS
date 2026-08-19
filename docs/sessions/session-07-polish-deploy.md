# Session 7: Polish, Testing & Deployment

> **Status**: ⏳ Upcoming  
> **Goal**: Make it production-ready, tested, and live on the internet  
> **Milestone**: M7 — Ship it!

---

## 🧠 Concepts You'll Learn

### 1. Testing — Does Your Code Actually Work?

**Types of tests:**

| Type | What It Tests | Speed | Example |
|------|-------------|-------|---------|
| **Unit Test** | One function in isolation | ⚡ Fast | "Does `analyzeMood()` return 'frustrated' when error rate > 0.6?" |
| **Integration Test** | Multiple parts working together | 🔄 Medium | "Does the API route call Gemini and return a stream?" |
| **E2E Test** | Full user flow in a browser | 🐢 Slow | "Can a user sign in, ask a question, and see a quiz?" |

```typescript
// Example unit test:
import { analyzeMood } from '@/lib/behavior/mood-analyzer';

test('high error rate should return frustrated', () => {
  const signals = {
    clickSpeed: 150,    // rapid
    errorRate: 0.7,     // high
    backtrackCount: 6,  // lots of going back
    pauseDuration: 2000,
    timeOnPage: 120,
    scrollDepth: 30,
  };
  expect(analyzeMood(signals)).toBe('frustrated');
});
```

---

### 2. Performance Optimization

| Technique | What It Does | When To Use |
|-----------|-------------|-------------|
| **Code Splitting** | Load code only when needed | Large components (3D graph) |
| **Lazy Loading** | Defer loading until visible | Images, heavy components |
| **Caching** | Store API responses | Repeated AI calls for same topic |
| **Debouncing** | Limit function call frequency | Behavior tracking (don't track every pixel) |
| **Memoization** | Cache computed results | Expensive calculations |

```typescript
// Lazy load the 3D graph (it's heavy — don't load on every page):
import dynamic from 'next/dynamic';

const KnowledgeGraph = dynamic(
  () => import('@/components/knowledge-graph/graph-canvas'),
  {
    loading: () => <p>Loading 3D graph...</p>,
    ssr: false,  // Don't render on server (WebGL needs browser)
  }
);
```

---

### 3. Observability — Understanding AI in Production

```typescript
// With Langfuse, you can trace every AI call:
// - What prompt was sent?
// - What model was used?
// - How long did it take?
// - What was the output?
// - Was the user satisfied?

// This is how you debug AI issues in production.
// "Why did the AI give a wrong answer?" → Check the trace.
```

---

### 4. CI/CD — Automatic Deployment

```
You push code to GitHub
        ↓
Vercel detects the push
        ↓
Vercel runs `npm run build`
        ↓
If build succeeds → auto-deploys to your-app.vercel.app
If build fails → deployment blocked, you get notified
        ↓
Preview URL generated for pull requests
```

**This is how real companies ship code.** No manual deployment ever.

---

### 5. Deployment Checklist

- [ ] All environment variables set in Vercel dashboard
- [ ] Build passes (`npm run build` succeeds)
- [ ] No hardcoded localhost URLs
- [ ] Error boundaries catch crashes gracefully
- [ ] Loading states for slow connections
- [ ] Mobile responsive
- [ ] Meta tags for SEO / social sharing
- [ ] README is up to date

---

### 6. The Demo — How to Present Your Project

**Structure (5 minutes max):**
1. **Problem** (30s): "Learning platforms are one-size-fits-all"
2. **Solution** (30s): "AdaptiveOS generates unique UI per learner"
3. **Live Demo** (3min): Show the 3 wow moments:
   - Ask to learn something → UI generates on the fly
   - Intentionally struggle → watch UI adapt (colors, encouragement)
   - Open knowledge graph → 3D visualization
4. **Architecture** (1min): "Multi-agent, model routing, evals"

**Industry Note**: Interviews evaluate your COMMUNICATION as much as your code. Practice explaining WHY you made each technical decision.

---

## 🏗️ What We'll Do

| Task | What It Involves |
|------|-----------------|
| Add error boundaries | Catch crashes, show fallback UI |
| Write unit tests | Test mood analyzer, model router |
| Performance audit | Lighthouse score, bundle size |
| Deploy to Vercel | Connect GitHub → auto-deploy |
| Record demo | Screen recording of the 3 wow moments |
| Write blog post | Technical writeup for portfolio |

---

## ✅ Checklist — Do You Understand?

- [ ] What's the difference between unit, integration, and E2E tests?
- [ ] Why lazy-load heavy components like the 3D graph?
- [ ] What is CI/CD and why is it better than manual deployment?
- [ ] What should you trace/log for AI calls in production?
- [ ] How do you structure a 5-minute project demo?
- [ ] Why is communication as important as code in interviews?
