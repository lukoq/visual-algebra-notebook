import { createFileRoute } from "@tanstack/react-router";
import { ModuloClockTool } from "@/components/modulo-clock-tool";

export const Route = createFileRoute("/clock")({
  head: () => ({
    meta: [
      { title: "Modulo Clock Calculator · Visual Algebra" },
      {
        name: "description",
        content:
          "Interactive Z_n cyclic group visualizer. Click numbers on the clock to see orders and generators come alive.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return <ModuloClockTool />;
}
