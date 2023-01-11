import { useState } from 'react'
import { splitDateTime } from '../../../lib/splitDateTime'
import { selectEventVjByEventId } from '../infrastructure/eventVjRepository'

type TimeTable =
  | {
      row_number: number
      name: string | null
      user_id: string | null
      text: string | null
      icon_url: string | null
      start_time: string
      end_time: string
    }[]
  | undefined

const useVjTable = () => {
  const [vj_table, setVjTable] = useState<TimeTable>()

  const getVjTable = async (id: number) => {
    const list: TimeTable = await selectEventVjByEventId(id)
    if (!list) return
    // タイムテーブル順に並び替える
    if (list.length > 1) list.sort((a, b) => a.row_number - b.row_number)
    // 時間をDate表記をから hh:mm 表記へ変更
    console.log(list)
    list.map((row) => {
      const start = splitDateTime(new Date(row.start_time))
      row.start_time = start.time
      const end = splitDateTime(new Date(row.end_time))
      row.end_time = end.time
    })
    setVjTable(list)
    return list
  }

  return [vj_table, getVjTable] as const
}

export default useVjTable
