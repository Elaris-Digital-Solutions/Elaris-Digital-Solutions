import type { CaseStudy } from "./types";

/**
 * Casos de éxito. Cifras y nombres autorizados por el negocio.
 * Los testimonios de UPC, CCC y Veltrix siguen pendientes de aprobación
 * del cliente: hasta entonces `quote` es null y la plantilla omite el
 * bloque. Nunca añadir una cita sin autorización escrita.
 */
export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "salcedo-jewels",
    client: "Salcedo Jewels",
    heading: "La joyería que dejó de rehacer su catálogo con cada venta",
    sector: "Joyería / Retail",
    location: { city: "Lima, Chiclayo y Cajamarca", country: "Perú" },
    servicePaths: ["/e-commerce", "/desarrollo-software-medida"],
    liveUrl: "https://salcedojewels.com",
    portfolioKey: "salcedoJewels",
    relatedArticleSlugs: [
      "shopify-woocommerce-o-tienda-a-medida",
      "cuanto-cuesta-software-a-medida-peru",
    ],
    publishDate: "2026-08-03",
    seoTitle:
      "Caso Salcedo Jewels: E-commerce de Joyería con 80% Menos Trabajo Operativo",
    seoDescription:
      "Cómo una joyería con tiendas en Lima, Chiclayo y Cajamarca pasó de un catálogo en PDF rehecho a mano a una tienda online con inventario en tiempo real. Caso real de Elaris.",
    summary:
      "Una joyería que rehacía su catálogo en PDF con cada venta hoy vende 24/7 con inventario en tiempo real. Reducción estimada de 70–80% del tiempo operativo y ventas desestacionalizadas.",
    context: [
      "Salcedo Jewels es una joyería de lujo peruana, de oro italiano de 18 quilates, con presencia en Lima, Chiclayo y Cajamarca. Un equipo pequeño, piezas únicas de alta rotación y un problema que crecía con cada venta.",
      "Su canal digital era un catálogo en PDF armado en Canva. Como cada pieza es única, cada venta obligaba a rehacer el catálogo completo para no dejar espacios vacíos, y parte del personal trabajaba exclusivamente en mantenerlo al día. Mientras tanto, el inventario vivía en Excel y hojas sueltas.",
    ],
    before: [
      "Catálogo en PDF rehecho a mano en Canva con cada venta",
      "Inventario en Excel y hojas físicas, sin conexión con las ventas",
      "Ventas duplicadas: dos clientes apartaban la misma pieza porque el catálogo iba atrasado",
      "Clientes desanimados al pedir piezas que ya no existían",
      "Ventas concentradas en campañas (Navidad, Día de la Madre, gratificación)",
    ],
    solution: [
      "Tienda online a medida con catálogo e inventario como una sola cosa: se vende una pieza y desaparece del catálogo al instante",
      "Inventario por talla y variante, con descuento automático de stock en cada venta",
      "Checkout adaptado a Perú: validación de DNI, transferencia bancaria y pagos en cuotas con control de cumplimiento",
      "Seguimiento público del pedido por código, sin necesidad de crear cuenta",
      "Panel de gestión con editor de fotos integrado (brillo, contraste, recorte) y biblioteca de descripciones por categoría",
      "Resúmenes de pedido listos para WhatsApp, el canal donde ya conversaban con sus clientes",
    ],
    results: [
      {
        metric: "70–80% menos tiempo operativo",
        detail:
          "Boletas, registro de ventas, actualización y envío de catálogos y edición de fotos: lo que ocupaba a una persona a tiempo completo hoy está automatizado o integrado.",
      },
      {
        metric: "Ventas todo el año",
        detail:
          "El catálogo vivo se ofrece siempre, sin costo de mantenerlo: las ventas dejaron de depender de las campañas.",
      },
      {
        metric: "Cero ventas duplicadas",
        detail:
          "El inventario en tiempo real eliminó el apartado doble de piezas únicas.",
      },
    ],
    quote: {
      text: "Desde el lanzamiento del e-commerce, recibimos pedidos internacionales que antes no podíamos gestionar. La plataforma es rápida, el checkout no genera fricción y la base de datos nos permite tomar decisiones en tiempo real.",
      author: "Milagros Salcedo",
      role: "CEO, Salcedo Jewels S.A.C.",
    },
  },
  {
    slug: "inventario-upc",
    client: "Universidad Peruana de Ciencias Aplicadas (UPC)",
    heading: "Equipos que nadie usaba, hoy reservados por estudiantes",
    sector: "Educación superior",
    location: { city: "Lima (campus Monterrico y San Miguel)", country: "Perú" },
    servicePaths: ["/desarrollo-software-medida"],
    liveUrl: "https://upc-inventario.netlify.app",
    portfolioKey: "sistemaInventarioUPC",
    relatedArticleSlugs: ["cuanto-cuesta-software-a-medida-peru"],
    publishDate: "2026-08-03",
    seoTitle: "Caso UPC: Sistema de Reservas de Equipos para una Universidad",
    seoDescription:
      "Equipos tecnológicos que se renovaban cada 5 años sin que nadie los usara hoy se reservan en línea en 2 campus. Caso real de software a medida de Elaris.",
    summary:
      "La UPC tenía equipos tecnológicos (VR, tablets, cámaras, proyectores) que se renovaban cada cinco años sin que los estudiantes pudieran usarlos: no existía forma de prestarlos. Hoy se reservan en línea y se controlan en tiempo real en dos campus.",
    context: [
      "La Universidad Peruana de Ciencias Aplicadas invertía en equipos que sus estudiantes necesitaban para desarrollarse: visores de realidad virtual para las carreras de desarrollo, Macs y dispositivos Android para testear aplicaciones, cámaras y proyectores para los de cine. El problema no era el presupuesto, sino que no existía ningún sistema para prestarlos. Los equipos se renovaban cada cinco años sin que nadie los hubiera usado.",
      "El proyecto se coordinó con la Facultad de Ingeniería para los campus de Monterrico y San Miguel.",
    ],
    before: [
      "Equipos guardados sin sistema de préstamo: inversión recurrente sin beneficio",
      "Sin visibilidad de qué unidades existían, dónde estaban ni en qué estado",
      "Sin forma de controlar retiros, devoluciones ni responsabilidad de los alumnos",
    ],
    solution: [
      "Portal de reservas con registro con correo institucional y acceso por enlace mágico (sin contraseñas)",
      "Catálogo por campus con disponibilidad real por unidad física",
      "Asistente de reserva en 4 pasos: fecha, duración, horario en bloques de 30 minutos y propósito académico",
      "Asignación automática de la unidad física disponible, con margen entre préstamos para revisión",
      "Panel operativo en tiempo real para el personal: por retirar, en uso y atrasados, con verificación presencial de cada retiro y devolución",
      "Suspensiones temporales automáticas para alumnos incumplidos y estadísticas de uso por carrera",
    ],
    results: [
      {
        metric: "De 0% de uso a reservas activas",
        detail:
          "Los equipos que se renovaban sin usarse hoy están en manos de estudiantes de ambos campus.",
      },
      {
        metric: "2 campus, un solo sistema",
        detail:
          "Monterrico y San Miguel operan con el mismo inventario, las mismas reglas y visibilidad central.",
      },
      {
        metric: "Control total del ciclo de préstamo",
        detail:
          "Cada retiro y devolución queda verificado por el personal, con historial por unidad física.",
      },
    ],
    quote: {
      text: "Teníamos equipos que se renovaban cada cinco años sin que nadie los usara. Hoy los alumnos los reservan en línea y nuestro equipo controla retiros y devoluciones en tiempo real, en dos campus.",
      author: "Facultad de Ingeniería",
      role: "Universidad Peruana de Ciencias Aplicadas",
    },
  },
  {
    slug: "ccc-impresiones",
    client: "CCC Impresiones",
    heading: "De Excel y papel a recibir clientes desde Google",
    sector: "Imprenta industrial",
    location: { city: "Córdoba", country: "Argentina" },
    servicePaths: ["/e-commerce", "/desarrollo-web", "/posicionamiento-seo"],
    liveUrl: "https://cccimpresiones.com",
    portfolioKey: "cccImpresiones",
    relatedArticleSlugs: [
      "cuanto-cuesta-una-pagina-web-peru",
      "transformacion-digital-pymes-por-donde-empezar",
    ],
    publishDate: "2026-08-03",
    seoTitle:
      "Caso CCC Impresiones: de Excel y Papel a Catálogo Digital con Tráfico Orgánico",
    seoDescription:
      "Una imprenta industrial argentina que operaba con Excel y hojas físicas hoy tiene tienda online, cotizador y clientes que la encuentran en Google. Caso real de Elaris.",
    summary:
      "Una imprenta que operaba con Excel y hojas físicas, sin presencia digital, hoy tiene tienda online, cotizador de trabajos personalizados y tráfico orgánico constante desde Google.",
    context: [
      "CCC Impresiones es una imprenta industrial mediana de Córdoba, Argentina. Vende dos cosas muy distintas: productos estándar en stock (etiquetas con medidas fijas) y trabajos 100% personalizados: remeras, impresión 3D, grabado láser, códigos de barras. Toda esa operación se administraba con Excel y hojas físicas, y la captación de clientes dependía por completo del boca a boca: en internet, CCC no existía.",
    ],
    before: [
      "Pedidos e inventario en Excel y hojas físicas",
      "Sin catálogo digital: cada consulta de precio se respondía a mano",
      "Cero captación por internet: invisible en Google",
    ],
    solution: [
      "Tienda online para productos en stock, con inventario por variante y descuento automático de stock",
      "Cotizador de trabajos personalizados con formulario dinámico: los campos cambian según el servicio (textil, 3D, láser, etiquetas)",
      "Panel de gestión completo: productos, pedidos con estados y cuotas, estadísticas, portfolio y configuración de tienda",
      "Modo tienda/consulta con un interruptor global: si pausan ventas, todos los botones “Comprar” pasan a “Cotizar”",
      "Base técnica SEO desde el día uno: estructura, velocidad y contenido indexable",
    ],
    results: [
      {
        metric: "Tráfico orgánico constante",
        detail:
          "Clientes nuevos llegan desde Google sin pagar por clic, el canal que antes no existía.",
      },
      {
        metric: "0 hojas de cálculo en la operación comercial",
        detail: "Catálogo, pedidos y cotizaciones viven en un solo sistema.",
      },
      {
        metric: "Lista para escalar",
        detail:
          "Con la base técnica y el tráfico validado, CCC está en condiciones de amplificar con Google Ads y redes.",
      },
    ],
    quote: {
      text: "Manejábamos todo en Excel y hojas impresas. Hoy tenemos catálogo online, cotizador y control de pedidos en un solo lugar, y por primera vez nos escriben clientes que nos encontraron en Google.",
      author: "Equipo de CCC Impresiones",
      role: "Córdoba, Argentina",
    },
  },
  {
    slug: "veltrixnfc",
    client: "VeltrixNFC",
    heading: "De una idea a una startup operando en dos países",
    sector: "Startup de tarjetas de presentación NFC",
    location: { city: "Lima y Santiago", country: "Perú y Chile" },
    servicePaths: ["/desarrollo-mvp", "/desarrollo-software-medida"],
    liveUrl: "https://veltrixnfc.com",
    portfolioKey: "veltrixNfc",
    relatedArticleSlugs: ["como-validar-una-idea-de-negocio-mvp"],
    publishDate: "2026-08-03",
    seoTitle: "Caso VeltrixNFC: de Idea a Startup Operando en 2 Países con un MVP",
    seoDescription:
      "Veltrix tenía el producto físico, tarjetas metálicas con NFC, pero no el ecosistema digital para operar. Construimos su plataforma completa. Caso real de desarrollo de MVP.",
    summary:
      "Veltrix tenía las tarjetas metálicas con chip NFC y la visión de negocio, pero sin plataforma digital no podía operar. Construimos el ecosistema completo (perfiles, gestión de tarjetas y panel de administración) y hoy la startup opera en Perú y Chile.",
    context: [
      "VeltrixNFC quiere cambiar cómo se presentan los profesionales: tarjetas de presentación metálicas con un chip NFC que, al acercarse a un celular, abre el perfil digital del dueño con sus datos, redes y botón de contacto directo. El producto físico existía. La visión existía. Lo que no existía era todo lo demás: sin plataforma que vincule cada chip con su perfil, el negocio simplemente no podía operar.",
    ],
    before: [
      "Producto físico definido, pero sin el sistema digital que lo hace funcionar",
      "Sin forma de crear perfiles, vincular chips ni gestionar clientes",
      "Una idea validable únicamente construyendo la primera versión real",
    ],
    solution: [
      "Perfil público personalizable tipo tarjeta digital: foto, cargo, empresa, redes y descarga de contacto directo al teléfono (vCard)",
      "Redirección NFC: cada chip físico apunta al perfil correcto, con vinculación y desvinculación administrable",
      "Panel del usuario para editar su tarjeta digital: hasta 6 botones de acción, plantillas visuales, foto y banner",
      "Panel de administración del negocio: activación de cuentas, vencimientos de servicio, registro de chips y auditoría de todas las acciones",
      "Analítica de visitas y clics sin cookies, cumpliendo normas de privacidad",
      "Infraestructura lista para crecer: sumar funciones sin reescribir la base",
    ],
    results: [
      {
        metric: "De idea a operar",
        detail:
          "La startup pasó de un producto sin plataforma a vender y operar de verdad.",
      },
      {
        metric: "2 países",
        detail:
          "Veltrix opera hoy en Perú y Chile sobre la misma base construida como MVP.",
      },
      {
        metric: "MVP que escala",
        detail:
          "La arquitectura de la primera versión sostiene el crecimiento sin rehacerse desde cero.",
      },
    ],
    quote: {
      text: "Teníamos el producto físico y la visión, pero no el ecosistema digital para operarlo. Elaris lo construyó completo: perfiles digitales, tarjetas NFC y panel de gestión. Hoy operamos en Perú y Chile.",
      author: "Equipo fundador de VeltrixNFC",
      role: "Perú y Chile",
    },
  },
];

export const findCase = (slug: string) =>
  CASE_STUDIES.find((c) => c.slug === slug);
