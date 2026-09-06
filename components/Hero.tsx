import type { CSSProperties } from "react";
import { ExternalLink } from "./ExternalLink";

export interface HeroLink {
  href: string;
  label: string;
  /** When true, render as ExternalLink (new tab + accessible hint). */
  external?: boolean;
}

export interface HeroPhoto {
  src: string;
  /** Rendered size in CSS pixels; the file itself is 2x for retina. */
  size: number;
  alt: string;
}

export interface HeroProps {
  name: string;
  headline: string;
  meta: string;
  links: HeroLink[];
  photo?: HeroPhoto;
}

const linkStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  minBlockSize: 24,
  minInlineSize: 24,
  fontSize: "var(--text-sm)",
  fontWeight: 600,
  color: "var(--accent)",
  textDecorationThickness: "1px",
  textUnderlineOffset: "0.2em",
};

export function Hero({ name, headline, meta, links, photo }: HeroProps) {
  return (
    <header
      style={{
        paddingBlock: "var(--space-10, 8rem) var(--space-9, 6rem)",
      }}
    >
      {photo ? (
        // A plain <img>, not next/image: the file is already served at exactly
        // 2x its display size, so the optimiser would add a runtime dependency
        // (sharp) for nothing. width/height are explicit so it reserves its
        // box and cannot shift the layout — this sits next to the LCP text.
        <img
          src={photo.src}
          alt={photo.alt}
          width={photo.size}
          height={photo.size}
          decoding="async"
          // No fetchPriority="high": the portrait is not the LCP element, and
          // promoting it made it compete with the font the LCP text needs.
          // It is 15KB and arrives well before first paint on its own.
          style={{
            inlineSize: photo.size,
            blockSize: photo.size,
            borderRadius: "50%",
            objectFit: "cover",
            display: "block",
            marginBlockEnd: "var(--space-6, 2rem)",
            border: "1px solid var(--line)",
          }}
        />
      ) : null}

      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--text-3xl)",
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          color: "var(--ink)",
          margin: 0,
        }}
      >
        {name}
      </h1>
      <p
        style={{
          fontSize: "var(--text-lg)",
          lineHeight: 1.4,
          color: "var(--ink)",
          marginBlockStart: "var(--space-4, 1rem)",
          marginBlockEnd: 0,
          maxInlineSize: "42rem",
        }}
      >
        {headline}
      </p>
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-sm)",
          color: "var(--muted)",
          marginBlockStart: "var(--space-3, 0.75rem)",
          marginBlockEnd: 0,
        }}
      >
        {meta}
      </p>
      {links.length > 0 ? (
        <nav
          aria-label="Primary"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "var(--space-5, 1.5rem)",
            marginBlockStart: "var(--space-6, 2rem)",
          }}
        >
          {links.map((link) =>
            link.external ? (
              <ExternalLink key={link.href} href={link.href} style={linkStyle}>
                {link.label}
              </ExternalLink>
            ) : (
              <a key={link.href} href={link.href} style={linkStyle}>
                {link.label}
              </a>
            ),
          )}
        </nav>
      ) : null}
    </header>
  );
}
