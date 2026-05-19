import { Github, Linkedin } from "lucide-react";
import ScrollReveal from "../ScrollReveal";
import EmailCaptcha from "../EmailCaptcha";

const links = [
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
    <section
      id="contact"
      className="snap-section h-screen flex items-center px-6 md:px-10 pt-14"
    >
      <div className="mx-auto w-full max-w-6xl">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent mb-4">
          07 / 07 · Contact
        </p>
        <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-4">
          Get in touch.
        </h2>
        <p className="text-lg text-text-secondary mb-10 max-w-xl leading-relaxed">
          Best for a chat about product, engineering, or building things with Claude.
        </p>

        <div className="grid sm:grid-cols-3 gap-4 max-w-3xl">
          <ScrollReveal delay={0}>
            <EmailCaptcha />
          </ScrollReveal>
          {links.map((l, i) => (
            <ScrollReveal key={l.label} delay={(i + 1) * 0.05}>
              <a
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 p-5 rounded-2xl border border-border bg-surface hover:bg-surface-hover hover:border-accent-muted transition-all"
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
                <span className="ml-auto text-text-muted group-hover:text-accent transition-colors">
                  ↗
                </span>
              </a>
            </ScrollReveal>
          ))}
        </div>

        <p className="mt-10 text-xs text-text-muted">
          Built with Next.js, Tailwind v4 and Claude Code.
        </p>
      </div>
    </section>
  );
}
