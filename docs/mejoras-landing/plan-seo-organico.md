# Plan SEO orgánico — Elaris Digital Solutions

**Fecha:** 2026-08-03
**Objetivo:** posicionamiento en Google y generación de leads con tráfico orgánico. Incluye la tarea complementaria de páginas personales para los 3 miembros del equipo (búsquedas por nombre).
**Documentos hermanos:**
- [documento-de-cambios-seo.md](documento-de-cambios-seo.md) — instrucciones accionables S01–S30 (el implementador trabaja SOLO con ese documento y el anexo).
- [contenido-seo.md](contenido-seo.md) — anexo con el copy íntegro: 6 artículos redactados, 3 bios, 4 casos y hubs.

Este plan es autosuficiente: no requiere consultar la auditoría original ni los planes anteriores.

---

## 0. Objetivos y KPIs

**Situación de partida (verificada en el código el 2026-08-03):**
- 9 URLs indexables (home + 8 servicios) con schema completo (Organization con reviews, Service, FAQPage por página), robots.txt con Content-Signals, llms.txt curado, sitemap de 9 URLs, redirects 301 correctos.
- Google Search Console **ya verificado** (archivo `public/googlec09e8a72f8f7ed1d.html`).
- **Cero** GA4/GTM (solo Meta Pixel + Conversions API). **Cero** contenido informacional (sin blog). **Cero** páginas de caso. Equipo sin presencia indexable (tarjetas en home → LinkedIn externo).
- Dominio joven (empresa fundada 2026-03): sin autoridad acumulada.

**KPIs (medibles en GSC + GA4 tras implementar la Fase 0):**

| Horizonte | Meta |
|---|---|
| 30 días | 25/25 URLs descubiertas e indexadas en GSC; eventos GA4 activos; 0 errores en Rich Results Test |
| 90 días | Página 1 para las búsquedas de los 3 nombres del equipo; impresiones crecientes en las 6 keywords de artículos; primeros `generate_lead` con `source/medium = google/organic` |
| 180 días | ≥3 keywords no-branded en top-10; los artículos como páginas de entrada orgánica que derivan sesiones a páginas de servicio; leads orgánicos/mes como métrica reportada |

**Expectativas honestas (comunicar al negocio):** un dominio de 2026 tarda 3–6 meses en traccionar en queries informacionales; en búsquedas de nombre, LinkedIn seguirá apareciendo primero un tiempo — la meta realista es estar en la página 1 con la página propia, no desplazar a LinkedIn de inmediato. Los rich results de FAQ están restringidos por Google desde 2023 (se muestran poco), pero el markup sigue alimentando AEO/respuestas de IA, que es donde ya apunta el llms.txt del sitio.

---

## 1. Arquitectura: 16 URLs nuevas (sitemap 9 → 25)

| Sección | URLs |
|---|---|
| Equipo | `/equipo` + `/equipo/carlos-colfer` + `/equipo/sergio-herrera` + `/equipo/fabrizio-bussalleu` |
| Casos | `/casos` + `/casos/salcedo-jewels` + `/casos/inventario-upc` + `/casos/ccc-impresiones` + `/casos/veltrixnfc` |
| Recursos (blog) | `/recursos` + 6 artículos (slugs en §4) |

**Decisión estructural — registro tipado en `src/content/` + rutas dinámicas `[slug]`:**
todo el copy del sitio vive hoy en `src/locales/es.json` (~59 KB) que **se empaqueta en el bundle JS del cliente** de todas las páginas, porque lo importan componentes `"use client"`. Meter 6 artículos de 1.200–1.800 palabras ahí añadiría ~70 KB que cada visitante descargaría en cada página sin beneficio. En su lugar:

- **Entidades de contenido** (bios, casos, artículos) → `src/content/{equipo,casos,recursos}/*.ts`, importadas **solo** por los `page.tsx` server: el contenido llega como HTML renderizado (lo que el crawler necesita) sin tocar el bundle cliente.
- **Microcopy de UI** (headings de hub, labels, breadcrumb "Inicio") → sigue en `es.json` (respeta el patrón del sitio).
- Rutas `[slug]` con `generateStaticParams` + `dynamicParams = false`: SSG puro en build (idéntico a carpetas estáticas, soportado por Netlify), y la consistencia página↔sitemap↔hub↔schema es estructural — añadir el artículo 7 = añadir un archivo al registro; ruta, sitemap, hub y llms.txt se actualizan solos.
- 3 plantillas nuevas (`TeamProfileTemplate`, `CaseStudyTemplate`, `ArticleTemplate`) siguiendo el patrón existente de `ServicePageTemplate` (plantilla client que recibe la entidad como prop desde el page server). **Regla SEO:** el cuerpo de texto nunca arranca en `opacity: 0` (nada de reveal en el contenido principal; el hero sí puede animarse). Tipografía del cuerpo con `@tailwindcss/typography` (ya instalado como devDependency; solo falta registrarlo en `tailwind.config.ts`).

---

## 2. Estrategia de schema y E-E-A-T (grafo con `@id`)

El sitio ya emite Organization/WebSite/Service/FAQPage. Se convierte en un **grafo conectado**:

- `ORG_ID = https://elarisdigitalsolutions.com/#organization`. `buildOrganizationSchema` gana `@id` y `founder[]` con nodos Person compactos cuyo `@id` es `…/equipo/{slug}#person` — la misma entidad que la página de perfil describe en detalle. Service/Portfolio/WebSite pasan a referenciar `{ "@id": ORG_ID }` en vez de repetir el objeto.
- **Perfiles** → `ProfilePage` con `mainEntity` = Person completo (givenName/familyName, jobTitle, `worksFor: {"@id": ORG_ID}`, image, `sameAs` [LinkedIn], knowsAbout, description). Es el tipo que Google documenta para "esta página trata sobre esta persona" — la señal directa para las búsquedas por nombre.
- **Artículos** → `BlogPosting` con `author` = Person referenciada por `@id` a su página de `/equipo` y `url` al perfil. Este vínculo autor→página-de-autor es el mecanismo E-E-A-T documentado por Google: los artículos dan autoridad a los perfiles y los perfiles dan credibilidad a los artículos.
- **Casos** → `Article` (schema.org no tiene tipo CaseStudy) con `about` = Organization del cliente (nombre + URL viva) y `publisher/author` = `{"@id": ORG_ID}`. El `buildPortfolioSchema` del home gana `url` → `/casos/{slug}` en cada CreativeWork, conectando el schema existente con las páginas nuevas.
- **BreadcrumbList** (JSON-LD + breadcrumb visible con el mismo dato) en las 13 páginas de contenido y 3 hubs. No se añade a las páginas de servicio (profundidad 1, aporte nulo).

---

## 3. Mapa de keywords (Perú primario, LATAM secundario)

### Páginas existentes — solo 3 titles cambian (las demás ya están bien optimizadas)

| Página | KW primaria | KW secundarias | Cambio |
|---|---|---|---|
| `/` | software a medida perú (marca) | desarrollo de software empresas | ninguno |
| `/desarrollo-software-medida` | desarrollo de software a medida perú | empresa de desarrollo de software lima; cuánto cuesta un software a medida | 🔧 title+desc ganan "en Perú" |
| `/e-commerce` | desarrollo de tienda online perú | tienda virtual a medida; desarrollo ecommerce | 🔧 title+desc ganan "en Perú" |
| `/posicionamiento-seo` | posicionamiento seo perú | agencia seo lima; posicionamiento web en google | 🔧 title+desc ganan "en Perú" |
| `/desarrollo-web` | desarrollo web perú | páginas web para empresas | ninguno (ya lo tiene) |
| `/desarrollo-mvp` | desarrollo de mvp | crear mvp startup; validar producto digital | ninguno |
| `/inteligencia-artificial` | inteligencia artificial para empresas | automatizar procesos con ia | ninguno (queries de IA poco geo-modificadas) |
| `/implementacion-cmms` | implementación de cmms | software de mantenimiento industrial; cmms perú | ninguno |
| `/transformacion-digital` | transformación digital pymes | digitalizar procesos empresa | ninguno |

### Páginas nuevas

| Página | KW primaria | Intención |
|---|---|---|
| `/equipo` | equipo elaris digital solutions | Navegacional |
| `/equipo/carlos-colfer` | carlos alejandro colfer mendoza / carlos colfer elaris | Nombre |
| `/equipo/sergio-herrera` | sergio herrera jave / sergio herrera elaris | Nombre |
| `/equipo/fabrizio-bussalleu` | fabrizio bussalleu | Nombre |
| `/casos` | casos de éxito desarrollo de software | Comercial-prueba |
| `/casos/*` (4) | long-tail por vertical (e-commerce joyería, software universidades, digitalización imprenta, mvp startup) | Prueba |
| `/recursos` | recursos y guías de tecnología para empresas | Navegacional |
| artículos ×6 | ver §4 | Informacional-comercial |

Patrón de title de perfil: `"Nombre Completo — Cargo | Elaris Digital Solutions"`. H1 = nombre completo.

---

## 4. Plan editorial: los 6 artículos

Criterios de selección: intención comercial-informacional (quien busca esto está evaluando contratar), competencia abordable para un dominio joven, mapeo 1:1 con servicios distintos, y material propio real (los casos) como diferenciador frente a contenido genérico. `/posicionamiento-seo` y `/implementacion-cmms` no tienen artículo en esta tanda: reciben enlaces contextuales desde A5 y A6, y son candidatos del batch 2. Autor asignado por afinidad de rol (alimenta E-E-A-T).

| # | Título / slug | KW primaria | Enlaza a | Autor |
|---|---|---|---|---|
| A1 | ¿Cuánto cuesta desarrollar un software a medida en Perú? · `cuanto-cuesta-software-a-medida-peru` | cuánto cuesta un software a medida | /desarrollo-software-medida + /casos/salcedo-jewels | Carlos |
| A2 | Shopify, WooCommerce o tienda a medida · `shopify-woocommerce-o-tienda-a-medida` | shopify vs woocommerce perú | /e-commerce + /casos/salcedo-jewels | Fabrizio |
| A3 | 7 procesos que ya puedes automatizar con IA · `automatizar-procesos-con-ia` | automatizar procesos con ia | /inteligencia-artificial + /casos/salcedo-jewels | Fabrizio |
| A4 | Cómo validar tu idea de negocio con un MVP · `como-validar-una-idea-de-negocio-mvp` | qué es un mvp / validar idea de negocio | /desarrollo-mvp + /casos/veltrixnfc | Carlos |
| A5 | ¿Cuánto cuesta una página web en Perú? · `cuanto-cuesta-una-pagina-web-peru` | cuánto cuesta una página web en perú | /desarrollo-web (+/posicionamiento-seo) + /casos/ccc-impresiones | Sergio |
| A6 | Transformación digital para pymes: por dónde empezar · `transformacion-digital-pymes-por-donde-empezar` | transformación digital pymes | /transformacion-digital (+/implementacion-cmms) + /casos/ccc-impresiones | Sergio |

**Reglas editoriales comunes** (aplicadas ya en el anexo): 1.200–1.800 palabras; keyword en title, H1, primer párrafo y al menos un H2; FAQ visible de 3–4 preguntas (con `buildFaqSchema`); byline visible "Por [Nombre], [Cargo]" enlazando al perfil; fecha visible = `datePublished` del schema; CTA final "Solicitar diagnóstico"; tono del manual de marca (directo, tú, cero jerga sin explicar; "gratuito" solo donde se responde una pregunta de costo). **A1 y A5 publican rangos de mercado, nunca tarifas de Elaris** — coherente con la decisión previa de no publicar precios propios.

**Cadencia de publicación:** 2 tandas separadas ~2 semanas — un blog que nace con 6 posts el mismo día y luego calla parece abandonado; dos tandas + batch 2 futuro dibujan actividad. Composición: **Tanda 1 = A1, A4, A5** · **Tanda 2 = A2, A3, A6**. (A1 enlaza a A5 y A3 enlaza a A6: cada enlace entre artículos vive dentro de su misma tanda, así ninguno apunta a una URL aún no publicada.)

---

## 5. Interlinking (matriz)

| Desde | Hacia | Mecanismo |
|---|---|---|
| Páginas de servicio | su caso | tarjeta "Caso real" gana enlace interno "Lee el caso completo →" (campo `casePath`) junto al enlace externo actual |
| Páginas de servicio | su(s) artículo(s) | bloque nuevo "Guías relacionadas" antes del contacto (campo `related[]`) |
| Artículos | servicio (anchor comercial exacto) + caso + 1 artículo hermano | enlaces en el cuerpo (definidos en el anexo) |
| Casos | servicios aplicados + artículo relacionado | sección "Servicios aplicados" + cierre |
| Perfiles | casos en los que participó + sus artículos (automático por autor) | secciones de la plantilla |
| Home `Team` | `/equipo/[slug]` | botón "Ver perfil" junto al de LinkedIn (el home es la página con más autoridad) |
| Home `Portfolio` | `/casos/[slug]` | enlace interno por proyecto (hoy solo hay externos) |
| Footer (global) | `/casos`, `/recursos`, `/equipo` | columna de navegación — garantía de crawl-discovery |
| Navbar | `/recursos` | enlace de ruta real |
| llms.txt | las 3 secciones nuevas | bloques Equipo/Casos/Recursos |

---

## 6. Medición: GA4 desde cero + GSC

- **Alta GA4** (manual, pasos UI en el doc de cambios S01): cuenta → propiedad (GMT-5, PEN, objetivo "Generar clientes potenciales") → flujo web → Measurement ID. Desactivar el sub-toggle de "cambios de página según eventos del historial" del enhanced measurement (el tracker propio dispara los page_view de SPA; evita doble conteo).
- **Instalación por script manual** replicando el patrón `MetaPixelTracker` ya existente en `providers.tsx` (cero dependencias nuevas, timing controlado post-hidratación). `send_page_view:false` + page_view manual por pathname.
- **Eventos:** `generate_lead` (submit del formulario→WhatsApp), `meet_click` (botón Calendly), `whatsapp_click` (botón flotante), vía helper `src/lib/analytics.ts`. Los dos primeros se marcan como *key events* en GA4.
- **GSC:** vincular con GA4, reenviar sitemap tras el deploy, solicitar indexación manual de hubs y artículos (acelera semanas en dominios jóvenes).
- **Privacidad:** añadir mención de Google Analytics a `/politicas-de-datos`.
- Qué mirar a 30/90/180 días: ver KPIs de §0.

---

## 7. Off-site (checklist manual — hereda y actualiza `docs/geo-aeo-llmo-pendientes.md`)

Por orden de impacto/esfuerzo (responsable sugerido: Sergio, como en el backlog previo):

1. **Google Business Profile** — crear en business.google.com: nombre exacto "Elaris Digital Solutions"; categoría principal *Empresa de desarrollo de software* (secundarias: consultora informática, diseñador de sitios web); NAP idéntico al sitio (Jr. Jerónimo de Aliaga 595, Santiago de Surco / +51 973 663 807); descripción alineada al hero; los 8 servicios; fotos (logo, equipo). Tras verificar: pedir reseña a Milagros Salcedo (autorizada) y a Daniela; responder todas; 1 post/mes usando los artículos nuevos.
2. **Directorios:** Clutch (prioridad — su review verificada por entrevista pesa; proponer a Salcedo), GoodFirms, DesignRush. Mismo NAP y descripción base, enlace al sitio.
3. **Perfiles corporativos:** alinear bios y enlaces de LinkedIn company, Instagram, GitHub org y X con el posicionamiento actual (los 4 ya están en `sameAs`).
4. **Playbook LinkedIn de los 3 miembros** (refuerza las páginas de perfil):
   - Confirmar el nombre público exacto para el sitio (afecta title/H1/schema).
   - Añadir `elarisdigitalsolutions.com/equipo/[su-slug]` en Información de contacto y en Destacados.
   - Experiencia con el cargo vinculado a la **company page** de Elaris (no texto suelto) — cierra el circuito de entidad persona↔empresa que Google lee.
   - Al publicarse cada artículo: post desde el perfil del autor enlazándolo.
   - El `sameAs` del sitio → LinkedIn más el enlace LinkedIn → sitio forman la confirmación bidireccional de entidad.
5. **Wikidata:** sigue prematuro; revisar cuando existan 2–3 fichas de directorio activas y alguna mención de terceros.

---

## 8. Fases y gates de aprobación

**Todas las aprobaciones están cerradas (2026-08-03):** los tres miembros son cofundadores, las bios están aprobadas por sus titulares, los artículos tienen visto bueno editorial y los rangos de precio de A1/A5 están aprobados comercialmente. No quedan bloqueos; las fases se ejecutan en orden.

| Fase | Contenido |
|---|---|
| **F0** | GA4 completo (alta + código + eventos) |
| **F1** | Infraestructura de contenido + `/casos` (hub + 4) + schema graph + interlinking base |
| **F2** | `/equipo` (hub + 3 perfiles) + `founder` en Organization + links desde el home |
| **F3** | `/recursos` + 6 artículos (2 tandas) |
| **F4** | Ajustes a páginas existentes (3 titles/descriptions, bloques `related`, `casePath`) |
| **F5** | Off-site (paralela a todo, no-código) — ver [documento-de-cambios-offsite.md](documento-de-cambios-offsite.md) |

**Nota sobre los nombres publicados:** el nombre completo va en title, H1 y schema porque desambigua frente a homónimos (`Carlos Alejandro Colfer Mendoza`, `Sergio Herrera Jave`, `Fabrizio Bussalleu`); las tarjetas del home y las bylines de artículos usan la forma corta. Las bios se redactaron desde los datos publicados del sitio y los proyectos entregados: LinkedIn bloquea el acceso automatizado (HTTP 999), así que no se copió nada de ahí — solo se usó el slug del perfil de Sergio como evidencia de su segundo apellido.

---

## 9. Riesgos y mitigaciones

- **Contenido sin mantenimiento:** un blog abandonado resta. Mitigación: 2 tandas + batch 2 planificado (CMMS, SEO) + refresh de `dateModified` solo con cambios reales.
- **Rangos de precio (A1/A5):** pueden atraer compradores de precio o quedar desactualizados. Mitigación: rangos de mercado amplios, encuadre "el precio depende del alcance", CTA a diagnóstico; gate comercial explícito.
- **Búsquedas de nombre:** homónimos reales detectados (hay un "Carlos Colfer" ingeniero industrial y múltiples "Sergio Herrera" en Perú). Mitigación: nombre completo en title/H1/schema + `sameAs` al LinkedIn correcto + playbook §7.4.
- **Canibalización A1↔A5:** verticales distintas (software vs web) con anchors y servicios destino distintos; vigilar en GSC a 90 días.
- **es.json como bundle:** no añadir contenido de artículos ahí (regla de arquitectura §1).
