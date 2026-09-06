import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const component = readFileSync("components/WorkItem.tsx", "utf8");
const css = readFileSync("styles/components.css", "utf8");

/**
 * The separator between work items used to be an inline border-block-end on
 * every item, so the last one in a section left a rule hanging with nothing
 * under it — it read as a missing entry, which is exactly how Edson found it.
 *
 * Separators must therefore go BETWEEN items, never after the last one. That
 * is asserted against the stylesheet rather than the component: an inline
 * style cannot be overridden by a :last-child rule, so keeping the rule in
 * CSS is the fix, and putting the border back inline would silently undo it.
 */
describe("work item separators", () => {
  it("does not put a trailing border on every item inline", () => {
    expect(component).not.toMatch(/borderBlockEnd/);
  });

  it("draws the separator between adjacent items only", () => {
    const rule = css.match(/\.work-item\s*\+\s*\.work-item\s*\{[^}]*\}/);
    expect(rule, "expected a `.work-item + .work-item` rule").not.toBeNull();
    expect(rule?.[0]).toMatch(/border-block-start/);
  });

  it("never re-adds a bottom border to .work-item", () => {
    const base = css.match(/\.work-item\s*\{[^}]*\}/);
    if (base) expect(base[0]).not.toMatch(/border-block-end/);
  });

  it("declares the separator rule exactly once", () => {
    const hits = css.match(/\.work-item\s*\+\s*\.work-item\s*\{/g) ?? [];
    expect(hits).toHaveLength(1);
  });

  // The accent colour and underline belong to hover/focus only. A careless
  // edit once flattened this selector, which left every title permanently
  // underlined in the accent colour.
  it("keeps the accent on the title behind hover and focus", () => {
    expect(css).toMatch(/\.work-item:focus-within\s+\.work-item-title\s*\{/);
    const base = css.match(/\n\.work-item-title\s*\{[^}]*\}/);
    expect(base, "expected a base .work-item-title rule").not.toBeNull();
    expect(base?.[0]).not.toMatch(/color:\s*var\(--accent\)/);
    expect(base?.[0]).toMatch(/text-decoration-color:\s*transparent/);
  });
});
