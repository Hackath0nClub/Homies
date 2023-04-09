import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { utcToZonedTime } from 'date-fns-tz'
import {
  eventBaseState,
  organizersState,
  OrganizersType,
  timeTableState,
  TimeTableType,
  DjType,
  vjTableState,
  VjTableType,
  listenersState,
  ListenersType,
  fileState,
} from '../store/eventState'
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
  const [base, setBase] = useRecoilState(eventBaseState)
  const [organizers, setOrganizers] = useRecoilState(organizersState)
  const [timetable, setTimeTable] = useRecoilState(timeTableState)
  const [vjtable, setVjTable] = useRecoilState(vjTableState)
  const [listener, setListener] = useRecoilState(listenersState)
  const [file, setFile] = useRecoilState(fileState)

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

  const setTitle = (title: string) => setBase({ ...base, title: title })
  const setText = (text: string) => setBase({ ...base, text: text })

  const updateEvent = async () => {
    console.log(file)
    if (base && file) {
      const file_name = base.id + '.png'
      await uploadEventImage({ file_name: file_name, file: file })
    }
    if (base) await updateEventData(base)
  }

  const setTimetableRow = (index: number, row: DjType) => {
    if (!timetable) return
    const newTimetable = [...timetable]
    newTimetable[index] = row
    setTimeTable(newTimetable)
  }

  const addEmptyTimetableRow = () => {
    if (!timetable) return
    const newTimetable = [
      ...timetable,
      {
        row_number: timetable.length + 1,
        user_id: '',
        name: '',
        text: '',
        icon_url: '',
        start_time: utcToZonedTime(new Date(), 'Asia/Tokyo'),
        end_time: utcToZonedTime(new Date(), 'Asia/Tokyo'),
      },
    ]
    setTimeTable(newTimetable)
  }

  const updateTimetableRowStartTime = (index: number, start_time: Date) => {
    if (!timetable) return
    const newTimetable = [...timetable]
    newTimetable[index].start_time = start_time
    setTimeTable(newTimetable)
  }

  const updateTimetableRowEndTime = (index: number, end_time: Date) => {
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
      user_id: '',
      name: '',
      text: '',
      icon_url: '',
      start_time: utcToZonedTime(new Date(), 'Asia/Tokyo'),
      end_time: utcToZonedTime(new Date(), 'Asia/Tokyo'),
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
    base,
    organizers,
    timetable,
    vjtable,
    listener,
    file,
    loadEvent,
    updateEvent,
    setTitle,
    setText,
    setFile,
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
      setTimetableRow,
      addEmptyTimetableRow,
      updateTimetableRowStartTime,
      updateTimetableRowEndTime,
      clearTimetableRow,
      deleteTimetableRow,
      shiftUpTimetableRow,
    },
  } as const
}

export type HandleEvent = {
  loadEvent: (id: number) => Promise<{
    data: Event | undefined
    organizers: OrganizersType | undefined
    timetable: TimeTableType | undefined
    vjtable: VjTableType | undefined
    listener: ListenersType | undefined
  }>
  updateEvent: () => Promise<void>
  setBase: (base: Event) => void
  setFile: (file: File) => void
  setTimeTable: (timetable: TimeTableType) => void
  setTimetableRow: (index: number, row: DjType) => void
  addEmptyTimetableRow: () => void
  updateTimetableRowStartTime: (index: number, start_time: Date | null) => void
  updateTimetableRowEndTime: (index: number, end_time: Date | null) => void
  clearTimetableRow: (index: number) => void
  deleteTimetableRow: (index: number) => void
  shiftUpTimetableRow: (index: number) => void
}
