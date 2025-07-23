import { createServerFn } from "@tanstack/react-start";
import prisma from "@lib/prisma";

export const getAllHolidays = createServerFn({ method: "GET" }).handler(async () => {
    return prisma.holidays.findMany();
});

export const getServerTime = createServerFn().handler(async () => {
    // Wait for 1 second
    await new Promise((resolve) => setTimeout(resolve, 100))
    // Return the current time
    return new Date().toISOString()
})
