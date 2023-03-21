import { useState } from 'react'
import {
  selectEventById,
  updateEventData,
} from '../infrastructure/eventDatabase'
import { selectOrganizersByEventId } from '../infrastructure/eventOrganizerDatabase'
import { selectEventDjByEventId } from '../infrastructure/eventDjDatabase'
import { selectEventVjByEventId } from '../infrastructure/eventVjDatabase'
import { selectListenerByEventId } from '../infrastructure/ticketDatabase'
import { uploadEventImage } from '../infrastructure/eventStrage'

export const useEvent = () => {
  const [base, setBase] = useState<Event>()
  const [organizers, setOrganizers] = useState<Organizers>()
  const [timetable, setTimeTable] = useState<TimeTable>()
  const [vjtable, setVjTable] = useState<VjTable>()
  const [listener, setListener] = useState<Listener>()
  const [file, setFile] = useState<File>()

  const loadEvent = async (id: number) => {
    const base_data = await selectEventById(id)
    if (base_data) setBase(base_data)

    const organizers_data = await selectOrganizersByEventId(id)
    if (organizers_data) setOrganizers(organizers_data)

    const timetable_data = await selectEventDjByEventId(id)
    if (timetable_data) setTimeTable(timetable_data)

    const vjtable_data = await selectEventVjByEventId(id)
    if (vjtable_data) setVjTable(vjtable_data)

    const listener_data = await selectListenerByEventId(id)
    if (listener_data) setListener(listener_data)

    return {
      data: base_data,
      organizers: organizers_data,
      timetable: timetable_data,
      vjtable: vjtable_data,
      listener: listener_data,
    } as const
  }

  const updateEvent = async () => {
    if (base && file) {
      const file_name = base.id + '.png'
      await uploadEventImage({ file_name: file_name, file: file })
    }
    if (base) await updateEventData(base)
  }

  const addEmptyTimetableRow = () => {
    if (!timetable) return
    const newTimetable = [
      ...timetable,
      {
        row_number: timetable.length + 1,
        user_id: null,
        name: '',
        text: null,
        icon_url: null,
        start_time: null,
        end_time: null,
        guest_name: null,
        guest_text: null,
        guest_icon_url: null,
      },
    ]
    setTimeTable(newTimetable)
  }

  const updateTimetableRowStartTime = (
    index: number,
    start_time: Date | null
  ) => {
    if (!timetable) return
    const newTimetable = [...timetable]
    newTimetable[index].start_time = start_time
    setTimeTable(newTimetable)
  }

  const updateTimetableRowEndTime = (index: number, end_time: Date | null) => {
    if (!timetable) return
    const newTimetable = [...timetable]
    newTimetable[index].end_time = end_time
    setTimeTable(newTimetable)
  }

  const clearTimetableRow = (index: number) => {
    if (!timetable) return
    const newTimetable = [...timetable]
    const updatedTimetable = {
      ...newTimetable[index],
      user_id: null,
      name: '',
      text: null,
      icon_url: null,
      start_time: null,
      end_time: null,
    }
    newTimetable[index] = updatedTimetable
    setTimeTable(newTimetable)
  }

  const deleteTimetableRow = (index: number) => {
    if (!timetable) return
    let newTimetable = [...timetable]
    newTimetable.splice(index, 1)
    newTimetable = newTimetable.map((row, index) => {
      row.row_number = index + 1
      return row
    })
    setTimeTable(newTimetable)
  }

  const shiftUpTimetableRow = (index: number) => {
    if (!timetable) return
    if (index == 0) return
    let newTimetable = [...timetable]
    const target = newTimetable[index]
    newTimetable[index] = newTimetable[index - 1]
    newTimetable[index - 1] = target
    newTimetable = newTimetable.map((row, index) => {
      row.row_number = index + 1
      return row
    })
    setTimeTable(newTimetable)
  }

  return {
    event: {
      base,
      organizers,
      timetable,
      vjtable,
      listener,
      file,
    },
    handleEvent: {
      loadEvent,
      updateEvent,
      setBase,
      setFile,
      setTimeTable,
      addEmptyTimetableRow,
      updateTimetableRowStartTime,
      updateTimetableRowEndTime,
      clearTimetableRow,
      deleteTimetableRow,
      shiftUpTimetableRow,
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

export type Dj = {
  row_number: number
  user_id: string | null
  name: string
  text: string | null
  icon_url: string | null
  start_time: Date | null
  end_time: Date | null
  guest_name: string | null
  guest_text: string | null
  guest_icon_url: string | null
}

export type TimeTable = Dj[]

export type VjTable = {
  row_number: number
  user_id: string | null
  name: string
  text: string | null
  icon_url: string | null
  start_time: Date
  end_time: Date
}[]

export type Listener = {
  user_id: string
  name: string
  icon_url: string | null
}[]

export type User = {
  id: string
  name: string
  icon_url: string | null
  text: string | null
}

export type Users = User[]

export type HandleEvent = {
  loadEvent: (id: number) => Promise<{
    data: Event | undefined
    organizers: Organizers | undefined
    timetable: TimeTable | undefined
    vjtable: VjTable | undefined
    listener: Listener | undefined
  }>
  updateEvent: () => Promise<void>
  setBase: (base: Event) => void
  setFile: (file: File) => void
  setTimeTable: (timetable: TimeTable) => void
  addEmptyTimetableRow: () => void
  updateTimetableRowStartTime: (index: number, start_time: Date | null) => void
  updateTimetableRowEndTime: (index: number, end_time: Date | null) => void
  clearTimetableRow: (index: number) => void
  deleteTimetableRow: (index: number) => void
  shiftUpTimetableRow: (index: number) => void
}
