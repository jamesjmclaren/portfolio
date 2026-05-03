"use client";

import { TrendingUp, TrendingDown, Minus, ExternalLink } from "lucide-react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import WestSidebar from "./Sidebar";
import { priceTiers, chartData } from "./data";

function fmt(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

function Delta({ value }: { value: number }) {
  if (value > 0.5)
    return (
      <span className="inline-flex items-center gap-0.5 text-xs text-[#22c55e]">
        <TrendingUp className="size-3" />+{value.toFixed(1)}%
      </span>
    );
  if (value < -0.5)
    return (
      <span className="inline-flex items-center gap-0.5 text-xs text-[#ef4444]">
        <TrendingDown className="size-3" />
        {value.toFixed(1)}%
      </span>
    );
  return (
    <span className="inline-flex items-center gap-0.5 text-xs text-[#6b6355]">
      <Minus className="size-3" />
      {value.toFixed(1)}%
    </span>
  );
}

const sparkData = chartData.slice(-30).map((p) => ({
  date: p.date,
  v: p.graded / 2 + Math.random() * 50,
}));

export default function WestAnalytics() {
  return (
    <div className="flex h-full bg-[#080808] text-[#f5f0e8] font-sans">
      <WestSidebar active="/collection" />

      <div className="flex-1 overflow-y-auto">
        <header className="sticky top-0 z-10 bg-[#080808]/90 backdrop-blur border-b border-[#2a2a2a] px-6 py-3">
          <p className="text-[10px] uppercase tracking-wider text-[#6b6355]">
            Asset detail
          </p>
          <h1 className="text-lg font-semibold">
            Charizard <span className="text-[#a09882] font-normal">· Base Set 4/102</span>
          </h1>
        </header>

        <div className="p-6 grid lg:grid-cols-[280px_1fr] gap-6">
          {/* Card image + meta */}
          <div className="space-y-4">
            <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-orange-500/40 to-red-700/40 border border-[#2a2a2a] flex items-center justify-center font-mono text-3xl font-bold text-[#f5f0e8]/90">
              CHR
            </div>
            <div className="rounded-2xl border border-[#2a2a2a] bg-[#111] p-4 space-y-2 text-sm">
              <Row label="Set" value="Base Set" />
              <Row label="Number" value="4/102" />
              <Row label="Rarity" value="Holo Rare" />
              <Row label="Released" value="1999-01-09" />
              <Row label="Held" value="×1 (PSA 9)" />
            </div>
          </div>

          {/* Price table + sparkline */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-[#2a2a2a] bg-[#111]">
              <div className="px-5 py-3 border-b border-[#2a2a2a] flex items-center justify-between">
                <h3 className="font-semibold text-sm">Live prices · graded tier</h3>
                <span className="text-[10px] text-[#6b6355] font-mono">
                  Refreshed 12 min ago
                </span>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[10px] uppercase tracking-wider text-[#6b6355] border-b border-[#2a2a2a]">
                    <th className="px-5 py-2.5 font-medium">Source</th>
                    <th className="px-3 py-2.5 font-medium text-right">Avg</th>
                    <th className="px-3 py-2.5 font-medium text-right hidden sm:table-cell">
                      Range
                    </th>
                    <th className="px-3 py-2.5 font-medium text-right">7d</th>
                    <th className="px-3 py-2.5 font-medium text-right">30d</th>
                    <th className="px-3 py-2.5 font-medium text-right hidden md:table-cell">
                      Sales
                    </th>
                    <th className="px-3 py-2.5 font-medium text-right pr-5"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2a2a2a]">
                  {priceTiers.map((t) => (
                    <tr key={t.source} className="hover:bg-[#1a1a1a]">
                      <td className="px-5 py-3 font-medium">{t.source}</td>
                      <td className="px-3 py-3 text-right font-semibold">
                        {fmt(t.avg)}
                      </td>
                      <td className="px-3 py-3 text-right text-[#a09882] hidden sm:table-cell">
                        {fmt(t.low)} – {fmt(t.high)}
                      </td>
                      <td className="px-3 py-3 text-right">
                        <Delta value={t.delta7d} />
                      </td>
                      <td className="px-3 py-3 text-right">
                        <Delta value={t.delta30d} />
                      </td>
                      <td className="px-3 py-3 text-right text-[#a09882] hidden md:table-cell">
                        {t.saleCount}
                      </td>
                      <td className="px-3 py-3 text-right pr-5">
                        <button className="text-[#D4AF37] hover:text-[#E5C158]">
                          <ExternalLink className="size-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="rounded-2xl border border-[#2a2a2a] bg-[#111] p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-sm">30-day price trend</h3>
                  <p className="text-xs text-[#6b6355]">Aggregated across sources</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[#6b6355]">
                    Current avg
                  </p>
                  <p className="font-bold text-lg text-right">$3,703</p>
                </div>
              </div>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={sparkData}>
                    <defs>
                      <linearGradient id="spark" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#D4AF37" stopOpacity={0.5} />
                        <stop offset="100%" stopColor="#D4AF37" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="date"
                      tick={{ fill: "#6b6355", fontSize: 9 }}
                      tickFormatter={(v) => v.slice(5)}
                      stroke="#2a2a2a"
                      minTickGap={30}
                    />
                    <YAxis
                      tick={{ fill: "#6b6355", fontSize: 9 }}
                      stroke="#2a2a2a"
                      width={40}
                      tickFormatter={(v) => `$${v.toFixed(0)}`}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "#1a1a1a",
                        border: "1px solid #2a2a2a",
                        borderRadius: 8,
                        fontSize: 11,
                      }}
                      labelStyle={{ color: "#a09882" }}
                    />
                    <Area
                      dataKey="v"
                      type="monotone"
                      stroke="#D4AF37"
                      strokeWidth={1.5}
                      fill="url(#spark)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between">
      <span className="text-[#6b6355] text-xs uppercase tracking-wider">
        {label}
      </span>
      <span className="text-[#f5f0e8] font-medium">{value}</span>
    </div>
  );
}
