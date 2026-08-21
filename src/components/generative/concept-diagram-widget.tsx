"use client";

import { useState } from "react";
import { ChevronRight, Sparkles } from "lucide-react";
import { NeuralNetworkIcon } from "@/components/ui/genui-icons";

export interface DiagramNode {
  id: string;
  label: string;
  sublabel?: string;
  details: string;
}

export interface ConceptDiagramProps {
  title?: string;
  nodes: DiagramNode[];
}

export function ConceptDiagramWidget({
  title = "Architecture Map",
  nodes = [],
}: ConceptDiagramProps) {
  const [selectedNodeIndex, setSelectedNodeIndex] = useState(0);

  if (!nodes || nodes.length === 0) {
    return null;
  }

  const activeNode = nodes[selectedNodeIndex];

  return (
    <div className="w-full rounded-[28px] bg-white/[0.035] p-7 shadow-[0_10px_40px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.06)] backdrop-blur-xl border border-white/[0.03]">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/[0.04]">
        <div className="flex items-center gap-3">
          <NeuralNetworkIcon className="size-6" />
          <span className="font-heading text-[15px] font-semibold text-white">{title}</span>
        </div>

        <div className="genui-badge text-zinc-300">
          Step {selectedNodeIndex + 1} of {nodes.length}
        </div>
      </div>

      {/* Nodes Flow Line */}
      <div className="flex flex-wrap items-center gap-2.5 py-2">
        {nodes.map((node, idx) => {
          const isSelected = idx === selectedNodeIndex;

          return (
            <div key={node.id} className="flex items-center gap-2">
              <button
                onClick={() => setSelectedNodeIndex(idx)}
                className={`flex items-center gap-2 rounded-full px-5 py-2.5 font-sans text-[13px] font-medium transition-all ${
                  isSelected
                    ? "bg-white text-black font-semibold shadow-xl scale-105"
                    : "bg-white/[0.05] text-zinc-300 hover:bg-white/[0.1] hover:text-white"
                }`}
              >
                <span className="font-mono text-[11px] opacity-60">0{idx + 1}</span>
                <span>{node.label}</span>
              </button>

              {idx < nodes.length - 1 && (
                <ChevronRight className="size-4 text-zinc-600 shrink-0" />
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Node Details Box */}
      {activeNode && (
        <div className="mt-6 rounded-[22px] bg-white/[0.03] p-6 animate-in fade-in border border-white/[0.02]">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.04]">
            <span className="flex items-center gap-2 font-heading font-semibold text-white text-[15px]">
              <Sparkles className="size-4 text-amber-400" />
              <span>{activeNode.label}</span>
            </span>
            {activeNode.sublabel && (
              <span className="font-mono text-[11px] text-zinc-500 uppercase tracking-wider">
                {activeNode.sublabel}
              </span>
            )}
          </div>
          <p className="font-sans text-[15px] font-normal leading-relaxed text-zinc-300">{activeNode.details}</p>
        </div>
      )}
    </div>
  );
}
