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
      "Alternative asset portfolio tracker for a select group of investors — real-time market prices, trend analysis and tax reporting, starting with Pokémon TCG",
    url: "https://west.investments",
    repo: "jamesjmclaren/pokemonAssets",
    hidden: true,
    status: "active",
    pitch:
      "Started as a personal tool for tracking Pokémon card investments at live market price. Now evolving into a closed-access platform — a curated group of members pay a monthly fee to track their portfolios, monitor price trends across TCGPlayer, eBay and CardMarket, pull performance reports and generate tax summaries.",
    longPitch:
      "West Investments sits behind a Clerk auth wall, so screenshots tell only half the story. The vision is simple: alternative assets like Pokémon cards deserve the same portfolio tooling as stocks — real-time pricing, allocation breakdowns, historical trends and exportable tax reports. Below is a working demo of the actual UI — sidebar, dashboard, charts, marketplace and the add-asset flow — running on mock data inside this page. Click around, toggle the chart series, step through the form.",
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
      "Community-driven hub for finding football content creators — TikTok, Spotify and YouTube channels for your club, all in one place",
    url: "https://prempod.com",
    repo: "jamesjmclaren/premleaguepodcasts",
    status: "active",
    pitch:
      "As an Arsenal fan there's no easy way to find the best Arsenal content creators across every platform. Prempod fixes that — a community-built directory where fans add the creators they love, others discover them, and everyone clicks through to the content they actually want. Built for every club, every league.",
    longPitch:
      "The idea is straightforward: pick your club, find the creators covering it — whether that's a long-running YouTube channel, a Spotify podcast or a TikTok account doing match-day breakdowns. Fans add creators they rate, the community surfaces the best ones, and you click straight through to their pages. It could work for every club in every league in the world — for now, it starts with the Premier League. The engineering challenge is the four-platform API choreography behind it: YouTube quotas, Spotify token rotation, TikTok blob storage, live fixture data. Below: working demos of the discovery feed, a club hub, and the admin sync dashboard.",
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
      "Build ranked lists of your favourite restaurants, add photos and ratings, then share them in one link — your top 10 Italian spots in London, ready to send",
    repo: "jamesjmclaren/burgerlist",
    status: "inactive",
    pitch:
      "Not a review site — a list-making tool. Pick a theme, add the restaurants you know, rank them, rate them, upload photos, and share the whole thing as a single link. Your top 10 Italian restaurants in London. The best curry houses in Edinburgh. Hand it to a friend in one tap.",
    longPitch:
      "The fun part of Burgerlist is the sharing mechanic — build a curated, opinionated list and get it into someone's hands instantly, without an app download or a login. Under the hood it was a playground for trying patterns I hadn't used together before: NextAuth with Google, Apple and credentials auth side-by-side, AWS Rekognition-backed photo moderation piped through Cloudinary, and a Google Maps location picker for every venue. Demo views below.",
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
  {
    slug: "categorais",
    title: "CategorAIs",
    tagline:
      "Use AI to find the AI you need — a self-updating index of 350+ tools, discovered daily by agents, fully searchable by what you're actually trying to do",
    repo: "jamesjmclaren/categorais",
    status: "inactive",
    pitch:
      "Everyone's building AI tools. Nobody's making it easy to find the right one. CategorAIs is a living directory where AI agents hunt for new tools daily, and an AI wizard recommends exactly what you need based on what you're trying to do — whether that's building a spreadsheet, writing code or automating a workflow.",
    longPitch:
      "CategorAIs is two products in one. On the surface: a public directory of 350+ AI tools across 20+ categories, with fast filtering, pricing info and a recommendation wizard that maps your role and goal to the right toolkit. Behind the scenes: a pipeline of TypeScript agents that scrape Brave Search daily, dedupe results, fetch Open Graph previews, score popularity via Tranco rank, and write everything through to a Supabase-backed store — so the index stays fresh without manual curation. Below — the browse experience, the wizard flow, and a tool-detail modal.",
    stack: [
      "TypeScript",
      "Vanilla JS",
      "Express",
      "Supabase",
      "Brave Search API",
      "Groq",
      "Tranco",
      "Vercel",
    ],
    accent: "#a855f7",
  },
];

export function getProject(slug: string): ProjectMeta | undefined {
  return projectMeta.find((p) => p.slug === slug);
}
