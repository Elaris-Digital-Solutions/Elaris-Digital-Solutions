import { useMemo } from "react";
import SyntheticHero from "@/components/ui/synthetic-hero";
import { useI18n } from "@/lib/i18n";

const Hero = () => {
  const { t, tArray } = useI18n();
  const consolePhrases = useMemo(() => {
    const base = tArray("hero.consolePhrases").map((phrase) => phrase.trim()).filter(Boolean);
    const description = t("hero.description").trim();
    if (!description) {
      return base;
    }
    if (base.includes(description)) {
      return base;
    }
    return [...base, description];
  }, [t, tArray]);

  return (
    <SyntheticHero
      title={t("hero.title")}
      description={t("hero.description")}
      badgeLabel={t("hero.badgeLabel")}
      badgeText={t("hero.badgeText")}
      ctaButtons={[
        { text: t("hero.ctas.primary"), href: "#portafolio", primary: true },
        {
          text: "Contact",
          href: "#contacto",
        },
      ]}
      consolePhrases={consolePhrases}
    />
  );
};

export default Hero;
