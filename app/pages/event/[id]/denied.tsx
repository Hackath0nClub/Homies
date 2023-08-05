import Link from 'next/link'
import { useRouter } from 'next/router'

const EventDetailsDenied = () => {
  const { query } = useRouter()

  return (
    <div className="flex flex-col items-center h-screen bg-[rgba(28,32,37,1)]">
      <p>
        <br />
        アクセス権限がありません
      </p>
      <p>
        <br />
        <Link href={'/event/' + query.id + '/view'}>
          <button className="border rounded-full px-8 py-2 hover:bg-gray-700">
            閲覧ページに戻ります
          </button>
        </Link>
      </p>
    </div>
  )
}

export default EventDetailsDenied
