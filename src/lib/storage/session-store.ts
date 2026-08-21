"use client";

import { Message } from "@/hooks/use-chat-stream";

export interface StoredSession {
  id: string;
  title: string;
  topic: string;
  messages: Message[];
  updatedAt: string;
  createdAt: string;
}

const STORAGE_KEY = "mayuron_learning_sessions_v1";
const ACTIVE_SESSION_KEY = "mayuron_active_session_id";

export const SessionStore = {
  getSessions(): StoredSession[] {
    if (typeof window === "undefined") return [];
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  getSession(id: string): StoredSession | null {
    const sessions = this.getSessions();
    return sessions.find((s) => s.id === id) || null;
  },

  getActiveSessionId(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(ACTIVE_SESSION_KEY);
  },

  setActiveSessionId(id: string | null) {
    if (typeof window === "undefined") return;
    if (id) {
      localStorage.setItem(ACTIVE_SESSION_KEY, id);
    } else {
      localStorage.removeItem(ACTIVE_SESSION_KEY);
    }
  },

  createSession(title: string = "New Synthesis Session", topic: string = "General Exploration"): StoredSession {
    const newSession: StoredSession = {
      id: `ses-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      title,
      topic,
      messages: [
        {
          id: "welcome-msg",
          role: "assistant",
          content: `Welcome to the **Mayuron Studio**.\n\nThis is an intelligent, generative learning environment. Rather than plain text responses, the system generates **live interactive quizzes, flashcards, runnable code sandboxes, and visual flowcharts** directly in your session.\n\nChoose an exploration below or type any question to begin.`,
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const sessions = this.getSessions();
    const updated = [newSession, ...sessions];
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      this.setActiveSessionId(newSession.id);
    }

    return newSession;
  },

  saveSessionMessages(sessionId: string, messages: Message[], titleUpdate?: string): StoredSession | null {
    const sessions = this.getSessions();
    const index = sessions.findIndex((s) => s.id === sessionId);

    // Auto-generate title from first user message if title is generic
    let title = titleUpdate;
    if (!title && messages.length > 1) {
      const firstUserMsg = messages.find((m) => m.role === "user");
      if (firstUserMsg && (index === -1 || sessions[index].title.startsWith("New Synthesis"))) {
        title = firstUserMsg.content.slice(0, 36) + (firstUserMsg.content.length > 36 ? "..." : "");
      }
    }

    if (index !== -1) {
      const updatedSession: StoredSession = {
        ...sessions[index],
        title: title || sessions[index].title,
        messages,
        updatedAt: new Date().toISOString(),
      };
      sessions[index] = updatedSession;
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
      }
      return updatedSession;
    } else {
      const newSession: StoredSession = {
        id: sessionId,
        title: title || "Learning Session",
        topic: "Cognitive Synthesis",
        messages,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      sessions.unshift(newSession);
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
        this.setActiveSessionId(newSession.id);
      }
      return newSession;
    }
  },

  deleteSession(id: string): StoredSession[] {
    const sessions = this.getSessions().filter((s) => s.id !== id);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
      if (this.getActiveSessionId() === id) {
        this.setActiveSessionId(sessions[0]?.id || null);
      }
    }
    return sessions;
  },
};
