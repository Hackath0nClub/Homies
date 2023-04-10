import { useTimetable } from '../../hooks/useTimetable'
import { useSearchUser } from '../../hooks/useSearchUser'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { DjType } from '../../store/eventState'

export const EditTimeTableRow = ({ dj }: { dj: DjType }) => {
  const {
    timetable,
    setTimeTable,
    updateTimetableRowStartTime,
    updateTimetableRowEndTime,
    shiftUpTimetableRow,
    clearTimetableRow,
  } = useTimetable()
  const {
    keywords,
    results,
    isOpens,
    shiftUpSearchUserRow,
    handleInputChange,
    selectUser,
    clearKeyword,
  } = useSearchUser()
  const index = dj.row_number ? dj.row_number - 1 : 0
  const keyword = keywords[index]
  const result = results[index]
  const isOpen = isOpens[index]

  const bg =
    index % 2 == 0
      ? 'bg-[rgba(39,39,63,1)]' // 偶数行の背景色
      : 'bg-[rgba(27,28,46,1)]' // 奇数行の背景色

  const StartTimePicker = () => (
    <DatePicker
      selected={dj.start_time}
      onChange={(date) => {
        if (date) updateTimetableRowStartTime(index, date)
      }}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={10}
      timeCaption="Time"
      dateFormat="h:mm aa"
      className="w-full px-2 block placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
    />
  )

  const EndTimePicker = () => (
    <DatePicker
      selected={dj.end_time}
      onChange={(date) => {
        if (date) updateTimetableRowEndTime(index, date)
      }}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={10}
      timeCaption="Time"
      dateFormat="h:mm aa"
      className="w-full px-2 block placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
    />
  )

  const TimeRangePicker = () => {
    return (
      <div className="grid grid-cols-3">
        <div className="col-span-1">
          <StartTimePicker />
        </div>
        <span className="col-span-1 text-center">-</span>
        <div className="col-span-1">
          <EndTimePicker />
        </div>
      </div>
    )
  }

  const TimetableRowShiftButtons = () => {
    return (
      <>
        <div
          onClick={() => {
            shiftUpTimetableRow(index)
            shiftUpSearchUserRow(index)
          }}
        >
          <IconArrowUp />
        </div>
        <div
          onClick={() => {
            shiftUpTimetableRow(index + 1)
            shiftUpSearchUserRow(index + 1)
          }}
        >
          <IconArrowDown />
        </div>
      </>
    )
  }

  const UserNameInput = () => {
    return (
      <>
        <p className="w-full text-sm">名前</p>
        <div className="w-full mt-1 px-2 flex justify-between placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg bg-[rgba(47,51,56,1)] text-gray-700 dark:text-gray-300">
          <div className="text-left">{dj.name}</div>
          <div
            className="text-right cursor-pointer"
            onClick={() => {
              clearTimetableRow(index)
              clearKeyword(index)
            }}
          >
            ×
          </div>
        </div>
      </>
    )
  }

  return (
    <div className={`${bg} pt-2 pb-4 border-y border-white`}>
      <div className="grid grid-cols-5">
        <div className="col-span-1 h-full flex justify-center items-center">
          <TimetableRowShiftButtons />
        </div>
        <div className="col-span-3">
          <div className="grid grid-rows-2">
            <div className="row-span-1 h-full flex justify-center items-center">
              <TimeRangePicker />
            </div>
            <div className="row-span-1 h-full flex justify-center items-center">
              <div className="grid grid-cols-2 gap-x-4">
                <div className="col-span-1">
                  <UserSearchInput index={index} />
                </div>
                <div className="col-span-1">
                  <UserNameInput />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1 h-full flex justify-center items-center">
          {/* <div
            onClick={() => {
              props.handleEvent.deleteTimetableRow(props.index)
              props.handleSearch.deleteSearchUserRow(props.index)
            }}
          > */}
          <IconArchiveBox />
          {/* </div> */}
        </div>
      </div>
    </div>
  )
}

const UserSearchInput = ({ index }: { index: number }) => {
  const { keywords, results, isOpens, handleInputChange, selectUser } =
    useSearchUser()
  const { setTimeTable } = useTimetable()
  const keyword = keywords[index]
  const result = results[index]
  const isOpen = isOpens[index]
  return (
    <>
      <span className="w-full text-sm">idで検索</span>
      <input
        type="text"
        className="row-span-1 w-full px-2 block placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
        value={keyword ?? ''}
        onChange={(e) => handleInputChange(index, e.target.value)}
      />
      {isOpen && (
        <ul className="absolute z-10 bg-[rgba(47,51,56,1)] mt-2 py-2 rounded-lg shadow-xl">
          {result.map((user, index) => (
            <li
              key={index}
              className="flex align-items-center py-2 px-4 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
              onClick={() => {
                const newTimetable = selectUser(index, user)
                setTimeTable(newTimetable)
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
    </>
  )
}

// Beautiful hand-crafted SVG icons, by the makers of Tailwind CSS.
// https://heroicons.com/
const IconArchiveBox = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-6 h-6 cursor-pointer stroke-red-800"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
      />
    </svg>
  )
}

const IconArrowUp = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-5 h-5 cursor-pointer stroke-gray-500"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"
      />
    </svg>
  )
}

const IconArrowDown = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5 cursor-pointer stroke-gray-500"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
      />
    </svg>
  )
}
