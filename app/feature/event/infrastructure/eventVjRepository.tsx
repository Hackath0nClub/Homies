// export const selectEventVjByEventId = async (id: number) => {
//   const sql = `
// SELECT row_number,name,ev.user_id,text,icon_url,start_time,end_time FROM event_vj AS ev
// INNER JOIN users AS u ON ev.user_id = u.id
// INNER JOIN profile AS p ON u.id = p.user_id
// WHERE ev.event_id = ${id}`

//   // APIを利用するためデプロイ先IP or URLを入力
//   const apihost = process.env.NEXT_PUBLIC_APP_HOST
//   console.log(sql)
//   try {
//     const path = apihost + '/api/postgresql'
//     const res = await fetch(path, {
//       method: 'POST',
//       body: JSON.stringify(sql),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//     console.log(res)
//     return res.json()
//   } catch (error) {
//     console.error(error)
//   }
// }

import { createClient } from '@supabase/supabase-js'
import { VjTable } from '../hooks/useVjTimeTable'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export const selectEventVjByEventId = async (id: number) => {
  try {
    const { data, error } = await supabase
      .from('event_vj')
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

    return timetable as VjTable
  } catch (error) {
    alert('Error loading Getdata!')
    console.log(error)
  }
}
