import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '../feature/auth/hooks/useAuth'

const Header = () => {
  const { session, auth, handleSignout } = useAuth()
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
              src={auth.icon_url ?
                String(auth.icon_url)
                :
                '/user.png'}
              width={32}
              height={32}
              className="h-full"
            />
            <button className="text-white text-sm m-2" onClick={handleSignout}>
              Sign Out
            </button>
          </>
        )}
        {!session && (
          <>
            <Link href="/auth/login">
              <button
                className="py-1 px-2 mx-1 text-white text-sm transition-colors duration-300 border border-gray-200 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                type="submit"
              >
                Log In
              </button>
            </Link>
            <Link href="/auth/signup">
              <button
                className="py-1 px-2 mx-1 text-gray-800 text-sm transition-colors duration-300 border border-gray-200 bg-gray-200 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80 hover:text-white"
                type="submit"
              >
                Sign Up
              </button>
            </Link>
          </>
        )}
      </div>
    </header>
  )
}

export default Header
