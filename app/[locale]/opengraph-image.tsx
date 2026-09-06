import { ImageResponse } from "next/og";

import { getContent } from "@/lib/content";
import { defaultLocale, isLocale, locales, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

export const alt = "Edson Boldrini — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Prerender one image per language instead of rendering on demand. */
export function generateStaticParams(): { locale: Locale }[] {
  return locales.map((locale) => ({ locale }));
}

/** Params is a Promise in Next 16 (docs: opengraph-image, v16.0.0). */
export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<ImageResponse> {
  const { locale } = await params;
  const t = getContent(isLocale(locale) ? locale : defaultLocale);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 96px",
          background: "#f5f6f8",
          color: "#111827",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1 }}>
          {t.hero.name}
        </div>
        <div
          style={{
            fontSize: 34,
            fontWeight: 400,
            marginTop: 24,
            lineHeight: 1.4,
          }}
        >
          {t.hero.headline}
        </div>
        <div style={{ fontSize: 24, color: "#6b7280", marginTop: 48 }}>
          {site.origin.replace("https://", "")}
        </div>
      </div>
    ),
    { ...size },
  );
}
