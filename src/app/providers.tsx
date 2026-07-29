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
      {children}
    </I18nProvider>
  );
}
