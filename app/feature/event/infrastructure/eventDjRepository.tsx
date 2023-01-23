import { supabase } from '../../../utils/supabaseClient'
import { TimeTable } from '../hooks/useDjTimeTable'

export const selectEventDjByEventId = async (id: number) => {
  try {
    const { data, error } = await supabase
      .from('event_dj')
      .select(
        `
        row_number,
        start_time,
        end_time,
        user_id,
        dj:user_id(name,icon_url,text)
        `
      )
      .eq('event_id', id)
    if (error) throw error

    if (data.length > 1) sortByTimetable(data)
    const timetable: TimeTable = convertDateStringToDateObject(data)

    return timetable
  } catch (error) {
    alert('Error loading Getdata!')
    console.log(error)
  }
}

const sortByTimetable = (data: any[]) => {
  return data.sort((a, b) => a.row_number - b.row_number)
}

const convertDateStringToDateObject = (data: any[]) => {
  const timetable: TimeTable = data.map((row) => {
    let { dj, start_time, end_time, ...others } = row
    return {
      ...others,
      ...dj,
      start_time: start_time ? new Date(start_time) : null,
      end_time: end_time ? new Date(end_time) : null,
    }
  })
  return timetable
}
