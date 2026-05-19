"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import { projectMeta } from "@/data/projects";
import DesignSwitcher from "@/components/DesignSwitcher";
import EmailCaptcha from "@/components/EmailCaptcha";
import ProjectLogo from "@/components/design2/ProjectLogo";

// ─── Palette ─────────────────────────────────────────────────────────────────
const GRAD = "linear-gradient(135deg, #5BA8C4 0%, #7DBDC8 30%, #B89272 70%, #CC8858 100%)";
const CREAM = "#F7F2EC";
const WHITE = "#FFFFFF";
const INK = "#1A2535";
const MUTED = "#7B8898";
const TEAL = "#4A9FB5";
const R = 48; // section corner radius

// ─── Section card — sticky, slides over the previous one ─────────────────────
function SectionCard({
  id,
  zIndex,
  background,
  children,
  light = false,
  minHeight = "100vh",
}: {
  id?: string;
  zIndex: number;
  background: string;
  children: React.ReactNode;
  light?: boolean;
  minHeight?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  // Track how far this section has been scrolled through (0 = just arrived, 1 = leaving)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Gently scale down as the NEXT card slides over it
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const borderRadius = `${R}px ${R}px 0 0`;

  return (
    <section
      id={id}
      ref={ref}
      style={{
        position: "sticky",
        top: 0,
        zIndex,
        minHeight,
        background,
        borderRadius,
        // No overflow:hidden — lets tall content breathe without clipping
      }}
    >
      <motion.div style={{ scale, transformOrigin: "top center" }}>
        {children}
      </motion.div>
    </section>
  );
}

// ─── Fade-up reveal (time-based, fires once in view) ─────────────────────────
function Reveal({
  children,
  delay = 0,
  y = 50,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ─── Stagger grid ─────────────────────────────────────────────────────────────
function StaggerGrid({
  children,
  columns = 2,
  gap = 20,
}: {
  children: React.ReactNode[];
  columns?: number;
  gap?: number;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap,
      }}
    >
      {children.map((child, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 56, scale: 0.94 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}

// ─── Count-up ─────────────────────────────────────────────────────────────────
function useCountUp(end: number, durationMs = 1400, delayMs = 900) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let raf: number;
    const t = setTimeout(() => {
      let t0: number | null = null;
      const step = (ts: number) => {
        if (!t0) t0 = ts;
        const p = Math.min((ts - t0) / durationMs, 1);
        setCount(Math.round((1 - Math.pow(1 - p, 3)) * end));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, delayMs);
    return () => { clearTimeout(t); cancelAnimationFrame(raf); };
  }, [end, durationMs, delayMs]);
  return count;
}

// ─── Floating dot ─────────────────────────────────────────────────────────────
function FloatingDot({ style, delay = 0, d = 14 }: { style: React.CSSProperties; delay?: number; d?: number }) {
  return (
    <motion.div
      style={{ position: "absolute", borderRadius: "50%", background: WHITE, pointerEvents: "none", ...style }}
      animate={{ y: [0, -d, 0] }}
      transition={{ duration: 3.5 + delay * 0.6, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

// ─── Stat card ────────────────────────────────────────────────────────────────
function StatCard({ num, label, delay = 0 }: { num: string; label: string; delay?: number }) {
  const isSymbol = num === "∞";
  const hasPlus = num.endsWith("+");
  const hasPad = /^0\d/.test(num);
  const numericVal = isSymbol ? 0 : parseInt(num.replace(/\D/g, ""), 10);
  const raw = useCountUp(isSymbol ? 0 : numericVal, 1400, 900 + delay * 160);
  const display = isSymbol ? "∞" : hasPlus ? `${raw}+` : hasPad ? String(raw).padStart(2, "0") : String(raw);

  return (
    <motion.div
      initial={{ opacity: 0, x: 40, scale: 0.88 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.55 + delay * 0.15, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: "rgba(255,255,255,0.14)", backdropFilter: "blur(14px)",
        border: "1px solid rgba(255,255,255,0.24)", borderRadius: 20, padding: "18px 24px",
      }}
    >
      <div style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 38, color: WHITE, lineHeight: 1, letterSpacing: -1 }}>{display}</div>
      <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 13, color: "rgba(255,255,255,0.58)", marginTop: 4 }}>{label}</div>
    </motion.div>
  );
}

// ─── Nav ─────────────────────────────────────────────────────────────────────
function D3Nav() {
  return (
    <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "22px clamp(20px, 5vw, 64px)", position: "relative", zIndex: 10 }}>
      <motion.span
        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 18, color: WHITE, letterSpacing: -0.5 }}
      >
        James McLaren
      </motion.span>
      <motion.div
        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        style={{ display: "flex", gap: 28, alignItems: "center" }}
      >
        {["projects", "work", "contact"].map((t) => (
          <a key={t} href={`#${t}`} style={{ fontFamily: "system-ui, sans-serif", fontSize: 15, color: "rgba(255,255,255,0.75)", textDecoration: "none", fontWeight: 500 }}>{t}</a>
        ))}
        <DesignSwitcher variant="dark" />
      </motion.div>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function D3Hero() {
  const { scrollY } = useScroll();
  const rawY = useTransform(scrollY, [0, 600], [0, -80]);
  const contentY = useSpring(rawY, { stiffness: 80, damping: 20 });
  const contentOpacity = useTransform(scrollY, [0, 400], [1, 0.3]);

  return (
    <section style={{
      background: GRAD,
      borderRadius: `0 0 ${R}px ${R}px`,
      minHeight: "100vh",
      position: "relative",
      zIndex: 1,
      overflow: "hidden",
    }}>
      <FloatingDot style={{ top: "18%", left: "8%",  width: 8,  height: 8,  opacity: 0.22 }} delay={0}   d={16} />
      <FloatingDot style={{ top: "40%", left: "4%",  width: 5,  height: 5,  opacity: 0.14 }} delay={1.3} d={10} />
      <FloatingDot style={{ top: "65%", right: "6%", width: 10, height: 10, opacity: 0.18 }} delay={0.7} d={20} />
      <FloatingDot style={{ top: "25%", right:"12%", width: 6,  height: 6,  opacity: 0.20 }} delay={1.9} d={13} />
      <FloatingDot style={{ top: "75%", left: "15%", width: 7,  height: 7,  opacity: 0.15 }} delay={0.9} d={14} />

      <D3Nav />

      <motion.div style={{ y: contentY, opacity: contentOpacity, padding: "60px clamp(20px, 5vw, 64px) 120px", maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "center" }}>
        <div>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            style={{ fontFamily: "system-ui, sans-serif", fontSize: 16, color: "rgba(255,255,255,0.7)", marginBottom: 16, fontWeight: 500, letterSpacing: 0.5 }}>
            Quality Engineering · Edinburgh
          </motion.p>

          <h1 style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: "clamp(52px, 7vw, 96px)", lineHeight: 0.93, letterSpacing: -3, color: WHITE, margin: "0 0 24px" }}>
            <span style={{ display: "block" }}>
              {["Build", "quality."].map((w, i) => (
                <motion.span key={w} initial={{ opacity: 0, y: 44 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  style={{ display: "inline-block", marginRight: "0.22em" }}>{w}</motion.span>
              ))}
            </span>
            <span style={{ display: "block", color: "rgba(255,255,255,0.48)" }}>
              {["Ship", "product."].map((w, i) => (
                <motion.span key={w} initial={{ opacity: 0, y: 44 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.44 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  style={{ display: "inline-block", marginRight: "0.22em" }}>{w}</motion.span>
              ))}
            </span>
          </h1>

          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.68 }}
            style={{ fontFamily: "system-ui, sans-serif", fontSize: 18, color: "rgba(255,255,255,0.7)", maxWidth: 480, lineHeight: 1.6, marginBottom: 40 }}>
            13 years leading QA at scale — pipelines, infra, teams. Nights and weekends building real products with Claude Code.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.82 }}
            style={{ display: "flex", gap: 12, flexWrap: "wrap" as const }}>
            <a href="#projects" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 28px", borderRadius: 100, background: WHITE, color: INK, fontFamily: "system-ui, sans-serif", fontWeight: 700, fontSize: 15, textDecoration: "none" }}>
              See my work <ArrowRight size={15} />
            </a>
            <a href="#contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 28px", borderRadius: 100, background: "rgba(255,255,255,0.15)", border: "1.5px solid rgba(255,255,255,0.35)", color: WHITE, fontFamily: "system-ui, sans-serif", fontWeight: 600, fontSize: 15, textDecoration: "none" }}>
              Get in touch
            </a>
          </motion.div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, minWidth: 200 }}>
          <StatCard num="13+" label="years in QE"        delay={0} />
          <StatCard num="04"  label="live side projects" delay={1} />
          <StatCard num="∞"   label="lines with Claude"  delay={2} />
        </div>
      </motion.div>
    </section>
  );
}

// ─── Section heading ──────────────────────────────────────────────────────────
function SectionHeading({ eyebrow, title, light = false }: { eyebrow: string; title: string; light?: boolean }) {
  return (
    <Reveal delay={0.05}>
      <div style={{ marginBottom: 48 }}>
        <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase" as const, color: light ? "rgba(255,255,255,0.5)" : TEAL, marginBottom: 10 }}>{eyebrow}</p>
        <h2 style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: "clamp(32px, 4vw, 52px)", color: light ? WHITE : INK, letterSpacing: -1.5, margin: 0 }}>{title}</h2>
      </div>
    </Reveal>
  );
}

// ─── Projects ─────────────────────────────────────────────────────────────────
function D3Projects() {
  return (
    <SectionCard id="projects" zIndex={2} background={CREAM}>
      <div style={{ padding: "80px clamp(20px, 5vw, 64px)", maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeading eyebrow="side projects" title="Built nights & weekends." />
        <StaggerGrid columns={2} gap={20}>
          {projectMeta.map((p) => (
            <Link key={p.slug} href={`/projects/${p.slug}`} style={{ textDecoration: "none", display: "block" }}>
              <motion.div
                whileHover={{ y: -5, boxShadow: "0 12px 40px rgba(26,37,53,0.14)" }}
                transition={{ duration: 0.22 }}
                style={{ background: WHITE, borderRadius: 24, padding: 28, display: "grid", gridTemplateColumns: "72px 1fr", gap: 20, alignItems: "start", boxShadow: "0 2px 20px rgba(26,37,53,0.06)", cursor: "pointer" }}
              >
                <div style={{ width: 72, height: 72, borderRadius: 18, overflow: "hidden", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {(p.slug === "west-investments" || p.slug === "prempod") ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={`/logos/${p.slug}.png`}
                      alt={p.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <ProjectLogo slug={p.slug} />
                  )}
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <span style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 18, color: INK, letterSpacing: -0.5 }}>{p.title}</span>
                    {p.status === "active" && (
                      <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }}
                        style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 6px #22c55e", display: "inline-block" }} />
                    )}
                  </div>
                  <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 14, color: MUTED, lineHeight: 1.5, margin: "0 0 12px" }}>{p.tagline}</p>
                  <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 6 }}>
                    {p.stack.slice(0, 3).map((s) => (
                      <span key={s} style={{ fontFamily: "ui-monospace, monospace", fontSize: 11, padding: "3px 10px", borderRadius: 100, background: `${TEAL}18`, color: TEAL, fontWeight: 600 }}>{s}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </StaggerGrid>
      </div>
    </SectionCard>
  );
}

// ─── Work ─────────────────────────────────────────────────────────────────────
const workplaces = [
  { name: "io.finnet", role: "Head of QA",    years: "2022 – present", logo: "/logos/iofinnet.svg",  url: "https://iofinnet.com"  },
  { name: "YouView",   role: "Lead SDET",      years: "2018 – 2022",   logo: "/logos/youview.svg",   url: "https://youview.com"   },
  { name: "Accenture", role: "Test Manager",   years: "2012 – 2018",   logo: "/logos/accenture.svg", url: "https://accenture.com" },
];

function D3Work() {
  return (
    <SectionCard id="work" zIndex={3} background={GRAD} light>
      <div style={{ padding: "80px clamp(20px, 5vw, 64px)", maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeading eyebrow="experience" title="Where I've worked." light />
        <StaggerGrid columns={3} gap={20}>
          {workplaces.map((w) => (
            <motion.a key={w.name} href={w.url} target="_blank" rel="noreferrer"
              whileHover={{ y: -5, background: "rgba(255,255,255,0.22)" }} transition={{ duration: 0.22 }}
              style={{ textDecoration: "none", background: "rgba(255,255,255,0.13)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 24, padding: "36px 28px", display: "flex", flexDirection: "column", gap: 20, cursor: "pointer" }}
            >
              <div style={{ height: 40, display: "flex", alignItems: "center" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={w.logo} alt={w.name} style={{ maxHeight: 36, maxWidth: 140, objectFit: "contain", filter: "brightness(0) invert(1)" }} />
              </div>
              <div>
                <div style={{ fontFamily: "system-ui, sans-serif", fontWeight: 700, fontSize: 16, color: WHITE }}>{w.role}</div>
                <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 13, color: "rgba(255,255,255,0.55)", marginTop: 3 }}>{w.years}</div>
              </div>
            </motion.a>
          ))}
        </StaggerGrid>
      </div>
    </SectionCard>
  );
}

// ─── Stack ────────────────────────────────────────────────────────────────────
const techStack = [
  { name: "Next.js",        icon: "nextdotjs"      },
  { name: "React",          icon: "react"          },
  { name: "TypeScript",     icon: "typescript"     },
  { name: "Tailwind",       icon: "tailwindcss"    },
  { name: "Supabase",       icon: "supabase"       },
  { name: "Prisma",         icon: "prisma"         },
  { name: "PostgreSQL",     icon: "postgresql"     },
  { name: "Clerk",          icon: "clerk"          },
  { name: "Stripe",         icon: "stripe"         },
  { name: "Cloudinary",     icon: "cloudinary"     },
  { name: "Vercel",         icon: "vercel"         },
  { name: "Google Maps",    icon: "googlemaps"     },
  { name: "YouTube API",    icon: "youtube"        },
  { name: "Spotify API",    icon: "spotify"        },
  { name: "Groq",           icon: "groq"           },
  { name: "AWS Rekog.",     icon: "amazonaws"      },
  { name: "GitHub Actions", icon: "githubactions"  },
  { name: "Playwright",     icon: "playwright"     },
  { name: "Framer Motion",  icon: "framer"         },
  { name: "Express",        icon: "express"        },
  { name: "Zod",            icon: "zod"            },
];

const INK_HEX = "1A2535"; // INK without the #, for simpleicons URL

const skillGroups = [
  {
    title: "Languages",
    items: ["TypeScript", "JavaScript", "SQL", "Python", "HTML", "CSS"],
  },
  {
    title: "Frameworks & libraries",
    items: ["Next.js (App Router)", "React 19", "Tailwind v4", "Prisma", "Recharts", "Framer Motion", "Zod", "NextAuth"],
  },
  {
    title: "Infrastructure",
    items: ["Vercel", "AWS", "Supabase / Postgres", "Cloudinary", "Stripe", "Clerk / NextAuth", "GitHub Actions"],
  },
  {
    title: "QA & delivery",
    items: ["Test automation strategy", "API testing", "Release management", "SCRUM team leadership", "Cross-functional delivery", "Technical project management"],
  },
  {
    title: "Domains",
    items: ["MPC & threshold cryptography", "Smart contracts", "Blockchain (ETH, BTC, SOL, TRON, XRP)", "Exchange integrations", "Connected TV / IPTV", "Fintech & digital asset custody"],
  },
];

function SubLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontFamily: "system-ui, sans-serif",
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: 3,
      textTransform: "uppercase" as const,
      color: MUTED,
      marginBottom: 20,
    }}>
      {children}
    </p>
  );
}

function D3Stack() {
  return (
    <SectionCard zIndex={4} background={CREAM} minHeight="160vh">
      <div style={{ padding: "80px clamp(20px, 5vw, 64px) 100px", maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeading eyebrow="the stack" title="Tools & skills." />

        {/* ── Half 1: Claude Code ─────────────────────────────────────── */}
        <Reveal delay={0.05}>
          <SubLabel>Built with Claude Code</SubLabel>
        </Reveal>

        {/* Callout */}
        <Reveal delay={0.1}>
          <div style={{
            borderRadius: 20,
            border: `1.5px solid ${TEAL}30`,
            background: `linear-gradient(135deg, ${TEAL}10 0%, transparent 100%)`,
            padding: "24px 28px",
            display: "flex",
            gap: 18,
            alignItems: "flex-start",
            marginBottom: 20,
          }}>
            <div style={{
              flexShrink: 0, width: 40, height: 40, borderRadius: 11,
              background: `${TEAL}18`, display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Zap size={18} color={TEAL} />
            </div>
            <div>
              <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase" as const, color: TEAL, margin: "0 0 5px" }}>
                The unfair advantage
              </p>
              <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 14, color: MUTED, lineHeight: 1.65, margin: 0, maxWidth: 680 }}>
                Every project here — and this site itself — was spec&apos;d, scaffolded, refactored and shipped with{" "}
                <span style={{ color: INK, fontWeight: 600 }}>Claude Code</span> as the actual workflow. Not a buzzword. The output speaks for itself.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Tech pills */}
        <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 8 }}>
          {techStack.map((t, i) => (
            <motion.div key={t.name}
              initial={{ opacity: 0, scale: 0.65, y: 12 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "7px 14px", borderRadius: 100, background: WHITE, color: INK, boxShadow: "0 2px 8px rgba(26,37,53,0.08)", border: "1px solid rgba(26,37,53,0.1)", fontFamily: "ui-monospace, monospace", fontSize: 13, fontWeight: 600 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://cdn.simpleicons.org/${t.icon}/${INK_HEX}`}
                alt="" width={14} height={14}
                style={{ display: "block", flexShrink: 0 }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
              {t.name}
            </motion.div>
          ))}
        </div>

        {/* ── Divider ─────────────────────────────────────────────────── */}
        <Reveal delay={0}>
          <div style={{ margin: "56px 0 44px", height: 1, background: "rgba(26,37,53,0.09)" }} />
        </Reveal>

        {/* ── Half 2: Professional skills ─────────────────────────────── */}
        <Reveal delay={0.05}>
          <SubLabel>Professional expertise</SubLabel>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {skillGroups.map((g, i) => (
            <motion.div key={g.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              style={{ background: WHITE, borderRadius: 20, padding: "22px 24px", border: "1px solid rgba(26,37,53,0.07)", boxShadow: "0 2px 12px rgba(26,37,53,0.05)" }}
            >
              <h4 style={{ fontFamily: "system-ui, sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase" as const, color: MUTED, margin: "0 0 14px" }}>
                {g.title}
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                {g.items.map((item) => (
                  <li key={item} style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "system-ui, sans-serif", fontSize: 13, color: INK }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: TEAL, flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function D3Contact() {
  return (
    <SectionCard id="contact" zIndex={5} background={GRAD} light>
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "absolute", pointerEvents: "none", width: 700, height: 700, borderRadius: "50%", background: "rgba(255,255,255,0.07)", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
      />
      <div style={{ padding: "80px clamp(20px, 5vw, 64px) 100px", maxWidth: 640, margin: "0 auto", textAlign: "center" as const, position: "relative" }}>
        <Reveal delay={0.05}>
          <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase" as const, color: "rgba(255,255,255,0.55)", marginBottom: 16 }}>get in touch</p>
          <h2 style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: "clamp(32px, 4vw, 52px)", color: WHITE, letterSpacing: -1.5, margin: "0 0 16px" }}>Let&apos;s talk.</h2>
          <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 17, color: "rgba(255,255,255,0.65)", lineHeight: 1.6, marginBottom: 40 }}>Open to interesting roles, collaborations and conversations.</p>
          <div style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,0.22)", borderRadius: 24, padding: "32px" }}>
            <EmailCaptcha />
          </div>
        </Reveal>
      </div>
    </SectionCard>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function D3Footer() {
  return (
    <footer style={{ background: INK, padding: "32px clamp(20px, 5vw, 64px)", display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: 6 }}>
      <span style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 16, color: "rgba(255,255,255,0.6)", letterSpacing: -0.5 }}>jamesmclaren.dev</span>
      <span style={{ fontFamily: "system-ui, sans-serif", fontSize: 13, color: "rgba(255,255,255,0.3)" }}>Edinburgh · QE & builder</span>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function D3HomePage() {
  return (
    // Extra bottom padding so the last sticky section fully scrolls into place
    <div style={{ background: INK }}>
      <D3Hero />
      <D3Projects />
      <D3Work />
      <D3Stack />
      <D3Contact />
      <D3Footer />
    </div>
  );
}
