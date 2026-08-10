import { createFileRoute } from "@tanstack/react-router";
import HomomorphismMapper from "@/components/homomorphism-mapper";

export const Route = createFileRoute("/homomorphisms")({
  head: () => ({
    meta: [
      { title: "Mapa Homomorfizmów" },
    ],
  }),
  component: HomomorphismsRoute,
});

function HomomorphismsRoute() {
  return <HomomorphismMapper />;
}
