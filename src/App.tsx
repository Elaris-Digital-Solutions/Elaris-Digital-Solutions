import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import CustomSoftware from "./pages/CustomSoftware";
import MeetsRedirect from "./pages/MeetsRedirect";
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
