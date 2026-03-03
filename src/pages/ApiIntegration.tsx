import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, GitMerge, Quote, Webhook, Bell } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import FloatingWhatsappButton from "@/components/ui/floating-whatsapp-button";
import SeoHead from "@/components/SeoHead";
import ApiIntegrationHero from "@/components/ui/api-integration-hero";
import ApiIntegrationBlock from "@/components/ui/api-integration-block";

import esData from "@/locales/es.json";
const copy = esData.apiIntegration;

export default function ApiIntegration() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <div
            id="api-integration-page"
            className="relative min-h-screen overflow-x-hidden overflow-y-auto bg-[#F8FAFC]"
        >
            <SeoHead
                title={copy.seo.title}
                description={copy.seo.description}
            />
            <Navbar />

            <main className="site-sections">
                {/* 1. HERO */}
                <ApiIntegrationHero />

                {/* 2. ARCHITECTURE BLOCK — APIs listas para producción */}
                <ApiIntegrationBlock />

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
                                APIs que generan{" "}
                                <span className="font-semibold text-[#2F64FF]">resultados medibles</span>
                            </h2>
                            <p className="text-slate-500 text-lg font-light leading-relaxed">
                                Integraciones que eliminan los silos de datos, aceleran el intercambio de información y liberan a los equipos técnicos para construir en lugar de mantener parches.
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
                                        <GitMerge className="w-6 h-6 text-[#2F64FF]" />
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-medium text-[#071540] mb-5 leading-snug">
                                        Elimine los silos de datos desde la primera integración
                                    </h3>
                                    <p className="text-slate-600 font-light leading-relaxed text-base">
                                        Los sistemas empresariales modernos no operan en aislamiento. Diseñamos APIs que actúan como el tejido conector de tu ecosistema — sincronizando datos entre ERP, CRM, plataformas externas y aplicaciones propias con consistencia, seguridad y rendimiento.
                                    </p>
                                </div>
                                <div className="mt-10 pt-8 border-t border-slate-200">
                                    <p className="text-slate-400 text-sm font-light">
                                        Resultados promedio documentados en proyectos de integración de ecosistemas empresariales.
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
                                        Reducción en tiempo de integración entre sistemas críticos de negocio
                                    </p>
                                    <p className="text-slate-500 text-sm font-light leading-relaxed mt-3">
                                        Medido en proyectos de conexión entre ERPs, CRMs y plataformas propias migrados a arquitecturas API-first.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Bottom metric cards */}
                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                {
                                    value: "99.9%",
                                    label: "uptime en producción",
                                    desc: "APIs diseñadas con alta disponibilidad, reintentos automáticos y failover para operaciones críticas sin interrupciones.",
                                },
                                {
                                    value: "−58%",
                                    label: "en tareas manuales de sincronización",
                                    desc: "Eventos y webhooks reemplazan procesos de exportación/importación manual entre sistemas, eliminando errores humanos.",
                                },
                                {
                                    value: "⩽50ms",
                                    label: "latencia media en endpoints optimizados",
                                    desc: "Arquitectura de caché, connection pooling y consultas eficientes para respuestas ultrarrápidas bajo alta demanda.",
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

                        {/* BLOQUE 1: Seguridad y Gateway → texto izq / mockup der */}
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
                                    Seguridad y control de acceso
                                </span>
                                <h3 className="text-3xl md:text-4xl lg:text-[2.65rem] font-light tracking-tight text-[#071540] leading-tight mb-6">
                                    Tu API, blindada desde{" "}
                                    <span className="font-semibold">la primera llamada</span>
                                </h3>
                                <p className="text-slate-600 font-light text-lg leading-relaxed mb-8">
                                    La seguridad no es un módulo adicional — es parte del diseño base. Implementamos autenticación robusta, control de acceso granular y políticas de throttling que protegen tus datos y garantizan que solo los sistemas autorizados puedan consumir tus recursos.
                                </p>
                                <ul className="space-y-3">
                                    {[
                                        "OAuth 2.0 con flujos de autorización estándar",
                                        "JWT con rotación automática de tokens",
                                        "API Keys con permisos por scope y endpoint",
                                        "Rate limiting y throttling por cliente",
                                        "IP allowlisting y bloqueo de patrones maliciosos",
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

                            {/* Security mockup */}
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
                                        <span className="text-white/40 text-xs font-light ml-2">Control de Acceso · ELARIS API Gateway</span>
                                    </div>
                                    <div className="p-5 bg-[#F0F4FF]/60">
                                        {/* KPI row */}
                                        <div className="grid grid-cols-3 gap-3 mb-4">
                                            {[
                                                { label: "Clientes activos", value: "18",   color: "text-[#2F64FF]" },
                                                { label: "Req. bloqueados",  value: "247",  color: "text-red-500" },
                                                { label: "Tasa de éxito",    value: "99.4%",color: "text-emerald-600" },
                                            ].map((kpi, i) => (
                                                <div key={i} className="bg-white rounded-xl p-3 shadow-sm border border-slate-100 text-center">
                                                    <p className={`text-xl font-bold ${kpi.color}`}>{kpi.value}</p>
                                                    <p className="text-slate-400 text-[10px] font-light mt-0.5">{kpi.label}</p>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Auth flow */}
                                        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 mb-4">
                                            <div className="flex justify-between items-center mb-3">
                                                <p className="text-slate-700 text-xs font-medium">Flujo de autenticación</p>
                                                <span className="text-emerald-500 text-xs font-semibold">OAuth 2.0</span>
                                            </div>
                                            <div className="flex items-center justify-between gap-2">
                                                {[
                                                    { label: "Cliente",   color: "bg-blue-50 border-blue-200 text-blue-700" },
                                                    { label: "Gateway",   color: "bg-[#2F64FF] text-white border-[#2F64FF]" },
                                                    { label: "Recurso",   color: "bg-emerald-50 border-emerald-200 text-emerald-700" },
                                                ].map((step, i) => (
                                                    <div key={step.label} className="flex items-center gap-1.5 flex-1">
                                                        <div className={`flex-1 px-2 py-1.5 rounded-lg border text-center text-[10px] font-semibold ${step.color}`}>
                                                            {step.label}
                                                        </div>
                                                        {i < 2 && <span className="text-slate-300 text-sm shrink-0">→</span>}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Access log */}
                                        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 space-y-2.5">
                                            <p className="text-slate-700 text-xs font-medium mb-3">Log de accesos recientes</p>
                                            {[
                                                { client: "ERP-SAP-PRD",    status: "200 OK",      dot: "bg-emerald-400" },
                                                { client: "CRM-HubSpot",    status: "200 OK",      dot: "bg-emerald-400" },
                                                { client: "Bot-Unknown",    status: "403 Denied",  dot: "bg-red-400" },
                                            ].map((log, i) => (
                                                <div key={i} className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <span className={`w-1.5 h-1.5 rounded-full ${log.dot} flex-shrink-0`} />
                                                        <span className="text-slate-600 text-xs font-mono">{log.client}</span>
                                                    </div>
                                                    <span className="text-slate-400 text-[10px]">{log.status}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Floating badge */}
                                <div className="absolute -bottom-4 -left-4 bg-[#2F64FF] text-white rounded-2xl px-4 py-3 shadow-lg text-sm font-medium hidden md:flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                                    Gateway activo
                                </div>
                            </motion.div>
                        </div>

                        {/* BLOQUE 2: Webhooks y eventos → mockup izq / texto der */}
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                            {/* Webhook hub mockup */}
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
                                        <span className="text-white/40 text-xs font-light ml-2">Hub de Eventos · ELARIS Platform</span>
                                    </div>

                                    <div className="p-5 bg-[#F8FAFC]">
                                        {/* Connected systems */}
                                        <div className="flex items-center justify-between mb-4">
                                            <p className="text-slate-700 text-xs font-medium">Sistemas suscritos</p>
                                            <div className="flex items-center gap-1 text-[9px] text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-full px-2 py-0.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                                5 activos
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-4 gap-2 mb-4">
                                            {[
                                                { name: "Slack",      bg: "bg-[#4A154B]", text: "S"   },
                                                { name: "SAP",        bg: "bg-[#007DB8]", text: "SAP" },
                                                { name: "HubSpot",    bg: "bg-[#FF7A59]", text: "HS"  },
                                                { name: "Stripe",     bg: "bg-[#635BFF]", text: "ST"  },
                                            ].map((sys) => (
                                                <div key={sys.name} className="flex flex-col items-center gap-1.5">
                                                    <div className={`w-10 h-10 rounded-xl ${sys.bg} flex items-center justify-center`}>
                                                        <span className="text-white text-[9px] font-bold">{sys.text}</span>
                                                    </div>
                                                    <span className="text-slate-500 text-[9px]">{sys.name}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Event log */}
                                        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 mb-3 space-y-2.5">
                                            <p className="text-slate-500 text-[10px] uppercase tracking-wider">Eventos recientes</p>
                                            {[
                                                { txt: "order.created → SAP + HubSpot",         dot: "bg-[#2F64FF]" },
                                                { txt: "payment.confirmed → Slack #finanzas",    dot: "bg-emerald-500" },
                                                { txt: "invoice.failed → Retry en 30s",          dot: "bg-amber-400" },
                                            ].map((row, i) => (
                                                <div key={i} className="flex items-center gap-2">
                                                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${row.dot}`} />
                                                    <span className="text-slate-600 text-[10px] leading-tight font-mono">{row.txt}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Metrics row */}
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="bg-white rounded-xl p-3.5 shadow-sm border border-slate-100">
                                                <p className="text-slate-500 text-[10px] uppercase tracking-wide mb-2.5">
                                                    <Webhook className="inline w-2.5 h-2.5 mr-1" />
                                                    Webhooks activos
                                                </p>
                                                {["POST /events/orders", "POST /events/payments"].map((wh, i) => (
                                                    <div key={i} className="flex items-center gap-1.5 mb-1.5">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                                                        <span className="text-slate-500 text-[9px] font-mono truncate">{wh}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="bg-white rounded-xl p-3.5 shadow-sm border border-slate-100">
                                                <p className="text-slate-500 text-[10px] uppercase tracking-wide mb-2.5">
                                                    <Bell className="inline w-2.5 h-2.5 mr-1" />
                                                    Estado del sistema
                                                </p>
                                                {[
                                                    { txt: "Latencia: 48ms p95",          dot: "bg-emerald-400" },
                                                    { txt: "0 fallos en última hora",      dot: "bg-emerald-400" },
                                                    { txt: "Cola: 0 mensajes pendientes",  dot: "bg-emerald-400" },
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

                                {/* Floating badge */}
                                <div className="absolute -bottom-4 -right-4 bg-emerald-500 text-white rounded-2xl px-4 py-3 shadow-lg text-sm font-semibold hidden md:flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                                    Ecosistema conectado
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
                                    Integración en tiempo real
                                </span>
                                <h3 className="text-3xl md:text-4xl lg:text-[2.65rem] font-light tracking-tight text-[#071540] leading-tight mb-6">
                                    Conecte su ecosistema{" "}
                                    <span className="font-semibold">sin polling ni fricción</span>
                                </h3>
                                <p className="text-slate-600 font-light text-lg leading-relaxed mb-8">
                                    Cuando ocurre un evento en tu sistema — un pedido, un pago, un cambio de estado — los sistemas relevantes deben saberlo al instante. Diseñamos arquitecturas event-driven con webhooks tipados, reintentos automáticos y entrega garantizada que eliminan la sincronización manual.
                                </p>
                                <ul className="space-y-3">
                                    {[
                                        "Webhooks tipados con payloads documentados en OpenAPI",
                                        "Reintentos automáticos con backoff exponencial",
                                        "Entrega garantizada y registro de intentos fallidos",
                                        "Suscripciones granulares por tipo de evento",
                                        "Integraciones nativas con Slack, SAP, Stripe, HubSpot y más",
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
                            "La API que construyó ELARIS conectó nuestro ERP con el portal de clientes en menos de tres semanas. Por primera vez, inventario, pedidos y facturación están sincronizados en tiempo real sin intervención manual."
                        </p>
                        <div>
                            <p className="font-semibold text-lg text-[#071540]">Gerente de Tecnología</p>
                            <p className="text-[#2F64FF] font-medium tracking-wide mt-1">Empresa del sector logístico</p>
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
                                Todo lo que necesitas saber sobre integraciones API para empresas.
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
