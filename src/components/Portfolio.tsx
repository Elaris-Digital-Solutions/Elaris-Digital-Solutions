import React from "react";
import InteractiveSelector from "@/components/ui/interactive-selector";
import ProjectsCarousel from "@/components/ui/projects-carousel";

export default function Portfolio() {
  return (
    <section id="portafolio" className="relative bg-slate-50 py-20 sm:py-32">
      {/* Desktop - Componente original InteractiveSelector */}
      <div className="hidden lg:block">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <InteractiveSelector />
        </div>
      </div>

      {/* Mobile - Nuevo carrusel */}
      <div className="block lg:hidden">
        <ProjectsCarousel />
      </div>
    </section>
  );
}
