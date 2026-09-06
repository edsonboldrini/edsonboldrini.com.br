/**
 * The shape every locale file must satisfy: translatable strings only.
 * Adding a language means adding one file that matches this interface —
 * TypeScript then refuses to build until every string is present.
 */
import type { CaseSectionKey, CompanySlug, WorkSlug } from "./shared";

export interface HeroStrings {
  readonly headline: string;
  readonly tagline: string;
  /** Alt text for the portrait — describes the person, not the file. */
  readonly photoAlt: string;
}

export interface WorkStrings {
  readonly title: string;
  readonly role: string;
  readonly oneLine: string;
  /** Short qualifier: domain or field. Never a date. */
  readonly meta: string;
}

export interface CompanyStrings {
  /** One line: what the company does. */
  readonly what: string;
  readonly role: string;
}

export interface CaseStudyStrings {
  readonly title: string;
  readonly summary: string;
  readonly sections: Readonly<Record<CaseSectionKey, { readonly heading: string; readonly body: string }>>;
}

/** Section headings and other chrome shown around the content. */
export interface UiStrings {
  readonly about: string;
  readonly selectedWork: string;
  readonly experience: string;
  readonly contact: string;
  readonly backToHome: string;
  readonly languageLabel: string;
  readonly notFoundTitle: string;
  readonly notFoundBody: string;
  readonly skipToContent: string;
}

export interface PageMeta {
  readonly title: string;
  readonly description: string;
}

export interface LocaleContent {
  readonly hero: HeroStrings;
  readonly about: readonly string[];
  readonly work: Readonly<Record<WorkSlug, WorkStrings>>;
  readonly companies: Readonly<Record<CompanySlug, CompanyStrings>>;
  readonly caseStudy: CaseStudyStrings;
  readonly ui: UiStrings;
  readonly meta: {
    readonly home: PageMeta;
    readonly caseStudy: PageMeta;
  };
}
