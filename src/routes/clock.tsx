import { createFileRoute } from "@tanstack/react-router";
import { ModuloClockTool } from "@/components/modulo-clock-tool";

export const Route = createFileRoute("/clock")({
  head: () => ({
    meta: [
      { title: "Kalkualtor Zegara Modulo" },
    ],
  }),
  component: Index,
});

function Index() {
  return <ModuloClockTool />;
}
