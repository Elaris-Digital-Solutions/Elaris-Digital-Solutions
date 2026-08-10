/**
 * Registro único de servicios.
 *
 * Antes existían TRES copias de los mismos hrefs, sincronizadas a mano:
 * `SERVICE_PATHS` en `src/seo/site.ts`, `services.items` en `es.json` y
 * `footer.sections.services.items` en `es.json`. La deriva ya había ocurrido
 * —el mismo servicio se llamaba «CMMS · Mantenimiento» en la navbar y
 * «CMMS (mantenimiento)» en el footer— así que esto no es prevención, es
 * reparación.
 *
 * Cada servicio tiene UN solo nombre, el mismo en la tarjeta, la navbar, el
 * footer y las migas de pan. Tener un título comercial distinto del de
 * navegación reintroduce exactamente el problema que este archivo resuelve.
 *
 * Vive en `src/content/` y no en `es.json` porque `resolveJsonModule` ensancha
 * cada cadena a `string`: de un import JSON no se puede derivar una unión
 * literal, y esa unión es justo el mecanismo que hace que un enlace roto en
 * `casos.ts` o en un artículo falle al compilar en vez de renderizar un 404.
 *
 * Tampoco en `src/seo/site.ts`, que importa `es.json` y `TEAM_PROFILES`: la
 * navbar, el footer y la grilla son `"use client"` e importar desde ahí
 * arrastraría ese grafo al bundle del navegador.
 *
 * NOTA sobre la regla de `./types.ts`: ese archivo pide que el contenido se
 * importe solo desde componentes de servidor. Este módulo es la excepción
 * deliberada. Pesa ~1,5 KB y *reduce* el bundle del cliente en vez de
 * aumentarlo, porque sustituye a dos bloques de `es.json` —`services.items` y
 * la copia del footer— que hoy viajan al navegador en todas las páginas.
 */

/** Nombres de icono. El mapa nombre → componente vive en la grilla, para no
 *  arrastrar `lucide-react` hasta el sitemap. */
export type ServiceIconName =
  | "Globe"
  | "ShoppingCart"
  | "Search"
  | "Rocket"
  | "Code2"
  | "Sparkles"
  | "Wrench"
  | "RefreshCw";

export type ServiceGroupId = "vender" | "operar";

/**
 * `primary` — tarjeta en la grilla comercial de la home.
 * `secondary` — servicio de apoyo: sigue indexado, en el sitemap, en la navbar
 * y en el footer, pero fuera del conjunto de decisión principal del comprador.
 *
 * La degradación es de presentación, no de URL. Las páginas secundarias
 * conservan su ruta y su autoridad: retirarlas costaría todo el riesgo SEO sin
 * aportar nada de la claridad comercial, que vive en las etiquetas y en el
 * número de tarjetas.
 */
export type ServiceTier = "primary" | "secondary";

type AbsolutePath = `/${string}`;

interface ServiceEntry {
  key: string;
  /** Ruta canónica. Fuente única para sitemap, enlazado y `@id` de schema. */
  path: AbsolutePath;
  /** Nombre del servicio. El mismo en todas las superficies. */
  label: string;
  benefit: string;
  group: ServiceGroupId;
  tier: ServiceTier;
  icon: ServiceIconName;
  /** Rutas retiradas que redirigen aquí. Documenta el 308 y evita colisiones. */
  aliases?: readonly AbsolutePath[];
}

export const SERVICES = [
  {
    key: "web",
    path: "/desarrollo-web",
    label: "Páginas web y landing pages",
    benefit: "Una página que vende, no un folleto digital.",
    group: "vender",
    tier: "primary",
    icon: "Globe",
  },
  {
    key: "ecommerce",
    path: "/e-commerce",
    label: "Tiendas e-commerce",
    benefit: "Tu tienda vendiendo 24/7, con inventario y pagos integrados.",
    group: "vender",
    tier: "primary",
    icon: "ShoppingCart",
  },
  {
    key: "mvp",
    path: "/desarrollo-mvp",
    label: "Plataformas y MVPs web",
    // El beneficio explica «MVP» sin obligar a conocer la sigla: la definición
    // completa vive en la página, pero en la home tiene que entenderse solo.
    benefit: "La primera versión real de tu idea, funcionando y en manos de usuarios.",
    group: "vender",
    tier: "primary",
    icon: "Rocket",
  },
  {
    key: "seo",
    path: "/posicionamiento-seo",
    label: "Posicionamiento SEO",
    benefit: "Que te encuentren en Google cuando buscan lo que vendes.",
    group: "vender",
    // Deja de ser tarjeta: se vende dentro de web y e-commerce, y se mantiene
    // como servicio continuo aparte. La página sigue viva e indexada.
    tier: "secondary",
    icon: "Search",
  },
  {
    key: "software",
    path: "/desarrollo-software-medida",
    label: "Software a medida y portales",
    benefit: "Sistemas que se adaptan a tu operación, no al revés.",
    group: "operar",
    tier: "primary",
    icon: "Code2",
  },
  {
    key: "ia",
    path: "/inteligencia-artificial",
    label: "Automatización e IA",
    benefit: "Automatiza las tareas repetitivas que consumen a tu equipo.",
    group: "operar",
    tier: "primary",
    icon: "Sparkles",
    // El servicio se llamaba «implementación de LLMs»; la URL vieja conserva
    // su autoridad vía el 308 declarado en `src/seo/redirects.mjs`.
    aliases: ["/implementacion-llms"],
  },
  {
    key: "cmms",
    path: "/implementacion-cmms",
    // Las palabras llanas primero y la sigla entre paréntesis: en la home y el
    // footer aparece en todas las páginas, donde nadie ha leído todavía la
    // definición que sí está en /implementacion-cmms.
    label: "Software de mantenimiento (CMMS)",
    benefit: "Digitaliza el mantenimiento y reduce paradas de planta.",
    group: "operar",
    tier: "primary",
    icon: "Wrench",
  },
  {
    key: "transformacion",
    path: "/transformacion-digital",
    label: "Transformación digital",
    benefit: "Del papel y el Excel a una operación digital ordenada.",
    group: "operar",
    // Deja de competir como par con los otros tres: pasa a ser la página
    // paraguas del grupo, enlazada desde su encabezado.
    tier: "secondary",
    icon: "RefreshCw",
  },
] as const satisfies readonly ServiceEntry[];

export type Service = (typeof SERVICES)[number];
export type ServiceKey = Service["key"];
/** Unión literal de rutas. Tipar un campo con esto convierte un enlace roto
 *  en un error de compilación. */
export type ServicePath = Service["path"];

export const SERVICE_PATHS: readonly ServicePath[] = SERVICES.map((s) => s.path);

export const SERVICE_GROUPS: readonly {
  id: ServiceGroupId;
  label: string;
  /** Página que da nombre y sentido al grupo entero, si la hay. */
  umbrellaPath?: ServicePath;
}[] = [
  { id: "vender", label: "Para vender más" },
  {
    id: "operar",
    label: "Para operar mejor",
    umbrellaPath: "/transformacion-digital",
  },
];

/** Introduce el enlace a la página paraguas bajo las tarjetas de un grupo. */
export const UMBRELLA_INTRO = "Todo junto:";

/** Introduce la tira de servicios secundarios bajo las tarjetas de un grupo. */
export const SECONDARY_INTRO = "Y como servicio continuo:";

export const servicesInGroup = (group: ServiceGroupId, tier?: ServiceTier) =>
  SERVICES.filter((s) => s.group === group && (!tier || s.tier === tier));

export const servicesByTier = (tier: ServiceTier) =>
  SERVICES.filter((s) => s.tier === tier);

/**
 * Total: lanza si la ruta no existe. Los consumidores que reciben una
 * `ServicePath` ya vienen validados por el compilador, así que este throw solo
 * salta si alguien fuerza un cast — y entonces conviene que rompa el build.
 */
export const findService = (path: ServicePath): Service => {
  const service = SERVICES.find((s) => s.path === path);
  if (!service) {
    throw new Error(
      `[services] Ruta de servicio desconocida: "${path}". Añádela a SERVICES en src/content/services.ts.`
    );
  }
  return service;
};
