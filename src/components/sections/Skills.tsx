const groups = [
  {
    title: "Testing & QA",
    items: [
      "Playwright",
      "API & contract testing",
      "Test strategy & architecture",
      "Automation framework design",
      "Regression & smoke suites",
      "Performance & load testing",
      "Manual exploratory testing",
    ],
  },
  {
    title: "CI/CD & DevOps",
    items: [
      "GitHub Actions",
      "Pipeline design & maintenance",
      "Deployment automation",
      "Environment management",
      "Release gating",
    ],
  },
  {
    title: "Leadership & Delivery",
    items: [
      "Team building (0 → n)",
      "SCRUM & agile delivery",
      "Release management",
      "Technical PM",
      "Cross-functional leadership",
      "Hiring & mentoring",
    ],
  },
  {
    title: "Domains",
    items: [
      "MPC & threshold cryptography",
      "Smart contracts",
      "Blockchain (ETH · BTC · SOL · TRON · XRP)",
      "Fintech custody",
      "Connected TV & IPTV",
      "Exchange integrations",
    ],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="snap-section h-screen flex items-center px-6 md:px-10 pt-14 overflow-hidden"
    >
      <div className="mx-auto w-full max-w-6xl">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent mb-4">
          05 / 07 · Career Skills
        </p>
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-3">
          What I do professionally.
        </h2>
        <p className="text-text-secondary mb-8 max-w-2xl leading-relaxed">
          13+ years building and leading quality engineering functions — from solo
          contributor to multi-team QA lead, across fintech, blockchain and connected TV.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {groups.map((g) => (
            <div key={g.title} className="rounded-xl border border-border bg-surface p-5">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-accent mb-4">
                {g.title}
              </h4>
              <ul className="space-y-2.5">
                {g.items.map((item) => (
                  <li
                    key={item}
                    className="text-sm text-text-secondary flex items-start gap-2.5"
                  >
                    <span className="text-accent shrink-0 leading-5 font-semibold">+</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
