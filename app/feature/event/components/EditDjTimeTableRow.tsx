import { TimeTable } from '../hooks/useEvent'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

type propsType = {
  timetable: TimeTable
  setTimetable: (timetable: TimeTable) => void
}

export const EditDjTimeTableRow = (props: propsType) => {
  return (
    <>
      <p className="w-full text-white font-bold text-2xl text-center my-4">
        タイムテーブル
      </p>

      <div className="w-full grid grid-cols-6 gap-4">
        <div className="col-span-1 grid grid-rows-3 items-center">
          <DatePicker
            selected={props.timetable[0].start_time}
            onChange={(date) => date}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
            className="px-2 w-full block placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
          />
          <div className="text-center">～</div>
          <DatePicker
            selected={props.timetable[0].end_time}
            onChange={(date) => date}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
            className="px-2 w-full block placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
          />
        </div>
        <img
          alt={props.timetable[0].name!}
          src={props.timetable[0].icon_url!}
          className="rounded-full col-span-1"
        />
      </div>
    </>
  )
}
