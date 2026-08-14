"use client";

import Link from "next/link";
import { motion, useReducedMotion, type MotionProps } from "framer-motion";
import { AlertCircle, ArrowRight, Check, ExternalLink, MapPin, Quote, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import FloatingWhatsappButton from "@/components/ui/floating-whatsapp-button";
import Breadcrumbs, { type Crumb } from "@/components/Breadcrumbs";
import { buildReveal } from "@/lib/reveal";
import { scrollToSection } from "@/lib/utils";
import type { CaseStudy } from "@/content/types";
import es from "@/locales/es.json";

const labels = es.contentHubs.casos;

interface Props {
  caseStudy: CaseStudy;
  breadcrumbs: Crumb[];
  services: { title: string; href: string }[];
  relatedArticles: { title: string; href: string }[];
}

export default function CaseStudyTemplate({
  caseStudy: study,
  breadcrumbs,
  services,
  relatedArticles,
}: Props) {
  const reduceMotion = useReducedMotion();

  const reveal = buildReveal(reduceMotion);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white">
      <Navbar />

      <main id="contenido-principal" tabIndex={-1}>
        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <header className="relative overflow-hidden bg-[#F0F4FF] pb-20 pt-32">
          <div
            className="pointer-events-none absolute -right-40 -top-40 h-[620px] w-[620px] rounded-full opacity-[0.07]"
            style={{ background: "radial-gradient(circle, #0855FD 0%, transparent 70%)" }}
            aria-hidden="true"
          />
          <motion.div
            className="container relative z-10 mx-auto max-w-4xl px-6"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Breadcrumbs items={breadcrumbs} />

            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#0855FD]/25 bg-white/70 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-brand-gradient shadow-sm backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-gradient" aria-hidden="true" />
              {labels.badge} · {study.sector}
            </span>

            <h1 className="mb-6 text-4xl font-light tracking-tight text-[#071540] md:text-6xl">
              {study.heading}
            </h1>
            <p className="mb-8 max-w-3xl text-lg font-light leading-relaxed text-slate-700">
              {study.summary}
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-[#0855FD]/15 pt-6">
              <span className="text-base font-bold text-[#071540]">{study.client}</span>
              <span className="inline-flex items-center gap-1.5 text-sm text-slate-600">
                <MapPin aria-hidden="true" className="h-4 w-4 text-slate-500" />
                {study.location.city}, {study.location.country}
              </span>
              <a
                href={study.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-gradient hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0855FD] focus-visible:ring-offset-2"
              >
                <ExternalLink aria-hidden="true" className="h-4 w-4" />
                {labels.visitSite}
              </a>
            </div>
          </motion.div>
        </header>

        {/* ── RESULTADOS (arriba: es lo que el visitante vino a ver) ────── */}
        <section aria-labelledby="results-heading" className="bg-white py-20">
          <div className="container mx-auto max-w-5xl px-6">
            <motion.h2
              id="results-heading"
              className="mb-12 text-center text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
              {...reveal()}
            >
              <span className="text-slate-900">Lo que </span>
              <span className="text-brand-gradient">cambió</span>
            </motion.h2>
            <div className="grid gap-5 md:grid-cols-3">
              {study.results.map((result, index) => (
                <motion.div
                  key={result.metric}
                  className="group rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#0855FD]/30 hover:shadow-md"
                  {...reveal(index * 0.06)}
                >
                  <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#0855FD]/10">
                    <TrendingUp aria-hidden="true" className="h-5 w-5 icon-brand-gradient" />
                  </span>
                  <p className="mb-2.5 text-lg font-bold leading-snug text-brand-gradient">
                    {result.metric}
                  </p>
                  <p className="text-sm font-light leading-relaxed text-slate-600">
                    {result.detail}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTEXTO ─────────────────────────────────────────────────── */}
        <section aria-labelledby="context-heading" className="bg-[#F8FAFC] py-20">
          <div className="container mx-auto max-w-3xl px-6">
            <motion.h2
              id="context-heading"
              className="mb-8 text-3xl font-extrabold tracking-tight sm:text-4xl"
              {...reveal()}
            >
              <span className="text-slate-900">El punto de </span>
              <span className="text-brand-gradient">partida</span>
            </motion.h2>
            <motion.div className="prose prose-slate prose-lg max-w-none prose-p:text-slate-700" {...reveal(0.05)}>
              {study.context.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── ANTES / SOLUCIÓN ─────────────────────────────────────────── */}
        <section className="bg-white py-20">
          <div className="container mx-auto grid max-w-6xl gap-6 px-6 lg:grid-cols-2">
            <motion.div
              className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-8"
              {...reveal()}
            >
              <span className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl bg-slate-200/70">
                <AlertCircle aria-hidden="true" className="h-5 w-5 text-slate-600" />
              </span>
              <h2 className="mb-6 text-2xl font-bold tracking-tight text-[#071540]">
                {labels.beforeHeading}
              </h2>
              <ul className="space-y-4">
                {study.before.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-400"
                      aria-hidden="true"
                    />
                    <span className="font-light leading-relaxed text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className="rounded-2xl border border-[#0855FD]/20 bg-white p-8 shadow-[0_8px_40px_rgba(7,21,64,0.06)]"
              {...reveal(0.08)}
            >
              <span className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gradient shadow-[0_8px_20px_rgba(47,100,255,0.28)]">
                <Check aria-hidden="true" className="h-5 w-5 text-white" />
              </span>
              <h2 className="mb-6 text-2xl font-bold tracking-tight text-[#071540]">
                {labels.solutionHeading}
              </h2>
              <ul className="space-y-4">
                {study.solution.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check
                      aria-hidden="true"
                      className="mt-1 h-4 w-4 flex-shrink-0 icon-brand-gradient"
                    />
                    <span className="font-light leading-relaxed text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* ── CITA DEL CLIENTE ─────────────────────────────────────────── */}
        {study.quote && (
          <section className="bg-white pb-20">
            <div className="container mx-auto max-w-4xl px-6">
              <motion.figure
                className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#071540] via-[#0B2A7A] to-[#3B1585] px-8 py-14 text-center shadow-[0_30px_80px_rgba(7,21,64,0.25)] sm:px-14"
                {...reveal()}
              >
                <div
                  className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#752CFC]/25 blur-3xl"
                  aria-hidden="true"
                />
                <div className="relative">
                  <Quote aria-hidden="true" className="mx-auto mb-6 h-9 w-9 text-[#9CC0FF]" />
                  <blockquote className="mx-auto max-w-2xl text-xl font-light italic leading-relaxed text-white sm:text-2xl">
                    “{study.quote.text}”
                  </blockquote>
                  <figcaption className="mt-7 text-sm text-white/70">
                    <span className="block font-semibold text-white">{study.quote.author}</span>
                    {study.quote.role}
                  </figcaption>
                </div>
              </motion.figure>
            </div>
          </section>
        )}

        {/* ── SERVICIOS APLICADOS + CTA ────────────────────────────────── */}
        <section aria-labelledby="services-heading" className="bg-[#F8FAFC] py-20">
          <div className="container mx-auto max-w-3xl px-6 text-center">
            <motion.h2
              id="services-heading"
              className="mb-8 text-2xl font-extrabold tracking-tight sm:text-3xl"
              {...reveal()}
            >
              <span className="text-slate-900">{labels.servicesApplied}</span>
            </motion.h2>

            <motion.div className="mb-10 flex flex-wrap justify-center gap-3" {...reveal(0.05)}>
              {services.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="rounded-full border border-[#0855FD]/30 bg-white px-5 py-2.5 text-sm font-semibold text-brand-gradient transition-all hover:-translate-y-0.5 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0855FD] focus-visible:ring-offset-2"
                >
                  {service.title}
                </Link>
              ))}
            </motion.div>

            {relatedArticles.length > 0 && (
              <motion.div className="mb-10 flex flex-col items-center gap-2" {...reveal(0.1)}>
                {relatedArticles.map((article) => (
                  <Link
                    key={article.href}
                    href={article.href}
                    className="text-sm font-semibold text-brand-gradient hover:underline"
                  >
                    {article.title} →
                  </Link>
                ))}
              </motion.div>
            )}

            <motion.div {...reveal(0.15)}>
              <a
                href="#contacto"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection("contacto");
                }}
                className="group inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-8 py-3.5 text-base font-medium text-white shadow-[0_18px_60px_rgba(47,100,255,0.35)] transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0855FD] focus-visible:ring-offset-2"
              >
                Solicitar diagnóstico
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                />
              </a>
              <div className="mt-8">
                <Link
                  href="/casos"
                  className="text-sm font-medium text-slate-600 transition-colors hover:text-[#0855FD]"
                >
                  {labels.backToHub}
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <Contact />
      </main>

      <Footer />
      <FloatingWhatsappButton />
    </div>
  );
}
