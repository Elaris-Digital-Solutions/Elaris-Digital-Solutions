# Documento de cambios — Landing Elaris (v2)

> ## ✅ ESTADO: Fases 1 y 2 IMPLEMENTADAS (2026-07-31)
>
> `npm run build` pasa; las 21 rutas se generan. Verificado en servidor de producción local:
> sitemap con 9 URLs, las 8 páginas de servicio con `robots: index, follow`, `/implementacion-llms`
> redirige 308 a `/inteligencia-artificial`, sin rastro de Papelera Latinoamericana en HTML ni JSON-LD,
> schema con 8 servicios / 2 reviews / 7 preguntas, y cero desbordamiento horizontal en 375px y 1280px.
>
> **Desviaciones respecto a lo planificado (y por qué):**
> 1. **C39 no se aplicó: ya estaba resuelto.** `NeuralNoise` ya salta el WebGL con
>    `prefers-reduced-motion` y ya pausa el render fuera del viewport
>    ([neural-noise-cursor.tsx:123](../../src/components/ui/neural-noise-cursor.tsx#L123)). El hallazgo
>    de la v1 era incorrecto.
> 2. **`/inteligencia-artificial` usa la plantilla compartida**, no la vista bespoke de LLMs. La vista
>    vieja y sus dos componentes exclusivos (`llm-workflows-hero`, `llm-models-block`) estaban llenos de
>    jerga ("RAG", "orquestación multi-modelo") que contradice la regla de lenguaje entendible. Se
>    eliminaron junto con `src/views/LLMWorkflows.tsx` (recuperables en git).
> 3. **`services-split-panel.tsx` se eliminó** en vez de dejarlo sin importar: quedaba referenciando
>    claves de `es.json` que ya no existen.
> 4. **Cambios extra no previstos, necesarios por consistencia:**
>    - `src/app/llms.txt/route.ts` referenciaba `services.items.*.description` (clave eliminada) y
>      afirmaba que solo la home es indexable. Reescrito con los 8 servicios enlazados, el diagnóstico
>      gratuito y el piso de S/ 2,000.
>    - `buildServiceSchema()` tenía 4 servicios hardcodeados y desalineados; ahora deriva de `es.json`
>      y cada `Service` apunta a su página.
>    - `Navbar.navigateToSection()` saltaba al home al pulsar "Diagnóstico gratuito" desde una página
>      de servicio. Ahora hace scroll local si la sección existe en la página actual.
> 5. **Métricas inventadas eliminadas de `/desarrollo-software-medida`:** "53%", "+35%", "−50%", "+30%"
>    no tenían ninguna fuente. Sustituidas por datos reales de Salcedo (80%), UPC (2 campus) y CCC
>    (0 hojas de cálculo), con la nota "cada cifra corresponde a un cliente concreto, no a un promedio
>    de industria".
> 6. **H1 del CMMS pasado a lenguaje llano:** "Digitalizamos el mantenimiento industrial con CMMS" →
>    "Digitaliza el mantenimiento de tu planta", con el acrónimo explicado en el párrafo siguiente.
>
> **Pendiente (Fase 3, ver más abajo):** captura server-side del lead, GA4, PDF del lead magnet,
> dropdown de servicios, testimonios nuevos (requieren aprobación de cliente), páginas de caso y hub
> de recursos. Nada de esto bloquea el despliegue de lo ya implementado.

**Fecha:** 2026-07-31 (v2 — datos del cuestionario integrados; arquitectura de 8 servicios)
**Uso:** instrucciones autosuficientes para implementar con Opus 5. No hace falta consultar la auditoría original.
**Cobertura:** Fase 1 (home) y Fase 3 (avanzado). La Fase 2 (páginas de servicio) tiene su propio documento: [especificacion-paginas-servicio.md](especificacion-paginas-servicio.md).
**Convención:** `De:` = texto/código actual exacto · `A:` = texto/código final. Los textos van en `src/locales/es.json` salvo que se indique otro archivo.
**Regla editorial global:** lenguaje entendible — todo acrónimo (CMMS, MVP, SEO, IA) se explica en su primera aparición en cada página; los beneficios se escriben como los vive el cliente, no en jerga.

---

## FASE 1 — Home

### A. Navegación — `src/components/Navbar.tsx`

**C01. Renombrar y ampliar los ítems del menú.**
En la constante `NAV_LINKS` (líneas 11–16):
- De:
  ```ts
  { label: "Servicios",   section: "servicios"  },
  { label: "Estándares",  section: "estandares" },
  { label: "Portafolio",  section: "portafolio" },
  { label: "Testimonios", section: "clientes"   },
  ```
- A:
  ```ts
  { label: "Servicios",      section: "servicios"  },
  { label: "Casos",          section: "portafolio" },
  { label: "Por qué Elaris", section: "estandares" },
  { label: "FAQ",            section: "faq"        },
  ```

**C02. Cambiar el CTA del navbar (desktop y menú móvil).**
- De: `Contacta con ventas` (2 apariciones: botón desktop ~línea 164 y menú móvil ~línea 219)
- A: `Diagnóstico gratuito`

**C03. Corregir el copy de la tarjeta del menú móvil** (~líneas 209–211):
- De: `Listo para escalar tu plataforma digital?` / `Conversemos y te damos una hoja de ruta clara para ejecutar.`
- A: `¿Listo para escalar tu operación?` / `Agenda un diagnóstico gratuito y te damos una hoja de ruta clara para ejecutar.`
- Botón secundario de esa tarjeta: De: `Ver trabajos` → A: `Ver casos`.

**C04. Convertir los ítems de navegación en enlaces reales y limpiar ARIA.**
- Sustituir cada `<button>` de `NAV_LINKS` (desktop y móvil) por `<a href={`/#${section}`}>` conservando `onClick` con `e.preventDefault()` + `navigateToSection(section)` para el scroll suave.
- Eliminar `role="menubar"`, `role="none"` y `role="menuitem"` (patrón ARIA incorrecto para navegación de sitio; `<nav aria-label="Primary">` basta).

### B. Hero — `es.json` (bloque `hero`) y `src/components/Hero.tsx`

**C05. Cambiar el título.**
- De: `Tecnología a medida para industrias que no pueden permitirse parar.`
- A: `Tecnología a medida para negocios que necesitan vender más y operar mejor.`

**C06. Cambiar la descripción.**
- De: `Digitalizamos el mantenimiento, automatizamos procesos y modernizamos sistemas para que tu operación funcione con menos paradas, menos costos y más control. Software a medida para empresas en Perú y LATAM.`
- A: `Automatizamos procesos, modernizamos sistemas y construimos plataformas que venden por ti. Software a medida para empresas en Perú y LATAM — y el código siempre es tuyo.`

**C07. Cambiar el CTA primario.**
- De: `"primary": "Solicitar Diagnóstico Operativo"`
- A: `"primary": "Solicitar diagnóstico gratuito"`
- El secundario `Ver casos reales` se mantiene.

**C08. Añadir la franja de prueba social bajo los CTAs (datos confirmados).**
`SyntheticHero` ([synthetic-hero.tsx](../../src/components/ui/synthetic-hero.tsx)) ya acepta la prop `microDetails` y la renderiza — hoy `Hero.tsx` no la pasa.
1. En `es.json`, dentro del bloque `hero`, añadir:
   ```json
   "microDetails": [
     "Hasta 80% menos tiempo operativo en clientes reales",
     "Proyectos en Perú, Chile y Argentina",
     "El código es 100% tuyo",
     "Diagnóstico gratuito"
   ]
   ```
2. En [Hero.tsx](../../src/components/Hero.tsx), leerla con `tArray("hero.microDetails")` y pasarla como prop `microDetails` a `SyntheticHero`.
3. Contraste de la franja en `synthetic-hero.tsx` (~línea 214): De `text-[#071540]/60` → A `text-[#071540]/75`.
4. **Limpieza:** si el bloque `socialProof` sigue existiendo en `es.json`, eliminarlo (fue retirado por el equipo; nunca se renderizó y sus cifras viejas —"−65% paradas", "+40% leads"— ya no son publicables).

### C. Sección Servicios — reemplazo completo

> La oferta 2026 son 8 servicios; el split-panel actual de 3 no escala ni los refleja. Se sustituye por una grilla de 8 tarjetas en 2 grupos. El copy exacto de cada tarjeta (nombre, beneficio, icono, href) está en [especificacion-paginas-servicio.md](especificacion-paginas-servicio.md) §2 — este cambio y esa spec se implementan juntos.

**C09. Crear `src/components/ui/services-grid.tsx`** y usarlo en `HomeView.tsx` en lugar de `ServicesSplitPanel`.
- Sección con `id="servicios"`, mismo fondo y encabezado actual (`bg-[#F8FAFC]`, heading `Soluciones que impulsan tu operación` con `text-brand-gradient` en el accent, descripción desde `es.json services.description`).
- Dos grupos con subtítulo propio:
  - `Para vender más` — Desarrollo web · E-commerce · Posicionamiento SEO · Desarrollo de MVPs
  - `Para operar mejor` — Software a medida · Inteligencia Artificial · CMMS · Transformación digital
- Cada grupo: grilla `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4`. Tarjeta: `rounded-2xl border border-slate-200 bg-white p-6 hover:border-[#0855FD]/30 hover:shadow-md transition-all` con icono en contenedor `bg-[#0855FD]/10` + `icon-brand-gradient`, título del servicio, beneficio en una línea (`text-sm text-slate-500`), y enlace `Ver servicio →` (`text-brand-gradient`). Toda la tarjeta clickeable (`<Link>` envolvente) hacia su página de servicio.
- Foco visible: `focus-visible:ring-2 focus-visible:ring-[#0855FD] focus-visible:ring-offset-2` en las tarjetas.
- Contenido de las 8 tarjetas: copiar textual de la spec §2 (títulos, beneficios, iconos lucide, hrefs).

**C10. Reestructurar el bloque `services` de `es.json`.**
Sustituir `services.items` (web/ai/software con features largos) por la estructura de la spec §2 (8 ítems con `title`, `benefit`, `href`). Conservar `services.description` actual. Los features largos de web/ai/software **no se pierden**: migran a sus páginas de servicio (spec §3–5).

**C11. Cerrar la sección con el enlace de diagnóstico.**
Bajo las grillas, mantener la línea de cierre actual (`Cada servicio se adapta a la escala, industria y objetivos específicos de su empresa.`) con contraste corregido (`text-slate-500`, no `text-slate-400`), seguida de:
```jsx
<a href="#contacto" className="...">¿No sabes cuál necesitas? Empieza por el diagnóstico gratuito →</a>
```
(estilo enlace `text-brand-gradient font-semibold`).

**C12. Retirar `services-split-panel.tsx` del uso** (no borrar el archivo en esta fase; queda sin importar). El ítem "web" ya no enlaza `/impulsa-tu-negocio` desde la home — esa landing queda exclusiva para pauta Meta.

### D. Estándares — `src/components/Process.tsx`

**C14. Añadir CTA al cierre.** Después de `<Timeline data={processData} />`:
```jsx
<div className="mt-12 text-center">
  <a
    href="#contacto"
    className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-8 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(47,100,255,0.3)] transition-all hover:-translate-y-0.5"
  >
    Solicitar diagnóstico gratuito
    <ArrowRight className="h-4 w-4" />
  </a>
</div>
```
(importar `ArrowRight` de `lucide-react`).

### E. Portafolio — `es.json` (bloque `portfolio`) + `interactive-selector.tsx` + `Portfolio.tsx`

**C15. Actualizar descripciones, categorías y métricas con los datos reales.**
En `es.json`, `portfolio.projects`, sustituir los 4 proyectos por:
```json
"salcedoJewels": {
  "title": "Salcedo Jewels",
  "description": "Tienda online y sistema de gestión para una joyería con presencia en Lima, Chiclayo y Cajamarca. Antes: catálogo en PDF rehecho a mano en Canva con cada venta. Ahora: catálogo siempre actualizado, inventario por talla, pedidos con cuotas y editor de fotos integrado.",
  "category": "E-commerce + Gestión",
  "metrics": "Hasta 80% menos tiempo operativo y ventas todo el año"
},
"sistemaInventarioUPC": {
  "title": "Sistema de Inventario UPC",
  "description": "Plataforma de reservas de equipos tecnológicos (VR, tablets, cámaras, proyectores) para estudiantes de la Universidad Peruana de Ciencias Aplicadas en los campus Monterrico y San Miguel, con verificación de retiros y devoluciones en tiempo real.",
  "category": "Plataforma institucional",
  "metrics": "Equipos que nadie usaba, hoy reservados por estudiantes en 2 campus"
},
"cccImpresiones": {
  "title": "CCC Impresiones",
  "description": "Tienda online, cotizador de trabajos personalizados y panel de gestión para una imprenta de Córdoba (Argentina) que operaba con Excel y hojas físicas. Incluye inventario, pedidos con cuotas y base técnica SEO.",
  "category": "E-commerce industrial",
  "metrics": "De Excel y papel a catálogo digital con tráfico orgánico constante"
},
"veltrixNfc": {
  "title": "VeltrixNFC",
  "description": "Plataforma para tarjetas de presentación metálicas con chip NFC: al acercarla a un celular abre el perfil digital del dueño, con sus datos, redes y botón de contacto. Incluye panel de personalización y gestión de tarjetas físicas. Opera en Perú y Chile.",
  "category": "Producto digital (MVP)",
  "metrics": "De una idea a una startup operando en 2 países"
}
```

**C16. Mostrar categoría y métrica en desktop (paridad con móvil).**
En `interactive-selector.tsx`, el overlay del proyecto activo (~líneas 165–189) muestra solo `title` y `description`. Añadir al `options` map los campos `category` y `metrics` (leyéndolos como hace `projects-carousel.tsx`), y en el overlay del ítem activo:
- Encima del título: pill con `category` (fondo `bg-white/20`, texto blanco, uppercase, tracking amplio).
- Debajo de la descripción: línea con `metrics` en `text-sm font-semibold text-white` con icono `TrendingUp` (lucide) delante.

**C17. Añadir CTA al cierre de la sección.**
En `Portfolio.tsx`, tras el bloque condicional selector/carrusel:
```jsx
<p className="mt-10 text-center text-slate-600">
  ¿Tu operación necesita un resultado así?{" "}
  <a href="#contacto" className="font-semibold text-brand-gradient hover:underline">
    Solicita un diagnóstico gratuito →
  </a>
</p>
```

### F. Testimonios — `src/components/Testimonials.tsx` y `es.json`

**C18. Eliminar el testimonio de Papelera Latinoamericana** (cliente descartado por el equipo).
- En `es.json`, borrar `testimonials.items.martina` (contiene la cita de Miguel del Solar / Papelera Latinoamericana).
- Nota: `src/seo/site.ts` construye las reviews del schema con `Object.values(es.testimonials.items)` — se ajusta solo.

**C19. Reordenar: B2B primero.**
En `Testimonials.tsx`:
- De: `const testimonialSlugs = ["daniela", "milagros", "martina"] as const`
- A: `const testimonialSlugs = ["milagros", "daniela"] as const`
- Verificar que `CircularTestimonials` se comporta bien con 2 ítems (autoplay y flechas); si el layout circular pide mínimo 3, mantener 3 con un placeholder **NO** — en su lugar deshabilitar autoplay y mostrar los 2. Cuando los clientes aprueben los testimonios nuevos (Fase 3, C44), volverán a ser 4–5.

**C20. (Preparación, sin publicar)** Los 3 borradores de testimonios para aprobación de UPC, CCC y Veltrix están en la spec §6. No añadirlos a `es.json` hasta tener el OK de cada cliente.

### G. Lead magnet y orden de secciones

**C21. Cambiar el CTA del lead magnet** (`es.json`, bloque `leadMagnet`):
- De: `"cta": "Hablar con un consultor"`
- A: `"cta": "Quiero el checklist gratis"`

**C22. Reordenar la home** (`src/views/HomeView.tsx`, ~líneas 37–46):
- De: `<Testimonials /> <FaqHome /> <LeadMagnet /> <Team /> <Contact />`
- A: `<Testimonials /> <LeadMagnet /> <FaqHome /> <Team /> <Contact />`

### H. FAQ — `es.json` (bloque `homeFaq`)

**C23. Respuesta final sobre el diagnóstico (dato confirmado: es gratuito).**
- De: `"a": "El proceso inicia con un diagnóstico técnico y operativo de dos semanas. Evaluamos tus sistemas actuales, identificamos cuellos de botella y te entregamos un informe con la ruta de desarrollo y los costos de infraestructura antes de construir."`
- A: `"a": "El diagnóstico técnico y operativo es gratuito y toma dos semanas. Evaluamos cómo opera hoy tu negocio, identificamos cuellos de botella y te entregamos un informe con la ruta de desarrollo y los costos estimados — antes de que inviertas un sol en construir."`
- También actualizar la pregunta: De `¿Cómo empiezo y cuánto cuesta el diagnóstico?` → A `¿Cómo empiezo? ¿El diagnóstico tiene costo?`

**C24. Añadir la pregunta de inversión** (insertar como penúltimo ítem de `homeFaq.items`):
```json
{
  "q": "¿Cuánto cuesta un proyecto con Elaris?",
  "a": "Depende del alcance: los proyectos parten desde S/ 2,000 en el caso de una plataforma web sencilla, y escalan según la complejidad y el impacto en tu negocio. Tras el diagnóstico gratuito recibes una propuesta con alcance, plazos y costo total cerrados por fase — sin sorpresas ni adicionales a mitad de camino."
}
```
- *Variante cualitativa* (solo si el equipo decide no publicar el piso): `"Depende del alcance, pero nunca es una caja negra: tras el diagnóstico gratuito recibes una propuesta con alcance, plazos y costo total cerrados por fase, antes de comprometerte. Sin sorpresas ni adicionales a mitad de camino."`
- Implementar la variante **con el piso** salvo indicación contraria.

### I. Contacto — `src/components/Contact.tsx`, `es.json`, `src/views/MeetsRedirect.tsx`

**C25. Etiquetar el botón con honestidad.**
`es.json`, `common.buttons.sendMessage`: De `Enviar Mensaje` → A `Continuar por WhatsApp`.

**C26. Convertir el tercer campo en textarea.**
En `Contact.tsx` (~líneas 148–170) el campo "reason" es `<input type="text">`. Sustituirlo por `<textarea rows={3}>` conservando el label flotante (`contact.form.reasonLabel`) y usando como guía el texto de `contact.form.messagePlaceholder`. Eliminar de `es.json` las claves que queden huérfanas (`messageLabel`, `fullNamePlaceholder`/`emailPlaceholder` si no se usan).

**C27. Añadir la ruta alternativa de agenda** (bajo la nota `responseTime`):
```jsx
<p className="mt-2 text-sm text-slate-500">
  ¿Prefieres hablar directo?{" "}
  <a href="/meet" target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-gradient hover:underline">
    Agenda una llamada de 30 minutos →
  </a>
</p>
```

**C28. Arreglar el enlace de Calendly caducado** (`MeetsRedirect.tsx`):
- De: `.../30min?month=2025-12` → A: `.../30min`

**C29. Contraste de la nota del formulario** (~línea 181): De `text-slate-400` → A `text-slate-500`.

### J. Footer — `src/components/Footer.tsx` y `es.json` (bloque `footer`)

**C30. Añadir la columna "Servicios" con los 8 enlaces.**
Hoy `Footer.tsx` no renderiza esa columna (solo Navegación y Contacto). Añadirla como columna propia usando `footer.sections.services.title`, y en `es.json` sustituir `footer.sections.services.items` por:
```json
"items": [
  { "label": "Desarrollo web", "href": "/desarrollo-web" },
  { "label": "E-commerce", "href": "/e-commerce" },
  { "label": "Posicionamiento SEO", "href": "/posicionamiento-seo" },
  { "label": "Desarrollo de MVPs", "href": "/desarrollo-mvp" },
  { "label": "Software a medida", "href": "/desarrollo-software-medida" },
  { "label": "Inteligencia Artificial", "href": "/inteligencia-artificial" },
  { "label": "CMMS (mantenimiento)", "href": "/implementacion-cmms" },
  { "label": "Transformación digital", "href": "/transformacion-digital" }
]
```
Renderizar con `<Link>`. *(Los `href` funcionan al completar la Fase 2; si la Fase 1 se despliega sola, desplegar C30 junto con la Fase 2.)*

**C31. Añadir "Agenda una reunión" en la columna Contacto** (el label `footer.sections.contact.meetingLabel` ya existe y no se renderiza):
```jsx
<li>
  <a href="/meet" target="_blank" rel="noopener noreferrer"
     className="flex items-center gap-2 text-white/80 text-sm hover:text-white transition-colors">
    <CalendarDays className="h-4 w-4" />
    {contactSection.meetingLabel}
  </a>
</li>
```
(importar `CalendarDays` de `lucide-react`).

**C32. Añadir "FAQ" a la navegación del footer.**
`es.json footer.sections.navigation.items`: añadir `"FAQ"` tras `"Testimonios"`; en `Footer.tsx` añadir `"faq"` en `navTargets` en la posición equivalente.

### K. SEO / indexación — `src/seo/site.ts`, `src/app/sitemap.ts`, `next.config.mjs`

**C33. Permitir indexar páginas concretas desde `campaignMetadata`.**
Añadir cuarto parámetro opcional:
```ts
export const campaignMetadata = (
  title: string,
  description: string,
  path: string,
  options?: { index?: boolean }
): Metadata => {
  ...
  robots: options?.index ? { index: true, follow: true } : { index: false, follow: true },
  ...
}
```

**C34. Indexar las 8 páginas de servicio** (al completar la Fase 2): pasar `{ index: true }` en las 8 `page.tsx` de servicio. **No** indexar `/impulsa-tu-negocio` (landing de pauta), `/apis-personalizadas` (página de apoyo fuera del lineup), `/meet` ni legales.

**C35. Sitemap con 9 URLs** (`sitemap.ts`): home (`priority 1`) + los 8 slugs de servicio (`changeFrequency: "monthly"`, `priority: 0.8`): `/desarrollo-software-medida`, `/inteligencia-artificial`, `/implementacion-cmms`, `/desarrollo-mvp`, `/desarrollo-web`, `/e-commerce`, `/posicionamiento-seo`, `/transformacion-digital`.

**C36. Title/description de la home** (`site.ts`):
- De: `HOME_TITLE = "Tecnología para impulsar negocios | Elaris Digital Solutions"`
- A: `HOME_TITLE = "Software a medida para vender más y operar mejor | Elaris Digital Solutions"`
- De: `HOME_DESCRIPTION = "¿Tu negocio depende de procesos manuales lentos? En Elaris Digital Solutions eliminamos el caos operativo con tecnología fácil de usar. Empieza a escalar tu operación ahora mismo."`
- A: `HOME_DESCRIPTION = "Automatizamos procesos, modernizamos sistemas y construimos plataformas de venta para empresas en Perú y LATAM. El código es 100% tuyo. Diagnóstico gratuito con respuesta en menos de 12 horas."`

**C36b. Redirect 301 del slug renombrado** (`next.config.mjs`):
```js
async redirects() {
  return [
    { source: "/implementacion-llms", destination: "/inteligencia-artificial", permanent: true },
  ];
}
```

### L. Accesibilidad — varios archivos

**C37. Foco visible:** añadir `focus-visible:ring-2 focus-visible:ring-[#0855FD] focus-visible:ring-offset-2` a: tarjetas de la nueva grilla de servicios, botones/cards del selector de portafolio (`interactive-selector.tsx` ~línea 157, tiene `focus:outline-none` sin reemplazo), botones del acordeón FAQ (`FaqHome.tsx`).

**C38. Contraste del lead magnet:** `LeadMagnet.tsx` (~línea 61): De `text-white/50` → A `text-white/70`.

**C39. `prefers-reduced-motion` en los fondos WebGL:** en los dos usos de `NeuralNoise` (hero vía `synthetic-hero.tsx` y `Contact.tsx`), si `window.matchMedia("(prefers-reduced-motion: reduce)").matches`, no montar el canvas (fondo estático `bg-[#F0F4FF]`).

---

## FASE 2 — Páginas de servicio

Implementar completa desde [especificacion-paginas-servicio.md](especificacion-paginas-servicio.md): plantilla común + 8 páginas (3 actualizadas, 5 nuevas), renombrado LLMs → Inteligencia Artificial, y luego activar C30, C34, C35 y C36b.

---

## FASE 3 — Conversión avanzada y contenido

**C40. Captura server-side del lead antes de abrir WhatsApp.** *(Depende de: elegir destino — Resend/CRM/Sheet)*
En `Contact.tsx` `handleSubmit`, antes de `window.open(wa.me...)`: `POST /api/lead` con `{fullName, email, reason, page_url}`. Crear `src/app/api/lead/route.ts` que reenvíe a `contact@elarisdigitalsolutions.com` (o CRM). Aplicar el mismo patrón al CTA del lead magnet.

**C41. GA4 + eventos.** *(Depende de: propiedad GA4)*
`@next/third-parties` + `<GoogleAnalytics gaId="G-XXXXXXX" />` en `layout.tsx`. Eventos: `cta_hero_diagnostico`, `cta_hero_casos`, `cta_servicio` (param `service: <slug>`), `lead_whatsapp_form`, `lead_magnet_click`, `calendly_click`. Mantener los eventos Meta existentes; añadir Meta `Lead` al CTA del lead magnet.

**C42. PDF del lead magnet.** Maquetar [docs/lead-magnet-checklist.md](../lead-magnet-checklist.md) como PDF con marca, alojar en `/public/recursos/checklist-30-procesos.pdf`, incluir el enlace en el mensaje de WhatsApp del `LeadMagnet` (o email si C40 existe).

**C43. Dropdown "Servicios" en el navbar** con los 8 servicios + "Ver todos" (`/#servicios`); en móvil, sub-ítems del acordeón.

**C44. Publicar los testimonios aprobados** (borradores en spec §6): añadirlos a `es.json testimonials.items` y a `testimonialSlugs` conforme cada cliente dé OK. Orden objetivo: Milagros (Salcedo) → CCC → UPC → Veltrix → Daniela.

**C45. Línea base y verificación de rendimiento.** PageSpeed Insights (móvil) sobre `/` antes y después de cada fase. Si LCP > 2.5s o INP > 200ms: lazy-mount del `NeuralNoise` de Contacto (IntersectionObserver) y auditar GSAP/SplitText.

**C46. Páginas de caso** (`/casos/[slug]`) desde las fichas de la spec §7. Empezar por **Salcedo** (único con material de "antes": fotos del Excel y del catálogo en Canva). Estructura: contexto → cómo operaban antes → qué se construyó → resultado con métrica → cita → CTA diagnóstico gratuito. Indexables. Enlazarlas desde el portafolio y desde las páginas de servicio afines.

**C47. Hub `/recursos`** con artículos por dolor/industria enlazando servicios y casos. No arrancar sin capacidad de publicar ≥2 piezas/mes.

**C48. Limpieza de copy muerto en `es.json`** (tras confirmar cero referencias): bloque `about.*`, `navbar.items`, `common.languageToggle`, claves huérfanas de `contact.form`, y los bloques de features largos de `services.items` viejos una vez migrados a las páginas de servicio.

---

## Checklist de verificación

**Fase 1**
- [ ] Menú: Servicios · Casos · Por qué Elaris · FAQ + botón "Diagnóstico gratuito".
- [ ] Hero: nuevo título, CTA "Solicitar diagnóstico gratuito", franja con las 4 pruebas bajo los CTAs.
- [ ] `es.json` sin bloque `socialProof`.
- [ ] Sección Servicios: 8 tarjetas en 2 grupos ("Para vender más" / "Para operar mejor"), cada una enlazando su página.
- [ ] Estándares y Portafolio terminan con CTA de diagnóstico gratuito.
- [ ] Portafolio (desktop y móvil) muestra categoría + métrica real por proyecto.
- [ ] Testimonios: solo Milagros y Daniela, en ese orden. Sin rastro de Papelera Latinoamericana (tampoco en el schema JSON-LD).
- [ ] Orden: … Testimonios → Lead Magnet → FAQ → Equipo → Contacto.
- [ ] FAQ: "el diagnóstico es gratuito" + pregunta de inversión "desde S/ 2,000".
- [ ] Botón del formulario: "Continuar por WhatsApp"; debajo, enlace a `/meet`; `/meet` sin `?month=2025-12`.
- [ ] Navegación por teclado con foco visible en navbar, servicios, portafolio y FAQ.
- [ ] `npm run build` pasa sin errores.

**Fase 2**
- [ ] Las 8 URLs de servicio responden 200 con el design system actual y H1 en lenguaje llano.
- [ ] `/implementacion-llms` → 301 → `/inteligencia-artificial`.
- [ ] `sitemap.xml` lista 9 URLs; las 8 de servicio con `robots: index, follow`.
- [ ] `/impulsa-tu-negocio` y `/apis-personalizadas` siguen noindex y fuera de menú/footer.
- [ ] Footer con los 8 servicios enlazados + FAQ + "Agenda una reunión".
- [ ] Cada acrónimo (CMMS, MVP, SEO, IA) explicado en su primera aparición en cada página.
