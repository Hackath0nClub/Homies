import { convertDateStringToDateObjectInList } from '../../../lib/convertDateStringToDateObject'
import { supabase } from '../../../utils/supabaseClient'
import { VjTableType } from '../store/eventState'

export const selectEventVjByEventId = async (id: number) => {
  try {
    const { data, error } = await supabase
      .from('event_vj')
      .select(
        `
        id,
        row_number,
        start_time,
        end_time,
        user_id,
        user:user_id(name,icon_url,text)
        `
      )
      .eq('event_id', id)
    if (error) throw error

    let vjtable = flattenObjectList(data)
    vjtable = convertDateStringToDateObjectInList(vjtable)
    if (data.length > 1) vjtable = sortByTimetable(vjtable)

    return vjtable as VjTableType
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
