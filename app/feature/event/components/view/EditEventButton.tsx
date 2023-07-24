import { useEvent } from '../../../../feature/event/hooks/useEvent'
import { useAuth } from '../../../../feature/auth/hooks/useAuth'
import Link from 'next/link'

export const EditEventButton = () => {
  const { base, organizers } = useEvent()
  const { session, auth } = useAuth()

  return (
    <>
      {session && auth.id === organizers[0].user_id ? (
        <div className="w-full text-center my-4">
          <Link href={'/event/' + base.id + '/edit'}>
            <button className="border border-white px-16 py-3 text-white font-bold bg-gradient-to-r from-[rgba(232,112,39,1)] to-[rgba(232,189,39,1)] rounded-3xl">
              イベント編集へ
            </button>
          </Link>
        </div>
      ) : null}
    </>
  )
}
