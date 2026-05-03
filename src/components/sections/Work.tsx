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

const roles: Role[] = [
  {
    company: "io.finnet",
    title: "Head of QA",
    period: "Current",
    url: "https://iofinnet.com",
    summary:
      "Building institutional-grade digital asset custody on MPC and threshold cryptography. Owner of QA strategy, automation and release readiness across the io.vault product line.",
    highlights: [
      "Built the QA function from zero to four engineers",
      "Established automation frameworks delivering 80%+ test coverage across the core product line",
      "Led testing for 10+ major releases spanning MPC technology and smart contracts",
      "Coverage across 20+ blockchain networks — Ethereum, Bitcoin, Solana, Tron, Ripple",
      "QA for exchange integrations (Bitfinex, Kiln, WalletConnect) and banking partnerships on private EVM networks",
    ],
  },
  {
    company: "YouView",
    title: "QA Lead — connected TV platform",
    period: "Previous",
    url: "https://youview.com",
    summary:
      "Hybrid IPTV/DTT platform powering connected TV experiences for millions of UK households.",
    highlights: [
      "Led 11 QA Engineers across 5 SCRUM teams",
      "Delivered QA for the HTML5 UI migration rolled out to 2 million customers",
      "Shipped the UK's first Netflix integration in the connected TV space",
      "QA lead on the 4K set-top box launch with BT",
    ],
  },
  {
    company: "Accenture",
    title: "Consulting / Delivery",
    period: "Earlier",
    url: "https://accenture.com",
    summary:
      "Enterprise consulting across digital transformation, cloud and platform engineering — foundation in structured delivery and stakeholder management at scale.",
    highlights: [
      "Multiple client engagements across industries",
      "Delivery across cloud, integration and bespoke build",
      "Foundation in structured delivery, governance and cross-functional leadership",
    ],
  },
];

export default function Work() {
  return (
    <Section
      id="work"
      eyebrow="Work"
      title="Where I've built."
      intro="Quality engineering leadership across blockchain custody, connected TV at consumer scale, and enterprise consulting. Full timeline on LinkedIn — link in the contact section."
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
    </Section>
  );
}
