import { useRecoilState } from 'recoil'
import { utcToZonedTime } from 'date-fns-tz'
import {
  djInitial,
  timeTableState,
  vjTableState,
  UserType,
  TimeTableType,
} from '../store/eventState'
import { selectEventDjByEventId } from '../infrastructure/eventDjDatabase'
import { selectEventVjByEventId } from '../infrastructure/eventVjDatabase'
import { selectEventGuestDjByEventId } from '../infrastructure/eventGuestDjDatabase'

const sortByTimetable = (data: any[]) => {
  return data.sort((a, b) => a.row_number - b.row_number)
}

export const useTimetable = () => {
  const [timetable, setTimeTable] = useRecoilState(timeTableState)
  const [vjtable, setVjTable] = useRecoilState(vjTableState)

  const loadTimetable = async (id: number) => {
    const timetableData = await selectEventDjByEventId(id)
    const vjtableData = await selectEventVjByEventId(id)
    const guestdjtableData = await selectEventGuestDjByEventId(id)
    if (!timetableData || !vjtableData || !guestdjtableData) return

    let mergedTimetable = [...timetableData, ...guestdjtableData]
    mergedTimetable = sortByTimetable(mergedTimetable)

    setTimeTable(mergedTimetable)
    setVjTable(vjtableData)
  }

  const addEmptyTableRow = (timetable: TimeTableType) => {
    const newTimetable = [
      ...timetable,
      {
        ...djInitial,
        row_number: timetable.length + 1,
      },
    ]
    return newTimetable
  }

  const updateTimatebleRowUserName = (
    timetable: TimeTableType,
    index: number,
    name: string
  ) => {
    const newTimetable = [...timetable]
    newTimetable[index] = { ...newTimetable[index], name: name }
    return newTimetable
  }

  const updateTableRowStartTime = (
    timetable: TimeTableType,
    index: number,
    start_time: Date
  ) => {
    const newTimetable = [...timetable]
    newTimetable[index] = { ...newTimetable[index], start_time: start_time }
    return newTimetable
  }

  const updateTableRowEndTime = (
    timetable: TimeTableType,
    index: number,
    end_time: Date
  ) => {
    const newTimetable = [...timetable]
    newTimetable[index] = { ...newTimetable[index], end_time: end_time }
    return newTimetable
  }

  const updateTableRowUser = (
    timetable: TimeTableType,
    index: number,
    user: UserType
  ) => {
    const newTimetable = [...timetable]
    newTimetable[index] = {
      ...newTimetable[index],
      user_id: user.id,
      name: user.name,
      icon_url: user.icon_url,
      text: user.text,
    }
    return newTimetable
  }

  const shiftUpTableRow = (timetable: TimeTableType, index: number) => {
    if (index === 0) return
    let newTimetable = [...timetable]
    const target = newTimetable[index]
    newTimetable[index] = newTimetable[index - 1]
    newTimetable[index - 1] = target
    newTimetable = newTimetable.map((row, idx) => {
      return { ...row, row_number: idx + 1 }
    })
    return newTimetable
  }

  const clearTableRow = (timetable: TimeTableType, index: number) => {
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
    return newTimetable
  }

  const deleteTableRow = (timetable: TimeTableType, index: number) => {
    if (!timetable) return
    let newTimetable = [...timetable]
    newTimetable.splice(index, 1)
    newTimetable = newTimetable.map((row, index) => {
      return { ...row, row_number: index + 1 }
    })
    return newTimetable
  }

  const addEmptyTimetableRow = () => {
    const newTimetable = addEmptyTableRow(timetable)
    if (newTimetable) setTimeTable(newTimetable)
  }

  const addEmptyVjtableRow = () => {
    const newVjtable = addEmptyTableRow(vjtable)
    if (newVjtable) setVjTable(newVjtable)
  }

  const updateTimetableRowUserName = (index: number, name: string) => {
    const newTimetable = updateTimatebleRowUserName(timetable, index, name)
    if (newTimetable) setTimeTable(newTimetable)
  }

  const updateVjtableRowUserName = (index: number, name: string) => {
    const newVjtable = updateTimatebleRowUserName(vjtable, index, name)
    if (newVjtable) setVjTable(newVjtable)
  }

  const updateTimetableRowStartTime = (index: number, start_time: Date) => {
    const newTimetable = updateTableRowStartTime(timetable, index, start_time)
    if (newTimetable) setTimeTable(newTimetable)
  }

  const updateVjtableRowStartTime = (index: number, start_time: Date) => {
    const newVjtable = updateTableRowStartTime(vjtable, index, start_time)
    if (newVjtable) setVjTable(newVjtable)
  }

  const updateTimetableRowEndTime = (index: number, end_time: Date) => {
    const newTimetable = updateTableRowEndTime(timetable, index, end_time)
    setTimeTable(newTimetable)
  }

  const updateVjtableRowEndTime = (index: number, end_time: Date) => {
    const newVjtable = updateTableRowEndTime(vjtable, index, end_time)
    setVjTable(newVjtable)
  }

  const updateTimetableRowUser = (index: number, user: UserType) => {
    const newTimetable = updateTableRowUser(timetable, index, user)
    if (newTimetable) setTimeTable(newTimetable)
  }

  const updateVjtableRowUser = (index: number, user: UserType) => {
    const newVjtable = updateTableRowUser(vjtable, index, user)
    if (newVjtable) setVjTable(newVjtable)
  }

  const shiftUpTimetableRow = (index: number) => {
    const newTimetable = shiftUpTableRow(timetable, index)
    if (newTimetable) setTimeTable(newTimetable)
  }

  const shiftUpVjtableRow = (index: number) => {
    const newVjtable = shiftUpTableRow(vjtable, index)
    if (newVjtable) setVjTable(newVjtable)
  }

  const clearTimetableRow = (index: number) => {
    const newTimetable = clearTableRow(timetable, index)
    if (newTimetable) setTimeTable(newTimetable)
  }

  const clearVjtableRow = (index: number) => {
    const newVjtable = clearTableRow(vjtable, index)
    if (newVjtable) setVjTable(newVjtable)
  }

  const deleteTimetableRow = (index: number) => {
    const newTimetable = deleteTableRow(timetable, index)
    if (newTimetable) setTimeTable(newTimetable)
  }

  const deleteVjtableRow = (index: number) => {
    const newVjtable = deleteTableRow(vjtable, index)
    if (newVjtable) setVjTable(newVjtable)
  }

  return {
    timetable,
    vjtable,
    setTimeTable,
    loadTimetable,
    addEmptyTimetableRow,
    updateTimetableRowUserName,
    updateTimetableRowStartTime,
    updateTimetableRowEndTime,
    updateTimetableRowUser,
    shiftUpTimetableRow,
    clearTimetableRow,
    deleteTimetableRow,
    addEmptyVjtableRow,
    updateVjtableRowUserName,
    updateVjtableRowStartTime,
    updateVjtableRowEndTime,
    updateVjtableRowUser,
    shiftUpVjtableRow,
    clearVjtableRow,
    deleteVjtableRow,
  } as const
}
