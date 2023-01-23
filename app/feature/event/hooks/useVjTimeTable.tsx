import { useState } from 'react'
import { selectEventVjByEventId } from '../infrastructure/eventVjRepository'

export type VjTable =
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

export const useVjTable = () => {
  const [vj_table, setVjTable] = useState<VjTable>()

  const getVjTable = async (id: number) => {
    const list: VjTable = await selectEventVjByEventId(id)
    if (list) setVjTable(list)
  }

  return { vj_table, getVjTable } as const
}
