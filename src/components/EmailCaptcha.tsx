"use client";

import { useState } from "react";
import { Mail, Check } from "lucide-react";

const EMAIL = "jamesjmclaren@gmail.com";

function makeChallenge() {
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  return { q: `${a} + ${b}`, answer: String(a + b) };
}

export default function EmailCaptcha() {
  const [challenge] = useState(makeChallenge);
  const [input, setInput] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [error, setError] = useState(false);

  function attempt() {
    if (input.trim() === challenge.answer) {
      setRevealed(true);
      setError(false);
    } else {
      setError(true);
    }
  }

  if (revealed) {
    return (
      <a
        href={`mailto:${EMAIL}`}
        className="group flex items-center gap-4 rounded-2xl border border-border bg-surface hover:bg-surface-hover hover:border-accent-muted transition-all p-5"
      >
        <div className="shrink-0 size-10 rounded-lg bg-surface-elevated flex items-center justify-center text-accent">
          <Mail className="size-5" />
        </div>
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-wider text-text-muted">Email</p>
          <p className="text-text-primary font-medium truncate">{EMAIL}</p>
        </div>
        <Check className="size-4 text-success ml-auto shrink-0" />
      </a>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <div className="flex items-center gap-4 mb-4">
        <div className="shrink-0 size-10 rounded-lg bg-surface-elevated flex items-center justify-center text-text-secondary">
          <Mail className="size-5" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-text-muted">Email</p>
          <p className="text-text-secondary text-sm">Solve to reveal</p>
        </div>
      </div>
      <p className="text-sm text-text-secondary mb-3">
        What is <span className="font-mono font-semibold text-text-primary">{challenge.q}</span>?
      </p>
      <div className="flex gap-2">
        <input
          type="text"
          inputMode="numeric"
          value={input}
          onChange={(e) => { setInput(e.target.value); setError(false); }}
          onKeyDown={(e) => e.key === "Enter" && attempt()}
          placeholder="Answer"
          className={`w-20 rounded-lg border px-3 py-1.5 text-sm bg-surface-elevated text-text-primary outline-none focus:border-accent transition-colors ${
            error ? "border-danger" : "border-border"
          }`}
        />
        <button
          onClick={attempt}
          className="rounded-lg bg-accent text-background hover:bg-accent-hover transition-colors px-4 py-1.5 text-sm font-medium"
        >
          Reveal
        </button>
      </div>
      {error && <p className="text-xs text-danger mt-2">Try again</p>}
    </div>
  );
}
