"use client";

import { cn } from "@/lib/utils";

/**
 * Panel de respuesta de un acordeón de FAQ.
 *
 * El texto se renderiza SIEMPRE, esté abierto o cerrado. Antes se desmontaba
 * con `AnimatePresence`, así que las respuestas no existían en el HTML
 * servido: los rastreadores que no ejecutan JavaScript —la mayoría de los de
 * IA— solo veían las preguntas. Y un FAQ es justo lo más citable de una
 * página, porque ya viene en formato pregunta-respuesta.
 *
 * Se oculta con `visibility: hidden` (`invisible`) y no desmontando ni con
 * `display: none`, porque es la única opción que cumple las cuatro cosas:
 *   · el texto queda en el HTML servido, legible por cualquier extractor;
 *   · desaparece del árbol de accesibilidad, así que un lector de pantalla no
 *     lee las seis respuestas de golpe —que es lo que haría un acordeón con el
 *     panel siempre visible—;
 *   · no es focalizable con el tabulador;
 *   · admite transición, cosa que `display: none` no.
 *
 * El colapso usa `grid-template-rows` de `0fr` a `1fr`, que es la forma de ir
 * hacia `auto` sin JavaScript. La altura NO se anima a propósito: interpolar
 * `fr` sobre un elemento que a la vez pasa de `visibility: hidden` a visible
 * deja la pista atascada en su valor inicial y el panel se abre con altura
 * cero. Se anima solo la opacidad, que es fiable y da el mismo efecto
 * percibido.
 */
export function FaqPanel({
  id,
  open,
  children,
}: {
  id: string;
  open: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      id={id}
      className={cn(
        "grid transition-opacity duration-300 ease-in-out motion-reduce:transition-none",
        open ? "grid-rows-[1fr] opacity-100" : "invisible grid-rows-[0fr] opacity-0"
      )}
    >
      <div className="overflow-hidden">{children}</div>
    </div>
  );
}
