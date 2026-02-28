import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, FileText, Quote, Link, Bell } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import FloatingWhatsappButton from "@/components/ui/floating-whatsapp-button";
import SeoHead from "@/components/SeoHead";
import LLMWorkflowsHero from "@/components/ui/llm-workflows-hero";
import LLMModelsBlock from "@/components/ui/llm-models-block";

import esData from "@/locales/es.json";
const copy = esData.llmWorkflows;

export default function LLMWorkflows() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <div
            id="llm-workflows-page"
            className="relative min-h-screen overflow-x-hidden overflow-y-auto bg-[#F8FAFC]"
        >
            <SeoHead
                title={copy.seo.title}
                description={copy.seo.description}
            />
            <Navbar />

            <main className="site-sections">
                {/* 1. HERO */}
                <LLMWorkflowsHero />

                {/* 2. MODELS BLOCK — Infraestructura LLM lista para producción */}
                <LLMModelsBlock />

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
                                LLMs que generan{" "}
                                <span className="font-semibold text-[#2F64FF]">resultados medibles</span>
                            </h2>
                            <p className="text-slate-500 text-lg font-light leading-relaxed">
                                Implementaciones que reducen el trabajo cognitivo repetitivo y liberan a los equipos para tareas de mayor valor.
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
                            <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-10 flex flex-col justify-between hover:border-violet-300/50 hover:shadow-md transition-all duration-300">
                                <div>
                                    <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-8">
                                        <FileText className="w-6 h-6 text-violet-600" />
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-medium text-[#071540] mb-5 leading-snug">
                                        Automatice el trabajo cognitivo intensivo desde el primer mes
                                    </h3>
                                    <p className="text-slate-600 font-light leading-relaxed text-base">
                                        Los LLMs no reemplazan a las personas — potencian su capacidad de análisis. Automatizamos la lectura, clasificación y síntesis de documentos, liberando a los equipos para decisiones estratégicas que requieren juicio humano.
                                    </p>
                                </div>
                                <div className="mt-10 pt-8 border-t border-slate-200">
                                    <p className="text-slate-400 text-sm font-light">
                                        Resultados promedio documentados en proyectos de automatización cognitiva empresarial.
                                    </p>
                                </div>
                            </div>

                            {/* Right — big number */}
                            <div className="bg-[#F0F4FF] border border-[#2F64FF]/15 rounded-2xl p-10 flex flex-col justify-between hover:border-[#2F64FF]/35 hover:shadow-md transition-all duration-300">
                                <div>
                                    <p className="text-slate-500 text-sm font-light uppercase tracking-widest mb-6">Impacto operativo</p>
                                    <div className="flex items-start justify-center gap-1 leading-none mb-6">
                                <span className="text-[#2F64FF] font-bold text-[7rem] md:text-[9rem] leading-none tracking-tighter">78</span>
                                    <span className="text-[#2F64FF] font-bold text-4xl md:text-5xl mt-5">%</span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[#071540] text-xl font-medium leading-snug mb-2">
                                        Reducción en tiempo de procesamiento manual de documentos y datos no estructurados
                                    </p>
                                    <p className="text-slate-500 text-sm font-light leading-relaxed mt-3">
                                        Medido en flujos de análisis documental y clasificación migrados a pipelines con LLMs.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Bottom metric cards */}
                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                {
                                    value: "+60%",
                                    label: "velocidad de análisis cognitivo",
                                    desc: "Lectura, extracción y síntesis de documentos largos en segundos donde antes tomaba horas.",
                                },
                                {
                                    value: "−70%",
                                    label: "tareas de lectura y clasificación manual",
                                    desc: "Los modelos procesan grandes volúmenes de texto con consistencia y precisión superior al promedio humano.",
                                },
                                {
                                    value: "+97%",
                                    label: "precisión en extracción de datos estructurados",
                                    desc: "Extracción de entidades, fechas, cláusulas y valores clave con mínima tasa de error en producción.",
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

                        {/* BLOQUE 1: Documentos → texto izq / mockup der */}
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
                                    Procesamiento documental
                                </span>
                                <h3 className="text-3xl md:text-4xl lg:text-[2.65rem] font-light tracking-tight text-[#071540] leading-tight mb-6">
                                    Convierte documentos en{" "}
                                    <span className="font-semibold">datos procesables en segundos</span>
                                </h3>
                                <p className="text-slate-600 font-light text-lg leading-relaxed mb-8">
                                    Contratos, facturas, reportes técnicos, correos y PDFs se convierten automáticamente en información estructurada y accionable, sin intervención manual y con trazabilidad completa.
                                </p>
                                <ul className="space-y-3">
                                    {[
                                        "Análisis automático de contratos y PDFs legales",
                                        "Extracción de entidades, fechas y cláusulas clave",
                                        "Clasificación inteligente por categoría y urgencia",
                                        "Resúmenes ejecutivos en lenguaje natural",
                                        "Detección de anomalías y patrones inusuales",
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

                            {/* Document pipeline mockup */}
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
                                        <span className="text-white/40 text-xs font-light ml-2">Pipeline de Documentos · ELARIS LLM Hub</span>
                                    </div>
                                    <div className="p-5 bg-[#F5F0FF]/40">
                                        {/* Pipeline steps */}
                                        <div className="flex items-center justify-between mb-5 gap-1">
                                            {[
                                                { label: "Ingesta", color: "bg-violet-50 border-violet-200 text-violet-700" },
                                                { label: "LLM", color: "bg-blue-50 border-blue-200 text-blue-700" },
                                                { label: "Salida", color: "bg-emerald-50 border-emerald-200 text-emerald-700" },
                                            ].map((step, i) => (
                                                <div key={step.label} className="flex items-center gap-1 flex-1">
                                                    <div className={`flex-1 px-3 py-2 rounded-lg border text-center text-[11px] font-semibold ${step.color}`}>
                                                        {step.label}
                                                    </div>
                                                    {i < 2 && <span className="text-slate-300 text-base shrink-0">→</span>}
                                                </div>
                                            ))}
                                        </div>

                                        {/* KPI row */}
                                        <div className="grid grid-cols-3 gap-3 mb-4">
                                            {[
                                                { label: "Docs hoy", value: "142", color: "text-[#2F64FF]" },
                                                { label: "Precisión", value: "97%", color: "text-emerald-600" },
                                                { label: "Tiempo prom.", value: "3.1s", color: "text-blue-600" },
                                            ].map((k) => (
                                                <div key={k.label} className="bg-white rounded-xl p-3 shadow-sm border border-slate-100 text-center">
                                                    <p className={`text-xl font-bold ${k.color}`}>{k.value}</p>
                                                    <p className="text-slate-400 text-[10px] font-light mt-0.5">{k.label}</p>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Extraction preview */}
                                        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                                            <p className="text-slate-500 text-[10px] uppercase tracking-wider mb-3">Extracción reciente — Contrato_2024_Q4.pdf</p>
                                            <div className="space-y-2">
                                                {[
                                                    { key: "Parte contratante", val: "ACME Corp. S.A." },
                                                    { key: "Fecha de vencimiento", val: "31 dic 2025" },
                                                    { key: "Cláusula de penalidad", val: "Detectada (§12.3)" },
                                                    { key: "Monto total", val: "$124,000 USD" },
                                                ].map((row) => (
                                                    <div key={row.key} className="flex items-center justify-between">
                                                        <span className="text-slate-500 text-[10px]">{row.key}</span>
                                                        <span className="text-[#071540] text-[10px] font-semibold">{row.val}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute -bottom-4 -left-4 bg-[#2F64FF] text-white rounded-2xl px-4 py-3 shadow-lg text-sm font-medium hidden md:flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                                    Pipeline activo
                                </div>
                            </motion.div>
                        </div>

                        {/* BLOQUE 2: Integraciones → mockup izq / texto der */}
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                            {/* Integration hub mockup */}
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
                                        <span className="text-white/40 text-xs font-light ml-2">Centro de Integraciones LLM · ELARIS Platform</span>
                                    </div>
                                    <div className="p-5 bg-[#F8FAFC]">
                                        {/* Connected systems */}
                                        <div className="flex items-center justify-between mb-4">
                                            <p className="text-slate-700 text-xs font-medium">Sistemas conectados</p>
                                            <div className="flex items-center gap-1 text-[9px] text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-full px-2 py-0.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                                4 activos
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-4 gap-2 mb-4">
                                            {[
                                                { name: "Slack",       bg: "bg-[#4A154B]",  text: "S"  },
                                                { name: "Notion",      bg: "bg-[#000000]",  text: "N"  },
                                                { name: "SAP",         bg: "bg-[#007DB8]",  text: "SAP" },
                                                { name: "Salesforce",  bg: "bg-[#00A1E0]",  text: "SF" },
                                            ].map((sys) => (
                                                <div key={sys.name} className="flex flex-col items-center gap-1.5">
                                                    <div className={`w-10 h-10 rounded-xl ${sys.bg} flex items-center justify-center`}>
                                                        <span className="text-white text-[9px] font-bold">{sys.text}</span>
                                                    </div>
                                                    <span className="text-slate-500 text-[9px]">{sys.name}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Activity log */}
                                        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 mb-3 space-y-2.5">
                                            <p className="text-slate-500 text-[10px] uppercase tracking-wider">Actividad reciente</p>
                                            {[
                                                { txt: "Resumen generado → #canal-ventas (Slack)", dot: "bg-[#4A154B]" },
                                                { txt: "Página Notion actualizada automáticamente", dot: "bg-slate-700" },
                                                { txt: "Oportunidad en Salesforce enriquecida con IA", dot: "bg-[#00A1E0]" },
                                            ].map((row, i) => (
                                                <div key={i} className="flex items-center gap-2">
                                                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${row.dot}`} />
                                                    <span className="text-slate-600 text-[10px] leading-tight">{row.txt}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* System health */}
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="bg-white rounded-xl p-3.5 shadow-sm border border-slate-100">
                                                <p className="text-slate-500 text-[10px] uppercase tracking-wide mb-2.5">
                                                    <Link className="inline w-2.5 h-2.5 mr-1" />
                                                    Webhooks activos
                                                </p>
                                                {["POST /llm/analyze", "POST /llm/summarize"].map((wh, i) => (
                                                    <div key={i} className="flex items-center gap-1.5 mb-1.5">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                                                        <span className="text-slate-500 text-[9px] font-mono truncate">{wh}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="bg-white rounded-xl p-3.5 shadow-sm border border-slate-100">
                                                <p className="text-slate-500 text-[10px] uppercase tracking-wide mb-2.5">
                                                    <Bell className="inline w-2.5 h-2.5 mr-1" />
                                                    Alertas del sistema
                                                </p>
                                                {[
                                                    { txt: "Latencia normal: 0.9s", dot: "bg-emerald-400" },
                                                    { txt: "0 errores en última hora", dot: "bg-emerald-400" },
                                                    { txt: "Costo: $0.14 / 1K tokens", dot: "bg-amber-400" },
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
                                    Stack conectado
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
                                    Integraciones y conectividad
                                </span>
                                <h3 className="text-3xl md:text-4xl lg:text-[2.65rem] font-light tracking-tight text-[#071540] leading-tight mb-6">
                                    Conecte la inteligencia LLM a{" "}
                                    <span className="font-semibold">su stack actual</span>
                                </h3>
                                <p className="text-slate-600 font-light text-lg leading-relaxed mb-8">
                                    Los LLMs no funcionan en el vacío — se integran a las herramientas que ya usa su equipo. Conectamos modelos a Slack, Notion, ERPs, CRMs y cualquier sistema con API, sin reemplazar lo que ya funciona.
                                </p>
                                <ul className="space-y-3">
                                    {[
                                        "Integración nativa con Slack, Teams, Notion y Confluence",
                                        "APIs RESTful y webhooks para cualquier sistema",
                                        "Conexión directa con ERP y CRM corporativos",
                                        "Bases de conocimiento internas (RAG)",
                                        "Logs, observabilidad y trazabilidad completa de cada llamada",
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
                            "Implementar LLMs en nuestros flujos de revisión de contratos redujo el tiempo de análisis de 4 horas a menos de 10 minutos. Ahora el equipo legal se enfoca solo en las cláusulas que el modelo marca como críticas."
                        </p>
                        <div>
                            <p className="font-semibold text-lg text-[#071540]">Director Legal</p>
                            <p className="text-[#2F64FF] font-medium tracking-wide mt-1">Empresa del sector financiero</p>
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
                                Todo lo que necesitas saber sobre integrar LLMs en los flujos reales de tu empresa.
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
