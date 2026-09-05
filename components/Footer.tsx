import type { CSSProperties } from "react";
import { ExternalLink } from "./ExternalLink";

export interface FooterLink {
  href: string;
  label: string;
  external?: boolean;
}

export interface FooterProps {
  id?: string;
  heading?: string;
  email?: FooterLink;
  profiles: FooterLink[];
  note?: string;
}

const linkStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  minBlockSize: 24,
  minInlineSize: 24,
  color: "var(--accent)",
  fontSize: "var(--text-sm)",
  fontWeight: 600,
  textDecorationThickness: "1px",
  textUnderlineOffset: "0.2em",
};

export function Footer({
  id,
  heading,
  email,
  profiles,
  note,
}: FooterProps) {
  const headingId = id && heading ? `${id}-heading` : undefined;

  return (
    <footer
      id={id}
      aria-labelledby={headingId}
      style={{
        paddingBlock: "var(--space-9) var(--space-8)",
        borderBlockStart: "1px solid var(--line)",
      }}
    >
      {heading ? (
        <h2
          id={headingId}
          style={{
            fontSize: "var(--text-xl)",
            marginBlockEnd: "var(--space-6)",
            color: "var(--ink)",
          }}
        >
          {heading}
        </h2>
      ) : null}
      <nav
        aria-label="Contact"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "var(--space-5)",
        }}
      >
        {email ? (
          <a href={email.href} style={linkStyle}>
            {email.label}
          </a>
        ) : null}
        {profiles.map((profile) =>
          profile.external !== false ? (
            <ExternalLink
              key={profile.href}
              href={profile.href}
              style={linkStyle}
            >
              {profile.label}
            </ExternalLink>
          ) : (
            <a key={profile.href} href={profile.href} style={linkStyle}>
              {profile.label}
            </a>
          ),
        )}
      </nav>
      {note ? (
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-xs)",
            color: "var(--muted)",
            marginBlockStart: "var(--space-5)",
            marginBlockEnd: 0,
          }}
        >
          {note}
        </p>
      ) : null}
    </footer>
  );
}
