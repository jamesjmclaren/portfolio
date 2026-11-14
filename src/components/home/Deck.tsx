"use client";

import { useEffect, useRef, useState } from "react";
import type { ProjectMeta } from "@/data/projects";
import { STATUS_LABEL } from "@/components/design3/status";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const FULL_MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/** "2026-09-27" → "Sep 2026". Formatted by hand so server and client agree. */
function monthYear(iso: string, full = false) {
  const [y, m] = iso.split("-").map(Number);
  return `${(full ? FULL_MONTHS : MONTHS)[m - 1]} ${y}`;
}

const pad = (n: number) => String(n).padStart(2, "0");

/** How far back in the stack a card sits before it is hidden. */
const VISIBLE_DEPTH = 6;

interface Props {
  /** Visible projects, newest first. */
  projects: ProjectMeta[];
  onOpen: (slug: string) => void;
  /** True while the project modal is open, so arrow keys belong to it. */
  paused: boolean;
}

/** The hero: a count of everything built, and a 3D stack of the projects
 *  themselves. Next/Previous, the arrow keys or a click on a card behind
 *  brings it forward; the front card opens the project. */
export default function Deck({ projects, onOpen, paused }: Props) {
  const n = projects.length;
  const [cur, setCur] = useState(0);
  const [count, setCount] = useState(n);
  const deckRef = useRef<HTMLDivElement>(null);
  const reduced = useRef(false);

  const go = (step: number) => setCur((c) => (c + step + n) % n);

  // Count up once on load. The server renders the real number, so it is
  // correct without JavaScript and for anyone who prefers less motion.
  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced.current) return;
    let raf = 0;
    let t0: number | undefined;
    const tick = (t: number) => {
      t0 ??= t;
      const k = Math.min(1, (t - t0) / 1400);
      setCount(Math.round(n * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    setCount(0);
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [n]);

  useEffect(() => {
    if (paused) return;
    function onKey(e: KeyboardEvent) {
      const el = e.target as HTMLElement | null;
      if (el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName))) return;
      if (e.key === "ArrowRight") setCur((c) => (c + 1) % n);
      if (e.key === "ArrowLeft") setCur((c) => (c - 1 + n) % n);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paused, n]);

  function tilt(e: React.MouseEvent<HTMLDivElement>) {
    if (reduced.current || !deckRef.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    deckRef.current.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 8}deg)`;
  }

  const front = projects[cur];
  const first = projects.reduce((a, p) => ((p.started ?? "") < (a.started ?? "") ? p : a), projects[0]);
  const since = first.started ? monthYear(first.started, true) : "";

  return (
    <section id="projects" aria-labelledby="deck-heading" className="deck-hero">
      <div className="deck-copy">
        <h1 id="deck-heading" className="deck-h1">
          <span className="deck-count" aria-hidden="true">
            {count}
          </span>
          <span className="sr-only">{n} </span>
          projects designed and built since {since}.
        </h1>
        <p className="deck-intro">
          A Chrome extension, two web apps, an AI directory, a client site and a game, all designed and built by me on
          the side. By day I lead quality engineering at io.finnet.
        </p>

        <div className="deck-now" aria-live="polite">
          <p className="deck-kicker">
            {pad(cur + 1)} of {pad(n)} · {front.kind} · {front.started ? monthYear(front.started) : ""}
            {front.status !== "inactive" && <> · {STATUS_LABEL[front.status]}</>}
          </p>
          <h2 className="deck-title">
            <a
              href={`/projects/${front.slug}`}
              onClick={(e) => {
                e.preventDefault();
                onOpen(front.slug);
              }}
            >
              {front.title}
            </a>
          </h2>
          <p className="deck-line">{front.tagline}</p>
        </div>

        <div className="deck-ctrl">
          <button type="button" onClick={() => go(-1)}>
            <span aria-hidden="true">←</span> Previous
          </button>
          <button type="button" onClick={() => go(1)}>
            Next <span aria-hidden="true">→</span>
          </button>
          <a
            className="deck-open"
            href={`/projects/${front.slug}`}
            onClick={(e) => {
              e.preventDefault();
              onOpen(front.slug);
            }}
          >
            Open {front.title}
          </a>
        </div>
      </div>

      <div
        className="deck-scene"
        onMouseMove={tilt}
        onMouseLeave={() => deckRef.current && (deckRef.current.style.transform = "")}
      >
        <div className="deck-stack" ref={deckRef}>
          {projects.map((p, i) => {
            const d = (i - cur + n) % n;
            const isFront = d === 0;
            return (
              <a
                key={p.slug}
                href={`/projects/${p.slug}`}
                className="deck-card"
                aria-hidden={!isFront}
                tabIndex={isFront ? 0 : -1}
                aria-label={isFront ? `Open ${p.title}` : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  if (isFront) onOpen(p.slug);
                  else setCur(i);
                }}
                style={{
                  transform: `translate3d(calc(${d} * var(--sx)), calc(${-d} * var(--sy)), calc(${-d} * var(--sz))) rotateY(-14deg) rotateX(4deg)`,
                  opacity: d < VISIBLE_DEPTH ? 1 - d * 0.13 : 0,
                  zIndex: n - d,
                  filter: `brightness(${1 - d * 0.12})`,
                }}
              >
                {p.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.image} alt="" loading={i < 2 ? "eager" : "lazy"} />
                ) : (
                  <span className="deck-ph">{p.kind}</span>
                )}
                <span className="deck-tag">
                  {pad(i + 1)} · {p.title}
                </span>
              </a>
            );
          })}
        </div>
      </div>

      {/* Every project as a plain link too: the index under the stack, and the
          route crawlers and keyboard users can follow without the 3D layer. */}
      <nav className="deck-index" aria-label="All projects">
        <ol>
          {projects.map((p, i) => (
            <li key={p.slug}>
              <a
                href={`/projects/${p.slug}`}
                aria-current={i === cur ? "true" : undefined}
                onMouseEnter={() => setCur(i)}
                onFocus={() => setCur(i)}
                onClick={(e) => {
                  e.preventDefault();
                  onOpen(p.slug);
                }}
              >
                <span className="deck-index-n">{pad(i + 1)}</span>
                <span className="deck-index-t">{p.title}</span>
                <span className="deck-index-k">{p.kind}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </section>
  );
}
