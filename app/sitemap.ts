import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { localeMeta, localePath, locales, defaultLocale } from "@/lib/i18n";

const PAGES = ["", "work/cortefilme"] as const;

const abs = (path: string): string => new URL(path, site.origin).toString();

/**
 * Every page in every language, each entry declaring the full set of
 * translations. Search engines use `alternates.languages` to group them as one
 * page in three languages rather than three competing pages.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    PAGES.map((page) => {
      const languages: Record<string, string> = {};
      for (const candidate of locales) {
        languages[localeMeta[candidate].htmlLang] = abs(
          localePath(candidate, page),
        );
      }
      languages["x-default"] = abs(localePath(defaultLocale, page));

      return {
        url: abs(localePath(locale, page)),
        changeFrequency: page === "" ? ("monthly" as const) : ("yearly" as const),
        priority: page === "" ? 1 : 0.8,
        alternates: { languages },
      };
    }),
  );
}
