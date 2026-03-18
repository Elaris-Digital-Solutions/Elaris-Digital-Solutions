import type { Language } from "@/lib/i18n";

export type SeoPage = "home" | "not-found" | "terms-and-conditions" | "data-policy";

const SITE_URL = "https://elarisdigitalsolutions.com";
const OG_IMAGE = `${SITE_URL}/assets/Elaris-Logo.webp`;
const SECTION_SLUGS = ["servicios", "estandares", "portafolio", "productos", "clientes", "contacto"] as const;
const LEGAL_PATHS = ["/terminos-condiciones", "/politicas-de-datos", "/es/terminos-condiciones", "/es/politicas-de-datos"] as const;
const VALID_PATHS = new Set<string>([
  "/",
  ...SECTION_SLUGS.map((slug) => `/${slug}`),
  "/en",
  ...SECTION_SLUGS.map((slug) => `/en/${slug}`),
  "/es",
  ...SECTION_SLUGS.map((slug) => `/es/${slug}`),
  ...LEGAL_PATHS,
]);

const seoCopy: Record<SeoPage, Record<Language, { title: string; description: string }>> = {
  home: {
    en: {
      title: "AI Automation & Web Development | Elaris Digital Solutions",
      description:
        "Elaris Digital Solutions blends AI integration, SEO-optimized landing pages, custom software, and e-commerce development for ambitious teams across LATAM, the U.S., and Europe.",
    },
    es: {
      title: "Automatización con IA y Desarrollo Web | Elaris Digital Solutions",
      description:
        "Elaris Digital Solutions combina IA, landing pages optimizadas para SEO, software a medida y e-commerce para equipos en LATAM, EE. UU. y Europa.",
    },
  },
  "not-found": {
    en: {
      title: "Page Not Found | Elaris Digital Solutions",
      description: "The page you are looking for is unavailable. Explore our AI automation and web development services instead.",
    },
    es: {
      title: "Página no encontrada | Elaris Digital Solutions",
      description: "La página que buscas no existe. Descubre nuestros servicios de automatización con IA y desarrollo web.",
    },
  },
  "terms-and-conditions": {
    en: {
      title: "Terms & Conditions | Elaris Digital Solutions",
      description: "Review the terms and conditions that regulate the use of Elaris Digital Solutions digital channels and services.",
    },
    es: {
      title: "Términos y Condiciones | Elaris Digital Solutions",
      description: "Revisa los términos y condiciones que regulan el uso de los canales digitales y servicios de Elaris Digital Solutions.",
    },
  },
  "data-policy": {
    en: {
      title: "Data Policy | Elaris Digital Solutions",
      description: "Learn how Elaris Digital Solutions collects, uses, and protects personal data.",
    },
    es: {
      title: "Políticas de Datos | Elaris Digital Solutions",
      description: "Conoce cómo Elaris Digital Solutions recopila, utiliza y protege la información personal.",
    },
  },
};

const prioritizedServices = [
  {
    name: "AI Integration for Business",
    description: "Automation pilots, copilots, and AI governance tailored to regulated industries.",
    path: "servicios",
  },
  {
    name: "Web Development Services",
    description: "SEO-optimized landing pages, content hubs, and high-performing e-commerce experiences.",
    path: "servicios",
  },
  {
    name: "Custom Software Development",
    description: "Workflow automation, API orchestration, and data platforms that scale with operations.",
    path: "servicios",
  },
  {
    name: "Business Data Analysis",
    description: "Dashboards, predictive insights, and KPI monitoring for product and revenue teams.",
    path: "portafolio",
  },
  {
    name: "Automation & AI Chatbots",
    description: "Conversational experiences, multilingual support desks, and back-office workflow automation.",
    path: "clientes",
  },
];

const normalizePath = (pathname: string): string => {
  if (VALID_PATHS.has(pathname)) {
    return pathname;
  }
  if (pathname.startsWith("/en")) return "/en";
  if (pathname.startsWith("/es")) return "/es";
  return "/";
};

const toEnglishPath = (pathname: string): string => {
  if (pathname.startsWith("/en")) {
    return pathname;
  }
  if (!pathname.startsWith("/es")) {
    return pathname || "/";
  }
  const trimmed = pathname.replace(/^\/es/, "");
  return trimmed === "" ? "/en" : `/en${trimmed}`;
};

const toSpanishPath = (pathname: string): string => {
  if (pathname.startsWith("/es")) {
    return pathname;
  }
  if (pathname.startsWith("/en")) {
    const trimmed = pathname.replace(/^\/en/, "");
    return trimmed === "" ? "/" : trimmed;
  }
  return pathname;
};

const getLocaleCode = (language: Language) => (language === "es" ? "es-ES" : "en-US");

const buildOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Elaris Digital Solutions",
  url: SITE_URL,
  logo: OG_IMAGE,
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
      telephone: "+51-944-228-807",
      contactType: "sales",
      areaServed: "Worldwide",
      availableLanguage: ["English", "Spanish"],
    },
  ],
});

const buildWebsiteSchema = (language: Language) => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Elaris Digital Solutions",
  url: SITE_URL,
  inLanguage: getLocaleCode(language),
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

const buildBreadcrumbSchema = (language: Language) => {
  const names = language === "es"
    ? ["Inicio", "Servicios", "Estándares", "Portafolio", "Productos", "Clientes", "Contacto"]
    : ["Home", "Services", "Our Standards", "Portfolio", "Products", "Clients", "Contact"];

  const basePaths = language === "es"
    ? ["/es", "/es/servicios", "/es/estandares", "/es/portafolio", "/es/productos", "/es/clientes", "/es/contacto"]
    : ["/en", "/en/servicios", "/en/estandares", "/en/portafolio", "/en/productos", "/en/clientes", "/en/contacto"];

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
  const currentLanguage = normalizedPath.startsWith("/en") ? "en" : "es";
  const englishHref = `${SITE_URL}${toEnglishPath(normalizedPath)}`;
  const spanishHref = `${SITE_URL}${toSpanishPath(normalizedPath)}`;
  const canonical = `${SITE_URL}${normalizedPath === "/" ? "/" : normalizedPath}`;
  const baseCopy = seoCopy[page][currentLanguage];
  const robots = page === "not-found" ? "noindex,nofollow" : "index,follow,max-image-preview:large";

  return {
    title: baseCopy.title,
    description: baseCopy.description,
    canonical,
    lang: currentLanguage,
    robots,
    ogImage: OG_IMAGE,
    alternates: [
      { href: englishHref, hrefLang: "en" },
      { href: spanishHref, hrefLang: "es" },
      { href: englishHref, hrefLang: "x-default" },
    ],
    locale: currentLanguage === "es" ? "es_ES" : "en_US",
    structuredData: [
      buildOrganizationSchema(),
      buildWebsiteSchema(currentLanguage),
      ...(page === "home" ? [buildServiceSchema(), buildBreadcrumbSchema(currentLanguage)] : []),
    ],
  };
};

export { SITE_URL };
