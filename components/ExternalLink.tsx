import type { CSSProperties, ReactNode } from "react";

export interface ExternalLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/**
 * External anchor: always opens in a new browsing context with
 * rel="noopener noreferrer" and a visually-hidden external hint.
 */
export function ExternalLink({
  href,
  children,
  className,
  style,
}: ExternalLinkProps) {
  return (
    <a
      href={href}
      className={className}
      style={style}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <span className="ext-link-hint"> (opens in a new tab)</span>
    </a>
  );
}
