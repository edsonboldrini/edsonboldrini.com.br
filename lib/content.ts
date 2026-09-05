/**
 * Typed content layer. Every fact published here is traceable to research/person.md
 * (ADENDO do orquestrador prevails in a conflict) — lib/content.ts and content/facts.md
 * are the evidence for Portão 7. No JSX, no components. English per research/ia.md.
 */
import { site } from "@/lib/site";

export interface Hero {
  readonly name: string;
  readonly headline: string;
  readonly tagline: string;
  readonly location: string;
}

/** research/ia.md §Headline do hero — exact strings. */
export const hero: Hero = {
  name: site.name,
  headline: "Software engineer. I build products end to end — and I run one.",
  tagline: "Vitória, Brazil · Currently at Superset · Creator of CorteFilme",
  location: `${site.location.city}, ${site.location.country}`,
} as const;

export interface About {
  readonly paragraphs: readonly string[];
}

export const about: About = {
  paragraphs: [
    "I'm a full-stack software engineer working across web and mobile — TypeScript first, then Node, Vue, React, Flutter, Go and Elixir, deployed on AWS and GCP. I'm based in Vitória, Brazil.",
    "At work I'm a software engineer at Superset, the platform personal trainers and fitness coaches use to run their coaching business. Outside work I built CorteFilme and run it myself: a web app that helps Brazilian window-film installers waste less film per roll.",
  ],
} as const;

export interface WorkItem {
  readonly slug: string;
  readonly title: string;
  readonly role: string;
  readonly oneLine: string;
  /** Year OR domain — years are omitted on purpose (employment dates are unreliable, ADENDO C3). */
  readonly meta: string;
  readonly stack: readonly string[];
  /** External link; absent when the company domain is dead (alem.com.br has no A record). */
  readonly href?: string;
  readonly hasCaseStudy: boolean;
}

/** Order per research/ia.md §Selected Work. */
export const selectedWork: readonly WorkItem[] = [
  {
    slug: "cortefilme",
    title: "CorteFilme",
    role: "Creator & owner",
    oneLine: "A web app that works out the most efficient layout for cutting solar-film rolls, so installers waste less.",
    meta: "Window-film cutting · Brazil",
    stack: ["Next.js", "Vue", "Quasar", "Hasura", "PostgreSQL", "Node.js", "Docker"],
    href: site.profiles.cortefilme,
    hasCaseStudy: true,
  },
  {
    slug: "superset",
    title: "Superset",
    role: "Software Engineer",
    oneLine: "The platform personal trainers and fitness coaches run their business on — clients, programming and payments — where I work today.",
    meta: "Fitness coaching software",
    stack: ["Python", "TypeScript", "React", "Expo"],
    href: "https://supersetapp.com",
    hasCaseStudy: false,
  },
  {
    slug: "club-trip",
    title: "Club Trip · Além",
    role: "Full Stack Engineer — built most of the product",
    oneLine: "A subscription travel product at Além that I built most of, from API to screens.",
    meta: "Travel subscriptions",
    stack: ["Vue", "Node", "AdonisJS", "Hasura", "PostgreSQL"],
    hasCaseStudy: false,
  },
  {
    slug: "le-card",
    title: "Le Card",
    role: "Full Stack Engineer — built the payments app from scratch",
    oneLine: "The mobile payments app I built from zero, pairing with a Bluetooth card terminal.",
    meta: "Payments · mobile",
    stack: ["Xamarin", ".NET Core"],
    href: "https://lecard.com.br",
    hasCaseStudy: false,
  },
] as const;

export interface ExperienceItem {
  readonly company: string;
  /** One line — what the company does. */
  readonly what: string;
  readonly role: string;
}

/** Most recent first, no dates — ADENDO C3: declared periods overlap and are unreliable. */
export const experience: readonly ExperienceItem[] = [
  { company: "Superset", what: "Software platform for personal trainers and fitness coaches", role: "Software Engineer" },
  { company: "w3.care", what: "Health-care software", role: "Full Stack Engineer — mobile & frontend" },
  { company: "Além", what: "Online travel", role: "Full Stack Engineer" },
  { company: "Conceptho", what: "News apps — content protection and paywalls", role: "Full Stack Engineer" },
  { company: "Dersalis", what: "Health and productivity — smartband apps", role: "Full Stack Engineer — managed the dev team" },
  { company: "Le Card", what: "Payments", role: "Full Stack Engineer" },
] as const;

export interface OpenSourceProject {
  readonly name: string;
  readonly description: string;
  readonly stack: readonly string[];
  readonly href: string;
}

/**
 * Only ORIGINAL implementations (ADENDO C1 — everything else is a fork). Scale kept
 * honest: small integrations/experiments, no traction claim (ADENDO C2).
 */
export const openSource: readonly OpenSourceProject[] = [
  {
    name: "flutter_getnet_pos",
    description: "A small Flutter plugin I wrote to talk to Getnet POS terminals. A narrow integration, not a maintained library.",
    stack: ["Java", "Flutter"],
    href: `${site.profiles.github}/flutter_getnet_pos`,
  },
  {
    name: "flutter_ycbtsdk",
    description: "A small Objective-C wrapper around the YCB smartband SDK — an experiment, not a library with users.",
    stack: ["Objective-C"],
    href: `${site.profiles.github}/flutter_ycbtsdk`,
  },
] as const;

export interface Contact {
  readonly email: string;
  readonly profiles: {
    readonly github: string;
    readonly linkedin: string;
    readonly x: string;
    readonly instagram: string;
  };
}

/** Email + profiles relay on lib/site.ts — profile URLs are never redeclared here. */
export const contact: Contact = {
  email: site.email,
  profiles: {
    github: site.profiles.github,
    linkedin: site.profiles.linkedin,
    x: site.profiles.x,
    instagram: site.profiles.instagram,
  },
} as const;

export type CaseStudyHeading =
  | "Context"
  | "Problem"
  | "What I built"
  | "Trade-offs"
  | "Result"
  | "What I learned";

export interface CaseStudySection {
  readonly heading: CaseStudyHeading;
  readonly body: string;
}

export interface CaseStudy {
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly href: string;
  readonly sections: readonly CaseStudySection[];
}

/** No invented business metrics — ia.md trava: customer/revenue numbers are unknown. */
export const caseStudy: CaseStudy = {
  slug: "cortefilme",
  title: "CorteFilme",
  summary: "A web app that helps Brazilian window-film installers turn each roll of film into more jobs and less waste.",
  href: site.profiles.cortefilme,
  sections: [
    {
      heading: "Context",
      body: "CorteFilme serves shops in Brazil that cut and install solar window film (insulfilm) on cars and buildings. Film comes in rolls; every piece is cut by hand, and every cut makes the rest of the roll less usable. It's my product, start to finish — I created it and still own it.",
    },
    {
      heading: "Problem",
      body: "Installers plan cuts by eye. Because a roll has fixed width and length, a sloppy layout leaves offcuts too small to reuse — and that waste comes straight out of margin. The core problem is layout: given the pieces a job needs, how do you cut them from a roll with the least leftover?",
    },
    {
      heading: "What I built",
      body: "A web application that computes the most efficient cutting layout for a roll of film, wrapped in the unglamorous but required parts: job records, reports and a free 15-day trial to get shops in the door. The landing page is a static Next.js site; the product itself is a Vue/Quasar SPA on top of Hasura and PostgreSQL, backed by a couple of Node.js services. Everything runs in Docker behind nginx on a VPS I operate myself — migrated off AWS — which is part of how I keep the cost of a one-person product in check.",
    },
    {
      heading: "Trade-offs",
      body: "Web first, so no one has to install anything and it works from the shop computer: offline use is simply out. Running it alone, I keep scope tight — a feature ships only if it pulls its weight in maintenance. The free trial is the honest way to prove the cutting plan before asking for money: a bet on the problem being real, not on a sales funnel.",
    },
    {
      heading: "Result",
      body: "CorteFilme is live: cortefilme.com.br, with the product at sistema.cortefilme.com.br and the 15-day trial in place. I won't publish revenue or customer counts — none of that is public, and I won't invent it. The claim that holds is the plain one: the product runs, and I still run it.",
    },
    {
      heading: "What I learned",
      body: "Solo ownership is a forcing function: scope, support and shipping all answer to one person. I learned that a problem you can state in one sentence — 'cut film with less waste' — is enough to build a real product around, and that keeping a one-person product alive beats adding features to it.",
    },
  ],
} as const;