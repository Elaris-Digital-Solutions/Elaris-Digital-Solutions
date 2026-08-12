import CustomSoftware from "@/views/CustomSoftware";
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

const PATH = "/desarrollo-software-medida";
const copy = es.customSoftware;
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
      <CustomSoftware breadcrumbs={crumbs} />
    </>
  );
}
