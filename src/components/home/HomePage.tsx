"use client";

import { useCallback, useEffect, useState } from "react";
import { jobs, profile } from "@/data/about";
import { getProject, projectMeta } from "@/data/projects";
import AskAboutMe from "./AskAboutMe";
import EmailReveal from "./EmailReveal";
import Deck from "./Deck";
import ProjectModal from "./ProjectModal";
import { ACCENT, BODY, DISPLAY, eyebrow, INK, LINE, MONO, MUTED, ON_ACCENT, SANS, SURFACE, tagPill } from "./theme";

/** Projects on the deck: everything not hidden, newest first. */
const deckProjects = projectMeta
  .filter((p) => !p.hidden)
  .sort((a, b) => (b.started ?? "").localeCompare(a.started ?? ""));

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden style={{ flexShrink: 0 }}>
      <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.26 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden style={{ flexShrink: 0 }}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.44-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden
      style={{ flexShrink: 0 }}
    >
      <path d="M12 3v12" />
      <path d="M7 10l5 5 5-5" />
      <path d="M4 20h16" />
    </svg>
  );
}

const pillStyle = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: "12px 20px",
  borderRadius: 12,
  background: SURFACE,
  border: `1px solid ${LINE}`,
  textDecoration: "none",
  fontFamily: MONO,
  fontSize: 13,
  fontWeight: 500,
  color: INK,
};

interface Props {
  /** Set when the page is entered at /projects/<slug> — opens that modal immediately. */
  initialSlug?: string;
}

export default function HomePage({ initialSlug }: Props) {
  const [activeSlug, setActiveSlug] = useState<string | null>(initialSlug ?? null);
  const [order, setOrder] = useState<"newest" | "oldest">("newest");

  /** Each project keeps its own URL, so a modal can be linked to and shared. */
  const openProject = useCallback((slug: string) => {
    setActiveSlug(slug);
    window.history.pushState({ slug }, "", `/projects/${slug}`);
  }, []);

  const closeProject = useCallback(() => {
    setActiveSlug(null);
    window.history.pushState({}, "", "/");
  }, []);

  useEffect(() => {
    function onPopState() {
      const match = window.location.pathname.match(/^\/projects\/([^/]+)/);
      setActiveSlug(match ? match[1] : null);
    }
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const activeProject = activeSlug ? getProject(activeSlug) : undefined;
  const orderedJobs = order === "newest" ? jobs : [...jobs].reverse();

  return (
    <>
      <header className="site-bar">
        <a href="/" aria-label={`${profile.name}, home`}>
          {profile.name}
        </a>
        <nav aria-label="Sections">
          <ul>
            <li>
              <a href="#projects">Projects</a>
            </li>
            <li>
              <a href="#experience">Experience</a>
            </li>
            <li>
              <a href="#ask">Ask</a>
            </li>
            <li>
              <a href={profile.cv} download>
                CV
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <Deck projects={deckProjects} onOpen={openProject} paused={!!activeProject} />

        {/* ── Who am I ────────────────────────────────────────────────────── */}
        <section
          id="about"
          aria-labelledby="about-heading"
          style={{ maxWidth: 880, margin: "0 auto", padding: "0 clamp(20px, 5vw, 32px) 96px" }}
        >
          <p style={{ ...eyebrow, marginBottom: 12 }}>{profile.eyebrow}</p>
          <h2
            id="about-heading"
            style={{
              fontFamily: DISPLAY,
              fontWeight: 760,
              fontSize: "clamp(26px, 3.6vw, 38px)",
              lineHeight: 1.05,
              letterSpacing: -1,
              margin: "0 0 20px",
              color: INK,
            }}
          >
            {profile.name}
          </h2>
          <p
            style={{ fontFamily: SANS, fontSize: 18, lineHeight: 1.65, color: BODY, maxWidth: 660, margin: "0 0 18px" }}
          >
            {profile.blurb}
          </p>
          <p
            style={{
              fontFamily: MONO,
              fontSize: 13,
              letterSpacing: 0.5,
              color: MUTED,
              margin: "0 0 32px",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span
              aria-hidden="true"
              style={{ width: 6, height: 6, borderRadius: "50%", background: ACCENT, display: "inline-block" }}
            />
            {profile.location}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "stretch" }}>
            <a
              className="solid-link"
              href={profile.cv}
              download
              style={{ ...pillStyle, background: ACCENT, color: ON_ACCENT, border: "none", fontWeight: 600 }}
            >
              <DownloadIcon />
              Download CV
            </a>
            <a className="pill-link" href={profile.github} target="_blank" rel="noreferrer" style={pillStyle}>
              <GithubIcon />
              GitHub
            </a>
            <a className="pill-link" href={profile.linkedin} target="_blank" rel="noreferrer" style={pillStyle}>
              <LinkedInIcon />
              LinkedIn
            </a>
            <EmailReveal />
          </div>
        </section>

        {/* ── Ask about me ────────────────────────────────────────────────── */}
        <AskAboutMe />

        {/* ── Employment history ──────────────────────────────────────────── */}
        <section
          id="experience"
          aria-labelledby="experience-heading"
          style={{ maxWidth: 880, margin: "0 auto", padding: "0 clamp(20px, 5vw, 32px) 120px" }}
        >
          <p style={{ ...eyebrow, marginBottom: 12 }}>Experience</p>
          <h2
            id="experience-heading"
            style={{
              fontFamily: DISPLAY,
              fontWeight: 760,
              fontSize: "clamp(26px, 3.6vw, 38px)",
              letterSpacing: -1,
              margin: "0 0 8px",
              color: INK,
            }}
          >
            Employment history
          </h2>
          <button
            type="button"
            onClick={() => setOrder((o) => (o === "newest" ? "oldest" : "newest"))}
            className="text-link"
            style={{
              fontFamily: MONO,
              fontSize: 12,
              color: MUTED,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              marginBottom: 32,
              textDecoration: "underline",
            }}
          >
            sort: {order} first
          </button>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {orderedJobs.map((j) => (
              <a
                key={`${j.company}-${j.role}`}
                className="job-row"
                href={j.url}
                target="_blank"
                rel="noreferrer"
                title={`${j.company} — opens ${new URL(j.url).hostname}`}
                style={{
                  padding: "20px 16px",
                  margin: "0 -16px",
                  borderBottom: `1px solid ${LINE}`,
                  borderRadius: 12,
                  textDecoration: "none",
                  color: INK,
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 12,
                    background: j.darkChip ? "#1A2535" : "#FFFFFF",
                    border: `1px solid ${LINE}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 10,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={j.logo} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                </div>

                <div style={{ minWidth: 0 }}>
                  <div
                    className="job-role"
                    style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 16, marginBottom: 3 }}
                  >
                    {j.role}
                  </div>
                  <div style={{ fontFamily: SANS, fontSize: 14, color: MUTED, marginBottom: 12 }}>
                    {j.company} <span aria-hidden="true">↗</span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {j.skills.map((s) => (
                      <span key={s} style={tagPill()}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div
                  className="job-years"
                  style={{ fontFamily: MONO, fontSize: 13, color: MUTED, whiteSpace: "nowrap", paddingTop: 2 }}
                >
                  {j.years}
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer
        style={{
          borderTop: `1px solid ${LINE}`,
          padding: "28px clamp(20px, 5vw, 32px)",
          textAlign: "center",
          fontFamily: MONO,
          fontSize: 12,
          color: MUTED,
        }}
      >
        Designed and built by {profile.name}, with Claude Code ·{" "}
        <a href="#projects" className="text-link">
          Projects
        </a>{" "}
        ·{" "}
        <a href="#experience" className="text-link">
          Experience
        </a>{" "}
        ·{" "}
        <a href={profile.github} className="text-link" target="_blank" rel="noreferrer">
          GitHub
        </a>
      </footer>

      {activeProject && <ProjectModal project={activeProject} onClose={closeProject} />}
    </>
  );
}
