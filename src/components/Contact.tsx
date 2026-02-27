import React, { useState, useRef, useMemo, useCallback } from "react";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { NeuralNoise } from "@/components/ui/neural-noise-cursor";

export default function Contact() {
  const { t, tArray } = useI18n();
  const addressLines = useMemo(() => tArray("contact.info.addressLines"), [tArray]);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const phoneNumber = "51973663807";
  const formRef = useRef<HTMLDivElement | null>(null);
  const contactInfoRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);

  const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const composedMessage = t("contact.form.whatsappTemplate", { fullName, email, message: "" });
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(composedMessage)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }, [email, fullName, t]);

  const contactItems = useMemo(
    () => [
      { icon: Mail, label: t("contact.info.email"), value: "contact@elarisdigitalsolutions.com" },
      { icon: Phone, label: t("contact.info.phone"), value: "+51 973 663 807" },
      { icon: MapPin, label: t("contact.info.office"), value: addressLines },
    ],
    [addressLines, t]
  );

  return (
    <section
      id="contacto"
      className="relative overflow-hidden py-24 sm:py-36"
      style={{ backgroundColor: "#ffffff" }}
    >
      {/* NeuralNoise locked to hero colours */}
      <div className="absolute inset-0 overflow-hidden [&_canvas]:!w-full [&_canvas]:!h-full">
        <NeuralNoise opacity={0.8} pointerStrength={1.2} timeScale={0.5} fixedScrollProgress={0} className="absolute inset-0" />
      </div>

      <div className="container relative z-[1] mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

        {/* Header */}
        <div className="mb-16 max-w-xl">
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl leading-tight">
            {t("contact.titleNormal")}
            <span className="text-[#2F64FF]">{t("contact.titleAccent")}</span>
          </h2>
          <p className="mt-4 text-lg text-slate-500 leading-relaxed">
            {t("contact.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">

          {/* Left — form (3/5 width) */}
          <div className="lg:col-span-3 mt-0 self-start" ref={formRef}>
            <form className="space-y-6" onSubmit={handleSubmit}>

              {/* Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
                  {t("contact.form.fullNameLabel")}
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder={t("contact.form.fullNamePlaceholder")}
                  className="w-full bg-transparent border-b border-slate-200 pb-3 text-slate-900 placeholder:text-slate-300 text-[1.05rem] focus:outline-none focus:border-[#2F64FF] transition-colors"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
                  {t("contact.form.emailLabel")}
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder={t("contact.form.emailPlaceholder")}
                  className="w-full bg-transparent border-b border-slate-200 pb-3 text-slate-900 placeholder:text-slate-300 text-[1.05rem] focus:outline-none focus:border-[#2F64FF] transition-colors"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Submit */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="group inline-flex items-center gap-2 rounded-full bg-[#2F64FF] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(47,100,255,0.3)] transition-all hover:bg-[#2553e6] hover:shadow-[0_12px_32px_rgba(47,100,255,0.4)] hover:-translate-y-0.5"
                  onClick={() => (window as any).fbq?.('track', 'Lead')}
                >
                  {t("common.buttons.sendMessage")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
                <p className="mt-3 text-sm text-slate-400">{t("contact.form.responseTime")}</p>
              </div>
            </form>
          </div>

          {/* Right — contact info + map (2/5 width) */}
          <div className="lg:col-span-2 space-y-10" ref={contactInfoRef}>

            {/* Contact items — no panel, pure text with icon */}
            <div className="space-y-6">
              {contactItems.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#2F64FF]/8 text-[#2F64FF]">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[0.7rem] font-semibold uppercase tracking-widest text-slate-400 mb-0.5">{item.label}</p>
                    <div className="text-sm font-medium text-slate-800 leading-snug">
                      {Array.isArray(item.value)
                        ? item.value.map((line, i) => (
                          <React.Fragment key={`${line}-${i}`}>
                            {line}{i < item.value.length - 1 && <br />}
                          </React.Fragment>
                        ))
                        : item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Map — slightly rounded, no border */}
            <div ref={mapRef} className="overflow-hidden rounded-2xl shadow-[0_8px_32px_rgba(15,23,42,0.08)] aspect-[4/3]">
              <iframe
                title={t("contact.mapTitle")}
                src="https://www.google.com/maps?q=Jr.+Jeronimo+Aliaga+Norte+595+Santiago+de+Surco&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
