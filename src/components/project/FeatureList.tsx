import ScrollReveal from "../ScrollReveal";
import { Project } from "@/data/projects";

export default function FeatureList({ features }: { features: Project["features"] }) {
  return (
    <ol className="grid md:grid-cols-2 gap-5">
      {features.map((f, i) => (
        <ScrollReveal key={f.title} delay={(i % 2) * 0.05}>
          <li className="rounded-2xl border border-border bg-surface p-6 h-full">
            <div className="flex items-start gap-4">
              <span className="shrink-0 size-8 rounded-lg bg-accent-muted text-accent flex items-center justify-center font-mono text-sm font-medium">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-1.5">
                  {f.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {f.body}
                </p>
              </div>
            </div>
          </li>
        </ScrollReveal>
      ))}
    </ol>
  );
}
