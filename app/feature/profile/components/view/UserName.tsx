import { useProfile } from "../../hooks/useProfile"

export const UserName = () => {
  const { profileBase } = useProfile()
  return (
    <>
      <p className="text-lg text-white m-0 tracking-[-0.24px] leading-[normal]">
        {profileBase.name}
      </p>
      <p className="text-sm m-0 tracking-[-0.24px] leading-[normal] text-[rgba(170,170,170,1)]">
        {profileBase.id}
      </p>
    </>
  )
}
