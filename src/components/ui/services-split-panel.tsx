"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Code2, Bot, Check, ArrowRight, ChevronDown } from "lucide-react";
import { useI18n } from "@/lib/i18n";

// ─── Types ────────────────────────────────────────────────────────────────────
interface ServiceItem {
  key: string;
  title: string;
  description: string;
  visualTitle: string;
  visualDescription: string;
  features: string[];
  Icon: React.ElementType;
  accentColor: string;
  href: string;
  badge: string;
}

// ─── Static config (icons, links, accents keyed to JSON slugs) ─────────────────
const SERVICE_CONFIG: Record<
  string,
  { Icon: React.ElementType; accentColor: string; href: string; badge: string }
> = {
  web: {
    Icon: Globe,
    accentColor: "#2F64FF",
    href: "#portafolio",
    badge: "Diseño & Performance",
  },
  software: {
    Icon: Code2,
    accentColor: "#071540",
    href: "/software-a-medida",
    badge: "Arquitectura escalable",
  },
  ai: {
    Icon: Bot,
    accentColor: "#2F64FF",
    href: "/llm-workflows",
    badge: "Automatización inteligente",
  },
};

const SERVICE_KEYS = ["web", "software", "ai"] as const;

// ─── Feature Bullet component ──────────────────────────────────────────────────
const FeatureBullet = ({
  text,
  index,
}: {
  text: string;
  index: number;
}) => (
  <motion.li
    className="flex items-start gap-3 text-slate-700 text-sm font-light"
    initial={{ opacity: 0, x: -8 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.25, delay: 0.18 + index * 0.06, ease: "easeOut" }}
  >
    <span className="mt-0.5 w-5 h-5 rounded-full bg-[#2F64FF]/10 border border-[#2F64FF]/25 flex items-center justify-center flex-shrink-0">
      <Check className="w-2.5 h-2.5 text-[#2F64FF]" />
    </span>
    {text}
  </motion.li>
);

// ─── Right content panel ───────────────────────────────────────────────────────
const ContentPanel = ({ service }: { service: ServiceItem }) => {
  const { Icon, accentColor, href, badge } = SERVICE_CONFIG[service.key];
  return (
    <motion.div
      key={service.key}
      className="h-full flex flex-col justify-between p-8 lg:p-10"
      initial={{ opacity: 0, x: -14 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
    >
      {/* Top: icon + badge */}
      <div>
        <div className="flex items-start justify-between mb-6">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center border"
            style={{
              backgroundColor: `${accentColor}12`,
              borderColor: `${accentColor}28`,
            }}
          >
            <Icon className="w-7 h-7" style={{ color: accentColor }} />
          </div>
          <span
            className="inline-block text-[10px] font-semibold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full border"
            style={{
              color: accentColor,
              borderColor: `${accentColor}30`,
              backgroundColor: `${accentColor}08`,
            }}
          >
            {badge}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-semibold text-[#071540] leading-snug mb-4 tracking-tight">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-slate-500 font-light leading-relaxed text-base mb-8">
          {service.description}
        </p>

        {/* Feature list */}
        <ul className="space-y-3">
          {service.features.map((feat, i) => (
            <FeatureBullet key={i} text={feat} index={i} />
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="mt-8 pt-7 border-t border-slate-100">
        <a
          href={href}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#2F64FF] group hover:gap-3 transition-all duration-200"
        >
          Ver casos de uso
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        </a>
      </div>
    </motion.div>
  );
};

// ─── Desktop split-panel layout ────────────────────────────────────────────────
const DesktopSplitPanel = ({ services }: { services: ServiceItem[] }) => {
  const [activeKey, setActiveKey] = useState<string>(services[0]?.key ?? "web");
  const activeService = services.find((s) => s.key === activeKey) ?? services[0];

  return (
    <div className="hidden lg:grid lg:grid-cols-[280px_1fr] rounded-3xl border border-slate-200 overflow-hidden shadow-[0_8px_48px_rgba(7,21,64,0.07)] bg-white min-h-[520px]">
      {/* ── Left nav ── */}
      <nav className="border-r border-slate-100 bg-[#F8FAFC] flex flex-col py-4">
        {services.map((svc) => {
          const isActive = svc.key === activeKey;
          const { Icon, accentColor } = SERVICE_CONFIG[svc.key];
          return (
            <button
              key={svc.key}
              onClick={() => setActiveKey(svc.key)}
              onMouseEnter={() => setActiveKey(svc.key)}
              className={`relative w-full text-left px-6 py-5 transition-all duration-200 group focus:outline-none ${
                isActive
                  ? "bg-white shadow-sm"
                  : "hover:bg-white/70"
              }`}
            >
              {/* Active left border */}
              {isActive && (
                <motion.span
                  layoutId="nav-active-border"
                  className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full"
                  style={{ backgroundColor: accentColor }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                />
              )}

              <div className="flex items-center gap-3 mb-1.5">
                <Icon
                  className="w-4 h-4 flex-shrink-0 transition-colors duration-200"
                  style={{ color: isActive ? accentColor : "#94a3b8" }}
                />
                <span
                  className={`text-sm font-semibold transition-colors duration-200 ${
                    isActive ? "text-[#071540]" : "text-slate-500 group-hover:text-[#071540]"
                  }`}
                >
                  {svc.title}
                </span>
              </div>
              <p
                className={`text-xs font-light leading-snug pl-7 line-clamp-2 transition-colors duration-200 ${
                  isActive ? "text-slate-400" : "text-slate-400/60"
                }`}
              >
                {svc.visualDescription}
              </p>
            </button>
          );
        })}

        {/* Bottom tag */}
        <div className="mt-auto px-6 py-5 border-t border-slate-100">
          <p className="text-[10px] uppercase tracking-[0.15em] text-slate-400 font-medium">
            Todos los servicios
          </p>
          <p className="text-[11px] text-slate-400/70 font-light mt-1 leading-snug">
            Soluciones integrales para empresas B2B en cualquier etapa.
          </p>
        </div>
      </nav>

      {/* ── Right panel ── */}
      <div className="bg-white relative overflow-hidden">
        {/* Subtle background grid */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#071540 1px, transparent 1px), linear-gradient(90deg, #071540 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative z-10 h-full">
          <AnimatePresence mode="wait">
            {activeService && (
              <ContentPanel key={activeService.key} service={activeService} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// ─── Tablet horizontal tabs ────────────────────────────────────────────────────
const TabletTabs = ({ services }: { services: ServiceItem[] }) => {
  const [activeKey, setActiveKey] = useState<string>(services[0]?.key ?? "web");
  const activeService = services.find((s) => s.key === activeKey) ?? services[0];

  return (
    <div className="hidden md:block lg:hidden">
      {/* Tab bar */}
      <div className="flex border-b border-slate-200 mb-0 rounded-t-2xl bg-white overflow-hidden">
        {services.map((svc) => {
          const isActive = svc.key === activeKey;
          const { Icon, accentColor } = SERVICE_CONFIG[svc.key];
          return (
            <button
              key={svc.key}
              onClick={() => setActiveKey(svc.key)}
              className={`flex-1 flex items-center justify-center gap-2 py-4 px-3 text-sm font-semibold transition-all duration-200 border-b-2 ${
                isActive
                  ? "border-[#2F64FF] text-[#2F64FF] bg-[#F0F4FF]"
                  : "border-transparent text-slate-400 hover:text-[#071540] bg-white"
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" style={{ color: isActive ? accentColor : undefined }} />
              <span className="truncate">{svc.title}</span>
            </button>
          );
        })}
      </div>
      {/* Content */}
      <div className="bg-white rounded-b-2xl border border-t-0 border-slate-200 shadow-sm overflow-hidden">
        <AnimatePresence mode="wait">
          {activeService && (
            <ContentPanel key={activeService.key} service={activeService} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// ─── Mobile accordion ─────────────────────────────────────────────────────────
const MobileAccordion = ({ services }: { services: ServiceItem[] }) => {
  const [openKey, setOpenKey] = useState<string>(services[0]?.key ?? "web");

  const toggle = (key: string) =>
    setOpenKey((prev) => (prev === key ? "" : key));

  return (
    <div className="md:hidden flex flex-col gap-3">
      {services.map((svc) => {
        const isOpen = svc.key === openKey;
        const { Icon, accentColor, href, badge } = SERVICE_CONFIG[svc.key];
        return (
          <div
            key={svc.key}
            className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
              isOpen ? "border-[#2F64FF]/30 shadow-md" : "border-slate-200"
            } bg-white`}
          >
            {/* Header button */}
            <button
              onClick={() => toggle(svc.key)}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <div className="flex items-center gap-3">
                <span
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${accentColor}12`, color: accentColor }}
                >
                  <Icon className="w-4 h-4" />
                </span>
                <div>
                  <p
                    className={`text-sm font-semibold transition-colors duration-200 ${
                      isOpen ? "text-[#2F64FF]" : "text-[#071540]"
                    }`}
                  >
                    {svc.title}
                  </p>
                  {!isOpen && (
                    <p className="text-[11px] text-slate-400 font-light mt-0.5 line-clamp-1">
                      {svc.visualDescription}
                    </p>
                  )}
                </div>
              </div>
              <ChevronDown
                className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${
                  isOpen ? "rotate-180 text-[#2F64FF]" : "text-slate-400"
                }`}
              />
            </button>

            {/* Expandable content */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 border-t border-slate-100">
                    <span
                      className="inline-block mt-4 mb-3 text-[10px] font-semibold uppercase tracking-[0.15em] px-2.5 py-1 rounded-full border"
                      style={{
                        color: accentColor,
                        borderColor: `${accentColor}30`,
                        backgroundColor: `${accentColor}08`,
                      }}
                    >
                      {badge}
                    </span>
                    <p className="text-slate-500 font-light text-sm leading-relaxed mb-5">
                      {svc.description}
                    </p>
                    <ul className="space-y-2.5 mb-5">
                      {svc.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-slate-700 text-sm font-light">
                          <span className="mt-0.5 w-4 h-4 rounded-full bg-[#2F64FF]/10 border border-[#2F64FF]/25 flex items-center justify-center flex-shrink-0">
                            <Check className="w-2 h-2 text-[#2F64FF]" />
                          </span>
                          {feat}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={href}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2F64FF]"
                    >
                      Ver casos de uso <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

// ─── Main export ───────────────────────────────────────────────────────────────
export default function ServicesSplitPanel() {
  const { t, tArray } = useI18n();

  const services: ServiceItem[] = SERVICE_KEYS.map((key) => ({
    key,
    title: t(`services.items.${key}.title`),
    description: t(`services.items.${key}.description`),
    visualTitle: t(`services.items.${key}.visualTitle`),
    visualDescription: t(`services.items.${key}.visualDescription`),
    features: tArray(`services.items.${key}.features`),
    Icon: SERVICE_CONFIG[key].Icon,
    accentColor: SERVICE_CONFIG[key].accentColor,
    href: SERVICE_CONFIG[key].href,
    badge: SERVICE_CONFIG[key].badge,
  }));

  return (
    <section
      id="servicios"
      className="py-20 lg:py-28 bg-[#F8FAFC] relative overflow-hidden"
    >
      {/* Subtle top-right decorative blob */}
      <div
        className="absolute -top-32 -right-32 w-[560px] h-[560px] rounded-full opacity-[0.035] pointer-events-none"
        style={{ background: "radial-gradient(circle, #2F64FF 0%, transparent 70%)" }}
      />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* ── Section header ── */}
        <motion.div
          className="mb-12 max-w-xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 text-[#2F64FF] text-xs font-bold uppercase tracking-[0.18em] mb-5">
            <span className="w-6 h-px bg-[#2F64FF]" />
            {t("services.headingNormal")}{t("services.headingAccent")}
          </span>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-[#071540] leading-tight mb-4">
            Tecnología que{" "}
            <span className="font-semibold text-[#2F64FF]">transforma</span>{" "}
            su operación
          </h2>
          <p className="text-slate-500 text-lg font-light leading-relaxed">
            {t("services.description")}
          </p>
        </motion.div>

        {/* ── Interactive panels — responsive variants ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
        >
          {/* Desktop: split panel */}
          <DesktopSplitPanel services={services} />

          {/* Tablet: horizontal tabs */}
          <TabletTabs services={services} />

          {/* Mobile: accordion */}
          <MobileAccordion services={services} />
        </motion.div>

        {/* ── Bottom trust line ── */}
        <motion.p
          className="mt-8 text-center text-sm text-slate-400 font-light"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Cada servicio se adapta a la escala, industria y objetivos específicos de su empresa.
        </motion.p>
      </div>
    </section>
  );
}
