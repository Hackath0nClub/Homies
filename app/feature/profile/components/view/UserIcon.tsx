import { useProfile } from "../../hooks/useProfile"
import Image from 'next/image'

export const UserIcon = () => {
  const { profileBase } = useProfile()
  return (
    <>
      <Image
        className="rounded-full bg-[rgba(238,238,238,1)]"
        alt="ユーザーアイコン"
        src={profileBase.icon_url != "" ?
          String(profileBase.icon_url)
          :
          "/user.png"
        }
        width={72}
        height={72}
        priority={true}
      />
    </>
  )
}
