import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
    ArrowRight,
    ShoppingCart,
    Settings,
    GitMerge,
    ShieldCheck,
    Clock,
    AlertCircle,
    Phone,
    Mail,
    Instagram,
    MapPin,
    TrendingUp,
    BarChart3,
    Quote,
} from "lucide-react";
import SeoHead from "@/components/SeoHead";
import { NeuralNoise } from "@/components/ui/neural-noise-cursor";
import SmartImage from "@/components/ui/smart-image";
import FloatingWhatsappButton from "@/components/ui/floating-whatsapp-button";

const fadeUp = {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: "easeOut" },
} as const;

const fadeRight = {
    initial: { opacity: 0, x: 36 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, delay: 0.2, ease: "easeOut" },
} as const;

const heroKpis = [
    {
        label: "ahorradas esta semana",
        value: "32 horas",
        color: "text-emerald-600",
        bg: "bg-emerald-50 border-emerald-100",
    },
    {
        label: "pedidos listos para enviar",
        value: "128",
        color: "text-[#2F64FF]",
        bg: "bg-blue-50 border-blue-100",
    },
    {
        label: "Ventas hoy",
        value: "32",
        color: "text-violet-600",
        bg: "bg-violet-50 border-violet-100",
    },
] as const;

const heroBarHeights = [
    28, 45, 38, 62, 50, 75, 58, 85, 68, 92, 78, 100,
] as const;

const heroStatusRows = [
    { name: "Inventario actualizado", pct: 92, statusText: "Al día" },
    { name: "Mensajes respondidos", pct: 100, statusText: "Todos" },
] as const;

const HeroDashboardMock = () => {
    return (
        <div className="relative w-full max-w-lg mx-auto lg:my-0 lg:ml-auto perspective-[2000px]">
            {/* Base Container */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative bg-white/60 backdrop-blur-2xl border border-[#2F64FF]/15 p-5 sm:p-7 rounded-[2rem] shadow-[0_30px_80px_rgba(7,21,64,0.08)] overflow-hidden"
            >
                {/* Dashboard Header */}
                <div className="flex items-center mb-6">
                    <div className="flex items-center gap-1.5 w-16">
                        <div className="w-3 h-3 rounded-full bg-rose-400" />
                        <div className="w-3 h-3 rounded-full bg-amber-400" />
                        <div className="w-3 h-3 rounded-full bg-emerald-400" />
                    </div>
                    <div className="bg-white border border-[#2F64FF]/10 text-[#071540]/40 text-[0.65rem] font-medium px-3 py-1.5 rounded-lg flex-1 mx-2 flex items-center justify-start tracking-wide shadow-[inset_0_2px_4px_rgba(47,100,255,0.02)]">
                        tunegocio.com/control
                    </div>
                    <div className="w-16" /> {/* Placeholder for balance */}
                </div>

                {/* Top Stats - 3 columns perfectly replicating the ad */}
                <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
                    {/* Stat 1 */}
                    <div className="bg-emerald-50/80 border border-emerald-100 p-3 sm:p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                        <div className="text-emerald-600 font-bold text-xl sm:text-2xl mb-1">
                            0
                        </div>
                        <div className="text-emerald-700/80 text-[0.6rem] sm:text-[0.65rem] font-bold uppercase tracking-wider leading-none">
                            Errores
                        </div>
                    </div>
                    {/* Stat 2 */}
                    <div className="bg-white/80 border border-[#2F64FF]/10 p-3 sm:p-4 rounded-2xl flex flex-col items-center justify-center text-center shadow-[0_2px_10px_rgba(47,100,255,0.04)]">
                        <div className="text-[#2F64FF] font-bold text-xl sm:text-2xl mb-1">
                            128
                        </div>
                        <div className="text-[#071540]/60 text-[0.55rem] sm:text-[0.65rem] font-bold uppercase tracking-wider leading-tight">
                            Entregas
                        </div>
                    </div>
                    {/* Stat 3 */}
                    <div className="bg-purple-50/80 border border-purple-100 p-3 sm:p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                        <div className="text-purple-600 font-bold text-xl sm:text-2xl mb-1">
                            32h
                        </div>
                        <div className="text-purple-700/80 text-[0.55rem] sm:text-[0.65rem] font-bold uppercase tracking-wider leading-tight">
                            Ahorradas
                        </div>
                    </div>
                </div>

                {/* Chart Area */}
                <div className="bg-white/80 border border-[#2F64FF]/10 p-4 sm:p-5 rounded-2xl mb-4 shadow-[0_2px_10px_rgba(47,100,255,0.04)]">
                    <div className="flex items-end justify-between h-20 sm:h-24 gap-1.5 sm:gap-2">
                        {[40, 55, 35, 70, 45, 80, 60, 95, 75, 50, 85].map((height, i) => (
                            <motion.div
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: `${height}%` }}
                                transition={{ delay: 0.6 + i * 0.05, duration: 0.8 }}
                                className="w-full bg-gradient-to-t from-[#2F64FF] to-[#7EABFF] rounded-t-sm sm:rounded-t-md"
                            />
                        ))}
                    </div>
                </div>

                {/* List Items */}
                <div className="space-y-3">
                    <div className="bg-white/80 border border-[#2F64FF]/10 p-3.5 sm:p-4 rounded-2xl flex items-center justify-between shadow-[0_2px_10px_rgba(47,100,255,0.04)]">
                        <div className="text-[#071540]/80 text-[0.7rem] sm:text-sm font-semibold">
                            112 Pedidos{" "}
                        </div>
                        <div className="px-2.5 py-1 bg-emerald-50 text-emerald-600 text-[0.65rem] sm:text-xs rounded-full font-bold uppercase tracking-wide border border-emerald-100">
                            En curso
                        </div>
                    </div>
                    <div className="bg-white/80 border border-[#2F64FF]/10 p-3.5 sm:p-4 rounded-2xl flex items-center justify-between shadow-[0_2px_10px_rgba(47,100,255,0.04)]">
                        <div className="text-[#071540]/80 text-[0.7rem] sm:text-sm font-semibold">
                            Ventas semanales
                        </div>
                        <div className="flex items-center gap-1 text-[#2F64FF] text-[0.65rem] sm:text-xs font-bold bg-[#2F64FF]/5 px-2.5 py-1 rounded-full border border-[#2F64FF]/15">
                            <svg
                                className="w-3 h-3"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                                ></path>
                            </svg>
                            +18%
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const RedirectNavbar = ({
    onCtaClick,
}: {
    onCtaClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) => {
    const [isAtTop, setIsAtTop] = useState(true);
    const [isNavHovered, setIsNavHovered] = useState(false);

    useEffect(() => {
        const onScroll = () => setIsAtTop(window.scrollY < 40);
        const raf = requestAnimationFrame(onScroll);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    const isOpaque = !isAtTop || isNavHovered;

    const navThemeClasses = isOpaque
        ? "bg-white text-[#111] border-b border-black/10 shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
        : "bg-transparent text-[#111] border-b border-transparent shadow-none";

    return (
        <header
            className="fixed left-0 right-0 top-0 z-50"
            onMouseEnter={() => setIsNavHovered(true)}
            onMouseLeave={() => setIsNavHovered(false)}
        >
            <nav
                aria-label="Primary"
                className={`h-[80px] transition-[background-color,border-color,box-shadow] duration-200 ease-in-out ${navThemeClasses}`}
            >
                <div className="container mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
                    <a
                        href="/"
                        aria-label="Elaris Digital Solutions"
                        className="inline-flex items-center"
                    >
                        <SmartImage
                            src="/assets/ElarisLogo.png"
                            alt="Elaris Digital Solutions"
                            priority
                            width={160}
                            height={64}
                            className="h-8 sm:h-10 w-auto"
                        />
                    </a>

                    <div className="flex items-center">
                        <a
                            href="#reserva"
                            onClick={onCtaClick}
                            className="inline-flex h-10 items-center rounded-xl bg-[#2F64FF] px-5 text-sm font-semibold text-white transition-opacity hover:opacity-90 whitespace-nowrap"
                        >
                            Clic para una asesoria gratis
                        </a>
                    </div>
                </div>
            </nav>
        </header>
    );
};

const RedirectFooter = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#030E2C] border-t border-white/10 text-white">
            <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-6xl py-12">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10">
                    <div className="max-w-md">
                        <SmartImage
                            src="/assets/ElarisLogoWhite.png"
                            alt="Elaris Digital Solutions"
                            priority
                            width={180}
                            height={72}
                            className="h-16 w-auto mb-4"
                        />
                        <p className="text-white/80 text-sm leading-relaxed">
                            Ayudamos a los dueños de negocios a vender por internet de forma
                            ordenada, para que recuperen su tiempo y el control de sus ventas.
                        </p>
                    </div>

                    <div className="space-y-3 text-sm text-white/85">
                        <a
                            href="mailto:contact@elarisdigitalsolutions.com"
                            className="flex items-start gap-2 hover:text-white transition-colors min-w-0 break-all"
                        >
                            <Mail className="h-4 w-4" />
                            contact@elarisdigitalsolutions.com
                        </a>
                        <a
                            href="tel:+51973663807"
                            className="flex items-center gap-2 hover:text-white transition-colors"
                        >
                            <Phone className="h-4 w-4" />
                            +51 973 663 807
                        </a>
                        <a
                            href="https://www.instagram.com/elarisdigitalsolutions"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 hover:text-white transition-colors"
                        >
                            <Instagram className="h-4 w-4" />
                            @elarisdigitalsolutions
                        </a>
                        <p className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            Lima, Peru
                        </p>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                    <div className="flex flex-col justify-between gap-2.5 sm:flex-row sm:items-center sm:gap-4">
                        <p className="text-xs text-white/70">
                            © {currentYear} Elaris Digital Solutions. Todos los derechos
                            reservados.
                        </p>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/80 sm:text-sm">
                            <Link
                                to="/terminos-condiciones"
                                className="hover:text-white transition-colors"
                            >
                                Términos &amp; Condiciones
                            </Link>
                            <span aria-hidden="true" className="text-white/40">
                                |
                            </span>
                            <Link
                                to="/politicas-de-datos"
                                className="hover:text-white transition-colors"
                            >
                                Políticas de Datos
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default function LandingImpulsaTuNegocio() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    // Form State
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [nombreFocused, setNombreFocused] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Track Lead event for Meta Ads
        if (typeof window !== "undefined" && (window as any).fbq) {
            (window as any).fbq("track", "Lead");
        }

        const phoneNumber = "51973663807";
        const message = `Hola Elaris, me interesa un diagnóstico gratuito para mi negocio.
*Nombre:* ${nombre}
    *Email:* ${email}`;

        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank", "noopener,noreferrer");
    };

    const scrollToForm = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const form = document.getElementById("reserva");
        if (form) {
            form.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div
            id="landing-page"
            className="relative min-h-screen bg-[#F8FAFC] font-sans overflow-x-hidden selection:bg-[#2F64FF]/20"
        >
            <SeoHead
                title="Impulsa tu negocio | Elaris Digital Solutions"
                description="Ordena tu negocio, recupera tu tiempo y haz que tu empresa crezca sola, sin que tú tengas que estar encima de todo."
            />
            <RedirectNavbar onCtaClick={scrollToForm} />

            {/* SECTION 1 — HERO */}
            <section className="relative pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-28 lg:pb-24 overflow-hidden min-h-[92vh] lg:min-h-screen flex items-center bg-gradient-to-br from-white via-[#F8FAFC] to-[#EEF3FF]">
                <div className="absolute inset-0 overflow-hidden [&_canvas]:!w-full [&_canvas]:!h-full">
                    <NeuralNoise
                        opacity={0.45}
                        pointerStrength={1.2}
                        timeScale={0.4}
                        fixedScrollProgress={0}
                        className="absolute inset-0"
                    />
                </div>

                <div
                    className="absolute inset-0 pointer-events-none select-none"
                    aria-hidden
                >
                    <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-[#2F64FF]/[0.04] to-transparent" />
                    <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-[#2F64FF]/[0.06] rounded-full blur-3xl" />
                </div>

                <div className="container mx-auto px-5 sm:px-6 relative z-10 lg:pt-10">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 max-w-[85rem] mx-auto">
                        {/* Hero Text */}
                        <div className="w-full lg:w-1/2 text-center lg:text-left mt-10 lg:mt-0 order-1">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="text-[2.5rem] leading-[1.1] sm:text-5xl lg:text-[4rem] font-bold text-[#071540] tracking-tight mb-6"
                            >
                                Haz crecer tu negocio <br className="hidden lg:block" />
                                sin que el <span className="text-rose-500">caos</span> te
                                detenga
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="text-xl sm:text-2xl text-[#071540]/80 mb-10 font-light max-w-2xl mx-auto lg:mx-0"
                            >
                                Deja de hacer el trabajo de 3 personas. Nosotros
                                <strong className="font-semibold text-[#2F64FF]">
                                    {" "}
                                    automatizamos
                                </strong>{" "}
                                pedidos y stock. Una sola página. Un solo panel, cero estrés.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
                            >
                                <a
                                    href="#reserva"
                                    onClick={scrollToForm}
                                    className="group inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-medium backdrop-blur-lg bg-[#2F64FF]/90 hover:bg-[#2F64FF]/80 text-white shadow-[0_18px_40px_rgba(47,100,255,0.3)] border border-white/10 transition-[background-color,box-shadow,transform] duration-300 hover:-translate-y-1 text-[0.95rem] sm:text-base lg:text-lg"
                                >
                                    Te regalamos una asesoría gratis
                                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </motion.div>

                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="mt-5 text-[0.85rem] text-[#071540]/50 font-medium"
                            >
                                Gratis · 20 minutos · Te llevas una ruta clara para ordenar tu
                                negocio
                            </motion.p>
                        </div>

                        {/* Hero Visual Mockup */}
                        <div className="w-full lg:w-1/2 order-2">
                            <HeroDashboardMock />
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 2 — PROBLEM IDENTIFICATION */}
            <section className="py-16 sm:py-20 lg:py-32 bg-white border-y border-[#2F64FF]/15">
                <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16 max-w-3xl mx-auto"
                    >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#071540] tracking-tight leading-tight">
                            Tu negocio tiene un límite,{" "}
                            <span className="font-semibold text-rose-500">
                                y ya lo alcanzaste.
                            </span>
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-16">
                        {[
                            {
                                icon: Clock,
                                text: (
                                    <>
                                        Sientes que{" "}
                                        <strong className="font-bold text-[#071540]">
                                            te faltan horas
                                        </strong>{" "}
                                        en el día, porque todo el negocio depende de ti y de tu
                                        celular.
                                    </>
                                ),
                            },
                            {
                                icon: AlertCircle,
                                text: (
                                    <>
                                        Te ahogas anotando en{" "}
                                        <strong className="font-bold text-[#071540]">
                                            cuadernos o Excel
                                        </strong>{" "}
                                        los pedidos y contando el stock{" "}
                                        <strong className="font-bold text-[#071540]">
                                            a mano.
                                        </strong>
                                    </>
                                ),
                            },
                            {
                                icon: ShoppingCart,
                                text: (
                                    <>
                                        <strong className="font-bold text-[#071540]">
                                            Pierdes clientes
                                        </strong>{" "}
                                        y ventas solo porque{" "}
                                        <strong className="font-bold text-[#071540]">
                                            demoras
                                        </strong>{" "}
                                        en responder sus mensajes.
                                    </>
                                ),
                            },
                            {
                                icon: GitMerge,
                                text: (
                                    <>
                                        Tus{" "}
                                        <strong className="font-bold text-[#071540]">
                                            competidores
                                        </strong>{" "}
                                        avanzan rápido, publican más y tú sigues{" "}
                                        <strong className="font-bold text-[#071540]">
                                            estancado sin tiempo.
                                        </strong>
                                    </>
                                ),
                            },
                        ].map((problem, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.1 }}
                                transition={{ delay: idx * 0.1, duration: 0.5 }}
                                className="group bg-gradient-to-br from-white to-rose-50/90 border border-rose-300 p-5 sm:p-7 rounded-2xl flex items-start gap-4 shadow-[0_12px_40px_rgba(225,29,72,0.12)] hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="w-10 h-10 border border-rose-200 bg-rose-50/80 rounded-lg flex items-center justify-center flex-shrink-0 text-rose-600 group-hover:bg-rose-100/50 group-hover:border-rose-300 transition-all duration-300 shadow-[inset_0_2px_4px_rgba(225,29,72,0.02)]">
                                    <problem.icon className="w-5 h-5" />
                                </div>
                                <p className="text-[0.98rem] sm:text-[1.05rem] text-[#071540] leading-snug pt-0.5 font-medium transition-colors duration-300">
                                    {problem.text}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="bg-[#071540] text-center p-8 md:p-12 rounded-3xl shadow-xl max-w-4xl mx-auto">
                        <p className="text-xl md:text-2xl text-white font-light leading-relaxed">
                            "Hacer todo tú mismo te está desgastando.{" "}
                            <span className="font-semibold text-[#2F64FF]">
                                Y el desorden no va a parar solo."
                            </span>
                        </p>
                    </div>
                </div>
            </section>

            {/* SECTION 2.5 — TESTIMONIAL QUOTE */}
            <section className="py-24 sm:py-32 bg-[#F0F4FF] border-y border-[#2F64FF]/15 relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(47,100,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(47,100,255,0.04)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#2F64FF]/[0.05] to-transparent rounded-full blur-3xl pointer-events-none" />

                <div className="container mx-auto px-5 sm:px-6 max-w-5xl relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="relative bg-white/70 backdrop-blur-2xl border border-[#2F64FF]/15 rounded-[2.5rem] p-8 sm:p-12 lg:p-16 shadow-[0_20px_80px_rgba(7,21,64,0.06)] overflow-hidden"
                    >
                        {/* Huge background quote mark for texture */}
                        <Quote className="absolute -top-6 -left-6 w-64 h-64 text-[#2F64FF]/[0.03] -rotate-12 pointer-events-none" />

                        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14 relative z-10">
                            {/* Image Side */}
                            <div className="relative flex-shrink-0 w-48 h-48 sm:w-56 sm:h-56 lg:w-72 lg:h-72 group">
                                <div className="absolute inset-0 bg-gradient-to-tr from-[#2F64FF] to-[#7EABFF] rounded-full blur-[40px] opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
                                <div className="absolute inset-0 rounded-full border border-[#2F64FF]/15 p-2 shadow-xl bg-white/50 backdrop-blur-sm">
                                    <SmartImage
                                        src="/assets/milagros-salcedo.webp"
                                        alt="Milagros Salcedo"
                                        width={288}
                                        height={288}
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                </div>
                            </div>

                            {/* Text Side */}
                            <div className="flex-1 text-center lg:text-left">
                                <div className="inline-flex items-center justify-center lg:justify-start gap-2 px-4 py-1.5 rounded-full bg-[#2F64FF]/5 text-[#2F64FF] text-[0.7rem] font-bold tracking-[0.15em] uppercase mb-6 mx-auto lg:mx-0 border border-[#2F64FF]/15">
                                    Caso de Éxito
                                </div>

                                <p className="text-xl sm:text-2xl lg:text-[1.7rem] font-light leading-relaxed text-[#071540]/90 mb-8">
                                    "Antes vivía pegada al celular anotando pedidos en hojas y mi
                                    cabeza era un caos. Desde que tenemos la web y el panel de
                                    control,{" "}
                                    <span className="font-semibold text-[#2F64FF]">
                                        el negocio funciona solo.
                                    </span>{" "}
                                    Ahora descanso más y puedo enfocarme en hacerlo crecer."
                                </p>

                                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#2F64FF]/15 pt-6">
                                    <div className="text-center sm:text-left">
                                        <p className="text-lg font-bold text-[#071540]">
                                            Milagros Salcedo
                                        </p>
                                        <p className="text-sm text-[#071540]/60 mt-0.5 font-medium">
                                            Fundadora de{" "}
                                            <span className="font-semibold text-[#071540]">
                                                Salcedo Jewels
                                            </span>
                                        </p>
                                    </div>
                                    <div className="flex justify-center gap-1 text-amber-400">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <svg
                                                key={i}
                                                className="w-5 h-5 fill-current"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* SECTION 3 — SOLUTION */}
            <section className="py-16 sm:py-20 lg:py-32 bg-white">
                <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-6xl">
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#071540] tracking-tight leading-tight">
                            Tu oficina virtual: todo lo que necesitas en{" "}
                            <span className="font-semibold text-[#2F64FF]">
                                una sola pantalla
                            </span>
                        </h2>
                        <p className="mt-6 text-lg text-[#071540]/70">
                            Construimos tu <strong className="font-bold text-[#071540]">página web</strong> y te entregamos un{" "}
                            <strong className="font-bold text-[#071540]">centro de control privado.</strong> Es como tener un
                            asistente que <strong className="font-bold text-[#071540]">trabaja 24/7</strong> y no comete errores.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-5 sm:gap-6 relative">
                        {/* Decorative background grid for the whole section */}
                        <div className="absolute -inset-4 md:-inset-10 bg-[linear-gradient(rgba(7,21,64,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(7,21,64,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none -z-10 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]" />

                        {/* Block 1 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-[0_8px_40px_rgba(47,100,255,0.08)] border border-[#2F64FF]/40 hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-6 opacity-5 transition-opacity duration-500 translate-x-4 -translate-y-4">
                                <ShoppingCart className="w-24 h-24 text-[#2F64FF]" />
                            </div>
                            <div className="w-10 h-10 border border-[#2F64FF]/20 rounded-lg flex items-center justify-center text-[#2F64FF] mb-6 transition-all duration-300 relative z-10 bg-[#2F64FF]/[0.02] group-hover:bg-[#2F64FF]/10 group-hover:border-[#2F64FF]/30">
                                <ShoppingCart className="w-5 h-5" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold text-[#071540] mb-3 tracking-tight">
                                Ver tus ventas en tiempo real
                            </h3>
                            <p className="text-[#071540]/80 text-sm leading-relaxed font-light">
                                Tu página web atiende clientes y cierra las ventas 24/7 sin tu intervención. Revisa tu panel y mira cuánto ganas en tiempo real.
                            </p>
                        </motion.div>

                        {/* Block 2 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-[0_8px_40px_rgba(47,100,255,0.08)] border border-[#2F64FF]/40 hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-6 opacity-5 transition-opacity duration-500 translate-x-4 -translate-y-4">
                                <Settings className="w-24 h-24 text-[#2F64FF]" />
                            </div>
                            <div className="w-10 h-10 border border-[#2F64FF]/20 rounded-lg flex items-center justify-center text-[#2F64FF] mb-6 transition-all duration-300 relative z-10 bg-[#2F64FF]/[0.02] group-hover:bg-[#2F64FF]/10 group-hover:border-[#2F64FF]/30">
                                <Settings className="w-5 h-5" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold text-[#071540] mb-3 tracking-tight">
                                Controlar tu stock
                            </h3>
                            <p className="text-[#071540]/80 text-sm leading-relaxed font-light">
                                Olvídate de los cuadernos. Tu pantalla te dirá qué talla y
                                cuántas unidades te quedan de cada producto, evitando ofrecer lo
                                que ya vendiste.
                            </p>
                        </motion.div>

                        {/* Block 3 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-[0_8px_40px_rgba(47,100,255,0.08)] border border-[#2F64FF]/40 hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-6 opacity-5 transition-opacity duration-500 translate-x-4 -translate-y-4">
                                <GitMerge className="w-24 h-24 text-[#2F64FF]" />
                            </div>
                            <div className="w-10 h-10 border border-[#2F64FF]/20 rounded-lg flex items-center justify-center text-[#2F64FF] mb-6 transition-all duration-300 relative z-10 bg-[#2F64FF]/[0.02] group-hover:bg-[#2F64FF]/10 group-hover:border-[#2F64FF]/30">
                                <GitMerge className="w-5 h-5" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold text-[#071540] mb-3 tracking-tight">
                                Gestionar tus pedidos
                            </h3>
                            <p className="text-[#071540]/80 text-sm leading-relaxed font-light">
                                Sabrás qué enviarle a quién y cuándo en una lista súper
                                ordenada. No perderás ni una sola venta y tu cabeza por fin
                                podrá descansar.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* SECTION 4 — RESULTS */}
            <section className="py-16 sm:py-20 lg:py-32 bg-[#F0F4FF] border-y border-[#2F64FF]/15 relative overflow-hidden">
                <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-blue-50 to-transparent pointer-events-none" />

                <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-5xl relative z-10">
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#071540] tracking-tight leading-tight">
                            Un negocio que crece <br className="hidden md:block" />
                            <span className="font-semibold text-[#2F64FF]">
                                mientras tú descansas
                            </span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                        {[
                            { value: "Más tiempo", text: "Para hacer crecer tu marca" },
                            { value: "Más control", text: "Sabes exactamente qué pasa" },
                            { value: "Más ventas", text: "Tus clientes compran fácil" },
                            { value: "Menos estrés", text: "Fin al caos y al desorden" },
                        ].map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.1 }}
                                transition={{ delay: idx * 0.1 }}
                                className="group bg-white backdrop-blur-sm border border-[#2F64FF]/25 rounded-xl p-4 sm:p-5 text-center shadow-[0_8px_30px_rgba(47,100,255,0.12)] hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="inline-block mb-2 text-[0.65rem] sm:text-[0.7rem] font-bold tracking-[0.15em] uppercase text-[#2F64FF] transition-colors duration-300">
                                    {stat.value}
                                </div>
                                <div className="h-px w-10 sm:w-12 bg-[#2F64FF]/40 mx-auto mb-3 transition-all duration-300 group-hover:bg-[#2F64FF]" />
                                <p className="text-sm text-[#071540] font-medium leading-snug">
                                    {stat.text}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <a
                            href="#reserva"
                            onClick={scrollToForm}
                            className="group inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-medium backdrop-blur-lg bg-[#2F64FF]/90 hover:bg-[#2F64FF]/80 text-white shadow-[0_18px_40px_rgba(47,100,255,0.3)] border border-white/10 transition-[background-color,box-shadow,transform] duration-300 hover:-translate-y-1 w-full sm:w-auto"
                        >
                            Quiero ordenar mi negocio
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>
            </section>

            {/* SECTION 5 — AUTHORITY */}
            <section className="relative py-16 sm:py-20 lg:py-32 bg-[#071540] text-white overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#2F64FF]/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-6xl text-center relative z-10">
                    <div className="flex justify-center mb-8">
                        <ShieldCheck
                            className="w-12 h-12 sm:w-14 sm:h-14 text-[#2F64FF]"
                            strokeWidth={1.5}
                        />
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight mb-6 leading-tight">
                        Fácil de usar,{" "}
                        <span className="font-semibold">sin dolores de cabeza</span>
                    </h2>
                    <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed mb-10 max-w-3xl mx-auto">
                        Tu trabajo es hacer crecer tu negocio, no lidiar con tecnología.
                        Nosotros lo hacemos simple para que puedas usarlo desde el primer
                        día.
                    </p>

                    <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-center gap-y-[14px] gap-x-3 sm:gap-y-[16px] sm:gap-x-4">
                        {[
                            "Hecho para durar y fácil de usar",
                            "Una herramienta hecha para tu negocio",
                            "Recibe pagos de forma segura y fácil",
                            "Listo para usar desde el primer día",
                            "El sistema es tuyo para siempre",
                        ].map((badge, idx) => (
                            <span
                                key={idx}
                                className="inline-flex w-fit max-w-full justify-center bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-light tracking-wide text-center"
                            >
                                {badge}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 6 — URGENCY */}
            <section className="py-16 sm:py-20 lg:py-32 bg-white border-b border-[#2F64FF]/15">
                <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-3xl text-center">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-[#071540] mb-6 leading-tight">
                        Si no actúas ahora, tu negocio{" "}
                        <span className="font-semibold text-red-500">
                            seguirá estancado
                        </span>
                    </h2>
                    <p className="text-lg md:text-xl text-[#071540]/70 leading-relaxed font-light">
                        Seguir anotando pedidos a mano,{" "}
                        <strong className="font-bold text-[#071540]">
                            perdiendo clientes
                        </strong>{" "}
                        por demoras y{" "}
                        <strong className="font-bold text-[#071540]">
                            sin tiempo libre
                        </strong>{" "}
                        no es forma de hacer crecer un negocio. Es momento de soltar el caos
                        y recuperar el control.
                    </p>
                </div>
            </section>

            {/* SECTION 7 — FINAL CTA (Booking Form) */}
            <section
                id="reserva"
                className="relative py-16 sm:py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-white via-[#F8FAFC] to-[#EEF3FF]"
            >
                <div className="absolute inset-0 overflow-hidden [&_canvas]:!w-full [&_canvas]:!h-full">
                    <NeuralNoise
                        opacity={0.6}
                        pointerStrength={1.5}
                        timeScale={0.4}
                        fixedScrollProgress={0}
                        className="absolute inset-0"
                    />
                </div>

                <div
                    className="absolute inset-0 pointer-events-none select-none"
                    aria-hidden
                >
                    <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-[#2F64FF]/[0.04] to-transparent" />
                    <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-[#2F64FF]/[0.06] rounded-full blur-3xl" />
                </div>

                <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-6xl relative z-10">
                    <motion.div
                        className="mx-auto w-full max-w-4xl"
                        initial={{ opacity: 0, x: -32 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                    >
                        <div className="mb-10 text-center">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-[#071540] leading-tight">
                                Da el primer paso para
                                <span className="font-semibold text-[#2F64FF]">
                                    {" "}
                                    ordenar y hacer crecer tu negocio
                                </span>
                            </h2>
                            <p className="mt-4 mx-auto text-base sm:text-lg text-[#071540]/60 leading-relaxed max-w-3xl">
                                Te damos un plan claro para ordenar y hacer crecer tu negocio en
                                menos de 12 horas. Gratis.
                            </p>
                        </div>

                        <form
                            onSubmit={handleFormSubmit}
                            className="mx-auto w-full max-w-2xl bg-white/60 backdrop-blur-2xl border border-white/50 shadow-[0_30px_70px_rgba(20,40,95,0.08)] rounded-3xl p-8 sm:p-10 space-y-8 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#2F64FF]/[0.03] rounded-full blur-3xl -z-10" />

                            <div className="relative">
                                <label
                                    className={`absolute left-0 font-medium tracking-widest uppercase transition-all duration-200 pointer-events-none ${nombreFocused || nombre
                                        ? "-top-4 text-[0.65rem] text-[#2F64FF]"
                                        : "top-2 text-[0.95rem] text-[#071540]/50"
                                        }`}
                                >
                                    Nombre completo *
                                </label>
                                <input
                                    type="text"
                                    className="w-full bg-transparent border-b border-[#071540]/20 pb-3 pt-2 text-[#071540] text-[1.05rem] font-medium focus:outline-none focus:border-[#2F64FF] transition-colors"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    onFocus={() => setNombreFocused(true)}
                                    onBlur={() => setNombreFocused(false)}
                                    required
                                />
                            </div>

                            <div className="relative">
                                <label
                                    className={`absolute left-0 font-medium tracking-widest uppercase transition-all duration-200 pointer-events-none ${emailFocused || email
                                        ? "-top-4 text-[0.65rem] text-[#2F64FF]"
                                        : "top-2 text-[0.95rem] text-[#071540]/50"
                                        }`}
                                >
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    className="w-full bg-transparent border-b border-[#071540]/20 pb-3 pt-2 text-[#071540] text-[1.05rem] font-medium focus:outline-none focus:border-[#2F64FF] transition-colors"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onFocus={() => setEmailFocused(true)}
                                    onBlur={() => setEmailFocused(false)}
                                    required
                                />
                            </div>

                            <div className="pt-4 text-center">
                                <button
                                    type="submit"
                                    className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl font-medium backdrop-blur-lg bg-[#2F64FF]/90 hover:bg-[#2F64FF]/80 text-white shadow-[0_18px_40px_rgba(47,100,255,0.3)] border border-white/10 transition-[background-color,box-shadow,transform] duration-300 hover:-translate-y-1 text-[0.95rem] sm:text-base lg:text-lg"
                                >
                                    Reservar mi asesoría gratis
                                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
                                </button>
                                <p className="mt-4 text-[0.8rem] text-[#071540]/50 tracking-wide font-medium">
                                    Respuesta en menos de 12 horas. Sin compromiso.
                                </p>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </section>

            <RedirectFooter />
            <FloatingWhatsappButton />
        </div>
    );
}
