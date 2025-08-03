import { Link, Outlet } from "@tanstack/react-router";
import {
  formatDate,
  generateMonth,
  getMonthName,
  getWeekdayName,
} from "~/utils/dateUtils";
import { COLUMN_CLASSES } from "~/utils/styling";
import clsx from "clsx";
import { Route as MainRoute } from "~/routes/__root";
import { Route as EventRoute } from "~/routes/event.$date";

export const Calendar = () => {
  return (
    <div className="p-9 min-h-screen bg-stone-800 text-neutral-50">
      <Outlet />
      <div className="grid grid-cols-3 gap-9 max-w-5/6 mx-auto justify-center">
        {Array.from({ length: 12 }, (_, idx) => (
          <Month key={idx} monthIndex={idx} />
        ))}
      </div>
    </div>
  );
};

const Month = ({ monthIndex }: { monthIndex: number }) => {
  const { bankHolidays, vacations } = MainRoute.useLoaderData();

  return (
    <div className="max-w-3xs w-3xs mx-auto">
      <h2 className="uppercase text-orange-400 text-center mb-3">
        {getMonthName(monthIndex)}
      </h2>
      <div className="grid grid-cols-7 text-center">
        {Array.from({ length: 7 }, (_, idx) => (
          <div key={idx}>{getWeekdayName(idx)}</div>
        ))}
        {generateMonth(bankHolidays, vacations, 2025, monthIndex).days.map(
          (day, idx) => (
            <Link
              key={day.dayOfMonth}
              to={EventRoute.to}
              params={{ date: formatDate(day.dayOfMonth, monthIndex, 2025) }}
              className={clsx({
                [COLUMN_CLASSES[day.dayOfWeek]]: idx === 0,
                "text-orange-700": day.isWeekend,
                "text-amber-300": day.isVacation,
              })}
            >
              {day.dayOfMonth}
            </Link>
          ),
        )}
      </div>
    </div>
  );
};
