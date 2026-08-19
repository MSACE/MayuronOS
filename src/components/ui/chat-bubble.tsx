"use client";

import { Message } from "@/hooks/use-chat-stream";
import { Command, User as UserIcon, Sparkles } from "lucide-react";

interface ChatBubbleProps {
  message: Message;
  isStreaming?: boolean;
}

export function ChatBubble({ message, isStreaming }: ChatBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex w-full gap-3 py-3.5 transition-all ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {/* Assistant Avatar */}
      {!isUser && (
        <div className="grid size-7 shrink-0 place-items-center rounded-lg bg-white text-black shadow-md mt-0.5">
          <Command className="size-3.5 stroke-[2.5]" />
        </div>
      )}

      {/* Bubble Container */}
      <div
        className={`max-w-2xl rounded-2xl px-4.5 py-3 text-sm leading-relaxed ${
          isUser
            ? "bg-white text-black font-medium shadow-md shadow-white/5 rounded-br-sm"
            : "border border-white/[0.08] bg-[#121316]/90 text-[#f4f4f6] shadow-xl rounded-bl-sm"
        }`}
      >
        {/* Assistant Header Tag */}
        {!isUser && (
          <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[#8a8f98] mb-1.5 pb-1 border-b border-white/[0.05]">
            <Sparkles className="size-3 text-cyan-400" />
            <span>Mayuron AI</span>
            {isStreaming && (
              <span className="ml-auto inline-flex items-center gap-1 text-[10px] text-cyan-400 lowercase font-normal">
                <span className="size-1.5 rounded-full bg-cyan-400 animate-pulse" />
                streaming
              </span>
            )}
          </div>
        )}

        {/* Message Body */}
        <div className="whitespace-pre-wrap font-sans text-[13.5px] leading-[1.65]">
          {message.content}
          {isStreaming && !isUser && (
            <span className="inline-block w-1.5 h-3.5 ml-1 bg-cyan-400 animate-pulse translate-y-0.5" />
          )}
        </div>
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="grid size-7 shrink-0 place-items-center rounded-lg bg-zinc-800 text-zinc-300 shadow-md mt-0.5 border border-white/10">
          <UserIcon className="size-3.5" />
        </div>
      )}
    </div>
  );
}
