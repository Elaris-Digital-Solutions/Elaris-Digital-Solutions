const SITE_URL = "https://elarisdigitalsolutions.com";
const OG_IMAGE = `${SITE_URL}/assets/Elaris-Logo.webp`;

export type SeoPage = "home" | "not-found" | "service";

export interface SeoMetadata {
  title: string;
  description: string;
  canonical: string;
  robots: string;
  ogImage: string;
  structuredData: object[];
}

const HOME_SEO = {
  title: "Software a Medida e IA para Empresas | Elaris Digital Solutions",
  description:
    "Desarrollamos software a medida, automatización con IA y plataformas digitales que generan resultados reales. Soluciones empresariales para empresas en Latinoamérica.",
};

const NOT_FOUND_SEO = {
  title: "Página no encontrada | Elaris Digital Solutions",
  description:
    "La página que buscas no existe. Descubre nuestros servicios de desarrollo de software, automatización con IA y soluciones digitales empresariales.",
};

const buildOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Elaris Digital Solutions",
  url: SITE_URL,
  logo: OG_IMAGE,
  areaServed: "LATAM",
  sameAs: [
    "https://www.linkedin.com/company/elaris-digital-solutions/",
    "https://www.instagram.com/elarisdigitalsolutions",
    "https://github.com/Elaris-Digital-Solutions",
    "https://x.com/ElarisSolutions",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      email: "contact@elarisdigitalsolutions.com",
      telephone: "+51-973-663-807",
      contactType: "sales",
      areaServed: "LATAM",
      availableLanguage: "Spanish",
    },
  ],
});

const buildWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Elaris Digital Solutions",
  url: SITE_URL,
  inLanguage: "es",
  potentialAction: {
    "@type": "ContactAction",
    target: `${SITE_URL}/#contacto`,
  },
});

const buildServiceSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Servicios de Elaris Digital Solutions",
  itemListElement: [
    {
      "@type": "Service",
      position: 1,
      name: "Desarrollo de Software a Medida",
      description:
        "Plataformas empresariales, automatización de flujos y arquitecturas escalables adaptadas a la lógica de cada negocio.",
      provider: { "@type": "Organization", name: "Elaris Digital Solutions" },
      areaServed: "LATAM",
      url: `${SITE_URL}/#servicios`,
    },
    {
      "@type": "Service",
      position: 2,
      name: "Automatización con IA",
      description:
        "Integración de modelos de lenguaje, agentes de IA y automatización cognitiva en los flujos críticos de la empresa.",
      provider: { "@type": "Organization", name: "Elaris Digital Solutions" },
      areaServed: "LATAM",
      url: `${SITE_URL}/#servicios`,
    },
    {
      "@type": "Service",
      position: 3,
      name: "Desarrollo E-commerce",
      description:
        "Tiendas virtuales de alto rendimiento con gestión de inventario, pasarelas de pago y experiencias de compra optimizadas para conversión.",
      provider: { "@type": "Organization", name: "Elaris Digital Solutions" },
      areaServed: "LATAM",
      url: `${SITE_URL}/#servicios`,
    },
    {
      "@type": "Service",
      position: 4,
      name: "Creación de APIs Personalizadas",
      description:
        "APIs RESTful y GraphQL seguras, documentadas y listas para producción que conectan ERP, CRM y sistemas propios.",
      provider: { "@type": "Organization", name: "Elaris Digital Solutions" },
      areaServed: "LATAM",
      url: `${SITE_URL}/#servicios`,
    },
  ],
});

export const getHomeSeoMetadata = (): SeoMetadata => ({
  title: HOME_SEO.title,
  description: HOME_SEO.description,
  canonical: `${SITE_URL}/`,
  robots: "index,follow,max-image-preview:large",
  ogImage: OG_IMAGE,
  structuredData: [
    buildOrganizationSchema(),
    buildWebsiteSchema(),
    buildServiceSchema(),
  ],
});

export const getNotFoundSeoMetadata = (): SeoMetadata => ({
  title: NOT_FOUND_SEO.title,
  description: NOT_FOUND_SEO.description,
  canonical: `${SITE_URL}/`,
  robots: "noindex,nofollow",
  ogImage: OG_IMAGE,
  structuredData: [],
});

export const getServicePageSeoMetadata = (
  title: string,
  description: string
): SeoMetadata => ({
  title,
  description,
  canonical: `${SITE_URL}/`,
  robots: "noindex,nofollow",
  ogImage: OG_IMAGE,
  structuredData: [],
});
structuredData: [
  buildOrganizationSchema(),
  buildWebsiteSchema(currentLanguage),
  ...(page === "home" ? [buildServiceSchema(), buildBreadcrumbSchema(currentLanguage)] : []),
],
  };
};

export { SITE_URL };
