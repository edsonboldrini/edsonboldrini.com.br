/**
 * Locale-independent structure: slugs, URLs, tech stacks and ordering.
 *
 * Deliberately separated from the translated strings. A translator edits only
 * a locale file of plain strings and therefore cannot break a link, reorder
 * the page, or invent a technology — the facts that must not drift between
 * languages live here, once.
 */
import { site } from "@/lib/site";

export const workSlugs = ["cortefilme", "superset", "club-trip", "le-card"] as const;
export type WorkSlug = (typeof workSlugs)[number];

export interface WorkShared {
  readonly stack: readonly string[];
  /** Absent when the company domain is dead (alem.com.br has no A record). */
  readonly href?: string;
  readonly hasCaseStudy: boolean;
}

export const workShared: Readonly<Record<WorkSlug, WorkShared>> = {
  cortefilme: {
    stack: ["Next.js", "Vue", "Quasar", "Hasura", "PostgreSQL", "Node.js", "Docker"],
    href: site.profiles.cortefilme,
    hasCaseStudy: true,
  },
  superset: {
    stack: ["Python", "TypeScript", "React", "Expo"],
    href: "https://supersetapp.com",
    hasCaseStudy: false,
  },
  "club-trip": {
    stack: ["Vue", "Node.js", "AdonisJS", "Hasura", "PostgreSQL"],
    hasCaseStudy: false,
  },
  "le-card": {
    stack: ["Xamarin", ".NET Core"],
    href: "https://lecard.com.br",
    hasCaseStudy: false,
  },
};

export const companySlugs = [
  "superset",
  "w3care",
  "alem",
  "conceptho",
  "dersalis",
  "lecard",
] as const;
export type CompanySlug = (typeof companySlugs)[number];

/** Display names are proper nouns: identical in every language. */
export const companyNames: Readonly<Record<CompanySlug, string>> = {
  superset: "Superset",
  w3care: "w3.care",
  alem: "Além",
  conceptho: "Conceptho",
  dersalis: "Dersalis",
  lecard: "Le Card",
};

export const caseSectionKeys = [
  "context",
  "problem",
  "built",
  "tradeoffs",
  "result",
  "learned",
] as const;
export type CaseSectionKey = (typeof caseSectionKeys)[number];

/** Profile links are the same in every language. */
export const profileLinks = [
  { key: "github", href: site.profiles.github, label: "GitHub" },
  { key: "linkedin", href: site.profiles.linkedin, label: "LinkedIn" },
  { key: "x", href: site.profiles.x, label: "X (Twitter)" },
  { key: "instagram", href: site.profiles.instagram, label: "Instagram" },
] as const;
