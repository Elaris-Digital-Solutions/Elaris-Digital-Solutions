import type { Language } from "@/lib/i18n";

export type SeoPage = "home" | "not-found" | "terms-and-conditions" | "data-policy";

const SITE_URL = "https://elarisdigitalsolutions.com";
const OG_IMAGE = `${SITE_URL}/assets/Elaris-Logo.webp`;
const SECTION_SLUGS = ["servicios", "estandares", "portafolio", "productos", "clientes", "contacto"] as const;
const LEGAL_PATHS = ["/terminos-condiciones", "/politicas-de-datos", "/es/terminos-condiciones", "/es/politicas-de-datos"] as const;
const VALID_PATHS = new Set<string>([
  "/",
  ...SECTION_SLUGS.map((slug) => `/${slug}`),
  "/es",
  ...SECTION_SLUGS.map((slug) => `/es/${slug}`),
  ...LEGAL_PATHS,
]);

const seoCopy: Record<SeoPage, { title: string; description: string }> = {
  home: {
    title: "Automatización con IA y Desarrollo Web | Elaris Digital Solutions",
    description: "Tu negocio depende de procesos manuales lentos? En Elaris Digital Solutions eliminamos el caos operativo con tecnología fácil de usar.",
  },
  "not-found": {
    title: "Página no encontrada | Elaris Digital Solutions",
    description: "La página que buscas no existe. Descubre nuestros servicios de automatización con IA y desarrollo web.",
  },
  "terms-and-conditions": {
    title: "Términos y Condiciones | Elaris Digital Solutions",
    description: "Revisa los términos y condiciones que regulan el uso de los canales digitales y servicios de Elaris Digital Solutions.",
  },
  "data-policy": {
    title: "Políticas de Datos | Elaris Digital Solutions",
    description: "Conoce cómo Elaris Digital Solutions recopila, utiliza y protege la información personal.",
  },
};

const prioritizedServices = [
  {
    name: "Integración de IA para Empresas",
    description: "Pilotos de automatización, copilotos y gobernanza de IA adaptada a industrias reguladas.",
    path: "servicios",
  },
  {
    name: "Servicios de Desarrollo Web",
    description: "Landing pages optimizadas para SEO, hubs de contenido y experiencias de e-commerce de alto rendimiento.",
    path: "servicios",
  },
  {
    name: "Desarrollo de Software a Medida",
    description: "Automatización de flujos de trabajo, orquestación de APIs y plataformas de datos escalables.",
    path: "servicios",
  },
  {
    name: "Análisis de Datos Empresariales",
    description: "Dashboards, insights predictivos y monitorización de KPIs para equipos de producto y ventas.",
    path: "portafolio",
  },
  {
    name: "Automatización y Chatbots con IA",
    description: "Experiencias conversacionales, mesas de soporte y automatización de procesos administrativos.",
    path: "clientes",
  },
];

const normalizePath = (pathname: string): string => {
  if (VALID_PATHS.has(pathname)) {
    return pathname;
  }
  if (pathname.startsWith("/es")) return "/es";
  return "/";
};

const getLocaleCode = () => "es-ES";

const isHomeAliasPath = (pathname: string) => {
  const aliases = new Set<string>([
    ...SECTION_SLUGS.map((slug) => `/${slug}`),
    ...SECTION_SLUGS.map((slug) => `/es/${slug}`),
  ]);
  return aliases.has(pathname);
};

const canonicalForPage = (pathname: string, page: SeoPage) => {
  if (page !== "home") return pathname;
  if (!isHomeAliasPath(pathname)) return pathname;
  if (pathname.startsWith("/es/")) return "/es";
  return "/";
};

const buildOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Elaris Digital Solutions",
  legalName: "ELARIS S.A.C.S",
  taxID: "20615598071",
  foundingDate: "2026-03-09",
  url: SITE_URL,
  logo: OG_IMAGE,
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
      email: "contact@elarisdigitalsolutions.com",
      telephone: "+51-973-663-807",
      contactType: "sales",
      areaServed: "Worldwide",
      availableLanguage: ["Spanish"],
    },
  ],
});

const buildWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Elaris Digital Solutions",
  url: SITE_URL,
  inLanguage: getLocaleCode(),
  potentialAction: {
    "@type": "ContactAction",
    target: `${SITE_URL}/contacto`,
  },
});

const buildServiceSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Elaris Digital Solutions Services",
  itemListElement: prioritizedServices.map((service, index) => ({
    "@type": "Service",
    position: index + 1,
    name: service.name,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: "Elaris Digital Solutions",
    },
    areaServed: "Worldwide",
    url: `${SITE_URL}/${service.path}`,
  })),
});

const buildBreadcrumbSchema = () => {
  const names = ["Inicio", "Servicios", "Estándares", "Portafolio", "Productos", "Clientes", "Contacto"];
  const basePaths = ["", "/servicios", "/estandares", "/portafolio", "/productos", "/clientes", "/contacto"];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: names.map((name, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: `${SITE_URL}${basePaths[index]}`,
    })),
  };
};

export const getSeoMetadata = ({
  pathname,
  page,
  language,
}: {
  pathname: string;
  page: SeoPage;
  language: Language;
}) => {
  const normalizedPath = normalizePath(pathname);
  const canonicalPath = canonicalForPage(normalizedPath, page);
  const currentLanguage = "es";
  const canonical = `${SITE_URL}${canonicalPath === "/" || canonicalPath === "" ? "/" : canonicalPath}`;
  const baseCopy = seoCopy[page];
  const robots = page === "not-found" ? "noindex,nofollow" : "index,follow,max-image-preview:large";

  return {
    title: baseCopy.title,
    description: baseCopy.description,
    canonical,
    lang: currentLanguage,
    robots,
    ogImage: OG_IMAGE,
    alternates: [
      { href: canonical, hrefLang: "es" },
      { href: canonical, hrefLang: "x-default" },
    ],
    locale: "es_ES",
    structuredData: [
      buildOrganizationSchema(),
      buildWebsiteSchema(),
      ...(page === "home" ? [buildServiceSchema(), buildBreadcrumbSchema()] : []),
    ],
  };
};

export { SITE_URL };
