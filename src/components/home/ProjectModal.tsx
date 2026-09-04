"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import ProjectLogo from "@/components/ProjectLogo";
import BrowserFrame from "@/components/project/BrowserFrame";
import type { ProjectMeta, Scene } from "@/data/projects";
import { STATUS_COLOR, STATUS_LABEL } from "@/components/design3/status";
import {
  ACCENT,
  BACKDROP,
  BODY,
  DISPLAY,
  IMAGE_BG,
  INK,
  LINE,
  LINE_STRONG,
  MONO,
  MUTED,
  PAGE,
  SANS,
  tagPill,
  WHITE,
} from "./theme";

/** Interactive demos are the heaviest thing on the site, so each project's
 *  scene module is fetched only once its modal opens. */
const SCENE_LOADERS: Record<string, () => Promise<Scene[]>> = {
  "west-investments": () => import("@/projects/west/scenes").then((m) => m.westScenes),
  prempod: () => import("@/projects/prempod/scenes").then((m) => m.prempodScenes),
  burgerlist: () => import("@/projects/burgerlist/scenes").then((m) => m.burgerlistScenes),
  categorais: () => import("@/projects/categorais/scenes").then((m) => m.categoraisScenes),
};

/** Projects whose mark is a bitmap in public/logos rather than an inline SVG. */
const LOGO_IMAGES: Record<string, { fit: "cover" | "contain"; background?: string; padding?: number }> = {
  "west-investments": { fit: "contain", background: "#111114", padding: 6 },
  prempod: { fit: "contain", background: "#0E1116", padding: 6 },
  "sids-sleepovers": { fit: "contain", background: "#FFF6E9", padding: 6 },
};

function useScenes(slug: string): Scene[] {
  const [scenes, setScenes] = useState<Scene[]>([]);

  useEffect(() => {
    let cancelled = false;
    setScenes([]);
    const load = SCENE_LOADERS[slug];
    if (load) load().then((s) => !cancelled && setScenes(s));
    return () => {
      cancelled = true;
    };
  }, [slug]);

  return scenes;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: MONO,
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: 2,
        textTransform: "uppercase",
        color: MUTED,
        margin: "0 0 14px",
      }}
    >
      {children}
    </p>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li style={{ display: "flex", gap: 10, fontFamily: SANS, fontSize: 14, lineHeight: 1.55, color: BODY }}>
      <span
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: ACCENT,
          marginTop: 8,
          flexShrink: 0,
        }}
      />
      {children}
    </li>
  );
}

interface Props {
  project: ProjectMeta;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: Props) {
  const scenes = useScenes(project.slug);
  const statusColor = STATUS_COLOR[project.status];
  const logo = LOGO_IMAGES[project.slug];

  useEffect(() => {
    document.body.classList.add("modal-open");
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: BACKDROP,
        overflowY: "auto",
        padding: "clamp(12px, 3vw, 32px)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: PAGE,
          borderRadius: 24,
          maxWidth: 1040,
          width: "100%",
          margin: "auto",
          position: "relative",
          boxShadow: "0 30px 80px rgba(10,12,16,0.35)",
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: WHITE,
            border: `1px solid ${LINE}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 2,
            color: INK,
          }}
        >
          <X size={17} />
        </button>

        {project.image && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image}
              alt={project.title}
              style={{
                width: "100%",
                display: "block",
                borderRadius: "24px 24px 0 0",
                aspectRatio: "16 / 9",
                objectFit: project.imageFit ?? "cover",
                objectPosition: "top",
                padding: project.imageFit === "contain" ? 18 : 0,
                background: IMAGE_BG,
              }}
            />
            {project.imageCaption && (
              <p
                style={{
                  fontFamily: MONO,
                  fontSize: 12,
                  color: MUTED,
                  margin: 0,
                  padding: "10px clamp(20px, 4vw, 36px) 0",
                }}
              >
                {project.imageCaption}
              </p>
            )}
          </>
        )}

        <div style={{ padding: "clamp(24px, 4vw, 36px) clamp(20px, 4vw, 36px) 40px" }}>
          {/* Title row */}
          <div style={{ display: "flex", gap: 16, alignItems: "flex-start", paddingRight: 44 }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                overflow: "hidden",
                flexShrink: 0,
                border: `1px solid ${LINE}`,
                background: logo?.background ?? WHITE,
              }}
            >
              {logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`/logos/${project.slug}.png`}
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: logo.fit, padding: logo.padding }}
                />
              ) : (
                <ProjectLogo slug={project.slug} />
              )}
            </div>

            <div style={{ minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 6 }}>
                <h2
                  style={{
                    fontFamily: DISPLAY,
                    fontWeight: 700,
                    fontSize: "clamp(24px, 3.4vw, 30px)",
                    letterSpacing: -0.6,
                    margin: 0,
                    color: INK,
                  }}
                >
                  {project.title}
                </h2>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    fontFamily: MONO,
                    fontSize: 11,
                    color: statusColor ?? MUTED,
                    border: `1px solid ${statusColor ?? LINE_STRONG}`,
                    borderRadius: 100,
                    padding: "2px 10px",
                  }}
                >
                  {statusColor && (
                    <span
                      style={{ width: 6, height: 6, borderRadius: "50%", background: statusColor }}
                    />
                  )}
                  {STATUS_LABEL[project.status]}
                </span>
              </div>
              <p style={{ fontFamily: SANS, fontSize: 15, lineHeight: 1.55, color: MUTED, margin: 0 }}>
                {project.tagline}
              </p>
            </div>
          </div>

          {/* Links */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", margin: "24px 0 28px" }}>
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                style={{
                  textDecoration: "none",
                  padding: "10px 20px",
                  borderRadius: 100,
                  background: ACCENT,
                  color: WHITE,
                  fontFamily: MONO,
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                Live site →
              </a>
            )}
            <a
              href={`https://github.com/${project.repo}`}
              target="_blank"
              rel="noreferrer"
              style={{
                textDecoration: "none",
                padding: "10px 20px",
                borderRadius: 100,
                background: WHITE,
                border: `1px solid ${LINE_STRONG}`,
                color: INK,
                fontFamily: MONO,
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              GitHub repo →
            </a>
          </div>

          {/* Pitch */}
          <SectionLabel>The pitch</SectionLabel>
          <p style={{ fontFamily: SANS, fontSize: 15.5, lineHeight: 1.7, color: BODY, margin: "0 0 32px" }}>
            {project.longPitch}
          </p>

          {/* Stack */}
          <SectionLabel>Stack</SectionLabel>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
            {project.stack.map((s) => (
              <span key={s} style={tagPill(12)}>
                {s}
              </span>
            ))}
          </div>

          {/* Features */}
          {project.features && project.features.length > 0 && (
            <>
              <SectionLabel>What it does</SectionLabel>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "0 0 36px",
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                  gap: "10px 28px",
                }}
              >
                {project.features.map((f) => (
                  <Bullet key={f}>{f}</Bullet>
                ))}
              </ul>
            </>
          )}

          {/* Live demos */}
          {scenes.length > 0 && (
            <>
              <SectionLabel>Try it — demos running on mock data</SectionLabel>
              <div style={{ display: "flex", flexDirection: "column", gap: 32, marginBottom: 36 }}>
                {scenes.map((s) => (
                  <div key={s.number}>
                    <div style={{ marginBottom: 14 }}>
                      <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: ACCENT }}>
                        {s.number} · {s.eyebrow}
                      </span>
                      <h3
                        style={{
                          fontFamily: DISPLAY,
                          fontWeight: 600,
                          fontSize: 19,
                          letterSpacing: -0.3,
                          color: INK,
                          margin: "6px 0 6px",
                        }}
                      >
                        {s.title}
                      </h3>
                      <p style={{ fontFamily: SANS, fontSize: 14, lineHeight: 1.6, color: MUTED, margin: 0, maxWidth: 720 }}>
                        {s.blurb}
                      </p>
                    </div>
                    <BrowserFrame url={s.url} behindLogin={s.behindLogin} height={s.height ?? "520px"}>
                      <s.Component />
                    </BrowserFrame>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <>
              <SectionLabel>Screens</SectionLabel>
              {project.galleryNote && (
                <p style={{ fontFamily: SANS, fontSize: 14.5, lineHeight: 1.65, color: BODY, margin: "-6px 0 20px", maxWidth: 720 }}>
                  {project.galleryNote}
                </p>
              )}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                  gap: 22,
                }}
              >
                {project.gallery.map((shot) => (
                  <figure key={shot.src} style={{ margin: 0 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={shot.src}
                      alt={shot.title}
                      loading="lazy"
                      style={{
                        width: "100%",
                        aspectRatio: "16 / 9",
                        objectFit: "cover",
                        borderRadius: 12,
                        display: "block",
                        background: IMAGE_BG,
                        border: `1px solid ${LINE}`,
                      }}
                    />
                    <figcaption style={{ marginTop: 8 }}>
                      <span style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 14, color: INK }}>
                        {shot.title}
                      </span>
                      <p style={{ fontFamily: SANS, fontSize: 13, lineHeight: 1.5, color: MUTED, margin: "2px 0 0" }}>
                        {shot.caption}
                      </p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
