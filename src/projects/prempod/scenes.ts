import type { Scene } from "@/data/projects";
import PrempodDiscover from "./Discover";
import PrempodClubPage from "./ClubPage";
import PrempodAdmin from "./Admin";

export const prempodScenes: Scene[] = [
  {
    number: "01",
    eyebrow: "Discover",
    title: "Hot podcasts, surfaced.",
    blurb:
      "Trending feed across all leagues and platforms — YouTube, Spotify, TikTok, iTunes. Filter by competition, club or topic.",
    features: [
      "Cross-platform podcast aggregation",
      "Trending sort with play counts",
      "Filter by league / club / topic",
      "Platform badge on every card",
      "Hover-to-play preview affordance",
    ],
    url: "https://prempod.com",
    Component: PrempodDiscover,
  },
  {
    number: "02",
    eyebrow: "Club page",
    title: "Every club, every channel.",
    blurb:
      "Each club gets a hub — channels list, AI-generated intro, official badges, live-stream indicators, and the next fixture wired in.",
    features: [
      "Channel cards with platform + subs + latest video",
      "Official / promoted / live-stream badges",
      "AI-generated club intro (Groq)",
      "Next fixture pinned with pre-match podcast count",
      "Cross-league fixture rail",
    ],
    url: "https://prempod.com/club/arsenal",
    Component: PrempodClubPage,
  },
  {
    number: "03",
    eyebrow: "Admin",
    title: "Sync status at a glance.",
    blurb:
      "Behind the scenes: a sync dashboard tracking every channel across YouTube (RSS + Data), Spotify, TikTok and iTunes — with quota cost and error surfacing.",
    features: [
      "Per-channel sync status with retry",
      "YouTube quota meter (RSS-first strategy)",
      "Error detail with manual-review hooks",
      "Auto-refresh every 5 minutes",
      "Per-source video count breakdown",
    ],
    url: "https://prempod.com/admin/sync",
    Component: PrempodAdmin,
  },
];
