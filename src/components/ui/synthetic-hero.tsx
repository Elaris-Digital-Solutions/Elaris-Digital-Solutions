"use client";

import { useMemo, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import TypingConsole from "@/components/ui/typing-console";
import { NeuralNoise } from "@/components/ui/neural-noise-cursor";

gsap.registerPlugin(SplitText, useGSAP);

interface HeroProps {
  title: string;
  description: string;
  badgeText?: string;
  badgeLabel?: string;
  ctaButtons?: Array<{ text: string; href?: string; primary?: boolean }>;
  microDetails?: Array<string>;
  consolePhrases?: string[];
}

const SyntheticHero = ({
  title = "An experiment in light, motion, and the quiet chaos between.",
  description =
  "Experience a new dimension of interaction — fluid, tactile, and alive. Designed for creators who see beauty in motion.",
  badgeText = "React Three Fiber",
  badgeLabel = "Experience",
  ctaButtons = [
    { text: "Explore the Canvas", href: "#explore", primary: true },
    { text: "Learn More", href: "#learn-more" },
  ],
  microDetails = [],
  consolePhrases: consolePhrasesProp = [],
}: HeroProps) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const badgeWrapperRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const consoleRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const microRef = useRef<HTMLUListElement | null>(null);
  const consolePhrases = useMemo(() => {
    const normalized = (consolePhrasesProp ?? [])
      .filter((phrase) => typeof phrase === "string")
      .map((phrase) => phrase.trim())
      .filter((phrase) => phrase.length > 0);

    if (normalized.length > 0) {
      return normalized;
    }

    return [
      "Developing cutting-edge digital solutions...",
      "Building responsive and modern web applications...",
      "Creating seamless user experiences...",
      "Implementing scalable cloud architectures...",
      "Designing intuitive user interfaces...",
      "Optimizing performance and accessibility...",
      "Delivering innovative software solutions...",
      description,
    ];
  }, [consolePhrasesProp, description]);

  useGSAP(
    () => {
      if (!headingRef.current) return;

      document.fonts.ready.then(() => {
        const split = new SplitText(headingRef.current!, {
          type: "lines",
          wordsClass: "hero-lines",
        });

        gsap.set(split.lines, {
          filter: "blur(16px)",
          yPercent: 24,
          autoAlpha: 0,
          scale: 1.04,
          transformOrigin: "50% 100%",
        });

        if (badgeWrapperRef.current) {
          gsap.set(badgeWrapperRef.current, { autoAlpha: 0, y: -8 });
        }
        if (consoleRef.current) {
          gsap.set(consoleRef.current, { autoAlpha: 0, y: 8 });
        }
        if (ctaRef.current) {
          gsap.set(ctaRef.current, { autoAlpha: 0, y: 8 });
        }

        const microItems = microRef.current
          ? Array.from(microRef.current.querySelectorAll("li"))
          : [];
        if (microItems.length > 0) {
          gsap.set(microItems, { autoAlpha: 0, y: 6 });
        }

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        if (badgeWrapperRef.current) {
          tl.to(
            badgeWrapperRef.current,
            { autoAlpha: 1, y: 0, duration: 0.5 },
            0,
          );
        }

        tl.to(
          split.lines,
          {
            filter: "blur(0px)",
            yPercent: 0,
            autoAlpha: 1,
            scale: 1,
            duration: 0.9,
            stagger: 0.12,
          },
          0.1,
        );

        if (consoleRef.current) {
          tl.to(
            consoleRef.current,
            { autoAlpha: 1, y: 0, duration: 0.5 },
            "-=0.55",
          );
        }

        if (ctaRef.current) {
          tl.to(
            ctaRef.current,
            { autoAlpha: 1, y: 0, duration: 0.5 },
            "-=0.35",
          );
        }

        if (microItems.length > 0) {
          tl.to(
            microItems,
            { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.1 },
            "-=0.25",
          );
        }
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center justify-center min-h-screen overflow-hidden bg-[#F0F4FF]"
    >
      <div className="absolute inset-0 z-0">
        <NeuralNoise
          opacity={0.8}
          pointerStrength={1.2}
          timeScale={0.5}
          className="absolute inset-0"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <div ref={badgeWrapperRef}>
          <Badge className="mb-6 bg-white/80 hover:bg-white/90 text-[#2F64FF] backdrop-blur-md border border-white/40 uppercase tracking-[0.3em] font-medium flex items-center gap-2 px-4 py-1.5">
            <span className="text-[10px] font-light tracking-[0.18em] text-[#2F64FF]/80">
              {badgeLabel}
            </span>
            <span className="h-1 w-1 rounded-full bg-[#2F64FF]/70" />
            <span className="text-xs font-light tracking-tight text-[#071540]">
              {badgeText}
            </span>
          </Badge>
        </div>

        <h1
          ref={headingRef}
          className="text-4xl md:text-6xl max-w-4xl font-light tracking-tight text-[#071540] mb-6"
        >
          {title}
        </h1>

        <div
          ref={consoleRef}
          className="w-full max-w-2xl mx-auto mb-10"
        >
          <div className="rounded-2xl border border-white/30 bg-white/70 backdrop-blur-xl shadow-[0_30px_70px_rgba(20,40,95,0.08)] overflow-hidden">
            <div className="flex items-center gap-2 px-3 py-2 bg-white/80 border-b border-white/30">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF4858]/80 shadow-sm" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#FFC961]/80 shadow-sm" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#2F64FF]/80 shadow-sm" />
            </div>
            <TypingConsole
              phrases={consolePhrases}
              loop={true}
              prefix=">"
              typingSpeed={60}
              deletingSpeed={30}
              pauseDelay={1500}
              className="text-[#071540]/95"
              cursorClassName="bg-[#2F64FF]"
            />
          </div>
        </div>

        <div
          ref={ctaRef}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          {ctaButtons.map((button, index) => {
            const isPrimary = button.primary ?? index === 0;
            const classes = isPrimary
              ? "px-8 py-3 rounded-xl text-base font-medium backdrop-blur-lg bg-[#2F64FF]/85 hover:bg-[#2F64FF]/75 text-white shadow-[0_18px_60px_rgba(47,100,255,0.35)] transition-[background-color,box-shadow] duration-300 cursor-pointer"
              : "px-8 py-3 rounded-xl text-base font-medium border border-white/35 text-[#2F64FF] hover:bg-white/10 hover:text-[#2F64FF] backdrop-blur-lg transition-[background-color,color] duration-300 cursor-pointer";

            if (button.href) {
              return (
                <Button
                  key={index}
                  variant={isPrimary ? undefined : "outline"}
                  className={classes}
                  asChild
                >
                  <a href={button.href}>{button.text}</a>
                </Button>
              );
            }

            return (
              <Button
                key={index}
                variant={isPrimary ? undefined : "outline"}
                className={classes}
              >
                {button.text}
              </Button>
            );
          })}
        </div>

        {microDetails.length > 0 && (
          <ul
            ref={microRef}
            className="mt-8 flex flex-wrap justify-center gap-6 text-xs font-light tracking-tight text-[#071540]/60"
          >
            {microDetails.map((detail, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-[#2F64FF]/60" />
                {detail}
              </li>
            ))}
          </ul>
        )}
      </div>


    </section>
  );
};

export default SyntheticHero;
