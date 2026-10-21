/**
 * Eventos de GA4.
 *
 * Guard defensivo: si gtag todavía no cargó (bloqueador de anuncios,
 * primer render antes de la hidratación), la llamada es un no-op
 * silencioso. Nunca debe romper el flujo de conversión.
 */
export const trackEvent = (
  name: string,
  params?: Record<string, string | number>
) => {
  if (typeof window === "undefined") return;

  const w = window as {
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  };

  if (typeof w.gtag === "function") {
    w.gtag("event", name, params ?? {});
  }

  /**
   * El mismo evento, como etiqueta de la sesión en Clarity.
   *
   * Sin esto las grabaciones son una lista sin orden que nadie va a ver
   * entera. Con esto se filtran por lo único que importa: "muéstrame las
   * sesiones donde alguien tocó WhatsApp". Con el volumen actual, mirar
   * esas pocas de a una dice bastante más que cualquier mapa de calor,
   * que necesita miles de visitas para que el patrón se separe del ruido.
   *
   * Va dentro de `trackEvent` y no en cada punto de llamada para que
   * cualquier evento nuevo quede etiquetado sin tener que acordarse.
   */
  if (typeof w.clarity === "function") {
    try {
      w.clarity("set", "evento", name);
      if (params?.location) {
        w.clarity("set", `evento_${name}`, String(params.location));
      }
    } catch {
      /* Nunca debe romper la medición principal ni el flujo de conversión. */
    }
  }
};
