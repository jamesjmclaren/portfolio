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
  Wallet,
  TrendingUp,
  Layers,
  Activity,
  Search,
  Plus,
  Bell,
} from "lucide-react";
import WestSidebar from "./Sidebar";
import { chartData, mockAssets } from "./data";

type Range = "1M" | "3M" | "1Y" | "All";

const SERIES = [
  { key: "sealed", label: "Sealed", color: "#22c55e" },
  { key: "raw", label: "Raw", color: "#f97316" },
  { key: "graded", label: "Graded", color: "#a78bfa" },
];

function fmt(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function WestDashboard() {
  const [range, setRange] = useState<Range>("3M");
  const [visible, setVisible] = useState<Set<string>>(
    new Set(["sealed", "raw", "graded", "costBasis"]),
  );

  const filtered = useMemo(() => {
    const days = range === "1M" ? 30 : range === "3M" ? 90 : range === "1Y" ? 365 : 9999;
    return chartData.slice(-days);
  }, [range]);

  const data = useMemo(() => {
    const hidden = SERIES.filter((s) => !visible.has(s.key)).map((s) => s.key);
    if (!hidden.length && visible.has("costBasis")) return filtered;
    return filtered.map((p) => {
      const c = { ...p } as Record<string, number | string>;
      hidden.forEach((k) => (c[k] = 0));
      return c;
    });
  }, [filtered, visible]);

  const last = chartData[chartData.length - 1];
  const totalValue = last.total;
  const totalCost = last.costBasis;
  const profit = totalValue - totalCost;
  const profitPct = (profit / totalCost) * 100;

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
            <p className="text-[10px] uppercase tracking-wider text-[#6b6355]">
              Portfolio
            </p>
            <h1 className="text-lg font-semibold">Main Collection</h1>
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
            <button className="flex items-center gap-1.5 rounded-lg bg-[#D4AF37] hover:bg-[#E5C158] text-[#080808] text-sm font-medium px-3 py-1.5">
              <Plus className="size-4" /> Add asset
            </button>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Stat row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <StatTile
              label="Portfolio value"
              value={fmt(totalValue)}
              change={`${profitPct >= 0 ? "+" : ""}${profitPct.toFixed(1)}% all time`}
              tone={profit >= 0 ? "pos" : "neg"}
              icon={Wallet}
            />
            <StatTile
              label="Total invested"
              value={fmt(totalCost)}
              change="Cost basis"
              tone="neutral"
              icon={Layers}
            />
            <StatTile
              label="Unrealised P&L"
              value={fmt(profit)}
              change={`${fmt(profit / 12)} / mo avg`}
              tone={profit >= 0 ? "pos" : "neg"}
              icon={TrendingUp}
            />
            <StatTile
              label="Assets tracked"
              value={String(mockAssets.length)}
              change="6 sources, 3 currencies"
              tone="neutral"
              icon={Activity}
            />
          </div>

          {/* Chart */}
          <div className="rounded-2xl border border-[#2a2a2a] bg-[#111] p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold">Portfolio value over time</h3>
                <p className="text-xs text-[#6b6355] mt-0.5">
                  Stacked composition · cost basis overlay
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs">
                {(["1M", "3M", "1Y", "All"] as Range[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => setRange(r)}
                    className={`px-2.5 py-1 rounded-md transition-colors ${
                      r === range
                        ? "bg-[#D4AF37] text-[#080808] font-medium"
                        : "text-[#a09882] hover:text-[#f5f0e8]"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    {SERIES.map((s) => (
                      <linearGradient key={s.key} id={`g-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={s.color} stopOpacity={0.5} />
                        <stop offset="95%" stopColor={s.color} stopOpacity={0.05} />
                      </linearGradient>
                    ))}
                  </defs>
                  <CartesianGrid stroke="#2a2a2a" strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="date"
                    tick={{ fill: "#6b6355", fontSize: 10 }}
                    tickFormatter={(v) => v.slice(5)}
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
                      strokeWidth={1.5}
                      strokeDasharray="4 4"
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
                  className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md border transition-colors ${
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
                className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md border transition-colors ${
                  visible.has("costBasis")
                    ? "border-[#2a2a2a] bg-[#1a1a1a] text-[#f5f0e8]"
                    : "border-[#2a2a2a] bg-transparent text-[#6b6355]"
                }`}
              >
                <span className="w-3 h-px border-t border-dashed border-[#9090a8]" />
                Cost basis
              </button>
            </div>
          </div>

          {/* Recent assets */}
          <div className="rounded-2xl border border-[#2a2a2a] bg-[#111]">
            <div className="px-5 py-4 border-b border-[#2a2a2a] flex items-center justify-between">
              <h3 className="font-semibold">Recent assets</h3>
              <button className="text-xs text-[#D4AF37] hover:text-[#E5C158]">
                View all →
              </button>
            </div>
            <div className="divide-y divide-[#2a2a2a]">
              {mockAssets.slice(0, 5).map((a) => {
                const value = a.currentPrice * a.quantity;
                const cost = a.purchasePrice * a.quantity;
                const pl = value - cost;
                const plPct = (pl / cost) * 100;
                return (
                  <div
                    key={a.id}
                    className="flex items-center gap-3 px-5 py-3 hover:bg-[#1a1a1a] transition-colors"
                  >
                    <div
                      className={`size-10 rounded-lg bg-gradient-to-br ${a.imageBg} flex items-center justify-center font-mono text-[10px] font-bold text-[#f5f0e8]/90 shrink-0`}
                    >
                      {a.imageInitials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm truncate">
                        {a.name}{" "}
                        {a.grade && (
                          <span className="text-[10px] uppercase tracking-wider text-[#D4AF37] ml-1">
                            {a.grade}
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-[#6b6355] truncate">
                        {a.setName} · {a.cardNumber} · ×{a.quantity}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-medium text-sm">{fmt(value)}</p>
                      <p
                        className={`text-xs ${
                          pl >= 0 ? "text-[#22c55e]" : "text-[#ef4444]"
                        }`}
                      >
                        {pl >= 0 ? "+" : ""}
                        {plPct.toFixed(1)}%
                      </p>
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
  tone,
  icon: Icon,
}: {
  label: string;
  value: string;
  change: string;
  tone: "pos" | "neg" | "neutral";
  icon: typeof Wallet;
}) {
  const toneClass =
    tone === "pos"
      ? "text-[#22c55e]"
      : tone === "neg"
      ? "text-[#ef4444]"
      : "text-[#a09882]";
  const bgClass =
    tone === "pos"
      ? "bg-[#22c55e]/15"
      : tone === "neg"
      ? "bg-[#ef4444]/15"
      : "bg-[#D4AF37]/15";
  const iconClass =
    tone === "pos"
      ? "text-[#22c55e]"
      : tone === "neg"
      ? "text-[#ef4444]"
      : "text-[#D4AF37]";

  return (
    <div className="rounded-2xl border border-[#2a2a2a] bg-[#111] p-4">
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <p className="text-xs text-[#6b6355] font-medium">{label}</p>
          <p className="text-xl font-bold mt-1 truncate">{value}</p>
          <p className={`text-xs mt-1 ${toneClass}`}>{change}</p>
        </div>
        <div className={`size-9 rounded-xl ${bgClass} flex items-center justify-center shrink-0`}>
          <Icon className={`size-4 ${iconClass}`} />
        </div>
      </div>
    </div>
  );
}
