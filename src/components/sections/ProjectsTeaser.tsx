import Link from "next/link";
import { ArrowUpRight, Lock } from "lucide-react";
import Section from "../Section";
import ScrollReveal from "../ScrollReveal";
import { projects } from "@/data/projects";

export default function ProjectsTeaser() {
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Personal projects."
      intro="Each card opens its own infinite-scroll deep-dive — pitch, features, and the actual code from the repo. Where the live product is behind a login, the code is the product tour."
    >
      <div className="grid gap-6 md:gap-8">
        {projects.map((p, i) => (
          <ScrollReveal key={p.slug} delay={i * 0.05}>
            <Link
              href={`/projects/${p.slug}`}
              className="group relative block rounded-2xl border border-border bg-surface hover:bg-surface-hover hover:border-border-hover transition-all overflow-hidden"
            >
              <div
                className="absolute inset-x-0 top-0 h-px"
                style={{
                  background: `linear-gradient(90deg, transparent, ${p.accent}, transparent)`,
                }}
              />
              <div className="p-7 md:p-9 grid md:grid-cols-[1fr_auto] gap-6 items-start">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">
                      {p.title}
                    </h3>
                    {p.hidden && (
                      <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-accent border border-accent-muted bg-accent-muted/40 rounded-full px-2 py-0.5">
                        <Lock className="size-3" /> behind login
                      </span>
                    )}
                  </div>
                  <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-2xl">
                    {p.tagline}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {p.stack.slice(0, 6).map((s) => (
                      <span
                        key={s}
                        className="text-xs font-mono text-text-muted border border-border rounded-md px-2 py-0.5"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-text-secondary group-hover:text-accent transition-colors">
                  <span className="text-sm font-medium">Open</span>
                  <ArrowUpRight className="size-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </Section>
  );
}
