import { test, expect } from "@playwright/test";

// Critical conversion flow (docs/TESTING_PLAN.md §4). The /api/leads call is
// intercepted so the E2E test is deterministic and writes nothing to the DB.
test.describe("Book a free trial", () => {
  test("happy path: trial page → fill form → success", async ({ page }) => {
    await page.route("**/api/leads", async (route) => {
      await route.fulfill({
        status: 201,
        contentType: "application/json",
        body: JSON.stringify({ data: { id: "e2e-test" } }),
      });
    });

    await page.goto("/trial");
    await expect(page.getByRole("heading", { name: /book your free trial/i })).toBeVisible();

    await page.getByLabel(/name/i).fill("E2E Tester");
    await page.getByLabel(/email/i).fill("e2e@example.com");
    await page.getByLabel(/phone/i).fill("832-555-0123");
    await page.getByRole("button", { name: /book my free trial/i }).click();

    await expect(page.getByText(/you're in/i)).toBeVisible();
  });

  test("shows validation errors on empty submit", async ({ page }) => {
    await page.goto("/trial");
    await page.getByRole("button", { name: /book my free trial/i }).click();
    await expect(page.getByText(/please enter your name/i)).toBeVisible();
  });

  test("header CTA navigates to the trial page", async ({ page }) => {
    await page.goto("/");
    await page
      .getByRole("link", { name: /book free trial/i })
      .first()
      .click();
    await expect(page).toHaveURL(/\/trial$/);
  });
});
