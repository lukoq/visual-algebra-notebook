import { createFileRoute } from "@tanstack/react-router";
import HomomorphismMapper from "@/components/homomorphism-mapper";

export const Route = createFileRoute("/homomorphisms")({
  head: () => ({
    meta: [
      { title: "Homomorphism Mapper · Visual Algebra" },
      {
        name: "description",
        content:
          "Explore group homomorphisms between Z_n and Z_m. Map elements, verify the homomorphism property, and identify monomorphisms, epimorphisms, and isomorphisms.",
      },
    ],
  }),
  component: HomomorphismsRoute,
});

function HomomorphismsRoute() {
  return <HomomorphismMapper />;
}
