import HomeView from "@/views/HomeView";
import JsonLd from "@/components/JsonLd";
import {
  buildServiceSchema,
  buildPortfolioSchema,
  buildFaqSchema,
} from "@/seo/site";
import es from "@/locales/es.json";

// Home is the only indexed page; metadata defaults come from the root layout.
export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[
          buildServiceSchema(),
          buildPortfolioSchema(),
          buildFaqSchema(es.homeFaq.items),
        ]}
      />
      <HomeView />
    </>
  );
}
