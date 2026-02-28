import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Bot,
  TrendingUp,
  MessageSquare,
  Cpu,
  Lightbulb,
} from "lucide-react";

// ─── Benefit items ───────────────────────────────────────────────────────────
const benefits = [
  {
    icon: Bot,
    title: "Automatización inteligente de procesos",
    desc: "Flujos de trabajo autónomos entrenados con tus reglas de negocio que operan 24/7 sin intervención humana.",
  },
  {
    icon: TrendingUp,
    title: "Análisis predictivo de datos",
    desc: "Modelos que procesan tu histórico operativo para anticipar demanda, churn y oportunidades de venta.",
  },
  {
    icon: MessageSquare,
    title: "Chatbots empresariales personalizados",
    desc: "Asistentes conversacionales entrenados con el conocimiento real de tu empresa, integrados en cualquier canal.",
  },
  {
    icon: Cpu,
    title: "Integración con modelos de lenguaje",
    desc: "Conectamos GPT-4o, Claude y modelos open-source al corazón de tu plataforma de forma segura y trazable.",
  },
  {
    icon: Lightbulb,
    title: "Optimización de decisiones en tiempo real",
    desc: "Motor de recomendaciones que eleva la productividad del equipo entregando el insight correcto en el momento exacto.",
  },
];

// ─── AI Dashboard mockup ──────────────────────────────────────────────────────
const AIDashboardMock = () => (
  <div className="bg-[#0b1836] rounded-3xl border border-[#2F64FF]/20 shadow-[0_40px_100px_rgba(0,0,0,0.5)] overflow-hidden">
    {/* Chrome bar */}
    <div className="flex items-center gap-3 px-5 py-3.5 border-b border-[#2F64FF]/15 bg-[#071030]/60">
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-[#2F64FF]/30" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#2F64FF]/30" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#2F64FF]/80" />
      </div>
      <div className="flex-1 mx-3 bg-[#0d1f50]/80 rounded-lg px-3 py-1 text-[11px] text-[#6B9FFF]/60 font-mono border border-[#2F64FF]/10">
        ia.empresa.com/intelligence
      </div>
    </div>

    <div className="p-5 space-y-4">
      {/* Active model pill */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Modelo activo</span>
        <div className="flex items-center gap-2 bg-[#2F64FF]/10 border border-[#2F64FF]/20 rounded-full px-3 py-1">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] text-[#7EB5FF] font-semibold">GPT-4o · Claude 3.5</span>
        </div>
      </div>

      {/* Prediction cards */}
      <div className="grid grid-cols-2 gap-2.5">
        {[
          { label: "Demanda próx. semana", value: "↑ 23%", colorClass: "text-emerald-400" },
          { label: "Riesgo de churn", value: "↓ 12%", colorClass: "text-sky-400" },
          { label: "Conversión estimada", value: "8.4 %", colorClass: "text-violet-400" },
          { label: "Tickets automatiz.", value: "91 %", colorClass: "text-amber-400" },
        ].map((card, i) => (
          <div
            key={i}
            className="bg-[#0d1f50]/80 border border-[#2F64FF]/10 rounded-xl p-3"
          >
            <div className="text-[10px] text-slate-500 mb-1 leading-tight">{card.label}</div>
            <div className={`text-lg font-bold ${card.colorClass}`}>{card.value}</div>
          </div>
        ))}
      </div>

      {/* Chat thread */}
      <div className="bg-[#0d1f50]/60 rounded-xl p-4 border border-[#2F64FF]/10 space-y-3">
        {/* AI message */}
        <div className="flex items-start gap-2.5">
          <div className="w-6 h-6 rounded-full bg-[#2F64FF] flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-[9px] font-bold">AI</span>
          </div>
          <div className="bg-[#071030]/80 rounded-2xl rounded-tl-none px-3 py-2.5 text-[11px] text-slate-300 leading-relaxed max-w-[85%]">
            Detecté un patrón inusual en solicitudes de soporte. Recomiendo revisar el módulo de pagos antes del cierre de mes.
          </div>
        </div>

        {/* User reply */}
        <div className="flex items-start gap-2.5 justify-end">
          <div className="bg-[#2F64FF]/20 border border-[#2F64FF]/15 rounded-2xl rounded-tr-none px-3 py-2.5 text-[11px] text-slate-300 max-w-[75%]">
            ¿Cuál es la probabilidad de impacto al flujo de caja?
          </div>
          <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-[9px] font-semibold">U</span>
          </div>
        </div>

        {/* Typing indicator */}
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-full bg-[#2F64FF] flex items-center justify-center flex-shrink-0">
            <span className="text-white text-[9px] font-bold">AI</span>
          </div>
          <div className="bg-[#071030]/80 rounded-2xl rounded-tl-none px-3 py-2.5 flex items-center gap-1">
            {[0, 150, 300].map((delay) => (
              <div
                key={delay}
                className="w-1.5 h-1.5 rounded-full bg-[#6B9FFF] animate-bounce"
                style={{ animationDelay: `${delay}ms` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Accuracy bar */}
      <div className="flex items-center gap-3 p-3 bg-[#0d1f50]/40 rounded-xl border border-[#2F64FF]/10">
        <div className="flex-1">
          <div className="flex justify-between text-[10px] mb-1.5">
            <span className="text-slate-500 font-medium">Precisión del modelo</span>
            <span className="text-emerald-400 font-semibold">94.7 %</span>
          </div>
          <div className="w-full bg-[#0d2060]/60 rounded-full h-1.5">
            <div
              className="bg-gradient-to-r from-[#2F64FF] to-emerald-400 h-1.5 rounded-full"
              style={{ width: "94.7%" }}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ─── Main component ──────────────────────────────────────────────────────────
export default function CustomSoftwareAIBlock() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative py-24 lg:py-36 bg-gradient-to-br from-[#071540] via-[#0a1f5c] to-[#0d2060] overflow-hidden"
    >
      {/* Dot grid background */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #6B9FFF 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#071540]/60 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">

        {/* ── Header ── */}
        <motion.div
          className="text-center mb-16 lg:mb-20 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#2F64FF]/40 bg-[#2F64FF]/10 text-[#7EB5FF] text-xs font-bold tracking-[0.12em] uppercase mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2F64FF] animate-pulse" />
            Inteligencia Artificial
          </div>

          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white leading-tight mb-5">
            Todos nuestros desarrollos
            <span className="font-semibold text-[#7EB5FF] block mt-1">
              incluyen IA integrada
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-lg text-slate-400 font-light leading-relaxed">
            El software moderno debe ser inteligente y predictivo. Incorporamos
            capacidades de IA desde la arquitectura base&nbsp;—&nbsp;no como un
            complemento de última hora, sino como parte del núcleo del sistema.
          </p>
        </motion.div>

        {/* ── Two columns ── */}
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          {/* Left – benefit list */}
          <div className="space-y-6">
            {benefits.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  className="flex gap-5 items-start group"
                  initial={{ opacity: 0, x: -24 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.15 + idx * 0.1 }}
                >
                  {/* Icon box */}
                  <div className="w-11 h-11 rounded-xl bg-[#2F64FF]/15 border border-[#2F64FF]/25 flex items-center justify-center flex-shrink-0 group-hover:bg-[#2F64FF] group-hover:border-[#2F64FF] transition-all duration-300">
                    <Icon className="w-5 h-5 text-[#7EB5FF] group-hover:text-white transition-colors duration-300" />
                  </div>

                  {/* Text */}
                  <div>
                    <h3 className="text-base font-semibold text-white mb-1 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-400 font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right – AI dashboard mockup */}
          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            <AIDashboardMock />
            {/* Glow behind the card */}
            <div className="absolute -inset-6 bg-[#2F64FF]/15 rounded-3xl blur-3xl -z-10 scale-90" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
