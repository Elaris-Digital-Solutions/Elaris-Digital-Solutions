import type { MotionProps } from "framer-motion";

/**
 * Animación de aparición al entrar en pantalla.
 *
 * Anima SOLO el desplazamiento, nunca la opacidad, y esa es toda la gracia.
 * Con `opacity: 0` en el estado inicial el texto se sirve invisible en el HTML
 * renderizado: está ahí, pero cualquier procesador que respete estilos
 * computados —varios rastreadores de IA y las canalizaciones que renderizan
 * antes de extraer texto— lo lee como oculto. En una página de caso eran 17
 * bloques: el problema, la solución y las cifras, justo lo citable.
 *
 * El efecto visual apenas cambia —un deslizamiento en lugar de un fundido— y a
 * cambio el contenido queda legible pase lo que pase con el JavaScript.
 *
 * Vivía duplicado en las cuatro plantillas de contenido; ahora es uno solo.
 */
export const buildReveal =
  (reduceMotion: boolean | null) =>
  (delay = 0): MotionProps =>
    reduceMotion
      ? {}
      : {
          initial: { y: 22 },
          whileInView: { y: 0 },
          viewport: { once: true, amount: 0.15 },
          transition: { duration: 0.5, ease: "easeOut", delay },
        };
