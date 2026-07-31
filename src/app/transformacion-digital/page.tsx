import ServicePageTemplate from "@/components/ServicePageTemplate";
import JsonLd from "@/components/JsonLd";
import { campaignMetadata, buildFaqSchema } from "@/seo/site";
import es from "@/locales/es.json";

const copy = es.servicePages.transformacion;

export const metadata = campaignMetadata(
  copy.seo.title,
  copy.seo.description,
  "/transformacion-digital",
  { index: true }
);

export default function Page() {
  return (
    <>
      <JsonLd data={buildFaqSchema(copy.faq)} />
      <ServicePageTemplate copy={copy} />
    </>
  );
}
