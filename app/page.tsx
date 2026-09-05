import {
  Hero,
  Section,
  Prose,
  WorkItem,
  ExperienceList,
  Footer,
} from "@/components";
import {
  JsonLd,
  personSchema,
  websiteSchema,
  profilePageSchema,
} from "@/lib/schema";
import {
  hero,
  about,
  selectedWork,
  experience,
  openSource,
  contact,
} from "@/lib/content";

const mainStyle = {
  maxInlineSize: "var(--measure-layout)",
  marginInline: "auto",
  paddingInline: "var(--space-5)",
} as const;

export default function HomePage() {
  return (
    <main id="main-content" tabIndex={-1} style={mainStyle}>
      {/* Structured data: rendered server-side so crawlers and agents get it
          without executing any JavaScript. */}
      <JsonLd data={personSchema()} />
      <JsonLd data={websiteSchema()} />
      <JsonLd data={profilePageSchema()} />
      <Hero
        name={hero.name}
        headline={hero.headline}
        meta={hero.tagline}
        links={[
          { href: contact.profiles.github, label: "GitHub", external: true },
          {
            href: contact.profiles.linkedin,
            label: "LinkedIn",
            external: true,
          },
        ]}
      />

      <Section id="about" heading="About">
        <Prose>
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </Prose>
      </Section>

      <Section id="work" heading="Selected Work">
        {selectedWork.map((item) => {
          const href = item.hasCaseStudy
            ? `/work/${item.slug}`
            : item.href;
          const external = Boolean(item.href && !item.hasCaseStudy);

          return (
            <WorkItem
              key={item.slug}
              title={item.title}
              href={href}
              external={external}
              outcome={item.oneLine}
              meta={`${item.role} · ${item.meta}`}
              stack={item.stack.join(" · ")}
            />
          );
        })}
      </Section>

      <Section id="experience" heading="Experience">
        <ExperienceList
          items={experience.map((item) => ({
            company: item.company,
            summary: item.what,
            role: item.role,
          }))}
        />
      </Section>

      <Section id="open-source" heading="Open Source">
        {openSource.map((project) => (
          <WorkItem
            key={project.href}
            title={project.name}
            href={project.href}
            external
            outcome={project.description}
            meta={project.stack.join(" · ")}
          />
        ))}
      </Section>

      <Footer
        id="contact"
        heading="Contact"
        email={{
          href: `mailto:${contact.email}`,
          label: contact.email,
        }}
        profiles={[
          { href: contact.profiles.github, label: "GitHub", external: true },
          {
            href: contact.profiles.linkedin,
            label: "LinkedIn",
            external: true,
          },
          { href: contact.profiles.x, label: "X", external: true },
          {
            href: contact.profiles.instagram,
            label: "Instagram",
            external: true,
          },
        ]}
      />
    </main>
  );
}
