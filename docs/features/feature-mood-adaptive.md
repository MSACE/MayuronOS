# Feature Deep Dive: Mood-Adaptive UI

> How behavioral signals map to UI changes — no webcam needed

---

## The Detection Pipeline

```
User interacts with app
        ↓
Behavior Tracker captures raw signals
  - Click timestamps
  - Pause durations  
  - Answer correctness
  - Navigation patterns
        ↓
Mood Analyzer converts signals to mood
  - Rapid clicks + errors = FRUSTRATED
  - Long pauses + backtracking = CONFUSED
  - Fast + accurate = CONFIDENT
  - Steady + moderate = FOCUSED
        ↓
Theme Adapter applies UI changes
  - Colors shift
  - Animations adjust
  - Content simplifies/advances
  - Encouragement appears/hides
        ↓
AI receives mood as context
  - Adjusts teaching style
  - Changes explanation depth
  - Offers breaks when frustrated
```

---

## Signal → Mood Mapping

```typescript
function analyzeMood(signals: BehaviorSignals): MoodState {
  const { clickSpeed, pauseDuration, errorRate, backtrackCount } = signals;

  // Rule-based analysis (can be replaced with ML later)
  if (errorRate > 0.6 && clickSpeed < 200) {
    return 'frustrated';   // Many errors + rapid clicking
  }
  if (pauseDuration > 15000 || backtrackCount > 5) {
    return 'confused';     // Long thinking + going backwards
  }
  if (errorRate < 0.2 && clickSpeed < 500) {
    return 'confident';    // Few errors + fast pace
  }
  if (errorRate < 0.4 && clickSpeed > 500 && clickSpeed < 3000) {
    return 'focused';      // Moderate pace + decent accuracy
  }
  return 'neutral';        // Default state
}
```

---

## What Changes Per Mood

| UI Element | Frustrated | Confused | Focused | Confident |
|-----------|-----------|---------|---------|-----------|
| **Colors** | Calming purple | Warm amber | Cool blue | Energetic green |
| **Animation** | Slow (500ms) | Slow (500ms) | Normal (300ms) | Fast (200ms) |
| **Content** | Simplified | Step-by-step | Full detail | Advanced |
| **Extras** | Encouragement banner | Hints visible | Clean UI | Challenges unlocked |
| **Font size** | Slightly larger | Normal | Normal | Normal |
| **AI tone** | Very supportive | Patient, guiding | Professional | Challenging |

---

## The Psychology Behind It

| Principle | How We Apply It |
|-----------|----------------|
| **Cognitive Load Theory** | Frustrated users get simplified UI (less to process) |
| **Flow State** | Confident users get harder content (prevent boredom) |
| **Scaffolding** | Confused users get step-by-step breakdowns |
| **Positive Reinforcement** | All users get encouragement at the right moments |

---

## Privacy-First Approach

- ✅ All detection happens CLIENT-SIDE (in the browser)
- ✅ No webcam, no microphone, no biometrics
- ✅ Only behavioral patterns (clicks, pauses, accuracy)
- ✅ Mood data stays in browser state (not sent to server by default)
- ✅ User can disable adaptive features anytime
