"use client";

import {
  Trophy,
  Heart,
  Radio,
  Youtube,
  Music2,
  Headphones,
  Video,
  Sparkles,
} from "lucide-react";
import { arsenalChannels, fixtures, arsenalCrest } from "./data";

const platformIcon = {
  youtube: Youtube,
  spotify: Music2,
  itunes: Headphones,
  tiktok: Video,
};

const platformColor = {
  youtube: "text-red-500",
  spotify: "text-green-500",
  itunes: "text-purple-400",
  tiktok: "text-pink-400",
};

function formatSubs(n: number | null) {
  if (n === null) return "Spotify show";
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M subs`;
  if (n >= 1000) return `${(n / 1000).toFixed(0)}k subs`;
  return `${n} subs`;
}

export default function PrempodClubPage() {
  const upcoming = fixtures.find((f) => f.status === "upcoming");

  return (
    <div className="min-h-full bg-[#0b0d12] text-slate-100 font-sans">
      <header className="border-b border-slate-800 bg-gradient-to-b from-red-950/40 to-transparent">
        <div className="mx-auto max-w-6xl px-6 py-6">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
            <a className="hover:text-slate-200">Premier League</a>
            <span>›</span>
            <span className="text-slate-200">Arsenal</span>
          </div>
          <div className="flex items-start gap-4">
            <div className="size-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={arsenalCrest}
                alt="Arsenal"
                loading="eager"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl font-bold tracking-tight">Arsenal</h1>
              <p className="text-sm text-slate-400 mt-1">
                Premier League · {arsenalChannels.length} channels tracked ·
                7M+ combined subscribers
              </p>
              <div className="flex items-center gap-2 mt-3">
                <button className="rounded-lg bg-red-600 hover:bg-red-500 text-white text-sm font-medium px-3 py-1.5 flex items-center gap-1.5">
                  <Heart className="size-4" /> Follow
                </button>
                <button className="rounded-lg border border-slate-700 bg-slate-900 hover:bg-slate-800 text-sm px-3 py-1.5 flex items-center gap-1.5">
                  <Trophy className="size-4" /> Stats
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-6 grid lg:grid-cols-[1fr_280px] gap-6">
        <main className="space-y-4">
          {/* AI club intro */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
            <div className="flex items-start gap-3">
              <div className="size-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                <Sparkles className="size-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-purple-400 mb-1">
                  AI club intro · generated
                </p>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Arsenal Football Club, founded in 1886, is one of the most
                  decorated clubs in English football. Currently managed by
                  Mikel Arteta, the Gunners are mid-rebuild and back in the
                  title race — expect podcasts heavy on tactical analysis,
                  transfer rumour rebuttals, and post-derby reactions.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-2 mb-2">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Channels & podcasts
            </h2>
            <div className="flex items-center gap-1 text-xs">
              {["All", "YouTube", "Spotify", "TikTok"].map((t, i) => (
                <button
                  key={t}
                  className={`px-2.5 py-1 rounded-md ${
                    i === 0
                      ? "bg-slate-800 text-slate-100"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2.5">
            {arsenalChannels.map((c) => {
              const Icon = platformIcon[c.platform];
              return (
                <div
                  key={c.id}
                  className="rounded-xl border border-slate-800 bg-slate-900/30 hover:bg-slate-900/60 p-4 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="size-12 rounded-xl bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={c.logoUrl}
                        alt={c.name}
                        loading="lazy"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display = "none";
                          const sib = e.currentTarget.nextElementSibling;
                          if (sib) (sib as HTMLElement).style.display = "flex";
                        }}
                      />
                      <div
                        className="hidden w-full h-full items-center justify-center text-xs font-bold text-slate-300"
                        aria-hidden
                      >
                        {c.name.slice(0, 2).toUpperCase()}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center flex-wrap gap-2 mb-0.5">
                        <h3 className="font-semibold">{c.name}</h3>
                        <Icon className={`size-3.5 ${platformColor[c.platform]}`} />
                        {c.isOfficial && (
                          <span className="text-[10px] uppercase tracking-wider text-blue-400 border border-blue-500/40 bg-blue-500/10 rounded-full px-1.5">
                            Official
                          </span>
                        )}
                        {c.isPromoted && (
                          <span className="text-[10px] uppercase tracking-wider text-amber-400 border border-amber-500/40 bg-amber-500/10 rounded-full px-1.5">
                            Promoted
                          </span>
                        )}
                        {c.liveStream && (
                          <span className="text-[10px] uppercase tracking-wider text-red-400 border border-red-500/40 bg-red-500/10 rounded-full px-1.5 flex items-center gap-1">
                            <Radio className="size-2.5" /> Live
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mb-2">
                        {c.description} · {formatSubs(c.subscribers)}
                      </p>
                      <a
                        href={c.externalUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="block rounded-lg bg-slate-950/60 border border-slate-800 hover:bg-slate-950 p-2.5 text-sm transition-colors"
                      >
                        <p className="text-slate-200 truncate">
                          ▶ {c.latestVideoTitle}
                        </p>
                        <p className="text-[10px] text-slate-500 mt-0.5">
                          {c.latestVideoAge} · open on{" "}
                          {c.platform === "youtube" ? "YouTube" : "Spotify"}
                        </p>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>

        <aside className="space-y-4">
          {upcoming && (
            <div className="rounded-xl border border-slate-800 bg-slate-900/40 overflow-hidden">
              <div className="px-4 py-2.5 border-b border-slate-800">
                <span className="text-[10px] uppercase tracking-wider text-slate-400">
                  Next fixture
                </span>
              </div>
              <div className="p-4 space-y-3">
                <p className="text-xs text-slate-400">
                  {upcoming.competition} · {upcoming.date}
                </p>
                <div className="flex items-center justify-between gap-3">
                  <Team name={upcoming.home} crest={upcoming.homeCrest} />
                  <span className="text-xs text-slate-500 font-mono">VS</span>
                  <Team name={upcoming.away} crest={upcoming.awayCrest} />
                </div>
                <button className="w-full text-xs rounded-lg bg-slate-800 hover:bg-slate-700 py-2 font-medium">
                  Pre-match podcasts (8)
                </button>
              </div>
            </div>
          )}

          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
            <h3 className="text-[10px] uppercase tracking-wider text-slate-400 mb-3">
              Today across the league
            </h3>
            <div className="space-y-2.5">
              {fixtures.map((f, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between text-sm gap-2"
                >
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={f.homeCrest}
                      alt={f.home}
                      className="size-5 object-contain shrink-0"
                    />
                    <span className="truncate text-xs">{f.home}</span>
                  </div>
                  <span className="text-xs font-mono text-slate-400 px-2 shrink-0">
                    {f.status === "finished" || f.status === "live"
                      ? `${f.homeScore}–${f.awayScore}`
                      : "vs"}
                  </span>
                  <div className="flex items-center gap-2 min-w-0 flex-1 justify-end">
                    <span className="truncate text-xs text-right">{f.away}</span>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={f.awayCrest}
                      alt={f.away}
                      className="size-5 object-contain shrink-0"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Team({ name, crest }: { name: string; crest: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5 flex-1 min-w-0">
      <div className="size-12 rounded-lg bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center p-1.5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={crest} alt={name} className="w-full h-full object-contain" />
      </div>
      <span className="text-xs text-center truncate w-full">{name}</span>
    </div>
  );
}
