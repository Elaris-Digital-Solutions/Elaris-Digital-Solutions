import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import TeamProfileTemplate from "@/components/TeamProfileTemplate";
import {
  campaignMetadata,
  buildBreadcrumbSchema,
  buildPersonProfileSchema,
} from "@/seo/site";
import { TEAM_PROFILES, findProfile } from "@/content/equipo";
import { CASE_STUDIES } from "@/content/casos";
import { ARTICLES } from "@/content/recursos";
import es from "@/locales/es.json";

export const dynamicParams = false;

export function generateStaticParams() {
  return TEAM_PROFILES.map((profile) => ({ slug: profile.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const profile = findProfile(params.slug);
  if (!profile) return {};
  return campaignMetadata(
    profile.seoTitle,
    profile.seoDescription,
    `/equipo/${profile.slug}`,
    { index: true }
  );
}

export default function Page({ params }: { params: { slug: string } }) {
  const profile = findProfile(params.slug);
  if (!profile) notFound();

  const crumbs = [
    { name: es.contentHubs.breadcrumbHome, path: "/" },
    { name: es.contentHubs.equipo.breadcrumbLabel, path: "/equipo" },
    { name: profile.shortName, path: `/equipo/${profile.slug}` },
  ];

  const cases = profile.caseSlugs
    .map((slug) => CASE_STUDIES.find((study) => study.slug === slug))
    .filter((study): study is NonNullable<typeof study> => Boolean(study))
    .map((study) => ({
      slug: study.slug,
      client: study.client,
      sector: study.sector,
      summary: study.summary,
      metric: study.results[0]?.metric ?? "",
    }));

  // Los artículos se asocian solos por autoría: no hay lista que mantener.
  const articles = ARTICLES.filter(
    (article) => article.authorSlug === profile.slug
  ).map((article) => ({
    title: article.title,
    href: `/recursos/${article.slug}`,
    readMinutes: article.readMinutes,
  }));

  const colleagues = TEAM_PROFILES.filter((p) => p.slug !== profile.slug).map((p) => ({
    slug: p.slug,
    shortName: p.shortName,
    role: p.role,
    photo: p.photo,
  }));

  return (
    <>
      <JsonLd
        data={[buildPersonProfileSchema(profile), buildBreadcrumbSchema(crumbs)]}
      />
      <TeamProfileTemplate
        profile={profile}
        breadcrumbs={crumbs}
        cases={cases}
        articles={articles}
        colleagues={colleagues}
      />
    </>
  );
}
