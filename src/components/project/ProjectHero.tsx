"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github, Lock } from "lucide-react";
import { Project } from "@/data/projects";

export default function ProjectHero({ project }: { project: Project }) {
  return (
    <section className="relative min-h-[80vh] flex flex-col justify-center px-6 md:px-10 pt-24 pb-16">
      <div
        className="absolute inset-x-0 top-0 h-[2px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
        }}
      />
      <div className="mx-auto w-full max-w-6xl">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-accent transition-colors mb-10"
        >
          <ArrowLeft className="size-4" /> All projects
        </Link>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.02]"
        >
          {project.title}
          {project.hidden && (
            <Lock className="inline-block ml-4 size-7 md:size-9 text-accent align-middle" />
          )}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-xl md:text-2xl text-text-secondary max-w-3xl leading-relaxed"
        >
          {project.tagline}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 text-base md:text-lg text-text-secondary max-w-3xl leading-relaxed"
        >
          {project.pitch}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap gap-3"
        >
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-accent text-background hover:bg-accent-hover transition-colors px-4 py-2.5 text-sm font-medium"
            >
              Visit live site <ExternalLink className="size-4" />
            </a>
          )}
          <a
            href={`https://github.com/${project.repo}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface hover:bg-surface-hover hover:border-border-hover transition-colors px-4 py-2.5 text-sm font-medium"
          >
            <Github className="size-4" /> Source
          </a>
        </motion.div>
      </div>
    </section>
  );
}
