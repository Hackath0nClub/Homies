import { useState } from 'react'
import { selectEventDjByEventId } from '../infrastructure/eventDjRepository'

export type TimeTable =
  | {
      row_number: number
      user_id: string | null
      name: string
      text: string | null
      icon_url: string | null
      start_time: Date
      end_time: Date
    }[]
  | undefined

export const useTimeTable = () => {
  const [time_table, setTimeTable] = useState<TimeTable>()

  const getTimeTable = async (id: number) => {
    const list: TimeTable = await selectEventDjByEventId(id)
    if (list) setTimeTable(list)
  }

  return { time_table, getTimeTable } as const
}
