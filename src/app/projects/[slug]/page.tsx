import { notFound } from "next/navigation";
import HomePage from "@/components/home/HomePage";
import { getProject, projectMeta } from "@/data/projects";

/** Every project is still its own URL — entering here renders the one page with
 *  that project's modal already open, so links shared before the redesign, and
 *  links copied out of the modal, both keep working. */
export function generateStaticParams() {
  return projectMeta.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — James McLaren`,
    description: project.tagline,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getProject(slug)) notFound();

  return <HomePage initialSlug={slug} />;
}
