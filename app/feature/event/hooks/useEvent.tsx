import { useState } from 'react'
import {
  selectEventById,
  updateEventData,
} from '../infrastructure/eventRepository'
import { selectOrganizersByEventId } from '../infrastructure/eventOrganizerRepository'
import { selectEventDjByEventId } from '../infrastructure/eventDjRepository'
import { selectEventVjByEventId } from '../infrastructure/eventVjRepository'
import { selectLisnersByEventId } from '../infrastructure/ticketRepository'

export const useEvent = () => {
  const [base, setBase] = useState<Event>()
  const [organizers, setOrganizers] = useState<Organizers>()
  const [timetable, setTimeTable] = useState<TimeTable>()
  const [vjtable, setVjTable] = useState<TimeTable>()
  const [lisners, setLisners] = useState<Lisners>()

  const loadEvent = async (id: number) => {
    const base_data = await selectEventById(id)
    if (base_data) setBase(base_data)

    const organizers_data = await selectOrganizersByEventId(id)
    if (organizers_data) setOrganizers(organizers_data)

    const timetable_data = await selectEventDjByEventId(id)
    if (timetable_data) setTimeTable(timetable_data)

    const vjtable_data = await selectEventVjByEventId(id)
    if (vjtable_data) setVjTable(vjtable_data)

    const lisners_data = await selectLisnersByEventId(id)
    if (lisners_data) setLisners(lisners_data)
  }

  async function updateEvent() {
    if (base) await updateEventData(base)
  }

  return {
    event: {
      base,
      organizers,
      timetable,
      vjtable,
      lisners,
    },
    handleEvent: {
      loadEvent,
      updateEvent,
      setBase,
    },
  } as const
}

export type Event = {
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

export type Organizers = {
  user_id: string
  name: string
  icon_url: string | null
  text: string | null
}[]

export type TimeTable = {
  row_number: number
  user_id: string | null
  name: string
  text: string | null
  icon_url: string | null
  start_time: Date
  end_time: Date
}[]

export type VjTable = {
  row_number: number
  user_id: string | null
  name: string
  text: string | null
  icon_url: string | null
  start_time: Date
  end_time: Date
}[]

export type Lisners = {
  user_id: string
  name: string
  icon_url: string | null
}[]
