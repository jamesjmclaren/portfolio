"use client";

import { Play, Flame, Search, Youtube, Music2, Video, Headphones } from "lucide-react";
import { trending } from "./data";

const PILLS = ["All", "Premier League", "Match reactions", "Transfer talk", "Tactical"];

const platformIcon = {
  YouTube: Youtube,
  Spotify: Music2,
  TikTok: Video,
  iTunes: Headphones,
};

const platformColor: Record<string, string> = {
  YouTube: "text-red-500 bg-red-500/10",
  Spotify: "text-green-500 bg-green-500/10",
  TikTok: "text-pink-400 bg-pink-500/10",
  iTunes: "text-purple-400 bg-purple-500/10",
};

export default function PrempodDiscover() {
  return (
    <div className="min-h-full bg-[#0b0d12] text-slate-100 font-sans">
      <header className="border-b border-slate-800 px-6 py-4">
        <div className="mx-auto max-w-6xl flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-400">
              Discover
            </p>
            <h1 className="text-xl font-bold">What's hot in football podcasts</h1>
          </div>
          <div className="relative">
            <Search className="size-4 absolute left-2.5 top-2.5 text-slate-500" />
            <input
              placeholder="Search shows, clubs…"
              className="bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-sm w-64 focus:outline-none focus:border-blue-500/50"
            />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-6">
        <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-1">
          {PILLS.map((p, i) => (
            <button
              key={p}
              className={`text-xs px-3 py-1.5 rounded-full border whitespace-nowrap transition-colors ${
                i === 0
                  ? "border-blue-500 bg-blue-500/15 text-blue-400"
                  : "border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 mb-3">
          <Flame className="size-4 text-orange-400" />
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
            Trending this week
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {trending.map((t, i) => {
            const PIcon = platformIcon[t.platform as keyof typeof platformIcon];
            return (
              <div
                key={i}
                className="rounded-xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900 overflow-hidden group cursor-pointer transition-colors"
              >
                <div className="aspect-video relative bg-gradient-to-br from-slate-800 to-slate-950 flex items-center justify-center overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.clubCrest}
                    alt={t.club}
                    loading="lazy"
                    className="h-3/5 w-auto object-contain opacity-90 group-hover:scale-105 transition-transform"
                  />
                  <button className="absolute inset-0 bg-black/0 group-hover:bg-black/30 flex items-center justify-center transition-colors">
                    <span className="size-12 rounded-full bg-white/90 text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="size-5 fill-current ml-0.5" />
                    </span>
                  </button>
                  <span className="absolute bottom-2 right-2 text-[10px] bg-black/70 px-1.5 py-0.5 rounded font-mono">
                    {t.duration}
                  </span>
                  {PIcon && (
                    <span
                      className={`absolute top-2 left-2 inline-flex items-center gap-1 text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded font-medium ${platformColor[t.platform]}`}
                    >
                      <PIcon className="size-2.5" />
                      {t.platform}
                    </span>
                  )}
                </div>
                <div className="p-3.5">
                  <div className="flex items-center gap-2 mb-1">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={t.clubCrest}
                      alt=""
                      className="size-4 object-contain"
                    />
                    <span className="text-xs text-slate-400">{t.club}</span>
                    <span className="text-xs text-slate-600">·</span>
                    <span className="text-xs text-slate-400 truncate">{t.show}</span>
                  </div>
                  <h3 className="font-medium text-sm leading-snug mb-2 line-clamp-2">
                    {t.episode}
                  </h3>
                  <p className="text-[10px] text-slate-500">▶ {t.plays} plays</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
