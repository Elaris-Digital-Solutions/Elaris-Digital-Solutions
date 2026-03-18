import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import CustomSoftware from "./pages/CustomSoftware";
import LLMWorkflows from "./pages/LLMWorkflows";
import ApiIntegration from "./pages/ApiIntegration";
import MeetsRedirect from "./pages/MeetsRedirect";
import CMMS from "./pages/CMMS";
import LandingImpulsaTuNegocio from "./pages/LandingImpulsaTuNegocio";
import TermsAndConditions from "@/pages/TermsAndConditions";
import DataPolicies from "@/pages/DataPolicies";
import NotFound from "./pages/NotFound";
import { I18nProvider } from "@/lib/i18n";

const sectionSlugs = ["servicios", "estandares", "portafolio", "productos", "clientes", "contacto", "proceso"] as const;

const App = () => (
  <HelmetProvider>
    <I18nProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/meet" element={<MeetsRedirect />} />
          <Route path="/desarrollo-software-medida" element={<CustomSoftware />} />
          <Route path="/implementacion-llms" element={<LLMWorkflows />} />
          <Route path="/apis-personalizadas" element={<ApiIntegration />} />
          <Route path="/implementacion-cmms" element={<CMMS />} />
          <Route path="/impulsa-tu-negocio" element={<LandingImpulsaTuNegocio />} />
          <Route path="/terminos-condiciones" element={<TermsAndConditions />} />
          <Route path="/politicas-de-datos" element={<DataPolicies />} />
          <Route path="/es/terminos-condiciones" element={<TermsAndConditions />} />
          <Route path="/es/politicas-de-datos" element={<DataPolicies />} />

          {/* ORGANIC OFFENSIVE STRATEGY:
              These "Pillar Pages" (/servicios, /portafolio, etc.) are indexed by Google.
              Currently, they render the SPA Home but with specific canonical URLs (handled in SeoHead)
              to serve as entry points for broad organic search terms.
          */}
          {sectionSlugs.map((slug) => (
            <Route key={`es-default-${slug}`} path={`/${slug}`} element={<Index />} />
          ))}
          <Route path="/es" element={<Index />} />
          {sectionSlugs.map((slug) => (
            <Route key={`es-${slug}`} path={`/es/${slug}`} element={<Index />} />
          ))}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </I18nProvider>
  </HelmetProvider>
);

export default App;
