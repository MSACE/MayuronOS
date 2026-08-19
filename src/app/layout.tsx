import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MayuronOS — Neural & Generative Learning Matrix",
  description:
    "An AI-powered cognitive operating system that generates interactive UI in real-time based on how you learn and feel. Architected & Designed by Mayur Saini.",
  authors: [{ name: "Mayur Saini" }],
  creator: "Mayur Saini",
  publisher: "Mayur Saini",
  keywords: [
    "MayuronOS",
    "Mayur Saini",
    "Generative UI",
    "Adaptive Learning",
    "AI Agents",
    "Vercel AI SDK",
    "Next.js 15",
    "pgvector",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-50">{children}</body>
    </html>
  );
}
