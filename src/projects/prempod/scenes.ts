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
      "The trending feed across all four platforms in one view — filter by competition, club or topic and every card carries its platform badge and play count.",
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
      "Each club's hub: every channel with platform, subscriber count and latest video, an AI-generated intro via Groq, live-stream badges, and the next fixture pinned at the top.",
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
      "The back-of-house sync dashboard — per-channel status across all four platforms, YouTube quota tracking with an RSS-first cost strategy, and error surfacing with manual-review hooks.",
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
