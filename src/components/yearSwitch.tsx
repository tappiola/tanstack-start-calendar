import { Route as MainRoute } from "~/routes/__root";
import { Link } from "@tanstack/react-router";

export const YearSwitch = () => {
  const { year = new Date().getFullYear() } = MainRoute.useSearch();

  return (
    <div className="flex items-center justify-center mx-auto pb-4 gap-x-12">
      <Link
        to={MainRoute.to}
        search={{ year: Number(year - 1) }}
        className="text-neutral-400 hover:text-neutral-50 flex items-center justify-center gap-2"
      >
        <span className="text-xl">&larr;</span> Prev
      </Link>
      <div className="text-amber-400 font-bold text-3xl">{year}</div>
      <Link
        to={MainRoute.to}
        search={{ year: Number(year + 1) }}
        className="text-neutral-400 hover:text-neutral-50 flex items-center justify-center gap-2"
      >
        Next <span className="text-xl">&rarr;</span>
      </Link>
    </div>
  );
};
