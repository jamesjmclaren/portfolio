/** Page palette and type. Mirrors the custom properties in globals.css so the
 *  inline styles used across these components stay in one place. */
export const PAGE = "#101214";
/** Raised panels: modal, ask box, cards. */
export const SURFACE = "#181B1F";
/** Text and icons placed on an ACCENT fill. */
export const ON_ACCENT = "#101214";
export const INK = "#F1EFE9";
export const BODY = "#C4C6CA";
export const MUTED = "#8A8D93";
export const LINE = "#272A2F";
export const LINE_STRONG = "#34383E";
export const IMAGE_BG = "#1D2024";
export const ACCENT = "#FF7A45";
export const ACCENT_SOFT = "rgba(255,122,69,0.14)";
export const DANGER = "#FF6B6B";
export const BACKDROP = "rgba(5,6,8,0.78)";

export const DISPLAY = "var(--font-figtree), system-ui, sans-serif";
export const SANS = "var(--font-figtree), system-ui, sans-serif";
export const MONO = "var(--font-jetbrains), ui-monospace, monospace";

/** Small uppercase mono label used above every section heading. */
export const eyebrow = {
  fontFamily: MONO,
  fontSize: 12,
  fontWeight: 500,
  letterSpacing: 2,
  textTransform: "uppercase" as const,
  color: ACCENT,
  margin: 0,
};

/** Accent-tinted mono pill — tech stack and role skills. */
export function tagPill(size: number = 11) {
  return {
    fontFamily: MONO,
    fontSize: size,
    padding: size > 11 ? "4px 12px" : "3px 10px",
    borderRadius: 100,
    background: ACCENT_SOFT,
    color: ACCENT,
    fontWeight: 500,
    whiteSpace: "nowrap" as const,
  };
}
