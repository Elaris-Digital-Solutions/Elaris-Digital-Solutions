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
- JSON-LD (Organization, WebSite, Service, CreativeWork, Review, FAQPage) renderizado en el HTML inicial — ver `src/seo/site.ts` y `src/components/JsonLd.tsx`.
- `robots.txt` y `sitemap.xml` dinámicos (`src/app/robots.ts`, `src/app/sitemap.ts`).
- Solo la home se indexa; las landings de campaña/servicio y legales son `noindex, follow`.
- Contexto para LLMs en `public/llms.txt` y `public/llms-full.txt`.

## Variables de entorno

- `META_ACCESS_TOKEN` — token de la Conversions API de Meta (requerido por `/api/meta-event`).
