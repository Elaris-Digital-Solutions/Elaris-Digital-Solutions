import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GitBranch, Shield, FileCode, Webhook, BarChart3, Layers } from "lucide-react";

// ─── Benefit items ────────────────────────────────────────────────────────────
const benefits = [
  {
    icon: GitBranch,
    title: "REST y GraphQL a medida",
    desc: "Diseñamos contratos de API que reflejan la lógica real de tu negocio. Endpoints semánticos, paginación consistente y versionado desde el día uno.",
  },
  {
    icon: Shield,
    title: "Seguridad y autenticación empresarial",
    desc: "OAuth 2.0, JWT, API Keys, IP allowlisting y rate limiting configurable por cliente. Tu API nunca queda expuesta.",
  },
  {
    icon: FileCode,
    title: "Documentación OpenAPI / Swagger",
    desc: "Cada endpoint se documenta automáticamente con ejemplos reales, esquemas de respuesta y playground interactivo para el equipo de integración.",
  },
  {
    icon: Webhook,
    title: "Webhooks y eventos en tiempo real",
    desc: "Emitimos eventos a sistemas externos cuando ocurren cambios críticos — sin polling, con payloads tipados y reintentos automáticos ante fallos.",
  },
  {
    icon: BarChart3,
    title: "Observabilidad y monitoreo",
    desc: "Logs estructurados, métricas de latencia, tasa de error y dashboards de uso por cliente para operar con confianza en producción.",
  },
  {
    icon: Layers,
    title: "Orquestación multi-sistema",
    desc: "Conectamos ERP, CRM, plataformas de pago, bases de datos y servicios externos en un ecosistema coherente y mantenible.",
  },
];

// ─── API Schema mockup ────────────────────────────────────────────────────────
const APISchemasMock = () => (
  <div className="bg-[#0b1836] rounded-3xl border border-[#2F64FF]/20 shadow-[0_40px_100px_rgba(0,0,0,0.5)] overflow-hidden">
    {/* Chrome bar */}
    <div className="flex items-center gap-3 px-5 py-3.5 border-b border-[#2F64FF]/15 bg-[#071030]/60">
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-[#2F64FF]/30" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#2F64FF]/30" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#2F64FF]/80" />
      </div>
      <div className="flex-1 mx-3 bg-[#0d1f50]/80 rounded-lg px-3 py-1 text-[11px] text-[#6B9FFF]/60 font-mono border border-[#2F64FF]/10">
        api-gateway.empresa.com/architecture
      </div>
    </div>

    <div className="p-5 space-y-4">
      {/* Header pill */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#2F64FF]/15 border border-[#2F64FF]/25 flex items-center justify-center">
            <GitBranch className="w-3.5 h-3.5 text-[#7EB5FF]" />
          </div>
          <div>
            <div className="text-xs font-semibold text-white">API Gateway Empresarial</div>
            <div className="text-[9px] text-slate-400">34 endpoints · v2.4.1 en producción</div>
          </div>
        </div>
        <div className="flex items-center gap-1 text-[9px] text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-full px-2 py-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Online
        </div>
      </div>

      {/* Endpoint table */}
      <div className="rounded-xl overflow-hidden border border-[#2F64FF]/15">
        <div className="grid grid-cols-3 text-[9px] text-slate-500 uppercase tracking-wider px-3 py-1.5 bg-[#071030]/60">
          <span>Método</span><span>Endpoint</span><span>Latencia</span>
        </div>
        {[
          { method: "GET",    path: "/clientes",      latency: "42ms",  cls: "text-[#7EB5FF]" },
          { method: "POST",   path: "/pedidos",       latency: "58ms",  cls: "text-emerald-300" },
          { method: "PATCH",  path: "/inventario",    latency: "35ms",  cls: "text-amber-300" },
          { method: "DELETE", path: "/sesiones/{id}", latency: "28ms",  cls: "text-red-300" },
        ].map((r) => (
          <div key={r.path} className="grid grid-cols-3 px-3 py-2 border-t border-[#2F64FF]/10 hover:bg-[#2F64FF]/5 transition-colors">
            <span className={`text-[10px] font-semibold ${r.cls}`}>{r.method}</span>
            <span className="text-[10px] text-slate-300 font-mono truncate pr-2">{r.path}</span>
            <span className="text-[10px] text-slate-400 font-mono">{r.latency}</span>
          </div>
        ))}
      </div>

      {/* Throughput bars */}
      <div className="space-y-2">
        <div className="text-[9px] text-slate-500 uppercase tracking-wider">Sistemas conectados</div>
        {[
          { name: "ERP (SAP)",    pct: 82, cls: "from-[#2F64FF] to-[#6B9FFF]" },
          { name: "CRM (HubSpot)", pct: 68, cls: "from-sky-500 to-sky-400" },
          { name: "Pagos (Stripe)", pct: 45, cls: "from-emerald-500 to-emerald-400" },
        ].map((m) => (
          <div key={m.name} className="flex items-center gap-2">
            <div className="text-[10px] text-slate-400 w-28 shrink-0">{m.name}</div>
            <div className="flex-1 bg-[#0d2060]/60 rounded-full h-1.5">
              <div className={`bg-gradient-to-r ${m.cls} h-1.5 rounded-full`} style={{ width: `${m.pct}%` }} />
            </div>
            <div className="text-[9px] text-slate-400 font-mono w-6 text-right">{m.pct}%</div>
          </div>
        ))}
      </div>

      {/* Uptime tracker */}
      <div className="flex items-center gap-3 p-3 bg-[#0d1f50]/40 rounded-xl border border-[#2F64FF]/10">
        <div className="flex-1">
          <div className="flex justify-between text-[10px] mb-1.5">
            <span className="text-slate-500 font-medium">Uptime (últimos 90 días)</span>
            <span className="text-emerald-400 font-semibold">99.97%</span>
          </div>
          <div className="w-full bg-[#0d2060]/60 rounded-full h-1.5">
            <div
              className="bg-gradient-to-r from-[#2F64FF] to-emerald-400 h-1.5 rounded-full"
              style={{ width: "99.97%" }}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ─── Main component ───────────────────────────────────────────────────────────
export default function ApiIntegrationBlock() {
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

        {/* ── Header ── */}
        <motion.div
          className="text-center mb-16 lg:mb-20 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#2F64FF]/40 bg-[#2F64FF]/10 text-[#7EB5FF] text-xs font-bold tracking-[0.12em] uppercase mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2F64FF] animate-pulse" />
            Arquitectura API
          </div>

          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white leading-tight mb-5">
            APIs listas para
            <span className="font-semibold text-[#7EB5FF] block mt-1">
              producción real
            </span>
          </h2>

          <p className="text-lg text-slate-400 font-light leading-relaxed">
            No solo exponemos datos — diseñamos contratos robustos, seguros y bien documentados
            que permiten a tus equipos e integraciones trabajar con certeza total.
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
                  transition={{ duration: 0.55, delay: 0.15 + idx * 0.09 }}
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

          {/* Right – mockup */}
          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            <APISchemasMock />
            <div className="absolute -inset-6 bg-[#2F64FF]/15 rounded-3xl blur-3xl -z-10 scale-90" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
