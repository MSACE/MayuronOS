"use client";

import { useRef, useEffect } from "react";
import { ArrowUp, Square } from "lucide-react";

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
  placeholder = "Ask Mayuron anything (e.g. 'Explain async/await with an analogy')...",
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        200
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
      className="relative flex w-full items-end rounded-2xl border border-white/[0.08] bg-[#121316]/95 p-2 shadow-2xl backdrop-blur-xl transition-all focus-within:border-white/20 focus-within:shadow-[0_0_30px_rgba(255,255,255,0.04)]"
    >
      <textarea
        ref={textareaRef}
        rows={1}
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={isLoading}
        className="flex-1 resize-none bg-transparent px-3 py-2 text-[13.5px] leading-relaxed text-white placeholder:text-[#6b7280] focus:outline-none disabled:opacity-50 max-h-48"
      />

      <div className="flex items-center gap-1.5 pb-0.5 pr-0.5">
        {isLoading ? (
          <button
            type="button"
            onClick={stop}
            aria-label="Stop generation"
            className="grid size-8 place-items-center rounded-xl bg-red-950/80 border border-red-800/60 text-red-300 hover:bg-red-900 transition-all active:scale-95"
          >
            <Square className="size-3.5 fill-current" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={!input.trim()}
            aria-label="Send message"
            className="grid size-8 place-items-center rounded-xl bg-white text-black transition-all hover:bg-zinc-200 disabled:opacity-30 disabled:hover:bg-white active:scale-95 shadow-sm"
          >
            <ArrowUp className="size-4 stroke-[2.5]" />
          </button>
        )}
      </div>
    </form>
  );
}
