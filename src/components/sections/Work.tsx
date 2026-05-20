"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const roleBg: Record<string, string> = {
  "io.finnet": "/work-bg/iofinnet.png",
  "YouView":   "/work-bg/youview.png",
  "Accenture": "/work-bg/accenture.png",
};

const roles = [
  {
    company: "io.finnet",
    title: "Head of QA",
    range: "2022 — Present",
    url: "https://iofinnet.com",
    highlights: [
      "Built the QA function from zero to four engineers",
      "Automation frameworks delivering 80%+ test coverage across the core product line",
      "Led testing for 10+ major releases spanning MPC technology and smart contracts",
      "Coverage across 20+ blockchain networks: Ethereum, Bitcoin, Solana, Tron, Ripple",
      "QA for exchange integrations (Bitfinex, Kiln, WalletConnect) and banking partnerships on private EVM networks",
      "Driving AI-assisted test strategy using Claude Code and AI agents to accelerate coverage, reduce toil, and surface regressions faster",
    ],
  },
  {
    company: "YouView",
    title: "QA Lead — connected TV platform",
    range: "2016 — 2022",
    url: "https://youview.com",
    highlights: [
      "Led 11 QA Engineers across 5 SCRUM teams",
      "Delivered QA for the HTML5 UI migration rolled out to 2 million customers",
      "Shipped the UK's first Netflix integration in the connected TV space",
      "QA lead on the 4K set-top box launch with BT",
    ],
  },
  {
    company: "Accenture",
    title: "Consulting / Delivery",
    range: "2012 — 2016",
    url: "https://accenture.com",
    highlights: [
      "Multiple client engagements across industries",
      "Delivery across cloud, integration and bespoke build",
      "Foundation in structured delivery, governance and cross-functional leadership",
    ],
  },
];

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
};

export default function Work() {
  const [[current, direction], setSlide] = useState([0, 0]);

  function navigate(dir: number) {
    setSlide(([c]) => [(c + dir + roles.length) % roles.length, dir]);
  }

  const r = roles[current];

  return (
    <section
      id="work"
      className="snap-section h-screen relative overflow-hidden bg-background"
    >
      {/* Subtle accent glow over the bg image */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          background:
            "radial-gradient(ellipse at 15% 50%, var(--color-accent), transparent 55%)",
        }}
      />

      {/* Section label */}
      <div className="absolute top-[72px] left-6 md:left-10 z-20">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-accent">
          04 / 07 · Work
        </p>
      </div>

      {/* Slide counter */}
      <div className="absolute top-[72px] right-6 md:right-10 z-20">
        <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-text-muted">
          {String(current + 1).padStart(2, "0")} / {String(roles.length).padStart(2, "0")}
        </p>
      </div>

      {/* Slides */}
      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "tween", duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.08}
          onDragEnd={(_, info) => {
            if (info.offset.x < -50) navigate(1);
            else if (info.offset.x > 50) navigate(-1);
          }}
          className="absolute inset-0 flex items-center px-6 md:px-10 pt-14"
          style={{ cursor: "grab" }}
        >
          {/* Company website background — greyscale + dark overlay */}
          {roleBg[r.company] && (
            <div className="absolute inset-0 pointer-events-none">
              <Image
                src={roleBg[r.company]}
                alt=""
                fill
                className="object-cover object-top"
                style={{ filter: "grayscale(100%) brightness(0.18) contrast(1.1)" }}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/30" />
            </div>
          )}

          <div className="mx-auto w-full max-w-6xl select-none relative z-10">
            <p className="text-sm font-mono text-accent mb-4">{r.range}</p>

            <h2 className="text-4xl md:text-7xl lg:text-8xl font-bold tracking-tight text-text-primary leading-[0.95] mb-3">
              {r.company}
            </h2>

            <p className="text-xl md:text-2xl text-text-secondary mb-10">{r.title}</p>

            <ul className="space-y-3 max-w-2xl">
              {r.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-text-secondary">
                  <span className="text-accent mt-0.5 shrink-0 font-semibold">+</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Arrows */}
      <button
        onClick={() => navigate(-1)}
        aria-label="Previous role"
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 hidden md:flex size-12 items-center justify-center rounded-full border border-border bg-surface text-text-secondary hover:text-text-primary hover:border-border-hover transition-colors"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        onClick={() => navigate(1)}
        aria-label="Next role"
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 hidden md:flex size-12 items-center justify-center rounded-full border border-border bg-surface text-text-secondary hover:text-text-primary hover:border-border-hover transition-colors"
      >
        <ChevronRight className="size-5" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {roles.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to role ${i + 1}`}
            onClick={() => setSlide([i, i > current ? 1 : -1])}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{
              width:      i === current ? 28 : 8,
              background: i === current ? "var(--color-accent)" : "var(--color-border)",
            }}
          />
        ))}
      </div>
    </section>
  );
}
