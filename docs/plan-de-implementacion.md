# Plan de mejora de la landing de Elaris — v2

> ## ✅ Fases 1 y 2 implementadas el 2026-07-31
> Detalle de lo ejecutado y las desviaciones: [documento-de-cambios.md](documento-de-cambios.md).
> Queda abierta la Fase 3 (§4), cuyo primer paso —captura server-side del lead— sigue bloqueado por
> una decisión de negocio: **a qué destino va el lead** (Resend, CRM o una hoja). Hasta resolverlo, el
> embudo sigue dependiendo por completo de que el visitante termine la conversación en WhatsApp.

**Fecha:** 2026-07-31 (v2 — integra las respuestas del cuestionario de casos de éxito y la nueva arquitectura de 8 servicios)
**Fuentes:** Auditoría externa (scorecard 68/100) + análisis directo del repositorio + respuestas del equipo Elaris (2026-07-31) + fichas técnicas de las 4 apps ("Qué tipo de app son").
**Documentos hermanos:**
- [documento-de-cambios.md](documento-de-cambios.md) — instrucciones accionables (Fases 1 y 3).
- [especificacion-paginas-servicio.md](especificacion-paginas-servicio.md) — spec completa de las 8 páginas de servicio (Fase 2).

**Estado: listo para implementar con Opus 5.** Todas las decisiones que bloqueaban copy están resueltas; los únicos pendientes son aprobaciones de clientes (testimonios nuevos) y no bloquean ninguna fase.

---

## 0. Qué cambió respecto a la v1

| Tema | v1 (pendiente) | v2 (resuelto) |
|---|---|---|
| Posicionamiento del hero | Decisión abierta (dual vs. industrial) | **Dual confirmado** por la propia línea de servicios (web, e-commerce, SEO, MVP + software, IA, CMMS, transformación): Elaris vende "vender más **y** operar mejor". |
| Métricas del hero | `[DATO PENDIENTE]` | Confirmadas/estimadas por el equipo: **hasta 80% menos tiempo operativo** (Salcedo), proyectos en **Perú, Chile y Argentina**, **diagnóstico gratuito**. El bloque `socialProof` viejo fue retirado por el equipo; se reconstruye con estas cifras. |
| Costo del diagnóstico | `[DATO PENDIENTE]` | **Gratuito.** Esto además refuerza todos los CTAs ("diagnóstico gratuito"). |
| Rango de inversión | `[DATO PENDIENTE]` | Proyectos **desde S/ 2,000** (plataforma web sencilla), escala por complejidad e impacto. Recomendación: publicar el piso (filtra leads no calificados); el encuadre cualitativo queda como alternativa si prefieren no publicar cifra. |
| Testimonio Papelera Latinoamericana | Reordenar | **Se elimina** (el cliente ya no va). Quedan 2 testimonios reales; se redactan 3 borradores nuevos (UPC, CCC, Veltrix) para aprobación de cada cliente — ver spec §6. |
| Métricas del portafolio | `[DATO PENDIENTE]` | Resueltas con datos reales por caso (ver §3 y fichas en la spec). Logos y cifras con nombre: **autorizados** ("sí y sí"). |
| Urgencia/escasez | Pregunta abierta | **Descartada definitivamente** (no hay límite real de cupos). |
| Widget WhatsApp (Sergio) | Pregunta abierta | **Se mantiene** tal cual (es sostenible). |
| Páginas de servicio | Indexar las 4 existentes | **Sustituido por una arquitectura nueva de 8 servicios** (ver §2). `/impulsa-tu-negocio` deja de considerarse página de servicio: es una landing de prueba para Meta Ads y se queda fuera del lineup (noindex, sin enlaces desde el sitio). |

---

## 1. Veredicto sobre la auditoría (resumen vigente)

Sin cambios de fondo respecto a la v1, con dos actualizaciones:

- El gap "casos sin métricas" queda **cerrado con datos reales**: Salcedo (reducción estimada de 70–80% del tiempo operativo + desestacionalización de ventas), UPC (equipos renovados cada 5 años que nadie usaba → reservas activas de estudiantes en 2 campus), CCC (de Excel y papel → catálogo digital con tráfico orgánico recurrente, lista para Google Ads), Veltrix (de idea → startup operando en Perú y Chile).
- El gap "arquitectura SEO por servicio" se resuelve con **más ambición que la auditoría**: 8 páginas indexables alineadas a los servicios reales de 2026, no 4 páginas heredadas.

Sigue vigente el hallazgo propio más grave: **el embudo depende de WhatsApp sin captura previa del lead** (Fase 3, C40 del documento de cambios).

---

## 2. Arquitectura de servicios (decisión central de la v2)

### 2.1 Los 8 servicios y sus URLs

| # | Servicio | Slug | Estado | Caso que lo respalda |
|---|---|---|---|---|
| 1 | Desarrollo de software a medida | `/desarrollo-software-medida` | Existe — se actualiza copy | UPC, CCC |
| 2 | Inteligencia Artificial | `/inteligencia-artificial` | **Renombrar** desde `/implementacion-llms` (redirect 301) | — (capacidad transversal) |
| 3 | Implementación de CMMS | `/implementacion-cmms` | Existe — se actualiza copy | — (servicio en promoción) |
| 4 | Desarrollo de MVPs | `/desarrollo-mvp` | **Nueva** | Veltrix |
| 5 | Desarrollo web | `/desarrollo-web` | **Nueva** | CCC |
| 6 | E-commerce | `/e-commerce` | **Nueva** | Salcedo (flagship), CCC |
| 7 | Posicionamiento SEO | `/posicionamiento-seo` | **Nueva** | CCC |
| 8 | Transformación digital | `/transformacion-digital` | **Nueva** | Salcedo, CCC (de Excel/papel a plataforma) |

Notas:
- `/apis-personalizadas` **sale del lineup** (no está en la lista de servicios 2026). Se mantiene viva como página de apoyo enlazada solo desde "Desarrollo de software a medida" (su contenido es bueno y no cuesta nada conservarlo). No va en menú, panel ni footer.
- `/impulsa-tu-negocio` queda como landing exclusiva de pauta Meta: noindex, sin enlaces internos. El ítem "web" del panel de servicios deja de apuntar ahí.
- Todas las páginas se construyen **con el design system actual de la home** (paleta oficial, `brand-gradient`, glass, Navbar/Footer/Contact compartidos). Las 3 páginas existentes ya lo cumplen; las 5 nuevas siguen la plantilla de la spec.

### 2.2 Principio de lenguaje claro (aplica a todo)

Los nombres de los servicios usan terminología del sector (CMMS, MVP, SEO, IA). Regla editorial para que la página siga siendo entendible:

1. **El H1 vende el beneficio en lenguaje llano; el nombre técnico va al lado o debajo** (ej.: H1 "Digitaliza el mantenimiento de tu planta" + badge "CMMS").
2. **Todo acrónimo se explica en su primera aparición** en cada página ("CMMS: el software que organiza el mantenimiento", "MVP: la primera versión funcional de tu producto").
3. **Los dolores se describen como los vive el cliente** ("pierdes ventas porque el catálogo está desactualizado"), no como los describe un ingeniero ("falta de sincronización de inventario").
4. Jerga permitida solo en las secciones "Qué incluye" (donde el comprador técnico la espera), nunca en héroes ni CTAs.

### 2.3 Sección Servicios de la home: de 3 tabs a 8 tarjetas en 2 grupos

El split-panel actual (3 servicios) no escala a 8 y además ya no refleja la oferta. Se reemplaza por una **grilla de 8 tarjetas organizada en los 2 motores del posicionamiento**, reforzando el claim del hero:

- **Para vender más:** Desarrollo web · E-commerce · Posicionamiento SEO · Desarrollo de MVPs
- **Para operar mejor:** Software a medida · Inteligencia Artificial · CMMS · Transformación digital

Cada tarjeta: icono + nombre del servicio + beneficio en una línea + enlace a su página. Spec visual completa en [especificacion-paginas-servicio.md](especificacion-paginas-servicio.md) §2.

---

## 3. Plan por secciones de la home (actualizado)

Orden final (igual que v1): `Navbar → Hero (+franja de prueba) → Servicios (8 tarjetas) → Estándares (+CTA) → Portafolio (+métricas y CTA) → Testimonios → Lead Magnet → FAQ → Equipo → Contacto → Footer`

### 3.1 Navegación
Igual que v1 (ítems Servicios · Casos · Por qué Elaris · FAQ, enlaces reales, limpieza ARIA) con dos cambios:
- CTA del navbar: **"Diagnóstico gratuito"** (el dato confirmado es más fuerte que "Solicitar diagnóstico").
- En Fase 2, el ítem "Servicios" se convierte en dropdown con los 8 servicios.

### 3.2 Hero
- Título (confirmado, Opción A): *"Tecnología a medida para negocios que necesitan vender más y operar mejor."*
- CTA primario: **"Solicitar diagnóstico gratuito"**.
- Franja de prueba social (reemplaza al `socialProof` retirado), con datos reales autorizados:
  *"Hasta 80% menos tiempo operativo en clientes reales · Proyectos en Perú, Chile y Argentina · El código es 100% tuyo · Diagnóstico gratuito"*
- Dependencias: ninguna.

### 3.3 Servicios → ver §2.3 (reemplazo completo de la sección).

### 3.4 Estándares — igual que v1 (CTA de cierre, ahora "Solicitar diagnóstico gratuito").

### 3.5 Portafolio
Resuelto con datos reales. Cada proyecto pasa a mostrar (desktop y móvil) categoría + métrica verdadera:

| Proyecto | Métrica final (autorizada) |
|---|---|
| Salcedo Jewels | "Hasta 80% menos tiempo operativo y ventas todo el año, sin depender de campañas" |
| Sistema de Inventario UPC | "Equipos que nadie usaba, hoy reservados por estudiantes en 2 campus" |
| CCC Impresiones | "De Excel y papel a catálogo digital con tráfico orgánico constante" |
| VeltrixNFC | "De una idea a una startup operando en Perú y Chile" |

Las descripciones también se actualizan (las actuales subestiman lo construido — cada app es en realidad 3 sistemas en uno, según las fichas técnicas). Textos finales en el documento de cambios (C15–C17).

En Fase 3, los clics del portafolio llevarán a páginas de caso (`/casos/[slug]`) construidas desde las fichas de la spec §7; Salcedo además tiene material de "antes" (fotos del Excel, catálogo Canva) para un antes/después visual — es el único caso con evidencia previa, aprovecharlo como caso insignia.

### 3.6 Testimonios
- **Eliminar** el testimonio de Miguel del Solar / Papelera Latinoamericana (cliente descartado).
- Quedan: Milagros Salcedo (primero — CEO B2B con el caso más fuerte) y Daniela Bussalleu (segundo).
- **Redactar 3 testimonios nuevos** (UPC, CCC, Veltrix) de forma humanizada y enviarlos a cada cliente para aprobación (flujo confirmado por el equipo: "generarla de forma automatizada y pasárselas para su aprobación"). Borradores listos en la spec §6. **No publicar sin OK del cliente.**
- Dependencia: aprobación de clientes (no bloquea Fases 1–2).

### 3.7 Lead Magnet — igual que v1 (CTA "Quiero el checklist gratis", mover antes de la FAQ; PDF automatizado en Fase 3).

### 3.8 FAQ — resuelto:
- Diagnóstico: **"El diagnóstico es gratuito y toma dos semanas…"** (texto final en C23).
- Nueva pregunta de inversión con el piso publicado: **"Los proyectos parten desde S/ 2,000…"** (texto final en C24; variante cualitativa incluida por si prefieren no publicar cifra).

### 3.9 Contacto — igual que v1 (botón "Continuar por WhatsApp", textarea, enlace a `/meet`, fix Calendly). La captura server-side del lead sigue en Fase 3 (decisión de destino pendiente: Resend/CRM).

### 3.10 Footer — columna Servicios con los **8** enlaces nuevos + "Agenda una reunión" + FAQ.

### 3.11 SEO
- Indexar la home + las 8 páginas de servicio (9 URLs en sitemap).
- Redirect 301 `/implementacion-llms` → `/inteligencia-artificial`.
- `/impulsa-tu-negocio`, `/meet`, `/apis-personalizadas` y legales: noindex (sin cambio).
- Title/description de la home alineados al posicionamiento dual (C36).

### 3.12 Medición — igual que v1 (GA4 + 6 eventos, línea base CWV antes de desplegar). El evento `cta_servicio` ahora lleva el slug de los 8 servicios.

### 3.13 Accesibilidad y rendimiento — igual que v1 (contrastes, focus-visible, ARIA, `prefers-reduced-motion` en los canvas WebGL).

---

## 4. Fases de ejecución (para Opus 5)

**Fase 1 — Home (1–2 días).** Documento de cambios C01–C39: navegación, hero con datos confirmados, sección Servicios nueva (8 tarjetas), CTAs por sección, portafolio con métricas reales, testimonios depurados, FAQ resuelta, contacto honesto, footer, accesibilidad. Sin dependencias externas.

**Fase 2 — Páginas de servicio (3–5 días).** [especificacion-paginas-servicio.md](especificacion-paginas-servicio.md): actualizar 3 páginas existentes, crear 5 nuevas con la plantilla común, redirect de LLMs → IA, indexación + sitemap de 9 URLs. Depende solo de Fase 1 (la grilla de servicios enlaza estas páginas; se pueden desplegar juntas).

**Fase 3 — Conversión avanzada y contenido (2–6 semanas).** Captura server-side del lead (decidir destino), GA4, PDF del lead magnet, dropdown de servicios en navbar, testimonios nuevos (tras aprobación de clientes), páginas de caso `/casos/[slug]` (Salcedo primero — único con antes/después), hub `/recursos`.

---

## 5. Datos confirmados y pendientes

### Confirmado (usable ya)
- Diagnóstico **gratuito**, dos semanas.
- Proyectos **desde S/ 2,000** (piso publicable como recomendación).
- Logos y cifras con nombre de cliente: **autorizados**.
- Métricas por caso: ver §3.5 y fichas completas en la spec §7.
- Sin urgencia artificial; widget de WhatsApp se mantiene.
- Alcance geográfico real: **Perú, Chile y Argentina** (Salcedo: Lima, Chiclayo y Cajamarca; UPC: Lima — Monterrico y San Miguel; CCC: Córdoba, Argentina; Veltrix: Perú y Chile). Nota: el schema `areaServed` y el copy "Perú y LATAM" se quedan, ya son coherentes.

### Pendiente (no bloquea)
1. **Aprobación de los 3 testimonios borrador** por UPC, CCC y Veltrix (spec §6). Publicar solo los aprobados.
2. **Confirmación final del piso "desde S/ 2,000"** en la FAQ (el equipo dejó abierta la opción cualitativa; el documento de cambios trae ambas variantes, se implementa la del piso salvo indicación contraria).
3. Fotos del "antes" de Salcedo (Excel, catálogo Canva) — recopilarlas para la página de caso de Fase 3.
