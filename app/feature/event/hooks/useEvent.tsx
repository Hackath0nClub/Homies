import { useState } from 'react'
import { selectEventById } from '../infrastructure/eventRepository'
import { selectOrganizersByEventId } from '../infrastructure/eventOrganizerRepository'
import { selectEventDjByEventId } from '../infrastructure/eventDjRepository'
import { selectEventVjByEventId } from '../infrastructure/eventVjRepository'
import { selectLisnersByEventId } from '../infrastructure/ticketRepository'

export const useEvent = () => {
  const [event, setEvent] = useState<Event>()
  const [organizers, setOrganizers] = useState<Organizers>()
  const [timetable, setTimeTable] = useState<TimeTable>()
  const [vjtable, setVjTable] = useState<TimeTable>()
  const [lisners, setLisners] = useState<Lisners>()

  async function loadEvent(id: number) {
    const event_data = await selectEventById(id)
    if (event_data) setEvent(event_data)

    const organizers_data = await selectOrganizersByEventId(id)
    if (organizers_data) setOrganizers(organizers_data)

    const timetable_data = await selectEventDjByEventId(id)
    if (timetable_data) setTimeTable(timetable_data)

    const vjtable_data = await selectEventVjByEventId(id)
    if (vjtable_data) setVjTable(vjtable_data)

    const lisners_data = await selectLisnersByEventId(id)
    if (lisners_data) setLisners(lisners_data)
  }

  type updateEventType = {
    id: number
    input_title: string
    input_description: string
  }

  async function updateEvent(input_event: updateEventType) {
    await upsertEventById(input_event)
  }

  return { event, organizers, timetable, vjtable, lisners, loadEvent } as const
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

export type Lisners =
  | {
      user_id: string
      name: string
      icon_url: string | null
    }[]
  | undefined
