import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import ArticleTemplate from "@/components/ArticleTemplate";
import {
  campaignMetadata,
  buildBreadcrumbSchema,
  buildArticleSchema,
  buildFaqSchema,
} from "@/seo/site";
import { ARTICLES, findArticle } from "@/content/recursos";
import { findProfile } from "@/content/equipo";
import { findCase } from "@/content/casos";
import es from "@/locales/es.json";

export const dynamicParams = false;

export function generateStaticParams() {
  return ARTICLES.map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const article = findArticle(params.slug);
  if (!article) return {};
  return campaignMetadata(
    article.seoTitle,
    article.seoDescription,
    `/recursos/${article.slug}`,
    { index: true }
  );
}

export default function Page({ params }: { params: { slug: string } }) {
  const article = findArticle(params.slug);
  if (!article) notFound();

  const author = findProfile(article.authorSlug);
  const relatedCase = article.caseSlug ? findCase(article.caseSlug) : undefined;

  const crumbs = [
    { name: es.contentHubs.breadcrumbHome, path: "/" },
    { name: es.contentHubs.recursos.breadcrumbLabel, path: "/recursos" },
    { name: article.title, path: `/recursos/${article.slug}` },
  ];

  return (
    <>
      <JsonLd
        data={[
          buildArticleSchema(article, author),
          buildFaqSchema(article.faq),
          buildBreadcrumbSchema(crumbs),
        ]}
      />
      <ArticleTemplate
        article={article}
        breadcrumbs={crumbs}
        author={
          author
            ? {
                name: author.shortName,
                role: author.role,
                href: `/equipo/${author.slug}`,
                photo: author.photo,
              }
            : null
        }
        relatedCase={
          relatedCase
            ? {
                client: relatedCase.client,
                summary: relatedCase.summary,
                href: `/casos/${relatedCase.slug}`,
                sector: relatedCase.sector,
                metric: relatedCase.results[0]?.metric ?? "",
              }
            : null
        }
      />
    </>
  );
}
