import CustomSoftware from "@/views/CustomSoftware";
import JsonLd from "@/components/JsonLd";
import { campaignMetadata, buildFaqSchema } from "@/seo/site";
import es from "@/locales/es.json";

const copy = es.customSoftware;

export const metadata = campaignMetadata(
  copy.seo.title,
  copy.seo.description,
  "/desarrollo-software-medida",
  { index: true }
);

export default function Page() {
  return (
    <>
      <JsonLd data={buildFaqSchema(copy.faq.items)} />
      <CustomSoftware />
    </>
  );
}
