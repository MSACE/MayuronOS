"use client";

import React from "react";
import Link from "next/link";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  href?: string;
  showSubtitle?: boolean;
}

export function BrandLogo({ size = "md", href = "/", showSubtitle = false }: BrandLogoProps) {
  const iconSizes = {
    sm: "size-7",
    md: "size-8.5",
    lg: "size-10",
  };

  const textSizes = {
    sm: "text-[15px]",
    md: "text-[17px]",
    lg: "text-[20px]",
  };

  const content = (
    <div className="group flex items-center gap-3 transition-all duration-300">
      {/* ─── Iconic Modern "M" Neural Brandmark ─────────────────────── */}
      <div
        className={`relative ${iconSizes[size]} flex items-center justify-center transition-transform duration-500 group-hover:scale-105`}
      >
        {/* Soft Verde Mantis & Blu Cepheus Radial Halo */}
        <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#49F112]/30 via-[#00C3FF]/25 to-[#A855F7]/20 blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Floating Animated Geometric "M" Vector */}
        <svg
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative size-full drop-shadow-[0_2px_14px_rgba(73,241,18,0.4)] animate-[float_4.5s_easeInOut_infinite]"
        >
          <defs>
            {/* Primary Chromatic Supercar Gradient */}
            <linearGradient id="logoMGradientPrimary" x1="6" y1="36" x2="38" y2="8" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#00C3FF" />
              <stop offset="50%" stopColor="#49F112" />
              <stop offset="100%" stopColor="#A855F7" />
            </linearGradient>

            {/* Inner Core Gradient */}
            <linearGradient id="logoMInnerGradient" x1="14" y1="28" x2="30" y2="12" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#49F112" />
              <stop offset="50%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#00C3FF" />
            </linearGradient>

            {/* Subtle Glow Filter */}
            <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* ─── Layer 1: Outer Faceted "M" Structure ───────────────── */}
          <path
            d="M8 35V13.5C8 10.8 10.5 9 12.8 10.2L22 15.5L31.2 10.2C33.5 9 36 10.8 36 13.5V35"
            stroke="url(#logoMGradientPrimary)"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* ─── Layer 2: Inner Intersecting Chevron Wings ──────────── */}
          <path
            d="M14 26L22 20L30 26"
            stroke="url(#logoMInnerGradient)"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glowEffect)"
          />

          {/* ─── Layer 3: Central Apex Kinetic Pulse Node ───────────── */}
          <circle cx="22" cy="11.5" r="2.2" fill="#FFFFFF" />
          <circle cx="22" cy="11.5" r="1.2" fill="#49F112" />

          {/* ─── Layer 4: Base Anchor Nodes ─────────────────────────── */}
          <circle cx="8" cy="35" r="1.5" fill="#00C3FF" />
          <circle cx="36" cy="35" r="1.5" fill="#A855F7" />
        </svg>
      </div>

      {/* ─── Exact Format Case: MayuronOS Wordmark ─────────────────── */}
      <div className="flex flex-col">
        <div className="flex items-baseline gap-0.5">
          <span
            className={`font-logo ${textSizes[size]} font-bold tracking-[-0.03em] text-white transition-colors duration-200 group-hover:text-zinc-100`}
          >
            Mayuron
          </span>
          <span
            className={`font-heading ${textSizes[size]} font-extrabold tracking-[-0.02em] bg-clip-text text-transparent bg-gradient-to-r from-[#49F112] via-[#00C3FF] to-[#A855F7] drop-shadow-[0_0_14px_rgba(73,241,18,0.45)]`}
          >
            OS
          </span>
        </div>

        {showSubtitle && (
          <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-zinc-400 -mt-0.5 font-medium">
            Cognitive Operating System
          </span>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} aria-label="MayuronOS Home" className="focus:outline-none">
        {content}
      </Link>
    );
  }

  return content;
}
