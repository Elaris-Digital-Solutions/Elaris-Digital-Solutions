"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SmartImage from "@/components/ui/smart-image";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { SERVICES, SERVICE_GROUPS } from "@/content/services";
import es from "@/locales/es.json";

/**
 * Navegación por rutas reales.
 *
 * Antes mezclaba anclas del home (#servicios, #faq…) con rutas. Con 25 URLs
 * publicadas, un ancla solo funciona bien en la home y es ambigua —o
 * directamente incorrecta— en las otras 24. «Por qué Elaris» y «FAQ» siguen
 * siendo secciones del home y viven en el footer.
 */
/**
 * El menú conserva los dos grupos comerciales en vez de aplanarlos en una
 * lista de ocho: la agrupación ES la propuesta de valor —vender más u operar
 * mejor— y aplanarla obliga al visitante a reconstruirla leyendo etiquetas.
 * Los servicios secundarios van al final de su grupo, en tono más apagado.
 */
const SERVICE_MENU = SERVICE_GROUPS.map((group) => ({
  id: group.id,
  label: group.label,
  items: SERVICES.filter((service) => service.group === group.id).map((service) => ({
    label: service.label,
    href: service.path,
    isSecondary: service.tier === "secondary",
  })),
}));

const dropdownItemClass =
  "block px-4 py-2.5 text-sm font-medium transition-colors hover:bg-[#0855FD]/5 hover:text-[#0855FD] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0855FD]";

const NAV_ROUTES = [
  { label: "Casos", href: "/casos" },
  { label: "Recursos", href: "/recursos" },
  { label: "Equipo", href: "/equipo" },
] as const;

const Navbar = () => {
  // Arranca en false en servidor y cliente por igual: el layout responsive lo
  // resuelve CSS, no JS. Ramificar aqui sobre window.innerWidth hacia que el
  // servidor emitiera la nav de escritorio y el cliente movil el hamburger,
  // y React descartaba todo el HTML del servidor.
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isNavHovered, setIsNavHovered] = useState(false);

  const servicesRef = useRef<HTMLLIElement>(null);
  const pathname = usePathname();
  const { t } = useI18n();

  /** El CTA es lo único que sigue siendo un ancla: #contacto existe en todas
   *  las plantillas. Si no estuviera, se navega al home. */
  const goToContact = () => {
    const target = document.getElementById("contacto");
    if (target) {
      const offsetTop = target.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top: Math.max(offsetTop, 0), behavior: "smooth" });
    } else {
      window.location.href = "/#contacto";
    }
    setIsMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setIsMobileMenuOpen(false);
      return false;
    }
    return true;
  };

  // Cerrar menús al cambiar de ruta.
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
    setIsMobileServicesOpen(false);
  }, [pathname]);

  // Dropdown: cerrar con Escape y con clic fuera.
  useEffect(() => {
    if (!isServicesOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsServicesOpen(false);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!servicesRef.current?.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [isServicesOpen]);

  useEffect(() => {
    const onResize = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
      if (desktop) setIsMobileMenuOpen(false);
      else setIsServicesOpen(false);
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

  const isOpaque = !isAtTop || isNavHovered || isMobileMenuOpen || isServicesOpen;

  const navThemeClasses = isOpaque
    ? "bg-white text-[#111] border-b border-black/10 shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
    : "bg-transparent text-[#111] border-b border-transparent shadow-none";

  const navItemClass =
    "inline-flex h-9 items-center rounded px-2 text-[0.95rem] font-medium text-[#111] transition-colors hover:text-[#0855FD] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0855FD] focus-visible:ring-offset-2";

  const mobileItemClass =
    "flex w-full items-center justify-between border-b border-dashed border-black/10 py-3 text-left text-[1.05rem] font-medium transition-colors hover:text-[#0855FD]";

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
          <Link
            href="/"
            onClick={(event) => {
              if (!scrollToTop()) event.preventDefault();
            }}
            className="inline-flex items-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0855FD] focus-visible:ring-offset-2"
          >
            <SmartImage
              src={logoSrc}
              alt={t("navbar.logoAlt")}
              priority
              width={812}
              height={240}
              className="h-10 w-auto sm:h-12"
            />
          </Link>

          {/* Desktop nav — ocultos bajo lg via CSS, no via JS */}
          <ul className="mx-auto hidden items-center gap-8 lg:flex">
            <li ref={servicesRef} className="relative">
              <button
                type="button"
                aria-expanded={isServicesOpen}
                aria-haspopup="true"
                onClick={() => setIsServicesOpen((prev) => !prev)}
                className={cn(navItemClass, "gap-1.5")}
              >
                Servicios
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    isServicesOpen && "rotate-180"
                  )}
                />
              </button>

              {isServicesOpen && (
                <div className="absolute left-1/2 top-full z-50 w-[320px] -translate-x-1/2 pt-3">
                  <div className="overflow-hidden rounded-xl border border-black/10 bg-white py-2 shadow-[0_12px_40px_rgba(7,21,64,0.12)]">
                    {SERVICE_MENU.map((group, groupIndex) => (
                      <div
                        key={group.id}
                        className={cn(groupIndex > 0 && "mt-1 border-t border-black/5 pt-1")}
                      >
                        <p className="px-4 pb-1 pt-2 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-slate-500">
                          {group.label}
                        </p>
                        <ul aria-label={group.label}>
                          {group.items.map((item) => (
                            <li key={item.href}>
                              <Link
                                href={item.href}
                                className={cn(
                                  dropdownItemClass,
                                  item.isSecondary ? "text-slate-600" : "text-[#111]"
                                )}
                              >
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </li>

            {NAV_ROUTES.map(({ label, href }) => (
              <li key={href}>
                <Link href={href} className={navItemClass}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA de escritorio */}
          <a
            href="/#contacto"
            onClick={(event) => {
              event.preventDefault();
              goToContact();
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
              {/* Servicios: acordeón con los dos grupos */}
              <button
                type="button"
                aria-expanded={isMobileServicesOpen}
                aria-controls="nav-servicios-movil"
                onClick={() => setIsMobileServicesOpen((prev) => !prev)}
                className={mobileItemClass}
              >
                Servicios
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    isMobileServicesOpen && "rotate-180"
                  )}
                />
              </button>
              {isMobileServicesOpen && (
                <div
                  id="nav-servicios-movil"
                  className="border-b border-dashed border-black/10 py-1 pl-4"
                >
                  {SERVICE_MENU.map((group) => (
                    <div key={group.id} className="pb-1">
                      <p className="pb-1 pt-2 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-slate-500">
                        {group.label}
                      </p>
                      <ul aria-label={group.label}>
                        {group.items.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className={cn(
                                "block py-2.5 text-[0.95rem] transition-colors hover:text-[#0855FD] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0855FD] focus-visible:ring-offset-2",
                                item.isSecondary ? "text-slate-600" : "text-slate-700"
                              )}
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {NAV_ROUTES.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={mobileItemClass}
                >
                  {label}
                </Link>
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
                  onClick={goToContact}
                  className="inline-flex h-10 w-full items-center justify-center rounded-lg bg-brand-gradient px-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  Solicitar diagnóstico
                </button>
                <Link
                  href="/casos"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-flex h-10 w-full items-center justify-center rounded-lg border border-black/15 px-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-black/5"
                >
                  Ver casos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
