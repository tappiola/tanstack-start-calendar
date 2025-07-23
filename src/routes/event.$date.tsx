import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/event/$date')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello, new-event!</div>
}
