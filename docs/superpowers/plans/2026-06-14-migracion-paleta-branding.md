# Migración de paleta e identidad de marca (home) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Aplicar la nueva paleta e identidad de marca de Elaris al home y estandarizar sus colores de marca en tokens del design system, sin tocar layout, copy ni SEO.

**Architecture:** Se centraliza el color en variables CSS (`:root` de `globals.css`) y se hace que los componentes del home las consuman vía clases de Tailwind (`bg-primary`, `text-foreground`, etc.) en vez de hex hardcodeados. Tres zonas oscuras (Hero, LeadMagnet, Footer) usan un token navy + gradiente brand; el resto queda claro. Los logos nuevos se generan como WebP recortados.

**Tech Stack:** Next.js 14 (App Router), Tailwind CSS 3.4 (tokens HSL), Framer Motion, GSAP. Verificación: `npm run lint`, `npm run build`, y barrido visual con Playwright en `http://localhost:8080`.

**Naturaleza del trabajo:** Es un refactor de UI/color, no lógica con unit tests. La "verificación" de cada tarea es: (a) `grep` confirmando que el color viejo desapareció, (b) `npm run lint` sin errores nuevos, y (c) al final, revisión visual. Hay commits frecuentes.

**Mapa hardcoded → token (CANÓNICO, usado por varias tareas):**

| Hardcoded (cualquier prefijo `bg-`/`text-`/`border-`/`from-`/`to-`/`ring-`) | Reemplazo | Notas |
|---|---|---|
| `[#2F64FF]` | `primary` | conserva sufijo de opacidad: `[#2F64FF]/10` → `primary/10` |
| `hover:bg-[#2553e6]` | `hover:bg-primary/90` | azul hover |
| `[#071540]` como **texto/borde** en sección clara | `foreground` | `text-[#071540]/60` → `text-foreground/60` |
| `[#071540]`/`[#13367e]`/`[#030E2C]` como **fondo** de zona oscura | `dark` | `bg-[#071540]` → `bg-dark` |
| `[#F0F4FF]`, `[#eff4ff]` | `surface-alt` | `bg-[#F0F4FF]` → `bg-surface-alt` |
| `[#F8FAFC]` | `slate-50` | neutro; se normaliza a la escala Tailwind |
| `[#7EABFF]`, `[#6B9FFF]` (sobre oscuro) | `accent` | cyan; resalta sobre navy |
| `[#111]` | `foreground` | texto navbar |
| `#22C55E`/`#FFC961`/`#FF4858` (puntos de consola), logos de terceros | **sin cambio** | decorativos/marcas externas |

---

## Task 1: Tokens base en `globals.css`

**Files:**
- Modify: `src/app/globals.css:14-64` (bloque `:root`), `:135-150` (`.site-sections`)

- [ ] **Step 1: Reemplazar el bloque de tokens `:root`**

En `src/app/globals.css`, reemplaza el contenido del `:root` (desde `--background` hasta `--sky-500`, líneas ~15-63) por:

```css
    /* Base */
    --background: 0 0% 100%;
    --foreground: 220 25% 6%;

    --card: 0 0% 100%;
    --card-foreground: 220 25% 6%;

    --popover: 0 0% 100%;
    --popover-foreground: 220 25% 6%;

    /* Primary - Azul #0855fd */
    --primary: 221 98% 51%;
    --primary-foreground: 0 0% 100%;

    /* Secondary - Violeta #752cfc */
    --secondary: 261 96% 58%;
    --secondary-foreground: 0 0% 100%;

    /* Muted */
    --muted: 220 15% 96%;
    --muted-foreground: 215 16% 47%;

    /* Accent - Cyan #00c0fd */
    --accent: 194 100% 50%;
    --accent-foreground: 220 25% 6%;

    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 100%;

    --border: 220 13% 91%;
    --input: 220 13% 91%;
    --ring: 261 96% 58%;

    /* Superficie alterna - Lavanda #F0F4FF */
    --surface-alt: 226 100% 97%;

    /* Zonas oscuras - Navy #05070F */
    --dark: 225 50% 4%;
    --dark-foreground: 0 0% 100%;

    --radius: 0.75rem;

    /* Gradientes */
    --gradient-brand: linear-gradient(120deg, hsl(194 100% 50%) 0%, hsl(221 98% 51%) 35%, hsl(261 96% 58%) 70%, hsl(280 95% 67%) 100%);
    --gradient-primary: linear-gradient(135deg, hsl(221 98% 51%) 0%, hsl(194 100% 50%) 100%);
    --gradient-accent: linear-gradient(135deg, hsl(261 96% 58%) 0%, hsl(280 95% 67%) 100%);
    --gradient-dark: linear-gradient(180deg, hsl(0 0% 100%) 0%, hsl(0 0% 98%) 100%);

    /* Glows */
    --glow-primary: 0 0 40px hsl(221 98% 51% / 0.4);
    --glow-secondary: 0 0 40px hsl(261 96% 58% / 0.4);
    --glow-accent: 0 0 40px hsl(194 100% 50% / 0.4);

    --transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```

(Se eliminan las variables sobrantes `--sky-400`/`--sky-500` del `:root` y del bloque `.dark`.)

- [ ] **Step 2: Alinear la sección oscura y la alterna a los tokens**

Reemplaza el bloque `.site-sections` (líneas ~136-150) por:

```css
  /* Alternancia de secciones */
  .site-sections > section {
    background-color: #FFFFFF;
  }

  .site-sections > section:nth-of-type(2n) {
    background-color: hsl(var(--surface-alt));
  }

  /* Opt-out: secciones de fondo oscuro */
  .site-sections > section.site-dark-section {
    background-color: hsl(var(--dark));
    color: hsl(var(--dark-foreground));
  }
```

- [ ] **Step 3: Eliminar `--sky-400`/`--sky-500` del bloque `.dark`**

En el bloque `.dark { ... }` (líneas ~70-73) elimina las dos líneas `--sky-400`/`--sky-500`, dejando el bloque vacío o quitándolo si queda sin reglas.

- [ ] **Step 4: Verificar build**

Run: `npm run lint && npm run build`
Expected: compila sin errores. (Aún hay hex en componentes; se limpian en tareas siguientes.)

- [ ] **Step 5: Commit**

```bash
git add src/app/globals.css
git commit -m "refactor(theme): nueva paleta de marca en tokens base"
```

---

## Task 2: Exponer tokens nuevos en Tailwind

**Files:**
- Modify: `tailwind.config.ts:22-61`

- [ ] **Step 1: Añadir colores y gradiente nuevos**

En `tailwind.config.ts`, dentro de `theme.extend.colors`, añade después de la entrada `card` (línea ~55):

```ts
  			"surface-alt": 'hsl(var(--surface-alt))',
  			dark: {
  				DEFAULT: 'hsl(var(--dark))',
  				foreground: 'hsl(var(--dark-foreground))'
  			},
```

Y en `theme.extend.backgroundImage` (línea ~57-61) añade `gradient-brand`:

```ts
  		backgroundImage: {
  			'gradient-brand': 'var(--gradient-brand)',
  			'gradient-primary': 'var(--gradient-primary)',
  			'gradient-accent': 'var(--gradient-accent)',
  			'gradient-dark': 'var(--gradient-dark)'
  		},
```

- [ ] **Step 2: Verificar build**

Run: `npm run build`
Expected: compila. Las clases `bg-dark`, `text-dark-foreground`, `bg-surface-alt`, `bg-gradient-brand` ya son válidas.

- [ ] **Step 3: Commit**

```bash
git add tailwind.config.ts
git commit -m "refactor(theme): exponer surface-alt, dark y gradient-brand en Tailwind"
```

---

## Task 3: Generar assets de logo nuevos (WebP)

**Files:**
- Create: `scripts/build-logos.mjs`
- Create/overwrite: `public/assets/ElarisIsotipo.webp`, `public/assets/ElarisLogoWhite.webp`, `public/favicon.png`

> El `public/favicon.ico` existente y el `site.webmanifest` se dejan como están en esta fase; actualizar el `.ico` (requiere otra herramienta) es un follow-up menor.

**Fuentes** en `branding/Banner y logo/PNG/`: `2.png` = isotipo a color; `1.png` = wordmark "ELARIS" blanco + "DIGITAL SOLUTIONS"; `6.png` = badge moneda con isotipo (favicon).

- [ ] **Step 1: Confirmar visualmente las fuentes sobre fondo oscuro**

Abre `branding/Banner y logo/PNG/1.png`, `2.png` y `6.png`. Verifica: `2.png` = solo el isotipo a color (transparente); `1.png` = "ELARIS" blanco + "DIGITAL SOLUTIONS" (el "ELARIS" blanco solo se ve sobre fondo oscuro); `6.png` = moneda navy con isotipo. Si la correspondencia difiere, ajusta los nombres en el script del Step 3.

- [ ] **Step 2: Instalar `sharp` como devDependency**

Run: `npm i -D sharp`
Expected: instala sin error.

- [ ] **Step 3: Crear el script de recorte + conversión**

Create `scripts/build-logos.mjs`:

```js
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const SRC = "branding/Banner y logo/PNG";
const OUT = "public/assets";
mkdirSync(OUT, { recursive: true });

// Logos WebP (recortados al contenido)
const webpJobs = [
  { in: `${SRC}/2.png`, out: `${OUT}/ElarisIsotipo.webp`, height: 128 },
  { in: `${SRC}/1.png`, out: `${OUT}/ElarisLogoWhite.webp`, height: 160 },
];

for (const job of webpJobs) {
  await sharp(job.in).trim().resize({ height: job.height }).webp({ quality: 90 }).toFile(job.out);
  console.log("✓", job.out);
}

// Favicon como PNG (moneda navy con isotipo)
await sharp(`${SRC}/6.png`).trim().resize({ height: 256 }).png().toFile("public/favicon.png");
console.log("✓ public/favicon.png");
```

- [ ] **Step 4: Ejecutar el script**

Run: `node scripts/build-logos.mjs`
Expected: imprime `✓` por cada asset. Genera `ElarisIsotipo.webp`, `ElarisLogoWhite.webp` y `public/favicon.png`.

- [ ] **Step 5: Verificar los WebP generados**

Abre `public/assets/ElarisIsotipo.webp` y `public/assets/ElarisLogoWhite.webp`. Confirma que están recortados (sin lienzo transparente enorme) y nítidos.

- [ ] **Step 6: Commit**

```bash
git add scripts/build-logos.mjs public/assets/ElarisIsotipo.webp public/assets/ElarisLogoWhite.webp public/favicon.png package.json package-lock.json
git commit -m "assets: generar logos WebP nuevos (isotipo, lockup blanco, favicon)"
```

---

## Task 4: Hero oscuro (`synthetic-hero.tsx`)

> Inversión: el Hero hoy es claro (`bg-[#F0F4FF]`) y pasa a navy con gradiente brand, isotipo y texto blanco. La "consola" se mantiene como tarjeta de cristal clara (estética de terminal sobre navy).

**Files:**
- Modify: `src/components/ui/synthetic-hero.tsx`

- [ ] **Step 1: Importar el componente de imagen**

Tras la línea 9 (`import { NeuralNoise } ...`), añade:

```tsx
import SmartImage from "@/components/ui/smart-image";
```

- [ ] **Step 2: Fondo de sección a navy + gradiente**

Reemplaza la línea 130:

```tsx
      className="relative flex items-center justify-center min-h-screen overflow-hidden bg-[#F0F4FF]"
```

por:

```tsx
      className="relative flex items-center justify-center min-h-screen overflow-hidden bg-dark"
```

Y justo después del `<div className="absolute inset-0 z-0"> ... </div>` del NeuralNoise (después de la línea 139), añade una capa de resplandor brand:

```tsx
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-30 [background:var(--gradient-brand)] [mask-image:radial-gradient(60%_50%_at_50%_40%,black,transparent)]"
        aria-hidden
      />
```

- [ ] **Step 3: Isotipo + título en blanco**

Dentro de `<div className="relative z-10 ...">` (línea 141), antes del `<h1>` (línea 144), añade:

```tsx
        <SmartImage
          src="/assets/ElarisIsotipo.webp"
          alt="Elaris"
          priority
          width={56}
          height={56}
          className="mb-6 h-14 w-auto"
        />
```

Reemplaza la línea 146:

```tsx
          className="text-4xl md:text-6xl max-w-4xl font-light tracking-tight text-[#071540] mb-6"
```

por:

```tsx
          className="text-4xl md:text-6xl max-w-4xl font-light tracking-tight text-white mb-6"
```

- [ ] **Step 4: Cursor de consola y botones a tokens**

Reemplaza la línea 170 (`cursorClassName="bg-[#2F64FF]"`) por:

```tsx
              cursorClassName="bg-primary"
```

Reemplaza el bloque `classes` (líneas 181-183) por:

```tsx
            const classes = isPrimary
              ? "px-8 py-3 rounded-xl text-base font-medium bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_18px_60px_hsl(221_98%_51%/0.45)] transition-[background-color,box-shadow] duration-300 cursor-pointer"
              : "px-8 py-3 rounded-xl text-base font-medium border border-white/35 text-white hover:bg-white/10 backdrop-blur-lg transition-[background-color,color] duration-300 cursor-pointer";
```

- [ ] **Step 5: Micro-detalles sobre oscuro**

Reemplaza la línea 214 (`text-[#071540]/60`) por `text-white/60`, y la línea 218 (`bg-[#2F64FF]/60`) por `bg-accent`:

```tsx
            className="mt-8 flex flex-wrap justify-center gap-6 text-xs font-light tracking-tight text-white/60"
```
```tsx
                <span className="h-1 w-1 rounded-full bg-accent" />
```

- [ ] **Step 6: Verificar que no quedan hex de marca**

Run: `grep -nE "#2F64FF|#071540|#F0F4FF" src/components/ui/synthetic-hero.tsx`
Expected: sin coincidencias (los puntos de consola `#22C55E/#FFC961/#FF4858` permanecen y son correctos).

- [ ] **Step 7: Verificar build**

Run: `npm run build`
Expected: compila.

- [ ] **Step 8: Commit**

```bash
git add src/components/ui/synthetic-hero.tsx
git commit -m "feat(hero): Hero oscuro con gradiente brand, isotipo y tokens"
```

---

## Task 5: SocialProof claro (`SocialProof.tsx`)

> Inversión: hoy es una banda navy; pasa a clara para no encadenar dos zonas oscuras tras el Hero. Los números quedan en `primary` sobre blanco.

**Files:**
- Modify: `src/components/SocialProof.tsx`

- [ ] **Step 1: Fondo claro y textos legibles**

Reemplaza la línea 8:

```tsx
    <section className="bg-[#071540] py-12 sm:py-16">
```
por:
```tsx
    <section className="bg-white py-12 sm:py-16">
```

Reemplaza la línea 10 (`text-white/50` → neutro oscuro):

```tsx
        <p className="mb-10 text-center text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 sm:text-sm">
```

Reemplaza la línea 23 (`text-[#2F64FF]` se mantiene como token):

```tsx
              <div className="mb-2 text-4xl font-bold tracking-tight text-primary sm:text-5xl">
```

Reemplaza la línea 26 (`text-white/70` → neutro):

```tsx
              <p className="mx-auto max-w-[14rem] text-sm leading-snug text-slate-500">
```

- [ ] **Step 2: Verificar**

Run: `grep -nE "#071540|#2F64FF|text-white" src/components/SocialProof.tsx`
Expected: sin coincidencias.

- [ ] **Step 3: Commit**

```bash
git add src/components/SocialProof.tsx
git commit -m "feat(social-proof): banda clara con métricas en primary"
```

---

## Task 6: LeadMagnet oscuro re-tematizado (`LeadMagnet.tsx`)

> Se mantiene oscuro; el gradiente navy y los acentos pasan a tokens nuevos.

**Files:**
- Modify: `src/components/LeadMagnet.tsx`

- [ ] **Step 1: Fondo, glow y acentos a tokens**

Reemplaza la línea 18:

```tsx
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#071540] to-[#13367e] px-8 py-12 shadow-[0_30px_80px_rgba(7,21,64,0.25)] sm:px-14 sm:py-16"
```
por:
```tsx
          className="relative overflow-hidden rounded-3xl bg-dark px-8 py-12 shadow-[0_30px_80px_rgba(7,21,64,0.25)] sm:px-14 sm:py-16"
```

Reemplaza la línea 25 (glow `bg-[#2F64FF]/20`):

```tsx
            className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/20 blur-3xl"
```

Añade, justo después de ese `<div ... aria-hidden />` (línea 27), una capa de gradiente brand sutil:

```tsx
          <div className="pointer-events-none absolute inset-0 opacity-25 [background:var(--gradient-brand)] [mask-image:radial-gradient(80%_60%_at_80%_20%,black,transparent)]" aria-hidden />
```

Reemplaza la línea 30 (badge `text-[#7EABFF]`):

```tsx
              <span className="relative mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] text-accent">
```

Reemplaza la línea 42 (check `bg-[#2F64FF]/20 text-[#7EABFF]`):

```tsx
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-accent">
```

Reemplaza la línea 56 (CTA `bg-[#2F64FF] ... hover:bg-[#2553e6]`):

```tsx
                className="group inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-[0_12px_32px_hsl(221_98%_51%/0.4)] transition-all hover:-translate-y-0.5 hover:bg-primary/90"
```

> Nota: el contenido va dentro de la card; envuelve el `grid` (línea 28) y los hijos en `relative z-10` si el gradiente brand los tapa. Añade `relative z-10` a la línea 28: `className="relative z-10 grid items-center gap-10 lg:grid-cols-[1fr_auto]"`.

- [ ] **Step 2: Verificar**

Run: `grep -nE "#2F64FF|#2553e6|#071540|#13367e|#7EABFF" src/components/LeadMagnet.tsx`
Expected: sin coincidencias.

- [ ] **Step 3: Commit**

```bash
git add src/components/LeadMagnet.tsx
git commit -m "feat(lead-magnet): re-tematizar a navy token + gradiente brand"
```

---

## Task 7: Footer navy + logo nuevo (`Footer.tsx`)

**Files:**
- Modify: `src/components/Footer.tsx:34`, `:40-44`

- [ ] **Step 1: Fondo navy por token**

Reemplaza la línea 34:

```tsx
    <footer className="bg-[#030E2C] border-t border-white/10 text-white">
```
por:
```tsx
    <footer className="bg-dark border-t border-white/10 text-white">
```

- [ ] **Step 2: Logo blanco nuevo**

El `<SmartImage src="/assets/ElarisLogoWhite.webp" .../>` (líneas 40-44) ya apunta al archivo correcto (regenerado en Task 3). Añade `width`/`height` para evitar layout shift:

```tsx
              <SmartImage
                src="/assets/ElarisLogoWhite.webp"
                alt={t("navbar.logoAlt")}
                width={200}
                height={80}
                className="h-14 w-auto sm:h-16 lg:h-20"
              />
```

- [ ] **Step 3: Verificar**

Run: `grep -nE "#030E2C" src/components/Footer.tsx`
Expected: sin coincidencias.

- [ ] **Step 4: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "feat(footer): navy por token y lockup blanco nuevo"
```

---

## Task 8: Navbar con isotipo + texto y tokens (`Navbar.tsx`)

**Files:**
- Modify: `src/components/Navbar.tsx:97-101`, `:103`, `:132-139`, `:164`, `:202`, `:220`

- [ ] **Step 1: Tokens en clases del nav**

Aplica el mapa canónico a estas líneas:
- Línea 97-98: `text-[#111]` → `text-foreground` (ambas ocurrencias).
- Línea 101: `text-[#111]` → `text-foreground`; `hover:text-[#2F64FF]` → `hover:text-primary`.
- Línea 164: `bg-[#2F64FF]` → `bg-primary` y `text-white` → `text-primary-foreground`.
- Línea 202: `hover:text-[#2F64FF]` → `hover:text-primary`.
- Línea 220: `bg-[#2F64FF]` → `bg-primary`, `text-white` → `text-primary-foreground`.

- [ ] **Step 2: Logo = isotipo a color + "ELARIS" en texto**

Reemplaza la constante de la línea 103:

```tsx
  const logoSrc = "/assets/ElarisLogo.webp";
```
por:
```tsx
  const logoSrc = "/assets/ElarisIsotipo.webp";
```

Reemplaza el bloque `<SmartImage ... />` del logo (líneas 132-139) por isotipo + wordmark:

```tsx
            <SmartImage
              src={logoSrc}
              alt={t("navbar.logoAlt")}
              priority
              width={40}
              height={40}
              className="h-9 w-auto"
            />
            <span className="ml-2 text-lg font-bold tracking-[0.18em] text-foreground">
              ELARIS
            </span>
```

- [ ] **Step 3: Verificar**

Run: `grep -nE "#2F64FF|#111|ElarisLogo\\.webp" src/components/Navbar.tsx`
Expected: sin coincidencias.

- [ ] **Step 4: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "feat(navbar): isotipo a color + wordmark en texto y tokens"
```

---

## Task 9: Contact a tokens (`Contact.tsx`)

**Files:**
- Modify: `src/components/Contact.tsx:69`, `:87`, `:102-103`, `:113`, `:128-129`, `:139`, `:154`, `:164`, `:176`, `:193`

- [ ] **Step 1: Aplicar el mapa canónico**

En `src/components/Contact.tsx`, reemplaza:
- Línea 69: `bg-[#F0F4FF]` → `bg-surface-alt`.
- Línea 87: `text-[#2F64FF]` → `text-primary`.
- Líneas 102-103, 128-129, 154: `text-[#2F64FF]` → `text-primary` (labels en estado activo).
- Líneas 113, 139, 164: `focus:border-[#2F64FF]` → `focus:border-primary`.
- Línea 176: `bg-[#2F64FF]` → `bg-primary`; `text-white` → `text-primary-foreground`; `hover:bg-[#2553e6]` → `hover:bg-primary/90`.
- Línea 193: `bg-[#2F64FF]/8 text-[#2F64FF]` → `bg-primary/10 text-primary`.

(Las clases `slate-*` se mantienen: son neutros.)

- [ ] **Step 2: Verificar**

Run: `grep -nE "#2F64FF|#2553e6|#F0F4FF" src/components/Contact.tsx`
Expected: sin coincidencias.

- [ ] **Step 3: Commit**

```bash
git add src/components/Contact.tsx
git commit -m "refactor(contact): colores de marca a tokens"
```

---

## Task 10: ServicesSplitPanel a tokens (`services-split-panel.tsx`)

**Files:**
- Modify: `src/components/ui/services-split-panel.tsx:70-71`, `:90`, `:106`, `:123`, `:152`, `:194`, `:225`, `:236`, `:246`, `:268-269`, `:278`, `:317`

- [ ] **Step 1: Aplicar el mapa canónico**

Reemplazos (conservando sufijos de opacidad y estados):
- `bg-[#2F64FF]/10` → `bg-primary/10`; `border-[#2F64FF]/25` → `border-primary/25`; `text-[#2F64FF]` → `text-primary` (líneas 70-71, 106, 269, 278).
- `text-[#071540]` → `text-foreground` (líneas 90, 152, 194, 236).
- `bg-[#F8FAFC]` → `bg-slate-50` (líneas 123, 317).
- Línea 194: `border-[#2F64FF] text-[#2F64FF] bg-[#F0F4FF]` → `border-primary text-primary bg-surface-alt`.
- Línea 225: `border-[#2F64FF]/30` → `border-primary/30`.
- Línea 236: `text-[#2F64FF]` → `text-primary`; `text-[#071540]` → `text-foreground`.
- Línea 246: `text-[#2F64FF]` → `text-primary`.
- Línea 268: `bg-[#2F64FF]/10 border-[#2F64FF]/25` → `bg-primary/10 border-primary/25`.

(Las clases `slate-100/200/400/500` y `bg-white` se mantienen.)

- [ ] **Step 2: Verificar**

Run: `grep -nE "#2F64FF|#071540|#F0F4FF|#F8FAFC" src/components/ui/services-split-panel.tsx`
Expected: sin coincidencias.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/services-split-panel.tsx
git commit -m "refactor(services): colores de marca a tokens"
```

---

## Task 11: Process, FaqHome, Team y typing-console a tokens

**Files:**
- Modify: `src/components/Process.tsx:25`, `src/components/FaqHome.tsx:18,25,63`, `src/components/Team.tsx:32,36,49,58,82`, `src/components/ui/typing-console.tsx:109,112,120`

- [ ] **Step 1: Process.tsx**

Línea 25: `text-[#2F64FF]` → `text-primary`.

- [ ] **Step 2: FaqHome.tsx**

- Línea 18: `text-[#2F64FF]` → `text-primary`; `text-[#071540]` → `text-foreground`; `group-hover:text-[#2F64FF]` → `group-hover:text-primary`.
- Línea 25: `text-[#2F64FF]` → `text-primary`; `group-hover:text-[#2F64FF]` → `group-hover:text-primary` (`text-slate-400` se mantiene).
- Línea 63: `border-[#2F64FF]/30 ... text-[#2F64FF] ... hover:bg-[#2F64FF] hover:text-white` → `border-primary/30 ... text-primary ... hover:bg-primary hover:text-primary-foreground`.

- [ ] **Step 3: Team.tsx**

- Línea 32: `border-[#2F64FF] bg-[#2F64FF]` → `border-primary bg-primary`.
- Línea 36: `border-[#2F64FF]` → `border-primary`.
- Línea 49: `text-[#2F64FF]` → `text-primary`.
- Línea 58: `bg-[#2F64FF]` → `bg-primary` (el `text-white` puede quedar o pasar a `text-primary-foreground`).
- Línea 82: `bg-[#eff4ff]` → `bg-surface-alt`; `text-[#2F64FF]` → `text-primary`.

- [ ] **Step 4: typing-console.tsx**

- Línea 109: `text-[#2F64FF]` → `text-primary`.
- Línea 112: `text-[#071540]/60` → `text-foreground/60`.
- Línea 120: `bg-[#2F64FF]` → `bg-primary`.

- [ ] **Step 5: Verificar**

Run: `grep -rnE "#2F64FF|#071540|#eff4ff" src/components/Process.tsx src/components/FaqHome.tsx src/components/Team.tsx src/components/ui/typing-console.tsx`
Expected: sin coincidencias.

- [ ] **Step 6: Commit**

```bash
git add src/components/Process.tsx src/components/FaqHome.tsx src/components/Team.tsx src/components/ui/typing-console.tsx
git commit -m "refactor(home): Process, FAQ, Team y consola a tokens"
```

---

## Task 12: Testimonials/Portfolio — verificación de marca

**Files:**
- Inspect: `src/components/Testimonials.tsx`, `src/components/ui/circular-testimonials.tsx`, `src/components/Portfolio.tsx`, `src/components/ui/projects-carousel.tsx`

- [ ] **Step 1: Buscar colores de marca restantes**

Run: `grep -rnE "#2F64FF|#071540|#030E2C|#13367e|#F0F4FF|#eff4ff|#7EABFF|#6B9FFF|#2553e6" src/components/Testimonials.tsx src/components/ui/circular-testimonials.tsx src/components/Portfolio.tsx src/components/ui/projects-carousel.tsx`
Expected: lista cualquier coincidencia.

- [ ] **Step 2: Aplicar el mapa canónico a lo que aparezca**

Para cada coincidencia, aplica el mapa canónico del header (p. ej. `bg-[#2F64FF]` → `bg-primary`). Si no hubo coincidencias, esta tarea no cambia archivos: pásala.

- [ ] **Step 3: Verificar y commit (si hubo cambios)**

Run: repite el `grep` del Step 1 → sin coincidencias.

```bash
git add -A
git commit -m "refactor(testimonials/portfolio): colores de marca a tokens"
```

---

## Task 13: Botón de WhatsApp — mantener verde

**Files:**
- Inspect/Modify: `src/components/ui/floating-whatsapp-button.tsx`

- [ ] **Step 1: Confirmar que el verde se mantiene**

Run: `grep -nE "#25D366|#22c35e|green|#2F64FF" src/components/ui/floating-whatsapp-button.tsx`
Expected: el botón usa verde de WhatsApp (no debe usar `#2F64FF`). Si aparece `#2F64FF`, NO lo cambies a primary: este botón se queda verde por decisión de diseño. Si el verde está hardcodeado, déjalo (es color funcional de WhatsApp).

- [ ] **Step 2: (Opcional) Ajustar el glow**

Si el botón tiene `shadow`, verifica que la sombra difusa siga visible sobre cualquier fondo. No es obligatorio cambiarlo.

- [ ] **Step 3: Commit (solo si hubo cambios)**

```bash
git add src/components/ui/floating-whatsapp-button.tsx
git commit -m "chore(whatsapp): conservar verde de marca de WhatsApp"
```

---

## Task 14: Verificación final (grep + build + visual)

**Files:** ninguno (verificación)

- [ ] **Step 1: Cero colores de marca hardcodeados en el home**

Run:
```bash
grep -rnE "#2F64FF|#2553e6|#030E2C|#071540|#13367e|#7EABFF|#6B9FFF|#F0F4FF|#eff4ff" \
  src/components/Navbar.tsx src/components/Hero.tsx src/components/ui/synthetic-hero.tsx \
  src/components/ui/typing-console.tsx src/components/SocialProof.tsx \
  src/components/ui/services-split-panel.tsx src/components/Process.tsx \
  src/components/Portfolio.tsx src/components/ui/projects-carousel.tsx \
  src/components/Testimonials.tsx src/components/ui/circular-testimonials.tsx \
  src/components/FaqHome.tsx src/components/LeadMagnet.tsx src/components/Team.tsx \
  src/components/Contact.tsx src/components/Footer.tsx
```
Expected: **sin coincidencias**. (Los puntos de consola `#22C55E/#FFC961/#FF4858` y logos de terceros no están en esta lista y deben permanecer.)

- [ ] **Step 2: Build limpio**

Run: `npm run lint && npm run build`
Expected: sin errores.

- [ ] **Step 3: Barrido visual**

Run: `npm run dev` (sirve en `http://localhost:8080`). Con Playwright, navega a `http://localhost:8080` y toma screenshots de viewport y de cada sección. Verifica:
- Hero: navy + gradiente brand, isotipo, texto blanco, consola legible, botón primary.
- SocialProof: fondo claro, números en azul primary.
- ServicesSplitPanel, Process, Portfolio, Testimonials, FaqHome, Team: claros, acentos azul/violeta, texto legible.
- LeadMagnet: navy con gradiente, CTA primary, badge/checks en cyan.
- Contact: lavanda claro, inputs con foco violeta/azul, botón primary.
- Footer: navy, logo blanco nuevo.
- Navbar: transparente sobre el Hero; al hacer scroll, blanco con isotipo + "ELARIS" legible.
- Botón flotante de WhatsApp: verde.
- Favicon nuevo en la pestaña.

- [ ] **Step 4: Commit final (si el barrido visual motivó ajustes)**

```bash
git add -A
git commit -m "fix(home): ajustes de contraste tras revisión visual"
```

---

## Notas de cierre

- **Fuera de alcance (fase 2):** páginas internas de servicios (`src/views/*`, `src/components/ui/*-hero`, `*-block`). Conservan `#2F64FF`/`#071540` hasta esa fase. No se tocan aquí.
- **Neutros** (`slate-*`) y **colores de terceros** (logos Slack/Stripe/HubSpot) se mantienen intactos por decisión de diseño.
- **Commits:** este proyecto tiene la norma de no commitear sin pedido explícito del usuario. Si se ejecuta con subagentes, confirma con el usuario antes de hacer los commits que indican las tareas, o agrúpalos al final según su preferencia.
