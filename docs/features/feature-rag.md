# Feature Deep Dive: RAG (Retrieval Augmented Generation)

> How AI uses YOUR data to give better, more accurate answers

---

## The Problem with LLMs

LLMs know general knowledge but DON'T know:
- Your specific learning history
- Your course materials
- Your past mistakes
- Your notes and highlights

**Result**: Generic answers that don't account for what you already know.

---

## The Solution: RAG

```
Without RAG:
  User: "Explain closures"
  AI: [generic explanation from training data]

With RAG:
  User: "Explain closures"
  System: [searches your learning history]
  System: "User learned functions last week, scored 40% on scope quiz,
           struggled with lexical environment concept"
  AI: "Since you already understand functions but struggled with scope,
       let me explain closures by building on what you know about scope..."
```

---

## How RAG Works (4 Steps)

### Step 1: Embed (convert text to numbers)
```
"JavaScript closures capture variables" 
  → [0.023, -0.041, 0.089, ..., 0.012]  (1536 numbers)

These numbers represent the MEANING of the text.
Similar meanings → similar numbers → close in vector space.
```

### Step 2: Store (save embeddings in vector database)
```
Your learning content is embedded and stored:
  - Course notes → embedded → stored in pgvector
  - Quiz results → embedded → stored in pgvector
  - Chat history → embedded → stored in pgvector
```

### Step 3: Retrieve (find relevant context)
```
User asks: "What are closures?"
  → Embed the question: [0.025, -0.039, 0.091, ...]
  → Search pgvector for similar embeddings
  → Find: "User's scope quiz (40%)", "Functions lesson (completed)"
  → These become the AI's context
```

### Step 4: Generate (AI answers with context)
```
System prompt + Retrieved context + User question → AI
  → Personalized, accurate answer
```

---

## pgvector in Supabase — Our Implementation

```sql
-- Enable vector extension
create extension if not exists vector;

-- Create table with vector column
create table learning_embeddings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  content text not null,
  embedding vector(768),  -- 768-dimensional vector
  metadata jsonb,
  created_at timestamp default now()
);

-- Search for similar content
select content, metadata,
  1 - (embedding <=> query_embedding) as similarity
from learning_embeddings
where user_id = 'user-123'
order by embedding <=> query_embedding
limit 5;
```

```typescript
// In our app:
import { google } from '@ai-sdk/google';
import { embed } from 'ai';

// Create embedding for a piece of text
const { embedding } = await embed({
  model: google.textEmbeddingModel('text-embedding-004'),
  value: "User scored 40% on scope quiz, confused about lexical environment",
});

// Store in Supabase
await supabase.from('learning_embeddings').insert({
  user_id: userId,
  content: "Scope quiz result",
  embedding: embedding,
  metadata: { topic: 'scope', score: 40 },
});
```

---

## Why RAG > Fine-Tuning

| Approach | What It Does | Cost | Freshness | Our Choice? |
|----------|-------------|------|-----------|------------|
| **Fine-tuning** | Retrain the AI model | $$$ | Stale | ❌ |
| **RAG** | Feed context at query time | Free | Always fresh | ✅ |

RAG is cheaper, doesn't require model retraining, and always uses the latest data. Fine-tuning is for when you need the model to learn new BEHAVIORS, not new FACTS.

---

## Key Terms

| Term | Definition |
|------|-----------|
| **Embedding** | A numerical representation of text meaning (array of floats) |
| **Vector** | Same as embedding — an array of numbers |
| **Vector Database** | Database optimized for similarity search on vectors |
| **pgvector** | PostgreSQL extension that adds vector search |
| **Similarity Search** | Finding vectors closest to a query vector |
| **Cosine Similarity** | Math formula measuring how "close" two vectors are (0-1) |
| **Chunk** | A piece of text before it's embedded (don't embed entire documents) |
