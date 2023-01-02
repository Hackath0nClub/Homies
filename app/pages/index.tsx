import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>First Post</title>
      </Head>
      <Link href="/event/000">Eventページ</Link>
    </>
  )
}
