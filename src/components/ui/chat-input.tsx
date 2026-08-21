"use client";

import { useRef, useEffect, useState } from "react";
import { ArrowUp, Square, Mic, Paperclip, Sparkles, Cpu } from "lucide-react";

interface ChatInputProps {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  stop?: () => void;
  placeholder?: string;
}

export function ChatInput({
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
  stop,
  placeholder = "⌘ Ask • Generate • Simulate • Learn • Visualize",
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [activeModel, setActiveModel] = useState<"gemini" | "groq">("gemini");
  const [activeAgent, setActiveAgent] = useState<"tutor" | "architect">("tutor");

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        180
      )}px`;
    }
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !isLoading) {
        const form = e.currentTarget.form;
        if (form) form.requestSubmit();
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex w-full flex-col rounded-[28px] sm:rounded-full bg-white/[0.04] p-2 sm:p-2.5 shadow-[0_10px_40px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.06)] backdrop-blur-2xl transition-all focus-within:bg-white/[0.06] focus-within:shadow-[0_15px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] border border-white/[0.04]"
    >
      <div className="flex w-full items-center gap-2 px-2">
        {/* Left Attachment Button */}
        <button
          type="button"
          className="grid size-9 shrink-0 place-items-center rounded-full text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-all active:scale-95"
          title="Attach context or code"
        >
          <Paperclip className="size-4" />
        </button>

        {/* Center Input Textarea */}
        <textarea
          ref={textareaRef}
          rows={1}
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={isLoading}
          className="flex-1 resize-none bg-transparent py-2.5 px-2 text-[16px] font-medium leading-normal text-white placeholder:text-zinc-500 placeholder:font-normal focus:outline-none disabled:opacity-50 max-h-40"
        />

        {/* Right Tools (Agent / Model Selector & Voice & Send) */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Quick Model Selector Pill */}
          <button
            type="button"
            onClick={() => setActiveModel(activeModel === "gemini" ? "groq" : "gemini")}
            className="hidden sm:inline-flex items-center gap-1 rounded-full bg-white/[0.06] px-3 py-1.5 text-[11px] font-mono text-zinc-300 hover:bg-white/[0.1] hover:text-white transition-all"
            title="Toggle Model Route"
          >
            <Cpu className="size-3 text-cyan-400" />
            <span>{activeModel === "gemini" ? "Gemini 2.5" : "Groq LPU"}</span>
          </button>

          {/* Voice Input Button */}
          <button
            type="button"
            className="grid size-9 place-items-center rounded-full text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-all active:scale-95"
            title="Voice Stream"
          >
            <Mic className="size-4" />
          </button>

          {/* Floating Action Send Button */}
          {isLoading ? (
            <button
              type="button"
              onClick={stop}
              aria-label="Stop generation"
              className="grid size-9 place-items-center rounded-full bg-red-950/80 border border-red-800/60 text-red-200 hover:bg-red-900 transition-all active:scale-95 shadow-md"
            >
              <Square className="size-3.5 fill-current" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!input.trim()}
              aria-label="Send command"
              className="grid size-9 place-items-center rounded-full bg-white text-black transition-all hover:bg-zinc-200 disabled:opacity-30 disabled:hover:bg-white active:scale-95 shadow-lg shadow-white/10"
            >
              <ArrowUp className="size-4 stroke-[2.5]" />
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
