import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ClipboardList, CalendarClock, Package, Cpu, BarChart2, Smartphone } from "lucide-react";

// ─── Feature items ─────────────────────────────────────────────────────────────
const features = [
  {
    icon: ClipboardList,
    title: "Órdenes de trabajo digitales",
    desc: "Crea, asigna, prioriza y cierra OTs desde cualquier dispositivo. Historial completo por activo y técnico.",
  },
  {
    icon: CalendarClock,
    title: "Mantenimiento preventivo y predictivo",
    desc: "Programación automática por tiempo, ciclos u horas de operación. Alertas de sensores IoT para anticipar fallos.",
  },
  {
    icon: Package,
    title: "Gestión de inventario y repuestos",
    desc: "Control de stock de piezas, alertas de reposición automáticas y trazabilidad de consumo por activo.",
  },
  {
    icon: Cpu,
    title: "Integración IoT e Industry 4.0",
    desc: "Conectamos el CMMS a sensores, PLCs y sistemas SCADA para monitoreo en tiempo real y mantenimiento prescriptivo.",
  },
  {
    icon: BarChart2,
    title: "KPIs y reportes de mantenimiento",
    desc: "OEE, MTTR, MTBF y disponibilidad de activos en dashboards en vivo. Exportación automática para gerencia.",
  },
];

// ─── CMMS interface mock ──────────────────────────────────────────────────────
const CMMSInterfaceMock = () => (
  <div className="bg-[#0b1836] rounded-3xl border border-[#2F64FF]/20 shadow-[0_40px_100px_rgba(0,0,0,0.5)] overflow-hidden">
    {/* Chrome bar */}
    <div className="flex items-center gap-3 px-5 py-3.5 border-b border-[#2F64FF]/15 bg-[#071030]/60">
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-[#2F64FF]/30" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#2F64FF]/30" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#2F64FF]/80" />
      </div>
      <div className="flex-1 mx-3 bg-[#0d1f50]/80 rounded-lg px-3 py-1 text-[11px] text-[#6B9FFF]/60 font-mono border border-[#2F64FF]/10">
        cmms.empresa.com/activos
      </div>
    </div>

    <div className="p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#2F64FF]/15 border border-[#2F64FF]/25 flex items-center justify-center">
            <Cpu className="w-3.5 h-3.5 text-[#7EB5FF]" />
          </div>
          <div>
            <div className="text-xs font-semibold text-white">Panel de Activos Industriales</div>
            <div className="text-[9px] text-slate-400">18 activos monitoreados · 3 alertas activas</div>
          </div>
        </div>
        <div className="flex items-center gap-1 text-[9px] text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-full px-2 py-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          En línea
        </div>
      </div>

      {/* Asset table */}
      <div className="rounded-xl overflow-hidden border border-[#2F64FF]/15">
        <div className="grid grid-cols-3 text-[9px] text-slate-500 uppercase tracking-wider px-3 py-1.5 bg-[#071030]/60">
          <span>Activo</span><span>Estado</span><span>Próx. MP</span>
        </div>
        {[
          { asset: "Compresor A3",       status: "Operativo",  next: "15 mar",  cls: "text-emerald-300" },
          { asset: "Bomba Hidráulica H7", status: "Alerta",     next: "Hoy",     cls: "text-amber-300" },
          { asset: "Transportador T2",   status: "Operativo",  next: "22 mar",  cls: "text-emerald-300" },
          { asset: "Motor Eléctrico M5", status: "En mantto.", next: "En curso", cls: "text-blue-300" },
        ].map((r) => (
          <div key={r.asset} className="grid grid-cols-3 px-3 py-2 border-t border-[#2F64FF]/10 hover:bg-[#2F64FF]/5 transition-colors">
            <span className="text-[10px] text-slate-300 truncate pr-2">{r.asset}</span>
            <span className={`text-[10px] font-semibold truncate ${r.cls}`}>{r.status}</span>
            <span className="text-[10px] text-slate-400">{r.next}</span>
          </div>
        ))}
      </div>

      {/* KPI mini row */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "MTTR",  value: "2.4h",  cls: "text-[#7EB5FF]" },
          { label: "MTBF",  value: "312h",  cls: "text-emerald-400" },
          { label: "Disp.", value: "96.8%", cls: "text-amber-400" },
        ].map((k) => (
          <div key={k.label} className="bg-[#0d1f50]/80 border border-[#2F64FF]/10 rounded-xl p-3 text-center">
            <div className={`text-base font-bold ${k.cls}`}>{k.value}</div>
            <div className="text-[9px] text-slate-500 mt-0.5">{k.label}</div>
          </div>
        ))}
      </div>

      {/* Sensor alert */}
      <div className="flex items-start gap-3 p-3 bg-amber-400/10 rounded-xl border border-amber-400/20">
        <div className="w-7 h-7 rounded-lg bg-amber-400/15 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Smartphone className="w-3.5 h-3.5 text-amber-400" />
        </div>
        <div>
          <div className="text-[11px] font-semibold text-amber-300 mb-0.5">Alerta predictiva — Sensor T°</div>
          <div className="text-[10px] text-slate-400 leading-tight">
            Bomba H7: temperatura 12°C sobre umbral normal. OT generada automáticamente.
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ─── Main component ───────────────────────────────────────────────────────────
export default function CMMSFeaturesBlock() {
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
          backgroundImage: "radial-gradient(circle, #6B9FFF 1px, transparent 1px)",
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#2F64FF]/40 bg-[#2F64FF]/10 text-[#7EB5FF] text-xs font-bold tracking-[0.12em] uppercase mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2F64FF] animate-pulse" />
            Capacidades del CMMS
          </div>

          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white leading-tight mb-5">
            Todo el mantenimiento industrial
            <span className="font-semibold text-[#7EB5FF] block mt-1">
              en una sola plataforma
            </span>
          </h2>

          <p className="text-lg text-slate-400 font-light leading-relaxed">
            Desde las órdenes de trabajo del técnico hasta los KPIs del gerente de planta&nbsp;—&nbsp;el CMMS centraliza, automatiza y conecta toda la operación de mantenimiento.
          </p>
        </motion.div>

        {/* ── Two columns ── */}
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          {/* Left – feature list */}
          <div className="space-y-6">
            {features.map((item, idx) => {
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

          {/* Right – CMMS mockup */}
          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            <CMMSInterfaceMock />
            <div className="absolute -inset-6 bg-[#2F64FF]/15 rounded-3xl blur-3xl -z-10 scale-90" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
