import { ReactNode } from "react";
import { Lock } from "lucide-react";

interface BrowserFrameProps {
  url: string;
  children: ReactNode;
  behindLogin?: boolean;
  /** approximate viewport height inside the frame */
  height?: string;
  className?: string;
}

export default function BrowserFrame({
  url,
  children,
  behindLogin = false,
  height = "640px",
  className = "",
}: BrowserFrameProps) {
  return (
    <div
      className={`rounded-2xl border border-border bg-surface overflow-hidden shadow-2xl shadow-black/50 ${className}`}
    >
      {/* Chrome */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-surface-elevated">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="mx-auto max-w-2xl flex items-center gap-2 rounded-md bg-background border border-border px-3 py-1.5">
            {behindLogin ? (
              <Lock className="size-3 text-accent shrink-0" />
            ) : (
              <span className="size-2 rounded-full bg-success shrink-0" />
            )}
            <span className="font-mono text-xs text-text-secondary truncate">
              {url}
            </span>
          </div>
        </div>
        {behindLogin && (
          <span className="hidden sm:inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-accent border border-accent-muted bg-accent-muted/40 rounded-full px-2 py-0.5 shrink-0">
            <Lock className="size-3" /> behind login — demo
          </span>
        )}
      </div>
      {/* Viewport */}
      <div
        className="bg-background overflow-hidden relative"
        style={{ height }}
      >
        <div className="absolute inset-0 overflow-auto">{children}</div>
      </div>
    </div>
  );
}
