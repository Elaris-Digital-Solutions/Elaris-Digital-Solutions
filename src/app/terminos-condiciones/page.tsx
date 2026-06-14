import TermsAndConditions from "@/views/TermsAndConditions";
import { campaignMetadata } from "@/seo/site";

export const metadata = campaignMetadata(
  "Términos y Condiciones | Elaris Digital Solutions",
  "Revisa los términos y condiciones que regulan el uso de los canales digitales y servicios de Elaris Digital Solutions.",
  "/terminos-condiciones"
);

export default function Page() {
  return <TermsAndConditions />;
}
