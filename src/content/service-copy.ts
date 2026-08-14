import type { ServicePageCopy } from "@/components/ServicePageTemplate";

/**
 * Copy largo de las páginas de servicio.
 *
 * Vive aquí y no en `es.json` porque ese archivo lo importa `I18nProvider`,
 * que envuelve toda la aplicación: cualquier cosa dentro de él se empaqueta en
 * el bundle de JavaScript de TODAS las páginas. Estos cinco bloques suman ~19 KB
 * y solo los leen los `page.tsx` de servidor, que los pasan como prop — así
 * que viajan una vez, ya renderizados, en vez de en el bundle de cada visita.
 *
 * `servicePages.common` sí se queda en `es.json`: lo lee ServicePageTemplate,
 * que es un componente de cliente, y son cuatro cadenas.
 *
 * Los enlaces internos de este archivo los verifica `link-integrity.ts` en cada
 * build, igual que los de `es.json`.
 */
export const SERVICE_COPY: Record<string, ServicePageCopy & { seo: { title: string; description: string } }> = {
  "web": {
    "seo": {
      "title": "Desarrollo Web Profesional en Perú | Elaris Digital Solutions",
      "description": "Páginas web rápidas, optimizadas para Google y diseñadas para convertir visitas en clientes. Tu web como canal de ventas, no como folleto digital."
    },
    "hero": {
      "badge": "Desarrollo web",
      "title": "Una página web que vende, no un folleto digital.",
      "subtitle": "Diseñamos y construimos sitios rápidos, que aparecen en Google y convierten visitas en consultas. Con tu marca, editables por ti, y medibles desde el primer día."
    },
    "pains": [
      "Tu web actual no genera ninguna consulta",
      "No apareces en Google ni buscándote por nombre",
      "En celular carga lenta o se ve rota",
      "Cada cambio pequeño depende de llamar a alguien"
    ],
    "includes": [
      {
        "title": "Diseño a medida",
        "text": "Alineado a tu marca, no una plantilla reciclada con tu logo encima.",
        "icon": "Palette"
      },
      {
        "title": "Optimización para Google incluida",
        "text": "Estructura, etiquetado y velocidad que los buscadores exigen, resueltos desde el primer día. Competir por búsquedas concretas ya es otra cosa: eso es [posicionamiento SEO continuo](/posicionamiento-seo).",
        "icon": "Search"
      },
      {
        "title": "Velocidad y experiencia móvil primero",
        "text": "La mayoría de tus visitantes llega desde el celular: ahí es donde el sitio tiene que brillar.",
        "icon": "Gauge"
      },
      {
        "title": "Formularios y WhatsApp integrados",
        "text": "Para que cada visita interesada tenga una forma inmediata de contactarte.",
        "icon": "MessageSquare"
      },
      {
        "title": "Gestor de contenido",
        "text": "Actualiza textos, fotos, precios y novedades sin escribir una línea de código.",
        "icon": "FileEdit"
      },
      {
        "title": "Medición de visitas y conversiones",
        "text": "Sabes cuánta gente llega, de dónde viene y cuántos terminan escribiéndote.",
        "icon": "BarChart3"
      }
    ],
    "caseStudy": {
      "name": "CCC Impresiones",
      "text": "CCC Impresiones operaba con Excel y hojas físicas, sin presencia digital. Hoy tiene catálogo online, cotizador y una base técnica que ya le trae consultas desde Google.",
      "metric": "Tráfico orgánico constante desde el lanzamiento",
      "url": "https://cccimpresiones.com",
      "casePath": "/casos/ccc-impresiones"
    },
    "faq": [
      {
        "q": "¿Cuánto tarda una página web?",
        "a": "Un sitio institucional o de captación está listo en 3 a 5 semanas, incluyendo diseño, contenido y optimización para Google. Plataformas más complejas (catálogos grandes, sistemas integrados) toman más — lo definimos en el diagnóstico."
      },
      {
        "q": "¿Cuánto cuesta?",
        "a": "Depende del alcance: no cuesta lo mismo un sitio de captación que una plataforma con catálogo e integraciones. Siempre recibes una propuesta cerrada con alcance, plazos y costo antes de comprometerte, sin adicionales a mitad de camino."
      },
      {
        "q": "¿Podré actualizarla yo mismo?",
        "a": "Sí. Entregamos el sitio con un gestor de contenido y una capacitación para tu equipo: textos, fotos, precios y novedades sin depender de nadie. Y si prefieres que lo hagamos nosotros, hay planes de mantenimiento."
      },
      {
        "q": "¿Incluye posicionamiento en Google?",
        "a": "Incluye la base técnica: estructura, velocidad y etiquetado que Google exige. El posicionamiento sostenido (contenido, autoridad, búsquedas locales) es un trabajo continuo — para eso está nuestro servicio de Posicionamiento SEO, que se integra directo sobre esta base."
      },
      {
        "q": "¿Qué pasa con mi web actual y mi dominio?",
        "a": "Tu dominio sigue siendo tuyo y no se pierde nada: migramos el contenido que valga la pena, configuramos las redirecciones para no perder el posicionamiento existente y lanzamos sin interrumpir tu presencia online."
      }
    ],
    "related": [
      {
        "label": "¿Cuánto cuesta una página web en Perú?",
        "href": "/recursos/cuanto-cuesta-una-pagina-web-peru"
      }
    ]
  },
  "ecommerce": {
    "seo": {
      "title": "Desarrollo de E-commerce y Tiendas Online en Perú | Elaris Digital Solutions",
      "description": "Tiendas online a medida en Perú con inventario, pagos y pedidos integrados. Hasta 80% menos tiempo operativo y ventas todo el año, como Salcedo Jewels."
    },
    "hero": {
      "badge": "E-commerce",
      "title": "Tu tienda vendiendo 24/7, sin depender de tu horario.",
      "subtitle": "Construimos tiendas online a medida donde catálogo, inventario, pagos y pedidos viven en un solo lugar. Se acabó el catálogo en PDF y los pedidos anotados a mano."
    },
    "pains": [
      "Los pedidos llegan por WhatsApp y se anotan a mano",
      "El catálogo es un PDF que hay que rehacer con cada venta",
      "Has vendido dos veces la misma pieza por stock desactualizado",
      "Solo vendes fuerte en campañas (Navidad, Día de la Madre…)"
    ],
    "includes": [
      {
        "title": "Tienda a medida con tu marca",
        "text": "Diseñada alrededor de cómo compran tus clientes, no de una plantilla genérica. Con la base técnica para Google incluida, y [posicionamiento SEO continuo](/posicionamiento-seo) si quieres competir por búsquedas de producto.",
        "icon": "Store"
      },
      {
        "title": "Inventario en tiempo real",
        "text": "Con variantes por talla o modelo, y descuento automático de stock en cada venta.",
        "icon": "Package"
      },
      {
        "title": "Checkout adaptado a tu país",
        "text": "Transferencia, pasarelas locales, pagos en cuotas y validación de datos como el DNI.",
        "icon": "CreditCard"
      },
      {
        "title": "Gestión de pedidos con estados",
        "text": "Sabes en qué punto está cada pedido y tu cliente puede seguirlo sin escribirte.",
        "icon": "ClipboardList"
      },
      {
        "title": "Panel autogestionable",
        "text": "Subes productos, fotos y precios tú mismo, con editor de imágenes integrado.",
        "icon": "LayoutDashboard"
      },
      {
        "title": "Integración con pagos y couriers",
        "text": "Para que cobrar y despachar dejen de ser dos procesos manuales separados.",
        "icon": "Truck"
      }
    ],
    "caseStudy": {
      "name": "Salcedo Jewels",
      "text": "Salcedo Jewels vendía con un catálogo en PDF rehecho a mano en Canva con cada venta: ventas duplicadas, clientes desanimados y una persona dedicada solo a mantenerlo al día. Hoy su tienda y su inventario son la misma cosa.",
      "metric": "Hasta 80% menos tiempo operativo y ventas todo el año",
      "url": "https://salcedojewels.com",
      "casePath": "/casos/salcedo-jewels"
    },
    "faq": [
      {
        "q": "¿Por qué una tienda a medida y no Shopify o WooCommerce?",
        "a": "Si vendes productos estándar con procesos estándar, esas plataformas funcionan bien. La tienda a medida gana cuando tu operación tiene reglas propias: inventario por variantes, cuotas, validaciones locales, integración con tu sistema de gestión. Pagas una vez por algo tuyo, en vez de rentar para siempre algo genérico."
      },
      {
        "q": "¿Cuánto tarda estar vendiendo online?",
        "a": "Una tienda funcional está lista en 6 a 10 semanas según el tamaño del catálogo y las integraciones. Trabajamos por etapas: puedes empezar a vender con lo esencial mientras completamos el resto."
      },
      {
        "q": "¿Puedo gestionar el catálogo yo mismo?",
        "a": "Sí — ese es el punto. Subes productos, fotos, precios y stock desde un panel simple. En Salcedo Jewels, lo que antes era rehacer un catálogo entero hoy es subir un producto: el resto se actualiza solo."
      },
      {
        "q": "¿Qué formas de pago puedo ofrecer?",
        "a": "Las que tu negocio necesite: transferencia bancaria con confirmación, pasarelas locales (tarjetas, Yape/Plin), pagos en cuotas con seguimiento. Lo definimos según cómo compran tus clientes reales."
      },
      {
        "q": "¿Qué pasa con mis ventas por WhatsApp?",
        "a": "No se pierden — se ordenan. La tienda genera resúmenes de pedido listos para WhatsApp y tu inventario queda centralizado, vendas por el canal que vendas. WhatsApp deja de ser tu sistema de registro y vuelve a ser un canal de atención."
      }
    ],
    "related": [
      {
        "label": "Shopify, WooCommerce o tienda a medida",
        "href": "/recursos/shopify-woocommerce-o-tienda-a-medida"
      }
    ]
  },
  "seo": {
    "seo": {
      "title": "Posicionamiento SEO para Empresas en Perú | Elaris Digital Solutions",
      "description": "Posicionamiento SEO para empresas en Perú: que te encuentren en Google cuando buscan lo que vendes. Técnica y contenido con resultados medibles — sin promesas mágicas."
    },
    "hero": {
      "badge": "SEO",
      "title": "Que te encuentren en Google cuando buscan lo que vendes.",
      "subtitle": "SEO es el trabajo de aparecer en los resultados de Google sin pagar por cada clic. Lo hacemos con técnica y contenido — y te mostramos el avance con datos, no con promesas."
    },
    "pains": [
      "Tus clientes te buscan en Google y encuentran a tu competencia",
      "Dependes 100% de pauta: si apagas los anuncios, se apagan las ventas",
      "Tu web es nueva o vieja, pero igual: invisible",
      "Te prometieron «primer lugar en Google» y no pasó nada"
    ],
    "includes": [
      {
        "title": "Auditoría técnica de tu sitio",
        "text": "Velocidad, estructura y errores que hoy impiden que Google entienda y muestre tus páginas.",
        "icon": "Stethoscope"
      },
      {
        "title": "Investigación de búsquedas reales",
        "text": "Qué escriben tus clientes en Google cuando buscan lo que vendes — con volumen y competencia.",
        "icon": "Search"
      },
      {
        "title": "Optimización de páginas y contenido",
        "text": "Tus páginas reescritas y estructuradas para responder esas búsquedas mejor que la competencia.",
        "icon": "FileText"
      },
      {
        "title": "SEO local",
        "text": "Google Maps y búsquedas por zona, clave si vendes en una ciudad o región concreta.",
        "icon": "MapPin"
      },
      {
        "title": "Medición con Search Console y Analytics",
        "text": "Ambas cuentas son tuyas y tienes acceso directo: los datos no pasan por nuestro filtro.",
        "icon": "LineChart"
      },
      {
        "title": "Reporte mensual en lenguaje de negocio",
        "text": "Qué subió, cuánto tráfico llegó, qué consultas generó y qué se hará el mes siguiente.",
        "icon": "FileBarChart"
      }
    ],
    "caseStudy": {
      "name": "CCC Impresiones",
      "text": "CCC no captaba ningún cliente por internet. Construimos su plataforma con base técnica SEO desde el día uno: hoy recibe tráfico orgánico constante y está lista para amplificar con Google Ads.",
      "metric": "Tráfico orgánico recurrente, sin pagar por clic",
      "url": "https://cccimpresiones.com",
      "casePath": "/casos/ccc-impresiones"
    },
    "faq": [
      {
        "q": "¿Cuánto tarda en verse resultados?",
        "a": "El SEO es acumulativo: los primeros movimientos se ven en 2 a 3 meses y los resultados sólidos entre 4 y 6, según tu competencia y el estado de tu web. Quien te prometa resultados en semanas te está vendiendo otra cosa."
      },
      {
        "q": "¿Garantizan el primer lugar en Google?",
        "a": "No — y desconfía de quien lo garantice: el resultado depende de Google, tu competencia y tu historial. Lo que sí garantizamos es el trabajo correcto (técnica, contenido y medición) y reportes transparentes de cómo avanza cada búsqueda que te interesa."
      },
      {
        "q": "¿SEO o publicidad pagada?",
        "a": "Cumplen roles distintos. La pauta trae resultados inmediatos pero se detiene cuando dejas de pagar; el SEO tarda más pero se acumula y no cobra por clic. La estrategia sana usa pauta para el corto plazo mientras el SEO construye el flujo permanente."
      },
      {
        "q": "¿Necesito una web nueva para hacer SEO?",
        "a": "No siempre. La auditoría inicial lo determina: a veces basta optimizar lo que tienes; si la base técnica no da (velocidad, estructura), te lo decimos con claridad y puedes resolverlo con nuestro servicio de desarrollo web."
      },
      {
        "q": "¿Qué recibo cada mes?",
        "a": "Un reporte en lenguaje de negocio: qué búsquedas subieron, cuánto tráfico llegó, qué consultas generó y qué se hará el mes siguiente. Sin humo: los datos salen de Google Search Console y Analytics, y tienes acceso directo a ambos."
      }
    ],
    "related": [
      {
        "label": "¿Cuánto cuesta una página web en Perú?",
        "href": "/recursos/cuanto-cuesta-una-pagina-web-peru"
      }
    ]
  },
  "mvp": {
    "seo": {
      "title": "Desarrollo de MVP: lanza tu producto digital | Elaris Digital Solutions",
      "description": "Convertimos tu idea en un MVP: la primera versión funcional de tu producto, lista para conseguir usuarios y validar tu negocio sin quemar el presupuesto."
    },
    "hero": {
      "badge": "MVP",
      "title": "De la idea a un producto funcionando.",
      "subtitle": "Un MVP (producto mínimo viable) es la primera versión real de tu producto: lo suficiente para salir al mercado, conseguir usuarios y validar el negocio — sin gastar como si ya fueras una empresa grande."
    },
    "pains": [
      "Tienes la idea clara, pero no un equipo técnico que la construya",
      "Las agencias te cotizan como si fueras una corporación",
      "Te da miedo invertir 6 meses en algo que nadie ha probado",
      "Necesitas algo funcionando para mostrar a clientes o inversionistas"
    ],
    "includes": [
      {
        "title": "Alcance mínimo que valida el negocio",
        "text": "Definimos juntos qué entra en la primera versión y qué puede esperar, priorizando lo que realmente prueba tu hipótesis.",
        "icon": "Target"
      },
      {
        "title": "Diseño y desarrollo del producto",
        "text": "Interfaz y funcionalidad completas, en web o móvil, listas para usuarios reales.",
        "icon": "Smartphone"
      },
      {
        "title": "Panel de administración",
        "text": "Para que puedas operar el producto desde el día uno sin depender de nadie.",
        "icon": "LayoutDashboard"
      },
      {
        "title": "Infraestructura lista para crecer",
        "text": "Si el producto despega, la base soporta más usuarios y funciones sin reescribir desde cero.",
        "icon": "Server"
      },
      {
        "title": "Analítica desde el lanzamiento",
        "text": "Medición de uso real para decidir qué construir después con datos, no con intuición.",
        "icon": "BarChart3"
      },
      {
        "title": "Hoja de ruta post-lanzamiento",
        "text": "Qué sigue, en qué orden y con qué prioridad, según lo que aprendas de tus primeros usuarios.",
        "icon": "Map"
      }
    ],
    "caseStudy": {
      "name": "VeltrixNFC",
      "text": "Veltrix tenía el producto físico —tarjetas de presentación metálicas con chip NFC— y la visión, pero no el ecosistema digital para operarlo. Construimos la plataforma completa: perfiles digitales, gestión de tarjetas y panel de administración.",
      "metric": "De una idea a una startup operando en Perú y Chile",
      "url": "https://veltrixnfc.com",
      "casePath": "/casos/veltrixnfc"
    },
    "faq": [
      {
        "q": "¿Qué es exactamente un MVP y por qué no construir el producto completo?",
        "a": "Un MVP es la versión más pequeña de tu producto que ya genera valor real a usuarios reales. Construirlo primero te permite validar que el negocio funciona antes de invertir en funcionalidades que quizá nadie use. Lo que aprendes con usuarios reales vale más que meses de planificación."
      },
      {
        "q": "¿Cuánto tarda desarrollar un MVP?",
        "a": "Entre 4 y 10 semanas según la complejidad. Definimos juntos el alcance mínimo en el diagnóstico y trabajamos en sprints para que veas avances cada dos semanas."
      },
      {
        "q": "¿Cuánto cuesta?",
        "a": "Depende del alcance que definamos juntos: un MVP acotado cuesta bastante menos que una plataforma completa, y por eso el primer paso es delimitarlo bien. Tras el diagnóstico recibes una propuesta con alcance, plazos y costo cerrados antes de comprometerte."
      },
      {
        "q": "¿Qué pasa si el MVP funciona y necesito crecer?",
        "a": "Esa es la idea. Construimos sobre arquitectura que soporta crecimiento: puedes sumar funcionalidades, usuarios e integraciones sin reescribir desde cero. Veltrix, por ejemplo, arrancó como MVP y hoy opera en dos países sobre la misma base."
      },
      {
        "q": "¿De quién es la idea y el código?",
        "a": "Tuyos, al 100%. Firmamos confidencialidad desde la primera conversación y al cerrar el proyecto recibes el repositorio completo con documentación. Nunca quedas atado a nosotros para operar o seguir creciendo."
      }
    ],
    "related": [
      {
        "label": "Cómo validar tu idea de negocio con un MVP",
        "href": "/recursos/como-validar-una-idea-de-negocio-mvp"
      }
    ]
  },
  "transformacion": {
    "seo": {
      "title": "Transformación Digital para PYMES | Elaris Digital Solutions",
      "description": "Del papel y el Excel a una operación digital ordenada. Diagnóstico inicial sin compromiso, hoja de ruta clara e implementación por fases según impacto."
    },
    "hero": {
      "badge": "Transformación digital",
      "title": "Del papel y el Excel a una operación digital.",
      "subtitle": "«Transformación digital» suena grande, pero significa algo simple: ordenar y digitalizar cómo opera tu empresa, empezando por lo que más te cuesta. Es el nombre que le damos a todo lo que hacemos para que operes mejor — y se recorre por fases, según impacto, no de golpe."
    },
    "pains": [
      "La información vive regada entre Excel, WhatsApp y papel",
      "Tu equipo copia datos de un lado a otro, a mano, todos los días",
      "No sabes tus números reales hasta fin de mes (si los sabes)",
      "Crecer significa contratar más gente para hacer más trabajo manual"
    ],
    "includes": [
      {
        "title": "Diagnóstico gratuito de tus procesos",
        "text": "Dos semanas mapeando cómo trabaja hoy tu empresa, área por área.",
        "icon": "ClipboardCheck"
      },
      {
        "title": "Hoja de ruta priorizada",
        "text": "Qué digitalizar primero y por qué, ordenado por impacto y esfuerzo real. El camino suele pasar por [software a medida](/desarrollo-software-medida), [automatización con IA](/inteligencia-artificial) o [software de mantenimiento](/implementacion-cmms).",
        "icon": "Map"
      },
      {
        "title": "Implementación por fases",
        "text": "Cada fase entrega valor por sí sola: no esperas un año para ver resultados.",
        "icon": "Layers"
      },
      {
        "title": "Integración con lo que ya usas",
        "text": "Aprovechamos tus herramientas actuales en vez de obligarte a tirarlo todo.",
        "icon": "Plug"
      },
      {
        "title": "Capacitación de tu equipo",
        "text": "En cada entrega, porque un sistema que nadie usa es un proyecto fallido.",
        "icon": "GraduationCap"
      },
      {
        "title": "Acompañamiento continuo",
        "text": "Con tiempos de respuesta definidos y transferencia de conocimiento a tu gente.",
        "icon": "LifeBuoy"
      }
    ],
    "caseStudy": {
      "name": "Salcedo Jewels",
      "text": "Salcedo Jewels y CCC Impresiones partieron del mismo punto: Excel, papel y horas de trabajo manual. Hoy ambas operan sobre plataformas digitales propias — catálogo, inventario, pedidos y números en un solo lugar.",
      "metric": "Hasta 80% menos tiempo operativo tras digitalizar",
      "url": "https://salcedojewels.com",
      "casePath": "/casos/salcedo-jewels"
    },
    "faq": [
      {
        "q": "¿Por dónde se empieza una transformación digital?",
        "a": "Por el diagnóstico: dos semanas mirando cómo opera hoy tu empresa, sin costo ni compromiso. De ahí sale una hoja de ruta priorizada — casi siempre se empieza por el proceso que más tiempo consume o más errores genera, porque es donde el retorno se siente antes."
      },
      {
        "q": "¿Cuánto dura y cuánto cuesta?",
        "a": "Se avanza por fases de 4 a 10 semanas, cada una con valor propio: no esperas un año para ver resultados. Cada fase se cotiza cerrada por separado y tú decides el ritmo entre una y otra, así que la inversión se reparte en el tiempo en vez de concentrarse al inicio."
      },
      {
        "q": "¿Mi equipo no es técnico — va a poder usarlo?",
        "a": "Ese es el criterio de diseño número uno: si tu equipo no lo adopta, el proyecto falló. Construimos pensando en quien lo usará cada día, capacitamos en cada entrega y medimos la adopción real, no solo la entrega técnica."
      },
      {
        "q": "¿Qué pasa con las herramientas que ya uso?",
        "a": "Se aprovechan. No te hacemos tirar lo que funciona: integramos lo existente (contabilidad, facturación, hasta tus Excel críticos) y reemplazamos solo lo que te está frenando."
      },
      {
        "q": "¿En qué se diferencia esto de contratar un software genérico?",
        "a": "Un software genérico digitaliza un proceso estándar; la transformación digital ordena TU operación completa — y a veces la respuesta correcta es un software genérico para una parte y desarrollo a medida para otra. Nuestro diagnóstico te dice cuál conviene dónde, sin sesgo: el código que construimos es tuyo y no cobramos licencias."
      }
    ],
    "related": [
      {
        "label": "Transformación digital para pymes: por dónde empezar",
        "href": "/recursos/transformacion-digital-pymes-por-donde-empezar"
      }
    ]
  }
};
