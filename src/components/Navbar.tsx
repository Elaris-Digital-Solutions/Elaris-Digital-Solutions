import { ChevronDown, ChevronLeft, ChevronRight, Menu, X, Monitor, Brain, Plug, Settings2, ShoppingBag, TrendingUp, ArrowRight, HeartPulse, GraduationCap, Truck, Landmark, Building2, Rocket, Briefcase, Factory, Link2, Bot, GitBranch, Users, Palette, Gem, FileText, Printer, UtensilsCrossed, Wrench, Plane, Film, Hotel, ShoppingCart, Cpu } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SmartImage from "@/components/ui/smart-image";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type DesktopMenuKey = "services" | "products" | "industries" | null;
type MobileMenuView = "root" | "services" | "products" | "industries";

const Navbar = () => {
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.innerWidth >= 1024;
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileMenuView, setMobileMenuView] = useState<MobileMenuView>("root");
  const [openDesktopMenu, setOpenDesktopMenu] = useState<DesktopMenuKey>(null);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isNavHovered, setIsNavHovered] = useState(false);

  const closeTimerRef = useRef<number | null>(null);
  const navigate = useNavigate();
  const { t } = useI18n();

  const basePath = "/";

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
    const onScroll = () => setIsAtTop(window.scrollY < 40);

    const raf = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
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

  const isOpaque = !isAtTop || isNavHovered || !!openDesktopMenu || isMobileMenuOpen;

  const navThemeClasses = isOpaque
    ? "bg-white text-[#111] border-b border-black/10 shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
    : "bg-transparent text-[#111] border-b border-transparent shadow-none";

  const dropdownThemeClasses = "bg-white border border-black/10 shadow-[0_22px_50px_rgba(15,23,42,0.12)]";

  const navItemClass = "inline-flex h-9 items-center px-2 text-[0.95rem] font-medium text-[#111] transition-colors hover:text-black";

  // Dropdown panel is always bg-white, so inner text always uses light-mode colors
  // regardless of scroll position (isLightMode).
  const dropdownItemClass =
    "w-full rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-slate-100 text-slate-700 hover:text-slate-900";

  const serviceItemTitleClass =
    "text-[0.99rem] font-semibold leading-tight transition-colors text-[#2F64FF] group-hover:text-[#1f4de0]";

  const serviceItemDescriptionClass =
    "mt-0.5 text-[0.94rem] leading-snug text-slate-600";

  const logoSrc = "/assets/ElarisLogo.png";

  const copy = useMemo(() => {
    return {
        services: "Servicios",
        products: "Productos",
        industries: "Industrias",
        standards: "Estándares",
        clients: "Testimonios",
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
                href: "/desarrollo-software-medida",
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
          "Educación",
          "Proyectos Sociales",
          "Cultura",
          "Joyerías",
          "Papelerías",
          "Imprentas",
          "Retail",
          "Logística",
          "Restaurantes",
          "Clínicas Privadas",
          "Industria",
          "Manufactura",
          "Empresas Corporativas",
          "Aviación Virtual",
          "Entretenimiento",
          "Hospitalidad",
          "E-commerce",
          "Startups",
          "PYMES",
          "Tecnología",
        ],
    };
  }, []);

  const mobileServicesCategories = copy.servicesCategories;
  const mobileProductItems = copy.productsItems;
  const mobileIndustryItems = copy.industriesItems;
  const productEntries = useMemo(
    () => [
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
    ],
    [copy.badges.beta, copy.badges.live, copy.badges.soon]
  );

  const mobilePanelItemClass =
    "w-full rounded-lg px-1 py-1.5 text-left text-sm transition-colors text-slate-700 hover:text-slate-900";

  const currentMobileTitle =
    mobileMenuView === "services"
      ? copy.services
      : mobileMenuView === "products"
        ? copy.products
        : copy.industries;

  const renderDesktopMegaMenu = () => {
    if (!openDesktopMenu) return null;

    return (
      <div className="-mt-px transition-all duration-300 ease-in-out">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* pointer-events-auto is applied ONLY to the card so the sides of the screen don't block mouseLeave */}
          <div className={cn("pointer-events-auto overflow-hidden rounded-2xl backdrop-blur-xl p-6", dropdownThemeClasses)}>
            {openDesktopMenu === "services" && (() => {
              const categoryIcons = [Monitor, Brain, Plug, Settings2, ShoppingBag, TrendingUp];
              const ctaText = { title: "¿Necesitas una solución a medida?", sub: "Hablemos y diseñamos la arquitectura ideal para tu negocio.", btn: "Agenda una llamada" };
              return (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    {copy.servicesCategories.map((category, catIndex) => {
                      const Icon = categoryIcons[catIndex] ?? Monitor;
                      return (
                        <div key={category.title} className="rounded-xl bg-slate-50 border border-slate-100 p-4 hover:border-[#2F64FF]/20 hover:bg-blue-50/30 transition-colors">
                          <div className="flex items-center gap-2.5 mb-3">
                            <div className="w-7 h-7 rounded-lg bg-[#2F64FF]/10 flex items-center justify-center flex-shrink-0">
                              <Icon className="w-3.5 h-3.5 text-[#2F64FF]" />
                            </div>
                            <p className="text-[0.72rem] font-bold uppercase tracking-wide text-slate-500 leading-tight">
                              {category.title}
                            </p>
                          </div>
                          <div className="space-y-0.5">
                            {category.items.map((item) => (
                              <button
                                key={item.title}
                                type="button"
                                className="group w-full rounded-lg px-2 py-1.5 text-left hover:bg-white hover:shadow-sm transition-all duration-150"
                                onClick={() => {
                                  if ('href' in item && item.href) {
                                    setIsMobileMenuOpen(false);
                                    setMobileMenuView("root");
                                    setOpenDesktopMenu(null);
                                    navigate(item.href);
                                    window.scrollTo(0, 0);
                                  } else {
                                    navigateToSection("servicios");
                                  }
                                }}
                              >
                                <p className="text-[0.84rem] font-medium text-slate-800 group-hover:text-[#2F64FF] transition-colors leading-snug">
                                  {item.title}
                                </p>
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-[#2F64FF]/15 bg-gradient-to-r from-[#2F64FF]/5 to-blue-50/60 px-5 py-3.5">
                    <div>
                      <p className="text-[0.92rem] font-semibold text-slate-900">{ctaText.title}</p>
                      <p className="text-[0.82rem] text-slate-500 mt-0.5">{ctaText.sub}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => navigateToSection("contacto")}
                      className="ml-6 flex-shrink-0 inline-flex h-9 items-center gap-1.5 rounded-xl bg-[#2F64FF] px-4 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                    >
                      {ctaText.btn}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })()}

            {openDesktopMenu === "products" && (() => {
              // Each entry maps a product name to a lucide icon — add more as the product line grows
              const productIconMap: Record<string, React.ElementType> = {
                Pictolink: Link2,
                LeIA: Bot,
                OpsPilot: GitBranch,
              };
              const ctaProducts = { title: "El ecosistema de productos Elaris crece constantemente.", btn: "Ver todos los productos" };
              return (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    {productEntries.map((item) => {
                      const Icon = productIconMap[item.name] ?? Bot;
                      return (
                        <button
                          key={item.name}
                          type="button"
                          onClick={() => navigateToSection("portafolio")}
                          className="group flex items-start gap-4 rounded-xl bg-slate-50 border border-slate-100 p-4 text-left hover:border-[#2F64FF]/20 hover:bg-blue-50/30 transition-colors"
                        >
                          <div className="w-9 h-9 rounded-xl bg-[#2F64FF]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Icon className="w-4 h-4 text-[#2F64FF]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="text-[0.92rem] font-bold text-slate-900 group-hover:text-[#2F64FF] transition-colors">{item.name}</p>
                              <span className="rounded-full px-2 py-0.5 text-[0.62rem] font-semibold leading-none bg-slate-100 text-slate-500">
                                {item.status}
                              </span>
                            </div>
                            <p className="text-[0.8rem] text-slate-500 leading-snug line-clamp-2">{item.description}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-[#2F64FF]/15 bg-gradient-to-r from-[#2F64FF]/5 to-blue-50/60 px-5 py-3">
                    <p className="text-[0.82rem] text-slate-600">{ctaProducts.title}</p>
                    <button
                      type="button"
                      onClick={() => navigateToSection("portafolio")}
                      className="ml-6 flex-shrink-0 inline-flex h-9 items-center gap-1.5 rounded-xl bg-[#2F64FF] px-4 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                    >
                      {ctaProducts.btn}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })()}

            {openDesktopMenu === "industries" && (() => {
              const industryIconList: React.ElementType[] = [
                GraduationCap, Users, Palette, Gem,
                FileText, Printer, ShoppingBag, Truck,
                UtensilsCrossed, HeartPulse, Factory, Wrench,
                Building2, Plane, Film, Hotel,
                ShoppingCart, Rocket, Briefcase, Cpu,
              ];
              const ctaIndustries = { title: "¿Tu sector no aparece?", sub: "Trabajamos con cualquier industria. Contáctanos.", btn: "Hablar con un experto" };
              return (
                <div className="space-y-4">
                  <div className="grid grid-cols-4 gap-2">
                    {copy.industriesItems.map((industry, i) => {
                      const Icon = industryIconList[i] ?? Building2;
                      return (
                        <button
                          key={industry}
                          type="button"
                          onClick={() => navigateToSection("contacto")}
                          className="group flex items-center gap-3 rounded-xl bg-slate-50 border border-slate-100 px-4 py-3 text-left hover:border-[#2F64FF]/20 hover:bg-blue-50/30 transition-colors"
                        >
                          <div className="w-7 h-7 rounded-lg bg-[#2F64FF]/10 flex items-center justify-center flex-shrink-0">
                            <Icon className="w-3.5 h-3.5 text-[#2F64FF]" />
                          </div>
                          <span className="text-[0.88rem] font-medium text-slate-800 group-hover:text-[#2F64FF] transition-colors">
                            {industry}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-[#2F64FF]/15 bg-gradient-to-r from-[#2F64FF]/5 to-blue-50/60 px-5 py-3.5">
                    <div>
                      <p className="text-[0.92rem] font-semibold text-slate-900">{ctaIndustries.title}</p>
                      <p className="text-[0.82rem] text-slate-500 mt-0.5">{ctaIndustries.sub}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => navigateToSection("contacto")}
                      className="ml-6 flex-shrink-0 inline-flex h-9 items-center gap-1.5 rounded-xl bg-[#2F64FF] px-4 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                    >
                      {ctaIndustries.btn}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    );
  };

  return (
    <header
      className="fixed left-0 right-0 top-0 z-50"
      onMouseEnter={() => { clearCloseTimer(); setIsNavHovered(true); }}
      onMouseLeave={() => { scheduleDesktopClose(); setIsNavHovered(false); }}
    >
      <nav
        aria-label="Primary"
        className={cn("h-[80px] transition-[background-color,border-color,box-shadow] duration-200 ease-in-out", navThemeClasses)}
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
              aria-label="Abrir menú de navegación"
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
                "border-black/15 hover:bg-black/5"
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
                      className="flex w-full items-center justify-between border-b border-dashed border-black/10 py-3 text-left text-[1.05rem] font-medium hover:text-black"
                    >
                      <span>{menu.label}</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => navigateToSection("estandares")}
                    className="flex w-full items-center justify-between border-b border-dashed border-black/10 py-3 text-left text-[1.05rem] font-medium hover:text-black"
                  >
                    <span>{copy.standards}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => navigateToSection("clientes")}
                    className="flex w-full items-center justify-between border-b border-dashed border-black/10 py-3 text-left text-[1.05rem] font-medium hover:text-black"
                  >
                    <span>{copy.clients}</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-4 pt-1">
                  <button
                    type="button"
                    onClick={() => setMobileMenuView("root")}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 hover:text-slate-900"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    {copy.back}
                  </button>

                  <h3 className="text-lg font-semibold">{currentMobileTitle}</h3>

                  <div className="space-y-1 border-t border-black/10 pt-3">
                    {mobileMenuView === "services" && (() => {
                      const categoryIcons = [Monitor, Brain, Plug, Settings2, ShoppingBag, TrendingUp];
                      return mobileServicesCategories.map((category, catIndex) => {
                        const Icon = categoryIcons[catIndex] ?? Monitor;
                        return (
                          <div key={category.title} className="rounded-xl bg-slate-50 border border-slate-100 p-3 mb-2 last:mb-0">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-6 h-6 rounded-lg bg-[#2F64FF]/10 flex items-center justify-center flex-shrink-0">
                                <Icon className="w-3 h-3 text-[#2F64FF]" />
                              </div>
                              <p className="text-[0.68rem] font-bold uppercase tracking-wide text-slate-500 leading-tight">
                                {category.title}
                              </p>
                            </div>
                            <div className="space-y-0.5">
                              {category.items.map((item) => (
                                <button
                                  key={item.title}
                                  type="button"
                                  className="group w-full rounded-lg px-2 py-1.5 text-left hover:bg-white hover:shadow-sm transition-all"
                                  onClick={() => {
                                    if ('href' in item && item.href) {
                                      setIsMobileMenuOpen(false);
                                      setMobileMenuView("root");
                                      setOpenDesktopMenu(null);
                                      navigate(item.href);
                                      window.scrollTo(0, 0);
                                    } else {
                                      navigateToSection("servicios");
                                    }
                                  }}
                                >
                                  <p className="text-sm font-medium text-slate-800 group-hover:text-[#2F64FF] transition-colors">{item.title}</p>
                                </button>
                              ))}
                            </div>
                          </div>
                        );
                      });
                    })()}

                    {mobileMenuView === "products" && (() => {
                      const productIconMap: Record<string, React.ElementType> = {
                        Pictolink: Link2,
                        LeIA: Bot,
                        OpsPilot: GitBranch,
                      };
                      return productEntries.map((item) => {
                        const Icon = productIconMap[item.name] ?? Bot;
                        return (
                          <button
                            key={item.name}
                            type="button"
                            className="group flex items-start gap-3 w-full rounded-xl bg-slate-50 border border-slate-100 p-3 text-left hover:border-[#2F64FF]/20 hover:bg-blue-50/30 transition-colors mb-2 last:mb-0"
                            onClick={() => navigateToSection("portafolio")}
                          >
                            <div className="w-8 h-8 rounded-lg bg-[#2F64FF]/10 flex items-center justify-center flex-shrink-0">
                              <Icon className="w-4 h-4 text-[#2F64FF]" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-0.5">
                                <p className="text-sm font-bold text-slate-900 group-hover:text-[#2F64FF] transition-colors">{item.name}</p>
                                <span className="rounded-full px-1.5 py-0.5 text-[0.6rem] font-semibold leading-none bg-slate-100 text-slate-500">{item.status}</span>
                              </div>
                              <p className="text-xs text-slate-500 leading-snug">{item.description}</p>
                            </div>
                          </button>
                        );
                      });
                    })()}

                    {mobileMenuView === "industries" && (() => {
                      const industryIconList: React.ElementType[] = [
                        GraduationCap, Users, Palette, Gem,
                        FileText, Printer, ShoppingBag, Truck,
                        UtensilsCrossed, HeartPulse, Factory, Wrench,
                        Building2, Plane, Film, Hotel,
                        ShoppingCart, Rocket, Briefcase, Cpu,
                      ];
                      return (
                        <div className="grid grid-cols-2 gap-2">
                          {mobileIndustryItems.map((item, i) => {
                            const Icon = industryIconList[i] ?? Building2;
                            return (
                              <button
                                key={item}
                                type="button"
                                className="group flex items-center gap-2.5 rounded-xl bg-slate-50 border border-slate-100 px-3 py-2.5 text-left hover:border-[#2F64FF]/20 hover:bg-blue-50/30 transition-colors"
                                onClick={() => navigateToSection("contacto")}
                              >
                                <div className="w-6 h-6 rounded-lg bg-[#2F64FF]/10 flex items-center justify-center flex-shrink-0">
                                  <Icon className="w-3 h-3 text-[#2F64FF]" />
                                </div>
                                <span className="text-[0.82rem] font-medium text-slate-800 group-hover:text-[#2F64FF] transition-colors leading-tight">{item}</span>
                              </button>
                            );
                          })}
                        </div>
                      );
                    })()}
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-black/10 pt-4">
              <div
                className="rounded-xl border border-black/10 bg-white/70 p-3.5"
              >
                <p className="text-sm font-semibold">{copy.mobileLeadTitle}</p>
                <p className="mt-1 text-xs text-slate-600">
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
                    className="inline-flex h-10 w-full items-center justify-center rounded-lg border border-black/15 px-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-black/5"
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
