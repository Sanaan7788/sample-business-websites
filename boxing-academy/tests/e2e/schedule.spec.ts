import { test, expect } from "@playwright/test";

// Schedule filtering (FR-13, docs/TESTING_PLAN.md §4).
test.describe("Schedule", () => {
  test("renders the weekly schedule with class times", async ({ page }) => {
    await page.goto("/schedule");
    await expect(page.getByRole("heading", { name: /when we train/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Monday" })).toBeVisible();
    await expect(page.getByText(/07:30/).first()).toBeVisible();
  });

  test("filtering by a single day narrows the results", async ({ page }) => {
    await page.goto("/schedule");
    // Before filtering, multiple day headings are present.
    await expect(page.getByRole("heading", { name: "Tuesday" })).toBeVisible();

    await page.getByLabel("Day").selectOption("MON");

    // After filtering to Monday, its heading remains and others disappear.
    await expect(page.getByRole("heading", { name: "Monday" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Tuesday" })).toHaveCount(0);
  });
});
