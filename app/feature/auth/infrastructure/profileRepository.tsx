import { supabase } from '../../../utils/supabaseClient'
import { AuthType } from '../store/authState'

export const selectProfileByUuid = async (uuid: string) => {
  try {
    const { data, error } = await supabase
      .from('profile')
      .select(
        `
      id,
      name,
      icon_url
      `
      )
      .eq('uuid', uuid)
      .single()
    if (error) throw error

    return data as AuthType
  } catch (error) {
    alert('Error loading Getdata!')
    console.log(error)
  }
}
