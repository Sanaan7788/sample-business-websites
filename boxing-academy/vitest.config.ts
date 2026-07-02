import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// Unit / integration / component tests (docs/TESTING_PLAN.md).
// E2E lives in Playwright (tests/e2e) and is excluded here.
export default defineConfig({
  plugins: [react()],
  resolve: { tsconfigPaths: true },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    include: ["tests/unit/**/*.test.{ts,tsx}", "tests/integration/**/*.test.ts"],
    exclude: ["tests/e2e/**", "node_modules/**"],
  },
});
