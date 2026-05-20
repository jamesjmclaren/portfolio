export default function About() {
  return (
    <section
      id="about"
      className="snap-section min-h-screen md:h-screen flex items-start md:items-center px-6 md:px-10 pt-20 pb-12 md:pt-14 md:pb-0"
    >
      <div className="mx-auto w-full max-w-6xl grid lg:grid-cols-2 gap-12 lg:gap-24">
        {/* Left — broad description */}
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent mb-4">
            02 / 07 · About
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-8">
            A leader who ships.
          </h2>
          <div className="space-y-5 text-lg text-text-secondary leading-relaxed">
            <p>
              I build and lead quality engineering functions from scratch:
              assembling teams, defining strategy, and putting in place the
              automation infrastructure that lets product move fast without
              breaking things.
            </p>
            <p>
              My work spans the full stack of modern delivery:{" "}
              <span className="text-text-primary">CI/CD pipelines</span>,{" "}
              <span className="text-text-primary">cloud backends</span>,{" "}
              <span className="text-text-primary">frontends</span>,{" "}
              <span className="text-text-primary">mobile</span> and{" "}
              <span className="text-text-primary">TV operating systems</span>.
              Industries covered include{" "}
              <span className="text-text-primary">fintech</span>,{" "}
              <span className="text-text-primary">blockchain & MPC</span>, and{" "}
              <span className="text-text-primary">connected TV</span>.
            </p>
            <p>
              Tools of choice:{" "}
              <span className="text-text-primary">Playwright</span>,{" "}
              <span className="text-text-primary">GitHub Actions</span>, and
              increasingly,{" "}
              <span className="text-accent">Claude Code</span>{" "}
              as my daily driver for shipping side projects and tooling.
            </p>
          </div>
        </div>

        {/* Right — clean stats */}
        <div className="flex flex-col justify-center gap-4">
          <div className="rounded-xl border border-border bg-surface p-6">
            <p className="text-5xl font-semibold text-accent mb-1">13+</p>
            <p className="text-text-muted">years in quality engineering &amp; delivery</p>
          </div>

          <div className="rounded-xl border border-border bg-surface p-4 flex justify-between items-center">
            <p className="text-xs uppercase tracking-wider text-text-muted">Currently</p>
            <p className="text-text-primary font-medium">Head of QA, io.finnet</p>
          </div>

          <div className="rounded-xl border border-border bg-surface p-4 flex justify-between items-center">
            <p className="text-xs uppercase tracking-wider text-text-muted">Location</p>
            <p className="text-text-primary font-medium">Edinburgh, remote</p>
          </div>

          <div className="rounded-xl border border-accent-muted bg-accent-muted/30 p-4 flex justify-between items-center">
            <p className="text-xs uppercase tracking-wider text-accent">Building with</p>
            <p className="text-text-primary font-medium">Claude Code, daily</p>
          </div>
        </div>
      </div>
    </section>
  );
}
