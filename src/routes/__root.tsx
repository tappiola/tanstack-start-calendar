/// <reference types="vite/client" />
import type { ReactNode } from 'react'
import {
    Outlet,
    createRootRoute,
    HeadContent,
    Scripts,
} from '@tanstack/react-router'

import appCss from '../app.css?url'
import {TanStackRouterDevtools} from "@tanstack/react-router-devtools";
import {Calendar} from "~/components/calendar";
import {getAllHolidays, getServerTime} from '~/actions'
import {createServerFn} from "@tanstack/react-start";
import prisma from "../../lib/prisma";

export const Route = createRootRoute({
    head: () => ({
        meta: [
            {
                charSet: 'utf-8',
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                title: 'TanStack Start Starter',
            },
        ],
        links: [{ rel: 'stylesheet', href: appCss }],
    }),
    component: RootComponent,
    loader: () => {
        // return getServerTime();
        return getAllHolidays();
    },
})

function RootComponent() {
    const data = Route.useLoaderData();
    console.log({data});

    return (
        <RootDocument>
            <Calendar/>
            <Outlet />
            <TanStackRouterDevtools />
        </RootDocument>
    )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
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
    )
}
