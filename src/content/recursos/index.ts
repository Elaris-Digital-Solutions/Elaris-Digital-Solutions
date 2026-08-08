import type { Article } from "../types";
import { article as cuantoCuestaSoftware } from "./cuanto-cuesta-software-a-medida-peru";
import { article as validarIdeaMvp } from "./como-validar-una-idea-de-negocio-mvp";
import { article as cuantoCuestaWeb } from "./cuanto-cuesta-una-pagina-web-peru";
import { article as shopifyWooMedida } from "./shopify-woocommerce-o-tienda-a-medida";
import { article as automatizarConIa } from "./automatizar-procesos-con-ia";
import { article as transformacionPymes } from "./transformacion-digital-pymes-por-donde-empezar";

/**
 * Artículos publicados, del más reciente al más antiguo.
 *
 * Publicación en dos tandas para que el blog muestre actividad sostenida en
 * vez de nacer con seis entradas y quedarse mudo:
 *   Tanda 1 (2026-08-03): costos de software, MVP, costos de web.
 *   Tanda 2 (2026-08-17): Shopify vs a medida, IA, transformación digital.
 *
 * Los enlaces entre artículos viven dentro de su propia tanda, así ninguno
 * apunta a una URL que aún no existe.
 */
export const ARTICLES: Article[] = [
  transformacionPymes,
  automatizarConIa,
  shopifyWooMedida,
  cuantoCuestaWeb,
  validarIdeaMvp,
  cuantoCuestaSoftware,
];

export const findArticle = (slug: string) =>
  ARTICLES.find((a) => a.slug === slug);
