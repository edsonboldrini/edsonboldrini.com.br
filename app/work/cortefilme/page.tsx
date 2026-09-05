import type { Metadata } from "next";
import { ExternalLink, Prose, Section } from "@/components";
import { caseStudy } from "@/lib/content";
import { JsonLd, creativeWorkSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "CorteFilme",
  description:
    "How I built CorteFilme, a SaaS that cuts window-film waste for Brazilian installers.",
  alternates: { canonical: "/work/cortefilme" },
};

const mainStyle = {
  maxInlineSize: "var(--measure-layout)",
  marginInline: "auto",
  paddingInline: "var(--space-5)",
} as const;

export default function CorteFilmeCasePage() {
  return (
    <main id="main-content" tabIndex={-1} style={mainStyle}>
      <JsonLd data={creativeWorkSchema()} />
      <p
        style={{
          marginBlockStart: "var(--space-7)",
          marginBlockEnd: 0,
        }}
      >
        <a
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            minBlockSize: 24,
            color: "var(--accent)",
            fontSize: "var(--text-sm)",
            fontWeight: 600,
          }}
        >
          ← Home
        </a>
      </p>

      <header style={{ paddingBlock: "var(--space-6) var(--space-5)" }}>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-2xl)",
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            margin: 0,
            color: "var(--ink)",
          }}
        >
          {caseStudy.title}
        </h1>
        <p
          style={{
            marginBlockStart: "var(--space-4)",
            marginBlockEnd: 0,
            fontSize: "var(--text-lg)",
            maxInlineSize: "var(--measure-text)",
            color: "var(--ink)",
          }}
        >
          {caseStudy.summary}
        </p>
        <p
          style={{
            marginBlockStart: "var(--space-3)",
            marginBlockEnd: 0,
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-sm)",
          }}
        >
          <ExternalLink
            href={caseStudy.href}
            style={{ color: "var(--accent)", fontWeight: 600 }}
          >
            {caseStudy.href.replace(/^https?:\/\//, "")}
          </ExternalLink>
        </p>
      </header>

      {caseStudy.sections.map((section) => (
        <Section
          key={section.heading}
          id={section.heading.toLowerCase().replace(/\s+/g, "-")}
          heading={section.heading}
        >
          <Prose>
            <p>{section.body}</p>
          </Prose>
        </Section>
      ))}
    </main>
  );
}
