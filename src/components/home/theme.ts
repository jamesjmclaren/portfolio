/** Page palette and type. Mirrors the custom properties in globals.css so the
 *  inline styles used across these components stay in one place. */
export const PAGE = "#F9F8F6";
export const WHITE = "#FFFFFF";
export const INK = "#24262B";
export const BODY = "#3A3D44";
export const MUTED = "#6E7178";
export const LINE = "#E2E3E6";
export const LINE_STRONG = "#D7D8DC";
export const IMAGE_BG = "#E9EAEC";
export const ACCENT = "#3F7EA8";
export const ACCENT_SOFT = "rgba(63,126,168,0.12)";
export const DANGER = "#B3543F";
export const BACKDROP = "rgba(20,21,24,0.72)";

export const DISPLAY = "'Space Grotesk', system-ui, sans-serif";
export const SANS = "'IBM Plex Sans', system-ui, sans-serif";
export const MONO = "'IBM Plex Mono', ui-monospace, monospace";

/** Small uppercase mono label used above every section heading. */
export const eyebrow = {
  fontFamily: MONO,
  fontSize: 13,
  fontWeight: 500,
  letterSpacing: 2.5,
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
