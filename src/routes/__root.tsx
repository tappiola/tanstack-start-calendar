/// <reference types="vite/client" />
import type { ReactNode } from "react";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../app.css?url";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Calendar } from "~/components/calendar";
import { getAllHolidays } from "~/actions";

const RootComponent = () => {
  return (
    <RootDocument>
      <Calendar />
      <TanStackRouterDevtools />
    </RootDocument>
  );
};

const RootDocument = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
};

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Event calendar",
      },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  component: RootComponent,
  loader: () => getAllHolidays(),
});
