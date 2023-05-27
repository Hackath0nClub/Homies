import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  const user_id = "user-a"
  return (
    <>
      <Head>
        <title>Homies</title>
      </Head>
      <p>
        <Link href="/event/1/view">Eventページ1</Link>
      </p>
      <p>
        <Link href="/event/2/view">Eventページ2</Link>
      </p>
      <p>
        <Link href="/event/3/view">Eventページ3</Link>
      </p>
      <p>
        <Link href={"/profile/" + user_id + "/profile_view"}>user-aのprofile</Link>
      </p>
    </>
  )
}
