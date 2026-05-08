"use client";

import { useState } from "react";
import { Star, X, ExternalLink, Check } from "lucide-react";
import { featuredTool, similarToFeatured } from "./data";
import ToolAvatar from "./ToolAvatar";

export default function CategorAisToolDetail() {
  const [favorited, setFavorited] = useState(false);
  const tool = featuredTool;

  return (
    <div
      className="min-h-full text-white font-sans"
      style={{
        background:
          "radial-gradient(ellipse at top left, rgba(0,217,255,0.10) 0%, transparent 50%), radial-gradient(ellipse at top right, rgba(168,85,247,0.10) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(236,72,153,0.08) 0%, transparent 50%), #0a0a0f",
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#0a0a0f]/70 backdrop-blur-sm pointer-events-none" />

      <div className="relative flex items-start justify-center min-h-full p-6">
        <div className="w-full max-w-3xl rounded-2xl border border-white/10 bg-[#0a0a0f]/95 shadow-2xl overflow-hidden">
          <button className="absolute top-4 right-4 size-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 z-10">
            <X className="size-4" />
          </button>

          {/* Modal header */}
          <div className="px-6 pt-6 pb-4 flex items-start gap-4 border-b border-white/10">
            <ToolAvatar
              name={tool.name}
              logo={tool.logo}
              color={tool.color}
              size={64}
              rounded="rounded-2xl"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-2xl font-bold tracking-tight">
                  {tool.name}
                </h2>
                <span className="text-[10px] uppercase tracking-wider rounded-full px-2 py-0.5 bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-semibold">
                  {tool.pricing}
                </span>
                <button
                  onClick={() => setFavorited((f) => !f)}
                  className={`text-[11px] uppercase tracking-wider rounded-full px-2.5 py-0.5 inline-flex items-center gap-1 border ${
                    favorited
                      ? "bg-amber-500/15 text-amber-300 border-amber-500/40"
                      : "bg-white/5 text-white/60 border-white/10 hover:bg-white/10"
                  }`}
                >
                  <Star
                    className={`size-3 ${favorited ? "fill-amber-400" : ""}`}
                  />
                  {favorited ? "Favorited" : "Favorite"}
                </button>
              </div>
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-1 text-xs text-[#a855f7] hover:underline"
              >
                {tool.url.replace(/^https?:\/\//, "")}
                <ExternalLink className="size-3" />
              </a>
            </div>
          </div>

          {/* Screenshot */}
          {tool.preview && (
            <div className="relative aspect-[16/9] bg-white/5 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={tool.preview}
                alt={`${tool.name} screenshot`}
                loading="lazy"
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/80 to-transparent pointer-events-none" />
            </div>
          )}

          {/* Body */}
          <div className="px-6 py-5 space-y-6">
            <p className="text-sm md:text-base text-white/70 leading-relaxed">
              {tool.description}
            </p>

            {/* Meta */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="text-[11px] uppercase tracking-wider text-white/50 font-semibold mb-2">
                  Categories
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {tool.categories.map((c) => (
                    <span
                      key={c}
                      className="text-[10px] uppercase tracking-wider rounded-md px-2 py-0.5 bg-[#a855f7]/15 text-[#d8b4fe] border border-[#a855f7]/30"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-white/50 font-semibold mb-2">
                  Popularity
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full"
                      style={{
                        width: `${tool.popularity}%`,
                        background:
                          "linear-gradient(90deg, #00d9ff 0%, #a855f7 100%)",
                      }}
                    />
                  </div>
                  <span className="text-xs font-mono text-white/70">
                    {tool.popularity}/100
                  </span>
                </div>
              </div>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-sm font-semibold tracking-tight mb-3 flex items-center gap-2">
                <span className="size-5 rounded-md bg-[#a855f7]/15 border border-[#a855f7]/30 flex items-center justify-center text-[10px]">
                  ✦
                </span>
                Key features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {tool.features.map((f) => (
                  <div
                    key={f}
                    className="flex items-start gap-2 rounded-lg bg-white/[0.03] border border-white/10 px-3 py-2"
                  >
                    <Check className="size-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span className="text-sm text-white/80">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing tiers */}
            {tool.pricingTiers && (
              <div>
                <h3 className="text-sm font-semibold tracking-tight mb-3 flex items-center gap-2">
                  <span className="size-5 rounded-md bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-[10px]">
                    $
                  </span>
                  Pricing plans
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {tool.pricingTiers.map((t, i) => (
                    <div
                      key={t.name}
                      className={`rounded-xl border p-4 ${
                        i === 1
                          ? "bg-[#a855f7]/10 border-[#a855f7]/40"
                          : "bg-white/[0.03] border-white/10"
                      }`}
                    >
                      <div className="text-[11px] uppercase tracking-wider text-white/50 font-semibold">
                        {t.name}
                      </div>
                      <div className="text-xl font-bold mt-1.5">{t.price}</div>
                      <div className="text-xs text-white/60 mt-2 leading-snug">
                        {t.features}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Similar tools */}
            <div>
              <h3 className="text-sm font-semibold tracking-tight mb-3 flex items-center gap-2">
                <span className="size-5 rounded-md bg-pink-500/15 border border-pink-500/30 flex items-center justify-center text-[10px]">
                  ⌁
                </span>
                Similar tools
              </h3>
              <div className="space-y-2">
                {similarToFeatured.map((s) => (
                  <button
                    key={s.name}
                    className="w-full flex items-center gap-3 rounded-xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] hover:border-white/20 transition-colors px-3 py-2.5 text-left"
                  >
                    <ToolAvatar
                      name={s.name}
                      logo={s.logo}
                      color={s.color}
                      size={36}
                      rounded="rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium">{s.name}</div>
                      <div className="text-xs text-white/50 truncate">
                        {s.description}
                      </div>
                    </div>
                    <ExternalLink className="size-4 text-white/40" />
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center w-full rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-lg"
              style={{
                background:
                  "linear-gradient(135deg, #00d9ff 0%, #a855f7 50%, #ec4899 100%)",
              }}
            >
              Visit {tool.name} →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
