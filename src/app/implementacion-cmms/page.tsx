import CMMS from "@/views/CMMS";
import JsonLd from "@/components/JsonLd";
import { campaignMetadata, buildFaqSchema } from "@/seo/site";
import es from "@/locales/es.json";

const copy = es.cmms;

export const metadata = campaignMetadata(
  copy.seo.title,
  copy.seo.description,
  "/implementacion-cmms"
);

export default function Page() {
  return (
    <>
      <JsonLd data={buildFaqSchema(copy.faq.items)} />
      <CMMS />
    </>
  );
}
