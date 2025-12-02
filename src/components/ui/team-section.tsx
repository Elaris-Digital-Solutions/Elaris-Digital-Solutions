import * as React from "react";
import { cn } from "@/lib/utils";

interface SocialLink {
  icon: React.ElementType;
  href: string;
}

interface TeamMember {
  name: string;
  designation: string;
  imageSrc: string;
  socialLinks?: SocialLink[];
}

interface TeamSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  members: TeamMember[];
  registerLink?: string;
  registerLabel?: string;
  logo?: React.ReactNode;
  socialLinksMain?: SocialLink[];
  headlinePrefix?: string;
  websiteLabel?: string;
}

export const TeamSection = React.forwardRef<HTMLDivElement, TeamSectionProps>(
  (
    {
      title,
      description,
      members,
      registerLink,
      registerLabel,
      logo,
      socialLinksMain,
      headlinePrefix = "O U R",
      websiteLabel,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <section
        ref={ref}
        className={cn(
          "relative w-full overflow-hidden bg-background py-12 md:py-24 lg:py-32",
          className
        )}
        {...props}
      >
        <div className="container grid items-center justify-center gap-8 px-4 text-center md:px-6">
          <div className="absolute inset-0 z-0 opacity-5">
            <svg className="h-full w-full" fill="none">
              <defs>
                <pattern
                  id="grid"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M20 0L0 0 0 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    className="text-muted-foreground"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="relative z-10 flex w-full max-w-5xl flex-col items-center justify-between gap-4 text-center md:flex-row md:items-start md:text-left lg:gap-8">
            <div className="grid gap-2 text-center md:text-left">
              <h1 className="text-4xl font-bold tracking-tighter text-foreground sm:text-5xl md:text-6xl">
                <span className="block text-xl font-medium text-primary sm:text-2xl md:text-3xl">
                  {headlinePrefix}
                </span>
                {title}
              </h1>
              <p className="max-w-[700px] text-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {description}
              </p>
            </div>
            <div className="flex flex-col items-center gap-4 md:items-end">
              {logo && <div className="text-2xl font-bold">{logo}</div>}
              {registerLink && (
                <a
                  href={registerLink}
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  {registerLabel ?? "REGISTER NOW"}
                </a>
              )}
            </div>
          </div>

          {socialLinksMain && socialLinksMain.length > 0 && (
            <div className="relative z-10 mx-auto flex w-full max-w-5xl items-center justify-center gap-4 py-4 md:justify-center">
              {socialLinksMain.map((link, index) => (
                <a
                  key={`${link.href}-${index}`}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  <link.icon className="h-6 w-6" />
                </a>
              ))}
              {websiteLabel && <span className="text-sm text-muted-foreground">{websiteLabel}</span>}
            </div>
          )}

          <div className="relative z-10 mx-auto grid w-full max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12">
            {members.map((member) => (
              <div
                key={member.name}
                className="group relative flex flex-col items-center justify-end overflow-hidden rounded-xl bg-card p-6 text-center shadow-lg transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl"
                style={{
                  backgroundColor: "hsl(210 100% 96%)",
                  color: "hsl(var(--foreground))",
                }}
              >
                <div
                  className="absolute bottom-0 left-0 right-0 h-1/2 origin-bottom scale-y-0 transform rounded-t-full bg-gradient-to-t from-primary/20 to-transparent transition-transform duration-500 ease-out group-hover:scale-y-100"
                  style={{ transitionDelay: `50ms` }}
                />

                <div
                  className="relative z-10 h-36 w-36 overflow-hidden rounded-full border-4 border-transparent bg-background/20 transition-all duration-500 ease-out group-hover:border-primary group-hover:scale-105"
                  style={{ transitionDelay: `100ms` }}
                >
                  <img
                    src={member.imageSrc}
                    alt={member.name}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                </div>

                <h3 className="relative z-10 mt-4 text-xl font-semibold text-foreground">
                  {member.name}
                </h3>
                <p className="relative z-10 text-sm text-muted-foreground">
                  {member.designation}
                </p>

                {member.socialLinks && member.socialLinks.length > 0 && (
                  <div className="relative z-10 mt-4 flex gap-3 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                    {member.socialLinks.map((link, linkIndex) => (
                      <a
                        key={`${link.href}-${linkIndex}`}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground transition-colors hover:text-primary"
                      >
                        <link.icon className="h-5 w-5" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
);

TeamSection.displayName = "TeamSection";
