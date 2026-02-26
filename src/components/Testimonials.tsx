import React from 'react'
import CircularTestimonials from '@/components/ui/circular-testimonials'
import { useI18n } from '@/lib/i18n'

const testimonialSlugs = ["daniela", "milagros", "martina"] as const

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
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] left-[10%] w-[50%] h-[50%] bg-blue-100/50 rounded-full blur-3xl" />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold tracking-tight drop-shadow-lg sm:text-4xl lg:text-5xl">
            <span className="text-slate-900">{t('testimonials.headingNormal')}</span><span style={{ color: '#2F64FF' }}>{t('testimonials.headingAccent')}</span>
          </h2>
          <p className="text-lg text-black max-w-2xl mx-auto mt-4">
            {t('testimonials.description')}
          </p>
        </div>
        <div className="p-4 rounded-3xl min-h-[300px] flex flex-wrap gap-6 items-center justify-center relative text-slate-900 bg-transparent">
          <div className="items-center justify-center relative flex" style={{ maxWidth: '1024px' }}>
            <CircularTestimonials
              testimonials={testimonials}
              autoplay={true}
              fontSizes={{ name: '28px', designation: '20px', quote: '20px' }}
              colors={{ 
                arrowBackground: '#f8fafc',
                arrowForeground: '#2F64FF',
                arrowHoverBackground: '#e2e8f0'
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
