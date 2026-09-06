import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Hero,
  Section,
  Prose,
  WorkItem,
  ExperienceList,
  Footer,
  LocaleSwitcher,
} from "@/components";
import {
  JsonLd,
  personSchema,
  websiteSchema,
  profilePageSchema,
} from "@/lib/schema";
import { getContent } from "@/lib/content";
import {
  alternatesFor,
  isLocale,
  localeMeta,
  localePath,
  locales,
} from "@/lib/i18n";

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
    title: t.meta.home.title,
    description: t.meta.home.description,
    alternates: alternatesFor(locale),
    openGraph: {
      type: "website",
      locale: localeMeta[locale].ogLocale,
      alternateLocale: locales
        .filter((other) => other !== locale)
        .map((other) => localeMeta[other].ogLocale),
      title: t.meta.home.title,
      description: t.meta.home.description,
      url: localePath(locale),
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getContent(locale);

  return (
    <main id="main-content" tabIndex={-1} style={mainStyle}>
      {/* Structured data: rendered server-side so crawlers and agents get it
          without executing any JavaScript. */}
      <JsonLd data={personSchema(locale)} />
      <JsonLd data={websiteSchema(locale)} />
      <JsonLd data={profilePageSchema(locale)} />

      <LocaleSwitcher current={locale} label={t.ui.languageLabel} />

      <Hero
        name={t.hero.name}
        headline={t.hero.headline}
        meta={t.hero.tagline}
        photo={{
          src: "/img/edson-boldrini.jpg",
          size: 128,
          alt: t.hero.photoAlt,
        }}
        links={t.contact.profiles
          .filter((p) => p.key === "github" || p.key === "linkedin")
          .map((p) => ({ href: p.href, label: p.label, external: true }))}
      />

      <Section id="about" heading={t.ui.about}>
        <Prose>
          {t.about.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </Prose>
      </Section>

      <Section id="work" heading={t.ui.selectedWork}>
        {t.selectedWork.map((item) => (
          <WorkItem
            key={item.slug}
            title={item.title}
            href={
              item.hasCaseStudy
                ? localePath(locale, `work/${item.slug}`)
                : item.href
            }
            external={Boolean(item.href && !item.hasCaseStudy)}
            outcome={item.oneLine}
            meta={`${item.role} · ${item.meta}`}
            stack={item.stack.join(" · ")}
          />
        ))}
      </Section>

      <Section id="experience" heading={t.ui.experience}>
        <ExperienceList
          items={t.experience.map((item) => ({
            company: item.company,
            summary: item.what,
            role: item.role,
          }))}
        />
      </Section>


      <Footer
        id="contact"
        heading={t.ui.contact}
        email={{ href: `mailto:${t.contact.email}`, label: t.contact.email }}
        profiles={t.contact.profiles.map((p) => ({
          href: p.href,
          label: p.label,
          external: true,
        }))}
      />
    </main>
  );
}
