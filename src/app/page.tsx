"use client";

import { useState } from "react";
import Link from "next/link";
import { APP_NAME, APP_AUTHOR, APP_TAGLINE, MOOD_THEMES } from "@/lib/utils/constants";
import { MoodState } from "@/types";

export default function LandingPage() {
  const [activeMood, setActiveMood] = useState<MoodState>("focused");
  const [activeTab, setActiveTab] = useState<"genui" | "telemetry" | "peer" | "graph">("genui");
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);

  const currentTheme = MOOD_THEMES[activeMood];

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-black">
      {/* Background ambient radial gradients & grid */}
      <div className="fixed inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-cyan-500/10 via-indigo-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* ─── Top Navbar ────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#030712]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-500 p-[1px] shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center font-mono font-bold text-cyan-400 text-sm">
                🦚
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold tracking-tight text-white">{APP_NAME}</span>
                <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-800/60 text-cyan-400">
                  v0.1.0
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">{APP_TAGLINE}</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
            <a href="#features" className="hover:text-white transition-colors">Architecture</a>
            <a href="#interactive-preview" className="hover:text-white transition-colors">Live Simulation</a>
            <a href="#curriculum" className="hover:text-white transition-colors">Study Modules</a>
            <a href="#creator" className="hover:text-white transition-colors">Creator</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/learn"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-medium text-xs sm:text-sm transition-all shadow-lg shadow-cyan-500/20 active:scale-95"
            >
              Launch Studio →
            </Link>
          </div>
        </div>
      </header>

      {/* ─── Hero Section ──────────────────────────────────────────── */}
      <main className="flex-1 max-w-7xl mx-auto px-6 pt-16 pb-24 w-full flex flex-col items-center">
        {/* Release Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-800 bg-slate-900/90 text-xs font-mono text-slate-300 mb-8 backdrop-blur-md glow-pill">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Next-Gen HCI System</span>
          <span className="text-slate-600">|</span>
          <span className="text-cyan-400">100/100 Cognitive Architecture</span>
        </div>

        {/* Hero Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-center max-w-4xl text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 leading-[1.1] mb-6">
          The Cognitive OS That <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400">
            Generates UI In Real-Time
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-400 text-center max-w-2xl leading-relaxed mb-10">
          Static applications are outdated. {APP_NAME} composes interactive React components
          on the fly, senses cognitive friction via behavioral telemetry, and pairs you with an
          adaptive Ghost Peer for true 1-on-1 mastery.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-16">
          <Link
            href="/learn"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white hover:bg-slate-200 text-slate-950 font-semibold text-sm transition-all shadow-xl shadow-white/10 active:scale-95 text-center flex items-center justify-center gap-2"
          >
            <span>Start Interactive Session</span>
            <span className="font-mono">→</span>
          </Link>
          <a
            href="#interactive-preview"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-slate-800 hover:border-slate-700 bg-slate-900/60 hover:bg-slate-900 text-slate-300 font-medium text-sm transition-all text-center flex items-center justify-center gap-2"
          >
            <span>Explore Live Sandbox</span>
            <span className="text-xs font-mono text-cyan-400">⚡</span>
          </a>
        </div>

        {/* Tech Stack Metrics Strip */}
        <div className="w-full max-w-4xl grid grid-cols-2 sm:grid-cols-4 gap-4 mb-20">
          {[
            { label: "STREAMING LATENCY", value: "< 200ms", sub: "Groq LPU Engine" },
            { label: "MEMORY CONTEXT", value: "1,000,000", sub: "Gemini 2.5 Flash" },
            { label: "VECTOR ENGINE", value: "pgvector", sub: "ACID Relational Sync" },
            { label: "FRONTEND SPEC", value: "Next.js 15", sub: "React 19 Server Comp" },
          ].map((stat, i) => (
            <div key={i} className="glass-card p-4 rounded-xl flex flex-col items-center text-center">
              <span className="text-[10px] font-mono text-slate-400 tracking-wider mb-1">{stat.label}</span>
              <span className="text-xl font-bold text-white tracking-tight">{stat.value}</span>
              <span className="text-[11px] text-cyan-400/80 font-mono mt-0.5">{stat.sub}</span>
            </div>
          ))}
        </div>

        {/* ─── Interactive Live Preview Studio ─────────────────────────── */}
        <section id="interactive-preview" className="w-full max-w-5xl mb-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4">
            <div>
              <span className="text-xs font-mono text-cyan-400 tracking-wider uppercase mb-1 block">
                ● Live Interactive Engine
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Experience the 4 Cognitive Pillars
              </h2>
            </div>

            {/* Pillar Selector Tabs */}
            <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-xl">
              {[
                { id: "genui", label: "🎨 Generative UI" },
                { id: "telemetry", label: "🎭 Mood Engine" },
                { id: "peer", label: "👻 Ghost Peer" },
                { id: "graph", label: "🌌 3D Matrix" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-cyan-500 text-slate-950 font-semibold shadow-md"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Preview Canvas */}
          <div className="glass-card rounded-2xl p-6 sm:p-8 relative overflow-hidden border border-slate-800">
            {/* Tab 1: Generative UI Simulation */}
            {activeTab === "genui" && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="text-xs font-mono text-slate-400 ml-2">streamUI() // Dynamic React Output</span>
                  </div>
                  <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/50">
                    Live Component Render
                  </span>
                </div>

                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2">
                    Prompt: "Teach me JavaScript Event Loop with a challenge"
                  </span>
                  <p className="text-sm text-slate-200 mb-4 font-sans leading-relaxed">
                    Here is an interactive challenge generated for you on the fly. Which task gets processed first?
                  </p>

                  <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 font-mono text-xs text-slate-300 mb-4 space-y-1">
                    <div className="text-purple-400">console.log("A");</div>
                    <div className="text-cyan-400">setTimeout(() =&gt; console.log("B"), 0);</div>
                    <div className="text-emerald-400">Promise.resolve().then(() =&gt; console.log("C"));</div>
                    <div className="text-purple-400">console.log("D");</div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { id: 0, text: "1. A ➔ B ➔ C ➔ D", correct: false },
                      { id: 1, text: "2. A ➔ D ➔ C ➔ B", correct: true },
                      { id: 2, text: "3. A ➔ D ➔ B ➔ C", correct: false },
                      { id: 3, text: "4. C ➔ A ➔ D ➔ B", correct: false },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setQuizAnswer(opt.id)}
                        className={`p-3 rounded-lg border text-left text-xs font-medium transition-all ${
                          quizAnswer === opt.id
                            ? opt.correct
                              ? "bg-emerald-950/80 border-emerald-500 text-emerald-300"
                              : "bg-red-950/80 border-red-500 text-red-300"
                            : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
                        }`}
                      >
                        {opt.text}
                      </button>
                    ))}
                  </div>

                  {quizAnswer !== null && (
                    <div className="mt-4 p-3 rounded-lg bg-cyan-950/40 border border-cyan-800/40 text-xs text-cyan-200 animate-in fade-in">
                      {quizAnswer === 1 ? (
                        <p>✅ <strong>Spot on!</strong> Synchronous code runs first (A, D), then Microtasks (Promise C), then Macrotasks (setTimeout B).</p>
                      ) : (
                        <p>💡 <strong>Almost!</strong> Microtasks (Promises) run before Macrotasks (setTimeout). Try clicking Option 2!</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tab 2: Affective Telemetry Simulator */}
            {activeTab === "telemetry" && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                  <span className="text-xs font-mono text-slate-400">Behavioral Telemetry State Machine</span>
                  <span
                    className="text-xs font-mono px-2.5 py-0.5 rounded-full border uppercase tracking-wider font-semibold"
                    style={{
                      borderColor: currentTheme.primaryColor,
                      color: currentTheme.primaryColor,
                      backgroundColor: `${currentTheme.primaryColor}15`,
                    }}
                  >
                    State: {activeMood}
                  </span>
                </div>

                <p className="text-xs text-slate-400">
                  Click a mood state to simulate how the entire UI and cognitive pacing morphs in real time:
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {(["focused", "confident", "confused", "frustrated"] as MoodState[]).map((mood) => (
                    <button
                      key={mood}
                      onClick={() => setActiveMood(mood)}
                      className={`p-3 rounded-xl border text-center text-xs font-mono uppercase tracking-wider transition-all ${
                        activeMood === mood
                          ? "ring-2 ring-cyan-400 font-bold text-white"
                          : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                      }`}
                      style={{
                        backgroundColor: activeMood === mood ? `${MOOD_THEMES[mood].primaryColor}20` : undefined,
                        borderColor: activeMood === mood ? MOOD_THEMES[mood].primaryColor : undefined,
                      }}
                    >
                      {mood}
                    </button>
                  ))}
                </div>

                {/* Simulated Adaptive Container */}
                <div
                  className="p-5 rounded-xl border transition-all duration-500"
                  style={{
                    borderColor: currentTheme.primaryColor,
                    backgroundColor: `${currentTheme.primaryColor}08`,
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold" style={{ color: currentTheme.primaryColor }}>
                      ● Active Pacing Adaptation
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      Telemetry: {activeMood === "frustrated" ? "Rapid Clicks (140ms)" : "Optimal Cadence (650ms)"}
                    </span>
                  </div>

                  {activeMood === "frustrated" && (
                    <div className="p-3 bg-purple-950/60 border border-purple-800/60 rounded-lg text-xs text-purple-200 mb-3">
                      💜 <strong>Encouragement Active:</strong> Complex parameters collapsed into an isolated step. Animations slowed by 60%.
                    </div>
                  )}

                  {activeMood === "confident" && (
                    <div className="p-3 bg-emerald-950/60 border border-emerald-800/60 rounded-lg text-xs text-emerald-200 mb-3">
                      ⚡ <strong>Challenge Level Up:</strong> Advanced edge cases and timed code challenges unlocked!
                    </div>
                  )}

                  <p className="text-xs text-slate-300">
                    {activeMood === "confused" && "Pacing slowed. Socratic breakdown and intermediate visual diagram rendered."}
                    {activeMood === "focused" && "Standard high-velocity interactive mode active. Full telemetry streaming."}
                  </p>
                </div>
              </div>
            )}

            {/* Tab 3: Ghost Peer Simulation */}
            {activeTab === "peer" && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-mono text-slate-200 font-semibold">Pixel (Ghost Peer Agent)</span>
                  </div>
                  <span className="text-[11px] font-mono text-cyan-400">Sub-200ms Groq LPU Voice/Chat</span>
                </div>

                <div className="space-y-3 font-sans text-xs">
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 max-w-lg">
                    <span className="text-[10px] font-mono text-indigo-400 block mb-1">👻 PIXEL</span>
                    <p className="text-slate-200 leading-relaxed">
                      "Hey Mayur! I was trying to fetch user data using <code className="bg-slate-950 px-1 py-0.5 rounded text-cyan-300">async/await</code> inside a <code className="bg-slate-950 px-1 py-0.5 rounded text-cyan-300">forEach</code> loop, and the whole thing ran out of order! Why didn't <code className="text-cyan-300">forEach</code> wait for my promise? Can you explain it to me?"
                    </p>
                  </div>

                  <div className="bg-cyan-950/60 border border-cyan-800/60 rounded-xl p-3.5 max-w-lg ml-auto text-right">
                    <span className="text-[10px] font-mono text-cyan-400 block mb-1">YOU (TEACHING PIXEL)</span>
                    <p className="text-cyan-100 leading-relaxed">
                      "Because <code className="bg-slate-950 px-1 py-0.5 rounded">forEach</code> does not await asynchronous callbacks! It just fires them in parallel. You should use a <code className="bg-slate-950 px-1 py-0.5 rounded">for...of</code> loop or <code className="bg-slate-950 px-1 py-0.5 rounded">Promise.all()</code> instead."
                    </p>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 max-w-lg">
                    <span className="text-[10px] font-mono text-indigo-400 block mb-1">👻 PIXEL</span>
                    <p className="text-slate-200 leading-relaxed">
                      "OH! 🤯 That makes total sense! So <code className="text-cyan-300">for...of</code> preserves execution order! Thanks for unblocking me!"
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: 3D Knowledge Graph Teaser */}
            {activeTab === "graph" && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                  <span className="text-xs font-mono text-slate-400">Three.js / WebXR Spatial Knowledge Matrix</span>
                  <span className="text-xs font-mono text-purple-400">Apple Vision Pro Ready</span>
                </div>

                <div className="h-48 bg-slate-950 border border-slate-800 rounded-xl relative flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-purple-500/10 to-transparent pointer-events-none" />
                  
                  {/* Visual simulated nodes */}
                  <div className="flex items-center gap-6 z-10">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center font-mono text-[10px] text-emerald-300 font-bold shadow-lg shadow-emerald-500/30">
                        96%
                      </div>
                      <span className="text-[11px] font-mono text-slate-300 mt-1">Promises</span>
                    </div>

                    <div className="w-12 h-[2px] bg-gradient-to-r from-emerald-400 to-yellow-400 animate-pulse" />

                    <div className="flex flex-col items-center">
                      <div className="w-14 h-14 rounded-full bg-yellow-500/20 border-2 border-yellow-400 flex items-center justify-center font-mono text-xs text-yellow-300 font-bold shadow-lg shadow-yellow-500/30">
                        65%
                      </div>
                      <span className="text-[11px] font-mono text-slate-300 mt-1">Event Loop</span>
                    </div>

                    <div className="w-12 h-[2px] bg-gradient-to-r from-yellow-400 to-red-400 opacity-60" />

                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-red-500/20 border-2 border-red-400 flex items-center justify-center font-mono text-[10px] text-red-300 font-bold shadow-lg shadow-red-500/30">
                        0%
                      </div>
                      <span className="text-[11px] font-mono text-slate-400 mt-1">Streams</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-400 text-center font-mono">
                  Concept nodes positioned via physics simulation. Color indicates mastery: <span className="text-emerald-400">Mastered</span> | <span className="text-yellow-400">In Progress</span> | <span className="text-red-400">Knowledge Gap</span>
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ─── Creator Signature Section ──────────────────────────────── */}
        <section id="creator" className="w-full max-w-4xl border-t border-slate-800/80 pt-16 pb-12 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-500 p-[1px] mb-4 shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[15px] flex items-center justify-center font-bold text-white text-base">
              MS
            </div>
          </div>

          <h3 className="text-xl font-bold text-white tracking-tight">{APP_AUTHOR}</h3>
          <p className="text-xs font-mono text-cyan-400 mb-4">Lead Architect & Creator</p>

          <p className="text-sm text-slate-400 max-w-xl leading-relaxed italic mb-6">
            "By 2030, static applications will be obsolete. Computing will be powered by living,
            generative interfaces that perceive human cognition and morph in real-time.
            {APP_NAME} is the architectural blueprint for that future."
          </p>

          <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
            <span>© 2026 {APP_AUTHOR}</span>
            <span>•</span>
            <span>MIT License</span>
            <span>•</span>
            <span>Next.js 15 App Router</span>
          </div>
        </section>
      </main>
    </div>
  );
}
