import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import es from "@/locales/es.json";

const copy = es.homeFaq;

const FaqItem = ({ faq }: { faq: { q: string; a: string } }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-200 py-6">
      <button
        onClick={() => setOpen(!open)}
        className="group flex w-full items-center justify-between gap-6 text-left"
      >
        <span
          className={`text-base font-semibold leading-snug transition-colors duration-200 ${
            open ? "text-[#2F64FF]" : "text-[#071540] group-hover:text-[#2F64FF]"
          }`}
        >
          {faq.q}
        </span>
        <ChevronDown
          className={`h-5 w-5 flex-shrink-0 transition-all duration-300 ${
            open ? "rotate-180 text-[#2F64FF]" : "text-slate-400 group-hover:text-[#2F64FF]"
          }`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <p className="pt-4 text-sm font-light leading-relaxed text-slate-500">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function FaqHome() {
  return (
    <section id="faq" className="py-20 sm:py-32">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            <span className="text-slate-900">{copy.headingNormal}</span>
            <span style={{ color: "#2F64FF" }}>{copy.headingAccent}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-black">{copy.description}</p>
          <a
            href="#contacto"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#2F64FF]/30 px-7 py-3 text-sm font-semibold text-[#2F64FF] transition-all duration-200 hover:bg-[#2F64FF] hover:text-white"
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
