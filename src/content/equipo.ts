import type { TeamProfile } from "./types";

/**
 * Perfiles del equipo. Los tres son cofundadores de Elaris (S.A.C.S, 2026)
 * y así se declaran en `Organization.founder`.
 *
 * `name` lleva el nombre completo porque es lo que va a title, H1 y schema:
 * desambigua frente a homónimos en las búsquedas por nombre. `shortName` es
 * la forma que se usa en tarjetas y bylines.
 */
export const TEAM_PROFILES: TeamProfile[] = [
  {
    slug: "carlos-colfer",
    name: "Carlos Alejandro Colfer Mendoza",
    shortName: "Carlos Colfer",
    role: "Gerente General",
    photo: "/assets/team/CarlosColfer.jpg",
    linkedin:
      "https://www.linkedin.com/in/carlos-alejandro-colfer-mendoza-a59a08355/",
    seoTitle:
      "Carlos Alejandro Colfer Mendoza — Gerente General | Elaris Digital Solutions",
    seoDescription:
      "Carlos Alejandro Colfer Mendoza es Gerente General y cofundador de Elaris Digital Solutions. Lidera la arquitectura de cada proyecto de software a medida para empresas en Perú y LATAM.",
    bioIntro:
      "Lidera la arquitectura de cada proyecto de Elaris: su trabajo es que lo que se promete en la propuesta sea exactamente lo que llega a producción, bien construido y en el plazo pactado.",
    bioParagraphs: [
      "Carlos es Gerente General y cofundador de Elaris Digital Solutions, el estudio de software que levantó junto a Sergio Herrera y Fabrizio Bussalleu en Lima en 2026. Desde ese rol combina dos responsabilidades que rara vez conviven: la dirección del negocio y la arquitectura técnica de cada proyecto que entra por la puerta.",
      "Su sello es la ingeniería sin cajas negras. Antes de escribir una línea de código, define con el cliente los criterios de aceptación; durante el proyecto, cada entrega llega versionada, documentada y con evidencia de que funciona. Ese método está detrás de los sistemas que Elaris ha puesto en producción: la plataforma de e-commerce y gestión de Salcedo Jewels, el sistema de reservas de equipos de la Universidad Peruana de Ciencias Aplicadas, la plataforma comercial de CCC Impresiones en Argentina y el ecosistema digital de VeltrixNFC, que opera en Perú y Chile.",
      "Su criterio para decidir qué construir es el mismo que aplica al negocio: la tecnología solo vale si el cliente puede operarla sin nosotros. Por eso cada proyecto se cierra con el repositorio completo, la documentación y una licencia perpetua a nombre del cliente.",
    ],
    knowsAbout: [
      "Arquitectura de software",
      "Desarrollo de software a medida",
      "Gestión de proyectos tecnológicos",
      "Plataformas web para empresas",
    ],
    caseSlugs: [
      "salcedo-jewels",
      "inventario-upc",
      "ccc-impresiones",
      "veltrixnfc",
    ],
  },
  {
    slug: "sergio-herrera",
    name: "Sergio Herrera Jave",
    shortName: "Sergio Herrera",
    role: "Gerente Administrativo",
    photo: "/assets/team/SergioHerrera.jpg",
    linkedin: "https://www.linkedin.com/in/sergio-herrera-jave/",
    seoTitle:
      "Sergio Herrera Jave — Gerente Administrativo | Elaris Digital Solutions",
    seoDescription:
      "Sergio Herrera Jave es Gerente Administrativo y cofundador de Elaris Digital Solutions. Gestiona la relación con cada cliente de inicio a fin en proyectos de software para empresas en Perú y LATAM.",
    bioIntro:
      "Es la persona con la que hablas de principio a fin: entiende tu negocio antes que tu sistema, alinea expectativas y mantiene el proyecto en movimiento sin que tengas que perseguir a nadie.",
    bioParagraphs: [
      "Sergio es Gerente Administrativo y cofundador de Elaris Digital Solutions. Su rol existe por una convicción del estudio: los proyectos de software no fracasan por el código, fracasan por la comunicación. Por eso cada cliente de Elaris tiene un interlocutor constante que traduce en ambas direcciones — del negocio a la ingeniería y de la ingeniería al negocio.",
      "En la práctica, eso significa que Sergio está en el diagnóstico inicial entendiendo cómo opera la empresa, en cada revisión quincenal mostrando avances en lenguaje de resultados, y en la entrega final asegurando que el equipo del cliente sepa usar lo que recibió. Es también quien cuida que las promesas comerciales de Elaris — propuesta cerrada por fase, cero sorpresas de alcance, respuesta en menos de 12 horas — se cumplan en cada proyecto, del e-commerce de Salcedo Jewels a la digitalización de CCC Impresiones.",
      "Es además quien lleva la relación con los clientes después del lanzamiento: la transferencia de conocimiento al equipo, los tiempos de respuesta y la continuidad del acompañamiento pasan por él.",
    ],
    knowsAbout: [
      "Gestión de clientes B2B",
      "Gestión de proyectos",
      "Transformación digital de pymes",
      "Operaciones de negocio",
    ],
    caseSlugs: ["salcedo-jewels", "ccc-impresiones"],
  },
  {
    slug: "fabrizio-bussalleu",
    name: "Fabrizio Bussalleu",
    shortName: "Fabrizio Bussalleu",
    role: "Gerente de Tecnología",
    photo: "/assets/team/FabrizioBussalleu.jpg",
    linkedin: "https://www.linkedin.com/in/fabrizio-bussalleu/",
    seoTitle:
      "Fabrizio Bussalleu — Gerente de Tecnología | Elaris Digital Solutions",
    seoDescription:
      "Fabrizio Bussalleu es Gerente de Tecnología (CTO) y cofundador de Elaris Digital Solutions. Convierte requerimientos de negocio en productos digitales funcionales para empresas en Perú y LATAM.",
    bioIntro:
      "Convierte requerimientos de negocio en productos digitales que la gente realmente usa, con obsesión por los detalles y por la experiencia de quien está al otro lado de la pantalla.",
    bioParagraphs: [
      "Fabrizio es Gerente de Tecnología y cofundador de Elaris Digital Solutions. Es quien toma un requerimiento expresado en lenguaje de negocio — «pierdo ventas porque mi catálogo se desactualiza» — y lo devuelve convertido en un producto funcionando: interfaz, lógica e integraciones incluidas.",
      "Su criterio de diseño es que la tecnología se mida por la experiencia de quien la usa, no por la sofisticación de quien la construyó. Ese enfoque se nota en los productos de Elaris: el catálogo autoadministrable con editor de fotos integrado de Salcedo Jewels, el asistente de reservas en cuatro pasos que usan los estudiantes de la UPC, y la plataforma de perfiles digitales de VeltrixNFC. Trabaja principalmente con React, Next.js y TypeScript, y lidera la práctica de inteligencia artificial aplicada del estudio.",
      "Esa misma obsesión por el detalle es la que aplica al rendimiento y la accesibilidad: que una plataforma cargue rápido en un celular de gama media y que cualquiera pueda usarla no son extras, son parte de que el producto funcione.",
    ],
    knowsAbout: [
      "Desarrollo web",
      "Experiencia de usuario (UX)",
      "E-commerce",
      "Inteligencia artificial aplicada",
      "Next.js y React",
    ],
    caseSlugs: ["salcedo-jewels", "veltrixnfc", "inventario-upc"],
  },
];

export const findProfile = (slug: string) =>
  TEAM_PROFILES.find((p) => p.slug === slug);
