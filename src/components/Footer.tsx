"use client";

import { CalendarDays, Linkedin, Mail, Instagram, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import SmartImage from "@/components/ui/smart-image";
import { useI18n } from "@/lib/i18n";
import { scrollToSection } from "@/lib/utils";
import es from "@/locales/es.json";

const CURRENT_YEAR = new Date().getFullYear();
const SERVICE_LINKS = es.footer.sections.services.items;

/** Hubs de contenido indexable, enlazados desde todas las páginas. */
const CONTENT_HUBS = [
  { href: "/casos", label: "Casos de éxito" },
  { href: "/recursos", label: "Recursos" },
  { href: "/equipo", label: "Equipo" },
] as const;

const Footer = () => {
  const currentYear = CURRENT_YEAR;
  const { t, tArray } = useI18n();
  const navLabels = tArray("footer.sections.navigation.items");
  // Anclas del home. Los hubs con ruta propia van aparte, en CONTENT_HUBS.
  const navTargets = ["", "estandares", "clientes", "faq", "contacto"];
  const navItems = navTargets.map((id, index) => ({
    id,
    label: navLabels[index] ?? "",
  }));
  const contactSection = {
    title: t("footer.sections.contact.title"),
    meetingLabel: t("footer.sections.contact.meetingLabel"),
    email: t("footer.sections.contact.email"),
    phone: t("footer.sections.contact.phone"),
    instagram: t("footer.sections.contact.instagram"),
    location: t("footer.sections.contact.location"),
  };
  const legalLinks = {
    terms: t("footer.bottom.legalLinks.terms"),
    dataPolicy: t("footer.bottom.legalLinks.dataPolicy"),
  };

  return (
    <footer className="bg-[var(--brand-surface-dark)] border-t border-white/10 text-white">
      <div className="container mx-auto px-4 py-9 sm:px-6 sm:py-12 lg:px-8">
        <div className="mb-6 grid grid-cols-1 gap-6 sm:mb-8 sm:gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="mb-3.5 flex items-center gap-2 sm:mb-4">
              <SmartImage
                src="/assets/ElarisLockup.webp"
                alt={t("navbar.logoAlt")}
                width={812}
                height={240}
                className="h-14 w-auto sm:h-16 lg:h-20"
              />
            </div>
            <p className="mb-5 max-w-[22rem] text-sm leading-relaxed text-white/80 sm:mb-6">
              {t("footer.description")}
            </p>
            <div className="flex gap-3 sm:gap-4">
              <a
                href="https://www.linkedin.com/company/elaris-digital-solutions/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/6 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>

              <a
                href="https://www.instagram.com/elarisdigitalsolutions"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/6 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>

              <a
                href="mailto:contact@elarisdigitalsolutions.com"
                className="p-2 bg-white/6 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          {/* Servicios Column */}
          <div key="Servicios">
            <h3 className="mb-3 text-base font-semibold">{t("footer.sections.services.title")}</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              {SERVICE_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-white/80 text-sm hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navegación Column */}
          <div key="Navegacion">
            <h3 className="mb-3 text-base font-semibold">{t("footer.sections.navigation.title")}</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              {navItems.map(({ id, label }) => {
                return (
                  <li key={`${label}-${id}`}>
                    <a
                      href={id ? `#${id}` : "/"}
                      onClick={(e) => {
                        e.preventDefault();
                        if (!id) {
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        } else {
                          scrollToSection(id);
                        }
                      }}
                      className="text-white/80 text-sm hover:text-white transition-colors"
                    >
                      {label}
                    </a>
                  </li>
                );
              })}
              {/* Rutas reales: garantizan que los crawlers descubran los hubs
                  de contenido desde cualquier página del sitio. */}
              {CONTENT_HUBS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-white/80 text-sm hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column (replaces previous "Legal") */}
          <div key="Contacto">
            <h3 className="mb-3 text-base font-semibold">{contactSection.title}</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              <li>
                <a
                  href="/meet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/80 text-sm hover:text-white transition-colors"
                >
                  <CalendarDays className="h-4 w-4 flex-shrink-0" />
                  {contactSection.meetingLabel}
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@elarisdigitalsolutions.com"
                  className="flex items-center gap-2 text-white/80 text-sm hover:text-white transition-colors"
                >
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  <span className="break-all">{contactSection.email}</span>
                </a>
              </li>

              <li>
                <a
                  href="tel:+51973663807"
                  className="flex items-center gap-2 text-white/80 text-sm hover:text-white transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  {contactSection.phone}
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/elarisdigitalsolutions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/80 text-sm hover:text-white transition-colors"
                >
                  <Instagram className="h-4 w-4" />
                  {contactSection.instagram}
                </a>
              </li>
              <li className="flex items-center gap-2 text-white/80 text-sm">
                <MapPin className="h-4 w-4" />
                {contactSection.location}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-5 sm:pt-8">
          <div className="flex flex-col justify-between gap-2.5 sm:flex-row sm:items-center sm:gap-4">
            <p className="text-xs text-white/80 sm:text-sm">
              {t("footer.bottom.rights", { year: currentYear })}
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/80 sm:text-sm">
              <Link href="/terminos-condiciones" className="hover:text-white transition-colors">
                {legalLinks.terms}
              </Link>
              <span aria-hidden="true" className="text-white/40">|</span>
              <Link href="/politicas-de-datos" className="hover:text-white transition-colors">
                {legalLinks.dataPolicy}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
