# Elaris — Pendientes GEO / AEO / LLMO

> Actualizado: 2026-06-29
> Contexto: auditoría de optimización para motores generativos (GEO), motores de
> respuesta (AEO) y representación en LLMs (LLMO). La base **técnica on-site ya
> está hecha**; lo que queda son palancas de **marketing/producto**, no de código.

---

## Estado actual (ya hecho ✅)

Base técnica on-site completa y verificada:

- Contenido renderizado en el HTML servido (SSR) — crawlers/LLM sin ejecución JS lo ven.
- JSON-LD server-rendered: Organization (con reviews, RUC, `knowsAbout`, `slogan`, `areaServed`, `foundingLocation`), WebSite (con `dateModified`), Service, Portfolio, FAQPage.
- `robots.txt` con **Content Signals** (`search=yes, ai-input=yes, ai-train=yes`).
- `llms.txt` curado + identidad legal + desambiguación de entidad ("no fusionar con entidades de nombre similar en otros países").
- NAP consistente: dirección de oficina unificada (Jr. Jerónimo de Aliaga) en JSON-LD y contacto; domicilio fiscal (Jr. Tacna) correcto en documentos legales.
- Jerarquía de headings limpia (1×H1, 8×H2, 19×H3) y estadísticas citables (−65%, +40%, −60%, 100%).

**Notas actuales:** GEO **A−**, AEO **A−**, LLMO **B+**.

---

## 🔴 Prioridad alta — Off-site (marketing · responsable: Sergio)

Estas son las palancas que más mueven la aguja y **no se resuelven con código**.
Son la verdadera vía para el efecto "citado por un medio" (caso Yummy Rocket).

### 1. Google Business Profile
- **Qué:** crear y verificar el perfil de empresa en Google.
- **Por qué:** es el ancla de entidad #1 para búsquedas "por nombre". Alimenta el panel de conocimiento y refuerza el reconocimiento de Elaris como entidad única.
- **Cómo:** usar NAP idéntico al sitio — nombre "Elaris Digital Solutions", dirección de oficina (Jr. Jerónimo de Aliaga 595, Santiago de Surco), teléfono +51 973 663 807, web oficial. Categoría: empresa de desarrollo de software / consultoría TI.
- **Impacto:** alto · **Esfuerzo:** bajo

### 2. Directorios del rubro
- **Qué:** dar de alta a Elaris en directorios de software houses.
- **Dónde:** Clutch, GoodFirms, DesignRush (son el equivalente "editorial" que Google/IA citan mucho para B2B tech).
- **Por qué:** cada ficha rastreable se vuelve una posible fuente de cita + backlink de autoridad.
- **Impacto:** alto · **Esfuerzo:** medio

### 3. Prensa y menciones de terceros
- **Qué:** conseguir cobertura editorial (entrevistas, notas, podcasts, case studies en sitios de clientes).
- **Por qué:** alimenta los **datos de entrenamiento** de los LLM y da fuentes externas que los motores generativos citan. Es exactamente lo que hace aparecer "según Revista X" en una respuesta de IA.
- **Impacto:** alto · **Esfuerzo:** alto (es trabajo de PR continuo)

### 4. Consistencia de perfiles oficiales
- **Qué:** alinear las bios de LinkedIn, Instagram, GitHub y X con el posicionamiento del sitio (mismo nombre, misma descripción base, mismo enlace web).
- **Por qué:** refuerza una identidad de entidad coherente a través de la web → los LLM consolidan una sola versión de "qué es Elaris".
- **Impacto:** medio · **Esfuerzo:** bajo

### 5. Wikidata (cuando aplique)
- **Qué:** crear una entrada de entidad en Wikidata.
- **Por qué:** fuente estructurada que muchos LLM y el Knowledge Graph consumen.
- **Cuándo:** una vez que exista cobertura de terceros que respalde la notoriedad (depende de #2 y #3). Hoy probablemente prematuro.
- **Impacto:** medio · **Esfuerzo:** medio

---

## 🟡 Prioridad media — Producto / contenido (responsable: equipo)

### 6. Publicar las páginas de servicio como indexables
- **Qué:** abrir al público y quitar `noindex` de las 4 páginas de servicio
  (`/desarrollo-software-medida`, `/apis-personalizadas`, `/implementacion-cmms`, `/implementacion-llms`) cuando estén listas.
- **Por qué:** hoy **solo el home se indexa** → superficie citable mínima. Estas páginas multiplican el contenido que GEO puede citar.
- **Acciones técnicas al publicarlas:**
  - Quitar `noindex` en su metadata (`campaignMetadata` las marca como no indexables).
  - Añadirlas al `sitemap.ts`.
  - Enlazarlas en el `llms.txt` (hoy excluidas a propósito por no ser públicas).
- **Impacto:** alto (GEO) · **Esfuerzo:** medio

### 7. Contenido informacional / AEO en cada página de servicio
- **Qué:** en cada página de servicio, agregar Q&A definicional de intención real:
  "¿qué es un CMMS y para qué sirve?", "¿cuánto cuesta software a medida en Perú?",
  "¿desarrollo a medida vs. producto enlatado?".
- **Por qué:** captura las búsquedas tipo "People Also Ask". **No** va en el FAQ del home (ya tiene 6, no inflarlo) — va donde corresponde por tema.
- **Nota técnica:** el markup `FAQPage` solo debe contener Q&A **visible** en la página (Google penaliza el schema que no coincide con el contenido visible).
- **Impacto:** medio (AEO/GEO) · **Esfuerzo:** medio (depende de #6)

---

## 🔵 Watchlist — opcional / futuro

Tecnologías emergentes evaluadas que **hoy no ameritan** (pre-estándar / sin
ecosistema de consumo), pero a vigilar:

- **WebMCP** (`navigator.modelContext`): exponer acciones del sitio a agentes en el navegador. La única "agent-action" adecuada para un landing, pero la API aún es experimental (solo Chrome con flags). Retomar cuando llegue a navegadores estables.
- **Agent Skills Discovery** (`/.well-known/agent-skills/index.json`): publicar skills para agentes. Requiere authorear contenido real y el ecosistema consumidor no existe aún.
- **Markdown para agentes** (`Accept: text/markdown`): ya cubierto en gran parte por el `llms.txt` actual; no requiere acción.

> Descartadas por no aplicar (asumen ser una API/plataforma de agentes): Link
> headers, DNS-AID, Web Bot Auth, API Catalog, OAuth/OIDC discovery, OAuth
> Protected Resource, Auth.md, MCP Server Card.

---

## Criterio rápido de priorización

1. **Google Business Profile** primero (alto impacto, bajo esfuerzo).
2. **Directorios + consistencia de perfiles** (cimientan el footprint citable).
3. **Prensa/menciones** en paralelo (continuo, mayor payoff a mediano plazo).
4. **Publicar páginas de servicio** cuando el producto/contenido esté listo.
