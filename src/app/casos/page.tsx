import Link from "next/link";
import { TrendingUp } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsappButton from "@/components/ui/floating-whatsapp-button";
import Breadcrumbs from "@/components/Breadcrumbs";
import HubCta from "@/components/HubCta";
import { campaignMetadata, buildBreadcrumbSchema } from "@/seo/site";
import { CASE_STUDIES } from "@/content/casos";
import es from "@/locales/es.json";

const hub = es.contentHubs.casos;

export const metadata = campaignMetadata(
  "Casos de Éxito en Desarrollo de Software | Elaris Digital Solutions",
  "Proyectos reales con resultados medibles: e-commerce, plataformas institucionales, digitalización de operaciones y MVPs en Perú, Chile y Argentina.",
  "/casos",
  { index: true }
);

const crumbs = [
  { name: es.contentHubs.breadcrumbHome, path: "/" },
  { name: hub.breadcrumbLabel, path: "/casos" },
];

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
                {CASE_STUDIES.map((study) => (
                  <Link
                    key={study.slug}
                    href={`/casos/${study.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#0855FD]/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0855FD] focus-visible:ring-offset-2"
                  >
                    <p className="mb-2 text-xs font-bold uppercase tracking-widest text-brand-gradient">
                      {study.sector} · {study.location.country}
                    </p>
                    <h2 className="mb-2.5 text-xl font-semibold text-[#071540]">{study.client}</h2>
                    <p className="mb-5 flex-1 text-sm font-light leading-relaxed text-slate-600">
                      {study.summary}
                    </p>
                    {study.results[0] && (
                      <p className="mb-4 flex items-start gap-2 rounded-xl bg-[#F0F4FF] px-4 py-3 text-sm font-semibold text-[#071540]">
                        <TrendingUp
                          aria-hidden="true"
                          className="mt-0.5 h-4 w-4 flex-shrink-0 icon-brand-gradient"
                        />
                        {study.results[0].metric}
                      </p>
                    )}
                    <span className="text-sm font-semibold text-brand-gradient">
                      {hub.readCase} →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <HubCta text={es.contentHubs.ctaTextCasos} />
        </main>
        <Footer />
        <FloatingWhatsappButton />
      </div>
    </>
  );
}
