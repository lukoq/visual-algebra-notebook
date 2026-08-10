import { createFileRoute } from "@tanstack/react-router";
import SubgroupExplorer from "@/components/subgroup-explorer";

export const Route = createFileRoute("/subgroups")({
  head: () => ({
    meta: [
      { title: "Kalkulator Podgrup" },
    ],
  }),
  component: SubgroupsRoute,
});

function SubgroupsRoute() {
  return <SubgroupExplorer />;
}