# Session 4: Mood Detection Engine

> **Status**: ⏳ Upcoming  
> **Goal**: Detect user frustration/confusion from behavioral signals and adapt the UI  
> **Milestone**: M4 — The "smile factor" feature

---

## 🧠 Concepts You'll Learn

### 1. Behavioral Mood Detection (No Webcam Needed!)

We detect mood through HOW users interact, not what they look like:

| Signal | Indicates | How We Measure |
|--------|----------|---------------|
| Rapid clicking (< 200ms gaps) | Frustration | Track time between clicks |
| Long pauses (> 15s) | Confusion | Track idle time on questions |
| High error rate (> 60%) | Struggling | Track wrong/total answers |
| Backtracking (going back) | Lost | Count navigation backwards |
| Fast correct answers | Confidence | Track speed + accuracy combo |
| Steady pace | Focus | Consistent timing patterns |

---

### 2. Custom React Hooks — Reusable Logic

```typescript
// A hook is a function that lets components "hook into" React features.
// Custom hooks let you extract reusable logic.

function useBehaviorTracker() {
  const [clicks, setClicks] = useState<number[]>([]);
  const [errors, setErrors] = useState(0);
  const [total, setTotal] = useState(0);

  const trackClick = () => {
    setClicks(prev => [...prev, Date.now()]);
  };

  const trackAnswer = (correct: boolean) => {
    setTotal(prev => prev + 1);
    if (!correct) setErrors(prev => prev + 1);
  };

  const errorRate = total > 0 ? errors / total : 0;
  const avgClickSpeed = calculateAvgGap(clicks);

  return { trackClick, trackAnswer, errorRate, avgClickSpeed };
}

// Any component can now use this:
function QuizWidget() {
  const { trackClick, trackAnswer, errorRate } = useBehaviorTracker();
  // ...
}
```

**Industry Pattern**: Custom hooks are how React apps share logic between components. Every React codebase uses them extensively.

---

### 3. Mood State Machine

```
                    steady pace
    ┌──────────── FOCUSED ◄──────────────┐
    │                │                    │
    │    errors↑     │    fast+correct    │
    ▼                ▼                    │
CONFUSED ──────► FRUSTRATED      CONFIDENT
    │                │                    │
    │   simplify     │   encourage        │
    │   content      │   take break       │
    └────────────────┴────────────────────┘
                     │
                     ▼
                  NEUTRAL (default)
```

---

### 4. Adaptive Theming — Mood Changes the UI

```typescript
// When mood changes, the entire UI adapts:
const MOOD_THEMES = {
  focused:     { colors: 'blue',   speed: 'normal', complexity: 'full' },
  confident:   { colors: 'green',  speed: 'fast',   complexity: 'advanced' },
  confused:    { colors: 'amber',  speed: 'slow',   complexity: 'simplified' },
  frustrated:  { colors: 'purple', speed: 'slow',   complexity: 'minimal' },
};

// Frustrated user sees:
// - Calming purple colors
// - Slower animations (less overwhelming)
// - Simplified content (hide advanced options)
// - Encouragement banner ("You're doing great! Take a breath 💜")
```

---

### 5. CSS Custom Properties — Dynamic Theme Switching

```css
/* CSS variables that change based on mood */
:root {
  --primary: #6366f1;      /* default: indigo */
  --bg: #ffffff;
  --animation-speed: 300ms;
}

[data-mood="frustrated"] {
  --primary: #8b5cf6;      /* calming purple */
  --bg: #faf5ff;
  --animation-speed: 500ms; /* slower = less overwhelming */
}

[data-mood="confident"] {
  --primary: #10b981;      /* energetic green */
  --bg: #f0fdf4;
  --animation-speed: 200ms; /* faster = matches their energy */
}
```

```typescript
// In React, we set the data attribute on the body:
document.body.setAttribute('data-mood', currentMood);
// All CSS vars update instantly — zero re-renders needed!
```

---

## 🏗️ What We'll Build

| File | What It Does |
|------|-------------|
| `src/lib/behavior/tracker.ts` | Tracks clicks, pauses, errors, backtracking |
| `src/lib/behavior/mood-analyzer.ts` | Converts signals → mood state |
| `src/lib/behavior/theme-adapter.ts` | Maps mood → theme colors/animation |
| `src/hooks/use-behavior-tracker.ts` | React hook for components to report behavior |
| `src/hooks/use-mood.ts` | React hook exposing current mood |
| `src/hooks/use-adaptive-theme.ts` | React hook that applies theme changes |
| `src/components/adaptive/adaptive-container.tsx` | Wrapper that applies mood-based styling |
| `src/components/adaptive/encouragement-banner.tsx` | Shows when user is frustrated |

---

## ✅ Checklist — Do You Understand?

- [ ] How do you detect frustration WITHOUT a webcam?
- [ ] What is a custom React hook and when do you create one?
- [ ] Why use CSS custom properties for theming instead of inline styles?
- [ ] What behavioral signals indicate "confused" vs "frustrated"?
- [ ] How does the mood state machine transition between states?
- [ ] Why is adaptive UI important for learning outcomes?
