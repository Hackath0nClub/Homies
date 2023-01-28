import { useState } from 'react'
import { selectEventById } from '../infrastructure/eventRepository'
import { selectOrganizerByEventId } from '../infrastructure/eventOrganizerRepository'

export const useEvent = () => {
  const [event, setEvent] = useState<Event>()
  const [organizers, setOrganizers] = useState<Organizers>()

  async function loadEvent(id: number) {
    const event_data = await selectEventById(id)
    if (event_data) setEvent(event_data)

    const organizer_data = await selectOrganizerByEventId(id)
    if (organizer_data) setOrganizers(organizer_data)
  }

  return { event, organizers, loadEvent } as const
}

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

export type Organizers =
  | {
      user_id: string
      name: string
      icon_url: string | null
      text: string | null
    }[]
  | undefined
