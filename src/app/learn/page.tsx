"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useChatStream } from "@/hooks/use-chat-stream";
import { ArrowLeft, ArrowUpRight, History, Plus } from "lucide-react";
import { BrandLogo } from "@/components/ui/brand-logo";
import { ChatBubble } from "@/components/ui/chat-bubble";
import { ChatInput } from "@/components/ui/chat-input";
import { SessionSidebar } from "@/components/ui/session-sidebar";
import { SessionStore, StoredSession } from "@/lib/storage/session-store";
import {
  NeuralPulseIcon,
  MemorySphereIcon,
  QuantumCubeIcon,
  NeuralNetworkIcon,
} from "@/components/ui/genui-icons";

const SUGGESTED_PROMPTS = [
  {
    tag: "Neural Pulse",
    title: "JavaScript Event Loop",
    desc: "Generate an interactive quiz on Microtasks vs Macrotasks execution order.",
    icon: NeuralPulseIcon,
    prompt: "Quiz me on JavaScript Event Loop and Promise execution order.",
  },
  {
    tag: "Memory Sphere",
    title: "React Server Components",
    desc: "Generate a 3D flashcard study deck for Next.js 15 RSC & Database architecture.",
    icon: MemorySphereIcon,
    prompt: "Create flashcards for core React Server Components and Database concepts.",
  },
  {
    tag: "Quantum Cube",
    title: "JavaScript Closures",
    desc: "Generate a live runnable code playground to test lexical scope persistence.",
    icon: QuantumCubeIcon,
    prompt: "Give me an interactive code sandbox to test JavaScript closures.",
  },
  {
    tag: "Neural Network Graph",
    title: "Generative UI Pipeline",
    desc: "Generate a visual multi-step architecture flowchart for the streaming pipeline.",
    icon: NeuralNetworkIcon,
    prompt: "Show me the visual system diagram for the Generative UI streaming pipeline.",
  },
];

export default function LearnPage() {
  const [sessions, setSessions] = useState<StoredSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const {
    messages,
    setMessages,
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
        content: `Welcome to the **Mayuron Studio**.\n\nThis is an intelligent, generative learning environment with **persistent session memory**. Rather than plain text responses, the system generates **live interactive quizzes, flashcards, runnable code sandboxes, and visual flowcharts** directly in your session.\n\nChoose an exploration below or type any question to begin.`,
      },
    ],
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize Session Store on client mount
  useEffect(() => {
    const loadedSessions = SessionStore.getSessions();
    setSessions(loadedSessions);

    const savedActiveId = SessionStore.getActiveSessionId();
    if (savedActiveId) {
      const active = SessionStore.getSession(savedActiveId);
      if (active && active.messages.length > 0) {
        setActiveSessionId(active.id);
        setMessages(active.messages);
      } else {
        const initial = SessionStore.createSession();
        setActiveSessionId(initial.id);
        setSessions(SessionStore.getSessions());
      }
    } else {
      const initial = SessionStore.createSession();
      setActiveSessionId(initial.id);
      setSessions(SessionStore.getSessions());
    }
  }, []);

  // Auto-save session state on new message turn
  useEffect(() => {
    if (activeSessionId && messages.length > 0) {
      SessionStore.saveSessionMessages(activeSessionId, messages);
      setSessions(SessionStore.getSessions());
    }
  }, [messages, activeSessionId]);

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

  const handleSelectSession = (id: string) => {
    const target = SessionStore.getSession(id);
    if (target) {
      setActiveSessionId(target.id);
      SessionStore.setActiveSessionId(target.id);
      setMessages(target.messages);
    }
  };

  const handleNewSession = () => {
    const fresh = SessionStore.createSession();
    setActiveSessionId(fresh.id);
    setSessions(SessionStore.getSessions());
    setMessages(fresh.messages);
  };

  const handleDeleteSession = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = SessionStore.deleteSession(id);
    setSessions(updated);
    if (activeSessionId === id) {
      if (updated.length > 0) {
        handleSelectSession(updated[0].id);
      } else {
        handleNewSession();
      }
    }
  };

  return (
    <div className="flex h-screen w-full flex-col bg-[#000000] text-white selection:bg-white selection:text-black">
      {/* ─── Collapsible Session History Drawer ─────────────────────── */}
      <SessionSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        sessions={sessions}
        activeSessionId={activeSessionId}
        onSelectSession={handleSelectSession}
        onNewSession={handleNewSession}
        onDeleteSession={handleDeleteSession}
      />

      {/* ─── Top Navigation Bar with History Trigger ────────────────── */}
      <header className="mx-auto flex h-18 w-full max-w-7xl shrink-0 items-center justify-between px-6 py-5 lg:px-12 bg-[#000000]/80 backdrop-blur-2xl z-20">
        <div className="flex items-center gap-5">
          <BrandLogo size="md" />

          <span className="text-white/10 hidden sm:inline">•</span>

          {/* Session History Drawer Toggle */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="flex items-center gap-2 rounded-full bg-white/[0.05] px-3.5 py-1.5 font-mono text-[11px] font-medium text-zinc-300 transition-all hover:bg-white/[0.1] hover:text-white border border-white/[0.04]"
            title="Open Session Memory & History"
          >
            <History className="size-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Memory & Sessions</span>
            <span className="rounded-full bg-white/10 px-1.5 py-0.2 text-[9px] text-zinc-400">
              {sessions.length}
            </span>
          </button>
        </div>

        <div className="flex items-center gap-3.5">
          {/* New Session Quick Trigger */}
          <button
            onClick={handleNewSession}
            className="hidden sm:flex items-center gap-1.5 rounded-full bg-white/[0.05] px-3 py-1.5 font-sans text-[11px] font-medium text-zinc-300 hover:bg-white/[0.1] hover:text-white transition-all"
            title="Create New Exploration"
          >
            <Plus className="size-3.5" />
            <span>New</span>
          </button>

          {/* Upgraded 11px Status Badge */}
          <div className="genui-badge text-zinc-200 flex items-center gap-2">
            <span
              className={`size-2 rounded-full ${
                isLoading ? "bg-cyan-400 animate-ping" : "bg-emerald-400 animate-pulse"
              }`}
            />
            <span>{isLoading ? "● SYNTHESIZING" : "● LIVE"}</span>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-zinc-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="size-3.5" />
            <span className="hidden sm:inline">Exit to home</span>
          </Link>
        </div>
      </header>

      {/* ─── Main Viewport with Whitespace ─────────────────────────── */}
      <main
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-16 sm:px-8 max-w-4xl mx-auto w-full space-y-6"
      >
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

        {/* ─── Explore Bento Cards (28px Radius + Soft Glass) ──────── */}
        {messages.length <= 1 && (
          <div className="pt-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between pb-4 mb-6 text-zinc-400">
              <h3 className="font-heading text-[20px] font-semibold text-white tracking-tight">
                Explore
              </h3>
              <span className="font-mono text-[12px] font-medium text-zinc-500">
                Interactive GenUI Units
              </span>
            </div>

            {/* 24px Gap Bento Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {SUGGESTED_PROMPTS.map((item, i) => {
                const IconComponent = item.icon;
                return (
                  <motion.button
                    key={i}
                    onClick={() => handlePromptClick(item.prompt)}
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="group relative rounded-[28px] bg-white/[0.035] p-6 text-left shadow-[0_10px_40px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.06)] backdrop-blur-xl transition-all hover:bg-white/[0.06] active:scale-[0.99] flex flex-col justify-between min-h-[190px] border border-white/[0.03]"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <IconComponent className="size-7" />
                          <span className="font-mono text-[12px] font-medium text-zinc-400">
                            {item.tag}
                          </span>
                        </div>
                        <ArrowUpRight className="size-4 text-zinc-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
                      </div>

                      <h4 className="font-heading text-[20px] font-semibold text-white tracking-tight group-hover:text-zinc-100">
                        {item.title}
                      </h4>
                      <p className="mt-2 text-[15px] font-normal leading-relaxed text-zinc-400">
                        {item.desc}
                      </p>
                    </div>

                    <div className="mt-6 pt-3 flex items-center gap-1.5 font-mono text-[12px] font-medium text-zinc-400 group-hover:text-white transition-colors">
                      <span>Launch Interface</span>
                      <span className="text-zinc-500">→</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* ─── Bottom Command Center ─────────────────────────────────── */}
      <footer className="shrink-0 bg-[#000000]/90 px-4 py-6 sm:px-8 backdrop-blur-2xl">
        <div className="max-w-4xl mx-auto w-full">
          <ChatInput
            input={input}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            stop={stop}
            placeholder="⌘ Ask • Generate • Simulate • Learn • Visualize"
          />
        </div>
      </footer>
    </div>
  );
}
