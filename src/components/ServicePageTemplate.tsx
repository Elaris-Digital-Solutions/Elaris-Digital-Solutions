"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion, type MotionProps } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  BarChart3,
  CalendarClock,
  Check,
  ChevronDown,
  ClipboardCheck,
  ClipboardList,
  CreditCard,
  FileBarChart,
  FileEdit,
  FileText,
  Gauge,
  GraduationCap,
  Layers,
  LayoutDashboard,
  LifeBuoy,
  LineChart,
  Map,
  MapPin,
  MessageSquare,
  Package,
  Palette,
  Plug,
  Radio,
  Search,
  Server,
  ShieldCheck,
  Smartphone,
  Stethoscope,
  Store,
  Target,
  TrendingUp,
  Truck,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import FloatingWhatsappButton from "@/components/ui/floating-whatsapp-button";
import { NeuralNoise } from "@/components/ui/neural-noise-cursor";
import Breadcrumbs, { type Crumb } from "@/components/Breadcrumbs";
import { FaqPanel } from "@/components/ui/faq-panel";
import { buildReveal } from "@/lib/reveal";
import { RichText } from "@/components/ui/rich-text";
import { scrollToSection } from "@/lib/utils";
import es from "@/locales/es.json";

const common = es.servicePages.common;

/** Iconos referenciados por nombre desde es.json. Fallback a Check si falta. */
const ICONS: Record<string, React.ElementType> = {
  BarChart3, CalendarClock, ClipboardCheck, ClipboardList, CreditCard,
  FileBarChart, FileEdit, FileText, Gauge, GraduationCap, Layers,
  LayoutDashboard, LifeBuoy, LineChart, Map, MapPin, MessageSquare, Package,
  Palette, Plug, Radio, Search, Server, ShieldCheck, Smartphone, Stethoscope,
  Store, Target, Truck,
};

export interface ServicePageCopy {
  hero: { badge: string; title: string; subtitle: string };
  pains: string[];
  includes: { title: string; text: string; icon?: string }[];
  caseStudy: {
    name: string;
    text: string;
    metric: string;
    url: string;
    /** Ruta interna al caso completo en /casos. */
    casePath?: string;
  } | null;
  /** Guías de /recursos relacionadas con este servicio. */
  related?: { label: string; href: string }[];
  faq: { q: string; a: string }[];
}

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
      <FaqPanel id={panelId} open={open}>
        <p className="pb-6 pr-14 text-sm font-light leading-relaxed text-slate-600">{item.a}</p>
      </FaqPanel>
    </div>
  );
};

export default function ServicePageTemplate({
  copy,
  illustration,
  breadcrumbs,
}: {
  copy: ServicePageCopy;
  /** Visual opcional que se muestra al cierre de "Qué incluye". */
  illustration?: React.ReactNode;
  /** Los mismos que se pasan a `buildBreadcrumbSchema` en la página. */
  breadcrumbs?: Crumb[];
}) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const reveal = buildReveal(reduceMotion);

  return (
    <div className="relative min-h-screen overflow-x-hidden overflow-y-auto bg-white">
      <Navbar />

      {/* `site-sections` devuelve la alternancia de fondos de globals.css: los
          colores los decide esa regla por posición, no las clases `bg-*` de
          cada sección. */}
      <main id="contenido-principal" tabIndex={-1} className="site-sections">
        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
          {/* Capa animada de marca — misma que el hero del home */}
          <div className="absolute inset-0 z-0">
            <NeuralNoise
              opacity={0.8}
              pointerStrength={1.2}
              timeScale={0.5}
              className="absolute inset-0"
            />
          </div>

          <motion.div
            className="container relative z-10 mx-auto max-w-4xl px-6 pb-16 pt-32 text-center"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Las migas van dentro del hero centrado, así que se centran con
                un contenedor flex. Los mismos `items` alimentan el JSON-LD:
                Google exige que el marcado y lo visible coincidan. */}
            {breadcrumbs && breadcrumbs.length > 0 && (
              <div className="flex justify-center">
                <Breadcrumbs items={breadcrumbs} />
              </div>
            )}
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#0855FD]/25 bg-white/70 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-brand-gradient shadow-sm backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-gradient" aria-hidden="true" />
              {copy.hero.badge}
            </span>
            <h1 className="mb-6 text-4xl font-light tracking-tight text-[#071540] md:text-6xl">
              {copy.hero.title}
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg font-light leading-relaxed text-slate-700">
              {copy.hero.subtitle}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="#contacto"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection("contacto");
                }}
                className="group inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-8 py-3.5 text-base font-medium text-white shadow-[0_18px_60px_rgba(47,100,255,0.35)] transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0855FD] focus-visible:ring-offset-2"
              >
                {common.ctaPrimary}
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                />
              </a>
              <Link
                href="/#portafolio"
                className="inline-flex items-center rounded-xl border border-[#0855FD]/30 bg-white/70 px-8 py-3.5 text-base font-medium text-brand-gradient backdrop-blur-md transition-colors duration-300 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0855FD] focus-visible:ring-offset-2"
              >
                {common.ctaSecondary}
              </Link>
            </div>
          </motion.div>
        </section>

        {/* ── ¿TE SUENA? ───────────────────────────────────────────────────── */}
        <section aria-labelledby="pains-heading" className="py-20 lg:py-24">
          <div className="container mx-auto max-w-5xl px-6">
            <motion.h2
              id="pains-heading"
              className="mb-12 text-center text-2xl font-semibold leading-snug text-[#071540] sm:text-3xl"
              {...reveal()}
            >
              {common.painsIntro}
            </motion.h2>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {copy.pains.map((pain, index) => (
                <motion.li
                  key={pain}
                  className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-6 transition-colors duration-300 hover:border-[#0855FD]/30"
                  {...reveal(index * 0.06)}
                >
                  <AlertCircle
                    aria-hidden="true"
                    className="mt-0.5 h-5 w-5 flex-shrink-0 icon-brand-gradient"
                  />
                  <p className="text-base font-light leading-relaxed text-slate-700">{pain}</p>
                </motion.li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── QUÉ INCLUYE ──────────────────────────────────────────────────── */}
        <section
          aria-labelledby="includes-heading"
          className="relative overflow-hidden py-20 lg:py-28"
        >
          <div
            className="pointer-events-none absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full opacity-[0.05]"
            style={{ background: "radial-gradient(circle, #0855FD 0%, transparent 70%)" }}
            aria-hidden="true"
          />
          <div className="container relative z-10 mx-auto max-w-6xl px-6">
            <motion.h2
              id="includes-heading"
              className="mb-14 text-center text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
              {...reveal()}
            >
              <span className="text-slate-900">{common.includesHeadingNormal}</span>
              <span className="text-brand-gradient">{common.includesHeadingAccent}</span>
            </motion.h2>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {copy.includes.map((item, index) => {
                const Icon = (item.icon && ICONS[item.icon]) || Check;
                return (
                  <motion.article
                    key={item.title}
                    className="rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:border-[#0855FD]/30 hover:shadow-md"
                    {...reveal(index * 0.06)}
                  >
                    <span className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-[#0855FD]/10">
                      <Icon aria-hidden="true" className="h-4 w-4 icon-brand-gradient" />
                    </span>
                    <h3 className="mb-2.5 text-lg font-semibold leading-snug text-[#071540]">
                      {item.title}
                    </h3>
                    {/* RichText y no texto plano: permite enlazar servicios
                        relacionados desde dentro del propio bloque. La puerta
                        de link-integrity valida esas rutas en cada build. */}
                    <p className="text-sm font-light leading-relaxed text-slate-600">
                      <RichText text={item.text} />
                    </p>
                  </motion.article>
                );
              })}
            </div>

            {illustration && <div className="mt-14">{illustration}</div>}
          </div>
        </section>

        {/* ── CASO REAL ────────────────────────────────────────────────────── */}
        {copy.caseStudy && (
          <section aria-labelledby="case-heading" className="py-20 lg:py-24">
            <div className="container mx-auto max-w-5xl px-6">
              <motion.div
                className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#071540] via-[#0B2A7A] to-[#3B1585] px-8 py-12 shadow-[0_30px_80px_rgba(7,21,64,0.25)] sm:px-14 sm:py-16"
                {...reveal()}
              >
                <div
                  className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#752CFC]/25 blur-3xl"
                  aria-hidden="true"
                />
                <div className="relative">
                  <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] text-[#9CC0FF]">
                    {common.caseHeading}
                  </span>
                  <h2 id="case-heading" className="mb-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    {copy.caseStudy.name}
                  </h2>
                  <p className="mb-8 max-w-3xl text-base font-light leading-relaxed text-white/80">
                    {copy.caseStudy.text}
                  </p>
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <p className="flex items-start gap-3 rounded-2xl border border-white/15 bg-white/[0.07] px-5 py-4">
                      <TrendingUp aria-hidden="true" className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#9CC0FF]" />
                      <span className="text-lg font-semibold leading-snug text-white">
                        {copy.caseStudy.metric}
                      </span>
                    </p>
                    <div className="flex flex-shrink-0 flex-wrap items-center gap-3">
                      {copy.caseStudy.casePath && (
                        <Link
                          href={copy.caseStudy.casePath}
                          className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#071540] transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#071540]"
                        >
                          Leer el caso completo →
                        </Link>
                      )}
                      {/* Contexto en `aria-label`, no en un span `sr-only`:
                          ese texto se ve durante el instante previo a que la
                          hoja de estilos se aplique y desborda el botón. */}
                      <a
                        href={copy.caseStudy.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${common.caseLinkLab} (${copy.caseStudy.name}, se abre en una pestaña nueva)`}
                        className="group inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#071540]"
                      >
                        {common.caseLinkLab}
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* ── CÓMO TRABAJAMOS ──────────────────────────────────────────────── */}
        <section
          aria-labelledby="process-heading"
          className="relative overflow-hidden py-20 lg:py-28"
        >
          <div className="container relative z-10 mx-auto max-w-6xl px-6">
            <motion.h2
              id="process-heading"
              className="mb-16 text-center text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
              {...reveal()}
            >
              <span className="text-slate-900">{common.processHeadingNormal}</span>
              <span className="text-brand-gradient">{common.processHeadingAccent}</span>
            </motion.h2>

            <ol className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {/* Riel que conecta los 4 pasos: se dibuja al entrar en pantalla.
                  top = pt-8 (32px) + radio del círculo h-14 (28px) = 60px. */}
              <div
                className="pointer-events-none absolute left-0 right-0 top-[60px] hidden lg:block"
                aria-hidden="true"
              >
                <div className="mx-auto h-[2px] w-[75%] overflow-hidden rounded-full bg-slate-200">
                  <motion.div
                    className="h-full w-full origin-left bg-brand-gradient"
                    initial={reduceMotion ? false : { scaleX: 0 }}
                    whileInView={reduceMotion ? undefined : { scaleX: 1 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 1.1, ease: "easeOut", delay: 0.15 }}
                  />
                </div>
              </div>

              {common.processSteps.map((step, index) => (
                <motion.li
                  key={step.title}
                  className="relative flex flex-col items-center rounded-2xl border border-slate-200 bg-white px-6 pb-7 pt-8 text-center transition-colors duration-300 hover:border-[#0855FD]/30"
                  {...reveal(index * 0.12)}
                >
                  <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-brand-gradient text-lg font-bold text-white shadow-[0_10px_26px_rgba(47,100,255,0.35)]">
                    <span aria-hidden="true">{index + 1}</span>
                    <span className="sr-only">Paso {index + 1}:</span>
                  </span>
                  <h3 className="mb-2 text-base font-semibold text-[#071540]">{step.title}</h3>
                  <p className="text-sm font-light leading-relaxed text-slate-600">
                    {step.description}
                  </p>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section aria-labelledby="faq-heading" id="faq" className="py-20 lg:py-28">
          <div className="container mx-auto max-w-3xl px-6">
            <motion.h2
              id="faq-heading"
              className="mb-10 text-center text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
              {...reveal()}
            >
              <span className="text-slate-900">{common.faqHeadingNormal}</span>
              <span className="text-brand-gradient">{common.faqHeadingAccent}</span>
            </motion.h2>
            <div>
              {copy.faq.map((item) => (
                <FaqItem key={item.q} item={item} />
              ))}
            </div>
          </div>
        </section>

        {/* ── GUÍAS RELACIONADAS ───────────────────────────────────────── */}
        {copy.related && copy.related.length > 0 && (
          <section aria-labelledby="related-heading" className="py-14">
            <div className="container mx-auto max-w-3xl px-6 text-center">
              <h2 id="related-heading" className="mb-6 text-xl font-bold text-[#071540]">
                {common.relatedHeading}
              </h2>
              <div className="flex flex-col items-center gap-3">
                {copy.related.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-base font-semibold text-brand-gradient hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0855FD] focus-visible:ring-offset-2"
                  >
                    {item.label} →
                  </Link>
                ))}
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
