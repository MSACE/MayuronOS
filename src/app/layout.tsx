import type { Metadata } from "next";
import { Geist, Sora, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
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
      className={`${geist.variable} ${sora.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#000000] text-[#ffffff] font-sans">
        {children}
      </body>
    </html>
  );
}
