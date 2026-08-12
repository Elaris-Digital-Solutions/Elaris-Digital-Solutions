import {
  Code2,
  Globe,
  RefreshCw,
  Rocket,
  Search,
  ShoppingCart,
  Sparkles,
  Wrench,
} from "lucide-react";
import type { ServiceIconName } from "@/content/services";

/**
 * Iconografía por nombre, compartida entre la grilla de la home (cliente) y el
 * hub /servicios (servidor). Al ser un `Record` sobre la unión completa,
 * olvidar un icono al añadir un servicio es un error de compilación aquí —
 * antes devolvía `undefined` y React reventaba en prerender con
 * "Element type is invalid".
 */
export const SERVICE_ICONS: Record<ServiceIconName, React.ElementType> = {
  Globe,
  ShoppingCart,
  Search,
  Rocket,
  Code2,
  Sparkles,
  Wrench,
  RefreshCw,
};
