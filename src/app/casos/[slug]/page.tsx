import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import CaseStudyTemplate from "@/components/CaseStudyTemplate";
import {
  campaignMetadata,
  buildBreadcrumbSchema,
  buildCaseStudySchema,
} from "@/seo/site";
import { CASE_STUDIES, findCase } from "@/content/casos";
import { ARTICLES } from "@/content/recursos";
import { findService } from "@/content/services";
import es from "@/locales/es.json";

/** SSG puro: solo existen las rutas del registro. */
export const dynamicParams = false;

export function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({ slug: study.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const study = findCase(params.slug);
  if (!study) return {};
  return campaignMetadata(
    study.seoTitle,
    study.seoDescription,
    `/casos/${study.slug}`,
    { index: true }
  );
}

export default function Page({ params }: { params: { slug: string } }) {
  const study = findCase(params.slug);
  if (!study) notFound();

  const crumbs = [
    { name: es.contentHubs.breadcrumbHome, path: "/" },
    { name: es.contentHubs.casos.breadcrumbLabel, path: "/casos" },
    { name: study.client, path: `/casos/${study.slug}` },
  ];

  const relatedArticles = study.relatedArticleSlugs
    .map((slug) => ARTICLES.find((article) => article.slug === slug))
    .filter((article): article is NonNullable<typeof article> => Boolean(article))
    .map((article) => ({
      title: article.title,
      href: `/recursos/${article.slug}`,
    }));

  return (
    <>
      <JsonLd data={[buildCaseStudySchema(study), buildBreadcrumbSchema(crumbs)]} />
      <CaseStudyTemplate
        caseStudy={study}
        breadcrumbs={crumbs}
        services={study.servicePaths.map((path) => ({
          href: path,
          title: findService(path).label,
        }))}
        relatedArticles={relatedArticles}
      />
    </>
  );
}
