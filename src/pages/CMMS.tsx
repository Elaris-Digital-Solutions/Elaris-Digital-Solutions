import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Wrench, Quote, Package, Wifi } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import FloatingWhatsappButton from "@/components/ui/floating-whatsapp-button";
import SeoHead from "@/components/SeoHead";
import CMMSHero from "@/components/ui/cmms-hero";
import CMMSFeaturesBlock from "@/components/ui/cmms-features-block";

import esData from "@/locales/es.json";
const copy = esData.cmms;

export default function CMMS() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <div
            id="cmms-page"
            className="relative min-h-screen overflow-x-hidden overflow-y-auto bg-[#F8FAFC]"
        >
            <SeoHead
                title={copy.seo.title}
                description={copy.seo.description}
            />
            <Navbar />

            <main className="site-sections">
                {/* 1. HERO */}
                <CMMSHero />

                {/* 2. FEATURES BLOCK — Capacidades del CMMS */}
                <CMMSFeaturesBlock />

                {/* 3. MÉTRICAS DE IMPACTO */}
                <section className="py-24 lg:py-28 bg-white relative overflow-hidden">
                    <div className="container mx-auto px-6 max-w-7xl relative z-10">

                        <motion.div
                            className="text-center mb-16 max-w-3xl mx-auto"
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-[#071540] mb-5">
                                Un CMMS que genera{" "}
                                <span className="font-semibold text-[#2F64FF]">resultados medibles</span>
                            </h2>
                            <p className="text-slate-500 text-lg font-light leading-relaxed">
                                Menos paradas no planificadas, menor costo de mantenimiento y equipos que duran más — todo respaldado en datos reales de la operación.
                            </p>
                        </motion.div>

                        <motion.div
                            className="grid lg:grid-cols-2 gap-6 mb-6"
                            initial={{ opacity: 0, y: 32 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.15 }}
                            transition={{ duration: 0.65, ease: "easeOut" }}
                        >
                            {/* Left — context */}
                            <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-10 flex flex-col justify-between hover:border-[#2F64FF]/30 hover:shadow-md transition-all duration-300">
                                <div>
                                    <div className="w-12 h-12 rounded-xl bg-[#2F64FF]/10 border border-[#2F64FF]/20 flex items-center justify-center mb-8">
                                        <Wrench className="w-6 h-6 text-[#2F64FF]" />
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-medium text-[#071540] mb-5 leading-snug">
                                        Pase del mantenimiento reactivo al mantenimiento inteligente
                                    </h3>
                                    <p className="text-slate-600 font-light leading-relaxed text-base">
                                        La mayoría de las plantas industriales pierden entre el 15% y el 30% de su capacidad productiva por fallos imprevistos y mantenimientos mal programados. Un CMMS implementado correctamente convierte el mantenimiento en una ventaja competitiva, no en un costo incontrolable.
                                    </p>
                                </div>
                                <div className="mt-10 pt-8 border-t border-slate-200">
                                    <p className="text-slate-400 text-sm font-light">
                                        Resultados promedio documentados en implementaciones de CMMS en industria manufacturera y minería.
                                    </p>
                                </div>
                            </div>

                            {/* Right — big number */}
                            <div className="bg-[#F0F4FF] border border-[#2F64FF]/15 rounded-2xl p-10 flex flex-col justify-between hover:border-[#2F64FF]/35 hover:shadow-md transition-all duration-300">
                                <div>
                                    <p className="text-slate-500 text-sm font-light uppercase tracking-widest mb-6">Impacto operativo</p>
                                    <div className="flex items-start justify-center gap-1 leading-none mb-6">
                                        <span className="text-[#2F64FF] font-bold text-[7rem] md:text-[9rem] leading-none tracking-tighter">65</span>
                                        <span className="text-[#2F64FF] font-bold text-4xl md:text-5xl mt-5">%</span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[#071540] text-xl font-medium leading-snug mb-2">
                                        Reducción en tiempos de parada no planificada en planta
                                    </p>
                                    <p className="text-slate-500 text-sm font-light leading-relaxed mt-3">
                                        Medido en operaciones que migraron de gestión manual o Excel a un CMMS integrado con sensores IoT.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Bottom metric cards */}
                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                {
                                    value: "−40%",
                                    label: "en costos de mantenimiento correctivo",
                                    desc: "El mantenimiento preventivo programado elimina las reparaciones de emergencia, que cuestan entre 3 y 10 veces más.",
                                },
                                {
                                    value: "+92%",
                                    label: "cumplimiento del plan de mantenimiento preventivo",
                                    desc: "Las alertas automáticas y la programación asistida aseguran que ninguna tarea crítica quede sin ejecutar.",
                                },
                                {
                                    value: "+28%",
                                    label: "en vida útil promedio de los activos",
                                    desc: "El mantenimiento oportuno y el historial completo de intervenciones extienden la vida operativa de la maquinaria.",
                                },
                            ].map((metric, idx) => (
                                <motion.div
                                    key={idx}
                                    className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-8 hover:border-[#2F64FF]/30 hover:shadow-md transition-all duration-300 cursor-default"
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.1 }}
                                >
                                    <div className="text-[#2F64FF] font-bold text-4xl md:text-5xl mb-3 leading-none">
                                        {metric.value}
                                    </div>
                                    <p className="text-[#071540] font-medium text-base mb-2">{metric.label}</p>
                                    <p className="text-slate-500 text-sm font-light leading-relaxed">{metric.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 4. BLOQUES OPERATIVOS */}
                <section className="py-24 lg:py-28 bg-[#F8FAFC]">
                    <div className="container mx-auto px-6 max-w-7xl space-y-20 lg:space-y-28">

                        {/* BLOQUE 1: OT y mantenimiento preventivo — texto izq / mockup der */}
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                            <motion.div
                                className="flex flex-col justify-center"
                                initial={{ opacity: 0, x: -32 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.7, ease: "easeOut" }}
                            >
                                <span className="inline-flex items-center gap-2 text-[#2F64FF] text-sm font-medium uppercase tracking-widest mb-6">
                                    <span className="w-5 h-px bg-[#2F64FF]" />
                                    Órdenes de trabajo y MP
                                </span>
                                <h3 className="text-3xl md:text-4xl lg:text-[2.65rem] font-light tracking-tight text-[#071540] leading-tight mb-6">
                                    Digitalice cada intervención{" "}
                                    <span className="font-semibold">desde la solicitud hasta el cierre</span>
                                </h3>
                                <p className="text-slate-600 font-light text-lg leading-relaxed mb-8">
                                    Adiós a los formularios en papel y los reportes en Excel. Cada orden de trabajo se crea, asigna, ejecuta y cierra digitalmente — con firma electrónica, evidencia fotográfica y registro de tiempo real por técnico y activo.
                                </p>
                                <ul className="space-y-3">
                                    {[
                                        "Creación de OT desde web, tablet o dispositivo móvil",
                                        "Asignación automática por especialidad y disponibilidad",
                                        "Programación de MP por tiempo, horas de operación o ciclos",
                                        "Notificaciones push al técnico asignado",
                                        "Historial completo de intervenciones por activo",
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-slate-700 text-base font-light">
                                            <span className="w-5 h-5 rounded-full bg-[#2F64FF]/10 border border-[#2F64FF]/25 flex items-center justify-center flex-shrink-0">
                                                <span className="w-2 h-2 rounded-full bg-[#2F64FF]" />
                                            </span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>

                            {/* Work orders mockup */}
                            <motion.div
                                className="relative"
                                initial={{ opacity: 0, x: 32 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
                            >
                                <div className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(7,21,64,0.08)] border border-slate-100 overflow-hidden">
                                    <div className="bg-[#071540] px-5 py-3.5 flex items-center gap-3">
                                        <div className="flex gap-1.5">
                                            <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                                            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                                            <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                                        </div>
                                        <span className="text-white/40 text-xs font-light ml-2">Gestión de OT · ELARIS CMMS</span>
                                    </div>
                                    <div className="p-5 bg-[#F0F4FF]/40">
                                        {/* Status pills */}
                                        <div className="flex items-center justify-between mb-5 gap-1">
                                            {[
                                                { label: "Pendientes", color: "bg-amber-50 border-amber-200 text-amber-700", value: "12" },
                                                { label: "En curso",   color: "bg-blue-50 border-blue-200 text-blue-700",   value: "8"  },
                                                { label: "Cerradas",  color: "bg-emerald-50 border-emerald-200 text-emerald-700", value: "34" },
                                            ].map((s, i) => (
                                                <div key={s.label} className={`flex-1 px-3 py-2 rounded-lg border text-center ${s.color}`}>
                                                    <p className="text-base font-bold leading-none mb-0.5">{s.value}</p>
                                                    <p className="text-[10px]">{s.label}</p>
                                                </div>
                                            ))}
                                        </div>

                                        {/* OT list */}
                                        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 space-y-2.5 mb-4">
                                            <p className="text-slate-500 text-[10px] uppercase tracking-wider mb-3">Órdenes activas</p>
                                            {[
                                                { code: "OT-2041", name: "Lubricación Compresor A3", tech: "J. Torres",    status: "En curso",  dot: "bg-blue-400" },
                                                { code: "OT-2042", name: "Cambio filtro Bomba H7",   tech: "M. Quispe",    status: "Pendiente", dot: "bg-amber-400" },
                                                { code: "OT-2040", name: "Revisión cintas T2",       tech: "R. Condori",   status: "Cerrada",   dot: "bg-emerald-400" },
                                            ].map((row) => (
                                                <div key={row.code} className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${row.dot}`} />
                                                        <div>
                                                            <span className="text-[#071540] text-[10px] font-semibold">{row.code}</span>
                                                            <span className="text-slate-500 text-[10px] ml-1.5">{row.name}</span>
                                                        </div>
                                                    </div>
                                                    <span className="text-slate-400 text-[10px] ml-2">{row.tech}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Calendar mini */}
                                        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                                            <p className="text-slate-500 text-[10px] uppercase tracking-wider mb-3">Próximos mantenimientos preventivos</p>
                                            <div className="space-y-2">
                                                {[
                                                    { asset: "Motor M5 — Rev. semestral", date: "15 mar", icon: "🔵" },
                                                    { asset: "Generador G1 — Cambio aceite", date: "18 mar", icon: "🟡" },
                                                    { asset: "Transportador T3 — Alineac.", date: "22 mar", icon: "🟢" },
                                                ].map((ev) => (
                                                    <div key={ev.asset} className="flex items-center justify-between">
                                                        <span className="text-slate-600 text-[10px]">{ev.icon} {ev.asset}</span>
                                                        <span className="text-[#2F64FF] text-[10px] font-semibold">{ev.date}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute -bottom-4 -left-4 bg-[#2F64FF] text-white rounded-2xl px-4 py-3 shadow-lg text-sm font-medium hidden md:flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                                    54 OTs este mes
                                </div>
                            </motion.div>
                        </div>

                        {/* BLOQUE 2: IoT e inventario de repuestos — mockup izq / texto der */}
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                            {/* IoT + inventory mockup */}
                            <motion.div
                                className="relative order-2 lg:order-1"
                                initial={{ opacity: 0, x: -32 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.7, ease: "easeOut" }}
                            >
                                <div className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(7,21,64,0.08)] border border-slate-100 overflow-hidden">
                                    <div className="bg-[#071540] px-5 py-3.5 flex items-center gap-3">
                                        <div className="flex gap-1.5">
                                            <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                                            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                                            <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                                        </div>
                                        <span className="text-white/40 text-xs font-light ml-2">Inventario y Sensores IoT · ELARIS CMMS</span>
                                    </div>
                                    <div className="p-5 bg-[#F8FAFC]">
                                        {/* Connected sensors */}
                                        <div className="flex items-center justify-between mb-4">
                                            <p className="text-slate-700 text-xs font-medium">Sensores conectados</p>
                                            <div className="flex items-center gap-1 text-[9px] text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-full px-2 py-0.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                                12 activos
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-4 gap-2 mb-4">
                                            {[
                                                { name: "Temp.",  bg: "bg-red-500",    text: "T°" },
                                                { name: "Vibrac.", bg: "bg-[#2F64FF]", text: "⚡" },
                                                { name: "Presión", bg: "bg-emerald-600", text: "P" },
                                                { name: "Corriente", bg: "bg-amber-500", text: "I" },
                                            ].map((s) => (
                                                <div key={s.name} className="flex flex-col items-center gap-1.5">
                                                    <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center`}>
                                                        <span className="text-white text-xs font-bold">{s.text}</span>
                                                    </div>
                                                    <span className="text-slate-500 text-[9px]">{s.name}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Activity log */}
                                        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 mb-3 space-y-2.5">
                                            <p className="text-slate-500 text-[10px] uppercase tracking-wider">Alertas recientes</p>
                                            {[
                                                { txt: "T° Bomba H7: 78°C — OT generada automáticamente",  dot: "bg-red-400" },
                                                { txt: "Vibración Motor M5: dentro de rango normal",         dot: "bg-emerald-400" },
                                                { txt: "Stock bajo: Filtro 3M — Reposición solicitada",      dot: "bg-amber-400" },
                                            ].map((row, i) => (
                                                <div key={i} className="flex items-center gap-2">
                                                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${row.dot}`} />
                                                    <span className="text-slate-600 text-[10px] leading-tight">{row.txt}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Inventory */}
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="bg-white rounded-xl p-3.5 shadow-sm border border-slate-100">
                                                <p className="text-slate-500 text-[10px] uppercase tracking-wide mb-2.5">
                                                    <Package className="inline w-2.5 h-2.5 mr-1" />
                                                    Inventario crítico
                                                </p>
                                                {["Filtro 3M (stock: 2)", "Rodamiento 6205 (5)"].map((item, i) => (
                                                    <div key={i} className="flex items-center gap-1.5 mb-1.5">
                                                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${i === 0 ? "bg-amber-400" : "bg-emerald-400"}`} />
                                                        <span className="text-slate-500 text-[9px] truncate">{item}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="bg-white rounded-xl p-3.5 shadow-sm border border-slate-100">
                                                <p className="text-slate-500 text-[10px] uppercase tracking-wide mb-2.5">
                                                    <Wifi className="inline w-2.5 h-2.5 mr-1" />
                                                    Estado sistema
                                                </p>
                                                {[
                                                    { txt: "API ERP: sincronizada",           dot: "bg-emerald-400" },
                                                    { txt: "SCADA: 12 señales activas",        dot: "bg-emerald-400" },
                                                    { txt: "App móvil: 4 técnicos en línea",  dot: "bg-blue-400" },
                                                ].map((n, i) => (
                                                    <div key={i} className="flex items-center gap-1.5 mb-1.5">
                                                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${n.dot}`} />
                                                        <span className="text-slate-600 text-[10px] leading-tight">{n.txt}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute -bottom-4 -right-4 bg-emerald-500 text-white rounded-2xl px-4 py-3 shadow-lg text-sm font-semibold hidden md:flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                                    IoT conectado
                                </div>
                            </motion.div>

                            {/* Text */}
                            <motion.div
                                className="flex flex-col justify-center order-1 lg:order-2"
                                initial={{ opacity: 0, x: 32 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
                            >
                                <span className="inline-flex items-center gap-2 text-[#2F64FF] text-sm font-medium uppercase tracking-widest mb-6">
                                    <span className="w-5 h-px bg-[#2F64FF]" />
                                    IoT e inventario integrados
                                </span>
                                <h3 className="text-3xl md:text-4xl lg:text-[2.65rem] font-light tracking-tight text-[#071540] leading-tight mb-6">
                                    Anticipe fallos con{" "}
                                    <span className="font-semibold">sensores e IA predictiva</span>
                                </h3>
                                <p className="text-slate-600 font-light text-lg leading-relaxed mb-8">
                                    Conectamos el CMMS a sensores de temperatura, vibración, presión y corriente para detectar anomalías antes de que ocurra la falla. El sistema genera órdenes de trabajo automáticas cuando un activo supera sus umbrales operativos normales.
                                </p>
                                <ul className="space-y-3">
                                    {[
                                        "Integración con sensores IoT y sistemas SCADA",
                                        "Generación automática de OT ante alertas predictivas",
                                        "Control de inventario de repuestos con alertas de stock mínimo",
                                        "Integración nativa con ERP para compras y contabilidad",
                                        "App móvil offline para técnicos sin conexión en planta",
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-slate-700 text-base font-light">
                                            <span className="w-5 h-5 rounded-full bg-[#2F64FF]/10 border border-[#2F64FF]/25 flex items-center justify-center flex-shrink-0">
                                                <span className="w-2 h-2 rounded-full bg-[#2F64FF]" />
                                            </span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* 5. SOCIAL PROOF */}
                <section className="py-24 lg:py-28 bg-white border-b border-t border-slate-100 overflow-hidden relative">
                    <motion.div
                        className="container mx-auto px-6 max-w-4xl text-center relative z-10"
                        initial={{ opacity: 0, y: 32 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                    >
                        <Quote className="mx-auto w-12 h-12 text-[#2F64FF] mb-8 opacity-40" />
                        <p className="text-xl md:text-2xl lg:text-3xl font-light italic leading-relaxed mb-8 text-[#071540]">
                            "Pasamos de gestionar el mantenimiento en hojas de cálculo a tener visibilidad total de cada activo en tiempo real. Las paradas no planificadas bajaron drásticamente en los primeros tres meses y el equipo de técnicos trabaja con mucha más organización."
                        </p>
                        <div>
                            <p className="font-semibold text-lg text-[#071540]">Gerente de Mantenimiento</p>
                            <p className="text-[#2F64FF] font-medium tracking-wide mt-1">Empresa del sector manufactura</p>
                        </div>
                    </motion.div>
                </section>

                {/* 6. FAQ */}
                <section className="py-24 lg:py-32 bg-white">
                    <div className="container mx-auto px-6 max-w-6xl">
                        <motion.div
                            className="text-center mb-16"
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                            <span className="inline-block text-xs font-bold tracking-[0.18em] uppercase text-[#2F64FF] mb-4">
                                Preguntas Frecuentes
                            </span>
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#071540] mb-5 leading-tight">
                                {copy.faq.titleNormal}
                                <span className="text-[#2F64FF]">{copy.faq.titleAccent}</span>
                            </h2>
                            <p className="text-slate-500 text-lg font-light max-w-xl mx-auto leading-relaxed">
                                Todo lo que necesitas saber sobre implementar un CMMS en tu operación industrial.
                            </p>
                            <a
                                href="#contacto"
                                className="inline-flex items-center gap-2 mt-8 px-7 py-3 rounded-full border border-[#2F64FF]/30 text-[#2F64FF] font-semibold text-sm hover:bg-[#2F64FF] hover:text-white transition-all duration-200"
                            >
                                Hablar con un experto →
                            </a>
                        </motion.div>

                        <div className="grid md:grid-cols-2 gap-x-12 lg:gap-x-20">
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
        </div>
    );
}

const FaqItem = ({ faq }: { faq: { q: string; a: string } }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="border-b border-slate-200 py-6">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex justify-between items-center gap-6 text-left group"
            >
                <span className={`text-base font-semibold leading-snug transition-colors duration-200 ${open ? "text-[#2F64FF]" : "text-[#071540] group-hover:text-[#2F64FF]"}`}>
                    {faq.q}
                </span>
                <ChevronDown
                    className={`flex-shrink-0 w-5 h-5 transition-all duration-300 ${open ? "rotate-180 text-[#2F64FF]" : "text-slate-400 group-hover:text-[#2F64FF]"}`}
                />
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                        <p className="pt-4 text-slate-500 font-light leading-relaxed text-sm">{faq.a}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
