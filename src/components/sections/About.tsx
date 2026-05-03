import Section from "../Section";
import ScrollReveal from "../ScrollReveal";

export default function About() {
  return (
    <Section id="about" eyebrow="About" title="A builder who ships.">
      <div className="grid md:grid-cols-3 gap-10 md:gap-14">
        <ScrollReveal className="md:col-span-2 space-y-6 text-lg text-text-secondary leading-relaxed">
          <p>
            I'm James — currently building product and platform at{" "}
            <span className="text-text-primary">io.finnet</span>, previously{" "}
            <span className="text-text-primary">YouView</span> and{" "}
            <span className="text-text-primary">Accenture</span>. I work across the
            full stack with a bias for shipping small things quickly and learning
            from real users.
          </p>
          <p>
            Outside of work I build products end-to-end — design, code, deploy,
            iterate. My recent personal projects are all live, all use Next.js,
            React, TypeScript and Tailwind, and all were built with{" "}
            <span className="text-accent">Claude Code</span> as the primary coding
            partner.
          </p>
          <p>
            This site itself is built that way — scroll a project page and you'll
            see the actual code from the repo, not screenshots.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="space-y-6">
          <div className="rounded-xl border border-border bg-surface p-5">
            <p className="text-xs uppercase tracking-wider text-text-muted mb-2">
              Currently
            </p>
            <p className="text-text-primary font-medium">
              Engineering at io.finnet
            </p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-5">
            <p className="text-xs uppercase tracking-wider text-text-muted mb-2">
              Based
            </p>
            <p className="text-text-primary font-medium">London, UK</p>
          </div>
          <div className="rounded-xl border border-accent-muted bg-accent-muted/30 p-5">
            <p className="text-xs uppercase tracking-wider text-accent mb-2">
              Working with
            </p>
            <p className="text-text-primary font-medium">Claude Code, daily</p>
          </div>
        </ScrollReveal>
      </div>
    </Section>
  );
}
