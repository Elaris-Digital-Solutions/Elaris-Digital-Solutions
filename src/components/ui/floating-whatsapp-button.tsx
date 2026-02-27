"use client";

import React from "react";
import { X } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const PHONE_NUMBER = "51973663807";

const WhatsAppGlyph = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488" />
  </svg>
);

const FloatingWhatsappButton: React.FC = () => {
  const { t } = useI18n();
  const [isHiddenByMobileMenu, setIsHiddenByMobileMenu] = React.useState(false);
  const [isWidgetOpen, setIsWidgetOpen] = React.useState(true);
  const defaultMessage = t("floatingWhatsapp.defaultMessage");
  const href = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(defaultMessage)}`;

  React.useEffect(() => {
    const handler = (event: Event) => {
      const customEvent = event as CustomEvent<{ open?: boolean }>;
      setIsHiddenByMobileMenu(Boolean(customEvent.detail?.open));
    };

    window.addEventListener("elaris:mobile-menu-visibility", handler as EventListener);
    return () => {
      window.removeEventListener("elaris:mobile-menu-visibility", handler as EventListener);
    };
  }, []);

  React.useEffect(() => {
    if (isHiddenByMobileMenu) {
      setIsWidgetOpen(false);
    }
  }, [isHiddenByMobileMenu]);

  const trackLead = () => {
    try {
      (window as any).fbq("track", "Lead");
    } catch {
      // no-op
    }
  };

  const containerVisibilityClass = isHiddenByMobileMenu
    ? "translate-y-3 scale-95 opacity-0 pointer-events-none"
    : "translate-y-0 scale-100 opacity-100";

  return (
    <div className={`fixed bottom-4 right-5 md:bottom-6 md:right-7 z-[60] transition-all duration-300 ${containerVisibilityClass}`}>
      <div className="flex w-[min(84vw,300px)] flex-col items-end gap-2.5 md:w-[300px]">
        {isWidgetOpen && (
          <div className="w-full overflow-hidden rounded-2xl border border-[#25D366]/25 bg-white shadow-[0_16px_40px_rgba(0,0,0,0.18)]">
            <div className="flex items-center justify-between bg-[#07983f] px-3.5 py-2.5 text-white">
              <div className="flex items-center gap-2.5">
                <div className="relative h-10 w-10 rounded-full border border-white/80 bg-black/30">
                  <img
                    src="/assets/whatsapp-pfp.png"
                    alt={t("floatingWhatsapp.agentName")}
                    className="h-full w-full rounded-full object-cover"
                    loading="lazy"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#07983f] bg-[#30d65e]" />
                </div>
                <div>
                  <p className="text-[0.92rem] font-semibold leading-tight">{t("floatingWhatsapp.agentName")}</p>
                  <p className="text-[0.82rem] text-white/90">{t("floatingWhatsapp.agentStatus")}</p>
                </div>
              </div>

              <button
                type="button"
                aria-label={t("floatingWhatsapp.closeLabel")}
                onClick={() => setIsWidgetOpen(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-2.5 p-3.5">
              <p className="rounded-xl bg-slate-100 p-3 text-[0.93rem] leading-relaxed text-slate-800">
                {t("floatingWhatsapp.welcomeMessage")}
              </p>

              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("floatingWhatsapp.ariaLabel")}
                onClick={trackLead}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#18c759] px-4 text-[1rem] font-semibold text-white shadow-[0_10px_24px_rgba(24,199,89,0.3)] transition-all duration-300 hover:bg-[#14b44f]"
              >
                <WhatsAppGlyph className="h-5 w-5" />
                {t("floatingWhatsapp.ctaLabel")}
              </a>
            </div>
          </div>
        )}

        <button
          type="button"
          aria-label={t("floatingWhatsapp.openLabel")}
          onClick={() => setIsWidgetOpen((prev) => !prev)}
          className="inline-flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-full border border-[#25D366]/50 bg-[#25D366] text-white shadow-[0_16px_36px_rgba(37,211,102,0.42)] backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:bg-[#20ba56] hover:shadow-[0_22px_56px_rgba(37,211,102,0.5)] focus:outline-none focus:ring-2 focus:ring-[#25D366]/80 md:h-14 md:w-14"
        >
          <WhatsAppGlyph className="h-6 w-6 md:h-7 md:w-7" />
        </button>
      </div>
    </div>
  );
};

export default FloatingWhatsappButton;
