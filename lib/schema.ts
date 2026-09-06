/**
 * Typed JSON-LD builders. Identity and URLs ALWAYS come from lib/site.ts and
 * lib/content.ts — never hardcoded here. Only the schemas sanctioned by
 * research/ia.md §JSON-LD: Person, WebSite, ProfilePage, CreativeWork.
 * No SoftwareSourceCode, EducationalOccupationalCredential, Rating or Review.
 */
import { createElement } from "react";
import type { ReactElement } from "react";

import { site } from "@/lib/site";
import { getContent, type WorkView } from "@/lib/content";
import {
  defaultLocale,
  localeMeta,
  localePath,
  type Locale,
} from "@/lib/i18n";

/**
 * Any of the concrete schema shapes below. A plain Record<string, unknown>
 * would not accept them: interfaces have no implicit index signature, so
 * passing PersonLd where a Record is expected is a type error.
 */
export type JsonLdData =
  | PersonLd
  | WebSiteLd
  | ProfilePageLd
  | CreativeWorkLd;

/* ------------------------------------------------------------------ */
/* Schema.org interfaces (owned here, mirrored in docs)                */
/* ------------------------------------------------------------------ */

export interface PostalAddressLd {
  readonly "@type": "PostalAddress";
  readonly addressLocality: string;
  readonly addressRegion: string;
  readonly addressCountry: string;
}

export interface OrganizationLd {
  readonly "@type": "Organization";
  readonly name: string;
  readonly url: string;
}

export interface PersonLd {
  readonly "@context": "https://schema.org";
  readonly "@id": string;
  readonly "@type": "Person";
  readonly name: string;
  readonly url: string;
  readonly jobTitle: string;
  readonly email: string;
  readonly address: PostalAddressLd;
  readonly knowsAbout: readonly string[];
  readonly worksFor: OrganizationLd;
  readonly sameAs: readonly string[];
}

export interface WebSiteLd {
  readonly "@context": "https://schema.org";
  readonly "@type": "WebSite";
  readonly name: string;
  readonly url: string;
  readonly inLanguage: string;
}

export interface ProfilePageLd {
  readonly "@context": "https://schema.org";
  readonly "@type": "ProfilePage";
  /** Reference only — the Person node itself is emitted separately with the same @id. */
  readonly mainEntity: {
    readonly "@id": string;
  };
}

export interface CreativeWorkLd {
  readonly "@context": "https://schema.org";
  readonly "@type": "CreativeWork";
  readonly name: string;
  readonly url: string;
  readonly description: string;
  readonly inLanguage: string;
  readonly author: PersonLd;
}

/* ------------------------------------------------------------------ */
/* Derived facts (all traceable to content.ts / site.ts)               */
/* ------------------------------------------------------------------ */

/**
 * Superset is the current employer — cargo e empresa saem de selectedWork.
 * Throws at build time if the item or its href is ever removed: a JSON-LD
 * worksFor with a dead URL is worse than no JSON-LD.
 */
function requireHref(item: WorkView): string {
  const href = item.href;
  if (!href) {
    throw new Error(`Missing href for "${item.slug}" in lib/content/shared.ts`);
  }
  return href;
}

function findWork(work: readonly WorkView[], slug: string): WorkView {
  const item = work.find((candidate) => candidate.slug === slug);
  if (!item) {
    throw new Error(`selectedWork has no item with slug "${slug}"`);
  }
  return item;
}

/**
 * knowsAbout = union of every stack published on the site — no new facts.
 * Stacks live in shared.ts and are identical in every language, so this is
 * locale-independent by construction.
 */
function knowsAboutFor(locale: Locale): readonly string[] {
  const t = getContent(locale);
  return [
    ...new Set([
      ...t.selectedWork.flatMap((item) => item.stack),
      ...t.openSource.flatMap((project) => project.stack),
    ]),
  ];
}

/* ------------------------------------------------------------------ */
/* Builders                                                            */
/* ------------------------------------------------------------------ */

export function personSchema(locale: Locale = defaultLocale): PersonLd {
  const t = getContent(locale);
  const superset = findWork(t.selectedWork, "superset");
  return {
    "@context": "https://schema.org",
    "@id": `${site.origin}/#person`,
    "@type": "Person",
    name: site.name,
    url: `${site.origin}/`,
    jobTitle: superset.role,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location.city,
      addressRegion: site.location.region,
      addressCountry: site.location.countryCode,
    },
    knowsAbout: knowsAboutFor(locale),
    worksFor: {
      "@type": "Organization",
      name: superset.title,
      url: requireHref(superset),
    },
    sameAs: [
      site.profiles.github,
      site.profiles.linkedin,
      site.profiles.x,
      site.profiles.instagram,
    ],
  };
}

export function websiteSchema(locale: Locale = defaultLocale): WebSiteLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    // site.name ("Edson Boldrini"), not site.title: the title carries an
    // English job description that would be wrong on the translated pages.
    name: site.name,
    url: `${site.origin}/`,
    inLanguage: localeMeta[locale].htmlLang,
  };
}

export function profilePageSchema(_locale: Locale = defaultLocale): ProfilePageLd {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: { "@id": `${site.origin}/#person` },
  };
}

/** CreativeWork — CorteFilme é produto/SaaS, NÃO SoftwareSourceCode (ia.md). */
export function creativeWorkSchema(locale: Locale = defaultLocale): CreativeWorkLd {
  const { caseStudy } = getContent(locale);
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: caseStudy.title,
    url: caseStudy.href,
    description: caseStudy.summary,
    inLanguage: localeMeta[locale].htmlLang,
    author: personSchema(locale),
  };
}

/* ------------------------------------------------------------------ */
/* JsonLd — render <script type="application/ld+json">.                */
/* Purpose-built for injection from page files; pages are owned by     */
/* the orchestrator, this component is the only touch point.           */
/* ------------------------------------------------------------------ */

export function JsonLd({ data }: { readonly data: JsonLdData }): ReactElement {
  return createElement("script", {
    type: "application/ld+json",
    dangerouslySetInnerHTML: { __html: JSON.stringify(data) },
  });
}