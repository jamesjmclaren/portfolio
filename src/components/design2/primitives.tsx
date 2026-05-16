import { CSSProperties, ReactNode } from "react";

export const D2_PAPER = "#f6f1e7";
export const D2_OUTER = "#ece8df";
export const D2_INK = "#1a1a1a";
export const D2_MUTED = "#6b6555";
export const D2_DASH = "#3a3530";
export const D2_SOLID = "#d9436f";
export const D2_POP = "#88c9bf";
export const D2_SOFT = "#ffd6e0";
export const D2_WARN = "#2b2d42";

export const caveat: CSSProperties = {
  fontFamily: "'Caveat', 'Patrick Hand', cursive",
};
export const patrickHand: CSSProperties = {
  fontFamily: "'Patrick Hand', 'Caveat', cursive",
};
export const archivoBlack: CSSProperties = {
  fontFamily: "'Archivo Black', 'Inter', sans-serif",
  fontWeight: 900,
};
export const monoStyle: CSSProperties = {
  fontFamily: "'JetBrains Mono', ui-monospace, monospace",
};

type Corner = "tl" | "tr" | "br" | "bl";

function Bracket({ corner = "tl", size = 20, color = D2_INK }: { corner?: Corner; size?: number; color?: string }) {
  const rot = { tl: 0, tr: 90, br: 180, bl: 270 }[corner];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ transform: `rotate(${rot}deg)`, overflow: "visible", display: "block" }}>
      <path d="M 2 12 L 2 2 L 12 2" stroke={color} strokeWidth={2.5} fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function CornerBrackets({ color = D2_INK, inset = 10 }: { color?: string; inset?: number }) {
  const pos: CSSProperties = { position: "absolute" };
  return (
    <>
      <div style={{ ...pos, top: inset, left: inset }}><Bracket corner="tl" color={color} /></div>
      <div style={{ ...pos, top: inset, right: inset }}><Bracket corner="tr" color={color} /></div>
      <div style={{ ...pos, bottom: inset, left: inset }}><Bracket corner="bl" color={color} /></div>
      <div style={{ ...pos, bottom: inset, right: inset }}><Bracket corner="br" color={color} /></div>
    </>
  );
}

export function Scribble({ width = 200, color = D2_INK, style = {} }: { width?: number; color?: string; style?: CSSProperties }) {
  return (
    <svg width={width} height={10} viewBox={`0 0 ${width} 10`} style={style}>
      <path
        d={`M 2 6 Q ${width * 0.2} 1, ${width * 0.4} 5 T ${width * 0.75} 5 T ${width - 4} 4`}
        stroke={color}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

interface TileProps {
  bg?: string;
  children: ReactNode;
  brackets?: boolean;
  bracketColor?: string;
  style?: CSSProperties;
  radius?: number;
  dashed?: boolean;
  className?: string;
}

export function Tile({
  bg = D2_PAPER,
  children,
  brackets = true,
  bracketColor,
  style = {},
  radius = 24,
  dashed = false,
  className,
}: TileProps) {
  return (
    <div
      className={className}
      style={{
        position: "relative",
        background: bg,
        borderRadius: radius,
        overflow: "hidden",
        ...(dashed ? { outline: `2px dashed ${D2_INK}`, outlineOffset: -8 } : {}),
        ...style,
      }}
    >
      {brackets && <CornerBrackets color={bracketColor ?? D2_INK} />}
      {children}
    </div>
  );
}

export const grainBg: CSSProperties = {
  backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.07 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`,
};
