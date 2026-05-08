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
      "Category and pricing chips filter the grid live. Each card pulls real data — logo, description, categories and feature tags — from the same JSON store the live site renders.",
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
      "A three-step modal that asks for your role, lets you describe a task, then ranks the tools that fit best — driven by a role→task→category mapping shipped with the site.",
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
      "Click any card and the full record opens — preview, popularity, features, pricing tiers and similar-tool suggestions sourced from the same category overlap.",
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
