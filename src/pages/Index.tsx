import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import { Logos3 } from "@/components/ui/logos3";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingWhatsappButton from "@/components/ui/floating-whatsapp-button";
import { useI18n } from "@/lib/i18n";
import SeoHead from "@/components/SeoHead";

const Index = () => {
  const { t } = useI18n();
  const location = useLocation();

  useEffect(() => {
    // Handle scrolling to section based on URL path or hash
    const handleScroll = () => {
      let targetId = "";

      // Check for hash first (e.g. /#contacto)
      if (location.hash) {
        targetId = location.hash.replace("#", "");
        if (targetId === "proceso") {
          targetId = "estandares";
        }
      } else {
        // Check for path matching a section slug (e.g. /contacto or /es/contacto)
        let cleanPath = location.pathname;
        if (cleanPath.startsWith("/es/")) {
          cleanPath = cleanPath.substring(4);
        } else if (cleanPath.startsWith("/")) {
          cleanPath = cleanPath.substring(1);
        }

        // Remove trailing slash if present
        if (cleanPath.endsWith("/")) {
          cleanPath = cleanPath.slice(0, -1);
        }

        if (cleanPath === "proceso") {
          cleanPath = "estandares";
        }

        const slugs = ["servicios", "estandares", "portafolio", "productos", "clientes", "contacto"];
        if (slugs.includes(cleanPath)) {
          targetId = cleanPath;
        }
      }

      if (targetId) {
        // Short timeout to ensure DOM is rendered
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    };

    handleScroll();
  }, [location]);
  return (
    <div
      id="app-scroll-container"
      className="relative min-h-screen overflow-x-hidden overflow-y-auto"
    >
      <SeoHead page="home" />
      <Navbar />
      <Hero />
      <main className="site-sections">
        <Services />
        <Process />
        <Portfolio />
        <Testimonials />
        {/* Technologies section hidden as requested */}
        {/* <section className="py-12 sm:py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 lg:mb-12">
              <h2 className="text-3xl font-extrabold tracking-tight drop-shadow-lg sm:text-4xl lg:text-5xl mb-4">
                <span className="text-slate-900">{t("tech.titleNormal")}</span>
                <span style={{ color: '#2F64FF' }}>{t("tech.titleAccent")}</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {t("tech.description")}
              </p>
            </div>
          </div>
          <div className="w-full">
            <div className="relative mx-auto flex items-center justify-center max-w-6xl">
              <Logos3
                heading=""
                className="px-6 [&_.text-white\/80]:text-gray-800 [&_.bg-white\/5]:bg-gray-100 [&_.border-white\/10]:border-gray-200 [&_.text-white\/70]:text-gray-600"
              />
            </div>
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mt-6 lg:mt-8">
              <p className="text-sm text-gray-500 font-medium">
                {t("tech.note")}
              </p>
            </div>
          </div>
        </section> */}
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsappButton />
    </div>
  );
};

export default Index;
