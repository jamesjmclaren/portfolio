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
import { arsenalChannels, fixtures } from "./data";

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

function formatSubs(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(0)}k`;
  return String(n);
}

export default function PrempodClubPage() {
  const live = fixtures.find((f) => f.status === "live");
  const upcoming = fixtures.find((f) => f.status === "upcoming");

  return (
    <div className="min-h-full bg-[#0b0d12] text-slate-100 font-sans">
      {/* Header */}
      <header className="border-b border-slate-800 bg-gradient-to-b from-red-950/40 to-transparent">
        <div className="mx-auto max-w-6xl px-6 py-6">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
            <a className="hover:text-slate-200">Premier League</a>
            <span>›</span>
            <span className="text-slate-200">Arsenal</span>
          </div>
          <div className="flex items-start gap-4">
            <div className="size-16 rounded-2xl bg-red-600 flex items-center justify-center font-bold text-2xl shrink-0">
              AFC
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl font-bold tracking-tight">Arsenal</h1>
              <p className="text-sm text-slate-400 mt-1">
                Premier League · 5 channels tracked · 3.5M subscribers combined
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
                  decorated clubs in English football. Currently managed by Mikel
                  Arteta, the Gunners are mid-rebuild and back in the title race —
                  expect podcasts heavy on tactical analysis, transfer rumour
                  rebuttals, and post-derby reactions.
                </p>
              </div>
            </div>
          </div>

          {/* Channels */}
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
                    <div
                      className={`size-12 rounded-xl bg-gradient-to-br ${c.bg} flex items-center justify-center font-bold text-sm shrink-0`}
                    >
                      {c.initials}
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
                        {c.blurb} · {formatSubs(c.subscribers)} subs
                      </p>
                      <div className="rounded-lg bg-slate-950/60 border border-slate-800 p-2.5 text-sm">
                        <p className="text-slate-200 truncate">
                          ▶ {c.latestVideoTitle}
                        </p>
                        <p className="text-[10px] text-slate-500 mt-0.5">
                          {c.latestVideoAge}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>

        <aside className="space-y-4">
          {/* Live fixture */}
          {(live || upcoming) && (
            <div className="rounded-xl border border-slate-800 bg-slate-900/40 overflow-hidden">
              <div className="px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider text-slate-400">
                  Next fixture
                </span>
                {live && (
                  <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-red-400">
                    <span className="size-1.5 rounded-full bg-red-500 animate-pulse" />
                    Live elsewhere
                  </span>
                )}
              </div>
              <div className="p-4 space-y-3">
                <p className="text-xs text-slate-400">
                  {upcoming?.competition} · {upcoming?.date}
                </p>
                <div className="flex items-center justify-between gap-3">
                  <Team name={upcoming!.home} bg={upcoming!.homeBg} />
                  <span className="text-xs text-slate-500 font-mono">VS</span>
                  <Team name={upcoming!.away} bg={upcoming!.awayBg} />
                </div>
                <button className="w-full text-xs rounded-lg bg-slate-800 hover:bg-slate-700 py-2 font-medium">
                  Pre-match podcasts (8)
                </button>
              </div>
            </div>
          )}

          {/* Recent fixtures */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
            <h3 className="text-[10px] uppercase tracking-wider text-slate-400 mb-3">
              Today across the league
            </h3>
            <div className="space-y-2.5">
              {fixtures.map((f, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div
                      className={`size-5 rounded ${f.homeBg} flex items-center justify-center text-[8px] font-bold shrink-0`}
                    >
                      {f.home.slice(0, 3).toUpperCase()}
                    </div>
                    <span className="truncate">{f.home}</span>
                  </div>
                  <span className="text-xs font-mono text-slate-400 px-2">
                    {f.status === "finished" || f.status === "live"
                      ? `${f.homeScore}–${f.awayScore}`
                      : "vs"}
                  </span>
                  <div className="flex items-center gap-2 min-w-0 justify-end">
                    <span className="truncate">{f.away}</span>
                    <div
                      className={`size-5 rounded ${f.awayBg} flex items-center justify-center text-[8px] font-bold shrink-0`}
                    >
                      {f.away.slice(0, 3).toUpperCase()}
                    </div>
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

function Team({ name, bg }: { name: string; bg: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5 flex-1 min-w-0">
      <div className={`size-12 rounded-lg ${bg} flex items-center justify-center font-bold text-xs`}>
        {name.slice(0, 3).toUpperCase()}
      </div>
      <span className="text-xs text-center truncate w-full">{name}</span>
    </div>
  );
}
