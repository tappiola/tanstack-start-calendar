import { createServerFn } from "@tanstack/react-start";
import prisma from "@lib/prisma";
import { Prisma } from "@prisma/client";
import { z } from "zod";

const dateSchema = z.string().transform((val, ctx) => {
  const parsed = new Date(val);
  if (isNaN(parsed.getTime())) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Invalid date string",
    });
    return z.NEVER;
  }
  return parsed;
});

export const getAllHolidays = createServerFn({ method: "GET" }).handler(
  async () => {
      const [bankHolidays, vacations] = await Promise.all([
          prisma.holidays.findMany(),
          prisma.vacations.findMany(),
      ]);

    return { bankHolidays, vacations };
  },
);

export const createVacation = createServerFn({ method: "POST" })
  .validator((formData: FormData) => {
    if (!(formData instanceof FormData)) {
      throw new Error("Invalid form data");
    }

    const date = formData.get("date");
    const name = formData.get("title");

    if (!date || !name) {
      throw new Error("Date and title are required");
    }

    return {
      date: new Date(date.toString()),
      name,
    } as Prisma.VacationsCreateInput;
  })
  .handler(async ({ data }) => {
    await prisma.vacations.upsert({
      where: {
        date: data.date,
      },
      update: data,
      create: data,
    });
  });

export const deleteVacation = createServerFn({ method: "POST" })
  .validator(dateSchema)
  .handler(async ({ data: date }) => {
    return await prisma.vacations.delete({
      where: {
        date,
      },
    });
  });

export const getEventByDate = createServerFn({ method: "GET" })
  .validator(dateSchema)
  .handler(async ({ data: date }) => {
    return await prisma.vacations.findUnique({
      where: {
        date,
      },
    });
  });
