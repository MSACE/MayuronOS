"use client";

import { useState } from "react";
import { RotateCw, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { MemorySphereIcon } from "@/components/ui/genui-icons";

export interface FlashcardItem {
  front: string;
  back: string;
  hint?: string;
  tag?: string;
}

export interface FlashcardWidgetProps {
  deckTitle?: string;
  cards: FlashcardItem[];
}

export function FlashcardWidget({
  deckTitle = "Active Recall Deck",
  cards = [],
}: FlashcardWidgetProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showHint, setShowHint] = useState(false);

  if (!cards || cards.length === 0) {
    return null;
  }

  const currentCard = cards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setShowHint(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setShowHint(false);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  return (
    <div className="w-full rounded-[28px] bg-white/[0.035] p-7 shadow-[0_10px_40px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.06)] backdrop-blur-xl border border-white/[0.03]">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/[0.04]">
        <div className="flex items-center gap-3">
          <MemorySphereIcon className="size-6" />
          <span className="font-heading text-[14px] font-semibold text-white">{deckTitle}</span>
        </div>

        <div className="genui-badge text-zinc-300">
          Card {currentIndex + 1} of {cards.length}
        </div>
      </div>

      {/* 3D Flip Card Container */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="group relative h-52 w-full cursor-pointer rounded-[24px] bg-white/[0.03] p-7 text-center flex flex-col items-center justify-center transition-all hover:bg-white/[0.05] shadow-lg active:scale-[0.99] border border-white/[0.02]"
      >
        <span className="absolute top-4.5 left-5 font-mono text-[11px] uppercase tracking-wider text-zinc-500">
          {currentCard.tag || (isFlipped ? "Working Answer" : "Concept Surface")}
        </span>

        <span className="absolute top-4.5 right-5 font-mono text-[11px] text-zinc-400 flex items-center gap-1.5 group-hover:text-white transition-colors">
          <RotateCw className="size-3" />
          <span>Flip</span>
        </span>

        {/* Card Content */}
        <div className="max-w-md px-4">
          <p className="font-heading text-[18px] sm:text-[20px] font-semibold text-white leading-relaxed tracking-tight">
            {isFlipped ? currentCard.back : currentCard.front}
          </p>
        </div>

        {!isFlipped && currentCard.hint && showHint && (
          <p className="absolute bottom-4 font-mono text-[12px] text-zinc-400">
            Hint: {currentCard.hint}
          </p>
        )}
      </div>

      {/* Footer Controls */}
      <div className="mt-6 flex items-center justify-between">
        {currentCard.hint && !isFlipped ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowHint(!showHint);
            }}
            className="font-sans text-[13px] font-medium text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="size-3.5 text-purple-400" />
            <span>{showHint ? "Hide hint" : "Show hint"}</span>
          </button>
        ) : (
          <div />
        )}

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="grid size-10 place-items-center rounded-full bg-white/[0.06] text-white hover:bg-white/[0.12] transition-all active:scale-95 shadow-sm"
            aria-label="Previous card"
          >
            <ChevronLeft className="size-4 stroke-[2.5]" />
          </button>
          <button
            onClick={handleNext}
            className="grid size-10 place-items-center rounded-full bg-white/[0.06] text-white hover:bg-white/[0.12] transition-all active:scale-95 shadow-sm"
            aria-label="Next card"
          >
            <ChevronRight className="size-4 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
}
