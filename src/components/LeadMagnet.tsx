import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import es from "@/locales/es.json";

const copy = es.leadMagnet;

const WHATSAPP_URL =
  "https://wa.me/51973663807?text=" +
  encodeURIComponent(
    "Hola Elaris, quiero el checklist «30 procesos que mi empresa puede automatizar»."
  );

export default function LeadMagnet() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#071540] via-[#0B2A7A] to-[#3B1585] px-8 py-12 shadow-[0_30px_80px_rgba(7,21,64,0.25)] sm:px-14 sm:py-16"
          initial={{ y: 32 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#752CFC]/25 blur-3xl"
            aria-hidden
          />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] text-[#7EABFF]">
                {copy.badge}
              </span>
              <h2 className="mb-4 text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
                {copy.title}
              </h2>
              <p className="mb-6 max-w-2xl text-base font-light leading-relaxed text-white/85">
                {copy.description}
              </p>
              <ul className="space-y-3">
                {copy.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3 text-sm text-white/85">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#0855FD]/20 text-[#7EABFF]">
                      <Check className="h-3 w-3" />
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col items-start gap-3 lg:items-center">
              {/* Es el único activo con puerta del sitio y no medía nada: sin
                  este evento no hay forma de saber si el checklist trae leads
                  ni de qué canal vienen. */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("lead_magnet_click", { location: "home_checklist" })}
                className="group inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-brand-gradient px-8 py-4 text-sm font-semibold text-white shadow-[0_12px_32px_rgba(47,100,255,0.4)] transition-all hover:-translate-y-0.5 hover:bg-[#0745DA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#071540]"
              >
                {copy.cta}
                <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              {/* white/70 sobre el degradado oscuro no llega a 4.5:1 en el
                  extremo violeta; /85 sí. */}
              <p className="text-xs text-white/85">{copy.note}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
