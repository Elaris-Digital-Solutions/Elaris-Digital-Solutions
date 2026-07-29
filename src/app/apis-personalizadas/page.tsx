import ApiIntegration from "@/views/ApiIntegration";
import JsonLd from "@/components/JsonLd";
import { campaignMetadata, buildFaqSchema } from "@/seo/site";
import es from "@/locales/es.json";

const copy = es.apiIntegration;

export const metadata = campaignMetadata(
  copy.seo.title,
  copy.seo.description,
  "/apis-personalizadas"
);

export default function Page() {
  return (
    <>
      <JsonLd data={buildFaqSchema(copy.faq.items)} />
      <ApiIntegration />
    </>
  );
}
