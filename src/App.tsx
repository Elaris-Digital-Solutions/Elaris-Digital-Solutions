import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import CustomSoftware from "./pages/CustomSoftware";
import LLMWorkflows from "./pages/LLMWorkflows";
import ApiIntegration from "./pages/ApiIntegration";
import MeetsRedirect from "./pages/MeetsRedirect";
import CMMS from "./pages/CMMS";
import NotFound from "./pages/NotFound";
import LandingImpulsaTuNegocio from "./pages/LandingImpulsaTuNegocio";
import { I18nProvider } from "@/lib/i18n";

const sectionSlugs = [
  "servicios",
  "estandares",
  "portafolio",
  "productos",
  "clientes",
  "contacto",
  "proceso",
] as const;

const App = () => (
  <HelmetProvider>
    <I18nProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          {/* Homepage */}
          <Route path="/" element={<Index />} />

          {/* Section scroll aliases — render homepage, canonical stays at / */}
          {sectionSlugs.map((slug) => (
            <Route key={slug} path={`/${slug}`} element={<Index />} />
          ))}

          {/* Service landing pages — noindex */}
          <Route path="/meet" element={<MeetsRedirect />} />
          <Route path="/desarrollo-software-medida" element={<CustomSoftware />} />
          <Route path="/impulsa-tu-negocio" element={<LandingImpulsaTuNegocio />} />
          <Route path="/implementacion-llms" element={<LLMWorkflows />} />
          <Route path="/apis-personalizadas" element={<ApiIntegration />} />
          <Route path="/implementacion-cmms" element={<CMMS />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </I18nProvider>
  </HelmetProvider>
);

export default App;
