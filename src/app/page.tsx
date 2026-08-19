'use client'

import { useState } from 'react'
import { ArrowUpRight, Check, Command, Layers3, Play, Sparkles } from 'lucide-react'

const modes = [
  {
    label: 'Synthesis',
    title: 'Turn ideas into working systems.',
    body: 'Describe the outcome. Mayuron maps the intent, assembles the right tools, and gives your team a clear place to begin.',
  },
  {
    label: 'Analysis',
    title: 'See the signal, not the noise.',
    body: 'Bring context together across projects, decisions, and data. Every answer stays grounded in the work that produced it.',
  },
  {
    label: 'Archive',
    title: 'Make institutional knowledge useful.',
    body: 'Capture the reasoning behind the work, so the next decision starts with momentum instead of a blank page.',
  },
]

export default function Page() {
  const [activeMode, setActiveMode] = useState(0)

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground selection:bg-white selection:text-black">
      {/* ─── Header ────────────────────────────────────────────── */}
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-12">
        <a
          href="#top"
          className="flex items-center gap-2.5 text-[15px] font-semibold tracking-[-0.02em] text-white transition-opacity hover:opacity-90"
          aria-label="Mayuron home"
        >
          <span className="grid size-6 place-items-center rounded-md bg-white text-black shadow-sm">
            <Command className="size-3.5 stroke-[2.5]" />
          </span>
          mayuron
        </a>

        <nav className="hidden items-center gap-8 text-[13px] font-medium text-[#8a8f98] md:flex">
          <a href="#system" className="transition-colors duration-150 hover:text-white">
            System
          </a>
          <a href="#principles" className="transition-colors duration-150 hover:text-white">
            Principles
          </a>
          <a href="#contact" className="transition-colors duration-150 hover:text-white">
            Contact
          </a>
        </nav>

        <a
          href="#contact"
          className="flex items-center gap-1.5 text-[13px] font-medium text-white transition-opacity hover:opacity-80"
        >
          <span>Request access</span>
          <ArrowUpRight className="size-3.5 stroke-[2]" />
        </a>
      </header>

      {/* ─── Hero Section ──────────────────────────────────────── */}
      <section
        id="top"
        className="mx-auto grid max-w-7xl gap-16 px-6 pb-24 pt-16 lg:grid-cols-[0.88fr_1.12fr] lg:items-end lg:px-12 lg:pb-32 lg:pt-24"
      >
        <div className="max-w-xl">
          <p className="mb-8 flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90">
            <span className="size-1.5 rounded-full bg-white" /> A new operating layer
          </p>

          <h1 className="text-balance text-5xl font-semibold tracking-[-0.045em] text-white sm:text-6xl lg:text-[76px] leading-[1.03]">
            Make space for better thinking.
          </h1>

          <p className="mt-8 max-w-md text-pretty text-[15px] sm:text-base leading-[1.7] text-[#8a8f98]">
            Mayuron is a calm, intelligent workspace for teams doing consequential work. Less interface. More signal.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#system"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-[13px] font-semibold text-black transition-all hover:bg-zinc-200 hover:-translate-y-0.5 active:scale-95 shadow-md shadow-white/5"
            >
              <span>Explore Mayuron</span>
              <ArrowUpRight className="size-4 stroke-[2.5]" />
            </a>
            <span className="text-[12px] text-[#6b7280] font-normal">
              Built for teams of 5–500
            </span>
          </div>
        </div>

        {/* Hero Glass Panel */}
        <div className="glass-panel relative min-h-[440px] overflow-hidden rounded-2xl p-6 sm:min-h-[500px] lg:min-h-[540px]">
          <div className="flex items-center justify-between border-b border-white/[0.07] pb-4 text-[10px] font-mono uppercase tracking-[0.18em] text-[#6b7280]">
            <span>Mayuron / workspace</span>
            <span>Live environment</span>
          </div>

          <div className="absolute inset-x-8 bottom-8 top-20 rounded-xl border border-white/[0.08] bg-[#131519] shadow-2xl p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-white/[0.07] pb-4">
              <span className="text-[14px] font-medium text-white">Q3 product direction</span>
              <span className="rounded-full bg-white/[0.08] px-3 py-1 text-[10px] font-medium text-zinc-300">
                In synthesis
              </span>
            </div>

            <div className="grid gap-6 pt-5 sm:grid-cols-[1fr_0.85fr]">
              <div className="space-y-3">
                <div className="h-1.5 w-2/3 rounded-full bg-white/10" />
                <div className="h-1.5 w-full rounded-full bg-white/10" />
                <div className="h-1.5 w-5/6 rounded-full bg-white/10" />
                <div className="mt-8 rounded-lg border border-white/[0.08] bg-white/[0.02] p-4">
                  <div className="mb-2.5 flex items-center gap-2 text-[12px] font-medium text-zinc-200">
                    <Sparkles className="size-3.5 text-zinc-300" /> Working thesis
                  </div>
                  <p className="text-[13px] leading-[1.6] text-[#8a8f98]">
                    The strongest opportunity is not another feature. It is a clearer decision surface.
                  </p>
                </div>
              </div>

              <div className="rounded-lg bg-[#0e1013] border border-white/[0.04] p-4 flex flex-col justify-between">
                <div className="mb-4 flex items-center justify-between text-[11px] text-[#8a8f98] font-medium">
                  <span>Signal map</span>
                  <Layers3 className="size-4 text-zinc-400" />
                </div>
                <div className="flex h-32 items-center justify-center my-2">
                  <div className="relative size-28 rounded-full border border-white/20 flex items-center justify-center">
                    <div className="size-14 rounded-full bg-white/[0.06]" />
                    <span className="absolute -right-3 top-2 text-[9px] font-mono text-[#6b7280]">context</span>
                    <span className="absolute -left-3 bottom-2 text-[9px] font-mono text-[#6b7280]">intent</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── System Modes Section ──────────────────────────────── */}
      <section id="system" className="border-y border-white/[0.07] bg-[#111215]/80">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 py-24 lg:grid-cols-[0.42fr_1fr] lg:px-12 lg:py-32">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8a8f98] mb-4 block">
              One system, many ways in
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-semibold tracking-[-0.035em] text-white leading-[1.15]">
              The work stays human. <br />
              The surface gets smarter.
            </h2>
          </div>

          <div>
            <div className="flex flex-wrap gap-2 border-b border-white/[0.07] pb-5">
              {modes.map((mode, index) => (
                <button
                  key={mode.label}
                  onClick={() => setActiveMode(index)}
                  className={`rounded-full px-4.5 py-2 text-[13px] font-medium transition-all ${
                    activeMode === index
                      ? 'bg-white text-black font-semibold shadow-sm'
                      : 'text-[#8a8f98] hover:bg-white/[0.04] hover:text-white'
                  }`}
                >
                  {mode.label}
                </button>
              ))}
            </div>

            <div className="grid gap-8 pt-8 sm:grid-cols-[1fr_auto] sm:items-end">
              <div>
                <h3 className="max-w-lg text-2xl sm:text-3xl font-semibold tracking-[-0.03em] text-white leading-tight">
                  {modes[activeMode].title}
                </h3>
                <p className="mt-4 max-w-lg text-[14px] leading-[1.7] text-[#8a8f98]">
                  {modes[activeMode].body}
                </p>
              </div>

              <button
                type="button"
                aria-label="Play presentation"
                className="flex size-16 sm:size-20 items-center justify-center rounded-full border border-white/[0.12] bg-[#16181d] hover:bg-[#1c1e24] hover:border-white/20 transition-all hover:scale-105 active:scale-95 shadow-xl"
              >
                <Play className="ml-1 size-5 fill-white text-white" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Principles Section ────────────────────────────────── */}
      <section id="principles" className="mx-auto max-w-7xl px-6 py-24 lg:px-12 lg:py-32">
        <div className="grid gap-12 border-b border-white/[0.07] pb-20 md:grid-cols-3">
          <div>
            <Check className="size-4.5 text-white stroke-[2.5]" />
            <h3 className="mt-5 text-[18px] font-semibold tracking-tight text-white">Quiet by default</h3>
            <p className="mt-3 text-[13px] leading-[1.65] text-[#8a8f98]">
              A considered interface that makes room for the hard parts of the work.
            </p>
          </div>

          <div>
            <Check className="size-4.5 text-white stroke-[2.5]" />
            <h3 className="mt-5 text-[18px] font-semibold tracking-tight text-white">Context, connected</h3>
            <p className="mt-3 text-[13px] leading-[1.65] text-[#8a8f98]">
              Your documents, decisions, and discussions stay close without becoming clutter.
            </p>
          </div>

          <div>
            <Check className="size-4.5 text-white stroke-[2.5]" />
            <h3 className="mt-5 text-[18px] font-semibold tracking-tight text-white">Built for trust</h3>
            <p className="mt-3 text-[13px] leading-[1.65] text-[#8a8f98]">
              Transparent reasoning, clear permissions, and a system your team can understand.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Footer ────────────────────────────────────────────── */}
      <footer
        id="contact"
        className="mx-auto flex max-w-7xl flex-col gap-10 px-6 pb-16 pt-4 lg:flex-row lg:items-end lg:justify-between lg:px-12"
      >
        <div>
          <p className="text-3xl sm:text-4xl font-semibold tracking-[-0.035em] text-white leading-tight">
            Build with more clarity.
          </p>
          <p className="mt-3 text-[13px] text-[#8a8f98]">
            Mayuron is opening a limited number of teams this quarter.
          </p>
        </div>

        <a
          href="mailto:hello@mayuron.systems"
          className="inline-flex h-12 items-center gap-2 rounded-full border border-white/[0.14] bg-transparent px-6 text-[13px] font-medium text-white transition-all hover:bg-white/[0.06] hover:border-white/25 active:scale-95"
        >
          <span>hello@mayuron.systems</span>
          <ArrowUpRight className="size-3.5 stroke-[2]" />
        </a>
      </footer>
    </main>
  )
}
