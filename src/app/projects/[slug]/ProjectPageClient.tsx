"use client";

import D3ProjectPage from "@/components/design3/D3ProjectPage";
import type { ProjectMeta, Scene as SceneT } from "@/data/projects";

interface Props {
  project: ProjectMeta;
  scenes: SceneT[];
  others: ProjectMeta[];
}

export default function ProjectPageClient({ project, scenes, others }: Props) {
  return <D3ProjectPage project={project} scenes={scenes} others={others} />;
}
