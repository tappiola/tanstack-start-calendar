import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_pathlessLayout')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_pathlessLayout"!</div>
}
