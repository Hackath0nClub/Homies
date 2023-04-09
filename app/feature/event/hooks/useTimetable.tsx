import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { utcToZonedTime } from 'date-fns-tz'
import {
  djInitial,
  timeTableState,
  TimeTableType,
  DjType,
  vjTableState,
  VjTableType,
} from '../store/eventState'
import { selectEventDjByEventId } from '../infrastructure/eventDjDatabase'
import { selectEventVjByEventId } from '../infrastructure/eventVjDatabase'

export const useTimetable = () => {
  const [timetable, setTimeTable] = useRecoilState(timeTableState)
  const [vjtable, setVjTable] = useRecoilState(vjTableState)

  const loadTimetable = async (id: number) => {
    const timetable_data = await selectEventDjByEventId(id)
    if (timetable_data) setTimeTable(timetable_data)

    const vjtable_data = await selectEventVjByEventId(id)
    if (vjtable_data) setVjTable(vjtable_data)
  }

  const addEmptyTimetableRow = () => {
    if (!timetable) return
    const newTimetable = [
      ...timetable,
      {
        ...djInitial,
        row_number: timetable.length + 1,
      },
    ]
    setTimeTable(newTimetable)
  }

  return {
    timetable,
    vjtable,
    loadTimetable,
    addEmptyTimetableRow,
  } as const
}
