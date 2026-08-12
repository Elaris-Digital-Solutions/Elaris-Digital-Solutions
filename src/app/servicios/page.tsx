import Link from "next/link";
import { ArrowRight } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsappButton from "@/components/ui/floating-whatsapp-button";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SERVICE_ICONS } from "@/components/ui/service-icons";
import {
  campaignMetadata,
  buildBreadcrumbSchema,
  buildServiceSchema,
  buildHowToSchema,
} from "@/seo/site";
import {
  SERVICES,
  SERVICE_GROUPS,
  SECONDARY_INTRO,
  UMBRELLA_INTRO,
  findService,
} from "@/content/services";
import es from "@/locales/es.json";

const hub = es.contentHubs.servicios;

export const metadata = campaignMetadata(hub.seo.title, hub.seo.description, "/servicios", {
  index: true,
});

const crumbs = [
  { name: es.contentHubs.breadcrumbHome, path: "/" },
  { name: hub.breadcrumbLabel, path: "/servicios" },
];

const SUPPORT_LINK =
  "font-semibold text-brand-gradient hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0855FD] focus-visible:ring-offset-2 rounded-sm";

export default function Page() {
  return (
    <>
      <JsonLd
        data={[buildBreadcrumbSchema(crumbs), buildServiceSchema(), buildHowToSchema()]}
      />
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

          {SERVICE_GROUPS.map((group, groupIndex) => {
            const inGroup = SERVICES.filter((service) => service.group === group.id);
            const primary = inGroup.filter((service) => service.tier === "primary");
            const secondary = inGroup.filter(
              (service) => service.tier === "secondary" && service.path !== group.umbrellaPath
            );
            const umbrella = group.umbrellaPath ? findService(group.umbrellaPath) : null;
            const headingId = `grupo-${group.id}`;

            return (
              <section
                key={group.id}
                aria-labelledby={headingId}
                className={groupIndex % 2 === 0 ? "bg-white py-20" : "bg-[#F8FAFC] py-20"}
              >
                <div className="container mx-auto max-w-5xl px-6">
                  <h2
                    id={headingId}
                    className="mb-3 text-3xl font-extrabold tracking-tight sm:text-4xl"
                  >
                    <span className="text-slate-900">{group.label}</span>
                  </h2>
                  <p className="mb-10 max-w-2xl text-base font-light leading-relaxed text-slate-600">
                    {es.contentHubs.servicios.groupIntro[group.id]}
                  </p>

                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {primary.map((service) => {
                      const Icon = SERVICE_ICONS[service.icon];
                      return (
                        <Link
                          key={service.key}
                          href={service.path}
                          className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#0855FD]/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0855FD] focus-visible:ring-offset-2"
                        >
                          <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#0855FD]/10">
                            <Icon aria-hidden="true" className="h-5 w-5 icon-brand-gradient" />
                          </span>
                          <h3 className="mb-2.5 text-lg font-semibold leading-snug text-[#071540]">
                            {service.label}
                          </h3>
                          <p className="mb-5 flex-1 text-sm font-light leading-relaxed text-slate-600">
                            {service.benefit}
                          </p>
                          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-gradient">
                            {hub.cardCta}
                            <ArrowRight
                              aria-hidden="true"
                              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                            />
                          </span>
                        </Link>
                      );
                    })}
                  </div>

                  {(umbrella || secondary.length > 0) && (
                    <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-light text-slate-600">
                      {umbrella && (
                        <span>
                          {UMBRELLA_INTRO}{" "}
                          <Link href={umbrella.path} className={SUPPORT_LINK}>
                            {umbrella.label}
                          </Link>
                        </span>
                      )}
                      {secondary.length > 0 && (
                        <span>
                          {SECONDARY_INTRO}{" "}
                          {secondary.map((service, index) => (
                            <span key={service.key}>
                              {index > 0 && <span aria-hidden> · </span>}
                              <Link href={service.path} className={SUPPORT_LINK}>
                                {service.label}
                              </Link>
                            </span>
                          ))}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </section>
            );
          })}

          {/* Los mismos cuatro pasos que ven las páginas de servicio. Aquí
              también se emiten como HowTo: el marcado describe contenido que
              está en esta página, no una promesa abstracta. */}
          <section aria-labelledby="servicios-proceso" className="bg-white py-20">
            <div className="container mx-auto max-w-5xl px-6">
              <h2
                id="servicios-proceso"
                className="mb-10 text-3xl font-extrabold tracking-tight sm:text-4xl"
              >
                <span className="text-slate-900">{es.servicePages.common.processHeadingNormal}</span>
                <span className="text-brand-gradient">
                  {es.servicePages.common.processHeadingAccent}
                </span>
              </h2>
              <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {es.servicePages.common.processSteps.map((step, index) => (
                  <li
                    key={step.title}
                    className="rounded-2xl border border-slate-200 bg-white p-6"
                  >
                    <span
                      aria-hidden="true"
                      className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl bg-[#0855FD]/10 text-sm font-bold text-brand-gradient"
                    >
                      {index + 1}
                    </span>
                    <h3 className="mb-2 text-base font-semibold text-[#071540]">
                      <span className="sr-only">Paso {index + 1}: </span>
                      {step.title}
                    </h3>
                    <p className="text-sm font-light leading-relaxed text-slate-600">
                      {step.description}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section aria-labelledby="servicios-cierre" className="bg-[#F8FAFC] pb-24 pt-16">
            <div className="container mx-auto max-w-5xl px-6">
              <div className="rounded-3xl bg-gradient-to-br from-[#071540] via-[#0B2A7A] to-[#3B1585] px-8 py-12 text-center sm:px-14">
                <h2
                  id="servicios-cierre"
                  className="mb-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
                >
                  {hub.closingHeading}
                </h2>
                <p className="mx-auto mb-8 max-w-2xl text-base font-light leading-relaxed text-white/90">
                  {hub.closingText}
                </p>
                <Link
                  href="/#contacto"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3 text-base font-semibold text-[#071540] transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#071540]"
                >
                  {hub.closingCta}
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
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
