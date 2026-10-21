import type { Article } from "../types";

export const article: Article = {
  slug: "como-aparecer-en-chatgpt-y-buscadores-con-ia",
  title: "Cómo aparecer en ChatGPT y otros buscadores con IA (y qué pasó cuando lo hicimos en nuestro sitio)",
  seoTitle: "Cómo Aparecer en ChatGPT y Buscadores con IA: Guía GEO 2026",
  seoDescription:
    "Qué es el posicionamiento en motores de IA (GEO), qué se hace técnicamente para que ChatGPT cite tu sitio y los números reales que obtuvimos aplicándolo en el nuestro.",
  publishDate: "2026-10-20",
  modifiedDate: "2026-10-20",
  authorSlug: "fabrizio-bussalleu",
  servicePath: "/posicionamiento-seo",
  caseSlug: null,
  tags: ["GEO", "SEO", "inteligencia artificial"],
  readMinutes: 9,
  intro: [
    "Cada vez más gente deja de buscar y empieza a preguntar. En vez de escribir “software a medida Lima” y revisar diez enlaces, escriben “¿cuánto me costaría un sistema de inventario para mi empresa en Perú?” y leen una respuesta. En esa respuesta aparecen algunas marcas y no aparecen otras, y ahí se juega algo nuevo.",
    "Eso tiene nombres: GEO, AEO, LLMO. Ya hay agencias vendiéndolo en Lima y en toda España. Lo que casi ninguna muestra es qué hizo exactamente y qué obtuvo, porque los números todavía son pequeños y los números pequeños venden mal.",
    "Nosotros lo implementamos en este mismo sitio en agosto de 2026. Esta guía cuenta qué hicimos, qué tiene fundamento técnico y qué todavía es apuesta, y abre los números que llevamos. Son chicos. Esa es parte de la honestidad.",
  ],
  sections: [
    {
      h2: "Qué cambia cuando la respuesta reemplaza a la lista",
      paragraphs: [
        "El buscador clásico te daba una lista y tú elegías. Un asistente te da una respuesta ya cocinada, con dos o tres fuentes citadas. La diferencia operativa es brutal: donde antes había diez posiciones por las que competir, ahora hay una respuesta en la que estás o no estás.",
        "Hay dos formas de terminar dentro de esa respuesta, y conviene no confundirlas. Una es que el modelo busque en vivo mientras responde: ahí lee páginas en ese momento, y si la tuya está accesible y responde bien a la pregunta, puede citarte. La otra es que el modelo ya sepa de ti porque tu información estaba en los datos con los que se entrenó, y eso no se cambia esta semana ni la próxima.",
        "Casi todo lo que se puede trabajar hoy apunta al primer caso. Es la parte accionable, y es donde el trabajo técnico sí mueve algo.",
      ],
    },
    {
      h2: "GEO, AEO y LLMO: los nombres y qué significan",
      paragraphs: [
        "Son tres siglas para territorios que se solapan, y sirve tenerlas claras porque las vas a escuchar en cualquier propuesta.",
        "GEO viene de generative engine optimization, optimización para motores generativos: el trabajo de aparecer en las respuestas que arman ChatGPT, Perplexity, Gemini o Copilot. AEO es answer engine optimization, optimización para motores de respuesta, y pone el acento en estructurar el contenido como respuestas directas a preguntas concretas. LLMO es lo mismo nombrado desde el otro lado, por los modelos de lenguaje grandes que generan esas respuestas.",
        "En la práctica, quien te venda cualquiera de las tres debería estar haciendo más o menos el mismo trabajo. Si te cobran tres servicios distintos por las tres siglas, eso ya te dice algo.",
        "Y conviene aclarar una cosa: esto no reemplaza al [posicionamiento en buscadores](/posicionamiento-seo). Lo que hace que un modelo pueda leerte es casi lo mismo que hace que Google te entienda bien. Quien te plantee GEO como un reemplazo del SEO, y no como una extensión, te está vendiendo humo caro.",
      ],
    },
    {
      h2: "Lo que hicimos en este sitio, punto por punto",
      paragraphs: [
        "Esto es lo que está implementado acá, y lo puedes verificar tú mismo mirando el código fuente de cualquier página.",
      ],
      list: [
        "Todo el texto viaja en el HTML, sin depender de JavaScript. Es lo más importante de la lista y lo que más sitios incumplen: varios rastreadores de IA no ejecutan JavaScript, así que si tu contenido aparece recién después de que corra el navegador, para ellos tu página está vacía.",
        "Nada se sirve invisible. Teníamos animaciones que empezaban en opacidad cero, y un procesador que respeta estilos computados lee eso como texto oculto. Las cambiamos para que animen solo el desplazamiento: el efecto visual es casi igual y el contenido queda legible siempre.",
        "Las respuestas de las preguntas frecuentes están en el HTML aunque el acordeón esté cerrado. Se ocultan con visibility, no desmontando el elemento.",
        "Datos estructurados en JSON-LD, que es la forma estándar de decirle a una máquina qué es cada cosa: qué somos, qué servicios hay, quién firma cada artículo, qué preguntas responde cada página. Todo enlazado entre sí por identificadores, de modo que no son fichas sueltas sino un grafo.",
        "Desambiguación de la entidad: razón social y RUC publicados, para que no haya duda de qué empresa es esta cuando existen otras con nombres parecidos.",
        "Un archivo llms.txt generado en cada compilación a partir del contenido real, no escrito a mano, para que no se desactualice.",
        "Señales en robots.txt declarando que aceptamos ser leídos por sistemas de IA.",
      ],
    },
    {
      h2: "Qué de todo eso tiene fundamento y qué es apuesta",
      paragraphs: [
        "Acá es donde conviene separar, porque no todo pesa igual y nadie te lo va a decir si te está vendiendo el paquete.",
        "Lo que tiene fundamento sólido: que el contenido esté en el HTML sin depender de JavaScript, que no esté oculto, y que la página responda de forma directa a una pregunta concreta. Eso no es una teoría sobre modelos de lenguaje, es la condición básica para que cualquier máquina lea tu página, y vale igual para Google.",
        "Lo que tiene fundamento razonable: los datos estructurados. Ayudan a que una máquina entienda qué es cada cosa, y aunque no hay confirmación pública de cuánto pesan en la elección de fuentes de un modelo, el costo de ponerlos es bajo y el beneficio para el buscador tradicional ya está demostrado.",
        "Lo que todavía es apuesta: llms.txt. Es una convención propuesta, no un estándar adoptado, y ningún motor grande ha confirmado públicamente que la use. Lo generamos porque cuesta casi nada y porque si algún día se adopta ya está puesto, pero sería deshonesto venderlo como la pieza que te hace aparecer en ChatGPT. Lo mismo vale para las señales de contenido en robots.txt, que son recientes y de adopción desigual.",
        "Si alguien te presenta llms.txt como el centro de su servicio, acabas de aprender algo útil sobre esa propuesta.",
      ],
    },
    {
      h2: "Los números que llevamos, que son pequeños",
      paragraphs: [
        "Entre el 8 de agosto y el 20 de octubre de 2026, 74 días, ChatGPT nos envió cinco sesiones. Cinco. No es una cifra impresionante y no vamos a maquillarla.",
        "Lo interesante no es el tamaño sino la forma. Tres de esas cinco no entraron por la portada: entraron directamente a nuestra guía sobre cuánto cuesta un software a medida en Perú. Eso es exactamente lo que uno espera ver cuando el contenido es citado por responder una pregunta, y no cuando alguien ya conocía la marca y preguntó por ella. Las otras dos entraron por la portada, y una de ellas se quedó ocho minutos leyendo.",
        "Una de las cinco terminó abriendo WhatsApp para escribirnos. Con números tan chicos eso no prueba una tasa de conversión ni nada parecido, pero sí prueba que el canal puede terminar en una conversación, que es lo único que nos interesaba verificar.",
        "La lectura honesta: en 74 días esto no cambió nuestro negocio. Lo que hizo fue confirmar que el canal existe, que se puede medir y que el contenido que responde preguntas concretas es el que se cita. Si alguien te ofrece cifras mucho mejores que estas, pídele que te muestre de dónde salen.",
      ],
    },
    {
      h2: "Qué puedes hacer esta semana sin contratar a nadie",
      paragraphs: [
        "Hay tres cosas que puedes revisar hoy mismo y que separan a la mayoría de sitios de los que pueden ser citados.",
        "Primero, mira tu sitio sin JavaScript. En tu navegador, abre el código fuente de la página con Ctrl+U: eso es lo que ve un rastreador que no ejecuta nada. Si tu texto no está ahí, ese es tu problema entero y lo demás no importa todavía.",
        "Segundo, pregúntale a un asistente por tu categoría y tu ciudad, como lo haría un cliente. No preguntes por tu marca, porque eso solo prueba que sabe leer tu nombre. Pregunta lo que preguntaría alguien que todavía no te conoce, y mira quién aparece.",
        "Tercero, revisa si tu contenido responde preguntas o solo se describe. Una página que dice “somos líderes en soluciones integrales” no es citable, porque no responde nada. Una que dice cuánto cuesta algo, en qué rango y por qué, sí lo es. Nuestras [guías](/recursos) están escritas con ese criterio, y es también el motivo por el que publicamos rangos de precio del mercado.",
      ],
    },
    {
      h2: "Lo que no se puede prometer",
      paragraphs: [
        "No existe forma de garantizar que un modelo te cite, igual que no existe forma seria de garantizar el primer lugar en Google. Quien lo garantice está vendiendo algo que no controla.",
        "Tampoco hay un panel oficial que te diga cuántas veces te mencionó un asistente. Lo único medible hoy es el tráfico que llega desde ellos, que es lo que abrimos arriba, y hacer pruebas periódicas con las preguntas que importan en tu rubro para ver si apareces. Es una medición más pobre que la de buscadores, y conviene saberlo antes de contratar a alguien que prometa informes muy detallados.",
        "Y lo más importante: casi todo lo que hace que un modelo pueda leerte y citarte es trabajo técnico y de contenido que ya deberías estar haciendo para los buscadores de siempre. Por eso lo tratamos como parte de cómo construimos, y no como un servicio aparte con nombre nuevo.",
      ],
    },
  ],
  faq: [
    {
      q: "¿GEO reemplaza al SEO?",
      a: "No. Lo que hace que un modelo pueda leer y citar tu página es casi lo mismo que hace que Google la entienda: contenido accesible en el HTML, estructura clara y respuestas concretas. Es una extensión del mismo trabajo, no un reemplazo. Si alguien te lo plantea como sustituto, conviene desconfiar.",
    },
    {
      q: "¿Sirve de algo el archivo llms.txt?",
      a: "Hoy es una convención propuesta, no un estándar adoptado, y ningún motor grande ha confirmado públicamente que la use. Nosotros lo generamos porque cuesta casi nada y queda puesto por si se adopta, pero no es lo que hace la diferencia. Lo que sí la hace es que tu contenido esté en el HTML y responda preguntas reales.",
    },
    {
      q: "¿Cómo sé si ChatGPT ya menciona mi empresa?",
      a: "De dos formas, ambas imperfectas. Pregúntale por tu categoría y tu ciudad como lo haría un cliente que no te conoce, y repite la prueba cada cierto tiempo. Y revisa en tu herramienta de analítica si llega tráfico desde dominios de asistentes: en Google Analytics 4 aparece como un canal propio.",
    },
    {
      q: "¿Cuánto tarda en notarse?",
      a: "Para la parte de búsqueda en vivo, el cambio puede reflejarse en semanas, porque el modelo lee tu página en el momento de responder. Para lo que el modelo ya sabe de memoria, depende de cuándo se reentrene, y eso no lo controla nadie desde fuera. Desconfía de cualquier plazo que suene más preciso que esto.",
    },
    {
      q: "¿Tiene sentido para una empresa chica en Perú?",
      a: "Tiene sentido si tu cliente investiga antes de comprar y si tienes algo concreto que decir. Si tu negocio depende de búsquedas locales inmediatas, el trabajo tradicional de buscadores te va a rendir más y antes. Lo razonable es hacer bien lo básico, que sirve para los dos, y no pagar un servicio aparte por el nombre nuevo.",
    },
  ],
  ctaText: "Solicitar diagnóstico",
};
