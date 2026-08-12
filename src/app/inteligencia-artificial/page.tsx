import ServicePageTemplate from "@/components/ServicePageTemplate";
import JsonLd from "@/components/JsonLd";
import {
  buildServicePageMetadata,
  buildFaqSchema,
  buildBreadcrumbSchema,
  buildServiceNodeSchema,
  serviceCrumbs,
} from "@/seo/site";
import { findService } from "@/content/services";
import es from "@/locales/es.json";

const PATH = "/inteligencia-artificial";
const copy = es.inteligenciaArtificial;
const crumbs = serviceCrumbs(PATH);

export const metadata = buildServicePageMetadata(PATH, copy.seo);

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          buildServiceNodeSchema(findService(PATH)),
          buildFaqSchema(copy.faq.items),
          buildBreadcrumbSchema(crumbs),
        ]}
      />
      <ServicePageTemplate
        copy={{
          hero: copy.hero,
          pains: copy.pains,
          includes: copy.includes,
          caseStudy: copy.caseStudy,
          faq: copy.faq.items,
          related: copy.related,
        }}
        breadcrumbs={crumbs}
      />
    </>
  );
}
