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
      "Stat tiles, an interactive stacked area chart and a recent-assets list. The chart series toggle, the time range filters, and the Y-axis rescales to whatever is visible.",
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
      "Filterable listings grid with vendor verification badges. Sidebar surfaces top vendors with ratings and locations.",
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
      "Find the card, pick condition and grade, set quantity and cost basis, confirm. Click through it — every step is interactive.",
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
      "Per-asset detail view aggregating TCGPlayer, eBay and CardMarket with 7-day and 30-day deltas, sales volume, and a 30-day trend sparkline.",
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
