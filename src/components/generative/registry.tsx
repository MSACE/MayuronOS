"use client";

import React from "react";
import { GenerativeComponentType } from "@/types";
import { QuizWidget, QuizWidgetProps } from "./quiz-widget";
import { FlashcardWidget, FlashcardWidgetProps } from "./flashcard-widget";
import { CodeSandboxWidget, CodeSandboxProps } from "./code-sandbox-widget";
import { ConceptDiagramWidget, ConceptDiagramProps } from "./concept-diagram-widget";
import { ChallengeWidget, ChallengeWidgetProps } from "./challenge-widget";
import { AlertTriangle } from "lucide-react";

export interface GenerativePayload {
  componentType: GenerativeComponentType | string;
  props: Record<string, any>;
}

export function GenerativeComponentRegistry({
  componentType,
  props,
}: GenerativePayload) {
  try {
    switch (componentType) {
      case "quiz":
        return <QuizWidget {...(props as QuizWidgetProps)} />;

      case "flashcard":
        return <FlashcardWidget {...(props as FlashcardWidgetProps)} />;

      case "code-editor":
      case "code-sandbox":
        return <CodeSandboxWidget {...(props as CodeSandboxProps)} />;

      case "diagram":
      case "concept-diagram":
        return <ConceptDiagramWidget {...(props as ConceptDiagramProps)} />;

      case "challenge":
        return <ChallengeWidget {...(props as ChallengeWidgetProps)} />;

      default:
        return (
          <div className="my-2 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-xs text-zinc-400">
            <span className="font-mono text-cyan-400">[{componentType}]</span> Component rendered with raw data.
          </div>
        );
    }
  } catch (err: any) {
    // 🛡️ Self-Healing UI Guardrail: Catch render error and show graceful fallback
    console.error("[Generative Registry Error]:", err);
    return (
      <div className="my-2 flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-950/20 p-3.5 text-xs text-amber-200">
        <AlertTriangle className="size-4 shrink-0 text-amber-400" />
        <span>Component auto-repaired into fallback view.</span>
      </div>
    );
  }
}
