"use client";

import { useState, useRef, useCallback } from "react";
import { GenerativePayload } from "@/components/generative/registry";

export interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  generativePayload?: GenerativePayload | null;
  createdAt?: Date;
}

interface UseChatStreamOptions {
  api?: string;
  initialMessages?: Message[];
}

export function useChatStream({
  api = "/api/chat",
  initialMessages = [],
}: UseChatStreamOptions = {}) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setInput(e.target.value);
    },
    []
  );

  const stop = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsLoading(false);
    }
  }, []);

  const append = useCallback(
    async (userMessage: { role: "user" | "assistant"; content: string }) => {
      const userMsg: Message = {
        id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        role: userMessage.role,
        content: userMessage.content,
        createdAt: new Date(),
      };

      const updatedMessages = [...messages, userMsg];
      setMessages(updatedMessages);
      setIsLoading(true);

      const assistantMsgId = `asst-${Date.now()}`;
      // Add empty assistant message placeholder
      setMessages((prev) => [
        ...prev,
        {
          id: assistantMsgId,
          role: "assistant",
          content: "",
          generativePayload: null,
          createdAt: new Date(),
        },
      ]);

      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      try {
        const response = await fetch(api, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: updatedMessages.map(({ role, content }) => ({
              role,
              content,
            })),
          }),
          signal: abortController.signal,
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.error || `HTTP error! Status: ${response.status}`
          );
        }

        if (!response.body) {
          throw new Error("No response body received from stream.");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let rawAccumulatedText = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          rawAccumulatedText += chunk;

          // Check if Generative UI payload marker exists
          let displayContent = rawAccumulatedText;
          let parsedPayload: GenerativePayload | null = null;

          const payloadStart = rawAccumulatedText.indexOf("__GEN_UI_PAYLOAD__");
          const payloadEnd = rawAccumulatedText.indexOf("__END_PAYLOAD__");

          if (payloadStart !== -1 && payloadEnd !== -1) {
            displayContent = rawAccumulatedText.substring(0, payloadStart).trim();
            const jsonString = rawAccumulatedText.substring(
              payloadStart + 18,
              payloadEnd
            );
            try {
              parsedPayload = JSON.parse(jsonString);
            } catch (err) {
              console.error("[Payload Parse Error]:", err);
            }
          }

          // Update assistant message with current text & generative component
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMsgId
                ? {
                    ...msg,
                    content: displayContent,
                    generativePayload: parsedPayload,
                  }
                : msg
            )
          );
        }
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error("[useChatStream Error]:", err);
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMsgId
                ? {
                    ...msg,
                    content: `⚠️ Error: ${err.message || "Failed to stream response from AI."}`,
                  }
                : msg
            )
          );
        }
      } finally {
        setIsLoading(false);
        abortControllerRef.current = null;
      }
    },
    [api, messages]
  );

  const handleSubmit = useCallback(
    (e?: React.FormEvent<HTMLFormElement>) => {
      if (e) e.preventDefault();
      if (!input.trim() || isLoading) return;

      const userText = input.trim();
      setInput("");
      append({ role: "user", content: userText });
    },
    [input, isLoading, append]
  );

  return {
    messages,
    setMessages,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    append,
  };
}
