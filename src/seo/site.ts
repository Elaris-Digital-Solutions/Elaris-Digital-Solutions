import type { Metadata } from "next";
import es from "@/locales/es.json";

export const SITE_URL = "https://elarisdigitalsolutions.com";
export const OG_IMAGE = `${SITE_URL}/assets/Elaris-OG.png`;
/** El `logo` de Organization debe ser el logotipo en sí, no el lienzo 1200×630 del OG. */
export const LOGO_IMAGE = `${SITE_URL}/assets/ElarisLockup.webp`;
export const LOCALE = "es_PE";

export const HOME_TITLE =
  "Software a medida para vender más y operar mejor | Elaris Digital Solutions";
export const HOME_DESCRIPTION =
  "Automatizamos procesos, modernizamos sistemas y construimos plataformas de venta para empresas en Perú y LATAM. El código es 100% tuyo. Diagnóstico inicial sin compromiso, con respuesta en menos de 12 horas.";

/** Las 8 páginas de servicio indexables. Fuente única para sitemap y enlazado. */
export const SERVICE_PATHS = [
  "/desarrollo-web",
  "/e-commerce",
  "/posicionamiento-seo",
  "/desarrollo-mvp",
  "/desarrollo-software-medida",
  "/inteligencia-artificial",
  "/implementacion-cmms",
  "/transformacion-digital",
] as const;

const PHONE = "+51-973-663-807";
const EMAIL = "contact@elarisdigitalsolutions.com";

const stripQuotes = (value: string) => value.replace(/[“”"]/g, "").trim();

/** Organization + LocalBusiness signals, enriched with real client reviews. */
export const buildOrganizationSchema = () => {
  const testimonials = es.testimonials.items;
  const reviews = Object.values(testimonials).map((item) => ({
    "@type": "Review",
    reviewBody: stripQuotes(item.quote),
    author: { "@type": "Person", name: item.name },
  }));

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Elaris Digital Solutions",
    legalName: "ELARIS S.A.C.S",
    taxID: "20615598071",
    foundingDate: "2026-03-09",
    url: SITE_URL,
    logo: LOGO_IMAGE,
    image: OG_IMAGE,
    description: HOME_DESCRIPTION,
    slogan: es.hero.title,
    knowsAbout: [
      "Desarrollo de software a medida",
      "Automatización de procesos con inteligencia artificial",
      "Integración de IA y modelos de lenguaje (LLMs)",
      "Implementación de CMMS (gestión de mantenimiento)",
      "Desarrollo de e-commerce y plataformas de venta",
      "Arquitectura cloud y modernización de sistemas heredados",
      "Integración de sistemas empresariales (ERP, SAP, CRM)",
    ],
    areaServed: [
      { "@type": "Country", name: "Perú" },
      { "@type": "Place", name: "Latinoamérica" },
    ],
    foundingLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lima",
        addressRegion: "Lima",
        addressCountry: "PE",
      },
    },
    identifier: {
      "@type": "PropertyValue",
      propertyID: "RUC",
      value: "20615598071",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jr. Jerónimo de Aliaga 595",
      addressLocality: "Santiago de Surco",
      addressRegion: "Lima",
      postalCode: "15037",
      addressCountry: "PE",
    },
    sameAs: [
      "https://www.linkedin.com/company/elaris-digital-solutions/",
      "https://www.instagram.com/elarisdigitalsolutions",
      "https://github.com/Elaris-Digital-Solutions",
      "https://x.com/ElarisSolutions",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: EMAIL,
        telephone: PHONE,
        contactType: "sales",
        areaServed: "PE",
        availableLanguage: ["Spanish"],
      },
    ],
    review: reviews,
  };
};

export const buildWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Elaris Digital Solutions",
  url: SITE_URL,
  inLanguage: "es-PE",
  // Build-time timestamp — refreshes on every deploy, signaling content
  // freshness to generative/search engines (GEO).
  dateModified: new Date().toISOString(),
  publisher: { "@type": "Organization", name: "Elaris Digital Solutions" },
});

/** Los 8 servicios reales, cada uno apuntando a su propia página indexable. */
export const buildServiceSchema = () => {
  const items = es.services.items as Record<
    string,
    { title: string; benefit: string; href: string }
  >;
  const orderedKeys = es.services.groups.flatMap((group) => group.keys);

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Servicios de Elaris Digital Solutions",
    itemListElement: orderedKeys.map((key, index) => {
      const service = items[key];
      return {
        "@type": "Service",
        position: index + 1,
        name: service.title,
        description: service.benefit,
        provider: { "@type": "Organization", name: "Elaris Digital Solutions" },
        areaServed: "PE",
        url: `${SITE_URL}${service.href}`,
      };
    }),
  };
};

/** Portfolio projects as CreativeWork — gives agents concrete proof of work. */
export const buildPortfolioSchema = () => {
  const projects = es.portfolio.projects;
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Portafolio de proyectos de Elaris Digital Solutions",
    itemListElement: Object.values(projects).map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: project.title,
        description: project.description,
        about: project.category,
        creator: { "@type": "Organization", name: "Elaris Digital Solutions" },
      },
    })),
  };
};

/**
 * Metadata builder for secondary pages.
 *
 * Las 8 páginas de servicio SÍ se indexan (`{ index: true }`): son las únicas
 * con intención de búsqueda comercial. Todo lo demás — landing de pauta
 * (/impulsa-tu-negocio), página de apoyo (/apis-personalizadas), redirect
 * (/meet) y legales — sigue noindex,follow: los crawlers leen el contexto sin
 * que la página compita en resultados.
 */
export const campaignMetadata = (
  title: string,
  description: string,
  path: string,
  options?: { index?: boolean }
): Metadata => {
  const url = `${SITE_URL}${path}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    robots: options?.index ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: {
      type: "website",
      url,
      siteName: "Elaris Digital Solutions",
      locale: LOCALE,
      title,
      description,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Elaris Digital Solutions" }],
    },
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE] },
  };
};

/** FAQPage schema for the service landing pages (content is visible on-page). */
export const buildFaqSchema = (items: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
});
