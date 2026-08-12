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

const PATH = "/e-commerce";
const copy = es.servicePages.ecommerce;
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
