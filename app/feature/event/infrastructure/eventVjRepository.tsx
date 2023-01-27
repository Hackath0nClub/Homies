import { supabase } from '../../../utils/supabaseClient'
import { VjTable } from '../hooks/useVjTimeTable'

export const selectEventVjByEventId = async (id: number) => {
  try {
    const { data, error } = await supabase
      .from('event_vj')
      .select(
        `
        row_number,
        start_time,
        end_time,
        user_id,
        vj:user_id(name,icon_url,text)
        `
      )
      .eq('event_id', id)
    if (error) throw error

    let vjtable: VjTable = flattenVjtable(data)
    if (data.length > 1) vjtable = sortByTimetable(vjtable)

    return vjtable
  } catch (error) {
    alert('Error loading Getdata!')
    console.log(error)
  }
}

const sortByTimetable = (data: any[]) => {
  return data.sort((a, b) => a.row_number - b.row_number)
}

const flattenVjtable = (data: any[]) => {
  const vjtable: VjTable = data.map((row) => {
    let { vj, start_time, end_time, ...others } = row
    return {
      ...others,
      ...vj,
      start_time: start_time ? new Date(start_time) : null,
      end_time: end_time ? new Date(end_time) : null,
    }
  })
  return vjtable
}
