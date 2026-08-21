'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Check, Layers3, Play, Sparkles } from 'lucide-react'
import { BrandLogo } from '@/components/ui/brand-logo'

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
    <main className="min-h-screen overflow-hidden bg-[#000000] text-white selection:bg-white selection:text-black">
      {/* ─── Header ────────────────────────────────────────────── */}
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-12 bg-[#000000]/80 backdrop-blur-2xl">
        <BrandLogo size="md" />

        <nav className="hidden items-center gap-8 font-sans text-[13px] font-medium text-zinc-400 md:flex">
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

        <Link
          href="/learn"
          className="flex items-center gap-1.5 font-sans text-[13px] font-semibold text-white transition-opacity hover:opacity-80"
        >
          <span>Open Studio</span>
          <ArrowUpRight className="size-3.5 stroke-[2]" />
        </Link>
      </header>

      {/* ─── Hero Section (32px Radius Glass Hero Panel) ────────── */}
      <section
        id="top"
        className="mx-auto grid max-w-7xl gap-16 px-6 pb-24 pt-16 lg:grid-cols-[0.88fr_1.12fr] lg:items-end lg:px-12 lg:pb-32 lg:pt-24"
      >
        <div className="max-w-xl">
          <h1 className="font-heading text-balance text-5xl sm:text-6xl lg:text-[72px] font-bold leading-[1.04] text-white tracking-tight">
            Make space for better thinking.
          </h1>

          <p className="mt-8 max-w-md text-pretty font-sans text-[15px] font-normal leading-[1.7] text-zinc-400">
            Mayuron is a calm, intelligent workspace for teams doing consequential work. Less interface. More signal.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/learn"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-7 font-sans text-[14px] font-semibold text-black transition-all hover:bg-zinc-200 hover:-translate-y-0.5 active:scale-95 shadow-xl shadow-white/10"
            >
              <span>Explore Mayuron</span>
              <ArrowUpRight className="size-4 stroke-[2.5]" />
            </Link>
            <span className="font-mono text-[12px] font-medium text-zinc-500">
              Built for teams of 5–500
            </span>
          </div>
        </div>

        {/* Hero Card with 32px Radius & Soft Glassmorphism */}
        <div className="genui-panel relative min-h-[440px] overflow-hidden rounded-[32px] p-7 sm:min-h-[500px] lg:min-h-[540px]">
          <div className="flex items-center justify-between pb-4 font-mono text-[11px] uppercase tracking-wider text-zinc-500 border-b border-white/[0.04]">
            <span>Mayuron / workspace</span>
            <span className="flex items-center gap-1.5 text-zinc-300">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live environment</span>
            </span>
          </div>

          <div className="absolute inset-x-8 bottom-8 top-20 rounded-[28px] bg-white/[0.03] p-7 shadow-2xl flex flex-col justify-between border border-white/[0.02]">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.04]">
              <span className="font-heading text-[15px] font-semibold text-white">Q3 product direction</span>
              <div className="genui-badge text-zinc-300 text-[10px] py-1 px-3">
                ● SYNTHESIZING
              </div>
            </div>

            <div className="grid gap-6 pt-5 sm:grid-cols-[1fr_0.85fr]">
              <div className="space-y-3">
                <div className="h-1.5 w-2/3 rounded-full bg-white/20" />
                <div className="h-1.5 w-full rounded-full bg-white/20" />
                <div className="h-1.5 w-5/6 rounded-full bg-white/20" />
                <div className="mt-8 rounded-[20px] bg-white/[0.03] p-5 border border-white/[0.02]">
                  <div className="mb-2.5 flex items-center gap-2 font-heading text-[13px] font-semibold text-white">
                    <Sparkles className="size-3.5 text-cyan-400" /> Working thesis
                  </div>
                  <p className="font-sans text-[14px] leading-relaxed text-zinc-400">
                    The strongest opportunity is not another feature. It is a clearer decision surface.
                  </p>
                </div>
              </div>

              <div className="rounded-[22px] bg-[#000000]/70 p-5 flex flex-col justify-between border border-white/[0.02]">
                <div className="mb-4 flex items-center justify-between font-mono text-[11px] font-medium text-zinc-400">
                  <span>Signal map</span>
                  <Layers3 className="size-4 text-zinc-400" />
                </div>
                <div className="flex h-32 items-center justify-center my-2">
                  <div className="relative size-28 rounded-full border border-white/20 flex items-center justify-center">
                    <div className="size-14 rounded-full bg-cyan-400/10 blur-xs" />
                    <div className="absolute size-10 rounded-full bg-gradient-to-tr from-cyan-400/40 to-blue-500/40" />
                    <span className="absolute -right-4 top-2 font-mono text-[9px] text-zinc-500">context</span>
                    <span className="absolute -left-4 bottom-2 font-mono text-[9px] text-zinc-500">intent</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── System Modes Section ──────────────────────────────── */}
      <section id="system" className="py-20 bg-white/[0.015] border-y border-white/[0.03]">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[0.42fr_1fr] lg:px-12">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-zinc-500 mb-4 block">
              One system, many ways in
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[40px] font-bold tracking-tight text-white leading-tight">
              The work stays human. <br />
              The surface gets smarter.
            </h2>
          </div>

          <div>
            <div className="flex flex-wrap gap-2.5 pb-6 border-b border-white/[0.04]">
              {modes.map((mode, index) => (
                <button
                  key={mode.label}
                  onClick={() => setActiveMode(index)}
                  className={`rounded-full px-5 py-2.5 font-sans text-[13px] font-medium transition-all ${
                    activeMode === index
                      ? 'bg-white text-black font-semibold shadow-lg'
                      : 'bg-white/[0.04] text-zinc-400 hover:bg-white/[0.08] hover:text-white'
                  }`}
                >
                  {mode.label}
                </button>
              ))}
            </div>

            <div className="grid gap-8 pt-8 sm:grid-cols-[1fr_auto] sm:items-end">
              <div>
                <h3 className="font-heading max-w-lg text-2xl sm:text-3xl font-semibold tracking-tight text-white leading-tight">
                  {modes[activeMode].title}
                </h3>
                <p className="mt-4 max-w-lg font-sans text-[15px] font-normal leading-relaxed text-zinc-400">
                  {modes[activeMode].body}
                </p>
              </div>

              <button
                type="button"
                aria-label="Play presentation"
                className="flex size-18 sm:size-20 items-center justify-center rounded-full bg-white text-black hover:scale-105 active:scale-95 transition-all shadow-xl group"
              >
                <Play className="ml-1 size-5 fill-current" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Principles Section ────────────────────────────────── */}
      <section id="principles" className="mx-auto max-w-7xl px-6 py-24 lg:px-12 lg:py-32">
        <div className="grid gap-12 border-b border-white/[0.04] pb-20 md:grid-cols-3">
          <div>
            <div className="grid size-10 place-items-center rounded-2xl bg-white/[0.06] text-white mb-6">
              <Check className="size-5 stroke-[2.5]" />
            </div>
            <h3 className="font-heading text-[20px] font-semibold tracking-tight text-white">Quiet by default</h3>
            <p className="mt-3 font-sans text-[15px] leading-relaxed text-zinc-400">
              A considered interface that makes room for the hard parts of the work.
            </p>
          </div>

          <div>
            <div className="grid size-10 place-items-center rounded-2xl bg-white/[0.06] text-white mb-6">
              <Check className="size-5 stroke-[2.5]" />
            </div>
            <h3 className="font-heading text-[20px] font-semibold tracking-tight text-white">Context, connected</h3>
            <p className="mt-3 font-sans text-[15px] leading-relaxed text-zinc-400">
              Your documents, decisions, and discussions stay close without becoming clutter.
            </p>
          </div>

          <div>
            <div className="grid size-10 place-items-center rounded-2xl bg-white/[0.06] text-white mb-6">
              <Check className="size-5 stroke-[2.5]" />
            </div>
            <h3 className="font-heading text-[20px] font-semibold tracking-tight text-white">Built for trust</h3>
            <p className="mt-3 font-sans text-[15px] leading-relaxed text-zinc-400">
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
          <p className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
            Build with more clarity.
          </p>
          <p className="mt-3 font-sans text-[15px] text-zinc-400">
            Mayuron is opening a limited number of teams this quarter.
          </p>
        </div>

        <a
          href="mailto:hello@mayuron.systems"
          className="inline-flex h-12 items-center gap-2 rounded-full bg-white/[0.08] px-7 font-sans text-[14px] font-medium text-white transition-all hover:bg-white/[0.14] active:scale-95 shadow-md"
        >
          <span>hello@mayuron.systems</span>
          <ArrowUpRight className="size-4 stroke-[2]" />
        </a>
      </footer>
    </main>
  )
}
