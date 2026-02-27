import { ChevronDown, ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SmartImage from "@/components/ui/smart-image";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type DesktopMenuKey = "services" | "products" | "industries" | null;
type MobileMenuView = "root" | "services" | "products" | "industries";

const getLanguageBasePath = (pathname: string) => {
  const segments = pathname.split("/").filter(Boolean);
  if (segments[0] === "en") return "/en";
  if (segments[0] === "es") return "/es";
  return "/";
};

const Navbar = () => {
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.innerWidth >= 1024;
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileMenuView, setMobileMenuView] = useState<MobileMenuView>("root");
  const [openDesktopMenu, setOpenDesktopMenu] = useState<DesktopMenuKey>(null);
  const [isLightMode, setIsLightMode] = useState(false);

  const closeTimerRef = useRef<number | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { language, t } = useI18n();

  const basePath = useMemo(() => getLanguageBasePath(location.pathname), [location.pathname]);

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const scheduleDesktopClose = () => {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setOpenDesktopMenu(null);
    }, 120);
  };

  const navigateToSection = (sectionId?: string) => {
    const destinationPath = basePath;
    const runScroll = () => {
      if (!sectionId) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      const target = document.getElementById(sectionId);
      if (!target) return;

      const offsetTop = target.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top: Math.max(offsetTop, 0), behavior: "smooth" });
      const finalUrl = sectionId ? `${destinationPath}#${sectionId}` : destinationPath;
      window.history.replaceState({}, "", finalUrl);
    };

    if (window.location.pathname !== destinationPath) {
      navigate(destinationPath, { replace: false });
      window.setTimeout(runScroll, 120);
    } else {
      runScroll();
    }

    setIsMobileMenuOpen(false);
    setMobileMenuView("root");
    setOpenDesktopMenu(null);
  };

  useEffect(() => {
    const onResize = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
      if (desktop) {
        setIsMobileMenuOpen(false);
        setMobileMenuView("root");
      } else {
        setOpenDesktopMenu(null);
      }
    };

    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        const threshold = Math.max(window.innerHeight - 120, 160);
        setIsLightMode(window.scrollY > threshold);
        ticking = false;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    return () => {
      clearCloseTimer();
    };
  }, []);

  useEffect(() => {
    const shouldHideFloating = !isDesktop && isMobileMenuOpen;
    window.dispatchEvent(
      new CustomEvent("elaris:mobile-menu-visibility", {
        detail: { open: shouldHideFloating },
      })
    );

    return () => {
      window.dispatchEvent(
        new CustomEvent("elaris:mobile-menu-visibility", {
          detail: { open: false },
        })
      );
    };
  }, [isDesktop, isMobileMenuOpen]);

  const navThemeClasses = isLightMode
    ? "bg-[rgba(255,255,255,0.85)] text-[#111] border-b border-black/10 shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
    : "bg-[rgba(10,10,15,0.4)] text-white border-b border-white/10";

  const dropdownThemeClasses = isLightMode
    ? "bg-white border border-black/10 shadow-[0_22px_50px_rgba(15,23,42,0.12)]"
    : "bg-[rgba(10,10,15,0.72)] border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.35)] text-white";

  const navItemClass = cn(
    "inline-flex h-9 items-center px-2 text-[0.95rem] font-medium transition-colors",
    isLightMode ? "text-[#111] hover:text-black" : "text-white/90 hover:text-white"
  );

  const dropdownItemClass = cn(
    "w-full rounded-lg px-3 py-2 text-left text-sm transition-colors",
    isLightMode ? "hover:bg-slate-100 text-slate-700 hover:text-slate-900" : "hover:bg-white/10 text-white/80 hover:text-white"
  );

  const serviceItemTitleClass = cn(
    "text-[0.99rem] font-semibold leading-tight transition-colors",
    isLightMode ? "text-[#2F64FF] group-hover:text-[#1f4de0]" : "text-[#8fb2ff] group-hover:text-[#b5caff]"
  );

  const serviceItemDescriptionClass = cn(
    "mt-0.5 text-[0.94rem] leading-snug",
    isLightMode ? "text-slate-600" : "text-white/68"
  );

  const logoSrc = isLightMode ? "/assets/ElarisLogo.png" : "/assets/ElarisLogoWhite.png";

  const copy = useMemo(() => {
    if (language === "es") {
      return {
        services: "Servicios",
        products: "Productos",
        industries: "Industrias",
        standards: "Estándares",
        clients: "Clientes",
        contactSales: "Contacta con ventas",
        back: "Volver",
        viewWork: "Ver trabajos",
        mobileLeadTitle: "¿Listo para escalar tu plataforma digital?",
        mobileLeadText: "Conversemos y te damos una hoja de ruta clara para ejecutar.",
        servicesCategories: [
          {
            title: "Plataformas Digitales de Alto Rendimiento",
            items: [
              {
                title: "Desarrollo de Software a Medida",
                description: "Soluciones únicas diseñadas desde cero.",
              },
              {
                title: "Arquitectura de Plataformas Digitales",
                description: "Diseño de estructuras escalables y robustas.",
              },
              {
                title: "Modernización de Sistemas Legacy",
                description: "Actualización de software antiguo a tecnologías actuales.",
              },
              {
                title: "Websites y Plataformas Web de Alto Rendimiento",
                description: "Presencia digital corporativa y funcional.",
              },
            ],
          },
          {
            title: "IA y Automatización Inteligente",
            items: [
              {
                title: "Implementación de LLMs en Flujos de Trabajo",
                description: "Integración de modelos de lenguaje en procesos reales.",
              },
              {
                title: "Asistentes Conversacionales y Agendamiento",
                description: "IA para atención al cliente y gestión de citas/reservas.",
              },
              {
                title: "Modelos Predictivos e Inteligencia de Datos",
                description: "Análisis avanzado para la toma de decisiones.",
              },
              {
                title: "Procesamiento Inteligente de Documentos",
                description: "Clasificación y extracción automática de datos.",
              },
            ],
          },
          {
            title: "Integración de Ecosistemas Empresariales",
            items: [
              {
                title: "Conectores y APIs Personalizadas",
                description: "Comunicación fluida entre plataformas.",
              },
              {
                title: "Integración con ERP, SAP y CRM",
                description: "Unificación del núcleo transaccional y comercial.",
              },
              {
                title: "Orquestación de Flujos Digitales",
                description: "Automatización interdepartamental sin fricciones.",
              },
              {
                title: "Migración y Sincronización de Datos",
                description: "Garantía de integridad de información entre sistemas.",
              },
            ],
          },
          {
            title: "Gestión de Operaciones e Industria 4.0",
            items: [
              {
                title: "Implementación de CMMS",
                description: "Gestión de mantenimiento computarizado.",
              },
              {
                title: "Control de Producción, Inventarios y Logística",
                description: "Software para logística y manufactura.",
              },
              {
                title: "Trazabilidad y Control Operativo",
                description: "Seguimiento en tiempo real de activos y procesos.",
              },
              {
                title: "Digitalización de Procesos Industriales",
                description: "El paso del papel/Excel a la planta digital.",
              },
            ],
          },
          {
            title: "E-commerce y Soluciones Transaccionales",
            items: [
              {
                title: "E-commerce a Medida",
                description: "Tiendas virtuales con requerimientos complejos.",
              },
              {
                title: "Sistemas de Pago e Integraciones Logísticas",
                description: "Conexión con pasarelas y couriers.",
              },
              {
                title: "Plataformas de Suscripción y Gestión Comercial",
                description: "Modelos de negocio recurrentes.",
              },
            ],
          },
          {
            title: "Transformación Digital Empresarial",
            items: [
              {
                title: "Diagnóstico y Roadmap de Digitalización",
                description: "Plan de ruta para la transformación.",
              },
              {
                title: "Auditoría de Arquitectura e Infraestructura",
                description: "Revisión técnica de sistemas actuales.",
              },
              {
                title: "Optimización de Procesos y Costos TI",
                description: "Eficiencia operativa desde la tecnología.",
              },
            ],
          },
        ],
        productsItems: [
          "Pictolink — Plataforma de comunicación accesible (Activo)",
          "LeIA — Asistente empresarial impulsado por IA (Beta)",
          "OpsPilot — Automatización de flujos operativos (Próximamente)",
        ],
        productsHighlightTitle: "Explora nuestro ecosistema de productos",
        productsHighlightText: "Desde comunicación hasta operaciones con IA, soluciones diseñadas para escalar.",
        productsHighlightButton: "Ver todos los productos",
        badges: {
          live: "Activo",
          beta: "Beta",
          soon: "Próximamente",
        },
        industriesItems: [
          "Salud",
          "Educación",
          "Retail",
          "Logística",
          "Finanzas",
          "Gobierno",
          "Startups",
          "PYMES",
          "Empresas",
        ],
      };
    }

    return {
      services: "Services",
      products: "Products",
      industries: "Industries",
      standards: "Standards",
      clients: "Clients",
      contactSales: "Contact sales",
      back: "Back",
      viewWork: "View Work",
      mobileLeadTitle: "Ready to scale your digital platform?",
      mobileLeadText: "Talk to our team and get a clear roadmap for delivery.",
      servicesCategories: [
        {
          title: "High-Performance Digital Platforms",
          items: [
            {
              title: "Custom Software Development",
              description: "Tailored solutions designed from the ground up.",
            },
            {
              title: "Digital Platform Architecture",
              description: "Scalable and robust architecture design.",
            },
            {
              title: "Legacy System Modernization",
              description: "Upgrade outdated software to modern technologies.",
            },
            {
              title: "High-Performance Websites & Web Platforms",
              description: "Corporate and high-functionality digital presence.",
            },
          ],
        },
        {
          title: "AI & Intelligent Automation",
          items: [
            {
              title: "LLM Implementation in Workflows",
              description: "Embed language models into real operational processes.",
            },
            {
              title: "Conversational Assistants & Scheduling",
              description: "AI for customer support and appointment management.",
            },
            {
              title: "Predictive Models & Data Intelligence",
              description: "Advanced analytics for better decision-making.",
            },
            {
              title: "Intelligent Document Processing",
              description: "Automated classification and extraction of key data.",
            },
          ],
        },
        {
          title: "Enterprise Ecosystem Integration",
          items: [
            {
              title: "Custom Connectors and APIs",
              description: "Seamless communication between platforms.",
            },
            {
              title: "ERP, SAP and CRM Integrations",
              description: "Unify transactional and commercial core systems.",
            },
            {
              title: "Digital Workflow Orchestration",
              description: "Cross-department automation without friction.",
            },
            {
              title: "Data Migration and Synchronization",
              description: "Preserve data integrity across systems.",
            },
          ],
        },
        {
          title: "Operations Management & Industry 4.0",
          items: [
            {
              title: "CMMS Implementation",
              description: "Computerized maintenance management deployment.",
            },
            {
              title: "Production, Inventory & Logistics Control",
              description: "Software for logistics and manufacturing operations.",
            },
            {
              title: "Traceability and Operational Control",
              description: "Real-time tracking of assets and operations.",
            },
            {
              title: "Industrial Process Digitalization",
              description: "Move from spreadsheets to digital plant operations.",
            },
          ],
        },
        {
          title: "E-commerce & Transactional Solutions",
          items: [
            {
              title: "Custom E-commerce",
              description: "Online stores built for complex requirements.",
            },
            {
              title: "Payment Systems and Logistics Integrations",
              description: "Integrate gateways, couriers and transaction flows.",
            },
            {
              title: "Subscription Platforms and Commercial Management",
              description: "Recurring-revenue business models and operations.",
            },
          ],
        },
        {
          title: "Enterprise Digital Transformation",
          items: [
            {
              title: "Digitalization Diagnosis and Roadmap",
              description: "Strategic roadmap for enterprise transformation.",
            },
            {
              title: "Architecture and Infrastructure Audits",
              description: "Technical review of current systems.",
            },
            {
              title: "IT Cost and Process Optimization",
              description: "Operational efficiency driven by technology.",
            },
          ],
        },
      ],
      productsItems: [
        "Pictolink — Accessible communication platform (Live)",
        "LeIA — AI-driven enterprise assistant (Beta)",
        "OpsPilot — Workflow automation for operations teams (Coming soon)",
      ],
      productsHighlightTitle: "Explore our product ecosystem",
      productsHighlightText: "From communication to AI operations, discover solutions built for scale.",
      productsHighlightButton: "View all products",
      badges: {
        live: "Live",
        beta: "Beta",
        soon: "Coming soon",
      },
      industriesItems: [
        "Healthcare",
        "Education",
        "Retail",
        "Logistics",
        "Finance",
        "Government",
        "Startups",
        "SMEs",
        "Enterprise",
      ],
    };
  }, [language]);

  const mobileServicesCategories = copy.servicesCategories;
  const mobileProductItems = copy.productsItems;
  const mobileIndustryItems = copy.industriesItems;
  const productEntries = useMemo(
    () =>
      language === "es"
        ? [
            {
              name: "Pictolink",
              description: "Plataforma de comunicación accesible",
              status: copy.badges.live,
              tone: "live" as const,
            },
            {
              name: "LeIA",
              description: "Asistente empresarial impulsado por IA",
              status: copy.badges.beta,
              tone: "beta" as const,
            },
            {
              name: "OpsPilot",
              description: "Automatización de flujos operativos",
              status: copy.badges.soon,
              tone: "soon" as const,
            },
          ]
        : [
            {
              name: "Pictolink",
              description: "Accessible communication platform",
              status: copy.badges.live,
              tone: "live" as const,
            },
            {
              name: "LeIA",
              description: "AI-driven enterprise assistant",
              status: copy.badges.beta,
              tone: "beta" as const,
            },
            {
              name: "OpsPilot",
              description: "Workflow automation for operations teams",
              status: copy.badges.soon,
              tone: "soon" as const,
            },
          ],
    [copy.badges.beta, copy.badges.live, copy.badges.soon, language]
  );

  const mobilePanelItemClass = cn(
    "w-full rounded-lg px-1 py-1.5 text-left text-sm transition-colors",
    isLightMode ? "text-slate-700 hover:text-slate-900" : "text-white/80 hover:text-white"
  );

  const currentMobileTitle =
    mobileMenuView === "services"
      ? copy.services
      : mobileMenuView === "products"
        ? copy.products
        : copy.industries;

  const renderDesktopMegaMenu = () => {
    if (!openDesktopMenu) return null;

    return (
      <div className="pointer-events-auto -mt-px transition-all duration-300 ease-in-out">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn("overflow-hidden rounded-2xl backdrop-blur-xl p-6", dropdownThemeClasses)}>
            {openDesktopMenu === "services" && (
              <div className="grid grid-cols-3 gap-x-7 gap-y-6">
                {copy.servicesCategories.map((category) => (
                  <div
                    key={category.title}
                    className={cn(
                      "border-l pl-4",
                      isLightMode ? "border-[#2F64FF]/35" : "border-[#2F64FF]/45"
                    )}
                  >
                    <p className={cn("mb-2.5 text-[0.8rem] font-bold uppercase tracking-[0.09em]", isLightMode ? "text-slate-900" : "text-white/95")}>
                      {category.title}
                    </p>
                    <div className="space-y-1">
                      {category.items.map((item) => (
                        <button key={item.title} type="button" className="group w-full rounded-md px-0.5 py-1.5 text-left" onClick={() => navigateToSection("servicios")}>
                          <p className={serviceItemTitleClass}>{item.title}</p>
                          <p className={serviceItemDescriptionClass}>{item.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {openDesktopMenu === "products" && (
              <div className="grid grid-cols-[1.45fr_0.95fr] gap-8">
                <div className={cn("rounded-xl border px-5 py-3", isLightMode ? "border-slate-200/90 bg-white" : "border-white/10 bg-white/[0.03]")}>
                  {productEntries.map((item) => (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => navigateToSection("portafolio")}
                      className={cn(
                        "group flex w-full items-start justify-between gap-4 border-b py-3 text-left last:border-b-0",
                        isLightMode ? "border-slate-200 hover:bg-slate-50/70" : "border-white/10 hover:bg-white/5"
                      )}
                    >
                      <div>
                        <p className="text-[0.98rem] font-semibold leading-none">{item.name}</p>
                        <p className={cn("mt-1.5 text-[0.92rem]", isLightMode ? "text-slate-600" : "text-white/70")}>{item.description}</p>
                      </div>
                      <span
                        className={cn(
                          "mt-0.5 rounded-full px-2 py-0.5 text-[0.68rem] font-semibold",
                          item.tone === "live"
                            ? isLightMode
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-emerald-500/20 text-emerald-300"
                            : item.tone === "beta"
                              ? isLightMode
                                ? "bg-amber-100 text-amber-700"
                                : "bg-amber-500/20 text-amber-300"
                              : isLightMode
                                ? "bg-slate-100 text-slate-700"
                                : "bg-slate-500/25 text-slate-300"
                        )}
                      >
                        {item.status}
                      </span>
                    </button>
                  ))}
                </div>

                <div className={cn("overflow-hidden rounded-xl border", isLightMode ? "border-slate-200 bg-white" : "border-white/10 bg-white/[0.03]")}>
                  <img
                    src={language === "es" ? "/assets/picto-link-landing-es.webp" : "/assets/picto-link-landing-en.webp"}
                    alt={copy.productsHighlightTitle}
                    className="h-28 w-full object-cover"
                    loading="lazy"
                  />
                  <div className="p-4">
                    <p className="text-[1rem] font-semibold leading-snug">{copy.productsHighlightTitle}</p>
                    <p className={cn("mt-2 text-[0.93rem]", isLightMode ? "text-slate-600" : "text-white/70")}>{copy.productsHighlightText}</p>
                    <button
                      type="button"
                      onClick={() => navigateToSection("portafolio")}
                      className="mt-4 inline-flex items-center text-sm font-semibold text-[#2F64FF] transition-opacity hover:opacity-80"
                    >
                      {copy.productsHighlightButton}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {openDesktopMenu === "industries" && (
              <div className="grid grid-cols-3 gap-2">
                {copy.industriesItems.map((industry) => (
                  <button
                    key={industry}
                    type="button"
                    className={dropdownItemClass}
                    onClick={() => navigateToSection("contacto")}
                  >
                    {industry}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50" onMouseLeave={scheduleDesktopClose}>
      <nav
        aria-label="Primary"
        className={cn("h-[80px] backdrop-blur-[12px] transition-all duration-300 ease-in-out", navThemeClasses)}
      >
        <div className={cn(
          "container mx-auto h-full px-4 sm:px-6 lg:px-8",
          isDesktop ? "grid grid-cols-[auto_1fr_auto] items-center" : "flex items-center justify-between"
        )}>
          <button type="button" onClick={() => navigateToSection()} className="inline-flex items-center">
            <SmartImage src={logoSrc} alt={t("navbar.logoAlt")} priority width={160} height={64} className="h-10 w-auto" />
          </button>

          {isDesktop ? (
            <>
              <ul className="mx-auto flex items-center gap-8" role="menubar">
                <li
                  role="none"
                  onMouseEnter={() => {
                    clearCloseTimer();
                    setOpenDesktopMenu("services");
                  }}
                >
                  <button type="button" className={navItemClass} role="menuitem" aria-expanded={openDesktopMenu === "services"}>
                    {copy.services} <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                </li>

                <li
                  role="none"
                  onMouseEnter={() => {
                    clearCloseTimer();
                    setOpenDesktopMenu("products");
                  }}
                >
                  <button type="button" className={navItemClass} role="menuitem" aria-expanded={openDesktopMenu === "products"}>
                    {copy.products} <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                </li>

                <li
                  role="none"
                  onMouseEnter={() => {
                    clearCloseTimer();
                    setOpenDesktopMenu("industries");
                  }}
                >
                  <button type="button" className={navItemClass} role="menuitem" aria-expanded={openDesktopMenu === "industries"}>
                    {copy.industries} <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                </li>

                <li role="none">
                  <button type="button" className={navItemClass} role="menuitem" onMouseEnter={() => setOpenDesktopMenu(null)} onClick={() => navigateToSection("estandares")}>
                    {copy.standards}
                  </button>
                </li>

                <li role="none">
                  <button type="button" className={navItemClass} role="menuitem" onMouseEnter={() => setOpenDesktopMenu(null)} onClick={() => navigateToSection("clientes")}>
                    {copy.clients}
                  </button>
                </li>
              </ul>

              <button
                type="button"
                onMouseEnter={() => setOpenDesktopMenu(null)}
                onClick={() => navigateToSection("contacto")}
                className="justify-self-end inline-flex h-10 items-center rounded-xl bg-[#2F64FF] px-5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                {copy.contactSales}
              </button>
            </>
          ) : (
            <button
              type="button"
              aria-label={language === "es" ? "Abrir menú de navegación" : "Toggle navigation menu"}
              onClick={() => {
                setIsMobileMenuOpen((prev) => {
                  const next = !prev;
                  if (next) {
                    setMobileMenuView("root");
                  }
                  return next;
                });
              }}
              className={cn(
                "inline-flex h-10 w-10 items-center justify-center rounded-lg border transition-colors",
                isLightMode ? "border-black/15 hover:bg-black/5" : "border-white/15 hover:bg-white/10"
              )}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          )}
        </div>
      </nav>

      {isDesktop ? (
        <div
          className={cn(
            "pointer-events-none transition-all duration-300 ease-in-out",
            openDesktopMenu ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          )}
          onMouseEnter={clearCloseTimer}
          onMouseLeave={scheduleDesktopClose}
        >
          {renderDesktopMegaMenu()}
        </div>
      ) : (
        <div
          className={cn(
            "overflow-hidden border-b backdrop-blur-[12px] transition-all duration-300 ease-in-out",
            navThemeClasses,
            isMobileMenuOpen ? "h-[calc(100vh-80px)]" : "h-0 border-transparent"
          )}
        >
          <div className="container mx-auto flex h-full flex-col px-4 pb-5 pt-2 sm:px-6">
            <div className="flex-1 overflow-y-auto pr-1">
              {mobileMenuView === "root" ? (
                <div className="space-y-1">
                  {([
                    { key: "services", label: copy.services },
                    { key: "products", label: copy.products },
                    { key: "industries", label: copy.industries },
                  ] as Array<{ key: Exclude<MobileMenuView, "root">; label: string }>).map((menu) => (
                    <button
                      key={menu.key}
                      type="button"
                      onClick={() => setMobileMenuView(menu.key)}
                      className={cn(
                        "flex w-full items-center justify-between border-b border-dashed py-3 text-left text-[1.05rem] font-medium",
                        isLightMode ? "border-black/10 hover:text-black" : "border-white/15 hover:text-white"
                      )}
                    >
                      <span>{menu.label}</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => navigateToSection("estandares")}
                    className={cn(
                      "flex w-full items-center justify-between border-b border-dashed py-3 text-left text-[1.05rem] font-medium",
                      isLightMode ? "border-black/10 hover:text-black" : "border-white/15 hover:text-white"
                    )}
                  >
                    <span>{copy.standards}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => navigateToSection("clientes")}
                    className={cn(
                      "flex w-full items-center justify-between border-b border-dashed py-3 text-left text-[1.05rem] font-medium",
                      isLightMode ? "border-black/10 hover:text-black" : "border-white/15 hover:text-white"
                    )}
                  >
                    <span>{copy.clients}</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-4 pt-1">
                  <button
                    type="button"
                    onClick={() => setMobileMenuView("root")}
                    className={cn(
                      "inline-flex items-center gap-1.5 text-sm font-medium",
                      isLightMode ? "text-slate-700 hover:text-slate-900" : "text-white/80 hover:text-white"
                    )}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    {copy.back}
                  </button>

                  <h3 className="text-lg font-semibold">{currentMobileTitle}</h3>

                  <div className={cn("space-y-1 border-t pt-3", isLightMode ? "border-black/10" : "border-white/15")}>
                    {mobileMenuView === "services" &&
                      mobileServicesCategories.map((category) => (
                        <div key={category.title} className="pt-2 first:pt-0">
                          <p className={cn("mb-1 text-[0.68rem] font-semibold uppercase tracking-[0.08em]", isLightMode ? "text-slate-500" : "text-white/55")}>
                            {category.title}
                          </p>
                          {category.items.map((item) => (
                            <button key={item.title} type="button" className={cn("w-full rounded-lg px-1 py-1.5 text-left", isLightMode ? "hover:bg-black/5" : "hover:bg-white/5")} onClick={() => navigateToSection("servicios")}>
                              <p className={cn("text-sm font-semibold", isLightMode ? "text-[#2F64FF]" : "text-[#9fb8ff]")}>{item.title}</p>
                              <p className={cn("text-xs", isLightMode ? "text-slate-600" : "text-white/65")}>{item.description}</p>
                            </button>
                          ))}
                        </div>
                      ))}

                    {mobileMenuView === "products" &&
                      mobileProductItems.map((item) => (
                        <button key={item} type="button" className={mobilePanelItemClass} onClick={() => navigateToSection("portafolio")}>
                          {item}
                        </button>
                      ))}

                    {mobileMenuView === "industries" &&
                      mobileIndustryItems.map((item) => (
                        <button key={item} type="button" className={mobilePanelItemClass} onClick={() => navigateToSection("contacto")}>
                          {item}
                        </button>
                      ))}
                  </div>
                </div>
              )}
            </div>

            <div className={cn("pt-4", isLightMode ? "border-t border-black/10" : "border-t border-white/15")}>
              <div
                className={cn(
                  "rounded-xl border p-3.5",
                  isLightMode
                    ? "border-black/10 bg-white/70"
                    : "border-white/15 bg-[rgba(255,255,255,0.03)]"
                )}
              >
                <p className="text-sm font-semibold">{copy.mobileLeadTitle}</p>
                <p className={cn("mt-1 text-xs", isLightMode ? "text-slate-600" : "text-white/70")}>
                  {copy.mobileLeadText}
                </p>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => navigateToSection("contacto")}
                    className="inline-flex h-10 w-full items-center justify-center rounded-lg bg-[#2F64FF] px-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    {copy.contactSales}
                  </button>

                  <button
                    type="button"
                    onClick={() => navigateToSection("portafolio")}
                    className={cn(
                      "inline-flex h-10 w-full items-center justify-center rounded-lg border px-3 text-sm font-semibold transition-colors",
                      isLightMode
                        ? "border-black/15 text-slate-800 hover:bg-black/5"
                        : "border-white/20 text-white/90 hover:bg-white/10"
                    )}
                  >
                    {copy.viewWork}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
