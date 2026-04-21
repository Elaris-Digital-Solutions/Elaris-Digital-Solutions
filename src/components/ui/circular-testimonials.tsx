"use client";
import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SmartImage from "@/components/ui/smart-image";

interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src: string;
}
interface Colors {
  name?: string;
  designation?: string;
  testimony?: string;
  arrowBackground?: string;
  arrowForeground?: string;
  arrowHoverBackground?: string;
}
interface FontSizes {
  name?: string;
  designation?: string;
  quote?: string;
}
interface CircularTestimonialsProps {
  testimonials: Testimonial[];
  autoplay?: boolean;
  colors?: Colors;
  fontSizes?: FontSizes;
}

function calculateGap(width: number): number {
  const minWidth = 1024, maxWidth = 1456, minGap = 60, maxGap = 86;
  if (width <= minWidth) return minGap;
  if (width >= maxWidth) return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

// Framer Motion variants — module-level, never recreated
const quoteVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -20 },
};

const CircularTestimonials: React.FC<CircularTestimonialsProps> = ({
  testimonials,
  autoplay = true,
  colors = {},
  fontSizes = {},
}) => {
  const colorName        = colors.name             ?? "#000";
  const colorDesignation = colors.designation      ?? "#6b7280";
  const colorTestimony   = colors.testimony        ?? "#4b5563";
  const colorArrowBg     = colors.arrowBackground  ?? "#141414";
  const colorArrowFg     = colors.arrowForeground  ?? "#f1f1f7";
  const colorArrowHoverBg = colors.arrowHoverBackground ?? "#00a6fb";
  const fontSizeName        = fontSizes.name        ?? "1.5rem";
  const fontSizeDesignation = fontSizes.designation ?? "0.925rem";
  const fontSizeQuote       = fontSizes.quote       ?? "1.125rem";

  const [activeIndex, setActiveIndex]       = useState(0);
  const [containerWidth, setContainerWidth] = useState(1200);

  const imageContainerRef  = useRef<HTMLDivElement>(null);
  const autoplayIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  // Used by IntersectionObserver to pause autoplay when off-screen
  const isVisibleRef = useRef(false);
  const sectionRef   = useRef<HTMLDivElement>(null);

  const testimonialsLength = testimonials.length;
  const activeTestimonial  = testimonials[activeIndex];

  // Responsive gap
  useEffect(() => {
    const handleResize = () => {
      if (imageContainerRef.current) {
        setContainerWidth(imageContainerRef.current.offsetWidth);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Autoplay — pauses when the section is not visible
  useEffect(() => {
    if (!autoplay) return;

    const startAutoplay = () => {
      if (autoplayIntervalRef.current) return;
      autoplayIntervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonialsLength);
      }, 5000);
    };

    const stopAutoplay = () => {
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
        autoplayIntervalRef.current = null;
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        entry.isIntersecting ? startAutoplay() : stopAutoplay();
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      stopAutoplay();
      observer.disconnect();
    };
  }, [autoplay, testimonialsLength]);

  // Keyboard navigation — global listener only when section is visible
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!isVisibleRef.current) return;
      if (e.key === "ArrowLeft")  handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, testimonialsLength]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonialsLength);
    // Don't clear autoplay on manual nav — let IO manage it
  }, [testimonialsLength]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonialsLength) % testimonialsLength);
  }, [testimonialsLength]);

  // Compute transforms — gap is computed once per render, not per image
  const getImageStyle = useCallback(
    (index: number): React.CSSProperties => {
      const gap       = calculateGap(containerWidth);
      const maxStickUp = gap * 0.8;
      const isActive  = index === activeIndex;
      const isLeft    = (activeIndex - 1 + testimonialsLength) % testimonialsLength === index;
      const isRight   = (activeIndex + 1) % testimonialsLength === index;

      if (isActive) return { zIndex: 3, opacity: 1, pointerEvents: "auto", transform: "translateX(0px) translateY(0px) scale(1) rotateY(0deg)", transition: "all 0.8s cubic-bezier(.4,2,.3,1)" };
      if (isLeft)   return { zIndex: 2, opacity: 1, pointerEvents: "auto", transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(15deg)`,  transition: "all 0.8s cubic-bezier(.4,2,.3,1)" };
      if (isRight)  return { zIndex: 2, opacity: 1, pointerEvents: "auto", transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(-15deg)`, transition: "all 0.8s cubic-bezier(.4,2,.3,1)" };
      return { zIndex: 1, opacity: 0, pointerEvents: "none", transition: "all 0.8s cubic-bezier(.4,2,.3,1)" };
    },
    [activeIndex, containerWidth, testimonialsLength],
  );

  return (
    <div
      ref={sectionRef}
      className="testimonial-container"
      style={{ "--arrow-bg": colorArrowBg, "--arrow-fg": colorArrowFg, "--arrow-hover-bg": colorArrowHoverBg } as React.CSSProperties}
    >
      <div className="testimonial-grid">
        {/* Images */}
        <div className="image-container" ref={imageContainerRef}>
          {testimonials.map((testimonial, index) => (
            <SmartImage
              key={testimonial.src}
              src={testimonial.src}
              alt={testimonial.name}
              className="testimonial-image"
              data-index={index}
              style={getImageStyle(index)}
              priority={index === activeIndex}
            />
          ))}
        </div>

        {/* Content */}
        <div className="testimonial-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              variants={quoteVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h3 className="name" style={{ color: colorName, fontSize: fontSizeName }}>
                {activeTestimonial.name}
              </h3>
              <p className="designation" style={{ color: colorDesignation, fontSize: fontSizeDesignation }}>
                {activeTestimonial.designation}
              </p>
              {/* Single paragraph animation — replaces the per-word motion.span loop */}
              <motion.p
                className="quote"
                style={{ color: colorTestimony, fontSize: fontSizeQuote }}
                initial={{ opacity: 0, filter: "blur(6px)", y: 6 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.05 }}
              >
                {activeTestimonial.quote}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          <div className="arrow-buttons">
            <button className="arrow-button prev-button" onClick={handlePrev} aria-label="Testimonio anterior">
              <ArrowLeft size={28} style={{ color: "var(--arrow-fg)" }} />
            </button>
            <button className="arrow-button next-button" onClick={handleNext} aria-label="Testimonio siguiente">
              <ArrowRight size={28} style={{ color: "var(--arrow-fg)" }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircularTestimonials;
