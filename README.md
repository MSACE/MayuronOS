# 🦚 MayuronOS (मयूर + Neuron)

> An AI-powered cognitive operating system that generates interactive UI in real-time based on how you learn, what you struggle with, and your emotional state.

![Status](https://img.shields.io/badge/status-in%20development-yellow)
![License](https://img.shields.io/badge/license-MIT-blue)

## ✨ Features

- **Generative UI** — AI creates interactive learning components (quizzes, flashcards, code editors) on the fly
- **Mood-Adaptive Interface** — detects frustration/confusion via behavioral signals and adapts the UI
- **Ghost Peer** — simulated AI study partner that learns alongside you
- **3D Knowledge Graph** — visualize your learning progress in an interactive 3D space
- **Smart Model Router** — routes AI tasks to the optimal model (Gemini for quality, Groq for speed)

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (React 19) + TypeScript |
| Styling | Tailwind CSS 4 + Framer Motion |
| AI SDK | Vercel AI SDK |
| AI Models | Google Gemini (primary) + Groq (speed) |
| Database | Supabase (PostgreSQL + pgvector + Auth) |
| ORM | Drizzle ORM |
| 3D | Three.js (React Three Fiber) |
| Hosting | Vercel |

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ 
- npm 10+
- Free API keys (see below)

### Installation

```bash
# Clone the repo
git clone https://github.com/MSACE/mayuron-os.git
cd mayuron-os

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys (see below)

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Free API Keys Required

| Service | Get Key At | Cost |
|---------|-----------|------|
| Google Gemini | [aistudio.google.com](https://aistudio.google.com/) | Free |
| Groq | [console.groq.com](https://console.groq.com/) | Free |
| Supabase | [supabase.com/dashboard](https://supabase.com/dashboard) | Free |

## 📁 Project Structure

```
src/
├── app/                    # Next.js pages & API routes
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── generative/         # AI-generated components
│   ├── adaptive/           # Mood-adaptive wrappers
│   └── knowledge-graph/    # 3D visualization
├── lib/
│   ├── ai/                 # AI logic (orchestrator, router, prompts)
│   ├── behavior/           # Mood detection engine
│   ├── db/                 # Database schema & queries
│   └── utils/              # Utilities & constants
├── hooks/                  # Custom React hooks
└── types/                  # TypeScript type definitions
```

## 👨‍💻 Creator & Architect

**Mayur Saini**  
*Full-Stack & AI Systems Engineer*

> *"By 2030, static applications will be obsolete. Computing will be powered by living, generative interfaces that perceive human cognition and morph in real-time. MayuronOS is my architectural blueprint for that future."* — **Mayur Saini**

---

## 📄 License

Distributed under the MIT License. See [LICENSE](./LICENSE) for more information.

Copyright © 2026 **Mayur Saini**. All rights reserved.
