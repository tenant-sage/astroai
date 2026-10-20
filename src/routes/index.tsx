import { createFileRoute } from "@tanstack/react-router";
import { AstroApp } from "@/components/astro/astro-app";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return <AstroApp />;
}
