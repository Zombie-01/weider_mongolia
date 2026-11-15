import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/** Printer registration mark. */
export function Crosshair({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg
      viewBox="0 0 40 40"
      aria-hidden
      className={cn("pointer-events-none absolute", className)}
      style={style}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    >
      <circle cx="20" cy="20" r="8" />
      <path d="M20 0v40M0 20h40" />
    </svg>
  );
}
