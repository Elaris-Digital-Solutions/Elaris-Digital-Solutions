import { useId, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FaqPanel } from "@/components/ui/faq-panel";
import es from "@/locales/es.json";

const copy = es.homeFaq;

const FaqItem = ({ faq }: { faq: { q: string; a: string } }) => {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="border-b border-slate-200 py-6">
      {/* El disparador va dentro de un encabezado: así un lector de pantalla
          puede recorrer las preguntas por su lista de encabezados en vez de
          tabular por todas. Mismo patrón que ServicePageTemplate. */}
      <h3>
        <button
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls={panelId}
          className="group flex w-full items-center justify-between gap-6 rounded-lg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0855FD] focus-visible:ring-offset-2"
        >
          <span
            className={`text-base font-semibold leading-snug transition-colors duration-200 ${
              open ? "text-brand-gradient" : "text-[#071540] group-hover:text-[#0855FD]"
            }`}
          >
            {faq.q}
          </span>
          <ChevronDown
            aria-hidden="true"
            className={`h-5 w-5 flex-shrink-0 transition-all duration-300 ${
              open ? "rotate-180 icon-brand-gradient" : "text-slate-400 group-hover:text-[#0855FD]"
            }`}
          />
        </button>
      </h3>
      <FaqPanel id={panelId} open={open}>
        <p className="pt-4 text-sm font-light leading-relaxed text-slate-600">{faq.a}</p>
      </FaqPanel>
    </div>
  );
};

export default function FaqHome() {
  return (
    <section id="faq" className="py-20 sm:py-32">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-12 text-center"
          initial={{ y: 24 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            <span className="text-slate-900">{copy.headingNormal}</span>
            <span className="text-brand-gradient">{copy.headingAccent}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-black">{copy.description}</p>
          <a
            href="#contacto"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#0855FD]/30 px-7 py-3 text-sm font-semibold text-brand-gradient transition-all duration-200 hover:bg-brand-gradient hover:text-white"
          >
            {copy.ctaLabel}
          </a>
        </motion.div>

        <div className="mx-auto grid max-w-5xl gap-x-12 md:grid-cols-2 lg:gap-x-20">
          {copy.items.map((item, index) => (
            <FaqItem key={index} faq={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
