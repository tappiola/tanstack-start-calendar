/// <reference types="vite/client" />
import type { ReactNode } from "react";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import z from "zod";

import appCss from "../app.css?url";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Calendar } from "~/components/calendar";
import { getAllHolidays } from "~/actions";
import { YearSwitch } from "~/components/yearSwitch";

const RootComponent = () => {
  return (
    <RootDocument>
      <YearSwitch />
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
      <body className="p-6 min-h-screen bg-stone-800 text-neutral-50">
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
  validateSearch: z.object({
    year: z.coerce.number().optional(),
  }),
  loader: () => getAllHolidays(),
});
