type propsType = {
  timetable:
    | {
        row_number: number
        name: string | null
        user_id: string | null
        text: string | null
        icon_url: string | null
        start_time: string
        end_time: string
      }[]
}

const DjTimeTableRow = (props: propsType) => {
  return (
    <>
      <p className="w-full text-white font-bold text-2xl text-center my-4">
        タイムテーブル
      </p>

      {props.timetable.map((row) => {
        const bg =
          row.row_number % 2 == 1
            ? 'bg-[rgba(39,39,63,1)]' // 偶数行の背景色
            : 'bg-[rgba(27,28,46,1)]' // 奇数行の背景色
        return (
          <div
            className={`${bg} p-2 border-y border-white`}
            key={row.row_number}
          >
            <p className="text-white text-base text-center">
              {row.start_time} - {row.end_time}
            </p>
            <p className="text-white text-base text-center">{row.name}</p>
          </div>
        )
      })}
    </>
  )
}

export default DjTimeTableRow
