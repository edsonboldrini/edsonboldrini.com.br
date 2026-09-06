import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Syne, Source_Sans_3, IBM_Plex_Mono } from "next/font/google";
import { SkipLink } from "@/components";
import { getContent } from "@/lib/content";
import {
  isLocale,
  localeMeta,
  locales,
  type Locale,
} from "@/lib/i18n";
import { site } from "@/lib/site";
import { LocaleScript } from "@/components/LocaleScript";
import "../globals.css";

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
  // Only used for small meta lines, never for the LCP element. Keeping it out
  // of the preload set stops it competing with the body font during first paint.
  preload: false,
});

export function generateStaticParams(): { locale: Locale }[] {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getContent(locale);

  return {
    metadataBase: new URL(site.origin),
    title: {
      default: t.meta.home.title,
      template: "%s — Edson Boldrini",
    },
    description: t.meta.home.description,
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = getContent(locale);

  return (
    <html lang={localeMeta[locale].htmlLang}>
      <body
        className={`${syne.variable} ${sourceSans.variable} ${plexMono.variable}`}
      >
        <SkipLink label={t.ui.skipToContent} />
        <LocaleScript locale={locale} />
        {children}
      </body>
    </html>
  );
}
