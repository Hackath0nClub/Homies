import { supabase } from './createClient'
import { Profile } from '../../profile/hooks/useProfile'

export const selectProfileById = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from('profile')
      .select('*')
      .eq('id', id)
      .single()
    if (error) throw error

    const { create_at, updated_at, ...others } = data
    const profile: Profile = {
      ...others,
      create_at: create_at ? new Date(create_at) : null,
      updated_at: updated_at ? new Date(updated_at) : null,
    }

    return profile
  } catch (error) {
    alert('Error loading Getdata!')
    console.log(error)
  }
}

export const upsertProfileById = async (text: string | null, id: string) => {
  try {
    const { data, error } = await supabase
    .from('profile')
    .update({ 'text': text, 'updated_at' : new Date()})
    .eq('id', id)
    .select()
    .single()// DBを更新する

    if (error) throw error
    
    const { create_at, updated_at, ...others } = data
    const profile: Profile = {
      ...others,
      create_at: create_at ? new Date(create_at) : null,
      updated_at: updated_at ? new Date(updated_at) : null,
    }

    return profile
  } catch (error) {
    alert('Error!')
    console.log(error)
  }
}
