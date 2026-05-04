// Channel + crest data lifted directly from prisma/seed.ts in the
// premleaguepodcasts repo — real channel IDs, real subscriber counts,
// real crests via football-data.org

export interface Channel {
  id: string;
  name: string;
  platform: "youtube" | "spotify" | "tiktok" | "itunes";
  externalUrl: string;
  subscribers: number | null;
  isOfficial: boolean;
  isPromoted?: boolean;
  liveStream?: boolean;
  description: string;
  logoUrl: string;
  latestVideoTitle: string;
  latestVideoAge: string;
}

const youtubeAvatar = (id: string) =>
  `https://yt3.googleusercontent.com/ytc/${id}=s160-c-k-c0x00ffffff-no-rj`;

export const arsenalChannels: Channel[] = [
  {
    id: "ch-arsenal-yt",
    name: "Arsenal",
    platform: "youtube",
    externalUrl: "https://www.youtube.com/@Arsenal",
    subscribers: 5_000_000,
    isOfficial: true,
    liveStream: true,
    description: "Official Arsenal YouTube channel",
    logoUrl:
      "https://yt3.googleusercontent.com/reJmvYrMFy1zy_iMdBxS8LuVEz-d5eLd6XrMSPJZKvGGGPLl1rPfWGqHCGaZsqlqGQ3oRTDBIw=s160-c-k-c0x00ffffff-no-rj",
    latestVideoTitle: "INSIDE TRAINING | Sharpening up before Liverpool",
    latestVideoAge: "6h ago",
  },
  {
    id: "ch-aftv",
    name: "AFTV",
    platform: "youtube",
    externalUrl: "https://www.youtube.com/@AFTVmedia",
    subscribers: 1_800_000,
    isOfficial: false,
    isPromoted: true,
    description: "Arsenal Fan TV — match reactions and fan voices",
    logoUrl: youtubeAvatar("AGIKgqOBjE3MfYQqtkT8H7gdL5SkX3Rk1nKRpQI8YQ=s160"),
    latestVideoTitle:
      "FAN CAM: Brutal post-match reaction after Liverpool draw",
    latestVideoAge: "2h ago",
  },
  {
    id: "ch-diff-knock",
    name: "The Diff Knock",
    platform: "youtube",
    externalUrl: "https://www.youtube.com/@TheDiffKnock",
    subscribers: 150_000,
    isOfficial: false,
    description: "Tactics, analysis and Arsenal data deep-dives",
    logoUrl: youtubeAvatar("AGIKgqMrrG2yTqVe-A_uZWuVrYjJl2lTUZQ"),
    latestVideoTitle: "Arteta's masterstroke vs City — full tactical breakdown",
    latestVideoAge: "1d ago",
  },
  {
    id: "ch-arsecast",
    name: "Arsecast",
    platform: "spotify",
    externalUrl: "https://open.spotify.com/show/1ToHPHEiVN6IcPSEaIiQfM",
    subscribers: null,
    isOfficial: false,
    description: "The world's most popular Arsenal podcast — Andrew Mangan",
    logoUrl:
      "https://i.scdn.co/image/ab6765630000ba8a7c4af2c3a6886ec9a4c93f33",
    latestVideoTitle: "Arsecast Extra Episode 421 — North London is Red",
    latestVideoAge: "3d ago",
  },
];

export interface Fixture {
  home: string;
  away: string;
  homeCrest: string;
  awayCrest: string;
  date: string;
  competition: string;
  status: "upcoming" | "live" | "finished";
  homeScore?: number;
  awayScore?: number;
  minute?: string;
}

// Crests via football-data.org — same source the live app uses
const crest = (id: number) => `https://crests.football-data.org/${id}.png`;

export const fixtures: Fixture[] = [
  {
    home: "Arsenal",
    away: "Liverpool",
    homeCrest: crest(57),
    awayCrest: crest(64),
    date: "Sat 17:30",
    competition: "Premier League · MD 36",
    status: "upcoming",
  },
  {
    home: "Tottenham",
    away: "Chelsea",
    homeCrest: crest(73),
    awayCrest: crest(61),
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
    homeCrest: crest(65),
    awayCrest: crest(67),
    date: "Yesterday",
    competition: "Premier League · MD 35",
    status: "finished",
    homeScore: 3,
    awayScore: 1,
  },
  {
    home: "Man United",
    away: "Brighton",
    homeCrest: crest(66),
    awayCrest: crest(397),
    date: "Yesterday",
    competition: "Premier League · MD 35",
    status: "finished",
    homeScore: 2,
    awayScore: 2,
  },
];

export interface TrendingPodcast {
  show: string;
  episode: string;
  club: string;
  clubCrest: string;
  thumbnail: string;
  duration: string;
  plays: string;
  platform: string;
}

export const trending: TrendingPodcast[] = [
  {
    show: "AFTV",
    episode: "FAN CAM: Brutal post-match reaction after Liverpool draw",
    club: "Arsenal",
    clubCrest: crest(57),
    thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    duration: "12:18",
    plays: "84.4k",
    platform: "YouTube",
  },
  {
    show: "The Anfield Wrap",
    episode: "Liverpool's title surge — what changed in midfield?",
    club: "Liverpool",
    clubCrest: crest(64),
    thumbnail: "https://i.ytimg.com/vi/9bZkp7q19f0/hqdefault.jpg",
    duration: "1:08:42",
    plays: "18.9k",
    platform: "Spotify",
  },
  {
    show: "Full Time Devils",
    episode: "Manchester United's striker problem",
    club: "Manchester United",
    clubCrest: crest(66),
    thumbnail: "https://i.ytimg.com/vi/jNQXAC9IVRw/hqdefault.jpg",
    duration: "47:32",
    plays: "12.7k",
    platform: "YouTube",
  },
  {
    show: "Why Always Us",
    episode: "City's title chase — Pep's tactical pivot",
    club: "Manchester City",
    clubCrest: crest(65),
    thumbnail: "https://i.ytimg.com/vi/L_jWHffIx5E/hqdefault.jpg",
    duration: "38:04",
    plays: "9.7k",
    platform: "YouTube",
  },
  {
    show: "The Tottenham Way",
    episode: "Postecoglou's pragmatism — verdict at year one",
    club: "Tottenham",
    clubCrest: crest(73),
    thumbnail: "https://i.ytimg.com/vi/3JZ_D3ELwOQ/hqdefault.jpg",
    duration: "47:32",
    plays: "8.8k",
    platform: "Spotify",
  },
  {
    show: "Football Weekly",
    episode: "Newcastle's Champions League blueprint",
    club: "Newcastle",
    clubCrest: crest(67),
    thumbnail: "https://i.ytimg.com/vi/M7lc1UVf-VE/hqdefault.jpg",
    duration: "55:11",
    plays: "6.2k",
    platform: "Spotify",
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
    channel: "Arsenal",
    platform: "YouTube (RSS)",
    lastSync: "12 min ago",
    status: "ok",
    videos: 5,
    quotaCost: 0,
  },
  {
    channel: "AFTV",
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
    channel: "The Diff Knock",
    platform: "YouTube (RSS)",
    lastSync: "23 min ago",
    status: "warn",
    videos: 0,
    quotaCost: 0,
    message: "Rate-limited; backed off for 30m",
  },
  {
    channel: "Liverpool FC",
    platform: "YouTube (RSS)",
    lastSync: "4 min ago",
    status: "ok",
    videos: 5,
    quotaCost: 0,
  },
  {
    channel: "The Anfield Wrap",
    platform: "Spotify",
    lastSync: "2h ago",
    status: "error",
    videos: 0,
    quotaCost: 0,
    message: "Token expired — refresh required",
  },
];

export const arsenalCrest = crest(57);
