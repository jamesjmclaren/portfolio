"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import DesignSwitcher from "@/components/DesignSwitcher";
import ProjectLogo from "@/components/design2/ProjectLogo";
import BrowserFrame from "@/components/project/BrowserFrame";
import type { ProjectMeta, Scene as SceneT } from "@/data/projects";

// ─── Palette (mirrors D3HomePage) ────────────────────────────────────────────
const GRAD  = "linear-gradient(135deg, #5BA8C4 0%, #7DBDC8 30%, #B89272 70%, #CC8858 100%)";
const CREAM = "#F7F2EC";
const WHITE = "#FFFFFF";
const INK   = "#1A2535";
const MUTED = "#7B8898";
const TEAL  = "#4A9FB5";
const INK_HEX = "1A2535";
const R = 32;

interface Props {
  project: ProjectMeta;
  scenes: SceneT[];
  others: ProjectMeta[];
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
function D3ProjectNav() {
  return (
    <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px clamp(20px, 5vw, 64px)", position: "relative", zIndex: 10 }}>
      <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45 }}>
        <Link href="/#projects" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "system-ui, sans-serif", fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.8)", textDecoration: "none" }}>
          <ArrowLeft size={15} /> All projects
        </Link>
      </motion.div>
      <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45 }} style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <span style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 17, color: WHITE, letterSpacing: -0.5 }}>James McLaren</span>
        <DesignSwitcher variant="dark" />
      </motion.div>
    </nav>
  );
}

// ─── Fade-up reveal ───────────────────────────────────────────────────────────
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Section({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section style={{ padding: "64px clamp(20px, 5vw, 64px)", maxWidth: 1200, margin: "0 auto" }}>
      <Reveal>
        <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase" as const, color: TEAL, marginBottom: 8 }}>{eyebrow}</p>
        <h2 style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: "clamp(28px, 3.5vw, 44px)", color: INK, letterSpacing: -1.5, margin: "0 0 32px" }}>{title}</h2>
      </Reveal>
      {children}
    </section>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function D3ProjectPage({ project, scenes, others }: Props) {
  const next = others[0];

  return (
    <div style={{ background: CREAM, minHeight: "100vh" }}>

      {/* ── Hero ── */}
      <div style={{ background: GRAD, borderRadius: `0 0 ${R}px ${R}px`, overflow: "hidden", position: "relative" }}>
        <D3ProjectNav />
        <div style={{ padding: "40px clamp(20px, 5vw, 64px) 64px", maxWidth: 1200, margin: "0 auto", display: "flex", gap: 40, alignItems: "flex-start" }}>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: 100, height: 100, borderRadius: 24, overflow: "hidden", flexShrink: 0, background: "rgba(255,255,255,0.15)", border: "1.5px solid rgba(255,255,255,0.25)" }}
          >
            {(project.slug === "west-investments" || project.slug === "prempod") ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={`/logos/${project.slug}.png`} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <ProjectLogo slug={project.slug} />
            )}
          </motion.div>

          {/* Title block */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}
            >
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                fontFamily: "ui-monospace, monospace", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" as const,
                color: project.status === "active" ? "#22c55e" : "rgba(255,255,255,0.5)",
                padding: "4px 12px", borderRadius: 100,
                border: `1.5px solid ${project.status === "active" ? "#22c55e" : "rgba(255,255,255,0.3)"}`,
              }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: project.status === "active" ? "#22c55e" : "rgba(255,255,255,0.4)" }} />
                {project.status}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: "clamp(36px, 5vw, 72px)", lineHeight: 0.93, letterSpacing: -2, color: WHITE, margin: "0 0 14px" }}
            >
              {project.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3 }}
              style={{ fontFamily: "system-ui, sans-serif", fontSize: 17, color: "rgba(255,255,255,0.7)", maxWidth: 560, lineHeight: 1.55, marginBottom: 24 }}
            >
              {project.tagline}
            </motion.p>

            {project.url && (
              <motion.a
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.4 }}
                href={project.url} target="_blank" rel="noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 24px", borderRadius: 100, background: WHITE, color: INK, fontFamily: "system-ui, sans-serif", fontWeight: 700, fontSize: 14, textDecoration: "none" }}
              >
                Visit live site <ExternalLink size={13} />
              </motion.a>
            )}
          </div>
        </div>
      </div>

      {/* ── Pitch ── */}
      <Section eyebrow="The pitch" title="What it is.">
        <Reveal delay={0.05}>
          <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 18, color: MUTED, lineHeight: 1.7, maxWidth: 760 }}>{project.longPitch}</p>
        </Reveal>
      </Section>

      {/* ── Scenes ── */}
      {scenes.map((s, i) => (
        <section key={s.number} style={{ background: i % 2 === 0 ? WHITE : CREAM, borderRadius: R, margin: "0 clamp(12px, 2vw, 32px) 24px", overflow: "hidden" }}>
          <div style={{ padding: "56px clamp(20px, 5vw, 64px)", maxWidth: 1200, margin: "0 auto" }}>
            <Reveal>
              <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 48, alignItems: "start" }}>
                <div>
                  <div style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 72, lineHeight: 0.9, color: `${TEAL}22`, marginBottom: 12 }}>{s.number}</div>
                  <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase" as const, color: TEAL, marginBottom: 6 }}>{s.eyebrow}</p>
                  <h3 style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: "clamp(20px, 2.5vw, 28px)", color: INK, letterSpacing: -0.8, margin: "0 0 10px" }}>{s.title}</h3>
                  <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 15, color: MUTED, lineHeight: 1.6, marginBottom: 16 }}>{s.blurb}</p>
                  {s.features && (
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 6 }}>
                      {s.features.map((f) => (
                        <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontFamily: "system-ui, sans-serif", fontSize: 13, color: MUTED }}>
                          <span style={{ width: 5, height: 5, borderRadius: "50%", background: TEAL, marginTop: 5, flexShrink: 0 }} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <BrowserFrame url={s.url} behindLogin={s.behindLogin} height={s.height ?? "580px"}>
                  <s.Component />
                </BrowserFrame>
              </div>
            </Reveal>
          </div>
        </section>
      ))}

      {/* ── Features ── */}
      {project.features && project.features.length > 0 && (
        <Section eyebrow="Features" title="What it does.">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "10px 32px" }}>
            {project.features.map((f, i) => (
              <Reveal key={f} delay={i * 0.03}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 10, fontFamily: "system-ui, sans-serif", fontSize: 14, color: MUTED, lineHeight: 1.5 }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: TEAL, marginTop: 6, flexShrink: 0 }} />
                  {f}
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* ── Stack ── */}
      <Section eyebrow="Stack" title="What it runs on.">
        <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 8 }}>
          {project.stack.map((s, i) => (
            <Reveal key={s} delay={i * 0.04}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "7px 14px", borderRadius: 100, background: WHITE, color: INK, boxShadow: "0 2px 8px rgba(26,37,53,0.08)", border: "1px solid rgba(26,37,53,0.1)", fontFamily: "ui-monospace, monospace", fontSize: 13, fontWeight: 600 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://cdn.simpleicons.org/${s.toLowerCase().replace(/[\s.+]/g, "")}/${INK_HEX}`}
                  alt="" width={14} height={14}
                  style={{ display: "block", flexShrink: 0 }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
                {s}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── Next project ── */}
      {next && (
        <section style={{ padding: "0 clamp(20px, 5vw, 64px) 80px", maxWidth: 1200, margin: "0 auto" }}>
          <Reveal>
            <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase" as const, color: TEAL, marginBottom: 16 }}>Next project</p>
            <Link href={`/projects/${next.slug}`} style={{ textDecoration: "none", display: "block" }}>
              <motion.div
                whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(26,37,53,0.14)" }}
                transition={{ duration: 0.2 }}
                style={{ background: GRAD, borderRadius: 24, padding: "28px 32px", display: "flex", alignItems: "center", gap: 24, boxShadow: "0 4px 20px rgba(26,37,53,0.1)", cursor: "pointer" }}
              >
                <div style={{ width: 64, height: 64, borderRadius: 16, overflow: "hidden", flexShrink: 0, background: "rgba(255,255,255,0.15)" }}>
                  {(next.slug === "west-investments" || next.slug === "prempod") ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={`/logos/${next.slug}.png`} alt={next.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <ProjectLogo slug={next.slug} />
                  )}
                </div>
                <div>
                  <div style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: "clamp(22px, 3vw, 32px)", color: WHITE, letterSpacing: -0.8, lineHeight: 1 }}>{next.title}</div>
                  <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 14, color: "rgba(255,255,255,0.65)", marginTop: 6 }}>{next.tagline}</div>
                </div>
              </motion.div>
            </Link>
          </Reveal>
        </section>
      )}

    </div>
  );
}
