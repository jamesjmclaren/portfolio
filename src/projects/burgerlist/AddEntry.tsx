"use client";

import { useState } from "react";
import { Star, Upload, X, ShieldCheck, Loader2, MapPin } from "lucide-react";

type ModerationState = "idle" | "scanning" | "approved" | "rejected";

export default function BurgerlistAddEntry() {
  const [rating, setRating] = useState(8);
  const [moderation, setModeration] = useState<ModerationState>("approved");
  const [photoUploaded, setPhotoUploaded] = useState(true);

  return (
    <div className="min-h-full bg-stone-50 text-stone-900 font-sans">
      {/* Backdrop blur */}
      <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm pointer-events-none" />

      {/* Modal */}
      <div className="relative flex items-center justify-center min-h-full p-6">
        <div className="bg-white rounded-2xl border border-stone-200 shadow-2xl w-full max-w-lg overflow-hidden">
          <div className="px-5 py-4 border-b border-stone-200 flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-stone-500">
                New entry
              </p>
              <h2 className="text-lg font-bold">Log a burger</h2>
            </div>
            <button className="size-7 rounded-lg hover:bg-stone-100 flex items-center justify-center text-stone-500">
              <X className="size-4" />
            </button>
          </div>

          <div className="p-5 space-y-4 max-h-[480px] overflow-y-auto">
            {/* Photo */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-stone-600 block mb-2">
                Photo
              </label>
              {!photoUploaded ? (
                <button
                  onClick={() => {
                    setPhotoUploaded(true);
                    setModeration("scanning");
                    setTimeout(() => setModeration("approved"), 1200);
                  }}
                  className="w-full border-2 border-dashed border-stone-300 rounded-xl py-8 text-center hover:bg-stone-50"
                >
                  <Upload className="size-6 text-stone-400 mx-auto mb-1.5" />
                  <p className="text-sm text-stone-600">Click to upload</p>
                  <p className="text-xs text-stone-400 mt-0.5">JPG, PNG · max 8 MB</p>
                </button>
              ) : (
                <div className="relative">
                  <div className="aspect-[16/10] rounded-xl bg-gradient-to-br from-amber-700/60 to-yellow-900/70 flex items-center justify-center font-mono text-3xl font-bold text-white/90">
                    BB
                  </div>
                  <button
                    onClick={() => {
                      setPhotoUploaded(false);
                      setModeration("idle");
                    }}
                    className="absolute top-2 right-2 size-7 rounded-full bg-stone-900/70 text-white flex items-center justify-center hover:bg-stone-900"
                  >
                    <X className="size-3.5" />
                  </button>
                  <ModerationBadge state={moderation} />
                </div>
              )}
            </div>

            {/* Burger name */}
            <Field label="Burger name">
              <input
                defaultValue="Smashed double cheese"
                className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
              />
            </Field>

            {/* Spot autocomplete */}
            <Field label="Spot">
              <div className="relative">
                <input
                  defaultValue="Bross Burgers"
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:border-orange-400"
                />
                <MapPin className="size-4 absolute right-2.5 top-2.5 text-stone-400" />
              </div>
              <p className="text-[10px] text-stone-500 mt-1 flex items-center gap-1">
                <MapPin className="size-3" /> Bross Burgers · 27 Lochrin Pl, Edinburgh
              </p>
            </Field>

            {/* Rating */}
            <Field label="Rating">
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min={1}
                  max={10}
                  step={0.1}
                  value={rating}
                  onChange={(e) => setRating(parseFloat(e.target.value))}
                  className="flex-1 accent-orange-500"
                />
                <span className="flex items-center gap-1 font-bold text-lg w-16 justify-end">
                  <Star className="size-4 fill-amber-500 text-amber-500" />
                  {rating.toFixed(1)}
                </span>
              </div>
            </Field>

            {/* Tags */}
            <Field label="Tags">
              <div className="flex flex-wrap gap-1.5">
                {["smash", "classic", "double", "cheese"].map((t) => (
                  <span
                    key={t}
                    className="text-xs bg-orange-100 text-orange-700 rounded-full px-2.5 py-0.5 flex items-center gap-1"
                  >
                    #{t}
                    <button className="hover:text-orange-900">
                      <X className="size-3" />
                    </button>
                  </span>
                ))}
                <button className="text-xs text-stone-500 hover:text-stone-900 px-2 py-0.5 rounded-full border border-dashed border-stone-300">
                  + add tag
                </button>
              </div>
            </Field>

            {/* Notes */}
            <Field label="Notes">
              <textarea
                rows={3}
                defaultValue="American cheese running off the patty, perfect crispy edges. Best in the city."
                className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400 resize-none"
              />
            </Field>
          </div>

          <div className="px-5 py-3 border-t border-stone-200 flex items-center justify-between bg-stone-50">
            <p className="text-xs text-stone-500 flex items-center gap-1">
              <ShieldCheck className="size-3 text-emerald-600" />
              Photos scanned by AWS Rekognition
            </p>
            <div className="flex items-center gap-2">
              <button className="text-sm text-stone-600 hover:text-stone-900 px-3 py-1.5">
                Cancel
              </button>
              <button
                disabled={moderation === "scanning" || moderation === "rejected"}
                className="rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save burger
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wider text-stone-600 block mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}

function ModerationBadge({ state }: { state: ModerationState }) {
  if (state === "idle") return null;
  if (state === "scanning")
    return (
      <div className="absolute bottom-2 left-2 bg-amber-500/95 text-white text-[10px] uppercase tracking-wider px-2 py-1 rounded font-semibold flex items-center gap-1.5">
        <Loader2 className="size-3 animate-spin" />
        AI moderating…
      </div>
    );
  if (state === "approved")
    return (
      <div className="absolute bottom-2 left-2 bg-emerald-500/95 text-white text-[10px] uppercase tracking-wider px-2 py-1 rounded font-semibold flex items-center gap-1.5">
        <ShieldCheck className="size-3" />
        Approved
      </div>
    );
  return (
    <div className="absolute bottom-2 left-2 bg-red-500/95 text-white text-[10px] uppercase tracking-wider px-2 py-1 rounded font-semibold">
      Rejected
    </div>
  );
}
