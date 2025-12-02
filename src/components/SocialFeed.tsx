import { useMemo } from "react";
import { useI18n } from "@/lib/i18n";

interface SocialEmbed {
  id: string;
  platform: string;
  embedHtml?: string | null;
  url?: string | null;
}

const SocialEmbedCard = ({
  embed,
  placeholder,
  openPostLabel,
}: {
  embed: SocialEmbed;
  placeholder: string;
  openPostLabel: string;
}) => {
  const sanitizedHtml = embed.embedHtml?.trim();
  const hasEmbed = Boolean(sanitizedHtml);

  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-[0_14px_40px_rgba(15,118,210,0.08)] transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,118,210,0.12)]">
      <div className="relative w-full overflow-hidden rounded-xl border border-slate-100 bg-slate-50 h-[500px] sm:h-[540px] lg:h-[557px]">
        {hasEmbed ? (
          <div
            className="h-full w-full"
            aria-label={openPostLabel}
            role="presentation"
            // Replace the sanitized HTML below with the embed code from each platform.
            // Ensure the value assigned to `embed.embedHtml` is sanitized before rendering.
            dangerouslySetInnerHTML={{ __html: sanitizedHtml as string }}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-6 text-center text-sm text-slate-500">
            <p>{placeholder}</p>
            {embed.url && (
              <a
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-[#2F64FF] transition hover:border-[#2F64FF] hover:text-[#1E3ECC]"
                href={embed.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {openPostLabel}
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
};

export default function SocialFeed() {
  const { t } = useI18n();

  // Copy for this section lives in src/locales/* under the `socialFeed` namespace.
  const embeds = useMemo<SocialEmbed[]>(
    () => [
      {
        id: "linkedin-intro",
        platform: "LinkedIn",
        // Sanitized LinkedIn embed using the official iframe endpoint.
        embedHtml:
          '<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:activity:7399999460476575744" title="LinkedIn post" aria-label="LinkedIn post" allowfullscreen scrolling="no" style="width:100%;height:100%;border:none;overflow:hidden;"></iframe>',
        url: "https://www.linkedin.com/company/elaris-digital-solutions/",
      },
      {
        id: "instagram-team",
        platform: "Instagram",
        // Sanitized Instagram embed converted to iframe for responsive rendering.
        embedHtml:
          '<iframe src="https://www.instagram.com/p/DRmqkyFDfQ2/embed" title="Instagram post" aria-label="Instagram post" allowtransparency="true" allow="encrypted-media" loading="lazy" scrolling="no" style="width:100%;height:100%;border:none;overflow:hidden;"></iframe>',
        url: "https://www.instagram.com/elarisdigitalsolutions/",
      },
      {
        id: "instagram-innovation",
        platform: "Instagram",
        // Sanitized Instagram embed converted to iframe for responsive rendering.
        embedHtml:
          '<iframe src="https://www.instagram.com/p/DQ-j6QYkdue/embed" title="Instagram post" aria-label="Instagram post" allowtransparency="true" allow="encrypted-media" loading="lazy" scrolling="no" style="width:100%;height:100%;border:none;overflow:hidden;"></iframe>',
        url: "https://www.instagram.com/elarisdigitalsolutions/",
      },
    ],
    []
  );

  return (
    <section id="social-feed" className="py-20 sm:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight drop-shadow-lg sm:text-4xl lg:text-5xl">
            <span className="text-slate-900">{t("socialFeed.titleNormal")}</span>
            <span style={{ color: "#2F64FF" }}>{t("socialFeed.titleAccent")}</span>
          </h2>
          <p className="mt-6 text-base text-slate-600 sm:text-lg">
            {t("socialFeed.description")}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {embeds.map((embed) => (
            <SocialEmbedCard
              key={embed.id}
              embed={embed}
              placeholder={t("socialFeed.embedPlaceholder", { platform: embed.platform })}
              openPostLabel={t("socialFeed.openPost", { platform: embed.platform })}
            />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <a
            href="https://www.instagram.com/elarisdigitalsolutions/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-[#2F64FF] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#1E3ECC] hover:shadow-xl sm:text-base"
          >
            {t("socialFeed.cta")}
          </a>
        </div>
      </div>
    </section>
  );
}
