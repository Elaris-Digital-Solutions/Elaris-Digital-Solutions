import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SmartImage from "@/components/ui/smart-image";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.innerWidth >= 1024;
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isNavHovered, setIsNavHovered] = useState(false);

  const navigate = useNavigate();
  const { t } = useI18n();

  const basePath = "/";

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
      window.history.replaceState({}, "", `${destinationPath}#${sectionId}`);
    };

    if (window.location.pathname !== destinationPath) {
      navigate(destinationPath, { replace: false });
      window.setTimeout(runScroll, 120);
    } else {
      runScroll();
    }

    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const onResize = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
      if (desktop) setIsMobileMenuOpen(false);
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
    const shouldHideFloating = !isDesktop && isMobileMenuOpen;
    window.dispatchEvent(
      new CustomEvent("elaris:mobile-menu-visibility", { detail: { open: shouldHideFloating } })
    );
    return () => {
      window.dispatchEvent(
        new CustomEvent("elaris:mobile-menu-visibility", { detail: { open: false } })
      );
    };
  }, [isDesktop, isMobileMenuOpen]);

  const isOpaque = !isAtTop || isNavHovered || isMobileMenuOpen;

  const navThemeClasses = isOpaque
    ? "bg-white text-[#111] border-b border-black/10 shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
    : "bg-transparent text-[#111] border-b border-transparent shadow-none";

  const navItemClass =
    "inline-flex h-9 items-center px-2 text-[0.95rem] font-medium text-[#111] transition-colors hover:text-[#2F64FF]";

  const logoSrc = "/assets/ElarisLogo.png";

  const navLinks = [
    { label: "Servicios",   section: "servicios"  },
    { label: "Estándares",  section: "estandares" },
    { label: "Portafolio",  section: "portafolio" },
    { label: "Testimonios", section: "clientes"   },
  ] as const;

  return (
    <header
      className="fixed left-0 right-0 top-0 z-50"
      onMouseEnter={() => setIsNavHovered(true)}
      onMouseLeave={() => setIsNavHovered(false)}
    >
      <nav
        aria-label="Primary"
        className={cn(
          "h-[80px] transition-[background-color,border-color,box-shadow] duration-200 ease-in-out",
          navThemeClasses
        )}
      >
        <div
          className={cn(
            "container mx-auto h-full px-4 sm:px-6 lg:px-8",
            isDesktop
              ? "grid grid-cols-[auto_1fr_auto] items-center"
              : "flex items-center justify-between"
          )}
        >
          {/* Logo */}
          <button
            type="button"
            onClick={() => navigateToSection()}
            className="inline-flex items-center"
          >
            <SmartImage
              src={logoSrc}
              alt={t("navbar.logoAlt")}
              priority
              width={160}
              height={64}
              className="h-10 w-auto"
            />
          </button>

          {isDesktop ? (
            <>
              {/* Desktop nav links */}
              <ul className="mx-auto flex items-center gap-8" role="menubar">
                {navLinks.map(({ label, section }) => (
                  <li key={section} role="none">
                    <button
                      type="button"
                      className={navItemClass}
                      role="menuitem"
                      onClick={() => navigateToSection(section)}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                type="button"
                onClick={() => navigateToSection("contacto")}
                className="justify-self-end inline-flex h-10 items-center rounded-xl bg-[#2F64FF] px-5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Contacta con ventas
              </button>
            </>
          ) : (
            <button
              type="button"
              aria-label="Abrir menu de navegacion"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
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

      {/* Mobile menu */}
      {!isDesktop && (
        <div
          className={cn(
            "overflow-hidden border-b backdrop-blur-[12px] transition-all duration-300 ease-in-out",
            navThemeClasses,
            isMobileMenuOpen ? "h-[calc(100vh-80px)]" : "h-0 border-transparent"
          )}
        >
          <div className="container mx-auto flex h-full flex-col px-4 pb-5 pt-2 sm:px-6">
            <div className="flex-1 overflow-y-auto pr-1">
              <div className="space-y-1 pt-2">
                {navLinks.map(({ label, section }) => (
                  <button
                    key={section}
                    type="button"
                    onClick={() => navigateToSection(section)}
                    className="flex w-full items-center justify-between border-b border-dashed border-black/10 py-3 text-left text-[1.05rem] font-medium hover:text-[#2F64FF] transition-colors"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-black/10 pt-4">
              <div className="rounded-xl border border-black/10 bg-white/70 p-3.5">
                <p className="text-sm font-semibold">Listo para escalar tu plataforma digital?</p>
                <p className="mt-1 text-xs text-slate-600">
                  Conversemos y te damos una hoja de ruta clara para ejecutar.
                </p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => navigateToSection("contacto")}
                    className="inline-flex h-10 w-full items-center justify-center rounded-lg bg-[#2F64FF] px-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    Contacta con ventas
                  </button>
                  <button
                    type="button"
                    onClick={() => navigateToSection("portafolio")}
                    className="inline-flex h-10 w-full items-center justify-center rounded-lg border border-black/15 px-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-black/5"
                  >
                    Ver trabajos
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
