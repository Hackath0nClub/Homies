import { convertDateStringToDateObjectInList } from '../../../lib/convertDateStringToDateObject'
import { supabase } from '../../../utils/supabaseClient'
import { TimeTableType } from '../store/eventState'

export const selectEventGuestDjByEventId = async (id: number) => {
  try {
    const { data, error } = await supabase
      .from('event_guestdj')
      .select(
        `
        row_number,
        start_time,
        end_time,
        user_id,
        user:user_id(name,icon_url,text)
        `
      )
      .eq('event_id', id)
    if (error) throw error

    let timetable = flattenObjectList(data)
    timetable = convertDateStringToDateObjectInList(timetable)
    if (data.length > 1) timetable = sortByTimetable(timetable)

    return timetable as TimeTableType
  } catch (error) {
    alert('Error loading Getdata!')
    console.log(error)
  }
}

const sortByTimetable = (data: any[]) => {
  return data.sort((a, b) => a.row_number - b.row_number)
}

const flattenObjectList = (data: any[]) => {
  const obj_list = data.map((obj) => {
    const { user, ...others } = obj
    return {
      ...others,
      ...user,
    }
  })
  return obj_list
}
