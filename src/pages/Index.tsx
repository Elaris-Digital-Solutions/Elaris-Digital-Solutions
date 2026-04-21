import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServicesSplitPanel from "@/components/ui/services-split-panel";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingWhatsappButton from "@/components/ui/floating-whatsapp-button";
import SeoHead from "@/components/SeoHead";

const Index = () => {
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
        // Check for path matching a section slug (e.g. /contacto, /es/contacto, /en/contacto)
        let cleanPath = location.pathname;
        if (cleanPath.startsWith("/es/")) {
          cleanPath = cleanPath.substring(4);
        } else if (cleanPath.startsWith("/en/")) {
          cleanPath = cleanPath.substring(4);
        } else if (cleanPath === "/es" || cleanPath === "/en") {
          cleanPath = "";
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
        <ServicesSplitPanel />
        <Process />
        <Portfolio />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsappButton pixelId="1294573795867367" />
    </div>
  );
};

export default Index;
