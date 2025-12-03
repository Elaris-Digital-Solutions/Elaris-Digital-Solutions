import React from 'react';
import { Marquee } from "@/components/ui/marquee";
import SmartImage from "@/components/ui/smart-image";

// Logos de tecnologías desde archivos SVG locales
const techData = [
  { src: "/assets/React.svg", alt: "React", label: "React" },
  { src: "/assets/Next.svg", alt: "Next.js", label: "Next.js" },
  { src: "/assets/TypeScript.svg", alt: "TypeScript", label: "TypeScript" },
  { src: "/assets/Python.svg", alt: "Python", label: "Python" },
  { src: "/assets/NodeJS.svg", alt: "Node.js", label: "Node.js" },
  { src: "/assets/TailwindCSS.svg", alt: "Tailwind CSS", label: "Tailwind CSS" },
  { src: "/assets/AWS.svg", alt: "AWS", label: "AWS" },
  { src: "/assets/Docker.png", alt: "Docker", label: "Docker", imgOnly: true },
  { src: "/assets/MongoDB.svg", alt: "MongoDB", label: "MongoDB" },
];

function TechLogo({ src, alt, label, imgOnly }: { src: string; alt: string; label: string; imgOnly?: boolean }) {
  return (
    <div className="flex items-center gap-3 min-w-[120px] min-h-[44px]">
      {imgOnly ? (
        <img src={src} alt={alt} className="h-10 w-10" loading="lazy" width={40} height={40} />
      ) : (
        <SmartImage src={src} alt={alt} className="h-10 w-10" loading="lazy" />
      )}
      <span className="font-semibold text-gray-800">{label}</span>
    </div>
  );
}

export default function TechnologiesCarousel() {
  

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-4 lg:mb-6">
          <h2 className="text-3xl font-extrabold tracking-tight drop-shadow-lg sm:text-4xl lg:text-5xl mb-4">
            <span className="text-slate-900">Tecnologías que </span><span style={{ color: '#2F64FF' }}>Dominamos</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Utilizamos las tecnologías más avanzadas y confiables del mercado para construir soluciones robustas, escalables y futuro-compatibles.
          </p>
        </div>
      </div>

      {/* Marquee Container - Full width */}
      <div className="w-full overflow-hidden">
        <Marquee pauseOnHover className="[--duration:60s]">
          {techData.map((tech, index) => (
            <div key={index} className="flex items-center justify-center mx-5 md:mx-10 lg:mx-16">
              <div className="transition-all duration-300 hover:scale-110 hover:-translate-y-2">
                <TechLogo {...tech} />
              </div>
            </div>
          ))}
        </Marquee>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bottom text */}
        <div className="text-center mt-6 lg:mt-8">
          <p className="text-sm text-gray-500 font-medium">
            Y muchas tecnologías más que se adaptan a las necesidades específicas de cada proyecto
          </p>
        </div>
      </div>
    </section>
  );
}