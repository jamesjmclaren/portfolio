// Data mirrored from the live west.investments homepage demo
// (real stats, real Pokémon TCG card image URLs)

export interface ChartPoint {
  date: string;
  total: number;
  raw: number;
  graded: number;
  sealed: number;
  costBasis: number;
}

export const stats = {
  totalValue: 54100,
  totalInvested: 27400,
  totalProfit: 26700,
  profitPercent: 97.3,
  totalAssets: 34,
  graded: 28500,
  raw: 14600,
  sealed: 11000,
};

function generateChartData(): ChartPoint[] {
  const points = 8;
  const out: ChartPoint[] = [];
  const now = new Date("2026-04-01");
  for (let i = points - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setMonth(d.getMonth() - i);
    const t = 1 - i / (points - 1);
    const scale = 0.6 + 0.4 * t;
    const sealed = Math.round(stats.sealed * scale);
    const raw = Math.round(stats.raw * scale);
    const graded = Math.round(stats.graded * scale);
    out.push({
      date: d.toISOString().slice(0, 10),
      sealed,
      raw,
      graded,
      total: sealed + raw + graded,
      costBasis: stats.totalInvested,
    });
  }
  return out;
}

export const chartData = generateChartData();

export interface MockAsset {
  id: string;
  name: string;
  setName: string;
  cardNumber: string;
  rarity: string;
  type: "raw" | "graded" | "sealed";
  grade?: string;
  quantity: number;
  purchasePrice: number;
  currentPrice: number;
  imageUrl: string;
}

// Real card images via the Pokémon TCG public API — same source the live app uses
export const mockAssets: MockAsset[] = [
  {
    id: "1",
    name: "Lugia",
    setName: "Neo Genesis",
    cardNumber: "9/111",
    rarity: "Holo Rare",
    type: "graded",
    grade: "PSA 9",
    quantity: 1,
    purchasePrice: 2200,
    currentPrice: 4800,
    imageUrl: "https://images.pokemontcg.io/neo1/9_hires.png",
  },
  {
    id: "2",
    name: "Charizard",
    setName: "Base Set",
    cardNumber: "4/102",
    rarity: "Holo Rare",
    type: "raw",
    quantity: 1,
    purchasePrice: 5400,
    currentPrice: 8200,
    imageUrl: "https://images.pokemontcg.io/base1/4_hires.png",
  },
  {
    id: "3",
    name: "Umbreon VMAX",
    setName: "Evolving Skies",
    cardNumber: "215/203",
    rarity: "Secret Rare",
    type: "raw",
    quantity: 1,
    purchasePrice: 3800,
    currentPrice: 6400,
    imageUrl: "https://images.pokemontcg.io/swsh7/215_hires.png",
  },
  {
    id: "4",
    name: "Charizard VMAX",
    setName: "Champions Path",
    cardNumber: "079/073",
    rarity: "Secret Rare",
    type: "graded",
    grade: "PSA 10",
    quantity: 1,
    purchasePrice: 2200,
    currentPrice: 4850,
    imageUrl: "https://images.pokemontcg.io/swsh35/79_hires.png",
  },
  {
    id: "5",
    name: "Pikachu VMAX",
    setName: "Vivid Voltage",
    cardNumber: "188/185",
    rarity: "Secret Rare",
    type: "graded",
    grade: "PSA 9",
    quantity: 1,
    purchasePrice: 420,
    currentPrice: 890,
    imageUrl: "https://images.pokemontcg.io/swsh4/188_hires.png",
  },
  {
    id: "6",
    name: "Pikachu",
    setName: "Base Set",
    cardNumber: "58/102",
    rarity: "Common",
    type: "sealed",
    quantity: 4,
    purchasePrice: 60,
    currentPrice: 95,
    imageUrl: "https://images.pokemontcg.io/base1/58_hires.png",
  },
];

export interface MockVendor {
  id: string;
  name: string;
  verified: boolean;
  rating: number;
  itemCount: number;
  location: string;
  initials: string;
}

export const mockVendors: MockVendor[] = [
  {
    id: "v1",
    name: "EdinburghCards",
    verified: true,
    rating: 4.9,
    itemCount: 184,
    location: "Edinburgh, UK",
    initials: "EC",
  },
  {
    id: "v2",
    name: "TCG Vault NYC",
    verified: true,
    rating: 4.8,
    itemCount: 412,
    location: "New York, US",
    initials: "TV",
  },
  {
    id: "v3",
    name: "GradedGoodies",
    verified: false,
    rating: 4.6,
    itemCount: 67,
    location: "Berlin, DE",
    initials: "GG",
  },
];

export interface MockListing {
  id: string;
  title: string;
  vendor: string;
  vendorVerified: boolean;
  price: number;
  imageUrl: string;
  condition: string;
  set: string;
}

export const mockListings: MockListing[] = [
  {
    id: "l1",
    title: "Umbreon VMAX (Moonbreon)",
    vendor: "EdinburghCards",
    vendorVerified: true,
    price: 612,
    imageUrl: "https://images.pokemontcg.io/swsh7/215_hires.png",
    condition: "NM",
    set: "Evolving Skies",
  },
  {
    id: "l2",
    title: "Charizard 4/102",
    vendor: "TCG Vault NYC",
    vendorVerified: true,
    price: 3850,
    imageUrl: "https://images.pokemontcg.io/base1/4_hires.png",
    condition: "PSA 9",
    set: "Base Set",
  },
  {
    id: "l3",
    title: "Charizard VMAX",
    vendor: "EdinburghCards",
    vendorVerified: true,
    price: 1320,
    imageUrl: "https://images.pokemontcg.io/swsh35/79_hires.png",
    condition: "PSA 10",
    set: "Champions Path",
  },
  {
    id: "l4",
    title: "Lugia 9/111",
    vendor: "GradedGoodies",
    vendorVerified: false,
    price: 4800,
    imageUrl: "https://images.pokemontcg.io/neo1/9_hires.png",
    condition: "PSA 9",
    set: "Neo Genesis",
  },
  {
    id: "l5",
    title: "Pikachu VMAX",
    vendor: "TCG Vault NYC",
    vendorVerified: true,
    price: 890,
    imageUrl: "https://images.pokemontcg.io/swsh4/188_hires.png",
    condition: "PSA 9",
    set: "Vivid Voltage",
  },
  {
    id: "l6",
    title: "Pikachu 58/102",
    vendor: "EdinburghCards",
    vendorVerified: true,
    price: 95,
    imageUrl: "https://images.pokemontcg.io/base1/58_hires.png",
    condition: "NM",
    set: "Base Set",
  },
];

export interface PriceTier {
  source: "TCGPlayer" | "eBay" | "CardMarket";
  avg: number;
  low: number;
  high: number;
  delta7d: number;
  delta30d: number;
  saleCount: number;
}

export const priceTiers: PriceTier[] = [
  {
    source: "TCGPlayer",
    avg: 3850,
    low: 3520,
    high: 4280,
    delta7d: 2.4,
    delta30d: 8.1,
    saleCount: 14,
  },
  {
    source: "eBay",
    avg: 3720,
    low: 3300,
    high: 4100,
    delta7d: -0.8,
    delta30d: 6.2,
    saleCount: 47,
  },
  {
    source: "CardMarket",
    avg: 3540,
    low: 3210,
    high: 3950,
    delta7d: 1.2,
    delta30d: 5.4,
    saleCount: 22,
  },
];
