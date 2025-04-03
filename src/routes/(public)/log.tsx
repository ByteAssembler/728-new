import { createFileRoute } from "@tanstack/react-router";

import FramerAnimatedPngs from "~/lib/components/ui/log-animations";

export const Route = createFileRoute("/(public)/log")({
  component: Log,
});

function Log() {
  return (
    <>
      <div className="w-full">
        <div className="min-h-screen flex  items-center justify-between p-6">
          <p>Status</p>
          <FramerAnimatedPngs />
        </div>
      </div>
    </>
  );
}
