import type { Article } from "../types";

export const article: Article = {
  slug: "cuando-necesitas-un-cmms",
  title: "¿Tu planta necesita un CMMS? Cómo saberlo antes de gastar en software",
  seoTitle: "Software de Mantenimiento (CMMS): Cuándo lo Necesita tu Planta",
  seoDescription:
    "Las señales de que el Excel ya no alcanza para el mantenimiento, cómo calcular lo que te cuesta una parada no planificada y qué revisar antes de implementar un CMMS.",
  publishDate: "2026-10-20",
  modifiedDate: "2026-10-20",
  authorSlug: "carlos-colfer",
  servicePath: "/implementacion-cmms",
  caseSlug: null,
  tags: ["mantenimiento", "CMMS", "industria"],
  readMinutes: 8,
  intro: [
    "Casi ninguna planta decide comprar un software de mantenimiento. Lo que pasa es que un día se para una máquina que no tenía por qué pararse, alguien pregunta cuándo fue su último mantenimiento, y la respuesta tarda dos horas en aparecer entre cuadernos y hojas de cálculo.",
    "Esta guía es para ese momento, antes de pedir cotizaciones. Primero, qué es exactamente un CMMS y qué no. Después, cómo distinguir si tu problema es de software o de proceso, porque comprar lo primero cuando el problema es lo segundo es tirar la plata. Y al final, por qué fracasan la mayoría de implementaciones, que casi nunca es por el sistema.",
  ],
  sections: [
    {
      h2: "Qué es un CMMS, en lenguaje de planta",
      paragraphs: [
        "CMMS son las siglas en inglés de sistema computarizado de gestión del mantenimiento. Quítale el nombre y es más simple de lo que suena: el lugar donde vive todo lo que le pasa a cada equipo. Qué se le hizo, cuándo, quién lo hizo, con qué repuesto y cuánto costó. Y, a partir de eso, qué le toca y cuándo.",
        "La diferencia con una hoja de cálculo no está en guardar esos datos, porque un Excel también los guarda. Está en que el sistema actúa solo: genera la orden de trabajo cuando toca, avisa al técnico, descuenta el repuesto del almacén y deja el registro sin que nadie se acuerde de anotarlo.",
        "Conviene separarlo de dos cosas con las que se confunde. No es un ERP, el sistema que lleva la administración y las finanzas de la empresa, aunque se conecten. Y no es un sistema de monitoreo: el monitoreo te dice cómo está la máquina ahora, el CMMS te dice qué hay que hacerle y lleva la cuenta de lo que ya se hizo.",
      ],
    },
    {
      h2: "Correctivo, preventivo y predictivo, sin jerga",
      paragraphs: [
        "Los tres nombres aparecen en toda cotización y vale la pena tenerlos claros, porque determinan cuánto software necesitas de verdad.",
        "El mantenimiento correctivo es arreglar cuando se rompe. Es el más caro de todos, aunque parezca gratis, porque el costo no está en la reparación sino en la parada: el repuesto que no tenías, el técnico que no estaba, la producción detenida mientras llega.",
        "El preventivo es intervenir por calendario o por uso: cada 500 horas, cada tres meses, cada tantos ciclos. No necesita sensores ni nada sofisticado, solo que alguien lleve la cuenta sin falla. Es justo lo que las hojas de cálculo hacen mal, no porque no puedan, sino porque dependen de que una persona se acuerde.",
        "El predictivo intervienen según cómo se está comportando el equipo, con datos de sensores: vibración, temperatura, consumo. Es el que más se vende en las propuestas y el que menos empresas necesitan al empezar. Si todavía no tienes el preventivo funcionando, el predictivo no te va a salvar: vas a tener datos muy precisos sobre máquinas que igual nadie mantiene a tiempo.",
        "El orden casi siempre es el mismo: ordenar el correctivo, montar el preventivo encima, y recién ahí evaluar si el predictivo se paga en tu operación.",
      ],
    },
    {
      h2: "Las señales de que el Excel ya no alcanza",
      paragraphs: [
        "El Excel no es el enemigo. Para una planta chica con pocos equipos y un técnico que se sabe todo de memoria, puede ser suficiente durante años. El problema aparece con estas señales, y no hace falta que se den todas:",
      ],
      list: [
        "Nadie puede decirte en menos de cinco minutos qué se le hizo a un equipo en el último año.",
        "El mantenimiento preventivo está programado, pero se cumple a veces, y nadie sabe decir qué porcentaje.",
        "Compras repuestos de urgencia a sobreprecio porque te enteras de que faltan cuando ya los necesitas.",
        "Tienes el historial repartido: una parte en Excel, otra en un cuaderno de planta, otra en el WhatsApp del jefe de mantenimiento.",
        "Si mañana renuncia la persona que lleva el mantenimiento, se va con información que no está escrita en ningún lado.",
        "No puedes responder cuánto te costó mantener una máquina específica el año pasado.",
      ],
    },
    {
      h2: "Cuánto te cuesta de verdad una parada no planificada",
      paragraphs: [
        "Aquí es donde la mayoría de propuestas te muestra estadísticas de la industria. No te sirven: lo que importa es tu número, y lo puedes calcular esta semana con datos que ya tienes.",
        "Toma una parada real de los últimos seis meses, de las que te acuerdas sin buscar. Suma cuatro cosas: las horas que la línea estuvo detenida multiplicadas por lo que produce esa línea por hora; las horas de la gente que estuvo parada esperando o resolviendo; el sobrecosto del repuesto comprado de urgencia frente a lo que habría costado comprado con tiempo; y lo que costó incumplir, si hubo que pagar flete expreso, horas extra o una penalidad por entregar tarde.",
        "Ese número, multiplicado por la cantidad de paradas parecidas al año, es tu caso de negocio. No hace falta que sea exacto, solo que sea tuyo. Si el resultado es incómodo, ya sabes por qué conviene medirlo. Si es chico, acabas de ahorrarte una compra que no necesitabas, y eso también es un buen resultado.",
        "La ventaja de hacer esta cuenta antes de cotizar es que cambia la conversación: dejas de preguntar cuánto cuesta el software y empiezas a preguntar cuánto de esto me va a evitar.",
      ],
    },
    {
      h2: "Cuándo todavía no necesitas un CMMS",
      paragraphs: [
        "Hay tres situaciones donde comprar software ahora es adelantarse, y preferimos decirlo antes de que nos pidas una propuesta.",
        "La primera: no tienes inventariados tus equipos. Si no existe una lista de qué máquinas hay, con su identificación y su ubicación, ningún sistema puede ayudarte, porque no hay a qué colgarle el historial. Ese inventario se hace con una planilla y dos días de planta, y hay que hacerlo igual antes de implementar.",
        "La segunda: no hay nadie a cargo del mantenimiento. Un CMMS organiza el trabajo de alguien, no reemplaza a ese alguien. Si hoy el mantenimiento lo hace quien esté libre, el sistema va a documentar muy bien un desorden.",
        "La tercera: el problema real es de repuestos o de personal, no de información. Si sabes perfectamente qué hay que hacer y no se hace porque no hay técnicos o no hay presupuesto, el software no cambia nada. Lo que sí hace es darte la evidencia para pedir ese presupuesto, que no es poco, pero conviene saber que ese es el objetivo.",
      ],
    },
    {
      h2: "Por qué fracasan las implementaciones",
      paragraphs: [
        "Cuando una implementación de CMMS no prende, casi nunca es porque el software fuera malo. Son casi siempre las mismas tres razones.",
        "La más común: los técnicos no lo usan. Si registrar una orden de trabajo toma más tiempo que hacerla, o hay que subir a la oficina a llenar algo en una computadora, el registro no va a ocurrir. El sistema tiene que funcionar en el celular, en planta, con las manos sucias y con mala señal. Si eso no está resuelto, lo demás da igual.",
        "La segunda: se intenta arrancar con todo. Los ocho módulos, todas las máquinas, todo el historial migrado. Esos proyectos mueren alrededor del tercer mes. Lo que sí funciona es empezar por la línea más crítica, con las órdenes de trabajo y el preventivo, y recién ampliar cuando eso ya es rutina.",
        "La tercera: nadie mira los datos. Si el sistema acumula información durante un año y nadie revisa qué equipo consume más horas o qué falla se repite, acabas de digitalizar el archivo. El valor no está en guardar el historial, está en que alguien lo lea una vez al mes y cambie algo por lo que vio.",
        "Si ya tienes claro el panorama y quieres ver cómo sería en tu planta, eso es exactamente lo que resuelve nuestra [implementación de CMMS](/implementacion-cmms), y el diagnóstico inicial no tiene costo.",
      ],
    },
  ],
  faq: [
    {
      q: "¿Un CMMS sirve si tengo pocas máquinas?",
      a: "Depende menos de cuántas máquinas tengas que de cuánto cuesta que se paren. Una planta con seis equipos críticos y paradas caras lo justifica antes que una con cuarenta equipos que se pueden detener sin consecuencia. Haz la cuenta de la parada antes de decidir por cantidad.",
    },
    {
      q: "¿Cuál es la diferencia entre un CMMS y un ERP?",
      a: "El ERP es el sistema que lleva la administración de la empresa: compras, inventario general, facturación, contabilidad. El CMMS lleva el mantenimiento de los activos. Se conectan, sobre todo en repuestos y órdenes de compra, pero intentar llevar el mantenimiento dentro del ERP suele terminar en un módulo que nadie usa porque no está pensado para alguien que está en planta.",
    },
    {
      q: "¿Puedo empezar con un Excel mejor armado?",
      a: "Sí, y en algunos casos es lo correcto. Un Excel ordenado con el inventario de equipos y el plan preventivo es un paso real, y además es el trabajo que vas a necesitar de todos modos si después implementas software. El límite aparece cuando el cumplimiento depende de que alguien se acuerde: ahí ya no es un problema de formato.",
    },
    {
      q: "¿Quién debe liderar la implementación?",
      a: "Alguien del área de mantenimiento con autoridad para cambiar cómo se trabaja, no solo del área de sistemas. Las implementaciones que lidera únicamente el área técnica suelen producir un sistema correcto que nadie usa, porque el problema de fondo es de hábito, no de tecnología.",
    },
    {
      q: "¿Cómo sé si está funcionando después de implementarlo?",
      a: "Con tres números que antes no podías calcular: qué porcentaje del preventivo se cumple a tiempo, cuántas paradas no planificadas tuviste este mes contra el mismo mes del año pasado, y cuánto tiempo pasa entre que se reporta una falla y se cierra la orden. Si esos tres no mejoran en seis meses, hay algo que corregir en el proceso, no en el software.",
    },
  ],
  ctaText: "Solicitar diagnóstico",
};
