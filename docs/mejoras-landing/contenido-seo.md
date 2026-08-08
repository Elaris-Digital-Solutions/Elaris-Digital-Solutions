# Anexo de contenido SEO — copy íntegro

**Fecha:** 2026-08-03 · **Uso:** este anexo contiene TODO el texto que consumen los cambios del [documento-de-cambios-seo.md](documento-de-cambios-seo.md). El implementador copia cada bloque al registro de contenido indicado, sin redactar nada nuevo.

**Estado:** contenido aprobado — bios, artículos y rangos de precio cuentan con visto bueno de sus titulares y del negocio (2026-08-03). No quedan bloqueos: este anexo es la fuente de verdad para implementar.

**Convenciones:**
- Los enlaces internos dentro de párrafos usan sintaxis `[texto](/ruta)`. La plantilla de artículo los convierte en `<Link>` (ver S12 del doc de cambios). No hay ningún otro markdown en los párrafos.
- Fechas `publishDate`: usar la fecha real del deploy de cada tanda (formato ISO `YYYY-MM-DD`).
- Regla de marca vigente: CTA = "Solicitar diagnóstico"; la palabra "gratuito" solo aparece donde se responde una pregunta de costo.

---

## §1 Microcopy de UI (va a `es.json`, bloque nuevo `contentHubs`)

```json
"contentHubs": {
  "breadcrumbHome": "Inicio",
  "equipo": {
    "badge": "Nuestro equipo",
    "title": "Las personas detrás de Elaris",
    "intro": "Tres perfiles complementarios, un mismo estándar: tecnología bien construida, entregada a tiempo y explicada sin jerga. Conoce a quiénes vas a tener al otro lado del proyecto.",
    "profileCta": "Ver perfil",
    "breadcrumbLabel": "Equipo"
  },
  "casos": {
    "badge": "Casos de éxito",
    "title": "Resultados comprobables, con nombre y apellido",
    "intro": "Proyectos reales, con el problema tal como llegó, lo que construimos y el resultado medible. Sin promedios de industria: cada cifra pertenece a un cliente concreto que autorizó publicarla.",
    "readCase": "Leer el caso completo",
    "servicesApplied": "Servicios aplicados",
    "visitSite": "Visitar el sitio del cliente",
    "breadcrumbLabel": "Casos",
    "backToHub": "← Todos los casos"
  },
  "recursos": {
    "badge": "Recursos",
    "title": "Guías claras para decidir bien",
    "intro": "Lo que les explicamos a nuestros clientes antes de que inviertan un sol, publicado. Costos reales, comparativas honestas y por dónde empezar — sin humo y sin jerga.",
    "readArticle": "Leer la guía",
    "byline": "Por",
    "publishedOn": "Publicado el",
    "updatedOn": "Actualizado el",
    "relatedGuides": "Guías relacionadas",
    "relatedCase": "Caso relacionado",
    "breadcrumbLabel": "Recursos",
    "backToHub": "← Todos los recursos",
    "minRead": "min de lectura"
  }
}
```

Meta de los hubs (van en cada `page.tsx` con `campaignMetadata(..., { index: true })`):

| Hub | seoTitle | seoDescription |
|---|---|---|
| `/equipo` | `Equipo de Elaris Digital Solutions — Quiénes somos` | `Conoce a las personas detrás de Elaris Digital Solutions: Carlos Colfer, Sergio Herrera y Fabrizio Bussalleu. Software a medida para empresas en Perú y LATAM.` |
| `/casos` | `Casos de Éxito en Desarrollo de Software | Elaris Digital Solutions` | `Proyectos reales con resultados medibles: e-commerce, plataformas institucionales, digitalización de operaciones y MVPs en Perú, Chile y Argentina.` |
| `/recursos` | `Recursos y Guías de Tecnología para Empresas | Elaris Digital Solutions` | `Guías claras sobre costos de software, e-commerce, IA y transformación digital para empresas en Perú. Lo que necesitas saber antes de invertir.` |

---

## §2 Bios del equipo (van a `src/content/equipo.ts`)

Bios aprobadas por sus titulares. Los tres son **cofundadores** de Elaris (por eso figuran en el sitio), y así se refleja en el schema (`Organization.founder`). Nota editorial: las bios posicionan por rol y obra entregada; no mencionan formación académica ni datos personales no publicados.

### 2.1 Carlos — slug `carlos-colfer`

- `name`: `Carlos Alejandro Colfer Mendoza` · `shortName`: `Carlos Colfer`
- `role`: `Gerente General`
- `photo`: `/assets/team/CarlosColfer.jpg` · `linkedin`: `https://www.linkedin.com/in/carlos-alejandro-colfer-mendoza-a59a08355/`
- `seoTitle`: `Carlos Alejandro Colfer Mendoza — Gerente General | Elaris Digital Solutions`
- `seoDescription`: `Carlos Alejandro Colfer Mendoza es Gerente General de Elaris Digital Solutions. Lidera la arquitectura de cada proyecto de software a medida para empresas en Perú y LATAM.`
- `knowsAbout`: `["Arquitectura de software", "Desarrollo de software a medida", "Gestión de proyectos tecnológicos", "Plataformas web para empresas"]`
- `caseSlugs`: `["salcedo-jewels", "inventario-upc", "ccc-impresiones", "veltrixnfc"]`
- `bioIntro` (aparece bajo el H1): `Lidera la arquitectura de cada proyecto de Elaris: su trabajo es que lo que se promete en la propuesta sea exactamente lo que llega a producción, bien construido y en el plazo pactado.`
- `bioParagraphs`:

> Carlos es Gerente General y cofundador de Elaris Digital Solutions, el estudio de software que levantó junto a Sergio Herrera y Fabrizio Bussalleu en Lima en 2026. Desde ese rol combina dos responsabilidades que rara vez conviven: la dirección del negocio y la arquitectura técnica de cada proyecto que entra por la puerta.
>
> Su sello es la ingeniería sin cajas negras. Antes de escribir una línea de código, define con el cliente los criterios de aceptación; durante el proyecto, cada entrega llega versionada, documentada y con evidencia de que funciona. Ese método está detrás de los sistemas que Elaris ha puesto en producción: la plataforma de e-commerce y gestión de Salcedo Jewels, el sistema de reservas de equipos de la Universidad Peruana de Ciencias Aplicadas, la plataforma comercial de CCC Impresiones en Argentina y el ecosistema digital de VeltrixNFC, que opera en Perú y Chile.
>
> Su criterio para decidir qué construir es el mismo que aplica al negocio: la tecnología solo vale si el cliente puede operarla sin nosotros. Por eso cada proyecto se cierra con el repositorio completo, la documentación y una licencia perpetua a nombre del cliente.

### 2.2 Sergio — slug `sergio-herrera`

- `name`: `Sergio Herrera Jave` · `shortName`: `Sergio Herrera` · `role`: `Gerente Administrativo`
  *(el nombre completo va en title/H1/schema porque desambigua frente a los muchos "Sergio Herrera" del Perú; la tarjeta del home y las bylines usan el corto)*
- `photo`: `/assets/team/SergioHerrera.jpg` · `linkedin`: `https://www.linkedin.com/in/sergio-herrera-jave/`
- `seoTitle`: `Sergio Herrera Jave — Gerente Administrativo | Elaris Digital Solutions`
- `seoDescription`: `Sergio Herrera Jave es Gerente Administrativo y cofundador de Elaris Digital Solutions. Gestiona la relación con cada cliente de inicio a fin en proyectos de software para empresas en Perú y LATAM.`
- `knowsAbout`: `["Gestión de clientes B2B", "Gestión de proyectos", "Transformación digital de pymes", "Operaciones de negocio"]`
- `caseSlugs`: `["salcedo-jewels", "ccc-impresiones"]`
- `bioIntro`: `Es la persona con la que hablas de principio a fin: entiende tu negocio antes que tu sistema, alinea expectativas y mantiene el proyecto en movimiento sin que tengas que perseguir a nadie.`
- `bioParagraphs`:

> Sergio es Gerente Administrativo y cofundador de Elaris Digital Solutions. Su rol existe por una convicción del estudio: los proyectos de software no fracasan por el código, fracasan por la comunicación. Por eso cada cliente de Elaris tiene un interlocutor constante que traduce en ambas direcciones — del negocio a la ingeniería y de la ingeniería al negocio.
>
> En la práctica, eso significa que Sergio está en el diagnóstico inicial entendiendo cómo opera la empresa, en cada revisión quincenal mostrando avances en lenguaje de resultados, y en la entrega final asegurando que el equipo del cliente sepa usar lo que recibió. Es también quien cuida que las promesas comerciales de Elaris — propuesta cerrada por fase, cero sorpresas de alcance, respuesta en menos de 12 horas — se cumplan en cada proyecto, del e-commerce de Salcedo Jewels a la digitalización de CCC Impresiones.
>
> Es además quien lleva la relación con los clientes después del lanzamiento: la transferencia de conocimiento al equipo, los tiempos de respuesta y la continuidad del acompañamiento pasan por él.

### 2.3 Fabrizio — slug `fabrizio-bussalleu`

- `name`: `Fabrizio Bussalleu` · `shortName`: `Fabrizio Bussalleu` · `role`: `Gerente de Tecnología`
- `photo`: `/assets/team/FabrizioBussalleu.jpg` · `linkedin`: `https://www.linkedin.com/in/fabrizio-bussalleu/`
- `seoTitle`: `Fabrizio Bussalleu — Gerente de Tecnología | Elaris Digital Solutions`
- `seoDescription`: `Fabrizio Bussalleu es Gerente de Tecnología (CTO) y cofundador de Elaris Digital Solutions. Convierte requerimientos de negocio en productos digitales funcionales para empresas en Perú y LATAM.`
- `knowsAbout`: `["Desarrollo web", "Experiencia de usuario (UX)", "E-commerce", "Inteligencia artificial aplicada", "Next.js y React"]`
- `caseSlugs`: `["salcedo-jewels", "veltrixnfc", "inventario-upc"]`
- `bioIntro`: `Convierte requerimientos de negocio en productos digitales que la gente realmente usa, con obsesión por los detalles y por la experiencia de quien está al otro lado de la pantalla.`
- `bioParagraphs`:

> Fabrizio es Gerente de Tecnología y cofundador de Elaris Digital Solutions. Es quien toma un requerimiento expresado en lenguaje de negocio — "pierdo ventas porque mi catálogo se desactualiza" — y lo devuelve convertido en un producto funcionando: interfaz, lógica e integraciones incluidas.
>
> Su criterio de diseño es que la tecnología se mida por la experiencia de quien la usa, no por la sofisticación de quien la construyó. Ese enfoque se nota en los productos de Elaris: el catálogo autoadministrable con editor de fotos integrado de Salcedo Jewels, el asistente de reservas en cuatro pasos que usan los estudiantes de la UPC, y la plataforma de perfiles digitales de VeltrixNFC. Trabaja principalmente con React, Next.js y TypeScript, y lidera la práctica de inteligencia artificial aplicada del estudio.
>
> Esa misma obsesión por el detalle es la que aplica al rendimiento y la accesibilidad: que una plataforma cargue rápido en un celular de gama media y que cualquiera pueda usarla no son extras, son parte de que el producto funcione.

---

## §3 Casos de éxito (van a `src/content/casos.ts`)

Cifras y nombres ya autorizados por el negocio ("logos y cifras con nombre: sí y sí"). La única cita publicable hoy es la de Milagros Salcedo (ya vive en el sitio); los testimonios de UPC, CCC y Veltrix siguen pendientes de aprobación y NO se incluyen.

### 3.1 `salcedo-jewels` — el caso insignia

- `client`: `Salcedo Jewels` · `sector`: `Joyería / Retail` · `location`: `{ city: "Lima, Chiclayo y Cajamarca", country: "Perú" }`
- `servicePaths`: `["/e-commerce", "/desarrollo-software-medida"]` · `liveUrl`: `https://salcedojewels.com` · `portfolioKey`: `salcedoJewels`
- `relatedArticleSlugs`: `["shopify-woocommerce-o-tienda-a-medida", "cuanto-cuesta-software-a-medida-peru"]`
- `seoTitle`: `Caso Salcedo Jewels: E-commerce de Joyería con 80% Menos Trabajo Operativo`
- `seoDescription`: `Cómo una joyería con tiendas en Lima, Chiclayo y Cajamarca pasó de un catálogo en PDF rehecho a mano a una tienda online con inventario en tiempo real. Caso real de Elaris.`
- `summary`: `Una joyería que rehacía su catálogo en PDF con cada venta hoy vende 24/7 con inventario en tiempo real. Reducción estimada de 70–80% del tiempo operativo y ventas desestacionalizadas.`
- `context` (párrafos):

> Salcedo Jewels es una joyería de lujo peruana — oro italiano de 18 quilates — con presencia en Lima, Chiclayo y Cajamarca. Un equipo pequeño, piezas únicas de alta rotación y un problema que crecía con cada venta.
>
> Su canal digital era un catálogo en PDF armado en Canva. Como cada pieza es única, cada venta obligaba a rehacer el catálogo completo para no dejar espacios vacíos, y parte del personal trabajaba exclusivamente en mantenerlo al día. Mientras tanto, el inventario vivía en Excel y hojas sueltas.

- `before` (lista "Cómo operaban"):
  - `Catálogo en PDF rehecho a mano en Canva con cada venta`
  - `Inventario en Excel y hojas físicas, sin conexión con las ventas`
  - `Ventas duplicadas: dos clientes apartaban la misma pieza porque el catálogo iba atrasado`
  - `Clientes desanimados al pedir piezas que ya no existían`
  - `Ventas concentradas en campañas (Navidad, Día de la Madre, gratificación)`
- `solution` (lista "Qué construimos"):
  - `Tienda online a medida con catálogo e inventario como una sola cosa: se vende una pieza y desaparece del catálogo al instante`
  - `Inventario por talla y variante, con descuento automático de stock en cada venta`
  - `Checkout adaptado a Perú: validación de DNI, transferencia bancaria y pagos en cuotas con control de cumplimiento`
  - `Seguimiento público del pedido por código, sin necesidad de crear cuenta`
  - `Panel de gestión con editor de fotos integrado (brillo, contraste, recorte) y biblioteca de descripciones por categoría`
  - `Resúmenes de pedido listos para WhatsApp, el canal donde ya conversaban con sus clientes`
- `results`:
  - `{ metric: "70–80% menos tiempo operativo", detail: "Boletas, registro de ventas, actualización y envío de catálogos y edición de fotos: lo que ocupaba a una persona a tiempo completo hoy está automatizado o integrado." }`
  - `{ metric: "Ventas todo el año", detail: "El catálogo vivo se ofrece siempre, sin costo de mantenerlo: las ventas dejaron de depender de las campañas." }`
  - `{ metric: "Cero ventas duplicadas", detail: "El inventario en tiempo real eliminó el apartado doble de piezas únicas." }`
- `quote`: `{ text: "Desde el lanzamiento del e-commerce, recibimos pedidos internacionales que antes no podíamos gestionar. La plataforma es rápida, el checkout no genera fricción y la base de datos nos permite tomar decisiones en tiempo real.", author: "Milagros Salcedo", role: "CEO, Salcedo Jewels S.A.C." }`

### 3.2 `inventario-upc`

- `client`: `Universidad Peruana de Ciencias Aplicadas (UPC)` · `sector`: `Educación superior` · `location`: `{ city: "Lima (campus Monterrico y San Miguel)", country: "Perú" }`
- `servicePaths`: `["/desarrollo-software-medida"]` · `liveUrl`: `https://upc-inventario.netlify.app` · `portfolioKey`: `sistemaInventarioUPC`
- `relatedArticleSlugs`: `["cuanto-cuesta-software-a-medida-peru"]`
- `seoTitle`: `Caso UPC: Sistema de Reservas de Equipos para una Universidad`
- `seoDescription`: `Equipos tecnológicos que se renovaban cada 5 años sin que nadie los usara hoy se reservan en línea en 2 campus. Caso real de software a medida de Elaris.`
- `summary`: `La UPC tenía equipos tecnológicos — VR, tablets, cámaras, proyectores — que se renovaban cada cinco años sin que los estudiantes pudieran usarlos: no existía forma de prestarlos. Hoy se reservan en línea y se controlan en tiempo real en dos campus.`
- `context`:

> La Universidad Peruana de Ciencias Aplicadas invertía en equipos que sus estudiantes necesitaban para desarrollarse: visores de realidad virtual para las carreras de desarrollo, Macs y dispositivos Android para testear aplicaciones, cámaras y proyectores para los de cine. El problema no era el presupuesto — era que no existía ningún sistema para prestarlos. Los equipos se renovaban cada cinco años sin que nadie los hubiera usado.
>
> El proyecto se coordinó con la Facultad de Ingeniería para los campus de Monterrico y San Miguel.

- `before`:
  - `Equipos guardados sin sistema de préstamo: inversión recurrente sin beneficio`
  - `Sin visibilidad de qué unidades existían, dónde estaban ni en qué estado`
  - `Sin forma de controlar retiros, devoluciones ni responsabilidad de los alumnos`
- `solution`:
  - `Portal de reservas con registro con correo institucional y acceso por enlace mágico (sin contraseñas)`
  - `Catálogo por campus con disponibilidad real por unidad física`
  - `Asistente de reserva en 4 pasos: fecha, duración, horario en bloques de 30 minutos y propósito académico`
  - `Asignación automática de la unidad física disponible, con margen entre préstamos para revisión`
  - `Panel operativo en tiempo real para el personal: por retirar, en uso, atrasados — con verificación presencial de cada retiro y devolución`
  - `Suspensiones temporales automáticas para alumnos incumplidos y estadísticas de uso por carrera`
- `results`:
  - `{ metric: "De 0% de uso a reservas activas", detail: "Los equipos que se renovaban sin usarse hoy están en manos de estudiantes de ambos campus." }`
  - `{ metric: "2 campus, un solo sistema", detail: "Monterrico y San Miguel operan con el mismo inventario, las mismas reglas y visibilidad central." }`
  - `{ metric: "Control total del ciclo de préstamo", detail: "Cada retiro y devolución queda verificado por el personal, con historial por unidad física." }`
- `quote`: `null` (testimonio pendiente de aprobación)

### 3.3 `ccc-impresiones`

- `client`: `CCC Impresiones` · `sector`: `Imprenta industrial` · `location`: `{ city: "Córdoba", country: "Argentina" }`
- `servicePaths`: `["/e-commerce", "/desarrollo-web", "/posicionamiento-seo"]` · `liveUrl`: `https://cccimpresiones.com` · `portfolioKey`: `cccImpresiones`
- `relatedArticleSlugs`: `["cuanto-cuesta-una-pagina-web-peru", "transformacion-digital-pymes-por-donde-empezar"]`
- `seoTitle`: `Caso CCC Impresiones: de Excel y Papel a Catálogo Digital con Tráfico Orgánico`
- `seoDescription`: `Una imprenta industrial argentina que operaba con Excel y hojas físicas hoy tiene tienda online, cotizador y clientes que la encuentran en Google. Caso real de Elaris.`
- `summary`: `Una imprenta que operaba con Excel y hojas físicas, sin presencia digital, hoy tiene tienda online, cotizador de trabajos personalizados y tráfico orgánico constante desde Google.`
- `context`:

> CCC Impresiones es una imprenta industrial mediana de Córdoba, Argentina. Vende dos cosas muy distintas: productos estándar en stock (etiquetas con medidas fijas) y trabajos 100% personalizados — remeras, impresión 3D, grabado láser, códigos de barras. Toda esa operación se administraba con Excel y hojas físicas, y la captación de clientes dependía por completo del boca a boca: en internet, CCC no existía.

- `before`:
  - `Pedidos e inventario en Excel y hojas físicas`
  - `Sin catálogo digital: cada consulta de precio se respondía a mano`
  - `Cero captación por internet: invisible en Google`
- `solution`:
  - `Tienda online para productos en stock, con inventario por variante y descuento automático de stock`
  - `Cotizador de trabajos personalizados con formulario dinámico: los campos cambian según el servicio (textil, 3D, láser, etiquetas)`
  - `Panel de gestión completo: productos, pedidos con estados y cuotas, estadísticas, portfolio y configuración de tienda`
  - `Modo tienda/consulta con un interruptor global: si pausan ventas, todos los botones "Comprar" pasan a "Cotizar"`
  - `Base técnica SEO desde el día uno: estructura, velocidad y contenido indexable`
- `results`:
  - `{ metric: "Tráfico orgánico constante", detail: "Clientes nuevos llegan desde Google sin pagar por clic — el canal que antes no existía." }`
  - `{ metric: "0 hojas de cálculo en la operación comercial", detail: "Catálogo, pedidos y cotizaciones viven en un solo sistema." }`
  - `{ metric: "Lista para escalar", detail: "Con la base técnica y el tráfico validado, CCC está en condiciones de amplificar con Google Ads y redes." }`
- `quote`: `null` (testimonio pendiente de aprobación)

### 3.4 `veltrixnfc`

- `client`: `VeltrixNFC` · `sector`: `Startup — tarjetas de presentación NFC` · `location`: `{ city: "Lima y Santiago", country: "Perú y Chile" }`
- `servicePaths`: `["/desarrollo-mvp", "/desarrollo-software-medida"]` · `liveUrl`: `https://veltrixnfc.com` · `portfolioKey`: `veltrixNfc`
- `relatedArticleSlugs`: `["como-validar-una-idea-de-negocio-mvp"]`
- `seoTitle`: `Caso VeltrixNFC: de Idea a Startup Operando en 2 Países con un MVP`
- `seoDescription`: `Veltrix tenía el producto físico —tarjetas metálicas con NFC— pero no el ecosistema digital para operar. Construimos su plataforma completa. Caso real de desarrollo de MVP.`
- `summary`: `Veltrix tenía las tarjetas metálicas con chip NFC y la visión de negocio, pero sin plataforma digital no podía operar. Construimos el ecosistema completo — perfiles, gestión de tarjetas y panel de administración — y hoy la startup opera en Perú y Chile.`
- `context`:

> VeltrixNFC quiere cambiar cómo se presentan los profesionales: tarjetas de presentación metálicas con un chip NFC que, al acercarse a un celular, abre el perfil digital del dueño con sus datos, redes y botón de contacto directo. El producto físico existía. La visión existía. Lo que no existía era todo lo demás: sin plataforma que vincule cada chip con su perfil, el negocio simplemente no podía operar.

- `before`:
  - `Producto físico definido, pero sin el sistema digital que lo hace funcionar`
  - `Sin forma de crear perfiles, vincular chips ni gestionar clientes`
  - `Una idea validable únicamente construyendo la primera versión real`
- `solution`:
  - `Perfil público personalizable tipo tarjeta digital: foto, cargo, empresa, redes y descarga de contacto directo al teléfono (vCard)`
  - `Redirección NFC: cada chip físico apunta al perfil correcto, con vinculación y desvinculación administrable`
  - `Panel del usuario para editar su tarjeta digital: hasta 6 botones de acción, plantillas visuales, foto y banner`
  - `Panel de administración del negocio: activación de cuentas, vencimientos de servicio, registro de chips y auditoría de todas las acciones`
  - `Analítica de visitas y clics sin cookies, cumpliendo normas de privacidad`
  - `Infraestructura lista para crecer: sumar funciones sin reescribir la base`
- `results`:
  - `{ metric: "De idea a operar", detail: "La startup pasó de un producto sin plataforma a vender y operar de verdad." }`
  - `{ metric: "2 países", detail: "Veltrix opera hoy en Perú y Chile sobre la misma base construida como MVP." }`
  - `{ metric: "MVP que escala", detail: "La arquitectura de la primera versión sostiene el crecimiento sin rehacerse desde cero." }`
- `quote`: `null` (testimonio pendiente de aprobación)

---

## §4 Artículos (van a `src/content/recursos/*.ts`)

Artículos aprobados editorialmente; los rangos de precio de A1 y A5 cuentan con visto bueno comercial. Son **referencias del mercado peruano, no tarifas de Elaris** — mantener ese encuadre en cualquier edición futura. Tanda 1: **A1, A4, A5**. Tanda 2 (~2 semanas después): **A2, A3, A6**. Esta composición garantiza que ningún enlace entre artículos apunte a una URL aún no publicada (A1→A5 y A3→A6 conviven en su propia tanda).

Campos comunes por artículo: `authorSlug`, `servicePath`, `caseSlug`, `tags`, `seoTitle`, `seoDescription`, `intro` (párrafos), `sections` (`{h2, paragraphs[], list?}`), `faq`, `ctaText: "Solicitar diagnóstico"`.

---

### A1 — slug `cuanto-cuesta-software-a-medida-peru` · autor `carlos-colfer` · servicio `/desarrollo-software-medida` · caso `salcedo-jewels`

- `title` (H1): `¿Cuánto cuesta desarrollar un software a medida en Perú? Guía honesta de precios`
- `seoTitle`: `¿Cuánto Cuesta un Software a Medida en Perú? [Guía 2026]`
- `seoDescription`: `Rangos reales del mercado peruano para desarrollar software a medida, qué determina el precio y cómo evitar los costos ocultos del software barato.`
- `tags`: `["software a medida", "costos", "Perú"]`

**intro:**

> Si estás cotizando un software a medida en Perú, ya te habrás dado cuenta del problema: nadie publica precios. Recibes propuestas que van de 5,000 a 150,000 soles por lo que parece ser "lo mismo", y nadie te explica por qué.
>
> En esta guía te contamos lo que les explicamos a nuestros clientes antes de que inviertan un sol: qué determina realmente el precio de un software a medida, cuáles son los rangos del mercado peruano y — más importante — cómo detectar el costo oculto de la opción barata.

**sections:**

**H2: Qué determina el precio de un software a medida**

> No existe un "precio por software", igual que no existe un "precio por casa". El costo sale de cuatro variables concretas.
>
> La primera es el **alcance funcional**: cuántas cosas distintas hace el sistema. Un catálogo consultable es una cosa; un catálogo con inventario, ventas, cuotas y reportes es otra. Cada módulo suma horas de diseño, desarrollo y prueba.
>
> La segunda son las **integraciones**: si el sistema debe conversar con tu facturador, tu banco, tu ERP o una pasarela de pagos, cada conexión es trabajo de ingeniería real — y suele ser lo que separa un sistema útil de uno que obliga a recapturar datos a mano.
>
> La tercera es el **volumen y los usuarios**: no cuesta lo mismo un sistema para 5 personas de una oficina que uno que atiende a miles de clientes simultáneos.
>
> Y la cuarta, la que casi nadie menciona: **quién asume el riesgo**. Una propuesta seria incluye pruebas, documentación, garantía y un plan de salida a producción. Una barata, no — y ese costo no desaparece: se te transfiere a ti, con intereses.

**H2: Rangos de precio del mercado peruano (referenciales, 2026)**

> Estos rangos salen de lo que se cotiza hoy en el mercado peruano para proyectos bien especificados. Son referenciales — tu proyecto puede salir de estos rangos por alcance, y eso es exactamente lo que un buen diagnóstico define antes de comprometerte.
>
- lista:
  - `Automatización puntual o módulo interno sencillo: S/ 8,000 – S/ 25,000`
  - `Sistema de gestión a medida (inventario, pedidos, operaciones): S/ 25,000 – S/ 80,000`
  - `Plataforma completa con integraciones (pagos, ERP, apps móviles): S/ 80,000 – S/ 250,000+`
  - `Hora de desarrollo freelance: S/ 40 – S/ 120 · Hora de agencia/estudio: S/ 120 – S/ 350`

**H2: Por qué el precio por hora engaña**

> La pregunta "¿cuánto cobras por hora?" parece prudente, pero compara mal. Un desarrollador de S/ 60 la hora que necesita 400 horas — y deja el sistema sin pruebas ni documentación — sale más caro que un equipo de S/ 200 la hora que lo resuelve en 150 con garantía incluida.
>
> Lo que de verdad quieres comparar es el **costo total por resultado**: cuánto cuesta llegar a un sistema funcionando, probado, documentado y del que seas dueño. Por eso en Elaris cotizamos [proyectos con alcance, plazo y costo cerrados por fase](/desarrollo-software-medida), no bolsas de horas: el riesgo de que tome más tiempo es nuestro, no tuyo.

**H2: El costo oculto del software barato**

> El software barato se paga tres veces. Primero, cuando lo compras. Segundo, cuando descubres lo que no incluía: sin documentación, sin pruebas, sin garantía, y un código que solo entiende quien lo escribió — que ya no contesta. Tercero, cuando otro equipo tiene que rehacerlo desde cero porque salía más caro arreglarlo.
>
> Hay señales de alerta claras: propuestas sin criterios de aceptación escritos, precios cerrados sin haber entendido tu operación, cero mención de quién es dueño del código, y la promesa de que "en dos semanas está todo".
>
> Un ejemplo de lo contrario: cuando [Salcedo Jewels nos pidió su plataforma](/casos/salcedo-jewels), lo primero no fue cotizar — fue entender que su problema real era un catálogo en PDF que rehacían a mano con cada venta. El sistema que salió de ese diagnóstico redujo el tiempo operativo en 70–80%. El precio correcto se define entendiendo el problema, no adivinándolo.

**H2: Cómo saber cuánto costaría TU proyecto**

> La única respuesta honesta a "¿cuánto cuesta?" es "depende del alcance — definámoslo". En Elaris eso se hace con un diagnóstico de dos semanas: revisamos cómo opera hoy tu negocio, identificamos cuellos de botella y te entregamos una ruta de desarrollo con costos estimados, antes de que te comprometas a nada.
>
> Con eso en mano puedes comparar propuestas con criterio — la nuestra o la de cualquier otro. Si quieres el punto de partida, también te sirve nuestra guía de [cuánto cuesta una página web en Perú](/recursos/cuanto-cuesta-una-pagina-web-peru) para proyectos más acotados.

**faq:**
- `¿Cuánto cuesta un software a medida sencillo en Perú?` → `Un módulo o automatización puntual bien especificada se cotiza en el mercado peruano entre S/ 8,000 y S/ 25,000 aproximadamente. Por debajo de eso, revisa con lupa qué está incluido: pruebas, documentación y garantía suelen ser lo primero que se recorta.`
- `¿El diagnóstico de Elaris tiene costo?` → `No. El diagnóstico técnico y operativo es gratuito y toma dos semanas. Te entregamos un informe con la ruta de desarrollo y los costos estimados antes de que inviertas.`
- `¿Es más barato contratar un freelance?` → `Por hora, sí. Por resultado, depende: para proyectos pequeños y bien definidos un buen freelance funciona; para sistemas de los que va a depender tu operación, el costo de que algo falle sin soporte suele superar el ahorro.`
- `¿Quién queda como dueño del código?` → `Depende de lo que firmes — y deberías firmarlo antes de empezar. En Elaris el código es 100% del cliente: repositorio completo, documentación y licencia perpetua al cierre del proyecto.`

---

### A2 — slug `shopify-woocommerce-o-tienda-a-medida` · autor `fabrizio-bussalleu` · servicio `/e-commerce` · caso `salcedo-jewels`

- `title`: `Shopify, WooCommerce o tienda a medida: qué le conviene a tu negocio`
- `seoTitle`: `Shopify vs WooCommerce vs Tienda a Medida: Cuál Elegir [2026]`
- `seoDescription`: `Comparativa honesta para negocios en Perú: cuándo alcanza Shopify o WooCommerce y cuáles son las 5 señales de que necesitas una tienda online a medida.`
- `tags`: `["e-commerce", "shopify", "woocommerce"]`

**intro:**

> "¿Me hago un Shopify o me mandan a hacer mi tienda?" es probablemente la pregunta que más nos hacen. Y la respuesta honesta — que no siempre nos conviene comercialmente — es: depende de tu operación, no de la moda.
>
> Esta guía compara las tres rutas sin fanatismo: qué resuelve cada una, cuánto cuesta de verdad cada camino, y las cinco señales concretas de que las plataformas estándar te quedaron chicas.

**sections:**

**H2: Qué resuelve cada opción**

> **Shopify** es alquiler de local comercial listo para usar: pagas mensualidad, subes productos y vendes el mismo día. Excelente para validar y para catálogos estándar. Sus límites: comisiones por venta, dependencia de apps de terceros para todo lo no estándar, y tu operación adaptándose a la plataforma — nunca al revés.
>
> **WooCommerce** es un plugin de tienda sobre WordPress: más control y sin mensualidad de plataforma, a cambio de que tú (o alguien) administre hosting, seguridad, actualizaciones y la fricción entre plugins. Más libre que Shopify, más frágil si nadie lo mantiene.
>
> **La tienda a medida** se construye alrededor de tu operación: tu inventario, tus reglas de venta, tus integraciones. Cuesta más al inicio y tarda más en salir — y es la única opción donde la plataforma trabaja exactamente como tu negocio necesita.

**H2: Cuándo Shopify o WooCommerce son la respuesta correcta**

> Seamos claros: si vendes productos estándar, con stock repetible, sin reglas raras de precio ni integraciones críticas, **no necesitas una tienda a medida**. Un Shopify bien montado te sirve, y decirte lo contrario sería venderte de más.
>
- lista:
  - `Estás validando: primeras ventas, catálogo chico, presupuesto ajustado`
  - `Tu producto es estándar: tallas y colores convencionales, stock que se repone`
  - `Tus procesos encajan en lo que la plataforma ya hace`
  - `No dependes de integrar sistemas propios (ERP, facturación, logística especial)`

**H2: Las 5 señales de que las plataformas te quedaron chicas**

- lista:
  - `1. Tu inventario tiene lógica propia: piezas únicas, variantes complejas, stock compartido entre canales — y vives corrigiendo a mano lo que la plataforma no entiende`
  - `2. Tu forma de cobrar no es la estándar: cuotas con seguimiento, transferencias con confirmación, validaciones locales como el DNI`
  - `3. Pagas cada vez más apps para simular lo que necesitas, y el stack se volvió una torre de parches`
  - `4. Necesitas que la tienda converse con tus sistemas: facturación, contabilidad, courier, punto de venta físico`
  - `5. La operación diaria depende de una persona "que sabe cómo se hace" en la plataforma — y eso no escala`

> Si marcaste dos o más, ya no estás eligiendo plataforma: estás decidiendo cuánto tiempo más quieres pagar el costo de que tu operación se adapte a un software genérico.

**H2: Qué cuesta cada camino de verdad**

> Shopify parece barato ($25–$399 mensuales según plan) hasta que sumas comisiones por venta, apps de pago y el tiempo del equipo peleando contra los límites. WooCommerce parece gratis hasta que pagas hosting decente, plugins premium y a la persona que lo mantiene vivo. En ambos, el costo es recurrente y crece con tu negocio.
>
> La [tienda a medida](/e-commerce) invierte esa curva: inversión inicial mayor, pero sin mensualidad de plataforma, sin comisión por venta y sin pagar por funciones que simulan tu operación — porque la plataforma ES tu operación. En negocios con reglas propias, el punto de cruce suele llegar antes de lo que parece.

**H2: Un caso real: la joyería que Shopify no podía resolver**

> [Salcedo Jewels](/casos/salcedo-jewels) vende piezas únicas de oro de 18k: cada joya existe una sola vez, en una talla concreta. En una plataforma estándar, eso es una pesadilla de variantes; en su operación real, significaba catálogo en PDF rehecho a mano con cada venta y ventas duplicadas por stock desfasado.
>
> Su tienda a medida hizo del catálogo y el inventario una sola cosa: se vende la pieza, desaparece del catálogo. Checkout con validación peruana, cuotas con control de cumplimiento y editor de fotos integrado. El resultado: 70–80% menos tiempo operativo y ventas todo el año.

**faq:**
- `¿Shopify o WooCommerce para empezar en Perú?` → `Si quieres velocidad y cero mantenimiento, Shopify. Si quieres pagar menos al mes y tienes quién lo mantenga, WooCommerce. Para validar un negocio nuevo, cualquiera de los dos es mejor que esperar una tienda a medida.`
- `¿Cuándo conviene pasar a una tienda a medida?` → `Cuando tu operación tiene reglas propias que las plataformas no entienden (inventario, cobros, integraciones) y ya pagas ese desajuste en horas de trabajo manual o ventas perdidas. Ahí la inversión inicial se recupera en operación.`
- `¿Puedo migrar de Shopify a una tienda a medida sin perder mis ventas?` → `Sí. La migración se planifica con las dos tiendas conviviendo: catálogo y clientes se trasladan, las URLs importantes se redirigen y el cambio se hace sin apagar el canal de ventas.`
- `¿Una tienda a medida incluye las pasarelas de pago peruanas?` → `Sí — esa es justamente una de sus ventajas: integra las formas de pago que tus clientes usan de verdad (tarjetas, Yape/Plin, transferencia con confirmación, cuotas), no solo las que la plataforma trae de fábrica.`

---

### A3 — slug `automatizar-procesos-con-ia` · autor `fabrizio-bussalleu` · servicio `/inteligencia-artificial` · caso `salcedo-jewels`

- `title`: `Automatización con IA para empresas: 7 procesos que ya puedes automatizar (sin proyecto eterno)`
- `seoTitle`: `Automatizar Procesos con IA: 7 Casos Reales para tu Empresa`
- `seoDescription`: `Qué procesos puede automatizar la IA hoy en una empresa —facturas, correos, documentos, reportes— cómo elegir el primero y cuánto tarda en dar resultados.`
- `tags`: `["inteligencia artificial", "automatización", "pymes"]`

**intro:**

> A todas las empresas les están vendiendo "IA" — y casi nadie les dice para qué la usarían ellas, con sus procesos y sus datos. El resultado es predecible: proyectos eternos, demos impresionantes y cero impacto en la operación.
>
> Esta guía va al grano: los siete procesos que una empresa como la tuya puede automatizar con IA hoy, cómo elegir por cuál empezar, y qué necesitas tener listo antes — que es menos de lo que crees.

**sections:**

**H2: Qué automatiza bien la IA hoy (y qué no)**

> La IA actual brilla en una categoría concreta: tareas donde una persona lee, clasifica, extrae o redacta información siguiendo criterios que puede explicar. Si tu equipo dice "esto es mecánico pero alguien tiene que hacerlo", probablemente es automatizable.
>
> Lo que la IA no hace bien: decisiones sin criterio definible, tareas donde equivocarse es inaceptable sin revisión humana, y procesos que ni tu propio equipo sabe explicar. La automatización ordena procesos que existen; no arregla procesos que no existen — para eso está primero la [transformación digital](/recursos/transformacion-digital-pymes-por-donde-empezar).

**H2: Los 7 procesos automatizables con IA en una empresa**

- lista:
  - `1. Lectura de facturas y comprobantes: extraer datos de PDFs y fotos directo a tu sistema contable, sin digitación`
  - `2. Clasificación de correos: cada mensaje etiquetado y derivado al área correcta, con borrador de respuesta para los casos repetidos`
  - `3. Respuestas a consultas frecuentes: un asistente que responde con TUS datos —catálogo, políticas, stock— no con inventos genéricos`
  - `4. Extracción de datos de contratos y documentos: fechas clave, montos, obligaciones y vencimientos a una tabla consultable`
  - `5. Resúmenes ejecutivos: reportes largos convertidos en el párrafo que el gerente realmente va a leer`
  - `6. Control de calidad documental: detectar campos faltantes, inconsistencias y errores antes de que cuesten dinero`
  - `7. Registro de operaciones: convertir mensajes de WhatsApp y correos sueltos en registros estructurados (pedidos, incidencias, leads)`

**H2: Cómo elegir el primer proceso (impacto × riesgo)**

> El error clásico es empezar por el proceso más vistoso. Empieza por el que cumple tres condiciones: consume muchas horas al mes, tiene reglas claras, y un error se detecta fácil y no cuesta caro. Facturas y clasificación de correos suelen ganar por goleada.
>
> El segundo error es el proyecto eterno. Un caso bien acotado — un proceso, un área — puede estar [funcionando en 3 a 5 semanas](/inteligencia-artificial). Se mide el resultado real (horas ahorradas, precisión) y con esa evidencia se decide el siguiente. Así la IA se paga sola en cada paso, en vez de pedir un acto de fe de seis meses.

**H2: Qué necesitas tener antes de empezar**

> Menos de lo que te han dicho. No necesitas "tener tus datos perfectos" ni entrenar ningún modelo propio: los modelos actuales se conectan a tus documentos y sistemas tal como están. Lo que sí necesitas: acceso a los datos del proceso (los PDFs, el correo, el Excel), una persona del área que explique las reglas del proceso, y la decisión de medir el antes y el después.
>
> Sobre la privacidad: si tus datos no pueden salir de tu infraestructura, la solución puede correr completamente dentro de ella. Es un requisito de diseño, no un impedimento.

**H2: La automatización también es operativa (no todo es IA)**

> Un matiz honesto: buena parte del ahorro en una empresa viene de automatización "clásica" — sistemas que integran lo que hoy se copia a mano — con IA en los puntos donde hay que interpretar información. [Salcedo Jewels](/casos/salcedo-jewels) es un buen ejemplo: automatizar la emisión de boletas, el registro de ventas y la actualización del catálogo redujo su tiempo operativo en 70–80%. La pregunta correcta no es "¿cómo uso IA?" sino "¿dónde pierde tiempo mi operación?" — y a veces la respuesta es IA, a veces es integración, y casi siempre es una mezcla.

**faq:**
- `¿Cuánto cuesta automatizar un proceso con IA?` → `Depende del proceso y el volumen, pero un primer caso acotado es una inversión de semanas, no de meses. La forma seria de saberlo es un diagnóstico del proceso concreto — el nuestro no tiene costo.`
- `¿Necesito entrenar una IA con mis datos?` → `Casi nunca. La mayoría de los casos funciona conectando modelos existentes a tus documentos y sistemas actuales. Entrenar un modelo propio solo se evalúa en casos muy específicos y nunca es el punto de partida.`
- `¿Qué pasa con la privacidad de mis datos?` → `Si tu empresa lo requiere, la solución corre dentro de tu propia infraestructura y ningún dato sale de ella. Además se firma confidencialidad y tus datos no se usan para entrenar modelos de terceros.`
- `¿La IA va a reemplazar a mi equipo?` → `En estos casos, no: les quita la parte mecánica del trabajo (leer, copiar, clasificar) para que hagan la parte que sí necesita criterio. La revisión humana se mantiene donde el error cuesta caro.`

---

### A4 — slug `como-validar-una-idea-de-negocio-mvp` · autor `carlos-colfer` · servicio `/desarrollo-mvp` · caso `veltrixnfc`

- `title`: `Cómo validar tu idea de negocio con un MVP (guía para no técnicos)`
- `seoTitle`: `Qué es un MVP y Cómo Validar tu Idea de Negocio [Guía Práctica]`
- `seoDescription`: `Qué es un MVP explicado sin jerga, los errores que matan ideas buenas, qué construir primero y un caso real que pasó de idea a operar en dos países.`
- `tags`: `["mvp", "startups", "validación"]`

**intro:**

> Tienes una idea de negocio que crees buena. Tus amigos dicen que es buena. ¿Y ahora? Entre "tengo la idea" y "tengo un negocio" hay un abismo donde mueren la mayoría de los proyectos — casi siempre por la misma razón: construyeron demasiado antes de validar, o validaron tan poco que nadie les creyó.
>
> Un MVP existe para cruzar ese abismo gastando lo mínimo. En esta guía te explicamos qué es exactamente, qué entra (y qué no) en la primera versión, y cómo se ve cuando sale bien.

**sections:**

**H2: Qué es un MVP, en cristiano**

> MVP significa "producto mínimo viable" (minimum viable product), y la definición útil es esta: **la versión más pequeña de tu producto que ya genera valor real a usuarios reales**. No es una maqueta, ni una presentación, ni una promesa: es tu producto funcionando, recortado a lo esencial.
>
> La palabra clave es "viable": tiene que resolver el problema de verdad. Un MVP de una plataforma de reservas tiene que reservar. Lo "mínimo" está en todo lo demás: sin las 40 funciones del plan quinquenal, sin la app nativa que "algún día", sin el panel de reportes que nadie pidió aún.

**H2: Los errores que matan ideas buenas**

- lista:
  - `Construir el producto completo primero: 8 meses y los ahorros invertidos para descubrir que el mercado quería otra cosa`
  - `Esperar la perfección: cada mes de pulido sin usuarios es un mes de aprendizaje perdido`
  - `Validar solo con opiniones: las encuestas dicen "me encanta"; la tarjeta de crédito dice la verdad`
  - `Confundir barato con mínimo: un MVP mal construido que se cae con 10 usuarios no valida nada — invalida`
  - `No definir qué se está validando: sin una hipótesis clara ("la gente pagará X por Y"), ningún resultado enseña nada`

**H2: Qué entra en la primera versión (y qué no)**

> El corte se hace con una pregunta: ¿esta función es necesaria para que el usuario reciba el valor central? Si la respuesta es "estaría bien tenerla", va a la lista de después.
>
> Lo que casi siempre entra: el flujo principal completo (de la llegada del usuario al valor entregado), la forma de cobrar si el modelo lo requiere, y un panel mínimo para que TÚ puedas operar el negocio desde el día uno. Lo que casi nunca entra en la v1: apps nativas, integraciones "para escalar", personalización avanzada y todo lo que empiece con "cuando tengamos muchos usuarios".
>
> Un [MVP bien planteado](/desarrollo-mvp) se define en el diagnóstico: qué hipótesis valida, qué entra, qué se mide. Entre 4 y 10 semanas después, está en manos de usuarios.

**H2: De idea a operar en dos países: el caso VeltrixNFC**

> [Veltrix](/casos/veltrixnfc) tenía un producto físico — tarjetas de presentación metálicas con chip NFC — y una visión clara. Pero sin plataforma digital, el negocio no existía: nada vinculaba cada chip con el perfil de su dueño.
>
> Su MVP fue exactamente lo viable: perfil digital personalizable, redirección NFC y el panel para operar cuentas y chips. Sin app nativa, sin funciones de "algún día". Con eso Veltrix salió al mercado, consiguió clientes reales y hoy opera en Perú y Chile — sobre la misma base técnica, que fue diseñada para crecer sin rehacerse.

**H2: Después del MVP: qué hacer con lo que aprendiste**

> El MVP no termina cuando se lanza: termina cuando responde la pregunta. Si los usuarios llegan, pagan y vuelven — escala: las funciones de la lista de después ahora tienen evidencia que las justifique. Si no llegan, ajusta la hipótesis con lo aprendido, que ahora es concreto: qué probaron, dónde se cayeron, qué pidieron.
>
> En ambos escenarios ganaste lo mismo: certeza barata. Y si el producto despega, el requisito silencioso se vuelve crítico: que la primera versión haya sido construida para soportar la segunda. Pregunta por eso antes de contratar a quien te lo construya — te ahorrará rehacer todo en el peor momento posible.

**faq:**
- `¿Cuánto cuesta desarrollar un MVP?` → `Depende del alcance que definamos: un MVP acotado cuesta una fracción de la plataforma completa, y por eso el primer paso es delimitar bien qué valida. Tras el diagnóstico recibes alcance, plazo y costo cerrados.`
- `¿Cuánto tarda un MVP?` → `Entre 4 y 10 semanas según la complejidad, trabajando en sprints con avances visibles cada dos semanas.`
- `¿Necesito saber de tecnología para encargar un MVP?` → `No. Necesitas conocer tu negocio y tu cliente; la traducción a producto es trabajo de quien te lo construye. Desconfía de quien te pida especificaciones técnicas que no tienes por qué saber.`
- `¿De quién es la idea y el código?` → `Tuyos al 100%. Se firma confidencialidad desde la primera conversación y al cierre recibes el repositorio completo con documentación.`

---

### A5 — slug `cuanto-cuesta-una-pagina-web-peru` · autor `sergio-herrera` · servicio `/desarrollo-web` · caso `ccc-impresiones`

- `title`: `¿Cuánto cuesta una página web en Perú? Precios reales y qué incluye cada rango`
- `seoTitle`: `¿Cuánto Cuesta una Página Web en Perú? Precios Reales 2026`
- `seoDescription`: `Rangos de precio reales del mercado peruano para páginas web: plantillas, freelance, agencias y desarrollo a medida. Qué incluye (y qué no) cada opción.`
- `tags`: `["desarrollo web", "costos", "Perú"]`

**intro:**

> "¿Cuánto cuesta una página web?" tiene el mismo problema que "¿cuánto cuesta un carro?": la respuesta va de casi nada a decenas de miles, y sin saber qué incluye cada precio, comparar es imposible.
>
> Esta guía pone los rangos reales del mercado peruano sobre la mesa — desde la plantilla que armas tú mismo hasta el desarrollo a medida — y te dice exactamente qué estás comprando (y qué no) en cada uno, para que la decisión sea tuya y no del vendedor.

**sections:**

**H2: Los rangos del mercado peruano (referenciales, 2026)**

> Lo que sigue son referencias del mercado peruano, no tarifas de Elaris: sirven para que compares propuestas con criterio.
>
- lista:
  - `Hazlo tú mismo (Wix, plantillas): S/ 0 – S/ 1,500 al año en suscripciones`
  - `Freelance con plantilla adaptada: S/ 800 – S/ 3,500 por el proyecto`
  - `Estudio o agencia (diseño propio, sitio institucional): S/ 3,500 – S/ 15,000`
  - `Desarrollo a medida (diseño + funcionalidad específica, catálogos, integraciones): S/ 15,000 en adelante, según alcance`
>
> Ninguno de estos rangos es "el correcto": cada uno compra una cosa distinta. La estafa no está en el precio alto ni en el bajo — está en pagar por una categoría y recibir otra.

**H2: Qué incluye (y qué no) cada rango**

> **El hazlo-tú-mismo** compra independencia y velocidad. No incluye: diseño profesional, posicionamiento en Google, ni tiempo — el tuyo, que vas a gastar en cantidades sorprendentes.
>
> **El freelance con plantilla** compra un sitio decente rápido. Revisa qué pasa después de la entrega: hosting, actualizaciones, cambios de contenido. El riesgo clásico es el sitio huérfano: quien lo hizo ya no responde y nadie más quiere tocarlo.
>
> **La agencia/estudio** compra diseño a tu marca, proceso y alguien que responde. Las diferencias grandes dentro del rango están en lo invisible: velocidad de carga, base técnica para Google y autonomía para editar tu propio contenido.
>
> **El desarrollo a medida** compra que el sitio haga cosas: catálogo administrable, cotizadores, reservas, integraciones con tus sistemas. Aquí ya no estás comprando una página — estás comprando una [herramienta de venta construida para tu operación](/desarrollo-web).

**H2: Web folleto vs web que vende**

> La distinción que más plata cuesta no entenderla: una web folleto dice quién eres; una web que vende trabaja — capta consultas, muestra tu catálogo actualizado, responde lo que tus clientes preguntan y aparece cuando te buscan.
>
> La diferencia no es estética, es funcional: formularios y WhatsApp integrados, contenido que tú mismo puedes actualizar, estructura pensada para Google y medición de qué genera consultas. Si tu web actual no genera ni una consulta al mes, no tienes una web barata — tienes un gasto con dominio propio.

**H2: El costo real: la web que nadie encuentra**

> Aquí está el costo oculto del que casi nadie habla al cotizar: **una web que no aparece en Google es una oficina en un sótano sin cartel**. Da igual lo bonita que sea.
>
> Aparecer cuando te buscan por nombre es lo mínimo. El valor está en aparecer cuando buscan lo que vendes — "imprenta de etiquetas", "joyería de oro en Lima" — y eso no ocurre por suerte: se construye con base técnica y [trabajo de posicionamiento sostenido](/posicionamiento-seo). Al cotizar tu web, pregunta siempre qué incluye de SEO técnico; la respuesta te dirá si estás comprando presencia o solo diseño.

**H2: Un caso real: la imprenta que pasó de invisible a recibir clientes de Google**

> [CCC Impresiones](/casos/ccc-impresiones) operaba con Excel y papel, y en internet no existía: cero captación digital, todo por boca a boca. Su proyecto no fue "una página": fue tienda online, cotizador de trabajos personalizados y una base técnica SEO desde el día uno.
>
> El resultado que importa para esta guía: hoy le llegan clientes que la encontraron en Google, sin pagar por clic. Esa es la diferencia entre gastar en una web y comprar un canal de venta.

**faq:**
- `¿Cuánto cuesta una página web sencilla en Perú?` → `Un sitio institucional hecho por un profesional se mueve entre S/ 3,500 y S/ 15,000 según diseño y alcance. Por debajo, normalmente estás comprando una plantilla adaptada — que puede ser suficiente si solo necesitas presencia.`
- `¿Cuánto cuesta el mantenimiento de una web?` → `Entre el hosting, dominio y actualizaciones, un sitio profesional cuesta desde unos S/ 500–1,500 al año si es simple. Lo importante es saberlo antes de firmar: el sitio "barato" sin plan de mantenimiento suele ser el que muere en un año.`
- `¿Mi web incluirá aparecer en Google?` → `Toda web seria debe incluir la base técnica (velocidad, estructura, etiquetado). El posicionamiento sostenido para búsquedas competitivas es un trabajo aparte y continuo — desconfía de quien te "garantice el primer lugar" como parte del diseño.`
- `¿Puedo actualizar el contenido yo mismo?` → `Debería ser un requisito de tu compra: textos, fotos y precios editables por tu equipo sin depender de nadie. En Elaris entregamos los sitios con gestor de contenido y capacitación incluida.`

---

### A6 — slug `transformacion-digital-pymes-por-donde-empezar` · autor `sergio-herrera` · servicio `/transformacion-digital` · caso `ccc-impresiones`

- `title`: `Transformación digital para pymes: por dónde empezar (sin comprar humo)`
- `seoTitle`: `Transformación Digital para Pymes: Por Dónde Empezar [Guía]`
- `seoDescription`: `Guía práctica de transformación digital para pymes: las señales de que el Excel ya no da, el orden correcto para digitalizar y los errores que cuestan caro.`
- `tags`: `["transformación digital", "pymes", "digitalización"]`

**intro:**

> "Transformación digital" es de esas frases que de tanto venderse ya no significan nada. Detrás del humo, sin embargo, hay algo muy concreto y muy rentable: **ordenar y digitalizar cómo opera tu empresa, empezando por lo que más te cuesta**.
>
> Esta guía es el mapa que le damos a un gerente de pyme que sabe que "así ya no podemos seguir" pero no sabe por dónde agarrar: las señales de que llegó el momento, el orden correcto de los pasos y los errores que hemos visto costar caro.

**sections:**

**H2: Qué es (y qué no es) la transformación digital de una pyme**

> No es comprar software de moda, ni "subirse a la nube", ni tener redes sociales. Es que la información de tu negocio — ventas, inventario, clientes, operaciones — fluya por sistemas en vez de por personas que copian datos de un lado a otro.
>
> La prueba de fuego es simple: si para saber cuánto vendiste este mes alguien tiene que juntar Excels, no te falta un software — te falta transformación digital. El software es solo la herramienta; lo que se transforma es el proceso.

**H2: Las señales de que el Excel ya no da**

- lista:
  - `La información vive regada entre Excel, WhatsApp y papel, y cada área tiene "su versión"`
  - `Tu equipo copia datos a mano de un sistema a otro todos los días`
  - `Los números reales del negocio se conocen a fin de mes — si se conocen`
  - `Crecer significa contratar más gente para hacer más trabajo manual`
  - `Los errores de digitación cuestan plata real: pedidos duplicados, stock fantasma, cobros perdidos`
>
> Tres o más señales: tu operación ya está pagando el costo de no digitalizar — solo que repartido en horas y errores, donde no se ve.

**H2: El orden correcto: diagnóstico → proceso crítico → fases**

> El primer paso no es comprar nada: es **mirar la operación completa** y encontrar el proceso que más duele — el que consume más horas o genera más errores. Ese diagnóstico honesto evita el error más caro de todos: digitalizar lo que no importaba.
>
> Después se ataca **un solo proceso, de punta a punta**, y se mide el resultado. Con esa victoria — horas recuperadas, errores eliminados — el siguiente paso se financia y se justifica solo. La [transformación digital bien hecha](/transformacion-digital) avanza así: por fases de 4 a 10 semanas, cada una con valor propio, al ritmo que tu caja y tu equipo aguanten.
>
> Y en cada fase, la pregunta correcta no es "¿qué herramienta compro?" sino "¿herramienta estándar o a medida?". A veces la respuesta es un software genérico bien implementado; a veces, desarrollo propio. Quien te diagnostica debe poder recomendarte cualquiera de las dos sin sesgo.

**H2: Los errores que cuestan caro**

- lista:
  - `Digitalizar el caos: ponerle software a un proceso desordenado solo produce caos más rápido — primero se ordena el proceso`
  - `El big bang: cambiar todo a la vez paraliza la operación y quema al equipo; se avanza por fases`
  - `Comprar herramientas sin proceso: el ERP carísimo que nadie usa es el monumento clásico a este error`
  - `Ignorar al equipo: si quienes van a usar el sistema no participan desde el diagnóstico, lo boicotearán con razón`
  - `No medir: sin un antes y un después (horas, errores, ventas), nunca sabrás si funcionó`

**H2: Y las áreas "no digitales" también cuentan**

> La transformación digital no es solo ventas y administración. Si tu empresa tiene activos físicos — máquinas, vehículos, equipos — el mantenimiento es de los procesos con mayor retorno al digitalizar: pasar del "se malogró, corran" al [mantenimiento planificado con un CMMS](/implementacion-cmms) reduce paradas que cuestan producción real. El principio es el mismo de toda esta guía: registrar, ordenar, anticipar.

**H2: Un caso real: de Excel y papel a operación digital**

> [CCC Impresiones](/casos/ccc-impresiones), una imprenta industrial argentina, llevaba toda su operación comercial en Excel y hojas físicas, y no existía en internet. Su transformación siguió exactamente el orden de esta guía: primero el proceso más doloroso (catálogo y pedidos), por fases, midiendo.
>
> Hoy su catálogo, cotizaciones y pedidos viven en un solo sistema, y Google le trae clientes que antes no sabían que existía. No fue magia ni un proyecto faraónico: fue orden, fases y un equipo que adoptó lo que ayudó a diseñar.

**faq:**
- `¿Por dónde empiezo la transformación digital de mi pyme?` → `Por un diagnóstico de cómo opera hoy tu empresa: dos semanas mirando procesos, no comprando herramientas. De ahí sale una hoja de ruta priorizada por impacto. El nuestro no tiene costo.`
- `¿Cuánto cuesta digitalizar una pyme?` → `Depende del punto de partida y el alcance, pero al avanzar por fases el gasto se reparte: cada fase se cotiza cerrada y la anterior suele financiar la siguiente con las horas que recupera.`
- `¿Y si mi equipo no es tecnológico?` → `Es el caso normal, no la excepción. Los sistemas se diseñan para quien los va a usar, con capacitación en cada entrega. Si el equipo no lo adopta, el proyecto falló — ese es el criterio de diseño número uno.`
- `¿Tengo que botar los sistemas que ya uso?` → `No. Lo que funciona se integra; se reemplaza solo lo que te está frenando. La transformación digital seria aprovecha lo existente en vez de facturarte todo de nuevo.`

---

## §5 Checklist de consistencia del anexo

- [ ] 3 bios aprobadas y sin marcadores pendientes; los tres figuran como cofundadores.
- [ ] 4 casos: solo cifras autorizadas; `quote` únicamente en Salcedo.
- [ ] 6 artículos: keyword en H1/primer párrafo/≥1 H2; FAQ 3–4; enlaces a servicio + caso + (cuando aplica) artículo hermano; CTA "Solicitar diagnóstico"; cero "gratuito" fuera de respuestas de costo (aparece solo en FAQs de costo de A1/A6 y contexto de diagnóstico — verificado).
- [ ] Rangos de precio SOLO en A1 y A5, siempre encuadrados como referencias del mercado (nunca tarifas de Elaris).
- [ ] Enlaces internos usados: `/desarrollo-software-medida`, `/e-commerce`, `/inteligencia-artificial`, `/desarrollo-mvp`, `/desarrollo-web`, `/posicionamiento-seo`, `/transformacion-digital`, `/implementacion-cmms`, `/casos/salcedo-jewels`, `/casos/veltrixnfc`, `/casos/ccc-impresiones`, `/recursos/cuanto-cuesta-una-pagina-web-peru`, `/recursos/transformacion-digital-pymes-por-donde-empezar` — todos existen en el plan de rutas.
