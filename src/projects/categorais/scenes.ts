import type { Scene } from "@/data/projects";
import CategorAisDirectory from "./Directory";
import CategorAisWizard from "./Wizard";
import CategorAisToolDetail from "./ToolDetail";

export const categoraisScenes: Scene[] = [
  {
    number: "01",
    eyebrow: "Directory",
    title: "Browse 350+ AI tools.",
    blurb:
      "Category and pricing chips filter the full grid live. Every card shows the real favicon, description and feature tags pulled from the same JSON store as the live site.",
    features: [
      "Category chip rail with live filtering",
      "Pricing filter (Free / Freemium / Paid)",
      "Real logos via Google's favicon API with branded fallbacks",
      "Favorites and compare actions per card",
      "Dark theme with cyan / purple / pink gradient accents",
    ],
    url: "https://categorais.com",
    Component: CategorAisDirectory,
  },
  {
    number: "02",
    eyebrow: "Wizard",
    title: "Personalised by role.",
    blurb:
      "Three steps: pick your role, describe a task in plain text, get a ranked shortlist with match scores and per-recommendation reasons — driven by the same dataset as the directory.",
    features: [
      "Role grid with selection state",
      "Free-text task input for context",
      "Match-scored recommendations with reasons",
      "Animated progress bar across steps",
      "Drives the same dataset as the directory",
    ],
    url: "https://categorais.com/?wizard=open",
    Component: CategorAisWizard,
  },
  {
    number: "03",
    eyebrow: "Tool detail",
    title: "Inside a tool entry.",
    blurb:
      "The full record for any tool — hero preview, Tranco-based popularity score, feature checklist, pricing tiers, and a similar-tools rail built from category overlap.",
    features: [
      "Hero preview with gradient overlay",
      "Popularity bar from Tranco rank",
      "Feature checklist and pricing tiers",
      "Similar-tools rail by category overlap",
      "Favorite + compare + external CTA",
    ],
    url: "https://categorais.com/?tool=claude",
    height: "720px",
    Component: CategorAisToolDetail,
  },
];
