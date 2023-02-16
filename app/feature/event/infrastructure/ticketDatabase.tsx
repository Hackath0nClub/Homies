import { supabase } from '../../../utils/supabaseClient'
import { Listener } from '../hooks/useEvent'

export const selectListenerByEventId = async (id: number) => {
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

    const listener = flattenObjectList(data)

    return listener as Listener
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
