import { memo } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Brain, Link2, BarChart3, TrendingUp } from "lucide-react";
import { NeuralNoise } from "@/components/ui/neural-noise-cursor";

// ─── Animation variants (module-level → never recreated) ─────────────────────
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

// ─── Static data (module-level → never recreated) ────────────────────────────
const floatingCards = [
  {
    icon: <Zap className="w-4 h-4 text-amber-500" />,
    bg: "bg-amber-50",
    title: "Automatización",
    sub: "128 procesos activos",
    position: "top-[-1.5rem] left-[-2rem]",
  },
  {
    icon: <Brain className="w-4 h-4 text-violet-500" />,
    bg: "bg-violet-50",
    title: "IA Integrada",
    sub: "Predicciones en tiempo real",
    position: "bottom-[-1.5rem] right-[-1.5rem]",
  },
  {
    icon: <Link2 className="w-4 h-4 text-[#2F64FF]" />,
    bg: "bg-blue-50",
    title: "Integraciones",
    sub: "ERP · CRM · APIs",
    position: "bottom-12 left-[-2.5rem]",
  },
];

const kpis = [
  { label: "Eficiencia",     value: "+47%", color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-100" },
  { label: "Procesos auto.", value: "128",  color: "text-[#2F64FF]",   bg: "bg-blue-50 border-blue-100" },
  { label: "Ahorro/sem.",    value: "32h",  color: "text-violet-600",  bg: "bg-violet-50 border-violet-100" },
];

const barHeights = [28, 45, 38, 62, 50, 75, 58, 85, 68, 92, 78, 100];

const statusRows = [
  { name: "Módulo CRM integrado", pct: 92, statusText: "Activo" },
  { name: "Sincronización ERP",   pct: 78, statusText: "En curso" },
];

// ─── Dashboard mock (memoized — no props, never re-renders) ──────────────────
const DashboardMock = memo(() => (
  <div className="bg-white rounded-3xl shadow-[0_40px_100px_rgba(47,100,255,0.13)] border border-slate-100/80 overflow-hidden">
    {/* Browser chrome */}
    <div className="flex items-center gap-2 px-5 py-3.5 border-b border-slate-100 bg-slate-50/80">
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
      </div>
      <div className="flex-1 mx-4 bg-white rounded-md px-3 py-1 text-[11px] text-slate-400 border border-slate-200 font-mono">
        app.empresa.com/dashboard
      </div>
    </div>

    {/* Dashboard body */}
    <div className="p-5 space-y-4">
      {/* KPI row */}
      <div className="grid grid-cols-3 gap-3">
        {kpis.map((kpi) => (
          <div key={kpi.label} className={`${kpi.bg} border rounded-xl p-3 text-center`}>
            <div className={`text-xl font-bold ${kpi.color}`}>{kpi.value}</div>
            <div className="text-[10px] text-slate-500 mt-0.5 leading-tight">{kpi.label}</div>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div className="bg-slate-50 rounded-xl p-4 h-24 flex items-end gap-1.5 border border-slate-100">
        {barHeights.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm bg-gradient-to-t from-[#2F64FF] to-[#7EABFF]"
            style={{ height: `${h}%`, opacity: i < 7 ? 0.35 + i * 0.08 : 1 }}
          />
        ))}
      </div>

      {/* Status rows */}
      <div className="space-y-2">
        {statusRows.map((row) => (
          <div key={row.name} className="flex items-center gap-3 p-2.5 bg-slate-50/80 border border-slate-100 rounded-xl">
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-[#071540] truncate">{row.name}</div>
              <div className="w-full bg-slate-200 rounded-full h-1.5 mt-1.5">
                <div
                  className="bg-gradient-to-r from-[#2F64FF] to-[#6B9FFF] h-1.5 rounded-full"
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

      {/* Trend line mini-card */}
      <div className="flex items-center gap-3 p-3 bg-[#F0F4FF] rounded-xl border border-[#2F64FF]/10">
        <div className="w-8 h-8 rounded-lg bg-[#2F64FF]/10 flex items-center justify-center flex-shrink-0">
          <TrendingUp className="w-4 h-4 text-[#2F64FF]" />
        </div>
        <div className="flex-1">
          <div className="text-xs font-semibold text-[#071540]">Tendencia de operaciones</div>
          <div className="text-[10px] text-slate-500">↑ 18% respecto al mes anterior</div>
        </div>
        <BarChart3 className="w-4 h-4 text-[#2F64FF]/50" />
      </div>
    </div>
  </div>
));
DashboardMock.displayName = "DashboardMock";

// ─── Main component ──────────────────────────────────────────────────────────
export default function CustomSoftwareHero() {
  return (
    <section className="relative min-h-[92vh] lg:h-screen flex items-center overflow-hidden bg-gradient-to-br from-white via-[#F8FAFC] to-[#EEF3FF] pt-[40px]">
      {/* Neural noise background */}
      <div className="absolute inset-0 overflow-hidden [&_canvas]:!w-full [&_canvas]:!h-full">
        <NeuralNoise opacity={0.8} pointerStrength={1.2} timeScale={0.5} fixedScrollProgress={0} className="absolute inset-0" />
      </div>

      {/* Background decorations — transform-gpu promotes to own compositor layer */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-[#2F64FF]/[0.04] to-transparent" />
        <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-[#2F64FF]/[0.06] rounded-full blur-3xl transform-gpu" />
        <div className="absolute top-10 right-10 w-[300px] h-[300px] bg-violet-400/[0.04] rounded-full blur-2xl transform-gpu" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl py-16 relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:grid-rows-[auto_auto] gap-8 lg:gap-x-16 xl:gap-x-24 lg:gap-y-10 lg:items-center">

          {/* ── [1] Badge + Title ── */}
          <motion.div
            {...fadeUp}
            className="lg:col-start-1 lg:row-start-1 lg:self-end"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#2F64FF]/30 bg-[#2F64FF]/[0.07] text-[#2F64FF] text-xs font-bold tracking-[0.12em] uppercase mb-8 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2F64FF] animate-pulse" />
              Desarrollo de Software a Medida
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-[3.4rem] font-light tracking-tight text-[#071540] leading-[1.12]">
              Desarrollamos software
              <span className="font-semibold text-[#2F64FF]"> a medida</span>
              <span className="block mt-1">que impulsa tu crecimiento</span>
            </h1>
          </motion.div>

          {/* ── [2] Mockup ── */}
          <motion.div
            {...fadeRight}
            className="relative mt-2 lg:mt-0 lg:col-start-2 lg:row-start-1 lg:row-span-2"
          >
            <DashboardMock />

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

            {/* Ambient glow — transform-gpu for compositor layer */}
            <div className="absolute inset-0 bg-[#2F64FF]/[0.07] rounded-3xl blur-3xl -z-10 scale-95 transform-gpu" />
          </motion.div>

          {/* ── [3] Description + CTA ── */}
          <motion.div
            {...fadeUpSub}
            className="lg:col-start-1 lg:row-start-2 lg:self-start"
          >
            <p className="text-lg text-slate-600 font-light leading-relaxed mb-10 max-w-[30rem]">
              Creamos soluciones tecnológicas personalizadas que se adaptan a tus
              procesos, integran inteligencia artificial y escalan junto con tu
              operación empresarial&nbsp;— sin fricciones.
            </p>

            <a
              href="#contacto"
              className="inline-flex items-center justify-center gap-2.5 bg-[#2F64FF] text-white px-8 py-4 rounded-full font-semibold text-base hover:bg-[#1a4fe0] hover:shadow-[0_10px_32px_rgba(47,100,255,0.42)] active:scale-[0.97] transition-[background-color,box-shadow,transform] duration-300 group w-full lg:w-auto"
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
