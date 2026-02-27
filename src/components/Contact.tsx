import React, { useState, useRef, useMemo, useCallback } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
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

    const composedMessage = t("contact.form.whatsappTemplate", {
      fullName,
      email,
      message: "",
    });
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(composedMessage)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  }, [email, fullName, t]);

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
        value: "+51 973 663 807",
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
      className="relative overflow-hidden py-20 sm:py-32"
      style={{ backgroundColor: "#ffffff" }}
    >
      {/* Same NeuralNoise as Hero — inherits its blue palette naturally */}
      <div className="absolute inset-0 overflow-hidden [&_canvas]:!w-full [&_canvas]:!h-full">
        <NeuralNoise opacity={0.8} pointerStrength={1.2} timeScale={0.5} fixedScrollProgress={0} className="absolute inset-0" />
      </div>

      <div className="container relative z-[1] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-slate-900">
            <span>{t("contact.titleNormal")}</span>
            <span style={{ color: "#2F64FF" }}>{t("contact.titleAccent")}</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto mt-4">
            {t("contact.description")}
          </p>
        </div>

        <div className="mt-12 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            {/* Left: form */}
            <div className="relative z-[1] h-full" ref={formRef}>
              <div className="rounded-xl border border-black/8 bg-white/70 p-8 backdrop-blur-md shadow-sm h-full">
                <form className="space-y-4 h-full flex flex-col" onSubmit={handleSubmit}>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">{t("contact.form.fullNameLabel")}</label>
                      <input
                        type="text"
                        name="name"
                        placeholder={t("contact.form.fullNamePlaceholder")}
                        className="w-full rounded-md bg-white/80 border border-black/10 px-4 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2F64FF]/40"
                        value={fullName}
                        onChange={(event) => setFullName(event.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">{t("contact.form.emailLabel")}</label>
                      <input
                        type="email"
                        name="email"
                        placeholder={t("contact.form.emailPlaceholder")}
                        className="w-full rounded-md bg-white/80 border border-black/10 px-4 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2F64FF]/40"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="mt-auto pt-16">
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-[#2F64FF] px-6 py-3 text-white font-semibold shadow-sm hover:bg-[#2553e6] transition-colors"
                      onClick={() => (window as any).fbq('track', 'Lead')}
                    >
                      {t("common.buttons.sendMessage")}
                    </button>
                    <p className="mt-2 text-center text-sm text-slate-500">
                      {t("contact.form.responseTime")}
                    </p>
                  </div>
                </form>
              </div>
            </div>

            {/* Right: contact info + map */}
            <div className="relative z-[1] flex flex-col h-full">
              <div ref={contactInfoRef} className="rounded-xl border border-black/8 bg-white/70 p-6 backdrop-blur-md shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">{t("contact.info.title")}</h3>
                <ul className="mt-4 space-y-4 text-sm">
                  {contactItems.map((item) => (
                    <li key={item.label} className="flex items-start gap-3">
                      <div className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[#2F64FF]/10 text-[#2F64FF] shrink-0">
                        <item.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-slate-500 text-xs uppercase tracking-wider mb-0.5">{item.label}</div>
                        <div className="font-semibold text-slate-900 text-sm">
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
              </div>

              {/* Map */}
              <div className="rounded-xl border border-black/8 bg-white/70 overflow-hidden mt-3 flex-1 min-h-[200px] relative shadow-sm">
                <iframe
                  title={t("contact.mapTitle")}
                  src="https://www.google.com/maps?q=Jr.+Jeronimo+Aliaga+Norte+595+Santiago+de+Surco&output=embed"
                  className="absolute inset-0 w-full h-full border-0"
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
