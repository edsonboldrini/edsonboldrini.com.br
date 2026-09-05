export interface ExperienceItem {
  company: string;
  /** What the company / product does. */
  summary: string;
  role: string;
}

export interface ExperienceListProps {
  items: ExperienceItem[];
}

export function ExperienceList({ items }: ExperienceListProps) {
  return (
    <ul
      style={{
        listStyle: "none",
        margin: 0,
        padding: 0,
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-6, 2rem)",
      }}
    >
      {items.map((item) => (
        <li key={`${item.company}-${item.role}`}>
          <p
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
            {item.company}
          </p>
          <p
            style={{
              marginBlockStart: "var(--space-1, 0.25rem)",
              marginBlockEnd: 0,
              color: "var(--ink)",
              maxInlineSize: "42rem",
            }}
          >
            {item.summary}
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
            {item.role}
          </p>
        </li>
      ))}
    </ul>
  );
}
