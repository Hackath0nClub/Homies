import { useState } from 'react'
import { selectEventById } from '../infrastructure/eventRepository'

export type Event =
  | {
      id: number
      title: string | null
      text: string | null
      start_at: Date | null
      end_at: Date | null
      capacity: number | null
      image_url: string | null
      location_name: string | null
      location_url: string | null
      note: string | null
      price: number | null
      publicly: boolean | null
      create_at: Date | null
      updated_at: Date | null
    }
  | undefined

export const useEvent = () => {
  const [event, setEvent] = useState<Event>()

  async function getEvent(id: number) {
    const data = await selectEventById(id)
    if (data) setEvent(data)
  }

  return [event, getEvent] as const
}
