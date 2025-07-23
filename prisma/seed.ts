import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient();

const holidays: Prisma.HolidaysCreateInput[] = [
    {
        date: "2025-01-01",
        name: "New Year's Day",
    },
    {
        date: "2025-04-18",
        name: "Good Friday",
    },
];

export async function main() {
    for (const h of holidays) {
        await prisma.holidays.create({ data: h });
    }
}

main();
