import { Link, createFileRoute, useRouter } from "@tanstack/react-router";
import authClient from "~/lib/auth-client";
import ThemeToggle from "~/lib/components/ThemeToggle";
import { Button } from "~/lib/components/ui/button";

export const Route = createFileRoute('/(public)/profile')({
  component: Home,
  loader: ({ context }) => {
    return { user: context.user };
  },
});

function Home() {
  const { queryClient } = Route.useRouteContext();
  const { user } = Route.useLoaderData();
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4 min-h-screen p-6 pt-16 lg:pt-6">
      <h1 className="text-4xl font-bold">Mission72Aid</h1>

      {user ? (
        <div className="flex flex-col gap-2">
          <p>Welcome back, {user.name}!</p>
          <Button type="button" asChild className="w-fit" size="lg">
            <Link to="/">Go to /</Link>
          </Button>
          <div>
            More data:
            <pre>{JSON.stringify(user, null, 2)}</pre>
          </div>

          <Button
            onClick={async () => {
              await authClient.signOut();
              await queryClient.invalidateQueries({ queryKey: ["user"] });
              await router.invalidate();
            }}
            type="button"
            className="w-fit"
            variant="destructive"
            size="lg"
          >
            Sign out
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <p>You are not signed in.</p>
          <Button type="button" asChild className="w-fit" size="lg">
            <Link to="/signin">Sign in</Link>
          </Button>
        </div>
      )}

      <ThemeToggle />
    </div>
  );
}
