import LandingImpulsaTuNegocio from "@/views/LandingImpulsaTuNegocio";
import { campaignMetadata } from "@/seo/site";

export const metadata = campaignMetadata(
  "Impulsa tu negocio | Elaris Digital Solutions",
  "Ordena tu negocio, recupera tu tiempo y haz que tu empresa crezca sola, sin que tú tengas que estar encima de todo.",
  "/impulsa-tu-negocio"
);

export default function Page() {
  return <LandingImpulsaTuNegocio />;
}
