import type { LocaleContent } from "./types";

/**
 * English — the source of truth. Every string here was checked against
 * research/person.md and is mapped in content/facts.md. Translations must
 * carry the same claims and add none.
 */
export const en: LocaleContent = {
  hero: {
    headline: "Software engineer. I build products end to end — and I run one.",
    photoAlt: "Edson Boldrini",
    tagline: "Vitória, Brazil · Currently at Superset · Creator of CorteFilme",
  },
  about: [
    "I'm a full-stack software engineer working across web and mobile — TypeScript first, then Node, Vue, React, Flutter, Go and Elixir, deployed on AWS and GCP. I'm based in Vitória, Brazil.",
    "At work I'm a software engineer at Superset, the platform personal trainers and fitness coaches use to run their coaching business. Outside work I built CorteFilme and run it myself: a web app that helps Brazilian window-film installers waste less film per roll.",
  ],
  work: {
    cortefilme: {
      title: "CorteFilme",
      role: "Creator & owner",
      oneLine:
        "A web app that works out the most efficient layout for cutting solar-film rolls, so installers waste less.",
      meta: "Window-film cutting · Brazil",
    },
    superset: {
      title: "Superset",
      role: "Software Engineer",
      oneLine:
        "The platform personal trainers and fitness coaches run their business on — clients, programming and payments — where I work today.",
      meta: "Fitness coaching software",
    },
    "club-trip": {
      title: "Club Trip · Além",
      role: "Full Stack Engineer — built most of the product",
      oneLine: "A subscription travel product at Além that I built most of.",
      meta: "Travel subscriptions",
    },
    "le-card": {
      title: "Le Card",
      role: "Full Stack Engineer — built the payments app from scratch",
      oneLine:
        "The mobile payments app I built from zero, pairing with a Bluetooth card terminal.",
      meta: "Payments · mobile",
    },
  },
  companies: {
    superset: {
      what: "Software platform for personal trainers and fitness coaches",
      role: "Software Engineer",
    },
    w3care: {
      what: "Health-care software",
      role: "Full Stack Engineer — mobile & frontend",
    },
    alem: { what: "Online travel", role: "Full Stack Engineer" },
    conceptho: {
      what: "News apps — content protection and paywalls",
      role: "Full Stack Engineer",
    },
    dersalis: {
      what: "Health and productivity — smartband apps",
      role: "Full Stack Engineer — managed the dev team",
    },
    lecard: { what: "Payments", role: "Full Stack Engineer" },
  },
  caseStudy: {
    title: "CorteFilme",
    summary:
      "A web app that helps Brazilian window-film shops waste less film per roll.",
    sections: {
      context: {
        heading: "Context",
        body: "CorteFilme is a web app for window-film shops in Brazil — shops that cut solar film (insulfilm) from rolls. Film comes in rolls of fixed size, and every cut shrinks the leftover toward waste. It's my product, start to finish: I created it and still own it.",
      },
      problem: {
        heading: "Problem",
        body: "Because a roll has fixed width and length, a poor cutting layout leaves offcuts too small to reuse — and that waste comes straight out of the shop's margin. The core problem is layout: given the pieces a job needs, how do you cut them from a roll with the least leftover?",
      },
      built: {
        heading: "What I built",
        body: "A web application that computes the most efficient cutting layout for a roll of film, wrapped in the unglamorous but required parts: job records, reports and a free 15-day trial to get shops in the door. The landing page is a static Next.js site; the product itself is a Vue/Quasar SPA on top of Hasura and PostgreSQL, backed by a couple of Node.js services. Everything runs in Docker behind nginx on a VPS I operate myself — migrated off AWS — which is part of how I keep the cost of a one-person product in check.",
      },
      tradeoffs: {
        heading: "Trade-offs",
        body: "Web first — a hosted app, so shops can use it from any browser, nothing to install. Running it alone, I keep scope tight — a feature ships only if it pulls its weight in maintenance. The free 15-day trial is the honest way to prove the cutting plan before asking for money: a bet on the problem being real, not on a sales funnel.",
      },
      result: {
        heading: "Result",
        body: "CorteFilme is live: cortefilme.com.br, with the product at sistema.cortefilme.com.br and the 15-day trial in place. I won't publish revenue or customer counts — none of that is public, and I won't invent it. The claim that holds is the plain one: the product runs, and I still run it.",
      },
      learned: {
        heading: "What I learned",
        body: "Solo ownership is a forcing function: scope, support and shipping all answer to one person. I learned that a problem you can state in one sentence — 'cut film with less waste' — is enough to build a real product around, and that keeping a one-person product alive beats adding features to it.",
      },
    },
  },
  ui: {
    about: "About",
    selectedWork: "Selected Work",
    experience: "Experience",
    contact: "Contact",
    backToHome: "Back to home",
    languageLabel: "Language",
    notFoundTitle: "Page not found",
    notFoundBody:
      "That page doesn't exist — it may have been moved or the link may be wrong.",
    skipToContent: "Skip to content",
  },
  meta: {
    home: {
      title: "Edson Boldrini — Software Engineer",
      description:
        "Full-stack software engineer in Vitória, Brazil. TypeScript, Node, React and Flutter. Currently at Superset; creator of CorteFilme.",
    },
    caseStudy: {
      title: "CorteFilme",
      description:
        "How I built CorteFilme, a SaaS that cuts window-film waste for Brazilian installers.",
    },
  },
};
