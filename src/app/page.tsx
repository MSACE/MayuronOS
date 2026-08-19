'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowUpRight,
  Check,
  Command,
  Layers3,
  Play,
  Sparkles,
  Cpu,
  Brain,
  Eye,
  Activity,
  Flame,
  Globe2,
} from 'lucide-react'
import { APP_NAME, APP_AUTHOR, APP_TAGLINE, MOOD_THEMES } from '@/lib/utils/constants'
import { MoodState } from '@/types'

const modes = [
  {
    label: 'Generative Synthesis',
    title: 'Turn thought into living, interactive interfaces.',
    body: 'Describe what you want to master. MayuronOS synthesizes custom code playgrounds, real-time quizzes, and visual diagrams on the fly—no static pages.',
  },
  {
    label: 'Affective Telemetry',
    title: 'An interface that perceives human friction.',
    body: 'Sub-second behavioral telemetry detects hesitation, error rate, and cognitive fatigue, dynamically softening animations, altering themes, and offering guidance.',
  },
  {
    label: 'Cognitive Matrix',
    title: 'Every concept connected in 3D spatial space.',
    body: 'Fly through your living knowledge constellation. Discover hidden gaps, track mastery progression, and step inside with WebXR on spatial headsets.',
  },
]

export default function Page() {
  const [activeMode, setActiveMode] = useState(0)
  const [activeMood, setActiveMood] = useState<MoodState>('focused')
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null)

  const currentTheme = MOOD_THEMES[activeMood]

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground selection:bg-cyan-500 selection:text-black">
      {/* Subtle ambient grid and chromatic glow background */}
      <div className="fixed inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-gradient-to-b from-cyan-500/12 via-indigo-500/6 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* ─── Sticky Header ────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <Link href="/" className="flex items-center gap-2.5 text-sm font-semibold tracking-tight group" aria-label="MayuronOS Home">
            <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground shadow-lg shadow-cyan-500/25 transition-transform group-hover:scale-105">
              <Command className="size-4 text-slate-950 stroke-[2.5]" />
            </span>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-bold tracking-tight text-white">{APP_NAME}</span>
                <span className="text-[10px] font-mono uppercase px-1.5 py-0.2 rounded-full bg-primary/10 border border-primary/30 text-primary">
                  v0.1.0
                </span>
              </div>
              <span className="text-[10px] text-muted-foreground hidden sm:block">{APP_TAGLINE}</span>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 text-xs font-medium text-muted-foreground md:flex">
            <a href="#system" className="transition-colors hover:text-foreground">System Architecture</a>
            <a href="#interactive-preview" className="transition-colors hover:text-foreground">Live Telemetry</a>
            <a href="#principles" className="transition-colors hover:text-foreground">Core Pillars</a>
            <a href="#creator" className="transition-colors hover:text-foreground">Architect</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/learn"
              className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-lg shadow-cyan-500/20 transition-all hover:bg-cyan-300 hover:shadow-cyan-500/30 active:scale-95"
            >
              <span>Launch Studio</span>
              <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* ─── Hero Section ────────────────────────────────────────────── */}
      <section id="top" className="mx-auto grid max-w-7xl gap-12 px-6 pb-20 pt-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-10 lg:pb-28 lg:pt-20">
        <div className="max-w-xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary backdrop-blur-md">
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>A New Cognitive Operating Layer</span>
            <span className="text-border">|</span>
            <span className="font-mono text-muted-foreground">100/100 Spec</span>
          </div>

          <h1 className="text-balance text-5xl font-bold tracking-[-0.055em] sm:text-6xl lg:text-7xl leading-[1.08] text-white">
            Make space for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400">
              better thinking.
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-pretty text-base leading-7 text-muted-foreground">
            {APP_NAME} is an adaptive cognitive workspace for consequential mastery. It generates
            interactive UI in real time, senses emotional friction via behavioral telemetry, and pairs
            you with a Ghost Peer. Less interface. More signal.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-xl shadow-cyan-500/25 transition-all hover:bg-cyan-300 hover:shadow-cyan-500/40 hover:-translate-y-0.5 active:scale-95"
            >
              <span>Explore {APP_NAME}</span>
              <ArrowUpRight className="size-4 text-slate-950" />
            </Link>
            <a
              href="#interactive-preview"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-5 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              <span>Live Simulation</span>
              <Sparkles className="size-3.5 text-primary" />
            </a>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-6 text-xs font-mono">
            <div>
              <span className="text-muted-foreground block text-[10px] uppercase">Telemetry</span>
              <span className="text-sm font-bold text-white">&lt; 200ms</span>
            </div>
            <div>
              <span className="text-muted-foreground block text-[10px] uppercase">Context Depth</span>
              <span className="text-sm font-bold text-white">1M Tokens</span>
            </div>
            <div>
              <span className="text-muted-foreground block text-[10px] uppercase">Architecture</span>
              <span className="text-sm font-bold text-white">Next.js 15 RSC</span>
            </div>
          </div>
        </div>

        {/* ─── Hero Glass Panel Live Canvas ─────────────────────────── */}
        <div className="glass-panel relative min-h-[420px] overflow-hidden rounded-2xl p-5 sm:min-h-[500px] lg:min-h-[560px]">
          <div className="flex items-center justify-between border-b border-border pb-4 text-[10px] font-mono uppercase tracking-[0.16em] text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
              {APP_NAME} / cognitive runtime
            </span>
            <span className="text-primary">Live streamUI()</span>
          </div>

          <div className="absolute inset-x-6 bottom-6 top-20 rounded-xl border border-border bg-card/90 shadow-2xl p-5 flex flex-col justify-between overflow-hidden">
            {/* Top Bar of Workspace */}
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-white">Dynamic Session Synthesis</span>
                <span className="rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-medium text-primary">
                  In synthesis
                </span>
              </div>
              <span className="text-[11px] font-mono text-muted-foreground">Mastery: 88%</span>
            </div>

            {/* Middle Section: Code + Signal Radar */}
            <div className="grid gap-4 py-4 sm:grid-cols-[1.1fr_0.9fr] flex-1">
              <div className="space-y-2.5">
                <div className="rounded-lg bg-slate-950/80 border border-border p-3 font-mono text-[11px] text-slate-300 space-y-1">
                  <div className="text-purple-400 font-semibold">// Live Generated Sandbox</div>
                  <div className="text-cyan-300">const taskQueue = new MicrotaskQueue();</div>
                  <div className="text-emerald-400">taskQueue.dispatch(async () =&gt; streamUI());</div>
                </div>

                <div className="rounded-lg border border-border p-3 bg-secondary/40">
                  <div className="mb-1.5 flex items-center gap-2 text-xs font-medium text-white">
                    <Sparkles className="size-3.5 text-primary" /> Active Working Thesis
                  </div>
                  <p className="text-xs leading-5 text-muted-foreground">
                    The highest retention occurs when UI components self-generate at the moment of cognitive need.
                  </p>
                </div>
              </div>

              {/* Signal Radar Map */}
              <div className="rounded-lg bg-secondary/60 border border-border p-3.5 flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground font-mono text-[10px] uppercase">Cognitive Radar</span>
                  <Layers3 className="size-4 text-primary" />
                </div>
                <div className="flex h-28 items-center justify-center my-2">
                  <div className="relative size-24 rounded-full border border-primary/30 flex items-center justify-center animate-pulse">
                    <div className="size-12 rounded-full bg-accent flex items-center justify-center">
                      <span className="size-3 rounded-full bg-primary" />
                    </div>
                    <span className="absolute -right-3 top-1 text-[8px] font-mono text-cyan-300">context</span>
                    <span className="absolute -left-3 bottom-1 text-[8px] font-mono text-purple-300">intent</span>
                  </div>
                </div>
                <div className="flex justify-between text-[9px] font-mono text-muted-foreground border-t border-border pt-1.5">
                  <span>State: Focused</span>
                  <span className="text-emerald-400">Optimal (420ms)</span>
                </div>
              </div>
            </div>

            {/* Bottom Status bar */}
            <div className="flex items-center justify-between border-t border-border pt-3 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-primary" />
                Agent Swarm: Active
              </span>
              <span className="font-mono text-xs text-white">Gemini 2.5 + Groq LPU</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── System Modes Section (from v0) ────────────────────────── */}
      <section id="system" className="border-y border-border bg-secondary/40">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[0.42fr_1fr] lg:px-10 lg:py-28">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              One system, many ways in
            </p>
            <h2 className="mt-5 text-3xl font-bold tracking-[-0.04em] sm:text-4xl text-white">
              The work stays human. <br />
              The surface gets smarter.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground max-w-sm">
              Instead of static screens, MayuronOS continuously adapts its surface depending on whether you are synthesizing new knowledge or analyzing gaps.
            </p>
          </div>

          <div>
            <div className="flex flex-wrap gap-2 border-b border-border pb-4">
              {modes.map((mode, index) => (
                <button
                  key={mode.label}
                  onClick={() => setActiveMode(index)}
                  className={`rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-all ${
                    activeMode === index
                      ? 'bg-primary text-primary-foreground font-semibold shadow-md'
                      : 'text-muted-foreground hover:bg-card hover:text-foreground'
                  }`}
                >
                  {mode.label}
                </button>
              ))}
            </div>

            <div className="grid gap-8 pt-8 sm:grid-cols-[1fr_auto] sm:items-end">
              <div>
                <h3 className="max-w-lg text-2xl sm:text-3xl font-bold tracking-[-0.04em] text-white">
                  {modes[activeMode].title}
                </h3>
                <p className="mt-4 max-w-lg text-sm leading-7 text-muted-foreground">
                  {modes[activeMode].body}
                </p>
              </div>
              <div className="flex size-16 sm:size-20 items-center justify-center rounded-2xl border border-border bg-card shadow-xl">
                <Play className="ml-1 size-5 fill-primary text-primary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Interactive Telemetry & Supercar Palette Studio ────────── */}
      <section id="interactive-preview" className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Supercar Chromatic Telemetry
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em] sm:text-4xl text-white">
            Real-Time Cognitive Morphing
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Click an affective state below to watch how the interface tokens and pedagogical pacing morph dynamically:
          </p>
        </div>

        {/* Supercar Palette Switcher */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto mb-8">
          {(['focused', 'confident', 'confused', 'frustrated'] as MoodState[]).map((mood) => {
            const theme = MOOD_THEMES[mood]
            return (
              <button
                key={mood}
                onClick={() => setActiveMood(mood)}
                className={`p-3.5 rounded-xl border text-center transition-all ${
                  activeMood === mood
                    ? 'ring-2 ring-primary font-bold text-white shadow-xl'
                    : 'bg-card border-border text-muted-foreground hover:text-foreground'
                }`}
                style={{
                  backgroundColor: activeMood === mood ? `${theme.primaryColor}18` : undefined,
                  borderColor: activeMood === mood ? theme.primaryColor : undefined,
                }}
              >
                <div className="text-xs font-mono uppercase tracking-wider">{mood}</div>
                <div className="text-[10px] font-sans opacity-85 mt-1" style={{ color: theme.primaryColor }}>
                  {theme.name}
                </div>
              </button>
            )
          })}
        </div>

        {/* Dynamic Simulated Telemetry Card */}
        <div
          className="max-w-3xl mx-auto glass-panel p-6 sm:p-8 rounded-2xl transition-all duration-500"
          style={{ borderColor: currentTheme.primaryColor }}
        >
          <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
            <span className="text-xs font-mono font-bold" style={{ color: currentTheme.primaryColor }}>
              ● Active State: {currentTheme.name}
            </span>
            <span className="text-[11px] font-mono text-muted-foreground">
              Latency: {activeMood === 'frustrated' ? '140ms (Rapid Friction)' : '420ms (Optimal)'}
            </span>
          </div>

          {activeMood === 'frustrated' && (
            <div className="p-3.5 bg-purple-950/60 border border-purple-800/60 rounded-xl text-xs text-purple-200 mb-4 animate-in fade-in">
              💜 <strong>Viola Pasifae Recovery:</strong> Complex steps collapsed into isolated hint. Animations slowed by 60%.
            </div>
          )}

          {activeMood === 'confident' && (
            <div className="p-3.5 bg-emerald-950/60 border border-emerald-800/60 rounded-xl text-xs text-emerald-200 mb-4 animate-in fade-in">
              ⚡ <strong>Verde Mantis Acceleration:</strong> Advanced edge cases unlocked. Timed challenges active!
            </div>
          )}

          <div className="bg-slate-950/90 border border-border rounded-xl p-4 font-mono text-xs text-slate-300">
            <div className="text-muted-foreground mb-2">// Interactive Quiz Generation Check</div>
            <div className="text-white mb-3">Which loop construct guarantees execution order for async callbacks?</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { id: 0, text: 'Array.prototype.forEach()', correct: false },
                { id: 1, text: 'for...of loop', correct: true },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setQuizAnswer(opt.id)}
                  className={`p-2.5 rounded-lg border text-left text-xs transition-all ${
                    quizAnswer === opt.id
                      ? opt.correct
                        ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                        : 'bg-red-950 border-red-500 text-red-300'
                      : 'bg-card border-border text-muted-foreground hover:text-white'
                  }`}
                >
                  {opt.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Principles Section (from v0) ─────────────────────────── */}
      <section id="principles" className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28 border-t border-border">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="glass-panel p-6 rounded-2xl border border-border">
            <Check className="size-5 text-primary" />
            <h3 className="mt-4 text-xl font-bold tracking-tight text-white">Quiet by default</h3>
            <p className="mt-2.5 text-sm leading-6 text-muted-foreground">
              A considered interface that removes decorative noise to make room for deep cognitive focus.
            </p>
          </div>
          <div className="glass-panel p-6 rounded-2xl border border-border">
            <Check className="size-5 text-primary" />
            <h3 className="mt-4 text-xl font-bold tracking-tight text-white">Context, connected</h3>
            <p className="mt-2.5 text-sm leading-6 text-muted-foreground">
              Your memory embeddings, past mistakes, and 3D concept constellations stay synced via pgvector.
            </p>
          </div>
          <div className="glass-panel p-6 rounded-2xl border border-border">
            <Check className="size-5 text-primary" />
            <h3 className="mt-4 text-xl font-bold tracking-tight text-white">Built for trust</h3>
            <p className="mt-2.5 text-sm leading-6 text-muted-foreground">
              Self-healing schema evals ensure 100% deterministic UI rendering without runtime crashes.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Creator & Architect Footer ───────────────────────────── */}
      <footer id="creator" className="mx-auto max-w-7xl px-6 py-16 lg:px-10 border-t border-border">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="size-7 place-items-center rounded-md bg-primary grid text-slate-950 font-bold text-xs">
                MS
              </span>
              <span className="font-bold text-white text-lg">{APP_AUTHOR}</span>
              <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
                Lead Architect & Creator
              </span>
            </div>
            <p className="text-2xl font-bold tracking-[-0.03em] text-white max-w-xl">
              "By 2030, static applications will be obsolete. Computing will be powered by living, generative interfaces."
            </p>
            <p className="mt-2 text-xs text-muted-foreground font-mono">
              MayuronOS (मयूर + Neuron) • Next.js 15 • Vercel AI SDK • Supabase • Three.js
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-xs font-semibold text-primary-foreground transition-all hover:bg-cyan-300 active:scale-95"
            >
              <span>Launch Studio</span>
              <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-border pt-6 text-xs text-muted-foreground font-mono">
          <span>© 2026 {APP_AUTHOR} (MSACE). MIT License.</span>
          <span className="mt-2 sm:mt-0 text-primary">Live on GitHub: MSACE/MayuronOS</span>
        </div>
      </footer>
    </main>
  )
}
