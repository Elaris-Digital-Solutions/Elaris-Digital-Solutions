import React, { useState, useRef, useEffect, useMemo, useCallback, lazy, Suspense } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

const MatrixRain = lazy(() => import("./ui/matrix-code"));

export default function Contact() {
  const { t, tArray } = useI18n();
  const addressLines = useMemo(() => tArray("contact.info.addressLines"), [tArray]);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");

  const phoneNumber = "51944228807";
  const formRef = useRef<HTMLDivElement | null>(null);
  const contactInfoRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [mapHeight, setMapHeight] = useState<number | null>(null);
  // keep map height in sync so the map grows upward toward the contact card (desktop only)
  const syncMapHeight = useCallback((height: number | null) => setMapHeight(height), []);
  useSyncMapHeight(contactInfoRef, mapRef, syncMapHeight);
  const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const composedMessage = t("contact.form.whatsappTemplate", {
      fullName,
      email,
      reason,
      message,
    });
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(composedMessage)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  }, [email, fullName, message, reason, t]);

  const contactItems = useMemo(
    () => [
      {
        icon: Mail,
        label: t("contact.info.email"),
        value: "contact@elarisdigitalsolutions.com",
      },
      {
        icon: Phone,
        label: t("contact.info.phone"),
        value: "+51 987 450 340",
      },
      {
        icon: MapPin,
        label: t("contact.info.office"),
        value: addressLines,
      },
    ],
    [addressLines, t]
  );

  return (
    <section
      id="contacto"
      className="relative overflow-hidden py-20 sm:py-32 site-dark-section text-white"
      style={{ backgroundColor: "#030E2C" }}
    >
      <Suspense fallback={null}>
        <MatrixRain className="z-0" />
      </Suspense>
      <div className="container relative z-[1] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold tracking-tight drop-shadow-lg sm:text-4xl lg:text-5xl">
            <span className="text-white">{t("contact.titleNormal")}</span>
            <span style={{ color: '#2F64FF' }}>{t("contact.titleAccent")}</span>
          </h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto mt-4">
              {t("contact.description")}
            </p>
        </div>

        <div className="mt-12 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: form */}
            <div className="relative z-[1]" ref={formRef}>
              <div className="rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">{t("contact.form.fullNameLabel")}</label>
                    <input
                      type="text"
                      name="name"
                      placeholder={t("contact.form.fullNamePlaceholder")}
                      className="w-full rounded-md bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-[#2F64FF]/40"
                      value={fullName}
                      onChange={(event) => setFullName(event.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">{t("contact.form.emailLabel")}</label>
                    <input
                      type="email"
                      name="email"
                      placeholder={t("contact.form.emailPlaceholder")}
                      className="w-full rounded-md bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-[#2F64FF]/40"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">{t("contact.form.reasonLabel")}</label>
                      <input
                        type="text"
                        name="reason"
                        placeholder={t("contact.form.reasonPlaceholder")}
                        className="w-full rounded-md bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-[#2F64FF]/40"
                        value={reason}
                        onChange={(event) => setReason(event.target.value)}
                        required
                      />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">{t("contact.form.messageLabel")}</label>
                      <textarea
                        name="message"
                        rows={6}
                        placeholder={t("contact.form.messagePlaceholder")}
                        className="w-full rounded-md bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-[#2F64FF]/40"
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                        required
                      />
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-[#2F64FF] px-6 py-3 text-white font-semibold shadow-sm hover:bg-[#2553e6] transition-colors"
                      onClick={() => (window as any).fbq('track', 'Lead')}
                    >
                      {t("common.buttons.sendMessage")}
                    </button>
                    <p className="mt-3 text-center text-sm text-white/80">
                      {t("contact.form.responseTime")}
                    </p>
                  </div>
                </form>
              </div>
            </div>

            {/* Right: contact info + map */}
            <div className="relative z-[1] flex flex-col">
              <div ref={contactInfoRef} className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <h3 className="text-lg font-semibold text-white">{t("contact.info.title")}</h3>
                <ul className="mt-4 space-y-4 text-sm">
                  {contactItems.map((item) => (
                    <li key={item.label} className="flex items-start gap-3">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-[#2F64FF]/20 text-[#2F64FF]">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-white/90">{item.label}</div>
                        <div className="font-semibold">
                          {Array.isArray(item.value)
                            ? item.value.map((line, lineIndex) => (
                                <React.Fragment key={`${line}-${lineIndex}`}>
                                  {line}
                                  {lineIndex < item.value.length - 1 && <br />}
                                </React.Fragment>
                              ))
                            : item.value}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className="mt-6 w-full bg-[#2F64FF] text-white hover:bg-[#2553e6] transition-colors"
                  onClick={() => (window as any).fbq('track', 'Schedule')}
                >
                  <a
                    href="https://calendly.com/contact-elarisdigitalsolutions/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("hero.ctas.secondary")}
                  </a>
                </Button>
              </div>

              <div ref={mapRef} className="rounded-xl border border-white/10 bg-white/5 overflow-hidden mt-6 lg:mt-auto">
                <iframe
                  title={t("contact.mapTitle")}
                  src="https://www.google.com/maps?q=Jr.+Jeronimo+Aliaga+Norte+595+Santiago+de+Surco&output=embed"
                  className="w-full border-0"
                  style={{ height: mapHeight ? `${mapHeight}px` : undefined, minHeight: mapHeight ? undefined : '16rem' }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Measure form height and update map height on desktop
function useSyncMapHeight(
  contactRef: React.RefObject<HTMLDivElement>,
  mapRef: React.RefObject<HTMLDivElement>,
  setMapHeight: (h: number | null) => void,
) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const GAP_PX = 12; // small visual gap between contact card and map

    const measure = () => {
      const contactEl = contactRef.current;
      const mapEl = mapRef.current;
      if (!contactEl || !mapEl) {
        setMapHeight(null);
        return;
      }

      const contactRect = contactEl.getBoundingClientRect();
      const mapRect = mapEl.getBoundingClientRect();

      if (window.innerWidth >= 1024) {
        const currentBottom = Math.round(mapRect.bottom);
        const desiredTop = Math.round(contactRect.bottom + GAP_PX);
        const newHeight = currentBottom - desiredTop;

        if (newHeight > 0 && newHeight !== mapEl.offsetHeight) {
          setMapHeight(newHeight);
        } else {
          // if measurement is invalid, clear and let CSS fallback
          setMapHeight(null);
        }
      } else {
        setMapHeight(null);
      }
    };

    const rafId = requestAnimationFrame(measure);
    window.addEventListener('resize', measure);
    window.addEventListener('orientationchange', measure);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', measure);
      window.removeEventListener('orientationchange', measure);
    };
  }, [contactRef, mapRef, setMapHeight]);
}
