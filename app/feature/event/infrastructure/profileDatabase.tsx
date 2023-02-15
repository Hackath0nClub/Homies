import { supabase } from '../../../utils/supabaseClient'

export const textSearchProfileById = async (keyword: string) => {
  try {
    const { data, error } = await supabase
      .from('profile')
      .select('id, name, icon_url')
      .textSearch('id', `'${keyword}'`)
      .limit(4)
    if (error) throw error
    return data
  } catch (error) {
    alert('Error')
    console.error(error)
  }
}
