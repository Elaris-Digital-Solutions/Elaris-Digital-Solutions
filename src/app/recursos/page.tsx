import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsappButton from "@/components/ui/floating-whatsapp-button";
import Breadcrumbs from "@/components/Breadcrumbs";
import { campaignMetadata, buildBreadcrumbSchema } from "@/seo/site";
import { ARTICLES } from "@/content/recursos";
import { findProfile } from "@/content/equipo";
import es from "@/locales/es.json";

const hub = es.contentHubs.recursos;

export const metadata = campaignMetadata(
  "Recursos y Guías de Tecnología para Empresas | Elaris Digital Solutions",
  "Guías claras sobre costos de software, e-commerce, IA y transformación digital para empresas en Perú. Lo que necesitas saber antes de invertir.",
  "/recursos",
  { index: true }
);

const crumbs = [
  { name: es.contentHubs.breadcrumbHome, path: "/" },
  { name: hub.breadcrumbLabel, path: "/recursos" },
];

const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("es-PE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default function Page() {
  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(crumbs)} />
      <div className="relative min-h-screen overflow-x-hidden bg-white">
        <Navbar />
        <main id="contenido-principal" tabIndex={-1}>
          <header className="relative overflow-hidden bg-[#F0F4FF] pb-20 pt-32">
            <div
              className="pointer-events-none absolute -right-40 -top-40 h-[620px] w-[620px] rounded-full opacity-[0.07]"
              style={{ background: "radial-gradient(circle, #0855FD 0%, transparent 70%)" }}
              aria-hidden="true"
            />
            <div className="container relative z-10 mx-auto max-w-5xl px-6">
              <Breadcrumbs items={crumbs} />
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#0855FD]/25 bg-white/70 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-brand-gradient shadow-sm backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-gradient" aria-hidden="true" />
                {hub.badge}
              </span>
              <h1 className="mb-6 text-4xl font-light tracking-tight text-[#071540] md:text-6xl">
                {hub.title}
              </h1>
              <p className="max-w-2xl text-lg font-light leading-relaxed text-slate-700">
                {hub.intro}
              </p>
            </div>
          </header>

          <section className="bg-white py-20">
            <div className="container mx-auto max-w-5xl px-6">
              <div className="grid gap-6 md:grid-cols-2">
                {ARTICLES.map((article) => {
                  const author = findProfile(article.authorSlug);
                  return (
                    <Link
                      key={article.slug}
                      href={`/recursos/${article.slug}`}
                      className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#0855FD]/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0855FD] focus-visible:ring-offset-2"
                    >
                      <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#0855FD]/10">
                        <BookOpen aria-hidden="true" className="h-5 w-5 icon-brand-gradient" />
                      </span>
                      <h2 className="mb-3 text-xl font-semibold leading-snug text-[#071540]">
                        {article.title}
                      </h2>
                      <p className="mb-6 flex-1 text-sm font-light leading-relaxed text-slate-600">
                        {article.seoDescription}
                      </p>
                      <div className="mb-4 flex items-center gap-3 border-t border-slate-100 pt-4">
                        {author && (
                          <span className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-full border-2 border-brand-gradient">
                            <Image
                              src={author.photo}
                              alt=""
                              width={32}
                              height={32}
                              className="h-full w-full object-cover"
                            />
                          </span>
                        )}
                        <span className="text-xs leading-tight text-slate-600">
                          {author && (
                            <span className="block font-semibold text-[#071540]">
                              {author.shortName}
                            </span>
                          )}
                          {formatDate(article.publishDate)} · {article.readMinutes} {hub.minRead}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-brand-gradient">
                        {hub.readArticle} →
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        </main>
        <Footer />
        <FloatingWhatsappButton />
      </div>
    </>
  );
}
