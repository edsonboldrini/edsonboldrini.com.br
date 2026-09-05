/**
 * Single source of truth for canonical URL and identity.
 * Every page's metadata, the sitemap and the JSON-LD read from here, so the
 * entity string "Edson Boldrini" and the canonical origin can never drift.
 * See research/ia.md.
 */
export const site = {
  name: "Edson Boldrini",
  origin: "https://edsonboldrini.com.br",
  locale: "en",
  title: "Edson Boldrini — Software Engineer",
  description:
    "Full-stack software engineer in Vitória, Brazil. TypeScript, Node, React and Flutter. Currently at Superset; creator of CorteFilme.",
  email: "edsonboldrini@gmail.com",
  location: {
    city: "Vitória",
    region: "Espírito Santo",
    country: "Brazil",
    countryCode: "BR",
  },
  /** Verified official profiles — used for JSON-LD sameAs. research/person.md C6. */
  profiles: {
    github: "https://github.com/edsonboldrini",
    linkedin: "https://www.linkedin.com/in/edsonboldrini",
    x: "https://x.com/edsonboldrini",
    instagram: "https://www.instagram.com/edsonboldrini",
    cortefilme: "https://www.cortefilme.com.br",
  },
} as const;

export const sameAs: readonly string[] = [
  site.profiles.github,
  site.profiles.linkedin,
  site.profiles.x,
  site.profiles.instagram,
];

/** Absolute URL for a site-relative path. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, site.origin).toString();
}
