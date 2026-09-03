import { ProjectStatus } from "@/data/projects";

/** Dot/pill colour per status. Inactive has none — it falls back to a muted
 *  treatment against whichever background it sits on. */
export const STATUS_COLOR: Record<ProjectStatus, string | null> = {
  active: "#22c55e",
  "in-progress": "#E08850",
  inactive: null,
};

export const STATUS_LABEL: Record<ProjectStatus, string> = {
  active: "active",
  "in-progress": "in progress",
  inactive: "inactive",
};
