import { createFileRoute } from "@tanstack/react-router";
import SubgroupExplorer from "@/components/subgroup-explorer";

export const Route = createFileRoute("/subgroups")({
  head: () => ({
    meta: [
      { title: "Subgroup & Coset Calculator · Visual Algebra" },
      {
        name: "description",
        content: "Explore divisors, generate subgroups, and instantly visualize complete coset partitions for Z_n.",
      },
    ],
  }),
  component: SubgroupsRoute,
});

function SubgroupsRoute() {
  return <SubgroupExplorer />;
}