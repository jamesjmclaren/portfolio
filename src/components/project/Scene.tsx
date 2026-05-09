import { ReactNode } from "react";
import ScrollReveal from "../ScrollReveal";

interface SceneProps {
  number: string;
  eyebrow: string;
  title: string;
  blurb: string;
  features?: string[];
  children: ReactNode;
  accent?: string;
}

export default function Scene({
  number,
  eyebrow,
  title,
  blurb,
  features,
  children,
  accent,
}: SceneProps) {
  return (
    <section className="px-6 md:px-10 py-12 md:py-16 border-t border-border/50">
      <div className="mx-auto w-full max-w-7xl">
        <ScrollReveal>
          <div className="grid lg:grid-cols-[260px_1fr] gap-8 lg:gap-12 mb-8 items-start">
            {/* Left — scene label + title */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="inline-flex items-center justify-center size-6 rounded-full text-[10px] font-semibold border"
                  style={{
                    borderColor: accent ? `${accent}60` : "var(--color-accent)",
                    color: accent ?? "var(--color-accent)",
                    background: accent ? `${accent}12` : "var(--color-accent-muted)",
                  }}
                >
                  {number}
                </span>
                <p className="text-[10px] uppercase tracking-[0.2em] text-text-muted">
                  {eyebrow}
                </p>
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight leading-tight">
                {title}
              </h2>
            </div>

            {/* Right — blurb + features */}
            <div className="space-y-4 pt-1">
              <p className="text-base md:text-lg text-text-secondary leading-relaxed max-w-2xl">
                {blurb}
              </p>
              {features && features.length > 0 && (
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 max-w-2xl pt-1">
                  {features.map((f) => (
                    <li key={f} className="flex gap-2 text-sm text-text-secondary">
                      <span
                        className="shrink-0 mt-0.5 font-semibold"
                        style={{ color: accent ?? "var(--color-accent)" }}
                      >
                        ·
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>{children}</ScrollReveal>
      </div>
    </section>
  );
}
