# Documento de cambios SEO — Elaris (accionable)

**Fecha:** 2026-08-03
**Uso:** instrucciones autosuficientes para implementar. El copy íntegro (bios, casos, artículos, microcopy) vive en el anexo [contenido-seo.md](contenido-seo.md); la estrategia, en [plan-seo-organico.md](plan-seo-organico.md). Las tareas manuales fuera del código están en [documento-de-cambios-offsite.md](documento-de-cambios-offsite.md). Con estos archivos se implementa todo sin consultar nada más.
**Estado:** todas las aprobaciones cerradas (cofundadores, bios, artículos y precios). No quedan bloqueos.
**Convenciones:** `De:` = texto/código actual exacto · `A:` = estado final. Rutas relativas a la raíz del repo. Stack: Next.js 14 App Router, TS, Tailwind 3.4, deploy Netlify. Regla operativa aprendida: **no ejecutar `npm run build` mientras `npm run dev` esté corriendo** (comparten `.next`); detener el dev primero.

**Fases:** F0 GA4 → F1 infraestructura + `/casos` → F2 `/equipo` → F3 `/recursos` → F4 ajustes on-page → F5 off-site. Cada fase deja el sitio compilando y desplegable.

---

## FASE 0 — Medición (GA4 desde cero)

### S01. Alta de GA4 (manual, en el navegador — sin código)

1. Entrar a `analytics.google.com` con **la misma cuenta Gmail que verificó Search Console** (la verificación vive en `public/googlec09e8a72f8f7ed1d.html`). No existe cuenta Google del dominio: `contact@elarisdigitalsolutions.com` no es Workspace, y no hace falta — la propiedad del sitio ya está demostrada por el archivo de verificación. Usar otra cuenta impediría vincular GSC con GA4.
   ⚠️ Inmediatamente después: dar acceso de **Administrador** en GA4 y de **Propietario** en GSC a los otros dos cofundadores. Si estas herramientas cuelgan de una sola cuenta personal, perder ese acceso significa perder el histórico, que no se recupera.
2. Crear cuenta: nombre **Elaris Digital Solutions** (config de compartición por defecto).
3. Crear propiedad: nombre `elarisdigitalsolutions.com`, zona horaria **Perú (GMT-5)**, moneda **PEN**. Sector "Tecnología"; objetivo de negocio **"Generar clientes potenciales"**.
4. Flujo de datos → **Web** → URL `https://elarisdigitalsolutions.com`, nombre "Web Elaris". Copiar el **ID de medición `G-XXXXXXXXXX`**.
5. En el flujo → Configuración de medición mejorada (enhanced measurement): dejarla activada PERO abrir el detalle de "Vistas de página" y **desactivar** el sub-toggle *"Cambios de página según eventos del historial del navegador"* — el tracker propio (S02) dispara los page_view de navegación SPA; con ambos activos se duplicarían.
6. Admin → Vínculos de Search Console → vincular la propiedad de GSC con el flujo web.
7. Cuando existan los eventos (S04 desplegado): Admin → Eventos → marcar `generate_lead` y `meet_click` como **eventos clave** (key events).

### S02. Tracker GA4 en `src/app/providers.tsx`

Replicar el patrón existente de `MetaPixelTracker` (mismo archivo). Añadir al archivo:

```tsx
// ── Google Analytics 4 ──────────────────────────────────────────────
// Mismo patrón que MetaPixelTracker: script inyectado una vez y
// page_view manual por cambio de ruta (send_page_view: false evita
// el doble conteo con la medición mejorada de GA4).
const GA_ID = "G-81YGZVKMLG"; // ID de medición real (es público)

const initGaScript = () => {
  if (typeof window === "undefined") return;
  if (document.getElementById("ga4-lib")) return;

  window.dataLayer = window.dataLayer || [];
  // gtag DEBE definirse con function/arguments (la librería lo requiere).
  function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  }
  (window as unknown as { gtag: typeof gtag }).gtag = gtag;

  gtag("js", new Date());
  gtag("config", GA_ID, { send_page_view: false });

  const script = document.createElement("script");
  script.id = "ga4-lib";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
};

const GaTracker = () => {
  const pathname = usePathname();

  useEffect(() => {
    initGaScript();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !(window as any).gtag) return;
    (window as any).gtag("event", "page_view", {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname]);

  return null;
};
```

Declarar el tipo global junto a los existentes (o en el mismo archivo):

```ts
declare global {
  interface Window {
    dataLayer: unknown[];
  }
}
```

Y en el componente `Providers`, junto a `<MetaPixelTracker />`:

- De: `<MetaPixelTracker />`
- A: `<MetaPixelTracker />` seguido de `<GaTracker />`

### S03. Helper de eventos `src/lib/analytics.ts` (archivo nuevo)

```ts
/**
 * Eventos GA4. Guard defensivo: si gtag aún no cargó (adblock,
 * primer render), la llamada es un no-op silencioso.
 */
export const trackEvent = (
  name: string,
  params?: Record<string, string | number>
) => {
  if (typeof window === "undefined") return;
  const gtag = (window as { gtag?: (...args: unknown[]) => void }).gtag;
  if (!gtag) return;
  gtag("event", name, params ?? {});
};
```

### S04. Instrumentar los 3 eventos de conversión

**a) `generate_lead`** — `src/components/Contact.tsx`, dentro de `handleSubmit`, junto al `fbq('trackSingle', pixelId, 'Lead', …)` existente:

```ts
trackEvent("generate_lead", { method: "whatsapp_form" });
```

(importar `trackEvent` desde `@/lib/analytics`).

**b) `meet_click`** — mismo archivo. El botón "Agendar llamada de 30 min" es el `<a href="/meet" …>` del bloque de submit:

- De: `<a href="/meet" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border …`
- A: el mismo elemento con `onClick={() => trackEvent("meet_click", { location: "contact_form" })}`.

**c) `whatsapp_click`** — `src/components/ui/floating-whatsapp-button.tsx`, dentro de la función `trackContact` existente (que ya dispara el evento Meta `Contact`), añadir al inicio:

```ts
trackEvent("whatsapp_click", { location: "floating_button" });
```

### S05. dns-prefetch — `src/app/layout.tsx`

- De: `<link rel="dns-prefetch" href="https://connect.facebook.net" />`
- A: esa línea + debajo: `<link rel="dns-prefetch" href="https://www.googletagmanager.com" />`

### S06. Nota de privacidad — `src/views/DataPolicies.tsx`

En la sección que enumera tecnologías de seguimiento/cookies (donde hoy se menciona Meta/Facebook Pixel), añadir un párrafo equivalente para Google Analytics 4:

> «Utilizamos Google Analytics 4 para medir de forma agregada el uso del sitio (páginas vistas, origen de la visita y acciones como el envío del formulario). La información se procesa de forma seudonimizada y no se usa para identificarte. Puedes bloquear esta medición con las herramientas de tu navegador o extensiones de opt-out de Google Analytics.»

---

## FASE 1 — Infraestructura de contenido + `/casos`

### S07. Activar el plugin de tipografía — `tailwind.config.ts`

`@tailwindcss/typography` ya está en devDependencies pero no registrado.

- De: `plugins: [require("tailwindcss-animate")],`
- A: `plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],`

*(Si el array tiene otra forma exacta, añadir el require respetándola.)*

### S08. Tipos del contenido — `src/content/types.ts` (nuevo)

```ts
/** Entidades de contenido indexable. Se importan SOLO desde page.tsx
 *  (server): nunca desde componentes "use client" directamente, para
 *  que el contenido no entre al bundle JS del cliente. */

export interface TeamProfile {
  slug: string;
  name: string;        // nombre completo público (title/H1/schema)
  shortName: string;
  role: string;
  photo: string;       // ruta en /public
  linkedin: string;
  seoTitle: string;
  seoDescription: string;
  bioIntro: string;
  bioParagraphs: string[];
  knowsAbout: string[];
  caseSlugs: string[]; // casos en los que participó
}

export interface CaseResult {
  metric: string;
  detail: string;
}

export interface CaseQuote {
  text: string;
  author: string;
  role: string;
}

export interface CaseStudy {
  slug: string;
  client: string;
  sector: string;
  location: { city: string; country: string };
  servicePaths: string[];        // valores de SERVICE_PATHS
  liveUrl: string;
  portfolioKey: string;          // clave en es.json portfolio.projects
  relatedArticleSlugs: string[];
  publishDate: string;           // ISO YYYY-MM-DD
  seoTitle: string;
  seoDescription: string;
  summary: string;
  context: string[];
  before: string[];
  solution: string[];
  results: CaseResult[];
  quote: CaseQuote | null;
}

export interface ArticleSection {
  h2: string;
  paragraphs: string[]; // admiten enlaces inline [texto](/ruta)
  list?: string[];
}

export interface Article {
  slug: string;
  title: string;        // H1
  seoTitle: string;
  seoDescription: string;
  publishDate: string;  // ISO — fecha real del deploy de su tanda
  modifiedDate: string;
  authorSlug: string;   // slug de TeamProfile
  servicePath: string;
  caseSlug: string | null;
  tags: string[];
  readMinutes: number;
  intro: string[];
  sections: ArticleSection[];
  faq: { q: string; a: string }[];
  ctaText: string;
}
```

### S09. Registros — `src/content/casos.ts`, `src/content/equipo.ts`, `src/content/recursos/index.ts` (nuevos)

- `casos.ts`: `export const CASE_STUDIES: CaseStudy[] = […]` con los **4 casos completos del anexo §3** (todos los campos, en el orden salcedo-jewels, inventario-upc, ccc-impresiones, veltrixnfc). `publishDate`: fecha del deploy de F1.
- `equipo.ts`: `export const TEAM_PROFILES: TeamProfile[] = []` — **vacío en F1**, se llena en F2. Exportar también `export const findProfile = (slug: string) => TEAM_PROFILES.find(p => p.slug === slug);`
- `recursos/index.ts`: `export const ARTICLES: Article[] = []` — vacío en F1 (se llena en F3).
- En `casos.ts` añadir: `export const findCase = (slug: string) => CASE_STUDIES.find(c => c.slug === slug);`

Con los registros vacíos, sitemap y hubs de fases futuras no emiten nada (ver S15): cada fase es desplegable.

### S10. Grafo de schema — `src/seo/site.ts`

**a)** Añadir tras `LOCALE`:

```ts
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
```

**b)** `buildOrganizationSchema()`: añadir `"@id": ORG_ID,` como primera propiedad tras `"@type"`. Además (F2, S22b) ganará `founder`.

**c)** `buildWebsiteSchema()`:
- De: `publisher: { "@type": "Organization", name: "Elaris Digital Solutions" },`
- A: `publisher: { "@id": ORG_ID },` y añadir `"@id": WEBSITE_ID,` tras `"@type"`.

**d)** `buildServiceSchema()`:
- De: `provider: { "@type": "Organization", name: "Elaris Digital Solutions" },`
- A: `provider: { "@id": ORG_ID },`

**e)** `buildPortfolioSchema()`:
- De: `creator: { "@type": "Organization", name: "Elaris Digital Solutions" },`
- A: `creator: { "@id": ORG_ID },` y añadir al item: `url: \`${SITE_URL}/casos/${PORTFOLIO_CASE_SLUGS[key] ?? ""}\`` — implementarlo iterando `Object.entries(projects)` y con el mapa:

```ts
/** portfolio.projects (es.json) → slug de /casos */
const PORTFOLIO_CASE_SLUGS: Record<string, string> = {
  salcedoJewels: "salcedo-jewels",
  sistemaInventarioUPC: "inventario-upc",
  cccImpresiones: "ccc-impresiones",
  veltrixNfc: "veltrixnfc",
};
```

**f)** Builders nuevos (añadir al final del archivo):

```ts
import type { Article, CaseStudy, TeamProfile } from "@/content/types";

export const buildBreadcrumbSchema = (
  items: { name: string; path: string }[]
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: `${SITE_URL}${item.path}`,
  })),
});

export const personIdFor = (slug: string) =>
  `${SITE_URL}/equipo/${slug}#person`;

/** Nodo Person completo — lo emite su propia página de perfil. */
export const buildPersonProfileSchema = (p: TeamProfile) => {
  const nameParts = p.name.split(" ");
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateModified: new Date().toISOString().slice(0, 10),
    mainEntity: {
      "@type": "Person",
      "@id": personIdFor(p.slug),
      name: p.name,
      givenName: nameParts[0],
      familyName: nameParts.slice(1).join(" "),
      jobTitle: p.role,
      description: p.bioIntro,
      image: `${SITE_URL}${p.photo}`,
      url: `${SITE_URL}/equipo/${p.slug}`,
      worksFor: { "@id": ORG_ID },
      sameAs: [p.linkedin],
      knowsAbout: p.knowsAbout,
    },
  };
};

export const buildArticleSchema = (a: Article, author?: TeamProfile) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: a.title,
  description: a.seoDescription,
  datePublished: a.publishDate,
  dateModified: a.modifiedDate,
  inLanguage: "es-PE",
  image: OG_IMAGE,
  mainEntityOfPage: `${SITE_URL}/recursos/${a.slug}`,
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

export const buildCaseStudySchema = (c: CaseStudy) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: c.seoTitle,
  description: c.seoDescription,
  datePublished: c.publishDate,
  inLanguage: "es-PE",
  image: OG_IMAGE,
  mainEntityOfPage: `${SITE_URL}/casos/${c.slug}`,
  author: { "@id": ORG_ID },
  publisher: { "@id": ORG_ID },
  about: { "@type": "Organization", name: c.client, url: c.liveUrl },
  mentions: c.servicePaths.map((path) => ({
    "@type": "Service",
    url: `${SITE_URL}${path}`,
  })),
});
```

*(Nota: importar tipos con `import type` evita ciclos; `site.ts` no importa los registros — recibe las entidades como argumentos.)*

### S11. Breadcrumbs visibles — `src/components/Breadcrumbs.tsx` (nuevo)

```tsx
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface Crumb {
  name: string;
  path: string; // el último se renderiza sin enlace
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Ruta de navegación" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-slate-600">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1.5">
              {index > 0 && (
                <ChevronRight aria-hidden="true" className="h-3.5 w-3.5 text-slate-400" />
              )}
              {isLast ? (
                <span aria-current="page" className="font-medium text-[#071540]">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.path}
                  className="hover:text-[#0855FD] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0855FD] focus-visible:ring-offset-2 rounded"
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
```

El JSON-LD correspondiente lo emite cada `page.tsx` con `buildBreadcrumbSchema` **con los mismos items**.

### S12. Render de enlaces inline — `src/components/ui/rich-text.tsx` (nuevo)

Los párrafos del contenido usan `[texto](/ruta)`. Único markdown soportado:

```tsx
import Link from "next/link";
import { Fragment } from "react";

const LINK_RE = /\[([^\]]+)\]\((\/[^)\s]*)\)/g;

/** Convierte "[texto](/ruta)" en <Link>. Solo rutas internas. */
export function RichText({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = LINK_RE.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(<Fragment key={key++}>{text.slice(lastIndex, match.index)}</Fragment>);
    }
    parts.push(
      <Link
        key={key++}
        href={match[2]}
        className="font-semibold text-brand-gradient hover:underline"
      >
        {match[1]}
      </Link>
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(<Fragment key={key++}>{text.slice(lastIndex)}</Fragment>);
  }
  return <>{parts}</>;
}
```

### S13. Microcopy de hubs — `src/locales/es.json`

Añadir el bloque `contentHubs` **exacto del anexo §1** (después del bloque `servicePages`, antes de `team`).

### S14. Plantilla de caso — `src/components/CaseStudyTemplate.tsx` (nuevo)

Client component (`"use client"`), recibe todo por props desde el page server (no importa registros). Estructura y clases siguiendo el design system del sitio (`ServicePageTemplate` como referencia de estilos):

```tsx
"use client";

import Link from "next/link";
import { AlertCircle, ArrowRight, Check, ExternalLink, Quote, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import FloatingWhatsappButton from "@/components/ui/floating-whatsapp-button";
import Breadcrumbs, { type Crumb } from "@/components/Breadcrumbs";
import type { CaseStudy } from "@/content/types";
import { scrollToSection } from "@/lib/utils";

interface Props {
  caseStudy: CaseStudy;
  breadcrumbs: Crumb[];
  services: { title: string; href: string }[];       // resueltos por el server
  relatedArticles: { title: string; href: string }[]; // vacío hasta F3
  labels: {
    badge: string; readCase: string; servicesApplied: string;
    visitSite: string; backToHub: string;
  };
}

export default function CaseStudyTemplate({ caseStudy: c, breadcrumbs, services, relatedArticles, labels }: Props) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white">
      <Navbar />
      <main id="contenido-principal" tabIndex={-1} className="site-sections">
        {/* HERO */}
        <section className="relative overflow-hidden pt-32 pb-16">
          <div className="container mx-auto max-w-4xl px-6">
            <Breadcrumbs items={breadcrumbs} />
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#0855FD]/25 bg-white/70 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-brand-gradient">
              {labels.badge} · {c.sector}
            </span>
            <h1 className="mb-4 text-4xl font-light tracking-tight text-[#071540] md:text-5xl">
              {c.seoTitle.replace(/\s*\|.*$/, "")}
            </h1>
            <p className="max-w-3xl text-lg font-light leading-relaxed text-slate-700">{c.summary}</p>
            <p className="mt-4 text-sm text-slate-600">{c.client} · {c.location.city}, {c.location.country}</p>
          </div>
        </section>

        {/* CONTEXTO */}
        <section className="py-14">
          <div className="prose prose-slate container mx-auto max-w-3xl px-6">
            {c.context.map((p) => <p key={p.slice(0, 32)}>{p}</p>)}
          </div>
        </section>

        {/* ANTES / SOLUCIÓN */}
        <section className="py-14">
          <div className="container mx-auto grid max-w-5xl gap-8 px-6 md:grid-cols-2">
            <div>
              <h2 className="mb-5 text-2xl font-bold text-[#071540]">Cómo operaban</h2>
              <ul className="space-y-3">
                {c.before.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slate-700">
                    <AlertCircle aria-hidden className="mt-1 h-4 w-4 flex-shrink-0 icon-brand-gradient" />
                    <span className="font-light">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-5 text-2xl font-bold text-[#071540]">Qué construimos</h2>
              <ul className="space-y-3">
                {c.solution.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slate-700">
                    <Check aria-hidden className="mt-1 h-4 w-4 flex-shrink-0 icon-brand-gradient" />
                    <span className="font-light">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* RESULTADOS */}
        <section className="py-14">
          <div className="container mx-auto max-w-5xl px-6">
            <h2 className="mb-8 text-center text-3xl font-extrabold tracking-tight text-slate-900">
              Resultados
            </h2>
            <div className="grid gap-5 md:grid-cols-3">
              {c.results.map((r) => (
                <div key={r.metric} className="rounded-2xl border border-slate-200 bg-white p-6">
                  <p className="mb-2 flex items-start gap-2 text-lg font-bold text-brand-gradient">
                    <TrendingUp aria-hidden className="mt-1 h-4 w-4 flex-shrink-0" />
                    {r.metric}
                  </p>
                  <p className="text-sm font-light leading-relaxed text-slate-600">{r.detail}</p>
                </div>
              ))}
            </div>
            {c.quote && (
              <figure className="mx-auto mt-12 max-w-3xl text-center">
                <Quote aria-hidden className="mx-auto mb-4 h-8 w-8 icon-brand-gradient opacity-40" />
                <blockquote className="text-xl font-light italic leading-relaxed text-[#071540]">
                  “{c.quote.text}”
                </blockquote>
                <figcaption className="mt-4 text-sm text-slate-600">
                  <span className="font-semibold text-[#071540]">{c.quote.author}</span> · {c.quote.role}
                </figcaption>
              </figure>
            )}
          </div>
        </section>

        {/* SERVICIOS + ENLACES */}
        <section className="py-14">
          <div className="container mx-auto max-w-3xl px-6 text-center">
            <h2 className="mb-5 text-xl font-bold text-[#071540]">{labels.servicesApplied}</h2>
            <div className="mb-8 flex flex-wrap justify-center gap-3">
              {services.map((s) => (
                <Link key={s.href} href={s.href} className="rounded-full border border-[#0855FD]/30 px-5 py-2 text-sm font-semibold text-brand-gradient transition-colors hover:bg-[#0855FD]/5">
                  {s.title}
                </Link>
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href={c.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-[#0855FD]">
                <ExternalLink aria-hidden className="h-4 w-4" /> {labels.visitSite}
              </a>
              {relatedArticles.map((a) => (
                <Link key={a.href} href={a.href} className="text-sm font-semibold text-brand-gradient hover:underline">
                  {a.title} →
                </Link>
              ))}
            </div>
            <a
              href="#contacto"
              onClick={(e) => { e.preventDefault(); scrollToSection("contacto"); }}
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-brand-gradient px-8 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(47,100,255,0.3)] transition-all hover:-translate-y-0.5"
            >
              Solicitar diagnóstico <ArrowRight aria-hidden className="h-4 w-4" />
            </a>
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
      <FloatingWhatsappButton />
    </div>
  );
}
```

### S15. Rutas de `/casos` — `src/app/casos/page.tsx` y `src/app/casos/[slug]/page.tsx` (nuevos)

**Hub** (`casos/page.tsx`, server):

```tsx
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsappButton from "@/components/ui/floating-whatsapp-button";
import Breadcrumbs from "@/components/Breadcrumbs";
import { campaignMetadata, buildBreadcrumbSchema } from "@/seo/site";
import { CASE_STUDIES } from "@/content/casos";
import es from "@/locales/es.json";

const hub = es.contentHubs.casos;

export const metadata = campaignMetadata(
  "Casos de Éxito en Desarrollo de Software | Elaris Digital Solutions",
  "Proyectos reales con resultados medibles: e-commerce, plataformas institucionales, digitalización de operaciones y MVPs en Perú, Chile y Argentina.",
  "/casos",
  { index: true }
);

const crumbs = [
  { name: es.contentHubs.breadcrumbHome, path: "/" },
  { name: hub.breadcrumbLabel, path: "/casos" },
];

export default function Page() {
  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(crumbs)} />
      <div className="relative min-h-screen bg-white">
        <Navbar />
        <main id="contenido-principal" tabIndex={-1} className="site-sections">
          <section className="pt-32 pb-20">
            <div className="container mx-auto max-w-5xl px-6">
              <Breadcrumbs items={crumbs} />
              <span className="mb-4 inline-block rounded-full bg-[#eff4ff] px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-gradient">{hub.badge}</span>
              <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">{hub.title}</h1>
              <p className="mb-12 max-w-2xl text-lg font-light text-slate-700">{hub.intro}</p>
              <div className="grid gap-6 md:grid-cols-2">
                {CASE_STUDIES.map((c) => (
                  <Link key={c.slug} href={`/casos/${c.slug}`} className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 transition-all hover:border-[#0855FD]/30 hover:shadow-md">
                    <p className="mb-2 text-xs font-bold uppercase tracking-widest text-brand-gradient">{c.sector} · {c.location.country}</p>
                    <h2 className="mb-3 text-xl font-semibold text-[#071540]">{c.client}</h2>
                    <p className="mb-4 flex-1 text-sm font-light leading-relaxed text-slate-600">{c.summary}</p>
                    <span className="text-sm font-semibold text-brand-gradient">{hub.readCase} →</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
        <FloatingWhatsappButton />
      </div>
    </>
  );
}
```

**Detalle** (`casos/[slug]/page.tsx`, server):

```tsx
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import CaseStudyTemplate from "@/components/CaseStudyTemplate";
import { campaignMetadata, buildBreadcrumbSchema, buildCaseStudySchema } from "@/seo/site";
import { CASE_STUDIES, findCase } from "@/content/casos";
import { ARTICLES } from "@/content/recursos";
import es from "@/locales/es.json";

export const dynamicParams = false;
export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const c = findCase(params.slug);
  if (!c) return {};
  return campaignMetadata(c.seoTitle, c.seoDescription, `/casos/${c.slug}`, { index: true });
}

/** es.json services.items → título por href, para “Servicios aplicados”. */
const serviceTitleByHref = () => {
  const map: Record<string, string> = {};
  Object.values(es.services.items).forEach((s) => { map[s.href] = s.title; });
  return map;
};

export default function Page({ params }: { params: { slug: string } }) {
  const c = findCase(params.slug);
  if (!c) notFound();

  const titles = serviceTitleByHref();
  const crumbs = [
    { name: es.contentHubs.breadcrumbHome, path: "/" },
    { name: es.contentHubs.casos.breadcrumbLabel, path: "/casos" },
    { name: c.client, path: `/casos/${c.slug}` },
  ];

  return (
    <>
      <JsonLd data={[buildCaseStudySchema(c), buildBreadcrumbSchema(crumbs)]} />
      <CaseStudyTemplate
        caseStudy={c}
        breadcrumbs={crumbs}
        services={c.servicePaths.map((href) => ({ href, title: titles[href] ?? href }))}
        relatedArticles={c.relatedArticleSlugs
          .map((slug) => ARTICLES.find((a) => a.slug === slug))
          .filter(Boolean)
          .map((a) => ({ title: a!.title, href: `/recursos/${a!.slug}` }))}
        labels={es.contentHubs.casos}
      />
    </>
  );
}
```

### S16. Sitemap — `src/app/sitemap.ts` (reemplazo completo)

```ts
import type { MetadataRoute } from "next";
import { SITE_URL, SERVICE_PATHS } from "@/seo/site";
import { CASE_STUDIES } from "@/content/casos";
import { TEAM_PROFILES } from "@/content/equipo";
import { ARTICLES } from "@/content/recursos";

/** Home + servicios + hubs y páginas de contenido publicadas.
 *  Un hub solo entra cuando su registro tiene contenido, así cada
 *  fase (casos → equipo → recursos) es desplegable por separado. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...SERVICE_PATHS.map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];

  if (CASE_STUDIES.length) {
    entries.push({ url: `${SITE_URL}/casos`, lastModified: now, changeFrequency: "monthly", priority: 0.6 });
    entries.push(...CASE_STUDIES.map((c) => ({
      url: `${SITE_URL}/casos/${c.slug}`,
      lastModified: new Date(c.publishDate),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })));
  }

  if (TEAM_PROFILES.length) {
    entries.push({ url: `${SITE_URL}/equipo`, lastModified: now, changeFrequency: "yearly", priority: 0.5 });
    entries.push(...TEAM_PROFILES.map((p) => ({
      url: `${SITE_URL}/equipo/${p.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })));
  }

  if (ARTICLES.length) {
    entries.push({ url: `${SITE_URL}/recursos`, lastModified: now, changeFrequency: "weekly", priority: 0.6 });
    entries.push(...ARTICLES.map((a) => ({
      url: `${SITE_URL}/recursos/${a.slug}`,
      lastModified: new Date(a.modifiedDate),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })));
  }

  return entries;
}
```

### S17. Interlinking desde lo existente

**a) Plantilla de servicio → caso** (`src/components/ServicePageTemplate.tsx`):

En la interfaz:
- De: `caseStudy: { name: string; text: string; metric: string; url: string } | null;`
- A: `caseStudy: { name: string; text: string; metric: string; url: string; casePath?: string } | null;`

En el bloque "CASO REAL", junto al enlace externo existente (`{common.caseLinkLab}`), añadir antes de él:

```tsx
{copy.caseStudy.casePath && (
  <Link
    href={copy.caseStudy.casePath}
    className="inline-flex flex-shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#071540] transition-colors hover:bg-white/90"
  >
    Leer el caso completo →
  </Link>
)}
```

(importar `Link` de `next/link`; envolver ambos botones en el contenedor flex existente).

**b) `casePath` en el copy** — `src/locales/es.json`, añadir el campo dentro de `caseStudy` de cada página:

| Bloque | casePath |
|---|---|
| `servicePages.ecommerce.caseStudy` | `/casos/salcedo-jewels` |
| `servicePages.mvp.caseStudy` | `/casos/veltrixnfc` |
| `servicePages.web.caseStudy` | `/casos/ccc-impresiones` |
| `servicePages.seo.caseStudy` | `/casos/ccc-impresiones` |
| `servicePages.transformacion.caseStudy` | `/casos/salcedo-jewels` |

(`inteligenciaArtificial.caseStudy` y `cmms.caseStudy` son `null` — sin cambio.)

**c) Vista bespoke de software a medida** — `src/views/CustomSoftware.tsx`: en la sección de métricas (la tarjeta "80% — Menos tiempo operativo en Salcedo Jewels"), añadir debajo del texto un enlace `Leer el caso completo →` a `/casos/salcedo-jewels`, y en la tarjeta de la UPC (“2 campus…”) uno a `/casos/inventario-upc`, con la clase `text-brand-gradient font-semibold hover:underline text-sm`.

**d) Portafolio del home → casos** — `src/lib/project-configs.ts`: añadir campo `caseSlug` a cada entrada (`salcedoJewels→"salcedo-jewels"`, `sistemaInventarioUPC→"inventario-upc"`, `cccImpresiones→"ccc-impresiones"`, `veltrixNfc→"veltrixnfc"`). En `src/components/ui/projects-carousel.tsx`, bajo la línea de `metrics`, añadir `<Link href={`/casos/${projects[currentProject].caseSlug}`} className="text-sm font-semibold text-brand-gradient hover:underline">Leer el caso completo →</Link>`. En `src/components/ui/interactive-selector.tsx`, en el overlay activo junto al botón de `ExternalLink`, añadir un `<Link>` equivalente con `pointer-events-auto`.

**e) Footer** — `src/components/Footer.tsx`: en la columna "Navegación", añadir al final de la lista tres `<li>` con `<Link>` de ruta real: `Casos → /casos`, `Recursos → /recursos`, `Equipo → /equipo`. *(Los tres hubs existen a partir de F1/F2/F3; añadir cada enlace en la fase que publica su hub.)*

**f) Navbar** — `src/components/Navbar.tsx`: tras los ítems de `NAV_LINKS` (que hacen scroll), añadir un ítem de ruta real en el `<ul>` desktop y en el menú móvil: `<Link href="/recursos" className={navItemClass}>Recursos</Link>` *(añadir en F3, cuando el hub exista)*.

### S18. llms.txt — `src/app/llms.txt/route.ts`

Importar los registros y añadir tras la sección `## Resultados comprobables`:

```ts
import { CASE_STUDIES } from "@/content/casos";
import { TEAM_PROFILES } from "@/content/equipo";
import { ARTICLES } from "@/content/recursos";
```

```ts
const casosBlock = CASE_STUDIES.length
  ? `\n## Casos de éxito (páginas completas)\n\n${CASE_STUDIES.map(
      (c) => `- **${c.client}** (${c.sector}): ${c.summary} → ${SITE_URL}/casos/${c.slug}`
    ).join("\n")}\n`
  : "";

const equipoBlock = TEAM_PROFILES.length
  ? `\n## Equipo\n\n${TEAM_PROFILES.map(
      (p) => `- **${p.name}** — ${p.role}: ${SITE_URL}/equipo/${p.slug}`
    ).join("\n")}\n`
  : "";

const recursosBlock = ARTICLES.length
  ? `\n## Recursos y guías\n\n${ARTICLES.map(
      (a) => `- ${a.title} → ${SITE_URL}/recursos/${a.slug}`
    ).join("\n")}\n`
  : "";
```

e interpolar `${casosBlock}${equipoBlock}${recursosBlock}` en el cuerpo, entre "Resultados comprobables" y "Preguntas frecuentes".

**Cierre de F1:** build + deploy. Sitemap esperado: **14 URLs** (9 + hub casos + 4 casos).

---

## FASE 2 — `/equipo`

### S19. Llenar `src/content/equipo.ts`

Con los **3 perfiles del anexo §2** (aprobados). Orden: Carlos, Sergio, Fabrizio.

### S20. Plantilla de perfil — `src/components/TeamProfileTemplate.tsx` (nuevo)

Mismo esqueleto que `CaseStudyTemplate` (Navbar/main/Footer/flotante). Secciones, en orden:

1. **Hero** (`pt-32 pb-16`): `<Breadcrumbs>`, foto (`next/image`, 160×160, `rounded-full`, borde `border-brand-gradient`), `<h1>` = `name` (`text-4xl md:text-5xl font-light text-[#071540]`), `<p>` cargo (`text-brand-gradient font-semibold`), `<p>` `bioIntro` (`text-lg font-light text-slate-700 max-w-2xl`), fila de botones: LinkedIn (estilo botón del `Team.tsx` actual) + `Solicitar diagnóstico` (ancla `#contacto` con `scrollToSection`).
2. **Bio** (`prose prose-slate max-w-3xl`): `bioParagraphs` — párrafos planos, sin animación de reveal.
3. **Especialidades**: chips de `knowsAbout` (pill `border border-[#0855FD]/25 text-brand-gradient text-sm px-4 py-1.5 rounded-full`).
4. **Casos en los que participó**: tarjetas de los casos resueltos (mismas cards del hub `/casos`, prop `cases: {client, sector, summary, slug}[]`).
5. **Artículos de {shortName}** (solo si `articles.length > 0`; F3 en adelante): lista de `{title, href}`.
6. `<Contact />`.

Props: `{ profile, breadcrumbs, cases, articles, labels }` — todo resuelto por el server page.

### S21. Rutas — `src/app/equipo/page.tsx` + `src/app/equipo/[slug]/page.tsx` (nuevos)

Mismo patrón exacto que S15:
- Hub: metadata del anexo §1 (tabla de hubs), grid de 3 tarjetas (foto, nombre, rol, `bioIntro`, botón `hub.profileCta` → `/equipo/{slug}`), breadcrumb 2 niveles + `buildBreadcrumbSchema`.
- Detalle: `generateStaticParams` sobre `TEAM_PROFILES`, `generateMetadata` → `campaignMetadata(p.seoTitle, p.seoDescription, \`/equipo/${p.slug}\`, { index: true })`, y `<JsonLd data={[buildPersonProfileSchema(p), buildBreadcrumbSchema(crumbs)]} />`. `cases` = `p.caseSlugs.map(findCase)`, `articles` = `ARTICLES.filter(a => a.authorSlug === p.slug)`.

### S22. Conexiones

**a) `Team.tsx` → perfiles** — `src/components/Team.tsx`:
1. `src/locales/es.json`, en cada objeto de `team.members`, añadir `"slug"`: `"carlos-colfer"`, `"sergio-herrera"`, `"fabrizio-bussalleu"` (mismo orden del array).
2. En `MemberCard`, junto al botón de LinkedIn existente, añadir:

```tsx
<Link
  href={`/equipo/${member.slug}`}
  className="mt-2 inline-flex items-center gap-2 rounded-lg border border-[#0855FD]/30 px-4 py-2 text-sm font-semibold text-brand-gradient transition-colors hover:bg-[#0855FD]/5"
>
  Ver perfil
</Link>
```

(añadir `slug: string` al tipo `Member`; importar `Link`).

**b) `founder` en Organization** — `src/seo/site.ts`, dentro de `buildOrganizationSchema()`, tras `sameAs`:

```ts
founder: TEAM_PROFILES.map((p) => ({
  "@type": "Person",
  "@id": personIdFor(p.slug),
  name: p.name,
  jobTitle: p.role,
  url: `${SITE_URL}/equipo/${p.slug}`,
  sameAs: [p.linkedin],
})),
```

con `import { TEAM_PROFILES } from "@/content/equipo";` al inicio. Los tres son cofundadores, así que los tres entran en `founder`.

**c) Footer**: añadir el enlace `Equipo → /equipo` (ver S17e).

**Cierre de F2:** build + deploy. Sitemap esperado: **18 URLs**.

---

## FASE 3 — `/recursos`

### S23. Archivos de artículo — `src/content/recursos/*.ts`

Un archivo por artículo (`cuanto-cuesta-software-a-medida-peru.ts`, etc.) exportando un `Article` con el **contenido exacto del anexo §4** (intro, sections con h2/paragraphs/list, faq, seo). `readMinutes`: palabras totales ÷ 200, redondeado. `index.ts` los importa y exporta `ARTICLES` en este orden de publicación:

- **Tanda 1** (deploy inicial de F3): **A1, A4, A5**.
- **Tanda 2** (~2 semanas después): añadir **A2, A3, A6** al registro (los archivos pueden crearse desde el inicio y sumarse a `ARTICLES` en la tanda 2).

Regla de integridad: los enlaces entre artículos viven dentro de su propia tanda (A1→A5 en la 1; A3→A6 en la 2), así ningún enlace apunta a una URL aún no publicada. Si se altera la composición de tandas, revisar primero los enlaces del anexo §5.

`publishDate`/`modifiedDate` = fecha real del deploy de su tanda.

### S24. Plantilla de artículo — `src/components/ArticleTemplate.tsx` (nuevo)

Mismo esqueleto (Navbar/main/Footer/flotante/Contact). Secciones:

1. **Header** (`pt-32 pb-10`, `max-w-3xl`): `<Breadcrumbs>`, `<h1>` = `title`, fila meta: `{labels.byline} <Link href={authorHref}>{authorName}</Link>, {authorRole}` · `{labels.publishedOn} {fecha legible}` · `{readMinutes} {labels.minRead}`. La fecha visible DEBE ser la misma `publishDate` del schema.
2. **Cuerpo** (`prose prose-slate prose-lg max-w-3xl`): `intro` (párrafos con `<RichText>`), luego cada sección: `<h2>{s.h2}</h2>`, párrafos con `<RichText>`, y si `s.list`, `<ul>` con `<RichText>` por ítem. **Sin animaciones de reveal en el cuerpo.**
3. **FAQ**: reutilizar el patrón de acordeón accesible de `ServicePageTemplate` (`aria-expanded`/`aria-controls`, chevron en círculo) sobre `article.faq`.
4. **CTA final**: caja `rounded-2xl border border-[#0855FD]/25 bg-[#F0F4FF] p-8 text-center` con texto puente («¿Quieres saber qué aplica a tu negocio?») y botón `article.ctaText` → `#contacto`.
5. **Caso relacionado** (si `caseSlug`): tarjeta compacta (client, summary, link `/casos/{slug}`).
6. `<Contact />`.

Props: `{ article, breadcrumbs, author: {name, role, href}, relatedCase, labels }`.

### S25. Rutas — `src/app/recursos/page.tsx` + `src/app/recursos/[slug]/page.tsx` (nuevos)

Patrón idéntico a S15/S21:
- Hub: metadata del anexo §1; lista de tarjetas (title, seoDescription, byline con autor, fecha, `hub.readArticle` →). Orden: `ARTICLES` descendente por `publishDate`.
- Detalle: `generateStaticParams` sobre `ARTICLES`; `generateMetadata` con `campaignMetadata(a.seoTitle, a.seoDescription, \`/recursos/${a.slug}\`, { index: true })`; JSON-LD: `[buildArticleSchema(a, findProfile(a.authorSlug)), buildFaqSchema(a.faq), buildBreadcrumbSchema(crumbs)]`.

### S26. Bloque "Guías relacionadas" en páginas de servicio

**a)** `src/components/ServicePageTemplate.tsx` — interfaz:
- De: `faq: { q: string; a: string }[];`
- A: `faq: { q: string; a: string }[];` + nueva línea `related?: { label: string; href: string }[];`

Antes de `<Contact />`, añadir:

```tsx
{copy.related && copy.related.length > 0 && (
  <section aria-labelledby="related-heading" className="py-14">
    <div className="container mx-auto max-w-3xl px-6 text-center">
      <h2 id="related-heading" className="mb-6 text-xl font-bold text-[#071540]">
        Guías relacionadas
      </h2>
      <div className="flex flex-col items-center gap-3">
        {copy.related.map((r) => (
          <Link key={r.href} href={r.href} className="text-base font-semibold text-brand-gradient hover:underline">
            {r.label} →
          </Link>
        ))}
      </div>
    </div>
  </section>
)}
```

**b)** `src/locales/es.json` — añadir `related` a cada bloque de página de servicio:

| Bloque | related |
|---|---|
| `customSoftware` *(pasar por su page.tsx bespoke — ver nota)* | `[{ "label": "¿Cuánto cuesta un software a medida en Perú?", "href": "/recursos/cuanto-cuesta-software-a-medida-peru" }]` |
| `servicePages.ecommerce` | `[{ "label": "Shopify, WooCommerce o tienda a medida", "href": "/recursos/shopify-woocommerce-o-tienda-a-medida" }]` |
| `inteligenciaArtificial` | `[{ "label": "7 procesos que ya puedes automatizar con IA", "href": "/recursos/automatizar-procesos-con-ia" }]` |
| `servicePages.mvp` | `[{ "label": "Cómo validar tu idea de negocio con un MVP", "href": "/recursos/como-validar-una-idea-de-negocio-mvp" }]` |
| `servicePages.web` | `[{ "label": "¿Cuánto cuesta una página web en Perú?", "href": "/recursos/cuanto-cuesta-una-pagina-web-peru" }]` |
| `servicePages.seo` | `[{ "label": "¿Cuánto cuesta una página web en Perú?", "href": "/recursos/cuanto-cuesta-una-pagina-web-peru" }]` |
| `servicePages.transformacion` | `[{ "label": "Transformación digital para pymes: por dónde empezar", "href": "/recursos/transformacion-digital-pymes-por-donde-empezar" }]` |
| `cmms` | `[{ "label": "Transformación digital para pymes: por dónde empezar", "href": "/recursos/transformacion-digital-pymes-por-donde-empezar" }]` |

*Nota:* `/desarrollo-software-medida` usa la vista bespoke `CustomSoftware.tsx` (no la plantilla): añadir ahí una sección equivalente con el mismo markup antes de `<Contact />`. `/implementacion-cmms` y `/inteligencia-artificial` sí usan la plantilla (pasar `related` en el objeto `copy` de sus `page.tsx`).

**c)** Navbar y footer: activar los enlaces `Recursos` (S17e/S17f).

**Cierre de F3 tanda 2:** sitemap esperado: **25 URLs**.

---

## FASE 4 — Ajustes on-page a páginas existentes

### S27. Tres titles/descriptions ganan "en Perú" — `src/locales/es.json`

**a)** `customSoftware.seo`:
- De: `"title": "Desarrollo de Software a Medida | Elaris Digital Solutions"`
- A: `"title": "Desarrollo de Software a Medida en Perú | Elaris Digital Solutions"`
- De: `"description": "Desarrollamos plataformas de software a medida para empresas que necesitan escalar. Automatización, integraciones y arquitectura lista para crecer."`
- A: `"description": "Desarrollamos software a medida en Perú para empresas que necesitan escalar: automatización, integraciones y arquitectura lista para crecer. El código es 100% tuyo."`

**b)** `servicePages.ecommerce.seo`:
- De: `"title": "Desarrollo de Tiendas Online (E-commerce) | Elaris Digital Solutions"`
- A: `"title": "Desarrollo de E-commerce y Tiendas Online en Perú | Elaris Digital Solutions"`
- De: `"description": "Tiendas online a medida con inventario, pagos y pedidos integrados. Hasta 80% menos tiempo operativo y ventas todo el año, como Salcedo Jewels."`
- A: `"description": "Tiendas online a medida en Perú con inventario, pagos y pedidos integrados. Hasta 80% menos tiempo operativo y ventas todo el año, como Salcedo Jewels."`

**c)** `servicePages.seo.seo`:
- De: `"title": "Posicionamiento SEO para Empresas | Elaris Digital Solutions"`
- A: `"title": "Posicionamiento SEO para Empresas en Perú | Elaris Digital Solutions"`
- De: `"description": "Que te encuentren en Google cuando buscan lo que vendes. SEO técnico y de contenido con resultados medibles — sin promesas mágicas."`
- A: `"description": "Posicionamiento SEO para empresas en Perú: que te encuentren en Google cuando buscan lo que vendes. Técnica y contenido con resultados medibles — sin promesas mágicas."`

---

## FASE 5 — Off-site y post-deploy (manual, sin código)

### S28. Google

1. **GSC:** reenviar `https://elarisdigitalsolutions.com/sitemap.xml` tras cada fase desplegada; con Inspección de URLs, **solicitar indexación** de `/casos`, `/equipo`, `/recursos` y cada artículo al publicarse (acelera semanas en dominios jóvenes).
2. **GA4:** verificar en Realtime/DebugView `page_view` + los 3 eventos; marcar key events (S01.7).

### S29. Checklist off-site (responsable sugerido: Sergio)

Ejecutar el §7 del [plan-seo-organico.md](plan-seo-organico.md): GBP → directorios (Clutch/GoodFirms/DesignRush) → perfiles corporativos → playbook LinkedIn de los 3 miembros (cada uno añade `elarisdigitalsolutions.com/equipo/[su-slug]` a su perfil y vincula su cargo a la company page; al publicarse su artículo, lo comparte). Wikidata: posponer.

---

## Checklist de verificación final

**Por fase (build):**
- [x] `npm run build` pasa; las rutas nuevas aparecen en el output (`/casos/[slug]` con ● SSG, etc.).
- [x] Sitemap: F1 = 14 URLs · F2 = 18 · F3 tanda 2 = **25**.
- [x] Las páginas nuevas responden `robots: index, follow`; `/apis-personalizadas`, `/impulsa-tu-negocio`, `/meet` y legales siguen noindex.

**Schema (Rich Results Test de Google, una URL por plantilla):**
- [x] `/equipo/fabrizio-bussalleu` → ProfilePage/Person sin errores; `worksFor` resuelve al `@id` de Organization.
- [x] `/recursos/cuanto-cuesta-software-a-medida-peru` → BlogPosting + FAQPage; `author.url` apunta al perfil.
- [x] `/casos/salcedo-jewels` → Article + BreadcrumbList.
- [x] Home → Organization ahora con `@id` y `founder` (F2+).

**Contenido y UX:**
- [x] Breadcrumb visible = JSON-LD en cada página nueva.
- [x] Fechas visibles de artículos = `datePublished` del schema.
- [x] Todos los enlaces internos del anexo resuelven (cero 404): probar los 13 listados en anexo §5.
- [x] Cuerpos de artículo/bio/caso legibles sin JS (ver HTML fuente: el texto está en el HTML inicial, nunca en `opacity:0`).
- [x] Sin overflow horizontal a 375px en las 3 plantillas nuevas.
- [ ] Lighthouse SEO ≥ 95 en una URL por plantilla.

**Medición:**
- [ ] GA4 DebugView: `page_view` en navegación SPA (una sola vez por ruta), `generate_lead`, `meet_click`, `whatsapp_click`.
- [ ] Meta Pixel sin regresión (los eventos Lead/Contact/ViewContent siguen disparando).

**Único pendiente externo (no bloquea nada):** los testimonios de UPC, CCC y Veltrix siguen sin aprobación del cliente, así que esos tres casos publican con `quote: null`. Cuando lleguen, se añaden al registro y aparecen solos — la plantilla ya contempla el campo.
