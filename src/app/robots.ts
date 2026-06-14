import type { MetadataRoute } from "next";
import { SITE_URL } from "@/seo/site";

// Crawlers are allowed everywhere so they can READ the noindex meta tag on the
// campaign/service pages (blocking via robots would prevent that). Only the
// homepage is listed in the sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
