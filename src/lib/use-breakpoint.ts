import { useEffect, useLayoutEffect, useState } from "react";

type Breakpoint = "mobile" | "tablet" | "desktop";

function getBreakpoint(width: number): Breakpoint {
  if (width >= 1024) return "desktop";
  if (width >= 768)  return "tablet";
  return "mobile";
}

// useLayoutEffect avisa por consola si se evalua durante el render en servidor.
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Returns the current Tailwind-style breakpoint ("mobile" | "tablet" | "desktop").
 * Used to do true conditional rendering instead of CSS-only hide/show.
 *
 * El estado inicial es "desktop" en servidor y cliente por igual. Leer
 * window.innerWidth en el primer render — como hacia antes — provocaba que el
 * servidor emitiera la variante de escritorio y un cliente movil renderizara
 * otra distinta, asi que React descartaba todo el HTML del servidor.
 *
 * El valor real se aplica en un layout effect, que corre antes del primer
 * pintado: la hidratacion cuadra y el usuario tampoco ve el cambio.
 */
export function useBreakpoint(): Breakpoint {
  const [bp, setBp] = useState<Breakpoint>("desktop");

  useIsomorphicLayoutEffect(() => {
    const sync = () =>
      setBp((prev) => {
        const next = getBreakpoint(window.innerWidth);
        return prev === next ? prev : next;
      });
    sync();
    window.addEventListener("resize", sync, { passive: true });
    return () => window.removeEventListener("resize", sync);
  }, []);

  return bp;
}
