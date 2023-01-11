export const selectEventVjByEventId = async (id: number) => {
  const sql = `
SELECT row_number,name,ev.user_id,text,icon_url,start_time,end_time FROM event_vj AS ev
INNER JOIN users AS u ON ev.user_id = u.id
INNER JOIN profile AS p ON u.id = p.user_id
WHERE ev.event_id = ${id}`

  // APIを利用するためデプロイ先IP or URLを入力
  const apihost = process.env.NEXT_PUBLIC_APP_HOST
  console.log(sql)
  try {
    const path = apihost + '/api/postgresql'
    const res = await fetch(path, {
      method: 'POST',
      body: JSON.stringify(sql),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    console.log(res)
    return res.json()
  } catch (error) {
    console.error(error)
  }
}
