import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import MeetsRedirect from "./pages/MeetsRedirect";
import NotFound from "./pages/NotFound";
import { I18nProvider, useI18n } from "@/lib/i18n";

const queryClient = new QueryClient();
const sectionSlugs = ["servicios", "portafolio", "proceso", "clientes", "contacto"] as const;

const LanguageSync = () => {
  const location = useLocation();
  const { language, setLanguage } = useI18n();
  useEffect(() => {
    const nextLanguage = location.pathname.startsWith("/es") ? "es" : "en";
    if (nextLanguage !== language) {
      setLanguage(nextLanguage);
    }
  }, [language, location.pathname, setLanguage]);
  return null;
};

const App = () => (
  <HelmetProvider>
    <I18nProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <LanguageSync />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/meet" element={<MeetsRedirect />} />
              {sectionSlugs.map((slug) => (
                <Route key={`en-${slug}`} path={`/${slug}`} element={<Index />} />
              ))}
              <Route path="/es" element={<Index />} />
              {sectionSlugs.map((slug) => (
                <Route key={`es-${slug}`} path={`/es/${slug}`} element={<Index />} />
              ))}
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </I18nProvider>
  </HelmetProvider>
);

export default App;
