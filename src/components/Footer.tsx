import { Linkedin, Twitter, Github, Mail, Instagram, Facebook, Phone, MapPin, Calendar } from "lucide-react";
import SmartImage from "@/components/ui/smart-image";
import { useI18n } from "@/lib/i18n";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t, tArray } = useI18n();
  const serviceLinks = tArray("footer.sections.services.items");
  const navLabels = tArray("footer.sections.navigation.items");
  const navTargets = ["servicios", "portafolio", "proceso", "clientes", "contacto"];
  const navItems = navTargets.map((id, index) => ({
    id,
    label: navLabels[index] ?? "",
  }));
  const contactSection = {
    title: t("footer.sections.contact.title"),
    meetingLabel: t("footer.sections.contact.meetingLabel"),
    email: t("footer.sections.contact.email"),
    phone: t("footer.sections.contact.phone"),
    instagram: t("footer.sections.contact.instagram"),
    location: t("footer.sections.contact.location"),
  };

  return (
    <footer className="bg-[#030E2C] border-t border-white/10 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <SmartImage
                src="/assets/ElarisLogoWhite.png"
                alt={t("navbar.logoAlt")}
                priority
                className="h-20 w-auto"
              />
            </div>
            <p className="text-white/80 text-sm mb-6 max-w-sm">
              {t("footer.description")}
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/company/elaris-digital-solutions/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/6 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>

              <a
                href="https://www.instagram.com/elarisdigitalsolutions"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/6 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>

              <a
                href="https://github.com/Elaris-Digital-Solutions"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/6 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>

              <a
                href="https://www.facebook.com/profile.php?id=61582879186110"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/6 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>

              <a
                href="https://x.com/ElarisSolutions"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/6 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                aria-label="X"
              >
                <Twitter className="h-5 w-5" />
              </a>

              <a
                href="mailto:contact@elarisdigitalsolutions.com"
                className="p-2 bg-white/6 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          {/* Links Columns */}
          <div>
            <h3 className="font-semibold mb-4">{t("footer.sections.services.title")}</h3>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-white/80 text-sm hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navegación Column (links to page sections with smooth scroll) */}
          <div key="Navegacion">
            <h3 className="font-semibold mb-4">{t("footer.sections.navigation.title")}</h3>
            <ul className="space-y-2">
              {navItems.map(({ id, label }) => {
                return (
                  <li key={`${label}-${id}`}>
                    <a
                      href={`#${id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        const el = document.getElementById(id);
                        if (el) {
                          el.scrollIntoView({ behavior: "smooth", block: "start" });
                        } else {
                          // Fallback: navigate to root anchor if element not present
                          window.location.href = `/#${id}`;
                        }
                      }}
                      className="text-white/80 text-sm hover:text-white transition-colors"
                    >
                      {label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact Column (replaces previous "Legal") */}
          <div key="Contacto">
            <h3 className="font-semibold mb-4">{contactSection.title}</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:contact@elarisdigitalsolutions.com"
                  className="flex items-center gap-2 text-white/80 text-sm hover:text-white transition-colors"
                >
                  <Mail className="h-5 w-5 flex-shrink-0" />
                  {contactSection.email}
                </a>
              </li>

              <li>
                <a
                  href="tel:+51944228807"
                  className="flex items-center gap-2 text-white/80 text-sm hover:text-white transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  {contactSection.phone}
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/elarisdigitalsolutions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/80 text-sm hover:text-white transition-colors"
                >
                  <Instagram className="h-4 w-4" />
                  {contactSection.instagram}
                </a>
              </li>
              <li className="flex items-center gap-2 text-white/80 text-sm">
                <MapPin className="h-4 w-4" />
                {contactSection.location}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-white/80 text-sm">
              {t("footer.bottom.rights", { year: currentYear })}
            </p>
            <p className="text-white/80 text-sm">
              {t("footer.bottom.tagline")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
