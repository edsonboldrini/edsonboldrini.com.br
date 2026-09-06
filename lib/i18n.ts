/**
 * Locale plumbing. One place defines which languages exist, how they are
 * spelled in URLs, in <html lang> and in Open Graph, so a new language is a
 * single entry here plus one content file.
 */

export const locales = ["en", "pt-br", "es"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Cookie name Next.js uses by convention; read by proxy.ts on the apex. */
export const LOCALE_COOKIE = "NEXT_LOCALE";

export interface LocaleMeta {
  /** BCP 47 tag for <html lang> and hreflang. */
  readonly htmlLang: string;
  /** Open Graph locale. */
  readonly ogLocale: string;
  /** Short label shown next to the flag. */
  readonly label: string;
  /** Language name in its own language — the accessible name of the switch. */
  readonly nativeName: string;
}

export const localeMeta: Readonly<Record<Locale, LocaleMeta>> = {
  en: {
    htmlLang: "en",
    ogLocale: "en_US",
    label: "EN",
    nativeName: "English",
  },
  "pt-br": {
    htmlLang: "pt-BR",
    ogLocale: "pt_BR",
    label: "PT-BR",
    nativeName: "Português (Brasil)",
  },
  es: {
    htmlLang: "es",
    ogLocale: "es_ES",
    label: "ES",
    nativeName: "Español",
  },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * Public URL path for a locale.
 *
 * English lives at the apex ("/", "/work/x") rather than "/en/...": the apex
 * has to keep answering 200 with real content for crawlers, agents and plain
 * `curl`. proxy.ts rewrites "/" onto the /en route tree, so /en also renders
 * and simply declares the apex as its canonical.
 */
export function localePath(locale: Locale, path = ""): string {
  const clean = path.replace(/^\/+/, "");
  const prefix = locale === defaultLocale ? "" : `/${locale}`;
  if (!clean) return prefix === "" ? "/" : prefix;
  return `${prefix}/${clean}`;
}

/**
 * Pick the best supported locale from an Accept-Language header.
 *
 * Hand-written rather than pulling in Negotiator + intl-localematcher: the
 * grammar is small, and two dependencies to parse one header is a poor trade
 * for a site whose point is shipping almost nothing.
 */
export function matchLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale;

  const ranked = acceptLanguage
    .split(",")
    .map((part) => {
      const [tagRaw, ...params] = part.trim().split(";");
      const tag = (tagRaw ?? "").trim().toLowerCase();
      const qParam = params.find((p) => p.trim().startsWith("q="));
      const q = qParam ? Number.parseFloat(qParam.trim().slice(2)) : 1;
      return { tag, q: Number.isFinite(q) ? q : 0 };
    })
    .filter((entry) => entry.tag !== "" && entry.q > 0)
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranked) {
    if (tag === "*") return defaultLocale;
    // Exact match, e.g. "pt-br".
    if (isLocale(tag)) return tag;
    // Base language, e.g. "pt-pt" and bare "pt" both resolve to pt-br, the
    // only Portuguese this site has.
    const base = tag.split("-")[0] ?? "";
    if (base === "pt") return "pt-br";
    if (base === "es") return "es";
    if (base === "en") return "en";
  }

  return defaultLocale;
}

/**
 * Canonical + hreflang set for one page, in one locale.
 *
 * Every language links to every other, including itself, and declares an
 * x-default — that is what tells a search engine these are translations of one
 * page rather than duplicates. English canonicalises to the apex, so /en is
 * reachable (proxy.ts rewrites the apex onto it) without competing with "/".
 */
export function alternatesFor(
  locale: Locale,
  path = "",
): {
  canonical: string;
  languages: Record<string, string>;
} {
  const languages: Record<string, string> = {};
  for (const candidate of locales) {
    languages[localeMeta[candidate].htmlLang] = localePath(candidate, path);
  }
  languages["x-default"] = localePath(defaultLocale, path);

  return { canonical: localePath(locale, path), languages };
}
