# Elaris Digital Solutions — Landing

Sitio corporativo de **Elaris Digital Solutions** (ELARIS S.A.C.S).

🔗 Producción: https://elarisdigitalsolutions.com/

## Stack

- **Next.js 14** (App Router) — renderizado en servidor / generación estática, listo para SEO y agentes de IA.
- **React 18** + **TypeScript**
- **Tailwind CSS** + shadcn/ui
- **Framer Motion** y **GSAP** para animaciones
- **Meta Pixel** + **Conversions API** (`/api/meta-event`)
- Despliegue en **Netlify** (`@netlify/plugin-nextjs`)

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:8080
npm run build    # build de producción
npm start        # servir el build
```

## SEO / Agentic-readiness

- Metadata por ruta vía la API de Metadata de Next (`src/app/**/page.tsx`).
- JSON-LD (Organization, WebSite, Service, BreadcrumbList, ProfilePage, BlogPosting, Article, FAQPage) renderizado en el HTML inicial — ver `src/seo/site.ts` y `src/components/JsonLd.tsx`.
- `robots.txt`, `sitemap.xml` y `llms.txt` generados en build (`src/app/robots.txt/`, `src/app/sitemap.ts`, `src/app/llms.txt/`).
- Se indexan la home, `/servicios`, las páginas de servicio y los hubs de contenido; la landing de pauta, la página de apoyo y las legales son `noindex, follow`.
- Los servicios tienen una fuente única tipada en `src/content/services.ts`; `src/content/link-integrity.ts` verifica en cada build que todo enlace interno resuelve.

## Variables de entorno

- `META_ACCESS_TOKEN` — token de la Conversions API de Meta (requerido por `/api/meta-event`).
