"use client";

import { useState } from "react";
import {
  ACCENT,
  BODY,
  DANGER,
  eyebrow,
  LINE,
  LINE_STRONG,
  MONO,
  MUTED,
  SANS,
  WHITE,
} from "./theme";

const SUGGESTIONS = [
  "Can you work with GitHub Actions?",
  "What blockchain experience do you have?",
  "Have you managed a team?",
];

/** Grounded Q&A over James's CV, projects and employment history.
 *  The model call happens server-side in /api/ask — no key in the browser. */
export default function AskAboutMe() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function ask(question: string) {
    const q = question.trim();
    if (!q || loading) return;

    setLoading(true);
    setError(null);
    setAnswer(null);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q }),
      });
      const data: { answer?: string; error?: string } = await res.json();

      if (data.answer) setAnswer(data.answer);
      else setError(data.error ?? "Couldn't get an answer right now. Try again in a moment.");
    } catch {
      setError("Couldn't get an answer right now. Try again in a moment.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section style={{ maxWidth: 880, margin: "0 auto", padding: "0 clamp(20px, 5vw, 32px) 96px" }}>
      <p style={{ ...eyebrow, marginBottom: 12 }}>Ask about me</p>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && ask(query)}
          placeholder="e.g. Can you work with GitHub Actions?"
          maxLength={300}
          aria-label="Ask a question about James"
          style={{
            flex: "1 1 240px",
            minWidth: 0,
            padding: "14px 18px",
            borderRadius: 100,
            border: `1px solid ${LINE_STRONG}`,
            background: WHITE,
            fontFamily: SANS,
            fontSize: 15,
            outline: "none",
          }}
        />
        <button
          onClick={() => ask(query)}
          disabled={loading}
          style={{
            border: "none",
            borderRadius: 100,
            padding: "14px 26px",
            background: ACCENT,
            color: WHITE,
            fontFamily: MONO,
            fontSize: 13,
            fontWeight: 600,
            cursor: loading ? "default" : "pointer",
            opacity: loading ? 0.75 : 1,
          }}
        >
          {loading ? "Asking…" : "Ask"}
        </button>
      </div>

      {!answer && !error && !loading && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 14 }}>
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => {
                setQuery(s);
                ask(s);
              }}
              style={{
                fontFamily: MONO,
                fontSize: 12,
                padding: "5px 12px",
                borderRadius: 100,
                background: "transparent",
                border: `1px solid ${LINE}`,
                color: MUTED,
                cursor: "pointer",
              }}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {answer && (
        <div
          style={{
            marginTop: 18,
            padding: "20px 24px",
            borderRadius: 16,
            background: WHITE,
            border: `1px solid ${LINE}`,
            fontFamily: SANS,
            fontSize: 15,
            lineHeight: 1.65,
            color: BODY,
            whiteSpace: "pre-wrap",
          }}
        >
          {answer}
        </div>
      )}

      {error && (
        <p style={{ marginTop: 14, fontFamily: SANS, fontSize: 13, color: DANGER }}>{error}</p>
      )}
    </section>
  );
}
