"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useChatStream } from "@/hooks/use-chat-stream";
import { Command, ArrowLeft, Sparkles, Zap } from "lucide-react";
import { ChatBubble } from "@/components/ui/chat-bubble";
import { ChatInput } from "@/components/ui/chat-input";
import { APP_NAME } from "@/lib/utils/constants";

const SUGGESTED_PROMPTS = [
  {
    title: "JavaScript Closures",
    desc: "Explain with a backpack analogy & memory lifecycle",
    prompt: "Teach me JavaScript closures using a real-world backpack analogy, and show how lexical scope persists in memory.",
  },
  {
    title: "Event Loop & Concurrency",
    desc: "Microtasks vs Macrotasks execution order",
    prompt: "Explain how the JavaScript Event Loop processes microtasks (Promises) versus macrotasks (setTimeout) with a clear execution trace.",
  },
  {
    title: "React Server Components",
    desc: "Streaming & Zero-Bundle size components",
    prompt: "What is the fundamental difference between React Server Components (RSC) and standard Client Components in Next.js 15?",
  },
  {
    title: "Bloom's 2-Sigma Problem",
    desc: "Why 1-on-1 adaptive mastery beats video lectures",
    prompt: "What is Bloom's 2-Sigma problem in educational psychology, and how does 1-on-1 adaptive AI tutoring solve it?",
  },
];

export default function LearnPage() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    append,
  } = useChatStream({
    api: "/api/chat",
    initialMessages: [
      {
        id: "welcome-msg",
        role: "assistant",
        content: `Welcome to the **${APP_NAME} Learning Studio**! 🦚\n\nI am your adaptive AI cognitive mentor. Ask me any concept you want to break down, explore, or master. What are we exploring today?`,
      },
    ],
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom as new tokens arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handlePromptClick = (promptText: string) => {
    append({
      role: "user",
      content: promptText,
    });
  };

  return (
    <div className="flex h-screen w-full flex-col bg-[#090a0c] text-[#f4f4f6] selection:bg-white selection:text-black">
      {/* ─── Top Studio Navbar ──────────────────────────────────────── */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-white/[0.08] bg-[#0d0e12]/90 px-6 backdrop-blur-xl z-10">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-medium text-[#8a8f98] hover:text-white transition-colors"
          >
            <ArrowLeft className="size-3.5" />
            <span>Home</span>
          </Link>

          <span className="text-white/20">|</span>

          <div className="flex items-center gap-2">
            <span className="grid size-5 place-items-center rounded bg-white text-black text-[10px] font-bold">
              <Command className="size-3 stroke-[2.5]" />
            </span>
            <span className="text-xs font-semibold text-white tracking-tight">{APP_NAME}</span>
            <span className="rounded-full bg-white/[0.08] px-2 py-0.5 text-[10px] font-mono text-zinc-300">
              Session 1: Streaming Engine
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-1 rounded-full">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Gemini 2.5 Live Stream</span>
          </div>
        </div>
      </header>

      {/* ─── Main Chat Viewport ─────────────────────────────────────── */}
      <main
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-8 sm:px-8 max-w-4xl mx-auto w-full space-y-2"
      >
        {/* Messages Stream */}
        {messages.map((msg, index) => {
          const isLastMessage = index === messages.length - 1;
          return (
            <ChatBubble
              key={msg.id}
              message={msg}
              isStreaming={isLastMessage && isLoading}
            />
          );
        })}

        {/* Suggested Starter Chips (Show when only welcome message exists) */}
        {messages.length <= 1 && (
          <div className="pt-6 animate-in fade-in duration-500">
            <div className="flex items-center gap-2 mb-3 text-xs font-mono text-[#8a8f98] uppercase tracking-wider">
              <Sparkles className="size-3.5 text-zinc-400" />
              <span>Suggested Explorations</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {SUGGESTED_PROMPTS.map((item, i) => (
                <button
                  key={i}
                  onClick={() => handlePromptClick(item.prompt)}
                  className="p-3.5 text-left rounded-xl border border-white/[0.07] bg-[#121316]/70 hover:bg-[#181a1f] hover:border-white/15 transition-all text-xs group"
                >
                  <div className="font-semibold text-white group-hover:text-cyan-300 transition-colors flex items-center justify-between">
                    <span>{item.title}</span>
                    <Zap className="size-3 text-zinc-500 group-hover:text-cyan-300 transition-colors" />
                  </div>
                  <div className="text-[11.5px] text-[#8a8f98] mt-1 leading-relaxed">
                    {item.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ─── Sticky Bottom Input Bar ───────────────────────────────── */}
      <footer className="shrink-0 border-t border-white/[0.08] bg-[#0d0e12]/90 p-4 sm:px-8">
        <div className="max-w-4xl mx-auto w-full">
          <ChatInput
            input={input}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            stop={stop}
            placeholder="Ask Mayuron anything (e.g. 'Explain async/await with an analogy')..."
          />
          <div className="mt-2 flex items-center justify-between text-[11px] text-[#6b7280] font-mono px-1">
            <span>Press Enter to send, Shift + Enter for new line</span>
            <span className="hidden sm:inline">Server-Sent Events (SSE) • Web Streams</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
