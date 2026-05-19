"use client";

import { useDesign, type Design } from "@/context/DesignContext";

interface Props {
  /** "dark" = inside a dark nav (D1). "light" = inside a cream nav (D2). */
  variant?: "dark" | "light";
}

export default function DesignSwitcher({ variant = "dark" }: Props) {
  const { design, setDesign } = useDesign();

  const isLight = variant === "light";

  return (
    <div
      className="flex items-center gap-0.5 rounded-full p-[3px]"
      style={{
        background: isLight ? "rgba(26,26,26,0.08)" : "transparent",
        border: isLight
          ? "1.5px solid rgba(26,26,26,0.18)"
          : "1.5px solid rgba(212,175,55,0.35)",
      }}
    >
      <span
        className="text-[10px] uppercase tracking-widest px-2 select-none"
        style={{
          fontFamily: "ui-monospace, monospace",
          color: isLight ? "rgba(26,26,26,0.45)" : "rgba(212,175,55,0.6)",
        }}
      >
        Design
      </span>
      {([1, 2, 3] as Design[]).map((d) => {
        const active = design === d;
        return (
          <button
            key={d}
            onClick={() => setDesign(d)}
            className="rounded-full transition-all duration-150"
            style={{
              padding: "4px 11px",
              fontSize: 12,
              fontWeight: 600,
              fontFamily: "ui-monospace, monospace",
              letterSpacing: 1,
              cursor: "pointer",
              border: "none",
              background: active
                ? "#d4af37"
                : "transparent",
              color: active
                ? "#0a0a0b"
                : isLight
                ? "rgba(26,26,26,0.4)"
                : "rgba(255,255,255,0.35)",
            }}
          >
            D{d}
          </button>
        );
      })}
    </div>
  );
}
