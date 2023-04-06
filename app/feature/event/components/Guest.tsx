import { useRef } from 'react'
import { HandleEvent, TimeTable } from '../hooks/useEvent'

type propsType = {
  timetable: TimeTable
  handleEvent: HandleEvent
}

const Guest = (props: propsType) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const local_file = e.target.files?.[0]
    // if (local_file) props.setFile(local_file)
  }

  return (
    <>
      <p className="text-white text-left font-bold text-2xl my-4">
        ゲストDJ/VJ
      </p>
      <div className="guest-row-guest-details">
        {props.timetable.map((row, index) => {
          if (row.user_id) {
            return (
              <div
                className="w-full grid grid-cols-3 gap-8 m-8"
                key={row.user_id}
              >
                <img
                  alt={row.name!}
                  src={row.icon_url!}
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
                  onChange={uploadImage}
                />
                <img
                  alt="icon"
                  src="/user.png"
                  className="rounded-full col-span-1"
                  onClick={() => inputRef.current?.click()}
                />
                <div className="col-span-2">
                  <input
                    type="text"
                    className="block mt-2 h-8 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-2 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                    value={row.guest_name ?? ''}
                    onChange={(e) => {
                      let newRow = row
                      newRow.guest_name = e.target.value
                      props.handleEvent.setTimetableRow(index, newRow)
                    }}
                  />
                  <textarea
                    className="block mt-2 h-32 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-2 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                    id="message"
                    value={row.guest_text ?? ''}
                    onChange={(e) => {
                      let newRow = row
                      newRow.guest_text = e.target.value
                      props.handleEvent.setTimetableRow(index, newRow)
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

export default Guest
