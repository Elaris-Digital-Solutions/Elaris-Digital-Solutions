import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronDown,
    LayoutDashboard, Quote
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import FloatingWhatsappButton from "@/components/ui/floating-whatsapp-button";
import SeoHead from "@/components/SeoHead";
import CustomSoftwareHero from "@/components/ui/custom-software-hero";
import CustomSoftwareAIBlock from "@/components/ui/custom-software-ai-block";

import esData from "@/locales/es.json";
const copy = esData.customSoftware;

export default function CustomSoftware() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <div
            id="custom-software-page"
            className="relative min-h-screen overflow-x-hidden overflow-y-auto bg-[#F8FAFC]"
        >
            <SeoHead
                title={copy.seo.title}
                description={copy.seo.description}
            />
            <Navbar />

            <main className="site-sections">
                {/* 1. HERO SECTION — 2-column layout with dashboard mockup */}
                <CustomSoftwareHero />

                {/* 4.5 BLOQUE IA — IA integrada en todos los desarrollos */}
                <CustomSoftwareAIBlock />

                {/* 4.7 MÉTRICAS DE IMPACTO — Software que genera resultados medibles */}
                <section className="py-24 lg:py-28 bg-white relative overflow-hidden">

                    <div className="container mx-auto px-6 max-w-7xl relative z-10">

                        {/* ── ENCABEZADO ── */}
                        <div className="text-center mb-16 max-w-3xl mx-auto">
                            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-[#071540] mb-5">
                                Software que genera{" "}
                                <span className="font-semibold text-[#2F64FF]">resultados medibles</span>
                            </h2>
                            <p className="text-slate-500 text-lg font-light leading-relaxed">
                                Cada proyecto se traduce en operaciones más ágiles, equipos más eficientes y decisiones respaldadas en datos reales.
                            </p>
                        </div>

                        {/* ── BLOQUE PRINCIPAL 2 COLUMNAS ── */}
                        <div className="grid lg:grid-cols-2 gap-6 mb-6">

                            {/* Columna izquierda — contexto estratégico */}
                            <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-10 flex flex-col justify-between hover:border-[#2F64FF]/30 hover:shadow-md transition-all duration-300">
                                <div>
                                    <div className="w-12 h-12 rounded-xl bg-[#2F64FF]/10 border border-[#2F64FF]/20 flex items-center justify-center mb-8">
                                        <LayoutDashboard className="w-6 h-6 text-[#2F64FF]" />
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-medium text-[#071540] mb-5 leading-snug">
                                        Optimice su operación desde el primer sprint
                                    </h3>
                                    <p className="text-slate-600 font-light leading-relaxed text-base">
                                        Desarrollamos sistemas que se adaptan a la lógica real de su empresa. Cada decisión arquitectónica está respaldada en datos para priorizar el impacto operativo, asignar recursos con precisión y eliminar fricción desde las primeras semanas de implementación.
                                    </p>
                                </div>
                                <div className="mt-10 pt-8 border-t border-slate-200">
                                    <p className="text-slate-400 text-sm font-light">
                                        Resultados promedio documentados en proyectos de ingeniería empresarial a medida.
                                    </p>
                                </div>
                            </div>

                            {/* Columna derecha — métrica principal */}
                            <div className="bg-[#F0F4FF] border border-[#2F64FF]/15 rounded-2xl p-10 flex flex-col justify-between hover:border-[#2F64FF]/35 hover:shadow-md transition-all duration-300">
                                <div>
                                    <p className="text-slate-500 text-sm font-light uppercase tracking-widest mb-6">Impacto operativo</p>
                                    <div className="flex items-start justify-center gap-1 leading-none mb-6">
                                        <span className="text-[#2F64FF] font-bold text-[7rem] md:text-[9rem] leading-none tracking-tighter">53</span>
                                        <span className="text-[#2F64FF] font-bold text-4xl md:text-5xl mt-5">%</span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[#071540] text-xl font-medium leading-snug mb-2">
                                        Mejora promedio en la finalización de procesos operativos clave
                                    </p>
                                    <p className="text-slate-500 text-sm font-light leading-relaxed mt-3">
                                        Medido en flujos críticos migrados desde sistemas manuales o soluciones genéricas hacia plataformas a medida.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* ── CARDS DE MÉTRICAS INFERIORES ── */}
                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                {
                                    value: "+35%",
                                    label: "en eficiencia operativa",
                                    desc: "Procesos internos más rápidos, predecibles y libres de cuellos de botella desde el primer mes."
                                },
                                {
                                    value: "−50%",
                                    label: "en tareas manuales repetitivas",
                                    desc: "Automatización de flujos críticos que antes consumían horas del equipo cada día."
                                },
                                {
                                    value: "+30%",
                                    label: "en velocidad de ejecución",
                                    desc: "Decisiones más rápidas y certeras respaldadas por información en tiempo real."
                                }
                            ].map((metric, idx) => (
                                <div
                                    key={idx}
                                    className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-8 hover:border-[#2F64FF]/30 hover:shadow-md transition-all duration-300 cursor-default"
                                >
                                    <div className="text-[#2F64FF] font-bold text-4xl md:text-5xl mb-3 leading-none">
                                        {metric.value}
                                    </div>
                                    <p className="text-[#071540] font-medium text-base mb-2">{metric.label}</p>
                                    <p className="text-slate-500 text-sm font-light leading-relaxed">{metric.desc}</p>
                                </div>
                            ))}
                        </div>

                    </div>
                </section>

                {/* 4.8 VENTAJAS OPERATIVAS — 2 bloques alternados */}
                <section className="py-24 lg:py-28 bg-[#F8FAFC]">
                    <div className="container mx-auto px-6 max-w-7xl space-y-20 lg:space-y-28">

                        {/* ── BLOQUE 1: Control y Gestión Operativa — Texto izq / Mockup der ── */}
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                            {/* Columna de texto */}
                            <div className="flex flex-col justify-center">
                                <span className="inline-flex items-center gap-2 text-[#2F64FF] text-sm font-medium uppercase tracking-widest mb-6">
                                    <span className="w-5 h-px bg-[#2F64FF]" />
                                    Control operativo
                                </span>
                                <h3 className="text-3xl md:text-4xl lg:text-[2.65rem] font-light tracking-tight text-[#071540] leading-tight mb-6">
                                    Centralice, automatice y{" "}
                                    <span className="font-semibold">gestione sin límites</span>
                                </h3>
                                <p className="text-slate-600 font-light text-lg leading-relaxed mb-8">
                                    Un software diseñado a medida elimina la fricción entre áreas. Automatiza tareas críticas, personaliza flujos según su lógica de negocio y conecta equipos, datos y sistemas en una sola plataforma — reduciendo errores humanos y ganando visibilidad total de la operación.
                                </p>
                                <ul className="space-y-3">
                                    {[
                                        "Procesos centralizados en un solo entorno",
                                        "Automatización de flujos operativos críticos",
                                        "Integración entre áreas, datos y sistemas",
                                        "Visibilidad en tiempo real de indicadores clave",
                                        "Reducción drástica de errores manuales"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-slate-700 text-base font-light">
                                            <span className="w-5 h-5 rounded-full bg-[#2F64FF]/10 border border-[#2F64FF]/25 flex items-center justify-center flex-shrink-0">
                                                <span className="w-2 h-2 rounded-full bg-[#2F64FF]" />
                                            </span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Columna visual — Dashboard mockup */}
                            <div className="relative">
                                <div className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(7,21,64,0.08)] border border-slate-100 overflow-hidden">
                                    {/* Header bar */}
                                    <div className="bg-[#071540] px-5 py-3.5 flex items-center gap-3">
                                        <div className="flex gap-1.5">
                                            <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                                            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                                            <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                                        </div>
                                        <span className="text-white/40 text-xs font-light ml-2">Panel de Operaciones · ELARIS Platform</span>
                                    </div>

                                    <div className="p-5 bg-[#F0F4FF]/60">
                                        {/* KPI row */}
                                        <div className="grid grid-cols-3 gap-3 mb-4">
                                            {[
                                                { label: "Tareas activas", value: "48", color: "text-[#2F64FF]" },
                                                { label: "Completadas hoy", value: "31", color: "text-emerald-600" },
                                                { label: "Eficiencia", value: "94%", color: "text-[#071540]" }
                                            ].map((kpi, i) => (
                                                <div key={i} className="bg-white rounded-xl p-3 shadow-sm border border-slate-100 text-center">
                                                    <p className={`text-xl font-bold ${kpi.color}`}>{kpi.value}</p>
                                                    <p className="text-slate-400 text-[10px] font-light mt-0.5">{kpi.label}</p>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Mini chart */}
                                        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 mb-4">
                                            <div className="flex justify-between items-center mb-3">
                                                <p className="text-slate-700 text-xs font-medium">Rendimiento semanal</p>
                                                <span className="text-emerald-500 text-xs font-semibold">↑ +12%</span>
                                            </div>
                                            <div className="flex items-end gap-1.5 h-14">
                                                {[40, 65, 50, 80, 72, 90, 85].map((h, i) => (
                                                    <div key={i} className="flex-1 rounded-t-md" style={{ height: `${h}%`, backgroundColor: i === 5 ? '#2F64FF' : '#E0E7FF' }} />
                                                ))}
                                            </div>
                                            <div className="flex justify-between mt-1.5">
                                                {["L","M","X","J","V","S","D"].map((d, i) => (
                                                    <span key={i} className="flex-1 text-center text-[9px] text-slate-400">{d}</span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Task list */}
                                        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 space-y-2.5">
                                            <p className="text-slate-700 text-xs font-medium mb-3">Flujos en ejecución</p>
                                            {[
                                                { name: "Validación de pedidos B2B", status: "En curso", dot: "bg-blue-400" },
                                                { name: "Sincronización ERP → CRM", status: "Completado", dot: "bg-emerald-400" },
                                                { name: "Generación de reportes", status: "Pendiente", dot: "bg-amber-400" }
                                            ].map((task, i) => (
                                                <div key={i} className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <span className={`w-1.5 h-1.5 rounded-full ${task.dot} flex-shrink-0`} />
                                                        <span className="text-slate-600 text-xs font-light">{task.name}</span>
                                                    </div>
                                                    <span className="text-slate-400 text-[10px]">{task.status}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Floating badge */}
                                <div className="absolute -bottom-4 -left-4 bg-[#2F64FF] text-white rounded-2xl px-4 py-3 shadow-lg text-sm font-medium hidden md:flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                                    Automatización activa
                                </div>
                            </div>
                        </div>

                        {/* ── BLOQUE 2: Colaboración y Escalabilidad — Mockup izq / Texto der ── */}
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                            {/* Columna visual — Collaboration mockup (orden invertido en desktop) */}
                            <div className="relative order-2 lg:order-1">
                                <div className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(7,21,64,0.08)] border border-slate-100 overflow-hidden">
                                    {/* Header */}
                                    <div className="bg-[#071540] px-5 py-3.5 flex items-center gap-3">
                                        <div className="flex gap-1.5">
                                            <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                                            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                                            <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                                        </div>
                                        <span className="text-white/40 text-xs font-light ml-2">Centro de Colaboración · ELARIS Platform</span>
                                    </div>

                                    <div className="p-5 bg-[#F8FAFC]">
                                        {/* Activity bar */}
                                        <div className="flex items-center justify-between mb-4">
                                            <p className="text-slate-700 text-xs font-medium">Actividad del equipo</p>
                                            <div className="flex -space-x-2">
                                                {["#2F64FF","#00E5A0","#F59E0B","#6366F1"].map((c, i) => (
                                                    <div key={i} className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center" style={{ backgroundColor: c }}>
                                                        <span className="text-white text-[8px] font-bold">{String.fromCharCode(65+i)}</span>
                                                    </div>
                                                ))}
                                                <div className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center">
                                                    <span className="text-slate-500 text-[8px] font-bold">+8</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Chat messages */}
                                        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 space-y-3 mb-4">
                                            <div className="flex items-start gap-2.5">
                                                <div className="w-6 h-6 rounded-full bg-[#2F64FF] flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    <span className="text-white text-[9px] font-bold">M</span>
                                                </div>
                                                <div className="bg-[#F0F4FF] rounded-xl rounded-tl-sm px-3 py-2 max-w-[75%]">
                                                    <p className="text-slate-700 text-xs font-light">Módulo de facturación integrado con ERP. Revisá el reporte adjunto.</p>
                                                    <p className="text-slate-400 text-[9px] mt-1">10:24 · Leído</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-2.5 justify-end">
                                                <div className="bg-[#2F64FF] rounded-xl rounded-tr-sm px-3 py-2 max-w-[75%]">
                                                    <p className="text-white text-xs font-light">Confirmado. Sincronización ejecutada sin errores.</p>
                                                    <p className="text-white/60 text-[9px] mt-1">10:27 · ✓✓</p>
                                                </div>
                                                <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    <span className="text-white text-[9px] font-bold">A</span>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-2.5">
                                                <div className="w-6 h-6 rounded-full bg-violet-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    <span className="text-white text-[9px] font-bold">L</span>
                                                </div>
                                                <div className="bg-[#F0F4FF] rounded-xl rounded-tl-sm px-3 py-2 max-w-[75%]">
                                                    <p className="text-slate-700 text-xs font-light">IA detectó un patrón inusual en las órdenes del turno noche.</p>
                                                    <p className="text-slate-400 text-[9px] mt-1">10:31 · Reciente</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* File + notifications row */}
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="bg-white rounded-xl p-3.5 shadow-sm border border-slate-100">
                                                <p className="text-slate-500 text-[10px] uppercase tracking-wide mb-2.5">Archivos compartidos</p>
                                                {[
                                                    { name: "Reporte_Q1.pdf", color: "bg-red-100 text-red-500" },
                                                    { name: "Integración_ERP.xlsx", color: "bg-emerald-100 text-emerald-600" }
                                                ].map((f, i) => (
                                                    <div key={i} className="flex items-center gap-2 mb-1.5">
                                                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${f.color}`}>
                                                            {f.name.split(".")[1].toUpperCase()}
                                                        </span>
                                                        <span className="text-slate-500 text-[10px] truncate">{f.name.split(".")[0]}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="bg-white rounded-xl p-3.5 shadow-sm border border-slate-100">
                                                <p className="text-slate-500 text-[10px] uppercase tracking-wide mb-2.5">Notificaciones</p>
                                                {[
                                                    { text: "Sprint completado al 100%", dot: "bg-emerald-400" },
                                                    { text: "Nuevo módulo en staging", dot: "bg-blue-400" },
                                                    { text: "Deploy programado: 18:00", dot: "bg-amber-400" }
                                                ].map((n, i) => (
                                                    <div key={i} className="flex items-center gap-1.5 mb-1.5">
                                                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${n.dot}`} />
                                                        <span className="text-slate-600 text-[10px] leading-tight">{n.text}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating badge */}
                                <div className="absolute -bottom-4 -right-4 bg-[#00E5A0] text-[#071540] rounded-2xl px-4 py-3 shadow-lg text-sm font-semibold hidden md:flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-[#071540] animate-pulse" />
                                    Equipo sincronizado
                                </div>
                            </div>

                            {/* Columna de texto */}
                            <div className="flex flex-col justify-center order-1 lg:order-2">
                                <span className="inline-flex items-center gap-2 text-[#2F64FF] text-sm font-medium uppercase tracking-widest mb-6">
                                    <span className="w-5 h-px bg-[#2F64FF]" />
                                    Escalabilidad y colaboración
                                </span>
                                <h3 className="text-3xl md:text-4xl lg:text-[2.65rem] font-light tracking-tight text-[#071540] leading-tight mb-6">
                                    Escale su operación{" "}
                                    <span className="font-semibold">sin perder el control</span>
                                </h3>
                                <p className="text-slate-600 font-light text-lg leading-relaxed mb-8">
                                    A medida que su empresa crece, su software debe crecer con ella. Diseñamos plataformas que facilitan la comunicación fluida entre equipos, la integración con sistemas externos y el acceso desde cualquier dispositivo — con inteligencia incorporada para optimizar decisiones en tiempo real.
                                </p>
                                <ul className="space-y-3">
                                    {[
                                        "Colaboración en tiempo real entre departamentos",
                                        "Integraciones nativas con sistemas existentes",
                                        "Acceso multiplataforma: web, móvil y escritorio",
                                        "Arquitectura preparada para escalar sin rediseño",
                                        "Alertas inteligentes y toma de decisiones asistida"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-slate-700 text-base font-light">
                                            <span className="w-5 h-5 rounded-full bg-[#2F64FF]/10 border border-[#2F64FF]/25 flex items-center justify-center flex-shrink-0">
                                                <span className="w-2 h-2 rounded-full bg-[#2F64FF]" />
                                            </span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                    </div>
                </section>

                {/* 7.5 SOCIAL PROOF */}
                <section className="py-24 lg:py-28 bg-white border-b border-t border-slate-100 overflow-hidden relative">
                    <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
                        <Quote className="mx-auto w-12 h-12 text-[#2F64FF] mb-8 opacity-40" />
                        <p className="text-xl md:text-2xl lg:text-3xl font-light italic leading-relaxed mb-8 text-[#071540]">
                            "Migrar de múltiples sistemas genéricos a una plataforma centralizada y desarrollada a medida por ELARIS fue la mejor decisión técnica para escalar. Ahora la tecnología se adapta a nuestras reglas de negocio, y no al revés."
                        </p>
                        <div>
                            <p className="font-semibold text-lg text-[#071540]">Directora / Founder</p>
                            <p className="text-[#2F64FF] font-medium tracking-wide mt-1">Salcedo Jewels</p>
                        </div>
                    </div>
                </section>

                {/* 9. FAQ SEO */}
                <section className="py-24 lg:py-28 bg-white">
                    <div className="container mx-auto px-6 max-w-3xl">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-[#071540] mb-6">
                                {copy.faq.titleNormal}
                                <span className="font-semibold text-[#2F64FF]">
                                    {copy.faq.titleAccent}
                                </span>
                            </h2>
                        </div>

                        <div className="space-y-4">
                            {copy.faq.items.map((item, idx) => (
                                <FaqItem key={idx} faq={item} />
                            ))}
                        </div>
                    </div>
                </section>
                <Contact />

            </main>

            <Footer />
            <FloatingWhatsappButton />

            {/* CRO: STICKY MOBILE CTA */}
            <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] z-[60]">
                <a href="#contacto" className="flex items-center justify-center w-full bg-[#2F64FF] text-white text-base py-3.5 rounded-full font-semibold shadow-[0_8px_24px_rgba(47,100,255,0.4)] active:scale-95 transition-transform backdrop-blur-md">
                    Agendar Consultoría
                </a>
            </div>
        </div>
    );
}

const FaqItem = ({ faq }: { faq: { q: string, a: string } }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="border border-slate-200 bg-white rounded-2xl overflow-hidden transition-all duration-300">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex justify-between items-center p-6 text-left hover:bg-slate-50 transition-colors"
            >
                <span className="text-lg font-medium text-[#071540] pr-8">{faq.q}</span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center transition-transform duration-300 ${open ? 'rotate-180 bg-[#2F64FF] border-[#2F64FF] text-white' : 'text-slate-400'}`}>
                    <ChevronDown className="w-5 h-5" />
                </div>
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                    >
                        <div className="px-6 pb-6 text-slate-600 font-light leading-relaxed border-t border-slate-100 pt-4 mt-2 mx-6">
                            {faq.a}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
