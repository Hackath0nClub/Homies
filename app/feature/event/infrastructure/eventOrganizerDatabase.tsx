import { supabase } from '../../../utils/supabaseClient'
import { OrganizersType } from '../store/eventState'

export const selectOrganizersByEventId = async (id: number) => {
  try {
    const { data, error } = await supabase
      .from('event_organizer')
      .select(
        `
        user_id,
        user:user_id(name,icon_url,text)
        `
      )
      .eq('event_id', id)
    if (error) throw error
    const organizers: OrganizersType = flattenObjectList(data)
    return organizers
  } catch (error) {
    alert('Error loading Getdata!')
    console.log(error)
  }
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
