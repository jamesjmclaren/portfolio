"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  FolderOpen,
  BarChart2,
  Store,
  Search,
  Bell,
  FileText,
  Users,
  Settings,
  ChevronDown,
  Plus,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/collection", label: "Collection", icon: FolderOpen },
  { href: "/set-trends", label: "Trends", icon: BarChart2 },
  { href: "/marketplace", label: "Marketplace", icon: Store },
  { href: "/dashboard/add", label: "Search Asset", icon: Search },
  { href: "/dashboard/tracking", label: "Tracking", icon: Bell },
  { href: "/report", label: "Report", icon: FileText },
  { href: "/team", label: "Team", icon: Users },
  { href: "/settings/api-keys", label: "Settings", icon: Settings },
];

export default function WestSidebar({ active }: { active: string }) {
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  return (
    <aside className="w-60 shrink-0 h-full border-r border-[#2a2a2a] bg-[#111] flex flex-col">
      <div className="p-4 border-b border-[#2a2a2a]">
        <div className="flex items-center gap-2">
          <span className="size-7 rounded-md bg-[#D4AF37] text-[#080808] flex items-center justify-center font-bold text-sm">
            W
          </span>
          <span className="font-semibold tracking-tight text-[#f5f0e8]">
            west.investments
          </span>
        </div>
      </div>

      <div className="px-3 py-3 border-b border-[#2a2a2a]">
        <button
          onClick={() => setPortfolioOpen((o) => !o)}
          className="w-full flex items-center justify-between gap-2 rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] hover:bg-[#1e1e1e] px-3 py-2 text-left transition-colors"
        >
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-wider text-[#6b6355]">
              Portfolio
            </p>
            <p className="text-sm font-medium text-[#f5f0e8] truncate">
              Main Collection
            </p>
          </div>
          <ChevronDown className="size-4 text-[#a09882] shrink-0" />
        </button>
        {portfolioOpen && (
          <div className="mt-1.5 space-y-1 rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] p-1">
            {["Main Collection", "Investment Stash", "Sealed Vault"].map((p) => (
              <button
                key={p}
                className="w-full text-left text-sm text-[#a09882] hover:text-[#f5f0e8] hover:bg-[#1e1e1e] rounded px-2 py-1.5"
              >
                {p}
              </button>
            ))}
            <button className="w-full text-left text-sm text-[#D4AF37] hover:bg-[#1e1e1e] rounded px-2 py-1.5 flex items-center gap-1.5">
              <Plus className="size-3" /> New portfolio
            </button>
          </div>
        )}
      </div>

      <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = item.href === active;
          return (
            <button
              key={item.href}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[#D4AF37]/15 text-[#D4AF37]"
                  : "text-[#a09882] hover:text-[#f5f0e8] hover:bg-[#1a1a1a]"
              }`}
            >
              <item.icon className="size-4 shrink-0" />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-3 border-t border-[#2a2a2a]">
        <div className="flex items-center gap-2.5">
          <div className="size-8 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#a08428] flex items-center justify-center text-[#080808] text-xs font-bold">
            JM
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-[#f5f0e8] truncate">
              James M.
            </p>
            <p className="text-[10px] text-[#6b6355] truncate">USD · admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
