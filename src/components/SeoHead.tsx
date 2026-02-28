import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { useI18n } from "@/lib/i18n";
import { getSeoMetadata, SITE_URL, type SeoPage } from "@/seo/seo-config";

interface SeoHeadProps {
  page?: SeoPage;
  title?: string;
  description?: string;
}

const SeoHead = ({ page, title, description }: SeoHeadProps) => {
  const location = useLocation();
  const { language } = useI18n();

  const metadata = useMemo(() => {
    // If explicit title/description are provided, build metadata dynamically
    if (title && description) {
      const canonical = `${SITE_URL}${location.pathname}`;
      const englishHref = `${SITE_URL}${location.pathname.replace(/^\/es/, '/en')}`;
      const spanishHref = `${SITE_URL}${location.pathname.replace(/^\/en/, '/es')}`;
      const lang = location.pathname.startsWith("/en") ? "en" : "es";

      return {
        title,
        description,
        canonical,
        lang,
        robots: "index,follow,max-image-preview:large",
        ogImage: `${SITE_URL}/assets/Elaris-Logo.webp`,
        alternates: [
          { href: englishHref, hrefLang: "en" },
          { href: spanishHref, hrefLang: "es" },
          { href: englishHref, hrefLang: "x-default" },
        ],
        locale: lang === "es" ? "es_ES" : "en_US",
        structuredData: []
      };
    }

    // Otherwise fallback to existing logic for "home" or "not-found"
    return getSeoMetadata({ pathname: location.pathname, page: page || "home", language });
  }, [language, location.pathname, page, title, description]);

  return (
    <Helmet prioritizeSeoTags>
      <html lang={metadata.lang} />
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <meta name="robots" content={metadata.robots} />
      <link rel="canonical" href={metadata.canonical} />
      {metadata.alternates.map((alternate) => (
        <link
          key={`${alternate.hrefLang}-${alternate.href}`}
          rel="alternate"
          href={alternate.href}
          hrefLang={alternate.hrefLang}
        />
      ))}
      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      <meta property="og:type" content={page === "home" ? "website" : "article"} />
      <meta property="og:url" content={metadata.canonical} />
      <meta property="og:image" content={metadata.ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Elaris Digital Solutions wordmark" />
      <meta property="og:locale" content={metadata.locale} />
      <meta property="og:site_name" content="Elaris Digital Solutions" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metadata.title} />
      <meta name="twitter:description" content={metadata.description} />
      <meta name="twitter:image" content={metadata.ogImage} />
      <meta name="twitter:image:alt" content="Elaris Digital Solutions wordmark" />
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
