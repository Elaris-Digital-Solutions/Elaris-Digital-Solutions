import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Timeline } from '@/components/ui/timeline'
import { ArrowRight, Bot, Code2, FileCode2, LineChart, Network, Stars } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import { scrollToSection } from '@/lib/utils'

const processSteps = [
  { key: 'analysis', Icon: Network },
  { key: 'design', Icon: FileCode2 },
  { key: 'development', Icon: Code2 },
  { key: 'testing', Icon: LineChart },
  { key: 'deployment', Icon: Bot },
  { key: 'support', Icon: Stars },
]

export default function Process() {
  const { t } = useI18n()

  const processData = useMemo(() => processSteps.map(({ key, Icon }) => ({
    title: t(`process.steps.${key}.title`),
    content: (
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="p-2 rounded-lg bg-blue-500/10">
            <Icon className="w-6 h-6 icon-brand-gradient" />
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2 text-brand-gradient">
              {t(`process.steps.${key}.heading`)}
            </h4>
            <p className="text-black text-sm md:text-base">
              {t(`process.steps.${key}.description`)}
            </p>
          </div>
        </div>
      </div>
    ),
  })), [t])

  return (
    <section id="estandares" className="py-12 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-8" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <h2 className="text-3xl font-extrabold tracking-tight drop-shadow-lg sm:text-4xl lg:text-5xl">
            <span className="text-slate-900">{t('process.headingNormal')}</span><span className="text-brand-gradient">{t('process.headingAccent')}</span>
          </h2>
          <p className="text-lg text-black max-w-2xl mx-auto mt-4">
            {t('process.description')}
          </p>
        </motion.div>
        <Timeline data={processData} />

        <div className="mt-12 text-center">
          <a
            href="#contacto"
            onClick={(event) => {
              event.preventDefault();
              scrollToSection("contacto");
            }}
            className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-8 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(47,100,255,0.3)] transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0855FD] focus-visible:ring-offset-2"
          >
            Solicitar diagnóstico
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
