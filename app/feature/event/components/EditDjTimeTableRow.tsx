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

      {props.timetable.map((row) => {
        const bg =
          row.row_number % 2 == 1
            ? 'bg-[rgba(39,39,63,1)]' // 偶数行の背景色
            : 'bg-[rgba(27,28,46,1)]' // 奇数行の背景色
        return (
          <div
            className={`${bg} pt-2 pb-4 border-y border-white`}
            key={row.row_number}
          >
            <div className="grid grid-rows-2">
              <div className="row-span-1 h-full flex justify-center items-center">
                <div className="grid grid-cols-3 w-3/5">
                  <div className="col-span-1">
                    <DatePicker
                      selected={row.start_time}
                      onChange={(date) => date}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={10}
                      timeCaption="Time"
                      dateFormat="h:mm aa"
                      className="w-full px-2 block placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                    />
                  </div>
                  <span className="col-span-1 text-center">-</span>
                  <div className="col-span-1">
                    <DatePicker
                      selected={row.end_time}
                      onChange={(date) => date}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={10}
                      timeCaption="Time"
                      dateFormat="h:mm aa"
                      className="w-full px-2 block placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                    />
                  </div>
                </div>
              </div>
              <div className="row-span-1 h-full flex justify-center items-center">
                <div className="grid grid-cols-2 w-3/5 gap-x-4">
                  <div className="col-span-1">
                    <span className="w-full text-sm">idで検索</span>
                    <input
                      type="text"
                      className="row-span-1 w-full px-2 block placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                      value={row.user_id ?? ''}
                      onChange={(e) => {}}
                    />
                  </div>
                  <div className="col-span-1">
                    <span className="w-full text-sm">名前</span>
                    <input
                      type="text"
                      className="row-span-1 w-full px-2 block placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                      value={row.name ?? ''}
                      onChange={(e) => {}}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}
