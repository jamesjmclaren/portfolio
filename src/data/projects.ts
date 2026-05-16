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
  features?: string[];
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
    features: [
      "Multi-portfolio management — create and switch between separate portfolios",
      "Asset tracking with real-time prices via PriceCharting API",
      "Interactive P&L chart with selectable time ranges (Recharts)",
      "Historical price snapshots per asset to track appreciation over time",
      "Batch price refresh — bulk-update all asset valuations in one call",
      "Cash balance tracking alongside asset positions",
      "Portfolio sharing — invite members via token-based links",
      "Role-based access control (read-only vs. edit) per portfolio",
      "Community gallery — browse other users' public portfolios",
      "PDF export — download a full portfolio report with charts",
      "Onboarding wizard for first-time portfolio setup",
      "Stripe integration for premium feature upgrades",
      "Scheduled price-sync cron job running in the background",
      "Clerk authentication with SSO support",
    ],
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
    features: [
      "Club pages — every Premier League club with its own podcast/channel hub",
      "Multi-platform aggregation — YouTube, Spotify, TikTok, iTunes in one feed",
      "Live stream detection — surfaces currently-live channels in real time",
      "Fixture sync — podcasts stitched to live PL match schedules",
      "Community voting — upvote/downvote channels to surface quality content",
      "Favourites — save channels with persistent per-user list",
      "Trending feed — algorithmic ranking by clicks and vote score",
      "Channel submission form — community can propose new podcasts for review",
      "Admin dashboard — approve/reject submissions, bulk-import channels",
      "AI-generated channel intros via Groq for consistent descriptions",
      "AI channel discovery — semantic search finds related channels automatically",
      "Click analytics — tracks and reports channel click-through rates",
      "Resend transactional email for submission confirmations",
    ],
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
    features: [
      "Create themed burger lists (e.g. \"Best in Edinburgh\", \"Wagyu tier list\")",
      "Per-entry details — restaurant, burger name, star rating, price, visit date",
      "Multi-photo upload per burger with automatic AI content moderation (Cloudinary + AWS Rekognition)",
      "Google Maps location tagging with embedded map links",
      "Custom tags for filtering (#vegan, #smashburger, #double-patty…)",
      "Public list sharing via shareable links",
      "Discover feed — browse public lists by city or cuisine type",
      "Like / bookmark other users' lists",
      "User profiles showing all public lists",
      "Google OAuth + email/password sign-in (NextAuth)",
      "Admin dashboard — view all users, lists, entries and engagement stats",
      "Role-based access control (USER / ADMIN)",
      "Entry reordering within a list",
      "AI field suggestions to speed up adding new entries",
    ],
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
    features: [
      "350+ AI tools across 20+ categories (Writing, Code, Image, Video, Chatbots…)",
      "Full-text and semantic search — natural language queries like \"tool for writing blogs\"",
      "Filters by pricing model (free / freemium / paid) and category",
      "AI recommendation wizard — suggests a personalised toolkit by role and workflow",
      "Tool detail pages with description, pricing tiers, features and community ratings",
      "Trending tools — real-time detection of tools spiking in searches and views",
      "Multi-agent discovery pipeline — finds, validates and enriches new tools daily via Brave Search",
      "Parallel search queries (3× faster than sequential) with deduplication and URL validation",
      "Popularity scoring using Tranco rank, search volume and GitHub stars",
      "4-tier AI fallback chain — Groq → Gemini → OpenRouter → Claude",
      "Admin approval workflow for community-submitted tools",
      "GDPR-compliant cookie consent with consent-gated analytics",
      "Tool history tracking — records metadata and pricing changes over time",
      "Rate limiting with per-IP hourly and daily quotas",
    ],
  },
];

export function getProject(slug: string): ProjectMeta | undefined {
  return projectMeta.find((p) => p.slug === slug);
}
