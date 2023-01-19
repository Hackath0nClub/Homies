import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>Homies</title>
      </Head>
      <p>
        <Link href="/event/1">Eventページ1</Link>
      </p>
      <p>
        <Link href="/event/2">Eventページ2</Link>
      </p>
      <p>
        <Link href="/event/3">Eventページ3</Link>
      </p>
      <p>
        <Link href="/profile/user-a">user-aのprofile</Link>
      </p>
    </>
  )
}
