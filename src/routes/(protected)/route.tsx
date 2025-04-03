import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(protected)")({
  beforeLoad: async ({ context }) => {
    if (!context.user) {
      // TODO: Add later; just for testing
      // throw redirect({ to: "/signin" });
    }
  },
});
