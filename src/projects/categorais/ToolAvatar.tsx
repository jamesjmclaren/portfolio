"use client";

import { useState } from "react";

interface ToolAvatarProps {
  name: string;
  logo: string;
  color: string;
  /** Outer tile size in pixels. Default: 48. */
  size?: number;
  /** Outer container className — defaults match the existing
   *  white-on-white tile look used across categorais demos. */
  className?: string;
  /** Rounded-corner radius. Default: "rounded-xl". */
  rounded?: string;
}

/**
 * Renders a tool/brand avatar that always looks deliberate:
 *
 *   1. The tile is painted with the tool's brand colour as a subtle
 *      gradient, with the first letter of the name shown white-on-brand.
 *   2. The favicon (Google's favicon service in our data) is overlaid on
 *      top with `object-contain` so we don't crop logos that aren't square.
 *   3. If the favicon never loads (404, blocked, etc.) the letter avatar
 *      remains visible instead of a broken-image icon.
 *
 * This is the fix for the patchy clearbit/Wikimedia URLs in the original
 * demo data, which sometimes silently failed and left empty grey tiles.
 */
export default function ToolAvatar({
  name,
  logo,
  color,
  size = 48,
  className = "",
  rounded = "rounded-xl",
}: ToolAvatarProps) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const showImage = loaded && !errored;
  const letter =
    name.replace(/^[^A-Za-z0-9]+/, "").charAt(0).toUpperCase() || "?";

  return (
    <div
      className={`relative ${rounded} overflow-hidden flex items-center justify-center font-bold text-white shrink-0 ${className}`}
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${color}, ${color}cc)`,
        fontSize: Math.round(size * 0.45),
      }}
      aria-hidden="true"
    >
      <span
        className="select-none"
        style={{
          textShadow: "0 1px 2px rgba(0,0,0,0.25)",
          opacity: showImage ? 0 : 1,
          transition: "opacity 200ms",
        }}
      >
        {letter}
      </span>
      {!errored && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logo}
          alt=""
          loading="lazy"
          referrerPolicy="no-referrer"
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          className="absolute inset-0 m-auto object-contain"
          style={{
            width: "70%",
            height: "70%",
            opacity: showImage ? 1 : 0,
            transition: "opacity 200ms",
          }}
        />
      )}
    </div>
  );
}
