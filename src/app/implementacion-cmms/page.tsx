import CMMS from "@/views/CMMS";
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

const PATH = "/implementacion-cmms";
const copy = es.cmms;
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
      <CMMS breadcrumbs={crumbs} />
    </>
  );
}
