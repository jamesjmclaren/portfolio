export interface CodeSnippet {
  filename: string;
  language: string;
  code: string;
  caption: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  url?: string;
  repo: string;
  hidden?: boolean;
  pitch: string;
  longPitch: string;
  stack: string[];
  features: { title: string; body: string }[];
  codeSnippets: CodeSnippet[];
  accent: string;
}

export const projects: Project[] = [
  {
    slug: "west-investments",
    title: "West Investments",
    tagline: "Pokémon TCG portfolio tracker — fintech-grade UX for collectors",
    url: "https://west.investments",
    repo: "jamesjmclaren/pokemonAssets",
    hidden: true,
    pitch:
      "A full-stack portfolio tracker that aggregates real-time Pokémon TCG market prices across TCGPlayer, eBay and CardMarket, and visualises asset allocation through interactive charts.",
    longPitch:
      "West Investments is sat behind a Clerk auth wall, so screenshots tell only half the story. The interesting parts are the data plumbing and the design system — which are easier to show in code. Below: the chart composition, the multi-currency provider, and the gold-on-charcoal theme tokens.",
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
      {
        title: "Stacked portfolio chart",
        body: "Interactive area chart showing sealed / raw / graded composition, with toggleable series and time-range filtering. Y-axis rescales to visible series so hidden categories don't squash the curve.",
      },
      {
        title: "Multi-source price aggregation",
        body: "Real-time pulls from TCGPlayer, eBay and CardMarket, normalised to a single tier model with 7-day and 30-day deltas surfaced in the UI.",
      },
      {
        title: "Multi-currency context",
        body: "USD/GBP/EUR display with localStorage + Clerk metadata persistence, fallback rates and locale-aware formatting.",
      },
      {
        title: "Vendor marketplace",
        body: "Vendor verification, search modal, asset cards and sold-asset history — all built on a layered Supabase migration history (v3 → v13).",
      },
      {
        title: "Premium dark theme",
        body: "Custom Tailwind v4 theme with gold accent (#D4AF37), calibrated greys, custom scrollbars and shimmer skeletons.",
      },
    ],
    codeSnippets: [
      {
        filename: "src/components/PortfolioChart.tsx",
        language: "tsx",
        caption:
          "Stacked series toggling — Y-axis rescales by zeroing hidden series so the visible curve stays readable.",
        code: `// Stacked series (bottom to top): sealed, raw, graded
// These stack to form the total portfolio value
const STACKED_SERIES: Array<{ key: string; label: string; color: string }> = [
  { key: "sealed", label: "Sealed Products", color: "#22c55e" },
  { key: "raw", label: "Raw Cards", color: "#f97316" },
  { key: "graded", label: "Graded Cards", color: "#a78bfa" },
];

// Zero out hidden stacked series so the Y-axis rescales to visible data only
// Must be above early returns to preserve hook call order
const chartData = useMemo(() => {
  if (data.length === 0) return data;
  const hiddenKeys = STACKED_SERIES
    .filter((s) => !visibleSeries.has(s.key))
    .map((s) => s.key);
  if (hiddenKeys.length === 0 && visibleSeries.has("costBasis")) return data;
  return data.map((point) => {
    const p = { ...point };
    hiddenKeys.forEach((k) => ((p as Record<string, number>)[k] = 0));
    return p;
  });
}, [data, visibleSeries]);`,
      },
      {
        filename: "src/lib/currency-context.tsx",
        language: "tsx",
        caption:
          "Currency provider — three sources of truth (localStorage → Clerk metadata → default), with a typed guard.",
        code: `export type DisplayCurrency = "USD" | "GBP" | "EUR";

const FALLBACK_RATES: Record<DisplayCurrency, number> = {
  USD: 1, GBP: 0.787, EUR: 0.925,
};

function isDisplayCurrency(v: unknown): v is DisplayCurrency {
  return v === "USD" || v === "GBP" || v === "EUR";
}

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const [currency, setCurrencyState] = useState<DisplayCurrency>("USD");

  // Initial hydration: prefer localStorage → Clerk publicMetadata → default USD.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isDisplayCurrency(stored)) { setCurrencyState(stored); return; }
    const clerkPref = user?.unsafeMetadata?.displayCurrency;
    if (isDisplayCurrency(clerkPref)) {
      setCurrencyState(clerkPref);
      window.localStorage.setItem(STORAGE_KEY, clerkPref);
    }
  }, [user?.unsafeMetadata?.displayCurrency]);
  // ...
}`,
      },
      {
        filename: "src/app/globals.css",
        language: "css",
        caption:
          "The whole design system, in 20 lines. Tailwind v4 @theme tokens — gold accent over deep charcoal.",
        code: `@import "tailwindcss";

@theme {
  --color-background: #080808;
  --color-surface: #111111;
  --color-surface-elevated: #1e1e1e;
  --color-border: #2a2a2a;
  --color-text-primary: #f5f0e8;
  --color-text-secondary: #a09882;
  --color-accent: #D4AF37;
  --color-accent-hover: #E5C158;
  --color-accent-muted: rgba(212, 175, 55, 0.15);
  --color-success: #22c55e;
  --color-danger: #ef4444;
  --color-gold: #D4AF37;
}`,
      },
    ],
  },

  {
    slug: "prempod",
    title: "Prempod",
    tagline: "Premier League podcast discovery, aggregated across YouTube / Spotify / TikTok / iTunes",
    url: "https://prempod.com",
    repo: "jamesjmclaren/premleaguepodcasts",
    pitch:
      "A discovery platform that pulls podcasts and video from four platforms and stitches them onto live Premier League fixtures, club pages and trending discussion threads.",
    longPitch:
      "The hard part isn't the UI — it's the four-API choreography behind it. YouTube quotas, Spotify token rotation, TikTok blob storage, iTunes RSS. Below: the RSS-first YouTube fetcher (zero quota cost), and the Prisma schema that ties channels, videos, votes and clubs together.",
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
      {
        title: "Four-platform aggregation",
        body: "YouTube, Spotify, TikTok and iTunes podcast feeds aggregated and de-duplicated into a single club-centric feed.",
      },
      {
        title: "Live fixture correlation",
        body: "Football-data.io fixtures synced and pinned to club pages, so episodes appear next to the matches they're discussing.",
      },
      {
        title: "Quota-aware YouTube client",
        body: "RSS-first fetcher avoids YouTube API quota for the common case; falls back to the Data API only when richer metadata is needed.",
      },
      {
        title: "Trending & favourites",
        body: "Per-channel votes, click tracking and favourites — all stored relationally so analytics dashboards can reuse the data.",
      },
      {
        title: "AI-generated club intros",
        body: "Groq-generated short blurbs for each club, cached on the Club row and refreshed on demand from the admin panel.",
      },
    ],
    codeSnippets: [
      {
        filename: "src/lib/youtube.ts",
        language: "ts",
        caption:
          "RSS-first YouTube fetch — costs zero API quota and revalidates every 5 minutes.",
        code: `// Get videos from RSS feed (no API quota required)
export async function getVideosFromRss(
  channelId: string,
  maxResults: number = 5,
): Promise<YouTubeVideoInfo[]> {
  if (!channelId || channelId.trim() === "") return [];

  const response = await fetch(\`\${YOUTUBE_RSS_BASE}?channel_id=\${channelId}\`, {
    next: { revalidate: 300 }, // 5-minute edge cache
  });

  const xml = await response.text();
  return parseRssVideos(xml, maxResults);
}

function parseRssVideos(xml: string, maxResults = 5): YouTubeVideoInfo[] {
  const videos: YouTubeVideoInfo[] = [];
  const entryRegex = /<entry>([\\s\\S]*?)<\\/entry>/g;
  let match;
  while ((match = entryRegex.exec(xml)) !== null && videos.length < maxResults) {
    const entry = match[1];
    const videoId = entry.match(/<yt:videoId>([^<]+)<\\/yt:videoId>/)?.[1];
    if (!videoId) continue;
    const title = entry.match(/<title>([^<]+)<\\/title>/)?.[1] ?? "Untitled";
    const publishedAt = new Date(
      entry.match(/<published>([^<]+)<\\/published>/)?.[1] ?? Date.now(),
    );
    videos.push({
      id: videoId,
      title,
      publishedAt,
      thumbnail: \`https://i.ytimg.com/vi/\${videoId}/hqdefault.jpg\`,
    });
  }
  return videos;
}`,
      },
      {
        filename: "prisma/schema.prisma",
        language: "prisma",
        caption:
          "The relational core — League → Club → Channel → Video, with per-user Votes, Favorites and ChannelClicks.",
        code: `model League {
  id        String   @id @default(cuid())
  name      String
  slug      String   @unique
  clubs     Club[]
}

model Club {
  id          String              @id @default(cuid())
  name        String
  slug        String              @unique
  aiIntro     String?
  channels    Channel[]
  league      League?             @relation(fields: [leagueId], references: [id])
  leagueId    String?
  @@index([leagueId])
}

model Channel {
  id              String         @id @default(cuid())
  clubId          String
  platform        Platform
  externalId      String
  externalUrl     String
  name            String
  subscriberCount Int?
  isOfficial      Boolean        @default(false)
  doesLiveStream  Boolean        @default(false)
  aiBlurb         String?
  club            Club           @relation(fields: [clubId], references: [id], onDelete: Cascade)
  videos          Video[]
  votes           Vote[]
  favorites       Favorite[]
  clicks          ChannelClick[]

  @@unique([platform, externalId])
  @@index([clubId])
  @@index([platform])
}`,
      },
    ],
  },

  {
    slug: "burgerlist",
    title: "Burgerlist",
    tagline: "Social burger discovery — rate, list and share with AI-moderated photos",
    repo: "jamesjmclaren/burgerlist",
    pitch:
      "A social platform for burger fans: track what you've eaten, share lists, rate spots, and discover places nearby — with AI-moderated photo uploads and Google Maps location pickers.",
    longPitch:
      "Burgerlist is the playground project for trying new patterns: NextAuth with Google + Apple + credentials side-by-side, AWS-Rekognition-backed photo moderation through Cloudinary, and a clean ui/* component layer that keeps forms consistent.",
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
      {
        title: "Three auth providers, one session",
        body: "Google, Apple and credentials providers behind a single PrismaAdapter — JWT sessions, role on the token.",
      },
      {
        title: "AI-moderated photo uploads",
        body: "Cloudinary upload pipeline with optional AWS Rekognition moderation; rejected images flagged on upload and surfaced to admin.",
      },
      {
        title: "Location-aware lists",
        body: "Google Maps location picker, nearby-places tiles, and per-list map views.",
      },
      {
        title: "Reusable UI primitives",
        body: "Button / Input / Modal / TagInput / StarRating / VoteButtons — small, typed, tailwind-merge composable.",
      },
      {
        title: "Zod-validated routes",
        body: "Every API route validates with Zod before touching Prisma — types flow from schema to handler to client.",
      },
    ],
    codeSnippets: [
      {
        filename: "src/lib/cloudinary.ts",
        language: "ts",
        caption:
          "Optional AWS Rekognition moderation — turn it on per-environment via env var, surface status on the response.",
        code: `export async function uploadImage(
  fileBuffer: Buffer,
  options: UploadOptions = {},
): Promise<UploadResult> {
  const { folder = "burgerlist", moderation = true, transformation } = options;

  return new Promise((resolve, reject) => {
    const uploadOptions: Record<string, unknown> = {
      folder,
      resource_type: "image",
      transformation,
    };

    // Enable moderation if Cloudinary moderation add-on is enabled
    // Options: "aws_rek", "webpurify", "google_video_intelligence"
    if (moderation && process.env.CLOUDINARY_MODERATION_ENABLED === "true") {
      uploadOptions.moderation = "aws_rek";
    }

    cloudinary.uploader
      .upload_stream(uploadOptions, (error, result) => {
        if (error || !result) return reject(error ?? new Error("Upload failed"));

        let moderationStatus: UploadResult["moderation"];
        if (Array.isArray(result.moderation) && result.moderation.length > 0) {
          const mod = result.moderation[0] as { status?: string; kind?: string };
          moderationStatus = {
            status: (mod.status as "approved" | "rejected" | "pending") ?? "pending",
            reason: mod.kind,
          };
        }

        resolve({
          url: result.secure_url,
          publicId: result.public_id,
          width: result.width,
          height: result.height,
          moderation: moderationStatus,
        });
      })
      .end(fileBuffer);
  });
}`,
      },
      {
        filename: "src/lib/auth.ts",
        language: "ts",
        caption:
          "Three providers behind one PrismaAdapter — bcrypt-hashed credentials sit alongside Google and Apple OAuth.",
        code: `export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as NextAuthOptions["adapter"],
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    AppleProvider({
      clientId: process.env.APPLE_ID || "",
      clientSecret: process.env.APPLE_SECRET || "",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user?.password) throw new Error("Invalid credentials");
        const ok = await bcrypt.compare(credentials.password, user.password);
        if (!ok) throw new Error("Invalid credentials");
        return {
          id: user.id, email: user.email, name: user.name,
          image: user.image, role: user.role as UserRole,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
};`,
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
