import { memo } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Bot, Zap, FileText, Activity } from "lucide-react";
import { NeuralNoise } from "@/components/ui/neural-noise-cursor";

// ─── Animation variants ───────────────────────────────────────────────────────
const fadeUp = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: "easeOut" },
} as const;

const fadeUpSub = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay: 0.15, ease: "easeOut" },
} as const;

const fadeRight = {
  initial: { opacity: 0, x: 36 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, delay: 0.2, ease: "easeOut" },
} as const;

const cardVariant = (i: number) => ({
  initial: { opacity: 0, scale: 0.85 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.45, delay: 0.55 + i * 0.1, ease: "easeOut" as const },
});

// ─── Static data ──────────────────────────────────────────────────────────────
const floatingCards = [
  {
    icon: <Bot className="w-4 h-4 text-[#2F64FF]" />,
    bg: "bg-blue-50",
    title: "Modelos activos",
    sub: "GPT-4o · Claude 3.5",
    position: "top-[-1.5rem] left-[-2rem]",
  },
  {
    icon: <Zap className="w-4 h-4 text-amber-500" />,
    bg: "bg-amber-50",
    title: "Automatización",
    sub: "2,400 req/día",
    position: "bottom-[-1.5rem] right-[-1.5rem]",
  },
  {
    icon: <FileText className="w-4 h-4 text-[#2F64FF]" />,
    bg: "bg-blue-50",
    title: "Documentos",
    sub: "97.2% precisión",
    position: "bottom-12 left-[-2.5rem]",
  },
];

const kpis = [
  { label: "Req/día",   value: "2.4K", color: "text-[#2F64FF]", bg: "bg-blue-50 border-blue-100" },
  { label: "Precisión", value: "97%",  color: "text-[#2F64FF]",  bg: "bg-blue-50 border-blue-100" },
  { label: "Ahorradas", value: "48h",  color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-100" },
];

const pipelines = [
  { name: "Análisis de contratos PDF",     model: "GPT-4o",     pct: 95, statusText: "Activo" },
  { name: "Resumen de reportes técnicos",  model: "Claude 3.5", pct: 88, statusText: "Activo" },
];

// ─── Pipeline mock ────────────────────────────────────────────────────────────
const LLMPipelineMock = memo(() => (
  <div className="bg-white rounded-3xl shadow-[0_40px_100px_rgba(47,100,255,0.13)] border border-slate-100/80 overflow-hidden">
    {/* Browser chrome */}
    <div className="flex items-center gap-2 px-5 py-3.5 border-b border-slate-100 bg-slate-50/80">
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
      </div>
      <div className="flex-1 mx-4 bg-white rounded-md px-3 py-1 text-[11px] text-slate-400 border border-slate-200 font-mono">
        llm-hub.empresa.com/pipelines
      </div>
    </div>

    <div className="p-5 space-y-4">
      {/* Model status pills */}
      <div className="flex gap-2 flex-wrap">
        {[
          { name: "GPT-4o",     cls: "bg-blue-50 border-blue-100 text-blue-700" },
          { name: "Claude 3.5", cls: "bg-blue-50 border-blue-100 text-blue-700" },
        ].map((m) => (
          <div key={m.name} className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-semibold ${m.cls}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {m.name}
          </div>
        ))}
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-3 gap-3">
        {kpis.map((kpi) => (
          <div key={kpi.label} className={`${kpi.bg} border rounded-xl p-3 text-center`}>
            <div className={`text-xl font-bold ${kpi.color}`}>{kpi.value}</div>
            <div className="text-[10px] text-slate-500 mt-0.5 leading-tight">{kpi.label}</div>
          </div>
        ))}
      </div>

      {/* Pipeline rows */}
      <div className="space-y-2">
        {pipelines.map((row) => (
          <div key={row.name} className="flex items-center gap-3 p-2.5 bg-slate-50/80 border border-slate-100 rounded-xl">
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-1.5">
                <div className="text-xs font-medium text-[#071540] truncate">{row.name}</div>
                <span className="text-[9px] text-slate-400 ml-2 whitespace-nowrap">{row.model}</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-1.5">
                <div
                  className="bg-[#2F64FF] h-1.5 rounded-full"
                  style={{ width: `${row.pct}%` }}
                />
              </div>
            </div>
            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full whitespace-nowrap">
              {row.statusText}
            </span>
          </div>
        ))}
      </div>

      {/* Token usage */}
      <div className="flex items-center gap-3 p-3 bg-[#F0F4FF] rounded-xl border border-[#2F64FF]/10">
        <div className="w-8 h-8 rounded-lg bg-[#2F64FF]/10 flex items-center justify-center flex-shrink-0">
          <Activity className="w-4 h-4 text-[#2F64FF]" />
        </div>
        <div className="flex-1">
          <div className="flex justify-between text-[10px] mb-1.5">
            <span className="font-semibold text-[#071540]">Tokens este mes</span>
            <span className="text-[#2F64FF] font-bold">3.2M / 10M</span>
          </div>
          <div className="w-full bg-[#E0E8FF] rounded-full h-1.5">
            <div
              className="bg-[#2F64FF] h-1.5 rounded-full"
              style={{ width: "32%" }}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
));
LLMPipelineMock.displayName = "LLMPipelineMock";

// ─── Main component ───────────────────────────────────────────────────────────
export default function LLMWorkflowsHero() {
  return (
    <section className="relative min-h-[92vh] lg:h-screen flex items-center overflow-hidden bg-gradient-to-br from-white via-[#F8FAFC] to-[#EEF4FF] pt-[40px]">
      {/* Neural noise background */}
      <div className="absolute inset-0 overflow-hidden [&_canvas]:!w-full [&_canvas]:!h-full">
        <NeuralNoise opacity={0.8} pointerStrength={1.2} timeScale={0.5} fixedScrollProgress={0} className="absolute inset-0" />
      </div>

      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-[#2F64FF]/[0.04] to-transparent" />
        <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-[#2F64FF]/[0.06] rounded-full blur-3xl transform-gpu" />
        <div className="absolute top-10 right-10 w-[300px] h-[300px] bg-[#2F64FF]/[0.04] rounded-full blur-2xl transform-gpu" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl py-16 relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:grid-rows-[auto_auto] gap-8 lg:gap-x-16 xl:gap-x-24 lg:gap-y-10 lg:items-center">

          {/* ── [1] Badge + Title ── */}
          <motion.div {...fadeUp} className="lg:col-start-1 lg:row-start-1 lg:self-end">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#2F64FF]/30 bg-[#2F64FF]/[0.07] text-[#2F64FF] text-xs font-bold tracking-[0.12em] uppercase mb-8 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2F64FF] animate-pulse" />
              LLMs en Flujos de Trabajo
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-[3.4rem] font-light tracking-tight text-[#071540] leading-[1.12]">
              Integramos modelos de
              <span className="font-semibold text-[#2F64FF]"> lenguaje</span>
              <span className="block mt-1">en tu operación real</span>
            </h1>
          </motion.div>

          {/* ── [2] Mockup ── */}
          <motion.div
            {...fadeRight}
            className="relative mt-2 lg:mt-0 lg:col-start-2 lg:row-start-1 lg:row-span-2"
          >
            <LLMPipelineMock />

            {floatingCards.map((card, i) => (
              <motion.div
                key={card.title}
                {...cardVariant(i)}
                className={`absolute ${card.position} bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-slate-100 px-4 py-3 flex items-center gap-3 z-10`}
              >
                <div className={`w-9 h-9 ${card.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  {card.icon}
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#071540] whitespace-nowrap">{card.title}</div>
                  <div className="text-[10px] text-slate-500 whitespace-nowrap">{card.sub}</div>
                </div>
              </motion.div>
            ))}

            <div className="absolute inset-0 bg-[#2F64FF]/[0.07] rounded-3xl blur-3xl -z-10 scale-95 transform-gpu" />
          </motion.div>

          {/* ── [3] Description + CTA ── */}
          <motion.div {...fadeUpSub} className="lg:col-start-1 lg:row-start-2 lg:self-start">
            <p className="text-lg text-slate-600 font-light leading-relaxed mb-10 max-w-[30rem]">
              Conectamos GPT-4o, Claude, Llama y otros LLMs a los flujos críticos de tu empresa — automatizando análisis, clasificación, generación de contenido y decisiones complejas sin migrar toda tu infraestructura.
            </p>

            <a
              href="#contacto"
              className="inline-flex items-center justify-center gap-2.5 bg-[#2F64FF] text-white px-8 py-4 rounded-full font-semibold text-base hover:bg-[#2547CC] hover:shadow-[0_10px_32px_rgba(47,100,255,0.42)] active:scale-[0.97] transition-[background-color,box-shadow,transform] duration-300 group w-full lg:w-auto"
            >
              Agendar consultoría
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
