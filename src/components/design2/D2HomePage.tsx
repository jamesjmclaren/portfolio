"use client";

import Link from "next/link";
import { projectMeta } from "@/data/projects";
import {
  Tile,
  Scribble,
  CornerBrackets,
  grainBg,
  archivoBlack,
  caveat,
  patrickHand,
  monoStyle,
  D2_INK,
  D2_MUTED,
  D2_OUTER,
  D2_PAPER,
  D2_SOLID,
  D2_POP,
  D2_SOFT,
  D2_WARN,
  D2_DASH,
} from "./primitives";
import DesignSwitcher from "@/components/DesignSwitcher";
import ProjectLogo from "@/components/design2/ProjectLogo";
import type { CSSProperties } from "react";

// ── Nav ─────────────────────────────────────────────────────────────────────

function D2Nav() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 24,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <svg width={22} height={22} viewBox="0 0 24 24">
          <rect x={3} y={3} width={18} height={18} fill="none" stroke={D2_INK} strokeWidth={2.5} transform="rotate(45 12 12)" />
        </svg>
        <span style={{ ...caveat, fontSize: 24, color: D2_INK }}>jamesmclaren.dev</span>
      </div>
      <div style={{ display: "flex", gap: 28 }}>
        {["work", "about", "projects", "contact"].map((t) => (
          <a
            key={t}
            href={`#${t}`}
            style={{ ...patrickHand, fontSize: 18, color: D2_MUTED, textDecoration: "none" }}
          >
            {t}
          </a>
        ))}
      </div>
      <DesignSwitcher variant="light" />
    </nav>
  );
}

// ── Hero ─────────────────────────────────────────────────────────────────────

function D2Hero() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1.25fr 1fr",
        gap: 24,
        marginBottom: 24,
      }}
    >
      {/* Left: big heading */}
      <div>
        <div style={{ ...caveat, fontSize: 26, color: D2_SOLID, marginBottom: 6 }}>
          James McLaren —
        </div>
        <h1
          style={{
            ...archivoBlack,
            fontSize: "clamp(52px, 5.5vw, 82px)",
            lineHeight: 0.92,
            letterSpacing: -2,
            color: D2_INK,
            margin: 0,
          }}
        >
          I lead QE{" "}
          <span style={{ color: D2_SOLID }}>and ship</span>
          <br />
          the side projects.
        </h1>
        <Scribble width={340} style={{ marginTop: 8 }} />
        <p
          style={{
            ...patrickHand,
            fontSize: 20,
            color: D2_MUTED,
            marginTop: 14,
            maxWidth: 520,
            lineHeight: 1.4,
          }}
        >
          13 years building quality engineering: pipelines, infra, teams. Now
          pairing with Claude Code to ship real products on the side.
        </p>
      </div>

      {/* Right: 2×2 stat tiles */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: 10,
        }}
      >
        <Tile bg={D2_SOFT} style={{ padding: 16, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ ...monoStyle, fontSize: 10, letterSpacing: 2, textTransform: "uppercase" as const, color: D2_INK }}>
            currently
          </div>
          <div>
            <div style={{ ...patrickHand, fontSize: 21, fontWeight: 700, lineHeight: 1.1, color: D2_INK }}>
              Head of QA
            </div>
            <div style={{ ...caveat, fontSize: 19, color: D2_MUTED }}>@ io.finnet</div>
          </div>
        </Tile>
        <Tile bg={D2_POP} style={{ padding: 16, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ ...monoStyle, fontSize: 10, letterSpacing: 2, textTransform: "uppercase" as const, color: D2_INK }}>
            experience
          </div>
          <div>
            <div style={{ ...archivoBlack, fontSize: 46, lineHeight: 1, color: D2_INK }}>13+</div>
            <div style={{ ...caveat, fontSize: 19, color: D2_INK }}>years</div>
          </div>
        </Tile>
        <Tile bg={D2_WARN} style={{ padding: 16 }} bracketColor={D2_PAPER}>
          <div style={{ ...monoStyle, fontSize: 10, letterSpacing: 2, textTransform: "uppercase" as const, color: D2_PAPER, opacity: 0.85 }}>
            location
          </div>
          <div style={{ ...patrickHand, fontSize: 21, fontWeight: 700, color: D2_PAPER, marginTop: 14 }}>
            Edinburgh
          </div>
          <div style={{ ...caveat, fontSize: 18, color: D2_PAPER, opacity: 0.8 }}>remote · UK</div>
        </Tile>
        <Tile bg={D2_PAPER} dashed style={{ padding: 16 }} brackets={false}>
          <div style={{ ...monoStyle, fontSize: 10, letterSpacing: 2, textTransform: "uppercase" as const, color: D2_MUTED }}>
            tools
          </div>
          <div style={{ ...caveat, fontSize: 19, lineHeight: 1.3, marginTop: 8, color: D2_INK }}>
            Playwright · Next · React · Claude Code · GHA
          </div>
        </Tile>
      </div>
    </div>
  );
}

// ── Projects Row ──────────────────────────────────────────────────────────────

const projectTileData: Record<string, { logoSrc?: string; useLogoComponent?: boolean; logoBg: string; bracketColor: string; note: string }> = {
  "west-investments": { logoSrc: "/logos/west-investments.png", logoBg: "#0d0d0a", bracketColor: D2_SOFT,  note: "alt-asset tracker · live" },
  prempod:            { logoSrc: "/logos/prempod.png",          logoBg: "#060d1a", bracketColor: D2_WARN,  note: "fan-built creator hub" },
  burgerlist:         { useLogoComponent: true,                 logoBg: "#1a0900", bracketColor: D2_SOFT,  note: "shareable ranked lists" },
  categorais:         { useLogoComponent: true,                 logoBg: "#0d0718", bracketColor: D2_SOFT,  note: "AI directory · agent-fed" },
};

function D2ProjectsRow() {
  return (
    <section id="projects" style={{ marginBottom: 0 }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
          <span style={{ ...caveat, fontSize: 30, color: D2_INK }}>side projects →</span>
          <span style={{ ...patrickHand, fontSize: 17, color: D2_MUTED }}>built nights & weekends, mostly with Claude</span>
        </div>
        <span style={{ ...monoStyle, fontSize: 11, color: D2_MUTED, letterSpacing: 2 }}>04 · SHIPPED</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, height: 270 }}>
        {projectMeta.map((p, i) => {
          const tile = projectTileData[p.slug];
          return (
            <Link key={p.slug} href={`/projects/${p.slug}`} style={{ textDecoration: "none", display: "block", height: "100%" }}>
              <Tile bg={tile.logoBg} bracketColor={tile.bracketColor} style={{ height: "100%", position: "relative", cursor: "pointer" }}>
                {/* Logo centred in tile */}
                <div style={{
                  position: "absolute", inset: 0, bottom: 68,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  padding: "20px 24px",
                }}>
                  {tile.useLogoComponent ? (
                    <div style={{ width: 120, height: 120, borderRadius: 20, overflow: "hidden", flexShrink: 0 }}>
                      <ProjectLogo slug={p.slug} />
                    </div>
                  ) : (
                    <div style={{ width: 140, height: 100, borderRadius: 16, overflow: "hidden", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <img
                        src={tile.logoSrc}
                        alt={p.title}
                        style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                      />
                    </div>
                  )}
                </div>
                {/* Gradient fade */}
                <div style={{
                  position: "absolute", bottom: 68, left: 0, right: 0, height: 48,
                  background: "linear-gradient(transparent, rgba(10,10,11,0.95))",
                  pointerEvents: "none",
                }} />
                {/* Status dot + active indicator */}
                {p.status === "active" && (
                  <div style={{
                    position: "absolute", top: 14, right: 14,
                    width: 8, height: 8, borderRadius: "50%",
                    background: "#22c55e",
                    boxShadow: "0 0 6px #22c55e",
                  }} />
                )}
                {/* Bottom label */}
                <div style={{ position: "absolute", left: 14, bottom: 10, right: 14, color: D2_PAPER }}>
                  <div style={{ ...monoStyle, fontSize: 10, opacity: 0.45, letterSpacing: 2 }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div style={{ ...patrickHand, fontSize: 16, fontWeight: 700, lineHeight: 1.1, color: D2_PAPER }}>
                    {p.title}
                  </div>
                  <div style={{ ...caveat, fontSize: 13, opacity: 0.6, color: D2_PAPER }}>
                    {tile.note}
                  </div>
                </div>
              </Tile>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

// ── Claude Stack ──────────────────────────────────────────────────────────────

const techStack = [
  { name: "Next.js", icon: "nextdotjs" },
  { name: "React", icon: "react" },
  { name: "TypeScript", icon: "typescript" },
  { name: "Tailwind", icon: "tailwindcss" },
  { name: "Supabase", icon: "supabase" },
  { name: "Prisma", icon: "prisma" },
  { name: "PostgreSQL", icon: "postgresql" },
  { name: "NextAuth", icon: "authjs" },
  { name: "Clerk", icon: "clerk" },
  { name: "Stripe", icon: "stripe" },
  { name: "Cloudinary", icon: "cloudinary" },
  { name: "Vercel", icon: "vercel" },
  { name: "Google Maps", icon: "googlemaps" },
  { name: "YouTube API", icon: "youtube" },
  { name: "Spotify API", icon: "spotify" },
  { name: "Brave Search", icon: "brave" },
  { name: "Groq", icon: "groq" },
  { name: "AWS Rekog.", icon: "amazonaws" },
  { name: "GitHub Actions", icon: "githubactions" },
  { name: "Express", icon: "express" },
  { name: "Framer Motion", icon: "framer" },
  { name: "Zod", icon: "zod" },
  { name: "Playwright", icon: "playwright" },
];

function D2ClaudeStack() {
  return (
    <section
      style={{
        marginTop: 20,
        paddingTop: 16,
        borderTop: `1.5px dashed ${D2_DASH}`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          marginBottom: 8,
          flexWrap: "wrap" as const,
          gap: 8,
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
          <span style={{ ...caveat, fontSize: 24, color: D2_INK }}>built with Claude →</span>
          <span style={{ ...patrickHand, fontSize: 16, color: D2_MUTED }}>
            the hobby-project stack — not claiming expert, claiming shipped
          </span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            ...monoStyle,
            fontSize: 11,
            color: D2_SOLID,
            letterSpacing: 1,
            padding: "3px 12px",
            border: `1.5px solid ${D2_SOLID}`,
            borderRadius: 100,
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: D2_SOLID,
              display: "inline-block",
            }}
          />
          CLAUDE CODE · DAILY
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 6 }}>
        {techStack.map((t) => (
          <div
            key={t.name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              padding: "6px 10px",
              background: D2_PAPER,
              border: `1.5px solid ${D2_INK}`,
              borderRadius: 8,
              boxShadow: `1.5px 2px 0 0 ${D2_INK}`,
              ...monoStyle,
              fontSize: 12,
              color: D2_INK,
            }}
          >
            <img
              src={`https://cdn.simpleicons.org/${t.icon}/${D2_INK.replace("#", "")}`}
              alt=""
              width={13}
              height={13}
              style={{ display: "block" }}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            <span>{t.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Workplace logo fills ──────────────────────────────────────────────────────

function WorkplaceLogo({ src, bg, objectFit = "contain" }: { src: string; bg: string; objectFit?: "contain" | "cover" }) {
  return (
    <div style={{
      position: "absolute", inset: 0,
      background: bg,
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "32px 40px",
    }}>
      <img
        src={src}
        alt=""
        style={{ maxWidth: "80%", maxHeight: "60%", objectFit, filter: "brightness(0) invert(1)" }}
      />
    </div>
  );
}

// ── Workplaces Row ────────────────────────────────────────────────────────────

const workplaces = [
  {
    company: "io.finnet",
    url: "https://iofinnet.com",
    logoSrc: "/logos/iofinnet.svg",
    logoBg: "#0d1117",
    role: "Head of QA",
    range: "2022 — Now",
    note: "Built QA from zero · 20+ chains · MPC & smart contracts · AI-assisted test strategy",
    current: true,
    accent: "#00d4aa",
    bracketColor: D2_SOLID,
  },
  {
    company: "YouView",
    url: "https://youview.com",
    logoSrc: "/logos/youview.svg",
    logoBg: "#1a0a0a",
    role: "QA Lead · connected TV",
    range: "2016 — 2022",
    note: "11 QA engineers · HTML5 UI to 2M customers · UK's first Netflix on TV",
    current: false,
    accent: "#e8003c",
    bracketColor: D2_POP,
  },
  {
    company: "Accenture",
    url: "https://accenture.com",
    logoSrc: "/logos/accenture.svg",
    logoBg: "#0e0b18",
    role: "Consulting / Delivery",
    range: "2012 — 2016",
    note: "Cloud, integration & bespoke build across industries",
    current: false,
    accent: "#a100ff",
    bracketColor: D2_SOFT,
  },
];

function D2WorkplacesRow() {
  return (
    <section id="work" style={{ marginTop: 20 }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
          <span style={{ ...caveat, fontSize: 30, color: D2_INK }}>where I've worked →</span>
          <span style={{ ...patrickHand, fontSize: 17, color: D2_MUTED }}>
            13 years across fintech, blockchain & connected TV
          </span>
        </div>
        <span style={{ ...monoStyle, fontSize: 11, color: D2_MUTED, letterSpacing: 2 }}>03 · ROLES</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, height: 270 }}>
        {workplaces.map((w) => (
          <a key={w.company} href={w.url} target="_blank" rel="noreferrer" style={{ display: "block", height: "100%", textDecoration: "none" }}>
          <Tile bg={w.logoBg} bracketColor={w.bracketColor} style={{ position: "relative", height: "100%", cursor: "pointer" }}>
            {/* Full-tile real logo */}
            <WorkplaceLogo src={w.logoSrc} bg={w.logoBg} />
            {/* Gradient over the bottom for label legibility */}
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.88) 100%)",
              pointerEvents: "none",
            }} />
            {/* current badge top-right */}
            {w.current && (
              <div style={{
                position: "absolute", top: 14, right: 14,
                ...caveat, fontSize: 14, fontWeight: 700,
                color: D2_INK, background: D2_POP,
                padding: "2px 10px", borderRadius: 100,
              }}>
                ● current
              </div>
            )}
            {/* Bottom label */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "12px 18px" }}>
              <div style={{ ...monoStyle, fontSize: 10, opacity: 0.5, letterSpacing: 2 }}>{w.range}</div>
              <div style={{ ...patrickHand, fontSize: 16, fontWeight: 700, color: w.accent, marginTop: 2 }}>{w.role}</div>
              <div style={{ ...caveat, fontSize: 13, opacity: 0.75, marginTop: 3, lineHeight: 1.3, color: D2_PAPER }}>{w.note}</div>
            </div>
          </Tile>
          </a>
        ))}
      </div>
    </section>
  );
}

// ── Career Skills ─────────────────────────────────────────────────────────────

const groupColors: Record<string, string> = {
  QA: D2_SOLID,
  "CI/CD": D2_POP,
  Lead: D2_WARN,
  Domain: D2_INK,
};

const skills = [
  { t: "Playwright", g: "QA" },
  { t: "Test strategy & architecture", g: "QA" },
  { t: "Automation framework design", g: "QA" },
  { t: "API & contract testing", g: "QA" },
  { t: "Performance & load testing", g: "QA" },
  { t: "AI-assisted test strategy", g: "QA" },
  { t: "GitHub Actions", g: "CI/CD" },
  { t: "Pipeline design", g: "CI/CD" },
  { t: "Release gating", g: "CI/CD" },
  { t: "Team building (0→n)", g: "Lead" },
  { t: "Technical PM", g: "Lead" },
  { t: "Hiring & mentoring", g: "Lead" },
  { t: "Release management", g: "Lead" },
  { t: "MPC & threshold crypto", g: "Domain" },
  { t: "Smart contracts", g: "Domain" },
  { t: "Blockchain (ETH · BTC · SOL)", g: "Domain" },
  { t: "Fintech custody", g: "Domain" },
  { t: "Connected TV & IPTV", g: "Domain" },
  { t: "Exchange integrations", g: "Domain" },
];

function D2CareerSkills() {
  return (
    <section
      id="skills"
      style={{
        marginTop: 20,
        paddingTop: 16,
        borderTop: `1.5px dashed ${D2_DASH}`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          marginBottom: 10,
          flexWrap: "wrap" as const,
          gap: 8,
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
          <span style={{ ...caveat, fontSize: 24, color: D2_INK }}>what I actually do →</span>
          <span style={{ ...patrickHand, fontSize: 16, color: D2_MUTED }}>
            13+ years of QE · leadership · delivery
          </span>
        </div>
        <div style={{ display: "flex", gap: 14 }}>
          {Object.entries(groupColors).map(([g, c]) => (
            <span
              key={g}
              style={{ ...monoStyle, fontSize: 10, color: D2_MUTED, letterSpacing: 1, textTransform: "uppercase" as const }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: c,
                  display: "inline-block",
                  marginRight: 4,
                  verticalAlign: "middle",
                }}
              />
              {g}
            </span>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 8 }}>
        {skills.map((s) => (
          <div
            key={s.t}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "7px 14px",
              background: D2_PAPER,
              border: `1.5px solid ${D2_INK}`,
              borderRadius: 100,
              ...patrickHand,
              fontSize: 16,
              fontWeight: 600,
              color: D2_INK,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: groupColors[s.g],
                flexShrink: 0,
              }}
            />
            {s.t}
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Contact row ───────────────────────────────────────────────────────────────

function D2Contact() {
  return (
    <section
      id="contact"
      style={{
        marginTop: 20,
        paddingTop: 16,
        borderTop: `1.5px dashed ${D2_DASH}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap" as const,
        gap: 12,
      }}
    >
      <div>
        <span style={{ ...caveat, fontSize: 24, color: D2_INK }}>get in touch →</span>
      </div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" as const }}>
        <a
          href="https://www.linkedin.com/in/james-mclaren-5baaab2b/"
          target="_blank"
          rel="noreferrer"
          style={{
            ...patrickHand,
            fontSize: 17,
            color: D2_INK,
            textDecoration: "none",
            padding: "8px 18px",
            border: `1.5px solid ${D2_INK}`,
            borderRadius: 100,
            boxShadow: `2px 2px 0 ${D2_INK}`,
            background: D2_PAPER,
          }}
        >
          LinkedIn →
        </a>
        <a
          href="https://github.com/jamesjmclaren"
          target="_blank"
          rel="noreferrer"
          style={{
            ...patrickHand,
            fontSize: 17,
            color: D2_INK,
            textDecoration: "none",
            padding: "8px 18px",
            border: `1.5px solid ${D2_INK}`,
            borderRadius: 100,
            boxShadow: `2px 2px 0 ${D2_INK}`,
            background: D2_PAPER,
          }}
        >
          GitHub →
        </a>
      </div>
      <div style={{ ...monoStyle, fontSize: 11, color: D2_MUTED }}>
        Built with Next.js, Tailwind v4 and Claude Code.
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function D2HomePage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: D2_OUTER,
        padding: "clamp(16px, 3vw, 36px)",
        ...patrickHand,
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          background: D2_PAPER,
          borderRadius: 32,
          padding: "clamp(20px, 3vw, 36px) clamp(20px, 3vw, 44px)",
          boxShadow: "0 32px 80px -20px rgba(0,0,0,0.18)",
          ...grainBg,
        }}
      >
        <D2Nav />
        <D2Hero />
        <D2ProjectsRow />
        <D2ClaudeStack />
        <D2WorkplacesRow />
        <D2CareerSkills />
        <D2Contact />
      </div>
    </div>
  );
}
