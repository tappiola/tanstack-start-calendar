import * as fs from 'fs'
import {createFileRoute, Link, Outlet, redirect} from '@tanstack/react-router'
import { createServerFn, useServerFn, useQuery } from '@tanstack/react-start'
import {formatDate, generateMonth, getMonthName, getWeekdayName} from "~/utils/dateUtils";
import {COLUMN_CLASSES} from "~/utils/styling";
import clsx from 'clsx';
import {Route as EventRoute} from '../routes/event.$date';
// import {getAllHolidays, getServerTime} from '../actions';

const filePath = 'count.txt'

async function readCount() {
  return parseInt(
      await fs.promises.readFile(filePath, 'utf-8').catch(() => '0'),
  )
}

const getCount = createServerFn({
  method: 'GET',
}).handler(() => {
  return readCount()
})

export const updateCount = createServerFn({ method: 'POST' })
    .validator((formData) => {
      if (!(formData instanceof FormData)) {
        throw new Error('Invalid form data')
      }

      const day = formData.get('day')

      if (!day) {
        throw new Error('day is required')
      }

      return day.toString()
    })
    .handler(async ({ data }) => {
        // const count = await readCount()
        console.log(data);
        await fs.promises.writeFile(filePath, data)

        throw redirect({
            to: EventRoute.to,
            params: { date: data },
        })

        return 'Koala'
    })


export const Calendar = () => {
  // const allHolidays = getAllHolidays();
  // console.log({allHolidays});

    // const getTime = useServerFn(getServerTime);
    // const timeQuery = useQuery({
    //     queryKey: 'time',
    //     queryFn: () => getTime(),
    // })
    // const {data} = timeQuery();
    // console.log({data});

  return (
      <div className="p-9 h-screen bg-stone-800 text-white">
          <Outlet/>
          <div className="grid grid-cols-3 gap-9 max-w-5/6 mx-auto justify-center">
              {Array.from({ length: 12 }, (_, idx) => <Month key={idx} monthIndex={idx}/>)}
          </div>
      </div>
  )
}

const Month = ({monthIndex}: {monthIndex: number}) => {

    return <div className="max-w-3xs w-3xs mx-auto">
        <h2 className="uppercase text-orange-400 text-center mb-3">{getMonthName(monthIndex)}</h2>
        <div className="grid grid-cols-7 text-center">
            {Array.from({ length: 7 }, (_, idx) => <div key={idx}>{getWeekdayName(idx)}</div>) }
        {generateMonth(2025, monthIndex).days.map((day, idx) =>
            // <form
            //     key={day.dayOfMonth}
            //     action={updateCount.url}
            //     method="POST"
            //     encType="multipart/form-data"
            //     className={clsx({[COLUMN_CLASSES[day.dayOfWeek]]: idx === 0,
            //     'text-orange-700': day.isWeekend,
            //     'text-amber-300': day.dayOfMonth == 12,
            //     })}
            //     >
            //     <input type="hidden" name="day" value={day.dayOfMonth}/>
            //     <button type="submit">{day.dayOfMonth}</button></form>
            <Link
            key={day.dayOfMonth}
            to={EventRoute.to}
            params={{date: formatDate(day.dayOfMonth, monthIndex, 2025) }}
            className={clsx({[COLUMN_CLASSES[day.dayOfWeek]]: idx === 0,
                'text-orange-700': day.isWeekend,
                'text-amber-300': day.dayOfMonth == 12,
            })}
        >
            {day.dayOfMonth}</Link>
        )
        }
    </div>
    </div>
}
