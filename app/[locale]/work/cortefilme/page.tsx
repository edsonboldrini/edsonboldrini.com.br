import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExternalLink, Prose, Section, LocaleSwitcher } from "@/components";
import { getContent } from "@/lib/content";
import { JsonLd, creativeWorkSchema } from "@/lib/schema";
import { alternatesFor, isLocale, localePath } from "@/lib/i18n";

const PATH = "work/cortefilme";

const mainStyle = {
  maxInlineSize: "var(--measure-layout)",
  marginInline: "auto",
  paddingInline: "var(--space-5)",
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getContent(locale);

  return {
    title: t.meta.caseStudy.title,
    description: t.meta.caseStudy.description,
    alternates: alternatesFor(locale, PATH),
    openGraph: {
      type: "article",
      title: t.meta.caseStudy.title,
      description: t.meta.caseStudy.description,
      url: localePath(locale, PATH),
    },
  };
}

export default async function CorteFilmeCasePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getContent(locale);
  const study = t.caseStudy;

  return (
    <main id="main-content" tabIndex={-1} style={mainStyle}>
      <JsonLd data={creativeWorkSchema(locale)} />

      <LocaleSwitcher current={locale} path={PATH} label={t.ui.languageLabel} />

      <p style={{ marginBlockStart: "var(--space-6)", marginBlockEnd: 0 }}>
        <a
          href={localePath(locale)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            minBlockSize: 24,
            color: "var(--accent)",
            fontSize: "var(--text-sm)",
            fontWeight: 600,
          }}
        >
          ← {t.ui.backToHome}
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
          {study.title}
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
          {study.summary}
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
            href={study.href}
            style={{ color: "var(--accent)", fontWeight: 600 }}
          >
            {study.href.replace(/^https?:\/\//, "")}
          </ExternalLink>
        </p>
      </header>

      {study.sections.map((section) => (
        <Section key={section.key} id={section.key} heading={section.heading}>
          <Prose>
            <p>{section.body}</p>
          </Prose>
        </Section>
      ))}
    </main>
  );
}
