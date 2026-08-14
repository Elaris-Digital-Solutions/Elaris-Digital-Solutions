"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import es from "@/locales/es.json";

type Member = {
  name: string;
  role: string;
  description: string;
  photo: string;
  initials: string;
  linkedin: string;
  /** Slug de su página en /equipo. */
  slug: string;
};

function MemberCard({ member, index }: { member: Member; index: number }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white px-6 py-8 text-center shadow-sm"
      initial={{ y: 24 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
    >
      {imgError ? (
        <div className="mb-5 flex h-[88px] w-[88px] items-center justify-center rounded-full border-[3px] border-transparent bg-brand-gradient text-2xl font-bold text-white">
          {member.initials}
        </div>
      ) : (
        <div className="mb-5 h-[88px] w-[88px] overflow-hidden rounded-full border-[3px] border-brand-gradient">
          <Image
            src={member.photo}
            alt={member.name}
            width={88}
            height={88}
            className="h-full w-full object-cover"
            onError={() => setImgError(true)}
          />
        </div>
      )}

      <h3 className="text-base font-bold text-slate-900">{member.name}</h3>
      <p className="mt-1 text-sm font-medium text-brand-gradient">{member.role}</p>
      <p className="mt-3 text-sm leading-relaxed text-slate-500">
        {member.description}
      </p>

      {/* Un solo destino desde el home: el perfil. El enlace a LinkedIn vive
          en la página de perfil, que es donde tiene contexto. */}
      <Link
        href={`/equipo/${member.slug}`}
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand-gradient px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0855FD] focus-visible:ring-offset-2"
      >
        Ver perfil
        <ArrowRight className="h-4 w-4" />
      </Link>
    </motion.div>
  );
}

const members = es.team.members as Member[];

export default function Team() {
  const { t } = useI18n();

  return (
    <section id="equipo" className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-12 text-center"
          initial={{ y: 24 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="mb-3 inline-block rounded-full bg-[#eff4ff] px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-gradient">
            {t("team.badge")}
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            {t("team.headingNormal")}
            <span className="text-brand-gradient">{t("team.headingAccent")}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600">
            {t("team.description")}
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
          {members.map((member, index) => (
            <MemberCard key={member.name} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
