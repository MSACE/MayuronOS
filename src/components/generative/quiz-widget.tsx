"use client";

import { useState } from "react";
import { Check, Sparkles, RotateCcw, ArrowRight } from "lucide-react";

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty?: "beginner" | "intermediate" | "advanced";
}

export interface QuizWidgetProps {
  title?: string;
  topic?: string;
  questions: QuizQuestion[];
  onComplete?: (score: number, total: number) => void;
}

export function QuizWidget({
  title = "Knowledge Synthesis",
  topic = "Neural Check",
  questions = [],
  onComplete,
}: QuizWidgetProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  if (!questions || questions.length === 0) {
    return null;
  }

  const currentQ = questions[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentQ.correctIndex;
    const newScore = isCorrect ? score + 1 : score;
    if (isCorrect) setScore(newScore);

    if (currentIndex === questions.length - 1) {
      setIsCompleted(true);
      if (onComplete) onComplete(newScore, questions.length);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsCompleted(false);
  };

  return (
    <div className="w-full rounded-[28px] bg-white/[0.035] p-7 shadow-[0_10px_40px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.06)] backdrop-blur-xl border border-white/[0.03]">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/[0.04]">
        <div className="flex items-center gap-2.5">
          <span className="size-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-heading text-[13px] font-semibold text-white">{topic}</span>
        </div>

        <div className="genui-badge text-zinc-300">
          Question {currentIndex + 1} of {questions.length}
        </div>
      </div>

      {/* Question Body */}
      {!isCompleted ? (
        <div className="space-y-6">
          <h4 className="font-heading text-[20px] font-semibold text-white tracking-tight leading-snug">
            {currentQ.question}
          </h4>

          {/* Options Grid */}
          <div className="grid grid-cols-1 gap-3">
            {currentQ.options.map((option, idx) => {
              let style =
                "bg-white/[0.04] text-zinc-300 hover:bg-white/[0.08] hover:text-white shadow-sm";

              if (isAnswered) {
                if (idx === currentQ.correctIndex) {
                  style = "bg-white text-black font-semibold shadow-xl";
                } else if (idx === selectedOption) {
                  style = "bg-white/[0.02] text-zinc-500 opacity-60";
                } else {
                  style = "bg-white/[0.01] text-zinc-600 opacity-40";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`flex w-full items-center justify-between rounded-[20px] px-5 py-4 text-left font-sans text-[15px] font-normal transition-all ${style}`}
                >
                  <span>{option}</span>
                  {isAnswered && idx === currentQ.correctIndex && (
                    <Check className="size-4.5 text-black stroke-[3]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {isAnswered && (
            <div className="animate-in fade-in rounded-[20px] bg-white/[0.02] p-5 text-zinc-300 space-y-2 border border-white/[0.02]">
              <div className="flex items-center gap-2 font-heading font-semibold text-white text-[13px]">
                <Sparkles className="size-3.5 text-cyan-400" />
                <span>Synthesis & Reasoning</span>
              </div>
              <p className="font-sans text-[14px] leading-relaxed text-zinc-400">{currentQ.explanation}</p>
            </div>
          )}

          {/* Next Button */}
          {isAnswered && currentIndex < questions.length - 1 && (
            <div className="pt-2">
              <button
                onClick={handleNext}
                className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-7 font-sans text-[14px] font-semibold text-black transition-all hover:bg-zinc-200 active:scale-95 shadow-lg shadow-white/10"
              >
                <span>Continue</span>
                <ArrowRight className="size-4 stroke-[2.5]" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Result Summary */
        <div className="py-8 text-center space-y-4 animate-in zoom-in-95">
          <div className="grid size-14 place-items-center rounded-full bg-white text-black mx-auto shadow-xl">
            <Check className="size-7 stroke-[2.5]" />
          </div>
          <h4 className="font-heading text-[22px] font-semibold text-white tracking-tight">Synthesis Complete</h4>
          <p className="font-sans text-[15px] text-zinc-400">
            Mastery Score: <span className="text-white font-semibold">{score}</span> / {questions.length} (
            {Math.round((score / questions.length) * 100)}% Accuracy)
          </p>

          <button
            onClick={handleRestart}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-white/[0.08] px-6 font-sans text-[13px] font-medium text-white transition-all hover:bg-white/[0.14] active:scale-95"
          >
            <RotateCcw className="size-3.5" />
            <span>Retake Check</span>
          </button>
        </div>
      )}
    </div>
  );
}
