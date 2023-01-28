import { supabase } from '../../../utils/supabaseClient'
// import { Lisners } from '../hooks/useLisner'

export const selectOrganizerByEventId = async (id: number) => {
  try {
    const { data, error } = await supabase
      .from('event_organizer')
      .select(
        `
        user_id,
        organizer:user_id(name,icon_url,text)
        `
      )
      .eq('event_id', id)
    if (error) throw error
    const organizers: any = flattenorganizer(data)
    return organizers
  } catch (error) {
    alert('Error loading Getdata!')
    console.log(error)
  }
}

const flattenorganizer = (data: any[]) => {
  const organizers: any = data.map((item) => {
    const { organizer, ...others } = item
    return {
      ...others,
      ...organizer,
    }
  })
  return organizers
}
