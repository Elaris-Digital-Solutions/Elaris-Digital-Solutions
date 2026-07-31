import ServicePageTemplate from "@/components/ServicePageTemplate";
import JsonLd from "@/components/JsonLd";
import { campaignMetadata, buildFaqSchema } from "@/seo/site";
import es from "@/locales/es.json";

const copy = es.inteligenciaArtificial;

export const metadata = campaignMetadata(
  copy.seo.title,
  copy.seo.description,
  "/inteligencia-artificial",
  { index: true }
);

export default function Page() {
  return (
    <>
      <JsonLd data={buildFaqSchema(copy.faq.items)} />
      <ServicePageTemplate
        copy={{
          hero: copy.hero,
          pains: copy.pains,
          includes: copy.includes,
          caseStudy: copy.caseStudy,
          faq: copy.faq.items,
        }}
      />
    </>
  );
}
