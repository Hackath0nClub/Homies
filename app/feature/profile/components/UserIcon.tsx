type PropsType = {
  icon_url: string | null
}

export const UserIcon = (props: PropsType) => {
  return (
    <>
      {props.icon_url && (
        <>
          <img alt={props.icon_url} src={props.icon_url} />
          <p>{props.icon_url}</p>
        </>
      )}
    </>
  )
}
