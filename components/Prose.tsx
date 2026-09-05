import type { ReactNode } from "react";

export interface ProseProps {
  children: ReactNode;
  as?: "div" | "article";
  className?: string;
}

/** Reading measure ~42rem (≈65–72ch at body size). */
export function Prose({ children, as: Tag = "div", className }: ProseProps) {
  return (
    <Tag
      className={className}
      style={{
        maxInlineSize: "42rem",
        color: "var(--ink)",
        fontSize: "var(--text-base)",
        lineHeight: 1.65,
      }}
    >
      {children}
    </Tag>
  );
}
