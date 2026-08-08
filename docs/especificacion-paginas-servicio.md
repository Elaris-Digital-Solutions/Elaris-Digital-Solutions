# Especificación de páginas de servicio — Fase 2

> ## ✅ ESTADO: IMPLEMENTADA (2026-07-31)
>
> Las 8 rutas responden 200 e indexables. Plantilla compartida en
> [`src/components/ServicePageTemplate.tsx`](../../src/components/ServicePageTemplate.tsx); copy en
> `es.json` bajo `servicePages.*` (y `inteligenciaArtificial` para IA).
>
> **Cambio respecto a esta spec:** `/inteligencia-artificial` también usa la plantilla compartida
> (§3.2 preveía reutilizar la vista bespoke). La vista de LLMs y sus dos componentes se eliminaron por
> jerga incompatible con la regla de lenguaje llano. Resultado: 6 páginas con plantilla + 2 bespoke
> (`/desarrollo-software-medida`, `/implementacion-cmms`), todas compartiendo Navbar, Footer, Contact
> y paleta.
>
> **§6 (testimonios) sigue pendiente:** los 3 borradores NO se publicaron — requieren aprobación de
> UPC, CCC y Veltrix, tal como se acordó. La home muestra hoy 2 testimonios (Milagros, Daniela).
>
> ---
>
> ## 🎨 Revisión de UI + WCAG (2026-07-31, segunda pasada)
>
> **Causa raíz de la sensación de "genérico":** la regla `.site-sections > section` de
> [globals.css:162](../../src/app/globals.css#L162) asigna fondos blanco/lavanda **por posición**
> (`nth-of-type`) con especificidad (0,1,1), que gana a las utilidades `bg-*` de Tailwind (0,1,0).
> Todas las secciones de la plantilla salían con el fondo equivocado — el hero se veía blanco en vez
> de `#F0F4FF`. Se quitó `site-sections` del `<main>` de las páginas de servicio (esa alternancia es
> un recurso propio del home). Con eso los fondos definidos en la plantilla ya se aplican.
>
> **Cambios de UI:**
> - **Hero:** ahora lleva la capa `absolute inset-0` con `NeuralNoise` —el mismo fondo animado del
>   home—, más retícula técnica, badge con punto de marca y altura `92vh`. Coste asumido: estas
>   páginas ya montaban un canvas WebGL en `Contact`, así que quedan con dos, igual que el home.
> - **"Qué incluye":** cada ítem tiene ahora **su propio icono** (campo `icon` en `es.json`, registro
>   en la plantilla) sobre tile con degradado de marca; antes eran 6 checks idénticos. Se añadió
>   número de orden en marca de agua, barra superior que se despliega al hover y elevación.
> - **"¿Te suena?":** los dolores usaban icono de check (leía como "incluido"). Ahora `AlertCircle`
>   y barra lateral de marca; el bloque es una `<ul>` real.
> - **"Cómo trabajamos":** era una fila de tarjetas sueltas. Ahora es una `<ol>` con **riel conector
>   que se dibuja al entrar en pantalla**, círculos más grandes con `ring` y aparición escalonada.
> - **FAQ:** chevron dentro de un círculo con estado, `aria-expanded` + `aria-controls`.
>
> **WCAG (verificado con auditoría de contraste inyectada en la página real):**
> - **0 fallos** de contraste AA en la home y en las páginas de servicio (antes: 15 en servicio, 17 en
>   home).
> - Corregido en `Contact` (compartido): etiquetas flotantes `slate-400` → `slate-600` (2.33:1 → 6.9:1),
>   descripción y notas `slate-500` → `slate-600`.
> - Corregido en el portafolio: el velo sobre las fotos era un `box-shadow` de 120px, así que el
>   contraste del texto blanco **dependía de la foto**. Sustituido por un degradado real
>   (`rgba(4,10,30,.92)`) que garantiza AA con cualquier imagen.
> - Corregido en el carrusel móvil: la métrica usaba `text-green-600` (3.4:1 y además el verde está
>   reservado a WhatsApp por manual de marca) → `text-brand-gradient`.
> - Corregido el cargo del testimonio (4.39:1 → 6.9:1).
> - **Añadido skip link** "Saltar al contenido principal" (WCAG 2.4.1, nivel A) en `Navbar`, con
>   `id="contenido-principal"` en el `<main>` de home y páginas de servicio. Verificado que es el
>   primer elemento enfocable.
> - Verificado: 1 solo `<h1>`, sin saltos de nivel de encabezado, todos los inputs etiquetados, todos
>   los controles con nombre accesible, iframe con `title`, iconos decorativos con `aria-hidden`.
> - Animaciones respetan `prefers-reduced-motion` vía `useReducedMotion`.
>
> ---
>
> ## 🔧 CMMS migrado a la plantilla + optimización del hero (2026-07-31, tercera pasada)
>
> **CMMS ya no es la excepción: 7 de 8 páginas usan la plantilla** (la única bespoke que queda es
> `/desarrollo-software-medida`). Se eliminaron `cmms-hero.tsx` y `cmms-features-block.tsx`; los dos
> mockups del dashboard se conservaron en
> [`cmms-mockups.tsx`](../../src/components/ui/cmms-mockups.tsx) y se muestran como ilustración al
> cierre de "Qué incluye", vía la nueva prop `illustration` de la plantilla.
>
> **Qué se eliminó de esa página, y por qué:**
> - **Testimonio fabricado.** "Gerente de Mantenimiento — Empresa del sector manufactura" era una cita
>   inventada: Elaris no tiene ningún cliente de CMMS. Fuera.
> - **Cuatro métricas sin respaldo** (65% menos paradas, −40% costos, +92% cumplimiento, +28% vida
>   útil) presentadas como resultados propios pero justificadas como "promedios de industria".
>   Contradecían la nota que dejamos en `/desarrollo-software-medida` ("cada cifra corresponde a un
>   cliente concreto, no a un promedio de industria"). Fuera.
> - **Jerga sin explicar.** Antes: OT ×10, IoT ×8, SCADA ×4, MP ×4, MTTR ×2, MTBF ×2. Ahora: 0 en el
>   copy (solo quedan los códigos "OT-2041" dentro del mockup decorativo). El copy dice "órdenes de
>   trabajo", "mantenimiento programado antes de la falla", "sensores que avisan antes de la falla".
> - **Tono mezclado.** Convivían "Pase", "Digitalice", "Anticipe" (usted) con "tu planta" (tú). Ahora
>   es tú en toda la página, como el resto del sitio.
>
> **Lo que ganó:** bloque de dolores, "Cómo trabajamos" (con el diagnóstico gratuito), FAQ con
> `aria-expanded`/`aria-controls`, y **0 fallos de contraste AA** (antes 22 — los peores, textos de 9px
> a 2.45:1 en los mockups; los tiles de sensores pasaron de `-500` a `-600/-700` porque el blanco
> encima se quedaba entre 2.15:1 y 3.77:1).
>
> **Hero del home — overflow con el navbar y entrecortado:**
> - La sección centraba verticalmente sin reservar los 80px del navbar fijo, así que en móviles
>   pequeños el contenido arrancaba en y=0 y el título quedaba debajo de la barra. Se añadió `py-28`
>   y `items-start sm:items-center`: en móvil el contenido se ancla arriba y **el crecimiento de la
>   consola empuja solo lo de abajo**; desde `sm` se centra como antes.
> - La consola **crece al escribir en móvil** (`min-h-[1.625em]`), y desde `sm` reserva 2 líneas
>   (`sm:min-h-[3.25em]`) porque ahí el contenido va centrado y un salto de línea movería el bloque.
>   Verificado en 360px: título fijo en 112px, consola oscilando 47↔69px y solo el CTA desplazándose.
> - **Entrecortado:** había tres superficies con `backdrop-blur` encima del canvas WebGL animado
>   (tarjeta de consola y los dos CTA), lo que obliga a recomponer el fondo desenfocado en cada frame.
>   Ahora el blur es `sm:` — en móvil se usa un blanco casi opaco que se ve igual y no cuesta nada.
> - Además, en móvil la barra de direcciones dispara `resize` al hacer scroll y el canvas reasignaba
>   su búfer en cada evento. Ahora los cambios de solo alto menores a 120px se ignoran
>   ([neural-noise-cursor.tsx](../../src/components/ui/neural-noise-cursor.tsx)).

**Fecha:** 2026-07-31
**Uso:** documento autosuficiente para que Opus 5 construya la arquitectura de 8 servicios. Complementa a [documento-de-cambios.md](documento-de-cambios.md) (la Fase 1 debe estar aplicada o aplicarse en el mismo despliegue).
**Regla editorial:** el H1 vende el beneficio en lenguaje llano; el nombre técnico va como badge. Todo acrónimo se explica en su primera aparición en cada página. Jerga solo en "Qué incluye".

---

## 1. Plantilla común (las 8 páginas)

Todas las páginas usan el design system actual de la home: paleta oficial, `text-brand-gradient` / `bg-brand-gradient`, glass effect, tipografía y componentes compartidos (`Navbar`, `Footer`, `Contact`, `FloatingWhatsappButton`). Las 3 páginas existentes ya lo cumplen; las 5 nuevas se construyen con un componente compartido **`src/components/ServicePageTemplate.tsx`** que recibe todo por props/copy y renderiza:

1. **Hero** — fondo `bg-[#F0F4FF]` (sin `NeuralNoise` en estas páginas: mejor LCP; el hero de la home mantiene el suyo). Estructura: badge técnico (pill con el nombre del servicio), H1 (`text-4xl md:text-6xl font-light tracking-tight text-[#071540]`), subtítulo (`text-lg text-slate-600`), y 2 CTAs con el estilo del hero de la home: primario `Solicitar diagnóstico gratuito` → `#contacto` (misma página), secundario `Ver casos reales` → `/#portafolio`.
2. **"¿Te suena?"** — 3–4 dolores como tarjetas (`rounded-2xl border border-slate-200 bg-white p-6`) con icono `AlertCircle`/`Check` en `icon-brand-gradient`. Intro corta: `Si algo de esto pasa en tu empresa, esta página es para ti:`
3. **"Qué incluye"** — 4–6 ítems con icono + título + 1–2 líneas. Aquí sí se permite lenguaje técnico.
4. **"Caso real"** — tarjeta destacada (fondo `bg-gradient-to-br from-[#071540] via-[#0B2A7A] to-[#3B1585]`, como el LeadMagnet): nombre del proyecto, 2 líneas de historia (antes → después), métrica en grande, enlace `Ver el proyecto →` (URL viva del cliente; en Fase 3 apuntará a `/casos/[slug]`). Si la página no tiene caso asignado, omitir la sección (no inventar).
5. **"Cómo trabajamos"** — bloque idéntico en las 8 páginas, 4 pasos en grilla horizontal: `1. Diagnóstico gratuito (2 semanas)` · `2. Propuesta cerrada — alcance, plazos y costo por fase` · `3. Sprints con validación — nada llega a producción sin tu OK` · `4. Entrega con código — el sistema es 100% tuyo`.
6. **FAQ** — acordeón con el estilo de `FaqHome` + `<JsonLd data={buildFaqSchema(items)} />`.
7. **`<Contact />`** compartido (trae `id="contacto"`, así los CTAs `#contacto` resuelven en la misma página) + `<FloatingWhatsappButton />`.

**Metadata:** cada `page.tsx` usa `campaignMetadata(title, description, path, { index: true })` (C33/C34 del documento de cambios).

**Copy:** las 5 páginas nuevas guardan su copy en `es.json` bajo un bloque nuevo `servicePages.<clave>` con la forma `{ seo: {title, description}, hero: {badge, title, subtitle}, pains: [], includes: [{title, text}], caseStudy: {…}|null, faq: {items: []} }`. Las 3 existentes conservan sus bloques (`customSoftware`, `cmms`, y `llmWorkflows` renombrado a `inteligenciaArtificial`).

**Rutas nuevas a crear:** `src/app/desarrollo-mvp/page.tsx`, `src/app/desarrollo-web/page.tsx`, `src/app/e-commerce/page.tsx`, `src/app/posicionamiento-seo/page.tsx`, `src/app/transformacion-digital/page.tsx`, y `src/app/inteligencia-artificial/page.tsx` (contenido del actual `implementacion-llms`, que se elimina y redirige 301 — C36b).

---

## 2. Grilla de servicios de la home (referenciada por C09/C10)

Encabezados de grupo: `Para vender más` y `Para operar mejor` (estilo: `text-sm font-bold uppercase tracking-[0.15em] text-brand-gradient`).

| Grupo | Título de tarjeta | Beneficio (una línea) | Icono lucide | href |
|---|---|---|---|---|
| Vender más | Desarrollo web | Una página que vende, no un folleto digital. | `Globe` | `/desarrollo-web` |
| Vender más | E-commerce | Tu tienda vendiendo 24/7, con inventario y pagos integrados. | `ShoppingCart` | `/e-commerce` |
| Vender más | Posicionamiento SEO | Que te encuentren en Google cuando buscan lo que vendes. | `Search` | `/posicionamiento-seo` |
| Vender más | Desarrollo de MVPs | Convierte tu idea en un producto funcionando. | `Rocket` | `/desarrollo-mvp` |
| Operar mejor | Software a medida | Sistemas que se adaptan a tu operación, no al revés. | `Code2` | `/desarrollo-software-medida` |
| Operar mejor | Inteligencia Artificial | Automatiza las tareas repetitivas que consumen a tu equipo. | `Sparkles` | `/inteligencia-artificial` |
| Operar mejor | CMMS · Mantenimiento | Digitaliza el mantenimiento y reduce paradas de planta. | `Wrench` | `/implementacion-cmms` |
| Operar mejor | Transformación digital | Del papel y el Excel a una operación digital ordenada. | `RefreshCw` | `/transformacion-digital` |

Estructura en `es.json` (sustituye a `services.items` — C10):
```json
"services": {
  "headingNormal": "Soluciones que impulsan ",
  "headingAccent": "tu operación",
  "description": "Vender más o reducir costos. La mayoría de las empresas necesita ambos para operar con ventaja. Elige por dónde empezar:",
  "groups": [
    { "label": "Para vender más", "keys": ["web", "ecommerce", "seo", "mvp"] },
    { "label": "Para operar mejor", "keys": ["software", "ia", "cmms", "transformacion"] }
  ],
  "items": {
    "web":            { "title": "Desarrollo web",          "benefit": "Una página que vende, no un folleto digital.",                    "href": "/desarrollo-web" },
    "ecommerce":      { "title": "E-commerce",              "benefit": "Tu tienda vendiendo 24/7, con inventario y pagos integrados.",    "href": "/e-commerce" },
    "seo":            { "title": "Posicionamiento SEO",     "benefit": "Que te encuentren en Google cuando buscan lo que vendes.",        "href": "/posicionamiento-seo" },
    "mvp":            { "title": "Desarrollo de MVPs",      "benefit": "Convierte tu idea en un producto funcionando.",                   "href": "/desarrollo-mvp" },
    "software":       { "title": "Software a medida",       "benefit": "Sistemas que se adaptan a tu operación, no al revés.",            "href": "/desarrollo-software-medida" },
    "ia":             { "title": "Inteligencia Artificial", "benefit": "Automatiza las tareas repetitivas que consumen a tu equipo.",     "href": "/inteligencia-artificial" },
    "cmms":           { "title": "CMMS · Mantenimiento",    "benefit": "Digitaliza el mantenimiento y reduce paradas de planta.",         "href": "/implementacion-cmms" },
    "transformacion": { "title": "Transformación digital",  "benefit": "Del papel y el Excel a una operación digital ordenada.",          "href": "/transformacion-digital" }
  }
}
```

---

## 3. Las 8 páginas

### 3.1 `/desarrollo-software-medida` — existente, actualizar

- **Meta title (mantener):** `Desarrollo de Software a Medida | Elaris Digital Solutions`
- **Hero:** badge `Desarrollo a medida` · H1 `Software que se adapta a tu negocio — y no al revés.` · Subtítulo: `Sistemas construidos sobre cómo opera realmente tu empresa: tus procesos, tus reglas, tus integraciones. Sin licencias eternas ni moldes genéricos.`
- **Acciones:** revisar la vista actual ([CustomSoftware.tsx](../../src/views/CustomSoftware.tsx)) sección por sección; ya usa el design system correcto. Cambios mínimos: (a) actualizar los CTAs a `Solicitar diagnóstico gratuito`; (b) añadir el bloque "Caso real" con **UPC** (ficha §7.2) y mención de CCC; (c) añadir un enlace discreto a `/apis-personalizadas` en la zona de integraciones (`¿Necesitas conectar sistemas? Ver APIs personalizadas →`) — es la única puerta de entrada que conserva esa página; (d) revisar la métrica "53%" que muestra la vista actual: sustituirla por una de las métricas reales de §7 (no hay fuente registrada para ese 53%).
- **FAQ:** mantener `customSoftware.faq` tal cual (ya es buena y clara).

### 3.2 `/inteligencia-artificial` — renombrado desde `/implementacion-llms`

- **Meta title:** `Inteligencia Artificial para Empresas | Elaris Digital Solutions`
- **Meta description:** `Aplicamos inteligencia artificial a los procesos reales de tu empresa: leer documentos, responder consultas, clasificar información. Un caso concreto funcionando en semanas, no un proyecto eterno.`
- **Hero:** badge `IA aplicada` · H1 `Inteligencia artificial trabajando en tu operación, no en una demo.` · Subtítulo: `Automatizamos las tareas que consumen a tu equipo: leer y clasificar documentos, responder consultas repetidas, extraer datos de correos y facturas. Con el modelo adecuado para tu caso y tu presupuesto.`
- **Dolores:** `Tu equipo responde las mismas preguntas todo el día` · `Facturas, contratos y reportes se procesan a mano` · `Tienes datos por todos lados y nadie los analiza` · `Te ofrecieron "IA" pero nadie te dice para qué la usarías tú`
- **Qué incluye:** identificación del caso de mayor impacto y menor riesgo · automatización de lectura y clasificación de documentos · asistentes internos conectados a tus propios datos y sistemas · integración con tu ERP, CRM o correo · opción de despliegue privado si tus datos no pueden salir de tu infraestructura · medición de resultados desde la primera semana.
- **Renombrado en `es.json`:** bloque `llmWorkflows` → `inteligenciaArtificial`, actualizando `seo.title/description` como arriba.
- **FAQ (reescribir las 6 de `llmWorkflows.faq` en lenguaje llano — sustituir por estas):**
  1. `¿Qué tareas de mi empresa puede automatizar la IA?` → `Todo lo que involucre leer, escribir o clasificar: análisis de contratos y facturas, clasificación de correos y tickets, resúmenes de reportes, respuestas a consultas frecuentes sobre tus documentos internos, redacción de borradores. Si una tarea consiste en procesar texto o documentos, casi seguro hay un caso viable.`
  2. `¿Necesito preparar mis datos o "entrenar" algo antes de empezar?` → `No. La mayoría de los casos funciona conectando modelos ya existentes (como GPT o Claude) a tus documentos y sistemas actuales. Entrenar un modelo propio solo se evalúa en casos muy específicos, y nunca es el punto de partida.`
  3. `¿Cuánto tarda una primera implementación?` → `Un caso concreto y bien definido (por ejemplo, clasificar correos o extraer datos de facturas) puede estar funcionando en 3 a 5 semanas. Empezamos siempre con una prueba acotada para validar el impacto antes de escalar.`
  4. `¿Qué pasa con la privacidad de mis datos?` → `Es una prioridad. Si tu empresa lo requiere, la solución puede correr completamente en tu propia infraestructura, sin que ningún dato salga de ella. Firmamos acuerdos de confidencialidad y garantizamos que tus datos no se usan para entrenar modelos de terceros.`
  5. `¿Qué tecnología usan y quién la elige?` → `Trabajamos con los principales modelos del mercado (GPT, Claude, Gemini y modelos de código abierto). Elegimos según tu caso: precisión, velocidad, costo por operación y restricciones de privacidad. Te explicamos la elección en términos de negocio, no de jerga.`
  6. `¿Puedo empezar con algo pequeño y crecer después?` → `Es exactamente lo que recomendamos: un flujo de alto impacto, medir resultados reales y luego escalar. La arquitectura queda lista para sumar nuevos casos sin rediseñar desde cero.`

### 3.3 `/implementacion-cmms` — existente, actualizar

- **Meta title (mantener):** `Desarrollo e Implementación de CMMS | Elaris Digital Solutions`
- **Hero:** badge `CMMS` · H1 `Digitaliza el mantenimiento de tu planta.` · Subtítulo: `Un CMMS es el software que ordena todo el mantenimiento: órdenes de trabajo, preventivos, repuestos e historial por máquina. Nosotros lo implementamos a la medida de tu operación para reducir paradas no planificadas.`
- **Dolores:** `Las órdenes de trabajo viven en papel, Excel o cuadernos` · `Te enteras de una falla cuando ya detuvo la producción` · `No hay historial por máquina ni costos de mantenimiento por equipo` · `Los técnicos se coordinan por llamadas y mensajes sueltos`
- **Acciones:** la vista actual ([CMMS.tsx](../../src/views/CMMS.tsx)) ya usa el design system; actualizar CTAs a `Solicitar diagnóstico gratuito` y verificar que el acrónimo CMMS se explique en el primer bloque visible (usar el subtítulo de arriba). Sin caso real todavía — omitir esa sección (no inventar).
- **FAQ:** mantener `cmms.faq` tal cual (la primera respuesta ya explica qué es un CMMS).

### 3.4 `/desarrollo-mvp` — nueva

- **Meta title:** `Desarrollo de MVP: lanza tu producto digital | Elaris Digital Solutions`
- **Meta description:** `Convertimos tu idea en un MVP: la primera versión funcional de tu producto, lista para conseguir usuarios y validar tu negocio sin quemar el presupuesto.`
- **Hero:** badge `MVP` · H1 `De la idea a un producto funcionando.` · Subtítulo: `Un MVP (producto mínimo viable) es la primera versión real de tu producto: lo suficiente para salir al mercado, conseguir usuarios y validar el negocio — sin gastar como si ya fueras una empresa grande.`
- **Dolores:** `Tienes la idea clara, pero no un equipo técnico que la construya` · `Las agencias te cotizan como si fueras una corporación` · `Te da miedo invertir 6 meses en algo que nadie ha probado` · `Necesitas algo funcionando para mostrar a clientes o inversionistas`
- **Qué incluye:** definición del alcance mínimo que valida el negocio · diseño y desarrollo del producto (web o móvil) · panel de administración para operar desde el día 1 · infraestructura lista para crecer si el producto despega · analítica de uso desde el lanzamiento · hoja de ruta post-lanzamiento.
- **Caso real:** **VeltrixNFC** (ficha §7.4). Texto de la tarjeta: `Veltrix tenía el producto físico —tarjetas de presentación metálicas con chip NFC— y la visión, pero no el ecosistema digital para operarlo. Construimos la plataforma completa: perfiles digitales, gestión de tarjetas y panel de administración.` Métrica: `De una idea a una startup operando en Perú y Chile`. Enlace: `https://veltrixnfc.com`.
- **FAQ:**
  1. `¿Qué es exactamente un MVP y por qué no construir el producto completo?` → `Un MVP es la versión más pequeña de tu producto que ya genera valor real a usuarios reales. Construirlo primero te permite validar que el negocio funciona antes de invertir en funcionalidades que quizá nadie use. Lo que aprendes con usuarios reales vale más que meses de planificación.`
  2. `¿Cuánto tarda desarrollar un MVP?` → `Entre 4 y 10 semanas según la complejidad. Definimos juntos el alcance mínimo en el diagnóstico gratuito y trabajamos en sprints para que veas avances cada dos semanas.`
  3. `¿Cuánto cuesta?` → `Los proyectos parten desde S/ 2,000 en el caso de una plataforma web sencilla y escalan según la complejidad. Tras el diagnóstico recibes una propuesta con alcance, plazos y costo cerrados antes de comprometerte.`
  4. `¿Qué pasa si el MVP funciona y necesito crecer?` → `Esa es la idea. Construimos sobre arquitectura que soporta crecimiento: puedes sumar funcionalidades, usuarios e integraciones sin reescribir desde cero. Veltrix, por ejemplo, arrancó como MVP y hoy opera en dos países sobre la misma base.`
  5. `¿De quién es la idea y el código?` → `Tuyos, al 100%. Firmamos confidencialidad desde la primera conversación y al cerrar el proyecto recibes el repositorio completo con documentación. Nunca quedas atado a nosotros para operar o seguir creciendo.`

### 3.5 `/desarrollo-web` — nueva

- **Meta title:** `Desarrollo Web Profesional en Perú | Elaris Digital Solutions`
- **Meta description:** `Páginas web rápidas, optimizadas para Google y diseñadas para convertir visitas en clientes. Tu web como canal de ventas, no como folleto digital.`
- **Hero:** badge `Desarrollo web` · H1 `Una página web que vende, no un folleto digital.` · Subtítulo: `Diseñamos y construimos sitios rápidos, que aparecen en Google y convierten visitas en consultas. Con tu marca, editables por ti, y medibles desde el primer día.`
- **Dolores:** `Tu web actual no genera ninguna consulta` · `No apareces en Google ni buscándote por nombre` · `En celular carga lenta o se ve rota` · `Cada cambio pequeño depende de llamar a alguien`
- **Qué incluye:** diseño a medida alineado a tu marca · estructura optimizada para Google desde la base (SEO técnico) · velocidad y experiencia móvil primero · formularios y WhatsApp integrados para captar consultas · gestor de contenido para que actualices sin programar · medición de visitas y conversiones.
- **Caso real:** **CCC Impresiones** (ficha §7.3). Texto: `CCC Impresiones operaba con Excel y hojas físicas, sin presencia digital. Hoy tiene catálogo online, cotizador y una base técnica que ya le trae consultas desde Google.` Métrica: `Tráfico orgánico constante desde el lanzamiento`. Enlace: `https://cccimpresiones.com`.
- **FAQ:**
  1. `¿Cuánto tarda una página web?` → `Un sitio institucional o de captación está listo en 3 a 5 semanas, incluyendo diseño, contenido y optimización para Google. Plataformas más complejas (catálogos grandes, sistemas integrados) toman más — lo definimos en el diagnóstico gratuito.`
  2. `¿Cuánto cuesta?` → `Las plataformas web parten desde S/ 2,000 y escalan según alcance. Siempre recibes una propuesta cerrada con alcance, plazos y costo antes de comprometerte.`
  3. `¿Podré actualizarla yo mismo?` → `Sí. Entregamos el sitio con un gestor de contenido y una capacitación para tu equipo: textos, fotos, precios y novedades sin depender de nadie. Y si prefieres que lo hagamos nosotros, hay planes de mantenimiento.`
  4. `¿Incluye posicionamiento en Google?` → `Incluye la base técnica: estructura, velocidad y etiquetado que Google exige. El posicionamiento sostenido (contenido, autoridad, búsquedas locales) es un trabajo continuo — para eso está nuestro servicio de Posicionamiento SEO, que se integra directo sobre esta base.`
  5. `¿Qué pasa con mi web actual y mi dominio?` → `Tu dominio sigue siendo tuyo y no se pierde nada: migramos el contenido que valga la pena, configuramos las redirecciones para no perder el posicionamiento existente y lanzamos sin interrumpir tu presencia online.`

### 3.6 `/e-commerce` — nueva

- **Meta title:** `Desarrollo de Tiendas Online (E-commerce) | Elaris Digital Solutions`
- **Meta description:** `Tiendas online a medida con inventario, pagos y pedidos integrados. Hasta 80% menos tiempo operativo y ventas todo el año, como Salcedo Jewels.`
- **Hero:** badge `E-commerce` · H1 `Tu tienda vendiendo 24/7, sin depender de tu horario.` · Subtítulo: `Construimos tiendas online a medida donde catálogo, inventario, pagos y pedidos viven en un solo lugar. Se acabó el catálogo en PDF y los pedidos anotados a mano.`
- **Dolores:** `Los pedidos llegan por WhatsApp y se anotan a mano` · `El catálogo es un PDF que hay que rehacer con cada venta` · `Has vendido dos veces la misma pieza por stock desactualizado` · `Solo vendes fuerte en campañas (Navidad, Día de la Madre…)`
- **Qué incluye:** tienda a medida con tu marca · inventario en tiempo real, con variantes por talla o modelo · checkout adaptado a tu país (transferencia, pasarelas, cuotas, validación de datos locales) · gestión de pedidos con estados y seguimiento · panel autogestionable con editor de fotos integrado · integración con couriers y pasarelas de pago.
- **Caso real:** **Salcedo Jewels** (ficha §7.1 — el flagship). Texto: `Salcedo Jewels vendía con un catálogo en PDF rehecho a mano en Canva con cada venta: ventas duplicadas, clientes desanimados y una persona dedicada solo a mantenerlo al día. Hoy su tienda y su inventario son la misma cosa.` Métrica: `Hasta 80% menos tiempo operativo y ventas todo el año`. Enlace: `https://salcedojewels.com`.
- **FAQ:**
  1. `¿Por qué una tienda a medida y no Shopify o WooCommerce?` → `Si vendes productos estándar con procesos estándar, esas plataformas funcionan bien. La tienda a medida gana cuando tu operación tiene reglas propias: inventario por variantes, cuotas, validaciones locales, integración con tu sistema de gestión. Pagas una vez por algo tuyo, en vez de rentar para siempre algo genérico.`
  2. `¿Cuánto tarda estar vendiendo online?` → `Una tienda funcional está lista en 6 a 10 semanas según el tamaño del catálogo y las integraciones. Trabajamos por etapas: puedes empezar a vender con lo esencial mientras completamos el resto.`
  3. `¿Puedo gestionar el catálogo yo mismo?` → `Sí — ese es el punto. Subes productos, fotos, precios y stock desde un panel simple. En Salcedo Jewels, lo que antes era rehacer un catálogo entero hoy es subir un producto: el resto se actualiza solo.`
  4. `¿Qué formas de pago puedo ofrecer?` → `Las que tu negocio necesite: transferencia bancaria con confirmación, pasarelas locales (tarjetas, Yape/Plin), pagos en cuotas con seguimiento. Lo definimos según cómo compran tus clientes reales.`
  5. `¿Qué pasa con mis ventas por WhatsApp?` → `No se pierden — se ordenan. La tienda genera resúmenes de pedido listos para WhatsApp y tu inventario queda centralizado, vendas por el canal que vendas. WhatsApp deja de ser tu sistema de registro y vuelve a ser un canal de atención.`

### 3.7 `/posicionamiento-seo` — nueva

- **Meta title:** `Posicionamiento SEO para Empresas | Elaris Digital Solutions`
- **Meta description:** `Que te encuentren en Google cuando buscan lo que vendes. SEO técnico y de contenido con resultados medibles — sin promesas mágicas.`
- **Hero:** badge `SEO` · H1 `Que te encuentren en Google cuando buscan lo que vendes.` · Subtítulo: `SEO es el trabajo de aparecer en los resultados de Google sin pagar por cada clic. Lo hacemos con técnica y contenido — y te mostramos el avance con datos, no con promesas.`
- **Dolores:** `Tus clientes te buscan en Google y encuentran a tu competencia` · `Dependes 100% de pauta: si apagas los anuncios, se apagan las ventas` · `Tu web es nueva o vieja, pero igual: invisible` · `Te prometieron "primer lugar en Google" y no pasó nada`
- **Qué incluye:** auditoría técnica de tu sitio (velocidad, estructura, errores) · investigación de las búsquedas reales de tus clientes · optimización de páginas y contenido orientado a esas búsquedas · SEO local (Google Maps y búsquedas por zona) · medición con Google Search Console y Analytics · reporte mensual en lenguaje de negocio.
- **Caso real:** **CCC Impresiones** (ficha §7.3). Texto: `CCC no captaba ningún cliente por internet. Construimos su plataforma con base técnica SEO desde el día uno: hoy recibe tráfico orgánico constante y está lista para amplificar con Google Ads.` Métrica: `Tráfico orgánico recurrente, sin pagar por clic`. Enlace: `https://cccimpresiones.com`.
- **FAQ:**
  1. `¿Cuánto tarda en verse resultados?` → `El SEO es acumulativo: los primeros movimientos se ven en 2 a 3 meses y los resultados sólidos entre 4 y 6, según tu competencia y el estado de tu web. Quien te prometa resultados en semanas te está vendiendo otra cosa.`
  2. `¿Garantizan el primer lugar en Google?` → `No — y desconfía de quien lo garantice: el resultado depende de Google, tu competencia y tu historial. Lo que sí garantizamos es el trabajo correcto (técnica, contenido y medición) y reportes transparentes de cómo avanza cada búsqueda que te interesa.`
  3. `¿SEO o publicidad pagada?` → `Cumplen roles distintos. La pauta trae resultados inmediatos pero se detiene cuando dejas de pagar; el SEO tarda más pero se acumula y no cobra por clic. La estrategia sana usa pauta para el corto plazo mientras el SEO construye el flujo permanente.`
  4. `¿Necesito una web nueva para hacer SEO?` → `No siempre. La auditoría inicial lo determina: a veces basta optimizar lo que tienes; si la base técnica no da (velocidad, estructura), te lo decimos con claridad y puedes resolverlo con nuestro servicio de desarrollo web.`
  5. `¿Qué recibo cada mes?` → `Un reporte en lenguaje de negocio: qué búsquedas subieron, cuánto tráfico llegó, qué consultas generó y qué se hará el mes siguiente. Sin humo: los datos salen de Google Search Console y Analytics, y tienes acceso directo a ambos.`

### 3.8 `/transformacion-digital` — nueva

- **Meta title:** `Transformación Digital para PYMES | Elaris Digital Solutions`
- **Meta description:** `Del papel y el Excel a una operación digital ordenada. Diagnóstico gratuito, hoja de ruta clara e implementación por fases según impacto.`
- **Hero:** badge `Transformación digital` · H1 `Del papel y el Excel a una operación digital.` · Subtítulo: `"Transformación digital" suena grande, pero significa algo simple: ordenar y digitalizar cómo opera tu empresa, empezando por lo que más te cuesta. Sin big bang — por fases, según impacto.`
- **Dolores:** `La información vive regada entre Excel, WhatsApp y papel` · `Tu equipo copia datos de un lado a otro, a mano, todos los días` · `No sabes tus números reales hasta fin de mes (si los sabes)` · `Crecer significa contratar más gente para hacer más trabajo manual`
- **Qué incluye:** diagnóstico gratuito de tus procesos actuales · hoja de ruta priorizada por impacto y esfuerzo (qué digitalizar primero y por qué) · implementación por fases — cada una entrega valor por sí sola · integración entre las herramientas que ya usas y las nuevas · capacitación de tu equipo en cada entrega · acompañamiento continuo con SLAs claros.
- **Caso real:** **Salcedo Jewels + CCC Impresiones** (fichas §7.1 y §7.3). Texto: `Dos empresas, el mismo punto de partida: Excel, papel y horas de trabajo manual. Hoy ambas operan sobre plataformas digitales propias — catálogo, inventario, pedidos y números en un solo lugar.` Métrica: `Hasta 80% menos tiempo operativo tras digitalizar`.
- **FAQ:**
  1. `¿Por dónde se empieza una transformación digital?` → `Por el diagnóstico gratuito: dos semanas mirando cómo opera hoy tu empresa. De ahí sale una hoja de ruta priorizada — casi siempre se empieza por el proceso que más tiempo consume o más errores genera, porque es donde el retorno se siente antes.`
  2. `¿Cuánto dura y cuánto cuesta?` → `Se avanza por fases de 4 a 10 semanas, cada una con valor propio: no esperas un año para ver resultados. Cada fase se cotiza cerrada (desde S/ 2,000 las más simples), y tú decides el ritmo entre fase y fase.`
  3. `¿Mi equipo no es técnico — va a poder usarlo?` → `Ese es el criterio de diseño número uno: si tu equipo no lo adopta, el proyecto falló. Construimos pensando en quien lo usará cada día, capacitamos en cada entrega y medimos la adopción real, no solo la entrega técnica.`
  4. `¿Qué pasa con las herramientas que ya uso?` → `Se aprovechan. No te hacemos tirar lo que funciona: integramos lo existente (contabilidad, facturación, hasta tus Excel críticos) y reemplazamos solo lo que te está frenando.`
  5. `¿En qué se diferencia esto de contratar un software genérico?` → `Un software genérico digitaliza un proceso estándar; la transformación digital ordena TU operación completa — y a veces la respuesta correcta es un software genérico para una parte y desarrollo a medida para otra. Nuestro diagnóstico te dice cuál conviene dónde, sin sesgo: el código que construimos es tuyo y no cobramos licencias.`

---

## 4. Página de apoyo `/apis-personalizadas`

Sin cambios de contenido. Sale del lineup (no aparece en menú, grilla ni footer), permanece `noindex`, y su única puerta de entrada es el enlace desde `/desarrollo-software-medida` (§3.1c). No borrar: el contenido técnico es bueno y puede volver al lineup si el servicio se reactiva.

---

## 5. Checklist de rutas y redirects

- [ ] Crear las 5 rutas nuevas (§1) con `ServicePageTemplate`.
- [ ] Crear `/inteligencia-artificial` con el contenido renovado (§3.2) y eliminar el directorio `src/app/implementacion-llms/`.
- [ ] Redirect 301 en `next.config.mjs`: `/implementacion-llms` → `/inteligencia-artificial`.
- [ ] Actualizar las 3 páginas existentes (§3.1, §3.3) y sus `page.tsx` con `{ index: true }`.
- [ ] `sitemap.ts` con las 9 URLs (C35).
- [ ] Grilla de la home (§2) y footer (C30) enlazando los 8 slugs.

---

## 6. Borradores de testimonios — ⚠️ PENDIENTE DE APROBACIÓN DEL CLIENTE

> Flujo acordado con el equipo: Elaris genera el borrador humanizado, se envía al cliente, y **solo se publica con su OK**. Completar `[NOMBRE]` y `[CARGO]` antes de enviar. Al aprobarse, añadir a `es.json testimonials.items` y a `testimonialSlugs` (C44).

**CCC Impresiones** — `[NOMBRE]`, `[CARGO]`, CCC Impresiones (Córdoba, Argentina):
> "Manejábamos todo en Excel y hojas impresas. Hoy tenemos catálogo online, cotizador y control de pedidos en un solo lugar — y por primera vez nos escriben clientes que nos encontraron en Google."

**UPC (Facultad de Ingeniería)** — `[NOMBRE]`, `[CARGO]`, Universidad Peruana de Ciencias Aplicadas:
> "Teníamos equipos que se renovaban cada cinco años sin que nadie los usara. Hoy los alumnos los reservan en línea y nuestro equipo controla retiros y devoluciones en tiempo real, en dos campus."

**VeltrixNFC** — `[NOMBRE]`, Fundador(a), VeltrixNFC:
> "Teníamos el producto físico y la visión, pero no el ecosistema digital para operarlo. Elaris lo construyó completo: perfiles digitales, tarjetas NFC y panel de gestión. Hoy operamos en Perú y Chile."

Fotos: pedir a cada cliente al enviar el borrador (mismo formato que las actuales: cuadrada, `/public/assets/`).

---

## 7. Fichas de caso (fuente de verdad para portafolio, tarjetas "Caso real" y futuras páginas `/casos/[slug]`)

### 7.1 Salcedo Jewels — caso insignia
- **Quién:** joyería mediana (3 empleados), tiendas en Lima, Chiclayo y Cajamarca. Joyería de lujo (oro italiano 18k).
- **Antes:** inventario en Excel y hojas; catálogo en PDF rehecho constantemente en Canva — cada pieza vendida obligaba a reorganizar todo el catálogo; parte del personal dedicada exclusivamente a mantenerlo al día.
- **Costo del problema:** ventas perdidas por vender dos veces la misma pieza (catálogo desfasado), clientes desanimados al pedir piezas ya vendidas, horas operativas enormes.
- **Qué se construyó:** e-commerce + sistema de inventario + gestión de pedidos con cuotas. Catálogo con stock en tiempo real por talla; carrito persistente; checkout en 3 pasos con validación peruana (DNI, teléfono, departamento); pago por transferencia + cuotas con control de cumplimiento (máx. 40 días entre pagos); seguimiento público de pedido por código sin login; mensajes de WhatsApp pre-armados; panel admin con carga de productos, editor de fotos integrado (brillo/contraste/recorte), reordenamiento drag-and-drop del catálogo y biblioteca de descripciones pre-escritas por categoría; restauración automática de stock al anular pedidos; pasarela Niubiz integrada en standby.
- **Resultado:** reducción estimada de **70–80% del tiempo operativo** (boletas, registros, actualización y envío de catálogos, edición de fotos — ahora todo automatizado o integrado) y **desestacionalización de las ventas**: el catálogo vivo se ofrece todo el año, ya no solo en campañas.
- **Activos:** fotos del "antes" (Excel, catálogo Canva) + sitio actual + sistema de gestión. Logo y cifras con nombre: **autorizados**. Testimonio ya publicado (Milagros Salcedo, CEO).
- **URL:** https://salcedojewels.com

### 7.2 Sistema de Inventario UPC
- **Quién:** Universidad Peruana de Ciencias Aplicadas (institución grande, Lima), coordinado con la Facultad de Ingeniería. Campus Monterrico y San Miguel.
- **Antes:** no existía sistema — los equipos (VR, Macs, tablets, dispositivos Android, cámaras, proyectores, insumos de cine) se renovaban cada 5 años **sin que nadie los usara**: no había forma de prestarlos.
- **Costo del problema:** inversión recurrente sin ningún beneficio para los estudiantes, que necesitaban esas herramientas para su desarrollo académico (testeo de apps, VR, programación móvil, producción audiovisual).
- **Qué se construyó:** plataforma institucional de reservas: registro con correo @upc.edu.pe y carrera; login por enlace mágico (sin contraseña); catálogo filtrado por campus con disponibilidad real por unidad física; asistente de reserva en 4 pasos (fecha → duración → horario en bloques de 30 min → propósito) con detección de conflictos y margen de 2 horas entre préstamos; asignación automática de la unidad física; panel de verificación en tiempo real para el personal (por retirar / en uso / atrasados) con máquina de estados de 6 estados; suspensiones temporales de alumnos incumplidos; días inhabilitados administrables; estadísticas por carrera; encuestas de satisfacción.
- **Resultado:** el problema quedó resuelto — los equipos que nadie usaba hoy se reservan y usan activamente en ambos campus, con control total de retiros y devoluciones.
- **Activos:** sin material del "antes" (no había sistema). Logo y cifras con nombre: **autorizados**. Testimonio: borrador §6 pendiente de aprobación.
- **URL:** https://upc-inventario.netlify.app

### 7.3 CCC Impresiones
- **Quién:** imprenta industrial mediana, Córdoba (Argentina). Productos estándar (etiquetas) + trabajos personalizados (textil, impresión 3D, grabado láser, códigos de barras).
- **Antes:** operación con Excel y hojas físicas; sin catálogo digital; cero captación de clientes por internet.
- **Costo del problema:** tiempo operativo alto, ningún canal de venta digital, invisibilidad total en Google.
- **Qué se construyó:** plataforma de gestión comercial 3-en-1: tienda online de productos en stock; cotizador de trabajos personalizados con formulario dinámico según el servicio (textil, 3D, láser…); panel de administración de 8 módulos (carga de productos, edición con editor de imágenes, reordenamiento drag-and-drop, pedidos con estados y cuotas con control de cumplimiento, estadísticas con gráficos, cotizaciones, datos bancarios, interruptor global tienda/consulta); inventario por variante con descuento automático de stock; checkout por transferencia con confirmación por WhatsApp; base técnica SEO desde el día uno.
- **Resultado:** de Excel y papel a catálogo digital con gestión integrada; **tráfico orgánico recurrente** desde Google; lista para amplificar con Google Ads y redes.
- **Activos:** sin material del "antes". Logo y cifras con nombre: **autorizados**. Testimonio: borrador §6 pendiente de aprobación.
- **URL:** https://cccimpresiones.com

### 7.4 VeltrixNFC
- **Quién:** startup de tarjetas de presentación metálicas con chip NFC (al acercar la tarjeta a un celular, se abre el perfil digital del dueño). Opera en Perú y Chile.
- **Antes:** tenían la idea y el producto físico, pero **no podían operar**: el negocio no existe sin su ecosistema digital.
- **Qué se construyó:** plataforma SaaS completa: perfil público personalizable (foto, cargo, botones de contacto, descarga de contacto directo al teléfono); redirección NFC (el chip abre el perfil correcto); panel del usuario para editar su tarjeta digital (hasta 6 botones, plantillas visuales); panel de administración del negocio (activación manual de cuentas con fecha de vencimiento, registro y vinculación de chips NFC, historial de todas las acciones); analítica de visitas y clics sin cookies (cumple normas de privacidad); protecciones anti-abuso (CAPTCHA, límites de peticiones).
- **Resultado:** **la startup pasó de idea a operar** con todo lo necesario, en dos países.
- **Activos:** sin material del "antes". Logo y cifras con nombre: **autorizados**. Testimonio: borrador §6 pendiente de aprobación.
- **URL:** https://veltrixnfc.com
