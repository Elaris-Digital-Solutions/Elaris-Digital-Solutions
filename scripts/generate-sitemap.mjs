import { writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const SITE_URL = "https://elarisdigitalsolutions.com";
const now = new Date().toISOString();

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;

const targets = [path.resolve("public", "sitemap.xml")];
if (existsSync(path.resolve("dist"))) {
  targets.push(path.resolve("dist", "sitemap.xml"));
}

const persist = async () => {
  await Promise.all(
    targets.map(async (target) => {
      await mkdir(path.dirname(target), { recursive: true });
      await writeFile(target, sitemap, "utf8");
    })
  );
  console.log(`Sitemap generated at: ${targets.join(", ")}`);
};

persist().catch((error) => {
  console.error("Failed to generate sitemap", error);
  process.exitCode = 1;
});
