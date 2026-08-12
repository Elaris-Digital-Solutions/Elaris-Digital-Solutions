import type { Metadata } from "next";
import es from "@/locales/es.json";
import type { Article, CaseStudy, TeamProfile } from "@/content/types";
import { TEAM_PROFILES } from "@/content/equipo";
import {
  SERVICES,
  findService,
  type Service,
  type ServicePath,
} from "@/content/services";
import type { Crumb } from "@/components/Breadcrumbs";

export const SITE_URL = "https://elarisdigitalsolutions.com";
export const OG_IMAGE = `${SITE_URL}/assets/Elaris-OG.png`;
/** El `logo` de Organization debe ser el logotipo en sí, no el lienzo 1200×630 del OG. */
export const LOGO_IMAGE = `${SITE_URL}/assets/ElarisLockup.webp`;
export const LOCALE = "es_PE";

export const HOME_TITLE =
  "Software a medida para vender más y operar mejor | Elaris Digital Solutions";
export const HOME_DESCRIPTION =
  "Automatizamos procesos, modernizamos sistemas y construimos plataformas de venta para empresas en Perú y LATAM. El código es 100% tuyo. Diagnóstico inicial sin compromiso, con respuesta en menos de 12 horas.";

/**
 * Identificadores del grafo. Los nodos se declaran una vez (Organization en
 * el layout, Person en su página de perfil) y el resto los referencia por
 * `@id`, para que buscadores y modelos entiendan que hablan de la misma
 * entidad en vez de leer objetos sueltos y repetidos.
 */
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const personIdFor = (slug: string) => `${SITE_URL}/equipo/${slug}#person`;
export const serviceIdFor = (path: ServicePath) => `${SITE_URL}${path}#service`;

/** Área cubierta. Idéntica en Organization y en los nodos Service. */
const AREA_SERVED = [
  { "@type": "Country", name: "Perú" },
  { "@type": "Place", name: "Latinoamérica" },
];

/** es.json → portfolio.projects  ↔  slug de /casos */
const PORTFOLIO_CASE_SLUGS: Record<string, string> = {
  salcedoJewels: "salcedo-jewels",
  sistemaInventarioUPC: "inventario-upc",
  cccImpresiones: "ccc-impresiones",
  veltrixNfc: "veltrixnfc",
};

const PHONE = "+51-973-663-807";
const EMAIL = "contact@elarisdigitalsolutions.com";

/**
 * Organization + señales de LocalBusiness.
 *
 * Aquí NO se marcan los testimonios como `review`. Dos motivos, y el segundo
 * es el que zanja el asunto:
 *
 * 1. Search Console los rechazaba ("varias reseñas sin el objeto
 *    aggregateRating"): Google exige una nota agregada cuando hay más de una
 *    reseña, y nuestros testimonios no llevan puntuación. La única forma de
 *    cumplir sería inventarse una, que es justamente lo que no vamos a hacer.
 * 2. Aunque la llevaran, no serviría de nada. Desde 2019 Google no muestra
 *    estrellas para reseñas que una empresa publica sobre sí misma en su
 *    propio sitio, y eso descalifica a `Organization` y `LocalBusiness`.
 *
 * Los testimonios siguen visibles en la página para quien la lee; lo que se
 * retira es el marcado que nunca iba a generar un resultado enriquecido.
 */
export const buildOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
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
    // Los tres son cofundadores. Nodos compactos: el Person completo lo emite
    // su página en /equipo, y ambos comparten @id para que sea una sola entidad.
    founder: TEAM_PROFILES.map((profile) => ({
      "@type": "Person",
      "@id": personIdFor(profile.slug),
      name: profile.name,
      jobTitle: profile.role,
      url: `${SITE_URL}/equipo/${profile.slug}`,
      sameAs: [profile.linkedin],
    })),
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
  };
};

export const buildWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: "Elaris Digital Solutions",
  url: SITE_URL,
  inLanguage: "es-PE",
  // Build-time timestamp — refreshes on every deploy, signaling content
  // freshness to generative/search engines (GEO).
  dateModified: new Date().toISOString(),
  publisher: { "@id": ORG_ID },
});

/**
 * Índice de servicios de la home.
 *
 * Los nodos van compactos, referenciando por `@id` el nodo completo que cada
 * página de servicio declara. Es la misma regla que ya aplica `founder`: la
 * entidad se define una vez y el resto la referencia, en vez de repetir ocho
 * objetos completos que luego derivan.
 */
export const buildServiceSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Servicios de Elaris Digital Solutions",
  itemListElement: SERVICES.map((service, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Service",
      "@id": serviceIdFor(service.path),
      name: service.label,
      url: `${SITE_URL}${service.path}`,
    },
  })),
});

/**
 * Nodo canónico de un servicio, declarado en su propia página.
 *
 * `isRelatedTo` enlaza con los hermanos de grupo: es lo único que hace legible
 * por máquina la agrupación comercial —vender más / operar mejor— y no solo su
 * maquetación en la home.
 */
export const buildServiceNodeSchema = (service: Service) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": serviceIdFor(service.path),
  name: service.label,
  description: service.benefit,
  url: `${SITE_URL}${service.path}`,
  provider: { "@id": ORG_ID },
  areaServed: AREA_SERVED,
  isRelatedTo: SERVICES.filter(
    (sibling) => sibling.group === service.group && sibling.path !== service.path
  ).map((sibling) => ({
    "@type": "Service",
    "@id": serviceIdFor(sibling.path),
  })),
});

/** Portfolio projects as CreativeWork — gives agents concrete proof of work. */
export const buildPortfolioSchema = () => {
  const projects = es.portfolio.projects;
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Portafolio de proyectos de Elaris Digital Solutions",
    itemListElement: Object.entries(projects).map(([key, project], index) => {
      const caseSlug = PORTFOLIO_CASE_SLUGS[key];
      return {
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: project.title,
          description: project.description,
          about: project.category,
          creator: { "@id": ORG_ID },
          // Conecta el portafolio del home con la página de caso completa.
          ...(caseSlug ? { url: `${SITE_URL}/casos/${caseSlug}` } : {}),
        },
      };
    }),
  };
};

/** Migas de pan: mismos items que el breadcrumb visible de la página. */
export const buildBreadcrumbSchema = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: `${SITE_URL}${item.path}`,
  })),
});

/**
 * ProfilePage: el tipo que Google documenta para «esta página trata sobre
 * esta persona». Es la señal directa para las búsquedas por nombre.
 * El nodo Person completo vive aquí; el resto del sitio lo referencia por @id.
 */
export const buildPersonProfileSchema = (profile: TeamProfile) => {
  const parts = profile.name.split(" ");
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateModified: new Date().toISOString().slice(0, 10),
    mainEntity: {
      "@type": "Person",
      "@id": personIdFor(profile.slug),
      name: profile.name,
      givenName: parts[0],
      familyName: parts.slice(1).join(" "),
      jobTitle: profile.role,
      description: profile.bioIntro,
      image: `${SITE_URL}${profile.photo}`,
      url: `${SITE_URL}/equipo/${profile.slug}`,
      worksFor: { "@id": ORG_ID },
      sameAs: [profile.linkedin],
      knowsAbout: profile.knowsAbout,
    },
  };
};

/**
 * BlogPosting con `author` apuntando por @id a la página del autor: es el
 * vínculo E-E-A-T que Google usa para atribuir experiencia a quien firma.
 */
export const buildArticleSchema = (article: Article, author?: TeamProfile) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: article.title,
  description: article.seoDescription,
  datePublished: article.publishDate,
  dateModified: article.modifiedDate,
  inLanguage: "es-PE",
  image: OG_IMAGE,
  mainEntityOfPage: `${SITE_URL}/recursos/${article.slug}`,
  publisher: { "@id": ORG_ID },
  author: author
    ? {
        "@type": "Person",
        "@id": personIdFor(author.slug),
        name: author.name,
        url: `${SITE_URL}/equipo/${author.slug}`,
      }
    : { "@id": ORG_ID },
});

/**
 * Los casos se marcan como Article: schema.org no tiene un tipo CaseStudy, y
 * `about` → Organization del cliente desambigua que el texto trata sobre él.
 */
export const buildCaseStudySchema = (caseStudy: CaseStudy) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: caseStudy.heading,
  description: caseStudy.seoDescription,
  datePublished: caseStudy.publishDate,
  inLanguage: "es-PE",
  image: OG_IMAGE,
  mainEntityOfPage: `${SITE_URL}/casos/${caseStudy.slug}`,
  author: { "@id": ORG_ID },
  publisher: { "@id": ORG_ID },
  about: {
    "@type": "Organization",
    name: caseStudy.client,
    url: caseStudy.liveUrl,
  },
  // Por `@id`, no solo por url: así estos nodos son LOS MISMOS que declara
  // cada página de servicio, y el caso queda unido al servicio en un único
  // grafo en vez de quedar como dos bloques JSON sin relación.
  mentions: caseStudy.servicePaths.map((path) => ({
    "@type": "Service",
    "@id": serviceIdFor(path),
    name: findService(path).label,
    url: `${SITE_URL}${path}`,
  })),
});

/**
 * Metadata builder for secondary pages.
 *
 * Las páginas de servicio SÍ se indexan (`{ index: true }`): son las únicas
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

/**
 * Metadata de una página de servicio. La ruta se tipa contra el registro, así
 * que una ruta mal escrita deja de compilar en vez de generar una canónica
 * apuntando a una URL que no existe.
 */
export const buildServicePageMetadata = (
  path: ServicePath,
  seo: { title: string; description: string }
): Metadata => campaignMetadata(seo.title, seo.description, path, { index: true });

/**
 * El proceso de trabajo como `HowTo`.
 *
 * Los cuatro pasos ya se renderizan como lista ordenada en todas las páginas
 * de servicio; esto solo los hace legibles por máquina. Es la respuesta directa
 * a «¿cómo trabajan?», que es de las primeras preguntas que un motor de
 * respuestas necesita resolver sobre un proveedor de servicios.
 *
 * Sin `estimatedCost` ni `totalTime`: no publicamos tarifa de referencia y los
 * plazos dependen del alcance. Inventarlos para llenar el esquema sería el
 * mismo error que inventar una valoración.
 */
export const buildHowToSchema = () => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Cómo trabajamos en Elaris Digital Solutions",
  description:
    "Del diagnóstico inicial a la entrega del código: las cuatro fases de un proyecto con Elaris.",
  step: es.servicePages.common.processSteps.map((step, index) => ({
    "@type": "HowToStep",
    position: index + 1,
    name: step.title,
    text: step.description,
  })),
});

/**
 * Migas de pan de una página de servicio. Se derivan una sola vez y alimentan
 * a la vez el JSON-LD y el componente visible: Google exige que coincidan.
 */
export const serviceCrumbs = (path: ServicePath): Crumb[] => [
  { name: es.contentHubs.breadcrumbHome, path: "/" },
  { name: es.contentHubs.servicios.breadcrumbLabel, path: "/servicios" },
  { name: findService(path).label, path },
];

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
