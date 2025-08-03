import { createFileRoute } from "@tanstack/react-router";

const RouteComponent = () => {
  return <div>Select date to continue</div>;
};

export const Route = createFileRoute("/")({
  component: RouteComponent,
});
