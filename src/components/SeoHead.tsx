import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import {
  getHomeSeoMetadata,
  getNotFoundSeoMetadata,
  getServicePageSeoMetadata,
  type SeoPage,
} from "@/seo/seo-config";

interface SeoHeadProps {
  page?: SeoPage;
  /** Used only for service pages (noindex). Overrides config title. */
  title?: string;
  /** Used only for service pages (noindex). Overrides config description. */
  description?: string;
}

const SeoHead = ({ page, title, description }: SeoHeadProps) => {
  const metadata = useMemo(() => {
    if (page === "not-found") {
      return getNotFoundSeoMetadata();
    }
    if (title && description) {
      return getServicePageSeoMetadata(title, description);
    }
    return getHomeSeoMetadata();
  }, [page, title, description]);

  return (
    <Helmet prioritizeSeoTags>
      <html lang="es" />
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <meta name="robots" content={metadata.robots} />
      <link rel="canonical" href={metadata.canonical} />

      {/* Open Graph */}
      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={metadata.canonical} />
      <meta property="og:image" content={metadata.ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Logotipo de Elaris Digital Solutions" />
      <meta property="og:locale" content="es_ES" />
      <meta property="og:site_name" content="Elaris Digital Solutions" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@ElarisSolutions" />
      <meta name="twitter:creator" content="@ElarisSolutions" />
      <meta name="twitter:title" content={metadata.title} />
      <meta name="twitter:description" content={metadata.description} />
      <meta name="twitter:image" content={metadata.ogImage} />
      <meta name="twitter:image:alt" content="Logotipo de Elaris Digital Solutions" />

      {/* Structured Data */}
      {metadata.structuredData.map((schema, index) => (
        <script
          key={`schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </Helmet>
  );
};

export default SeoHead;
