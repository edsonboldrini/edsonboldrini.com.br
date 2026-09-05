export interface SkipLinkProps {
  /** Target id selector, e.g. "#main-content". */
  href?: string;
  label?: string;
}

export function SkipLink({
  href = "#main-content",
  label = "Skip to content",
}: SkipLinkProps) {
  return (
    <a className="skip-link" href={href}>
      {label}
    </a>
  );
}
