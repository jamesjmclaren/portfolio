import type { Scene } from "@/data/projects";
import WestDashboard from "./Dashboard";
import WestMarketplace from "./Marketplace";
import WestAddAsset from "./AddAsset";
import WestAnalytics from "./Analytics";

export const westScenes: Scene[] = [
  {
    number: "01",
    eyebrow: "Portfolio",
    title: "The portfolio at a glance.",
    blurb:
      "All your cards at a glance — portfolio value, cost basis, unrealised P&L and an interactive stacked area chart. Toggle any series, shift the time range, and the Y-axis rescales in real time.",
    features: [
      "Stat tiles: portfolio value, cost basis, P&L, asset count",
      "Stacked area chart with toggleable series",
      "Time range filters (1M / 3M / 1Y / All)",
      "Cost-basis overlay as dashed line",
      "Recent assets list with per-row P&L",
    ],
    url: "https://west.investments/dashboard",
    behindLogin: true,
    Component: WestDashboard,
  },
  {
    number: "02",
    eyebrow: "Marketplace",
    title: "Verified vendors, browsable.",
    blurb:
      "Browse verified vendors for sealed product, graded slabs and raw singles. Ratings, listing counts and locations surface in the sidebar for the top-rated sellers.",
    features: [
      "Sealed / graded / raw filter chips",
      "Vendor verification badges",
      "Ratings, listing counts, location",
      "Become-a-vendor application CTA",
    ],
    url: "https://west.investments/marketplace",
    behindLogin: true,
    Component: WestMarketplace,
  },
  {
    number: "03",
    eyebrow: "Add asset",
    title: "Multi-step capture flow.",
    blurb:
      "Search the Pokémon TCG catalogue, choose condition and grade, set a cost basis, and preview live price data before submitting — end to end in four steps.",
    features: [
      "Pokémon TCG API search with results preview",
      "Raw / graded / sealed picker",
      "Grader picker (PSA / CGC / BGS / other)",
      "Cost-basis calc + custom photo upload",
      "Live price match preview before submit",
    ],
    url: "https://west.investments/dashboard/add",
    behindLogin: true,
    Component: WestAddAsset,
  },
  {
    number: "04",
    eyebrow: "Asset analytics",
    title: "Live prices across three sources.",
    blurb:
      "Every card's full price history across TCGPlayer, eBay and CardMarket — 7-day and 30-day deltas, sales volume, and a 30-day trend sparkline refreshed on demand.",
    features: [
      "TCGPlayer / eBay / CardMarket aggregation",
      "7-day and 30-day price deltas",
      "Sales-volume column",
      "30-day trend sparkline",
      "Refresh-time stamp on every refresh",
    ],
    url: "https://west.investments/asset/charizard-base-4-102",
    behindLogin: true,
    Component: WestAnalytics,
  },
];
