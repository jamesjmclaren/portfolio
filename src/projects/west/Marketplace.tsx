"use client";

import { useState } from "react";
import { Search, Filter, ShieldCheck, Star, MapPin } from "lucide-react";
import WestSidebar from "./Sidebar";
import { mockListings, mockVendors } from "./data";

const FILTERS = ["All", "Sealed", "Graded", "Raw", "Under $200"];

function fmt(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function WestMarketplace() {
  const [filter, setFilter] = useState("All");

  return (
    <div className="flex h-full bg-[#080808] text-[#f5f0e8] font-sans">
      <WestSidebar active="/marketplace" />

      <div className="flex-1 overflow-y-auto">
        <header className="sticky top-0 z-10 bg-[#080808]/90 backdrop-blur border-b border-[#2a2a2a] px-6 py-3">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-[#6b6355]">
                Marketplace
              </p>
              <h1 className="text-lg font-semibold">Verified vendors</h1>
            </div>
            <div className="relative">
              <Search className="size-4 absolute left-2.5 top-2.5 text-[#6b6355]" />
              <input
                placeholder="Search listings…"
                className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg pl-8 pr-3 py-1.5 text-sm w-64 focus:outline-none focus:border-[#D4AF37]/50"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                  f === filter
                    ? "border-[#D4AF37] bg-[#D4AF37]/15 text-[#D4AF37]"
                    : "border-[#2a2a2a] bg-[#1a1a1a] text-[#a09882] hover:text-[#f5f0e8]"
                }`}
              >
                {f}
              </button>
            ))}
            <button className="text-xs px-3 py-1.5 rounded-full border border-[#2a2a2a] bg-[#1a1a1a] text-[#a09882] hover:text-[#f5f0e8] flex items-center gap-1.5 ml-auto">
              <Filter className="size-3" /> More filters
            </button>
          </div>
        </header>

        <div className="p-6 grid lg:grid-cols-[1fr_260px] gap-6">
          <div>
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {mockListings.map((l) => (
                <div
                  key={l.id}
                  className="rounded-2xl border border-[#2a2a2a] bg-[#111] overflow-hidden hover:border-[#3a3a3a] hover:bg-[#17171c] transition-colors group cursor-pointer"
                >
                  <div className="aspect-[4/3] bg-[#0c0c0c] p-3 flex items-center justify-center overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={l.imageUrl}
                      alt={l.title}
                      loading="lazy"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-medium text-sm truncate">{l.title}</h3>
                      <span className="text-[10px] uppercase tracking-wider text-[#D4AF37] shrink-0">
                        {l.condition}
                      </span>
                    </div>
                    <p className="text-xs text-[#6b6355] truncate mb-3">
                      {l.set}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="text-xs text-[#a09882] truncate">
                          {l.vendor}
                        </span>
                        {l.vendorVerified && (
                          <ShieldCheck className="size-3 text-[#D4AF37] shrink-0" />
                        )}
                      </div>
                      <p className="font-semibold text-sm">{fmt(l.price)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-[#2a2a2a] bg-[#111] p-4">
              <h3 className="text-xs uppercase tracking-wider text-[#6b6355] mb-3">
                Top vendors
              </h3>
              <div className="space-y-3">
                {mockVendors.map((v) => (
                  <div key={v.id} className="flex items-center gap-3">
                    <div className="size-9 rounded-lg bg-gradient-to-br from-[#D4AF37]/30 to-[#a08428]/30 flex items-center justify-center text-xs font-bold text-[#D4AF37]">
                      {v.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <p className="text-sm font-medium truncate">{v.name}</p>
                        {v.verified && (
                          <ShieldCheck className="size-3 text-[#D4AF37] shrink-0" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-[#6b6355]">
                        <span className="flex items-center gap-0.5">
                          <Star className="size-2.5 fill-[#D4AF37] text-[#D4AF37]" />
                          {v.rating}
                        </span>
                        <span>·</span>
                        <span>{v.itemCount} listings</span>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-[#6b6355] mt-0.5">
                        <MapPin className="size-2.5" />
                        {v.location}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-[#D4AF37]/40 bg-gradient-to-br from-[#D4AF37]/15 to-transparent p-4">
              <p className="text-[10px] uppercase tracking-wider text-[#D4AF37] mb-1">
                Become a vendor
              </p>
              <p className="text-sm text-[#f5f0e8] mb-2">
                List your collection and reach verified collectors.
              </p>
              <button className="text-xs font-medium text-[#D4AF37] hover:text-[#E5C158]">
                Apply for verification →
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
