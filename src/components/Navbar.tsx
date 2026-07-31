"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SmartImage from "@/components/ui/smart-image";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

// Module-level constant — never recreated on re-render
const NAV_LINKS = [
  { label: "Servicios",      section: "servicios"  },
  { label: "Casos",          section: "portafolio" },
  { label: "Por qué Elaris", section: "estandares" },
  { label: "FAQ",            section: "faq"        },
] as const;

const Navbar = () => {
  // Arranca en false en servidor y cliente por igual: el layout responsive lo
  // resuelve CSS, no JS. Ramificar aqui sobre window.innerWidth hacia que el
  // servidor emitiera la nav de escritorio y el cliente movil el hamburger,
  // y React descartaba todo el HTML del servidor.
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isNavHovered, setIsNavHovered] = useState(false);

  const router = useRouter();
  const { t } = useI18n();

  const basePath = "/";

  const navigateToSection = (sectionId?: string) => {
    const destinationPath = basePath;

    const scrollToTarget = (path: string) => {
      if (!sectionId) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const target = document.getElementById(sectionId);
      if (!target) return;
      const offsetTop = target.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top: Math.max(offsetTop, 0), behavior: "smooth" });
      window.history.replaceState({}, "", `${path}#${sectionId}`);
    };

    // Las páginas de servicio montan su propio <Contact id="contacto">. Si la
    // sección existe aquí, se hace scroll local en vez de saltar al home.
    const existsHere = sectionId ? Boolean(document.getElementById(sectionId)) : false;

    if (existsHere) {
      scrollToTarget(window.location.pathname);
    } else if (window.location.pathname !== destinationPath) {
      router.push(destinationPath);
      window.setTimeout(() => scrollToTarget(destinationPath), 120);
    } else {
      scrollToTarget(destinationPath);
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
    const onScroll = () => {
      const atTop = window.scrollY < 40;
      // Guard: skip setState if value hasn't changed (prevents unnecessary re-renders on every scroll event)
      setIsAtTop((prev) => (prev === atTop ? prev : atTop));
    };
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
    "inline-flex h-9 items-center px-2 text-[0.95rem] font-medium text-[#111] transition-colors hover:text-[#0855FD]";

  const logoSrc = "/assets/ElarisLockup.webp";

  return (
    <header
      className="fixed left-0 right-0 top-0 z-50"
      onMouseEnter={() => setIsNavHovered(true)}
      onMouseLeave={() => setIsNavHovered(false)}
    >
      {/* WCAG 2.4.1 — primer elemento enfocable: salta la navegación repetida. */}
      <a
        href="#contenido-principal"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#0855FD] focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#0855FD]"
      >
        Saltar al contenido principal
      </a>
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
            "flex items-center justify-between",
            "lg:grid lg:grid-cols-[auto_1fr_auto] lg:items-center"
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
              width={812}
              height={240}
              className="h-10 w-auto sm:h-12"
            />
          </button>

          {/* Desktop nav links — ocultos bajo lg via CSS, no via JS */}
          <ul className="mx-auto hidden items-center gap-8 lg:flex">
                {NAV_LINKS.map(({ label, section }) => (
                  <li key={section}>
                    <a
                      href={`/#${section}`}
                      className={navItemClass}
                      onClick={(event) => {
                        event.preventDefault();
                        navigateToSection(section);
                      }}
                    >
                      {label}
                    </a>
                  </li>
                ))}
          </ul>

          {/* CTA de escritorio */}
          <a
            href="/#contacto"
            onClick={(event) => {
              event.preventDefault();
              navigateToSection("contacto");
            }}
            className="justify-self-end hidden h-10 items-center rounded-xl bg-brand-gradient px-5 text-sm font-semibold text-white transition-opacity hover:opacity-90 lg:inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0855FD] focus-visible:ring-offset-2"
          >
            Solicitar diagnóstico
          </a>

          {/* Hamburger — solo bajo lg */}
          <button
            type="button"
            aria-label="Abrir menu de navegacion"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-lg border transition-colors lg:hidden",
              "border-black/15 hover:bg-black/5"
            )}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu — presente en el HTML del servidor, oculto en lg por CSS */}
      <div
        className={cn(
          "overflow-hidden border-b backdrop-blur-[12px] transition-all duration-300 ease-in-out lg:hidden",
          navThemeClasses,
          isMobileMenuOpen ? "h-[calc(100dvh-80px)]" : "h-0 border-transparent"
        )}
      >
          <div className="container mx-auto flex h-full flex-col px-4 pb-5 pt-2 sm:px-6">
            <div className="flex-1 overflow-y-auto pr-1">
              <div className="space-y-1 pt-2">
                {NAV_LINKS.map(({ label, section }) => (
                  <a
                    key={section}
                    href={`/#${section}`}
                    onClick={(event) => {
                      event.preventDefault();
                      navigateToSection(section);
                    }}
                    className="flex w-full items-center justify-between border-b border-dashed border-black/10 py-3 text-left text-[1.05rem] font-medium hover:text-[#0855FD] transition-colors"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>

            <div className="border-t border-black/10 pt-4">
              <div className="rounded-xl border border-black/10 bg-white/70 p-3.5">
                <p className="text-sm font-semibold">¿Listo para escalar tu operación?</p>
                <p className="mt-1 text-xs text-slate-600">
                  Agenda un diagnóstico y te damos una hoja de ruta clara para ejecutar. Sin costo y sin compromiso.
                </p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => navigateToSection("contacto")}
                    className="inline-flex h-10 w-full items-center justify-center rounded-lg bg-brand-gradient px-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    Solicitar diagnóstico
                  </button>
                  <button
                    type="button"
                    onClick={() => navigateToSection("portafolio")}
                    className="inline-flex h-10 w-full items-center justify-center rounded-lg border border-black/15 px-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-black/5"
                  >
                    Ver casos
                  </button>
                </div>
              </div>
            </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
