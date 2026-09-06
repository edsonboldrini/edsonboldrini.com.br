import { ExternalLink } from "./ExternalLink";

export interface WorkItemProps {
  title: string;
  /** Optional deep-dive or external URL. */
  href?: string;
  /** When true and href is set, use ExternalLink. */
  external?: boolean;
  outcome: string;
  /** Mono meta line: role · year · domain (page supplies the string). */
  meta: string;
  /** Stack as muted mono text — never badges. */
  stack?: string;
}

export function WorkItem({
  title,
  href,
  external = false,
  outcome,
  meta,
  stack,
}: WorkItemProps) {
  const titleNode = href ? (
    external ? (
      <ExternalLink href={href} className="work-item-title">
        {title}
      </ExternalLink>
    ) : (
      <a href={href} className="work-item-title">
        {title}
      </a>
    )
  ) : (
    <span className="work-item-title">{title}</span>
  );

  return (
    <article
      className="work-item"
      // Spacing and the separator live in styles/components.css: the rule
      // between items has to be `.work-item + .work-item`, and an inline
      // style here would win over it.
    >
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--text-lg)",
          fontWeight: 600,
          lineHeight: 1.2,
          letterSpacing: "-0.02em",
          margin: 0,
          color: "var(--ink)",
        }}
      >
        {titleNode}
      </h3>
      <p
        style={{
          marginBlockStart: "var(--space-2, 0.5rem)",
          marginBlockEnd: 0,
          color: "var(--ink)",
          maxInlineSize: "42rem",
        }}
      >
        {outcome}
      </p>
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-sm)",
          color: "var(--muted)",
          marginBlockStart: "var(--space-2, 0.5rem)",
          marginBlockEnd: 0,
        }}
      >
        {meta}
      </p>
      {stack ? (
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-xs)",
            color: "var(--muted)",
            marginBlockStart: "var(--space-1, 0.25rem)",
            marginBlockEnd: 0,
          }}
        >
          {stack}
        </p>
      ) : null}
    </article>
  );
}
