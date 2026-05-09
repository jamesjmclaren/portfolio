import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Nav from "@/components/Nav";
import ScrollReveal from "@/components/ScrollReveal";
import ProjectHero from "@/components/project/ProjectHero";
import BrowserFrame from "@/components/project/BrowserFrame";
import Scene from "@/components/project/Scene";
import { getProject, projectMeta, type Scene as SceneT } from "@/data/projects";
import { westScenes } from "@/projects/west/scenes";
import { prempodScenes } from "@/projects/prempod/scenes";
import { burgerlistScenes } from "@/projects/burgerlist/scenes";
import { categoraisScenes } from "@/projects/categorais/scenes";

const scenesBySlug: Record<string, SceneT[]> = {
  "west-investments": westScenes,
  prempod: prempodScenes,
  burgerlist: burgerlistScenes,
  categorais: categoraisScenes,
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
        {/* Full-screen hero with screenshot background */}
        <ProjectHero project={project} />

        {/* Pitch — compact, no giant padding */}
        <section className="px-6 md:px-10 py-12 md:py-16 border-t border-border/50">
          <div className="mx-auto w-full max-w-6xl">
            <ScrollReveal>
              <p className="text-xs font-medium uppercase tracking-[0.18em] mb-4"
                style={{ color: project.accent }}>
                The pitch
              </p>
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-3xl">
                {project.longPitch}
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Demo scenes */}
        {scenes.map((s) => (
          <Scene
            key={s.number}
            number={s.number}
            eyebrow={s.eyebrow}
            title={s.title}
            blurb={s.blurb}
            features={s.features}
            accent={project.accent}
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

        {/* Next project */}
        {next && (
          <section className="px-6 md:px-10 py-12 md:py-16 border-t border-border/50">
            <div className="mx-auto w-full max-w-6xl">
              <ScrollReveal>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-text-muted mb-6">
                  Next project
                </p>
                <Link
                  href={`/projects/${next.slug}`}
                  className="group block rounded-2xl border border-border bg-surface hover:bg-surface-hover hover:border-border-hover transition-all p-7 md:p-9"
                >
                  <div className="flex items-center justify-between gap-6">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">
                        {next.title}
                      </h3>
                      <p className="text-text-secondary mt-2 max-w-xl">{next.tagline}</p>
                    </div>
                    <ArrowRight className="size-6 text-text-secondary group-hover:translate-x-1 transition-all shrink-0"
                      style={{ color: next.accent }} />
                  </div>
                </Link>
              </ScrollReveal>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
