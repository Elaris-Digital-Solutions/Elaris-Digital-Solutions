"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Package, Wifi } from "lucide-react";

/**
 * Ilustración de la página de CMMS: dos maquetas del sistema.
 *
 * Es contenido decorativo (`aria-hidden`): los datos son de ejemplo y todo lo
 * que comunican ya está escrito en "Qué incluye". Aun así los textos usan
 * `slate-600`/`slate-700` en vez de `slate-400`: aunque un lector de pantalla
 * no los anuncie, siguen siendo texto visible y deben leerse.
 */

const WORK_ORDERS = [
  { code: "OT-2041", name: "Lubricación Compresor A3", tech: "J. Torres", dot: "bg-blue-500" },
  { code: "OT-2042", name: "Cambio filtro Bomba H7", tech: "M. Quispe", dot: "bg-amber-500" },
  { code: "OT-2040", name: "Revisión cintas T2", tech: "R. Condori", dot: "bg-emerald-600" },
] as const;

const UPCOMING = [
  { asset: "Motor M5 — Revisión semestral", date: "15 mar", dot: "bg-blue-500" },
  { asset: "Generador G1 — Cambio de aceite", date: "18 mar", dot: "bg-amber-500" },
  { asset: "Transportador T3 — Alineación", date: "22 mar", dot: "bg-emerald-600" },
] as const;

// Tonos -600/-700: sobre los -500 originales el texto blanco se quedaba
// entre 2.1:1 y 3.8:1, por debajo del mínimo AA.
const SENSORS = [
  { name: "Temperatura", bg: "bg-red-600", text: "T°" },
  { name: "Vibración", bg: "bg-brand-gradient", text: "≈" },
  { name: "Presión", bg: "bg-emerald-700", text: "P" },
  { name: "Corriente", bg: "bg-amber-700", text: "I" },
] as const;

const ALERTS = [
  { txt: "Bomba H7 a 78 °C — orden de trabajo generada sola", dot: "bg-red-500" },
  { txt: "Vibración del Motor M5 dentro de rango normal", dot: "bg-emerald-600" },
  { txt: "Quedan 2 filtros 3M — reposición solicitada", dot: "bg-amber-500" },
] as const;

const WindowChrome = ({ label }: { label: string }) => (
  <div className="flex items-center gap-3 bg-[#071540] px-5 py-3.5">
    <div className="flex gap-1.5">
      <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
      <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
      <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
    </div>
    <span className="ml-2 text-xs font-light text-white/70">{label}</span>
  </div>
);

export default function CmmsMockups() {
  const reduceMotion = useReducedMotion();

  const reveal = (x: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, x },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true, amount: 0.2 },
          transition: { duration: 0.6, ease: "easeOut" as const },
        };

  return (
    <div className="grid gap-6 lg:grid-cols-2" aria-hidden="true">
      {/* ── Órdenes de trabajo ─────────────────────────────────────────── */}
      <motion.div
        className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_40px_rgba(7,21,64,0.08)]"
        {...reveal(-24)}
      >
        <WindowChrome label="Órdenes de trabajo · ELARIS CMMS" />
        <div className="bg-[#F0F4FF]/40 p-5">
          <div className="mb-5 flex items-center justify-between gap-1.5">
            {[
              { label: "Pendientes", value: "12", cls: "bg-amber-50 border-amber-200 text-amber-800" },
              { label: "En curso", value: "8", cls: "bg-blue-50 border-blue-200 text-blue-800" },
              { label: "Cerradas", value: "34", cls: "bg-emerald-50 border-emerald-200 text-emerald-800" },
            ].map((s) => (
              <div key={s.label} className={`flex-1 rounded-lg border px-3 py-2 text-center ${s.cls}`}>
                <p className="mb-0.5 text-base font-bold leading-none">{s.value}</p>
                <p className="text-[11px] font-medium">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="mb-4 space-y-2.5 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-slate-600">
              Órdenes activas
            </p>
            {WORK_ORDERS.map((row) => (
              <div key={row.code} className="flex items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2">
                  <span className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${row.dot}`} />
                  <span className="text-[11px] font-semibold text-[#071540]">{row.code}</span>
                  <span className="truncate text-[11px] text-slate-600">{row.name}</span>
                </div>
                <span className="flex-shrink-0 text-[11px] text-slate-600">{row.tech}</span>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-slate-600">
              Próximos mantenimientos programados
            </p>
            <div className="space-y-2">
              {UPCOMING.map((ev) => (
                <div key={ev.asset} className="flex items-center justify-between gap-2">
                  <span className="flex min-w-0 items-center gap-2">
                    <span className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${ev.dot}`} />
                    <span className="truncate text-[11px] text-slate-700">{ev.asset}</span>
                  </span>
                  <span className="flex-shrink-0 text-[11px] font-semibold text-brand-gradient">
                    {ev.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Sensores e inventario ──────────────────────────────────────── */}
      <motion.div
        className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_40px_rgba(7,21,64,0.08)]"
        {...reveal(24)}
      >
        <WindowChrome label="Sensores e inventario · ELARIS CMMS" />
        <div className="bg-[#F8FAFC] p-5">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs font-semibold text-slate-700">Sensores conectados</p>
            <span className="flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-800">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              12 activos
            </span>
          </div>

          <div className="mb-4 grid grid-cols-4 gap-2">
            {SENSORS.map((s) => (
              <div key={s.name} className="flex flex-col items-center gap-1.5">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.bg}`}>
                  <span className="text-xs font-bold text-white">{s.text}</span>
                </div>
                <span className="text-[10px] text-slate-600">{s.name}</span>
              </div>
            ))}
          </div>

          <div className="mb-3 space-y-2.5 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
              Alertas recientes
            </p>
            {ALERTS.map((row) => (
              <div key={row.txt} className="flex items-start gap-2">
                <span className={`mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full ${row.dot}`} />
                <span className="text-[11px] leading-tight text-slate-700">{row.txt}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm">
              <p className="mb-2.5 flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-slate-600">
                <Package className="h-3 w-3" />
                Repuestos críticos
              </p>
              {[
                { txt: "Filtro 3M — quedan 2", dot: "bg-amber-500" },
                { txt: "Rodamiento 6205 — quedan 5", dot: "bg-emerald-600" },
              ].map((item) => (
                <div key={item.txt} className="mb-1.5 flex items-center gap-1.5">
                  <span className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${item.dot}`} />
                  <span className="truncate text-[10px] text-slate-700">{item.txt}</span>
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm">
              <p className="mb-2.5 flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-slate-600">
                <Wifi className="h-3 w-3" />
                Estado del sistema
              </p>
              {[
                { txt: "Sistema administrativo: al día", dot: "bg-emerald-600" },
                { txt: "12 señales de planta activas", dot: "bg-emerald-600" },
                { txt: "4 técnicos en la app", dot: "bg-blue-500" },
              ].map((n) => (
                <div key={n.txt} className="mb-1.5 flex items-center gap-1.5">
                  <span className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${n.dot}`} />
                  <span className="text-[10px] leading-tight text-slate-700">{n.txt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
