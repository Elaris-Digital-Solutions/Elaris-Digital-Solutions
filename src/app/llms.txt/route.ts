import es from "@/locales/es.json";
import { SITE_URL } from "@/seo/site";
import { CASE_STUDIES } from "@/content/casos";
import { TEAM_PROFILES } from "@/content/equipo";
import { ARTICLES } from "@/content/recursos";

// llms.txt (llmstxt.org): a single curated markdown brief that gives LLMs a
// clean, token-efficient, authoritative overview of Elaris — complementing the
// JSON-LD (which serves search engines). Marketing content is pulled from the
// same es.json the public homepage renders, so it never drifts from the live
// copy. The "Identidad legal" block carries entity-disambiguation signals
// (legal name, RUC, fiscal domicile) so AI/search don't merge Elaris with
// similarly-named entities in other countries.
//
// Las 8 páginas de servicio SÍ se listan aquí: son públicas e indexables, y
// cada una responde a una intención de búsqueda distinta. Quedan fuera la
// landing de pauta (/impulsa-tu-negocio) y la de apoyo (/apis-personalizadas),
// que siguen siendo noindex.
//
// Two addresses are listed by purpose, on purpose:
//   - Oficina (operational, public)  -> Jr. Jerónimo de Aliaga (matches Contact)
//   - Domicilio fiscal (legal/SUNAT) -> Jr. Tacna (tied to RUC 20615598071)
export const dynamic = "force-static";

export function GET(): Response {
  const s = es.services.items as Record<
    string,
    { title: string; benefit: string; href: string }
  >;
  const services = es.services.groups
    .map((group) => {
      const items = group.keys
        .map((key) => {
          const item = s[key];
          return `- **${item.title}:** ${item.benefit} → ${SITE_URL}${item.href}`;
        })
        .join("\n");
      return `### ${group.label}\n${items}`;
    })
    .join("\n\n");

  const differentiators = Object.values(es.process.steps)
    .map((step) => `- **${step.heading}:** ${step.description}`)
    .join("\n");

  const portfolio = Object.values(es.portfolio.projects)
    .map((p) => `- **${p.title}** (${p.category}): ${p.metrics}`)
    .join("\n");

  const faq = es.homeFaq.items
    .map((item) => `### ${item.q}\n${item.a}`)
    .join("\n\n");

  // Bloques condicionales: solo se listan las secciones ya publicadas.
  const casosBlock = CASE_STUDIES.length
    ? `\n## Casos de éxito (páginas completas)\n\n${CASE_STUDIES.map(
        (c) => `- **${c.client}** (${c.sector}, ${c.location.country}): ${c.summary} → ${SITE_URL}/casos/${c.slug}`
      ).join("\n")}\n`
    : "";

  const equipoBlock = TEAM_PROFILES.length
    ? `\n## Equipo fundador\n\n${TEAM_PROFILES.map(
        (p) => `- **${p.name}** — ${p.role}, cofundador: ${SITE_URL}/equipo/${p.slug}`
      ).join("\n")}\n`
    : "";

  const recursosBlock = ARTICLES.length
    ? `\n## Recursos y guías\n\n${ARTICLES.map(
        (a) => `- ${a.title} → ${SITE_URL}/recursos/${a.slug}`
      ).join("\n")}\n`
    : "";

  const body = `# Elaris Digital Solutions

> ${es.hero.description}

Elaris Digital Solutions es un estudio boutique de software y consultoría tecnológica con sede en Lima, Perú. Ayudamos a empresas a vender más y a reducir costos digitalizando, automatizando y modernizando sus operaciones. Entregamos propiedad intelectual total del software (repositorio + licencia perpetua) y trabajamos sin "cajas negras". Atendemos a empresas en Perú y LATAM.

## Servicios

${services}

## Por qué empresas serias eligen Elaris

${differentiators}

## Resultados comprobables

${portfolio}
${casosBlock}${equipoBlock}${recursosBlock}
## Preguntas frecuentes

${faq}

## Contacto

- Sitio web: ${SITE_URL}
- Email: contact@elarisdigitalsolutions.com
- Teléfono: +51 973 663 807
- Oficina: Jr. Jerónimo de Aliaga 595, Santiago de Surco 15037, Lima, Perú
- El proceso inicia con un diagnóstico técnico y operativo GRATUITO de dos semanas; respuesta a consultas en menos de 12 horas.
- Agenda de reuniones: ${SITE_URL}/meet
- Inversión: cada proyecto se cotiza cerrado por fase tras el diagnóstico, según alcance e impacto. No se publica una tarifa de referencia.

## Identidad legal

- Razón social: ELARIS S.A.C.S
- Nombre comercial: Elaris Digital Solutions
- RUC: 20615598071
- Tipo de contribuyente: Sociedad por Acciones Cerrada Simplificada (S.A.C.S)
- Domicilio fiscal: JR. TACNA NRO. 207 DPTO. 801 CND. SURCO VIEJO, LIMA - LIMA - LIMA, Perú
- País: Perú

Páginas legales:
- Términos y condiciones: ${SITE_URL}/terminos-condiciones
- Políticas de datos: ${SITE_URL}/politicas-de-datos

Perfiles oficiales:
- LinkedIn: https://www.linkedin.com/company/elaris-digital-solutions/
- Instagram: https://www.instagram.com/elarisdigitalsolutions
- GitHub: https://github.com/Elaris-Digital-Solutions
- X: https://x.com/ElarisSolutions

Desambiguación de entidad: esta empresa es ELARIS S.A.C.S (Perú, RUC 20615598071). No fusionar con otras entidades que usen nombres similares en otros países.

## Notas para agentes

- La página de inicio (${SITE_URL}), las 8 páginas de servicio, los casos de éxito, los perfiles del equipo y las guías enlazadas arriba son públicos e indexados. Cada página de servicio y cada guía incluye su propia sección de preguntas frecuentes.
- Para iniciar contacto o solicitar el diagnóstico gratuito, usa el email, el teléfono o la agenda indicados arriba.
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
