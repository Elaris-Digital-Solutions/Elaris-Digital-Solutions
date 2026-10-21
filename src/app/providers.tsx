"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { I18nProvider } from "@/lib/i18n";

const PIXEL_IDS = ["1294573795867367", "868251342283921"] as const;

// ── Exclusión de tráfico interno ──────────────────────────────────────
// Los tres socios navegan su propio sitio a diario. Con 243 sesiones en 74
// días, esas visitas no son ruido de fondo: mueven los promedios.
//
// GA4 trae un filtro por IP, pero resuelve la mitad del problema. No sirve
// para Clarity, que seguiría grabando cada sesión del equipo, y se cae solo
// el día que el proveedor rota la IP doméstica, que en Perú es lo habitual.
//
// Esto marca el navegador en vez de la red: visita
// `?elaris_interno=1` una vez por dispositivo y desde entonces no se carga
// ninguna medición ahí, da igual la IP, la red o el equipo. Se revierte con
// `?elaris_interno=0`.
//
// Todo va envuelto en try/catch: en ventana privada o con las cookies
// bloqueadas, `localStorage` lanza al leerlo, y una medición que falla nunca
// debe tumbar la página.
const INTERNAL_KEY = "elaris_interno";
const INTERNAL_PARAM = "elaris_interno";

const syncInternalFlag = (): void => {
  try {
    const value = new URLSearchParams(window.location.search).get(INTERNAL_PARAM);
    if (value === "1") window.localStorage.setItem(INTERNAL_KEY, "1");
    if (value === "0") window.localStorage.removeItem(INTERNAL_KEY);
  } catch {
    /* Sin almacenamiento disponible no hay marca que guardar. */
  }
};

const isInternalTraffic = (): boolean => {
  try {
    return window.localStorage.getItem(INTERNAL_KEY) === "1";
  } catch {
    return false;
  }
};

const initFbScript = () => {
  if (typeof window === "undefined") return;
  if (isInternalTraffic()) return;

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

// Solo se mide el dominio real. Netlify publica cada deploy en una URL propia
// (<id>--elaris-digital-solutions.netlify.app), así que sin este filtro cada
// revisión previa y cada prueba en local entran en la propiedad como sesiones
// de usuario. Para depurar GA en local, añade "localhost" aquí de forma
// temporal — no lo dejes puesto en un commit.
const GA_HOSTS = ["elarisdigitalsolutions.com", "www.elarisdigitalsolutions.com"];

// ── Microsoft Clarity ─────────────────────────────────────────────────
// Mapas de calor y grabación de sesiones. Mismo guardia de host que GA4:
// ni localhost ni las URLs de revisión de Netlify generan grabaciones.
//
// El ID va por variable de entorno y no incrustado como el de GA4 para que
// se pueda activar desde Netlify sin tocar código. Si no está definida, todo
// esto es un no-op y el script no se descarga: la página no paga nada por
// tener la integración preparada.
//
// Nota sobre volumen: con el tráfico actual un mapa de calor agrega
// demasiado poco para ser fiable. Lo que sí rinde desde el primer día son
// las grabaciones vistas de a una, y para eso existe `tagClaritySession`
// más abajo.
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

const initClarityScript = () => {
  if (typeof window === "undefined") return;
  if (isInternalTraffic()) return;
  if (!CLARITY_ID) return;
  if (!GA_HOSTS.includes(window.location.hostname)) return;
  if (document.getElementById("clarity-lib")) return;

  const w = window as any;
  // Cola de comandos: Clarity acepta llamadas antes de que su librería
  // termine de cargar y las reproduce al inicializarse.
  w.clarity =
    w.clarity ||
    function () {
      // eslint-disable-next-line prefer-rest-params
      (w.clarity.q = w.clarity.q || []).push(arguments);
    };

  const script = document.createElement("script");
  script.id = "clarity-lib";
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${CLARITY_ID}`;
  document.head.appendChild(script);
};

const InternalFlagSync = () => {
  // En el cuerpo y no en un efecto: los efectos de los hijos corren antes
  // que los del padre, así que con useEffect la marca llegaría tarde y el
  // primer page_view igual se enviaría.
  if (typeof window !== "undefined") syncInternalFlag();
  return null;
};

const ClarityTracker = () => {
  useEffect(() => {
    initClarityScript();
  }, []);

  return null;
};

const initGaScript = () => {
  if (typeof window === "undefined") return;
  if (isInternalTraffic()) return;
  if (!GA_HOSTS.includes(window.location.hostname)) return;
  if (document.getElementById("ga4-lib")) return;

  const w = window as any;
  w.dataLayer = w.dataLayer || [];
  // OJO: gtag.js solo interpreta como comando lo que sea un objeto
  // `arguments`. Un array normal —lo que produce un rest param— se descarta
  // en silencio: la librería carga e inicializa, pero no envía ningún hit.
  // Por eso el cuerpo empuja `arguments` tal cual y la firma se declara
  // aparte con un cast, en vez de usar `(...args) => push(args)`.
  function gtagImpl() {
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer.push(arguments);
  }
  const gtag = gtagImpl as (...args: unknown[]) => void;
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
      <InternalFlagSync />
      <MetaPixelTracker />
      <GaTracker />
      <ClarityTracker />
      {children}
    </I18nProvider>
  );
}
