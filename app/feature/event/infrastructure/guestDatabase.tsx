import { supabase } from '../../../utils/supabaseClient'
import { UserType } from '../store/eventState'

export const upsertGuestData = async (guest: UserType) => {
  try {
    const { error } = await supabase
      .from('guest')
      .upsert(guest, { onConflict: 'id' })
    if (error) throw error
  } catch (error) {
    alert('Error')
    console.error(error)
  }
}
