import { useRecoilState } from 'recoil'
import { utcToZonedTime } from 'date-fns-tz'
import {
  djInitial,
  timeTableState,
  vjTableState,
  UserType,
  TimeTableType,
  DjType,
} from '../store/eventState'
import {
  selectEventDjByEventId,
  upsertEventDjData,
} from '../infrastructure/eventDjDatabase'
import { selectEventVjByEventId } from '../infrastructure/eventVjDatabase'
import {
  selectEventGuestDjByEventId,
  upsertEventGuestDjData,
} from '../infrastructure/eventGuestDjDatabase'
import { getCurrentDateTime } from '../../../lib/getCurrentDateTime'
import { useEvent } from './useEvent'
import { getImageUrl, uploadGuestImage } from '../infrastructure/guestStrage'
import { upsertGuestData } from '../infrastructure/guestDatabase'

const sortByTimetable = (data: any[]) => {
  return data.sort((a, b) => a.row_number - b.row_number)
}

const pickTimetable = (timetable: TimeTableType, eventId: number) => {
  return timetable
    .filter((item) => item.user_id && !item.user_id.startsWith('@'))
    .map((item) => {
      return {
        id: item.id,
        row_number: item.row_number,
        user_id: item.user_id,
        event_id: eventId,
        start_time: item.start_time,
        end_time: item.end_time,
      }
    })
}

const pickGuestTimetable = (timetable: TimeTableType, eventId: number) => {
  return timetable
    .filter((item) => item.user_id && item.user_id.startsWith('@'))
    .map((item) => {
      return {
        id: item.id,
        row_number: item.row_number,
        user_id: item.user_id,
        event_id: eventId,
        start_time: item.start_time,
        end_time: item.end_time,
      }
    })
}

const pickDjData = (dj: DjType, eventId: number) => {
  return {
    id: dj.id,
    row_number: dj.row_number,
    user_id: dj.user_id,
    event_id: eventId,
    start_time: dj.start_time,
    end_time: dj.end_time,
  }
}

const fetchFileFromURL = async (url: string, fileName: string) => {
  const response = await fetch(url)
  const blob = await response.blob()
  const file = new File([blob], fileName + '.png', { type: 'image/png' })
  return file
}

const convertGuest = (dj: DjType, icon_url: string) => {
  const guest: UserType = {
    id: dj.user_id,
    name: dj.name,
    icon_url: icon_url,
    text: dj.text,
  }
  return guest
}

export const useTimetable = () => {
  const [timetable, setTimeTable] = useRecoilState(timeTableState)
  const [vjtable, setVjTable] = useRecoilState(vjTableState)
  const { base } = useEvent()

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

  const updateTimetable = async () => {
    if (!base.id) return

    // const newTimetable = pickTimetable(timetable, base.id)
    // for (const dj of newTimetable) await upsertEventDjData(dj)

    for (const row of timetable) {
      if (row.user_id && row.user_id.startsWith('@')) {
        const djData = pickDjData(row, base.id)
        await upsertEventGuestDjData(djData)

        const file = await fetchFileFromURL(row.icon_url!, row.user_id)
        await uploadGuestImage({ filename: row.user_id + '.png', file: file })
        const iconUrl = await getImageUrl(row.user_id + '.png')

        const guestData = convertGuest(row, iconUrl ?? '/user.png')
        upsertGuestData(guestData)

        // const response = await fetch(row.icon_url!)
        // const blob = await response.blob()
        // const file = new File([blob], row.icon_url!, { type: 'image/jpeg' })
      }
    }
    // const newGuestTimeTable = pickGuestTimetable(timetable, base.id)
    // for (const dj of newGuestTimeTable) {

    //   if (!dj.icon_url) {
    //     // URLからBlobを取得
    //     const response = await fetch(dj.icon_url)
    //     const blob = await response.blob()

    //     // BlobをFileオブジェクトに変換
    //     const file = new File([blob], fileName, { type: mimeType })
    //   }

    //   await upsertEventGuestDjData(dj)
    //   await uploadGuestImage({
    //     file_name: dj.user_id + '.png',
    //     file: dj.icon_url,
    //   })
    // }
  }

  const addEmptyTableRow = (timetable: TimeTableType) => {
    const randomId =
      '@' + Math.random().toString(32).substring(2) + getCurrentDateTime()
    const newTimetable = [
      ...timetable,
      {
        ...djInitial,
        row_number: timetable.length + 1,
        user_id: randomId,
        icon_url: '/user.png',
      },
    ]
    return newTimetable
  }

  const setTableRowName = (
    timetable: TimeTableType,
    index: number,
    name: string
  ) => {
    const newTimetable = [...timetable]
    newTimetable[index] = { ...newTimetable[index], name: name }
    return newTimetable
  }

  const setTableRowText = (
    timetable: TimeTableType,
    index: number,
    text: string
  ) => {
    const newTimetable = [...timetable]
    newTimetable[index] = { ...newTimetable[index], text: text }
    return newTimetable
  }

  const setTableRowStartTime = (
    timetable: TimeTableType,
    index: number,
    start_time: Date
  ) => {
    const newTimetable = [...timetable]
    newTimetable[index] = { ...newTimetable[index], start_time: start_time }
    return newTimetable
  }

  const setTableRowEndTime = (
    timetable: TimeTableType,
    index: number,
    end_time: Date
  ) => {
    const newTimetable = [...timetable]
    newTimetable[index] = { ...newTimetable[index], end_time: end_time }
    return newTimetable
  }

  const setTableRowIconUrl = (
    timetable: TimeTableType,
    index: number,
    icon_url: string
  ) => {
    const newTimetable = [...timetable]
    newTimetable[index] = {
      ...newTimetable[index],
      icon_url: icon_url,
    }
    return newTimetable
  }

  const setTableRowUser = (
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
    const randomId =
      '@' + Math.random().toString(32).substring(2) + getCurrentDateTime()
    const newTimetable = [...timetable]
    const updatedTimetable = {
      ...newTimetable[index],
      user_id: randomId,
      name: '',
      text: '',
      icon_url: '/user.png',
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

  const setTimetableRowName = (index: number, name: string) => {
    const newTimetable = setTableRowName(timetable, index, name)
    if (newTimetable) setTimeTable(newTimetable)
  }

  const setVjtableRowName = (index: number, name: string) => {
    const newVjtable = setTableRowName(vjtable, index, name)
    if (newVjtable) setVjTable(newVjtable)
  }

  const setTimetableRowText = (index: number, text: string) => {
    const newTimetable = setTableRowText(timetable, index, text)
    if (newTimetable) setTimeTable(newTimetable)
  }

  const setVjtableRowText = (index: number, text: string) => {
    const newVjtable = setTableRowText(vjtable, index, text)
    if (newVjtable) setVjTable(newVjtable)
  }

  const setTimetableRowStartTime = (index: number, start_time: Date) => {
    const newTimetable = setTableRowStartTime(timetable, index, start_time)
    if (newTimetable) setTimeTable(newTimetable)
  }

  const setVjtableRowStartTime = (index: number, start_time: Date) => {
    const newVjtable = setTableRowStartTime(vjtable, index, start_time)
    if (newVjtable) setVjTable(newVjtable)
  }

  const setTimetableRowEndTime = (index: number, end_time: Date) => {
    const newTimetable = setTableRowEndTime(timetable, index, end_time)
    setTimeTable(newTimetable)
  }

  const setVjtableRowEndTime = (index: number, end_time: Date) => {
    const newVjtable = setTableRowEndTime(vjtable, index, end_time)
    setVjTable(newVjtable)
  }

  const setTimetableRowIconUrl = (index: number, icon_url: string) => {
    const newTimetable = setTableRowIconUrl(timetable, index, icon_url)
    if (newTimetable) setTimeTable(newTimetable)
  }

  const setVjtableRowIconUrl = (index: number, icon_url: string) => {
    const newVjtable = setTableRowIconUrl(vjtable, index, icon_url)
    if (newVjtable) setVjTable(newVjtable)
  }

  const setTimetableRowUser = (index: number, user: UserType) => {
    const newTimetable = setTableRowUser(timetable, index, user)
    if (newTimetable) setTimeTable(newTimetable)
  }

  const setVjtableRowUser = (index: number, user: UserType) => {
    const newVjtable = setTableRowUser(vjtable, index, user)
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
    updateTimetable,
    addEmptyTimetableRow,
    setTimetableRowName,
    setTimetableRowText,
    setTimetableRowStartTime,
    setTimetableRowEndTime,
    setTimetableRowIconUrl,
    setTimetableRowUser,
    shiftUpTimetableRow,
    clearTimetableRow,
    deleteTimetableRow,
    addEmptyVjtableRow,
    setVjtableRowName,
    setVjtableRowText,
    setVjtableRowStartTime,
    setVjtableRowEndTime,
    setVjtableRowIconUrl,
    setVjtableRowUser,
    shiftUpVjtableRow,
    clearVjtableRow,
    deleteVjtableRow,
  } as const
}
