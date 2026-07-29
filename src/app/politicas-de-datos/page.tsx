import DataPolicies from "@/views/DataPolicies";
import { campaignMetadata } from "@/seo/site";

export const metadata = campaignMetadata(
  "Políticas de Datos | Elaris Digital Solutions",
  "Conoce cómo Elaris Digital Solutions recopila, utiliza y protege la información personal.",
  "/politicas-de-datos"
);

export default function Page() {
  return <DataPolicies />;
}
