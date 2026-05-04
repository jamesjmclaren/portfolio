"use client";

import { useMemo, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
} from "recharts";
import {
  RefreshCw,
  PlusCircle,
  ArrowUpRight,
  Search,
  Bell,
} from "lucide-react";
import WestSidebar from "./Sidebar";
import { chartData, mockAssets, stats } from "./data";

type Range = "1M" | "3M" | "1Y" | "All";

// Same colours as the live west.investments demo
const SERIES = [
  { key: "sealed", label: "Sealed Products", color: "#22c55e" },
  { key: "raw", label: "Raw Cards", color: "#f97316" },
  { key: "graded", label: "Graded Cards", color: "#a78bfa" },
];

function fmt(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

const typeBadge = {
  graded: { color: "text-[#a78bfa]", bg: "bg-[#a78bfa]/20", label: "Graded" },
  raw: { color: "text-[#f97316]", bg: "bg-[#f97316]/20", label: "Raw" },
  sealed: { color: "text-[#22c55e]", bg: "bg-[#22c55e]/20", label: "Sealed" },
};

export default function WestDashboard() {
  const [range, setRange] = useState<Range>("3M");
  const [visible, setVisible] = useState<Set<string>>(
    new Set(["sealed", "raw", "graded", "costBasis"]),
  );

  const data = useMemo(() => {
    const hidden = SERIES.filter((s) => !visible.has(s.key)).map((s) => s.key);
    if (!hidden.length && visible.has("costBasis")) return chartData;
    return chartData.map((p) => {
      const c = { ...p } as Record<string, number | string>;
      hidden.forEach((k) => (c[k] = 0));
      return c;
    });
  }, [visible]);

  const toggle = (k: string) =>
    setVisible((prev) => {
      const next = new Set(prev);
      next.has(k) ? next.delete(k) : next.add(k);
      return next;
    });

  return (
    <div className="flex h-full bg-[#080808] text-[#f5f0e8] font-sans">
      <WestSidebar active="/dashboard" />

      <div className="flex-1 overflow-y-auto">
        {/* Top bar */}
        <header className="sticky top-0 z-10 bg-[#080808]/90 backdrop-blur border-b border-[#2a2a2a] px-6 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold">Dashboard</h1>
            <p className="text-xs text-[#6b6355] mt-0.5">
              Track your investment portfolio.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative hidden md:block">
              <Search className="size-4 absolute left-2.5 top-2.5 text-[#6b6355]" />
              <input
                placeholder="Search assets…"
                className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg pl-8 pr-3 py-1.5 text-sm w-56 focus:outline-none focus:border-[#D4AF37]/50"
              />
            </div>
            <button className="size-8 rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] flex items-center justify-center text-[#a09882] hover:text-[#f5f0e8]">
              <Bell className="size-4" />
            </button>
            <button className="hidden md:flex items-center gap-1.5 rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] text-[#a09882] hover:text-[#f5f0e8] text-sm font-medium px-3 py-1.5">
              <RefreshCw className="size-3.5" /> Refresh prices
            </button>
            <button className="flex items-center gap-1.5 rounded-lg bg-[#D4AF37] hover:bg-[#E5C158] text-[#080808] text-sm font-semibold px-3 py-1.5">
              <PlusCircle className="size-4" /> Add Asset
            </button>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Stat row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <StatTile
              label="Total Value"
              value={fmt(stats.totalValue)}
              change={`+${fmt(stats.totalProfit)} (${stats.profitPercent}%)`}
              positive
            />
            <StatTile label="Total Invested" value={fmt(stats.totalInvested)} />
            <StatTile
              label="Total P/L"
              value={fmt(stats.totalProfit)}
              change={`+${stats.profitPercent}%`}
              positive
            />
            <StatTile
              label="Total Assets"
              value={String(stats.totalAssets)}
            />
          </div>

          {/* Chart */}
          <div className="rounded-2xl border border-[#2a2a2a] bg-[#111] p-5">
            <div className="flex items-start justify-between gap-3 mb-4 flex-wrap">
              <div>
                <h3 className="font-semibold text-sm">Portfolio Value</h3>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-xl font-bold">{fmt(stats.totalValue)}</span>
                  <span className="text-xs font-medium text-[#22c55e]">
                    +{fmt(stats.totalProfit)}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 text-[10px] text-[#6b6355]">
                  <span><span className="inline-block size-1.5 rounded-full bg-[#a78bfa] mr-1" />Graded Cards: {fmt(stats.graded)}</span>
                  <span><span className="inline-block size-1.5 rounded-full bg-[#f97316] mr-1" />Raw Cards: {fmt(stats.raw)}</span>
                  <span><span className="inline-block size-1.5 rounded-full bg-[#22c55e] mr-1" />Sealed Products: {fmt(stats.sealed)}</span>
                </div>
              </div>
              <div className="flex rounded-md border border-[#2a2a2a] overflow-hidden">
                {(["1M", "3M", "1Y", "All"] as Range[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => setRange(r)}
                    className={`px-2.5 py-1 text-[10px] font-semibold transition-colors ${
                      r === range
                        ? "bg-[#D4AF37] text-[#080808]"
                        : "text-[#6b6355] hover:text-[#f5f0e8]"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    {SERIES.map((s) => (
                      <linearGradient key={s.key} id={`g-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={s.color} stopOpacity={0.4} />
                        <stop offset="95%" stopColor={s.color} stopOpacity={0.02} />
                      </linearGradient>
                    ))}
                  </defs>
                  <CartesianGrid stroke="#2a2a2a" strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="date"
                    tick={{ fill: "#6b6355", fontSize: 10 }}
                    tickFormatter={(v) =>
                      new Date(v).toLocaleString("en", {
                        month: "short",
                        day: "numeric",
                      })
                    }
                    minTickGap={40}
                    stroke="#2a2a2a"
                  />
                  <YAxis
                    tick={{ fill: "#6b6355", fontSize: 10 }}
                    tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                    stroke="#2a2a2a"
                    width={50}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#1a1a1a",
                      border: "1px solid #2a2a2a",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                    labelStyle={{ color: "#a09882" }}
                    formatter={(v: number) => fmt(v)}
                  />
                  {SERIES.map((s) => (
                    <Area
                      key={s.key}
                      type="monotone"
                      dataKey={s.key}
                      stackId="1"
                      stroke={s.color}
                      fill={`url(#g-${s.key})`}
                      strokeWidth={1.5}
                    />
                  ))}
                  {visible.has("costBasis") && (
                    <Line
                      type="monotone"
                      dataKey="costBasis"
                      stroke="#9090a8"
                      strokeWidth={1}
                      strokeDasharray="6 4"
                      dot={false}
                    />
                  )}
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {SERIES.map((s) => (
                <button
                  key={s.key}
                  onClick={() => toggle(s.key)}
                  className={`flex items-center gap-1.5 text-[10px] px-2 py-1 rounded-md border transition-colors ${
                    visible.has(s.key)
                      ? "border-[#2a2a2a] bg-[#1a1a1a] text-[#f5f0e8]"
                      : "border-[#2a2a2a] bg-transparent text-[#6b6355]"
                  }`}
                >
                  <span className="size-2 rounded-full" style={{ background: s.color }} />
                  {s.label}
                </button>
              ))}
              <button
                onClick={() => toggle("costBasis")}
                className={`flex items-center gap-1.5 text-[10px] px-2 py-1 rounded-md border transition-colors ${
                  visible.has("costBasis")
                    ? "border-[#2a2a2a] bg-[#1a1a1a] text-[#f5f0e8]"
                    : "border-[#2a2a2a] bg-transparent text-[#6b6355]"
                }`}
              >
                <span className="w-3 h-px border-t border-dashed border-[#9090a8]" />
                Cost Basis
              </button>
            </div>
          </div>

          {/* Top Performers */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold">Top Performers</h3>
              <button className="text-xs text-[#D4AF37] hover:text-[#E5C158] flex items-center gap-1">
                View All <ArrowUpRight className="size-3" />
              </button>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              {mockAssets.map((a) => {
                const value = a.currentPrice * a.quantity;
                const cost = a.purchasePrice * a.quantity;
                const pl = value - cost;
                const plPct = (pl / cost) * 100;
                const t = typeBadge[a.type];
                return (
                  <div
                    key={a.id}
                    className="rounded-xl border border-[#2a2a2a] bg-[#111] overflow-hidden hover:border-[#3a3a3a] transition-colors"
                  >
                    <div className="aspect-[4/3] bg-[#0c0c0c] relative overflow-hidden flex items-center justify-center p-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={a.imageUrl}
                        alt={a.name}
                        loading="lazy"
                        className="w-full h-full object-contain"
                      />
                      <div className="absolute top-2 left-2 flex gap-1">
                        <span
                          className={`px-1.5 py-0.5 rounded text-[9px] font-semibold ${t.bg} ${t.color}`}
                        >
                          {t.label}
                        </span>
                        {a.grade && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-[#D4AF37]/20 text-[#D4AF37]">
                            {a.grade}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="p-3">
                      <h4 className="text-xs font-semibold truncate">{a.name}</h4>
                      <p className="text-[10px] text-[#6b6355] mt-0.5">
                        {a.setName} #{a.cardNumber}
                      </p>
                      <div className="flex items-end justify-between mt-2">
                        <div>
                          <p className="text-[10px] text-[#6b6355]">Current Value</p>
                          <p className="text-sm font-bold">{fmt(value)}</p>
                        </div>
                        <div
                          className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                            pl >= 0
                              ? "bg-[#22c55e]/15 text-[#22c55e]"
                              : "bg-[#ef4444]/15 text-[#ef4444]"
                          }`}
                        >
                          {pl >= 0 ? "+" : ""}
                          {plPct.toFixed(1)}%
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-1.5 pt-1.5 border-t border-[#2a2a2a] text-[10px] text-[#6b6355]">
                        Invested {fmt(cost)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatTile({
  label,
  value,
  change,
  positive,
}: {
  label: string;
  value: string;
  change?: string;
  positive?: boolean;
}) {
  return (
    <div className="rounded-xl border border-[#2a2a2a] bg-[#111] p-4">
      <p className="text-xs text-[#6b6355]">{label}</p>
      <p className="text-lg font-bold mt-1 truncate">{value}</p>
      {change && (
        <p
          className={`text-xs font-medium mt-1 ${
            positive ? "text-[#22c55e]" : "text-[#a09882]"
          }`}
        >
          {change}
        </p>
      )}
    </div>
  );
}
