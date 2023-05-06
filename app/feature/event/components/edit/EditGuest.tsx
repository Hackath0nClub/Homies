import { useRef } from 'react'
import { useTimetable } from '../../hooks/useTimetable'

export const EditGuest = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const {
    timetable,
    updateTimetableRowName,
    updateTimetableRowText,
    updateTimetableRowIconUrl,
  } = useTimetable()

  return (
    <>
      <p className="text-white text-left font-bold text-2xl my-4">
        ゲストDJ/VJ
      </p>
      <div className="guest-row-guest-details">
        {timetable.map((row, index) => {
          if (row.user_id?.charAt(0) != '@') {
            return (
              <div
                className="w-full grid grid-cols-3 gap-8 m-8"
                key={row.user_id}
              >
                <img
                  alt={row.name}
                  src={row.icon_url}
                  className="rounded-full col-span-1"
                />
                <div className="col-span-2">
                  <p className="text-white text-xl">{row.name}</p>
                  <p className="text-white text-base">{row.text}</p>
                </div>
              </div>
            )
          } else {
            return (
              <div
                className="w-full grid grid-cols-3 gap-8 m-8"
                key={row.user_id}
              >
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  ref={inputRef}
                  onChange={(e) => {
                    const local_file = e.target.files?.[0]
                    if (!local_file) return
                    const iconUrl = URL.createObjectURL(local_file)
                    updateTimetableRowIconUrl(index, iconUrl)
                  }}
                />
                <img
                  alt="icon"
                  src={row.icon_url}
                  className="rounded-full col-span-1 cursor-pointer hover:opacity-50 bg-gray-500"
                  onClick={() => inputRef.current?.click()}
                />
                <div className="col-span-2">
                  <input
                    type="text"
                    className="block mt-2 h-8 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-2 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                    value={row.name}
                    onChange={(e) => {
                      updateTimetableRowName(index, e.target.value)
                    }}
                  />
                  <textarea
                    className="block mt-2 h-32 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-2 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                    id="message"
                    value={row.text}
                    onChange={(e) => {
                      updateTimetableRowText(index, e.target.value)
                    }}
                  />
                </div>
              </div>
            )
          }
        })}
      </div>
    </>
  )
}
