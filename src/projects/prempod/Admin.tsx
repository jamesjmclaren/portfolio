"use client";

import { CheckCircle2, AlertTriangle, XCircle, RefreshCw } from "lucide-react";
import { syncRows } from "./data";

const statusBadge = {
  ok: { Icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30", label: "Synced" },
  warn: { Icon: AlertTriangle, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30", label: "Warning" },
  error: { Icon: XCircle, color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/30", label: "Failed" },
};

export default function PrempodAdmin() {
  const totalQuota = syncRows.reduce((acc, r) => acc + r.quotaCost, 0);
  const totalVideos = syncRows.reduce((acc, r) => acc + r.videos, 0);
  const errors = syncRows.filter((r) => r.status === "error").length;

  return (
    <div className="min-h-full bg-[#0b0d12] text-slate-100 font-sans">
      <header className="border-b border-slate-800 px-6 py-4">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-400">
              Admin
            </p>
            <h1 className="text-xl font-bold">Channel sync dashboard</h1>
          </div>
          <button className="rounded-lg bg-blue-600 hover:bg-blue-500 text-sm font-medium px-3 py-1.5 flex items-center gap-1.5">
            <RefreshCw className="size-4" /> Sync all
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-6 space-y-5">
        {/* Stats */}
        <div className="grid sm:grid-cols-4 gap-3">
          <Stat label="Channels tracked" value={String(syncRows.length)} />
          <Stat label="Videos this run" value={String(totalVideos)} />
          <Stat label="YouTube quota used" value={`${totalQuota} / 10,000`} note="Today" />
          <Stat label="Errors" value={String(errors)} tone={errors > 0 ? "warn" : "ok"} />
        </div>

        {/* Table */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
            <h3 className="font-semibold text-sm">Recent syncs</h3>
            <span className="text-[10px] text-slate-500 font-mono">
              Auto-refresh every 5 min
            </span>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[10px] uppercase tracking-wider text-slate-500 border-b border-slate-800">
                <th className="px-4 py-2.5 font-medium">Channel</th>
                <th className="px-4 py-2.5 font-medium hidden sm:table-cell">Source</th>
                <th className="px-4 py-2.5 font-medium">Status</th>
                <th className="px-4 py-2.5 font-medium text-right hidden md:table-cell">Videos</th>
                <th className="px-4 py-2.5 font-medium text-right">Quota</th>
                <th className="px-4 py-2.5 font-medium text-right">Last sync</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {syncRows.map((r, i) => {
                const s = statusBadge[r.status];
                return (
                  <tr key={i} className="hover:bg-slate-900">
                    <td className="px-4 py-3">
                      <p className="font-medium">{r.channel}</p>
                      {r.message && (
                        <p className="text-[10px] text-slate-500 mt-0.5">{r.message}</p>
                      )}
                    </td>
                    <td className="px-4 py-3 text-slate-400 hidden sm:table-cell">
                      {r.platform}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] uppercase tracking-wider rounded-full border px-2 py-0.5 ${s.color} ${s.bg} ${s.border}`}
                      >
                        <s.Icon className="size-3" />
                        {s.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-slate-300 font-mono hidden md:table-cell">
                      {r.videos}
                    </td>
                    <td className="px-4 py-3 text-right text-slate-300 font-mono">
                      {r.quotaCost === 0 ? "—" : `+${r.quotaCost}`}
                    </td>
                    <td className="px-4 py-3 text-right text-slate-400 text-xs">
                      {r.lastSync}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-slate-500">
          RSS-first strategy keeps YouTube quota cost at zero for the common case
          — fallback to Data API only when richer metadata is required.
        </p>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  note,
  tone = "ok",
}: {
  label: string;
  value: string;
  note?: string;
  tone?: "ok" | "warn";
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-3.5">
      <p className="text-[10px] uppercase tracking-wider text-slate-500">
        {label}
      </p>
      <p
        className={`text-xl font-bold mt-1 ${
          tone === "warn" ? "text-amber-400" : "text-slate-100"
        }`}
      >
        {value}
      </p>
      {note && <p className="text-[10px] text-slate-500 mt-0.5">{note}</p>}
    </div>
  );
}
