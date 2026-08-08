import type { MetadataRoute } from "next";
import { SITE_URL, SERVICE_PATHS } from "@/seo/site";
import { CASE_STUDIES } from "@/content/casos";
import { TEAM_PROFILES } from "@/content/equipo";
import { ARTICLES } from "@/content/recursos";

/**
 * Home + las 8 páginas de servicio + los hubs de contenido publicados.
 *
 * Cada hub entra solo si su registro tiene contenido: así una fase puede
 * desplegarse sin que el sitemap anuncie URLs que todavía no existen.
 * Quedan fuera por diseño la landing de pauta, la página de apoyo, el
 * redirect de agenda y las legales (todas noindex).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...SERVICE_PATHS.map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];

  if (CASE_STUDIES.length > 0) {
    entries.push({
      url: `${SITE_URL}/casos`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
    entries.push(
      ...CASE_STUDIES.map((study) => ({
        url: `${SITE_URL}/casos/${study.slug}`,
        lastModified: new Date(study.publishDate),
        changeFrequency: "yearly" as const,
        priority: 0.7,
      }))
    );
  }

  if (TEAM_PROFILES.length > 0) {
    entries.push({
      url: `${SITE_URL}/equipo`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    });
    entries.push(
      ...TEAM_PROFILES.map((profile) => ({
        url: `${SITE_URL}/equipo/${profile.slug}`,
        lastModified: now,
        changeFrequency: "yearly" as const,
        priority: 0.5,
      }))
    );
  }

  if (ARTICLES.length > 0) {
    entries.push({
      url: `${SITE_URL}/recursos`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    });
    entries.push(
      ...ARTICLES.map((article) => ({
        url: `${SITE_URL}/recursos/${article.slug}`,
        lastModified: new Date(article.modifiedDate),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }))
    );
  }

  return entries;
}
