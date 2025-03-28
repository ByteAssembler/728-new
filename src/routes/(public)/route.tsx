import { createFileRoute, Outlet } from "@tanstack/react-router";
import ClientOnly from "~/lib/components/ClientOnlyComponent";
import Background from "~/lib/components/ui/background";
import { HeaderAdmin, HeaderNormal } from "~/lib/components/ui/header";

export const Route = createFileRoute("/(public)")({
  component: PublicLayout,
  loader(ctx) {
    return !!ctx.context.user;
  },
});

function PublicLayout() {
  const user = Route.useLoaderData();

  return (
    <>
      <Background />
      <Outlet />
      <ClientOnly>{user ? <HeaderAdmin /> : <HeaderNormal />}</ClientOnly>
    </>
  );
}
