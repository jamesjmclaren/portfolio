"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import {
  Tile,
  CornerBrackets,
  Scribble,
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
import ProjectLogo from "./ProjectLogo";
import type { ProjectMeta, Scene as SceneT } from "@/data/projects";
import BrowserFrame from "@/components/project/BrowserFrame";
import type { ComponentType } from "react";

interface Props {
  project: ProjectMeta;
  scenes: SceneT[];
  others: ProjectMeta[];
}

function D2ProjectNav() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 28,
        paddingBottom: 16,
        borderBottom: `1px solid rgba(26,26,26,0.15)`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <svg width={20} height={20} viewBox="0 0 24 24">
          <rect x={3} y={3} width={18} height={18} fill="none" stroke={D2_INK} strokeWidth={2.5} transform="rotate(45 12 12)" />
        </svg>
        <span style={{ ...caveat, fontSize: 22, color: D2_INK }}>jamesmclaren.dev</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Link
          href="/#projects"
          style={{
            ...patrickHand,
            fontSize: 17,
            color: D2_MUTED,
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <ArrowLeft size={16} /> all projects
        </Link>
        <DesignSwitcher variant="light" />
      </div>
    </nav>
  );
}

export default function D2ProjectPage({ project, scenes, others }: Props) {
  const next = others[0];

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
        <D2ProjectNav />

        {/* Hero */}
        <section style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", gap: 32, alignItems: "start" }}>
            {/* Logo tile */}
            <div
              style={{
                position: "relative",
                width: 160,
                height: 160,
                borderRadius: 24,
                overflow: "hidden",
                flexShrink: 0,
                border: `2px solid ${D2_INK}`,
                boxShadow: `4px 4px 0 ${D2_INK}`,
              }}
            >
              <ProjectLogo slug={project.slug} />
            </div>

            <div style={{ flex: 1 }}>
              {/* Status + eyebrow */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <span
                  style={{
                    ...monoStyle,
                    fontSize: 10,
                    letterSpacing: 2,
                    textTransform: "uppercase" as const,
                    color: project.status === "active" ? D2_SOLID : D2_MUTED,
                    padding: "3px 10px",
                    border: `1.5px solid ${project.status === "active" ? D2_SOLID : D2_MUTED}`,
                    borderRadius: 100,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: project.status === "active" ? D2_SOLID : D2_MUTED,
                    }}
                  />
                  {project.status}
                </span>
              </div>

              <h1
                style={{
                  ...archivoBlack,
                  fontSize: "clamp(40px, 5vw, 72px)",
                  lineHeight: 0.92,
                  letterSpacing: -2,
                  color: D2_INK,
                  margin: "0 0 8px",
                }}
              >
                {project.title}
              </h1>
              <Scribble width={320} style={{ marginBottom: 12 }} />
              <p
                style={{
                  ...patrickHand,
                  fontSize: 20,
                  color: D2_MUTED,
                  maxWidth: 600,
                  lineHeight: 1.4,
                  margin: "0 0 20px",
                }}
              >
                {project.tagline}
              </p>

              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    ...patrickHand,
                    fontSize: 17,
                    fontWeight: 700,
                    color: D2_PAPER,
                    background: D2_INK,
                    padding: "10px 22px",
                    borderRadius: 100,
                    textDecoration: "none",
                    boxShadow: `3px 3px 0 ${D2_SOLID}`,
                  }}
                >
                  Visit live site <ExternalLink size={15} />
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Pitch */}
        <section
          style={{
            marginBottom: 40,
            paddingTop: 24,
            borderTop: `1.5px dashed ${D2_DASH}`,
          }}
        >
          <div style={{ ...monoStyle, fontSize: 10, letterSpacing: 3, textTransform: "uppercase" as const, color: D2_MUTED, marginBottom: 12 }}>
            · the pitch ·
          </div>
          <p
            style={{
              ...patrickHand,
              fontSize: 20,
              color: D2_INK,
              maxWidth: 800,
              lineHeight: 1.5,
            }}
          >
            {project.longPitch}
          </p>
        </section>

        {/* Features */}
        {project.features && project.features.length > 0 && (
          <section
            style={{
              marginBottom: 40,
              paddingTop: 24,
              borderTop: `1.5px dashed ${D2_DASH}`,
            }}
          >
            <div style={{ ...monoStyle, fontSize: 10, letterSpacing: 3, textTransform: "uppercase" as const, color: D2_MUTED, marginBottom: 12 }}>
              · features ·
            </div>
            <h3 style={{ ...caveat, fontSize: 28, color: D2_INK, margin: "0 0 16px" }}>
              What it does.
            </h3>
            <ul style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "8px 24px", listStyle: "none", padding: 0, margin: 0 }}>
              {project.features.map((f) => (
                <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 10, ...patrickHand, fontSize: 15, color: D2_MUTED, lineHeight: 1.4 }}>
                  <span style={{ marginTop: 6, width: 6, height: 6, borderRadius: "50%", background: D2_SOLID, flexShrink: 0 }} />
                  {f}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Scenes */}
        {scenes.map((s, i) => (
          <section
            key={s.number}
            style={{
              marginBottom: 48,
              paddingTop: 24,
              borderTop: `1.5px dashed ${D2_DASH}`,
            }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2.5fr", gap: 32, alignItems: "start" }}>
              <div>
                <div
                  style={{
                    ...archivoBlack,
                    fontSize: 64,
                    lineHeight: 0.9,
                    color: D2_SOFT,
                    marginBottom: 8,
                  }}
                >
                  {s.number}
                </div>
                <div style={{ ...monoStyle, fontSize: 10, letterSpacing: 2, textTransform: "uppercase" as const, color: D2_MUTED, marginBottom: 4 }}>
                  {s.eyebrow}
                </div>
                <h3
                  style={{
                    ...caveat,
                    fontSize: 28,
                    color: D2_INK,
                    margin: "0 0 8px",
                    lineHeight: 1.1,
                  }}
                >
                  {s.title}
                </h3>
                <p style={{ ...patrickHand, fontSize: 16, color: D2_MUTED, lineHeight: 1.4, margin: "0 0 12px" }}>
                  {s.blurb}
                </p>
                {s.features && (
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {s.features.map((f) => (
                      <li key={f} style={{ display: "flex", gap: 8, ...patrickHand, fontSize: 15, color: D2_MUTED, marginBottom: 4 }}>
                        <span style={{ color: D2_SOLID }}>·</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <BrowserFrame url={s.url} behindLogin={s.behindLogin} height={s.height ?? "580px"}>
                  <s.Component />
                </BrowserFrame>
              </div>
            </div>
          </section>
        ))}

        {/* Stack */}
        <section
          style={{
            marginBottom: 40,
            paddingTop: 24,
            borderTop: `1.5px dashed ${D2_DASH}`,
          }}
        >
          <div style={{ ...monoStyle, fontSize: 10, letterSpacing: 3, textTransform: "uppercase" as const, color: D2_MUTED, marginBottom: 12 }}>
            · stack ·
          </div>
          <h3 style={{ ...caveat, fontSize: 28, color: D2_INK, margin: "0 0 16px" }}>
            What it runs on.
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 8 }}>
            {project.stack.map((s) => (
              <span
                key={s}
                style={{
                  ...monoStyle,
                  fontSize: 13,
                  padding: "6px 14px",
                  border: `1.5px solid ${D2_INK}`,
                  borderRadius: 8,
                  background: D2_PAPER,
                  boxShadow: `2px 2px 0 ${D2_INK}`,
                  color: D2_INK,
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </section>

        {/* Next project */}
        {next && (
          <section style={{ paddingTop: 24, borderTop: `1.5px dashed ${D2_DASH}` }}>
            <div style={{ ...monoStyle, fontSize: 10, letterSpacing: 3, textTransform: "uppercase" as const, color: D2_MUTED, marginBottom: 12 }}>
              · next ·
            </div>
            <Link href={`/projects/${next.slug}`} style={{ textDecoration: "none" }}>
              <Tile
                bg={D2_INK}
                bracketColor={D2_SOFT}
                style={{
                  padding: 24,
                  display: "grid",
                  gridTemplateColumns: "auto 1fr",
                  gap: 20,
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <div style={{ width: 80, height: 80, borderRadius: 16, overflow: "hidden", flexShrink: 0 }}>
                  <ProjectLogo slug={next.slug} />
                </div>
                <div>
                  <div style={{ ...monoStyle, fontSize: 10, letterSpacing: 2, color: D2_MUTED, marginBottom: 4 }}>
                    NEXT PROJECT
                  </div>
                  <div style={{ ...archivoBlack, fontSize: 28, color: D2_PAPER, lineHeight: 1 }}>{next.title}</div>
                  <div style={{ ...patrickHand, fontSize: 16, color: D2_MUTED, marginTop: 4 }}>{next.tagline}</div>
                </div>
              </Tile>
            </Link>
          </section>
        )}
      </div>
    </div>
  );
}
