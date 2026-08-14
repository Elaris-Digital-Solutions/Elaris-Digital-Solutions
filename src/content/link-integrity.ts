/**
 * Verificación de enlaces internos en tiempo de build.
 *
 * Los campos estructurados (`servicePaths`, `servicePath`) ya los cubre el
 * compilador desde que están tipados contra el registro de servicios. Lo que
 * el compilador no puede ver son las rutas escondidas dentro de la prosa
 * —`[texto](/ruta)` en los párrafos de los artículos— y las de `es.json`, que
 * al venir de un import JSON son `string` a secas.
 *
 * Esta comprobación recorre TODO en vez de mirar una lista de campos conocidos:
 * cualquier clave `href`/`casePath`/`path` con valor de ruta, y cualquier
 * enlace markdown dentro de cualquier cadena. Así un enlace nuevo en un sitio
 * nuevo queda cubierto sin tener que acordarse de ampliar el verificador.
 *
 * Se invoca desde `src/app/sitemap.ts`, que es server-only, siempre se ejecuta
 * durante `next build` y ya importa los tres registros.
 */

import es from "@/locales/es.json";
import { extractInternalLinks, normalizeRoute } from "@/lib/internal-links";
import { REDIRECTS } from "@/seo/redirects.mjs";
import { SERVICE_PATHS } from "./services";
import { SERVICE_COPY } from "./service-copy";
import { CASE_STUDIES } from "./casos";
import { TEAM_PROFILES } from "./equipo";
import { ARTICLES } from "./recursos";

type Finding = { where: string; href: string };

/** Claves cuyo valor es una ruta, no prosa que pueda contener enlaces. */
const ROUTE_KEYS = new Set(["href", "casePath", "path"]);

/** Rutas servidas por `public/`, fuera del enrutador. */
const NON_ROUTE_PREFIXES = ["/assets/", "/api/"];

const isCheckable = (href: string) =>
  href.startsWith("/") && !NON_ROUTE_PREFIXES.some((p) => href.startsWith(p));

function walk(value: unknown, where: string, out: Finding[]): void {
  if (typeof value === "string") {
    for (const href of extractInternalLinks(value)) {
      out.push({ where, href });
    }
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => walk(item, `${where}[${index}]`, out));
    return;
  }

  if (value && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) {
      const path = `${where}.${key}`;
      if (typeof child === "string" && ROUTE_KEYS.has(key)) {
        if (child.startsWith("/")) out.push({ where: path, href: child });
        continue;
      }
      walk(child, path, out);
    }
  }
}

function knownRoutes(): Set<string> {
  return new Set<string>([
    "/",
    "/servicios",
    ...SERVICE_PATHS,
    "/casos",
    ...CASE_STUDIES.map((study) => `/casos/${study.slug}`),
    "/equipo",
    ...TEAM_PROFILES.map((profile) => `/equipo/${profile.slug}`),
    "/recursos",
    ...ARTICLES.map((article) => `/recursos/${article.slug}`),
    // Existen y se enlazan, aunque sean noindex.
    "/apis-personalizadas",
    "/impulsa-tu-negocio",
    "/meet",
    "/terminos-condiciones",
    "/politicas-de-datos",
  ]);
}

/**
 * Lanza si algún enlace interno apunta a una ruta que no existe, si una
 * redirección apunta a una ruta muerta o si su origen pisa una ruta viva.
 * Acumula todos los problemas antes de fallar: arreglarlos de uno en uno a
 * base de builds de tres minutos no es forma de trabajar.
 */
export function assertInternalLinksResolve(): void {
  const routes = knownRoutes();
  const problems: string[] = [];

  // Se recorre entrada por entrada, con el slug como raíz de la ruta del
  // error: "recursos/mi-articulo.sections[1].paragraphs[4]" localiza el fallo
  // sin tener que contar posiciones en un array.
  const found: Finding[] = [];
  walk(es, "es.json", found);
  // El copy de las páginas de servicio salió de es.json para no viajar en el
  // bundle del cliente, pero sus `related[].href` y `caseStudy.casePath` se
  // siguen verificando igual.
  walk(SERVICE_COPY, "service-copy", found);
  ARTICLES.forEach((article) => walk(article, `recursos/${article.slug}`, found));
  CASE_STUDIES.forEach((study) => walk(study, `casos/${study.slug}`, found));
  TEAM_PROFILES.forEach((profile) => walk(profile, `equipo/${profile.slug}`, found));

  for (const { where, href } of found) {
    if (!isCheckable(href)) continue;
    if (!routes.has(normalizeRoute(href))) {
      problems.push(`enlace roto  ${where} → "${href}"`);
    }
  }

  // Referencias cruzadas entre registros: son slugs sueltos, no rutas, así que
  // el recorrido de arriba no las ve.
  const caseSlugs = new Set(CASE_STUDIES.map((c) => c.slug));
  const articleSlugs = new Set(ARTICLES.map((a) => a.slug));
  const profileSlugs = new Set(TEAM_PROFILES.map((p) => p.slug));

  for (const article of ARTICLES) {
    if (article.caseSlug && !caseSlugs.has(article.caseSlug)) {
      problems.push(`caso inexistente  recursos/${article.slug}.caseSlug → "${article.caseSlug}"`);
    }
    if (!profileSlugs.has(article.authorSlug)) {
      problems.push(`autor inexistente  recursos/${article.slug}.authorSlug → "${article.authorSlug}"`);
    }
  }
  for (const study of CASE_STUDIES) {
    for (const slug of study.relatedArticleSlugs) {
      if (!articleSlugs.has(slug)) {
        problems.push(`artículo inexistente  casos/${study.slug}.relatedArticleSlugs → "${slug}"`);
      }
    }
  }
  for (const profile of TEAM_PROFILES) {
    for (const slug of profile.caseSlugs) {
      if (!caseSlugs.has(slug)) {
        problems.push(`caso inexistente  equipo/${profile.slug}.caseSlugs → "${slug}"`);
      }
    }
  }

  for (const { source, destination } of REDIRECTS) {
    if (isCheckable(destination) && !routes.has(normalizeRoute(destination))) {
      problems.push(`redirección a ruta muerta  "${source}" → "${destination}"`);
    }
    if (routes.has(normalizeRoute(source))) {
      problems.push(`redirección pisa una ruta viva  "${source}" (la página real quedaría inalcanzable)`);
    }
  }

  if (problems.length > 0) {
    throw new Error(
      `[link-integrity] ${problems.length} enlace(s) interno(s) sin destino:\n` +
        problems.map((p) => `  · ${p}`).join("\n") +
        `\n\nSi la ruta es nueva, añádela al registro correspondiente en src/content/.`
    );
  }
}
