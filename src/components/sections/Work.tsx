import Section from "../Section";
import ScrollReveal from "../ScrollReveal";

interface Role {
  company: string;
  title: string;
  period: string;
  url: string;
  summary: string;
  highlights: string[];
}

// TODO(james): paste exact dates / titles / bullet points from LinkedIn — this is structural placeholder copy drawn from public company info.
const roles: Role[] = [
  {
    company: "io.finnet",
    title: "Engineering — placeholder title",
    period: "Present",
    url: "https://iofinnet.com",
    summary:
      "Building institutional-grade digital asset custody and MPC infrastructure.",
    highlights: [
      "Engineering on a regulated digital-asset custody platform",
      "MPC / threshold cryptography for key management",
      "Cross-functional product delivery in a regulated environment",
    ],
  },
  {
    company: "YouView",
    title: "Engineering — placeholder title",
    period: "Previous",
    url: "https://youview.com",
    summary:
      "Hybrid IPTV/DTT platform powering connected TV experiences for millions of UK households.",
    highlights: [
      "Connected-TV product engineering at consumer scale",
      "Cross-team delivery on a tightly integrated hardware/software stack",
      "Performance, reliability and a/b experimentation",
    ],
  },
  {
    company: "Accenture",
    title: "Consulting / Delivery — placeholder title",
    period: "Earlier",
    url: "https://accenture.com",
    summary:
      "Enterprise consulting across digital transformation, cloud and platform engineering.",
    highlights: [
      "Multiple client engagements across industries",
      "Delivery across cloud, integration and bespoke build",
      "Foundation in structured delivery and stakeholder management",
    ],
  },
];

export default function Work() {
  return (
    <Section
      id="work"
      eyebrow="Work"
      title="Where I've built."
      intro="A short version. Full timeline on LinkedIn — link in the contact section."
    >
      <ol className="space-y-4">
        {roles.map((r, i) => (
          <ScrollReveal key={r.company} delay={i * 0.05}>
            <li className="rounded-2xl border border-border bg-surface p-6 md:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 mb-3">
                <div>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xl md:text-2xl font-semibold text-text-primary hover:text-accent transition-colors"
                  >
                    {r.company}
                  </a>
                  <p className="text-sm text-text-secondary mt-0.5">{r.title}</p>
                </div>
                <span className="text-xs font-mono uppercase tracking-wider text-text-muted">
                  {r.period}
                </span>
              </div>
              <p className="text-text-secondary leading-relaxed">{r.summary}</p>
              <ul className="mt-4 space-y-1.5 text-sm text-text-secondary">
                {r.highlights.map((h) => (
                  <li key={h} className="flex gap-2">
                    <span className="text-accent mt-0.5">·</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </li>
          </ScrollReveal>
        ))}
      </ol>
      <p className="mt-6 text-xs text-text-muted">
        Roles and dates are placeholders — paste your LinkedIn copy into{" "}
        <code className="font-mono text-text-secondary">
          src/components/sections/Work.tsx
        </code>
        .
      </p>
    </Section>
  );
}
