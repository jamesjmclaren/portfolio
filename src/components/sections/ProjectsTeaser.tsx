"use client";

import Image from "next/image";
import { Lock } from "lucide-react";
import { projectMeta } from "@/data/projects";

const screenshots: Record<string, string> = {
  "west-investments": "/screenshots/west-investments.png",
  prempod:            "/screenshots/prempod.png",
  burgerlist:         "/screenshots/burgerlist.png",
  categorais:         "/screenshots/categorais.png",
};

const accentColor: Record<string, string> = {
  "west-investments": "#d4af37",
  prempod:            "#5b8def",
  burgerlist:         "#f97316",
  categorais:         "#a855f7",
};

export default function ProjectsTeaser() {
  const projects = projectMeta;

  return (
    <section
      id="projects"
      className="snap-section h-screen flex items-center px-6 md:px-10 pt-14 overflow-hidden relative"
    >
      {/* B&W mountain background */}
      <div className="absolute inset-0">
        <Image
          src="/mountains.jpg"
          alt=""
          fill
          className="object-cover"
          style={{ filter: "grayscale(100%) brightness(0.35) contrast(1.1)" }}
          priority
        />
        {/* Dark gradient overlay — heavier at bottom so cards read cleanly */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/75" />
      </div>

      <div className="mx-auto w-full max-w-6xl relative z-10">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/50 mb-3">
          03 / 07 · Projects
        </p>
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-8">
          What I&apos;ve built.
        </h2>

        {/* Cards grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {projects.map((p) => {
            const accent = accentColor[p.slug] ?? "#ffffff";
            const shot   = screenshots[p.slug];

            return (
              <a
                key={p.slug}
                href={`/projects/${p.slug}`}
                className="group flex flex-col rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-white/25 hover:bg-white/10 hover:shadow-2xl"
              >
                {/* Browser window mockup */}
                <div className="shrink-0 rounded-t-xl overflow-hidden border-b border-white/10" style={{ background: "#1a1a1f" }}>
                  {/* Chrome bar */}
                  <div className="flex items-center gap-2 px-3 py-2 border-b border-white/10">
                    {/* Traffic lights */}
                    <span className="size-2 rounded-full bg-[#ff5f57]" />
                    <span className="size-2 rounded-full bg-[#febc2e]" />
                    <span className="size-2 rounded-full bg-[#28c840]" />
                    {/* URL bar */}
                    <div className="flex-1 mx-2 rounded bg-white/10 px-2 py-0.5 flex items-center gap-1.5">
                      <span className="size-1.5 rounded-full shrink-0" style={{ background: accent }} />
                      <span className="text-[9px] font-mono text-white/40 truncate">{p.url ?? `localhost:3000/projects/${p.slug}`}</span>
                    </div>
                  </div>
                  {/* Screenshot */}
                  <div className="relative w-full h-36 md:h-44 overflow-hidden">
                    {shot ? (
                      <Image
                        src={shot}
                        alt={p.title}
                        fill
                        className="object-cover object-top"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs font-mono" style={{ background: `${accent}22`, color: accent }}>
                        {p.title}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card body */}
                <div className="flex flex-col flex-1 p-4 pt-3 gap-2">
                  {/* Badges */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span
                      className="inline-flex items-center gap-1 text-[9px] uppercase tracking-wider rounded-full px-2 py-0.5 border"
                      style={{
                        borderColor: p.status === "active" ? "rgba(34,197,94,0.4)" : "rgba(255,255,255,0.2)",
                        color:       p.status === "active" ? "#86efac"              : "rgba(255,255,255,0.45)",
                        background:  p.status === "active" ? "rgba(34,197,94,0.1)" : "rgba(255,255,255,0.05)",
                      }}
                    >
                      <span className={`size-1.5 rounded-full ${p.status === "active" ? "bg-green-400 animate-pulse" : "bg-white/30"}`} />
                      {p.status}
                    </span>
                    {p.hidden && (
                      <span className="inline-flex items-center gap-1 text-[9px] text-white/40 border border-white/15 rounded-full px-2 py-0.5">
                        <Lock className="size-2.5" />
                      </span>
                    )}
                  </div>

                  <h3
                    className="font-semibold text-sm text-white leading-tight transition-colors"
                    style={{ color: "white" }}
                  >
                    {p.title}
                  </h3>

                  <p className="text-[11px] text-white/50 leading-relaxed line-clamp-2 flex-1">
                    {p.pitch}
                  </p>

                  {/* Stack */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {p.stack.slice(0, 2).map((s) => (
                      <span
                        key={s}
                        className="text-[9px] font-mono px-1.5 py-0.5 rounded border border-white/10 bg-white/5 text-white/40"
                      >
                        {s}
                      </span>
                    ))}
                    {p.stack.length > 2 && (
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded border border-white/10 bg-white/5 text-white/40">
                        +{p.stack.length - 2}
                      </span>
                    )}
                  </div>

                  {/* Open link */}
                  <p
                    className="text-[10px] font-medium mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: accent }}
                  >
                    Open project ↗
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
