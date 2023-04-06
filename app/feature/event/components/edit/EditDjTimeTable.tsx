import { HandleEvent } from '../hooks/useEvent'
import { HandleSearch } from '../hooks/useSearchUser'

type propsType = {
  children: React.ReactNode
  handleEvent: HandleEvent
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
            props.handleSearch.addEmptyTimetableRow()
            props.handleEvent.addEmptyTimetableRow()
          }}
        >
          行追加
        </button>
      </div>
      {props.children}
    </>
  )
}
