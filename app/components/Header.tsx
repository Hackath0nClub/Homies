import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '../feature/auth/hooks/useAuth'

const Header = () => {
  const { session, handleSignout } = useAuth()
  return (
    <header
      data-role="Header"
      className="flex items-center justify-between w-full max-w-full fixed h-[48px] top-0 z-50 pt-2 pl-8 pr-8 pb-2 bg-[rgba(9,26,43,1)]"
    >
      <img
        alt="pastedImage"
        src="/playground_assets/homies-logo.png"
        className="h-full"
      />
      <div className="flex">
        <span className="text-white text-md m-4">Home</span>
        <span className="text-white text-md m-4">Events</span>
        <span className="text-white text-md m-4">Tickets</span>
      </div>
      <div className="flex">
        {session && (
          <>
            <Image
              alt="pastedImage"
              src="/playground_assets/user-icon-sample.png"
              width={32}
              height={32}
            />
            <Link href="/login">
              <span
                className="w-full mx-2 text-white text-sm"
                onClick={handleSignout}
              >
                Sign Out
              </span>
            </Link>
          </>
        )}
        {!session && (
          <Link href="/login">
            <Image alt="pastedImage" src="/user.png" width={32} height={32} />
          </Link>
        )}
      </div>
    </header>
  )
}

export default Header
