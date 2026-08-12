"use client";

import { useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion, type MotionProps } from "framer-motion";
import { ArrowRight, CalendarDays, ChevronDown, Clock, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import FloatingWhatsappButton from "@/components/ui/floating-whatsapp-button";
import Breadcrumbs, { type Crumb } from "@/components/Breadcrumbs";
import { RichText } from "@/components/ui/rich-text";
import { scrollToSection } from "@/lib/utils";
import type { Article } from "@/content/types";
import es from "@/locales/es.json";

const labels = es.contentHubs.recursos;

const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("es-PE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const FaqItem = ({ item }: { item: { q: string; a: string } }) => {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="border-b border-slate-200">
      <h3>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls={panelId}
          className="group flex w-full items-center justify-between gap-6 rounded-lg py-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0855FD] focus-visible:ring-offset-2"
        >
          <span
            className={`text-base font-semibold leading-snug transition-colors duration-200 ${
              open ? "text-brand-gradient" : "text-[#071540] group-hover:text-[#0855FD]"
            }`}
          >
            {item.q}
          </span>
          <span
            className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
              open
                ? "rotate-180 border-[#0855FD]/30 bg-[#0855FD]/10"
                : "border-slate-200 group-hover:border-[#0855FD]/30"
            }`}
          >
            <ChevronDown
              aria-hidden="true"
              className={`h-4 w-4 transition-colors ${open ? "icon-brand-gradient" : "text-slate-500"}`}
            />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 pr-14 text-sm font-light leading-relaxed text-slate-600">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface Props {
  article: Article;
  breadcrumbs: Crumb[];
  author: { name: string; role: string; href: string; photo: string } | null;
  relatedCase: {
    client: string;
    summary: string;
    href: string;
    sector: string;
    metric: string;
  } | null;
  /** Servicio que vende el artículo, derivado de `article.servicePath`. */
  relatedService: { label: string; benefit: string; href: string } | null;
}

export default function ArticleTemplate({
  article,
  breadcrumbs,
  author,
  relatedCase,
  relatedService,
}: Props) {
  const reduceMotion = useReducedMotion();

  const reveal = (delay = 0): MotionProps =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.15 },
          transition: { duration: 0.5, ease: "easeOut", delay },
        };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white">
      <Navbar />

      {/* Sin `site-sections`: la alternancia por posición partía el cuerpo del
          artículo en bandas de color a mitad de lectura. Aquí los fondos se
          eligen a propósito. */}
      <main id="contenido-principal" tabIndex={-1}>
        {/* ── CABECERA ─────────────────────────────────────────────────── */}
        <header className="relative overflow-hidden bg-[#F0F4FF] pb-20 pt-32">
          <div
            className="pointer-events-none absolute -right-40 -top-40 h-[620px] w-[620px] rounded-full opacity-[0.07]"
            style={{ background: "radial-gradient(circle, #0855FD 0%, transparent 70%)" }}
            aria-hidden="true"
          />
          <motion.div
            className="container relative z-10 mx-auto max-w-3xl px-6"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Breadcrumbs items={breadcrumbs} />

            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#0855FD]/25 bg-white/70 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-brand-gradient shadow-sm backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-gradient" aria-hidden="true" />
              {labels.badge}
            </span>

            <h1 className="mb-8 text-4xl font-light tracking-tight text-[#071540] md:text-5xl">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-[#0855FD]/15 pt-6 text-sm text-slate-600">
              {author && (
                <Link
                  href={author.href}
                  className="group inline-flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0855FD] focus-visible:ring-offset-2"
                >
                  <span className="h-10 w-10 overflow-hidden rounded-full border-2 border-brand-gradient">
                    <Image
                      src={author.photo}
                      alt=""
                      width={40}
                      height={40}
                      className="h-full w-full object-cover"
                    />
                  </span>
                  <span className="leading-tight">
                    <span className="block font-semibold text-brand-gradient group-hover:underline">
                      {author.name}
                    </span>
                    <span className="block text-xs text-slate-600">{author.role}</span>
                  </span>
                </Link>
              )}
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays aria-hidden="true" className="h-4 w-4 text-slate-500" />
                <time dateTime={article.publishDate}>{formatDate(article.publishDate)}</time>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock aria-hidden="true" className="h-4 w-4 text-slate-500" />
                {article.readMinutes} {labels.minRead}
              </span>
            </div>
          </motion.div>
        </header>

        {/* ── CUERPO ───────────────────────────────────────────────────── */}
        {/* Sin animaciones de aparición: el texto principal nunca debe
            depender de JS para ser visible ni empezar en opacity 0. */}
        <section className="bg-white pb-16 pt-20">
          <div className="container mx-auto max-w-3xl px-6">
            <div className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-[#071540] prose-h2:mt-14 prose-h2:text-2xl sm:prose-h2:text-3xl prose-p:text-slate-700 prose-a:no-underline prose-li:text-slate-700">
              {article.intro.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="text-xl leading-relaxed">
                  <RichText text={paragraph} />
                </p>
              ))}

              {article.sections.map((section) => (
                <section key={section.h2}>
                  <h2>{section.h2}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)}>
                      <RichText text={paragraph} />
                    </p>
                  ))}
                  {section.list && (
                    <ul className="marker:text-[#0855FD]">
                      {section.list.map((item) => (
                        <li key={item.slice(0, 40)}>
                          <RichText text={item} />
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────── */}
        {article.faq.length > 0 && (
          <section aria-labelledby="faq-heading" className="bg-white py-16">
            <div className="container mx-auto max-w-3xl px-6">
              <motion.h2
                id="faq-heading"
                className="mb-8 text-3xl font-extrabold tracking-tight sm:text-4xl"
                {...reveal()}
              >
                <span className="text-slate-900">Preguntas </span>
                <span className="text-brand-gradient">frecuentes</span>
              </motion.h2>
              <div className="border-t border-slate-200">
                {article.faq.map((item) => (
                  <FaqItem key={item.q} item={item} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── SERVICIO RELACIONADO ─────────────────────────────────────────
            Cierra el enlazado guía → servicio. Antes `article.servicePath`
            existía en los seis artículos pero no lo leía nadie: el único
            camino a la página comercial eran anclas escritas a mano dentro de
            los párrafos. */}
        {relatedService && (
          <section aria-labelledby="related-service-heading" className="bg-white pt-16">
            <div className="container mx-auto max-w-3xl px-6">
              <motion.h2
                id="related-service-heading"
                className="mb-6 text-2xl font-extrabold tracking-tight sm:text-3xl"
                {...reveal()}
              >
                <span className="text-slate-900">{labels.serviceHeadingNormal}</span>
                <span className="text-brand-gradient">{labels.serviceHeadingAccent}</span>
              </motion.h2>
              <motion.div {...reveal(0.05)}>
                <Link
                  href={relatedService.href}
                  className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#0855FD]/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0855FD] focus-visible:ring-offset-2"
                >
                  <h3 className="mb-2 text-lg font-semibold text-[#071540]">
                    {relatedService.label}
                  </h3>
                  <p className="mb-4 text-sm font-light leading-relaxed text-slate-600">
                    {relatedService.benefit}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-gradient">
                    {labels.serviceCta}
                    <ArrowRight
                      aria-hidden="true"
                      className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </motion.div>
            </div>
          </section>
        )}

        {/* ── CTA ──────────────────────────────────────────────────────── */}
        <section className="bg-white py-16">
          <div className="container mx-auto max-w-3xl px-6">
            <motion.div
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#071540] via-[#0B2A7A] to-[#3B1585] px-8 py-14 text-center shadow-[0_30px_80px_rgba(7,21,64,0.25)] sm:px-14"
              {...reveal()}
            >
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#752CFC]/25 blur-3xl"
                aria-hidden="true"
              />
              <div className="relative">
                <h2 className="mb-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  {labels.ctaHeading}
                </h2>
                <p className="mx-auto mb-8 max-w-xl text-base font-light leading-relaxed text-white/80">
                  {labels.ctaText}
                </p>
                <a
                  href="#contacto"
                  onClick={(event) => {
                    event.preventDefault();
                    scrollToSection("contacto");
                  }}
                  className="group inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-[#071540] shadow-[0_18px_60px_rgba(0,0,0,0.25)] transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#071540]"
                >
                  {article.ctaText}
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── CASO RELACIONADO ─────────────────────────────────────────── */}
        {relatedCase && (
          <section aria-labelledby="related-case-heading" className="bg-[#F8FAFC] py-16">
            <div className="container mx-auto max-w-3xl px-6">
              <motion.h2
                id="related-case-heading"
                className="mb-6 text-2xl font-extrabold tracking-tight sm:text-3xl"
                {...reveal()}
              >
                <span className="text-slate-900">Caso </span>
                <span className="text-brand-gradient">relacionado</span>
              </motion.h2>
              <motion.div {...reveal(0.05)}>
                <Link
                  href={relatedCase.href}
                  className="group block rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0855FD]/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0855FD] focus-visible:ring-offset-2"
                >
                  <p className="mb-1.5 text-xs font-bold uppercase tracking-widest text-brand-gradient">
                    {relatedCase.sector}
                  </p>
                  <h3 className="mb-2 text-xl font-semibold text-[#071540]">
                    {relatedCase.client}
                  </h3>
                  <p className="mb-4 text-sm font-light leading-relaxed text-slate-600">
                    {relatedCase.summary}
                  </p>
                  <p className="mb-4 flex items-start gap-2 rounded-xl bg-[#F0F4FF] px-4 py-3 text-sm font-semibold text-[#071540]">
                    <TrendingUp aria-hidden="true" className="mt-0.5 h-4 w-4 flex-shrink-0 icon-brand-gradient" />
                    {relatedCase.metric}
                  </p>
                  <span className="text-sm font-semibold text-brand-gradient">
                    {es.contentHubs.casos.readCase} →
                  </span>
                </Link>
              </motion.div>

              <div className="mt-8">
                <Link
                  href="/recursos"
                  className="text-sm font-medium text-slate-600 transition-colors hover:text-[#0855FD]"
                >
                  {labels.backToHub}
                </Link>
              </div>
            </div>
          </section>
        )}

        <Contact />
      </main>

      <Footer />
      <FloatingWhatsappButton />
    </div>
  );
}
