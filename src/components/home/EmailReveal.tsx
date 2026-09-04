"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/about";
import { ACCENT, DANGER, INK, LINE, MONO, MUTED, WHITE } from "./theme";

function makeChallenge() {
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  return { q: `${a} + ${b}`, answer: String(a + b) };
}

function EnvelopeIcon({ dim = false }: { dim?: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      style={{ flexShrink: 0, opacity: dim ? 0.6 : 1 }}
      aria-hidden
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 6 L12 13 L22 6" />
    </svg>
  );
}

/** Address stays out of the markup until a human answers a sum. */
export default function EmailReveal() {
  // Generated after mount: a random sum rendered on the server would not match
  // the one the client renders, and React would throw a hydration mismatch.
  const [challenge, setChallenge] = useState<{ q: string; answer: string } | null>(null);
  const [input, setInput] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => setChallenge(makeChallenge()), []);

  function attempt() {
    if (challenge && input.trim() === challenge.answer) {
      setRevealed(true);
      setError(false);
    } else {
      setError(true);
    }
  }

  if (revealed) {
    return (
      <a
        href={`mailto:${profile.email}`}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "12px 20px",
          borderRadius: 12,
          background: WHITE,
          border: `1px solid ${LINE}`,
          textDecoration: "none",
          fontFamily: MONO,
          fontSize: 13,
          fontWeight: 500,
          color: INK,
        }}
      >
        <EnvelopeIcon />
        {profile.email}
      </a>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 16px",
        borderRadius: 12,
        background: WHITE,
        border: `1px solid ${LINE}`,
        fontFamily: MONO,
        fontSize: 13,
      }}
    >
      <EnvelopeIcon dim />
      <label htmlFor="email-captcha" style={{ color: MUTED }}>
        {challenge ? `${challenge.q} =` : "… ="}
      </label>
      <input
        id="email-captcha"
        type="text"
        inputMode="numeric"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setError(false);
        }}
        onKeyDown={(e) => e.key === "Enter" && attempt()}
        placeholder="?"
        aria-label="Answer the sum to reveal the email address"
        aria-invalid={error}
        style={{
          width: 42,
          padding: "4px 6px",
          borderRadius: 6,
          border: `1px solid ${error ? DANGER : LINE}`,
          background: "#F7F6F4",
          fontFamily: MONO,
          fontSize: 13,
          textAlign: "center",
          outline: "none",
          color: INK,
        }}
      />
      <button
        onClick={attempt}
        style={{
          border: "none",
          background: ACCENT,
          color: WHITE,
          borderRadius: 6,
          padding: "5px 10px",
          fontFamily: MONO,
          fontSize: 12,
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        reveal
      </button>
    </div>
  );
}
