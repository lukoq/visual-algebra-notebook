import { createFileRoute } from '@tanstack/react-router'
import RsaSimulator from "@/components/rsa-simulation";

export const Route = createFileRoute('/rsa-simulation')({
  component: RouteComponent,
})

function RouteComponent() {
  return <RsaSimulator />;
}
