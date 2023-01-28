import { convertDateStringToDateObject } from '../../../lib/convertDateStringToDateObject'
import { supabase } from '../../../utils/supabaseClient'
import { Event } from '../hooks/useEvent'

export const selectEventById = async (id: number) => {
  try {
    const { data, error } = await supabase
      .from('event')
      .select(
        `
        id,
        title,image_url,
        text,
        start_at,
        end_at,
        location_name,
        location_url,
        price,
        capacity,
        note,
        publicly,
        create_at,
        updated_at
        `
      )
      .eq('id', id)
      .single()
    if (error) throw error

    const event = convertDateStringToDateObject(data)
    return event as Event
  } catch (error) {
    alert('Error loading Getdata!')
    console.error(error)
  }
}
