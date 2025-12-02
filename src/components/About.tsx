import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { Github, Linkedin, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import SmartImage from "@/components/ui/smart-image";
import { useI18n } from "@/lib/i18n";

type TeamMember = {
  name: string;
  role: string;
  image: string;
  accent: string;
  focus?: string;
  socials: SocialLink[];
};

type SocialLink = {
  type: "linkedin" | "github";
  href: string;
  icon: LucideIcon;
};

type MobileSlide = {
  type: "group" | "member";
  image: string;
  focus: string;
  caption: string;
  duration: number;
  member?: TeamMember;
};

const groupImage =
  "/images/team/team.webp";

const groupFocus = "center 40%";

const team: TeamMember[] = [
  {
    name: "Jorge García",
    role: "Co-Founder",
    image: "/images/team/jorge.webp",
    accent: "from-cyan-500/60 via-blue-500/40 to-violet-500/60",
    focus: "center 10%",
    socials: [
      { type: "linkedin", href: "https://www.linkedin.com/in/jorge-garcia18/", icon: Linkedin },
      { type: "github", href: "https://github.com/JorgeGarcia005", icon: Github },
    ],
  },
  {
    name: "Fabrizio Bussalleu",
    role: "Co-Founder",
    image: "/images/team/fabrizio.webp",
    accent: "from-emerald-500/60 via-teal-500/40 to-blue-500/60",
    focus: "center 10%",
    socials: [
      { type: "linkedin", href: "https://www.linkedin.com/in/fabrizio-bussalleu-salcedo-237760323", icon: Linkedin },
      { type: "github", href: "https://github.com/FabrizioBussalleu", icon: Github },
    ],
  },
  {
    name: "Alejandro Colfer",
    role: "Co-Founder",
    image: "/images/team/colfer.webp",
    accent: "from-purple-500/60 via-fuchsia-500/40 to-amber-500/60",
    focus: "center 45%",
    socials: [
      { type: "linkedin", href: "https://www.linkedin.com/in/carlos-alejandro-colfer-mendoza-a59a08355/", icon: Linkedin },
      { type: "github", href: "https://github.com/Elkfle", icon: Github },
    ],
  },
];

export default function About() {
  const { t } = useI18n();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mobileSlideIndex, setMobileSlideIndex] = useState(0);
  const slideTimeoutRef = useRef<number | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const touchDeltaXRef = useRef(0);
  const isMobile = useIsMobile();
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  const mobileSlides = useMemo<MobileSlide[]>(() => {
    const slides: MobileSlide[] = [
      {
        type: "group",
        image: groupImage,
        focus: groupFocus,
        caption: t("about.caption"),
        duration: 6000,
      },
      ...team.map((member) => ({
        type: "member" as const,
        image: member.image,
        focus: member.focus ?? groupFocus,
        caption: member.name,
        duration: 3800,
        member,
      })),
    ];
    return slides;
  }, [t]);

  const totalSlides = mobileSlides.length;

  useEffect(() => {
    if (!isMobile || isUserInteracting || totalSlides === 0) {
      if (!isMobile) {
        setMobileSlideIndex(0);
      }
      if (slideTimeoutRef.current) {
        window.clearTimeout(slideTimeoutRef.current);
        slideTimeoutRef.current = null;
      }
      return;
    }

    const currentDuration = mobileSlides[mobileSlideIndex]?.duration ?? 4000;
    slideTimeoutRef.current = window.setTimeout(() => {
      setMobileSlideIndex((prev) => (prev + 1) % totalSlides);
    }, currentDuration);

    return () => {
      if (slideTimeoutRef.current) {
        window.clearTimeout(slideTimeoutRef.current);
        slideTimeoutRef.current = null;
      }
    };
  }, [isMobile, isUserInteracting, mobileSlideIndex, mobileSlides, totalSlides]);

  const goToRelativeSlide = useCallback(
    (direction: number) => {
      if (totalSlides <= 1) return;
      setMobileSlideIndex((prev) => (prev + direction + totalSlides) % totalSlides);
    },
    [totalSlides]
  );

  const handleTouchStart = useCallback(
    (event: React.TouchEvent<HTMLDivElement>) => {
      if (!isMobile || totalSlides <= 1) return;
      const touch = event.touches[0];
      if (!touch) return;
      setIsUserInteracting(true);
      touchStartXRef.current = touch.clientX;
      touchDeltaXRef.current = 0;
    },
    [isMobile, totalSlides]
  );

  const handleTouchMove = useCallback(
    (event: React.TouchEvent<HTMLDivElement>) => {
      if (!isMobile || touchStartXRef.current === null) return;
      const touch = event.touches[0];
      if (!touch) return;
      touchDeltaXRef.current = touch.clientX - touchStartXRef.current;
    },
    [isMobile]
  );

  const handleTouchEnd = useCallback(() => {
    if (!isMobile) return;
    const deltaX = touchDeltaXRef.current;
    const threshold = 60;
    if (touchStartXRef.current !== null && Math.abs(deltaX) > threshold) {
      const direction = deltaX > 0 ? -1 : 1;
      goToRelativeSlide(direction);
    }
    touchStartXRef.current = null;
    touchDeltaXRef.current = 0;
    setIsUserInteracting(false);
  }, [goToRelativeSlide, isMobile]);

  const mobileSlide = isMobile ? mobileSlides[mobileSlideIndex] : null;
  const activeMember = !isMobile && typeof activeIndex === "number" ? team[activeIndex] : null;
  const effectiveMember = isMobile ? mobileSlide?.member ?? null : activeMember;
  const displayImage = isMobile ? mobileSlide?.image ?? groupImage : effectiveMember?.image ?? groupImage;
  const displayFocus = isMobile ? mobileSlide?.focus ?? groupFocus : effectiveMember?.focus ?? groupFocus;
  const showCaption = isMobile && mobileSlide?.type === "member" && !!mobileSlide.caption;



  return (
    <section id="nosotros" className="relative isolate overflow-hidden bg-white py-24 sm:py-28">
      <div className="relative mx-auto flex max-w-6xl flex-col gap-16 px-6 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-16">
          <div className="relative order-2 lg:order-1">
            <div className="absolute inset-0 -z-10 hidden rounded-[3.2rem] bg-gradient-to-br from-sky-200/50 via-white to-fuchsia-200/40 blur-3xl lg:block" aria-hidden="true" />
            <div className="relative w-full overflow-hidden rounded-[3.2rem] border border-slate-200 bg-white shadow-[0_45px_140px_rgba(15,118,210,0.2)]">
              <div
                className="relative aspect-[6/4]"
                onTouchStart={isMobile ? handleTouchStart : undefined}
                onTouchMove={isMobile ? handleTouchMove : undefined}
                onTouchEnd={isMobile ? handleTouchEnd : undefined}
                onTouchCancel={isMobile ? handleTouchEnd : undefined}
              >
                <SmartImage
                  aria-hidden="true"
                  src={displayImage}
                  priority
                  alt=""
                  className="absolute inset-0 h-full w-full scale-[1.06] transform-gpu object-cover blur-[14px] opacity-45"
                  style={{ objectPosition: displayFocus }}
                />
                <SmartImage
                  key={displayImage}
                  src={displayImage}
                  priority
                  alt={
                    effectiveMember
                      ? `${t("about.alt.memberPrefix")} ${effectiveMember.name}`
                      : t("about.alt.group")
                  }
                  className="relative z-10 h-full w-full object-contain transition duration-700 ease-out"
                  style={{ objectPosition: displayFocus }}
                />
                {showCaption && (
                  <div className="absolute bottom-4 left-1/2 z-20 w-[85%] -translate-x-1/2 rounded-full border border-white/30 bg-black/45 px-4 py-2 text-center text-sm font-semibold text-white backdrop-blur-md">
                    {mobileSlide.caption}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="order-1 space-y-4 text-center lg:order-2 lg:text-left">
            <span className="inline-flex items-center justify-center rounded-full bg-sky-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-sky-700">
              {t("about.badge")}
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {t("about.title")}
            </h2>
            <p className="mx-auto max-w-2xl text-base text-slate-600 sm:text-lg lg:mx-0">
              {t("about.description")}
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, index) => {
            const isActive = index === activeIndex;

            return (
              <div
                key={member.name}
                role="button"
                tabIndex={0}
                aria-pressed={!isMobile && isActive}
                onMouseEnter={() => {
                  if (!isMobile) setActiveIndex(index);
                }}
                onFocus={() => {
                  if (!isMobile) setActiveIndex(index);
                }}
                onMouseLeave={() => {
                  if (!isMobile) setActiveIndex(null);
                }}
                onBlur={(event) => {
                  if (isMobile) return;
                  const next = event.relatedTarget as Node | null;
                  if (!next || !event.currentTarget.contains(next)) {
                    setActiveIndex(null);
                  }
                }}
                className={cn(
                  "group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border p-5 text-left transition duration-300 outline-none",
                  "border-slate-200 bg-white/95 hover:border-sky-400 hover:shadow-[0_18px_45px_rgba(14,165,233,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/40",
                  !isMobile && isActive && "border-sky-500 shadow-[0_18px_45px_rgba(14,165,233,0.22)]"
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br opacity-0 transition duration-300",
                    member.accent,
                    "group-hover:opacity-30",
                    !isMobile && isActive && "opacity-40"
                  )}
                />
                <div className="space-y-1">
                  <p className="text-lg font-semibold text-slate-900">{member.name}</p>
                  <p className="text-xs text-slate-600">{member.role}</p>
                </div>
                <div className="flex items-center gap-2 pt-4">
                  {member.socials.map(({ type, href, icon: Icon }) => (
                    <a
                      key={href}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={t(`about.social.${type}`, { name: member.name })}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-sky-400 hover:text-sky-600"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
