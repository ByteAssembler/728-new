import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";
import ClientOnly from "~/lib/components/ClientOnlyComponent";
import Background from "~/lib/components/ui/background";
import Footer from "~/lib/components/ui/footer";
import {
  HeaderAdmin,
  HeaderAdminProgress,
  HeaderNormal,
  HeaderNormalProgress,
} from "~/lib/components/ui/header";

export const Route = createFileRoute("/(public)")({
  component: PublicLayout,
  loader(ctx) {
    return !!ctx.context.user;
  },
});

function PublicLayout() {
  const user = Route.useLoaderData();
  const location = useLocation();

  const progressMode = location.pathname === "/sponsor";

  return (
    <>
      <Background />
      <Outlet />
      <ClientOnly>
        {progressMode ? (
          user ? (
            <HeaderAdminProgress />
          ) : (
            <HeaderNormalProgress />
          )
        ) : user ? (
          <HeaderAdmin />
        ) : (
          <HeaderNormal />
        )}
      </ClientOnly>
      <Footer />
    </>
  );
}
