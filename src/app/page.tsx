'use client'

import { useState } from 'react'
import { ArrowUpRight, Check, Command, Layers3, Play, Sparkles } from 'lucide-react'

const modes = [
  { label: 'Synthesis', title: 'Turn ideas into working systems.', body: 'Describe the outcome. Mayuron maps the intent, assembles the right tools, and gives your team a clear place to begin.' },
  { label: 'Analysis', title: 'See the signal, not the noise.', body: 'Bring context together across projects, decisions, and data. Every answer stays grounded in the work that produced it.' },
  { label: 'Archive', title: 'Make institutional knowledge useful.', body: 'Capture the reasoning behind the work, so the next decision starts with momentum instead of a blank page.' },
]

export default function Page() {
  const [activeMode, setActiveMode] = useState(0)

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground relative selection:bg-[#00c3ff] selection:text-black">
      {/* Supercar Ambient Horizon Light Beams (Blu Cepheus & Viola Pasifae) */}
      <div className="fixed -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-gradient-to-b from-[#00c3ff]/10 via-[#a855f7]/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <a href="#top" className="flex items-center gap-2.5 text-sm font-semibold tracking-tight group" aria-label="Mayuron home">
          <span className="grid size-7 place-items-center rounded-md bg-[#00c3ff] text-slate-950 shadow-md shadow-[#00c3ff]/25 transition-transform group-hover:scale-105">
            <Command className="size-4 stroke-[2.5]" />
          </span>
          <span className="tracking-tight text-white">mayuron</span>
        </a>
        <nav className="hidden items-center gap-8 text-xs font-medium text-muted-foreground md:flex">
          <a href="#system" className="transition-colors hover:text-foreground">System</a>
          <a href="#principles" className="transition-colors hover:text-foreground">Principles</a>
          <a href="#contact" className="transition-colors hover:text-foreground">Contact</a>
        </nav>
        <a href="#contact" className="flex items-center gap-1 text-xs font-semibold text-foreground hover:text-[#00c3ff] transition-colors">
          Request access <ArrowUpRight className="size-3.5" />
        </a>
      </header>

      <section id="top" className="mx-auto grid max-w-7xl gap-14 px-6 pb-20 pt-16 lg:grid-cols-[0.88fr_1.12fr] lg:items-end lg:px-10 lg:pb-28 lg:pt-28">
        <div className="max-w-xl">
          <p className="mb-7 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#49f112]">
            <span className="size-1.5 rounded-full bg-[#49f112] shadow-[0_0_8px_#49f112] animate-pulse" />
            A new operating layer
          </p>
          <h1 className="text-balance text-5xl font-semibold tracking-[-0.065em] sm:text-6xl lg:text-8xl text-white">
            Make space for better thinking.
          </h1>
          <p className="mt-8 max-w-md text-pretty text-base leading-7 text-muted-foreground">
            Mayuron is a calm, intelligent workspace for teams doing consequential work. Less interface. More signal.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#system"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition-all hover:bg-slate-100 hover:shadow-lg hover:shadow-[#00c3ff]/20 hover:-translate-y-0.5 active:scale-95"
            >
              Explore Mayuron <ArrowUpRight className="size-4" />
            </a>
            <span className="text-xs text-muted-foreground">Built for teams of 5–500</span>
          </div>
        </div>

        {/* Glassmorphism Workspace Preview with Supercar Highlights */}
        <div className="glass-panel relative min-h-[390px] overflow-hidden rounded-2xl p-5 sm:min-h-[480px] lg:min-h-[540px]">
          <div className="flex items-center justify-between border-b border-border pb-4 text-[10px] font-mono uppercase tracking-[0.16em] text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-[#00c3ff]" />
              Mayuron / workspace
            </span>
            <span className="text-[#00c3ff]/80">Live environment</span>
          </div>

          <div className="absolute inset-x-10 bottom-10 top-24 rounded-xl border border-border bg-card shadow-[0_24px_60px_rgba(0,0,0,0.4)]">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <span className="text-sm font-medium text-white">Q3 product direction</span>
              <span className="rounded-full bg-[#ff7300]/15 border border-[#ff7300]/30 px-2.5 py-1 text-[10px] font-medium text-[#ff7300]">
                In synthesis
              </span>
            </div>

            <div className="grid gap-5 p-5 sm:grid-cols-[1fr_0.8fr]">
              <div className="space-y-3">
                <div className="h-2 w-2/3 rounded-full bg-border" />
                <div className="h-2 w-full rounded-full bg-border" />
                <div className="h-2 w-5/6 rounded-full bg-border" />
                <div className="mt-8 rounded-lg border border-border bg-secondary/50 p-4">
                  <div className="mb-3 flex items-center gap-2 text-xs font-medium text-white">
                    <Sparkles className="size-3.5 text-[#00c3ff]" /> Working thesis
                  </div>
                  <p className="text-sm leading-6 text-muted-foreground">
                    The strongest opportunity is not another feature. It is a clearer decision surface.
                  </p>
                </div>
              </div>

              {/* Signal Map with Supercar Radar Colors */}
              <div className="rounded-lg bg-secondary p-4 flex flex-col justify-between">
                <div className="mb-8 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground font-mono text-[10px] uppercase">Signal map</span>
                  <Layers3 className="size-4 text-[#00c3ff]" />
                </div>
                <div className="flex h-32 items-center justify-center">
                  <div className="relative size-28 rounded-full border border-[#00c3ff]/35 flex items-center justify-center">
                    <div className="size-14 rounded-full bg-[#a855f7]/20 border border-[#a855f7]/40 flex items-center justify-center">
                      <span className="size-2.5 rounded-full bg-[#a855f7]" />
                    </div>
                    <span className="absolute -right-4 top-4 text-[9px] font-mono text-[#00c3ff]">context</span>
                    <span className="absolute -left-5 bottom-3 text-[9px] font-mono text-[#a855f7]">intent</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── System Modes Section ───────────────────────────────────── */}
      <section id="system" className="border-y border-border bg-secondary/40">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[0.42fr_1fr] lg:px-10 lg:py-28">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#00c3ff]">
              One system, many ways in
            </p>
            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl text-white">
              The work stays human. The surface gets smarter.
            </h2>
          </div>

          <div>
            <div className="flex flex-wrap gap-2 border-b border-border pb-4">
              {modes.map((mode, index) => (
                <button
                  key={mode.label}
                  onClick={() => setActiveMode(index)}
                  className={`rounded-full px-4 py-2 text-sm transition-all ${
                    activeMode === index
                      ? 'bg-white text-slate-950 font-semibold shadow-md shadow-white/10'
                      : 'text-muted-foreground hover:bg-card hover:text-foreground'
                  }`}
                >
                  {mode.label}
                </button>
              ))}
            </div>

            <div className="grid gap-8 pt-8 sm:grid-cols-[1fr_auto] sm:items-end">
              <div>
                <h3 className="max-w-lg text-3xl font-semibold tracking-[-0.04em] text-white">
                  {modes[activeMode].title}
                </h3>
                <p className="mt-4 max-w-lg text-sm leading-7 text-muted-foreground">
                  {modes[activeMode].body}
                </p>
              </div>
              <div className="flex size-20 items-center justify-center rounded-full border border-border bg-card shadow-xl group hover:border-[#ffe600]/40 transition-colors">
                <Play className="ml-1 size-5 fill-[#ffe600] text-[#ffe600] group-hover:scale-110 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Principles Section with Supercar Chromatic Accents ──────── */}
      <section id="principles" className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-10 border-b border-border pb-16 md:grid-cols-3">
          <div>
            <Check className="size-5 text-[#49f112]" />
            <h3 className="mt-5 text-xl font-semibold tracking-tight text-white">Quiet by default</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              A considered interface that makes room for the hard parts of the work.
            </p>
          </div>
          <div>
            <Check className="size-5 text-[#00c3ff]" />
            <h3 className="mt-5 text-xl font-semibold tracking-tight text-white">Context, connected</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Your documents, decisions, and discussions stay close without becoming clutter.
            </p>
          </div>
          <div>
            <Check className="size-5 text-[#a855f7]" />
            <h3 className="mt-5 text-xl font-semibold tracking-tight text-white">Built for trust</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Transparent reasoning, clear permissions, and a system your team can understand.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Footer ─────────────────────────────────────────────────── */}
      <footer id="contact" className="mx-auto flex max-w-7xl flex-col gap-8 px-6 pb-10 lg:flex-row lg:items-end lg:justify-between lg:px-10">
        <div>
          <p className="text-3xl font-semibold tracking-[-0.04em] text-white">Build with more clarity.</p>
          <p className="mt-3 text-sm text-muted-foreground">Mayuron is opening a limited number of teams this quarter.</p>
        </div>
        <a
          href="mailto:hello@mayuron.systems"
          className="inline-flex w-fit items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold transition-all hover:bg-secondary hover:border-[#00c3ff]/40 hover:text-[#00c3ff]"
        >
          hello@mayuron.systems <ArrowUpRight className="size-4" />
        </a>
      </footer>
    </main>
  )
}
