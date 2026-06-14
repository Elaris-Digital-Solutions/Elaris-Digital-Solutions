import { motion } from "framer-motion";
import es from "@/locales/es.json";

const copy = es.socialProof;

export default function SocialProof() {
  return (
    <section className="bg-[#071540] py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="mb-10 text-center text-xs font-semibold uppercase tracking-[0.18em] text-white/50 sm:text-sm">
          {copy.intro}
        </p>
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-6">
          {copy.items.map((item, index) => (
            <motion.div
              key={item.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
            >
              <div className="mb-2 text-4xl font-bold tracking-tight text-[#2F64FF] sm:text-5xl">
                {item.value}
              </div>
              <p className="mx-auto max-w-[14rem] text-sm leading-snug text-white/70">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
