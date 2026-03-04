"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
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
  const sanitizedPhrases = useMemo(() => {
    return phrases
      .filter((phrase) => phrase && typeof phrase === "string")
      .map((phrase) => phrase.trim())
      .filter((phrase) => phrase.length > 0);
  }, [phrases]);

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const resetToStart = useCallback(() => {
    setCurrentPhraseIndex(0);
    setDisplayText("");
    setIsDeleting(false);
  }, []);

  useEffect(() => {
    resetToStart();
  }, [phrases, resetToStart]);

  useEffect(() => {
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
        <span className="mr-2 flex-shrink-0 text-[#2F64FF] font-bold">{prefix}</span>
        <div className="flex-1 min-w-0">
          {staticPrefix && (
            <span className="text-[#071540]/60 break-words whitespace-pre-wrap">
              {staticPrefix}{" "}
            </span>
          )}
          <span className="break-words whitespace-pre-wrap">{displayText}</span>
          {!hideCursor && (
            <span
              className={cn(
                "inline-block h-4 w-2 ml-0.5 animate-pulse bg-[#2F64FF]",
                cursorClassName,
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TypingConsole;
export type { TypingConsoleProps };
