"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, ArrowLeft, ExternalLink, Github, Lock } from "lucide-react";
import { ProjectMeta } from "@/data/projects";

/* Projects with a hero photo — others get a clean accent-mesh background */
const heroImages: Record<string, string> = {
  "west-investments": "/hero/west.jpg",
  burgerlist: "/hero/burgerlist.jpg",
};

export default function ProjectHero({ project }: { project: ProjectMeta }) {
  const heroImage = heroImages[project.slug] ?? null;

  return (
    <section className="relative min-h-screen flex flex-col px-6 md:px-10 pt-20 pb-12 overflow-hidden">

      {/* ── Background ─────────────────────────────────────────────────── */}
      {heroImage ? (
        /* Photo background */
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt=""
            fill
            className="object-cover object-center scale-105"
            style={{ filter: "grayscale(30%) brightness(0.28)" }}
            priority
          />
          {/* Accent colour bleed */}
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at 25% 70%, ${project.accent}28 0%, transparent 60%)`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/55 via-background/40 to-background/92" />
        </div>
      ) : (
        /* No photo — abstract accent mesh */
        <div className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 80% 60% at 15% 50%, ${project.accent}14 0%, transparent 55%),
                radial-gradient(ellipse 60% 80% at 85% 20%, ${project.accent}09 0%, transparent 50%)
              `,
            }}
          />
          {/* Fine dot grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: `radial-gradient(circle, ${project.accent} 1px, transparent 1px)`,
              backgroundSize: "32px 32px",
            }}
          />
        </div>
      )}

      {/* ── Accent top line ────────────────────────────────────────────── */}
      <div
        className="absolute inset-x-0 top-0 h-[2px] z-10"
        style={{
          background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
        }}
      />

      {/* ── Content ────────────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto w-full max-w-6xl flex flex-col flex-1">
        {/* Back nav + status */}
        <div className="flex items-center gap-3">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-accent transition-colors"
          >
            <ArrowLeft className="size-4" /> All projects
          </Link>
          <span
            className={`inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider rounded-full px-2 py-0.5 border ${
              project.status === "active"
                ? "text-success border-success/40 bg-success/10"
                : "text-text-muted border-border bg-surface-elevated"
            }`}
          >
            <span
              className={`size-1.5 rounded-full ${
                project.status === "active" ? "bg-success animate-pulse" : "bg-text-muted"
              }`}
            />
            {project.status}
          </span>
        </div>

        {/* Main content — bottom-anchored */}
        <div className="mt-auto pt-12">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[1.02] mb-4"
          >
            {project.title}
            {project.hidden && (
              <Lock className="inline-block ml-4 size-7 md:size-9 text-accent align-middle" />
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed mb-8"
          >
            {project.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-3 items-center"
          >
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
                style={{ background: project.accent }}
              >
                Visit live site <ExternalLink className="size-4" />
              </a>
            )}
            <a
              href={`https://github.com/${project.repo}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface/80 backdrop-blur hover:bg-surface-hover hover:border-border-hover transition-colors px-4 py-2.5 text-sm font-medium"
            >
              <Github className="size-4" /> Source
            </a>

            {/* Stack chips */}
            <div className="flex flex-wrap gap-1.5 ml-1">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="text-[10px] font-mono text-text-muted border border-border/60 bg-surface/50 backdrop-blur rounded-md px-2 py-1"
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Scroll cue ─────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        style={{ color: project.accent }}
      >
        <span className="text-[10px] uppercase tracking-[0.2em] opacity-60">Explore demos</span>
        <ArrowDown className="size-4 animate-bounce opacity-60" />
      </motion.div>
    </section>
  );
}
