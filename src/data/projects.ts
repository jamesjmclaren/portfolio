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

export type ProjectStatus = "active" | "in-progress" | "inactive";

export interface ProjectMeta {
  slug: string;
  title: string;
  tagline: string;
  url?: string;
  repo: string;
  hidden?: boolean;
  status: ProjectStatus;
  /** Full-width screenshot in public/screenshots, if one exists. */
  image?: string;
  /** How the modal shows the image. Portrait (phone-sized) captures are
   *  letterboxed there — blown up to 16:9 they are an unreadable zoom. Tiles
   *  always crop from the top, which reads as the page header at that size. */
  imageFit?: "cover" | "contain";
  /** Shown with the image where it is not a straight capture of the live thing. */
  imageCaption?: string;
  /** Screens worth showing in full on the project page. */
  gallery?: { src: string; title: string; caption: string }[];
  /** One line above the gallery, for what the reader is actually looking at. */
  galleryNote?: string;
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
      "Alternative asset portfolio tracker for a select group of investors. Real-time market prices, trend analysis and tax reporting, starting with Pokémon TCG",
    url: "https://west.investments",
    repo: "jamesjmclaren/pokemonAssets",
    hidden: true,
    status: "active",
    image: "/screenshots/west-investments.png",
    imageFit: "contain",
    imageCaption:
      "The dashboard as members see it — the live product sits behind a Clerk auth wall",
    pitch:
      "Started as a personal tool for tracking Pokémon card investments at live market price. Now evolving into a closed-access platform where a curated group of members pay a monthly fee to track their portfolios, monitor price trends across TCGPlayer, eBay and CardMarket, pull performance reports and generate tax summaries.",
    longPitch:
      "West Investments sits behind a Clerk auth wall, so screenshots tell only half the story. The vision is simple: alternative assets like Pokémon cards deserve the same portfolio tooling as stocks. Real-time pricing, allocation breakdowns, historical trends and exportable tax reports. Below is a working demo of the actual UI (sidebar, dashboard, charts, marketplace and the add-asset flow) running on mock data inside this page. Click around, toggle the chart series, step through the form.",
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
      "Multi-portfolio management: create and switch between separate portfolios",
      "Asset tracking with real-time prices via PriceCharting API",
      "Interactive P&L chart with selectable time ranges (Recharts)",
      "Historical price snapshots per asset to track appreciation over time",
      "Batch price refresh: bulk-update all asset valuations in one call",
      "Cash balance tracking alongside asset positions",
      "Portfolio sharing: invite members via token-based links",
      "Role-based access control (read-only vs. edit) per portfolio",
      "Community gallery: browse other users' public portfolios",
      "PDF export: download a full portfolio report with charts",
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
      "Community-driven hub for finding football content creators. TikTok, Spotify and YouTube channels for your club, all in one place",
    url: "https://prempod.com",
    repo: "jamesjmclaren/premleaguepodcasts",
    status: "active",
    image: "/screenshots/prempod.png",
    imageFit: "contain",
    pitch:
      "As an Arsenal fan there's no easy way to find the best Arsenal content creators across every platform. Prempod fixes that. A community-built directory where fans add the creators they love, others discover them, and everyone clicks through to the content they actually want. Built for every club, every league.",
    longPitch:
      "The idea is straightforward: pick your club, find the creators covering it. Whether that's a long-running YouTube channel, a Spotify podcast or a TikTok account doing match-day breakdowns. Fans add creators they rate, the community surfaces the best ones, and you click straight through to their pages. It could work for every club in every league in the world; for now, it starts with the Premier League. The engineering challenge is the four-platform API choreography behind it: YouTube quotas, Spotify token rotation, TikTok blob storage, live fixture data. Below: working demos of the discovery feed, a club hub, and the admin sync dashboard.",
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
      "Club pages: every Premier League club with its own podcast/channel hub",
      "Multi-platform aggregation: YouTube, Spotify, TikTok, iTunes in one feed",
      "Live stream detection: surfaces currently-live channels in real time",
      "Fixture sync: podcasts stitched to live PL match schedules",
      "Community voting: upvote/downvote channels to surface quality content",
      "Favourites: save channels with persistent per-user list",
      "Trending feed: algorithmic ranking by clicks and vote score",
      "Channel submission form: community can propose new podcasts for review",
      "Admin dashboard: approve/reject submissions, bulk-import channels",
      "AI-generated channel intros via Groq for consistent descriptions",
      "AI channel discovery: semantic search finds related channels automatically",
      "Click analytics: tracks and reports channel click-through rates",
      "Resend transactional email for submission confirmations",
    ],
  },
  {
    slug: "burgerlist",
    title: "Burgerlist",
    tagline:
      "Build ranked lists of your favourite restaurants, add photos and ratings, then share them in one link. Your top 10 Italian spots in London, ready to send",
    repo: "jamesjmclaren/burgerlist",
    status: "inactive",
    image: "/screenshots/burgerlist.png",
    pitch:
      "Not a review site, a list-making tool. Pick a theme, add the restaurants you know, rank them, rate them, upload photos, and share the whole thing as a single link. Your top 10 Italian restaurants in London. The best curry houses in Edinburgh. Hand it to a friend in one tap.",
    longPitch:
      "The fun part of Burgerlist is the sharing mechanic. Build a curated, opinionated list and get it into someone's hands instantly, without an app download or a login. Under the hood it was a playground for trying patterns I hadn't used together before: NextAuth with Google, Apple and credentials auth side-by-side, AWS Rekognition-backed photo moderation piped through Cloudinary, and a Google Maps location picker for every venue. Demo views below.",
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
      "Per-entry details: restaurant, burger name, star rating, price, visit date",
      "Multi-photo upload per burger with automatic AI content moderation (Cloudinary + AWS Rekognition)",
      "Google Maps location tagging with embedded map links",
      "Custom tags for filtering (#vegan, #smashburger, #double-patty…)",
      "Public list sharing via shareable links",
      "Discover feed: browse public lists by city or cuisine type",
      "Like / bookmark other users' lists",
      "User profiles showing all public lists",
      "Google OAuth + email/password sign-in (NextAuth)",
      "Admin dashboard: view all users, lists, entries and engagement stats",
      "Role-based access control (USER / ADMIN)",
      "Entry reordering within a list",
      "AI field suggestions to speed up adding new entries",
    ],
  },
  {
    slug: "categorais",
    title: "CategorAIs",
    tagline:
      "Use AI to find the AI you need. A self-updating index of 350+ tools, discovered daily by agents, fully searchable by what you're actually trying to do",
    repo: "jamesjmclaren/categorais",
    status: "inactive",
    image: "/screenshots/categorais.png",
    imageFit: "contain",
    pitch:
      "Everyone's building AI tools. Nobody's making it easy to find the right one. CategorAIs is a living directory where AI agents hunt for new tools daily, and an AI wizard recommends exactly what you need based on what you're trying to do: building a spreadsheet, writing code or automating a workflow.",
    longPitch:
      "CategorAIs is two products in one. On the surface: a public directory of 350+ AI tools across 20+ categories, with fast filtering, pricing info and a recommendation wizard that maps your role and goal to the right toolkit. Behind the scenes: a pipeline of TypeScript agents that scrape Brave Search daily, dedupe results, fetch Open Graph previews, score popularity via Tranco rank, and write everything through to a Supabase-backed store so the index stays fresh without manual curation. Below: the browse experience, the wizard flow, and a tool-detail modal.",
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
      "Full-text and semantic search: natural language queries like \"tool for writing blogs\"",
      "Filters by pricing model (free / freemium / paid) and category",
      "AI recommendation wizard: suggests a personalised toolkit by role and workflow",
      "Tool detail pages with description, pricing tiers, features and community ratings",
      "Trending tools: real-time detection of tools spiking in searches and views",
      "Multi-agent discovery pipeline: finds, validates and enriches new tools daily via Brave Search",
      "Parallel search queries (3× faster than sequential) with deduplication and URL validation",
      "Popularity scoring using Tranco rank, search volume and GitHub stars",
      "4-tier AI fallback chain: Groq → Gemini → OpenRouter → Claude",
      "Admin approval workflow for community-submitted tools",
      "GDPR-compliant cookie consent with consent-gated analytics",
      "Tool history tracking: records metadata and pricing changes over time",
      "Rate limiting with per-IP hourly and daily quotas",
    ],
  },
  {
    slug: "sids-sleepovers",
    title: "Sid's Sleepovers",
    tagline:
      "Marketing site for a dog boarding, day care and walking business covering Midlothian, Edinburgh and East Lothian",
    url: "https://sidssleepovers.co.uk",
    repo: "jamesjmclaren/SidsSleepovers",
    status: "active",
    image: "/screenshots/sids-sleepovers.png",
    pitch:
      "A client site, live and taking enquiries. Services, a full price list, an FAQ, an enquiry form and a live Instagram feed. Plain HTML, CSS and one JavaScript file — no framework, no build step, published from the repo root by Netlify.",
    longPitch:
      "Three design directions were built from the same handoff so the client could compare them live in the browser rather than in a mockup. Direction 1c was chosen and the other two removed. Every colour and type value comes from custom properties set by a single theme stylesheet, so the base stylesheet carries no colours of its own and a re-theme touches one file. Photos ship as responsive WebP with JPEG fallbacks at four widths. The gallery is a Mirror App embed on their free tier, with two deliberate changes to the vendor snippet: their bridge script is moved above the iframe whose onload calls into it, and that call is guarded, so a slow CDN or an ad blocker cannot throw on every visit.",
    stack: [
      "HTML",
      "CSS",
      "JavaScript",
      "Netlify",
      "WebP",
      "Mirror App",
    ],
    accent: "#ffc94d",
    features: [
      "Four service cards and a full price list for boarding, walks, day care, small furries and wedding chaperoning",
      "Enquiry form with client-side validation; preview builds are marked and do not write real enquiries",
      "Live @sidssleepovers1 Instagram feed via a Mirror App embed",
      "FAQ accordion and a mobile nav drawer, both in vanilla JS",
      "Responsive WebP images with JPEG fallbacks at 480/800/1280/1920",
      "Theming driven entirely by CSS custom properties on :root",
      "Cache headers and publish directory configured in netlify.toml",
    ],
  },
  {
    slug: "mazer-td",
    title: "Mazer TD",
    tagline:
      "Fantasy tower defence built in Unity. Four races, an exclusive-path talent tree and a 30-level career mode — working title, still in development",
    repo: "CauliflowerMoments/UnityTest",
    status: "in-progress",
    image: "/screenshots/mazer-td.png",
    imageCaption:
      "Main menu from the UI redesign handoff — the design target, not an in-game capture",
    galleryNote:
      "Thirteen screens from the UI redesign handoff, authored at 1920×1080 and specced down to every position, colour and font for rebuilding as Unity uGUI prefabs. These are the design target rather than in-game captures, so art slots and the playfield show as placeholders.",
    gallery: [
      { src: "/screenshots/mazer-td/4c-main-menu.png", title: "Main menu", caption: "Entry point: continue a run or start a new one." },
      { src: "/screenshots/mazer-td/4f-race-select.png", title: "Race select", caption: "Choose realm, mode and difficulty before a run." },
      { src: "/screenshots/mazer-td/4i-hero-select.png", title: "Hero select", caption: "Choose a champion — the last step before the run starts." },
      { src: "/screenshots/mazer-td/4d-hud-build.png", title: "HUD, build phase", caption: "Place and upgrade towers between waves. Shipped geometry, restyled." },
      { src: "/screenshots/mazer-td/4o-hud-wave.png", title: "HUD, wave running", caption: "The same geometry under pressure, at three lives." },
      { src: "/screenshots/mazer-td/4e-talents.png", title: "Talent constellation", caption: "Spend talent points across three branches; node positions match the build." },
      { src: "/screenshots/mazer-td/4h-boon-picker.png", title: "Boon picker", caption: "Pick one of three run-long upgrades. Blocking — the run waits." },
      { src: "/screenshots/mazer-td/4g-victory.png", title: "Victory", caption: "End-of-run result and two ways out." },
      { src: "/screenshots/mazer-td/4k-codex.png", title: "Codex", caption: "Explains the element wheel and the resist numbers." },
      { src: "/screenshots/mazer-td/4l-challenge-ledger.png", title: "Challenge ledger", caption: "Challenge completion tracked per realm and difficulty." },
      { src: "/screenshots/mazer-td/4m-mp-browser.png", title: "Multiplayer browser", caption: "Find, host or join a co-op hold." },
      { src: "/screenshots/mazer-td/4n-lobby.png", title: "Lobby", caption: "Claim a position in the chain and ready up." },
      { src: "/screenshots/mazer-td/4j-settings.png", title: "Settings", caption: "Audio, video and control options." },
    ],
    pitch:
      "A single-player tower defence game in Unity 6. Four races with eight towers each, a talent tree that commits you to one path, a 30-level career across three difficulties, and an endless mode that scales until you lose.",
    longPitch:
      "Requirements live in the repo and are re-checked against the build rather than kept in someone's head, covering races and talent routes, the information the HUD owes the player, save and load, challenges and scoring. The talent tree is deliberately exclusive: go down one route and the other closes, so a race plays differently depending on what you committed to. Art and level furniture start as a written handoff — a schematic authored in HTML that fixes proportion, placement and palette, alongside the exact world-space constraints it has to live inside — and end as a Blender asset with Unity placement code. The interface went through the same process: all thirteen screens redesigned in one direction against an audit of the shipped UI, handed over as a per-screen element inventory — every position, size, colour and font as authored — so the Unity build matches stated values instead of eyedropping a picture. Multiplayer and a marketplace sit greyed out in the main menu: planned, not built.",
    stack: [
      "Unity 6",
      "C#",
      "URP",
      "Shader Graph",
      "Input System",
      "TextMeshPro",
      "Blender",
    ],
    accent: "#8b6fd4",
    features: [
      "Four races — Humans, Orcs, Elves and Dwarves — with eight towers each",
      "Exclusive-path talent tree claiming up to five further towers per race",
      "Career mode: 30 levels across Noob (50% enemy HP), Normal and Pro (200%)",
      "Endless mode with waves that scale until you lose",
      "Next-wave preview and per-unit strengths and weaknesses on hover",
      "Save and load, plus challenges scored on perfect versus lossy runs",
      "Models and scenery authored in Blender, imported as Unity prefabs",
      "Written design handoffs per feature, carrying the world-space constraints the art has to fit",
      "Thirteen game screens redesigned in one visual direction for Unity uGUI at 1920×1080",
    ],
  },
];

export function getProject(slug: string): ProjectMeta | undefined {
  return projectMeta.find((p) => p.slug === slug);
}
