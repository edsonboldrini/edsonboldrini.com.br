import type { ReactNode } from "react";

export interface SectionProps {
  id?: string;
  heading?: string;
  /** Heading level; default 2 so pages keep a single h1 in Hero. */
  headingLevel?: 2 | 3;
  children: ReactNode;
  className?: string;
}

export function Section({
  id,
  heading,
  headingLevel = 2,
  children,
  className,
}: SectionProps) {
  const HeadingTag = headingLevel === 3 ? "h3" : "h2";

  return (
    <section
      id={id}
      // Spacing lives in styles/components.css so the last section before the
      // footer can tighten its bottom gap — an inline style would win over it.
      className={["section", className].filter(Boolean).join(" ")}
      aria-labelledby={heading && id ? `${id}-heading` : undefined}
    >
      {heading ? (
        <HeadingTag
          id={id ? `${id}-heading` : undefined}
          style={{
            fontSize: "var(--text-xl)",
            marginBlockEnd: "var(--space-6, 2rem)",
            color: "var(--ink)",
          }}
        >
          {heading}
        </HeadingTag>
      ) : null}
      {children}
    </section>
  );
}
