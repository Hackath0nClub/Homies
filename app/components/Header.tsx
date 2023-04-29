import Link from 'next/link'
import Image from 'next/image'

const Header = () => {
  return (
    <>
      <div className="w-full h-full flex flex-col items-start">
        <header
          data-role="Header"
          className="flex items-center justify-center w-full max-w-full fixed h-[48px] top-0 z-50 pt-2 pl-8 pr-8 pb-2 bg-[rgba(9,26,43,1)]"
        >
          <img
            alt="pastedImage"
            src="/playground_assets/homies-logo.png"
            className="h-full"
          />
          <div className="w-full flex items-center justify-center">
            <span className="text-white text-md m-4">Home</span>
            <span className="text-white text-md m-4">Events</span>
            <span className="text-white text-md m-4">Tickets</span>
          </div>
          <Link href="/login">
            <Image
              alt="pastedImage"
              src="/playground_assets/user-icon-sample.png"
              width={32}
              height={32}
            />
          </Link>
        </header>
      </div>
    </>
  )
}

export default Header
