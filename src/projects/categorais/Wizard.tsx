"use client";

import { useMemo, useState } from "react";
import { Sparkles, ArrowRight, ArrowLeft, X, Check } from "lucide-react";
import {
  wizardRoles,
  recommendationsByRole,
  directoryTools,
  type Recommendation,
  type Tool,
} from "./data";
import ToolAvatar from "./ToolAvatar";

type Step = "role" | "task" | "results";

export default function CategorAisWizard() {
  const [step, setStep] = useState<Step>("role");
  const [selectedRole, setSelectedRole] = useState<string | null>(
    "software-developer",
  );
  const [task, setTask] = useState("");

  const recs = useMemo<Recommendation[]>(() => {
    if (!selectedRole) return [];
    return (
      recommendationsByRole[selectedRole] ??
      recommendationsByRole["software-developer"]
    );
  }, [selectedRole]);

  const toolByName = useMemo(() => {
    const map: Record<string, Tool> = {};
    directoryTools.forEach((t) => (map[t.name] = t));
    return map;
  }, []);

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
        <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[#0a0a0f]/95 shadow-2xl overflow-hidden">
          {/* Header strip */}
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-white/60">
              <Sparkles className="size-3.5 text-[#a855f7]" />
              AI recommendation wizard
            </div>
            <button className="size-7 rounded-lg hover:bg-white/5 flex items-center justify-center text-white/60">
              <X className="size-4" />
            </button>
          </div>

          {/* Progress */}
          <div className="px-6 pt-5">
            <ProgressBar step={step} />
          </div>

          {step === "role" && (
            <div className="px-6 py-6">
              <Header
                title="Find Your Perfect AI Tools"
                subtitle="Tell us about yourself and we'll recommend the best tools for your needs."
              />

              <div className="mt-6">
                <label className="text-xs uppercase tracking-wider text-white/60 font-semibold">
                  What's your role?
                </label>
                <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
                  {wizardRoles.map((r) => {
                    const active = selectedRole === r.id;
                    return (
                      <button
                        key={r.id}
                        onClick={() => setSelectedRole(r.id)}
                        className={`group relative rounded-xl border p-3 text-center transition-all ${
                          active
                            ? "border-[#a855f7] bg-[#a855f7]/10"
                            : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20"
                        }`}
                      >
                        {active && (
                          <span className="absolute top-1.5 right-1.5 size-4 rounded-full bg-[#a855f7] flex items-center justify-center">
                            <Check className="size-2.5 text-white" />
                          </span>
                        )}
                        <div className="text-2xl">{r.icon}</div>
                        <div className="text-[11px] mt-1.5 text-white/80 leading-tight">
                          {r.name}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <FooterActions>
                <PrimaryButton
                  disabled={!selectedRole}
                  onClick={() => setStep("task")}
                >
                  Continue
                  <ArrowRight className="size-4" />
                </PrimaryButton>
              </FooterActions>
            </div>
          )}

          {step === "task" && (
            <div className="px-6 py-6">
              <Header
                title="What do you need help with?"
                subtitle="Tell us about your tasks or challenges (optional)."
              />

              <div className="mt-6">
                <label className="text-xs uppercase tracking-wider text-white/60 font-semibold">
                  Describe your main task
                </label>
                <textarea
                  rows={4}
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  placeholder="e.g., 'I need to ship a TypeScript codebase faster and review PRs more thoroughly.'"
                  className="mt-3 w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-3 text-sm placeholder:text-white/40 focus:outline-none focus:border-[#a855f7]/60 resize-none"
                />
                <p className="text-[11px] text-white/40 mt-2">
                  The more specific you are, the better our recommendations.
                </p>
              </div>

              <FooterActions>
                <SecondaryButton onClick={() => setStep("role")}>
                  <ArrowLeft className="size-4" />
                  Back
                </SecondaryButton>
                <PrimaryButton onClick={() => setStep("results")}>
                  <Sparkles className="size-4" />
                  Get my recommendations
                </PrimaryButton>
              </FooterActions>
            </div>
          )}

          {step === "results" && (
            <div className="px-6 py-6">
              <Header
                title="Your Personalised AI Toolkit"
                subtitle={
                  selectedRole
                    ? `Based on your role as ${
                        wizardRoles.find((r) => r.id === selectedRole)?.name
                      }`
                    : "Based on your role"
                }
              />

              <div className="mt-5 space-y-3">
                {recs.map((r, i) => {
                  const tool = toolByName[r.toolName];
                  if (!tool) return null;
                  return (
                    <div
                      key={r.toolName}
                      className="rounded-xl border border-white/10 bg-white/[0.03] p-4 flex items-start gap-4"
                    >
                      <div className="shrink-0 relative">
                        <ToolAvatar
                          name={tool.name}
                          logo={tool.logo}
                          color={tool.color}
                          size={48}
                        />
                        <span
                          className="absolute -bottom-1.5 -right-1.5 size-6 rounded-full text-[10px] font-bold flex items-center justify-center text-white"
                          style={{
                            background:
                              "linear-gradient(135deg, #00d9ff 0%, #a855f7 100%)",
                          }}
                        >
                          {i + 1}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="font-semibold">{tool.name}</h4>
                          <span className="text-[10px] uppercase tracking-wider text-[#a855f7]">
                            {r.match}% match
                          </span>
                        </div>
                        <p className="text-sm text-white/60 mt-0.5 leading-snug">
                          {r.reason}
                        </p>
                        <div className="mt-2 h-1 rounded-full bg-white/5 overflow-hidden">
                          <div
                            className="h-full"
                            style={{
                              width: `${r.match}%`,
                              background:
                                "linear-gradient(90deg, #00d9ff 0%, #a855f7 100%)",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <FooterActions>
                <SecondaryButton onClick={() => setStep("role")}>
                  Start over
                </SecondaryButton>
                <PrimaryButton onClick={() => setStep("role")}>
                  Browse all tools
                </PrimaryButton>
              </FooterActions>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Header({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold tracking-tight">{title}</h2>
      <p className="text-sm text-white/60 mt-1">{subtitle}</p>
    </div>
  );
}

function ProgressBar({ step }: { step: Step }) {
  const pct = step === "role" ? 33 : step === "task" ? 66 : 100;
  return (
    <div>
      <div className="flex justify-between text-[10px] uppercase tracking-wider text-white/50">
        <span>Step {step === "role" ? 1 : step === "task" ? 2 : 3} of 3</span>
        <span>{pct}%</span>
      </div>
      <div className="mt-1.5 h-1 rounded-full bg-white/5 overflow-hidden">
        <div
          className="h-full transition-all"
          style={{
            width: `${pct}%`,
            background: "linear-gradient(90deg, #00d9ff 0%, #a855f7 100%)",
          }}
        />
      </div>
    </div>
  );
}

function FooterActions({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-7 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 ml-auto">{children}</div>
    </div>
  );
}

function PrimaryButton({
  children,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold text-white shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
      style={{
        background:
          "linear-gradient(135deg, #00d9ff 0%, #a855f7 50%, #ec4899 100%)",
      }}
    >
      {children}
    </button>
  );
}

function SecondaryButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm text-white/80 border border-white/10 hover:bg-white/5"
    >
      {children}
    </button>
  );
}
