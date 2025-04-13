import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(protected)")({
  beforeLoad: async ({ context }) => {
    if (!context.user || (context.user && context.user.role !== "admin")) {
      // TODO: Add later; just for testing
      throw redirect({ to: "/signin" });
    }
  },
});
