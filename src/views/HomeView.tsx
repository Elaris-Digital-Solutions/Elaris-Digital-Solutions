"use client";

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import ServicesSplitPanel from "@/components/ui/services-split-panel";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import FaqHome from "@/components/FaqHome";
import LeadMagnet from "@/components/LeadMagnet";
import Team from "@/components/Team";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingWhatsappButton from "@/components/ui/floating-whatsapp-button";

const HomeView = () => {
  // Smooth-scroll to a section when the URL carries a hash (e.g. /#contacto).
  useEffect(() => {
    if (typeof window === "undefined") return;
    const rawHash = window.location.hash.replace("#", "");
    if (!rawHash) return;
    const targetId = rawHash === "proceso" ? "estandares" : rawHash;
    const timeout = window.setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
    }, 100);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <div
      id="app-scroll-container"
      className="relative min-h-screen overflow-x-hidden overflow-y-auto"
    >
      <Navbar />
      <Hero />
      <SocialProof />
      <main className="site-sections">
        <ServicesSplitPanel />
        <Process />
        <Portfolio />
        <Testimonials />
        <FaqHome />
        <LeadMagnet />
        <Team />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsappButton pixelId="1294573795867367" />
    </div>
  );
};

export default HomeView;
