import { SITE_URL } from "@/seo/site";

// We hand-build robots.txt instead of using Next's MetadataRoute.Robots because
// that typed API can't emit the non-standard `Content-Signal` directive
// (contentsignals.org / draft-romm-aipref-contentsignals).
//
// Crawlers are allowed everywhere so they can READ the noindex meta tag on the
// campaign/service pages (blocking via robots would prevent that). Only the
// homepage is listed in the sitemap.
//
// Content-Signal declares our AI-usage stance for a public marketing landing:
//   search=yes   -> allow traditional + AI search indexing (SEO is a priority)
//   ai-input=yes -> let AI answer engines read the live site and cite us (leads)
//   ai-train=yes -> allow use for model training (nothing proprietary to protect)
export const dynamic = "force-static";

export function GET(): Response {
  const body = [
    "User-agent: *",
    "Content-Signal: search=yes, ai-input=yes, ai-train=yes",
    "Allow: /",
    "",
    `Host: ${SITE_URL}`,
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    // llms.txt no es un estándar reconocido por los rastreadores, así que
    // anunciarlo aquí es la única forma de que un agente lo descubra sin
    // adivinar la ruta. Se genera en /llms.txt a partir del mismo copy que
    // renderiza el sitio, de modo que nunca deriva.
    `LLM-Context: ${SITE_URL}/llms.txt`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
