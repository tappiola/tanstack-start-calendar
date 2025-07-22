import {UK_BANK_HOLIDAYS} from "~/utils/holidays";

export type Day = {
    date: Date;
    dayOfMonth: number;
    dayOfWeek: number; // 0 - Sunday, 6 - Saturday
    isWeekend: boolean;
};

export type Month = {
    year: number;
    month: number; // 0 - January, 11 - December
    days: Day[];
};

export const isBankHoliday = (day: number, month: number, year: number): boolean =>
!!(UK_BANK_HOLIDAYS.find(h => h.day === day && h.month === month && h.year === year))

export function generateMonth(year: number, month: number): Month {
    const days: Day[] = [];
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dayOfWeek = date.getDay(); // 0 - Sunday
        days.push({
            date,
            dayOfMonth: day,
            dayOfWeek,
            isWeekend: dayOfWeek === 0 || dayOfWeek === 6 || isBankHoliday(day, month + 1, year),
        });
    }

    return {
        year,
        month,
        days,
    };
}

export function generateYear(year: number): Month[] {
    return Array.from({ length: 12 }, (_, idx) => generateMonth(year, idx));
}

export function getMonthNames(locale: string = 'en-GB'): string[] {
    return Array.from({ length: 12 }, (_, idx) =>
        new Intl.DateTimeFormat(locale, { month: 'long' }).format(new Date(2025, idx))
    );
}

export const getMonthName = (monthIndex: number, locale: string = navigator.language): string =>
         new Intl.DateTimeFormat(locale ?? 'en-GB', { month: 'long' }).format(new Date(2025, monthIndex));

export const getWeekdayNames = (locale: string = 'en-GB'): string[] => {
    return Array.from({ length: 7 }, (_, idx) =>
        new Intl.DateTimeFormat(locale, { weekday: 'narrow' }).format(new Date(2025, 0, idx + 5))
    );
}

export const getWeekdayName = (weekdayIndex, locale: string = navigator.language): string =>
        new Intl.DateTimeFormat(locale ?? 'en-GB', { weekday: 'narrow' }).format(new Date(2025, 0, weekdayIndex + 5))

export const formatDate = (day: number, month: number, year: number): string => {
    const date = new Date(Date.UTC(year, month, day));
    return date.toISOString().slice(0, 10);
}
