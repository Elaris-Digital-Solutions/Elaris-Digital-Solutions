# Documento de cambios off-site — Elaris

**Fecha:** 2026-08-03
**Qué es:** las tareas de posicionamiento que **no se hacen con código**. Son manuales, se ejecutan en plataformas externas y cada una está escrita para que cualquiera del equipo la haga sin consultar nada más.
**Documentos hermanos:** [plan-seo-organico.md](plan-seo-organico.md) (estrategia) · [documento-de-cambios-seo.md](documento-de-cambios-seo.md) (código) · [contenido-seo.md](contenido-seo.md) (copy).

**Por qué importa:** Google confirma que una entidad existe cruzando lo que dice tu sitio con lo que dicen otras fuentes. El sitio ya declara sus perfiles (`sameAs` en el schema); lo que falta es que esas fuentes **apunten de vuelta**. Ese circuito cerrado es lo que convierte «una web que dice ser Elaris» en «la entidad Elaris».

**Convención:** `[URL]` = dato que se completa al ejecutar. Cada tarea tiene responsable sugerido y una casilla de verificación al final.

---

## Datos maestros (usar EXACTAMENTE estos en todas las plataformas)

Cualquier variación —una abreviatura, un teléfono con otro formato— debilita la señal. Copiar y pegar de aquí:

| Campo | Valor exacto |
|---|---|
| Nombre comercial | `Elaris Digital Solutions` |
| Razón social | `ELARIS S.A.C.S` |
| RUC | `20615598071` |
| Dirección (oficina, la pública) | `Jr. Jerónimo de Aliaga N 595, Santiago de Surco 15037, Lima, Perú` |
| Teléfono | `+51 973 663 807` |
| Email | `contact@elarisdigitalsolutions.com` |
| Web | `https://elarisdigitalsolutions.com` |
| Descripción corta (155 car.) | `Estudio de software en Lima. Desarrollamos software a medida, e-commerce y automatización con IA para empresas en Perú y LATAM. El código es 100% tuyo.` |
| Descripción larga | `Elaris Digital Solutions es un estudio de software y consultoría tecnológica con sede en Lima, Perú. Ayudamos a empresas a vender más y reducir costos digitalizando, automatizando y modernizando sus operaciones: software a medida, e-commerce, desarrollo web, MVPs, inteligencia artificial aplicada, CMMS y transformación digital. Entregamos propiedad total del software —repositorio, documentación y licencia perpetua— y trabajamos sin cajas negras: alcance, plazos y costo cerrados por fase antes de empezar. Atendemos clientes en Perú, Chile y Argentina.` |
| Año de fundación | `2026` |

⚠️ **No usar el domicilio fiscal** (Jr. Tacna 207, vinculado al RUC) en directorios ni en Google Business Profile: la dirección pública es la de la oficina. Mezclarlas rompe la consistencia NAP.

---

## O1. Google Business Profile (máxima prioridad)

**Responsable:** Sergio · **Esfuerzo:** 1 hora + verificación (días) · **Impacto:** el más alto de este documento.

Es lo que hace aparecer a Elaris en Google Maps y en el panel lateral al buscar la marca. Sin esto, las búsquedas locales («empresa de software en Lima») son inalcanzables.

1. Entrar a [business.google.com](https://business.google.com) con **la misma cuenta Gmail que verificó Search Console y creó GA4**. No existe cuenta Google del dominio (`@elarisdigitalsolutions.com` no es Workspace). Tras crear el perfil, añadir a los otros dos cofundadores como propietarios: estas tres herramientas no deben depender del acceso de una sola persona.
2. Crear perfil con el **nombre exacto** de la tabla de datos maestros. No añadir palabras clave al nombre (ej. «Elaris Digital Solutions - Desarrollo de Software») — Google penaliza el relleno de nombre.
3. **Categoría principal:** `Empresa de desarrollo de software`. **Secundarias:** `Consultor informático`, `Diseñador de sitios web`, `Agencia de marketing en Internet`.
4. Dirección, teléfono y web: copiar exactamente de los datos maestros.
5. Horario de atención real (afecta a cómo se muestra «Abierto ahora»).
6. Descripción: pegar la **descripción larga**.
7. Cargar los 8 servicios (usar los mismos nombres del sitio): Desarrollo web · E-commerce · Posicionamiento SEO · Desarrollo de MVPs · Software a medida · Inteligencia Artificial · CMMS · Transformación digital.
8. Fotos: logo (`public/assets/ElarisLockup.webp`), foto del equipo, foto de la oficina. Mínimo 3.
9. Verificar el perfil (Google pedirá video o postal). **Hasta verificar, el perfil no aparece.**

**Después de verificar:**
- Pedir reseña a **Milagros Salcedo** (Salcedo Jewels) — es la clienta con testimonio ya publicado y autorizado. Luego a Daniela Bussalleu.
- Responder **todas** las reseñas, también las buenas.
- Publicar 1 post al mes. Material listo: cada artículo de `/recursos` a medida que se publique.

- [ ] Perfil creado y verificado · URL del perfil: `[URL]`

---

## O2. Enlace del sitio en el LinkedIn de cada cofundador

**Responsable:** cada uno (Carlos, Sergio, Fabrizio) · **Esfuerzo:** 5 minutos por persona · **Impacto:** alto para las búsquedas por nombre.

Esta es la tarea que cierra el circuito de las páginas `/equipo/[slug]`. El sitio ya enlaza a LinkedIn desde el schema (`Person.sameAs`); falta que LinkedIn enlace de vuelta. Sin ese retorno, Google no tiene forma de confirmar que la persona del perfil y la de la página son la misma.

**Rutas asignadas** (existirán al desplegar la Fase 2):

| Persona | Su página | Su LinkedIn |
|---|---|---|
| Carlos Alejandro Colfer Mendoza | `https://elarisdigitalsolutions.com/equipo/carlos-colfer` | [linkedin.com/in/carlos-alejandro-colfer-mendoza-a59a08355](https://www.linkedin.com/in/carlos-alejandro-colfer-mendoza-a59a08355/) |
| Sergio Herrera Jave | `https://elarisdigitalsolutions.com/equipo/sergio-herrera` | [linkedin.com/in/sergio-herrera-jave](https://www.linkedin.com/in/sergio-herrera-jave/) |
| Fabrizio Bussalleu | `https://elarisdigitalsolutions.com/equipo/fabrizio-bussalleu` | [linkedin.com/in/fabrizio-bussalleu](https://www.linkedin.com/in/fabrizio-bussalleu/) |

**Pasos para cada uno (en LinkedIn, desde escritorio):**

1. **Añadir la página propia como sitio web del perfil.**
   Ver perfil → «Editar información de contacto» (icono del lápiz arriba a la derecha) → Sitio web → Añadir:
   - URL: la de su fila en la tabla
   - Tipo: `Personal`
   Guardar.

2. **Destacar la página en el perfil.**
   En el perfil → sección **Destacado** (si no existe: «Añadir sección del perfil» → Destacado) → **+** → **Enlace** → pegar la misma URL. Título sugerido: `Mi perfil en Elaris Digital Solutions`. Descripción: una línea, p. ej. `Qué hago en Elaris y en qué proyectos he trabajado.`

3. **Vincular el cargo a la página de empresa** (el paso que más pesa).
   En **Experiencia** → editar el puesto en Elaris → en el campo *Empresa*, empezar a escribir «Elaris Digital Solutions» y **seleccionar la empresa del desplegable** (debe aparecer con el logo). Si quedó como texto libre, LinkedIn no lo asocia a la company page y el vínculo no cuenta.
   - Cargo exacto: Carlos `Gerente General`, Sergio `Gerente Administrativo`, Fabrizio `Gerente de Tecnología`.
   - Marcar la casilla de cofundador si el puesto lo refleja (los tres lo son).

4. **Titular (headline).** Que incluya el rol y la empresa, p. ej. `Gerente de Tecnología en Elaris Digital Solutions | Software a medida para empresas`. Evitar titulares genéricos.

5. **Foto de perfil coherente con la del sitio.** Si la foto de LinkedIn y la de `/equipo/[slug]` son la misma persona reconocible, refuerza la asociación. Las fotos del sitio están en `public/assets/team/`.

6. **Al publicarse cada artículo de `/recursos`,** el autor lo comparte desde su perfil con un comentario propio (2-3 líneas sobre por qué lo escribió). Autoría asignada: Carlos → A1 y A4 · Sergio → A5 y A6 · Fabrizio → A2 y A3.

- [ ] Carlos completó los pasos 1-5
- [ ] Sergio completó los pasos 1-5
- [ ] Fabrizio completó los pasos 1-5

---

## O3. Perfiles corporativos alineados

**Responsable:** Sergio · **Esfuerzo:** 30 minutos.

Los cuatro perfiles ya están declarados en el schema del sitio (`Organization.sameAs`). Hay que asegurar que digan lo mismo que el sitio y enlacen de vuelta.

| Perfil | URL | Qué revisar |
|---|---|---|
| LinkedIn company | [linkedin.com/company/elaris-digital-solutions](https://www.linkedin.com/company/elaris-digital-solutions/) | Descripción = descripción larga · web enlazada · sector «Desarrollo de software» · ubicación Lima · logo actual · los 3 cofundadores asociados como empleados |
| Instagram | [@elarisdigitalsolutions](https://www.instagram.com/elarisdigitalsolutions) | Bio con propuesta de valor + enlace al sitio en el campo web |
| GitHub org | [github.com/Elaris-Digital-Solutions](https://github.com/Elaris-Digital-Solutions) | Descripción, ubicación y enlace al sitio en el perfil de la organización |
| X | [@ElarisSolutions](https://x.com/ElarisSolutions) | Bio y enlace al sitio |

- [ ] Los 4 perfiles revisados, con descripción coherente y enlace de vuelta al sitio

---

## O4. Directorios del rubro

**Responsable:** Sergio · **Esfuerzo:** 2-3 horas en total · **Impacto:** medio-alto (autoridad + tráfico de referencia).

Usar **los mismos datos maestros** en los tres. La consistencia entre ellos es la mitad del valor.

1. **Clutch** ([clutch.co](https://clutch.co)) — el de mayor peso. Crear ficha, cargar los servicios con porcentajes de dedicación, rango de proyecto y los 4 casos con sus cifras autorizadas. Su diferencial: las reseñas se verifican por entrevista telefónica. **Proponer a Milagros Salcedo** como primera reseña verificada.
2. **GoodFirms** ([goodfirms.co](https://goodfirms.co)) — mismo procedimiento, menor exigencia.
3. **DesignRush** ([designrush.com](https://designrush.com)) — ficha con portafolio visual.

En los tres, enlazar a `https://elarisdigitalsolutions.com` y a las páginas de caso correspondientes (`/casos/salcedo-jewels`, etc.) cuando el directorio lo permita.

- [ ] Clutch · URL: `[URL]`
- [ ] GoodFirms · URL: `[URL]`
- [ ] DesignRush · URL: `[URL]`

---

## O5. Google Search Console y GA4 (post-deploy)

**Responsable:** quien despliegue · **Esfuerzo:** 15 minutos por fase.

La propiedad de GSC **ya está verificada** (archivo `public/googlec09e8a72f8f7ed1d.html`). Tras cada despliegue:

1. GSC → Sitemaps → reenviar `https://elarisdigitalsolutions.com/sitemap.xml`.
2. GSC → Inspección de URLs → pegar cada URL nueva → **Solicitar indexación**. En dominios jóvenes esto adelanta semanas. Prioridad: los 3 hubs (`/casos`, `/equipo`, `/recursos`), luego los perfiles, luego cada artículo al publicarse.
3. GA4 → Admin → Vínculos de Search Console → vincular la propiedad de GSC con el flujo web (una sola vez).
4. GA4 → Admin → Eventos → marcar `generate_lead` y `meet_click` como **eventos clave**.

- [ ] Sitemap reenviado tras cada fase
- [ ] Indexación solicitada para hubs, perfiles y artículos
- [ ] GSC vinculado a GA4 y eventos clave marcados

---

## O6. Testimonios — publicados, falta la atribución nominal

**Responsable:** Sergio · **Impacto:** alto en credibilidad.

Los cuatro casos ya publican cita del cliente (aprobadas el 2026-08-03). Estado en `src/content/casos.ts`:

| Cliente | Atribución actual | Pendiente |
|---|---|---|
| Salcedo Jewels | Milagros Salcedo, CEO | — |
| UPC | Facultad de Ingeniería, UPC | nombre y cargo de la persona |
| CCC Impresiones | Equipo de CCC Impresiones | nombre y cargo de la persona |
| VeltrixNFC | Equipo fundador de VeltrixNFC | nombre y cargo de la persona |

Tres citas están atribuidas a la organización porque los borradores nunca llegaron a llevar nombre propio. **Una cita con nombre y cargo pesa bastante más** que una institucional: pídelos y actualiza `author` y `role` del `quote` correspondiente.

Para llevar los tres testimonios al carrusel del home hace falta además **una foto cuadrada por persona** (mismo formato que las actuales, en `public/assets/`). Sin foto, el componente del home no puede mostrarlos; en las páginas de caso ya se ven.

- [ ] Nombre y cargo de los 3 voceros
- [ ] Foto de cada uno, para sumarlos al carrusel del home

---

## O7. Wikidata (aplazado)

**No hacer todavía.** Una entrada de Wikidata sin cobertura de terceros que la respalde se elimina o queda como ruido. Revisar cuando existan al menos dos fichas de directorio activas (O4) y alguna mención editorial externa.

---

## Orden recomendado

1. **O5** (post-deploy, inmediato en cada fase) — sin costo, resultado inmediato.
2. **O1** GBP — el de mayor impacto; la verificación tarda días, conviene arrancarla ya.
3. **O2** LinkedIn de los cofundadores — 5 minutos cada uno, y es lo que hace funcionar las páginas de equipo.
4. **O3** perfiles corporativos.
5. **O6** testimonios — en paralelo, depende de terceros.
6. **O4** directorios.
7. **O7** cuando toque.
