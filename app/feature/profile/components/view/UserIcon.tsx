import { useProfile } from "../../hooks/useProfile"

export const UserIcon = () => {
  const { profileBase } = useProfile()
  return (
    <>
      {profileBase.icon_url && (
        <>
          <img
            className="rounded-full w-[72px] h-[72px] bg-[rgba(238,238,238,1)]"
            alt="ユーザーアイコン"
            src={profileBase.icon_url}
          />
        </>
      )}
    </>
  )
}
