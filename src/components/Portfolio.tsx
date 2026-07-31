import React from "react";
import InteractiveSelector from "@/components/ui/interactive-selector";
import ProjectsCarousel from "@/components/ui/projects-carousel";
import { useBreakpoint } from "@/lib/use-breakpoint";
import { scrollToSection } from "@/lib/utils";

export default function Portfolio() {
  const breakpoint = useBreakpoint();

  return (
    <section id="portafolio" className="relative py-20 sm:py-32">
      {/* Conditional rendering: only the active variant is mounted */}
      {breakpoint === "desktop" ? (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <InteractiveSelector />
        </div>
      ) : (
        <ProjectsCarousel />
      )}

      <p className="mt-10 px-4 text-center text-slate-600">
        ¿Tu operación necesita un resultado así?{" "}
        <a
          href="#contacto"
          onClick={(event) => {
            event.preventDefault();
            scrollToSection("contacto");
          }}
          className="font-semibold text-brand-gradient hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0855FD] focus-visible:ring-offset-2"
        >
          Solicita un diagnóstico →
        </a>
      </p>
    </section>
  );
}
