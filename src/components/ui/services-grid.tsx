"use client";

import { Fragment, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { scrollToSection } from "@/lib/utils";
import {
  SERVICES,
  SERVICE_GROUPS,
  SECONDARY_INTRO,
  UMBRELLA_INTRO,
  findService,
} from "@/content/services";
import { SERVICE_ICONS } from "@/components/ui/service-icons";
import { trackEvent } from "@/lib/analytics";

/** Enlace de apoyo: mismo anillo de foco que el resto de la casa. */
const SUPPORT_LINK =
  "font-semibold text-brand-gradient hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0855FD] focus-visible:ring-offset-2 rounded-sm";

type ServiceItem = {
  key: string;
  title: string;
  benefit: string;
  href: string;
  Icon: React.ElementType;
};

const ServiceCard = ({ service, index }: { service: ServiceItem; index: number }) => {
  const { Icon } = service;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.06 }}
    >
      <Link
        href={service.href}
        onClick={() => trackEvent("service_click", { location: "home_grid", service: service.key })}
        className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:border-[#0855FD]/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0855FD] focus-visible:ring-offset-2"
      >
        <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#0855FD]/10">
          <Icon className="h-5 w-5 icon-brand-gradient" />
        </span>
        <h3 className="text-base font-semibold text-[#071540]">{service.title}</h3>
        <p className="mt-2 flex-1 text-sm font-light leading-relaxed text-slate-500">
          {service.benefit}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-gradient">
          Ver servicio
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </Link>
    </motion.div>
  );
};

export default function ServicesGrid() {
  const { t } = useI18n();

  const groups = useMemo(
    () =>
      SERVICE_GROUPS.map((group) => {
        const inGroup = SERVICES.filter((service) => service.group === group.id);
        return {
          label: group.label,
          umbrella: group.umbrellaPath
            ? {
                href: group.umbrellaPath,
                label: findService(group.umbrellaPath).label,
              }
            : null,
          items: inGroup
            .filter((service) => service.tier === "primary")
            .map<ServiceItem>((service) => ({
              key: service.key,
              title: service.label,
              benefit: service.benefit,
              href: service.path,
              Icon: SERVICE_ICONS[service.icon],
            })),
          secondary: inGroup
            .filter((service) => service.tier === "secondary" && service.path !== group.umbrellaPath)
            .map((service) => ({ key: service.key, label: service.label, href: service.path })),
        };
      }),
    []
  );

  return (
    <section id="servicios" className="relative overflow-hidden bg-[#F8FAFC] py-20 lg:py-28">
      <div
        className="pointer-events-none absolute -right-32 -top-32 h-[560px] w-[560px] rounded-full opacity-[0.035]"
        style={{ background: "radial-gradient(circle, #0855FD 0%, transparent 70%)" }}
      />
      <div className="container relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          className="mx-auto mb-14 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            <span className="text-slate-900">{t("services.headingNormal")}</span>
            <span className="text-brand-gradient">{t("services.headingAccent")}</span>
          </h2>
          {/* slate-600, no 500: sobre el lavanda de la sección el 500 se queda
              en 4.33:1, por debajo del mínimo AA. */}
          <p className="mx-auto mt-4 max-w-2xl text-lg font-light leading-relaxed text-slate-600">
            {t("services.description")}
          </p>
        </motion.div>

        <div className="space-y-12">
          {groups.map((group) => (
            <div key={group.label}>
              <div className="mb-5 flex items-center gap-4">
                <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-brand-gradient">
                  {group.label}
                </h3>
                <span className="h-px flex-1 bg-slate-200" aria-hidden />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((service, index) => (
                  <ServiceCard key={service.key} service={service} index={index} />
                ))}
              </div>

              {/* Servicios de apoyo y página paraguas: fuera del conjunto de
                  decisión principal para no diluir la elección, pero enlazados
                  desde aquí — sus páginas siguen vivas e indexadas. */}
              {(group.umbrella || group.secondary.length > 0) && (
                <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-light text-slate-600">
                  {group.umbrella && (
                    <span>
                      {UMBRELLA_INTRO}{" "}
                      <Link href={group.umbrella.href} className={SUPPORT_LINK}>
                        {group.umbrella.label}
                      </Link>
                    </span>
                  )}
                  {group.secondary.length > 0 && (
                    <span>
                      {SECONDARY_INTRO}{" "}
                      {group.secondary.map((service, index) => (
                        <Fragment key={service.key}>
                          {index > 0 && <span aria-hidden> · </span>}
                          <Link href={service.href} className={SUPPORT_LINK}>
                            {service.label}
                          </Link>
                        </Fragment>
                      ))}
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-sm font-light text-slate-600">{t("services.closingNote")}</p>
          <a
            href="#contacto"
            onClick={(event) => {
              event.preventDefault();
              scrollToSection("contacto");
            }}
            className="mt-3 inline-block text-sm font-semibold text-brand-gradient hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0855FD] focus-visible:ring-offset-2"
          >
            {t("services.closingCta")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
