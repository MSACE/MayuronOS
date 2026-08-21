"use client";

import React from "react";

export function NeuralPulseIcon({ className = "size-7" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <span className="absolute size-full rounded-full bg-cyan-500/20 animate-ping duration-1000" />
      <span className="absolute size-4/5 rounded-full bg-gradient-to-tr from-cyan-500/40 to-blue-500/40 blur-xs" />
      <div className="relative size-3.5 rounded-full bg-gradient-to-r from-cyan-300 to-blue-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
    </div>
  );
}

export function MemorySphereIcon({ className = "size-7" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <span className="absolute size-full rounded-full border border-purple-400/40 animate-spin duration-3000 border-dashed" />
      <span className="absolute size-4/5 rounded-full bg-gradient-to-tr from-purple-500/30 to-pink-500/30 blur-xs" />
      <div className="relative size-3.5 rounded-full bg-gradient-to-r from-purple-300 to-pink-400 shadow-[0_0_12px_rgba(192,132,252,0.8)]" />
    </div>
  );
}

export function QuantumCubeIcon({ className = "size-7" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <span className="absolute size-5 rotate-45 rounded border border-emerald-400/50 bg-emerald-500/10 shadow-[0_0_10px_rgba(52,211,153,0.4)]" />
      <div className="relative size-2.5 rounded-xs bg-gradient-to-tr from-emerald-300 to-teal-200 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
    </div>
  );
}

export function NeuralNetworkIcon({ className = "size-7" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* 3 Interconnected Glowing Nodes */}
      <svg className="size-6 text-amber-300/80" viewBox="0 0 24 24" fill="none">
        <circle cx="6" cy="12" r="2.5" fill="#fde047" className="shadow-lg" />
        <circle cx="18" cy="6" r="2" fill="#fde047" />
        <circle cx="18" cy="18" r="2" fill="#fde047" />
        <path d="M6 12L18 6M6 12L18 18" stroke="rgba(253, 224, 71, 0.4)" strokeWidth="1.5" />
      </svg>
    </div>
  );
}
