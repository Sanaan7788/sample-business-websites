import { test, expect } from "@playwright/test";

// Navigation + read-only pages render seeded content (docs/TESTING_PLAN.md §4).
test.describe("Navigation & pages", () => {
  test("primary nav links resolve", async ({ page }) => {
    await page.goto("/");
    for (const [name, path] of [
      ["Programs", "/programs"],
      ["Schedule", "/schedule"],
      ["Pricing", "/pricing"],
      ["Coaches", "/coaches"],
      ["Contact", "/contact"],
    ] as const) {
      await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name }).click();
      await expect(page).toHaveURL(new RegExp(`${path}$`));
    }
  });

  test("programs page shows seeded programs", async ({ page }) => {
    await page.goto("/programs");
    await expect(page.getByText("Group Boxing Classes")).toBeVisible();
    await expect(page.getByText("Personal Training")).toBeVisible();
  });

  test("pricing page shows tiers", async ({ page }) => {
    await page.goto("/pricing");
    await expect(page.getByText("Unlimited Monthly")).toBeVisible();
    await expect(page.getByText(/most popular/i)).toBeVisible();
  });

  test("FAQ accordion expands an answer", async ({ page }) => {
    await page.goto("/faq");
    const item = page.getByText(/never boxed before/i);
    await item.click();
    await expect(page.getByText(/beginner-friendly/i)).toBeVisible();
  });
});
