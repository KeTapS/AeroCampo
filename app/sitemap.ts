import type { MetadataRoute } from "next";

// Only indexable URLs belong in the sitemap. The legal pages are noindex
// while they still hold placeholder data — add them here once that's lifted.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://aerocampo.es";
  const now = new Date();
  return [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
