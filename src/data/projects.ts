import { ComponentType } from "react";

export interface Scene {
  number: string;
  eyebrow: string;
  title: string;
  blurb: string;
  features?: string[];
  url: string;
  behindLogin?: boolean;
  height?: string;
  Component: ComponentType;
}

export interface ProjectMeta {
  slug: string;
  title: string;
  tagline: string;
  url?: string;
  repo: string;
  hidden?: boolean;
  status: "active" | "inactive";
  pitch: string;
  longPitch: string;
  stack: string[];
  accent: string;
}

export const projectMeta: ProjectMeta[] = [
  {
    slug: "west-investments",
    title: "West Investments",
    tagline:
      "Pokémon TCG portfolio tracker — fintech-grade UX for collectors",
    url: "https://west.investments",
    repo: "jamesjmclaren/pokemonAssets",
    hidden: true,
    status: "active",
    pitch:
      "A full-stack portfolio tracker that aggregates real-time Pokémon TCG market prices across TCGPlayer, eBay and CardMarket, and visualises asset allocation through interactive charts.",
    longPitch:
      "West Investments is sat behind a Clerk auth wall, so screenshots tell only half the story. Below is a working demo of the actual UI — sidebar, dashboard, charts, marketplace and the add-asset flow — running on mock data inside this page. Click around, toggle the chart series, step through the form.",
    stack: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind v4",
      "Supabase",
      "Clerk",
      "Recharts",
      "Stripe",
    ],
    accent: "#d4af37",
  },
  {
    slug: "prempod",
    title: "Prempod",
    tagline:
      "Premier League podcast discovery, aggregated across YouTube / Spotify / TikTok / iTunes",
    url: "https://prempod.com",
    repo: "jamesjmclaren/premleaguepodcasts",
    status: "active",
    pitch:
      "A discovery platform that pulls podcasts and video from four platforms and stitches them onto live Premier League fixtures, club pages and trending discussion threads.",
    longPitch:
      "The hard part isn't the UI — it's the four-API choreography behind it. YouTube quotas, Spotify token rotation, TikTok blob storage, iTunes RSS. Below: working demos of the home discovery feed, a club page with channels and live fixtures, and the admin sync dashboard.",
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind v4",
      "Prisma + Postgres",
      "NextAuth",
      "Vercel Blob",
      "Groq",
    ],
    accent: "#5b8def",
  },
  {
    slug: "burgerlist",
    title: "Burgerlist",
    tagline:
      "Social burger discovery — rate, list and share with AI-moderated photos",
    repo: "jamesjmclaren/burgerlist",
    status: "inactive",
    pitch:
      "A social platform for burger fans: track what you've eaten, share lists, rate spots, and discover places nearby — with AI-moderated photo uploads and Google Maps location pickers.",
    longPitch:
      "Burgerlist is the playground project for trying new patterns: NextAuth with Google + Apple + credentials side-by-side, AWS-Rekognition-backed photo moderation through Cloudinary, and a clean ui/* component layer that keeps forms consistent. Demo views below.",
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind v4",
      "Prisma + Postgres",
      "NextAuth",
      "Cloudinary",
      "Google Maps",
      "Zod",
    ],
    accent: "#f97316",
  },
];

export function getProject(slug: string): ProjectMeta | undefined {
  return projectMeta.find((p) => p.slug === slug);
}
