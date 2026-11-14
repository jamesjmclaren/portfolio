import type { Metadata, Viewport } from "next";
import { archivoBlack, caveat, figtree, jetbrainsMono } from "./fonts";
import { profile } from "@/data/about";
import "./globals.css";

export const metadata: Metadata = {
  title: "James McLaren — Portfolio",
  description:
    "Quality engineering leader, 13+ years. Agentic QA at io.finnet. Personal projects, employment history, and an AI search that answers questions about my experience.",
  openGraph: {
    title: "James McLaren — Portfolio",
    description: "Personal projects, work history, and the code behind the products.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#101214",
  colorScheme: "dark",
};

/** Person schema — every field here is also visible on the page (hero, links
 *  row and the employment list), so the structured data matches the content. */
const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "Lead Software Quality Assurance Engineer",
  worksFor: { "@type": "Organization", name: "io.finnet", url: "https://iofinnet.com" },
  address: { "@type": "PostalAddress", addressLocality: "Edinburgh", addressCountry: "GB" },
  sameAs: [profile.github, profile.linkedin],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fontVars = [figtree.variable, jetbrainsMono.variable, archivoBlack.variable, caveat.variable].join(" ");
  return (
    <html lang="en-GB" className={fontVars}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
