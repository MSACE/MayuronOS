# Session 0: Project Setup & Environment

> **Status**: ✅ Completed  
> **Date**: 2026-08-19  
> **Goal**: Set up a production-grade development environment

---

## 🧠 What You Learned

### 1. Node.js & npm — The Foundation

**What is Node.js?**  
Node.js lets you run JavaScript OUTSIDE the browser. Normally JS only runs inside Chrome/Firefox. Node.js is what makes it possible to build servers, CLI tools, and full apps with JavaScript.

**What is npm?**  
npm (Node Package Manager) is like an app store for code. Instead of writing everything from scratch, you install packages that other developers built.

```bash
npm install ai          # install a package
npm run dev             # run a script defined in package.json
npx create-next-app     # run a package without installing it permanently
```

**Industry Note**: Every company uses npm (or yarn/pnpm). Knowing `package.json` is essential.

---

### 2. Next.js — The Framework

**What is Next.js?**  
Next.js is a React framework that adds:
- **Server-Side Rendering (SSR)** — pages render on the server (faster, better SEO)
- **File-based Routing** — create a file at `app/about/page.tsx` → you get `/about` route
- **API Routes** — build backend APIs right inside the same project
- **React Server Components** — components that run on the server (critical for AI streaming)

**Why Next.js for this project?**  
The Vercel AI SDK's `streamUI()` function uses React Server Components to stream AI-generated components. No other framework supports this as natively.

```
app/
├── page.tsx           → localhost:3000/
├── dashboard/page.tsx → localhost:3000/dashboard
├── learn/page.tsx     → localhost:3000/learn
└── api/chat/route.ts  → localhost:3000/api/chat (API endpoint)
```

---

### 3. TypeScript — JavaScript with Safety

**What is TypeScript?**  
TypeScript = JavaScript + Types. It catches errors BEFORE your code runs.

```typescript
// JavaScript (no safety) — this bug only shows up at runtime
function greet(name) {
  return "Hello " + name.toUpperCase();
}
greet(42); // 💥 CRASH: 42.toUpperCase is not a function

// TypeScript (safe) — this bug is caught while you code
function greet(name: string): string {
  return "Hello " + name.toUpperCase();
}
greet(42); // ❌ Error: Argument of type 'number' is not assignable to type 'string'
```

**Industry Note**: 95%+ of professional codebases use TypeScript. It's not optional — it's expected.

---

### 4. Tailwind CSS — Styling Without CSS Files

**What is Tailwind?**  
Instead of writing CSS in separate files, you write utility classes directly on HTML elements.

```html
<!-- Traditional CSS -->
<div class="card">Hello</div>
<!-- card { padding: 16px; background: white; border-radius: 8px; box-shadow: ... } -->

<!-- Tailwind CSS -->
<div class="p-4 bg-white rounded-lg shadow-md">Hello</div>
```

**Why Tailwind?** Faster to write, no naming conflicts, easy to maintain. Used by Vercel, Shopify, Netflix.

---

### 5. Project Structure — How Professionals Organize Code

```
src/
├── app/           → Pages & API routes (Next.js convention)
├── components/    → Reusable UI pieces
│   ├── ui/        → Generic (Button, Card, Input)
│   ├── generative/→ AI-generated components
│   └── adaptive/  → Mood-responsive wrappers
├── lib/           → Business logic (not UI)
│   ├── ai/        → AI-related code
│   ├── db/        → Database code
│   └── utils/     → Helpers & constants
├── hooks/         → Custom React hooks
└── types/         → TypeScript type definitions
```

**Rule of thumb**: 
- `components/` = things you SEE
- `lib/` = things that THINK
- `hooks/` = things that CONNECT components to logic

---

### 6. Environment Variables — Keeping Secrets Safe

```bash
# .env.local (NEVER committed to Git)
GOOGLE_GENERATIVE_AI_API_KEY=sk-abc123...

# In your code, access it:
process.env.GOOGLE_GENERATIVE_AI_API_KEY
```

**Why?** If you push API keys to GitHub, bots will find them in seconds and run up your bill. `.env.local` is in `.gitignore`, so it never leaves your computer.

---

### 7. Git — Version Control

```bash
git init                    # Start tracking
git add -A                  # Stage all changes
git commit -m "feat: ..."   # Save a snapshot
git checkout -b feat/chat   # Create feature branch
git push origin feat/chat   # Push to GitHub
```

**Commit message format** (Conventional Commits):
```
feat: add new feature
fix: fix a bug
refactor: restructure without behavior change
docs: update documentation
chore: config, dependencies
```

---

## 📦 Packages Installed & Why

| Package | What It Does | When We Use It |
|---------|-------------|----------------|
| `ai` | Vercel AI SDK — streaming, tool calling | Session 1+ |
| `@ai-sdk/google` | Connect to Google Gemini | Session 1+ |
| `@ai-sdk/groq` | Connect to Groq (fast AI) | Session 5 |
| `@supabase/supabase-js` | Database + Auth client | Session 3+ |
| `drizzle-orm` | Type-safe SQL queries | Session 3+ |
| `framer-motion` | Smooth UI animations | Session 2+ |
| `three` | 3D graphics engine | Session 6 |
| `@react-three/fiber` | React wrapper for Three.js | Session 6 |
| `@react-three/drei` | Pre-built 3D helpers | Session 6 |
| `zod` | Data validation schemas | Session 1+ |
| `recharts` | Charts & graphs | Session 4+ |
| `clsx` + `tailwind-merge` | Tailwind class utilities | Every session |

---

## 🔑 Key Files Created

| File | Purpose | Study Priority |
|------|---------|---------------|
| `src/types/index.ts` | All TypeScript types | ⭐⭐⭐⭐⭐ Read first |
| `src/lib/utils/constants.ts` | App config & thresholds | ⭐⭐⭐⭐ Read second |
| `src/lib/utils/cn.ts` | Tailwind class merger | ⭐⭐⭐ Understand the pattern |
| `.env.local` | Your secret API keys | ⭐⭐⭐⭐⭐ Never share |
| `.env.example` | Template for other devs | ⭐⭐⭐ Industry practice |

---

## ✅ Checklist — Do You Understand?

- [ ] What does `npm run dev` do?
- [ ] Why do we use TypeScript instead of plain JavaScript?
- [ ] What's the difference between `app/page.tsx` and `app/api/chat/route.ts`?
- [ ] Why is `.env.local` in `.gitignore`?
- [ ] What does `git commit -m "feat: add chat"` mean?
- [ ] What lives in `components/` vs `lib/`?
