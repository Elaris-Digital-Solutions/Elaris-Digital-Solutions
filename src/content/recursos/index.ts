import type { Article } from "../types";
import { article as cuantoCuestaSoftware } from "./cuanto-cuesta-software-a-medida-peru";
import { article as validarIdeaMvp } from "./como-validar-una-idea-de-negocio-mvp";
import { article as cuantoCuestaWeb } from "./cuanto-cuesta-una-pagina-web-peru";
import { article as shopifyWooMedida } from "./shopify-woocommerce-o-tienda-a-medida";
import { article as automatizarConIa } from "./automatizar-procesos-con-ia";
import { article as transformacionPymes } from "./transformacion-digital-pymes-por-donde-empezar";
import { article as cuandoNecesitasCmms } from "./cuando-necesitas-un-cmms";
import { article as aparecerEnChatgpt } from "./como-aparecer-en-chatgpt-y-buscadores-con-ia";

/**
 * Artículos publicados, del más reciente al más antiguo.
 *
 * Publicación en dos tandas para que el blog muestre actividad sostenida en
 * vez de nacer con seis entradas y quedarse mudo:
 *   Tanda 1 (2026-08-03): costos de software, MVP, costos de web.
 *   Tanda 2 (2026-08-17): Shopify vs a medida, IA, transformación digital.
 *   Tanda 3 (2026-10-20): CMMS y posicionamiento en motores de IA.
 *
 * Los enlaces entre artículos viven dentro de su propia tanda, así ninguno
 * apunta a una URL que aún no existe.
 *
 * La tanda 3 sale de datos, no de intuición: "implementación de cmms" ya
 * acumulaba impresiones en Search Console contra una página de servicio sin
 * ningún artículo que la sostuviera, y es el nicho con menos competencia
 * visible en Lima de los ocho servicios.
 */
export const ARTICLES: Article[] = [
  aparecerEnChatgpt,
  cuandoNecesitasCmms,
  transformacionPymes,
  automatizarConIa,
  shopifyWooMedida,
  cuantoCuestaWeb,
  validarIdeaMvp,
  cuantoCuestaSoftware,
];

export const findArticle = (slug: string) =>
  ARTICLES.find((a) => a.slug === slug);
