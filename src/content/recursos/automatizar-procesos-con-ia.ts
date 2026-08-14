import type { Article } from "../types";

export const article: Article = {
  slug: "automatizar-procesos-con-ia",
  title:
    "Automatización con IA para empresas: 7 procesos que ya puedes automatizar (sin proyecto eterno)",
  seoTitle: "Automatizar Procesos con IA: 7 Casos Reales para tu Empresa",
  seoDescription:
    "Qué procesos puede automatizar la IA hoy en una empresa (facturas, correos, documentos, reportes), cómo elegir el primero y cuánto tarda en dar resultados.",
  publishDate: "2026-08-17",
  modifiedDate: "2026-08-17",
  authorSlug: "fabrizio-bussalleu",
  servicePath: "/inteligencia-artificial",
  caseSlug: "salcedo-jewels",
  tags: ["inteligencia artificial", "automatización", "pymes"],
  readMinutes: 6,
  intro: [
    "A todas las empresas les están vendiendo “IA”, y casi nadie les dice para qué la usarían ellas, con sus procesos y sus datos. El resultado es predecible: proyectos eternos, demos impresionantes y cero impacto en la operación.",
    "Esta guía va al grano: los siete procesos que una empresa como la tuya puede automatizar con IA hoy, cómo elegir por cuál empezar, y qué necesitas tener listo antes, que es menos de lo que crees.",
  ],
  sections: [
    {
      h2: "Qué automatiza bien la IA hoy (y qué no)",
      paragraphs: [
        "La IA actual brilla en una categoría concreta: tareas donde una persona lee, clasifica, extrae o redacta información siguiendo criterios que puede explicar. Si tu equipo dice “esto es mecánico pero alguien tiene que hacerlo”, probablemente es automatizable.",
        "Lo que la IA no hace bien: decisiones sin criterio definible, tareas donde equivocarse es inaceptable sin revisión humana, y procesos que ni tu propio equipo sabe explicar. La automatización ordena procesos que existen; no arregla procesos que no existen. Para eso está primero la [transformación digital](/recursos/transformacion-digital-pymes-por-donde-empezar).",
      ],
    },
    {
      h2: "Los 7 procesos automatizables con IA en una empresa",
      paragraphs: [],
      list: [
        "1. Lectura de facturas y comprobantes: extraer datos de PDFs y fotos directo a tu sistema contable, sin digitación",
        "2. Clasificación de correos: cada mensaje etiquetado y derivado al área correcta, con borrador de respuesta para los casos repetidos",
        "3. Respuestas a consultas frecuentes: un asistente que responde con TUS datos (catálogo, políticas, stock), no con inventos genéricos",
        "4. Extracción de datos de contratos y documentos: fechas clave, montos, obligaciones y vencimientos a una tabla consultable",
        "5. Resúmenes ejecutivos: reportes largos convertidos en el párrafo que el gerente realmente va a leer",
        "6. Control de calidad documental: detectar campos faltantes, inconsistencias y errores antes de que cuesten dinero",
        "7. Registro de operaciones: convertir mensajes de WhatsApp y correos sueltos en registros estructurados (pedidos, incidencias, leads)",
      ],
    },
    {
      h2: "Cómo elegir el primer proceso (impacto × riesgo)",
      paragraphs: [
        "El error clásico es empezar por el proceso más vistoso. Empieza por el que cumple tres condiciones: consume muchas horas al mes, tiene reglas claras, y un error se detecta fácil y no cuesta caro. Facturas y clasificación de correos suelen ganar por goleada.",
        "El segundo error es el proyecto eterno. Un caso bien acotado (un proceso, un área) puede estar [funcionando en 3 a 5 semanas](/inteligencia-artificial). Se mide el resultado real (horas ahorradas, precisión) y con esa evidencia se decide el siguiente. Así la IA se paga sola en cada paso, en vez de pedir un acto de fe de seis meses.",
      ],
    },
    {
      h2: "Qué necesitas tener antes de empezar",
      paragraphs: [
        "Menos de lo que te han dicho. No necesitas “tener tus datos perfectos” ni entrenar ningún modelo propio: los modelos actuales se conectan a tus documentos y sistemas tal como están. Lo que sí necesitas: acceso a los datos del proceso (los PDFs, el correo, el Excel), una persona del área que explique las reglas del proceso, y la decisión de medir el antes y el después.",
        "Sobre la privacidad: si tus datos no pueden salir de tu infraestructura, la solución puede correr completamente dentro de ella. Es un requisito de diseño, no un impedimento.",
      ],
    },
    {
      h2: "La automatización también es operativa (no todo es IA)",
      paragraphs: [
        "Un matiz honesto: buena parte del ahorro en una empresa viene de automatización clásica, sistemas que integran lo que hoy se copia a mano, con IA solo en los puntos donde hay que interpretar información. [Salcedo Jewels](/casos/salcedo-jewels) es un buen ejemplo: automatizar la emisión de boletas, el registro de ventas y la actualización del catálogo redujo su tiempo operativo entre 70 y 80%. La pregunta correcta no es “¿cómo uso IA?” sino “¿dónde pierde tiempo mi operación?”, y a veces la respuesta es IA, a veces es integración, y casi siempre es una mezcla.",
      ],
    },
  ],
  faq: [
    {
      q: "¿Cuánto cuesta automatizar un proceso con IA?",
      a: "Depende del proceso y el volumen, pero un primer caso acotado es una inversión de semanas, no de meses. La forma seria de saberlo es un diagnóstico del proceso concreto, y el nuestro no tiene costo.",
    },
    {
      q: "¿Necesito entrenar una IA con mis datos?",
      a: "Casi nunca. La mayoría de los casos funciona conectando modelos existentes a tus documentos y sistemas actuales. Entrenar un modelo propio solo se evalúa en casos muy específicos y nunca es el punto de partida.",
    },
    {
      q: "¿Qué pasa con la privacidad de mis datos?",
      a: "Si tu empresa lo requiere, la solución corre dentro de tu propia infraestructura y ningún dato sale de ella. Además se firma confidencialidad y tus datos no se usan para entrenar modelos de terceros.",
    },
    {
      q: "¿La IA va a reemplazar a mi equipo?",
      a: "En estos casos, no: les quita la parte mecánica del trabajo (leer, copiar, clasificar) para que hagan la parte que sí necesita criterio. La revisión humana se mantiene donde el error cuesta caro.",
    },
  ],
  ctaText: "Solicitar diagnóstico",
};
