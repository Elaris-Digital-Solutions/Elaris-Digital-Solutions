/**
 * Single source of truth for portfolio projects.
 * Used by both InteractiveSelector (desktop) and ProjectsCarousel (mobile).
 * Previously duplicated in each component.
 */
import {
  AppWindow,
  Bot,
  Nfc,
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
    slug: "cccImpresiones",
    image: "/assets/ccc-impresiones.webp",
    Icon: Bot,
    url: "https://cccimpresiones.com/",
    stack: ["React", "Vite", "B2B", "3D Print"],
  },
  {
    slug: "veltrixNfc",
    image: "/assets/veltrix-nfc.webp",
    Icon: Nfc,
    url: "https://veltrixnfc.com",
    stack: ["Next.js", "React", "NFC", "Perfiles digitales"],
  },
] as const;
