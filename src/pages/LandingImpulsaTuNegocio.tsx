import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { 
    ArrowRight, ShoppingCart, Settings, GitMerge,
    ShieldCheck, Clock, CheckCircle2, AlertCircle, Phone, Mail, Instagram, MapPin
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

const RedirectNavbar = ({ onCtaClick }: { onCtaClick: (e: React.MouseEvent<HTMLAnchorElement>) => void }) => {
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
                <div className="container mx-auto h-full px-4 sm:px-6 lg:px-8 max-w-6xl flex items-center justify-between gap-3">
                    <a href="/" aria-label="Elaris Digital Solutions" className="inline-flex items-center">
                        <SmartImage
                            src="/assets/ElarisLogo.png"
                            alt="Elaris Digital Solutions"
                            priority
                            width={160}
                            height={64}
                            className="h-10 w-auto"
                        />
                    </a>

                    <div className="flex items-center">
                        <a
                            href="#reserva"
                            onClick={onCtaClick}
                            className="inline-flex h-10 items-center rounded-xl bg-[#2F64FF] px-3 sm:px-5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                        >
                            Contacta Ventas
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
            <div className="container mx-auto px-6 lg:px-8 max-w-6xl py-12">
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
                            Desarrollamos soluciones digitales, automatizaciones e integraciones para empresas que buscan crecer con procesos mas eficientes.
                        </p>
                    </div>

                    <div className="space-y-3 text-sm text-white/85">
                        <a href="mailto:contact@elarisdigitalsolutions.com" className="flex items-center gap-2 hover:text-white transition-colors">
                            <Mail className="h-4 w-4" />
                            contact@elarisdigitalsolutions.com
                        </a>
                        <a href="tel:+51973663807" className="flex items-center gap-2 hover:text-white transition-colors">
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
                    <p className="text-xs text-white/70">© {currentYear} Elaris Digital Solutions. Todos los derechos reservados.</p>
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
        if (typeof window !== 'undefined' && (window as any).fbq) {
            (window as any).fbq('track', 'Lead');
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
        <div id="landing-page" className="relative min-h-screen bg-[#F8FAFC] font-sans overflow-x-hidden selection:bg-[#2F64FF]/20">
            <SeoHead
                title="Impulsa tu negocio | Elaris Digital Solutions"
                description="Automatiza procesos, vende online y conecta tus sistemas para que tu empresa crezca sin aumentar tu carga de trabajo."
            />
            <RedirectNavbar onCtaClick={scrollToForm} />

            {/* SECTION 1 — HERO */}
            <section className="relative min-h-[100svh] overflow-hidden bg-gradient-to-br from-white via-[#F8FAFC] to-[#EEF3FF]">
                <div className="absolute inset-0 overflow-hidden [&_canvas]:!w-full [&_canvas]:!h-full">
                    <NeuralNoise opacity={0.6} pointerStrength={1.5} timeScale={0.4} fixedScrollProgress={0} className="absolute inset-0" />
                </div>

                <div className="absolute inset-x-0 top-[80px] bottom-0 z-10 flex items-center">
                    <div className="container mx-auto px-6 lg:px-8 max-w-5xl text-center py-10 lg:py-14">
                        <motion.div {...fadeUp}>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#2F64FF]/30 bg-[#2F64FF]/[0.07] text-[#2F64FF] text-xs font-bold tracking-[0.12em] uppercase mb-8 shadow-sm justify-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#2F64FF] animate-pulse" />
                            Soluciones para empresas
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-[4rem] font-light tracking-tight text-[#071540] leading-tight mb-8 max-w-4xl mx-auto">
                            Impulsa tu negocio con <span className="font-semibold text-[#2F64FF]">tecnología que vende por ti</span>
                        </h1>
                        
                        <p className="text-lg md:text-xl lg:text-2xl text-slate-600 font-light leading-relaxed mb-12 max-w-3xl mx-auto">
                            Automatiza procesos, vende online y conecta tus sistemas para que tu empresa crezca sin aumentar tu carga de trabajo.
                        </p>

                        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
                            <ul className="text-left space-y-3 lg:space-y-4">
                                {[
                                    "Vende 24/7 con tu propio e-commerce",
                                    "Automatiza tareas que hoy te hacen perder tiempo",
                                    "Conecta inventario, pagos y operaciones"
                                ].map((bullet, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-slate-700 font-medium text-base lg:text-lg">
                                        <CheckCircle2 className="w-6 h-6 text-[#2F64FF] flex-shrink-0" />
                                        <span>{bullet}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex flex-col items-center">
                            <a 
                                href="#reserva" 
                                onClick={scrollToForm}
                                className="group inline-flex items-center justify-center gap-3 bg-[#2F64FF] text-white px-8 md:px-10 py-4 md:py-5 rounded-full font-bold text-lg hover:bg-[#1a4fe0] hover:shadow-[0_10px_32px_rgba(47,100,255,0.42)] transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto"
                            >
                                Agendar diagnóstico gratuito
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </a>
                            <p className="mt-4 text-xs md:text-sm text-slate-500 font-medium">
                                Sin compromiso · 20 minutos · Diagnóstico real para tu negocio
                            </p>
                        </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* SECTION 2 — PROBLEM IDENTIFICATION */}
            <section className="py-20 lg:py-32 bg-white border-y border-slate-100">
                <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
                    <motion.div 
                        initial={{ opacity: 0, y: 24 }} 
                        whileInView={{ opacity: 1, y: 0 }} 
                        viewport={{ once: true }} 
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16 max-w-3xl mx-auto"
                    >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#071540] tracking-tight leading-tight">
                            Si tu negocio depende de procesos manuales, <span className="font-semibold text-rose-500">estás perdiendo dinero.</span>
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        {[
                            { icon: AlertCircle, text: "Inventario gestionado manualmente y propenso a errores." },
                            { icon: Clock, text: "Ventas limitadas al horario de apertura de tu tienda." },
                            { icon: ShoppingCart, text: "Clientes que preguntan por redes sociales pero no compran." },
                            { icon: GitMerge, text: "Sistemas desvinculados que no se conectan entre sí." }
                        ].map((problem, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.5 }}
                                className="bg-rose-50/50 border border-rose-100 p-8 rounded-2xl flex items-start gap-4"
                            >
                                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center flex-shrink-0 text-rose-500">
                                    <problem.icon className="w-6 h-6" />
                                </div>
                                <p className="text-lg text-[#071540] font-medium leading-snug pt-2">
                                    {problem.text}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="bg-[#071540] text-center p-8 md:p-12 rounded-3xl shadow-xl max-w-4xl mx-auto">
                        <p className="text-xl md:text-2xl text-white font-light leading-relaxed">
                            "Muchos negocios pierden oportunidades clave de crecimiento diario simplemente porque sus operaciones <span className="font-semibold text-[#2F64FF]">aún no están digitalizadas</span>."
                        </p>
                    </div>
                </div>
            </section>

            {/* SECTION 3 — SOLUTION */}
            <section className="py-20 lg:py-32 bg-[#F0F4FF]">
                <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#071540] tracking-tight leading-tight">
                            Lo resolvemos con tecnología diseñada para <span className="font-semibold text-[#2F64FF]">hacer crecer tu negocio.</span>
                        </h2>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Block 1 */}
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="bg-white rounded-3xl p-10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 hover:border-[#2F64FF]/30 transition-all"
                        >
                            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-[#2F64FF] mb-6">
                                <ShoppingCart className="w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-bold text-[#071540] mb-4">E-commerce que vende</h3>
                            <p className="text-slate-600 leading-relaxed">
                                Tiendas online personalizadas y optimizadas para máxima conversión. Incluyen pasarelas de pago, integración logística y arquitectura orientada a SEO.
                            </p>
                        </motion.div>

                        {/* Block 2 */}
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="bg-white rounded-3xl p-10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 hover:border-[#2F64FF]/30 transition-all"
                        >
                            <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-500 mb-6">
                                <Settings className="w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-bold text-[#071540] mb-4">Automatización inteligente</h3>
                            <p className="text-slate-600 leading-relaxed">
                                Eliminamos los procesos repetitivos mediante inteligencia artificial y flujos de trabajo inteligentes que trabajan por ti las 24 horas.
                            </p>
                        </motion.div>

                        {/* Block 3 */}
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="bg-white rounded-3xl p-10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 hover:border-[#2F64FF]/30 transition-all"
                        >
                            <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 mb-6">
                                <GitMerge className="w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-bold text-[#071540] mb-4">Sistemas conectados</h3>
                            <p className="text-slate-600 leading-relaxed">
                                Integramos tu inventario, herramientas de contabilidad, ERP y CRM para que toda la información comercial viva en un solo ecosistema sincronizado.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* SECTION 4 — RESULTS */}
            <section className="py-20 lg:py-32 bg-white border-y border-slate-100 relative overflow-hidden">
                <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-blue-50 to-transparent pointer-events-none" />
                
                <div className="container mx-auto px-6 lg:px-8 max-w-5xl relative z-10">
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#071540] tracking-tight leading-tight">
                            El resultado: un negocio que crece <br className="hidden md:block"/>
                            <span className="font-semibold text-[#2F64FF]">sin aumentar su complejidad.</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { value: "Más", text: "Ventas online 24/7", color: "text-[#2F64FF]", bg: "bg-blue-50" },
                            { value: "Menos", text: "Tareas manuales", color: "text-rose-500", bg: "bg-rose-50" },
                            { value: "Mejor", text: "Eficiencia operativa", color: "text-emerald-500", bg: "bg-emerald-50" },
                            { value: "Datos", text: "Claros para decidir", color: "text-indigo-500", bg: "bg-indigo-50" }
                        ].map((stat, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white border border-slate-100 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className={`inline-block px-3 py-1 rounded-full text-sm font-bold tracking-wide uppercase mb-4 ${stat.bg} ${stat.color}`}>
                                    {stat.value}
                                </div>
                                <p className="text-[#071540] font-medium leading-snug">
                                    {stat.text}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <a 
                            href="#reserva" 
                            onClick={scrollToForm}
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-[#2F64FF] text-[#2F64FF] font-bold hover:bg-[#2F64FF] hover:text-white transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto"
                        >
                            Quiero estos resultados
                            <ArrowRight className="w-5 h-5 flex-shrink-0" />
                        </a>
                    </div>
                </div>
            </section>

            {/* SECTION 5 — AUTHORITY */}
            <section className="py-20 lg:py-32 bg-[#071540] text-white">
                <div className="container mx-auto px-6 lg:px-8 max-w-4xl text-center">
                    <ShieldCheck className="w-16 h-16 text-[#2F64FF] mx-auto mb-8 opacity-80" />
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight mb-6 leading-tight">
                        Tecnología desarrollada por <span className="font-semibold">especialistas.</span>
                    </h2>
                    <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed mb-10 max-w-3xl mx-auto">
                        En Elaris Digital Solutions construimos plataformas digitales escalables, integraciones y sistemas de automatización especialmente diseñados para compañías en crecimiento.
                    </p>
                    
                    <div className="flex flex-wrap justify-center gap-4">
                        {[
                            "Arquitectura Moderna", 
                            "Desarrollo a Medida", 
                            "Enfoque en Conversión", 
                            "Soporte Continuo"
                        ].map((badge, idx) => (
                            <span key={idx} className="bg-white/10 border border-white/20 px-5 py-2 rounded-full text-sm font-medium tracking-wide">
                                {badge}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 6 — URGENCY */}
            <section className="py-20 lg:py-32 bg-white border-b border-slate-100">
                <div className="container mx-auto px-6 lg:px-8 max-w-3xl text-center">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-[#071540] mb-6 leading-tight">
                        Cada mes sin digitalización es una <span className="font-semibold">oportunidad perdida.</span>
                    </h2>
                    <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-light">
                        Las empresas que no modernizan sus operaciones están cediendo terreno. Mientras dudas, tus competidores están automatizando procesos, atrayendo a tus clientes online y reduciendo sus costos operativos. El momento de escalar de forma limpia es hoy.
                    </p>
                </div>
            </section>

            {/* SECTION 7 — FINAL CTA (Booking Form) */}
            <section id="reserva" className="relative py-20 lg:py-32 bg-[#F0F4FF] overflow-hidden">
                <div className="absolute inset-0 overflow-hidden [&_canvas]:!w-full [&_canvas]:!h-full">
                    <NeuralNoise opacity={0.8} pointerStrength={1.2} timeScale={0.5} fixedScrollProgress={0} className="absolute inset-0" />
                </div>

                <div className="container mx-auto px-6 lg:px-8 max-w-6xl relative z-10">
                    <motion.div
                        className="mx-auto w-full max-w-4xl"
                        initial={{ opacity: 0, x: -32 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                    >
                        <div className="mb-10 text-center">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-[#071540] leading-tight">
                                Convirtamos tu operación en una máquina de ventas
                                <span className="font-semibold text-[#2F64FF]"> desde este mes.</span>
                            </h2>
                            <p className="mt-4 mx-auto text-lg text-slate-500 leading-relaxed max-w-3xl">
                                Cuéntanos dónde se está frenando tu crecimiento y te devolvemos un plan accionable para vender más, automatizar procesos y escalar sin sumar complejidad.
                            </p>
                        </div>

                        <form onSubmit={handleFormSubmit} className="mx-auto w-full max-w-3xl space-y-6">
                            <div className="relative pt-4">
                                <label
                                    className={`absolute left-0 font-semibold tracking-widest uppercase transition-all duration-200 pointer-events-none ${
                                        nombreFocused || nombre
                                            ? "top-0 text-[0.65rem] text-[#2F64FF]"
                                            : "top-4 text-[1.05rem] text-slate-400"
                                    }`}
                                >
                                    Nombre completo *
                                </label>
                                <input
                                    type="text"
                                    className="w-full bg-transparent border-b border-slate-200 pb-3 pt-1 text-slate-900 text-[1.05rem] focus:outline-none focus:border-[#2F64FF] transition-colors"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    onFocus={() => setNombreFocused(true)}
                                    onBlur={() => setNombreFocused(false)}
                                    required
                                />
                            </div>

                            <div className="relative pt-4">
                                <label
                                    className={`absolute left-0 font-semibold tracking-widest uppercase transition-all duration-200 pointer-events-none ${
                                        emailFocused || email
                                            ? "top-0 text-[0.65rem] text-[#2F64FF]"
                                            : "top-4 text-[1.05rem] text-slate-400"
                                    }`}
                                >
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    className="w-full bg-transparent border-b border-slate-200 pb-3 pt-1 text-slate-900 text-[1.05rem] focus:outline-none focus:border-[#2F64FF] transition-colors"
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
                                    className="group inline-flex items-center gap-2 rounded-full bg-[#2F64FF] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(47,100,255,0.3)] transition-all hover:bg-[#2553e6] hover:shadow-[0_12px_32px_rgba(47,100,255,0.4)] hover:-translate-y-0.5"
                                >
                                    Quiero mi diagnóstico estratégico
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                                </button>
                                <p className="mt-3 text-sm text-slate-400">Respuesta en menos de 12 horas. Sin compromiso.</p>
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
