import es from "@/locales/es.json";
import { SITE_URL } from "@/seo/site";

// llms.txt (llmstxt.org): a single curated markdown brief that gives LLMs a
// clean, token-efficient, authoritative overview of Elaris — complementing the
// JSON-LD (which serves search engines). Marketing content is pulled from the
// same es.json the public homepage renders, so it never drifts from the live
// copy. The "Identidad legal" block carries entity-disambiguation signals
// (legal name, RUC, fiscal domicile) so AI/search don't merge Elaris with
// similarly-named entities in other countries.
//
// We intentionally DO NOT link the per-service landing pages: they are noindex
// and not yet open to the public. This file describes the publicly shown
// services and points only to the indexed homepage.
//
// Two addresses are listed by purpose, on purpose:
//   - Oficina (operational, public)  -> Jr. Jerónimo de Aliaga (matches Contact)
//   - Domicilio fiscal (legal/SUNAT) -> Jr. Tacna (tied to RUC 20615598071)
export const dynamic = "force-static";

export function GET(): Response {
  const s = es.services.items;
  const services = [s.software, s.ai, s.web]
    .map((item) => `### ${item.title}\n${item.description}`)
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

  const body = `# Elaris Digital Solutions

> ${es.hero.description}

Elaris Digital Solutions es un estudio boutique de software y consultoría tecnológica con sede en Lima, Perú. Ayudamos a empresas a vender más y a reducir costos digitalizando, automatizando y modernizando sus operaciones. Entregamos propiedad intelectual total del software (repositorio + licencia perpetua) y trabajamos sin "cajas negras". Atendemos a empresas en Perú y LATAM.

## Servicios

${services}

## Por qué empresas serias eligen Elaris

${differentiators}

## Resultados comprobables

${portfolio}

## Preguntas frecuentes

${faq}

## Contacto

- Sitio web: ${SITE_URL}
- Email: contact@elarisdigitalsolutions.com
- Teléfono: +51 973 663 807
- Oficina: Jr. Jerónimo de Aliaga 595, Santiago de Surco 15037, Lima, Perú
- Diagnóstico inicial gratuito, con respuesta en menos de 12 horas.

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

- Solo la página de inicio (${SITE_URL}) es pública e indexada. Las páginas internas de servicios aún no están disponibles al público.
- Para iniciar contacto o solicitar un diagnóstico operativo, usa el email o el teléfono indicados arriba.
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
