import type { MetadataRoute } from "next";
import { SITE_URL, SERVICE_PATHS } from "@/seo/site";

// Home + las 8 páginas de servicio. El resto (landing de pauta, apoyo,
// redirect y legales) es noindex y no entra al sitemap.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...SERVICE_PATHS.map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
