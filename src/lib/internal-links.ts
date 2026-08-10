/**
 * Enlaces internos incrustados en prosa: `[texto](/ruta)`.
 *
 * El regex vive aquí y no en el componente que renderiza porque lo usan dos
 * consumidores: `RichText` para pintarlos y `link-integrity` para verificar que
 * resuelven. Si cada uno tuviera el suyo, derivarían — y el verificador dejaría
 * pasar justo la sintaxis que el renderizador sí interpreta.
 */
export const INTERNAL_LINK_RE = /\[([^\]]+)\]\((\/[^)\s]*)\)/g;

/** Crea una instancia nueva: `exec` sobre un regex global arrastra `lastIndex`. */
export const internalLinkMatcher = () => new RegExp(INTERNAL_LINK_RE.source, "g");

/** Todas las rutas enlazadas dentro de un texto, en orden de aparición. */
export const extractInternalLinks = (text: string): string[] => {
  const re = internalLinkMatcher();
  const found: string[] = [];
  let match: RegExpExecArray | null;
  while ((match = re.exec(text)) !== null) {
    found.push(match[2]);
  }
  return found;
};

/**
 * Normaliza para comparar contra el conjunto de rutas conocidas: quita el
 * fragmento (`/#contacto` → `/`) y la barra final salvo en la raíz.
 */
export const normalizeRoute = (href: string): string => {
  const withoutHash = href.split("#")[0];
  if (withoutHash === "" || withoutHash === "/") return "/";
  return withoutHash.replace(/\/+$/, "");
};
