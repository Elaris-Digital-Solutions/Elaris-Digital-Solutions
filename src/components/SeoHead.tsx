import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { getSeoMetadata, SITE_URL, type SeoPage } from "@/seo/seo-config";

interface SeoHeadProps {
  page?: SeoPage;
  /** Used only for service pages (noindex). Overrides config title. */
  title?: string;
  /** Used only for service pages (noindex). Overrides config description. */
  description?: string;
}

const SeoHead = ({ page, title, description }: SeoHeadProps) => {
  const location = useLocation();

  const metadata = useMemo(() => {
    const basePage: SeoPage = page ?? "home";
    const base = getSeoMetadata({
      pathname: location.pathname,
      page: basePage,
      language: "es",
    });

    if (title && description) {
      const canonicalPath = location.pathname || "/";
      const canonical = `${SITE_URL}${canonicalPath === "/" ? "/" : canonicalPath}`;

      return {
        ...base,
        title,
        description,
        canonical,
        alternates: [
          { href: canonical, hrefLang: "es" },
          { href: canonical, hrefLang: "x-default" },
        ],
        robots: "noindex,follow",
        structuredData: [],
      };
    }

    return base;
  }, [location.pathname, page, title, description]);

  return (
    <Helmet prioritizeSeoTags>
      <html lang={metadata.lang} />
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <meta name="robots" content={metadata.robots} />
      <link rel="canonical" href={metadata.canonical} />
      {metadata.alternates.map(({ href, hrefLang }) => (
        <link key={hrefLang} rel="alternate" hrefLang={hrefLang} href={href} />
      ))}

      {/* Open Graph */}
      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={metadata.canonical} />
      <meta property="og:image" content={metadata.ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Logotipo de Elaris Digital Solutions" />
      <meta property="og:locale" content={metadata.locale} />
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
