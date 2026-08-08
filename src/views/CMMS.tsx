"use client";

import ServicePageTemplate from "@/components/ServicePageTemplate";
import CmmsMockups from "@/components/ui/cmms-mockups";
import es from "@/locales/es.json";

const copy = es.cmms;

export default function CMMS() {
  return (
    <ServicePageTemplate
      copy={{
        hero: copy.hero,
        pains: copy.pains,
        includes: copy.includes,
        caseStudy: copy.caseStudy,
        faq: copy.faq.items,
        related: copy.related,
      }}
      illustration={<CmmsMockups />}
    />
  );
}
