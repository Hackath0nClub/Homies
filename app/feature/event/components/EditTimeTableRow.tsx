import { Dj, HandleEvent } from '../hooks/useEvent'
import { Search, HandleSearch } from '../hooks/useSearchUser'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

type propsType = {
  row: Dj
  index: number
  search: Search
  handleSearch: HandleSearch
  handleEvent: HandleEvent
}

export const EditTimeTableRow = (props: propsType) => {
  const keyword = props.search.keywords[props.index]
  const result = props.search.results[props.index]
  const isOpen = props.search.isOpens[props.index]

  const bg =
    props.index % 2 == 1
      ? 'bg-[rgba(39,39,63,1)]' // 偶数行の背景色
      : 'bg-[rgba(27,28,46,1)]' // 奇数行の背景色

  return (
    <div className={`${bg} pt-2 pb-4 border-y border-white`}>
      <div className="grid grid-rows-2">
        <div className="row-span-1 h-full flex justify-center items-center">
          <div className="grid grid-cols-3 w-3/5">
            <div className="col-span-1">
              <DatePicker
                selected={props.row.start_time}
                onChange={(date) => {
                  if (date)
                    props.handleEvent.updateDjStartTime(props.index, date)
                }}
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
                selected={props.row.end_time}
                onChange={(date) => {
                  if (date) props.handleEvent.updateDjEndTime(props.index, date)
                }}
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
                value={keyword}
                onChange={(value) => {
                  props.handleSearch.handleInputChange(props.index, value)
                }}
              />

              {isOpen && (
                <ul className="absolute z-10 bg-[rgba(47,51,56,1)] mt-2 py-2 rounded-lg shadow-xl">
                  {result.map((user, index) => (
                    <li
                      key={index}
                      className="flex align-items-center py-2 px-4 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                      onClick={() => {
                        const newTimetable = props.handleSearch.selectUser(
                          props.index,
                          user
                        )
                        props.handleEvent.setTimeTable(newTimetable)
                      }}
                    >
                      <img
                        alt=""
                        src={user.icon_url ?? ''}
                        className="rounded-full w-8"
                      />
                      <p className="mx-2">
                        {user.id} : {user.name}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="col-span-1">
              <p className="w-full text-sm">名前</p>
              <div className="w-full mt-1 px-2 flex justify-between placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg bg-[rgba(47,51,56,1)] text-gray-700 dark:text-gray-300">
                <div className="text-left">{props.row.name}</div>
                <div
                  className="text-right cursor-pointer"
                  onClick={() => {
                    props.handleEvent.clearTimetableRow(props.index)
                    props.handleSearch.clearKeyword(props.index)
                  }}
                >
                  ×
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
