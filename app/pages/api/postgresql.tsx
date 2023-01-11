import { Client } from 'pg'

const client = new Client({
  user: process.env.NEXT_PUBLIC_POSTGRE_USER,
  host: process.env.NEXT_PUBLIC_POSTGRE_HOST,
  database: process.env.NEXT_PUBLIC_POSTGRE_DATABASE,
  password: process.env.NEXT_PUBLIC_POSTGRE_PASSWORD,
  port: Number(process.env.NEXT_PUBLIC_POSTGRE_PORT),
})

export default async function handler(req: any, res: any) {
  try {
    const sql = req.body.replace(/\n+/g, ' ')
    await client.connect()
    const result = await client.query(sql)
    client.end()
    res.status(200).json(result.rows)
  } catch (error) {
    res.status(500).json({ error: error })
  }
}
