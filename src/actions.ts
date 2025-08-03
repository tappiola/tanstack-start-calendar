import { createServerFn } from "@tanstack/react-start";
import prisma from "@lib/prisma";
import { Prisma } from "@prisma/client";

export const getAllHolidays = createServerFn({ method: "GET" }).handler(
  async () => {
    const bankHolidays = await prisma.holidays.findMany();
    const vacations = await prisma.vacations.findMany();

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
    // await prisma.vacations.create({
    //   data: data as Prisma.VacationsCreateInput,
    // });
    await prisma.vacations.upsert({
      where: {
        date: data.date,
      },
      update: data,
      create: data,
    });
  });

export const getEventByDate = createServerFn({ method: "GET" })
  .validator((date: string) => new Date(date))
  .handler(async ({ data: date }) => {
    if (isNaN(date.getTime())) {
      return null;
    }

    return await prisma.vacations.findUnique({
      where: {
        date,
      },
    });
  });
