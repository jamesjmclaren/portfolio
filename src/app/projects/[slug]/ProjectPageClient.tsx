"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useDesign } from "@/context/DesignContext";
import Nav from "@/components/Nav";
import Section from "@/components/Section";
import ScrollReveal from "@/components/ScrollReveal";
import ProjectHero from "@/components/project/ProjectHero";
import StackBadges from "@/components/project/StackBadges";
import BrowserFrame from "@/components/project/BrowserFrame";
import Scene from "@/components/project/Scene";
import D2ProjectPage from "@/components/design2/D2ProjectPage";
import type { ProjectMeta, Scene as SceneT } from "@/data/projects";

interface Props {
  project: ProjectMeta;
  scenes: SceneT[];
  others: ProjectMeta[];
}

function D1ProjectPage({ project, scenes, others }: Props) {
  const next = others[0];
  return (
    <>
      <Nav />
      <main>
        <ProjectHero project={project} />

        <Section eyebrow="The pitch" title="What it is.">
          <ScrollReveal>
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-3xl">
              {project.longPitch}
            </p>
          </ScrollReveal>
        </Section>

        {scenes.map((s) => (
          <Scene
            key={s.number}
            number={s.number}
            eyebrow={s.eyebrow}
            title={s.title}
            blurb={s.blurb}
            features={s.features}
          >
            <BrowserFrame
              url={s.url}
              behindLogin={s.behindLogin}
              height={s.height ?? "640px"}
            >
              <s.Component />
            </BrowserFrame>
          </Scene>
        ))}

        {project.features && project.features.length > 0 && (
          <Section eyebrow="Features" title="What it does.">
            <ScrollReveal>
              <ul className="grid gap-3 sm:grid-cols-2">
                {project.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-text-secondary text-base leading-snug">
                    <span className="mt-1.5 size-1.5 rounded-full shrink-0" style={{ background: project.accent }} />
                    {f}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </Section>
        )}

        <Section eyebrow="Stack" title="What it runs on.">
          <ScrollReveal>
            <StackBadges stack={project.stack} />
          </ScrollReveal>
        </Section>

        {next && (
          <Section eyebrow="Next" title="Keep going.">
            <ScrollReveal>
              <Link
                href={`/projects/${next.slug}`}
                className="group block rounded-2xl border border-border bg-surface hover:bg-surface-hover hover:border-border-hover transition-all p-7 md:p-9"
              >
                <p className="text-xs uppercase tracking-wider text-text-muted mb-2">
                  Next project
                </p>
                <div className="flex items-center justify-between gap-6">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">
                      {next.title}
                    </h3>
                    <p className="text-text-secondary mt-2">{next.tagline}</p>
                  </div>
                  <ArrowRight className="size-6 text-text-secondary group-hover:text-accent group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            </ScrollReveal>
          </Section>
        )}
      </main>
    </>
  );
}

export default function ProjectPageClient({ project, scenes, others }: Props) {
  const { design } = useDesign();
  if (design === 2) return <D2ProjectPage project={project} scenes={scenes} others={others} />;
  return <D1ProjectPage project={project} scenes={scenes} others={others} />;
}
