import { useMemo } from "react";
import SyntheticHero from "@/components/ui/synthetic-hero";
import { useI18n } from "@/lib/i18n";

const Hero = () => {
  const { t, tArray } = useI18n();

  const consolePhrases = useMemo(() => {
    return tArray("hero.consolePhrases").map((phrase) => phrase.trim()).filter(Boolean);
  }, [tArray]);

  const consolePrefixPhrase = useMemo(() => t("hero.consolePrefixPhrase"), [t]);

  const ctaButtons = useMemo(() => [
    { text: t("hero.ctas.primary"), href: "#portafolio", primary: true },
    { text: t("hero.ctas.secondary"), href: "#contacto" },
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
