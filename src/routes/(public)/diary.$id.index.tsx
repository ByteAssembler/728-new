import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(public)/diary/$id/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(public)/diary/$id"!</div>
}
