import LLMWorkflows from "@/views/LLMWorkflows";
import JsonLd from "@/components/JsonLd";
import { campaignMetadata, buildFaqSchema } from "@/seo/site";
import es from "@/locales/es.json";

const copy = es.llmWorkflows;

export const metadata = campaignMetadata(
  copy.seo.title,
  copy.seo.description,
  "/implementacion-llms"
);

export default function Page() {
  return (
    <>
      <JsonLd data={buildFaqSchema(copy.faq.items)} />
      <LLMWorkflows />
    </>
  );
}
