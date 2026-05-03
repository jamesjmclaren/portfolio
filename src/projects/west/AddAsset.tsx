"use client";

import { useState } from "react";
import { Search, Check, ChevronRight, Upload, X } from "lucide-react";
import WestSidebar from "./Sidebar";

const STEPS = ["Find card", "Condition", "Cost basis", "Confirm"];

const mockResults = [
  { name: "Charizard", set: "Base Set", num: "4/102", rarity: "Holo Rare", initials: "CHR", bg: "from-orange-500/40 to-red-600/40" },
  { name: "Charizard ex", set: "Obsidian Flames", num: "199/197", rarity: "Special Illustration", initials: "CHX", bg: "from-orange-600/40 to-red-700/40" },
  { name: "Charizard VMAX", set: "Darkness Ablaze", num: "020/189", rarity: "Ultra Rare", initials: "CVM", bg: "from-amber-500/40 to-orange-700/40" },
];

export default function WestAddAsset() {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState(0);
  const [type, setType] = useState<"raw" | "graded" | "sealed">("graded");
  const [grade, setGrade] = useState("PSA 9");
  const [qty, setQty] = useState("1");
  const [cost, setCost] = useState("2400");

  const card = mockResults[selected];

  return (
    <div className="flex h-full bg-[#080808] text-[#f5f0e8] font-sans">
      <WestSidebar active="/dashboard/add" />

      <div className="flex-1 overflow-y-auto">
        <header className="sticky top-0 z-10 bg-[#080808]/90 backdrop-blur border-b border-[#2a2a2a] px-6 py-3">
          <p className="text-[10px] uppercase tracking-wider text-[#6b6355]">
            Add asset
          </p>
          <h1 className="text-lg font-semibold">Track a new card</h1>
        </header>

        <div className="p-6 max-w-3xl mx-auto">
          {/* Stepper */}
          <ol className="flex items-center gap-2 mb-6">
            {STEPS.map((s, i) => (
              <li key={s} className="flex items-center gap-2">
                <button
                  onClick={() => setStep(i)}
                  className={`flex items-center gap-2 text-xs font-medium ${
                    i <= step ? "text-[#f5f0e8]" : "text-[#6b6355]"
                  }`}
                >
                  <span
                    className={`size-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      i < step
                        ? "bg-[#D4AF37] text-[#080808]"
                        : i === step
                        ? "bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]"
                        : "bg-[#1a1a1a] text-[#6b6355] border border-[#2a2a2a]"
                    }`}
                  >
                    {i < step ? <Check className="size-3" /> : i + 1}
                  </span>
                  <span className="hidden sm:inline">{s}</span>
                </button>
                {i < STEPS.length - 1 && (
                  <ChevronRight className="size-3 text-[#6b6355]" />
                )}
              </li>
            ))}
          </ol>

          <div className="rounded-2xl border border-[#2a2a2a] bg-[#111] p-6">
            {step === 0 && (
              <>
                <div className="relative mb-4">
                  <Search className="size-4 absolute left-3 top-3 text-[#6b6355]" />
                  <input
                    defaultValue="Charizard"
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:border-[#D4AF37]/50"
                  />
                </div>
                <p className="text-xs text-[#6b6355] mb-2">
                  3 results · Pokémon TCG API
                </p>
                <div className="space-y-2">
                  {mockResults.map((r, i) => (
                    <button
                      key={r.name + i}
                      onClick={() => setSelected(i)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                        selected === i
                          ? "border-[#D4AF37]/50 bg-[#D4AF37]/10"
                          : "border-[#2a2a2a] bg-[#1a1a1a] hover:bg-[#1e1e1e]"
                      }`}
                    >
                      <div
                        className={`size-12 rounded-lg bg-gradient-to-br ${r.bg} flex items-center justify-center font-mono text-[10px] font-bold`}
                      >
                        {r.initials}
                      </div>
                      <div className="text-left flex-1 min-w-0">
                        <p className="font-medium text-sm">{r.name}</p>
                        <p className="text-xs text-[#6b6355]">
                          {r.set} · {r.num} · {r.rarity}
                        </p>
                      </div>
                      {selected === i && (
                        <Check className="size-4 text-[#D4AF37]" />
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <p className="text-xs uppercase tracking-wider text-[#6b6355] mb-3">
                  How is it stored?
                </p>
                <div className="grid grid-cols-3 gap-2 mb-5">
                  {(["raw", "graded", "sealed"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setType(t)}
                      className={`p-4 rounded-lg border text-sm font-medium capitalize transition-colors ${
                        type === t
                          ? "border-[#D4AF37] bg-[#D4AF37]/15 text-[#D4AF37]"
                          : "border-[#2a2a2a] bg-[#1a1a1a] text-[#a09882] hover:text-[#f5f0e8]"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                {type === "graded" && (
                  <>
                    <p className="text-xs uppercase tracking-wider text-[#6b6355] mb-3">
                      Grader & grade
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {["PSA 10", "PSA 9", "PSA 8", "CGC 9.5", "BGS 9", "Other"].map(
                        (g) => (
                          <button
                            key={g}
                            onClick={() => setGrade(g)}
                            className={`px-3 py-2 rounded-lg border text-sm transition-colors ${
                              grade === g
                                ? "border-[#D4AF37] bg-[#D4AF37]/15 text-[#D4AF37]"
                                : "border-[#2a2a2a] bg-[#1a1a1a] text-[#a09882] hover:text-[#f5f0e8]"
                            }`}
                          >
                            {g}
                          </button>
                        ),
                      )}
                    </div>
                  </>
                )}

                <div className="mt-5">
                  <label className="text-xs uppercase tracking-wider text-[#6b6355] block mb-2">
                    Custom photo (optional)
                  </label>
                  <div className="border border-dashed border-[#2a2a2a] rounded-lg p-6 text-center bg-[#1a1a1a] hover:bg-[#1e1e1e] cursor-pointer">
                    <Upload className="size-5 text-[#6b6355] mx-auto mb-1.5" />
                    <p className="text-xs text-[#a09882]">
                      Drop image or browse
                    </p>
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div>
                    <label className="text-xs uppercase tracking-wider text-[#6b6355] block mb-1.5">
                      Quantity
                    </label>
                    <input
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#D4AF37]/50"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wider text-[#6b6355] block mb-1.5">
                      Purchase price (USD)
                    </label>
                    <input
                      value={cost}
                      onChange={(e) => setCost(e.target.value)}
                      className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#D4AF37]/50"
                    />
                  </div>
                </div>
                <div className="rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] p-4">
                  <p className="text-xs text-[#6b6355] mb-1">Cost basis</p>
                  <p className="font-bold text-xl">
                    ${(parseInt(qty || "0") * parseInt(cost || "0")).toLocaleString()}
                  </p>
                  <p className="text-xs text-[#a09882] mt-1">
                    Stored alongside live price for P&L tracking
                  </p>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="flex items-center gap-4 mb-5 p-4 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a]">
                  <div
                    className={`size-16 rounded-lg bg-gradient-to-br ${card.bg} flex items-center justify-center font-mono text-sm font-bold`}
                  >
                    {card.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">
                      {card.name}{" "}
                      {type === "graded" && (
                        <span className="text-xs text-[#D4AF37]">{grade}</span>
                      )}
                    </p>
                    <p className="text-xs text-[#6b6355]">
                      {card.set} · {card.num}
                    </p>
                    <p className="text-xs text-[#a09882] mt-1">
                      ×{qty} @ ${parseInt(cost).toLocaleString()} = $
                      {(parseInt(qty || "0") * parseInt(cost || "0")).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="rounded-lg border border-[#22c55e]/40 bg-[#22c55e]/10 p-4 flex items-start gap-3">
                  <Check className="size-5 text-[#22c55e] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Live price found</p>
                    <p className="text-xs text-[#a09882] mt-0.5">
                      TCGPlayer · $3,850 avg · refreshed every 6 hours
                    </p>
                  </div>
                </div>
              </>
            )}

            <div className="flex items-center justify-between mt-6 pt-5 border-t border-[#2a2a2a]">
              <button
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="text-sm text-[#a09882] hover:text-[#f5f0e8] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                ← Back
              </button>
              <button
                onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
                className="rounded-lg bg-[#D4AF37] hover:bg-[#E5C158] text-[#080808] text-sm font-medium px-4 py-2"
              >
                {step === STEPS.length - 1 ? "Add to portfolio" : "Continue"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
