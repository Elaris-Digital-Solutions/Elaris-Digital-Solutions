"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { I18nProvider } from "@/lib/i18n";

const PIXEL_IDS = ["1294573795867367", "868251342283921"] as const;

const initFbScript = () => {
  if (typeof window === "undefined") return;

  const f = window as any;
  if (f.fbq && f.fbq.version) return;

  const b = document;
  const e = "script";
  const v = "https://connect.facebook.net/en_US/fbevents.js";

  const n: any = (f.fbq = function () {
    n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
  });
  if (!f._fbq) f._fbq = n;
  n.push = n;
  n.loaded = true;
  n.version = "2.0";
  n.queue = [];
  const t = b.createElement(e) as HTMLScriptElement;
  t.async = true;
  t.src = v;
  const s = b.getElementsByTagName(e)[0];
  if (s && s.parentNode) s.parentNode.insertBefore(t, s);
};

// ── Google Analytics 4 ────────────────────────────────────────────────
// Mismo patrón que MetaPixelTracker: el script se inyecta una vez y el
// page_view se dispara manualmente por cambio de ruta. `send_page_view:
// false` evita el doble conteo con la medición mejorada de GA4 (que en
// la propiedad tiene desactivado el sub-toggle de "cambios de página
// según el historial del navegador").
// El ID de medición es público: viaja en el bundle del cliente.
const GA_ID = "G-81YGZVKMLG";

const initGaScript = () => {
  if (typeof window === "undefined") return;
  if (document.getElementById("ga4-lib")) return;

  const w = window as any;
  w.dataLayer = w.dataLayer || [];
  // gtag debe empujar `arguments` tal cual: la librería lo espera así.
  function gtag(...args: unknown[]) {
    w.dataLayer.push(args);
  }
  w.gtag = gtag;

  gtag("js", new Date());
  gtag("config", GA_ID, { send_page_view: false });

  const script = document.createElement("script");
  script.id = "ga4-lib";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
};

const GaTracker = () => {
  const pathname = usePathname();

  useEffect(() => {
    initGaScript();
  }, []);

  useEffect(() => {
    const w = window as any;
    if (!w?.gtag) return;
    w.gtag("event", "page_view", {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname]);

  return null;
};

const MetaPixelTracker = () => {
  const pathname = usePathname();

  // ONE-TIME: inject script + init both pixels on mount
  useEffect(() => {
    initFbScript();
    const f = window as any;
    if (f && f.fbq) {
      PIXEL_IDS.forEach((id) => f.fbq("init", id));
    }
  }, []);

  // PER-ROUTE: fire PageView on every navigation
  useEffect(() => {
    const f = window as any;
    if (f && f.fbq) {
      PIXEL_IDS.forEach((id) => f.fbq("trackSingle", id, "PageView"));
    }
  }, [pathname]);

  return null;
};

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      <MetaPixelTracker />
      <GaTracker />
      {children}
    </I18nProvider>
  );
}
