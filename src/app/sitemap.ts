import type { MetadataRoute } from "next";
import { SITE_URL } from "@/seo/site";

// Only the homepage is indexed; campaign/service/legal pages are noindex,follow.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
