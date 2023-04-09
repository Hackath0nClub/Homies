import { useTimetable } from '../../hooks/useTimetable'
import { useSearchUser } from '../../hooks/useSearchUser'
import { EditTimeTableRow } from './EditTimeTableRow'

export const EditDjTimeTable = () => {
  const { timetable, addEmptyTimetableRow } = useTimetable()
  const { addEmptySearchUser } = useSearchUser()
  return (
    <>
      <div className="w-full text-center">
        <p className="w-full text-white font-bold text-2xl text-center my-4">
          タイムテーブル
        </p>
        <button
          className="px-4 py-2 mb-4 text-white transition-colors duration-300 border border-gray-200 bg-[rgba(28,32,37,1)] rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
          onClick={() => {
            addEmptyTimetableRow()
            addEmptySearchUser()
          }}
        >
          行追加
        </button>
      </div>
      {timetable.map((row, index) => (
        <EditTimeTableRow index={index} />
      ))}
    </>
  )
}
