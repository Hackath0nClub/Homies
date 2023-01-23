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

    const event: Event = convertDateStringToDateObject(data)
    return event
  } catch (error) {
    alert('Error loading Getdata!')
    console.error(error)
  }
}

const convertDateStringToDateObject = (data: any) => {
  const { start_at, end_at, create_at, updated_at, ...others } = data
  const event: Event = {
    ...others,
    start_at: new Date(start_at),
    end_at: new Date(end_at),
    create_at: new Date(create_at),
    updated_at: new Date(updated_at),
  }
  return event
}
