import Link from "next/link";
import { ArrowRight } from "lucide-react";
import es from "@/locales/es.json";

/**
 * Cierre de los hubs de contenido (/casos, /recursos, /equipo).
 *
 * Los tres eran callejones sin salida: tarjetas hacia el detalle y nada más.
 * Quien llega a un hub desde Google ya mostró interés — dejarlo sin siguiente
 * paso desperdicia la visita más cualificada que tenemos.
 *
 * Es un componente de servidor: sin estado, sin animación, sin coste de JS.
 */
export default function HubCta({ text }: { text: string }) {
  return (
    <section aria-labelledby="hub-cta-heading" className="bg-white pb-24 pt-8">
      <div className="container mx-auto max-w-5xl px-6">
        <div className="rounded-3xl bg-gradient-to-br from-[#071540] via-[#0B2A7A] to-[#3B1585] px-8 py-12 text-center sm:px-14">
          <h2
            id="hub-cta-heading"
            className="mb-4 text-2xl font-extrabold tracking-tight text-white sm:text-3xl"
          >
            {es.contentHubs.ctaHeading}
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-base font-light leading-relaxed text-white/90">
            {text}
          </p>
          <Link
            href="/#contacto"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3 text-base font-semibold text-[#071540] transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#071540]"
          >
            {es.servicePages.common.ctaPrimary}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
