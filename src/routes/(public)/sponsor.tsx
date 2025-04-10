import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/sponsor")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(public)/sponsor"!</div>;
}
