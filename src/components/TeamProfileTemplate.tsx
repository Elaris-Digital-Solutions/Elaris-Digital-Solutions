"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type MotionProps } from "framer-motion";
import { ArrowRight, BookOpen, Linkedin, Sparkles, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import FloatingWhatsappButton from "@/components/ui/floating-whatsapp-button";
import Breadcrumbs, { type Crumb } from "@/components/Breadcrumbs";
import { buildReveal } from "@/lib/reveal";
import { scrollToSection } from "@/lib/utils";
import type { TeamProfile } from "@/content/types";
import es from "@/locales/es.json";

const labels = es.contentHubs.equipo;

interface Props {
  profile: TeamProfile;
  breadcrumbs: Crumb[];
  cases: {
    slug: string;
    client: string;
    sector: string;
    summary: string;
    metric: string;
  }[];
  articles: { title: string; href: string; readMinutes: number }[];
  /** Los otros dos cofundadores, para navegar entre perfiles. */
  colleagues: { slug: string; shortName: string; role: string; photo: string }[];
}

export default function TeamProfileTemplate({
  profile,
  breadcrumbs,
  cases,
  articles,
  colleagues,
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

            <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-center">
              {/* Anillo degradado: el borde va en un contenedor propio para que
                  la foto no se deforme al recortarse en círculo. */}
              <div className="flex-shrink-0 rounded-full bg-brand-gradient p-[3px] shadow-[0_18px_50px_rgba(47,100,255,0.25)]">
                <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-[#F0F4FF] sm:h-40 sm:w-40">
                  <Image
                    src={profile.photo}
                    alt={`Retrato de ${profile.name}`}
                    width={160}
                    height={160}
                    className="h-full w-full object-cover"
                    priority
                  />
                </div>
              </div>

              <div>
                <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#0855FD]/25 bg-white/70 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-brand-gradient shadow-sm backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-gradient" aria-hidden="true" />
                  {profile.role} · Cofundador
                </span>
                <h1 className="mb-4 text-3xl font-light tracking-tight text-[#071540] md:text-5xl">
                  {profile.name}
                </h1>
                <p className="max-w-2xl text-lg font-light leading-relaxed text-slate-700">
                  {profile.bioIntro}
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-[#0855FD]/15 pt-6">
              <a
                href="#contacto"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection("contacto");
                }}
                className="group inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-7 py-3 text-base font-medium text-white shadow-[0_18px_60px_rgba(47,100,255,0.35)] transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0855FD] focus-visible:ring-offset-2"
              >
                Solicitar diagnóstico
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                />
              </a>
              {/* El contexto extra va en `aria-label` y no en un span
                  `sr-only`: el texto oculto se hace visible durante el instante
                  en que la hoja de estilos aún no se ha aplicado, y desbordaba
                  el botón. Lo que no está en el DOM no puede escaparse.
                  El nombre accesible empieza por la etiqueta visible, como pide
                  WCAG 2.5.3. */}
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${labels.linkedinLabel} de ${profile.name} (se abre en una pestaña nueva)`}
                className="inline-flex items-center gap-2 rounded-xl border border-[#0855FD]/30 bg-white/70 px-7 py-3 text-base font-medium text-brand-gradient backdrop-blur-md transition-colors duration-300 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0855FD] focus-visible:ring-offset-2"
              >
                <Linkedin aria-hidden="true" className="h-4 w-4" />
                {labels.linkedinLabel}
              </a>
            </div>
          </motion.div>
        </header>

        {/* ── BIO + ESPECIALIDADES ─────────────────────────────────────── */}
        <section className="bg-white py-20">
          <div className="container mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1fr_300px]">
            <div className="prose prose-slate prose-lg max-w-none prose-p:text-slate-700 prose-p:leading-relaxed">
              {profile.bioParagraphs.map((paragraph, index) => (
                <p key={paragraph.slice(0, 40)} className={index === 0 ? "text-xl" : undefined}>
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Columna lateral: se apila debajo en móvil. */}
            <aside className="lg:pt-2">
              <div className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6">
                <span className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-[#0855FD]/10">
                  <Sparkles aria-hidden="true" className="h-4 w-4 icon-brand-gradient" />
                </span>
                <h2 className="mb-4 text-base font-bold text-[#071540]">
                  {labels.specialtiesHeading}
                </h2>
                <ul className="flex flex-wrap gap-2">
                  {profile.knowsAbout.map((topic) => (
                    <li
                      key={topic}
                      className="rounded-full border border-[#0855FD]/25 bg-white px-3.5 py-1.5 text-sm font-medium text-brand-gradient"
                    >
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </section>

        {/* ── CASOS ────────────────────────────────────────────────────── */}
        {cases.length > 0 && (
          <section aria-labelledby="cases-heading" className="bg-[#F8FAFC] py-20">
            <div className="container mx-auto max-w-6xl px-6">
              <motion.h2
                id="cases-heading"
                className="mb-10 text-3xl font-extrabold tracking-tight sm:text-4xl"
                {...reveal()}
              >
                <span className="text-slate-900">{labels.casesHeading}</span>
              </motion.h2>
              <div className="grid gap-5 md:grid-cols-2">
                {cases.map((study, index) => (
                  <motion.div key={study.slug} {...reveal(index * 0.06)}>
                    <Link
                      href={`/casos/${study.slug}`}
                      className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#0855FD]/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0855FD] focus-visible:ring-offset-2"
                    >
                      <p className="mb-1.5 text-xs font-bold uppercase tracking-widest text-brand-gradient">
                        {study.sector}
                      </p>
                      <h3 className="mb-2.5 text-xl font-semibold text-[#071540]">
                        {study.client}
                      </h3>
                      <p className="mb-5 flex-1 text-sm font-light leading-relaxed text-slate-600">
                        {study.summary}
                      </p>
                      {study.metric && (
                        <p className="mb-4 flex items-start gap-2 rounded-xl bg-[#F0F4FF] px-4 py-3 text-sm font-semibold text-[#071540]">
                          <TrendingUp
                            aria-hidden="true"
                            className="mt-0.5 h-4 w-4 flex-shrink-0 icon-brand-gradient"
                          />
                          {study.metric}
                        </p>
                      )}
                      <span className="text-sm font-semibold text-brand-gradient">
                        {es.contentHubs.casos.readCase} →
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── ARTÍCULOS DEL AUTOR ──────────────────────────────────────── */}
        {articles.length > 0 && (
          <section aria-labelledby="articles-heading" className="bg-white py-20">
            <div className="container mx-auto max-w-6xl px-6">
              <motion.h2
                id="articles-heading"
                className="mb-10 text-3xl font-extrabold tracking-tight sm:text-4xl"
                {...reveal()}
              >
                <span className="text-slate-900">{labels.articlesHeading} </span>
                <span className="text-brand-gradient">{profile.shortName}</span>
              </motion.h2>
              <div className="grid gap-5 md:grid-cols-2">
                {articles.map((article, index) => (
                  <motion.div key={article.href} {...reveal(index * 0.06)}>
                    <Link
                      href={article.href}
                      className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#0855FD]/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0855FD] focus-visible:ring-offset-2"
                    >
                      <span className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-[#0855FD]/10">
                        <BookOpen aria-hidden="true" className="h-4 w-4 icon-brand-gradient" />
                      </span>
                      <h3 className="mb-3 flex-1 text-lg font-semibold leading-snug text-[#071540]">
                        {article.title}
                      </h3>
                      <p className="mb-3 text-xs text-slate-600">
                        {article.readMinutes} {es.contentHubs.recursos.minRead}
                      </p>
                      <span className="text-sm font-semibold text-brand-gradient">
                        {es.contentHubs.recursos.readArticle} →
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── OTROS COFUNDADORES ───────────────────────────────────────── */}
        {colleagues.length > 0 && (
          <section aria-labelledby="colleagues-heading" className="bg-[#F8FAFC] py-16">
            <div className="container mx-auto max-w-4xl px-6">
              <motion.h2
                id="colleagues-heading"
                className="mb-8 text-xl font-bold text-[#071540]"
                {...reveal()}
              >
                El resto del equipo
              </motion.h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {colleagues.map((person, index) => (
                  <motion.div key={person.slug} {...reveal(index * 0.06)}>
                    <Link
                      href={`/equipo/${person.slug}`}
                      className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:border-[#0855FD]/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0855FD] focus-visible:ring-offset-2"
                    >
                      <span className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-full border-2 border-brand-gradient">
                        <Image
                          src={person.photo}
                          alt=""
                          width={56}
                          height={56}
                          className="h-full w-full object-cover"
                        />
                      </span>
                      <span>
                        <span className="block font-semibold text-[#071540]">
                          {person.shortName}
                        </span>
                        <span className="block text-sm text-slate-600">{person.role}</span>
                      </span>
                    </Link>
                  </motion.div>
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
