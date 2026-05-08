"use client";

import { useState } from "react";
import { Search, Bell, Sparkles, Star, Scale } from "lucide-react";
import { directoryTools, type Pricing } from "./data";
import ToolAvatar from "./ToolAvatar";

const categories = [
  "all",
  "chat",
  "image",
  "video",
  "audio",
  "code",
  "writing",
  "productivity",
  "research",
  "design",
  "marketing",
];

const pricingFilters: ("all" | Pricing)[] = [
  "all",
  "free",
  "freemium",
  "paid",
];

export default function CategorAisDirectory() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activePricing, setActivePricing] =
    useState<(typeof pricingFilters)[number]>("all");

  const visible = directoryTools.filter((t) => {
    const catOk =
      activeCategory === "all" || t.categories.includes(activeCategory);
    const priceOk = activePricing === "all" || t.pricing === activePricing;
    return catOk && priceOk;
  });

  return (
    <div
      className="min-h-full text-white font-sans"
      style={{
        background:
          "radial-gradient(ellipse at top left, rgba(0,217,255,0.10) 0%, transparent 50%), radial-gradient(ellipse at top right, rgba(168,85,247,0.10) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(236,72,153,0.08) 0%, transparent 50%), #0a0a0f",
      }}
    >
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur bg-[#0a0a0f]/80 border-b border-white/10 px-6 py-3">
        <div className="mx-auto max-w-5xl flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span
              className="size-8 rounded-xl flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, #00d9ff 0%, #a855f7 50%, #ec4899 100%)",
              }}
            >
              <span className="size-5 rounded-lg bg-[#0a0a0f]" />
            </span>
            <span className="font-bold tracking-tight">CategorAIs</span>
          </div>
          <div className="relative flex-1 max-w-md">
            <Search className="size-4 absolute left-3 top-2.5 text-white/40" />
            <input
              defaultValue=""
              placeholder="Search AI tools…"
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-1.5 text-sm placeholder:text-white/40 focus:outline-none focus:border-[#a855f7]/60"
            />
          </div>
          <button className="text-sm text-white/70 hover:text-white">
            Pricing
          </button>
          <button className="size-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70">
            <Bell className="size-4" />
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="px-6 pt-10 pb-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Discover the Best AI Tools
        </h1>
        <p className="mt-2 text-sm md:text-base text-white/60">
          Explore 350+ carefully curated AI platforms for every need
        </p>
        <div className="mt-5 inline-flex items-center gap-6 text-left">
          <Stat value="350+" label="AI Tools" />
          <span className="h-8 w-px bg-white/10" />
          <Stat value="20+" label="Categories" />
          <span className="h-8 w-px bg-white/10" />
          <Stat value="Free" label="Always" />
        </div>
        <div className="mt-6">
          <button
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white shadow-lg"
            style={{
              background:
                "linear-gradient(135deg, #00d9ff 0%, #a855f7 50%, #ec4899 100%)",
            }}
          >
            <Sparkles className="size-4" />
            Find My Perfect AI Tools
          </button>
        </div>
      </section>

      {/* Category chips */}
      <nav className="px-6 pb-3">
        <div className="mx-auto max-w-5xl flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`shrink-0 text-xs uppercase tracking-wider px-3 py-1.5 rounded-full border transition-colors ${
                activeCategory === c
                  ? "bg-white text-[#0a0a0f] border-white"
                  : "bg-white/5 text-white/70 border-white/10 hover:bg-white/10"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </nav>

      {/* Pricing chips */}
      <nav className="px-6 pb-4">
        <div className="mx-auto max-w-5xl flex gap-2 flex-wrap">
          {pricingFilters.map((p) => (
            <button
              key={p}
              onClick={() => setActivePricing(p)}
              className={`text-[11px] uppercase tracking-wider px-3 py-1 rounded-full border transition-colors ${
                activePricing === p
                  ? "border-[#a855f7] text-white bg-[#a855f7]/15"
                  : "border-white/10 text-white/60 hover:bg-white/5"
              }`}
            >
              {p === "all" ? "All pricing" : p}
            </button>
          ))}
        </div>
      </nav>

      {/* Tool grid */}
      <main className="px-6 pb-10">
        <div className="mx-auto max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visible.map((t) => (
            <article
              key={t.name}
              className="relative rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 transition-colors p-4 backdrop-blur"
            >
              <div className="absolute top-3 right-3 flex items-center gap-1">
                <button className="size-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-amber-400">
                  <Star className="size-3.5" />
                </button>
                <button className="size-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white">
                  <Scale className="size-3.5" />
                </button>
              </div>
              <span
                className={`inline-block text-[10px] uppercase tracking-wider rounded-full px-2 py-0.5 font-semibold ${pricingBadge(
                  t.pricing,
                )}`}
              >
                {t.pricing}
              </span>
              <div className="mt-3">
                <ToolAvatar
                  name={t.name}
                  logo={t.logo}
                  color={t.color}
                  size={48}
                />
              </div>
              <h3 className="mt-3 font-bold tracking-tight">{t.name}</h3>
              <p className="text-sm text-white/60 mt-1 leading-snug">
                {t.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {t.categories.slice(0, 2).map((c) => (
                  <span
                    key={c}
                    className="text-[10px] uppercase tracking-wider rounded-md px-1.5 py-0.5 bg-[#a855f7]/15 text-[#d8b4fe] border border-[#a855f7]/30"
                  >
                    {c}
                  </span>
                ))}
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {t.features.slice(0, 3).map((f) => (
                  <span
                    key={f}
                    className="text-[10px] text-white/60 bg-white/5 rounded-md px-1.5 py-0.5 border border-white/10"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        {visible.length === 0 && (
          <div className="mx-auto max-w-md text-center mt-12 text-white/50">
            <p className="text-sm">No tools match the current filters.</p>
          </div>
        )}
      </main>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div
        className="text-2xl font-bold leading-none"
        style={{
          background: "linear-gradient(135deg, #00d9ff 0%, #a855f7 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {value}
      </div>
      <div className="text-[10px] uppercase tracking-wider text-white/50 mt-1">
        {label}
      </div>
    </div>
  );
}

function pricingBadge(p: Pricing) {
  if (p === "free")
    return "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30";
  if (p === "freemium")
    return "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30";
  return "bg-pink-500/15 text-pink-300 border border-pink-500/30";
}
