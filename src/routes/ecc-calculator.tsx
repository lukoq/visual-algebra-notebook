import { createFileRoute } from "@tanstack/react-router";
import ECCCalculator from "@/components/ecc-calculator";

export const Route = createFileRoute("/ecc-calculator")({
  head: () => ({
    meta: [
      { title: "ECC Calculator · Visual Algebra" }
    ],
  }),
  component: ECCCalculatorRoute,
});

function ECCCalculatorRoute() {
  return <ECCCalculator />;
}
