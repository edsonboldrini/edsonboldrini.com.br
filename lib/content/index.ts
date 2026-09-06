/**
 * Assembles the view model a page consumes: locale-independent structure from
 * shared.ts merged with the translated strings of one locale.
 */
import { site } from "@/lib/site";
import { defaultLocale, type Locale } from "@/lib/i18n";
import { en } from "./en";
import { ptBR } from "./pt-br";
import { es } from "./es";
import type { LocaleContent, UiStrings } from "./types";
import {
  caseSectionKeys,
  companyNames,
  companySlugs,
  profileLinks,
  workShared,
  workSlugs,
} from "./shared";

const byLocale: Readonly<Record<Locale, LocaleContent>> = {
  en,
  "pt-br": ptBR,
  es,
};

export interface WorkView {
  readonly slug: string;
  readonly title: string;
  readonly role: string;
  readonly oneLine: string;
  readonly meta: string;
  readonly stack: readonly string[];
  readonly href?: string;
  readonly hasCaseStudy: boolean;
}

export interface ExperienceView {
  readonly company: string;
  readonly what: string;
  readonly role: string;
}

export interface CaseSectionView {
  /** Stable across languages, so anchors do not change per locale. */
  readonly key: string;
  readonly heading: string;
  readonly body: string;
}

export interface ContentView {
  readonly locale: Locale;
  readonly hero: {
    readonly name: string;
    readonly headline: string;
    readonly tagline: string;
    readonly photoAlt: string;
  };
  readonly about: readonly string[];
  readonly selectedWork: readonly WorkView[];
  readonly experience: readonly ExperienceView[];
  readonly caseStudy: {
    readonly slug: string;
    readonly title: string;
    readonly summary: string;
    readonly href: string;
    readonly sections: readonly CaseSectionView[];
  };
  readonly contact: {
    readonly email: string;
    readonly profiles: typeof profileLinks;
  };
  readonly ui: UiStrings;
  readonly meta: LocaleContent["meta"];
}

export function getContent(locale: Locale = defaultLocale): ContentView {
  const t = byLocale[locale];

  return {
    locale,
    hero: {
      name: site.name,
      headline: t.hero.headline,
      tagline: t.hero.tagline,
      photoAlt: t.hero.photoAlt,
    },
    about: t.about,
    selectedWork: workSlugs.map((slug) => ({
      slug,
      ...t.work[slug],
      ...workShared[slug],
    })),
    experience: companySlugs.map((slug) => ({
      company: companyNames[slug],
      ...t.companies[slug],
    })),
    caseStudy: {
      slug: "cortefilme",
      title: t.caseStudy.title,
      summary: t.caseStudy.summary,
      href: site.profiles.cortefilme,
      sections: caseSectionKeys.map((key) => ({
        key,
        ...t.caseStudy.sections[key],
      })),
    },
    contact: { email: site.email, profiles: profileLinks },
    ui: t.ui,
    meta: t.meta,
  };
}
