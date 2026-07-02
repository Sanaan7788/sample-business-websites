import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// Indexable routes (docs/SEO_STRATEGY.md §2). /admin + /api are excluded.
const routes = [
  "",
  "/programs",
  "/schedule",
  "/pricing",
  "/coaches",
  "/about",
  "/contact",
  "/faq",
  "/trial",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : path === "/trial" ? 0.9 : 0.7,
  }));
}
