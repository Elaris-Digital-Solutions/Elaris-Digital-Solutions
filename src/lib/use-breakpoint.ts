import { useEffect, useState } from "react";

type Breakpoint = "mobile" | "tablet" | "desktop";

function getBreakpoint(width: number): Breakpoint {
  if (width >= 1024) return "desktop";
  if (width >= 768)  return "tablet";
  return "mobile";
}

/**
 * Returns the current Tailwind-style breakpoint ("mobile" | "tablet" | "desktop").
 * Initialises synchronously from window.innerWidth to avoid a layout flash.
 * Used to do true conditional rendering instead of CSS-only hide/show.
 */
export function useBreakpoint(): Breakpoint {
  const [bp, setBp] = useState<Breakpoint>(() =>
    typeof window !== "undefined" ? getBreakpoint(window.innerWidth) : "desktop"
  );

  useEffect(() => {
    const onResize = () => setBp(getBreakpoint(window.innerWidth));
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return bp;
}
