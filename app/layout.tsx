import type { Metadata } from "next";
import { Syne, Source_Sans_3, IBM_Plex_Mono } from "next/font/google";
import { SkipLink } from "@/components";
import { site } from "@/lib/site";
import "./globals.css";

// Self-hosted by next/font at build time: no third-party request, no layout
// shift (size-adjust fallbacks are generated), which protects LCP and CLS.
const syne = Syne({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-syne",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-source-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.origin),
  title: {
    default: site.title,
    template: "%s — Edson Boldrini",
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.origin,
    siteName: site.name,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    creator: "@edsonboldrini",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={site.locale}>
      <body
        className={`${syne.variable} ${sourceSans.variable} ${plexMono.variable}`}
      >
        <SkipLink />
        {children}
      </body>
    </html>
  );
}
