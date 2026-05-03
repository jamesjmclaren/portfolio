import { ReactNode } from "react";

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
  children: ReactNode;
  className?: string;
  fullHeight?: boolean;
}

export default function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className = "",
  fullHeight = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`relative px-6 md:px-10 py-24 md:py-32 ${
        fullHeight ? "min-h-screen flex flex-col justify-center" : ""
      } ${className}`}
    >
      <div className="mx-auto w-full max-w-6xl">
        {(eyebrow || title || intro) && (
          <header className="mb-14 md:mb-20 max-w-3xl">
            {eyebrow && (
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent mb-4">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-text-primary leading-[1.05]">
                {title}
              </h2>
            )}
            {intro && (
              <p className="mt-6 text-lg md:text-xl text-text-secondary leading-relaxed">
                {intro}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
