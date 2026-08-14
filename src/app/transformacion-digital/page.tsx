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
import { SERVICE_COPY } from "@/content/service-copy";

const PATH = "/transformacion-digital";
const copy = SERVICE_COPY.transformacion;
const crumbs = serviceCrumbs(PATH);

export const metadata = buildServicePageMetadata(PATH, copy.seo);

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          buildServiceNodeSchema(findService(PATH)),
          buildFaqSchema(copy.faq),
          buildBreadcrumbSchema(crumbs),
        ]}
      />
      <ServicePageTemplate copy={copy} breadcrumbs={crumbs} />
    </>
  );
}
