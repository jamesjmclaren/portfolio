import { notFound } from "next/navigation";
import { getProject, projectMeta, type Scene as SceneT } from "@/data/projects";
import { westScenes } from "@/projects/west/scenes";
import { prempodScenes } from "@/projects/prempod/scenes";
import { burgerlistScenes } from "@/projects/burgerlist/scenes";
import { categoraisScenes } from "@/projects/categorais/scenes";
import ProjectPageClient from "./ProjectPageClient";

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

  return <ProjectPageClient project={project} scenes={scenes} others={others} />;
}
