import { TimeTable } from '../hooks/useEvent'
import { useSearchUser } from '../hooks/useSearchUser'
import { EditTimeTableRow } from './EditTimeTableRow'

type propsType = {
  timetable: TimeTable
  setTimetable: (timetable: TimeTable) => void
}

export const EditDjTimeTableRow = (props: propsType) => {
  const { search, handleSearch } = useSearchUser(props.timetable)

  return (
    <>
      <div className="w-full text-center">
        <p className="w-full text-white font-bold text-2xl text-center my-4">
          タイムテーブル
        </p>
        <button
          className="px-4 py-2 mb-4 text-white transition-colors duration-300 border border-gray-200 bg-[rgba(28,32,37,1)] rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
          onClick={() => {
            const newTimetable = handleSearch.addEmptyTimetableRow()
            props.setTimetable(newTimetable)
          }}
        >
          行追加
        </button>
      </div>

      {props.timetable.map((row, index) => {
        return (
          <div key={row.row_number}>
            <EditTimeTableRow
              row={row}
              index={index}
              search={search}
              handleSearch={handleSearch}
              timetable={props.timetable}
              setTimetable={props.setTimetable}
            />
          </div>
        )
      })}
    </>
  )
}
