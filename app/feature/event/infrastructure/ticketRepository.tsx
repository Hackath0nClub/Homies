import { supabase } from '../../../utils/supabaseClient'
import { Lisners } from '../hooks/useTicket'

export const selectLisnersByEventId = async (id: number) => {
  try {
    const { data, error } = await supabase
      .from('ticket')
      .select(
        `
        user_id,
        lisner:user_id(name,icon_url)
        `
      )
      .eq('event_id', id)
    if (error) throw error

    const lisners: Lisners = flattenLisners(data)

    return lisners
  } catch (error) {
    alert('Error loading Getdata!')
    console.log(error)
  }
}

const flattenLisners = (data: any[]) => {
  const lisners: Lisners = data.map((item) => {
    const { lisner, ...others } = item
    return {
      ...others,
      ...lisner,
    }
  })
  return lisners
}
