"use client";

import React from "react";
import { Plus, MessageSquare, Trash2, X, Sparkles, Clock, Layers } from "lucide-react";
import { StoredSession } from "@/lib/storage/session-store";
import { BrandLogo } from "./brand-logo";

interface SessionSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  sessions: StoredSession[];
  activeSessionId: string | null;
  onSelectSession: (id: string) => void;
  onNewSession: () => void;
  onDeleteSession: (id: string, e: React.MouseEvent) => void;
}

export function SessionSidebar({
  isOpen,
  onClose,
  sessions,
  activeSessionId,
  onSelectSession,
  onNewSession,
  onDeleteSession,
}: SessionSidebarProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* ─── Backdrop Blur Overlay ─────────────────────────────────── */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* ─── Sliding Glassmorphism Drawer ─────────────────────────── */}
      <aside className="fixed inset-y-0 left-0 z-50 flex w-80 max-w-[85vw] flex-col bg-[#070709]/95 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl border-r border-white/[0.06] animate-in slide-in-from-left duration-300">
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.06]">
          <BrandLogo size="sm" showSubtitle={false} />
          <button
            onClick={onClose}
            className="grid size-8 place-items-center rounded-full text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-all"
            aria-label="Close sidebar"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* New Session Trigger Button */}
        <button
          onClick={() => {
            onNewSession();
            onClose();
          }}
          className="mb-5 flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 font-sans text-[13px] font-semibold text-black shadow-lg shadow-white/5 transition-all hover:bg-zinc-200 active:scale-95"
        >
          <Plus className="size-4 stroke-[2.5]" />
          <span>New Exploration</span>
        </button>

        {/* Sessions List Header */}
        <div className="flex items-center justify-between px-2 pb-2 text-zinc-400">
          <span className="font-mono text-[11px] uppercase tracking-wider font-semibold">
            History & Memory
          </span>
          <span className="font-mono text-[10px] text-zinc-500">
            {sessions.length} Saved
          </span>
        </div>

        {/* Scrollable Sessions List */}
        <div className="flex-1 space-y-1.5 overflow-y-auto pr-1">
          {sessions.length === 0 ? (
            <div className="py-12 text-center text-zinc-500 font-sans text-xs">
              <MessageSquare className="size-6 mx-auto mb-2 opacity-40" />
              <p>No saved sessions yet.</p>
              <p className="text-[11px] mt-1 text-zinc-600">Start an exploration to record history.</p>
            </div>
          ) : (
            sessions.map((session) => {
              const isActive = session.id === activeSessionId;
              const messageCount = session.messages.filter((m) => m.role === "user").length;

              return (
                <div
                  key={session.id}
                  onClick={() => {
                    onSelectSession(session.id);
                    onClose();
                  }}
                  className={`group relative flex cursor-pointer items-center justify-between rounded-[20px] p-3.5 transition-all ${
                    isActive
                      ? "bg-white text-black shadow-md font-medium"
                      : "bg-white/[0.03] text-zinc-300 hover:bg-white/[0.07] hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3 overflow-hidden pr-2">
                    <MessageSquare
                      className={`size-4 shrink-0 ${
                        isActive ? "text-black" : "text-zinc-500 group-hover:text-zinc-300"
                      }`}
                    />
                    <div className="overflow-hidden">
                      <p className="truncate font-sans text-[13px] font-medium leading-snug">
                        {session.title || "Untitled Session"}
                      </p>
                      <div
                        className={`flex items-center gap-2 font-mono text-[10px] mt-0.5 ${
                          isActive ? "text-zinc-600" : "text-zinc-500"
                        }`}
                      >
                        <span>{messageCount} turn{messageCount !== 1 ? "s" : ""}</span>
                        <span>•</span>
                        <span>{new Date(session.updatedAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })}</span>
                      </div>
                    </div>
                  </div>

                  {/* Delete Trigger */}
                  <button
                    onClick={(e) => onDeleteSession(session.id, e)}
                    className={`grid size-7 shrink-0 place-items-center rounded-full opacity-0 transition-all group-hover:opacity-100 ${
                      isActive
                        ? "text-zinc-600 hover:text-red-600 hover:bg-black/5"
                        : "text-zinc-500 hover:text-red-400 hover:bg-white/[0.1]"
                    }`}
                    title="Delete session"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Sidebar Footer (Learner Profile & Memory Status) */}
        <div className="mt-4 pt-4 border-t border-white/[0.06]">
          <div className="flex items-center justify-between rounded-[18px] bg-white/[0.03] p-3 border border-white/[0.03]">
            <div className="flex items-center gap-2.5">
              <div className="grid size-7 place-items-center rounded-full bg-gradient-to-tr from-[#49F112] to-[#00C3FF] text-black font-bold text-[10px]">
                MS
              </div>
              <div>
                <p className="font-sans text-[12px] font-semibold text-white leading-tight">
                  Mayur Saini
                </p>
                <p className="font-mono text-[10px] text-[#49F112] flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-[#49F112] animate-pulse" />
                  <span>Verde Mantis</span>
                </p>
              </div>
            </div>

            <div className="genui-badge py-1 px-2.5 text-[9.5px] font-mono text-zinc-400">
              pgvector
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
