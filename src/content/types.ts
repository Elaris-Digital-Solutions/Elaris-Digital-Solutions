/**
 * Entidades de contenido indexable (perfiles, casos, artículos).
 *
 * Se importan SOLO desde `page.tsx` (server components). Nunca desde un
 * componente `"use client"`: si entraran por ahí, todo el contenido se
 * empaquetaría en el bundle JS del navegador, que es exactamente el
 * problema que tiene hoy `es.json` (~59 KB en cada página). El copy de
 * microinterfaz sigue en `es.json`; el contenido largo vive aquí y viaja
 * como HTML renderizado, que es lo que el crawler necesita.
 */

export interface TeamProfile {
  slug: string;
  /** Nombre completo público: title, H1 y schema. Desambigua homónimos. */
  name: string;
  /** Forma corta para tarjetas y bylines. */
  shortName: string;
  role: string;
  photo: string;
  linkedin: string;
  seoTitle: string;
  seoDescription: string;
  bioIntro: string;
  bioParagraphs: string[];
  knowsAbout: string[];
  /** Slugs de casos en los que participó. */
  caseSlugs: string[];
}

export interface CaseResult {
  metric: string;
  detail: string;
}

export interface CaseQuote {
  text: string;
  author: string;
  role: string;
}

export interface CaseStudy {
  slug: string;
  client: string;
  /** H1 de la página, sin sufijo de marca. */
  heading: string;
  sector: string;
  location: { city: string; country: string };
  /** Rutas de SERVICE_PATHS a las que pertenece el caso. */
  servicePaths: string[];
  liveUrl: string;
  /** Clave en es.json → portfolio.projects. */
  portfolioKey: string;
  relatedArticleSlugs: string[];
  publishDate: string;
  seoTitle: string;
  seoDescription: string;
  summary: string;
  context: string[];
  before: string[];
  solution: string[];
  results: CaseResult[];
  quote: CaseQuote | null;
}

export interface ArticleSection {
  h2: string;
  /** Admiten enlaces internos con sintaxis [texto](/ruta). */
  paragraphs: string[];
  list?: string[];
}

export interface Article {
  slug: string;
  /** H1. */
  title: string;
  seoTitle: string;
  seoDescription: string;
  publishDate: string;
  modifiedDate: string;
  /** Slug del TeamProfile que firma el artículo (author del BlogPosting). */
  authorSlug: string;
  servicePath: string;
  caseSlug: string | null;
  tags: string[];
  readMinutes: number;
  intro: string[];
  sections: ArticleSection[];
  faq: { q: string; a: string }[];
  ctaText: string;
}
