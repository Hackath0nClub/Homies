import { supabase } from '../../../utils/supabaseClient'
import { EventType } from '../../event/store/eventState'

export const selectEventByUserId = async (user_id: string) => {
  try {
    const { data, error } = await supabase
      .from('event_dj')
      .select('*')
      .eq('user_id', user_id)
    if (error) throw error

    const events: EventType[] = data
    return events
  } catch (error) {
    alert('Error when select event by user_id')
    console.log(error)
  }
}
