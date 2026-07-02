import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// Accessibility checks (docs/TESTING_PLAN.md §5, WCAG 2.1 AA). Fails on any
// serious/critical violation on key pages.
const pages = [
  { name: "home", path: "/" },
  { name: "programs", path: "/programs" },
  { name: "schedule", path: "/schedule" },
  { name: "pricing", path: "/pricing" },
  { name: "trial", path: "/trial" },
  { name: "contact", path: "/contact" },
  { name: "faq", path: "/faq" },
];

for (const { name, path } of pages) {
  test(`${name} page has no serious/critical a11y violations`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    const serious = results.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical",
    );
    expect(
      serious,
      JSON.stringify(
        serious.map((v) => ({ id: v.id, nodes: v.nodes.length })),
        null,
        2,
      ),
    ).toEqual([]);
  });
}
