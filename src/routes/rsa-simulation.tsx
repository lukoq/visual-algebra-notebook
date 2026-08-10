import { createFileRoute } from '@tanstack/react-router'
import RsaSimulator from "@/components/rsa-simulation";
import { RSASimulator } from '@/lib/rsa-simulator';

export const Route = createFileRoute('/rsa-simulation')({
  head: () => ({
    meta: [
      { title: "Symulator RSA" }
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <RsaSimulator />;
}
