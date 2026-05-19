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

// ─── Dot-grid wave canvas (Option G) ─────────────────────────────────────────
function DotGridCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const SPACING  = 24;
    const AMP      = 5.5;
    const SPEED    = 0.019;
    const WX       = 0.017;
    const WY       = 0.021;
    let t = 0;

    const draw = () => {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      const cols = Math.ceil(W / SPACING) + 1;
      const rows = Math.ceil(H / SPACING) + 1;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const bx = c * SPACING;
          const by = r * SPACING;
          const wave = Math.sin(bx * WX + by * WY + t);
          const y    = by + wave * AMP;
          const norm = (wave + 1) / 2;          // 0..1
          const alpha  = 0.14 + norm * 0.22;
          const radius = 1.3 + norm * 0.9;
          ctx.beginPath();
          ctx.arc(bx, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${alpha})`;
          ctx.fill();
        }
      }

      t += SPEED;
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, []);

  return (
    <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.55 }} />
  );
}

// ─── Scramble text hook (Option F) ───────────────────────────────────────────
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@!$%";

function useScramble(finalText: string, startDelay = 300) {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    let revealed = 0;
    let itvl: ReturnType<typeof setInterval>;
    const timer = setTimeout(() => {
      itvl = setInterval(() => {
        let out = "";
        for (let i = 0; i < finalText.length; i++) {
          const ch = finalText[i];
          if (ch === " " || ch === "." || ch === "," || ch === ":") { out += ch; continue; }
          out += i < revealed ? ch : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }
        setDisplay(out);
        if (Math.random() < 0.22) revealed++;
        if (revealed >= finalText.length) { clearInterval(itvl); setDisplay(finalText); }
      }, 42);
    }, startDelay);

    return () => { clearTimeout(timer); clearInterval(itvl); };
  }, [finalText, startDelay]);

  return display || finalText.replace(/[^\s.,: ]/g, " ");
}

// ─── Developer illustration (Option D) ───────────────────────────────────────
function DevIllustration() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0,  scale: 1 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{ width: 260, pointerEvents: "none", position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", zIndex: 1 }}
    >
      <svg viewBox="0 0 160 240" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto" }}>
        {/* Shadow */}
        <ellipse cx="80" cy="220" rx="48" ry="12" fill="rgba(0,0,0,0.18)" />
        {/* Chair legs */}
        <rect x="48" y="158" width="6" height="50" rx="3" fill="rgba(255,255,255,0.2)" />
        <rect x="106" y="158" width="6" height="50" rx="3" fill="rgba(255,255,255,0.2)" />
        <rect x="42" y="195" width="76" height="8" rx="4" fill="rgba(255,255,255,0.2)" />
        {/* Chair seat */}
        <rect x="45" y="150" width="70" height="8" rx="4" fill="rgba(255,255,255,0.28)" />
        {/* Torso */}
        <rect x="62" y="108" width="36" height="44" rx="10" fill="rgba(255,255,255,0.88)" />
        {/* Arms */}
        <rect x="44" y="112" width="20" height="10" rx="5" fill="rgba(255,255,255,0.72)" />
        <rect x="96" y="112" width="20" height="10" rx="5" fill="rgba(255,255,255,0.72)" />
        {/* Hands */}
        <ellipse cx="55" cy="146" rx="8" ry="6" fill="#f5d0b0" />
        <ellipse cx="105" cy="146" rx="8" ry="6" fill="#f5d0b0" />
        {/* Laptop body */}
        <rect x="48" y="140" width="64" height="40" rx="6" fill="#1a2535" />
        <rect x="50" y="142" width="60" height="36" rx="5" fill="#0d1421" />
        {/* Screen code lines */}
        <rect x="54" y="146" width="30" height="3" rx="1.5" fill="#4A9FB5" opacity=".85" />
        <rect x="54" y="151" width="22" height="2" rx="1" fill="#22c55e" opacity=".75" />
        <rect x="54" y="155" width="26" height="2" rx="1" fill="#6b7280" opacity=".5" />
        <rect x="54" y="159" width="18" height="2" rx="1" fill="#4A9FB5" opacity=".65" />
        <rect x="54" y="163" width="28" height="2" rx="1" fill="#22c55e" opacity=".55" />
        {/* Laptop base */}
        <rect x="42" y="178" width="76" height="5" rx="2.5" fill="#1a2535" />
        {/* Head */}
        <ellipse cx="80" cy="92" rx="22" ry="24" fill="#f5d0b0" />
        {/* Hair */}
        <ellipse cx="80" cy="72" rx="22" ry="12" fill="#4a3020" />
        <rect x="58" y="72" width="44" height="10" rx="5" fill="#4a3020" />
        {/* Eyes */}
        <ellipse cx="73" cy="90" rx="3" ry="3.5" fill="#2a1a0a" />
        <ellipse cx="87" cy="90" rx="3" ry="3.5" fill="#2a1a0a" />
        {/* Smile */}
        <path d="M74 100 Q80 106 86 100" stroke="#c0805a" strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>
    </motion.div>
  );
}

// ─── Floating chip (Option D) ─────────────────────────────────────────────────
function FloatingChip({
  label, accent, top, left, delay = 0, rotate = 0,
}: {
  label: string; accent: string; top: string; left: string; delay?: number; rotate?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: [0, -11, 0], rotate: [rotate - 0.6, rotate + 0.6, rotate - 0.6] }}
      transition={{
        opacity: { duration: 0.5, delay },
        scale:   { duration: 0.5, delay },
        y:       { duration: 3.6 + delay * 0.4, repeat: Infinity, ease: "easeInOut", delay },
        rotate:  { duration: 4.2 + delay * 0.3, repeat: Infinity, ease: "easeInOut", delay },
      }}
      style={{
        position: "absolute", top, left,
        background: "rgba(255,255,255,0.13)",
        backdropFilter: "blur(14px)",
        border: `1px solid ${accent}55`,
        borderRadius: 100,
        padding: "8px 16px",
        display: "flex", alignItems: "center", gap: 7,
        whiteSpace: "nowrap" as const,
        pointerEvents: "none",
      }}
    >
      <span style={{ width: 7, height: 7, borderRadius: "50%", background: accent, flexShrink: 0, boxShadow: `0 0 7px ${accent}` }} />
      <span style={{ fontFamily: "ui-monospace, monospace", fontSize: 12, fontWeight: 700, color: WHITE, letterSpacing: 0.2 }}>{label}</span>
    </motion.div>
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

// ─── Bare SVG character (no motion.div wrapper to avoid transform conflict) ────
function DevIllustrationSVG() {
  return (
    <svg viewBox="0 0 160 240" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto" }}>
      <ellipse cx="80" cy="220" rx="48" ry="12" fill="rgba(0,0,0,0.18)" />
      <rect x="48" y="158" width="6" height="50" rx="3" fill="rgba(255,255,255,0.2)" />
      <rect x="106" y="158" width="6" height="50" rx="3" fill="rgba(255,255,255,0.2)" />
      <rect x="42" y="195" width="76" height="8" rx="4" fill="rgba(255,255,255,0.2)" />
      <rect x="45" y="150" width="70" height="8" rx="4" fill="rgba(255,255,255,0.28)" />
      <rect x="62" y="108" width="36" height="44" rx="10" fill="rgba(255,255,255,0.88)" />
      <rect x="44" y="112" width="20" height="10" rx="5" fill="rgba(255,255,255,0.72)" />
      <rect x="96" y="112" width="20" height="10" rx="5" fill="rgba(255,255,255,0.72)" />
      <ellipse cx="55" cy="146" rx="8" ry="6" fill="#f5d0b0" />
      <ellipse cx="105" cy="146" rx="8" ry="6" fill="#f5d0b0" />
      <rect x="48" y="140" width="64" height="40" rx="6" fill="#1a2535" />
      <rect x="50" y="142" width="60" height="36" rx="5" fill="#0d1421" />
      <rect x="54" y="146" width="30" height="3" rx="1.5" fill="#4A9FB5" opacity=".85" />
      <rect x="54" y="151" width="22" height="2" rx="1" fill="#22c55e" opacity=".75" />
      <rect x="54" y="155" width="26" height="2" rx="1" fill="#6b7280" opacity=".5" />
      <rect x="54" y="159" width="18" height="2" rx="1" fill="#4A9FB5" opacity=".65" />
      <rect x="54" y="163" width="28" height="2" rx="1" fill="#22c55e" opacity=".55" />
      <rect x="42" y="178" width="76" height="5" rx="2.5" fill="#1a2535" />
      <ellipse cx="80" cy="92" rx="22" ry="24" fill="#f5d0b0" />
      <ellipse cx="80" cy="72" rx="22" ry="12" fill="#4a3020" />
      <rect x="58" y="72" width="44" height="10" rx="5" fill="#4a3020" />
      <ellipse cx="73" cy="90" rx="3" ry="3.5" fill="#2a1a0a" />
      <ellipse cx="87" cy="90" rx="3" ry="3.5" fill="#2a1a0a" />
      <path d="M74 100 Q80 106 86 100" stroke="#c0805a" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function D3Hero() {
  const line1 = useScramble("Build quality.", 200);
  const line2 = useScramble("Ship product.",  700);

  return (
    <section style={{ background: GRAD, borderRadius: `0 0 ${R}px ${R}px`, minHeight: "100vh", position: "relative", zIndex: 1, overflow: "hidden" }}>
      <DotGridCanvas />
      <D3Nav />

      <div style={{ padding: "20px clamp(20px, 5vw, 64px) 0", maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 400px", gap: 40, alignItems: "center", minHeight: "calc(100vh - 80px)" }}>

        {/* ── Left: text ── */}
        <div style={{ paddingBottom: 60 }}>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            style={{ fontFamily: "system-ui, sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase" as const, color: "rgba(255,255,255,0.6)", marginBottom: 18 }}>
            Quality Engineering · Edinburgh
          </motion.p>

          <h1 style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: "clamp(44px, 5.5vw, 80px)", lineHeight: 0.95, letterSpacing: -2.5, margin: "0 0 28px" }}>
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2, delay: 0.15 }} style={{ display: "block", color: WHITE }}>{line1}</motion.span>
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2, delay: 0.2  }} style={{ display: "block", color: "rgba(255,255,255,0.4)" }}>{line2}</motion.span>
          </h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}
            style={{ fontFamily: "system-ui, sans-serif", fontSize: 17, color: "rgba(255,255,255,0.65)", maxWidth: 440, lineHeight: 1.65, marginBottom: 36 }}>
            13 years leading QA at scale: pipelines, infra, teams. Nights and weekends building real products with Claude Code.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.75 }} style={{ display: "flex", gap: 12 }}>
            <a href="#projects" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 26px", borderRadius: 100, background: WHITE, color: INK, fontFamily: "system-ui, sans-serif", fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
              See my work <ArrowRight size={14} />
            </a>
            <a href="#contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 26px", borderRadius: 100, background: "rgba(255,255,255,0.14)", border: "1.5px solid rgba(255,255,255,0.3)", color: WHITE, fontFamily: "system-ui, sans-serif", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
              Get in touch
            </a>
          </motion.div>
        </div>

        {/* ── Right: character + chips as one centred unit ── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", alignSelf: "stretch" }}>
          {/* Fixed-size box — character sits inside, chips orbit it */}
          <div style={{ position: "relative", width: 360, height: 420, flexShrink: 0 }}>
            {/* Character centred in the box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: "absolute", bottom: 0, left: "50%", marginLeft: -130, width: 260 }}
            >
              <DevIllustrationSVG />
            </motion.div>
            {/* Chips around him */}
            <FloatingChip label="✓ 847 tests"  accent="#22c55e" top="30px"  left="30px"  delay={0.7} rotate={-1}  />
            <FloatingChip label="100% pass"    accent="#4ABBD5" top="10px"  left="195px" delay={1.0} rotate={1.5} />
            <FloatingChip label="deployed"     accent="#E08850" top="195px" left="10px"  delay={1.4} rotate={-1}  />
            <FloatingChip label="Claude Code"  accent="#ffffff" top="270px" left="195px" delay={1.8} rotate={1.0} />
          </div>
        </div>

      </div>
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
                Every project here (this site included) was spec&apos;d, scaffolded, refactored and shipped with{" "}
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
