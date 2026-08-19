import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes without conflicts.
 *
 * WHY: When you pass multiple class strings (e.g., from props + defaults),
 * Tailwind classes can conflict (e.g., "p-2" and "p-4"). This function
 * intelligently merges them so the last one wins.
 *
 * INDUSTRY PRACTICE: Every professional Next.js + Tailwind project uses this.
 * It's the standard utility from shadcn/ui.
 *
 * @example
 * cn("p-2 bg-red-500", "p-4") // → "bg-red-500 p-4" (p-4 wins)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
