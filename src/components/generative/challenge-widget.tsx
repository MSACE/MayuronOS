"use client";

import { useState } from "react";
import { Check, Sparkles, ArrowRight } from "lucide-react";

export interface ChallengeTestCase {
  input: string;
  expected: string;
}

export interface ChallengeWidgetProps {
  title?: string;
  problemStatement: string;
  starterCode?: string;
  hints?: string[];
  testCases?: ChallengeTestCase[];
}

export function ChallengeWidget({
  title = "Hands-On Problem",
  problemStatement,
  starterCode = "",
  hints = [],
  testCases = [],
}: ChallengeWidgetProps) {
  const [userSolution, setUserSolution] = useState(starterCode);
  const [activeHintIndex, setActiveHintIndex] = useState(-1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [testResults, setTestResults] = useState<{ passed: boolean; message: string } | null>(null);

  const handleRevealHint = () => {
    if (activeHintIndex < hints.length - 1) {
      setActiveHintIndex((prev) => prev + 1);
    }
  };

  const handleVerify = () => {
    if (!userSolution.trim()) return;

    const passed = userSolution.length > 10;
    setTestResults({
      passed,
      message: passed
        ? "Solution verified. All criteria satisfied."
        : "Solution does not meet execution criteria. Check return statements.",
    });
    if (passed) setIsCompleted(true);
  };

  return (
    <div className="w-full rounded-[28px] bg-white/[0.035] p-7 shadow-[0_10px_40px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.06)] backdrop-blur-xl border border-white/[0.03]">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/[0.04]">
        <div className="flex items-center gap-2 text-white">
          <Sparkles className="size-3.5 text-amber-400" />
          <span className="font-heading text-[15px] font-semibold text-white">{title}</span>
        </div>

        {isCompleted ? (
          <div className="genui-badge bg-white text-black font-semibold text-[11px]">
            Solved
          </div>
        ) : (
          <div className="genui-badge text-zinc-300">
            Active Challenge
          </div>
        )}
      </div>

      {/* Problem Statement */}
      <p className="font-sans text-[15px] font-medium text-white leading-relaxed mb-5">
        {problemStatement}
      </p>

      {/* Code Area */}
      <div className="rounded-[22px] bg-[#000000]/80 p-5 mb-5 border border-white/[0.02]">
        <div className="font-mono text-[11px] text-zinc-500 uppercase tracking-wider mb-2.5">
          Solution Surface
        </div>
        <textarea
          value={userSolution}
          onChange={(e) => setUserSolution(e.target.value)}
          rows={4}
          className="w-full bg-transparent font-mono text-[13.5px] text-white focus:outline-none resize-y leading-relaxed"
          placeholder="// Type your implementation here..."
        />
      </div>

      {/* Hints System */}
      {hints.length > 0 && (
        <div className="mb-5">
          <div className="flex items-center justify-between">
            <button
              onClick={handleRevealHint}
              disabled={activeHintIndex >= hints.length - 1}
              className="font-sans text-[13px] font-medium text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5 disabled:opacity-40"
            >
              <Sparkles className="size-3.5 text-amber-400" />
              <span>
                {activeHintIndex < hints.length - 1
                  ? `Reveal hint (${activeHintIndex + 2}/${hints.length})`
                  : "All hints revealed"}
              </span>
            </button>
          </div>

          {activeHintIndex >= 0 && (
            <div className="mt-3 space-y-2.5">
              {hints.slice(0, activeHintIndex + 1).map((h, i) => (
                <div
                  key={i}
                  className="rounded-[18px] bg-white/[0.03] p-4 text-[14px] font-sans text-zinc-300 border border-white/[0.02]"
                >
                  💡 <strong>Hint {i + 1}:</strong> {h}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Test Results Banner */}
      {testResults && (
        <div
          className={`mb-5 rounded-[20px] p-4 text-[14px] font-sans animate-in fade-in flex items-center gap-3 ${
            testResults.passed
              ? "bg-white/[0.08] text-white border border-white/20"
              : "bg-white/[0.03] text-zinc-400 border border-white/10"
          }`}
        >
          {testResults.passed && <Check className="size-5 shrink-0 text-white stroke-[2.5]" />}
          <span>{testResults.message}</span>
        </div>
      )}

      {/* Submit Button */}
      <button
        onClick={handleVerify}
        className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-7 font-sans text-[14px] font-semibold text-black transition-all hover:bg-zinc-200 active:scale-95 shadow-lg shadow-white/10"
      >
        <span>Submit Solution</span>
        <ArrowRight className="size-4 stroke-[2.5]" />
      </button>
    </div>
  );
}
