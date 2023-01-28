import { useState } from 'react'
import { selectLisnersByEventId } from '../infrastructure/ticketRepository'

export type Lisners =
  | {
      user_id: string
      name: string
      icon_url: string | null
    }[]
  | undefined

export const useLisner = () => {
  const [lisners, setLisners] = useState<Lisners>()

  async function getLisners(id: number) {
    const data = await selectLisnersByEventId(id)
    if (data) setLisners(data)
  }

  return { lisners, getLisners } as const
}
