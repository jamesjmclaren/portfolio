import Section from "../Section";
import ScrollReveal from "../ScrollReveal";
import { Sparkles } from "lucide-react";

const groups: { title: string; items: string[] }[] = [
  {
    title: "Languages",
    items: ["TypeScript", "JavaScript", "SQL", "Python", "HTML", "CSS"],
  },
  {
    title: "Frameworks & libraries",
    items: [
      "Next.js (App Router)",
      "React 19",
      "Tailwind v4",
      "Prisma",
      "Recharts",
      "Framer Motion",
      "Zod",
      "NextAuth",
    ],
  },
  {
    title: "Infrastructure",
    items: [
      "Vercel",
      "AWS",
      "Supabase / Postgres",
      "Cloudinary",
      "Stripe",
      "Clerk / NextAuth",
      "GitHub Actions",
    ],
  },
  {
    title: "QA & delivery",
    items: [
      "Test automation strategy",
      "API testing",
      "Release management",
      "SCRUM team leadership",
      "Cross-functional delivery",
      "Technical project management",
    ],
  },
  {
    title: "Domains",
    items: [
      "MPC & threshold cryptography",
      "Smart contracts",
      "Blockchain (ETH, BTC, SOL, TRON, XRP)",
      "Exchange integrations",
      "Connected TV / IPTV",
      "Fintech & digital asset custody",
    ],
  },
];

export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Tools & Skills"
      title="The toolbox."
      intro="Stack I reach for, plus the meta-tool that's changed how I build the most."
    >
      <ScrollReveal>
        <div className="rounded-2xl border border-accent-muted bg-gradient-to-br from-accent-muted/40 to-transparent p-8 md:p-10 mb-10">
          <div className="flex items-start gap-5">
            <div className="shrink-0 size-12 rounded-xl bg-accent-muted flex items-center justify-center">
              <Sparkles className="size-6 text-accent" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent mb-2">
                The unfair advantage
              </p>
              <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">
                Built with Claude.
              </h3>
              <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-3xl">
                Every personal project on this site — and this site itself — was
                built with <span className="text-text-primary">Claude Code</span> as
                the primary coding partner. Spec, scaffold, refactor, debug, ship.
                It's not a buzzword on this page; it's how the work happens.
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {groups.map((g, i) => (
          <ScrollReveal key={g.title} delay={i * 0.05}>
            <div className="rounded-2xl border border-border bg-surface p-6 h-full">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-text-secondary mb-4">
                {g.title}
              </h4>
              <ul className="space-y-2">
                {g.items.map((item) => (
                  <li
                    key={item}
                    className="text-text-primary text-sm flex items-center gap-2"
                  >
                    <span
                      className="size-1 rounded-full bg-accent shrink-0"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </Section>
  );
}
