import React from 'react'
import { motion } from 'framer-motion'
import CircularTestimonials from '@/components/ui/circular-testimonials'
import { useI18n } from '@/lib/i18n'

const testimonialSlugs = ["milagros", "daniela"] as const

// Module-level constant — never recreated
const innerStyle = { maxWidth: '1024px' } as const

export default function Testimonials() {
  const { t } = useI18n()
  const testimonials = React.useMemo(
    () =>
      testimonialSlugs.map((slug) => ({
        quote: t(`testimonials.items.${slug}.quote`),
        name: t(`testimonials.items.${slug}.name`),
        designation: t(`testimonials.items.${slug}.designation`),
        src: t(`testimonials.items.${slug}.src`),
      })),
    [t]
  )

  return (
    <section id="clientes" className="py-20 sm:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div className="text-center mb-12" initial={{ y: 24 }} whileInView={{ y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            <span className="text-slate-900">{t('testimonials.headingNormal')}</span><span className="text-brand-gradient">{t('testimonials.headingAccent')}</span>
          </h2>
          <p className="text-lg text-black max-w-2xl mx-auto mt-4">
            {t('testimonials.description')}
          </p>
        </motion.div>
        <div className="p-4 rounded-3xl min-h-[300px] flex flex-wrap gap-6 items-center justify-center relative text-slate-900 bg-transparent">
          <div className="items-center justify-center relative flex" style={innerStyle}>
            <CircularTestimonials
              testimonials={testimonials}
              autoplay={true}
              fontSizes={{ name: '28px', designation: '20px', quote: '20px' }}
              colors={{
                // El gris por defecto (#6b7280) se queda en 4.39:1 sobre el
                // lavanda de la sección; slate-600 sube a 6.9:1.
                designation: '#475569',
                arrowBackground: '#f8fafc',
                arrowForeground: '#0855FD',
                arrowHoverBackground: '#e2e8f0'
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
