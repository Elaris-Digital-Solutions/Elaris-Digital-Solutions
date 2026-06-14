import type { Metadata } from "next";
import es from "@/locales/es.json";

export const SITE_URL = "https://elarisdigitalsolutions.com";
export const OG_IMAGE = `${SITE_URL}/assets/Elaris-Logo.webp`;
export const LOCALE = "es_PE";

export const HOME_TITLE = "Tecnología para impulsar negocios | Elaris Digital Solutions";
export const HOME_DESCRIPTION =
  "¿Tu negocio depende de procesos manuales lentos? En Elaris Digital Solutions eliminamos el caos operativo con tecnología fácil de usar. Empieza a escalar tu operación ahora mismo.";

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
    logo: OG_IMAGE,
    image: OG_IMAGE,
    description: HOME_DESCRIPTION,
    identifier: {
      "@type": "PropertyValue",
      propertyID: "RUC",
      value: "20615598071",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "JR. TACNA NRO. 207 DPTO. 801 CND. SURCO VIEJO",
      addressLocality: "Lima",
      addressRegion: "Lima",
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
  publisher: { "@type": "Organization", name: "Elaris Digital Solutions" },
});

const prioritizedServices = [
  {
    name: "Arquitectura y Modernización Tecnológica",
    description:
      "Modernización de sistemas, arquitecturas cloud robustas y optimización de costos de TI para operaciones industriales y de manufactura.",
  },
  {
    name: "Automatización Inteligente de Procesos",
    description:
      "IA aplicada a flujos de trabajo, gestión documental inteligente e integración con ERP, SAP y CRM para empresas B2B de servicios.",
  },
  {
    name: "Optimización Digital para Crecimiento",
    description:
      "E-commerce a medida, integración de pasarelas de pago y arquitectura SEO-first para marcas premium que venden online.",
  },
  {
    name: "Integración de IA y LLMs",
    description:
      "Implementación de modelos de lenguaje, RAG con datos propios y automatización cognitiva en flujos críticos del negocio.",
  },
];

export const buildServiceSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Servicios de Elaris Digital Solutions",
  itemListElement: prioritizedServices.map((service, index) => ({
    "@type": "Service",
    position: index + 1,
    name: service.name,
    description: service.description,
    provider: { "@type": "Organization", name: "Elaris Digital Solutions" },
    areaServed: "PE",
    url: SITE_URL,
  })),
});

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
 * Metadata builder for non-indexable pages (campaign/service landings, legal,
 * redirect). Per project decision, ONLY the homepage is indexed; everything else
 * is noindex,follow so crawlers can still read context without listing the page.
 */
export const campaignMetadata = (
  title: string,
  description: string,
  path: string
): Metadata => {
  const url = `${SITE_URL}${path}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    robots: { index: false, follow: true },
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
