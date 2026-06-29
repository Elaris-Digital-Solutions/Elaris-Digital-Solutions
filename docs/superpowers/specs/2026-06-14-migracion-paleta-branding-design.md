# Diseño: Migración a la nueva paleta e identidad de marca (Elaris)

- **Fecha:** 2026-06-14
- **Rama:** `feat/migrate-nextjs`
- **Estado:** Aprobado. Listo para escribir el plan de implementación.

## 1. Objetivo

Aplicar la nueva identidad visual de Elaris (entregada en `branding/`) a la landing:
cambiar la paleta de colores y los logos, y **estandarizar los colores de marca del home**
para que todo consuma el sistema de tokens en vez de valores hardcodeados.

No se rehace el layout, el copy ni el SEO. Debe sentirse como un refresco de marca.

## 2. Contexto y hallazgos

Material en `branding/`: `paleta HEXADEC.jpeg` (paleta nueva), `Banner y logo/` (logo,
isotipo, lockups y banners, todos sobre fondo oscuro) y `Manual de marca.md`.

Hallazgos que condicionan el diseño:

1. **El manual está desactualizado.** Describe la paleta vieja (azul + cyan + verde lima
   sobre blanco). La identidad **nueva** es la de `paleta HEXADEC.jpeg` y los banners:
   cyan → azul → violeta → magenta, pensada para fondo oscuro. **Manda el material gráfico.**
2. **El design system existe pero casi no se usa.** Hay un azul `#2F64FF` que funciona como
   "primary de facto" hardcodeado **cientos de veces**; los tokens (`--primary`, etc.) están
   pero se ignoran. Auditoría: ~228 colores arbitrarios `[#...]` en 22 archivos de
   `src/components`, y 483 usos de clases neutras (`slate-*`) en 26 archivos.
3. **Hay 3 tipos de color** (ver §6): de marca (se tokenizan), neutros (se mantienen) y de
   terceros (logos de integraciones — se respetan).
4. **El Contact NO es oscuro hoy** (usa lavanda); se mantiene claro.
5. **Los logos nuevos son para fondo oscuro** (wordmark "ELARIS" blanco); no hay versión
   oscura del wordmark lista para fondo claro.

## 3. Decisión de alcance

- **Enfoque visual: híbrido**, blanco protagonista (~70%). Oscuro solo como marco.
- **Estandarización: solo el home.** Las páginas internas de servicios (CMMS, APIs, Custom
  Software, LLM, Términos, Políticas, etc.) quedan para una **fase 2** (ver §7).
- **Profundidad: solo colores de marca.** Los neutros `slate-*` se dejan como están; los
  colores de terceros se respetan.

### Mapa de secciones de la home

| Sección | Fondo | Notas |
|---|---|---|
| Navbar | claro | transparente sobre el Hero, blanco sólido al hacer scroll |
| **Hero** | **OSCURO (navy)** | portada de impacto, gradiente brand |
| SocialProof | claro | hoy tiene detalles en azul oscuro → se aclaran/re-tematizan |
| ServicesSplitPanel | claro | |
| Process | claro / lavanda | |
| Portfolio | claro | |
| Testimonials | lavanda | |
| FaqHome | claro | |
| **LeadMagnet** | **OSCURO (navy)** | franja CTA; se mantiene oscuro, re-tematizada al navy + gradiente nuevo |
| Team | claro | |
| Contact | claro (como hoy) | acentos nuevos; **no** se oscurece |
| **Footer** | **OSCURO (navy)** | cierre natural, logo blanco encaja |

## 4. Paleta nueva y sistema de tokens

Colores nuevos (HEX → HSL aprox., a afinar en implementación):

| Nombre | HEX | HSL aprox. |
|---|---|---|
| Cyan | `#00c0fd` | `hsl(194 100% 50%)` |
| Azul | `#0855fd` | `hsl(221 98% 51%)` |
| Violeta | `#752cfc` | `hsl(261 96% 58%)` |
| Magenta | `#c659fb` | `hsl(280 95% 67%)` |

### Tokens objetivo (en `src/app/globals.css`)

| Token | Valor | Uso |
|---|---|---|
| `--primary` | `221 98% 51%` (azul) | botones, links, CTA. Sustituye `#2F64FF`. Hover/active vía `primary/90` |
| `--primary-foreground` | `0 0% 100%` | texto sobre primary |
| `--secondary` | `261 96% 58%` (violeta) | acento distintivo: iconos, hovers, detalles |
| `--accent` | `194 100% 50%` (cyan) | brillos/remates; luce en zonas oscuras. Magenta solo en gradientes |
| `--ring` | `261 96% 58%` (violeta) | anillo de foco en inputs |
| `--foreground` | `220 25% 6%` | texto principal — se mantiene. Sustituye `#111` |
| `--destructive` | `0 84% 60%` | errores — se mantiene |
| `--surface-alt` (NUEVO) | `226 100% 97%` (lavanda) | secciones alternas y fondos suaves. Sustituye `#F0F4FF`/`#eff4ff` |
| `--dark` (NUEVO) | `225 51% 4%` (navy `#05070F`) | fondo de secciones oscuras (Hero/Footer). Unifica `#030E2C`/`#071540` |
| `--dark-foreground` (NUEVO) | `0 0% 100%` | texto sobre `--dark` |

### Gradientes

- `--gradient-brand` (NUEVO): cyan → azul → violeta → magenta. Hero, isotipo, remates.
- `--gradient-primary`: azul → cyan. Botones/headers de software.
- `--gradient-accent`: violeta → magenta. Destacar IA / crecimiento.
- `--gradient-dark`: se mantiene.

### Botón de WhatsApp — se mantiene VERDE

No migra a la paleta nueva: conserva el verde propio de WhatsApp por reconocimiento (UX) y
porque el manual aísla ese verde para ese único uso. Solo se ajusta la sombra/glow.

## 5. Logos

Variantes nuevas en `branding/Banner y logo/`: isotipo "E" a color (transparente, versátil),
lockup "ELARIS" blanco (solo oscuro), lockups isotipo + "DIGITAL SOLUTIONS", y badges
circulares (moneda navy, para favicon/avatar).

### Asignación por slot

| Slot | Variante | Reemplaza |
|---|---|---|
| **Navbar** (claro) | **Opción A:** isotipo a color + "ELARIS" en texto oscuro (token `--foreground`) | `ElarisLogo.webp` |
| **Footer** (oscuro) | Lockup "ELARIS" blanco | `ElarisLogoWhite.webp` |
| **Hero** (oscuro) | Isotipo a color como acento decorativo (el lockup "ELARIS" queda reservado al Footer) | — |
| **Favicon** | Badge moneda (isotipo) | `favicon.ico` / `favicon.png` |

Notas: los PNG traen mucho lienzo transparente → **recortar** y **convertir a WebP** siguiendo
el patrón de `/public/assets/*.webp`. El "ELARIS" del Navbar va como texto, no como imagen.

## 6. Los 3 tipos de color (regla de tokenización)

1. **Marca → SÍ se tokeniza:** `#2F64FF`, `#2553e6`, `#030E2C`, `#071540`, `#F0F4FF`,
   `#eff4ff`, `#7EABFF`, `#6B9FFF`, `#13367e`, `#111`, etc.
2. **Neutros → se MANTIENEN:** clases `slate-*`/`gray-*` de Tailwind (ya son escala consistente).
3. **Terceros → se RESPETAN:** logos de integraciones (`#4A154B` Slack, `#635BFF` Stripe,
   `#FF7A59` HubSpot, `#007DB8`, etc.). No se tocan.

### Mapa hardcoded → token (home)

| Hardcoded | Token destino |
|---|---|
| `#2F64FF` | `--primary` |
| `#2553e6` | `primary/90` (estado hover) |
| `#030E2C`, `#071540` | `--dark` |
| `#F0F4FF`, `#eff4ff` | `--surface-alt` |
| `#7EABFF`, `#6B9FFF`, `#13367e` | escala del primary (`primary/N` u opacidades) |
| `#111` | `--foreground` |

## 7. Archivos del home a tocar

`Navbar.tsx`, `Hero.tsx` + `ui/synthetic-hero.tsx` (+ `ui/typing-console.tsx`),
`SocialProof.tsx`, `ui/services-split-panel.tsx`, `Process.tsx`,
`Portfolio.tsx` + `ui/projects-carousel.tsx`, `Testimonials.tsx` + `ui/circular-testimonials.tsx`,
`FaqHome.tsx`, `LeadMagnet.tsx`, `Team.tsx`, `Contact.tsx` (+ `ui/neural-noise-cursor.tsx`),
`Footer.tsx`, `ui/floating-whatsapp-button.tsx`, `src/app/globals.css`, `tailwind.config.ts`.

## 8. Fuera de alcance

- **Páginas internas de servicios** (CMMS, APIs, Custom Software, LLM, Landing, Términos,
  Políticas) y sus `ui/*-hero`/`ui/*-block` → **fase 2**.
- Neutros `slate-*` (se mantienen) y colores de terceros (se respetan).
- Layout, copy/i18n, SEO/JSON-LD/sitemap/robots/pixels, lógica de formularios y tracking.

## 9. Zonas oscuras (resuelto)

Quedan **3 zonas oscuras**, todas re-tematizadas al navy `--dark` + gradiente brand:
**Hero** (portada), **LeadMagnet** (franja CTA) y **Footer** (cierre). El resto del home es
claro. LeadMagnet se mantiene oscuro por ser un bloque de acción, no de lectura. Los detalles
en azul oscuro de **SocialProof** se re-tematizan a los tokens nuevos sin volver oscura la
sección (sigue clara).

## 10. Criterios de aceptación

- Hero, LeadMagnet y Footer con fondo navy (`--dark`), nueva gama y logos correctos.
- Resto del home claro (blanco/`--surface-alt`) y legible.
- Cero `#2F64FF` (y demás colores de marca) sueltos en los archivos del home: todo vía tokens.
- Navbar con isotipo a color + "ELARIS" en texto, legible sobre blanco.
- Botón de WhatsApp sigue verde. Favicon actualizado al isotipo nuevo.
- Neutros `slate-*` y logos de terceros intactos.
- Sin regresiones de contraste/legibilidad en zonas claras.
