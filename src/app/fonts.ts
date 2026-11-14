import localFont from "next/font/local";

/** All type is self-hosted (OFL fonts from Fontsource); nothing loads from a
 *  third-party font CDN. Each font is exposed as a CSS variable on <html>. */
export const figtree = localFont({
  src: "./fonts/figtree-latin-wght-normal.woff2",
  weight: "300 900",
  variable: "--font-figtree",
  display: "swap",
});

export const jetbrainsMono = localFont({
  src: "./fonts/jetbrains-mono-latin-500-normal.woff2",
  weight: "500",
  variable: "--font-jetbrains",
  display: "swap",
});

/** Used only by the hand-drawn project marks in ProjectLogo. */
export const archivoBlack = localFont({
  src: "./fonts/archivo-black-latin-400-normal.woff2",
  weight: "400",
  variable: "--font-archivo-black",
  display: "swap",
  preload: false,
});

export const caveat = localFont({
  src: "./fonts/caveat-latin-wght-normal.woff2",
  weight: "400 700",
  variable: "--font-caveat",
  display: "swap",
  preload: false,
});
