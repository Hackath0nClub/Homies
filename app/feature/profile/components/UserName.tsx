type PropsTupe = {
  id: string
  name: string
}

export const UserName = (props: PropsTupe) => {
  return (
    <>
      <p>{props.id}</p>
      <p>{props.name}</p>
    </>
  )
}
