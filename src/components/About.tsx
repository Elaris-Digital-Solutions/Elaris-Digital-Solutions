import React from "react";
import { TeamSection } from "@/components/ui/team-section";
import { useI18n } from "@/lib/i18n";

const teamMembers = [
  {
    name: "Jorge García",
    designation: "Co-Founder",
    imageSrc: "/images/team/jorge.webp",
  },
  {
    name: "Fabrizio Bussalleu",
    designation: "Co-Founder",
    imageSrc: "/images/team/fabrizio.webp",
  },
  {
    name: "Alejandro Colfer",
    designation: "Co-Founder",
    imageSrc: "/images/team/colfer.webp",
  },
];

export default function About() {
  const { t } = useI18n();

  return (
    <TeamSection
      id="nosotros"
      className="bg-white"
      headlinePrefix={t("about.badge").toUpperCase()}
      title={t("about.title")}
      description={t("about.description")}
      members={teamMembers}
      logo={null}
      registerLink={undefined}
      registerLabel={undefined}
      websiteLabel="elarisdigitalsolutions.com"
    />
  );
}
