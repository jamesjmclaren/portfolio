import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "James McLaren — Portfolio",
  description:
    "Engineering manager and product builder. Personal projects, work history, and the code behind the products — built with Claude.",
  openGraph: {
    title: "James McLaren — Portfolio",
    description: "Personal projects, work history, and the code behind the products.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
