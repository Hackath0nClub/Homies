import { useTimetable } from '../../../../feature/event/hooks/useTimetable'
import { getTime } from '../../../../lib/splitDateTime'
import { DjType } from '../../store/eventState'

export const DjTimeTable = () => {
  const { timetable } = useTimetable()

  const DjTimeTableRow = ({ dj }: { dj: DjType }) => {
    const bg =
      (dj.row_number ?? 0) % 2 == 1
        ? 'bg-[rgba(39,39,63,1)]' // 偶数行の背景色
        : 'bg-[rgba(27,28,46,1)]' // 奇数行の背景色
    const start_time = dj.start_time ? getTime(dj.start_time) : null
    const end_time = dj.end_time ? getTime(dj.end_time) : null

    return (
      <div className={`${bg} p-2 border-y border-white`}>
        <p className="text-white text-base text-center">
          {start_time} - {end_time}
        </p>
        <p className="text-white text-base text-center">{dj.name}</p>
      </div>
    )
  }

  return (
    <>
      <p className="w-full text-white font-bold text-2xl text-center my-4">
        タイムテーブル
      </p>

      {timetable.map((dj, index) => (
        <DjTimeTableRow dj={dj} key={index} />
      ))}
    </>
  )
}
