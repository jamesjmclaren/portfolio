import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Nav from "@/components/Nav";
import Section from "@/components/Section";
import ScrollReveal from "@/components/ScrollReveal";
import ProjectHero from "@/components/project/ProjectHero";
import StackBadges from "@/components/project/StackBadges";
import BrowserFrame from "@/components/project/BrowserFrame";
import Scene from "@/components/project/Scene";
import { getProject, projectMeta, type Scene as SceneT } from "@/data/projects";
import { westScenes } from "@/projects/west/scenes";
import { prempodScenes } from "@/projects/prempod/scenes";
import { burgerlistScenes } from "@/projects/burgerlist/scenes";

const scenesBySlug: Record<string, SceneT[]> = {
  "west-investments": westScenes,
  prempod: prempodScenes,
  burgerlist: burgerlistScenes,
};

export function generateStaticParams() {
  return projectMeta.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — James McLaren`,
    description: project.tagline,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const scenes = scenesBySlug[slug] ?? [];
  const others = projectMeta.filter((p) => p.slug !== slug);
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
