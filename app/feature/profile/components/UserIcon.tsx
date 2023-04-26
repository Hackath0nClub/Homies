type PropsType = {
  icon_url: string | null
}

export const UserIcon = (props: PropsType) => {
  return (
    <>
      {props.icon_url && (
        <>
          <img
            className="rounded-full w-[72px] h-[72px] bg-[rgba(238,238,238,1)]"
            alt={props.icon_url}
            src={props.icon_url}
          />
        </>
      )}
    </>
  )
}
