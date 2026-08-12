"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsappButton from "@/components/ui/floating-whatsapp-button";
import { useI18n } from "@/lib/i18n";
import es from "@/locales/es.json";

/**
 * El 404 era un callejón duro: sin navbar, sin footer y con un único enlace a
 * la home. Quien aterriza aquí suele venir de un enlace roto o de un resultado
 * de búsqueda desactualizado — es decir, ya tenía intención. Devolverlo al
 * inicio y que se apañe desperdicia esa visita.
 */
const SUGGESTIONS = [
  { href: "/servicios", key: "servicios" },
  { href: "/casos", key: "casos" },
  { href: "/recursos", key: "recursos" },
  { href: "/equipo", key: "equipo" },
] as const;

const NotFound = () => {
  const { t } = useI18n();

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white">
      <Navbar />
      <main id="contenido-principal" tabIndex={-1} className="bg-[#F0F4FF] pb-24 pt-36">
        <div className="container mx-auto max-w-3xl px-6 text-center">
          <p
            aria-hidden="true"
            className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-brand-gradient"
          >
            Error 404
          </p>
          <h1 className="mb-5 text-4xl font-light tracking-tight text-[#071540] md:text-5xl">
            {t("notFound.title")}
          </h1>
          <p className="mx-auto mb-10 max-w-xl text-lg font-light leading-relaxed text-slate-700">
            {t("notFound.description")}
          </p>

          <nav aria-label={es.notFound.suggestionsLabel} className="mb-10">
            <ul className="mx-auto grid max-w-xl gap-3 sm:grid-cols-2">
              {SUGGESTIONS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white px-5 py-4 text-left text-sm font-semibold text-[#071540] transition-all hover:border-[#0855FD]/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0855FD] focus-visible:ring-offset-2"
                  >
                    {es.notFound.suggestions[item.key]}
                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 icon-brand-gradient transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-8 py-3.5 text-base font-medium text-white shadow-[0_18px_60px_rgba(47,100,255,0.35)] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0855FD] focus-visible:ring-offset-2"
          >
            {t("notFound.cta")}
          </Link>
        </div>
      </main>
      <Footer />
      <FloatingWhatsappButton />
    </div>
  );
};

export default NotFound;
