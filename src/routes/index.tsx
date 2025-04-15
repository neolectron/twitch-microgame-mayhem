import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "../components/landing/Hero";

export const Route = createFileRoute("/")({
  component: () => (
    <div className="min-h-screen">
      <Hero />
    </div>
  ),
});
