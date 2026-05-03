import Section from "../Section";
import ScrollReveal from "../ScrollReveal";

export default function About() {
  return (
    <Section id="about" eyebrow="About" title="A leader who ships.">
      <div className="grid md:grid-cols-3 gap-10 md:gap-14">
        <ScrollReveal className="md:col-span-2 space-y-6 text-lg text-text-secondary leading-relaxed">
          <p>
            I'm James — a quality engineering leader with{" "}
            <span className="text-text-primary">13+ years</span> building QA
            functions and driving delivery across complex technical environments.
            Currently <span className="text-text-primary">Head of QA at io.finnet</span>,
            where I built the team from zero to four engineers and established
            automation frameworks achieving 80%+ test coverage across the core
            product line.
          </p>
          <p>
            I've led testing for 10+ major releases spanning{" "}
            <span className="text-text-primary">MPC technology</span>, smart
            contracts, 20+ blockchain networks (Ethereum, Bitcoin, Solana, Tron,
            Ripple), exchange integrations (Bitfinex, Kiln, WalletConnect), and
            banking partnerships running on private EVM networks. Previously at{" "}
            <span className="text-text-primary">YouView</span>, I led 11 QA
            Engineers across 5 SCRUM teams, delivering QA for the HTML5 UI
            migration to 2 million customers, the UK's first Netflix integration
            in connected TV, and the 4K set-top box launch with BT.
          </p>
          <p>
            Outside of work I build products end-to-end — design, code, deploy,
            iterate. My recent personal projects all use Next.js, React,
            TypeScript and Tailwind, and all were built with{" "}
            <span className="text-accent">Claude Code</span> as the primary coding
            partner. This site itself is built that way — scroll a project page
            and you'll see the actual code from the repo, not screenshots.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="space-y-6">
          <div className="rounded-xl border border-border bg-surface p-5">
            <p className="text-xs uppercase tracking-wider text-text-muted mb-2">
              Currently
            </p>
            <p className="text-text-primary font-medium">Head of QA, io.finnet</p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-5">
            <p className="text-xs uppercase tracking-wider text-text-muted mb-2">
              Based
            </p>
            <p className="text-text-primary font-medium">Greater Edinburgh Area</p>
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
