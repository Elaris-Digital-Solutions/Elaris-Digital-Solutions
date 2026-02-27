import { ChevronDown, ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SmartImage from "@/components/ui/smart-image";
import { cn } from "@/lib/utils";

type DesktopMenuKey = "services" | "products" | "industries" | null;
type MobileMenuView = "root" | "services" | "products" | "industries";

const getLanguageBasePath = (pathname: string) => {
  const segments = pathname.split("/").filter(Boolean);
  return segments[0] === "es" ? "/es" : "/";
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

  const logoSrc = isLightMode ? "/assets/ElarisLogo.png" : "/assets/ElarisLogoWhite.png";

  const mobileServicesItems = [
    "Enterprise Websites",
    "E-commerce Systems",
    "Custom Web Platforms",
    "Custom Software",
    "Process Automation",
    "System Integration",
    "AI Implementation",
    "AI Assistants",
    "Data Intelligence",
    "LLM Integrations",
  ];

  const mobileProductItems = [
    "Pictolink — Accessible communication platform (Live)",
    "LeIA — AI-driven enterprise assistant (Beta)",
    "OpsPilot — Workflow automation (Coming soon)",
  ];

  const mobileIndustryItems = [
    "Healthcare",
    "Education",
    "Retail",
    "Logistics",
    "Finance",
    "Government",
    "Startups",
    "SMEs",
    "Enterprise",
  ];

  const mobilePanelItemClass = cn(
    "w-full rounded-lg px-1 py-1.5 text-left text-sm transition-colors",
    isLightMode ? "text-slate-700 hover:text-slate-900" : "text-white/80 hover:text-white"
  );

  const currentMobileTitle =
    mobileMenuView === "services"
      ? "Services"
      : mobileMenuView === "products"
        ? "Products"
        : "Industries";

  const renderDesktopMegaMenu = () => {
    if (!openDesktopMenu) return null;

    return (
      <div className="pointer-events-auto -mt-px transition-all duration-300 ease-in-out">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn("overflow-hidden rounded-2xl backdrop-blur-xl p-6", dropdownThemeClasses)}>
            {openDesktopMenu === "services" && (
              <div className="grid grid-cols-4 gap-6">
                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] opacity-70">Digital Platforms</p>
                  <div className="space-y-1">
                    <button type="button" className={dropdownItemClass} onClick={() => navigateToSection("servicios")}>Enterprise Websites</button>
                    <button type="button" className={dropdownItemClass} onClick={() => navigateToSection("servicios")}>E-commerce Systems</button>
                    <button type="button" className={dropdownItemClass} onClick={() => navigateToSection("servicios")}>Custom Web Platforms</button>
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] opacity-70">Software Engineering</p>
                  <div className="space-y-1">
                    <button type="button" className={dropdownItemClass} onClick={() => navigateToSection("servicios")}>Custom Software</button>
                    <button type="button" className={dropdownItemClass} onClick={() => navigateToSection("servicios")}>Process Automation</button>
                    <button type="button" className={dropdownItemClass} onClick={() => navigateToSection("servicios")}>System Integration</button>
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] opacity-70">AI & Data</p>
                  <div className="space-y-1">
                    <button type="button" className={dropdownItemClass} onClick={() => navigateToSection("servicios")}>AI Implementation</button>
                    <button type="button" className={dropdownItemClass} onClick={() => navigateToSection("servicios")}>AI Assistants</button>
                    <button type="button" className={dropdownItemClass} onClick={() => navigateToSection("servicios")}>Data Intelligence</button>
                    <button type="button" className={dropdownItemClass} onClick={() => navigateToSection("servicios")}>LLM Integrations</button>
                  </div>
                </div>

                <div className={cn("rounded-xl p-4", isLightMode ? "bg-slate-50" : "bg-white/5")}>
                  <p className="text-sm font-semibold">Need a tailored solution?</p>
                  <p className={cn("mt-2 text-sm", isLightMode ? "text-slate-600" : "text-white/70")}>
                    Talk to our team to map architecture, delivery scope, and roadmap.
                  </p>
                  <button
                    type="button"
                    onClick={() => navigateToSection("contacto")}
                    className="mt-4 inline-flex h-10 items-center rounded-lg bg-[#2F64FF] px-4 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    Book strategy session
                  </button>
                </div>
              </div>
            )}

            {openDesktopMenu === "products" && (
              <div className="grid grid-cols-[1.7fr_1fr] gap-6">
                <div className="grid grid-cols-2 gap-3">
                  <button type="button" className={cn("rounded-xl border p-4 text-left", isLightMode ? "border-slate-200 hover:bg-slate-50" : "border-white/10 bg-white/5 hover:bg-white/10")} onClick={() => navigateToSection("portafolio")}>
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold">Pictolink</p>
                      <span className={cn("rounded-full px-2 py-0.5 text-[0.7rem] font-semibold", isLightMode ? "bg-emerald-100 text-emerald-700" : "bg-emerald-500/20 text-emerald-300")}>Live</span>
                    </div>
                    <p className={cn("mt-2 text-sm", isLightMode ? "text-slate-600" : "text-white/70")}>Accessible communication platform</p>
                  </button>

                  <button type="button" className={cn("rounded-xl border p-4 text-left", isLightMode ? "border-slate-200 hover:bg-slate-50" : "border-white/10 bg-white/5 hover:bg-white/10")} onClick={() => navigateToSection("portafolio")}>
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold">LeIA</p>
                      <span className={cn("rounded-full px-2 py-0.5 text-[0.7rem] font-semibold", isLightMode ? "bg-amber-100 text-amber-700" : "bg-amber-500/20 text-amber-300")}>Beta</span>
                    </div>
                    <p className={cn("mt-2 text-sm", isLightMode ? "text-slate-600" : "text-white/70")}>AI-driven enterprise assistant</p>
                  </button>

                  <button type="button" className={cn("rounded-xl border p-4 text-left", isLightMode ? "border-slate-200 hover:bg-slate-50" : "border-white/10 bg-white/5 hover:bg-white/10")} onClick={() => navigateToSection("portafolio")}>
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold">OpsPilot</p>
                      <span className={cn("rounded-full px-2 py-0.5 text-[0.7rem] font-semibold", isLightMode ? "bg-slate-100 text-slate-700" : "bg-slate-500/25 text-slate-300")}>Coming soon</span>
                    </div>
                    <p className={cn("mt-2 text-sm", isLightMode ? "text-slate-600" : "text-white/70")}>Workflow automation for operations teams</p>
                  </button>
                </div>

                <div className={cn("rounded-xl p-4", isLightMode ? "bg-slate-50" : "bg-white/5")}>
                  <p className="text-sm font-semibold">Explore our product ecosystem</p>
                  <p className={cn("mt-2 text-sm", isLightMode ? "text-slate-600" : "text-white/70")}>From communication to AI operations, discover solutions built for scale.</p>
                  <button
                    type="button"
                    onClick={() => navigateToSection("portafolio")}
                    className="mt-4 inline-flex h-10 items-center rounded-lg bg-[#2F64FF] px-4 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    View all products
                  </button>
                </div>
              </div>
            )}

            {openDesktopMenu === "industries" && (
              <div className="grid grid-cols-3 gap-2">
                {[
                  "Healthcare",
                  "Education",
                  "Retail",
                  "Logistics",
                  "Finance",
                  "Government",
                  "Startups",
                  "SMEs",
                  "Enterprise",
                ].map((industry) => (
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
        <div className="container mx-auto flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
          <button type="button" onClick={() => navigateToSection()} className="inline-flex items-center">
            <SmartImage src={logoSrc} alt="Elaris" priority width={160} height={64} className="h-10 w-auto" />
          </button>

          {isDesktop ? (
            <div className="flex items-center gap-7">
              <ul className="flex items-center gap-5" role="menubar">
                <li
                  role="none"
                  onMouseEnter={() => {
                    clearCloseTimer();
                    setOpenDesktopMenu("services");
                  }}
                >
                  <button type="button" className={navItemClass} role="menuitem" aria-expanded={openDesktopMenu === "services"}>
                    Services <ChevronDown className="ml-1 h-4 w-4" />
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
                    Products <ChevronDown className="ml-1 h-4 w-4" />
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
                    Industries <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                </li>

                <li role="none">
                  <button type="button" className={navItemClass} role="menuitem" onMouseEnter={() => setOpenDesktopMenu(null)} onClick={() => navigateToSection("estandares")}>
                    Standards
                  </button>
                </li>

                <li role="none">
                  <button type="button" className={navItemClass} role="menuitem" onMouseEnter={() => setOpenDesktopMenu(null)} onClick={() => navigateToSection("clientes")}>
                    Clients
                  </button>
                </li>
              </ul>

              <button
                type="button"
                onMouseEnter={() => setOpenDesktopMenu(null)}
                onClick={() => navigateToSection("contacto")}
                className="inline-flex h-10 items-center rounded-lg bg-[#2F64FF] px-4 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Book a Call
              </button>
            </div>
          ) : (
            <button
              type="button"
              aria-label="Toggle navigation menu"
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
                    { key: "services", label: "Services" },
                    { key: "products", label: "Products" },
                    { key: "industries", label: "Industries" },
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
                    <span>Standards</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => navigateToSection("clientes")}
                    className={cn(
                      "flex w-full items-center justify-between border-b border-dashed py-3 text-left text-[1.05rem] font-medium",
                      isLightMode ? "border-black/10 hover:text-black" : "border-white/15 hover:text-white"
                    )}
                  >
                    <span>Clients</span>
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
                    Back
                  </button>

                  <h3 className="text-lg font-semibold">{currentMobileTitle}</h3>

                  <div className={cn("space-y-1 border-t pt-3", isLightMode ? "border-black/10" : "border-white/15")}>
                    {mobileMenuView === "services" &&
                      mobileServicesItems.map((item) => (
                        <button key={item} type="button" className={mobilePanelItemClass} onClick={() => navigateToSection("servicios")}>
                          {item}
                        </button>
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
                <p className="text-sm font-semibold">Ready to scale your digital platform?</p>
                <p className={cn("mt-1 text-xs", isLightMode ? "text-slate-600" : "text-white/70")}>
                  Talk to our team and get a clear roadmap for delivery.
                </p>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => navigateToSection("contacto")}
                    className="inline-flex h-10 w-full items-center justify-center rounded-lg bg-[#2F64FF] px-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    Book a Call
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
                    View Work
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
