import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsappButton from "@/components/ui/floating-whatsapp-button";
import Breadcrumbs from "@/components/Breadcrumbs";
import HubCta from "@/components/HubCta";
import { campaignMetadata, buildBreadcrumbSchema } from "@/seo/site";
import { TEAM_PROFILES } from "@/content/equipo";
import es from "@/locales/es.json";

const hub = es.contentHubs.equipo;

export const metadata = campaignMetadata(
  "Equipo de Elaris Digital Solutions — Quiénes somos",
  "Conoce a las personas detrás de Elaris Digital Solutions: Carlos Colfer, Sergio Herrera y Fabrizio Bussalleu. Software a medida para empresas en Perú y LATAM.",
  "/equipo",
  { index: true }
);

const crumbs = [
  { name: es.contentHubs.breadcrumbHome, path: "/" },
  { name: hub.breadcrumbLabel, path: "/equipo" },
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
              <div className="grid gap-6 sm:grid-cols-3">
                {TEAM_PROFILES.map((profile) => (
                  <Link
                    key={profile.slug}
                    href={`/equipo/${profile.slug}`}
                    className="group flex h-full flex-col items-center rounded-2xl border border-slate-200 bg-white px-6 py-9 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#0855FD]/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0855FD] focus-visible:ring-offset-2"
                  >
                    <div className="mb-5 rounded-full bg-brand-gradient p-[3px] shadow-[0_10px_28px_rgba(47,100,255,0.22)] transition-transform duration-300 group-hover:scale-105">
                      <div className="h-[96px] w-[96px] overflow-hidden rounded-full border-4 border-white">
                        <Image
                          src={profile.photo}
                          alt={`Retrato de ${profile.name}`}
                          width={96}
                          height={96}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                    <h2 className="text-base font-bold text-[#071540]">{profile.name}</h2>
                    <p className="mt-1.5 text-sm font-semibold text-brand-gradient">
                      {profile.role}
                    </p>
                    <p className="mt-4 flex-1 text-sm font-light leading-relaxed text-slate-600">
                      {profile.bioIntro}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-1.5 rounded-lg border border-[#0855FD]/25 px-4 py-2 text-sm font-semibold text-brand-gradient transition-colors group-hover:bg-[#0855FD]/5">
                      {hub.profileCta} →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <HubCta text={es.contentHubs.ctaTextEquipo} />
        </main>
        <Footer />
        <FloatingWhatsappButton />
      </div>
    </>
  );
}
