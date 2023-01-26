import { createClient } from '@supabase/supabase-js'
import { Event } from '../../event/hooks/useEvent'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export const selectProfileById = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from('profile')
      .select('*')
      .eq('id', id)
      .single()
    if (error) throw error
    console.log(data)

    const { start_at, end_at, ...others } = data
    const event: Event = {
      ...others,
      start_at: start_at ? new Date(start_at) : null,
      end_at: end_at ? new Date(end_at) : null,
    }

    return event
  } catch (error) {
    alert('Error loading Getdata!')
    console.log(error)
  }
}
