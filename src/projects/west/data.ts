export interface ChartPoint {
  date: string;
  total: number;
  raw: number;
  graded: number;
  sealed: number;
  costBasis: number;
}

function generateChartData(): ChartPoint[] {
  const points: ChartPoint[] = [];
  const days = 90;
  const now = new Date("2026-05-01");
  let raw = 4200;
  let graded = 6800;
  let sealed = 3100;
  const cost = 9800;
  for (let i = days; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    raw += (Math.random() - 0.45) * 80;
    graded += (Math.random() - 0.42) * 110;
    sealed += (Math.random() - 0.44) * 60;
    points.push({
      date: d.toISOString().slice(0, 10),
      raw: Math.max(0, raw),
      graded: Math.max(0, graded),
      sealed: Math.max(0, sealed),
      total: raw + graded + sealed,
      costBasis: cost,
    });
  }
  return points;
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
  imageBg: string;
  imageInitials: string;
}

export const mockAssets: MockAsset[] = [
  {
    id: "1",
    name: "Charizard",
    setName: "Base Set",
    cardNumber: "4/102",
    rarity: "Holo Rare",
    type: "graded",
    grade: "PSA 9",
    quantity: 1,
    purchasePrice: 2400,
    currentPrice: 3850,
    imageBg: "from-orange-500/40 to-red-600/40",
    imageInitials: "CHR",
  },
  {
    id: "2",
    name: "Pikachu Illustrator",
    setName: "Promo",
    cardNumber: "—",
    rarity: "Promo",
    type: "graded",
    grade: "CGC 8.5",
    quantity: 1,
    purchasePrice: 3100,
    currentPrice: 3920,
    imageBg: "from-yellow-400/40 to-amber-600/40",
    imageInitials: "PIK",
  },
  {
    id: "3",
    name: "Booster Box — 151",
    setName: "Scarlet & Violet",
    cardNumber: "Sealed",
    rarity: "Sealed",
    type: "sealed",
    quantity: 4,
    purchasePrice: 220,
    currentPrice: 285,
    imageBg: "from-purple-500/40 to-pink-600/40",
    imageInitials: "151",
  },
  {
    id: "4",
    name: "Umbreon VMAX (Alt Art)",
    setName: "Evolving Skies",
    cardNumber: "215/203",
    rarity: "Secret Rare",
    type: "raw",
    quantity: 2,
    purchasePrice: 480,
    currentPrice: 612,
    imageBg: "from-slate-700/60 to-zinc-900/60",
    imageInitials: "UMB",
  },
  {
    id: "5",
    name: "Lugia V (Alt Art)",
    setName: "Silver Tempest",
    cardNumber: "186/195",
    rarity: "Ultra Rare",
    type: "raw",
    quantity: 1,
    purchasePrice: 290,
    currentPrice: 245,
    imageBg: "from-sky-500/40 to-indigo-700/40",
    imageInitials: "LUG",
  },
  {
    id: "6",
    name: "ETB — Crown Zenith",
    setName: "Sword & Shield",
    cardNumber: "Sealed",
    rarity: "Sealed",
    type: "sealed",
    quantity: 3,
    purchasePrice: 60,
    currentPrice: 95,
    imageBg: "from-amber-400/30 to-yellow-700/40",
    imageInitials: "CZ",
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
  imageBg: string;
  initials: string;
  condition: string;
  set: string;
}

export const mockListings: MockListing[] = [
  {
    id: "l1",
    title: "Moonbreon (Alt Art)",
    vendor: "EdinburghCards",
    vendorVerified: true,
    price: 612,
    imageBg: "from-slate-700/60 to-zinc-900/60",
    initials: "UMB",
    condition: "NM",
    set: "Evolving Skies",
  },
  {
    id: "l2",
    title: "Charizard 4/102",
    vendor: "TCG Vault NYC",
    vendorVerified: true,
    price: 3850,
    imageBg: "from-orange-500/40 to-red-600/40",
    initials: "CHR",
    condition: "PSA 9",
    set: "Base Set",
  },
  {
    id: "l3",
    title: "Booster Box — Obsidian Flames",
    vendor: "EdinburghCards",
    vendorVerified: true,
    price: 132,
    imageBg: "from-orange-600/40 to-red-800/40",
    initials: "OBF",
    condition: "Sealed",
    set: "Scarlet & Violet",
  },
  {
    id: "l4",
    title: "Lugia V Alt Art",
    vendor: "GradedGoodies",
    vendorVerified: false,
    price: 268,
    imageBg: "from-sky-500/40 to-indigo-700/40",
    initials: "LUG",
    condition: "NM",
    set: "Silver Tempest",
  },
  {
    id: "l5",
    title: "Pikachu Illustrator (Replica)",
    vendor: "TCG Vault NYC",
    vendorVerified: true,
    price: 4400,
    imageBg: "from-yellow-400/40 to-amber-600/40",
    initials: "PIK",
    condition: "CGC 8.5",
    set: "Promo",
  },
  {
    id: "l6",
    title: "ETB — Crown Zenith",
    vendor: "EdinburghCards",
    vendorVerified: true,
    price: 95,
    imageBg: "from-amber-400/30 to-yellow-700/40",
    initials: "CZ",
    condition: "Sealed",
    set: "Sword & Shield",
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
