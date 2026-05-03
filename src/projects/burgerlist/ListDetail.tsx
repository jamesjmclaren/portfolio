"use client";

import { Star, ArrowLeft, Share2, Heart } from "lucide-react";
import { listEntries } from "./data";

export default function BurgerlistListDetail() {
  return (
    <div className="min-h-full bg-stone-50 text-stone-900 font-sans">
      <header className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-stone-200 px-6 py-3">
        <div className="mx-auto max-w-5xl flex items-center justify-between">
          <button className="flex items-center gap-1.5 text-sm text-stone-600 hover:text-stone-900">
            <ArrowLeft className="size-4" /> Back
          </button>
          <div className="flex items-center gap-2">
            <button className="text-sm text-stone-600 hover:text-stone-900 flex items-center gap-1.5">
              <Share2 className="size-4" /> Share
            </button>
            <button className="rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-sm font-medium px-3 py-1.5 flex items-center gap-1.5">
              <Heart className="size-4" /> Follow list
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-6">
        {/* List header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="size-14 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-lg">
            EDI
          </div>
          <div>
            <h1 className="text-2xl font-bold">Edinburgh's best burgers</h1>
            <p className="text-sm text-stone-500">
              by James M. · 4 burgers · 187 followers
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-6">
          {/* Entries */}
          <div className="space-y-3">
            {listEntries.map((e, i) => (
              <article
                key={e.id}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden flex"
              >
                <div
                  className={`w-32 shrink-0 bg-gradient-to-br ${e.bg} flex items-center justify-center font-mono font-bold text-white/80 text-xl relative`}
                >
                  {e.initials}
                  <div className="absolute top-2 left-2 bg-white/90 backdrop-blur size-6 rounded-full flex items-center justify-center text-[10px] font-black text-stone-900">
                    {i + 1}
                  </div>
                </div>
                <div className="p-4 flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <h3 className="font-bold truncate">{e.name}</h3>
                    <span className="flex items-center gap-1 text-sm shrink-0">
                      <Star className="size-3.5 fill-amber-500 text-amber-500" />
                      <span className="font-bold">{e.rating}</span>
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mb-2">{e.spot}</p>
                  <p className="text-sm text-stone-700 leading-relaxed">
                    {e.notes}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* Mock map */}
          <aside className="lg:sticky lg:top-20 h-fit">
            <div className="rounded-2xl border border-stone-200 bg-white overflow-hidden">
              <div className="px-4 py-3 border-b border-stone-200 flex items-center justify-between">
                <h3 className="font-semibold text-sm">Map view</h3>
                <span className="text-[10px] uppercase tracking-wider text-stone-500">
                  Google Maps
                </span>
              </div>
              <div className="relative aspect-square bg-gradient-to-br from-emerald-100 via-stone-100 to-blue-100 overflow-hidden">
                {/* Faux roads */}
                <svg
                  className="absolute inset-0 w-full h-full text-stone-300"
                  preserveAspectRatio="none"
                  viewBox="0 0 100 100"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M 0 30 Q 30 25 50 35 T 100 50" strokeWidth="0.6" />
                  <path d="M 20 0 L 25 100" strokeWidth="0.6" />
                  <path d="M 0 70 Q 40 65 80 75 T 100 80" strokeWidth="0.6" />
                  <path d="M 60 0 Q 65 30 70 60 T 75 100" strokeWidth="0.6" />
                </svg>
                {/* Pins */}
                {listEntries.map((e, i) => (
                  <div
                    key={e.id}
                    className="absolute -translate-x-1/2 -translate-y-full"
                    style={{ left: `${e.pin.x}%`, top: `${e.pin.y}%` }}
                  >
                    <div className="size-7 rounded-full bg-orange-500 border-2 border-white shadow-md text-white text-[10px] font-bold flex items-center justify-center">
                      {i + 1}
                    </div>
                  </div>
                ))}
                <div className="absolute bottom-2 left-2 text-[10px] text-stone-500 bg-white/80 px-1.5 py-0.5 rounded">
                  © Mock map data
                </div>
              </div>
              <div className="p-3 text-xs text-stone-500">
                4 spots within 2.4 km · Edinburgh New Town
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
