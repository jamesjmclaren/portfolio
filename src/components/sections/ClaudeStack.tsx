"use client";

import { useState } from "react";

/* ─── Tech used across all hobby projects ─────────────────────────────────── */
const tech = [
  // Core
  { name: "Next.js",        icon: "nextdotjs",          category: "Framework"  },
  { name: "React",          icon: "react",              category: "Framework"  },
  { name: "TypeScript",     icon: "typescript",         category: "Language"   },
  { name: "Tailwind CSS",   icon: "tailwindcss",        category: "Styling"    },
  { name: "Vanilla JS",     icon: "javascript",         category: "Language"   },
  // Data
  { name: "Supabase",       icon: "supabase",           category: "Database"   },
  { name: "Prisma",         icon: "prisma",             category: "Database"   },
  { name: "PostgreSQL",     icon: "postgresql",         category: "Database"   },
  { name: "SQL",            icon: null,                 category: "Database",   caveat: true },
  // Auth
  { name: "NextAuth",       icon: "authjs",             category: "Auth"       },
  { name: "Clerk",          icon: "clerk",              category: "Auth"       },
  // APIs & services
  { name: "Stripe",         icon: "stripe",             category: "Service"    },
  { name: "Cloudinary",     icon: "cloudinary",         category: "Service"    },
  { name: "Vercel Blob",    icon: "vercel",             category: "Service"    },
  { name: "Google Maps",    icon: "googlemaps",         category: "Service"    },
  { name: "YouTube API",    icon: "youtube",            category: "Service"    },
  { name: "Spotify API",    icon: "spotify",            category: "Service"    },
  { name: "Brave Search",   icon: "brave",              category: "Service"    },
  // AI
  { name: "Groq",           icon: "groq",               category: "AI"         },
  { name: "Claude Code",    icon: null,                 category: "AI"         },
  // Infra & deploy
  { name: "Vercel",         icon: "vercel",             category: "Infra"      },
  { name: "AWS Rekognition",icon: "amazonaws",          category: "Infra"      },
  { name: "GitHub Actions", icon: "githubactions",      category: "Infra"      },
  // Libraries
  { name: "Express.js",     icon: "express",            category: "Library"    },
  { name: "Framer Motion",  icon: "framer",             category: "Library"    },
  { name: "Recharts",       icon: null,                 category: "Library"    },
  { name: "Zod",            icon: "zod",                category: "Library"    },
];

const categories = ["All", "Framework", "Language", "Styling", "Database", "Auth", "Service", "AI", "Infra", "Library"];

function TechBadge({ name, icon, caveat }: { name: string; icon: string | null; caveat?: boolean }) {
  const [imgFailed, setImgFailed] = useState(false);
  const iconUrl = icon ? `https://cdn.simpleicons.org/${icon}/ffffff` : null;

  return (
    <div
      className="group flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-border bg-surface hover:border-accent-muted hover:bg-surface-hover transition-all cursor-default"
      title={caveat ? "Used in projects — not expert level" : name}
    >
      {iconUrl && !imgFailed ? (
        <img
          src={iconUrl}
          alt=""
          width={15}
          height={15}
          className="shrink-0 opacity-70 group-hover:opacity-100 transition-opacity"
          onError={() => setImgFailed(true)}
        />
      ) : (
        <span className="size-[15px] shrink-0 rounded-sm bg-border flex items-center justify-center text-[7px] text-text-muted font-mono">
          ?
        </span>
      )}
      <span className="text-xs text-text-secondary group-hover:text-text-primary transition-colors font-mono leading-none">
        {name}
      </span>
      {caveat && (
        <span className="text-[9px] text-accent/60 shrink-0" title="Not expert-level — used with Claude's help">~</span>
      )}
    </div>
  );
}

export default function ClaudeStack() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? tech
    : tech.filter((t) => t.category === activeCategory);

  return (
    <section
      id="claude-stack"
      className="snap-section h-screen flex items-center px-6 md:px-10 pt-14 overflow-hidden"
    >
      <div className="mx-auto w-full max-w-6xl">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent mb-4">
          06 / 07 · Hobby Stack
        </p>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-2">
              Built with Claude.
            </h2>
            <p className="text-text-secondary max-w-xl leading-relaxed text-sm">
              Every personal project on this site was built pair-programming with{" "}
              <span className="text-accent font-medium">Claude Code</span> as daily driver.
              These are the technologies that appear in production-deployed code —{" "}
              <span className="text-text-primary">not a claim of expert-level proficiency</span>.
              I direct, debug, and own the output. Claude helps me ship fast.
            </p>
          </div>

          {/* Claude Code pill */}
          <div className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-full border border-accent-muted bg-accent-muted/20">
            <span className="size-2 rounded-full bg-accent animate-pulse shrink-0" />
            <span className="text-xs text-accent font-medium whitespace-nowrap">Claude Code · daily driver</span>
          </div>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full border transition-all"
              style={{
                borderColor: activeCategory === cat ? "var(--color-accent)" : "var(--color-border)",
                color:       activeCategory === cat ? "var(--color-accent)" : "var(--color-text-muted)",
                background:  activeCategory === cat ? "rgba(212,175,55,0.1)" : "transparent",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-2">
          {filtered.map((t) => (
            <TechBadge key={t.name} name={t.name} icon={t.icon} caveat={t.caveat} />
          ))}
        </div>

        <p className="mt-5 text-[10px] text-text-muted font-mono">
          ~ = appears in the codebase, not claimed as expert-level
        </p>
      </div>
    </section>
  );
}
