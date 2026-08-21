"use client";

import { useState } from "react";
import { Play, RotateCcw, Terminal, Check, Copy } from "lucide-react";
import { QuantumCubeIcon } from "@/components/ui/genui-icons";

export interface CodeSandboxProps {
  title?: string;
  language?: string;
  initialCode: string;
  expectedOutput?: string;
  explanation?: string;
}

export function CodeSandboxWidget({
  title = "Live Sandbox",
  language = "javascript",
  initialCode = "// Write your code here\nconsole.log('Mayuron execution ready');",
  expectedOutput,
  explanation,
}: CodeSandboxProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleRun = () => {
    setIsRunning(true);
    setOutput(null);

    setTimeout(() => {
      try {
        const logs: string[] = [];
        const customConsole = {
          log: (...args: any[]) => {
            logs.push(
              args
                .map((a) => (typeof a === "object" ? JSON.stringify(a, null, 2) : String(a)))
                .join(" ")
            );
          },
          error: (...args: any[]) => {
            logs.push(`[Error]: ${args.join(" ")}`);
          },
          warn: (...args: any[]) => {
            logs.push(`[Warn]: ${args.join(" ")}`);
          },
        };

        const runFn = new Function("console", code);
        runFn(customConsole);

        setOutput(logs.length > 0 ? logs.join("\n") : "(Code executed with zero return output)");
      } catch (err: any) {
        setOutput(`Uncaught ${err.name}: ${err.message}`);
      } finally {
        setIsRunning(false);
      }
    }, 120);
  };

  const handleReset = () => {
    setCode(initialCode);
    setOutput(null);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-[28px] bg-white/[0.035] p-7 shadow-[0_10px_40px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.06)] backdrop-blur-xl border border-white/[0.03] overflow-hidden">
      {/* Editor Header */}
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/[0.04]">
        <div className="flex items-center gap-3">
          <QuantumCubeIcon className="size-6" />
          <span className="font-heading text-[15px] font-semibold text-white">{title}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-all"
            title="Copy code"
          >
            {copied ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
          </button>
          <button
            onClick={handleReset}
            className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-all"
            title="Reset code"
          >
            <RotateCcw className="size-3.5" />
          </button>
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="inline-flex items-center gap-1.5 rounded-full bg-white text-black px-5 py-2 text-[12px] font-semibold transition-all hover:bg-zinc-200 active:scale-95 disabled:opacity-50 shadow-md"
          >
            <Play className="size-3 fill-current" />
            <span>{isRunning ? "Running" : "Execute"}</span>
          </button>
        </div>
      </div>

      {/* Editor Surface */}
      <div className="rounded-[22px] bg-[#000000]/80 p-5 border border-white/[0.02]">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          className="w-full resize-y bg-transparent font-mono text-[13.5px] leading-relaxed text-zinc-200 focus:outline-none min-h-[120px] max-h-[320px]"
        />
      </div>

      {/* Console Output Panel */}
      {output !== null && (
        <div className="mt-4 rounded-[20px] bg-white/[0.02] p-4 animate-in fade-in border border-white/[0.02]">
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-2">
            <span className="flex items-center gap-1.5">
              <Terminal className="size-3 text-cyan-400" />
              <span>Console Stream</span>
            </span>
            <span className="size-1.5 rounded-full bg-cyan-400 animate-pulse" />
          </div>
          <pre className="font-mono text-[12.5px] text-zinc-300 whitespace-pre-wrap leading-relaxed bg-[#000000]/60 p-3 rounded-[14px]">
            {output}
          </pre>
        </div>
      )}

      {/* Explanation Box */}
      {explanation && (
        <div className="mt-4 pt-3 text-[14px] font-sans leading-relaxed text-zinc-400">
          💡 {explanation}
        </div>
      )}
    </div>
  );
}
