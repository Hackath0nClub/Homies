import Head from 'next/head'
import Link from 'next/link'
import { useAuth } from '../feature/auth/hooks/useAuth'

export default function Home() {
  const { auth, session } = useAuth()
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
        { session && (
          <>
            <Link href={"/profile/" + auth.id + "/profile_view"}>profile</Link>
          </>
        )
        }
      </p>
    </>
  )
}
