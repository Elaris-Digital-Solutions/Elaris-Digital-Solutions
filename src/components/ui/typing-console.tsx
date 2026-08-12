"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TypingConsoleProps {
  phrases: string[];
  loop?: boolean;
  prefix?: string;
  staticPrefix?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDelay?: number;
  className?: string;
  cursorClassName?: string;
  hideCursor?: boolean;
}

const TypingConsole = ({
  phrases,
  loop = true,
  prefix = "$",
  staticPrefix,
  typingSpeed = 50,
  deletingSpeed = 30,
  pauseDelay = 800,
  className,
  cursorClassName,
  hideCursor = false,
}: TypingConsoleProps) => {
  const reduceMotion = useReducedMotion();

  const sanitizedPhrases = useMemo(() => {
    return phrases
      .filter((phrase) => phrase && typeof phrase === "string")
      .map((phrase) => phrase.trim())
      .filter((phrase) => phrase.length > 0);
  }, [phrases]);

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  // Arranca con la primera frase COMPLETA, no vacía. Dos motivos:
  //   1. Así viaja en el HTML inicial. Con `""` los rastreadores que no
  //      ejecutan JS —y son la mayoría de los de IA— no veían ninguna de las
  //      propuestas de valor del hero.
  //   2. Servidor y cliente renderizan lo mismo, así que no hay desajuste de
  //      hidratación. La máquina de estados continúa sola desde «ya escrita».
  const [displayText, setDisplayText] = useState(() => sanitizedPhrases[0] ?? "");
  const [isDeleting, setIsDeleting] = useState(false);

  const resetToStart = useCallback(() => {
    setCurrentPhraseIndex(0);
    setDisplayText(sanitizedPhrases[0] ?? "");
    setIsDeleting(false);
  }, [sanitizedPhrases]);

  useEffect(() => {
    resetToStart();
  }, [resetToStart]);

  useEffect(() => {
    // WCAG 2.2.2: esto es movimiento automático, en bucle y de más de cinco
    // segundos. Con movimiento reducido no se anima en absoluto — la primera
    // frase se queda fija y legible, que es lo que la pauta pide.
    if (reduceMotion) return;
    if (!sanitizedPhrases.length) return;

    const currentPhrase = sanitizedPhrases[currentPhraseIndex] || "";
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText === currentPhrase) {
      // Finished typing current phrase - start deleting after pause
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, pauseDelay);
    } else if (isDeleting && displayText === "") {
      // Finished deleting - move to next phrase after pause
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setCurrentPhraseIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          return nextIndex >= sanitizedPhrases.length ? 0 : nextIndex;
        });
      }, pauseDelay / 2);
    } else {
      // Continue typing or deleting
      timeout = setTimeout(() => {
        setDisplayText((prev) =>
          isDeleting
            ? prev.slice(0, -1)
            : currentPhrase.slice(0, prev.length + 1)
        );
      }, isDeleting ? deletingSpeed : typingSpeed);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [
    currentPhraseIndex,
    deletingSpeed,
    displayText,
    isDeleting,
    loop,
    pauseDelay,
    reduceMotion,
    sanitizedPhrases,
    typingSpeed,
  ]);

  if (!sanitizedPhrases.length) {
    return null;
  }

  return (
    <div
      className={cn(
        "px-4 sm:px-6 py-4 font-mono text-sm sm:text-[15px] leading-relaxed",
        className,
      )}
    >
      <div className="flex items-start text-left">
        <span className="mr-2 flex-shrink-0 text-brand-gradient font-bold">{prefix}</span>
        {/* Rejilla de una sola celda: todas las frases se superponen ahí, así
            que la caja mide siempre lo que ocupa la más alta. Las fantasma van
            ocultas pero siguen ocupando sitio, de modo que la consola no cambia
            de alto al escribir ni al borrar. Sin esto salta de 2 a 3 líneas en
            móvil y arrastra 22px hacia abajo todo el resto de la página.
            Reservar así, y no con un min-height fijo, mantiene la medida
            correcta a cualquier ancho de pantalla. */}
        <div className="grid flex-1 min-w-0 break-words whitespace-pre-wrap">
          {sanitizedPhrases.map((phrase, index) => (
            <span
              key={index}
              aria-hidden="true"
              className="col-start-1 row-start-1 invisible"
            >
              {staticPrefix ? `${staticPrefix} ` : ""}
              {phrase}
              {!hideCursor && <span className="inline-block h-4 w-2 ml-0.5" />}
            </span>
          ))}

          <span className="col-start-1 row-start-1">
            {staticPrefix && (
              <span className="text-[#071540]/60">{staticPrefix} </span>
            )}
            {displayText}
            {!hideCursor && (
              <span
                className={cn(
                  "inline-block h-4 w-2 ml-0.5 bg-brand-gradient",
                  !reduceMotion && "animate-pulse",
                  cursorClassName,
                )}
              />
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TypingConsole;
export type { TypingConsoleProps };
