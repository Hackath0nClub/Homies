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

    // タイムテーブル順に並び替える
    if (data.length > 1) data.sort((a, b) => a.row_number - b.row_number)

    // 取得データを成形
    const timetable = data.map((row) => {
      let { dj, start_time, end_time, ...others } = row
      return {
        ...others,
        ...dj,
        start_time: start_time ? new Date(start_time) : null,
        end_time: end_time ? new Date(end_time) : null,
      }
    })

    return timetable as TimeTable
  } catch (error) {
    alert('Error loading Getdata!')
    console.log(error)
  }
}
