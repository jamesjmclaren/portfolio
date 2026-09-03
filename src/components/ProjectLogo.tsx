import { CSSProperties } from "react";

const archivoBlack: CSSProperties = {
  fontFamily: "'Archivo Black', 'Inter', sans-serif",
  fontWeight: 900,
};
const caveat: CSSProperties = {
  fontFamily: "'Caveat', 'Patrick Hand', cursive",
};

interface ProjectLogoProps {
  slug: string;
  style?: CSSProperties;
}

function WestLogo() {
  return (
    <svg viewBox="0 0 200 200" width="100%" height="100%">
      <defs>
        <linearGradient id="wg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#b8860b" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill="url(#wg)" />
      {[
        { x: 24, h: 60, y: 110 },
        { x: 52, h: 90, y: 80 },
        { x: 80, h: 50, y: 120 },
        { x: 108, h: 110, y: 60 },
        { x: 136, h: 75, y: 95 },
        { x: 164, h: 130, y: 40 },
      ].map((b) => (
        <rect key={b.x} x={b.x} y={b.y} width={18} height={b.h} fill="rgba(255,255,255,0.25)" rx={3} />
      ))}
      <line x1="20" y1="170" x2="180" y2="170" stroke="rgba(255,255,255,0.4)" strokeWidth={2} />
      <text
        x="100"
        y="145"
        textAnchor="middle"
        dominantBaseline="middle"
        style={{ ...archivoBlack, fontSize: 96 } as CSSProperties}
        fill="rgba(255,255,255,0.9)"
      >
        W
      </text>
    </svg>
  );
}

function PrempodLogo() {
  return (
    <svg viewBox="0 0 200 200" width="100%" height="100%">
      <defs>
        <linearGradient id="pg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5b8def" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill="url(#pg)" />
      {[
        [100, 30], [48, 62], [152, 62], [22, 120], [178, 120],
        [48, 148], [152, 148], [100, 180],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={10} fill="rgba(255,255,255,0.12)" />
      ))}
      <rect x="84" y="54" width="32" height="56" rx="16" fill="rgba(255,255,255,0.85)" />
      <path d="M68 98 Q68 130 100 130 Q132 130 132 98" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth={5} strokeLinecap="round" />
      <line x1="100" y1="130" x2="100" y2="150" stroke="rgba(255,255,255,0.85)" strokeWidth={5} strokeLinecap="round" />
      <line x1="84" y1="150" x2="116" y2="150" stroke="rgba(255,255,255,0.85)" strokeWidth={5} strokeLinecap="round" />
      <text x="100" y="194" textAnchor="middle" style={{ ...caveat, fontSize: 18 } as CSSProperties} fill="rgba(255,255,255,0.6)">
        prempod
      </text>
    </svg>
  );
}

function BurgerlistLogo() {
  return (
    <svg viewBox="0 0 200 200" width="100%" height="100%">
      <defs>
        <linearGradient id="bl_bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1a0600" />
          <stop offset="100%" stopColor="#2d0e00" />
        </linearGradient>
        <linearGradient id="bl_patty" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff6b00" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill="url(#bl_bg)" />
      <rect x="35" y="52" width="130" height="22" rx="11" fill="#fde68a" />
      <rect x="25" y="85" width="150" height="26" rx="13" fill="url(#bl_patty)" />
      <rect x="30" y="105" width="140" height="8" rx="4" fill="#4ade80" opacity="0.85" />
      <rect x="35" y="118" width="130" height="22" rx="11" fill="#fde68a" />
      <text x="100" y="168" textAnchor="middle" style={{ ...archivoBlack, fontSize: 22 } as CSSProperties} fill="rgba(255,120,0,0.9)" letterSpacing="1">
        BURGERLIST
      </text>
    </svg>
  );
}

function CategoraisLogo() {
  return (
    <svg viewBox="0 0 200 200" width="100%" height="100%">
      <defs>
        <linearGradient id="cat_brand" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00d9ff" />
          <stop offset="50%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill="#0a0a0f" />
      <rect x="24" y="24" width="152" height="152" rx="40" fill="url(#cat_brand)" />
      <rect x="44" y="44" width="112" height="112" rx="26" fill="#0a0a0f" />
      <text x="100" y="192" textAnchor="middle" style={{ fontFamily: "Arial, sans-serif", fontSize: 15, fontWeight: 700 } as CSSProperties} fill="rgba(255,255,255,0.55)">
        CategorAIs
      </text>
    </svg>
  );
}

function MazerTdLogo() {
  return (
    <svg viewBox="0 0 200 200" width="100%" height="100%">
      <defs>
        <linearGradient id="mz_bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3a2f57" />
          <stop offset="100%" stopColor="#1d1730" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill="url(#mz_bg)" />
      {/* Maze path the creeps walk */}
      <path
        d="M18 40 H150 V80 H50 V120 H150 V160 H18"
        fill="none"
        stroke="#e8c46a"
        strokeWidth={11}
        strokeLinecap="square"
        opacity={0.55}
      />
      {/* Tower guarding the last corner */}
      <rect x="150" y="86" width="34" height="48" fill="#e8c46a" />
      <path d="M150 86 h34 v-12 h-8 v6 h-6 v-6 h-6 v6 h-6 v-6 h-8 z" fill="#e8c46a" />
      <text
        x="100"
        y="190"
        textAnchor="middle"
        style={{ ...archivoBlack, fontSize: 24 } as CSSProperties}
        fill="rgba(232,196,106,0.85)"
        letterSpacing="1"
      >
        MAZER TD
      </text>
    </svg>
  );
}

const logoMap: Record<string, React.FC> = {
  "west-investments": WestLogo,
  prempod: PrempodLogo,
  burgerlist: BurgerlistLogo,
  categorais: CategoraisLogo,
  "mazer-td": MazerTdLogo,
};

export default function ProjectLogo({ slug, style = {} }: ProjectLogoProps) {
  const Logo = logoMap[slug];
  if (!Logo) return null;
  return (
    <div style={{ width: "100%", height: "100%", ...style }}>
      <Logo />
    </div>
  );
}
