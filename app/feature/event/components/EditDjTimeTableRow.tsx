import React, { useState, useEffect } from 'react'
import { TimeTable, User, Users } from '../hooks/useEvent'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

type propsType = {
  timetable: TimeTable
  setTimetable: (timetable: TimeTable) => void
  searchUser: (keyword: string) => Promise<Users>
}

export const EditDjTimeTableRow = (props: propsType) => {
  const length = props.timetable.length
  const [keywords, setKeywords] = useState<string[]>(Array(length).fill(''))
  const [results, setResults] = useState<Users[]>(Array(length).fill([]))
  const [isOpens, setIsOpens] = useState<boolean[]>(Array(length).fill(false))
  const [timer, setTimer] = useState<any>()

  useEffect(() => {
    clearTimeout(timer)
    const newTimers = keywords.map((inputValue, index) => {
      if (!inputValue) return null
      return setTimeout(async () => {
        const users = await props.searchUser(inputValue)
        const newResults = [...results]
        newResults[index] = users
        setResults(newResults)
      }, 500)
    })
    setTimer(newTimers)
  }, [keywords])

  const addEmptyElement = () => {
    const newTimetable = [
      ...props.timetable,
      {
        row_number: props.timetable.length + 1,
        user_id: null,
        name: '',
        text: null,
        icon_url: null,
        start_time: null,
        end_time: null,
      },
    ]
    props.setTimetable(newTimetable)
    setKeywords([...keywords, ''])
    setResults([...results, []])
    setIsOpens([...isOpens, false])
  }

  return (
    <>
      <div className="w-full text-center">
        <p className="w-full text-white font-bold text-2xl text-center my-4">
          タイムテーブル
        </p>
        <button
          className="px-4 py-2 mb-4 text-white transition-colors duration-300 border border-gray-200 bg-[rgba(28,32,37,1)] rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
          onClick={addEmptyElement}
        >
          行追加
        </button>
      </div>

      {props.timetable.map((row, index) => {
        const inputValue = keywords[index]
        const isOpen = isOpens[index]
        const result = results[index]

        const handleInputChange = (event: any) => {
          const newInputValues = [...keywords]
          newInputValues[index] = event.target.value
          setKeywords(newInputValues)

          const newIsOpens = [...isOpens]
          newIsOpens[index] = true
          setIsOpens(newIsOpens)
        }

        const updateItem = (index: number, user: User) => {
          const newInputValues = [...keywords]
          const newIsOpens = [...isOpens]
          const newItems = [...props.timetable]

          newInputValues[index] = user.id
          newIsOpens[index] = false
          newItems[index] = { ...newItems[index], ...user }

          setKeywords(newInputValues)
          setIsOpens(newIsOpens)
          props.setTimetable(newItems)
        }

        const updateStartTime = (index: number, start_time: Date | null) => {
          const newItems = [...props.timetable]
          const updatedItem = {
            ...newItems[index],
            start_time: start_time,
          }
          newItems[index] = updatedItem
          props.setTimetable(newItems)
        }

        const updateEndTime = (index: number, end_time: Date | null) => {
          const newItems = [...props.timetable]
          const updatedItem = {
            ...newItems[index],
            end_time: end_time,
          }
          newItems[index] = updatedItem
          props.setTimetable(newItems)
        }

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
                      onChange={(date) => updateStartTime(index, date)}
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
                      onChange={(date) => updateEndTime(index, date)}
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
                      value={inputValue}
                      onChange={handleInputChange}
                    />

                    {isOpen && results.length > 0 && (
                      <ul className="absolute z-10 bg-[rgba(47,51,56,1)] mt-2 py-2 rounded-lg shadow-xl">
                        {result.map((user) => (
                          <li
                            key={user.id}
                            className="flex align-items-center py-2 px-4 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                            onClick={() => updateItem(index, user)}
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
