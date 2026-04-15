import { useMemo } from "react";
import SyntheticHero from "@/components/ui/synthetic-hero";
import { useI18n } from "@/lib/i18n";
import { generateEventId, getFbCookies } from "@/lib/meta";

const trackHeroCTA = (contentName: string) => {
  const isMainRoute = window.location.pathname === '/' || window.location.pathname.startsWith('/es');
  const pixelId = isMainRoute ? '1294573795867367' : '868251342283921';
  const eventId = generateEventId();
  const { fbp, fbc } = getFbCookies();

  try {
    (window as any).fbq?.('trackSingle', pixelId, 'ViewContent', {
      content_name: contentName,
      eventID: eventId,
    });

    fetch("/api/meta-event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_name: "ViewContent",
        pixel_id: pixelId,
        event_id: eventId,
        fbp,
        fbc,
        page_url: window.location.href,
      }),
    }).catch(() => {});
  } catch { /* no-op */ }
};

const Hero = () => {
  const { t, tArray } = useI18n();

  const consolePhrases = useMemo(() => {
    return tArray("hero.consolePhrases").map((phrase) => phrase.trim()).filter(Boolean);
  }, [tArray]);

  const consolePrefixPhrase = useMemo(() => t("hero.consolePrefixPhrase"), [t]);

  const ctaButtons = useMemo(() => [
    { text: t("hero.ctas.primary"), href: "#portafolio", primary: true, onClick: () => trackHeroCTA("iniciar_proyecto") },
    { text: t("hero.ctas.secondary"), href: "#contacto", onClick: () => trackHeroCTA("contactanos") },
  ], [t]);

  return (
    <SyntheticHero
      title={t("hero.title")}
      description={t("hero.description")}
      badgeLabel={t("hero.badgeLabel")}
      badgeText={t("hero.badgeText")}
      ctaButtons={ctaButtons}
      consolePhrases={consolePhrases}
      consolePrefixPhrase={consolePrefixPhrase}
    />
  );
};

export default Hero;
