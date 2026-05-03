import { ReactNode } from "react";
import ScrollReveal from "../ScrollReveal";

interface SceneProps {
  number: string;
  eyebrow: string;
  title: string;
  blurb: string;
  features?: string[];
  children: ReactNode;
}

export default function Scene({
  number,
  eyebrow,
  title,
  blurb,
  features,
  children,
}: SceneProps) {
  return (
    <section className="px-6 md:px-10 py-16 md:py-24">
      <div className="mx-auto w-full max-w-7xl">
        <ScrollReveal>
          <div className="grid lg:grid-cols-[280px_1fr] gap-8 lg:gap-12 mb-8 items-end">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-accent mb-3">
                Scene {number} · {eyebrow}
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
                {title}
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-base md:text-lg text-text-secondary leading-relaxed max-w-2xl">
                {blurb}
              </p>
              {features && features.length > 0 && (
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 max-w-2xl">
                  {features.map((f) => (
                    <li
                      key={f}
                      className="flex gap-2 text-sm text-text-secondary"
                    >
                      <span className="text-accent shrink-0 mt-0.5">·</span>
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
