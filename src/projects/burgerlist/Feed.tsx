"use client";

import { Star, MapPin, Heart, MessageCircle, Search, Bell } from "lucide-react";
import { feed } from "./data";

export default function BurgerlistFeed() {
  return (
    <div className="min-h-full bg-stone-50 text-stone-900 font-sans">
      <header className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-stone-200 px-6 py-3">
        <div className="mx-auto max-w-3xl flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="size-8 rounded-lg bg-orange-500 text-white flex items-center justify-center font-black text-sm">
              🍔
            </span>
            <span className="font-bold tracking-tight">burgerlist</span>
          </div>
          <div className="relative flex-1 max-w-xs">
            <Search className="size-4 absolute left-2.5 top-2.5 text-stone-400" />
            <input
              placeholder="Search burgers, spots, cities…"
              className="w-full bg-stone-100 border border-stone-200 rounded-lg pl-8 pr-3 py-1.5 text-sm focus:outline-none focus:border-orange-400"
            />
          </div>
          <button className="size-8 rounded-lg bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600">
            <Bell className="size-4" />
          </button>
          <div className="size-8 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold">
            JM
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-6 py-5 space-y-4">
        {feed.map((b) => (
          <article
            key={b.id}
            className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm"
          >
            <div className="px-4 py-3 flex items-center gap-3">
              <div
                className={`size-9 rounded-full ${b.user.color} text-white flex items-center justify-center text-xs font-bold`}
              >
                {b.user.initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm">
                  <span className="font-semibold">{b.user.name}</span>
                  <span className="text-stone-500"> tried </span>
                  <span className="font-semibold">{b.spot}</span>
                </p>
                <p className="text-xs text-stone-500 flex items-center gap-1">
                  <MapPin className="size-3" />
                  {b.city} · {b.ago}
                </p>
              </div>
            </div>

            <div
              className={`relative aspect-[16/9] bg-gradient-to-br ${b.bg} flex items-center justify-center`}
            >
              <span className="font-mono text-3xl font-bold text-white/80">
                {b.initials}
              </span>
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur rounded-lg px-2.5 py-1 flex items-center gap-1">
                <Star className="size-3.5 fill-amber-500 text-amber-500" />
                <span className="font-bold text-sm">{b.rating}</span>
              </div>
              <div className="absolute bottom-3 left-3 bg-emerald-500/95 text-white text-[10px] uppercase tracking-wider px-2 py-0.5 rounded font-semibold">
                AI moderated · approved
              </div>
            </div>

            <div className="px-4 py-3">
              <div className="flex items-baseline justify-between mb-1">
                <h3 className="font-bold">{b.name}</h3>
                <span className="text-sm text-stone-500">{b.price}</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {b.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] uppercase tracking-wider text-stone-600 bg-stone-100 rounded px-1.5 py-0.5"
                  >
                    #{t}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4 pt-2 border-t border-stone-100 text-stone-500">
                <button className="flex items-center gap-1.5 text-sm hover:text-rose-500">
                  <Heart className="size-4" /> {b.votes}
                </button>
                <button className="flex items-center gap-1.5 text-sm hover:text-stone-900">
                  <MessageCircle className="size-4" /> Comment
                </button>
                <button className="ml-auto text-xs font-medium text-orange-600 hover:text-orange-700">
                  Add to list →
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
