import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, MessageSquare, Users, GraduationCap } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export default function TechForInclusion() {
    const { t, language } = useI18n();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const initiatives = [
        {
            key: "pictoLink",
            icon: MessageSquare,
            image: `/assets/picto-link-landing-${language === 'es' ? 'es' : 'en'}.webp`,
            color: "text-orange-500",
            bg: "bg-orange-100",
            buttonColor: "bg-orange-500 hover:bg-orange-600",
            url: "https://picto-link.netlify.app"
        },
        {
            key: "nuestroBarrio",
            icon: Users,
            image: `/assets/nuestro-barrio-landing-${language === 'es' ? 'es' : 'en'}.webp`,
            color: "text-blue-500",
            bg: "bg-blue-100",
            buttonColor: "bg-blue-500 hover:bg-blue-600",
            url: "https://nuestro-barrio-nuestra-historia.netlify.app/"
        }
    ];

    const handleNext = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % initiatives.length);
    };

    const handlePrev = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + initiatives.length) % initiatives.length);
    };

    const currentInitiative = initiatives[currentIndex];

    // Auto-advance
    useEffect(() => {
        const timer = setInterval(() => {
            handleNext();
        }, 8000);
        return () => clearInterval(timer);
    }, [currentIndex]);

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 50 : -50,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 50 : -50,
            opacity: 0
        })
    };

    return (
        <section className="py-12 lg:pb-40 bg-slate-50 relative z-20 lg:mb-[-200px] overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-blue-100/50 rounded-full blur-3xl" />
                <div className="absolute top-[40%] -right-[10%] w-[40%] h-[60%] bg-indigo-100/40 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Section Header */}
                <div className="mb-12 max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
                        {t("techForInclusion.titleNormal")}
                        <span className="text-[#2F64FF]">{t("techForInclusion.titleAccent")}</span>
                    </h2>
                    <p className="text-lg sm:text-xl text-slate-600 leading-relaxed text-center">
                        {t("techForInclusion.description")}
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {/* Left Column: Content */}
                    <div className="order-1 lg:order-1">
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={currentIndex}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                className="flex flex-col"
                            >
                                <div className="flex items-center gap-3 sm:gap-4 mb-2">
                                    <div className={cn("p-2 sm:p-2.5 rounded-2xl", currentInitiative.bg)}>
                                        <currentInitiative.icon className={cn("w-5 h-5 sm:w-6 sm:h-6", currentInitiative.color)} />
                                    </div>
                                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                                        {t(`techForInclusion.projects.${currentInitiative.key}.title`)}
                                    </h3>
                                </div>

                                <p className={cn("text-base sm:text-lg font-medium mb-4 ml-[2.75rem] sm:ml-[3.25rem]", currentInitiative.color)}>
                                    {t(`techForInclusion.projects.${currentInitiative.key}.subtitle`)}
                                </p>

                                <p className="text-base sm:text-lg text-slate-600 mb-6 sm:mb-8 leading-relaxed text-justify">
                                    {t(`techForInclusion.projects.${currentInitiative.key}.description`)}
                                </p>

                                <a
                                    href={currentInitiative.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={cn(
                                        "inline-flex items-center justify-center px-6 py-2.5 sm:px-8 sm:py-3 rounded-xl text-white font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 w-fit text-sm sm:text-base",
                                        currentInitiative.buttonColor
                                    )}
                                >
                                    {t("common.buttons.viewProject")}
                                </a>
                            </motion.div>
                        </AnimatePresence>

                        {/* Controls */}
                        <div className="flex items-center gap-4 mt-8 justify-center lg:justify-start">
                            <button
                                onClick={handlePrev}
                                className="p-2 sm:p-3 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm hover:shadow-md"
                                aria-label="Previous project"
                            >
                                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                            </button>

                            <div className="flex gap-2">
                                {initiatives.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            setDirection(idx > currentIndex ? 1 : -1);
                                            setCurrentIndex(idx);
                                        }}
                                        className={cn(
                                            "w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300",
                                            idx === currentIndex ? "bg-slate-800 w-6 sm:w-8" : "bg-slate-300 hover:bg-slate-400"
                                        )}
                                        aria-label={`Go to slide ${idx + 1}`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={handleNext}
                                className="p-2 sm:p-3 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm hover:shadow-md"
                                aria-label="Next project"
                            >
                                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Phone Mockup */}
                    <div className="order-2 lg:order-2 flex justify-center items-center relative mt-8 lg:mt-0">
                        {/* Phone Frame */}
                        <div className="relative w-[260px] h-[520px] sm:w-[300px] sm:h-[600px] bg-slate-900 rounded-[2.5rem] sm:rounded-[3rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] border-[6px] sm:border-[8px] border-slate-900 overflow-hidden z-10 transition-all duration-300">
                            {/* Notch */}
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 sm:w-32 h-5 sm:h-6 bg-slate-900 rounded-b-xl sm:rounded-b-2xl z-20"></div>

                            {/* Screen Content */}
                            <div className="w-full h-full bg-white overflow-hidden relative">
                                <AnimatePresence mode="wait" custom={direction}>
                                    <motion.img
                                        key={currentIndex}
                                        src={currentInitiative.image}
                                        alt={t(`techForInclusion.projects.${currentInitiative.key}.title`)}
                                        className="w-full h-full object-fill"
                                        initial={{ opacity: 0, scale: 1.1 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.5 }}
                                    />
                                </AnimatePresence>

                                {/* Overlay Gradient for text readability if needed, though images seem self-contained */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
                            </div>
                        </div>

                        {/* Decorative Elements behind phone */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[290px] h-[550px] sm:w-[340px] sm:h-[640px] border border-slate-200 rounded-[3rem] sm:rounded-[3.5rem] -z-10 transition-all duration-300" />
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[320px] h-[580px] sm:w-[380px] sm:h-[680px] border border-slate-100 rounded-[3.5rem] sm:rounded-[4rem] -z-20 transition-all duration-300" />
                    </div>

                </div>
            </div>
        </section>
    );
}
