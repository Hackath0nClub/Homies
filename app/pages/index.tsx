import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
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
        <Link href="/profile/user-a/profile_view">user-aのprofile</Link>
      </p>
    </>
  )
}
