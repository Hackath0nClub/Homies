import { supabase } from '../../../utils/supabaseClient'
import { Lisners } from '../hooks/useEvent'

export const selectLisnersByEventId = async (id: number) => {
  try {
    const { data, error } = await supabase
      .from('ticket')
      .select(
        `
        user_id,
        user:user_id(name,icon_url)
        `
      )
      .eq('event_id', id)
    if (error) throw error

    const lisners = flattenObjectList(data)

    return lisners as Lisners
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
