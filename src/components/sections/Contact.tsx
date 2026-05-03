import { Github, Linkedin, Mail } from "lucide-react";
import Section from "../Section";
import ScrollReveal from "../ScrollReveal";

const links = [
  {
    label: "Email",
    value: "hello@example.com",
    href: "mailto:hello@example.com",
    icon: Mail,
  },
  {
    label: "GitHub",
    value: "jamesjmclaren",
    href: "https://github.com/jamesjmclaren",
    icon: Github,
  },
  {
    label: "LinkedIn",
    value: "james-mclaren-5baaab2b",
    href: "https://www.linkedin.com/in/james-mclaren-5baaab2b/",
    icon: Linkedin,
  },
];

export default function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Get in touch."
      intro="Best for a chat about product, engineering, or building things with Claude."
    >
      <div className="grid sm:grid-cols-3 gap-4">
        {links.map((l, i) => (
          <ScrollReveal key={l.label} delay={i * 0.05}>
            <a
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-border bg-surface hover:bg-surface-hover hover:border-accent-muted transition-all p-5"
            >
              <div className="shrink-0 size-10 rounded-lg bg-surface-elevated flex items-center justify-center text-text-secondary group-hover:text-accent transition-colors">
                <l.icon className="size-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-wider text-text-muted">
                  {l.label}
                </p>
                <p className="text-text-primary font-medium truncate">{l.value}</p>
              </div>
            </a>
          </ScrollReveal>
        ))}
      </div>

      <p className="mt-16 text-xs text-text-muted text-center">
        Built with Next.js, Tailwind v4 and Claude Code.
      </p>
    </Section>
  );
}
