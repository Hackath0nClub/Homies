import { createClient } from '@supabase/supabase-js'
import { TimeTable } from '../hooks/useDjTimeTable'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export const selectEventDjByEventId = async (id: number) => {
  try {
    const { data, error } = await supabase
      .from('event_dj')
      .select(
        `
        row_number,
        start_time,
        end_time,
        user_id,
        dj:user_id(name,icon_url,text)
        `
      )
      .eq('event_id', id)
    if (error) throw error

    // 取得データを成形
    const timetable = data.map((row) => {
      const { dj, ...rest } = row
      return { ...rest, ...dj }
    })

    return timetable as TimeTable
  } catch (error) {
    alert('Error loading Getdata!')
    console.log(error)
  }
}
