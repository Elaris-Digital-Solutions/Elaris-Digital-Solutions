/**
 * Single source of truth for portfolio projects.
 * Used by both InteractiveSelector (desktop) and ProjectsCarousel (mobile).
 * Previously duplicated in each component.
 */
import {
  AppWindow,
  Bot,
  Rocket,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

export interface ProjectConfig {
  slug: string;
  image: string;
  Icon: LucideIcon;
  url: string;
  stack: readonly string[];
}

export const PROJECT_CONFIGS: readonly ProjectConfig[] = [
  {
    slug: "salcedoJewels",
    image: "/assets/salcedo.webp",
    Icon: Smartphone,
    url: "https://salcedojewels.com",
    stack: ["Next.js", "React", "Stripe", "Vercel"],
  },
  {
    slug: "sistemaInventarioUPC",
    image: "/assets/SISTEMA-INVENTARIO-UPC.webp",
    Icon: AppWindow,
    url: "https://upc-inventario.netlify.app",
    stack: ["React", "Tailwind", "Vite"],
  },
  {
    slug: "karMa",
    image: "/assets/kar-ma.webp",
    Icon: Rocket,
    url: "https://kar-ma.netlify.app/",
    stack: ["React", "Tailwind", "Vite"],
  },
  {
    slug: "cccImpresiones",
    image: "/assets/ccc-impresiones.webp",
    Icon: Bot,
    url: "https://cccimpresiones.com/",
    stack: ["React", "Vite", "B2B", "3D Print"],
  },
  {
    slug: "nuestroBarrio",
    image: "/assets/nuestro-barrio-nuestra-historia.webp",
    Icon: Rocket,
    url: "https://nuestrobarrio.netlify.app/",
    stack: ["React", "Community", "Social", "Big Data"],
  },
] as const;
