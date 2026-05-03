export interface Channel {
  id: string;
  name: string;
  platform: "youtube" | "spotify" | "tiktok" | "itunes";
  subscribers: number;
  isOfficial: boolean;
  isPromoted?: boolean;
  liveStream?: boolean;
  blurb: string;
  initials: string;
  bg: string;
  latestVideoTitle: string;
  latestVideoAge: string;
}

export const arsenalChannels: Channel[] = [
  {
    id: "c1",
    name: "Arsenal Vision",
    platform: "youtube",
    subscribers: 312000,
    isOfficial: false,
    isPromoted: true,
    liveStream: true,
    blurb:
      "AI: Analytical match breakdowns and tactical reviews from a fan-led Arsenal community.",
    initials: "AV",
    bg: "from-red-600/40 to-rose-800/40",
    latestVideoTitle: "Arteta's masterstroke vs City — full tactical breakdown",
    latestVideoAge: "2h ago",
  },
  {
    id: "c2",
    name: "The Arsenal Opinion",
    platform: "youtube",
    subscribers: 187000,
    isOfficial: false,
    blurb: "AI: Daily reactions and transfer-window deep-dives.",
    initials: "TAO",
    bg: "from-red-700/40 to-orange-700/40",
    latestVideoTitle: "RUMOUR: Arsenal eyeing winter midfielder swoop",
    latestVideoAge: "5h ago",
  },
  {
    id: "c3",
    name: "Arsecast",
    platform: "spotify",
    subscribers: 94000,
    isOfficial: false,
    blurb: "AI: The original Arsenal podcast, hosted by Andrew Mangan.",
    initials: "AC",
    bg: "from-emerald-600/40 to-green-800/40",
    latestVideoTitle: "Arsecast Extra Episode 421 — North London is Red",
    latestVideoAge: "1d ago",
  },
  {
    id: "c4",
    name: "Gunners Daily",
    platform: "tiktok",
    subscribers: 540000,
    isOfficial: false,
    blurb: "AI: Short-form match clips and post-game reactions.",
    initials: "GD",
    bg: "from-pink-600/40 to-fuchsia-800/40",
    latestVideoTitle: "Saka's no-look pass had defenders frozen 🥶",
    latestVideoAge: "30m ago",
  },
  {
    id: "c5",
    name: "Arsenal Official",
    platform: "youtube",
    subscribers: 2400000,
    isOfficial: true,
    liveStream: true,
    blurb: "AI: The club's official channel — press conferences and matchday content.",
    initials: "AFC",
    bg: "from-red-500/50 to-red-900/60",
    latestVideoTitle: "INSIDE TRAINING | Sharpening up before Liverpool",
    latestVideoAge: "6h ago",
  },
];

export interface Fixture {
  home: string;
  away: string;
  homeBg: string;
  awayBg: string;
  date: string;
  competition: string;
  status: "upcoming" | "live" | "finished";
  homeScore?: number;
  awayScore?: number;
  minute?: string;
}

export const fixtures: Fixture[] = [
  {
    home: "Arsenal",
    away: "Liverpool",
    homeBg: "bg-red-600",
    awayBg: "bg-rose-700",
    date: "Sat 17:30",
    competition: "Premier League · MD 36",
    status: "upcoming",
  },
  {
    home: "Tottenham",
    away: "Chelsea",
    homeBg: "bg-slate-100 text-slate-900",
    awayBg: "bg-blue-700",
    date: "Today",
    competition: "Premier League · MD 36",
    status: "live",
    homeScore: 1,
    awayScore: 2,
    minute: "67'",
  },
  {
    home: "Man City",
    away: "Newcastle",
    homeBg: "bg-sky-500",
    awayBg: "bg-zinc-900",
    date: "Yesterday",
    competition: "Premier League · MD 35",
    status: "finished",
    homeScore: 3,
    awayScore: 1,
  },
];

export interface TrendingPodcast {
  show: string;
  episode: string;
  club: string;
  clubBg: string;
  initials: string;
  bg: string;
  duration: string;
  plays: string;
  platform: string;
}

export const trending: TrendingPodcast[] = [
  {
    show: "Arsenal Vision",
    episode: "Arteta's masterstroke vs City",
    club: "Arsenal",
    clubBg: "bg-red-600",
    initials: "AV",
    bg: "from-red-600/40 to-rose-800/40",
    duration: "42:18",
    plays: "12.4k",
    platform: "YouTube",
  },
  {
    show: "Quickly Kevin",
    episode: "The Liverpool dynasty, 25 years on",
    club: "Liverpool",
    clubBg: "bg-rose-700",
    initials: "QK",
    bg: "from-rose-600/40 to-red-900/40",
    duration: "1:08:42",
    plays: "8.9k",
    platform: "Spotify",
  },
  {
    show: "We're All Round The Back",
    episode: "Newcastle's Champions League blueprint",
    club: "Newcastle",
    clubBg: "bg-zinc-900",
    initials: "WB",
    bg: "from-zinc-700/50 to-black/60",
    duration: "55:11",
    plays: "6.2k",
    platform: "Spotify",
  },
  {
    show: "Why Always Us",
    episode: "City's title surge — what changed?",
    club: "Man City",
    clubBg: "bg-sky-500",
    initials: "WAU",
    bg: "from-sky-500/40 to-blue-800/40",
    duration: "38:04",
    plays: "5.7k",
    platform: "YouTube",
  },
  {
    show: "The Tottenham Way",
    episode: "Postecoglou's pragmatism",
    club: "Tottenham",
    clubBg: "bg-slate-100 text-slate-900",
    initials: "TTW",
    bg: "from-slate-300/30 to-slate-700/40",
    duration: "47:32",
    plays: "4.8k",
    platform: "iTunes",
  },
  {
    show: "Pride of London",
    episode: "Pochettino, year one — verdict",
    club: "Chelsea",
    clubBg: "bg-blue-700",
    initials: "POL",
    bg: "from-blue-600/40 to-indigo-800/40",
    duration: "1:12:08",
    plays: "4.1k",
    platform: "TikTok",
  },
];

export interface SyncRow {
  channel: string;
  platform: string;
  lastSync: string;
  status: "ok" | "warn" | "error";
  videos: number;
  quotaCost: number;
  message?: string;
}

export const syncRows: SyncRow[] = [
  {
    channel: "Arsenal Vision",
    platform: "YouTube (RSS)",
    lastSync: "12 min ago",
    status: "ok",
    videos: 5,
    quotaCost: 0,
  },
  {
    channel: "Arsenal Official",
    platform: "YouTube (Data)",
    lastSync: "1h ago",
    status: "ok",
    videos: 12,
    quotaCost: 47,
  },
  {
    channel: "Arsecast",
    platform: "Spotify",
    lastSync: "8 min ago",
    status: "ok",
    videos: 3,
    quotaCost: 0,
  },
  {
    channel: "Gunners Daily",
    platform: "TikTok (Blob)",
    lastSync: "23 min ago",
    status: "warn",
    videos: 8,
    quotaCost: 0,
    message: "Rate-limited; backed off for 30m",
  },
  {
    channel: "The Arsenal Opinion",
    platform: "YouTube (RSS)",
    lastSync: "4 min ago",
    status: "ok",
    videos: 5,
    quotaCost: 0,
  },
  {
    channel: "Liverpool Echo Pod",
    platform: "iTunes RSS",
    lastSync: "2h ago",
    status: "error",
    videos: 0,
    quotaCost: 0,
    message: "Feed returned 404 — needs manual review",
  },
];
