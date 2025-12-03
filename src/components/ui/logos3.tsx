"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import SmartImage from "@/components/ui/smart-image";

interface Logo {
  id: string;
  description: string;
  image: string;
  className?: string;
}

interface Logos3Props {
  heading?: string;
  logos?: Logo[];
  className?: string;
}

const Logos3 = ({
  heading = "",
  logos = [
    {
      id: "logo-1",
      description: "React",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      className: "h-12 w-auto",
    },
    {
      id: "logo-2",
      description: "Next.js",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      className: "h-12 w-auto",
    },
    {
      id: "logo-3",
      description: "TypeScript",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      className: "h-12 w-auto",
    },
    {
      id: "logo-4",
      description: "Python",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      className: "h-12 w-auto",
    },
    {
      id: "logo-5",
      description: "Node.js",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      className: "h-12 w-auto",
    },
    {
      id: "logo-6",
      description: "Tailwind CSS",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
      className: "h-12 w-auto",
    },
    {
      id: "logo-7",
      description: "AWS",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
      className: "h-12 w-auto",
    },
    {
      id: "logo-8",
      description: "Docker",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      className: "h-12 w-auto",
    },
    {
      id: "logo-9",
      description: "MongoDB",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      className: "h-12 w-auto",
    },
    {
      id: "logo-10",
      description: "shadcn/ui",
      image: "https://images.seeklogo.com/logo-png/51/2/shadcn-ui-logo-png_seeklogo-519786.png",
      className: "h-12 w-auto",
    },
    {
      id: "logo-11",
      description: "Framer Motion",
      image: "https://www.ejable.com/wp-content/uploads/2022/04/Framer-Motion-1200x900.webp",
      className: "h-12 w-auto",
    },
    {
      id: "logo-12",
      description: "Supabase",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
      className: "h-12 w-auto",
    },
    {
      id: "logo-13",
      description: "PostgreSQL",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      className: "h-12 w-auto",
    },
    {
      id: "logo-14",
      description: "OpenAI",
      image: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg",
      className: "h-12 w-auto",
    },
    {
      id: "logo-15",
      description: "TensorFlow",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
      className: "h-12 w-auto",
    },
    {
      id: "logo-16",
      description: "Vercel",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
      className: "h-12 w-auto",
    },
    {
      id: "logo-17",
      description: "Cloudflare",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cloudflare/cloudflare-original.svg",
      className: "h-12 w-auto",
    },
    {
      id: "logo-18",
      description: "Figma",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
      className: "h-12 w-auto",
    },
    {
      id: "logo-19",
      description: "Three.js",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg",
      className: "h-12 w-auto",
    },
    {
      id: "logo-20",
      description: "Firebase",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
      className: "h-12 w-auto",
    },
    {
      id: "logo-21",
      description: "Stripe",
      image: "https://www.svgrepo.com/show/331592/stripe-v2.svg",
      className: "h-12 w-auto",
    },
    {
      id: "logo-22",
      description: "Prisma",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg",
      className: "h-12 w-auto",
    },
    {
      id: "logo-23",
      description: "Vue.js",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
      className: "h-12 w-auto",
    },
    {
      id: "logo-24",
      description: "Angular",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
      className: "h-12 w-auto",
    },
    {
      id: "logo-25",
      description: "GraphQL",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
      className: "h-12 w-auto",
    },
    {
      id: "logo-26",
      description: "Redis",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
      className: "h-12 w-auto",
    },
    {
      id: "logo-27",
      description: "Kubernetes",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
      className: "h-12 w-auto",
    },
    {
      id: "logo-28",
      description: "Git",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      className: "h-12 w-auto",
    },
  ],
  className,
}: Logos3Props) => {
  const [carouselApi, setCarouselApi] = useState<any>(null);
  const autoScrollRef = useRef<any>(null);
  const interactionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Crear el plugin AutoScroll con referencia
  const autoScrollPlugin = useRef(
    AutoScroll({ 
      playOnInit: true, 
      speed: 2.5,
      stopOnInteraction: true,
      stopOnMouseEnter: false,
      stopOnFocusIn: false
    })
  );

  useEffect(() => {
    if (!carouselApi) return;

    const handlePointerDown = () => {
      // Limpiar timeout anterior si existe
      if (interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current);
      }
      
      // Detener auto-scroll
      if (autoScrollPlugin.current) {
        autoScrollPlugin.current.stop();
      }
    };

    const handlePointerUp = () => {
      // Reiniciar auto-scroll después de 2 segundos de inactividad
      if (interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current);
      }
      
      interactionTimeoutRef.current = setTimeout(() => {
        if (autoScrollPlugin.current) {
          autoScrollPlugin.current.play();
        }
      }, 2000);
    };

    // Agregar event listeners
    const container = carouselApi.containerNode();
    if (container) {
      container.addEventListener('pointerdown', handlePointerDown);
      container.addEventListener('pointerup', handlePointerUp);
      container.addEventListener('pointerleave', handlePointerUp);
      container.addEventListener('dragend', handlePointerUp);
    }

    return () => {
      if (container) {
        container.removeEventListener('pointerdown', handlePointerDown);
        container.removeEventListener('pointerup', handlePointerUp);  
        container.removeEventListener('pointerleave', handlePointerUp);
        container.removeEventListener('dragend', handlePointerUp);
      }
      if (interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current);
      }
    };
  }, [carouselApi]);

  return (
    <div className={cn("", className)}>
      {heading && (
        <div className="container flex flex-col items-center text-center mb-4">
          <h3 className="text-sm font-light text-white/70 tracking-tight">{heading}</h3>
        </div>
      )}
      <div className="">
        <div className="relative mx-auto flex items-center justify-center max-w-6xl">
          <Carousel
            opts={{ loop: true, dragFree: true }}
            plugins={[autoScrollPlugin.current]}
            setApi={setCarouselApi}
          >
            <CarouselContent className="ml-0">
              {logos.map((logo) => (
                <CarouselItem
                  key={logo.id}
                  className="flex basis-1/3 sm:basis-1/4 lg:basis-1/6 justify-center pl-0"
                >
                  <div className="mx-1 sm:mx-2 flex shrink-0 flex-row items-center justify-center gap-2 sm:gap-4 py-4 transform hover:scale-110 transition-all duration-300">
                    <div className="flex items-center justify-center h-16 w-16 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 shadow-lg">
                      <SmartImage
                        src={logo.image}
                        alt={logo.description}
                        className={cn(logo.className, "opacity-80 hover:opacity-100 transition-all duration-300 filter drop-shadow-lg")}
                      />
                    </div>
                    <span className="text-sm font-medium text-white/80 text-left leading-tight whitespace-nowrap tracking-wide">
                      {logo.description}
                    </span>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export { Logos3 };