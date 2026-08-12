/**
 * Tabla de redirecciones permanentes.
 *
 * Vive en `.mjs` y no en `.ts` porque `next.config.mjs` no puede importar
 * TypeScript. Al revés sí funciona (`allowJs: true` en tsconfig), así que
 * `src/content/link-integrity.ts` la importa para comprobar en cada build que
 * ningún `destination` apunta a una ruta muerta y que ningún `source` pisa una
 * ruta viva —que convertiría la página real en inalcanzable—.
 *
 * OJO: `permanent: true` emite **308**, no 301. Google los trata igual a
 * efectos de autoridad, pero el navegador cachea el 308 de forma mucho más
 * agresiva: una redirección publicada es, en la práctica, irreversible.
 *
 * @type {{ source: string, destination: string, permanent: boolean }[]}
 */
export const REDIRECTS = [
  { source: "/index.html", destination: "/", permanent: true },
  { source: "/es", destination: "/", permanent: true },
  { source: "/en", destination: "/", permanent: true },
  {
    source: "/es/terminos-condiciones",
    destination: "/terminos-condiciones",
    permanent: true,
  },
  {
    source: "/es/politicas-de-datos",
    destination: "/politicas-de-datos",
    permanent: true,
  },
  // El servicio pasó de llamarse "implementación de LLMs" a "Inteligencia
  // Artificial" (lenguaje entendible). La URL vieja conserva su autoridad.
  // Declarado también como `aliases` en src/content/services.ts.
  {
    source: "/implementacion-llms",
    destination: "/inteligencia-artificial",
    permanent: true,
  },
];
