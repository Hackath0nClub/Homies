type PropsTupe = {
  id: string
  name: string | null
}

export const UserName = (props: PropsTupe) => {
  return (
    <>
      <p className="text-lg text-white m-0 tracking-[-0.24px] leading-[normal]">
        {props.name}
      </p>
      <p className="text-sm m-0 tracking-[-0.24px] leading-[normal] text-[rgba(170,170,170,1)]">
        {props.id}
      </p>
    </>
  )
}
