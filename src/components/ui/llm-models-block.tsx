import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Server, Database, Shield, Layers, Activity, Bot } from "lucide-react";

// ─── Benefit items ────────────────────────────────────────────────────────────
const benefits = [
  {
    icon: Layers,
    title: "Arquitectura agnóstica de modelo",
    desc: "GPT, Claude, Gemini, Llama u open-source: elegimos el mejor modelo para cada tarea y evitamos el vendor lock-in.",
  },
  {
    icon: Database,
    title: "Fine-tuning y RAG con tus datos",
    desc: "Conectamos el LLM a tus documentos, bases de conocimiento y repositorios para respuestas precisas y contextualizadas.",
  },
  {
    icon: Shield,
    title: "On-premise o nube privada",
    desc: "Tu información nunca sale de tu infraestructura. Soportamos despliegues privados con Ollama, vLLM y Azure OpenAI.",
  },
  {
    icon: Server,
    title: "Orquestación multi-modelo",
    desc: "Construimos pipelines con LangChain, LlamaIndex y CrewAI para flujos que combinan múltiples modelos de forma inteligente.",
  },
  {
    icon: Activity,
    title: "Observabilidad completa",
    desc: "Monitoreo de latencia, costo por token, tasa de error y calidad de respuesta con dashboards en tiempo real.",
  },
];

// ─── Router mock ──────────────────────────────────────────────────────────────
const ModelRouterMock = () => (
  <div className="bg-[#0b1836] rounded-3xl border border-[#2F64FF]/20 shadow-[0_40px_100px_rgba(0,0,0,0.5)] overflow-hidden">
    {/* Chrome bar */}
    <div className="flex items-center gap-3 px-5 py-3.5 border-b border-[#2F64FF]/15 bg-[#071030]/60">
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-[#2F64FF]/30" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#2F64FF]/30" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#2F64FF]/80" />
      </div>
      <div className="flex-1 mx-3 bg-[#0d1f50]/80 rounded-lg px-3 py-1 text-[11px] text-[#6B9FFF]/60 font-mono border border-[#2F64FF]/10">
        model-router.empresa.com/orchestration
      </div>
    </div>

    <div className="p-5 space-y-4">
      {/* Header pill */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#2F64FF]/15 border border-[#2F64FF]/25 flex items-center justify-center">
            <Bot className="w-3.5 h-3.5 text-[#7EB5FF]" />
          </div>
          <div>
            <div className="text-xs font-semibold text-white">Orquestador inteligente</div>
            <div className="text-[9px] text-slate-400">4 modelos activos · 12,400 tareas procesadas</div>
          </div>
        </div>
        <div className="flex items-center gap-1 text-[9px] text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-full px-2 py-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Online
        </div>
      </div>

      {/* Routing table */}
      <div className="rounded-xl overflow-hidden border border-[#2F64FF]/15">
        <div className="grid grid-cols-3 text-[9px] text-slate-500 uppercase tracking-wider px-3 py-1.5 bg-[#071030]/60">
          <span>Tarea</span><span>Modelo</span><span>Latencia</span>
        </div>
        {[
          { task: "Análisis de contratos",  model: "GPT-4o",      latency: "1.2s", cls: "text-[#7EB5FF]" },
          { task: "Resumen de correos",      model: "Claude 3.5",  latency: "0.8s", cls: "text-sky-300" },
          { task: "Extracción de entidades", model: "Llama 3.1",   latency: "0.5s", cls: "text-emerald-300" },
          { task: "Q&A base interna",        model: "RAG + GPT-4o", latency: "1.8s", cls: "text-amber-300" },
        ].map((r) => (
          <div key={r.task} className="grid grid-cols-3 px-3 py-2 border-t border-[#2F64FF]/10 hover:bg-[#2F64FF]/5 transition-colors">
            <span className="text-[10px] text-slate-300 truncate pr-2">{r.task}</span>
            <span className={`text-[10px] font-semibold truncate ${r.cls}`}>{r.model}</span>
            <span className="text-[10px] text-slate-400 font-mono">{r.latency}</span>
          </div>
        ))}
      </div>

      {/* Model load bars */}
      <div className="space-y-2">
        <div className="text-[9px] text-slate-500 uppercase tracking-wider">Carga por modelo</div>
        {[
          { name: "GPT-4o",     pct: 74, cls: "from-[#2F64FF] to-[#6B9FFF]" },
          { name: "Claude 3.5", pct: 55, cls: "from-sky-500 to-sky-400" },
          { name: "Llama 3.1",  pct: 38, cls: "from-emerald-500 to-emerald-400" },
        ].map((m) => (
          <div key={m.name} className="flex items-center gap-2">
            <div className="text-[10px] text-slate-400 w-20 shrink-0">{m.name}</div>
            <div className="flex-1 bg-[#0d2060]/60 rounded-full h-1.5">
              <div className={`bg-gradient-to-r ${m.cls} h-1.5 rounded-full`} style={{ width: `${m.pct}%` }} />
            </div>
            <div className="text-[9px] text-slate-400 font-mono w-6 text-right">{m.pct}%</div>
          </div>
        ))}
      </div>

      {/* Accuracy tracker */}
      <div className="flex items-center gap-3 p-3 bg-[#0d1f50]/40 rounded-xl border border-[#2F64FF]/10">
        <div className="flex-1">
          <div className="flex justify-between text-[10px] mb-1.5">
            <span className="text-slate-500 font-medium">Precisión global (12,400 tareas)</span>
            <span className="text-emerald-400 font-semibold">94.7%</span>
          </div>
          <div className="w-full bg-[#0d2060]/60 rounded-full h-1.5">
            <div className="bg-gradient-to-r from-[#2F64FF] to-emerald-400 h-1.5 rounded-full" style={{ width: "94.7%" }} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ─── Main component ───────────────────────────────────────────────────────────
export default function LLMModelsBlock() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative py-24 lg:py-36 bg-gradient-to-br from-[#071540] via-[#0a1f5c] to-[#0d2060] overflow-hidden"
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #6B9FFF 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#071540]/60 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">

        {/* ── Centered header ── */}
        <motion.div
          className="text-center mb-16 lg:mb-20 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#2F64FF]/40 bg-[#2F64FF]/10 text-[#7EB5FF] text-xs font-bold tracking-[0.12em] uppercase mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2F64FF] animate-pulse" />
            Infraestructura LLM
          </div>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white leading-tight mb-5">
            Infraestructura LLM lista para
            <span className="font-semibold text-[#7EB5FF] block mt-1">
              producción real
            </span>
          </h2>
          <p className="text-lg text-slate-400 font-light leading-relaxed">
            No solo conectamos APIs — diseñamos la arquitectura completa para que los LLMs
            operen de forma confiable, privada y escalable dentro de tu empresa.
          </p>
        </motion.div>

        {/* ── Two columns ── */}
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          {/* Left — benefit list */}
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
                  <div className="w-11 h-11 rounded-xl bg-[#2F64FF]/15 border border-[#2F64FF]/25 flex items-center justify-center flex-shrink-0 group-hover:bg-[#2F64FF] group-hover:border-[#2F64FF] transition-all duration-300">
                    <Icon className="w-5 h-5 text-[#7EB5FF] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white mb-1 leading-snug">{item.title}</h3>
                    <p className="text-sm text-slate-400 font-light leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right — mockup */}
          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            <ModelRouterMock />
            <div className="absolute -inset-6 bg-[#2F64FF]/15 rounded-3xl blur-3xl -z-10 scale-90" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
