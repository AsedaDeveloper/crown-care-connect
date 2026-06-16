import { writeFileSync } from "fs";
import { resolve } from "path";

const BASE_URL = "https://crowncare.lovable.app";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const entries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/hair-types", changefreq: "weekly", priority: "0.9" },
  { path: "/hair-types/type-3a", changefreq: "monthly", priority: "0.8" },
  { path: "/hair-types/type-3b", changefreq: "monthly", priority: "0.8" },
  { path: "/hair-types/type-3c", changefreq: "monthly", priority: "0.8" },
  { path: "/hair-types/type-4a", changefreq: "monthly", priority: "0.8" },
  { path: "/hair-types/type-4b", changefreq: "monthly", priority: "0.8" },
  { path: "/hair-types/type-4c", changefreq: "monthly", priority: "0.8" },
  { path: "/experts", changefreq: "weekly", priority: "0.8" },
  { path: "/tips", changefreq: "weekly", priority: "0.8" },
  { path: "/quiz", changefreq: "weekly", priority: "0.9" },
  { path: "/routine", changefreq: "weekly", priority: "0.9" },
  { path: "/videos", changefreq: "weekly", priority: "0.8" },
  { path: "/blog", changefreq: "weekly", priority: "0.8" },
  { path: "/blog/moisture-vs-protein-balance", changefreq: "monthly", priority: "0.6" },
  { path: "/blog/low-porosity-survival-guide", changefreq: "monthly", priority: "0.6" },
  { path: "/blog/edges-recovery-plan-30-days", changefreq: "monthly", priority: "0.6" },
  { path: "/blog/wash-day-under-90-minutes", changefreq: "monthly", priority: "0.6" },
  { path: "/blog/best-protective-styles-by-season", changefreq: "monthly", priority: "0.6" },
  { path: "/blog/what-a-trichologist-actually-does", changefreq: "monthly", priority: "0.6" },
  { path: "/products", changefreq: "weekly", priority: "0.7" },
  { path: "/gallery", changefreq: "weekly", priority: "0.6" },
  { path: "/testimonials", changefreq: "monthly", priority: "0.6" },
  { path: "/game", changefreq: "weekly", priority: "0.5" },
];

function generateSitemap(entries: SitemapEntry[]) {
  const urls = entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n"),
  );

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
  ].join("\n");
}

writeFileSync(resolve("public/sitemap.xml"), generateSitemap(entries));
console.log(`sitemap.xml written (${entries.length} entries)`);
