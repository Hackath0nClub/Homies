import { useTimetable } from '../../hooks/useTimetable'
import { useSearchUser } from '../../hooks/useSearchUser'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { DjType } from '../../store/eventState'
import { useState } from 'react'

export const EditTimeTableRow = ({ dj }: { dj: DjType }) => {
  const {
    setTimetableRowStartTime,
    setTimetableRowEndTime,
    shiftUpTimetableRow,
    clearTimetableRow,
    deleteTimetableRow,
  } = useTimetable()
  const index = dj.row_number ? dj.row_number - 1 : 0

  const bg =
    index % 2 == 0
      ? 'bg-[rgba(39,39,63,1)]' // 偶数行の背景色
      : 'bg-[rgba(27,28,46,1)]' // 奇数行の背景色

  const main = () => {
    return (
      <div className={`${bg} pt-2 pb-4 border-y border-white`}>
        <div className="grid grid-cols-5">
          <SideArea>
            <TimetableRowShiftButtons />
          </SideArea>
          <CenterArea
            topleft={<StartTimePicker />}
            topright={<EndTimePicker />}
            bottomleft={<UserSearchInput index={index} dj={dj} />}
            bottomright={<UserNameInput />}
          ></CenterArea>
          <SideArea>
            <TimetableRowDeleteButton />
          </SideArea>
        </div>
      </div>
    )
  }

  const StartTimePicker = () => (
    <DatePicker
      selected={dj.start_time}
      onChange={(date) => {
        if (date) setTimetableRowStartTime(index, date)
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
        if (date) setTimetableRowEndTime(index, date)
      }}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={10}
      timeCaption="Time"
      dateFormat="h:mm aa"
      className="w-full px-2 block placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
    />
  )

  const TimetableRowShiftButtons = () => {
    return (
      <>
        <div onClick={() => shiftUpTimetableRow(index)}>
          <IconArrowUp />
        </div>
        <div onClick={() => shiftUpTimetableRow(index + 1)}>
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
            onClick={() => clearTimetableRow(index)}
          >
            ×
          </div>
        </div>
      </>
    )
  }

  const TimetableRowDeleteButton = () => {
    return (
      <div onClick={() => deleteTimetableRow(index)}>
        <IconArchiveBox />
      </div>
    )
  }

  const SideArea = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="col-span-1 h-full flex justify-center items-center">
        {children}
      </div>
    )
  }

  const CenterArea = ({
    topleft,
    topright,
    bottomleft,
    bottomright,
  }: {
    topleft: React.ReactNode
    topright: React.ReactNode
    bottomleft: React.ReactNode
    bottomright: React.ReactNode
  }) => {
    return (
      <div className="col-span-3">
        <div className="grid grid-rows-2">
          <div className="row-span-1 h-full flex justify-center items-center">
            <div className="grid grid-cols-3">
              <div className="col-span-1">{topleft}</div>
              <span className="col-span-1 text-center">-</span>
              <div className="col-span-1">{topright}</div>
            </div>
          </div>
          <div className="row-span-1 h-full flex justify-center items-center">
            <div className="grid grid-cols-2 gap-x-4">
              <div className="col-span-1">{bottomleft}</div>
              <div className="col-span-1">{bottomright}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return main()
}

const UserSearchInput = ({ index, dj }: { index: number; dj: DjType }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [onMouseOver, setOnMouseOver] = useState(false)
  const { handleInputChange, results } = useSearchUser()
  const { setTimetableRowUser } = useTimetable()

  return (
    <>
      <span className="w-full text-sm">idで検索</span>
      <input
        type="text"
        className="row-span-1 w-full px-2 block placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
        defaultValue={dj.user_id?.charAt(0) != '@' ? dj.user_id : ''}
        onFocus={(e) => {
          handleInputChange(e.target.value)
          setIsOpen(true)
        }}
        onBlur={() => {
          if (onMouseOver) return
          handleInputChange('')
          setIsOpen(false)
        }}
        onChange={(e) => handleInputChange(e.target.value)}
      />
      {isOpen && (
        <ul
          className="absolute z-10 bg-[rgba(47,51,56,1)] mt-2 py-2 rounded-lg shadow-xl"
          onMouseEnter={() => setOnMouseOver(true)}
          onMouseLeave={() => setOnMouseOver(false)}
        >
          {results.map((user) => (
            <li
              key={user.id}
              className="flex align-items-center py-2 px-4 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
              onClick={() => {
                setTimetableRowUser(index, user)
                handleInputChange('')
                setIsOpen(false)
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
