import type { Metadata } from "next";
import "./globals.css";
import { DesignProvider } from "@/context/DesignContext";

export const metadata: Metadata = {
  title: "James McLaren — Portfolio",
  description:
    "Quality engineering leader and product builder. 13+ years across digital asset custody, connected TV and consulting. Personal projects, work history, and the code behind the products — built with Claude.",
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Caveat:wght@400;600;700&family=Archivo+Black&family=Patrick+Hand&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <DesignProvider>
          {children}
        </DesignProvider>
      </body>
    </html>
  );
}
