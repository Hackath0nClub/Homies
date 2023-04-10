import { useTimetable } from '../../../../feature/event/hooks/useTimetable'
import { getTime } from '../../../../lib/splitDateTime'
import { VjType } from '../../store/eventState'

export const VjTimeTable = () => {
  const { vjtable } = useTimetable()

  const VjTimeTableRow = ({ vj }: { vj: VjType }) => {
    const bg =
      (vj.row_number ?? 0) % 2 == 1
        ? 'bg-[rgba(39,39,63,1)]' // 偶数行の背景色
        : 'bg-[rgba(27,28,46,1)]' // 奇数行の背景色
    const start_time = vj.start_time ? getTime(vj.start_time) : null
    const end_time = vj.end_time ? getTime(vj.end_time) : null

    return (
      <div className={`${bg} p-2 border-y border-white`}>
        <p className="text-white text-base text-center">
          {start_time} - {end_time}
        </p>
        <p className="text-white text-base text-center">{vj.name}</p>
      </div>
    )
  }

  return (
    <>
      <p className="w-full text-white font-bold text-2xl text-center my-4">
        VJテーブル
      </p>

      {vjtable.map((vj, index) => (
        <VjTimeTableRow vj={vj} key={index} />
      ))}
    </>
  )
}
