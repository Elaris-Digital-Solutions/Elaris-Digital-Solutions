import MeetsRedirect from "@/views/MeetsRedirect";
import { campaignMetadata } from "@/seo/site";

export const metadata = campaignMetadata(
  "Agenda una reunión | Elaris Digital Solutions",
  "Agenda una reunión con el equipo de Elaris Digital Solutions.",
  "/meet"
);

export default function Page() {
  return <MeetsRedirect />;
}
