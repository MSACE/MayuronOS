"use client";

import { Message } from "@/hooks/use-chat-stream";
import { Command, Sparkles } from "lucide-react";
import { GenerativeComponentRegistry } from "@/components/generative/registry";

interface ChatBubbleProps {
  message: Message;
  isStreaming?: boolean;
}

export function ChatBubble({ message, isStreaming }: ChatBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex w-full gap-3.5 py-3 transition-all ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {/* Assistant Avatar */}
      {!isUser && (
        <div className="grid size-7 shrink-0 place-items-center rounded-xl bg-white text-black shadow-md mt-1">
          <Command className="size-3.5 stroke-[2.5]" />
        </div>
      )}

      {/* Message Container */}
      <div
        className={`w-full ${
          isUser
            ? "max-w-xl rounded-[24px] bg-white px-5 py-3.5 text-[15px] font-medium text-black shadow-lg shadow-white/5 rounded-br-xs ml-auto"
            : "max-w-3xl rounded-[28px] bg-white/[0.035] p-6 text-white shadow-[0_10px_40px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.06)] backdrop-blur-xl rounded-bl-xs border border-white/[0.03]"
        }`}
      >
        {/* Assistant Header Tag */}
        {!isUser && (
          <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-white/[0.04]">
            <span className="flex items-center gap-2 font-heading text-[13px] font-semibold text-white">
              <Sparkles className="size-3.5 text-cyan-400" />
              <span>Mayuron Synthesis</span>
            </span>

            <div className="genui-badge text-zinc-300 flex items-center gap-1.5 text-[10px] py-1 px-3">
              <span className={`size-1.5 rounded-full ${isStreaming ? "bg-cyan-400 animate-ping" : "bg-emerald-400 animate-pulse"}`} />
              <span>{isStreaming ? "● SYNTHESIZING" : "● LIVE"}</span>
            </div>
          </div>
        )}

        {/* Message Text Content */}
        {message.content && (
          <div className="whitespace-pre-wrap font-sans text-[15px] font-normal leading-[1.7] text-zinc-200">
            {message.content}
            {isStreaming && !isUser && !message.generativePayload && (
              <span className="inline-block w-1.5 h-4 ml-1 bg-white animate-pulse translate-y-0.5" />
            )}
          </div>
        )}

        {/* Generative UI Component Render */}
        {message.generativePayload && (
          <div className="mt-5 animate-in fade-in duration-300">
            <GenerativeComponentRegistry
              componentType={message.generativePayload.componentType}
              props={message.generativePayload.props}
            />
          </div>
        )}
      </div>
    </div>
  );
}
