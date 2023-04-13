import { supabase } from '../../../utils/supabaseClient'
import { Event, Events } from '../../event/hooks/useEvent'

export const selectEventByUserId = async(user_id: string) => {
  try {
    const { data, error } = await supabase
      .from('event_dj')
      .select('*')
      .eq('user_id', user_id)
      console.log(data)
      if (error) throw error

      const events: Events = data
      return events
  } catch (error) {
    alert('Error when select event by user_id')
    console.log(error)
  }
}