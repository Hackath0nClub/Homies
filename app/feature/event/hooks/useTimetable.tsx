import { useRecoilState } from 'recoil'
import { utcToZonedTime } from 'date-fns-tz'
import {
  djInitial,
  timeTableState,
  vjTableState,
  UserType,
} from '../store/eventState'
import { selectEventDjByEventId } from '../infrastructure/eventDjDatabase'
import { selectEventVjByEventId } from '../infrastructure/eventVjDatabase'

export const useTimetable = () => {
  const [timetable, setTimeTable] = useRecoilState(timeTableState)
  const [vjtable, setVjTable] = useRecoilState(vjTableState)

  const loadTimetable = async (id: number) => {
    const timetable_data = await selectEventDjByEventId(id)
    const vjtable_data = await selectEventVjByEventId(id)
    if (!timetable_data || !vjtable_data) return
    setTimeTable(timetable_data)
    setVjTable(vjtable_data)
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

  const updateTimetableRowStartTime = (index: number, start_time: Date) => {
    if (!timetable) return
    const newTimetable = [...timetable]
    newTimetable[index] = { ...newTimetable[index], start_time: start_time }
    setTimeTable(newTimetable)
  }

  const updateTimetableRowEndTime = (index: number, end_time: Date) => {
    if (!timetable) return
    const newTimetable = [...timetable]
    newTimetable[index] = { ...newTimetable[index], end_time: end_time }
    setTimeTable(newTimetable)
  }

  const updateTimetableRowUser = (index: number, user: UserType) => {
    if (!timetable) return
    const newTimetable = [...timetable]
    newTimetable[index] = {
      ...newTimetable[index],
      user_id: user.id,
      name: user.name,
      icon_url: user.icon_url,
      text: user.text,
    }
    setTimeTable(newTimetable)
  }

  const shiftUpTimetableRow = (index: number) => {
    if (!timetable || index === 0) return
    let newTimetable = [...timetable]
    const target = newTimetable[index]
    newTimetable[index] = newTimetable[index - 1]
    newTimetable[index - 1] = target
    newTimetable = newTimetable.map((row, idx) => {
      return { ...row, row_number: idx + 1 }
    })
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
      return { ...row, row_number: index + 1 }
    })
    setTimeTable(newTimetable)
  }

  return {
    timetable,
    vjtable,
    setTimeTable,
    loadTimetable,
    addEmptyTimetableRow,
    updateTimetableRowStartTime,
    updateTimetableRowEndTime,
    updateTimetableRowUser,
    shiftUpTimetableRow,
    clearTimetableRow,
    deleteTimetableRow,
  } as const
}
