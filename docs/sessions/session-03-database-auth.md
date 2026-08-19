# Session 3: Database & Authentication

> **Status**: ⏳ Upcoming  
> **Goal**: Store user data, learning progress, and add sign-in/sign-up  
> **Milestone**: M3 — Persistent, personalized experience

---

## 🧠 Concepts You'll Learn

### 1. Why We Need a Database

Without a database, everything resets when you refresh the page. With a database:
- User's learning progress is saved
- Chat history persists across sessions
- Mood patterns build over time (better adaptation)
- The AI remembers what you've already learned

---

### 2. Supabase — Your All-in-One Backend

Supabase gives you 5 things in 1 service:

| Feature | What It Does | Alternative It Replaces |
|---------|-------------|------------------------|
| **PostgreSQL** | Relational database | AWS RDS, PlanetScale |
| **Auth** | Sign in/sign up | Clerk, Auth0 |
| **Storage** | File uploads | AWS S3, Cloudinary |
| **Realtime** | Live data sync | Pusher, Ably |
| **pgvector** | Vector similarity search | Pinecone, Qdrant |

---

### 3. Database Schema Design — Thinking in Tables

```sql
-- Users table (managed by Supabase Auth, extended by us)
users
├── id          (UUID, primary key)
├── email       (text, unique)
├── display_name (text, nullable)
├── avatar_url  (text, nullable)
└── created_at  (timestamp)

-- Learning sessions
learning_sessions
├── id          (UUID, primary key)
├── user_id     (UUID, foreign key → users.id)
├── topic       (text)
├── difficulty  (enum: beginner/intermediate/advanced)
├── mood        (enum: focused/confident/confused/frustrated/neutral)
├── score       (integer, nullable)
├── started_at  (timestamp)
└── completed_at (timestamp, nullable)

-- Learning progress (per topic)
learning_progress
├── user_id     (UUID, foreign key → users.id)
├── topic_id    (text)
├── mastery     (integer, 0-100)
├── sessions_completed (integer)
├── last_studied_at (timestamp)
└── streak      (integer)
```

**Key concepts:**
- **Primary Key**: Unique identifier for each row
- **Foreign Key**: Links one table to another (user_id → users.id)
- **Enum**: A column that only allows specific values

---

### 4. Drizzle ORM — Type-Safe SQL

```typescript
// Define your schema in TypeScript (not raw SQL):
import { pgTable, uuid, text, integer, timestamp } from 'drizzle-orm/pg-core';

export const learningProgress = pgTable('learning_progress', {
  userId: uuid('user_id').primaryKey(),
  topicId: text('topic_id').notNull(),
  mastery: integer('mastery').default(0),
  sessionsCompleted: integer('sessions_completed').default(0),
  lastStudiedAt: timestamp('last_studied_at').defaultNow(),
});

// Query with full type safety:
const progress = await db
  .select()
  .from(learningProgress)
  .where(eq(learningProgress.userId, userId));
// TypeScript KNOWS that progress[0].mastery is a number
```

---

### 5. Row Level Security (RLS) — Data Privacy

```sql
-- Without RLS: Any user can read ANY user's data (dangerous!)
-- With RLS: Users can ONLY access their own data

-- Policy: Users can only see their own learning progress
CREATE POLICY "Users see own data" ON learning_progress
  FOR SELECT
  USING (user_id = auth.uid());
```

**Industry Note**: This is how real apps protect data. GDPR, HIPAA — they all require this level of access control.

---

### 6. Supabase Auth — Sign In/Sign Up

```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Sign up
await supabase.auth.signUp({ email, password });

// Sign in
await supabase.auth.signInWithPassword({ email, password });

// Sign in with Google (OAuth)
await supabase.auth.signInWithOAuth({ provider: 'google' });

// Get current user
const { data: { user } } = await supabase.auth.getUser();
```

---

## 🏗️ What We'll Build

| File | What It Does |
|------|-------------|
| `src/lib/db/schema.ts` | Database table definitions |
| `src/lib/db/index.ts` | Database connection |
| `src/lib/db/queries.ts` | Reusable query functions |
| `src/app/(auth)/sign-in/page.tsx` | Sign in page |
| `src/app/(auth)/sign-up/page.tsx` | Sign up page |
| `src/app/api/progress/route.ts` | Save/load progress API |

---

## ✅ Checklist — Do You Understand?

- [ ] Why does an app need a database?
- [ ] What is a foreign key and how does it relate tables?
- [ ] Why use an ORM instead of raw SQL?
- [ ] What is Row Level Security and why is it critical?
- [ ] How does Supabase Auth handle sign-in?
- [ ] What's the difference between `SUPABASE_ANON_KEY` and `SERVICE_ROLE_KEY`?
