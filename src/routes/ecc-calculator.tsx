import { createFileRoute } from "@tanstack/react-router";
import ECCCalculator from "@/components/ecc-calculator";

export const Route = createFileRoute("/ecc-calculator")({
  head: () => ({
    meta: [
      { title: "Kalkulator krzywych ECC" }
    ],
  }),
  component: ECCCalculatorRoute,
});

function ECCCalculatorRoute() {
  return <ECCCalculator />;
}
