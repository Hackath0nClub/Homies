export const selectEventDjByEventId = async (id: number) => {
  const sql = `
SELECT row_number,name,ed.user_id,text,icon_url,start_time,end_time FROM event_dj AS ed
INNER JOIN users AS u ON ed.user_id = u.id
INNER JOIN profile AS p ON u.id = p.user_id
WHERE ed.event_id = ${id}`

  // APIを利用するためデプロイ先IP or URLを入力
  const apihost = process.env.NEXT_PUBLIC_APP_HOST

  try {
    const path = apihost + '/api/postgresql'
    const res = await fetch(path, {
      method: 'POST',
      body: JSON.stringify(sql),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return res.json()
  } catch (error) {
    console.error(error)
  }
}
