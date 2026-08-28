import { createFileRoute } from "@tanstack/react-router";
import DiracNotationLab from "@/components/dirac-notation-lab";

export const Route = createFileRoute("/dirac-notation-lab")({
  head: () => ({
    meta: [
      { title: "Laboratorium Notacji Diraca" }
    ],
  }),
  component: DiracNotationLabRoute,
});

function DiracNotationLabRoute() {
  return <DiracNotationLab />;
}
