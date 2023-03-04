import { TimeTable } from '../hooks/useEvent'
import { Search, HandleSearch } from '../hooks/useSearchUser'

type propsType = {
  children: any
  timetable: TimeTable
  setTimetable: (timetable: TimeTable) => void
  search: Search
  handleSearch: HandleSearch
}

export const EditDjTimeTable = (props: propsType) => {
  return (
    <>
      <div className="w-full text-center">
        <p className="w-full text-white font-bold text-2xl text-center my-4">
          タイムテーブル
        </p>
        <button
          className="px-4 py-2 mb-4 text-white transition-colors duration-300 border border-gray-200 bg-[rgba(28,32,37,1)] rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
          onClick={() => {
            const newTimetable = props.handleSearch.addEmptyTimetableRow()
            props.setTimetable(newTimetable)
          }}
        >
          行追加
        </button>
      </div>
      {props.children}
    </>
  )
}
