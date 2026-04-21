import React from "react";
import InteractiveSelector from "@/components/ui/interactive-selector";
import ProjectsCarousel from "@/components/ui/projects-carousel";
import { useBreakpoint } from "@/lib/use-breakpoint";

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
    </section>
  );
}
