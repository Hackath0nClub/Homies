import { createClient } from '@supabase/supabase-js'
import { Database } from '../utils/database.types'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type Event = Database['public']['Tables']['event']['Row']

export const selectEventById = async (id: Event['id']) => {
  try {
    const { data, error } = await supabase
      .from('event')
      .select('*')
      .eq('id', id)
      .single()
    if (error) throw error
    return data as Event
  } catch (error) {
    alert('Error loading Getdata!')
    console.log(error)
  }
}

export async function UpdateEvent(update: Event) {
  try {
    let { error } = await supabase.from('events').upsert(update)
    if (error) throw error
  } catch (error) {
    alert('Error Update Title!')
    console.log(error)
  }
}
